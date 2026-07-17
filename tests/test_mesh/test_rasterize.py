"""Tests for rasterize_element_mask -- mesh footprint back to a pixel mask.

A trimmed mesh (crack-cut) must rasterise to a mask whose crack shows up as a
gap, so strain edge-trim + crack-aware plane fitting can consume the per-frame
crack geometry.
"""

from __future__ import annotations

import numpy as np

from al_dic.mesh.rasterize import rasterize_element_mask


def _uniform_grid(h: int, w: int, step: int):
    """Uniform Q8 mesh (corners only populated) over [step, w-step] x [step, h-step]."""
    xs = np.arange(step, w - step + 1, step, dtype=float)
    ys = np.arange(step, h - step + 1, step, dtype=float)
    XX, YY = np.meshgrid(xs, ys, indexing="ij")
    coords = np.column_stack([XX.ravel(), YY.ravel()])
    nx, ny = len(xs), len(ys)
    ii, jj = np.meshgrid(np.arange(nx - 1), np.arange(ny - 1), indexing="ij")
    ii, jj = ii.ravel(), jj.ravel()
    elems = np.full((len(ii), 8), -1, np.int64)
    elems[:, 0] = ii * ny + jj
    elems[:, 1] = (ii + 1) * ny + jj
    elems[:, 2] = (ii + 1) * ny + (jj + 1)
    elems[:, 3] = ii * ny + (jj + 1)
    return coords, elems


def test_empty_elements_all_zero():
    coords, _ = _uniform_grid(100, 100, 10)
    mask = rasterize_element_mask(coords, np.empty((0, 8), np.int64), (100, 100))
    assert mask.shape == (100, 100)
    assert not mask.any()


def test_full_mesh_fills_interior():
    coords, elems = _uniform_grid(120, 160, 10)
    mask = rasterize_element_mask(coords, elems, (120, 160))
    # Interior of the meshed region is material.
    assert mask[60, 80] == 1.0
    # Well outside the mesh footprint (image corner) is empty.
    assert mask[2, 2] == 0.0


def test_removed_element_band_leaves_a_gap():
    """Removing a horizontal band of elements (a crack) leaves a 0 gap that the
    surviving neighbours on either side do not fill."""
    h, w, step = 120, 200, 10
    coords, elems = _uniform_grid(h, w, step)
    cy = h // 2
    # Remove a ~2-element-tall band of elements over the left half (a crack).
    # Select by centroid so the band lands between node rows, not on one.
    centroid = coords[elems[:, :4]].mean(axis=1)  # (n_elem, 2)
    crack = (np.abs(centroid[:, 1] - cy) < step) & (centroid[:, 0] < w * 0.5)
    keep = elems[~crack]

    full = rasterize_element_mask(coords, elems, (h, w))
    cracked = rasterize_element_mask(coords, keep, (h, w))

    # The full mesh has material across cy on the left; the cracked one has a gap.
    assert full[cy, int(w * 0.25)] == 1.0
    assert cracked[cy, int(w * 0.25)] == 0.0
    # Right of the crack (x > w/2) both still material.
    assert cracked[cy, int(w * 0.75)] == 1.0
    # The cracked mask is a strict subset of the full mask.
    assert cracked.sum() < full.sum()
    assert np.all(cracked <= full)
