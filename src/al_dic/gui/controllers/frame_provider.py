"""Streaming frame provider for the compute pipeline.

Decodes and normalizes reference/deformed frames on demand from disk,
keeping only a small bounded LRU resident instead of the whole stack.

Produces byte-identical normalized frames to the eager ``ListFrameProvider``
(same ``_decode_grayscale_float64`` + ``normalize_one``), but never
materializes all frames and never touches ``ImageController``'s caches -- it
owns a private LRU and does its own stateless disk reads, so the compute
worker thread can use it with no shared mutable state and no lock.
"""

from __future__ import annotations

from collections import OrderedDict

import numpy as np
from numpy.typing import NDArray

from al_dic.core.data_structures import GridxyROIRange
from al_dic.gui.controllers.image_controller import _decode_grayscale_float64
from al_dic.io.image_ops import compute_clamped_roi, normalize_one

_STREAM_CACHE_SIZE = 4  # frames kept resident (ref + current + slack)


class StreamingFrameProvider:
    """Lazy, thread-confined ``FrameProvider`` backed by on-demand decode.

    Implements the structural ``FrameProvider`` protocol
    (``__len__``/``shape``/``clamped_roi``/``get_normalized``) so
    ``run_aldic`` consumes it exactly like the eager list path.
    """

    def __init__(
        self,
        image_files: list[str],
        roi: GridxyROIRange,
        capacity: int = _STREAM_CACHE_SIZE,
    ) -> None:
        self._paths = list(image_files)
        self._roi = roi
        self._capacity = max(1, int(capacity))
        self._cache: "OrderedDict[int, NDArray[np.float64]]" = OrderedDict()
        # shape + clamped ROI are derived lazily from frame 0 (matching the
        # eager ListFrameProvider, which derives them from images[0].shape),
        # so constructing the provider touches no disk -- the first real
        # frame access in the worker triggers the single frame-0 decode.
        self._shape: tuple[int, int] | None = None
        self._clamped_roi: GridxyROIRange | None = None

    def _ensure_meta(self) -> None:
        if self._shape is not None:
            return
        if self._paths:
            first = _decode_grayscale_float64(self._paths[0])
            self._clamped_roi = compute_clamped_roi(first.shape, self._roi)
            self._shape = first.shape  # set LAST: the guard tests _shape
        else:
            self._clamped_roi = self._roi
            self._shape = (0, 0)  # set LAST: the guard tests _shape

    def __len__(self) -> int:
        return len(self._paths)

    @property
    def shape(self) -> tuple[int, int]:
        self._ensure_meta()
        return self._shape  # type: ignore[return-value]

    @property
    def clamped_roi(self) -> GridxyROIRange:
        self._ensure_meta()
        return self._clamped_roi  # type: ignore[return-value]

    def get_normalized(self, idx: int) -> NDArray[np.float64]:
        cached = self._cache.get(idx)
        if cached is not None:
            self._cache.move_to_end(idx)
            return cached
        self._ensure_meta()
        raw = _decode_grayscale_float64(self._paths[idx])
        normed = normalize_one(raw, self._clamped_roi)
        self._cache[idx] = normed
        if len(self._cache) > self._capacity:
            self._cache.popitem(last=False)
        return normed
