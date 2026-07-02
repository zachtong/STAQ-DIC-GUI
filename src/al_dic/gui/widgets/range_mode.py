"""Explicit Auto / Fixed choice for the color-range mode.

UX feedback: a lone "Auto" checkbox reads as *auto or not-auto*; the
actual choice is between two strategies — rescale to the data range
every frame (Auto) or keep user-supplied bounds (Fixed). Two exclusive
radio buttons state that choice explicitly.

The API deliberately mirrors ``QCheckBox`` (``isChecked`` /
``setChecked`` / ``toggled`` with ``True`` = Auto) so the selector drops
into the existing checkbox call sites, saved sessions and tests
without any state-model change.
"""

from __future__ import annotations

from PySide6.QtCore import Signal
from PySide6.QtWidgets import QButtonGroup, QHBoxLayout, QRadioButton, QWidget


class AutoFixedSelector(QWidget):
    """Two exclusive radio buttons: Auto (data range) vs Fixed (manual)."""

    # True = Auto, False = Fixed — same convention as the old checkbox.
    toggled = Signal(bool)

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        row = QHBoxLayout(self)
        row.setContentsMargins(0, 0, 0, 0)
        row.setSpacing(8)

        self._auto_rb = QRadioButton(
            self.tr("Auto", "Color range mode: rescale to the data range")
        )
        self._auto_rb.setToolTip(
            self.tr("Rescale the color range to each frame's data range")
        )
        self._fixed_rb = QRadioButton(
            self.tr("Fixed", "Color range mode: manual min/max bounds")
        )
        self._fixed_rb.setToolTip(
            self.tr("Keep the manual Min/Max bounds for every frame")
        )

        group = QButtonGroup(self)
        group.addButton(self._auto_rb)
        group.addButton(self._fixed_rb)
        self._auto_rb.setChecked(True)

        row.addWidget(self._auto_rb)
        row.addWidget(self._fixed_rb)
        row.addStretch()

        # Signal-to-signal forward: the re-emission happens from *this*
        # object, so callers' blockSignals(True) on the selector silences
        # it exactly like it silenced the old checkbox.
        self._auto_rb.toggled.connect(self.toggled)

    # -- QCheckBox-compatible API ---------------------------------------

    def isChecked(self) -> bool:
        """True when Auto is selected."""
        return self._auto_rb.isChecked()

    def setChecked(self, auto: bool) -> None:
        """Select Auto (True) or Fixed (False)."""
        target = self._auto_rb if auto else self._fixed_rb
        target.setChecked(True)


__all__ = ["AutoFixedSelector"]
