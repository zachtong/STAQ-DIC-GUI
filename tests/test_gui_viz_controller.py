"""Tests for visualization controller -- colormap and caching."""

import numpy as np
import pytest
from PySide6.QtWidgets import QApplication

from PySide6.QtGui import QImage

from al_dic.gui.controllers.viz_controller import (
    apply_colormap,
    VizController,
    _invalid_node_grid,
)


def _pixmap_alpha(pixmap):
    """Extract the alpha channel of a QPixmap as an (H, W) uint8 array."""
    img = pixmap.toImage().convertToFormat(QImage.Format.Format_RGBA8888)
    h, w = img.height(), img.width()
    bpl = img.bytesPerLine()
    raw = np.frombuffer(img.constBits(), np.uint8, count=bpl * h)
    return raw.reshape(h, bpl)[:, : w * 4].reshape(h, w, 4)[:, :, 3]


@pytest.fixture(scope="module")
def qapp():
    """Ensure a QApplication exists for QPixmap operations."""
    app = QApplication.instance() or QApplication([])
    yield app


class TestApplyColormap:
    def test_output_shape(self):
        data = np.random.rand(100, 200).astype(np.float64)
        rgba = apply_colormap(data, vmin=0, vmax=1, cmap="jet")
        assert rgba.shape == (100, 200, 4)
        assert rgba.dtype == np.uint8

    def test_nan_transparent(self):
        data = np.full((10, 10), np.nan)
        rgba = apply_colormap(data, vmin=0, vmax=1)
        assert np.all(rgba[:, :, 3] == 0)  # alpha = 0 for NaN

    def test_range_clamping(self):
        data = np.array([[0.0, 0.5, 1.0, 2.0]])
        rgba = apply_colormap(data, vmin=0, vmax=1)
        # value=2.0 should be clamped to max color, not crash
        assert rgba[0, 3, 3] > 0  # not NaN, has alpha

    def test_equal_vmin_vmax(self):
        data = np.array([[5.0, 5.0]])
        rgba = apply_colormap(data, vmin=5.0, vmax=5.0)
        assert rgba.shape == (1, 2, 4)
        assert rgba.dtype == np.uint8

    def test_valid_pixels_opaque(self):
        data = np.array([[0.0, 0.5, 1.0]])
        rgba = apply_colormap(data, vmin=0, vmax=1)
        # All valid pixels should have full alpha (255)
        assert np.all(rgba[0, :, 3] == 255)

    def test_different_colormaps(self):
        data = np.linspace(0, 1, 50).reshape(5, 10)
        for cmap_name in ("jet", "viridis", "coolwarm"):
            rgba = apply_colormap(data, vmin=0, vmax=1, cmap=cmap_name)
            assert rgba.shape == (5, 10, 4)


class TestVizController:
    def test_cache_hit(self, qapp):
        ctrl = VizController()
        data = np.random.rand(50, 50)
        key = (0, "disp_u")

        ctrl.store_interp_result(key, data, None, None)
        cached = ctrl.get_interp_result(key)
        assert cached is not None
        np.testing.assert_array_equal(cached[0], data)

    def test_cache_miss(self, qapp):
        ctrl = VizController()
        assert ctrl.get_interp_result((99, "disp_v")) is None

    def test_clear_all(self, qapp):
        ctrl = VizController()
        ctrl.store_interp_result((0, "disp_u"), np.ones((5, 5)), None, None)
        ctrl.clear_all()
        assert ctrl.get_interp_result((0, "disp_u")) is None

    def test_clear_pixmap_only(self, qapp):
        ctrl = VizController()
        ctrl.store_interp_result((0, "disp_u"), np.ones((5, 5)), None, None)
        ctrl.clear_pixmap_cache()
        # Tier 1 should survive
        assert ctrl.get_interp_result((0, "disp_u")) is not None

    def test_store_with_grids(self, qapp):
        ctrl = VizController()
        data = np.random.rand(20, 30)
        xg = np.arange(30, dtype=np.float64)
        yg = np.arange(20, dtype=np.float64)
        key = (1, "disp_v")
        ctrl.store_interp_result(key, data, xg, yg)
        cached = ctrl.get_interp_result(key)
        assert cached is not None
        np.testing.assert_array_equal(cached[1], xg)
        np.testing.assert_array_equal(cached[2], yg)

    def test_multiple_keys_independent(self, qapp):
        ctrl = VizController()
        d1 = np.ones((5, 5))
        d2 = np.zeros((5, 5))
        ctrl.store_interp_result((0, "disp_u"), d1, None, None)
        ctrl.store_interp_result((0, "disp_v"), d2, None, None)

        c1 = ctrl.get_interp_result((0, "disp_u"))
        c2 = ctrl.get_interp_result((0, "disp_v"))
        assert c1 is not None
        assert c2 is not None
        assert np.all(c1[0] == 1)
        assert np.all(c2[0] == 0)


class TestInvalidNodeGrid:
    """Nearest-node rasterisation of NaN (edge-trimmed) strain nodes."""

    def _grid(self):
        xg, yg = np.meshgrid(
            np.linspace(0, 10, 11), np.linspace(0, 10, 11),
        )
        return xg, yg

    def test_all_finite_returns_none(self):
        nodes = np.array([[0, 0], [10, 0], [0, 10], [10, 10]], float)
        values = np.array([1.0, 1.0, 1.0, 1.0])
        xg, yg = self._grid()
        assert _invalid_node_grid(nodes, values, xg, yg) is None

    def test_all_nan_blanks_everything(self):
        nodes = np.array([[0, 0], [10, 0], [0, 10], [10, 10]], float)
        values = np.full(4, np.nan)
        xg, yg = self._grid()
        mask = _invalid_node_grid(nodes, values, xg, yg)
        assert mask is not None
        assert mask.all()

    def test_trimmed_node_blanks_its_voronoi_cell(self):
        # Node at (0, 10) is trimmed (NaN); the other three are valid.
        nodes = np.array([[0, 0], [10, 0], [0, 10], [10, 10]], float)
        values = np.array([1.0, 1.0, np.nan, 1.0])
        xg, yg = self._grid()  # xy indexing: mask[row=y, col=x]
        mask = _invalid_node_grid(nodes, values, xg, yg)
        assert mask is not None
        # Grid point nearest the trimmed node -> blanked.
        assert mask[10, 0]
        # Corners nearest a valid node -> kept.
        assert not mask[0, 0]
        assert not mask[0, 10]
        assert not mask[10, 10]
        # A proper subset is blanked (not nothing, not everything).
        assert 0 < int(mask.sum()) < mask.size


class TestRenderFieldTrim:
    """End-to-end: blank_invalid_nodes makes trimmed nodes transparent
    instead of interpolator-backfilled."""

    def _mesh(self, H=64, W=64, step=8):
        xs = np.arange(step, W - step + 1, step, float)
        ys = np.arange(step, H - step + 1, step, float)
        XX, YY = np.meshgrid(xs, ys)
        nodes = np.column_stack([XX.ravel(), YY.ravel()])
        return nodes

    def test_trimmed_node_is_transparent_only_when_blanking(self, qapp):
        H = W = 64
        step = 8
        nodes = self._mesh(H, W, step)
        values = np.ones(len(nodes))
        # Trim the node nearest the ROI centre.
        cidx = int(np.argmin(np.hypot(nodes[:, 0] - 32, nodes[:, 1] - 32)))
        values[cidx] = np.nan
        roi = np.ones((H, W), dtype=bool)

        def transparent_count(blank):
            ctrl = VizController()
            pm, _xg, _yg, _s = ctrl.render_field(
                0, "strain_exx", nodes, values, (H, W), step,
                vmin=0.0, vmax=2.0, roi_mask=roi,
                blank_invalid_nodes=blank,
            )
            return int((_pixmap_alpha(pm) == 0).sum())

        # Without blanking, the interpolator back-fills the trimmed cell ->
        # essentially no transparent interior pixels.
        # With blanking, the trimmed node's cell becomes transparent.
        assert transparent_count(True) > transparent_count(False)
