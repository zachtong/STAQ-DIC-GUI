"""Shared utility functions for all export backends."""

from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path

import numpy as np
from numpy.typing import NDArray


def frame_tag(i: int, n_frames: int) -> str:
    """Return a 1-based, zero-padded frame label.

    Examples:
        frame_tag(0, 10)   -> "frame_01"
        frame_tag(9, 10)   -> "frame_10"
        frame_tag(0, 100)  -> "frame_001"
    """
    width = len(str(n_frames))
    return f"frame_{i + 1:0{width}d}"


def make_prefix(image_folder: Path | None) -> str:
    """Derive a safe export filename prefix from the image folder name.

    Replaces characters forbidden in Windows filenames (and whitespace) with
    underscores so the prefix can be used on all platforms.
    """
    if image_folder is None:
        return "dic"
    stem = image_folder.name or "dic"
    return re.sub(r'[<>:"/\\|?*\s]', "_", stem)


def make_timestamp() -> str:
    """Return the current local time as a ``YYYYMMDDHHMMSS`` string."""
    return datetime.now().strftime("%Y%m%d%H%M%S")


def ensure_dir(path: Path) -> Path:
    """Create *path* (and any parents) if it does not already exist."""
    path.mkdir(parents=True, exist_ok=True)
    return path


def world_disp(
    U: NDArray[np.float64], um2px: float,
) -> tuple[NDArray[np.float64], NDArray[np.float64]]:
    """Return (u, v) displacement in world display coordinates.

    Matches :attr:`StrainResult.disp_u` / :attr:`disp_v` so every data export
    shares one coordinate convention with the strain fields: the image y-axis
    (row index, pointing down) is flipped to a world y-axis (pointing up), and
    both components are scaled by ``um2px``.  Without this, exported
    displacement was raw image pixels (y-down) while exported strain was world
    coordinates (y-up), giving opposite signs for ``v`` and the shear
    components inside the same file.

    Args:
        U: (2*N,) interleaved displacement [u0, v0, u1, v1, ...] in image px.
        um2px: Physical length per pixel (1.0 when the unit is pixels).

    Returns:
        (u, v) each (N,): ``u = U_x * um2px``, ``v = -U_y * um2px``.
    """
    return U[0::2] * um2px, -U[1::2] * um2px
