"""The Numba plate-fit kernel must match the original weighted-lstsq loop.

Covers no-mask, crack (line-of-sight), <3 neighbours and all-NaN edge cases,
and checks the pure-Python fallback agrees with the kernel.
"""

from __future__ import annotations

import numpy as np
import pytest
from scipy.ndimage import distance_transform_edt
from scipy.spatial import KDTree

from al_dic.strain.comp_def_grad import comp_def_grad, _segment_hits_mask
from al_dic.strain.platefit_kernel import (
    HAS_NUMBA,
    _lists_to_csr,
    _platefit_cached_python,
    _platefit_python,
    build_neighbor_cache,
    solve_platefit,
    solve_platefit_cached,
)

RAD = 20.0
_ELEMS = np.zeros((0, 8), dtype=np.int64)


def _ref_lstsq(U, coords, rad, mask):
    """Reference: the ORIGINAL per-node 2x lstsq(SVD) weighted plane fit."""
    n = coords.shape[0]
    F = np.full(4 * n, np.nan)
    u, v = U[0::2], U[1::2]
    valid = np.isfinite(u) & np.isfinite(v)
    if mask is not None:
        H, W = mask.shape
        c = np.clip(np.round(coords[:, 0]).astype(int), 0, W - 1)
        r = np.clip(np.round(coords[:, 1]).astype(int), 0, H - 1)
        valid &= mask[r, c] > 0
    vidx = np.where(valid)[0]
    if len(vidx) < 3:
        return F
    vc, vu, vv = coords[vidx], u[vidx], v[vidx]
    nbrs = KDTree(vc).query_ball_point(coords, rad)
    near = None
    if mask is not None:
        dt = distance_transform_edt(mask > 0.5)
        H, W = mask.shape
        c = np.clip(np.round(coords[:, 0]).astype(int), 0, W - 1)
        r = np.clip(np.round(coords[:, 1]).astype(int), 0, H - 1)
        near = dt[r, c] < rad
    rd_sq = rad * rad
    for i in range(n):
        nb = np.array(nbrs[i], np.int64)
        xi, yi = coords[i, 0], coords[i, 1]
        if near is not None and near[i] and nb.size:
            vis = np.array([not _segment_hits_mask(xi, yi, vc[k, 0], vc[k, 1], mask)
                            for k in nb], bool)
            nb = nb[vis]
        if len(nb) < 3:
            continue
        dx, dy = vc[nb, 0] - xi, vc[nb, 1] - yi
        w = np.exp(-(dx * dx + dy * dy) / max(rd_sq, 1e-10))
        wd = np.sqrt(w)
        A = np.column_stack([np.ones(len(nb)), dx, dy]) * wd[:, None]
        su = np.linalg.lstsq(A, vu[nb] * wd, rcond=None)[0]
        sv = np.linalg.lstsq(A, vv[nb] * wd, rcond=None)[0]
        F[4 * i] = su[1]; F[4 * i + 1] = sv[1]
        F[4 * i + 2] = su[2]; F[4 * i + 3] = sv[2]
    return F


def _mesh(step=12, side=200, crack=False):
    xs = np.arange(20, side - 20 + 1, step, float)
    ys = np.arange(20, side - 20 + 1, step, float)
    X, Y = np.meshgrid(xs, ys, indexing="ij")
    coords = np.column_stack([X.ravel(), Y.ravel()])
    n = coords.shape[0]
    u = 0.01 * coords[:, 1] + 5e-5 * coords[:, 0] ** 2
    v = 0.004 * coords[:, 0]
    U = np.empty(2 * n); U[0::2] = u; U[1::2] = v
    m = np.ones((side, side))
    if crack:
        m[side // 2 - 1:side // 2 + 1, 20:side // 2 + 20] = 0.0
    return coords, U, m


def _agree(Fa, Fb):
    assert np.array_equal(np.isnan(Fa), np.isnan(Fb)), "NaN pattern differs"
    both = np.isfinite(Fa) & np.isfinite(Fb)
    if both.any():
        assert np.max(np.abs(Fa[both] - Fb[both])) < 1e-10


def test_matches_lstsq_no_mask():
    coords, U, _ = _mesh()
    _agree(comp_def_grad(U, coords, _ELEMS, RAD, None), _ref_lstsq(U, coords, RAD, None))


def test_matches_lstsq_full_mask():
    coords, U, m = _mesh()
    _agree(comp_def_grad(U, coords, _ELEMS, RAD, m), _ref_lstsq(U, coords, RAD, m))


def test_matches_lstsq_with_crack_line_of_sight():
    coords, U, m = _mesh(crack=True)
    F = comp_def_grad(U, coords, _ELEMS, RAD, m)
    # the crack (line-of-sight) must actually change F vs an uncracked mask,
    # proving the near-barrier path is exercised
    F_full = comp_def_grad(U, coords, _ELEMS, RAD, np.ones_like(m))
    assert not np.allclose(np.nan_to_num(F), np.nan_to_num(F_full))
    # and the numba kernel still matches the reference lstsq with the crack
    _agree(F, _ref_lstsq(U, coords, RAD, m))


def test_all_nan_displacement():
    coords, U, m = _mesh()
    U[:] = np.nan
    assert np.all(np.isnan(comp_def_grad(U, coords, _ELEMS, RAD, m)))


def test_too_few_nodes():
    coords = np.array([[10.0, 10.0], [20.0, 10.0]])
    F = comp_def_grad(np.zeros(4), coords, _ELEMS, RAD, None)
    assert np.all(np.isnan(F))


def test_empty_mesh():
    F = comp_def_grad(np.zeros(0), np.zeros((0, 2)), _ELEMS, RAD, None)
    assert F.shape == (0,)


def test_cached_matches_default_no_mask():
    coords, U, _ = _mesh()
    cache = build_neighbor_cache(coords, RAD)
    _agree(comp_def_grad(U, coords, _ELEMS, RAD, None, neighbors=cache),
           comp_def_grad(U, coords, _ELEMS, RAD, None))


def test_cached_matches_default_with_crack():
    coords, U, m = _mesh(crack=True)
    cache = build_neighbor_cache(coords, RAD)
    Fc = comp_def_grad(U, coords, _ELEMS, RAD, m, neighbors=cache)
    Fd = comp_def_grad(U, coords, _ELEMS, RAD, m)
    # the cache path is bit-for-bit identical (same neighbour set + order)
    assert np.array_equal(np.isnan(Fc), np.isnan(Fd))
    both = np.isfinite(Fc) & np.isfinite(Fd)
    assert np.array_equal(Fc[both], Fd[both])


def test_cached_all_nan():
    coords, U, m = _mesh()
    cache = build_neighbor_cache(coords, RAD)
    U[:] = np.nan
    assert np.all(np.isnan(comp_def_grad(U, coords, _ELEMS, RAD, m, neighbors=cache)))


def test_build_neighbor_cache_empty():
    indptr, indices = build_neighbor_cache(np.zeros((0, 2)), RAD)
    assert indptr.shape == (1,) and indices.shape == (0,)


@pytest.mark.skipif(not HAS_NUMBA, reason="numba not installed")
def test_cached_python_fallback_matches_numba():
    from scipy.ndimage import distance_transform_edt
    coords, U, m = _mesh(crack=True)
    u, v = U[0::2], U[1::2]
    valid = np.isfinite(u) & np.isfinite(v)
    H, W = m.shape
    c = np.clip(np.round(coords[:, 0]).astype(int), 0, W - 1)
    r = np.clip(np.round(coords[:, 1]).astype(int), 0, H - 1)
    valid &= m[r, c] > 0
    near = distance_transform_edt(m > 0.5)[r, c] < RAD
    cache = build_neighbor_cache(coords, RAD)
    indptr, indices = cache
    F_numba = solve_platefit_cached(coords, u, v, valid, cache, RAD, m, near)
    F_py = _platefit_cached_python(
        np.ascontiguousarray(coords, np.float64), u, v,
        np.ascontiguousarray(valid, bool), indptr, indices, RAD,
        np.ascontiguousarray(m, np.float64), near,
    )
    _agree(F_numba, F_py)


@pytest.mark.skipif(not HAS_NUMBA, reason="numba not installed")
def test_python_fallback_matches_numba():
    """The pure-Python fallback must equal the numba kernel bit-for-bit path."""
    coords, U, m = _mesh(crack=True)
    u, v = U[0::2], U[1::2]
    valid = np.isfinite(u) & np.isfinite(v)
    H, W = m.shape
    c = np.clip(np.round(coords[:, 0]).astype(int), 0, W - 1)
    r = np.clip(np.round(coords[:, 1]).astype(int), 0, H - 1)
    valid &= m[r, c] > 0
    vidx = np.where(valid)[0]
    vc, vu, vv = coords[vidx], u[vidx], v[vidx]
    nbrs = KDTree(vc).query_ball_point(coords, RAD)
    dt = distance_transform_edt(m > 0.5)
    near = dt[r, c] < RAD
    indptr, indices = _lists_to_csr(nbrs, coords.shape[0])

    F_numba = solve_platefit(coords, vc, vu, vv, nbrs, RAD, m, near)
    F_py = _platefit_python(coords, vc, vu, vv, indptr, indices, RAD,
                            np.ascontiguousarray(m, np.float64), near)
    _agree(F_numba, F_py)
