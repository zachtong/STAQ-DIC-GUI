"""Write probe time series to CSV.

One row per frame. That is a different table from ``export_csv``, which writes
one row per mesh node, so the two do not interact and nothing about the existing
export changes.

The file is self-describing: a comment header records each probe's geometry,
the field and reduction behind every column, the units, and the pyALDIC version
that produced it. The reference implementation exports bare numbers with no
metadata at all and one file per (probe type, component) combination, so a
directory of its CSVs cannot be interpreted without the application that made
them.

Quality columns travel with the data by default. A value column alone cannot
distinguish a mean over two hundred valid nodes from a mean over three.
"""

from __future__ import annotations

import csv
from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

import numpy as np

from al_dic import __version__
from al_dic.analysis.probes import AreaGeom, LineGeom, PointGeom, Probe
from al_dic.analysis.series import FrameStatus, TimeSeries

#: Written for a frame that holds no value, so a reader is never asked to guess
#: whether an empty cell means zero.
_EMPTY = ""


@dataclass(frozen=True)
class ProbeSeries:
    """One curve, with enough context to name and describe its columns."""

    probe: Probe
    field: str
    reduction: str
    series: TimeSeries


def _geometry_text(probe: Probe) -> str:
    g = probe.geometry
    if isinstance(g, PointGeom):
        return f"point at ({g.x:.3f}, {g.y:.3f}) px"
    if isinstance(g, LineGeom):
        return (
            f"line ({g.x0:.3f}, {g.y0:.3f}) -> ({g.x1:.3f}, {g.y1:.3f}) px, "
            f"length {g.length():.3f} px"
        )
    if isinstance(g, AreaGeom):
        if g.shape == "rect":
            x0, y0, x1, y1 = g.data  # type: ignore[misc]
            return f"rect ({x0:.3f}, {y0:.3f}) -> ({x1:.3f}, {y1:.3f}) px"
        if g.shape == "circle":
            cx, cy, r = g.data  # type: ignore[misc]
            return f"circle centre ({cx:.3f}, {cy:.3f}) px, radius {r:.3f} px"
        pts = ", ".join(f"({x:.3f}, {y:.3f})" for x, y in g.data)  # type: ignore[misc]
        return f"polygon [{pts}] px"
    return "unknown geometry"


def _column_stems(entries: Sequence[ProbeSeries]) -> list[str]:
    """Column prefixes, disambiguated when two probes share a label."""
    stems = [
        f"{e.probe.label}_{e.field}_{e.reduction}" for e in entries
    ]
    seen: dict[str, int] = {}
    for stem in stems:
        seen[stem] = seen.get(stem, 0) + 1
    out = []
    for entry, stem in zip(entries, stems):
        out.append(f"{stem}_id{entry.probe.id}" if seen[stem] > 1 else stem)
    return out


def _header_lines(
    entries: Sequence[ProbeSeries],
    stems: Sequence[str],
    frame_rate: float | None,
) -> list[str]:
    lines = [
        f"pyALDIC {__version__} probe export",
        "Coordinates are reference-frame (frame 1) image pixels, "
        "origin top-left, x = column.",
        "frame is 1-based. An empty cell means no valid measurement; "
        "the matching _flag column says why.",
    ]
    if frame_rate:
        lines.append(f"time_s = (frame - 1) / {frame_rate:g}")
    lines.append("")
    for entry, stem in zip(entries, stems):
        lines.append(
            f"{stem}: {entry.probe.kind} probe id {entry.probe.id} "
            f"'{entry.probe.label}', {_geometry_text(entry.probe)}"
        )
        unit = entry.series.unit or "dimensionless"
        lines.append(
            f"    field {entry.field}, reduction {entry.reduction}, unit {unit}"
        )
    return lines


def export_probe_csv(
    path: str | Path,
    entries: Sequence[ProbeSeries],
    *,
    frame_rate: float | None = None,
    include_quality: bool = True,
) -> Path:
    """Write *entries* as one table and return the path written.

    Parameters
    ----------
    frame_rate:
        Frames per second. When given, a ``time_s`` column is added.
    include_quality:
        Add ``_valid_fraction`` and ``_flag`` columns beside every value.
        On by default: a value column alone cannot distinguish a mean over two
        hundred valid nodes from a mean over three.
    """
    out = Path(path)
    if not entries:
        raise ValueError("Nothing to export: no probe series were given.")

    lengths = {len(e.series.frames) for e in entries}
    if len(lengths) > 1:
        raise ValueError(
            f"All series must cover the same frames, got lengths {sorted(lengths)}."
        )

    stems = _column_stems(entries)
    frames = entries[0].series.frames

    header = ["frame"]
    if frame_rate:
        header.append("time_s")
    for stem in stems:
        header.append(stem)
        if include_quality:
            header.append(f"{stem}_valid_fraction")
            header.append(f"{stem}_flag")

    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", encoding="utf-8", newline="") as fh:
        for line in _header_lines(entries, stems, frame_rate):
            fh.write(f"# {line}\n" if line else "#\n")
        writer = csv.writer(fh)
        writer.writerow(header)
        for i, frame in enumerate(frames):
            row: list[object] = [int(frame) + 1]      # 1-based in the file
            if frame_rate:
                row.append(f"{int(frame) / frame_rate:.6g}")
            for entry in entries:
                value = entry.series.values[i]
                row.append(_EMPTY if not np.isfinite(value) else f"{value:.9g}")
                if include_quality:
                    row.append(f"{entry.series.valid_fraction[i]:.4g}")
                    row.append(entry.series.status[i].value)
            writer.writerow(row)
    return out


__all__ = ["ProbeSeries", "export_probe_csv"]
