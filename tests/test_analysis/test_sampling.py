"""Sampling a nodal field at probe geometry, honouring cracks and validity.

The fixtures use a linear field over a regular node grid, so linear
interpolation is exact and every expected value can be written down rather than
compared against the implementation's own output.
"""

from __future__ import annotations

import numpy as np
import pytest

from al_dic.analysis.probes import AreaGeom, LineGeom, PointGeom
from al_dic.analysis.sampling import ProbeSampler, SampleFlag

STEP = 4.0
EXTENT = 40.0


def _grid_nodes(step: float = STEP, extent: float = EXTENT) -> np.ndarray:
    xs = np.arange(0.0, extent + step, step)
    gx, gy = np.meshgrid(xs, xs)
    return np.column_stack([gx.ravel(), gy.ravel()])


def _linear_field(nodes: np.ndarray) -> np.ndarray:
    """f(x, y) = 2x + 3y -- reproduced exactly by linear interpolation."""
    return 2.0 * nodes[:, 0] + 3.0 * nodes[:, 1]


def _expected(x: float, y: float) -> float:
    return 2.0 * x + 3.0 * y


def _open_mask(size: int = 64) -> np.ndarray:
    """All material, no barrier."""
    return np.ones((size, size), dtype=np.float64)


def _slit_mask(size: int = 64, col: int = 18, half: int = 1) -> np.ndarray:
    """A vertical crack: a thin column of void running up from the bottom edge.

    Placed *between* node columns (nodes sit at x = 0, 4, 8, ... and the slit
    occupies x = 17..19) so that a mesh edge spanning it has both endpoints in
    material. That is the case crack_barrier is built for -- an edge with an
    endpoint inside the void is a boundary artifact, not a crack, and is
    ignored by design. It is also the realistic one: a crack thinner than a
    mesh cell is exactly what mark_bridging has to cut.

    Rows 0..30 are void; a horizontal line at y < 30 crosses the slit and one
    above it does not.
    """
    m = np.ones((size, size), dtype=np.float64)
    m[0:30, col - half:col + half + 1] = 0.0
    return m


@pytest.fixture
def nodes() -> np.ndarray:
    return _grid_nodes()


@pytest.fixture
def values(nodes) -> np.ndarray:
    return _linear_field(nodes)


# --- points --------------------------------------------------------------

def test_point_inside_is_interpolated_exactly(nodes, values):
    s = ProbeSampler(nodes, mask=_open_mask())
    out = s.sample_point(values, PointGeom(10.0, 6.0))
    assert out.values[0] == pytest.approx(_expected(10.0, 6.0))
    assert out.valid[0]
    assert out.flags == frozenset()


def test_point_between_nodes_is_interpolated(nodes, values):
    s = ProbeSampler(nodes, mask=_open_mask())
    out = s.sample_point(values, PointGeom(9.0, 7.0))
    assert out.values[0] == pytest.approx(_expected(9.0, 7.0), abs=1e-9)


def test_point_outside_the_hull_is_nan_not_clamped(nodes, values):
    """The reference clamps line and gauge samples to the edge node.

    That returns a plausible-looking number for a probe that is not on the
    specimen at all, which is worse than returning nothing.
    """
    s = ProbeSampler(nodes, mask=_open_mask())
    out = s.sample_point(values, PointGeom(EXTENT + 25.0, 5.0))
    assert np.isnan(out.values[0])
    assert not out.valid[0]
    assert SampleFlag.OUTSIDE_ROI in out.flags


def test_point_on_an_invalid_node_region_is_nan(nodes, values):
    """node_valid is the strain reliability mask (StrainResult.strain_valid)."""
    node_valid = np.ones(len(nodes), dtype=bool)
    node_valid[nodes[:, 0] > 20.0] = False
    s = ProbeSampler(nodes, mask=_open_mask(), node_valid=node_valid)
    assert np.isnan(s.sample_point(values, PointGeom(30.0, 10.0)).values[0])
    assert s.sample_point(values, PointGeom(10.0, 10.0)).valid[0]


# --- lines ---------------------------------------------------------------

def test_line_sample_count_follows_the_mesh_step(nodes, values):
    """Not a hardcoded 100.

    The reference samples every line at 100 points regardless of length or node
    spacing, which invents resolution a 20 px line does not have.
    """
    s = ProbeSampler(nodes, mask=_open_mask(), step=STEP)
    short = s.sample_line(values, LineGeom(0.0, 0.0, 8.0, 0.0))
    long = s.sample_line(values, LineGeom(0.0, 0.0, 40.0, 0.0))
    assert len(short.values) < len(long.values)
    assert 2 <= len(short.values) <= 12


def test_line_values_follow_the_field(nodes, values):
    s = ProbeSampler(nodes, mask=_open_mask(), step=STEP)
    out = s.sample_line(values, LineGeom(0.0, 12.0, 40.0, 12.0))
    finite = out.values[np.isfinite(out.values)]
    assert finite[0] == pytest.approx(_expected(0.0, 12.0), abs=1e-6)
    assert finite[-1] == pytest.approx(_expected(40.0, 12.0), abs=1e-6)
    assert np.all(np.diff(finite) > 0)


def test_line_crossing_a_crack_is_flagged_and_broken(nodes, values):
    s = ProbeSampler(nodes, mask=_slit_mask(), step=STEP)
    out = s.sample_line(values, LineGeom(0.0, 12.0, 40.0, 12.0))
    assert SampleFlag.CROSSES_CRACK in out.flags
    assert not out.valid.all(), "samples spanning the crack must be invalid"
    assert out.valid.any(), "the rest of the line is still measurable"


def test_line_beside_a_crack_is_bit_exact_against_no_crack(nodes, values):
    """Away from a barrier the crack-aware path must change nothing.

    crack_barrier makes the same promise for rendering; a probe that drifted
    from it would disagree with the picture the user is looking at.
    """
    geom = LineGeom(0.0, 36.0, 40.0, 36.0)   # above the slit, which ends at y=30
    plain = ProbeSampler(nodes, mask=_open_mask(), step=STEP)
    cracked = ProbeSampler(nodes, mask=_slit_mask(), step=STEP)
    a = plain.sample_line(values, geom)
    b = cracked.sample_line(values, geom)
    np.testing.assert_array_equal(a.values, b.values)
    assert b.flags == frozenset()


# --- areas ---------------------------------------------------------------

def test_area_rect_selects_the_nodes_inside_it(nodes, values):
    s = ProbeSampler(nodes, mask=_open_mask())
    out = s.sample_area(values, AreaGeom.rect(0.0, 0.0, 8.0, 8.0))
    # step 4 over [0, 8] inclusive -> 3 x 3 nodes
    assert len(out.values) == 9
    assert out.valid.all()


def test_area_circle_selects_by_radius(nodes, values):
    s = ProbeSampler(nodes, mask=_open_mask())
    out = s.sample_area(values, AreaGeom.circle(20.0, 20.0, 5.0))
    # nodes at distance <= 5 from (20, 20) on a step-4 grid: centre + 4 neighbours
    assert len(out.values) == 5


def test_area_polygon_selects_by_containment(nodes, values):
    s = ProbeSampler(nodes, mask=_open_mask())
    tri = AreaGeom.polygon([(0.0, 0.0), (16.0, 0.0), (0.0, 16.0)])
    out = s.sample_area(values, tri)
    assert 0 < len(out.values) < len(nodes)


def test_area_uses_nodes_not_a_pixel_mask(nodes, values):
    """A region smaller than one mesh cell contains no nodes and is empty.

    The reference rasterises the shape into a pixel mask, which works only
    because its field is a dense per-pixel array. Saying so plainly is better
    than returning a number interpolated from nodes that are all outside.
    """
    s = ProbeSampler(nodes, mask=_open_mask())
    out = s.sample_area(values, AreaGeom.rect(9.0, 9.0, 10.0, 10.0))
    assert len(out.values) == 0
    assert SampleFlag.OUTSIDE_ROI in out.flags


def test_area_respects_node_validity(nodes, values):
    node_valid = np.ones(len(nodes), dtype=bool)
    node_valid[nodes[:, 1] > 4.0] = False
    s = ProbeSampler(nodes, mask=_open_mask(), node_valid=node_valid)
    out = s.sample_area(values, AreaGeom.rect(0.0, 0.0, 8.0, 8.0))
    assert len(out.values) == 9
    assert out.valid.sum() == 6          # rows y=0 and y=4 remain valid
    assert np.isnan(out.values[~out.valid]).all()


def test_area_spanning_a_crack_is_flagged(nodes, values):
    s = ProbeSampler(nodes, mask=_slit_mask())
    out = s.sample_area(values, AreaGeom.rect(12.0, 4.0, 28.0, 20.0))
    assert SampleFlag.CROSSES_CRACK in out.flags


# --- gauge endpoints -----------------------------------------------------

def test_endpoint_displacements_use_the_same_interpolator(nodes):
    """Not nearest-neighbour rounding, which is what the reference uses."""
    u = nodes[:, 0] * 0.10          # u = 0.1 x
    v = np.zeros(len(nodes))
    s = ProbeSampler(nodes, mask=_open_mask())
    (u0, v0), (u1, v1) = s.sample_endpoints(u, v, LineGeom(2.0, 10.0, 22.0, 10.0))
    assert u0 == pytest.approx(0.2, abs=1e-9)
    assert u1 == pytest.approx(2.2, abs=1e-9)
    assert (v0, v1) == pytest.approx((0.0, 0.0))


def test_endpoint_outside_the_hull_is_nan(nodes):
    u = np.zeros(len(nodes))
    s = ProbeSampler(nodes, mask=_open_mask())
    (u0, _), _ = s.sample_endpoints(u, u, LineGeom(-30.0, 10.0, 20.0, 10.0))
    assert np.isnan(u0)
