"""Reducing per-frame samples to a curve."""

from __future__ import annotations

import warnings

import numpy as np
import pytest

from al_dic.analysis.sampling import SampleFlag, SampleSet
from al_dic.analysis.series import (
    FrameStatus,
    TimeSeries,
    cod_from_endpoints,
    reduce_samples,
    strain_from_endpoints,
)


def _samples(values, valid=None, flags=frozenset()) -> SampleSet:
    v = np.asarray(values, dtype=float)
    ok = np.isfinite(v) if valid is None else np.asarray(valid, dtype=bool)
    return SampleSet(np.where(ok, v, np.nan), ok, frozenset(flags))


# --- reductions ----------------------------------------------------------

@pytest.mark.parametrize("reduction,expected", [
    ("mean", 3.0),
    ("median", 3.0),
    ("max", 5.0),
    ("min", 1.0),
    ("valid_fraction", 1.0),
])
def test_basic_reductions(reduction, expected):
    s = _samples([1.0, 2.0, 3.0, 4.0, 5.0])
    assert reduce_samples(s, reduction) == pytest.approx(expected)


def test_std_is_population_std():
    s = _samples([1.0, 3.0])
    assert reduce_samples(s, "std") == pytest.approx(1.0)


def test_median_is_robust_where_mean_is_not():
    """Why median exists: DIC fields carry outliers and the reference has none."""
    s = _samples([1.0, 1.0, 1.0, 1.0, 1000.0])
    assert reduce_samples(s, "median") == pytest.approx(1.0)
    assert reduce_samples(s, "mean") > 100.0


def test_reductions_ignore_invalid_samples():
    s = _samples([1.0, np.nan, 3.0])
    assert reduce_samples(s, "mean") == pytest.approx(2.0)
    assert reduce_samples(s, "valid_fraction") == pytest.approx(2 / 3)


def test_all_invalid_returns_nan_without_warning():
    """The reference emits `RuntimeWarning: All-NaN slice` on every frame."""
    s = _samples([np.nan, np.nan])
    with warnings.catch_warnings():
        warnings.simplefilter("error")
        assert np.isnan(reduce_samples(s, "mean"))
        assert np.isnan(reduce_samples(s, "max"))
        assert np.isnan(reduce_samples(s, "median"))
    assert reduce_samples(s, "valid_fraction") == 0.0


def test_empty_sample_set_is_nan():
    s = SampleSet(np.zeros(0), np.zeros(0, bool), frozenset())
    assert np.isnan(reduce_samples(s, "mean"))


def test_unknown_reduction_raises():
    """The reference falls through to the mean, so metric=median lies."""
    with pytest.raises(ValueError, match="percentile"):
        reduce_samples(_samples([1.0]), "percentile")


# --- gauge measurements --------------------------------------------------

def test_engineering_strain_from_endpoints():
    # gauge 100 px long, right endpoint moves +10 px along it
    strain = strain_from_endpoints(
        p0=(0.0, 0.0), p1=(100.0, 0.0), d0=(0.0, 0.0), d1=(10.0, 0.0)
    )
    assert strain == pytest.approx(0.10)


def test_strain_is_referenced_to_frame_zero_not_the_previous_frame():
    """Total engineering strain, L0 from the reference configuration."""
    first = strain_from_endpoints((0, 0), (100, 0), (0, 0), (5, 0))
    second = strain_from_endpoints((0, 0), (100, 0), (0, 0), (10, 0))
    assert (first, second) == pytest.approx((0.05, 0.10))


def test_strain_is_rotation_invariant():
    """A rigid rotation of the gauge is not strain."""
    import math

    a = math.radians(30.0)
    p0, p1 = (0.0, 0.0), (100.0, 0.0)
    r1 = (100.0 * math.cos(a), 100.0 * math.sin(a))
    strain = strain_from_endpoints(p0, p1, d0=(0.0, 0.0),
                                   d1=(r1[0] - p1[0], r1[1] - p1[1]))
    assert strain == pytest.approx(0.0, abs=1e-12)


def test_strain_with_a_nan_endpoint_is_nan():
    assert np.isnan(
        strain_from_endpoints((0, 0), (100, 0), (np.nan, 0.0), (0.0, 0.0))
    )


def test_cod_keeps_the_vector_and_projects_on_the_gauge():
    """Opening and sliding are different things; the vector keeps them apart."""
    cod = cod_from_endpoints(
        p0=(0.0, 0.0), p1=(10.0, 0.0), d0=(0.0, 0.0), d1=(3.0, 4.0)
    )
    assert (cod.dx, cod.dy) == pytest.approx((3.0, 4.0))
    assert cod.along_gauge == pytest.approx(3.0)
    assert cod.magnitude == pytest.approx(5.0)


def test_cod_projection_follows_the_gauge_direction():
    """A vertical gauge measures the vertical component, as a clip gauge would."""
    cod = cod_from_endpoints((0.0, 0.0), (0.0, 10.0), (0.0, 0.0), (3.0, 4.0))
    assert cod.along_gauge == pytest.approx(4.0)


# --- time series ---------------------------------------------------------

def _series_from(frames):
    return TimeSeries.from_samples(
        frames=list(range(len(frames))),
        samples=frames,
        reduction="mean",
        min_valid_fraction=0.5,
        unit="px",
    )


def test_series_records_valid_fraction_per_frame():
    ts = _series_from([
        _samples([1.0, 2.0, 3.0, 4.0]),
        _samples([1.0, np.nan, np.nan, np.nan]),
    ])
    assert ts.valid_fraction == pytest.approx([1.0, 0.25])


def test_series_nans_a_frame_below_the_threshold():
    """A shrinking sample keeps producing a plausible number otherwise.

    A region probe whose valid nodes collapse from 200 to 3 still yields a
    smooth curve; the threshold is what makes that visible.
    """
    ts = _series_from([
        _samples([1.0, 2.0, 3.0, 4.0]),
        _samples([1.0, np.nan, np.nan, np.nan]),
    ])
    assert ts.values[0] == pytest.approx(2.5)
    assert np.isnan(ts.values[1])
    assert ts.status[1] is FrameStatus.BELOW_THRESHOLD


def test_threshold_of_zero_keeps_everything_measurable():
    ts = TimeSeries.from_samples(
        frames=[0],
        samples=[_samples([1.0, np.nan, np.nan, np.nan])],
        reduction="mean",
        min_valid_fraction=0.0,
        unit="px",
    )
    assert ts.values[0] == pytest.approx(1.0)
    assert ts.status[0] is FrameStatus.OK


def test_crack_crossing_breaks_the_curve_from_that_frame():
    """The agreed behaviour: the series breaks, and says why."""
    ts = _series_from([
        _samples([1.0, 2.0]),
        _samples([1.0, 2.0], flags={SampleFlag.CROSSES_CRACK}),
        _samples([1.0, 2.0], flags={SampleFlag.CROSSES_CRACK}),
    ])
    assert ts.values[0] == pytest.approx(1.5)
    assert np.isnan(ts.values[1]) and np.isnan(ts.values[2])
    assert ts.status[1] is FrameStatus.CROSSES_CRACK
    assert ts.first_crack_frame == 1


def test_no_crack_means_no_crack_frame():
    ts = _series_from([_samples([1.0, 2.0])])
    assert ts.first_crack_frame is None


def test_series_never_bridges_a_gap():
    """`connect_nulls` is off by design.

    The reference bridges invalid frames silently, which draws a line through
    data that does not exist.
    """
    ts = _series_from([
        _samples([1.0, 2.0]),
        _samples([np.nan, np.nan]),
        _samples([5.0, 6.0]),
    ])
    assert np.isnan(ts.values[1])
    assert list(ts.contiguous_runs()) == [(0, 1), (2, 3)]


def test_valid_fraction_is_itself_a_series():
    ts = TimeSeries.from_samples(
        frames=[0, 1],
        samples=[_samples([1.0, 2.0]), _samples([1.0, np.nan])],
        reduction="valid_fraction",
        min_valid_fraction=0.0,
        unit="",
    )
    assert ts.values == pytest.approx([1.0, 0.5])
