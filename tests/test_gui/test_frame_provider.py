"""B-phase-3: StreamingFrameProvider must be byte-identical to the eager
ListFrameProvider, both per-frame and end-to-end through run_aldic."""

import numpy as np
import pytest
from PIL import Image
from PySide6.QtWidgets import QApplication

from al_dic.core.data_structures import DICPara, GridxyROIRange
from al_dic.core.pipeline import run_aldic
from al_dic.gui.controllers.frame_provider import StreamingFrameProvider
from al_dic.gui.controllers.image_controller import _decode_grayscale_float64
from al_dic.io.image_ops import ListFrameProvider


@pytest.fixture(scope="module")
def qapp():
    app = QApplication.instance() or QApplication([])
    yield app


def _write_sequence(folder, n=5, h=64, w=64):
    """Write n distinct uint8 frames; return (paths, eager-decoded floats)."""
    rng = np.random.default_rng(0)
    base = (rng.random((h, w)) * 255).astype(np.uint8)
    paths, imgs = [], []
    for i in range(n):
        arr = np.clip(base.astype(np.int16) + i, 0, 255).astype(np.uint8)
        p = folder / f"img_{i:02d}.tif"
        Image.fromarray(arr).save(p)
        paths.append(str(p))
        imgs.append(_decode_grayscale_float64(str(p)))  # the eager path's frame
    return paths, imgs


def _make_para(h, w, roi, **overrides):
    defaults = dict(
        winstepsize=16, winsize=20, winsize_min=8, tol=1e-2, mu=1e-3,
        admm_max_iter=2, admm_tol=1e-2, gauss_pt_order=2, alpha=0.0,
        use_global_step=False, disp_smoothness=0.0, strain_smoothness=0.0,
        smoothness=0.0, method_to_compute_strain=3, strain_type=0,
        gridxy_roi_range=roi, img_size=(h, w), icgn_max_iter=50,
    )
    defaults.update(overrides)
    return DICPara(**defaults)


class TestStreamingFrameProvider:
    def test_per_frame_byte_identical_to_list(self, qapp, tmp_path):
        paths, imgs = _write_sequence(tmp_path, n=5)
        roi = GridxyROIRange(gridx=(8, 50), gridy=(8, 50))
        list_prov = ListFrameProvider(imgs, roi)
        stream_prov = StreamingFrameProvider(paths, roi, capacity=2)

        assert len(stream_prov) == len(list_prov) == 5
        assert stream_prov.shape == list_prov.shape
        assert stream_prov.clamped_roi == list_prov.clamped_roi
        # Out-of-order + repeated access exercises the bounded LRU and the
        # disk re-read on a miss; every frame must match the eager provider.
        for i in [0, 3, 1, 3, 4, 0, 2, 4]:
            np.testing.assert_array_equal(
                stream_prov.get_normalized(i), list_prov.get_normalized(i)
            )

    def test_run_aldic_streaming_matches_list(self, qapp, tmp_path):
        paths, imgs = _write_sequence(tmp_path, n=3, h=64, w=64)
        masks = [np.ones((64, 64))] * 3
        roi = GridxyROIRange(gridx=(10, 54), gridy=(10, 54))
        para = _make_para(64, 64, roi, reference_mode="incremental")

        res_list = run_aldic(para, imgs, masks, compute_strain=False)
        provider = StreamingFrameProvider(paths, roi, capacity=2)
        res_stream = run_aldic(para, provider, masks, compute_strain=False)

        assert len(res_stream.result_disp) == len(res_list.result_disp)
        for a, b in zip(res_list.result_disp, res_stream.result_disp):
            if a is None or b is None:
                assert a is None and b is None
                continue
            np.testing.assert_array_equal(b.U, a.U)

    def test_does_not_touch_image_controller_cache(self, qapp, tmp_path):
        # Cross-thread safety: the streaming provider owns a private LRU and
        # uses the stateless module decode, so the compute path never
        # populates (or races on) the GUI's float64 ImageController cache.
        from al_dic.gui.app_state import AppState
        from al_dic.gui.controllers.image_controller import ImageController

        paths, _ = _write_sequence(tmp_path, n=4)
        state = AppState.instance()
        state.reset()
        state.set_image_files(paths)
        ctrl = ImageController(state)
        roi = GridxyROIRange(gridx=(8, 50), gridy=(8, 50))

        provider = StreamingFrameProvider(paths, roi, capacity=2)
        for i in range(4):
            provider.get_normalized(i)

        assert len(ctrl._cache) == 0

    def test_unreadable_reference_frame_surfaces_fatal(self, qapp, tmp_path):
        # Regression: with the lazy provider, frame 0 is decoded on the first
        # provider.shape access inside the worker. That access lives inside
        # the worker's try block, so an unreadable reference frame must emit
        # fatal_error + finished_result(None) (exit RUNNING) instead of
        # hanging the GUI with an uncaught worker-thread exception.
        from al_dic.gui.controllers.pipeline_controller import PipelineWorker

        bad = [str(tmp_path / "missing0.tif"), str(tmp_path / "missing1.tif")]
        roi = GridxyROIRange(gridx=(5, 30), gridy=(5, 30))
        provider = StreamingFrameProvider(bad, roi)
        para = _make_para(40, 40, roi)
        masks = [np.ones((40, 40)), np.ones((40, 40))]

        worker = PipelineWorker(para, provider, masks)
        fatals, finished = [], []
        worker.fatal_error.connect(lambda t, m: fatals.append((t, m)))
        worker.finished_result.connect(lambda r: finished.append(r))
        worker.run()  # synchronous in this thread

        assert len(fatals) == 1        # fatal dialog raised
        assert finished == [None]      # exited RUNNING, did not hang
