"""Reopening a session must leave the ROI toolbar usable.

A user reported that after reopening a saved session the ROI toolbar behaved
as if no Region of Interest existed -- Save logged "mask is empty" -- while Run
worked fine. Two distinct causes, both pinned here:

1. ``apply_session`` assigns ``per_frame_rois`` directly and the signals it
   emits only reach the editing buffer while ``roi_editing`` is on, which it is
   not right after a load. The buffer stayed empty while AppState held the ROI,
   so Save reported an empty mask and an edit overwrote the restored ROI.
2. A session restores the frame that was displayed when it was saved. The ROI
   toolbar acts on the current frame's *own* mask while the solver falls back
   to frame 1's, so on any other frame the toolbar is inert -- and said so with
   a message about the mask rather than the frame.
"""

from __future__ import annotations

import warnings

import cv2
import numpy as np
import pytest
from PySide6.QtWidgets import QApplication, QFileDialog

from al_dic.gui.app_state import AppState


def _safe_disconnect(signal) -> None:
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", RuntimeWarning)
        try:
            signal.disconnect()
        except (RuntimeError, TypeError):
            pass


@pytest.fixture(scope="module")
def qapp():
    return QApplication.instance() or QApplication([])


@pytest.fixture(autouse=True)
def _reset_singleton():
    state = AppState.instance()
    for sig in (
        state.images_changed, state.current_frame_changed,
        state.roi_changed, state.params_changed,
        state.run_state_changed, state.progress_updated,
        state.results_changed, state.display_changed,
        state.log_message,
    ):
        _safe_disconnect(sig)
    state.reset()
    yield
    state.reset()


H, W = 60, 80
ROI_SLICE = (slice(15, 45), slice(20, 60))


def _write_images(folder, n=4):
    folder.mkdir(parents=True, exist_ok=True)
    rng = np.random.default_rng(0)
    for k in range(n):
        cv2.imwrite(str(folder / f"f{k}.png"),
                    (rng.random((H, W)) * 255).astype(np.uint8))
    return folder


def _roi_mask():
    m = np.zeros((H, W), dtype=bool)
    m[ROI_SLICE] = True
    return m


def _make_window(qapp):
    from al_dic.gui.app import MainWindow
    return MainWindow()


def _save_session_viewing(tmp_path, qapp, view_frame: int):
    """Build a project whose ROI lives on frame 0, saved while viewing
    *view_frame*, and return (session_path, roi_pixel_count)."""
    from al_dic.gui.session import save_session

    win = _make_window(qapp)
    win._image_ctrl.load_folder(str(_write_images(tmp_path / "img")))
    win._on_roi_edit_for_frame(0)
    win._roi_ctrl.mask = _roi_mask()
    state = AppState.instance()
    state.set_frame_roi(0, win._roi_ctrl.mask.copy())
    state.set_current_frame(view_frame)

    path = tmp_path / f"view{view_frame}.aldic"
    save_session(path, state, include_results=False)
    return path, int(state.per_frame_rois[0].sum())


def _reopen(tmp_path, qapp, path):
    """Reopen through the real GUI entry point, returning (window, logs)."""
    from al_dic.gui.session import load_session

    win = _make_window(qapp)
    logs: list[str] = []
    AppState.instance().log_message.connect(
        lambda m, lvl="info": logs.append(m)
    )
    win._apply_loaded_session(load_session(path), str(path))
    return win, logs


class TestBufferSyncedOnLoad:
    def test_buffer_matches_restored_roi(self, tmp_path, qapp):
        """The editing buffer must mirror the ROI the session restored."""
        path, n_px = _save_session_viewing(tmp_path, qapp, view_frame=0)
        win, _ = _reopen(tmp_path, qapp, path)

        state = AppState.instance()
        assert int(state.per_frame_rois[0].sum()) == n_px, "ROI data restored"
        assert int(win._roi_ctrl.mask.sum()) == n_px, (
            "ROI controller buffer must mirror the restored mask, not stay empty"
        )

    def test_save_does_not_claim_the_mask_is_empty(self, tmp_path, qapp,
                                                   monkeypatch):
        path, _ = _save_session_viewing(tmp_path, qapp, view_frame=0)
        win, logs = _reopen(tmp_path, qapp, path)
        monkeypatch.setattr(
            QFileDialog, "getSaveFileName", staticmethod(lambda *a, **k: ("", ""))
        )
        logs.clear()
        win._on_roi_save()
        assert not any("empty" in m for m in logs), logs

    def test_drawing_does_not_wipe_the_restored_roi(self, tmp_path, qapp):
        """An edit right after loading must extend the ROI, not replace it."""
        path, n_px = _save_session_viewing(tmp_path, qapp, view_frame=0)
        win, _ = _reopen(tmp_path, qapp, path)
        state = AppState.instance()

        win._enter_roi_editing()
        stroke = np.zeros((H, W), dtype=bool)
        stroke[0:5, 0:5] = True
        win._roi_ctrl.mask |= stroke
        state.set_frame_roi(state.current_frame, win._roi_ctrl.mask.copy())

        assert int(state.per_frame_rois[0].sum()) == n_px + 25


class TestFrameWithoutOwnRoi:
    """A session saved while browsing lands on a frame that has no own ROI."""

    def test_session_restores_the_viewed_frame(self, tmp_path, qapp):
        path, _ = _save_session_viewing(tmp_path, qapp, view_frame=2)
        _reopen(tmp_path, qapp, path)
        assert AppState.instance().current_frame == 2

    def test_save_message_names_the_frame_not_the_mask(self, tmp_path, qapp,
                                                      monkeypatch):
        path, _ = _save_session_viewing(tmp_path, qapp, view_frame=2)
        win, logs = _reopen(tmp_path, qapp, path)
        monkeypatch.setattr(
            QFileDialog, "getSaveFileName", staticmethod(lambda *a, **k: ("", ""))
        )
        logs.clear()
        win._on_roi_save()

        assert logs, "Save must explain why nothing was written"
        msg = logs[-1]
        assert "3" in msg, f"should name the frame the user is on: {msg!r}"
        assert "mask is empty" not in msg, (
            f"must not blame the mask when the frame is the reason: {msg!r}"
        )

    def test_invert_does_not_invent_a_whole_image_roi(self, tmp_path, qapp):
        """Inverting an empty buffer would hand the frame the entire image."""
        path, n_px = _save_session_viewing(tmp_path, qapp, view_frame=2)
        win, logs = _reopen(tmp_path, qapp, path)
        state = AppState.instance()

        logs.clear()
        win._on_roi_invert()

        assert 2 not in state.per_frame_rois, (
            "must not create a per-frame ROI for a frame the user never drew on"
        )
        assert int(state.per_frame_rois[0].sum()) == n_px, "frame 1 ROI intact"
        assert logs and "mask is empty" not in logs[-1]
