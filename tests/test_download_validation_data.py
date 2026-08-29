"""Structural guards on the validation-dataset registry.

Offline by design: a test that reaches the network would be flaky in CI and
would not have caught what actually went wrong here anyway. Three of the four
entries pointed at URLs that 404 -- two of them for years, since nothing had
ever downloaded them (every `sha256` was still `None`). What these tests can
enforce is the shape that makes such rot noticeable and such digests useful.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tools"))

from download_validation_data import DATASETS, Dataset  # noqa: E402

_SHA256 = re.compile(r"^[0-9a-f]{64}$")


@pytest.mark.parametrize("key,ds", sorted(DATASETS.items()))
def test_every_dataset_has_a_landing_page(key: str, ds: Dataset):
    """Somewhere a human can go, whether or not a script can fetch it."""
    assert ds.landing_page.startswith("https://"), key


@pytest.mark.parametrize("key,ds", sorted(DATASETS.items()))
def test_automatic_matches_the_presence_of_a_url(key: str, ds: Dataset):
    assert ds.automatic == (ds.url is not None), key


@pytest.mark.parametrize("key,ds", sorted(DATASETS.items()))
def test_downloadable_archives_are_pinned_not_tracking_a_branch(
    key: str, ds: Dataset
):
    """A branch archive is regenerated on every upstream commit.

    Recording a digest against ``archive/refs/heads/<branch>.zip`` produces a
    checksum that passes for whoever recorded it and fails for everyone after
    the next upstream push -- a guarantee that turns into a false alarm.
    """
    if ds.url is None:
        return
    assert "/archive/refs/heads/" not in ds.url, (
        f"{key} downloads a moving branch archive; pin it to a tag or commit"
    )


@pytest.mark.parametrize("key,ds", sorted(DATASETS.items()))
def test_recorded_digests_are_well_formed(key: str, ds: Dataset):
    if ds.sha256 is None:
        return
    assert _SHA256.match(ds.sha256), f"{key}: {ds.sha256!r} is not a SHA-256"


@pytest.mark.parametrize("key,ds", sorted(DATASETS.items()))
def test_a_manual_dataset_does_not_claim_a_digest(key: str, ds: Dataset):
    """Nothing downloads it, so nothing could ever check the digest."""
    if ds.automatic:
        return
    assert ds.sha256 is None, key


def test_google_drive_folders_are_never_treated_as_downloads():
    """A Drive folder cannot be fetched by urlretrieve.

    This is what broke the two challenge entries: the data moved behind Drive
    folders and the registry kept a direct-URL shape, so `get` promised a
    download and delivered a 404.
    """
    for key, ds in DATASETS.items():
        if ds.url and "drive.google.com" in ds.url:
            pytest.fail(
                f"{key} lists a Google Drive URL as a direct download; "
                "make it a manual entry (url=None) with the folder as the "
                "landing page"
            )


def test_keys_are_stable_identifiers():
    for key in DATASETS:
        assert re.match(r"^[a-z0-9_]+$", key), key
