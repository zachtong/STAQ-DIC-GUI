"""Tests for StrainController -- post-pipeline strain computation."""

from __future__ import annotations

import numpy as np
import pytest
from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

from al_dic.core.data_structures import StrainResult
from al_dic.gui.app_state import AppState
from al_dic.gui.controllers.strain_controller import (
    ALLOWED_OVERRIDES,
    StrainController,
)

from ._helpers import make_synthetic_pipeline_result


@pytest.fixture
def state_with_results():
    """AppState pre-populated with a synthetic pure-shear PipelineResult."""
    state = AppState()
    result, mask = make_synthetic_pipeline_result(
        n_frames=3, shear=0.01, img_shape=(256, 256), step=16,
    )
    state.results = result
    state.per_frame_rois[0] = mask.astype(bool)
    return state


@pytest.fixture
def empty_state():
    """AppState with no images and no results."""
    return AppState()


class TestComputeAllFrames:
    def test_compute_all_frames_returns_strain_results(
        self, state_with_results,
    ):
        ctrl = StrainController(state_with_results)
        out = ctrl.compute_all_frames(override={})
        assert isinstance(out, list)
        assert len(out) == len(state_with_results.results.result_disp)
        for sr in out:
            assert isinstance(sr, StrainResult)
            assert sr.strain_exx is not None
            assert sr.strain_exy is not None
            assert sr.strain_eyy is not None

    def test_compute_writes_back_to_state_results(self, state_with_results):
        ctrl = StrainController(state_with_results)
        ctrl.compute_and_store(override={})
        assert state_with_results.results is not None
        assert len(state_with_results.results.result_strain) > 0
        assert isinstance(
            state_with_results.results.result_strain[0], StrainResult,
        )

    def test_compute_emits_results_changed(self, state_with_results):
        ctrl = StrainController(state_with_results)
        received = []
        state_with_results.results_changed.connect(
            lambda: received.append(True)
        )
        ctrl.compute_and_store(override={})
        assert len(received) == 1

    def test_override_does_not_mutate_base_para(self, state_with_results):
        original_rad = state_with_results.results.dic_para.strain_plane_fit_rad
        ctrl = StrainController(state_with_results)
        # Pick a VSG radius safely above subset_step (fixture uses
        # subset_step=16) so we don't trip the v0.4.1 plane-fit guard
        # (which would mask this test's real purpose — verifying para
        # immutability — with a ValueError).
        ctrl.compute_all_frames(override={"strain_plane_fit_rad": 25.0})
        # Base para must remain frozen / unchanged
        assert (
            state_with_results.results.dic_para.strain_plane_fit_rad
            == original_rad
        )

    def test_no_results_raises(self, empty_state):
        ctrl = StrainController(empty_state)
        with pytest.raises(RuntimeError):
            ctrl.compute_all_frames(override={})

    def test_progress_callback_invoked_per_frame(self, state_with_results):
        ctrl = StrainController(state_with_results)
        events: list[tuple[float, str]] = []
        ctrl.compute_all_frames(
            override={},
            progress_cb=lambda f, m: events.append((f, m)),
        )
        n_frames = len(state_with_results.results.result_disp)
        assert len(events) >= n_frames
        # progress is monotonically non-decreasing
        fractions = [f for f, _ in events]
        assert fractions == sorted(fractions)
        assert 0.0 <= fractions[0] <= 1.0
        assert 0.0 <= fractions[-1] <= 1.0

    def test_forbidden_override_rejected(self, state_with_results):
        ctrl = StrainController(state_with_results)
        with pytest.raises(ValueError, match="winsize"):
            ctrl.compute_all_frames(override={"winsize": 64})

    def test_allowed_override_set_is_strict(self):
        # The five allowed keys correspond to the public strain knobs.
        assert ALLOWED_OVERRIDES == frozenset({
            "method_to_compute_strain",
            "strain_plane_fit_rad",
            "strain_smoothness",
            "strain_type",
            "strain_edge_trim_alpha",
        })


class TestReferenceMaskResolution:
    """Strain must use the FRAME-0 reference mask, not the last-frame mask left
    in ``dic_para.img_ref_mask`` by an incremental pipeline run (which would be
    inconsistent with the frame-0 mesh + U_accum used for strain)."""

    def test_prefers_frame0_roi_over_last_frame_dicpara_mask(
        self, state_with_results,
    ):
        from dataclasses import replace as _dc_replace

        result = state_with_results.results
        h, w = result.dic_para.img_ref_mask.shape
        # Frame-0 reference ROI (what the frame-0 mesh + U_accum agree with).
        frame0 = np.zeros((h, w), dtype=bool)
        frame0[10:h - 10, 10:w - 10] = True
        # A DIFFERENT "last-frame" mask (grown crack) contaminating dic_para.
        last = np.ones((h, w), dtype=np.float64)
        last[h // 2 - 1:h // 2 + 1, :] = 0.0

        state_with_results.per_frame_rois[0] = frame0
        state_with_results.results = _dc_replace(
            result,
            dic_para=_dc_replace(result.dic_para, img_ref_mask=last),
        )
        ctrl = StrainController(state_with_results)
        resolved = ctrl._resolve_reference_mask(state_with_results.results)
        np.testing.assert_array_equal(resolved, frame0.astype(np.float64))

    def test_falls_back_to_dicpara_mask_without_gui_roi(
        self, state_with_results,
    ):
        from dataclasses import replace as _dc_replace

        result = state_with_results.results
        h, w = result.dic_para.img_ref_mask.shape
        marker = np.full((h, w), 0.5, dtype=np.float64)
        state_with_results.per_frame_rois.clear()
        state_with_results.results = _dc_replace(
            result,
            dic_para=_dc_replace(result.dic_para, img_ref_mask=marker),
        )
        ctrl = StrainController(state_with_results)
        resolved = ctrl._resolve_reference_mask(state_with_results.results)
        np.testing.assert_array_equal(resolved, marker)


class TestPerFrameCrack:
    """Strain edge-trim must follow each frame's OWN crack (rasterised from the
    per-frame mesh), not freeze on a single frame-0 mask.  A growing crack means
    a later frame is trimmed differently from frame 0."""

    def test_grown_crack_trims_more_than_frame0(self, state_with_results):
        from dataclasses import replace as _dc_replace

        result = state_with_results.results
        ref_mesh = result.result_fe_mesh_each_frame[0]
        coords = ref_mesh.coordinates_fem
        elems = ref_mesh.elements_fem
        mask0 = state_with_results.per_frame_rois[0]
        h, w = mask0.shape
        cy = h // 2
        step = float(np.min(np.diff(np.unique(coords[:, 1]))))

        # Build a "cracked" mesh: drop a ~2-element-tall band over the left half
        # (a Mode-I crack) -- same coords, fewer elements.  Select by centroid so
        # the band lands between node rows, not on one.
        centroid = coords[elems[:, :4]].mean(axis=1)  # (n_elem, 2)
        crack = (np.abs(centroid[:, 1] - cy) < step) & (centroid[:, 0] < w * 0.5)
        cracked_mesh = _dc_replace(ref_mesh, elements_fem=elems[~crack])

        # Frame 0 uncracked, last frame cracked.
        meshes = list(result.result_fe_mesh_each_frame)
        meshes[0] = ref_mesh
        meshes[-1] = cracked_mesh
        state_with_results.results = _dc_replace(
            result, result_fe_mesh_each_frame=meshes,
        )

        ctrl = StrainController(state_with_results)
        out = ctrl.compute_all_frames(override={})  # method 2 -> strain_valid
        sv0 = out[0].strain_valid
        sv_last = out[-1].strain_valid
        assert sv0 is not None and sv_last is not None
        # The cracked frame trims strictly more nodes (crack band + its edge).
        assert int((~sv_last).sum()) > int((~sv0).sum())
        # And the trims are not identical (per-frame, not frozen frame-0).
        assert not np.array_equal(sv0, sv_last)


class TestPureShearAccuracy:
    def test_pure_shear_recovers_exy(self, state_with_results):
        """u = shear * y, v = 0  ->  exy = 0.5 * du/dy = 0.5 * shear."""
        ctrl = StrainController(state_with_results)
        out = ctrl.compute_all_frames(override={})

        # Frame 0 of result_disp corresponds to deformation between
        # reference frame and the *first* deformed frame.
        sr = out[0]
        exy = sr.strain_exy
        assert exy is not None

        # Pick interior nodes (avoid boundary plane-fit edge effects)
        coords = state_with_results.results.dic_mesh.coordinates_fem
        h, w = 256, 256
        margin = 48
        interior = (
            (coords[:, 0] >= margin)
            & (coords[:, 0] <= w - margin)
            & (coords[:, 1] >= margin)
            & (coords[:, 1] <= h - margin)
        )
        # Per the test fixture: shear=0.01, frame 0 -> u_accum = 1*0.01*y
        # exy = 0.5 * (du/dy + dv/dx) = 0.5 * 0.01 = 0.005 in image coords.
        # ``compute_strain`` flips y to world convention so the sign on exy
        # is inverted; the magnitude must match exactly.
        gt_exy_mag = 0.005
        assert np.allclose(np.abs(exy[interior]), gt_exy_mag, atol=5e-4)
