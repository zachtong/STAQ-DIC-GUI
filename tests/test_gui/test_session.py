"""Tests for session save / load.

Covers the round-trip (parameters + Regions of Interest), file-format
validation, schema-version checking, and graceful handling of missing
image folders.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pytest
from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

from al_dic.gui.app_state import AppState
from al_dic.gui.session import (
    SCHEMA_VERSION,
    SessionError,
    SessionData,
    apply_session,
    load_session,
    save_session,
)


@pytest.fixture(autouse=True)
def reset_state():
    AppState._instance = None
    yield
    AppState._instance = None


@pytest.fixture
def populated_state(tmp_path):
    """An AppState with non-default values and a couple of ROIs."""
    state = AppState.instance()
    state.image_folder = tmp_path
    state.image_files = ["a.tif", "b.tif", "c.tif"]
    state.subset_size = 32
    state.subset_step = 8
    state.search_range = 50
    state.tracking_mode = "incremental"
    state.inc_ref_mode = "every_n"
    state.inc_ref_interval = 5
    state.use_admm = False
    state.admm_max_iter = 5

    # Add two Regions of Interest of different sizes
    rng = np.random.default_rng(42)
    roi0 = rng.random((64, 64)) > 0.5
    roi1 = rng.random((64, 64)) > 0.7
    state.per_frame_rois = {0: roi0, 2: roi1}
    return state


class _StubImageCtrl:
    def __init__(self) -> None:
        self.loaded_folders: list[Path] = []

    def load_folder(self, folder: Path) -> None:
        self.loaded_folders.append(folder)


# ---------------------------------------------------------------------
# Round-trip
# ---------------------------------------------------------------------

def test_round_trip_preserves_parameters(populated_state, tmp_path):
    path = tmp_path / "session.aldic.json"
    save_session(path, populated_state)

    session = load_session(path)
    assert session.schema_version == SCHEMA_VERSION
    assert session.params["subset_size"] == 32
    assert session.params["subset_step"] == 8
    assert session.params["search_range"] == 50
    assert session.params["tracking_mode"] == "incremental"
    assert session.params["inc_ref_mode"] == "every_n"
    assert session.params["inc_ref_interval"] == 5
    assert session.params["use_admm"] is False
    assert session.params["admm_max_iter"] == 5


def test_round_trip_preserves_roi_masks(populated_state, tmp_path):
    path = tmp_path / "session.aldic.json"
    save_session(path, populated_state)

    session = load_session(path)
    assert set(session.per_frame_rois.keys()) == {0, 2}
    for fidx, original in populated_state.per_frame_rois.items():
        restored = session.per_frame_rois[fidx]
        assert restored.shape == original.shape
        assert restored.dtype == np.bool_
        assert np.array_equal(restored, original)


def test_round_trip_preserves_image_folder(populated_state, tmp_path):
    path = tmp_path / "session.aldic.json"
    save_session(path, populated_state)
    session = load_session(path)
    assert session.image_folder == str(populated_state.image_folder)
    assert session.image_files == ["a.tif", "b.tif", "c.tif"]


# ---------------------------------------------------------------------
# Error handling
# ---------------------------------------------------------------------

def test_load_missing_file_raises(tmp_path):
    with pytest.raises(SessionError, match="Cannot open"):
        load_session(tmp_path / "does_not_exist.aldic.json")


def test_load_invalid_json_raises(tmp_path):
    path = tmp_path / "bad.aldic.json"
    path.write_text("not json at all {{", encoding="utf-8")
    with pytest.raises(SessionError, match="not valid JSON"):
        load_session(path)


def test_load_wrong_schema_version_raises(tmp_path):
    path = tmp_path / "future.aldic.json"
    path.write_text(
        json.dumps({"schema_version": 9999, "image_files": []}),
        encoding="utf-8",
    )
    with pytest.raises(SessionError, match="schema version"):
        load_session(path)


def test_load_non_object_root_raises(tmp_path):
    path = tmp_path / "array.aldic.json"
    path.write_text(json.dumps([1, 2, 3]), encoding="utf-8")
    with pytest.raises(SessionError, match="JSON object"):
        load_session(path)


# ---------------------------------------------------------------------
# Apply
# ---------------------------------------------------------------------

def test_apply_restores_params_to_state(populated_state, tmp_path):
    path = tmp_path / "session.aldic.json"
    save_session(path, populated_state)

    # Reset state to defaults then apply
    AppState._instance = None
    fresh = AppState.instance()
    assert fresh.subset_size != 32   # sanity: default differs

    session = load_session(path)
    apply_session(session, fresh, _StubImageCtrl())
    assert fresh.subset_size == 32
    assert fresh.tracking_mode == "incremental"
    assert fresh.inc_ref_interval == 5


def test_apply_missing_image_folder_warns_not_raises(tmp_path):
    """If the image folder in the session no longer exists, apply should
    log a warning but still restore parameters so the user can recover."""
    session = SessionData(
        schema_version=SCHEMA_VERSION,
        image_folder=str(tmp_path / "gone_forever"),
        image_files=["x.tif"],
        per_frame_rois={},
        params={"subset_size": 28},
        physical_units={},
    )
    state = AppState.instance()
    warnings: list[str] = []
    state.log_message.connect(
        lambda msg, lvl: (warnings.append((msg, lvl)) if lvl == "warn" else None)
    )
    apply_session(session, state, _StubImageCtrl())
    assert state.subset_size == 28
    assert any("no longer exists" in m.lower() for m, _ in warnings)


# ---------------------------------------------------------------------
# Image relink after the project moved
# ---------------------------------------------------------------------

def _moved_session(saved_folder="D:/old/place/images", name="a.tif"):
    return SessionData(
        schema_version=SCHEMA_VERSION,
        image_folder=saved_folder,
        image_files=[saved_folder + "/" + name],
        per_frame_rois={},
        params={},
        physical_units={},
    )


def test_resolve_prefers_existing_saved_folder(tmp_path):
    from al_dic.gui.session import _resolve_image_folder

    imgs = tmp_path / "images"
    imgs.mkdir()
    (imgs / "a.tif").write_bytes(b"x")
    session = _moved_session(saved_folder=str(imgs))
    assert _resolve_image_folder(session, tmp_path / "run.aldic") == str(imgs)


def test_resolve_relocates_same_named_subfolder(tmp_path):
    """Whole project moved: saved absolute path gone, images sit in a same-named
    subfolder beside the .aldic."""
    from al_dic.gui.session import _resolve_image_folder

    (tmp_path / "images").mkdir()
    (tmp_path / "images" / "a.tif").write_bytes(b"x")
    got = _resolve_image_folder(_moved_session(), tmp_path / "run.aldic")
    assert got == str(tmp_path / "images")


def test_resolve_relocates_flat_beside_aldic(tmp_path):
    """Images sit directly beside the .aldic file."""
    from al_dic.gui.session import _resolve_image_folder

    (tmp_path / "a.tif").write_bytes(b"x")
    got = _resolve_image_folder(_moved_session(), tmp_path / "run.aldic")
    assert got == str(tmp_path)


def test_resolve_rejects_dir_without_the_image(tmp_path):
    """A candidate that does NOT hold the session's first image is not adopted."""
    from al_dic.gui.session import _resolve_image_folder

    (tmp_path / "other.tif").write_bytes(b"x")  # wrong file
    assert _resolve_image_folder(_moved_session(), tmp_path / "run.aldic") is None


def test_resolve_none_without_session_path(tmp_path):
    from al_dic.gui.session import _resolve_image_folder

    assert _resolve_image_folder(_moved_session(), None) is None


def test_apply_relocates_images_without_prompt(tmp_path):
    """apply_session loads the relocated folder via session_path, no prompt."""
    (tmp_path / "images").mkdir()
    (tmp_path / "images" / "a.tif").write_bytes(b"x")
    ctrl = _StubImageCtrl()
    apply_session(
        _moved_session(), AppState.instance(), ctrl,
        session_path=str(tmp_path / "run.aldic"),
    )
    assert ctrl.loaded_folders == [str(tmp_path / "images")]


def test_apply_prompts_when_unresolvable(tmp_path):
    """Unresolvable folder -> the GUI locate callback is invoked and its choice
    is loaded."""
    picked = tmp_path / "elsewhere"
    picked.mkdir()
    (picked / "a.tif").write_bytes(b"x")
    ctrl = _StubImageCtrl()
    calls: list[str] = []

    def cb(missing):
        calls.append(missing)
        return str(picked)

    apply_session(
        _moved_session(), AppState.instance(), ctrl,
        session_path=str(tmp_path / "nowhere" / "run.aldic"),
        locate_folder_cb=cb,
    )
    assert calls == ["D:/old/place/images"]
    assert ctrl.loaded_folders == [str(picked)]


def test_apply_cancelled_prompt_leaves_images_unloaded(tmp_path):
    """If the user cancels the locate dialog (cb returns None), no folder is
    loaded and a warning is logged -- results (restored later) are untouched."""
    ctrl = _StubImageCtrl()
    state = AppState.instance()
    warnings: list[str] = []
    state.log_message.connect(
        lambda m, lvl: warnings.append(m) if lvl == "warn" else None
    )
    apply_session(
        _moved_session(), state, ctrl,
        session_path=str(tmp_path / "nowhere" / "run.aldic"),
        locate_folder_cb=lambda _missing: None,
    )
    assert ctrl.loaded_folders == []
    assert any("re-selected manually" in m for m in warnings)


# ---------------------------------------------------------------------
# Mask encoding
# ---------------------------------------------------------------------

def test_mask_encoding_handles_all_true():
    """Edge case: all-true mask must survive a round trip."""
    from al_dic.gui.session import _decode_mask, _encode_mask

    mask = np.ones((32, 48), dtype=bool)
    restored = _decode_mask(_encode_mask(mask))
    assert restored.shape == mask.shape
    assert restored.all()


def test_mask_encoding_handles_all_false():
    from al_dic.gui.session import _decode_mask, _encode_mask

    mask = np.zeros((32, 48), dtype=bool)
    restored = _decode_mask(_encode_mask(mask))
    assert restored.shape == mask.shape
    assert not restored.any()
