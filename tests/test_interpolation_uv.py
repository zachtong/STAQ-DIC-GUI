"""Byte-identity tests for scattered_interpolant_uv (Phase 1: shared
triangulation for the cumulative-displacement transform). The uv helper must
be byte-identical to two independent scattered_interpolant calls."""

import numpy as np

from al_dic.utils.interpolation import (
    scattered_interpolant,
    scattered_interpolant_uv,
)


def _ref(points, u, v, query):
    return (
        scattered_interpolant(points, u, query),
        scattered_interpolant(points, v, query),
    )


def _pts(n, seed):
    return np.random.default_rng(seed).random((n, 2)) * 100.0


def test_reused_delaunay_is_byte_identical():
    """The export reuse relies on a cached triangulation being byte-identical
    to a fresh interpolator: LinearNDInterpolator(Delaunay(pts), vals) ==
    LinearNDInterpolator(pts, vals) for multiple value sets reusing one tri."""
    from scipy.interpolate import LinearNDInterpolator
    from scipy.spatial import Delaunay

    pts = _pts(80, 11)
    gx, gy = np.meshgrid(np.linspace(0, 100, 40), np.linspace(0, 100, 40))
    tri = Delaunay(pts)
    rng = np.random.default_rng(12)
    for _ in range(3):
        vals = rng.standard_normal(80)
        fresh = LinearNDInterpolator(pts, vals, fill_value=np.nan)(gx, gy)
        reused = LinearNDInterpolator(tri, vals, fill_value=np.nan)(gx, gy)
        np.testing.assert_array_equal(reused, fresh)


def test_scattered_uv_tri_cache_byte_identical():
    """tri_cache must not change results, and reuses one Delaunay across
    calls sharing the same points + valid mask (the cumulative-transform
    cross-frame speedup)."""
    pts = _pts(70, 20)
    query = pts + np.random.default_rng(21).standard_normal(pts.shape) * 0.5
    rng = np.random.default_rng(22)
    cache: dict = {}
    for _ in range(4):
        u = rng.standard_normal(70)
        v = rng.standard_normal(70)
        eu, ev = scattered_interpolant_uv(pts, u, v, query)
        cu, cv = scattered_interpolant_uv(pts, u, v, query, tri_cache=cache)
        np.testing.assert_array_equal(cu, eu)
        np.testing.assert_array_equal(cv, ev)
    # same points + all-finite -> one shared triangulation across all 4 calls
    assert len(cache) == 1


class TestScatteredInterpolantUV:
    def test_no_nan_non_identity(self):
        pts = _pts(60, 0)
        rng = np.random.default_rng(1)
        u, v = rng.standard_normal(60), rng.standard_normal(60)
        query = _pts(40, 2) * 0.8 + 5
        eu, ev = _ref(pts, u, v, query)
        au, av = scattered_interpolant_uv(pts, u, v, query)
        np.testing.assert_array_equal(au, eu)
        np.testing.assert_array_equal(av, ev)

    def test_shared_nan_mask(self):
        pts = _pts(60, 3)
        rng = np.random.default_rng(4)
        u, v = rng.standard_normal(60), rng.standard_normal(60)
        bad = rng.random(60) < 0.15        # a failed POI loses both u and v
        u[bad] = np.nan
        v[bad] = np.nan
        query = _pts(40, 5)
        eu, ev = _ref(pts, u, v, query)
        au, av = scattered_interpolant_uv(pts, u, v, query)
        np.testing.assert_array_equal(au, eu)
        np.testing.assert_array_equal(av, ev)

    def test_identity_query_no_nan(self):
        # Accumulative-mode case: query == data points. The short-circuit
        # must be byte-identical to interpolating at the data vertices.
        pts = _pts(80, 6)
        rng = np.random.default_rng(7)
        u, v = rng.standard_normal(80), rng.standard_normal(80)
        query = pts.copy()
        eu, ev = _ref(pts, u, v, query)
        au, av = scattered_interpolant_uv(pts, u, v, query)
        np.testing.assert_array_equal(au, eu)
        np.testing.assert_array_equal(av, ev)

    def test_differing_nan_masks_fallback(self):
        pts = _pts(60, 8)
        rng = np.random.default_rng(9)
        u, v = rng.standard_normal(60), rng.standard_normal(60)
        u[rng.random(60) < 0.1] = np.nan
        v[rng.random(60) < 0.1] = np.nan   # different nodes -> fallback path
        query = _pts(40, 10)
        eu, ev = _ref(pts, u, v, query)
        au, av = scattered_interpolant_uv(pts, u, v, query)
        np.testing.assert_array_equal(au, eu)
        np.testing.assert_array_equal(av, ev)
