"""node_boundary_distance and the edge-trim / near-barrier it feeds must match
the original full-image distance_transform_edt exactly."""

from __future__ import annotations

import numpy as np
import pytest
from scipy.ndimage import distance_transform_edt

from al_dic.strain.comp_def_grad import edge_valid_mask, node_boundary_distance

RAD, ALPHA = 20.0, 0.7


def _nodes(side=400, step=8, pad=20):
    xs = np.arange(pad, side - pad + 1, step, float)
    X, Y = np.meshgrid(xs, xs, indexing="ij")
    return np.column_stack([X.ravel(), Y.ravel()])


def _masks(side=400):
    m1 = np.zeros((side, side)); m1[20:side - 20, 20:side - 20] = 1.0
    m2 = m1.copy(); m2[side // 2 - 1:side // 2 + 1, 20:side // 2] = 0.0   # crack
    m3 = m1.copy(); m3[side // 3:side // 3 + 15, side // 3:side // 3 + 15] = 0.0  # hole
    m4 = np.ones((side, side)); m4[side // 2 - 1:side // 2 + 1, :side // 2] = 0.0  # touch border
    m5 = np.ones((side, side))  # all foreground
    return {"rect": m1, "crack": m2, "hole": m3, "touch_border": m4, "all_fg": m5}


def _ref_unpadded(coords, mask):
    dt = distance_transform_edt(mask > 0.5)
    H, W = mask.shape
    col = np.clip(np.round(coords[:, 0]).astype(int), 0, W - 1)
    row = np.clip(np.round(coords[:, 1]).astype(int), 0, H - 1)
    return dt[row, col]


def _ref_edge_valid(coords, mask, rad, alpha):
    m = np.pad(mask > 0, 1, mode="constant", constant_values=False)
    dt = distance_transform_edt(m)
    H, W = mask.shape
    col = np.clip(np.round(coords[:, 0]).astype(int), 0, W - 1) + 1
    row = np.clip(np.round(coords[:, 1]).astype(int), 0, H - 1) + 1
    return dt[row, col] >= alpha * rad


@pytest.mark.parametrize("name", ["rect", "crack", "hole", "touch_border", "all_fg"])
def test_node_distance_equals_unpadded_dt(name):
    coords = _nodes()
    mask = _masks()[name]
    d_new = node_boundary_distance(coords, mask)
    d_ref = _ref_unpadded(coords, mask)
    # all-fg -> dt has no zero; ref is a large sentinel, ours is +inf. Compare
    # only the near-barrier decision there.
    if name == "all_fg":
        assert not (d_new < RAD).any() and not (d_ref < RAD).any()
    else:
        assert np.allclose(d_new, d_ref, atol=1e-9)
    # near-barrier bool must match exactly either way
    assert np.array_equal(d_new < RAD, d_ref < RAD)


@pytest.mark.parametrize("name", ["rect", "crack", "hole", "touch_border", "all_fg"])
def test_edge_valid_matches_reference(name):
    coords = _nodes()
    mask = _masks()[name]
    assert np.array_equal(
        edge_valid_mask(coords, mask, RAD, ALPHA),
        _ref_edge_valid(coords, mask, RAD, ALPHA),
    )


def test_edge_valid_shares_node_dist():
    """Passing a precomputed node_dist gives the same result as recomputing."""
    coords = _nodes()
    mask = _masks()["crack"]
    nd = node_boundary_distance(coords, mask)
    assert np.array_equal(
        edge_valid_mask(coords, mask, RAD, ALPHA, node_dist=nd),
        edge_valid_mask(coords, mask, RAD, ALPHA),
    )


def test_alpha_zero_and_no_mask_all_valid():
    coords = _nodes()
    mask = _masks()["crack"]
    assert edge_valid_mask(coords, mask, RAD, 0.0).all()
    assert edge_valid_mask(coords, None, RAD, ALPHA).all()
