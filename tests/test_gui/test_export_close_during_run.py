"""Closing the export dialog mid-export must not take the application down.

A user reported that clicking Close while strain images were being written
(~30% of the way through) closed every window and dropped Python back to the
prompt. The export workers are QThreads parented to the dialog, and the dialog
had no close handling: Qt destroyed a running thread, which aborts the process.

These tests pin the teardown contract. ``test_close_while_running_survives`` is
the end-to-end one -- it runs in a subprocess because the failure it guards
against kills the interpreter outright, which pytest cannot catch.
"""

from __future__ import annotations

import subprocess
import sys
import textwrap
import time

import numpy as np
import pytest
from PySide6.QtCore import QThread, Signal
from PySide6.QtWidgets import QApplication

from al_dic.core.config import dicpara_default
from al_dic.core.data_structures import (
    DICMesh, FrameResult, FrameSchedule, PipelineResult, StrainResult,
)
from al_dic.gui.dialogs.export_dialog import ExportDialog, VizExportHint

app = QApplication.instance() or QApplication([])


def _result(img=64):
    xs, ys = np.meshgrid(np.linspace(8, img - 8, 4), np.linspace(8, img - 8, 4))
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
    return PipelineResult(
        dic_para=dicpara_default(img_size=(img, img)), dic_mesh=mesh,
        result_disp=[fr, fr], result_def_grad=[fr, fr], result_strain=[sr, sr],
        result_fe_mesh_each_frame=[mesh, mesh],
        frame_schedule=FrameSchedule.from_mode("accumulative", 3))


class _SlowWorker(QThread):
    """Stand-in with the export workers' interface, stoppable on request."""

    progress = Signal(int, int, str)
    finished = Signal(list)
    error = Signal(str)

    def __init__(self, parent=None) -> None:
        super().__init__(parent)
        self._stop = False
        self.saw_stop_request = False

    def request_stop(self) -> None:
        self._stop = True
        self.saw_stop_request = True

    def run(self) -> None:
        for _ in range(400):           # ~4 s if never asked to stop
            if self._stop:
                break
            self.msleep(10)
        self.finished.emit([])


def _dialog_with_running_worker(attr: str) -> tuple[ExportDialog, _SlowWorker]:
    dlg = ExportDialog(_result(), None, VizExportHint(), image_files=[])
    worker = _SlowWorker(parent=dlg)
    setattr(dlg, attr, worker)
    worker.start()
    for _ in range(200):               # wait until it is really running
        if worker.isRunning():
            break
        time.sleep(0.005)
    assert worker.isRunning()
    return dlg, worker


@pytest.mark.parametrize("attr", ["_img_worker", "_anim_worker"])
@pytest.mark.parametrize("action", ["reject", "close", "accept"])
def test_closing_stops_and_joins_the_worker(attr: str, action: str):
    """Every way out of the dialog must leave no export thread running."""
    dlg, worker = _dialog_with_running_worker(attr)

    getattr(dlg, action)()

    assert worker.saw_stop_request, "the worker must be asked to stop"
    assert not worker.isRunning(), (
        "the dialog must not be left holding a running export thread"
    )
    assert getattr(dlg, attr) is None
    dlg.deleteLater()


def test_close_with_no_worker_is_harmless():
    dlg = ExportDialog(_result(), None, VizExportHint(), image_files=[])
    dlg.reject()          # never started an export
    dlg.close()
    dlg.deleteLater()


# --------------------------------------------------------------------------
# End-to-end: the original crash killed the interpreter, so run it isolated.
# --------------------------------------------------------------------------

_SUBPROCESS = textwrap.dedent(
    """
    import sys, time
    from PySide6.QtCore import QThread, Signal
    from PySide6.QtWidgets import QApplication
    app = QApplication([])

    sys.path.insert(0, TESTS_DIR)
    from test_export_close_during_run import _result, _SlowWorker
    from al_dic.gui.dialogs.export_dialog import ExportDialog, VizExportHint

    def open_and_close():
        # Mirrors strain_window._on_export: build, show, close, drop the ref.
        dlg = ExportDialog(_result(), None, VizExportHint(), image_files=[])
        w = _SlowWorker(parent=dlg)
        dlg._img_worker = w
        w.start()
        while not w.isRunning():
            time.sleep(0.005)
        dlg.reject()                       # user clicks Close mid-export

    open_and_close()                       # local reference goes out of scope
    import gc; gc.collect()
    time.sleep(0.5)
    print("SURVIVED")
    """
)


def test_close_while_running_survives(tmp_path):
    """The whole process must still be alive after a mid-export close."""
    script = tmp_path / "close_mid_export.py"
    tests_dir = str((__import__("pathlib").Path(__file__)).parent)
    script.write_text(
        f"TESTS_DIR = {tests_dir!r}\n" + _SUBPROCESS, encoding="utf-8"
    )

    proc = subprocess.run(
        [sys.executable, str(script)],
        capture_output=True, text=True, timeout=180,
        env={**__import__("os").environ, "QT_QPA_PLATFORM": "offscreen"},
    )

    assert proc.returncode == 0, (
        f"process died on close (rc={proc.returncode}).\n"
        f"stdout:\n{proc.stdout}\nstderr:\n{proc.stderr}"
    )
    assert "SURVIVED" in proc.stdout, proc.stdout
