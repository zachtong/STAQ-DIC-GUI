"""Integration guard: crack-wake strain with incremental + growing crack.

Rigid-face Mode-I opening: the two faces translate as rigid bodies, so the
TRUE strain in the crack wake (behind the tip, off the crack line) is zero.
Before the crack-aware cumulative transform, the Delaunay composition smeared
``U_accum`` across the open crack (the frame-0 mesh bridges a crack that only
opened later), producing spurious wake strain ~0.3 and an asymmetric,
crack-hugging bright band -- the user-visible bug.

This test runs the REAL pipeline (run_aldic, incremental, per-frame masks)
and asserts:
    * face-node U_accum matches the rigid-body ground truth,
    * crack-line (destroyed) nodes are NaN (dead), not smeared,
    * plane-fit wake strain stays near zero.
"""

from __future__ import annotations

import dataclasses

import numpy as np
import pytest

from al_dic.core.config import dicpara_default
from al_dic.core.data_structures import GridxyROIRange
from al_dic.core.pipeline import run_aldic

from tests.conftest import apply_displacement_lagrangian, generate_speckle

H, W, STEP = 160, 320, 16
PAD, CY = 24, 80
N_DEF = 2                    # deformed frames
TOP, BOT = 1.5, 0.5          # asymmetric rigid opening (top moves 3x)


def _tip(i: int) -> float:
    return 120.0 + 70.0 * i


def _amp(i: int) -> float:
    return 1.6 * i


def _uv(i: int):
    ti, ai = _tip(i), _amp(i)

    def s(x):
        return np.clip((ti - x) / 40.0, 0.0, 1.0) * (x > PAD)

    def u(x, y):
        return 0.002 * (x - PAD)

    def v(x, y):
        return np.where(y < CY, -TOP, BOT) * ai * s(x)

    return u, v


def _mask(i: int) -> np.ndarray:
    m = np.zeros((H, W))
    m[PAD:H - PAD, PAD:W - PAD] = 1.0
    ti, ai = _tip(i), _amp(i)
    xs = np.arange(PAD, int(ti))
    sx = np.clip((ti - xs) / 40.0, 0.0, 1.0)
    for x, sv in zip(xs, sx):
        top = int(round(CY - TOP * ai * sv - 1))
        bot = int(round(CY + BOT * ai * sv + 1))
        m[max(0, top):min(H, bot + 1), x] = 0.0
    return m


@pytest.fixture(scope="module")
def crack_run():
    ref = generate_speckle(H, W, sigma=3.0, seed=5)
    images, masks = [ref], [_mask(0)]
    for i in range(1, N_DEF + 1):
        u, v = _uv(i)
        images.append(apply_displacement_lagrangian(ref, u, v))
        masks.append(_mask(i))

    para = dicpara_default(
        winsize=32, winstepsize=STEP, winsize_min=16, img_size=(H, W),
        gridxy_roi_range=GridxyROIRange(
            gridx=(PAD, W - PAD - 1), gridy=(PAD, H - PAD - 1),
        ),
        reference_mode="incremental", show_plots=False,
    )
    para = dataclasses.replace(
        para,
        method_to_compute_strain=2, strain_plane_fit_rad=20.0,
        strain_edge_trim_alpha=0.7, strain_smoothness=0.0, strain_type=0,
    )
    result = run_aldic(para, images, masks, compute_strain=True)
    return result


class TestCrackWake:
    def test_face_nodes_track_rigid_motion(self, crack_run):
        """Face nodes adjacent to the crack carry the rigid-body value."""
        coords = crack_run.result_fe_mesh_each_frame[0].coordinates_fem
        U = crack_run.result_disp[-1].U_accum
        v = U[1::2]
        i = N_DEF
        ti, ai = _tip(i), _amp(i)
        # Wake columns far behind the tip (full opening, s = 1).
        wake_x = (coords[:, 0] > PAD + 10) & (coords[:, 0] < ti - 60)
        upper = wake_x & (coords[:, 1] > CY - 40) & (coords[:, 1] < CY - 6)
        lower = wake_x & (coords[:, 1] > CY + 6) & (coords[:, 1] < CY + 40)
        assert upper.any() and lower.any()
        vu = v[upper][np.isfinite(v[upper])]
        vl = v[lower][np.isfinite(v[lower])]
        assert len(vu) and len(vl)
        np.testing.assert_allclose(vu, -TOP * ai, atol=0.5)
        np.testing.assert_allclose(vl, BOT * ai, atol=0.5)

    def test_destroyed_crack_line_nodes_are_nan(self, crack_run):
        """Nodes whose material the crack consumed die (NaN), not smear."""
        coords = crack_run.result_fe_mesh_each_frame[0].coordinates_fem
        U = crack_run.result_disp[-1].U_accum
        v = U[1::2]
        ti = _tip(N_DEF)
        on_line = (
            (np.abs(coords[:, 1] - CY) <= 1.5)
            & (coords[:, 0] > PAD + 10) & (coords[:, 0] < ti - 60)
        )
        if on_line.any():
            assert np.isnan(v[on_line]).all()

    def test_wake_strain_near_zero(self, crack_run):
        """Rigid faces -> plane-fit eyy in the wake stays near zero (was ~0.3
        with the cross-crack smeared U_accum)."""
        coords = crack_run.result_fe_mesh_each_frame[0].coordinates_fem
        sr = crack_run.result_strain[-1]
        assert sr is not None
        eyy = np.asarray(sr.strain_eyy, float).copy()
        if sr.strain_valid is not None:
            eyy[~sr.strain_valid] = np.nan
        ti = _tip(N_DEF)
        wake = (
            (coords[:, 0] > PAD + 10) & (coords[:, 0] < ti - 60)
            & (np.abs(coords[:, 1] - CY) > 6)
            & (np.abs(coords[:, 1] - CY) < 45)
        )
        w = eyy[wake]
        w = w[np.isfinite(w)]
        assert len(w) > 10
        assert np.max(np.abs(w)) < 0.05
