"""Build the portable Windows bundle, then zip it for release.

    python tools/build_exe.py                 # build + zip
    python tools/build_exe.py --no-zip        # build only
    python tools/build_exe.py --clean         # discard previous build cache

Output goes to ``dist-exe/pyALDIC/`` and ``dist-exe/pyALDIC-<version>-win64.zip``.
Not ``dist/``: that is the directory ``publish.yml`` runs ``twine check`` and
``gh release upload`` against, and a 500 MB bundle landing there would be
uploaded to PyPI as if it were a wheel.

The build log is the most valuable output of a first build on new library
versions -- PyInstaller reports a missing hidden import as a WARNING and
carries on, producing a bundle that starts and then fails somewhere specific.
This script surfaces those lines rather than leaving them in the scrollback.
"""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SPEC = ROOT / "packaging" / "pyaldic.spec"
DIST = ROOT / "dist-exe"
WORK = ROOT / "build-exe"
BUNDLE = DIST / "pyALDIC"

# Lines worth reading back out of several thousand lines of build log.
INTERESTING = re.compile(
    r"^\d+ WARNING: (Hidden import .* not found|Library not found|"
    r"Cannot find |lib not found)|^\d+ ERROR:",
)


def _version() -> str:
    text = (ROOT / "src" / "al_dic" / "__init__.py").read_text(encoding="utf-8")
    match = re.search(r'^__version__\s*=\s*"([^"]+)"', text, re.M)
    if match is None:
        raise SystemExit("could not read __version__ from src/al_dic/__init__.py")
    return match.group(1)


def _check_environment() -> None:
    try:
        import PyInstaller  # noqa: F401
    except ImportError:
        raise SystemExit(
            "PyInstaller is not installed in this interpreter.\n"
            f"  {sys.executable} -m pip install -r packaging/requirements-build.txt"
        )
    if "conda" in sys.prefix.lower() or "anaconda" in sys.prefix.lower():
        print(
            f"note: building from a conda environment ({sys.prefix}).\n"
            "      This environment's DLL directories are put first on PATH "
            "for the build,\n"
            "      and the spec fails the build if anything is still resolved "
            "from outside\n"
            "      it. A clean venv remains the reference build environment.\n"
        )


def _dll_search_env() -> dict:
    """A copy of os.environ with this interpreter's own DLL directories first.

    PyInstaller resolves a binary dependency by searching PATH, so the build
    machine's PATH decides what goes into the bundle. Running an environment's
    python.exe without activating that environment is enough to poison it:
    Anaconda's base ``Library\bin`` stays on PATH while the environment's does
    not, so every conda-provided DLL resolves to the wrong build. That is not a
    theoretical concern -- it silently produced a bundle whose Qt could not
    load at all, and another whose colorbars vanished from every export.
    """
    import os as _os

    env = dict(_os.environ)
    prefix = Path(sys.prefix)
    candidates = [
        prefix / "Library" / "bin",
        prefix / "Library" / "mingw-w64" / "bin",
        prefix / "Library" / "usr" / "bin",
        prefix / "DLLs",
        prefix,
    ]
    front = [str(p) for p in candidates if p.is_dir()]
    env["PATH"] = _os.pathsep.join(front + [env.get("PATH", "")])
    return env


def _build(clean: bool) -> None:
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--noconfirm",
        "--distpath", str(DIST),
        "--workpath", str(WORK),
        str(SPEC),
    ]
    if clean:
        cmd.insert(3, "--clean")
    print("$", " ".join(cmd), "\n")

    proc = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True,
                          encoding="utf-8", errors="replace",
                          env=_dll_search_env())
    log = (proc.stdout or "") + (proc.stderr or "")
    (WORK / "build.log").parent.mkdir(parents=True, exist_ok=True)
    (WORK / "build.log").write_text(log, encoding="utf-8")

    flagged = [line for line in log.splitlines() if INTERESTING.match(line)]
    if flagged:
        print("--- missing imports / libraries reported by PyInstaller ---")
        for line in flagged:
            print(" ", line)
        print()
    if proc.returncode != 0:
        print(log[-6000:], file=sys.stderr)
        raise SystemExit(f"PyInstaller failed with exit code {proc.returncode}")
    print(f"build log: {WORK / 'build.log'}")


def _report_size() -> None:
    total = sum(f.stat().st_size for f in BUNDLE.rglob("*") if f.is_file())
    count = sum(1 for f in BUNDLE.rglob("*") if f.is_file())
    print(f"\nbundle: {BUNDLE}")
    print(f"  {count} files, {total / 1024 ** 2:.0f} MB uncompressed")
    biggest = sorted(
        (f for f in BUNDLE.rglob("*") if f.is_file()),
        key=lambda f: f.stat().st_size,
        reverse=True,
    )[:8]
    for f in biggest:
        print(f"    {f.stat().st_size / 1024 ** 2:7.1f} MB  {f.relative_to(BUNDLE)}")


def _zip() -> Path:
    out = DIST / f"pyALDIC-{_version()}-win64.zip"
    if out.exists():
        out.unlink()
    print(f"\nzipping -> {out.name} ...")
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
        for f in sorted(BUNDLE.rglob("*")):
            if f.is_file():
                zf.write(f, Path("pyALDIC") / f.relative_to(BUNDLE))
    print(f"  {out.stat().st_size / 1024 ** 2:.0f} MB")
    return out


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--no-zip", action="store_true",
                        help="skip the release zip")
    parser.add_argument("--clean", action="store_true",
                        help="discard PyInstaller's cached analysis first")
    args = parser.parse_args()

    _check_environment()
    if args.clean and DIST.exists():
        shutil.rmtree(DIST)
    _build(args.clean)
    _report_size()
    if not args.no_zip:
        _zip()
    print(f"\nRun it:  {BUNDLE / 'pyALDIC.exe'}")


if __name__ == "__main__":
    main()
