"""Tests for image loading controller."""

import tempfile
from pathlib import Path

import numpy as np
import pytest
from PIL import Image
from PySide6.QtWidgets import QApplication

from al_dic.gui.app_state import AppState
from al_dic.gui.controllers.image_controller import (
    ImageController,
    _RGB_CACHE_SIZE,
)


@pytest.fixture(scope="module")
def qapp():
    app = QApplication.instance() or QApplication([])
    yield app


@pytest.fixture
def image_folder(tmp_path):
    for name in ["img_1.tif", "img_10.tif", "img_2.tif", "img_20.tif"]:
        img = Image.fromarray(np.zeros((64, 64), dtype=np.uint8))
        img.save(tmp_path / name)
    return tmp_path


class TestImageController:
    def test_lexicographic_sort_default(self, qapp, image_folder):
        """Default sort is lexicographic (for zero-padded names)."""
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(str(image_folder))
        names = [Path(f).name for f in state.image_files]
        # Lexicographic: "1" < "10" < "2" < "20"
        assert names == ["img_1.tif", "img_10.tif", "img_2.tif", "img_20.tif"]

    def test_natural_sort(self, qapp, image_folder):
        """Natural sort treats embedded numbers as integers."""
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.set_natural_sort(True)
        ctrl.load_folder(str(image_folder))
        names = [Path(f).name for f in state.image_files]
        assert names == ["img_1.tif", "img_2.tif", "img_10.tif", "img_20.tif"]

    def test_load_populates_state(self, qapp, image_folder):
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(str(image_folder))
        assert len(state.image_files) == 4
        assert state.image_folder == Path(image_folder)

    def test_read_image_returns_float64(self, qapp, image_folder):
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(str(image_folder))
        img = ctrl.read_image(0)
        assert img.dtype == np.float64
        assert img.ndim == 2

    def test_empty_folder(self, qapp, tmp_path):
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(str(tmp_path))
        assert state.image_files == []

    def test_supported_extensions(self, qapp, tmp_path):
        Image.fromarray(np.zeros((10, 10), dtype=np.uint8)).save(tmp_path / "a.tif")
        Image.fromarray(np.zeros((10, 10), dtype=np.uint8)).save(tmp_path / "b.png")
        (tmp_path / "c.txt").write_text("not an image")
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(str(tmp_path))
        assert len(state.image_files) == 2


def _make_seq(folder: Path, fills: list[int]) -> Path:
    """Write zero-padded tif frames each filled with a distinct uint8 value."""
    folder.mkdir(parents=True, exist_ok=True)
    for i, fill in enumerate(fills):
        arr = np.full((64, 64), fill, dtype=np.uint8)
        Image.fromarray(arr).save(folder / f"img_{i:02d}.tif")
    return folder


class TestRgbCacheLRU:
    """Change A: bounded LRU on the RGB preview cache (_cache_rgb). The
    float64 COMPUTE cache (_cache) must stay an unbounded plain dict."""

    def test_rgb_cache_is_bounded(self, qapp, tmp_path):
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        n = _RGB_CACHE_SIZE + 4
        ctrl.load_folder(str(_make_seq(tmp_path / "seq", list(range(n)))))
        for i in range(n):
            ctrl.read_image_rgb(i)
            assert len(ctrl._cache_rgb) <= _RGB_CACHE_SIZE
        assert len(ctrl._cache_rgb) == _RGB_CACHE_SIZE

    def test_lru_recency_not_fifo(self, qapp, tmp_path):
        """Re-accessing the oldest frame must save it from eviction (LRU,
        not FIFO)."""
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(
            str(_make_seq(tmp_path / "seq", list(range(_RGB_CACHE_SIZE + 2)))))
        for i in range(_RGB_CACHE_SIZE):
            ctrl.read_image_rgb(i)          # fill exactly to cap
        ctrl.read_image_rgb(0)              # re-touch oldest -> now MRU
        ctrl.read_image_rgb(_RGB_CACHE_SIZE)  # insert -> evicts new LRU (1)
        assert 0 in ctrl._cache_rgb          # survived via move_to_end
        assert 1 not in ctrl._cache_rgb      # true LRU evicted

    def test_decode_deterministic_after_eviction(self, qapp, tmp_path):
        """Eviction is perf-only: a re-decoded frame is pixel-identical."""
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        n = _RGB_CACHE_SIZE + 3
        ctrl.load_folder(str(_make_seq(tmp_path / "seq", list(range(n)))))
        first = ctrl.read_image_rgb(0).copy()
        for i in range(1, n):
            ctrl.read_image_rgb(i)           # force eviction of frame 0
        assert 0 not in ctrl._cache_rgb
        again = ctrl.read_image_rgb(0)       # re-decoded from disk
        assert np.array_equal(first, again)

    def test_stale_frame_cleared_on_reload(self, qapp, tmp_path):
        """RISK A-3: switching sequences must not serve a stale frame-0."""
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        ctrl.load_folder(str(_make_seq(tmp_path / "A", [10, 11, 12])))
        a0 = ctrl.read_image_rgb(0)
        assert int(a0[0, 0, 0]) == 10
        ctrl.load_folder(str(_make_seq(tmp_path / "B", [200, 201, 202])))
        b0 = ctrl.read_image_rgb(0)
        assert int(b0[0, 0, 0]) == 200       # B's frame 0, not A's stale 10

    def test_float64_compute_cache_untouched(self, qapp, tmp_path):
        """A must NOT bound or convert the float64 compute cache."""
        state = AppState.instance()
        state.reset()
        ctrl = ImageController(state)
        n = _RGB_CACHE_SIZE + 5
        ctrl.load_folder(str(_make_seq(tmp_path / "seq", list(range(n)))))
        for i in range(n):
            ctrl.read_image(i)               # float64 compute path
        assert type(ctrl._cache) is dict     # still a plain dict
        assert len(ctrl._cache) == n         # unbounded: all frames resident
        assert len(ctrl._cache) > _RGB_CACHE_SIZE

    def test_second_controller_also_bounded(self, qapp, tmp_path):
        """StrainWindow owns its own ImageController; the class-level LRU
        bound applies to it too."""
        state = AppState.instance()
        state.reset()
        folder = _make_seq(tmp_path / "seq", list(range(_RGB_CACHE_SIZE + 3)))
        c1 = ImageController(state)
        c1.load_folder(str(folder))
        c2 = ImageController(state)           # e.g. StrainWindow's controller
        for i in range(_RGB_CACHE_SIZE + 3):
            c2.read_image_rgb(i)
        assert len(c2._cache_rgb) <= _RGB_CACHE_SIZE
