"""Register the ``.aldic`` file type so double-clicking opens pyALDIC.

Windows-only, per-user (HKCU\\Software\\Classes) so no administrator rights are
needed. The launch command is ``pythonw -m al_dic "%1"`` for a source install and
simply ``pyALDIC.exe "%1"`` for a frozen build; the app's ``main`` opens
any ``.aldic`` path passed on the command line.

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
    """The ``shell\\open\\command`` string used for the association.

    In a frozen build ``sys.executable`` is pyALDIC.exe itself, which takes
    the session path as a plain argument -- there is no interpreter to hand
    ``-m al_dic`` to, and the bootloader would be within its rights to consume
    the flag.
    """
    exe = Path(sys.executable)
    if getattr(sys, "frozen", False):
        return f'"{exe}" "%1"'
    return f'"{_launcher()}" -m al_dic "%1"'


def _registered_command() -> str | None:
    """The command currently stored for our ProgID, or None."""
    import winreg

    try:
        with winreg.OpenKey(
            winreg.HKEY_CURRENT_USER,
            rf"Software\Classes\{PROGID}\shell\open\command",
        ) as key:
            value, _ = winreg.QueryValueEx(key, "")
            return value
    except OSError:
        return None


def is_associated() -> bool:
    """True if ``.aldic`` currently opens with *this* copy of pyALDIC.

    The stored command is compared too, not just the ProgID. A portable
    onedir bundle gets unzipped, used, deleted and re-downloaded somewhere
    else; the registry still names the old path, and reporting that as
    "already associated" would leave the user with a dead double-click and no
    control in the interface offering to repair it.
    """
    if not is_supported():
        return False
    import winreg
    try:
        with winreg.OpenKey(
            winreg.HKEY_CURRENT_USER, rf"Software\Classes\{EXT}"
        ) as key:
            value, _ = winreg.QueryValueEx(key, "")
    except OSError:
        return False
    return value == PROGID and _registered_command() == open_command()


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

    # Explorer draws .aldic files with this icon. Best effort: a missing asset
    # costs a generic icon, never a failed registration.
    try:
        from al_dic.gui.icons import app_icon_file

        ico = app_icon_file("pyALDIC.ico")
        if ico is not None:
            with winreg.CreateKey(
                winreg.HKEY_CURRENT_USER,
                rf"Software\Classes\{PROGID}\DefaultIcon",
            ) as key:
                winreg.SetValueEx(key, "", 0, winreg.REG_SZ, f"{ico},0")
    except Exception:
        pass

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
        rf"Software\Classes\{PROGID}\DefaultIcon",
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
