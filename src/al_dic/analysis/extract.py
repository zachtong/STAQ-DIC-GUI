"""Turn a probe and a finished run into a curve.

The public entry point for the whole analysis package. The GUI calls it; so can
a batch script, which is the point of keeping this out of ``al_dic.gui``:

    from al_dic.analysis import LineGeom, Probe, extract_series

    ts = extract_series(result, probe, field="strain_eyy", reduction="mean")

Frame indices follow the rest of the application: 0 is the reference image, and
frame *n* reads ``result_disp[n - 1]``. Frame 0 is zero displacement and zero
strain by definition, so a probe always has a first point.

Physical units are a parameter, never read from application state -- this layer
knows nothing about the GUI. Displacements are scaled by ``pixel_size``; strains
are dimensionless and are never scaled, which is the mistake the reference
implementation's report generator makes in the opposite direction.

Crack masks must arrive in frame-0 coordinates. A per-frame region of interest
is drawn on the *deformed* image, so the caller warps it back with
``mesh.rasterize.crack_mask_from_deformed`` first -- the same asymmetry the
strain display had to fix in 0.7.0.
"""

from __future__ import annotations

from typing import Sequence

import numpy as np
from numpy.typing import NDArray

from al_dic.analysis.probes import LineGeom, Probe, allowed_reductions
from al_dic.analysis.sampling import ProbeSampler, SampleFlag, SampleSet
from al_dic.analysis.series import (
    TimeSeries,
    cod_from_endpoints,
    strain_from_endpoints,
)
from al_dic.core.fields import field_unit, is_strain_field, validate_field

#: Fraction of a probe's samples that must be valid for a frame to count.
DEFAULT_MIN_VALID_FRACTION = 0.5


def _disp_components(
    result, frame: int, pixel_size: float
) -> tuple[NDArray[np.float64], NDArray[np.float64]] | None:
    """Cumulative (u, v) per node for *frame*, scaled to physical units."""
    n = result.dic_mesh.coordinates_fem.shape[0]
    if frame == 0:
        zeros = np.zeros(n, dtype=np.float64)
        return zeros, zeros.copy()
    idx = frame - 1
    if idx >= len(result.result_disp):
        return None
    fr = result.result_disp[idx]
    U = fr.U_accum if fr.U_accum is not None else fr.U
    return U[0::2] * pixel_size, U[1::2] * pixel_size


def field_values(
    result,
    field: str,
    frame: int,
    *,
    pixel_size: float = 1.0,
) -> NDArray[np.float64] | None:
    """Per-node values of *field* on *frame*, or None if unavailable.

    Mirrors the conventions ``StrainWindow._get_field_values`` uses for the
    display, so a probe reads exactly what the field on screen shows.
    """
    validate_field(field)

    if not is_strain_field(field):
        uv = _disp_components(result, frame, pixel_size)
        if uv is None:
            return None
        u, v = uv
        if field == "disp_u":
            return u
        if field == "disp_v":
            return v
        return np.sqrt(u ** 2 + v ** 2)

    n = result.dic_mesh.coordinates_fem.shape[0]
    if frame == 0:
        return np.zeros(n, dtype=np.float64)
    idx = frame - 1
    if not result.result_strain or idx >= len(result.result_strain):
        return None
    sr = result.result_strain[idx]
    vals = getattr(sr, field, None)
    if vals is None:
        return None
    vals = np.asarray(vals, dtype=np.float64).copy()

    # Edge-trim / reliability: NaN the unreliable nodes rather than silently
    # averaging them in. StrainResult keeps the raw values; this is a copy.
    valid = getattr(sr, "strain_valid", None)
    if valid is not None and len(valid) == len(vals):
        vals[~np.asarray(valid, dtype=bool)] = np.nan
    return vals


def _node_valid(result, frame: int) -> NDArray[np.bool_] | None:
    if frame == 0 or not result.result_strain:
        return None
    idx = frame - 1
    if idx >= len(result.result_strain):
        return None
    valid = getattr(result.result_strain[idx], "strain_valid", None)
    return None if valid is None else np.asarray(valid, dtype=bool)


def frame_count(result) -> int:
    """Number of frames a probe can report on, reference frame included."""
    return len(result.result_disp) + 1


def extract_series(
    result,
    probe: Probe,
    field: str,
    reduction: str,
    *,
    masks: Sequence[NDArray] | None = None,
    pixel_size: float = 1.0,
    length_unit: str = "px",
    min_valid_fraction: float = DEFAULT_MIN_VALID_FRACTION,
    frames: Sequence[int] | None = None,
) -> TimeSeries:
    """Read *probe* across the sequence and reduce each frame to one number.

    Parameters
    ----------
    masks:
        Optional per-frame region masks in frame-0 coordinates, ``< 0.5``
        marking crack, hole or outside. One entry per frame, index-aligned with
        *frames*. Without them no barrier is enforced.
    """
    allowed = allowed_reductions(probe.kind)
    if reduction not in allowed:
        raise ValueError(
            f"Reduction {reduction!r} does not apply to a {probe.kind} probe. "
            f"Allowed: {', '.join(sorted(allowed)) or 'none'}."
        )
    validate_field(field)

    idxs = list(frames) if frames is not None else list(range(frame_count(result)))
    nodes = result.dic_mesh.coordinates_fem
    step = float(getattr(result.dic_para, "winstepsize", 8) or 8)

    if reduction in ("strain", "cod"):
        return _gauge_series(
            result, probe, idxs, masks, pixel_size, length_unit, step, reduction
        )

    unit = field_unit(field, length_unit)
    samples: list[SampleSet] = []
    for pos, frame in enumerate(idxs):
        values = field_values(result, field, frame, pixel_size=pixel_size)
        if values is None:
            samples.append(
                SampleSet(np.zeros(0), np.zeros(0, bool),
                          frozenset({SampleFlag.OUTSIDE_ROI}))
            )
            continue
        sampler = ProbeSampler(
            nodes,
            mask=masks[pos] if masks is not None and pos < len(masks) else None,
            node_valid=_node_valid(result, frame),
            step=step,
        )
        samples.append(_sample_probe(sampler, values, probe))

    return TimeSeries.from_samples(
        frames=idxs,
        samples=samples,
        reduction=reduction,
        min_valid_fraction=min_valid_fraction,
        unit=unit,
    )


def _sample_probe(sampler: ProbeSampler, values, probe: Probe) -> SampleSet:
    if probe.kind == "point":
        return sampler.sample_point(values, probe.geometry)
    if probe.kind == "line":
        return sampler.sample_line(values, probe.geometry)
    return sampler.sample_area(values, probe.geometry)


def _gauge_series(
    result,
    probe: Probe,
    idxs: Sequence[int],
    masks: Sequence[NDArray] | None,
    pixel_size: float,
    length_unit: str,
    step: float,
    reduction: str,
) -> TimeSeries:
    """Strain or crack opening from the two endpoints of a line probe."""
    geom: LineGeom = probe.geometry  # type: ignore[assignment]
    nodes = result.dic_mesh.coordinates_fem
    p0 = (geom.x0, geom.y0)
    p1 = (geom.x1, geom.y1)

    samples: list[SampleSet] = []
    for pos, frame in enumerate(idxs):
        uv = _disp_components(result, frame, pixel_size)
        if uv is None:
            samples.append(
                SampleSet(np.zeros(0), np.zeros(0, bool),
                          frozenset({SampleFlag.OUTSIDE_ROI}))
            )
            continue
        u, v = uv
        mask = masks[pos] if masks is not None and pos < len(masks) else None
        sampler = ProbeSampler(nodes, mask=mask, step=step)
        d0, d1 = sampler.sample_endpoints(u, v, geom)

        if reduction == "strain":
            value = strain_from_endpoints(p0, p1, d0, d1)
        else:
            value = cod_from_endpoints(p0, p1, d0, d1).along_gauge

        flags: set[SampleFlag] = set()
        if not np.isfinite(value):
            flags.add(SampleFlag.OUTSIDE_ROI)
        # A gauge deliberately spanning a crack is the point of COD, so the
        # barrier only invalidates the strain reading.
        if reduction == "strain" and mask is not None:
            from al_dic.utils.crack_barrier import segment_crosses_barrier

            if segment_crosses_barrier(geom.x0, geom.y0, geom.x1, geom.y1, mask):
                flags.add(SampleFlag.CROSSES_CRACK)

        arr = np.array([value], dtype=np.float64)
        ok = np.isfinite(arr)
        samples.append(SampleSet(np.where(ok, arr, np.nan), ok, frozenset(flags)))

    unit = "" if reduction == "strain" else length_unit
    return TimeSeries.from_samples(
        frames=list(idxs),
        samples=samples,
        reduction="mean",          # one sample per frame; the reduction is trivial
        min_valid_fraction=0.0,
        unit=unit,
    )


__all__ = [
    "DEFAULT_MIN_VALID_FRACTION", "extract_series", "field_values",
    "frame_count",
]
