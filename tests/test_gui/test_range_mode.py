"""AutoFixedSelector: explicit Auto/Fixed color-range mode selector.

Must stay drop-in compatible with the QCheckBox API it replaced
(isChecked / setChecked / toggled with True = Auto), including signal
blocking on the composite widget.
"""

from __future__ import annotations

from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

from al_dic.gui.widgets.range_mode import AutoFixedSelector


def test_defaults_to_auto():
    sel = AutoFixedSelector()
    assert sel.isChecked() is True
    assert sel._auto_rb.isChecked() is True
    assert sel._fixed_rb.isChecked() is False


def test_radios_are_mutually_exclusive():
    sel = AutoFixedSelector()
    sel.setChecked(False)
    assert sel._fixed_rb.isChecked() is True
    assert sel._auto_rb.isChecked() is False
    sel.setChecked(True)
    assert sel._auto_rb.isChecked() is True
    assert sel._fixed_rb.isChecked() is False


def test_toggled_emits_bool_once_per_mode_change():
    sel = AutoFixedSelector()
    received: list[bool] = []
    sel.toggled.connect(received.append)
    sel.setChecked(False)
    assert received == [False]
    sel.setChecked(True)
    assert received == [False, True]


def test_setchecked_same_mode_does_not_emit():
    sel = AutoFixedSelector()
    received: list[bool] = []
    sel.toggled.connect(received.append)
    sel.setChecked(True)  # already Auto
    assert received == []


def test_blocksignals_on_selector_silences_toggled():
    """Call sites use blockSignals() on the composite exactly like the
    old checkbox; the forwarded signal must respect it."""
    sel = AutoFixedSelector()
    received: list[bool] = []
    sel.toggled.connect(received.append)
    sel.blockSignals(True)
    sel.setChecked(False)
    sel.blockSignals(False)
    assert received == []
    assert sel.isChecked() is False


def test_clicking_fixed_radio_emits_false():
    sel = AutoFixedSelector()
    received: list[bool] = []
    sel.toggled.connect(received.append)
    sel._fixed_rb.click()
    assert received == [False]
    assert sel.isChecked() is False
