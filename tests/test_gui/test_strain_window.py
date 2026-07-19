"""Tests for StrainWindow -- the post-processing strain window assembly.

Verifies the maximum-decoupling design contracts:
* StrainWindow has its own _strain_current_frame, never touches state.current_frame
* Default field is disp_u (matches selector default)
* Compute Strain populates state.results.result_strain
* Param change marks the window stale; Recompute clears the stale label
* Field change re-renders without recomputing
* StrainWindow never writes to state.colormap / state.color_min / state.display_field
"""

from __future__ import annotations

import pytest
from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

from al_dic.core.data_structures import StrainResult
from al_dic.gui.app_state import AppState
from al_dic.gui.strain_window import StrainWindow

from ._helpers import make_synthetic_pipeline_result


@pytest.fixture
def state_with_results():
    """Fresh AppState pre-populated with a synthetic pure-shear result."""
    state = AppState()
    result, mask = make_synthetic_pipeline_result(
        n_frames=3, shear=0.01, img_shape=(128, 128), step=16,
    )
    state.results = result
    state.per_frame_rois[0] = mask.astype(bool)
    state.current_frame = 0
    state.colormap = "jet"
    state.color_min = 0.0
    state.color_max = 1.0
    state.display_field = "disp_u"
    return state


@pytest.fixture
def window(state_with_results):
    return StrainWindow(state_with_results)


# ----------------------------------------------------------------------
# Independent timeline
# ----------------------------------------------------------------------

def test_window_has_independent_frame_state(window, state_with_results):
    """Setting the strain frame must NOT mutate AppState.current_frame."""
    assert state_with_results.current_frame == 0
    window.set_strain_frame(1)
    assert window.strain_current_frame() == 1
    assert state_with_results.current_frame == 0  # untouched


def test_default_strain_frame_is_zero(window):
    assert window.strain_current_frame() == 0


# ----------------------------------------------------------------------
# Cancel button
# ----------------------------------------------------------------------

def test_cancel_button_hidden_until_running(window):
    """The Cancel button exists and is hidden when no compute is running."""
    assert window._cancel_btn.isVisibleTo(window) is False


def test_cancel_clicked_without_worker_is_noop(window):
    """Clicking Cancel with no active worker must not raise."""
    window._strain_worker = None
    window._on_cancel_clicked()  # no crash


def test_cancelled_resets_ui_without_storing(window, state_with_results):
    """A cancelled run resets the UI and leaves result_strain untouched."""
    before = state_with_results.results.result_strain
    window._on_strain_cancelled()
    assert window._cancel_btn.isVisibleTo(window) is False
    assert window._compute_btn.isEnabled() is True
    # Previous strain result is kept (not overwritten).
    assert state_with_results.results.result_strain is before


# ----------------------------------------------------------------------
# Export button enablement
# ----------------------------------------------------------------------

def test_export_enabled_when_opened_with_results(window):
    """Opening the window with results already present (session reload / run
    auto-open) enables Export immediately -- results_changed fired before the
    window existed, so __init__ must set the state itself."""
    assert window._export_strain_btn.isEnabled() is True


def test_export_disabled_without_results():
    """No results -> Export stays disabled."""
    from al_dic.gui.strain_window import StrainWindow

    win = StrainWindow(AppState())
    assert win._export_strain_btn.isEnabled() is False


# ----------------------------------------------------------------------
# Field selector wiring
# ----------------------------------------------------------------------

def test_default_field_is_disp_u(window):
    """Selector defaults to disp_u (the displacement view that mirrors
    what the user just computed)."""
    assert window.current_field() == "disp_u"


# ----------------------------------------------------------------------
# Compute / recompute behaviour
# ----------------------------------------------------------------------

def test_compute_button_populates_results(window, state_with_results):
    window.trigger_compute()
    result_strain = state_with_results.results.result_strain
    assert len(result_strain) == len(state_with_results.results.result_disp)
    assert isinstance(result_strain[0], StrainResult)


def test_compute_clears_stale_label(window):
    """Touching a parameter sets the stale hint, and Compute clears it."""
    # VSG = 51 → rad = 25, safely above the test fixture's subset_step=16
    # so the v0.4.1 plane-fit guard does not trip. Must differ from the
    # panel default (41) so the dirty flag actually flips.
    window.param_panel()._vsg_spin.setValue(51)  # mark dirty
    assert window.is_stale() is True
    window.trigger_compute()
    assert window.is_stale() is False


def test_param_change_marks_stale(window):
    assert window.is_stale() is False
    window.param_panel()._vsg_spin.setValue(51)
    assert window.is_stale() is True


# ----------------------------------------------------------------------
# Decoupling guarantee: StrainWindow does NOT touch shared display state
# ----------------------------------------------------------------------

def test_no_writes_to_main_state_colormap(window, state_with_results):
    """Changing strain viz must NEVER mutate state.colormap / color_min /
    color_max / display_field. Those belong to the displacement view."""
    state_with_results.colormap = "jet"
    state_with_results.display_field = "disp_u"
    state_with_results.color_min = 0.123
    state_with_results.color_max = 0.456

    window.trigger_compute()
    window.set_current_field("strain_exx")
    # Force a re-render with a different colormap
    window.viz_panel()._cmap_combo.setCurrentText("seismic")

    assert state_with_results.colormap == "jet"
    assert state_with_results.display_field == "disp_u"
    assert state_with_results.color_min == 0.123
    assert state_with_results.color_max == 0.456


def test_field_change_does_not_recompute(window, state_with_results):
    """Changing the field after compute should re-render only, not call
    StrainController again. We assert by counting results_changed emissions."""
    received: list[bool] = []
    state_with_results.results_changed.connect(lambda: received.append(True))
    window.trigger_compute()
    n_after_compute = len(received)
    window.set_current_field("strain_exx")
    assert len(received) == n_after_compute  # no extra emit


# ----------------------------------------------------------------------
# New fields: displacement before strain, derived fields
# ----------------------------------------------------------------------

def test_disp_u_available_before_compute(window, state_with_results):
    """disp_u should render from result_disp without running Compute Strain.
    Verifies fix for item 2: displacement fields bypass result_strain.
    frame=1 is the first deformed frame (frame=0 is the reference, no data)."""
    result = state_with_results.results
    assert not result.result_strain   # strain NOT computed yet
    # _get_field_values should return the u-component from result_disp
    vals = window._get_field_values("disp_u", 1, result)
    assert vals is not None
    assert len(vals) == result.result_fe_mesh_each_frame[0].coordinates_fem.shape[0]


def test_velocity_available_before_compute(window, state_with_results):
    """velocity field is derived from result_disp increments, no strain needed."""
    result = state_with_results.results
    assert not result.result_strain
    vals = window._get_field_values("velocity", 1, result)
    assert vals is not None
    assert (vals >= 0).all()  # velocity magnitude is non-negative


def test_disp_magnitude_available_before_compute(window, state_with_results):
    result = state_with_results.results
    vals = window._get_field_values("disp_magnitude", 1, result)
    assert vals is not None
    assert (vals >= 0).all()


def test_reference_frame_returns_zeros_for_disp(window, state_with_results):
    """frame=0 is the reference image — displacement fields return all-zero arrays
    (displacement relative to itself is zero by definition)."""
    import numpy as np
    result = state_with_results.results
    n_nodes = result.dic_mesh.coordinates_fem.shape[0]
    for field in ("disp_u", "disp_v", "disp_magnitude"):
        vals = window._get_field_values(field, 0, result)
        assert vals is not None, f"{field} at frame=0 should return zeros, not None"
        assert vals.shape == (n_nodes,), field
        assert np.all(vals == 0.0), f"{field} at frame=0 should be all zeros"


def test_strain_rotation_requires_compute(window, state_with_results):
    """strain_rotation returns None until Compute Strain is run."""
    result = state_with_results.results
    assert window._get_field_values("strain_rotation", 1, result) is None
    window.trigger_compute()
    result_after = state_with_results.results
    vals = window._get_field_values("strain_rotation", 1, result_after)
    assert vals is not None


def test_display_trim_frame_follows_view(window, state_with_results):
    """Reference view recomputes edge-trim from the frame-0 mask (aligning with
    the main-window displacement); deformed view keeps the stored per-frame
    trim (current-frame crack). A current-frame interior crack must NOT be
    carved into the reference view."""
    import numpy as np
    from types import SimpleNamespace

    result = state_with_results.results
    coords = result.dic_mesh.coordinates_fem
    n = coords.shape[0]

    # frame-0 ROI: a centered rectangle (leaves a border) so frame-0 geometry
    # trims a boundary band but keeps the interior.
    mask0 = np.zeros((128, 128), dtype=bool)
    mask0[24:104, 24:104] = True
    state_with_results.per_frame_rois[0] = mask0

    # Simulate the current frame trimming one INTERIOR node (a grown crack).
    strain_valid = np.ones(n, dtype=bool)
    cidx = int(np.argmin(np.hypot(coords[:, 0] - 64, coords[:, 1] - 64)))
    strain_valid[cidx] = False
    sr = SimpleNamespace(strain_valid=strain_valid)

    # Deformed view: stored per-frame trim -> the interior node stays trimmed.
    v_def = window._display_strain_valid(sr, result, show_deformed=True)
    assert v_def is strain_valid
    assert not v_def[cidx]

    # Reference view: recomputed from frame-0 geometry -> interior node NOT
    # trimmed (only the boundary band is), matching the main window.
    v_ref = window._display_strain_valid(sr, result, show_deformed=False)
    assert v_ref is not strain_valid
    assert bool(v_ref[cidx]), "current-frame crack must not carve the reference view"
    assert not bool(v_ref.all()), "frame-0 boundary band is still trimmed"


def test_display_trim_none_for_fem(window, state_with_results):
    """FEM nodal strain has no edge-trim -> None regardless of the view frame."""
    from types import SimpleNamespace
    result = state_with_results.results
    sr = SimpleNamespace(strain_valid=None)
    assert window._display_strain_valid(sr, result, show_deformed=False) is None
    assert window._display_strain_valid(sr, result, show_deformed=True) is None


def test_auto_range_disabled_populates_spinboxes(window, state_with_results):
    """Disabling auto range triggers set_range() with field's data range.
    For a uniform shear field all nodes share one value so vmin == vmax."""
    window.trigger_compute()
    window.set_current_field("strain_exy")
    panel = window.viz_panel()
    # Start with known far-off defaults
    panel.set_range(-999.0, 999.0)
    # Disabling auto should repopulate with the actual field values
    panel._auto_check.setChecked(False)
    s = panel.get_state()
    # Values must be finite and within [-1, 1] for a small-shear field
    assert abs(s["vmin"]) < 1.0
    assert abs(s["vmax"]) < 1.0
    # vmin <= vmax (equality is valid for a uniform-value field)
    assert s["vmin"] <= s["vmax"]


# ----------------------------------------------------------------------
# Initial window size (regression: fixed 800 px height overflowed
# small laptop screens; on macOS an off-screen bottom edge cannot be
# grabbed, so the window could not be shrunk)
# ----------------------------------------------------------------------

def test_initial_size_clamped_to_small_screen():
    from al_dic.gui.strain_window import initial_window_size
    # 1366x768 laptop: taskbar already excluded from availableGeometry
    w, h = initial_window_size(1366, 728)
    assert w <= 1366 - 40
    assert h <= 728 - 80

def test_initial_size_keeps_preferred_on_large_screen():
    from al_dic.gui.strain_window import initial_window_size
    assert initial_window_size(2560, 1400) == (1280, 800)

def test_initial_size_has_sane_floor():
    from al_dic.gui.strain_window import initial_window_size
    w, h = initial_window_size(500, 400)
    assert (w, h) == (640, 480)

def test_window_opens_within_available_screen(window):
    """The constructed window must not be taller than the usable screen."""
    avail = window.screen().availableGeometry()
    assert window.height() <= max(480, avail.height() - 80)
    assert window.width() <= max(640, avail.width() - 40)
