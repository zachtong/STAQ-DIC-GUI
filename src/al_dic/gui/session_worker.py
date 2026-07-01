"""Background worker for session save / load.

Saving or loading a session with results can move gigabytes, so the work runs
off the UI thread. The worker calls a supplied ``fn(progress_cb)`` and forwards
progress / completion / failure via Qt signals. GUI-touching follow-up work
(e.g. ``apply_session``) must be done by the caller in the ``done`` slot, on
the main thread.
"""

from __future__ import annotations

from typing import Any, Callable

from PySide6.QtCore import QThread, Signal


class SessionOpWorker(QThread):
    """Run ``fn(progress_cb)`` on a background thread.

    ``fn`` receives a ``progress_cb(fraction: float, message: str)`` it may
    call to report progress; the worker marshals those onto :attr:`progress`.
    """

    progress = Signal(float, str)
    done = Signal(object)   # fn's return value (SessionData for load, None for save)
    failed = Signal(str)

    def __init__(self, fn: Callable[[Callable[[float, str], None]], Any],
                 parent=None) -> None:
        super().__init__(parent)
        self._fn = fn

    def run(self) -> None:  # noqa: D401 - QThread entry point
        try:
            result = self._fn(lambda frac, msg: self.progress.emit(float(frac), str(msg)))
            self.done.emit(result)
        except Exception as exc:  # surface to the UI, never crash the thread
            self.failed.emit(f"{type(exc).__name__}: {exc}")


def format_bytes(n: int) -> str:
    """Human-readable byte size, e.g. ``1.4 GB``."""
    size = float(n)
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if size < 1024.0 or unit == "TB":
            return f"{size:.0f} {unit}" if unit == "B" else f"{size:.1f} {unit}"
        size /= 1024.0
    return f"{size:.1f} TB"
