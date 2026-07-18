"""Tests for crack-aware element interpolation (mesh/element_interp.py).

ElementInterpolator must reproduce linear fields exactly inside axis-aligned
quads, never mix the two faces of a cut crack, and leave gap points
unresolved.  GapSuspector must be a conservative superset of "within radius of
a masked pixel"; no_material_nearby must separate deep-gap points from
boundary jitter.
"""

from __future__ import annotations

import numpy as np

from al_dic.mesh.element_interp import (
    ElementInterpolator,
    GapSuspector,
    majority_masked,
)


def _grid_mesh(h: int, w: int, step: int):
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


class TestElementInterpolator:
    def test_linear_field_reproduced_exactly(self):
        """Bilinear interpolation is exact for u = a + b*x + c*y."""
        coords, elems = _grid_mesh(100, 100, 16)
        u = 1.0 + 0.02 * coords[:, 0] - 0.01 * coords[:, 1]
        v = -0.5 + 0.005 * coords[:, 0] + 0.03 * coords[:, 1]
        ei = ElementInterpolator(coords, elems)
        q = np.array([[30.0, 40.0], [50.5, 33.2], [70.0, 70.0]])
        uq, vq, ok = ei.interpolate_uv(u, v, q)
        assert ok.all()
        np.testing.assert_allclose(uq, 1.0 + 0.02 * q[:, 0] - 0.01 * q[:, 1],
                                   atol=1e-12)
        np.testing.assert_allclose(vq, -0.5 + 0.005 * q[:, 0] + 0.03 * q[:, 1],
                                   atol=1e-12)

    def test_corner_order_shuffle_invariance(self):
        """Weights are corner-order independent (mesh generators differ)."""
        coords, elems = _grid_mesh(100, 100, 16)
        u = 0.01 * coords[:, 0] * 0 + coords[:, 1] * 0.02
        v = np.zeros(len(coords))
        rng = np.random.default_rng(3)
        shuffled = elems.copy()
        for r in range(shuffled.shape[0]):
            shuffled[r, :4] = rng.permutation(shuffled[r, :4])
        q = np.array([[45.3, 52.8]])
        u1, _, ok1 = ElementInterpolator(coords, elems).interpolate_uv(u, v, q)
        u2, _, ok2 = ElementInterpolator(coords, shuffled).interpolate_uv(u, v, q)
        assert ok1.all() and ok2.all()
        np.testing.assert_allclose(u1, u2, atol=1e-12)

    def test_no_cross_face_mixing_at_a_cut(self):
        """Faces of a removed element band never blend: a query on the upper
        face returns the upper-face value even right at the crack lip."""
        h, w, step = 120, 200, 16
        coords, elems = _grid_mesh(h, w, step)
        cy = 64.0  # element boundary row between node rows 48/64? nodes at 16,32,...
        # Remove the band of elements whose centroid y is in (48, 80): a
        # 2-element-tall horizontal cut across the full width.
        cent = coords[elems[:, :4]].mean(axis=1)
        cut = (cent[:, 1] > 48) & (cent[:, 1] < 80)
        kept = elems[~cut]
        # Step field: upper face value -5, lower face +5.
        u = np.where(coords[:, 1] <= 48, -5.0, 5.0)
        v = np.zeros(len(coords))
        ei = ElementInterpolator(coords, kept)
        q = np.array([
            [100.0, 47.9],   # just above the cut: upper face
            [100.0, 80.1],   # just below the cut: lower face
            [100.0, 64.0],   # mid-gap
        ])
        uq, _, ok = ei.interpolate_uv(u, v, q)
        assert ok[0] and uq[0] == -5.0
        assert ok[1] and uq[1] == 5.0
        assert not ok[2]  # gap point resolves to nothing

    def test_eps_slack_keeps_boundary_jitter(self):
        """A point 0.5 px outside the outermost element still resolves."""
        coords, elems = _grid_mesh(100, 100, 16)
        u = np.full(len(coords), 2.0)
        v = np.zeros(len(coords))
        ei = ElementInterpolator(coords, elems, eps=1.0)
        # Mesh spans [16, 96]; query just outside.
        uq, _, ok = ei.interpolate_uv(u, v, np.array([[15.5, 50.0]]))
        assert ok[0]
        np.testing.assert_allclose(uq[0], 2.0, atol=1e-12)

    def test_nan_corner_leaves_unresolved(self):
        coords, elems = _grid_mesh(100, 100, 16)
        u = np.zeros(len(coords))
        u[0] = np.nan  # corner of the first element
        v = np.zeros(len(coords))
        ei = ElementInterpolator(coords, elems)
        # Query inside the element that uses node 0 as a corner.
        uq, _, ok = ei.interpolate_uv(u, v, np.array([[20.0, 20.0]]))
        assert not ok[0]
        assert np.isnan(uq[0])

    def test_non_rect_elements_skipped(self):
        coords = np.array([[0, 0], [10, 2], [12, 12], [1, 9]], float)  # skewed
        elems = np.array([[0, 1, 2, 3, -1, -1, -1, -1]], np.int64)
        ei = ElementInterpolator(coords, elems)
        _, _, ok = ei.interpolate_uv(
            np.zeros(4), np.zeros(4), np.array([[5.0, 5.0]]),
        )
        assert not ok[0]


class TestGapSuspector:
    def test_superset_of_true_radius(self):
        """Every point within radius of a masked pixel is flagged."""
        mask = np.ones((120, 200))
        mask[60:62, 20:150] = 0.0  # thin crack
        radius = 24.0
        gs = GapSuspector(mask, radius)
        rng = np.random.default_rng(0)
        pts = np.column_stack([
            rng.uniform(0, 200, 500), rng.uniform(0, 120, 500),
        ])
        flags = gs.flag(pts)
        # ground truth: distance to the crack rectangle
        dx = np.maximum(np.maximum(20 - pts[:, 0], pts[:, 0] - 149), 0)
        dy = np.maximum(np.maximum(60 - pts[:, 1], pts[:, 1] - 61), 0)
        within = np.hypot(dx, dy) <= radius
        assert flags[within].all()  # no false negatives

    def test_far_interior_not_flagged(self):
        mask = np.ones((256, 256))
        mask[100:102, 10:120] = 0.0
        gs = GapSuspector(mask, radius=16.0)
        # ~100 px away from the crack, interior of an all-ones region
        assert not gs.flag(np.array([[200.0, 220.0]]))[0]

    def test_nonfinite_points_flag_false(self):
        mask = np.zeros((64, 64))
        gs = GapSuspector(mask, radius=8.0)
        flags = gs.flag(np.array([[np.nan, 10.0], [10.0, 10.0]]))
        assert not flags[0]
        assert flags[1]


class TestMajorityMasked:
    def test_deep_gap_is_dead(self):
        mask = np.ones((100, 100))
        mask[40:60, :] = 0.0  # 20-px open gap
        dead = majority_masked(np.array([[50.0, 50.0]]), mask)
        assert dead[0]

    def test_gap_edge_smear_is_dead(self):
        """A point smeared just inside the gap edge sees a masked majority."""
        mask = np.ones((100, 100))
        mask[40:60, :] = 0.0
        dead = majority_masked(np.array([[50.0, 40.6]]), mask)
        assert dead[0]

    def test_node_on_material_lip_survives(self):
        """A live node on the last material row keeps a material majority."""
        mask = np.ones((100, 100))
        mask[40:60, :] = 0.0
        dead = majority_masked(np.array([[50.0, 39.0]]), mask)
        assert not dead[0]

    def test_node_on_straight_roi_border_survives(self):
        """A node sitting exactly ON a straight ROI border pixel: half-plane
        masked is not a strict majority."""
        mask = np.zeros((100, 100))
        mask[:, 24:] = 1.0  # ROI starts at column 24
        dead = majority_masked(np.array([[24.0, 50.0]]), mask)
        assert not dead[0]

    def test_outside_image_kept(self):
        mask = np.ones((50, 50))
        dead = majority_masked(np.array([[-30.0, -30.0]]), mask)
        assert not dead[0]
