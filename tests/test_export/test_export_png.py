"""Tests for PNG batch image export backend."""

import threading

import cv2
import numpy as np
import pytest

from al_dic.export.export_png import (
    export_png, render_field_frame, _compute_warped_mask,
    colorbar_label, scale_field_values, render_colorbar_strip,
)
from al_dic.gui.dialogs.export_dialog import FieldImageConfig


@pytest.fixture
def field_cfg():
    return FieldImageConfig(
        field_name="disp_u",
        enabled=True,
        colormap="jet",
        auto_range=True,
        vmin=0.0,
        vmax=1.0,
        bg_alpha=0.7,
    )


def test_render_field_frame_tri_cache_byte_identical(minimal_result, field_cfg):
    """The Delaunay cache must not change ANY rendered pixel, and must reuse
    one triangulation across fields that share a valid mask."""
    coords = minimal_result.dic_mesh.coordinates_fem
    rng = np.random.default_rng(0)
    shared_cache: dict = {}
    for _ in range(3):
        values = rng.standard_normal(coords.shape[0])
        no_cache = render_field_frame(
            coords=coords, values=values, image_shape=(64, 64),
            bg_image=None, field_cfg=field_cfg,
        )
        with_cache = render_field_frame(
            coords=coords, values=values, image_shape=(64, 64),
            bg_image=None, field_cfg=field_cfg, tri_cache=shared_cache,
        )
        np.testing.assert_array_equal(with_cache, no_cache)
    # all-finite fields share the same valid mask -> one cached triangulation
    assert len(shared_cache) == 1


def test_render_field_frame_returns_bgr(minimal_result, field_cfg):
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.ones(coords.shape[0], dtype=np.float64)
    img = render_field_frame(
        coords=coords,
        values=values,
        image_shape=(64, 64),
        bg_image=None,
        field_cfg=field_cfg,
    )
    assert img is not None
    assert img.ndim == 3
    assert img.shape[2] == 3   # BGR
    assert img.dtype == np.uint8


def test_render_with_background(minimal_result, field_cfg):
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.ones(coords.shape[0], dtype=np.float64)
    bg = np.zeros((64, 64), dtype=np.uint8)
    img = render_field_frame(
        coords=coords,
        values=values,
        image_shape=(64, 64),
        bg_image=bg,
        field_cfg=field_cfg,
    )
    assert img is not None
    assert img.shape == (64, 64, 3)


def test_render_with_roi_mask(minimal_result, field_cfg):
    """ROI mask should trim the field — pixels outside mask should show background."""
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.ones(coords.shape[0], dtype=np.float64)
    mask = np.zeros((64, 64), dtype=bool)
    mask[20:44, 20:44] = True  # only centre active
    img = render_field_frame(
        coords=coords,
        values=values,
        image_shape=(64, 64),
        bg_image=None,
        field_cfg=field_cfg,
        roi_mask=mask,
    )
    assert img.shape == (64, 64, 3)
    assert img.dtype == np.uint8


def test_export_blanks_edge_trimmed_strain(minimal_result):
    """An edge-trimmed (NaN) strain node must render TRANSPARENT in the export,
    not back-filled from neighbours -- matching the on-screen view.  Regression
    for display/export trim inconsistency."""
    coords = minimal_result.dic_mesh.coordinates_fem
    # Uniform strain, but trim one INTERIOR node (node 5 = middle row/col of the
    # 3x4 grid) so a plain interpolator would back-fill its cell and hide it.
    values = np.ones(coords.shape[0], dtype=np.float64)
    trimmed = 5
    values[trimmed] = np.nan

    bg = np.zeros((64, 64, 3), dtype=np.uint8)
    bg[:, :] = (0, 0, 255)  # solid red (BGR) background
    cfg = FieldImageConfig("strain_exx", True, "jet", False, 0.0, 2.0, bg_alpha=1.0)

    img = render_field_frame(coords, values, (64, 64), bg, cfg)

    # The trimmed node's own pixel shows the background (blanked), not a colour.
    tx = int(round(coords[trimmed, 0]))
    ty = int(round(coords[trimmed, 1]))
    assert tuple(int(c) for c in img[ty, tx]) == (0, 0, 255)
    # A valid (non-trimmed) node still shows the field, not the background.
    kx = int(round(coords[0, 0]))
    ky = int(round(coords[0, 1]))
    assert tuple(int(c) for c in img[ky, kx]) != (0, 0, 255)


def test_export_no_trim_is_unchanged_for_full_field(minimal_result):
    """A fully-finite field (no trim, e.g. displacement) renders identically --
    the blanking pass is a no-op."""
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.linspace(0.0, 1.0, coords.shape[0])
    bg = np.full((64, 64, 3), 40, dtype=np.uint8)
    cfg = FieldImageConfig("disp_u", True, "jet", False, 0.0, 1.0, bg_alpha=1.0)
    img = render_field_frame(coords, values, (64, 64), bg, cfg)
    # Interior of the mesh is fully painted (no spurious transparent holes).
    assert tuple(int(c) for c in img[32, 32]) != (40, 40, 40)


def test_render_alpha_semantics(minimal_result):
    """bg_alpha=1.0 should produce a fully-opaque field; bg_alpha=0.0 should
    produce a fully-transparent field (showing only the background)."""
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.ones(coords.shape[0], dtype=np.float64)
    bg = np.full((64, 64, 3), 128, dtype=np.uint8)  # grey background

    # bg_alpha=1.0 → field fully opaque, result should differ from bg
    cfg_opaque = FieldImageConfig("disp_u", True, "jet", False, 0.0, 1.0, bg_alpha=1.0)
    img_opaque = render_field_frame(coords, values, (64, 64), bg, cfg_opaque)

    # bg_alpha=0.0 → field invisible, result should equal bg
    cfg_transparent = FieldImageConfig("disp_u", True, "jet", False, 0.0, 1.0, bg_alpha=0.0)
    img_transparent = render_field_frame(coords, values, (64, 64), bg, cfg_transparent)

    # With transparent field, the output should be mostly the background (grey)
    assert np.mean(img_transparent) == pytest.approx(128, abs=5)
    # With opaque field, the output should differ from pure grey
    assert not np.allclose(img_opaque.astype(float), 128, atol=10)


def test_export_png_creates_files(tmp_path, minimal_result, field_cfg):
    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp",
        timestamp="ts",
        results=minimal_result,
        configs=[field_cfg],
        image_files=[],
        bg_mode="ref_frame",
        roi_mask=None,
        dpi=72,
        show_deformed=False,
        frame_start=0,
        frame_end=1,
    )
    assert len(paths) >= 1
    for p in paths:
        img = cv2.imread(str(p))
        assert img is not None


@pytest.mark.parametrize("fmt,ext", [
    ("png", ".png"), ("jpeg", ".jpg"), ("tiff", ".tif"),
])
def test_export_png_honours_image_format(
    tmp_path, minimal_result, field_cfg, fmt, ext
):
    """The Format combo (PNG/JPEG/TIFF) must actually change the written
    file extension -- previously it was ignored and everything was .png."""
    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp",
        timestamp="ts",
        results=minimal_result,
        configs=[field_cfg],
        image_files=[],
        bg_mode="ref_frame",
        roi_mask=None,
        dpi=72,
        show_deformed=False,
        frame_start=0,
        frame_end=1,
        image_format=fmt,
    )
    assert len(paths) >= 1
    for p in paths:
        assert p.suffix == ext
        assert cv2.imread(str(p)) is not None   # written + decodable


def test_export_png_only_enabled_fields(tmp_path, minimal_result):
    enabled_cfg = FieldImageConfig("disp_u", True, "jet", True, 0, 1, 0.7)
    disabled_cfg = FieldImageConfig("disp_v", False, "jet", True, 0, 1, 0.7)
    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp",
        timestamp="ts",
        results=minimal_result,
        configs=[enabled_cfg, disabled_cfg],
        image_files=[],
        bg_mode="ref_frame",
        roi_mask=None,
        dpi=72,
        show_deformed=False,
        frame_start=0,
        frame_end=0,
    )
    field_dirs = [p.parent.name for p in paths]
    assert "disp_u" in field_dirs
    assert "disp_v" not in field_dirs


def test_export_png_stop_event(tmp_path, minimal_result, field_cfg):
    stop = threading.Event()
    stop.set()   # stop immediately
    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp",
        timestamp="ts",
        results=minimal_result,
        configs=[field_cfg],
        image_files=[],
        bg_mode="ref_frame",
        roi_mask=None,
        dpi=72,
        show_deformed=False,
        frame_start=0,
        frame_end=1,
        stop_event=stop,
    )
    assert len(paths) == 0


def test_export_png_dir_structure(tmp_path, minimal_result, field_cfg):
    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp",
        timestamp="ts",
        results=minimal_result,
        configs=[field_cfg],
        image_files=[],
        bg_mode="ref_frame",
        roi_mask=None,
        dpi=72,
        show_deformed=False,
        frame_start=0,
        frame_end=0,
    )
    assert len(paths) >= 1
    assert paths[0].parent.name == "disp_u"
    assert paths[0].parent.parent.name == "exp_images_ts"


# ---------------------------------------------------------------------------
# Deformed mask tests
# ---------------------------------------------------------------------------


def test_render_deformed_mask_takes_priority(minimal_result, field_cfg):
    """When both roi_mask and deformed_mask are provided, deformed_mask wins."""
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.ones(coords.shape[0], dtype=np.float64)

    # roi_mask: only centre
    roi = np.zeros((64, 64), dtype=bool)
    roi[20:44, 20:44] = True

    # deformed_mask: only top-left
    def_mask = np.zeros((64, 64), dtype=bool)
    def_mask[0:32, 0:32] = True

    # With deformed_mask, the result should differ from roi_mask-only
    img_roi = render_field_frame(
        coords, values, (64, 64), None, field_cfg,
        roi_mask=roi,
    )
    img_def = render_field_frame(
        coords, values, (64, 64), None, field_cfg,
        roi_mask=roi,
        deformed_mask=def_mask,
    )
    # They should differ because the mask regions are different
    assert not np.array_equal(img_roi, img_def)


def test_compute_warped_mask_identity(minimal_result):
    """Zero displacement should produce a mask identical to the reference."""
    coords = minimal_result.dic_mesh.coordinates_fem
    deformed = coords.copy()  # zero displacement

    roi = np.zeros((64, 64), dtype=bool)
    roi[10:55, 10:55] = True

    warped = _compute_warped_mask(coords, deformed, roi, (64, 64))
    # Inside the convex hull of nodes, the warped mask should match roi
    assert warped.shape == (64, 64)
    assert warped.dtype == bool
    # Centre region (well inside hull) should match
    assert np.all(warped[20:50, 20:50] == roi[20:50, 20:50])


def test_compute_warped_mask_with_nan_deformed_nodes(minimal_result):
    """Crack-destroyed nodes carry NaN deformed positions (crack-aware
    cumulative transform).  The warp Delaunay must skip them, not raise
    'points cannot contain NaN'."""
    coords = minimal_result.dic_mesh.coordinates_fem
    deformed = coords.copy()
    deformed[0] = np.nan  # one destroyed node

    roi = np.zeros((64, 64), dtype=bool)
    roi[10:55, 10:55] = True

    warped = _compute_warped_mask(coords, deformed, roi, (64, 64))
    assert warped.shape == (64, 64) and warped.dtype == bool
    # Away from the destroyed node the warp still matches the ROI.
    assert np.all(warped[20:50, 20:50] == roi[20:50, 20:50])


def test_compute_warped_mask_all_nan_returns_empty(minimal_result):
    coords = minimal_result.dic_mesh.coordinates_fem
    deformed = np.full_like(coords, np.nan)
    warped = _compute_warped_mask(
        coords, deformed, np.ones((64, 64), bool), (64, 64),
    )
    assert not warped.any()


def test_render_field_frame_with_nan_deformed_nodes(minimal_result, field_cfg):
    """Rendering a deformed field with a destroyed node must not raise and
    must still produce a BGR frame."""
    coords = minimal_result.dic_mesh.coordinates_fem
    values = np.linspace(0.0, 1.0, coords.shape[0])
    deformed = coords + 0.5
    # Destroyed node: NaN deformed position AND NaN value (as U_accum yields).
    deformed[1] = np.nan
    values[1] = np.nan

    img = render_field_frame(
        coords=coords, values=values, image_shape=(64, 64),
        bg_image=None, field_cfg=field_cfg, deformed_coords=deformed,
    )
    assert img.shape == (64, 64, 3)
    assert img.dtype == np.uint8


def test_export_png_deformed_with_destroyed_node(
    tmp_path, minimal_result, field_cfg,
):
    """End-to-end: a crack-destroyed node (NaN U_accum + NaN field value) must
    not break deformed-mode PNG export -- regression for the scipy Delaunay
    'points cannot contain NaN' crash."""
    from dataclasses import replace

    res = minimal_result
    dead = 5  # an interior node
    U_accum = res.result_disp[0].U_accum.copy()
    U_accum[2 * dead:2 * dead + 2] = np.nan
    fr = replace(res.result_disp[0], U_accum=U_accum)
    sr = res.result_strain[0]
    du = sr.disp_u.copy(); du[dead] = np.nan
    exx = sr.strain_exx.copy(); exx[dead] = np.nan
    sr2 = replace(sr, disp_u=du, strain_exx=exx)
    res2 = replace(res, result_disp=[fr, fr], result_strain=[sr2, sr2])

    roi = np.ones((64, 64), dtype=bool)
    paths = export_png(
        dest_dir=tmp_path / "def", prefix="exp", timestamp="ts",
        results=res2, configs=[field_cfg], image_files=[],
        bg_mode="ref_frame", roi_mask=roi, dpi=72,
        show_deformed=True, frame_start=0, frame_end=0,
    )
    assert len(paths) >= 1
    assert all(p.exists() for p in paths)


def test_export_png_deformed_uses_warped_mask(tmp_path, minimal_result, field_cfg):
    """export_png with show_deformed=True should use warped mask (not raw roi)."""
    roi = np.zeros((64, 64), dtype=bool)
    roi[5:60, 5:60] = True

    paths_ref = export_png(
        dest_dir=tmp_path / "ref",
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[field_cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=roi, dpi=72,
        show_deformed=False, frame_start=0, frame_end=0,
    )
    paths_def = export_png(
        dest_dir=tmp_path / "def",
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[field_cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=roi, dpi=72,
        show_deformed=True, frame_start=0, frame_end=0,
    )
    # Both should produce files
    assert len(paths_ref) == 1
    assert len(paths_def) == 1


def test_export_png_per_frame_roi_overrides_warp(tmp_path, minimal_result, field_cfg):
    """Per-frame ROI should override inverse-warped mask in deformed mode."""
    roi = np.zeros((64, 64), dtype=bool)
    roi[5:60, 5:60] = True

    # per_frame_rois key 1 = mask for first deformed frame (result_disp[0])
    custom_mask = np.zeros((64, 64), dtype=bool)
    custom_mask[10:30, 10:30] = True
    per_frame = {1: custom_mask}

    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[field_cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=roi, dpi=72,
        show_deformed=True, frame_start=0, frame_end=0,
        per_frame_rois=per_frame,
    )
    assert len(paths) == 1
    img = cv2.imread(str(paths[0]))
    assert img is not None


# ---------------------------------------------------------------------------
# Colorbar + physical-units tests
# ---------------------------------------------------------------------------


class TestColorbarLabel:
    def test_disp_field_pixel_units(self):
        assert colorbar_label("disp_u") == "U (px)"
        assert colorbar_label("disp_v") == "V (px)"
        assert colorbar_label("disp_magnitude") == "Magnitude (px)"

    def test_disp_field_physical_units(self):
        assert colorbar_label("disp_u", use_physical=True, pixel_unit="mm") == "U (mm)"
        assert colorbar_label("disp_v", use_physical=True, pixel_unit="\u03bcm") == "V (\u03bcm)"

    def test_strain_field_no_unit(self):
        assert colorbar_label("strain_exx") == "\u03b5xx"
        assert colorbar_label("strain_exx", use_physical=True) == "\u03b5xx"


class TestScaleFieldValues:
    def test_disp_scaled(self):
        vals = np.array([1.0, 2.0, 3.0])
        result = scale_field_values(vals, "disp_u", pixel_size=0.1)
        np.testing.assert_allclose(result, [0.1, 0.2, 0.3])

    def test_strain_unscaled(self):
        vals = np.array([0.01, 0.02])
        result = scale_field_values(vals, "strain_exx", pixel_size=0.1)
        np.testing.assert_array_equal(result, vals)

    def test_pixel_size_one_returns_same(self):
        vals = np.array([5.0])
        result = scale_field_values(vals, "disp_u", pixel_size=1.0)
        assert result is vals  # no copy when pixel_size == 1


class TestRenderColorbarStrip:
    def test_returns_bgr_matching_height(self):
        strip = render_colorbar_strip(200, "jet", 0.0, 1.0, "U (px)", dpi=72)
        assert strip is not None
        assert strip.ndim == 3
        assert strip.shape[2] == 3
        assert strip.shape[0] == 200
        assert strip.dtype == np.uint8

    def test_nonzero_width(self):
        strip = render_colorbar_strip(100, "turbo", -1.0, 1.0, "V (mm)", dpi=72)
        assert strip.shape[1] > 10  # reasonable width


def test_export_png_with_colorbar_wider(tmp_path, minimal_result, field_cfg):
    """Images with colorbar should be wider than without."""
    paths_plain = export_png(
        dest_dir=tmp_path / "plain",
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[field_cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=None, dpi=72,
        show_deformed=False, frame_start=0, frame_end=0,
    )
    paths_cb = export_png(
        dest_dir=tmp_path / "cb",
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[field_cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=None, dpi=72,
        show_deformed=False, frame_start=0, frame_end=0,
        include_colorbar=True,
    )
    img_plain = cv2.imread(str(paths_plain[0]))
    img_cb = cv2.imread(str(paths_cb[0]))
    assert img_cb.shape[1] > img_plain.shape[1]  # wider with colorbar
    assert img_cb.shape[0] == img_plain.shape[0]  # same height


def test_export_png_physical_units_with_colorbar(tmp_path, minimal_result):
    """Physical-unit export with colorbar should produce valid wider images."""
    cfg = FieldImageConfig("disp_u", True, "jet", True, 0.0, 1.0, 0.7)
    paths = export_png(
        dest_dir=tmp_path,
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=None, dpi=72,
        show_deformed=False, frame_start=0, frame_end=0,
        include_colorbar=True,
        use_physical_units=True,
        pixel_size=0.1,
        pixel_unit="mm",
    )
    assert len(paths) == 1
    img = cv2.imread(str(paths[0]))
    assert img is not None
    # Image should be wider than 64px (original width) due to colorbar
    assert img.shape[1] > 64
    # Colorbar strip region (rightmost columns) should contain non-black pixels
    cb_region = img[:, 64:, :]
    assert cb_region.sum() > 0, "Colorbar strip should contain visible content"


def test_export_png_strain_unscaled_by_physical_units(tmp_path, minimal_result):
    """Strain fields should not be affected by physical-unit scaling."""
    cfg = FieldImageConfig("strain_exx", True, "RdBu_r", True, 0.0, 1.0, 0.7)
    paths_px = export_png(
        dest_dir=tmp_path / "px",
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=None, dpi=72,
        show_deformed=False, frame_start=0, frame_end=0,
    )
    paths_phys = export_png(
        dest_dir=tmp_path / "phys",
        prefix="exp", timestamp="ts",
        results=minimal_result, configs=[cfg],
        image_files=[], bg_mode="ref_frame",
        roi_mask=None, dpi=72,
        show_deformed=False, frame_start=0, frame_end=0,
        use_physical_units=True,
        pixel_size=0.1,
    )
    img_px = cv2.imread(str(paths_px[0]))
    img_phys = cv2.imread(str(paths_phys[0]))
    # Strain is dimensionless — images should be identical
    np.testing.assert_array_equal(img_px, img_phys)
