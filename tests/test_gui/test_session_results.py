"""Tests for schema-2 sessions: results persistence, view state, bundle format."""

from __future__ import annotations

import json
import zipfile
from pathlib import Path

import numpy as np
import pytest
from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

from al_dic.core.data_structures import (
    DICMesh, DICPara, FrameResult, FrameSchedule, PipelineResult, StrainResult,
)
from al_dic.gui.app_state import AppState, RunState
from al_dic.gui.session import (
    SCHEMA_VERSION, apply_session, load_session, save_session,
)


@pytest.fixture(autouse=True)
def reset_state():
    AppState._instance = None
    yield
    AppState._instance = None


def _result(n_frames=4, img=128):
    xs, ys = np.meshgrid(np.linspace(8, img - 8, 6), np.linspace(8, img - 8, 5))
    coords = np.column_stack([xs.ravel(), ys.ravel()]).astype(np.float64)
    n = coords.shape[0]
    mesh = DICMesh(coordinates_fem=coords, elements_fem=np.zeros((0, 8), np.int64))
    disp, strain, femesh = [], [], []
    for t in range(n_frames - 1):
        rng = np.random.default_rng(t)
        U = rng.standard_normal(2 * n)
        disp.append(FrameResult(U=U, U_accum=U * 2.0, F=rng.standard_normal(4 * n)))
        strain.append(StrainResult(
            disp_u=rng.standard_normal(n), disp_v=rng.standard_normal(n),
            strain_exx=rng.standard_normal(n), strain_eyy=rng.standard_normal(n),
            strain_valid=rng.random(n) > 0.3))
        femesh.append(mesh)
    return PipelineResult(
        dic_para=DICPara(img_size=(img, img), winsize=40),
        dic_mesh=mesh, result_disp=disp, result_def_grad=disp,
        result_strain=strain, result_fe_mesh_each_frame=femesh,
        frame_schedule=FrameSchedule.from_mode("accumulative", n_frames))


def _state_with_results(tmp_path):
    state = AppState.instance()
    state.image_folder = tmp_path
    state.image_files = ["a.tif", "b.tif", "c.tif", "d.tif"]
    state.subset_size = 32
    state.results = _result()
    # view state
    state.current_frame = 2
    state.display_field = "strain_eyy"
    state.show_deformed = False
    state.overlay_alpha = 0.42
    fs = state.get_field_state("strain_eyy")
    fs.colormap = "seismic"
    fs.auto = False
    fs.vmin, fs.vmax = -0.01, 0.02
    return state


class _StubImageCtrl:
    def load_folder(self, folder):
        pass


def _assert_result_equal(a, b):
    assert len(a.result_disp) == len(b.result_disp)
    for fa, fb in zip(a.result_disp, b.result_disp):
        np.testing.assert_array_equal(fa.U, fb.U)
        np.testing.assert_array_equal(fa.U_accum, fb.U_accum)
    for sa, sb in zip(a.result_strain, b.result_strain):
        np.testing.assert_array_equal(sa.strain_exx, sb.strain_exx)
        np.testing.assert_array_equal(sa.strain_valid, sb.strain_valid)
    np.testing.assert_array_equal(a.dic_mesh.coordinates_fem, b.dic_mesh.coordinates_fem)
    assert a.dic_para.img_size == b.dic_para.img_size


# --- bundle format --------------------------------------------------------

def test_saved_bundle_is_zip_with_config_and_results(tmp_path):
    state = _state_with_results(tmp_path)
    out = tmp_path / "s.aldic"
    save_session(out, state, include_results=True)
    assert zipfile.is_zipfile(out)
    with zipfile.ZipFile(out) as zf:
        names = set(zf.namelist())
        assert "session.json" in names and "results.npz" in names
        cfg = json.loads(zf.read("session.json"))
    assert cfg["schema_version"] == SCHEMA_VERSION
    assert cfg["has_results"] is True
    assert cfg["fingerprint"]["n_frames"] == 3


def test_config_only_bundle_has_no_results(tmp_path):
    state = _state_with_results(tmp_path)
    out = tmp_path / "cfg.aldic"
    save_session(out, state, include_results=False)
    with zipfile.ZipFile(out) as zf:
        names = set(zf.namelist())
    assert "results.npz" not in names
    assert load_session(out).results is None


# --- results round-trip ---------------------------------------------------

def test_results_round_trip(tmp_path):
    state = _state_with_results(tmp_path)
    out = tmp_path / "s.aldic"
    save_session(out, state, include_results=True)
    session = load_session(out)
    assert session.results is not None
    _assert_result_equal(state.results, session.results)


def test_apply_restores_results_and_emits(tmp_path):
    state = _state_with_results(tmp_path)
    out = tmp_path / "s.aldic"
    save_session(out, state, include_results=True)
    session = load_session(out)

    # fresh state
    AppState._instance = None
    fresh = AppState.instance()
    emitted = []
    states = []
    fresh.results_changed.connect(lambda: emitted.append(True))
    fresh.run_state_changed.connect(lambda s: states.append(s))
    apply_session(session, fresh, _StubImageCtrl())
    assert fresh.results is not None
    assert emitted  # results_changed fired
    _assert_result_equal(state.results, fresh.results)
    # A session that carries results lands in DONE, so results-gated UI (the
    # Export button) is enabled without recomputing.
    assert fresh.run_state == RunState.DONE
    assert states[-1] == RunState.DONE


# --- view state -----------------------------------------------------------

def test_view_state_round_trip(tmp_path):
    state = _state_with_results(tmp_path)
    out = tmp_path / "s.aldic"
    save_session(out, state, include_results=False)
    session = load_session(out)

    AppState._instance = None
    fresh = AppState.instance()
    fresh.image_files = ["a.tif", "b.tif", "c.tif", "d.tif"]  # so current_frame clamps
    apply_session(session, fresh, _StubImageCtrl())
    assert fresh.display_field == "strain_eyy"
    assert fresh.show_deformed is False
    assert abs(fresh.overlay_alpha - 0.42) < 1e-9
    assert fresh.current_frame == 2
    fs = fresh.get_field_state("strain_eyy")
    assert fs.colormap == "seismic" and fs.auto is False
    assert abs(fs.vmin - (-0.01)) < 1e-9 and abs(fs.vmax - 0.02) < 1e-9


# --- backward compatibility ----------------------------------------------

def test_full_restore_results_and_view(tmp_path):
    """The user's scenario: save with results -> reopen -> land exactly back
    (fields displayed, same frame/field/colours), no recompute."""
    state = _state_with_results(tmp_path)
    out = tmp_path / "run.aldic"
    save_session(out, state, include_results=True)
    session = load_session(out)

    AppState._instance = None
    fresh = AppState.instance()
    fresh.image_files = ["a.tif", "b.tif", "c.tif", "d.tif"]
    apply_session(session, fresh, _StubImageCtrl())

    # results restored (no recompute needed)
    assert fresh.results is not None
    _assert_result_equal(state.results, fresh.results)
    # run state is DONE -> the Export button enables straight away
    assert fresh.run_state == RunState.DONE
    # landed back on the same page
    assert fresh.display_field == "strain_eyy"
    assert fresh.current_frame == 2
    assert fresh.show_deformed is False
    fs = fresh.get_field_state("strain_eyy")
    assert fs.colormap == "seismic"
    assert abs(fs.vmin - (-0.01)) < 1e-9


def test_session_without_results_stays_idle(tmp_path):
    """A displacement-only / schema-1 session (no results) must NOT jump to
    DONE -- the Export button stays disabled until something is computed."""
    state = _state_with_results(tmp_path)
    out = tmp_path / "cfg.aldic"
    save_session(out, state, include_results=False)  # config only
    session = load_session(out)
    assert session.results is None

    AppState._instance = None
    fresh = AppState.instance()
    fresh.set_run_state(RunState.IDLE)
    apply_session(session, fresh, _StubImageCtrl())
    assert fresh.results is None
    assert fresh.run_state == RunState.IDLE


def test_legacy_v1_json_still_loads(tmp_path):
    """A schema-1 plain-JSON session loads (config only, results None)."""
    p = tmp_path / "old.aldic.json"
    p.write_text(json.dumps({
        "schema_version": 1,
        "image_folder": str(tmp_path),
        "image_files": ["x.tif"],
        "per_frame_rois": {},
        "params": {"subset_size": 24},
        "physical_units": {"pixel_size": 2.0},
    }), encoding="utf-8")
    session = load_session(p)
    assert session.schema_version == 1
    assert session.results is None
    assert session.params["subset_size"] == 24
