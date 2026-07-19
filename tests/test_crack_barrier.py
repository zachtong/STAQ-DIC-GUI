"""Tests for crack-aware rendering helpers (utils/crack_barrier.py)."""

from __future__ import annotations

import numpy as np
import pytest
from scipy.spatial import Delaunay

from al_dic.utils.crack_barrier import (
    crack_aware_nearest_fill,
    cross_crack_cell_mask,
    cross_crack_simplices,
    segment_crosses_barrier,
)


@pytest.fixture
def grid_nodes():
    """9x9 regular node grid on [0,80]^2 (step 10) + its Delaunay."""
    xs = np.arange(0, 81, 10, dtype=float)
    ys = np.arange(0, 81, 10, dtype=float)
    X, Y = np.meshgrid(xs, ys)
    pts = np.column_stack([X.ravel(), Y.ravel()])
    return pts, Delaunay(pts)


def _solid_mask(h=81, w=81):
    return np.ones((h, w), dtype=bool)


# --- segment_crosses_barrier -------------------------------------------------

def test_segment_crosses_barrier_detects_slit():
    mask = _solid_mask()
    mask[44:47, :] = False  # horizontal slit at y~45
    assert segment_crosses_barrier(40, 30, 40, 60, mask) is True   # vertical, crosses
    assert segment_crosses_barrier(10, 20, 60, 20, mask) is False  # horizontal, clears


def test_segment_short_returns_false():
    mask = _solid_mask()
    mask[:, :] = False
    # Adjacent endpoints (no interior samples) are never "crossing".
    assert segment_crosses_barrier(10, 10, 10, 11, mask) is False


# --- cross_crack_cell_mask ---------------------------------------------------

def test_no_barrier_returns_none(grid_nodes):
    pts, tri = grid_nodes
    gx, gy = np.meshgrid(np.arange(81), np.arange(81))
    assert cross_crack_cell_mask(tri, pts, gx.astype(float), gy.astype(float), None) is None


def test_solid_mask_is_bit_exact_none(grid_nodes):
    """A convex, crack-free mask flags nothing -> None (render unchanged)."""
    pts, tri = grid_nodes
    gx, gy = np.meshgrid(np.arange(81), np.arange(81))
    out = cross_crack_cell_mask(tri, pts, gx.astype(float), gy.astype(float), _solid_mask())
    assert out is None


def test_horizontal_crack_blanks_only_near_the_crack(grid_nodes):
    """A partial horizontal slit blanks the bridging band, not the far field."""
    pts, tri = grid_nodes
    mask = _solid_mask()
    mask[44:47, 0:45] = False  # slit at y~45, left half only (x < 45)
    gx, gy = np.meshgrid(np.arange(81), np.arange(81))
    out = cross_crack_cell_mask(tri, pts, gx.astype(float), gy.astype(float), mask)
    assert out is not None
    assert out.any()
    # Cells far from the crack line (top and bottom rows) are NOT blanked.
    assert not out[0:20, :].any(), "top far-field must stay unblanked"
    assert not out[60:81, :].any(), "bottom far-field must stay unblanked"
    # The blanked cells cluster around the crack row on the left half.
    assert out[40:50, 0:45].any(), "the bridging band near the crack must be blanked"


def test_endpoint_outside_mask_is_ignored():
    """Edges with an out-of-ROI endpoint are boundary artifacts, not cracks:
    a small ROI that mesh nodes overhang stays bit-exact (None)."""
    xs = np.arange(0, 81, 10, dtype=float)
    ys = np.arange(0, 81, 10, dtype=float)
    X, Y = np.meshgrid(xs, ys)
    pts = np.column_stack([X.ravel(), Y.ravel()])
    tri = Delaunay(pts)
    # ROI covers only the centre; outer nodes are outside it.
    mask = np.zeros((81, 81), dtype=bool)
    mask[25:56, 25:56] = True
    gx, gy = np.meshgrid(np.arange(81), np.arange(81))
    out = cross_crack_cell_mask(tri, pts, gx.astype(float), gy.astype(float), mask)
    # No internal void inside the ROI -> no crossing -> None.
    assert out is None


def test_internal_hole_is_detected(grid_nodes):
    """A triangle spanning an internal hole (not just a crack) is flagged too."""
    pts, tri = grid_nodes
    mask = _solid_mask()
    mask[35:46, 35:46] = False  # square hole in the middle
    cross = cross_crack_simplices(tri.simplices, pts, mask)
    assert cross.any(), "triangles spanning the hole must be flagged"


def test_empty_triangulation():
    assert cross_crack_simplices(np.zeros((0, 3), dtype=np.int64),
                                 np.zeros((0, 2)), _solid_mask()).shape == (0,)


# --- crack_aware_nearest_fill ------------------------------------------------

def test_fill_skips_the_across_crack_node():
    """A cell whose NEAREST node sits across the crack must be filled from the
    reachable same-side node instead, so the crack is not bridged."""
    node_pts = np.array([[10.0, 45.0],    # top side (far), value +1
                         [50.0, 55.0]])   # bottom side (near), value -1
    node_vals = np.array([1.0, -1.0])
    mask = np.ones((100, 100)); mask[49:52, :] = 0.0  # horizontal crack at y~50

    gx = np.array([[48.0]]); gy = np.array([[48.0]])  # a cell just ABOVE the crack
    need = np.array([[True]])

    # Plain nearest grabs the (closer) bottom node across the crack.
    plain = crack_aware_nearest_fill(gx, gy, need, node_pts, node_vals, None)
    assert plain[0, 0] == pytest.approx(-1.0)

    # Crack-aware skips the across-crack node -> the reachable top node.
    aware = crack_aware_nearest_fill(gx, gy, need, node_pts, node_vals, mask)
    assert aware[0, 0] == pytest.approx(1.0)


def test_fill_empty_need_is_all_nan():
    node_pts = np.array([[0.0, 0.0], [10.0, 0.0]])
    node_vals = np.array([1.0, 2.0])
    gx, gy = np.meshgrid(np.arange(10), np.arange(10))
    out = crack_aware_nearest_fill(
        gx.astype(float), gy.astype(float),
        np.zeros((10, 10), bool), node_pts, node_vals, None,
    )
    assert np.isnan(out).all()


def test_fill_only_touches_need_cells():
    node_pts = np.array([[0.0, 0.0], [9.0, 9.0]])
    node_vals = np.array([5.0, 5.0])
    gx, gy = np.meshgrid(np.arange(10), np.arange(10))
    need = np.zeros((10, 10), bool); need[5, 5] = True
    out = crack_aware_nearest_fill(gx.astype(float), gy.astype(float),
                                   need, node_pts, node_vals, None)
    assert out[5, 5] == pytest.approx(5.0)
    assert np.isnan(out[~need]).all()
