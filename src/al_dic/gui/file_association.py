"""Register the ``.aldic`` file type so double-clicking opens pyALDIC.

Windows-only, per-user (HKCU\\Software\\Classes) so no administrator rights are
needed. The launch command is ``pythonw -m al_dic "%1"``; the app's ``main``
opens any ``.aldic`` path passed on the command line.

Only ``.aldic`` is associated -- Windows keys associations on the final
extension, so the legacy ``.aldic.json`` would collide with plain ``.json``.
Sessions saved by this build use the ``.aldic`` bundle.
"""

from __future__ import annotations

import sys
from pathlib import Path

PROGID = "pyALDIC.Session"
EXT = ".aldic"


def is_supported() -> bool:
    """True on platforms where association is implemented (Windows)."""
    return sys.platform == "win32"


def _launcher() -> str:
    """Prefer pythonw.exe (no console window) next to the interpreter."""
    exe = Path(sys.executable)
    candidate = exe.with_name("pythonw.exe")
    return str(candidate if candidate.exists() else exe)


def open_command() -> str:
    """The ``shell\\open\\command`` string used for the association."""
    return f'"{_launcher()}" -m al_dic "%1"'


def is_associated() -> bool:
    """True if ``.aldic`` currently points at our ProgID for this user."""
    if not is_supported():
        return False
    import winreg
    try:
        with winreg.OpenKey(
            winreg.HKEY_CURRENT_USER, rf"Software\Classes\{EXT}"
        ) as key:
            value, _ = winreg.QueryValueEx(key, "")
            return value == PROGID
    except OSError:
        return False


def register_association() -> None:
    """Register ``.aldic`` -> pyALDIC for the current user (HKCU).

    Raises ``RuntimeError`` on unsupported platforms and ``OSError`` if the
    registry cannot be written.
    """
    if not is_supported():
        raise RuntimeError("File association is only supported on Windows.")
    import winreg

    cmd = open_command()
    with winreg.CreateKey(
        winreg.HKEY_CURRENT_USER, rf"Software\Classes\{EXT}"
    ) as key:
        winreg.SetValueEx(key, "", 0, winreg.REG_SZ, PROGID)
    with winreg.CreateKey(
        winreg.HKEY_CURRENT_USER, rf"Software\Classes\{PROGID}"
    ) as key:
        winreg.SetValueEx(key, "", 0, winreg.REG_SZ, "pyALDIC Session")
    with winreg.CreateKey(
        winreg.HKEY_CURRENT_USER,
        rf"Software\Classes\{PROGID}\shell\open\command",
    ) as key:
        winreg.SetValueEx(key, "", 0, winreg.REG_SZ, cmd)

    # Ask Explorer to pick up the change immediately.
    try:  # pragma: no cover - cosmetic shell refresh
        import ctypes
        SHCNE_ASSOCCHANGED = 0x08000000
        ctypes.windll.shell32.SHChangeNotify(SHCNE_ASSOCCHANGED, 0, None, None)
    except Exception:
        pass


def unregister_association() -> None:
    """Remove the ``.aldic`` association for the current user (best effort)."""
    if not is_supported():
        return
    import winreg
    for sub in (
        rf"Software\Classes\{PROGID}\shell\open\command",
        rf"Software\Classes\{PROGID}\shell\open",
        rf"Software\Classes\{PROGID}\shell",
        rf"Software\Classes\{PROGID}",
        rf"Software\Classes\{EXT}",
    ):
        try:
            winreg.DeleteKey(winreg.HKEY_CURRENT_USER, sub)
        except OSError:
            pass
