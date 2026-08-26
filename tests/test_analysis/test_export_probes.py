"""Probe time-series CSV."""

from __future__ import annotations

import csv

import numpy as np
import pytest

from al_dic.analysis.probes import LineGeom, PointGeom, Probe
from al_dic.analysis.sampling import SampleFlag, SampleSet
from al_dic.analysis.series import TimeSeries
from al_dic.export.export_probes import ProbeSeries, export_probe_csv


def _samples(values, flags=frozenset()) -> SampleSet:
    v = np.asarray(values, dtype=float)
    ok = np.isfinite(v)
    return SampleSet(np.where(ok, v, np.nan), ok, frozenset(flags))


def _series(frame_values, unit="px", flags_at=()) -> TimeSeries:
    samples = []
    for i, v in enumerate(frame_values):
        flags = {SampleFlag.CROSSES_CRACK} if i in flags_at else frozenset()
        samples.append(_samples([v], flags))
    return TimeSeries.from_samples(
        frames=list(range(len(frame_values))),
        samples=samples,
        reduction="mean",
        min_valid_fraction=0.0,
        unit=unit,
    )


def _entry(label="p1", field="disp_u", reduction="value", values=(0.0, 1.0, 2.0),
           probe_id=1, **kw) -> ProbeSeries:
    return ProbeSeries(
        probe=Probe(id=probe_id, kind="point", geometry=PointGeom(10.0, 20.0),
                    label=label, color="#FF0000"),
        field=field,
        reduction=reduction,
        series=_series(values, **kw),
    )


def _read(path):
    with open(path, encoding="utf-8") as fh:
        comments = [ln[1:].strip() for ln in fh if ln.startswith("#")]
    with open(path, encoding="utf-8") as fh:
        rows = list(csv.reader(ln for ln in fh if not ln.startswith("#")))
    return comments, rows[0], rows[1:]


def test_one_row_per_frame_and_frames_are_one_based(tmp_path):
    """1-based in the file, matching how the application numbers images."""
    p = export_probe_csv(tmp_path / "probes.csv", [_entry()])
    _, header, rows = _read(p)
    assert header[0] == "frame"
    assert [r[0] for r in rows] == ["1", "2", "3"]


def test_value_column_is_named_for_probe_field_and_reduction(tmp_path):
    p = export_probe_csv(tmp_path / "probes.csv",
                         [_entry(label="tip", field="strain_eyy",
                                 reduction="value")])
    _, header, _ = _read(p)
    assert "tip_strain_eyy_value" in header


def test_quality_columns_travel_with_the_value(tmp_path):
    """A mean over 200 valid nodes and a mean over 3 look identical otherwise."""
    p = export_probe_csv(tmp_path / "probes.csv", [_entry(label="a")])
    _, header, _ = _read(p)
    assert "a_disp_u_value_valid_fraction" in header
    assert "a_disp_u_value_flag" in header


def test_quality_columns_can_be_turned_off(tmp_path):
    p = export_probe_csv(tmp_path / "probes.csv", [_entry(label="a")],
                         include_quality=False)
    _, header, _ = _read(p)
    assert header == ["frame", "a_disp_u_value"]


def test_missing_values_are_empty_cells_not_the_word_nan(tmp_path):
    p = export_probe_csv(tmp_path / "probes.csv",
                         [_entry(values=(0.0, float("nan"), 2.0))],
                         include_quality=False)
    _, _, rows = _read(p)
    assert rows[1][1] == ""


def test_flag_column_says_why_a_cell_is_empty(tmp_path):
    p = export_probe_csv(tmp_path / "probes.csv",
                         [_entry(values=(0.0, 1.0, 2.0), flags_at=(1,))])
    _, header, rows = _read(p)
    flag_col = header.index("p1_disp_u_value_flag")
    value_col = header.index("p1_disp_u_value")
    assert rows[1][value_col] == ""
    assert rows[1][flag_col] == "crosses_crack"
    assert rows[0][flag_col] == "ok"


def test_header_records_geometry_units_and_version(tmp_path):
    """The reference exports bare numbers, so its CSVs cannot be interpreted."""
    entry = ProbeSeries(
        probe=Probe(id=3, kind="line", geometry=LineGeom(0.0, 0.0, 30.0, 40.0),
                    label="gauge", color="#00FF00"),
        field="disp_u",
        reduction="strain",
        series=_series((0.0, 0.01), unit=""),
    )
    p = export_probe_csv(tmp_path / "probes.csv", [entry])
    comments, _, _ = _read(p)
    blob = "\n".join(comments)
    assert "pyALDIC" in blob
    assert "line (0.000, 0.000) -> (30.000, 40.000) px" in blob
    assert "length 50.000 px" in blob
    assert "reduction strain" in blob
    assert "dimensionless" in blob
    assert "1-based" in blob


def test_time_column_appears_only_with_a_frame_rate(tmp_path):
    without = export_probe_csv(tmp_path / "a.csv", [_entry()])
    with_rate = export_probe_csv(tmp_path / "b.csv", [_entry()], frame_rate=10.0)
    assert "time_s" not in _read(without)[1]
    _, header, rows = _read(with_rate)
    assert header[1] == "time_s"
    assert [r[1] for r in rows] == ["0", "0.1", "0.2"]


def test_several_probes_share_one_file(tmp_path):
    """One file covers every probe, field and reduction selected.

    The reference writes one file per (probe type, component) pair and cannot
    export more than one component at a time.
    """
    p = export_probe_csv(tmp_path / "probes.csv", [
        _entry(label="a", probe_id=1),
        _entry(label="b", probe_id=2, field="strain_exx"),
    ], include_quality=False)
    _, header, _ = _read(p)
    assert header == ["frame", "a_disp_u_value", "b_strain_exx_value"]


def test_duplicate_labels_are_disambiguated_by_id(tmp_path):
    p = export_probe_csv(tmp_path / "probes.csv", [
        _entry(label="same", probe_id=1),
        _entry(label="same", probe_id=2),
    ], include_quality=False)
    _, header, _ = _read(p)
    assert header == ["frame", "same_disp_u_value_id1", "same_disp_u_value_id2"]


def test_series_of_different_lengths_are_rejected(tmp_path):
    with pytest.raises(ValueError, match="same frames"):
        export_probe_csv(tmp_path / "probes.csv", [
            _entry(values=(0.0, 1.0)),
            _entry(values=(0.0, 1.0, 2.0), probe_id=2),
        ])


def test_empty_export_is_rejected(tmp_path):
    with pytest.raises(ValueError, match="Nothing to export"):
        export_probe_csv(tmp_path / "probes.csv", [])


def test_written_file_reads_back_with_a_plain_csv_reader(tmp_path):
    """Comment lines must not confuse a reader that skips them."""
    p = export_probe_csv(tmp_path / "probes.csv", [_entry()])
    with open(p, encoding="utf-8") as fh:
        rows = list(csv.reader(ln for ln in fh if not ln.startswith("#")))
    assert len(rows) == 4          # header + 3 frames
    assert all(len(r) == len(rows[0]) for r in rows)


def test_non_ascii_label_survives(tmp_path):
    """CJK labels are the normal case for this project's users."""
    p = export_probe_csv(tmp_path / "probes.csv",
                         [_entry(label="试样中心")], include_quality=False)
    _, header, _ = _read(p)
    assert header[1].startswith("试样中心")
