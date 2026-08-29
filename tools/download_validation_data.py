"""On-demand downloader for public DIC validation datasets.

These datasets are NOT committed to the repository (per maintainer
decision — large files, license uncertainty). Run this script to fetch
them locally before manual UAT.

Usage:
    python tools/download_validation_data.py list
    python tools/download_validation_data.py get ncorr_samples
    python tools/download_validation_data.py get all

Datasets are written to ``datasets/public/<name>/`` (gitignored).

Not everything can be fetched automatically. The iDICs challenge data
moved to Google Drive folders, which no plain HTTP download can walk, so
those entries carry a landing page instead of a URL and ``get`` prints
where to click rather than failing. ``list`` says which is which.

Security note: an entry with a recorded SHA-256 is verified against it and
a mismatch aborts rather than silently overwriting. ``None`` means nobody
has verified that file yet -- treat what you get accordingly.
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
    #: Direct download. ``None`` when the data is only reachable by hand --
    #: a Google Drive folder, a login wall, a page that re-hosts on its own
    #: schedule. Pretending to download one of those is how a tool ends up
    #: 404-ing at the user instead of telling them where to click.
    url: Optional[str]
    sha256: Optional[str]   # None = informational only (manual verify)
    description: str
    license: str
    landing_page: str

    @property
    def automatic(self) -> bool:
        return self.url is not None


# NOTE: `sha256=None` means the maintainer must manually verify the file
# the first time it's downloaded, then update this script with the real
# digest. Keeping a placeholder is safer than copy-pasting an unverified
# digest from elsewhere.
DATASETS: dict[str, Dataset] = {
    # Both challenge datasets are distributed as Google Drive folders, which a
    # plain HTTP fetch cannot walk. They are listed for their landing pages,
    # not downloaded. The former direct URLs here (idics.org/challenge/
    # Sample14.zip and sem.org/dic-challenge/Sample-data.zip) both 404 -- and
    # sem.org no longer serves the challenge at all; it lives on idics.org now.
    "dic_challenge_2_0": Dataset(
        name="iDICs 2D DIC Challenge 2.0",
        url=None,
        sha256=None,
        description="Standard 2D DIC validation cases with ground truth.",
        license="See idics.org for terms",
        landing_page=(
            "https://drive.google.com/drive/folders/"
            "1ASWZZZjV1SPnjiFncb5ofOtfrrRfFhSw"
        ),
    ),
    "dic_challenge_1_0": Dataset(
        name="iDICs 2D DIC Challenge 1.0 (Reu et al.)",
        url=None,
        sha256=None,
        description="The original 2D DIC challenge cases with ground truth.",
        license="See idics.org for terms",
        landing_page=(
            "https://drive.google.com/drive/folders/"
            "1tNUKPJ7UJOm23JhERtkrIy5gSBiwV3Dj"
        ),
    ),
    "ncorr_samples": Dataset(
        name="Ncorr 2D MATLAB sample data",
        # Pinned to a tag, not a branch: GitHub regenerates a branch archive on
        # every upstream commit, so a digest recorded against one would fail
        # for the next person rather than protect them.
        url=(
            "https://github.com/justinblaber/ncorr_2D_matlab"
            "/archive/refs/tags/v1.2.2.zip"
        ),
        sha256=(
            "88eb1c808152524b3f0c33bd7d95b6c62c648784bd17eb15a18e5290fd8d11fd"
        ),
        description="Reference data shipped with Ncorr; useful for cross-tool comparison.",
        license="GPL-3.0",
        landing_page="https://github.com/justinblaber/ncorr_2D_matlab",
    ),
    "aldic_matlab_samples": Dataset(
        name="2D AL-DIC MATLAB samples (Jin Yang)",
        # The JinYangUTAustin account was renamed; the old URL 404s.
        url=(
            "https://github.com/YangMechanicsGroupUTAustin/2D_ALDIC"
            "/archive/refs/tags/4.1.zip"
        ),
        sha256=(
            "dd895c76458b39c742f8a7c475b0ff02181cef31182467ed720216a7005cdff1"
        ),
        description=(
            "Reference inputs from the original MATLAB AL-DIC implementation, "
            "including the DIC Challenge Sample 14 images."
        ),
        license="MIT",
        landing_page="https://github.com/YangMechanicsGroupUTAustin/2D_ALDIC",
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
    print(f"{'KEY':<24} {'NAME':<44} {'FETCH':<10} {'LICENSE'}")
    print("-" * 108)
    for key, ds in DATASETS.items():
        marker = "✓" if (DEST_ROOT / key).is_dir() else " "
        how = "auto" if ds.automatic else "manual"
        print(f"{marker} {key:<22} {ds.name:<44} {how:<10} {ds.license}")
    print()
    print(f"Datasets stored under: {DEST_ROOT.relative_to(PROJECT_ROOT)}")
    print("✓ = already downloaded")
    print("auto   = 'get <key>' downloads it")
    print("manual = 'get <key>' prints where to download it by hand")


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

        if not ds.automatic:
            # Say so and move on. Attempting a download that cannot work is
            # how this tool used to 404 at four users out of four.
            print(f"      This dataset is not downloadable from a script.")
            print(f"      Open the link above and save it under "
                  f"{(DEST_ROOT / key).relative_to(PROJECT_ROOT)}")
            continue

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
