"""Unit tests for al_dic.gui.window_geometry.fitted_geometry.

Pure geometry -- no QApplication / display needed (QRect is a QtCore value
type).  These lock in the invariant that a fitted dialog can never become
unreachable: its top-left corner (title bar + close button) always stays
inside the available screen area, and its size never exceeds that area.
"""

from PySide6.QtCore import QRect

from al_dic.gui.window_geometry import fitted_geometry

MARGIN_W = 40
MARGIN_H = 80


def _assert_reachable(result: QRect, avail: QRect) -> None:
    """The top-left must stay inside avail and the size within the usable area."""
    assert result.left() >= avail.left()
    assert result.top() >= avail.top()
    assert result.width() <= avail.width() - MARGIN_W
    assert result.height() <= avail.height() - MARGIN_H


def test_normal_dialog_centres_on_parent() -> None:
    avail = QRect(0, 0, 1920, 1080)
    parent = QRect(400, 200, 1000, 700)  # centre (899, 549)
    natural = QRect(0, 0, 780, 600)

    result = fitted_geometry(natural, avail, parent)

    assert result.size() == natural.size()  # fits -> unchanged size
    assert avail.contains(result)  # fully on screen
    # Centre matches the parent's centre (Qt integer rounding -> within 1px).
    assert abs(result.center().x() - parent.center().x()) <= 1
    assert abs(result.center().y() - parent.center().y()) <= 1


def test_taller_than_screen_is_clamped_in_height() -> None:
    avail = QRect(0, 0, 1366, 768)
    natural = QRect(0, 0, 780, 1200)  # 1200 px tall > screen

    result = fitted_geometry(natural, avail, None)

    assert result.height() == 768 - MARGIN_H  # clamped to usable height
    assert avail.contains(result)
    _assert_reachable(result, avail)


def test_parent_on_disconnected_monitor_is_pulled_back() -> None:
    avail = QRect(0, 0, 1920, 1080)
    parent = QRect(3000, 500, 200, 200)  # centre far off the right edge
    natural = QRect(0, 0, 780, 600)

    result = fitted_geometry(natural, avail, parent)

    assert avail.contains(result)  # dragged fully back on screen
    assert result.right() <= avail.right()
    _assert_reachable(result, avail)


def test_respects_reserved_top_strip() -> None:
    # availableGeometry excludes a top menu bar / taskbar: origin is not (0,0).
    avail = QRect(0, 40, 1920, 1000)
    natural = QRect(0, 0, 780, 600)

    result = fitted_geometry(natural, avail, None)

    assert result.top() >= 40  # never rides up under the reserved strip
    assert avail.contains(result)


def test_oversized_natural_still_keeps_top_left_reachable() -> None:
    # Even if the natural size dwarfs a tiny screen, top-left stays visible.
    avail = QRect(0, 0, 900, 600)
    natural = QRect(0, 0, 2000, 2000)

    result = fitted_geometry(natural, avail, None)

    _assert_reachable(result, avail)
    assert avail.contains(result)
