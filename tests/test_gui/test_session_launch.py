"""Tests for opening a session from the command line + the .aldic file
association (B: double-click to open)."""

from __future__ import annotations

import pytest
from PySide6.QtWidgets import QApplication

app = QApplication.instance() or QApplication([])

from al_dic.gui import file_association as fa
from al_dic.gui.app import _session_path_from_argv


# --- command-line / double-click argument parsing -------------------------

def test_argv_picks_existing_aldic(tmp_path):
    p = tmp_path / "run.aldic"
    p.write_bytes(b"PK\x03\x04")  # any existing file
    assert _session_path_from_argv(["al-dic", str(p)]) == str(p)


def test_argv_accepts_legacy_json(tmp_path):
    p = tmp_path / "run.aldic.json"
    p.write_text("{}", encoding="utf-8")
    assert _session_path_from_argv(["al-dic", str(p)]) == str(p)


def test_argv_ignores_missing_or_unrelated(tmp_path):
    assert _session_path_from_argv(["al-dic"]) is None
    assert _session_path_from_argv(["al-dic", str(tmp_path / "nope.aldic")]) is None
    other = tmp_path / "image.png"
    other.write_bytes(b"x")
    assert _session_path_from_argv(["al-dic", str(other)]) is None


# --- file association helpers ---------------------------------------------

def test_open_command_shape():
    cmd = fa.open_command()
    assert "-m al_dic" in cmd and '"%1"' in cmd
    assert fa.EXT == ".aldic" and fa.PROGID == "pyALDIC.Session"


@pytest.mark.skipif(not fa.is_supported(), reason="Windows-only association")
def test_register_roundtrip_restores_prior():
    import winreg

    prior = None
    try:
        with winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Classes\.aldic") as k:
            prior, _ = winreg.QueryValueEx(k, "")
    except OSError:
        prior = None

    try:
        fa.register_association()
        assert fa.is_associated()
        fa.unregister_association()
        assert not fa.is_associated()
    finally:
        if prior is not None:
            with winreg.CreateKey(
                winreg.HKEY_CURRENT_USER, r"Software\Classes\.aldic"
            ) as k:
                winreg.SetValueEx(k, "", 0, winreg.REG_SZ, prior)
