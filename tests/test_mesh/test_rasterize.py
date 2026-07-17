"""Tests for rasterize_element_mask -- mesh footprint back to a pixel mask.

A trimmed mesh (crack-cut) must rasterise to a mask whose crack shows up as a
gap, so strain edge-trim + crack-aware plane fitting can consume the per-frame
crack geometry.
"""

from __future__ import annotations

import numpy as np

from al_dic.mesh.rasterize import crack_mask_from_deformed, rasterize_element_mask
from al_dic.strain.comp_def_grad import edge_valid_mask


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


class TestCrackMaskFromDeformed:
    """A deformed-frame crack must be warped back to the reference position so
    the trim is symmetric about both faces -- not offset like a raw rasterisation
    of the deformed-cut mesh."""

    def _mesh(self, h, w, step):
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

    def test_zero_displacement_is_identity_cut(self):
        """With U=0 the warp reduces to cutting at the reference positions."""
        h, w, step = 200, 400, 12
        coords, elems = self._mesh(h, w, step)
        cy = h // 2
        dm = np.ones((h, w), np.float64)
        dm[cy:cy + 1, 12: w // 2] = 0.0                 # thin crack, left half
        u0 = np.zeros(2 * coords.shape[0])
        mask, kept = crack_mask_from_deformed(coords, elems, u0, dm, (h, w))
        # gap present at the crack line, none far from it
        assert mask[cy, w // 4] == 0.0
        assert mask[cy, int(w * 0.8)] == 1.0
        assert kept.shape[0] < elems.shape[0]

    def test_offset_deformation_recentres_the_gap(self):
        """Top face displaced up by A: a raw cut at reference positions would put
        the gap at the offset (up) location and trim only the top; the warp puts
        it back on the crack line -> symmetric trim on both faces."""
        h, w, step = 320, 640, 12
        coords, elems = self._mesh(h, w, step)
        cy = h // 2
        A = 42
        # Deformed mask: crack gap sits at [cy-A, cy] (offset up from cy).
        dm = np.ones((h, w), np.float64)
        dm[cy - A:cy, 12: w // 2] = 0.0
        # U_accum: top face (y < cy) moved up by A over the crack span.
        u = np.zeros(2 * coords.shape[0])
        top = (coords[:, 1] < cy) & (coords[:, 0] < w // 2)
        u[1::2] = np.where(top, -A, 0.0)

        mask, _ = crack_mask_from_deformed(coords, elems, u, dm, (h, w))
        valid = edge_valid_mask(coords, mask, 20.0, 0.7)
        trimmed = ~valid
        near = (coords[:, 0] < w // 2) & (np.abs(coords[:, 1] - cy) < 60)
        above = int((trimmed & near & (coords[:, 1] < cy)).sum())
        below = int((trimmed & near & (coords[:, 1] > cy)).sum())
        assert above > 0 and below > 0
        assert min(above, below) >= 0.5 * max(above, below)
