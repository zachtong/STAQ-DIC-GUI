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
