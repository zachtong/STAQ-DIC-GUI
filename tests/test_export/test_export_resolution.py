"""Tests for export output-resolution capping, format/quality, and streaming."""

import numpy as np
import cv2
import pytest

from al_dic.core.data_structures import (
    DICMesh, FrameResult, FrameSchedule, PipelineResult, StrainResult,
)
from al_dic.core.config import dicpara_default
from al_dic.export.export_png import (
    export_png, render_field_frame, output_shape_for, encode_params_for,
)
from al_dic.export.export_animation import export_animation
from al_dic.gui.dialogs.export_dialog import FieldImageConfig


def _big_result(img=512):
    """A result whose mesh spans a larger image, so downsampling is testable."""
    xs, ys = np.meshgrid(np.linspace(8, img - 8, 12), np.linspace(8, img - 8, 12))
    coords = np.column_stack([xs.ravel(), ys.ravel()]).astype(np.float64)
    n = coords.shape[0]
    mesh = DICMesh(coordinates_fem=coords, elements_fem=np.zeros((0, 8), np.int64))
    # a non-constant field so JPEG has something to compress differently
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
        frame_schedule=FrameSchedule.from_mode("accumulative", 3),
    )


# --- helpers --------------------------------------------------------------

def test_output_shape_for():
    assert output_shape_for((4096, 4096), 1536) == (1536, 1536)
    assert output_shape_for((3000, 4000), 2000) == (1500, 2000)  # aspect kept
    assert output_shape_for((1000, 1000), 1536) == (1000, 1000)  # under cap
    assert output_shape_for((4096, 4096), 0) == (4096, 4096)     # disabled


def test_encode_params_for():
    assert encode_params_for(".jpg", 85) == [cv2.IMWRITE_JPEG_QUALITY, 85]
    assert encode_params_for(".png", 92)[0] == cv2.IMWRITE_PNG_COMPRESSION
    assert encode_params_for(".tif", 92) == []


# --- render_field_frame output_shape --------------------------------------

def test_render_output_shape_smaller():
    """Rendering at a smaller output_shape returns that size, field still drawn."""
    xs, ys = np.meshgrid(np.linspace(8, 248, 8), np.linspace(8, 248, 8))
    coords = np.column_stack([xs.ravel(), ys.ravel()]).astype(np.float64)
    values = coords[:, 0].copy()
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, bg_alpha=1.0)
    img = render_field_frame(coords, values, (256, 256), None, cfg,
                             output_shape=(128, 128))
    assert img.shape == (128, 128, 3)
    assert img.max() > 0  # field rendered, not all-black


def test_render_output_shape_default_matches_image_shape():
    xs, ys = np.meshgrid(np.linspace(8, 120, 6), np.linspace(8, 120, 6))
    coords = np.column_stack([xs.ravel(), ys.ravel()]).astype(np.float64)
    values = coords[:, 1].copy()
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, bg_alpha=1.0)
    img = render_field_frame(coords, values, (128, 128), None, cfg)
    assert img.shape == (128, 128, 3)


# --- export_png resolution + format ---------------------------------------

def test_export_png_caps_resolution(tmp_path):
    res = _big_result(512)
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, 0.7)
    paths = export_png(
        dest_dir=tmp_path, prefix="e", timestamp="ts", results=res,
        configs=[cfg], image_files=[], bg_mode="ref_frame", roi_mask=None,
        dpi=72, show_deformed=False, frame_start=0, frame_end=0,
        output_max_dim=256,
    )
    assert len(paths) == 1
    img = cv2.imread(str(paths[0]))
    assert max(img.shape[:2]) == 256    # 512 capped to 256


def test_export_png_native_when_uncapped(tmp_path):
    res = _big_result(512)
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, 0.7)
    paths = export_png(
        dest_dir=tmp_path, prefix="e", timestamp="ts", results=res,
        configs=[cfg], image_files=[], bg_mode="ref_frame", roi_mask=None,
        dpi=72, show_deformed=False, frame_start=0, frame_end=0,
        output_max_dim=0,
    )
    img = cv2.imread(str(paths[0]))
    assert max(img.shape[:2]) == 512


def test_export_jpeg_smaller_than_png(tmp_path):
    """On a speckle background (the real DIC case) JPEG is much smaller."""
    res = _big_result(512)
    # write a high-entropy speckle background so the size difference is real
    speckle = (np.random.default_rng(0).random((512, 512)) * 255).astype(np.uint8)
    bg_path = tmp_path / "ref.png"
    cv2.imwrite(str(bg_path), speckle)
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, 0.7)
    common = dict(
        results=res, configs=[cfg], image_files=[str(bg_path)],
        bg_mode="ref_frame", roi_mask=None, dpi=72, show_deformed=False,
        frame_start=0, frame_end=0, output_max_dim=0,
    )
    png = export_png(dest_dir=tmp_path, prefix="p", timestamp="t",
                     image_format="png", **common)[0]
    jpg = export_png(dest_dir=tmp_path, prefix="j", timestamp="t",
                     image_format="jpeg", jpeg_quality=92, **common)[0]
    assert jpg.suffix == ".jpg"
    assert jpg.stat().st_size < png.stat().st_size


# --- export_animation streaming + resolution ------------------------------

def test_export_animation_frame_step(tmp_path):
    """frame_step keeps every Nth frame and scales fps to preserve duration."""
    res = _big_result(256)  # 6 disp frames
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, 0.7)
    # add more frames so decimation is observable
    res.result_disp.extend([res.result_disp[0]] * 4)  # 6 total
    paths = export_animation(
        dest_dir=tmp_path, prefix="a", timestamp="ts", results=res,
        configs=[cfg], image_files=[], bg_mode="ref_frame", roi_mask=None,
        fmt="mp4", fps=10, show_deformed=False, frame_start=0,
        frame_end=len(res.result_disp) - 1, include_colorbar=False,
        output_max_dim=256, frame_step=2)
    assert len(paths) == 1 and paths[0].exists()
    cap = cv2.VideoCapture(str(paths[0]))
    nframes = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS); cap.release()
    total = len(res.result_disp)
    assert nframes == len(range(0, total, 2))   # decimated frame count
    assert round(fps) == 5                        # 10 / 2, duration preserved


@pytest.mark.parametrize("fmt", ["mp4", "gif"])
def test_export_animation_caps_resolution(tmp_path, fmt):
    res = _big_result(512)
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, 0.7)
    paths = export_animation(
        dest_dir=tmp_path, prefix="a", timestamp="ts", results=res,
        configs=[cfg], image_files=[], bg_mode="ref_frame", roi_mask=None,
        fmt=fmt, fps=5, show_deformed=False, frame_start=0, frame_end=1,
        include_colorbar=False, output_max_dim=256,
    )
    assert len(paths) == 1
    assert paths[0].exists() and paths[0].stat().st_size > 0
    # verify decoded frame is capped
    if fmt == "mp4":
        cap = cv2.VideoCapture(str(paths[0]))
        ok, frame = cap.read(); cap.release()
        assert ok and max(frame.shape[:2]) == 256
