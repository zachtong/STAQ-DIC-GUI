"""Reading a probe across a finished run.

Uses a hand-built PipelineResult with an analytically known field, so the
expected numbers come from the physics rather than from the implementation.
"""

from __future__ import annotations

import numpy as np
import pytest

from al_dic.analysis.extract import extract_series, field_values, frame_count
from al_dic.analysis.probes import AreaGeom, LineGeom, PointGeom, Probe
from al_dic.analysis.series import FrameStatus
from al_dic.core.data_structures import DICMesh, FrameResult, PipelineResult

STEP = 4.0
EXTENT = 40.0


def _nodes() -> np.ndarray:
    xs = np.arange(0.0, EXTENT + STEP, STEP)
    gx, gy = np.meshgrid(xs, xs)
    return np.column_stack([gx.ravel(), gy.ravel()])


def _result(n_frames: int = 3, strain_rate: float = 0.01):
    """Uniaxial stretch: u = strain_rate * frame * x, v = 0."""
    nodes = _nodes()
    n = len(nodes)
    mesh = DICMesh(coordinates_fem=nodes, elements_fem=np.zeros((0, 4), np.int64))

    disp = []
    for f in range(1, n_frames + 1):
        u = strain_rate * f * nodes[:, 0]
        v = np.zeros(n)
        U = np.empty(2 * n)
        U[0::2] = u
        U[1::2] = v
        disp.append(FrameResult(U=U, U_accum=U.copy()))

    return PipelineResult(
        dic_para=type("P", (), {"winstepsize": STEP})(),
        dic_mesh=mesh,
        result_disp=disp,
        result_def_grad=[],
        result_strain=[],
        result_fe_mesh_each_frame=[],
    )


# --- field access --------------------------------------------------------

def test_reference_frame_has_zero_displacement():
    r = _result()
    vals = field_values(r, "disp_u", 0)
    assert np.all(vals == 0.0)


def test_displacement_follows_the_frame_index():
    r = _result(strain_rate=0.01)
    nodes = _nodes()
    for f in (1, 2, 3):
        vals = field_values(r, "disp_u", f)
        np.testing.assert_allclose(vals, 0.01 * f * nodes[:, 0])


def test_pixel_size_scales_displacement_but_never_strain():
    """A strain multiplied by a pixel-to-millimetre ratio is a silent error."""
    r = _result()
    px = field_values(r, "disp_u", 1, pixel_size=1.0)
    mm = field_values(r, "disp_u", 1, pixel_size=0.5)
    np.testing.assert_allclose(mm, px * 0.5)


def test_unknown_field_raises():
    with pytest.raises(ValueError, match="Unknown field"):
        field_values(_result(), "strain_eyx", 1)


def test_frame_count_includes_the_reference():
    assert frame_count(_result(n_frames=5)) == 6


# --- series --------------------------------------------------------------

def test_point_probe_series():
    r = _result(strain_rate=0.01)
    p = Probe(id=1, kind="point", geometry=PointGeom(20.0, 20.0),
              label="p", color="#FF0000")
    ts = extract_series(r, p, "disp_u", "value")
    # u = 0.01 * frame * 20
    np.testing.assert_allclose(ts.values, [0.0, 0.2, 0.4, 0.6], atol=1e-9)
    assert ts.unit == "px"


def test_point_probe_rejects_a_reduction():
    r = _result()
    p = Probe(id=1, kind="point", geometry=PointGeom(20.0, 20.0),
              label="p", color="#FF0000")
    with pytest.raises(ValueError, match="does not apply"):
        extract_series(r, p, "disp_u", "median")


def test_area_probe_mean_over_nodes():
    r = _result(strain_rate=0.01)
    p = Probe(id=1, kind="area", geometry=AreaGeom.rect(0.0, 0.0, 8.0, 8.0),
              label="a", color="#00FF00")
    ts = extract_series(r, p, "disp_u", "mean")
    # x over {0, 4, 8} averages to 4 -> u = 0.01 * frame * 4
    np.testing.assert_allclose(ts.values, [0.0, 0.04, 0.08, 0.12], atol=1e-9)


def test_gauge_strain_recovers_the_applied_stretch():
    """The whole point of a virtual extensometer."""
    r = _result(strain_rate=0.01)
    p = Probe(id=1, kind="line", geometry=LineGeom(4.0, 20.0, 36.0, 20.0),
              label="g", color="#0000FF")
    ts = extract_series(r, p, "disp_u", "strain")
    np.testing.assert_allclose(ts.values, [0.0, 0.01, 0.02, 0.03], atol=1e-9)
    assert ts.unit == "", "engineering strain is dimensionless"


def test_gauge_cod_is_a_length():
    r = _result(strain_rate=0.01)
    p = Probe(id=1, kind="line", geometry=LineGeom(4.0, 20.0, 36.0, 20.0),
              label="g", color="#0000FF")
    ts = extract_series(r, p, "disp_u", "cod", length_unit="px")
    # opening = 0.01 * frame * (36 - 4)
    np.testing.assert_allclose(ts.values, [0.0, 0.32, 0.64, 0.96], atol=1e-9)
    assert ts.unit == "px"


def test_line_probe_mean_along_the_chord():
    r = _result(strain_rate=0.01)
    p = Probe(id=1, kind="line", geometry=LineGeom(0.0, 20.0, 40.0, 20.0),
              label="l", color="#FFFF00")
    ts = extract_series(r, p, "disp_u", "mean")
    # mean of u over x in [0, 40] is 0.01 * frame * 20
    np.testing.assert_allclose(ts.values, [0.0, 0.2, 0.4, 0.6], atol=1e-6)


def test_valid_fraction_is_extractable_as_its_own_series():
    r = _result()
    p = Probe(id=1, kind="area", geometry=AreaGeom.rect(0.0, 0.0, 8.0, 8.0),
              label="a", color="#00FF00")
    ts = extract_series(r, p, "disp_u", "valid_fraction")
    assert np.all(ts.values == 1.0)


# --- crack awareness -----------------------------------------------------

def _slit(size: int = 64) -> np.ndarray:
    m = np.ones((size, size), dtype=np.float64)
    m[:, 17:20] = 0.0
    return m


def test_gauge_strain_across_a_crack_breaks_but_cod_does_not():
    """The agreed asymmetry.

    (L - L0)/L0 stops being strain once the gauge spans a discontinuity, but
    the separation it measures is exactly what a crack-opening gauge is for.
    """
    r = _result(strain_rate=0.01)
    masks = [_slit()] * frame_count(r)
    p = Probe(id=1, kind="line", geometry=LineGeom(4.0, 20.0, 36.0, 20.0),
              label="g", color="#0000FF")

    strain = extract_series(r, p, "disp_u", "strain", masks=masks)
    assert all(np.isnan(v) for v in strain.values)
    assert strain.status[1] is FrameStatus.CROSSES_CRACK

    cod = extract_series(r, p, "disp_u", "cod", masks=masks)
    assert np.isfinite(cod.values[1:]).all()


def test_area_probe_spanning_a_crack_breaks():
    r = _result(strain_rate=0.01)
    masks = [_slit()] * frame_count(r)
    p = Probe(id=1, kind="area", geometry=AreaGeom.rect(8.0, 8.0, 28.0, 28.0),
              label="a", color="#00FF00")
    ts = extract_series(r, p, "disp_u", "mean", masks=masks)
    assert all(s is FrameStatus.CROSSES_CRACK for s in ts.status)


def test_probe_away_from_the_crack_is_unaffected():
    r = _result(strain_rate=0.01)
    p = Probe(id=1, kind="area", geometry=AreaGeom.rect(24.0, 8.0, 36.0, 20.0),
              label="a", color="#00FF00")
    without = extract_series(r, p, "disp_u", "mean")
    with_mask = extract_series(r, p, "disp_u", "mean",
                               masks=[_slit()] * frame_count(r))
    np.testing.assert_array_equal(without.values, with_mask.values)
