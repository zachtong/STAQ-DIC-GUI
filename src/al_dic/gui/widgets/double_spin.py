"""Locale-safe numeric spin box shared by every GUI numeric input.

``QDoubleSpinBox`` parses keystrokes with the widget's locale, which
defaults to the *operating system* locale — not the app's UI language.
Under comma-decimal locales (de, fr, es, pt, it, ru, …) Qt treats ``.``
as the thousands separator, so typing ``0.070`` silently commits the
value ``70``. pyALDIC displays numbers with a dot decimal everywhere
else (colorbars, exports, logs), so numeric *input* must accept a dot
regardless of the OS locale.

:class:`LocaleSafeDoubleSpinBox` pins the widget to the C locale with
group separators rejected, and normalises a typed ``,`` to ``.`` so
users from comma-decimal countries can keep their typing habit. Both
``0.07`` and ``0,07`` therefore mean seven hundredths on any machine.
"""

from __future__ import annotations

from PySide6.QtCore import QLocale
from PySide6.QtWidgets import QDoubleSpinBox, QWidget


def _c_locale_no_grouping() -> QLocale:
    locale = QLocale.c()
    locale.setNumberOptions(
        QLocale.NumberOption.RejectGroupSeparator
        | QLocale.NumberOption.OmitGroupSeparator
    )
    return locale


class LocaleSafeDoubleSpinBox(QDoubleSpinBox):
    """Drop-in ``QDoubleSpinBox`` with OS-locale-independent parsing."""

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self.setLocale(_c_locale_no_grouping())

    # Qt calls validate() on every keystroke; rewriting "," to "." here
    # both accepts the comma key and shows the normalised dot in the
    # editor immediately.
    def validate(self, text: str, pos: int) -> object:
        return super().validate(text.replace(",", "."), pos)

    def valueFromText(self, text: str) -> float:
        return super().valueFromText(text.replace(",", "."))

    def fixup(self, text: str) -> str:
        return super().fixup(text.replace(",", "."))


__all__ = ["LocaleSafeDoubleSpinBox"]
