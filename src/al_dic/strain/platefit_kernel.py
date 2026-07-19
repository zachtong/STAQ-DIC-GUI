"""Numba-compiled kernel for local weighted plane-fit strain.

Replaces the Python per-node loop of :func:`al_dic.strain.comp_def_grad` with a
parallel ``@njit`` kernel that, for each node, accumulates the weighted
normal equations in a single pass and solves the 3x3 system in closed form
(no per-node ``lstsq``/SVD, no per-node NumPy allocations).  The crack /
hole line-of-sight neighbour filter runs inside the kernel too.

Numerically equivalent to the pure-Python path (normal equations vs. SVD
least squares agree to ~1e-15 for the well-conditioned 3x3 fit).

Falls back to a pure-Python implementation when Numba is unavailable, so the
module imports and runs everywhere (mirrors ``solver.numba_kernels``).
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray

try:
    from numba import njit, prange
    HAS_NUMBA = True
except ImportError:  # pragma: no cover - numba is a core dependency
    HAS_NUMBA = False

    def njit(*args, **kwargs):
        def decorator(func):
            return func
        if args and callable(args[0]):
            return args[0]
        return decorator

    def prange(*args):
        return range(*args)


@njit(cache=True)
def _seg_hits_mask(x0, y0, x1, y1, mask, h, w):
    """True if the open segment (x0,y0)->(x1,y1) passes through mask < 0.5.

    Port of ``comp_def_grad._segment_hits_mask``: endpoints excluded, interior
    sampled at ~1 px.  ``h, w = mask.shape`` passed in for nopython typing.
    """
    n = int(np.hypot(x1 - x0, y1 - y0))
    if n < 2:
        return False
    for k in range(1, n):  # interior samples t = k/n, k = 1 .. n-1
        t = k / n
        xx = int(round(x0 + t * (x1 - x0)))
        yy = int(round(y0 + t * (y1 - y0)))
        if xx < 0:
            xx = 0
        elif xx > w - 1:
            xx = w - 1
        if yy < 0:
            yy = 0
        elif yy > h - 1:
            yy = h - 1
        if mask[yy, xx] < 0.5:
            return True
    return False


@njit(cache=True)
def _solve_normal_eq(s00, s0x, s0y, sxx, sxy, syy,
                     bu0, bu1, bu2, bv0, bv1, bv2):
    """Solve the symmetric 3x3 weighted normal equations for u and v.

    M = [[s00,s0x,s0y],[s0x,sxx,sxy],[s0y,sxy,syy]]; returns the d/dx and d/dy
    components of u and v (rows 1,2 of M^{-1} b), plus an ``ok`` flag (False =
    singular).
    """
    a01 = sxy * s0y - s0x * syy      # cof(0,1)
    a02 = s0x * sxy - sxx * s0y      # cof(0,2)
    det = s00 * (sxx * syy - sxy * sxy) + s0x * a01 + s0y * a02
    if abs(det) < 1e-20:
        return 0.0, 0.0, 0.0, 0.0, False
    inv = 1.0 / det
    a11 = s00 * syy - s0y * s0y      # cof(1,1)
    a12 = s0x * s0y - s00 * sxy      # cof(1,2)
    a22 = s00 * sxx - s0x * s0x      # cof(2,2)
    du_dx = (a01 * bu0 + a11 * bu1 + a12 * bu2) * inv
    du_dy = (a02 * bu0 + a12 * bu1 + a22 * bu2) * inv
    dv_dx = (a01 * bv0 + a11 * bv1 + a12 * bv2) * inv
    dv_dy = (a02 * bv0 + a12 * bv1 + a22 * bv2) * inv
    return du_dx, du_dy, dv_dx, dv_dy, True


@njit(parallel=True, cache=True)
def _platefit_kernel(coords, vc, vu, vv, indptr, indices, rad,
                     mask, near_barrier):
    """Parallel weighted plane fit -> deformation gradient F (4*n,).

    Args:
        coords:       (n, 2) query node positions.
        vc, vu, vv:   (m, 2)/(m,)/(m,) VALID neighbour coords + u/v values.
        indptr:       (n+1,) CSR row pointers into *indices*.
        indices:      (nnz,) neighbour indices into vc/vu/vv (geometric, valid).
        rad:          plane-fit radius (Gaussian sigma = rad).
        mask:         (h, w) barrier mask (< 0.5 = crack/hole).
        near_barrier: (n,) bool -- run the line-of-sight filter for this node.

    Returns:
        (4*n,) F = [F11, F21, F12, F22, ...], NaN where < 3 usable neighbours
        or the normal matrix is singular.
    """
    n = coords.shape[0]
    h, w = mask.shape
    F = np.full(4 * n, np.nan)
    rd_sq = rad * rad
    if rd_sq < 1e-10:
        rd_sq = 1e-10

    for i in prange(n):
        xi = coords[i, 0]
        yi = coords[i, 1]
        chk = near_barrier[i]

        s00 = 0.0; s0x = 0.0; s0y = 0.0
        sxx = 0.0; sxy = 0.0; syy = 0.0
        bu0 = 0.0; bu1 = 0.0; bu2 = 0.0
        bv0 = 0.0; bv1 = 0.0; bv2 = 0.0
        cnt = 0

        for kk in range(indptr[i], indptr[i + 1]):
            k = indices[kk]
            xk = vc[k, 0]
            yk = vc[k, 1]
            if chk and _seg_hits_mask(xi, yi, xk, yk, mask, h, w):
                continue
            dx = xk - xi
            dy = yk - yi
            ww = np.exp(-(dx * dx + dy * dy) / rd_sq)
            uu = vu[k]
            vv_ = vv[k]
            s00 += ww; s0x += ww * dx; s0y += ww * dy
            sxx += ww * dx * dx; sxy += ww * dx * dy; syy += ww * dy * dy
            bu0 += ww * uu; bu1 += ww * dx * uu; bu2 += ww * dy * uu
            bv0 += ww * vv_; bv1 += ww * dx * vv_; bv2 += ww * dy * vv_
            cnt += 1

        if cnt < 3:
            continue
        du_dx, du_dy, dv_dx, dv_dy, ok = _solve_normal_eq(
            s00, s0x, s0y, sxx, sxy, syy, bu0, bu1, bu2, bv0, bv1, bv2)
        if not ok:
            continue
        F[4 * i + 0] = du_dx  # F11 = du/dx
        F[4 * i + 1] = dv_dx  # F21 = dv/dx
        F[4 * i + 2] = du_dy  # F12 = du/dy
        F[4 * i + 3] = dv_dy  # F22 = dv/dy

    return F


@njit(parallel=True, cache=True)
def _platefit_kernel_cached(coords, u, v, valid, indptr, indices, rad,
                            mask, near_barrier):
    """Like :func:`_platefit_kernel` but over a FRAME-INVARIANT all-node
    neighbour CSR: ``indices`` point into the full node arrays and each
    neighbour is kept only when ``valid[k]``.

    Lets the KDTree + ``query_ball_point`` be built once per sequence (the
    coordinates never move -- strain is total-Lagrangian) and reused every
    frame; only *valid*, *u/v* and the per-frame crack *mask* change.
    Produces the same neighbour set (valid nodes within the radius) as the
    per-frame valid-subset tree, so results are identical.
    """
    n = coords.shape[0]
    h, w = mask.shape
    F = np.full(4 * n, np.nan)
    rd_sq = rad * rad
    if rd_sq < 1e-10:
        rd_sq = 1e-10

    for i in prange(n):
        xi = coords[i, 0]
        yi = coords[i, 1]
        chk = near_barrier[i]

        s00 = 0.0; s0x = 0.0; s0y = 0.0
        sxx = 0.0; sxy = 0.0; syy = 0.0
        bu0 = 0.0; bu1 = 0.0; bu2 = 0.0
        bv0 = 0.0; bv1 = 0.0; bv2 = 0.0
        cnt = 0

        for kk in range(indptr[i], indptr[i + 1]):
            k = indices[kk]
            if not valid[k]:
                continue
            xk = coords[k, 0]
            yk = coords[k, 1]
            if chk and _seg_hits_mask(xi, yi, xk, yk, mask, h, w):
                continue
            dx = xk - xi
            dy = yk - yi
            ww = np.exp(-(dx * dx + dy * dy) / rd_sq)
            uu = u[k]
            vv_ = v[k]
            s00 += ww; s0x += ww * dx; s0y += ww * dy
            sxx += ww * dx * dx; sxy += ww * dx * dy; syy += ww * dy * dy
            bu0 += ww * uu; bu1 += ww * dx * uu; bu2 += ww * dy * uu
            bv0 += ww * vv_; bv1 += ww * dx * vv_; bv2 += ww * dy * vv_
            cnt += 1

        if cnt < 3:
            continue
        du_dx, du_dy, dv_dx, dv_dy, ok = _solve_normal_eq(
            s00, s0x, s0y, sxx, sxy, syy, bu0, bu1, bu2, bv0, bv1, bv2)
        if not ok:
            continue
        F[4 * i + 0] = du_dx
        F[4 * i + 1] = dv_dx
        F[4 * i + 2] = du_dy
        F[4 * i + 3] = dv_dy

    return F


def _lists_to_csr(neighbor_lists, n):
    """Flatten scipy ``query_ball_point`` lists into CSR (indptr, indices)."""
    counts = np.fromiter((len(neighbor_lists[i]) for i in range(n)),
                         dtype=np.int64, count=n)
    indptr = np.zeros(n + 1, dtype=np.int64)
    np.cumsum(counts, out=indptr[1:])
    if indptr[-1] == 0:
        return indptr, np.zeros(0, dtype=np.int64)
    indices = np.concatenate(
        [np.asarray(neighbor_lists[i], dtype=np.int64) for i in range(n)]
    )
    return indptr, indices


def solve_platefit(
    coordinates: NDArray[np.float64],
    valid_coords: NDArray[np.float64],
    valid_u: NDArray[np.float64],
    valid_v: NDArray[np.float64],
    neighbor_lists,
    rad: float,
    mask: NDArray[np.float64] | None,
    near_barrier: NDArray[np.bool_] | None,
) -> NDArray[np.float64]:
    """Weighted plane-fit deformation gradient for every query node.

    Numba kernel when available, otherwise an equivalent pure-Python loop.
    ``neighbor_lists[i]`` holds indices into ``valid_*`` (from
    ``KDTree(valid_coords).query_ball_point(coordinates, rad)``).
    """
    n = coordinates.shape[0]
    indptr, indices = _lists_to_csr(neighbor_lists, n)

    # Numba needs concrete (typed) mask + flags even when there is no barrier.
    if mask is not None and near_barrier is not None and near_barrier.any():
        mask_arr = np.ascontiguousarray(mask, dtype=np.float64)
        nb_flags = np.ascontiguousarray(near_barrier)
    else:
        mask_arr = np.ones((1, 1), dtype=np.float64)  # dummy; never sampled
        nb_flags = np.zeros(n, dtype=np.bool_)

    if HAS_NUMBA:
        return _platefit_kernel(
            np.ascontiguousarray(coordinates, dtype=np.float64),
            np.ascontiguousarray(valid_coords, dtype=np.float64),
            np.ascontiguousarray(valid_u, dtype=np.float64),
            np.ascontiguousarray(valid_v, dtype=np.float64),
            indptr, indices, float(rad), mask_arr, nb_flags,
        )
    return _platefit_python(
        coordinates, valid_coords, valid_u, valid_v,
        indptr, indices, float(rad), mask_arr, nb_flags,
    )


def _platefit_python(coords, vc, vu, vv, indptr, indices, rad,
                     mask, near_barrier):
    """Pure-Python fallback mirroring the kernel (used when Numba is absent)."""
    from .comp_def_grad import _segment_hits_mask

    n = coords.shape[0]
    F = np.full(4 * n, np.nan)
    rd_sq = max(rad * rad, 1e-10)
    for i in range(n):
        xi, yi = coords[i, 0], coords[i, 1]
        nb = indices[indptr[i]:indptr[i + 1]]
        if near_barrier[i] and nb.size:
            visible = np.array(
                [not _segment_hits_mask(xi, yi, vc[k, 0], vc[k, 1], mask)
                 for k in nb], dtype=bool,
            )
            nb = nb[visible]
        if len(nb) < 3:
            continue
        dx = vc[nb, 0] - xi
        dy = vc[nb, 1] - yi
        w = np.exp(-(dx * dx + dy * dy) / rd_sq)
        A = np.column_stack([np.ones(len(nb)), dx, dy])
        Aw = A * w[:, None]
        M = A.T @ Aw
        b = Aw.T @ np.column_stack([vu[nb], vv[nb]])
        try:
            sol = np.linalg.solve(M, b)
        except np.linalg.LinAlgError:
            continue
        F[4 * i + 0] = sol[1, 0]; F[4 * i + 1] = sol[1, 1]
        F[4 * i + 2] = sol[2, 0]; F[4 * i + 3] = sol[2, 1]
    return F


# ---------------------------------------------------------------------------
# Frame-invariant neighbour cache (Phase 2): build once, reuse every frame
# ---------------------------------------------------------------------------

def build_neighbor_cache(coordinates: NDArray[np.float64], rad: float):
    """Precompute the frame-invariant all-node geometric neighbour CSR.

    Strain is total-Lagrangian, so the node coordinates never move across
    frames; the geometric neighbours within *rad* are therefore identical every
    frame and can be built once (KDTree + ``query_ball_point``) and reused.
    Returns ``(indptr, indices)`` where ``indices`` index into ALL nodes.
    """
    from scipy.spatial import KDTree

    n = coordinates.shape[0]
    if n == 0:
        return np.zeros(1, dtype=np.int64), np.zeros(0, dtype=np.int64)
    tree = KDTree(np.ascontiguousarray(coordinates, dtype=np.float64))
    nbrs = tree.query_ball_point(coordinates, rad)
    return _lists_to_csr(nbrs, n)


def solve_platefit_cached(
    coordinates: NDArray[np.float64],
    u: NDArray[np.float64],
    v: NDArray[np.float64],
    valid: NDArray[np.bool_],
    cache,
    rad: float,
    mask: NDArray[np.float64] | None,
    near_barrier: NDArray[np.bool_] | None,
) -> NDArray[np.float64]:
    """Plane-fit deformation gradient using a precomputed all-node neighbour
    CSR (*cache* from :func:`build_neighbor_cache`).

    Equivalent to :func:`solve_platefit` but skips the per-frame KDTree build
    and query.  Per-frame inputs: *valid* (finite-U & inside mask), *u/v*,
    *mask*, *near_barrier*.
    """
    indptr, indices = cache
    coords = np.ascontiguousarray(coordinates, dtype=np.float64)
    u = np.ascontiguousarray(u, dtype=np.float64)
    v = np.ascontiguousarray(v, dtype=np.float64)
    valid = np.ascontiguousarray(valid, dtype=np.bool_)
    if mask is not None and near_barrier is not None and near_barrier.any():
        mask_arr = np.ascontiguousarray(mask, dtype=np.float64)
        nb_flags = np.ascontiguousarray(near_barrier)
    else:
        mask_arr = np.ones((1, 1), dtype=np.float64)  # dummy; never sampled
        nb_flags = np.zeros(coords.shape[0], dtype=np.bool_)

    if HAS_NUMBA:
        return _platefit_kernel_cached(
            coords, u, v, valid, indptr, indices,
            float(rad), mask_arr, nb_flags,
        )
    return _platefit_cached_python(
        coords, u, v, valid, indptr, indices, float(rad), mask_arr, nb_flags,
    )


def _platefit_cached_python(coords, u, v, valid, indptr, indices, rad,
                            mask, near_barrier):
    """Pure-Python fallback for the cached (all-node CSR) path."""
    from .comp_def_grad import _segment_hits_mask

    n = coords.shape[0]
    F = np.full(4 * n, np.nan)
    rd_sq = max(rad * rad, 1e-10)
    for i in range(n):
        xi, yi = coords[i, 0], coords[i, 1]
        allnb = indices[indptr[i]:indptr[i + 1]]
        nb = allnb[valid[allnb]]
        if near_barrier[i] and nb.size:
            nb = nb[np.array(
                [not _segment_hits_mask(xi, yi, coords[k, 0], coords[k, 1], mask)
                 for k in nb], dtype=bool)]
        if len(nb) < 3:
            continue
        dx = coords[nb, 0] - xi
        dy = coords[nb, 1] - yi
        w = np.exp(-(dx * dx + dy * dy) / rd_sq)
        A = np.column_stack([np.ones(len(nb)), dx, dy])
        Aw = A * w[:, None]
        M = A.T @ Aw
        b = Aw.T @ np.column_stack([u[nb], v[nb]])
        try:
            sol = np.linalg.solve(M, b)
        except np.linalg.LinAlgError:
            continue
        F[4 * i + 0] = sol[1, 0]; F[4 * i + 1] = sol[1, 1]
        F[4 * i + 2] = sol[2, 0]; F[4 * i + 3] = sol[2, 1]
    return F
