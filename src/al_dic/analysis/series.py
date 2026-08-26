"""Reduce per-frame samples to a curve, and say where the curve stops.

A ``TimeSeries`` carries its own gaps and the reason for each one. Charts and
CSV both read ``status``, so what a user sees on screen and what they get in a
file cannot disagree about which frames mean anything.

Two rules, both deliberate:

* A frame whose samples cross a crack is NaN. Averaging across a displacement
  discontinuity produces a number, but not a measurement.
* A frame whose valid sample fraction falls below a threshold is NaN. A region
  probe whose valid nodes collapse from two hundred to three otherwise keeps
  drawing a smooth, entirely plausible curve.
"""

from __future__ import annotations

import enum
import math
from dataclasses import dataclass
from typing import Iterator, Sequence

import numpy as np
from numpy.typing import NDArray

from al_dic.analysis.sampling import SampleFlag, SampleSet

Point = tuple[float, float]

#: Reductions over a probe's samples on one frame.
_REDUCERS = {
    # Identity, for a point probe's single sample.
    "value": lambda v: float(v[0]),
    "mean": lambda v: float(np.mean(v)),
    "median": lambda v: float(np.median(v)),
    "max": lambda v: float(np.max(v)),
    "min": lambda v: float(np.min(v)),
    "std": lambda v: float(np.std(v)),
}


class FrameStatus(enum.Enum):
    """Why a frame holds a value, or does not."""

    OK = "ok"
    CROSSES_CRACK = "crosses_crack"
    BELOW_THRESHOLD = "below_threshold"
    NO_DATA = "no_data"


@dataclass(frozen=True)
class CrackOpening:
    """The displacement jump across a gauge, kept as a vector.

    ``along_gauge`` is what a physical clip gauge reads: the component along its
    own axis, with the direction chosen by where the user placed it. Keeping
    ``dx``/``dy`` means a later decomposition into opening and sliding relative
    to the crack itself needs no change to what is stored.
    """

    dx: float
    dy: float
    along_gauge: float

    @property
    def magnitude(self) -> float:
        return math.hypot(self.dx, self.dy)


def reduce_samples(samples: SampleSet, reduction: str) -> float:
    """Collapse one frame's samples to a scalar.

    Returns NaN for an empty or wholly invalid set, without the ``All-NaN
    slice`` warning storm the reference emits on every frame.
    """
    if reduction == "valid_fraction":
        return samples.valid_fraction

    reducer = _REDUCERS.get(reduction)
    if reducer is None:
        known = ", ".join(sorted(_REDUCERS) + ["valid_fraction"])
        raise ValueError(
            f"Unknown reduction {reduction!r}. Known reductions: {known}."
        )

    if samples.values.size == 0 or not samples.valid.any():
        return math.nan
    return reducer(samples.values[samples.valid])


def strain_from_endpoints(
    p0: Point, p1: Point, d0: Point, d1: Point
) -> float:
    """Engineering strain along a gauge: ``(L - L0) / L0``.

    ``L0`` is the reference-configuration chord, so this is total strain, not
    incremental. Being a scalar chord length it is invariant to rigid rotation.
    """
    l0 = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
    if l0 <= 0.0:
        return math.nan
    q0 = (p0[0] + d0[0], p0[1] + d0[1])
    q1 = (p1[0] + d1[0], p1[1] + d1[1])
    length = math.hypot(q1[0] - q0[0], q1[1] - q0[1])
    if not math.isfinite(length):
        return math.nan
    return (length - l0) / l0


def cod_from_endpoints(
    p0: Point, p1: Point, d0: Point, d1: Point
) -> CrackOpening:
    """Displacement jump between the gauge endpoints, and its gauge projection."""
    dx = d1[0] - d0[0]
    dy = d1[1] - d0[1]
    span = math.hypot(p1[0] - p0[0], p1[1] - p0[1])
    if span <= 0.0 or not (math.isfinite(dx) and math.isfinite(dy)):
        return CrackOpening(math.nan, math.nan, math.nan)
    ux, uy = (p1[0] - p0[0]) / span, (p1[1] - p0[1]) / span
    return CrackOpening(dx=dx, dy=dy, along_gauge=dx * ux + dy * uy)


@dataclass(frozen=True)
class TimeSeries:
    """One probe, one field, one reduction, across the sequence."""

    frames: NDArray[np.int64]
    values: NDArray[np.float64]
    valid_fraction: NDArray[np.float64]
    status: list[FrameStatus]
    unit: str

    @staticmethod
    def from_samples(
        frames: Sequence[int],
        samples: Sequence[SampleSet],
        *,
        reduction: str,
        min_valid_fraction: float,
        unit: str,
    ) -> "TimeSeries":
        if len(frames) != len(samples):
            raise ValueError(
                f"Got {len(frames)} frames and {len(samples)} sample sets."
            )
        values = np.full(len(frames), np.nan, dtype=np.float64)
        fractions = np.zeros(len(frames), dtype=np.float64)
        status: list[FrameStatus] = []

        for i, s in enumerate(samples):
            fractions[i] = s.valid_fraction
            if SampleFlag.CROSSES_CRACK in s.flags:
                status.append(FrameStatus.CROSSES_CRACK)
                continue
            if s.values.size == 0 or not s.valid.any():
                status.append(FrameStatus.NO_DATA)
                continue
            # valid_fraction is a measure of the data, not a measurement made
            # from it, so the threshold must not suppress it.
            if (
                reduction != "valid_fraction"
                and s.valid_fraction < min_valid_fraction
            ):
                status.append(FrameStatus.BELOW_THRESHOLD)
                continue
            values[i] = reduce_samples(s, reduction)
            status.append(
                FrameStatus.OK if math.isfinite(values[i])
                else FrameStatus.NO_DATA
            )

        return TimeSeries(
            frames=np.asarray(frames, dtype=np.int64),
            values=values,
            valid_fraction=fractions,
            status=status,
            unit=unit,
        )

    @property
    def first_crack_frame(self) -> int | None:
        """Index of the first frame the probe crossed a crack, if it ever did."""
        for i, st in enumerate(self.status):
            if st is FrameStatus.CROSSES_CRACK:
                return int(self.frames[i])
        return None

    def contiguous_runs(self) -> Iterator[tuple[int, int]]:
        """Half-open index ranges of consecutive finite values.

        Charts draw one polyline per run, so a gap stays a gap. The reference
        sets ``connectNulls`` and draws straight through missing data.
        """
        finite = np.isfinite(self.values)
        start: int | None = None
        for i, ok in enumerate(finite):
            if ok and start is None:
                start = i
            elif not ok and start is not None:
                yield (start, i)
                start = None
        if start is not None:
            yield (start, len(finite))


__all__ = [
    "CrackOpening", "FrameStatus", "TimeSeries", "cod_from_endpoints",
    "reduce_samples", "strain_from_endpoints",
]
