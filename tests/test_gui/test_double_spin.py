"""LocaleSafeDoubleSpinBox: numeric input must not depend on the OS locale.

Regression for the field report "typing 0.07 into the exx range becomes 7":
under comma-decimal OS locales (de, fr, es, pt, it, ru, ...) a stock
``QDoubleSpinBox`` treats ``.`` as the thousands separator, so ``0.070``
silently parses as 70. Every GUI numeric input must therefore use
:class:`LocaleSafeDoubleSpinBox`.
"""

from __future__ import annotations

from pathlib import Path

import pytest
from PySide6.QtCore import QLocale
from PySide6.QtTest import QTest
from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

import al_dic.gui
from al_dic.gui.widgets.double_spin import LocaleSafeDoubleSpinBox

# en/zh keep a dot decimal; the rest use a comma decimal with "." as the
# thousands separator — the configuration that triggered the field report.
_OS_LOCALES = ["en_US", "zh_CN", "de_DE", "fr_FR", "es_ES", "pt_BR", "it_IT", "ru_RU"]


@pytest.fixture
def restore_default_locale():
    saved = QLocale()
    yield
    QLocale.setDefault(saved)


def _spin_after_typing(typed: str) -> LocaleSafeDoubleSpinBox:
    """Simulate a user replacing the current text with real keystrokes."""
    spin = LocaleSafeDoubleSpinBox()
    spin.setDecimals(6)
    spin.setRange(-1e9, 1e9)
    spin.setValue(0.01)
    spin.show()
    spin.selectAll()
    QTest.keyClicks(spin, typed)
    spin.interpretText()
    return spin


@pytest.mark.parametrize("os_locale", _OS_LOCALES)
@pytest.mark.parametrize(
    ("typed", "expected"),
    [
        ("0.07", 0.07),     # the exact report: must NOT become 7
        ("0.070", 0.07),    # the exact report: must NOT become 70
        ("0,07", 0.07),     # comma-decimal typing habit is normalised
        ("-0.5", -0.5),
        ("1234.5", 1234.5),
    ],
)
def test_typed_value_is_locale_independent(
    restore_default_locale, os_locale: str, typed: str, expected: float
) -> None:
    QLocale.setDefault(QLocale(os_locale))
    spin = _spin_after_typing(typed)
    assert spin.value() == pytest.approx(expected)


@pytest.mark.parametrize("os_locale", _OS_LOCALES)
def test_display_always_uses_dot_decimal(restore_default_locale, os_locale: str) -> None:
    """Displayed text matches the dot-decimal style used everywhere else."""
    QLocale.setDefault(QLocale(os_locale))
    spin = LocaleSafeDoubleSpinBox()
    spin.setDecimals(3)
    spin.setValue(0.07)
    assert spin.text() == "0.070"


def test_no_raw_qdoublespinbox_in_gui_sources() -> None:
    """Guard: gui/ must instantiate LocaleSafeDoubleSpinBox, never the raw class.

    A raw QDoubleSpinBox reintroduces the OS-locale parsing bug. The only
    allowed occurrence is the subclass definition itself.
    """
    gui_dir = Path(al_dic.gui.__file__).parent
    offenders: list[str] = []
    for py in sorted(gui_dir.rglob("*.py")):
        if py.name == "double_spin.py":
            continue
        if "QDoubleSpinBox(" in py.read_text(encoding="utf-8"):
            offenders.append(str(py.relative_to(gui_dir)))
    assert not offenders, f"raw QDoubleSpinBox() instantiated in: {offenders}"
