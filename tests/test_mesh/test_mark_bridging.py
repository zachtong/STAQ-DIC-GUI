"""Tests for the thin-crack mesh cut (mark_bridging / trimmed_keep_indices).

A continuous masked barrier (a Mode-I crack) far narrower than an element is
ignored by mark_inside's >50% hole rule, so the mesh bridges the two crack
faces. mark_bridging detects and trimmed_keep_indices removes those bridging
elements so the mesh honours the crack -- even though the specimen is globally
one connected region (the faces join around the crack tip).
"""

from __future__ import annotations

import numpy as np

from al_dic.mesh.mark_bridging import mark_bridging, trimmed_keep_indices
from al_dic.mesh.mark_inside import mark_inside
from al_dic.solver.seed_propagation import build_node_adjacency


def _uniform_mesh(h: int, w: int, step: int):
    xs = np.arange(step, w - step + 1, step, dtype=float)
    ys = np.arange(step, h - step + 1, step, dtype=float)
    nx, ny = len(xs), len(ys)
    xx, yy = np.meshgrid(xs, ys, indexing="ij")
    coords = np.column_stack([xx.ravel(), yy.ravel()])
    ii, jj = np.meshgrid(np.arange(nx - 1), np.arange(ny - 1), indexing="ij")
    ii, jj = ii.ravel(), jj.ravel()
    elems = np.full((len(ii), 8), -1, np.int64)
    elems[:, 0] = ii * ny + jj
    elems[:, 1] = (ii + 1) * ny + jj
    elems[:, 2] = (ii + 1) * ny + (jj + 1)
    elems[:, 3] = ii * ny + (jj + 1)
    return coords, elems


def _crack_mask(h, w, cy, x_tip, width=2):
    mask = np.ones((h, w), dtype=np.float64)
    mask[cy - width // 2: cy - width // 2 + width, 0:x_tip] = 0.0
    return mask


def test_no_barrier_no_bridging():
    coords, elems = _uniform_mesh(200, 200, 16)
    assert not mark_bridging(coords, elems, np.ones((200, 200))).any()


def test_thin_crack_flagged_where_mark_inside_misses_it():
    """2-px crack: below the >50% rule, so mark_inside keeps it, but
    mark_bridging cuts it, and only up to the tip."""
    h, w, step, cy, x_tip = 200, 300, 16, 100, 200
    coords, elems = _uniform_mesh(h, w, step)
    mask = _crack_mask(h, w, cy, x_tip, width=2)

    inside, _ = mark_inside(coords, elems, mask)
    assert len(inside) == 0, "a 2-px crack must not trip the >50% hole rule"

    bridging = mark_bridging(coords, elems, mask)
    assert bridging.any(), "thin continuous crack must be detected"
    # Cut lies along the crack and stops before the tip (material wraps the tip)
    assert coords[elems[bridging, 0], 0].max() < x_tip


def test_cut_decouples_crack_faces_but_keeps_global_connection():
    h, w, step, cy, x_tip = 200, 300, 16, 100, 200
    coords, elems = _uniform_mesh(h, w, step)
    mask = _crack_mask(h, w, cy, x_tip, width=2)
    keep = trimmed_keep_indices(coords, elems, mask)
    assert len(keep) < len(elems)

    def node(xv, yv):
        return int(np.argmin(np.hypot(coords[:, 0] - xv, coords[:, 1] - yv)))

    ys = np.unique(coords[:, 1])
    a = node(80, ys[ys < cy].max())   # node row just above the crack
    b = node(80, ys[ys > cy].min())   # node row just below the crack
    before = build_node_adjacency(elems, len(coords))
    after = build_node_adjacency(elems[keep], len(coords))
    assert b in before[a], "faces are bridged before the cut"
    assert b not in after[a], "faces must be decoupled after the cut"


def test_full_width_crack_makes_two_regions():
    """A crack all the way across separates the mesh into two disjoint pieces
    (no element bridges the two halves)."""
    h, w, step, cy = 200, 200, 16, 100
    coords, elems = _uniform_mesh(h, w, step)
    mask = np.ones((h, w), dtype=np.float64)
    mask[cy - 1:cy + 1, :] = 0.0  # 2-px crack edge-to-edge
    keep = trimmed_keep_indices(coords, elems, mask)
    kept = elems[keep]
    top = coords[kept[:, :4].reshape(-1), 1].min()
    # No kept element should span the crack line.
    for e in kept:
        yv = coords[e[:4], 1]
        assert not (yv.min() < cy < yv.max()), "no element may span the crack"
    assert top < cy  # top-side elements survive


def test_small_hole_not_treated_as_cut():
    """A compact internal hole leaves surrounding material one piece -> not a
    bridging cut (mark_inside owns hole removal, mark_bridging stays out)."""
    h, w, step = 200, 200, 16
    coords, elems = _uniform_mesh(h, w, step)
    mask = np.ones((h, w), dtype=np.float64)
    mask[96:104, 96:104] = 0.0  # small blob, material wraps around it
    assert not mark_bridging(coords, elems, mask).any()
