"""Tests for the export dialog's Preview & Colorbar tab."""

import numpy as np
from PySide6.QtWidgets import QApplication

from al_dic.core.data_structures import (
    DICMesh, FrameResult, FrameSchedule, PipelineResult, StrainResult,
)
from al_dic.core.config import dicpara_default
from al_dic.gui.dialogs.export_dialog import ExportDialog, VizExportHint

app = QApplication.instance() or QApplication([])


def _result(img=128):
    xs, ys = np.meshgrid(np.linspace(8, img - 8, 6), np.linspace(8, img - 8, 6))
    coords = np.column_stack([xs.ravel(), ys.ravel()]).astype(np.float64)
    n = coords.shape[0]
    mesh = DICMesh(coordinates_fem=coords, elements_fem=np.zeros((0, 8), np.int64))
    u = coords[:, 0] / img
    fr = FrameResult(U=np.repeat(u, 2), U_accum=np.repeat(u, 2))
    sr = StrainResult(
        disp_u=u, disp_v=np.zeros(n), strain_exx=np.full(n, 0.01),
        strain_eyy=np.zeros(n), strain_exy=np.zeros(n),
        strain_principal_max=np.full(n, 0.01), strain_principal_min=np.zeros(n),
        strain_maxshear=np.full(n, 0.005), strain_von_mises=np.full(n, 0.01),
        strain_rotation=np.zeros(n),
    )
    para = dicpara_default(img_size=(img, img))
    return PipelineResult(
        dic_para=para, dic_mesh=mesh, result_disp=[fr, fr],
        result_def_grad=[fr, fr], result_strain=[sr, sr],
        result_fe_mesh_each_frame=[mesh, mesh],
        frame_schedule=FrameSchedule.from_mode("accumulative", 3))


def _dialog():
    return ExportDialog(_result(), None, VizExportHint(), image_files=[])


def test_preview_tab_present():
    dlg = _dialog()
    assert hasattr(dlg, "_preview_tab_index")
    assert dlg._tabs.tabText(dlg._preview_tab_index)
    dlg.deleteLater()


def test_preview_renders_a_pixmap():
    dlg = _dialog()
    dlg._tabs.setCurrentIndex(dlg._preview_tab_index)  # triggers field refresh
    assert dlg._preview_field_combo.count() >= 1
    dlg._render_preview()
    pm = dlg._preview_label.pixmap()
    assert pm is not None and not pm.isNull()
    dlg.deleteLater()


def test_colorbar_style_reflects_controls():
    dlg = _dialog()
    dlg._cb_pos_combo.setCurrentIndex(dlg._cb_pos_combo.findData("bottom"))
    dlg._cb_font_spin.setValue(14)
    dlg._cb_bg_combo.setCurrentIndex(dlg._cb_bg_combo.findData("white"))
    dlg._cb_width_spin.setValue(0.09)
    dlg._cb_font_combo.setCurrentIndex(dlg._cb_font_combo.findData("serif"))
    st = dlg._current_colorbar_style()
    assert st.position == "bottom"
    assert st.font_size == 14.0
    assert st.background == "white"
    assert abs(st.width_ratio - 0.09) < 1e-9
    assert st.font_family == "serif"
    dlg.deleteLater()


def test_config_carries_colorbar_style():
    dlg = _dialog()
    dlg._cb_pos_combo.setCurrentIndex(dlg._cb_pos_combo.findData("top"))
    cfg = dlg.get_config()
    assert cfg.colorbar_style.position == "top"
    dlg.deleteLater()


def test_preview_appearance_edits_flow_to_images_row():
    """Editing colormap/range/opacity in the preview updates the Images row."""
    dlg = _dialog()
    dlg._tabs.setCurrentIndex(dlg._preview_tab_index)
    field = dlg._preview_field_combo.currentData()
    row = next(r for r in dlg._img_field_rows if r.field_name == field)
    dlg._pv_auto_check.setChecked(False)
    dlg._pv_vmin_spin.setValue(-3.5)
    dlg._pv_opacity_spin.setValue(0.4)
    dlg._pv_cmap_combo.setCurrentText("viridis")
    cfg = row.get_config()
    assert cfg.auto_range is False
    assert abs(cfg.vmin - (-3.5)) < 1e-9
    assert abs(cfg.bg_alpha - 0.4) < 1e-9
    assert cfg.colormap == "viridis"
    dlg.deleteLater()


def test_apply_appearance_to_all_fields():
    dlg = _dialog()
    dlg._tabs.setCurrentIndex(dlg._preview_tab_index)
    dlg._pv_cmap_combo.setCurrentText("plasma")
    dlg._pv_opacity_spin.setValue(0.5)
    dlg._apply_appearance_to_all()
    enabled = [r for r in dlg._img_field_rows if r.get_config().enabled]
    assert enabled  # sanity: at least one enabled field
    for row in enabled:
        c = row.get_config()
        assert c.colormap == "plasma"
        assert abs(c.bg_alpha - 0.5) < 1e-9
    dlg.deleteLater()


def test_margin_flows_to_config():
    dlg = _dialog()
    dlg._pv_margin_spin.setValue(0.08)
    dlg._pv_margin_color_combo.setCurrentIndex(
        dlg._pv_margin_color_combo.findData("black"))
    cfg = dlg.get_config()
    assert abs(cfg.export_margin_ratio - 0.08) < 1e-9
    assert cfg.export_margin_color == "black"
    dlg.deleteLater()


def test_preview_loads_row_appearance():
    """Selecting a field loads that row's appearance into the preview panel."""
    dlg = _dialog()
    dlg._tabs.setCurrentIndex(dlg._preview_tab_index)
    field = dlg._preview_field_combo.currentData()
    row = next(r for r in dlg._img_field_rows if r.field_name == field)
    row.set_appearance(colormap="turbo", auto=False, vmin=-2.0, vmax=5.0, opacity=0.3)
    dlg._load_preview_appearance()
    assert dlg._pv_cmap_combo.currentText() == "turbo"
    assert dlg._pv_auto_check.isChecked() is False
    assert abs(dlg._pv_vmin_spin.value() - (-2.0)) < 1e-9
    assert abs(dlg._pv_opacity_spin.value() - 0.3) < 1e-9
    dlg.deleteLater()
