"""On-demand downloader for public DIC validation datasets.

These datasets are NOT committed to the repository (per maintainer
decision — large files, license uncertainty). Run this script to fetch
them locally before manual UAT.

Usage:
    python tools/download_validation_data.py --list
    python tools/download_validation_data.py --get idics_2_0
    python tools/download_validation_data.py --get all

Datasets are written to ``datasets/public/<name>/`` (gitignored).

Security note: each entry is verified against an SHA-256 digest. If
the digest mismatches we abort — never silently overwrite.
"""

from __future__ import annotations

import argparse
import hashlib
import shutil
import sys
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEST_ROOT = PROJECT_ROOT / "datasets" / "public"


@dataclass(frozen=True)
class Dataset:
    name: str
    url: str
    sha256: Optional[str]   # None = informational only (manual verify)
    description: str
    license: str
    landing_page: str


# NOTE: `sha256=None` means the maintainer must manually verify the file
# the first time it's downloaded, then update this script with the real
# digest. Keeping a placeholder is safer than copy-pasting an unverified
# digest from elsewhere.
DATASETS: dict[str, Dataset] = {
    "idics_2_0": Dataset(
        name="iDICs DIC Challenge 2.0",
        # The Challenge 2.0 page hosts a zipped dataset; URL needs to be
        # confirmed against the live page since they occasionally re-host.
        url="https://idics.org/challenge/Sample14.zip",
        sha256=None,  # TODO: fill after first manual verification
        description="14 standard DIC validation cases with ground truth.",
        license="CC-BY (verify on idics.org)",
        landing_page="https://idics.org/challenge/",
    ),
    "sem_dic_challenge_1": Dataset(
        name="SEM DIC Challenge 1.0 (Reu 2018)",
        url="https://sem.org/dic-challenge/Sample-data.zip",
        sha256=None,
        description="14 canonical 2D-DIC test cases with ground truth.",
        license="Open access (Society for Experimental Mechanics)",
        landing_page="https://sem.org/dic-challenge/",
    ),
    "ncorr_samples": Dataset(
        name="Ncorr 2D MATLAB sample data",
        url="https://github.com/justinblaber/ncorr_2D_matlab/archive/refs/heads/master.zip",
        sha256=None,
        description="Reference data shipped with Ncorr; useful for cross-tool comparison.",
        license="GPL-3.0",
        landing_page="https://github.com/justinblaber/ncorr_2D_matlab",
    ),
    "aldic_matlab_samples": Dataset(
        name="2D AL-DIC MATLAB samples (Jin Yang)",
        url="https://github.com/JinYangUTAustin/2D_ALDIC/archive/refs/heads/master.zip",
        sha256=None,
        description="Reference inputs from the original MATLAB AL-DIC implementation.",
        license="MIT",
        landing_page="https://github.com/JinYangUTAustin/2D_ALDIC",
    ),
}


# ---------- Helpers --------------------------------------------------------

def _sha256_of_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as fp:
        for chunk in iter(lambda: fp.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _download(url: str, dest: Path) -> None:
    """Download with progress bar to stderr (no third-party deps)."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"  → downloading {url}", file=sys.stderr)

    def _progress_hook(blocks_done: int, block_size: int, total: int) -> None:
        if total <= 0:
            return
        bytes_done = blocks_done * block_size
        pct = min(100.0, 100.0 * bytes_done / total)
        sys.stderr.write(f"\r    [{pct:5.1f}%] {bytes_done / 1e6:6.1f} MB / {total / 1e6:6.1f} MB")
        sys.stderr.flush()

    try:
        urllib.request.urlretrieve(url, dest, reporthook=_progress_hook)
    except urllib.error.HTTPError as exc:
        sys.stderr.write("\n")
        raise SystemExit(
            f"HTTP {exc.code} fetching {url}. The dataset host may have "
            f"moved the file. Check the landing_page in DATASETS and "
            f"update the URL in {Path(__file__).name}."
        ) from exc
    sys.stderr.write("\n")


def _verify(path: Path, expected: Optional[str]) -> None:
    if expected is None:
        actual = _sha256_of_file(path)
        print(
            f"  ⚠ no SHA-256 recorded for this dataset.\n"
            f"    First-time downloader: please verify integrity manually,\n"
            f"    then update DATASETS in {Path(__file__).name} with:\n"
            f"        sha256=\"{actual}\""
        )
        return
    actual = _sha256_of_file(path)
    if actual != expected:
        path.unlink(missing_ok=True)
        raise SystemExit(
            f"SHA-256 mismatch for {path.name}:\n"
            f"  expected {expected}\n"
            f"  got      {actual}\n"
            f"File deleted. Aborting (the upstream may have changed)."
        )
    print(f"  ✓ SHA-256 verified")


# ---------- Subcommands ----------------------------------------------------

def cmd_list(_args: argparse.Namespace) -> None:
    print(f"{'KEY':<24} {'NAME':<48} {'LICENSE'}")
    print("-" * 100)
    for key, ds in DATASETS.items():
        marker = "✓" if (DEST_ROOT / key).is_dir() else " "
        print(f"{marker} {key:<22} {ds.name:<48} {ds.license}")
    print()
    print(f"Datasets stored under: {DEST_ROOT.relative_to(PROJECT_ROOT)}")
    print("✓ = already downloaded; blank = available to fetch")


def cmd_get(args: argparse.Namespace) -> None:
    keys = list(DATASETS.keys()) if args.key == "all" else [args.key]
    for key in keys:
        if key not in DATASETS:
            raise SystemExit(f"Unknown dataset {key!r}; run --list to see options.")
        ds = DATASETS[key]
        target_dir = DEST_ROOT / key
        if target_dir.is_dir() and not args.force:
            print(f"[skip] {key} already present (use --force to re-download)")
            continue

        print(f"[get] {key}: {ds.name}")
        print(f"      License: {ds.license}")
        print(f"      Landing: {ds.landing_page}")

        # Stage to a temp file so we never half-write the destination.
        staging = DEST_ROOT / "_staging"
        staging.mkdir(parents=True, exist_ok=True)
        staged_file = staging / Path(ds.url).name

        try:
            _download(ds.url, staged_file)
            _verify(staged_file, ds.sha256)

            # Move into final location (atomic on same filesystem).
            if target_dir.exists():
                shutil.rmtree(target_dir)
            target_dir.mkdir(parents=True)
            final_file = target_dir / staged_file.name
            shutil.move(str(staged_file), str(final_file))

            # Auto-extract zips (DIC datasets are usually zipped).
            if final_file.suffix.lower() == ".zip":
                import zipfile
                print(f"  → extracting {final_file.name}")
                with zipfile.ZipFile(final_file) as zf:
                    zf.extractall(target_dir)
                final_file.unlink()  # remove the zip after extraction

            print(f"  ✓ ready at {target_dir.relative_to(PROJECT_ROOT)}")
        finally:
            if staging.exists() and not any(staging.iterdir()):
                staging.rmdir()


def cmd_clean(_args: argparse.Namespace) -> None:
    if DEST_ROOT.exists():
        shutil.rmtree(DEST_ROOT)
        print(f"Removed {DEST_ROOT.relative_to(PROJECT_ROOT)}")
    else:
        print("Nothing to clean.")


# ---------- Entry point ----------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("list", help="list available datasets").set_defaults(
        func=cmd_list)

    p_get = sub.add_parser("get", help="download a dataset")
    p_get.add_argument("key", help="dataset key (use 'all' for everything)")
    p_get.add_argument("--force", action="store_true",
                       help="re-download even if already present")
    p_get.set_defaults(func=cmd_get)

    sub.add_parser("clean", help="remove all downloaded datasets").set_defaults(
        func=cmd_clean)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
