"""Keep dialogs fully on screen.

A modal ``QDialog`` created with a parent window has no taskbar button, so if
it opens off-screen -- taller than a small display, or centred on a window that
sits near a screen edge or on a since-disconnected monitor -- the user can
neither move, reach, nor close it, and (being modal) the whole application
looks frozen.  ``fit_dialog_to_screen`` clamps the dialog to the usable screen
area and repositions it, centred on its parent, so the title bar and its close
button always stay reachable.

The size/position maths lives in the pure :func:`fitted_geometry` helper so it
can be unit-tested without a display (``QRect`` is a value type and needs no
``QApplication``).
"""

from __future__ import annotations

from PySide6.QtCore import QRect
from PySide6.QtGui import QGuiApplication
from PySide6.QtWidgets import QWidget


def fitted_geometry(
    natural: QRect,
    avail: QRect,
    center_on: QRect | None,
    margin_w: int = 40,
    margin_h: int = 80,
) -> QRect:
    """Return the frame geometry that fits *natural* inside *avail*.

    The size is clamped to the usable area (minus a margin that leaves room for
    the window frame and taskbar); the rect is centred on *center_on* (or on
    *avail* when it is ``None``); finally the position is clamped so the
    top-left corner -- the title bar and its close button -- always stays
    inside *avail*, even when the dialog is larger than the screen (e.g. a
    fixed-minimum-size dialog on a tiny display).  Keeping the top-left visible
    is what guarantees the dialog can never become completely unreachable.

    Pure geometry: no widgets, no display -- unit-testable in isolation.
    """
    w = max(1, min(natural.width(), avail.width() - margin_w))
    h = max(1, min(natural.height(), avail.height() - margin_h))
    rect = QRect(0, 0, w, h)
    rect.moveCenter(center_on.center() if center_on is not None else avail.center())

    # Pull the far edges in first, then guarantee the near edges: when the
    # dialog cannot shrink below its minimum and still overflows, top-left
    # visibility wins over bottom-right.
    if rect.right() > avail.right():
        rect.moveRight(avail.right())
    if rect.bottom() > avail.bottom():
        rect.moveBottom(avail.bottom())
    rect.moveLeft(max(rect.left(), avail.left()))
    rect.moveTop(max(rect.top(), avail.top()))
    return rect


def fit_dialog_to_screen(dialog: QWidget, parent: QWidget | None = None) -> None:
    """Resize and reposition *dialog* so its whole frame stays on screen.

    Call once from ``showEvent`` -- the layout, and hence ``frameGeometry``, is
    only realised once the dialog is first shown.  ``resize`` still respects any
    ``minimumSize`` the dialog set, so on a display smaller than that minimum
    the dialog keeps its minimum size but is anchored to the top-left of the
    screen rather than drifting out of reach.
    """
    reference = parent if parent is not None else dialog
    screen = reference.screen() or QGuiApplication.primaryScreen()
    if screen is None:  # headless / no display -- nothing to clamp to
        return
    center_on = (
        parent.frameGeometry()
        if parent is not None and parent.isVisible()
        else None
    )
    target = fitted_geometry(
        dialog.frameGeometry(), screen.availableGeometry(), center_on
    )
    dialog.resize(target.size())
    dialog.move(target.topLeft())
