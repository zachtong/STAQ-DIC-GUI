"""Every ``COLORS.<NAME>`` referenced anywhere must exist on the palette.

``Colors`` is a frozen dataclass, so a name that is not a field raises
``AttributeError`` at the point of use rather than failing a type check. Five
references to a non-existent ``COLORS.ERROR`` lived in the export dialog for
exactly that reason: they sit only on error-handling paths, which no ordinary
test exercises, so a failed export raised inside the handler that was supposed
to report the failure -- and the user saw nothing at all.
"""

from __future__ import annotations

import ast
from pathlib import Path

import pytest

from al_dic.gui.theme import COLORS

SRC = Path(__file__).resolve().parents[2] / "src" / "al_dic"


def _colors_attribute_uses() -> list[tuple[Path, int, str]]:
    """Every ``COLORS.<attr>`` in the package, as (file, line, attr)."""
    uses: list[tuple[Path, int, str]] = []
    for py in SRC.rglob("*.py"):
        try:
            tree = ast.parse(py.read_text(encoding="utf-8"), str(py))
        except SyntaxError:  # pragma: no cover - would fail elsewhere first
            continue
        for node in ast.walk(tree):
            if (
                isinstance(node, ast.Attribute)
                and isinstance(node.value, ast.Name)
                and node.value.id == "COLORS"
            ):
                uses.append((py, node.lineno, node.attr))
    return uses


def test_palette_has_every_referenced_token():
    uses = _colors_attribute_uses()
    assert uses, "found no COLORS.* references; the scan is broken, not the code"

    missing = [
        f"{py.relative_to(SRC.parents[1])}:{line}: COLORS.{attr}"
        for py, line, attr in uses
        if not hasattr(COLORS, attr)
    ]
    assert not missing, "undefined palette tokens:\n  " + "\n  ".join(missing)


@pytest.mark.parametrize("token", ["DANGER", "SUCCESS", "WARNING"])
def test_semantic_tokens_are_hex_colours(token):
    value = getattr(COLORS, token)
    assert value.startswith("#") and len(value) == 7, f"{token} = {value!r}"
