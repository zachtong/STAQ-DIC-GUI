"""Test that chunked _batch_ncc_search produces identical output to single-batch.

Production runs default to a chunk size large enough that any
realistic test case fits in one chunk — so the chunked code path is
NOT exercised by the existing 1273 tests. This file forces small
chunks via the CHUNK_SIZE_OVERRIDE module attribute and verifies the
output is bit-equivalent.

Why bit-equivalent matters: chunking splits the per-chunk
``_batch_qfactors`` and ``_batch_subpixel`` calls. Both are
node-wise independent operations, so the chunked output for node k
should be identical to the single-batch output for node k. Any
divergence indicates an off-by-one in the chunk-relative indexing
or a subtle global-state leak.
"""

from __future__ import annotations

import importlib

import numpy as np
import pytest

# al_dic.solver/__init__.py does `from .integer_search import integer_search`
# which shadows the submodule attribute, so a plain
# `import al_dic.solver.integer_search as is_mod` ends up binding the
# FUNCTION not the module. Use importlib.import_module to get the
# real module object.
is_mod = importlib.import_module("al_dic.solver.integer_search")


def _make_synthetic_pair(h: int = 256, w: int = 256, shift_px: float = 1.0,
                         seed: int = 42) -> tuple[np.ndarray, np.ndarray]:
    """Generate (ref, deformed) speckle pair with a uniform x-shift."""
    from scipy.ndimage import gaussian_filter
    rng = np.random.default_rng(seed)
    noise = rng.standard_normal((h, w))
    ref = gaussian_filter(noise, sigma=2.5)
    ref = (ref - ref.min()) / (ref.max() - ref.min())
    ref = (20 + 215 * ref).astype(np.float64)

    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    src_y = yy
    src_x = xx - shift_px
    from scipy.ndimage import map_coordinates
    deformed = map_coordinates(
        ref, [src_y.ravel(), src_x.ravel()],
        order=5, mode="constant", cval=0.0,
    ).reshape(h, w)
    return ref, deformed


def _build_grid(h: int, w: int, half_w: int, search: int,
                step: int) -> tuple[np.ndarray, np.ndarray]:
    """Build (x0, y0) grid the way integer_search expects."""
    margin = half_w + search
    x0 = np.arange(margin, w - margin, step, dtype=np.float64)
    y0 = np.arange(margin, h - margin, step, dtype=np.float64)
    return x0, y0


@pytest.fixture(autouse=True)
def reset_chunk_override():
    """Ensure each test starts with chunking unset, restores after."""
    saved = is_mod.CHUNK_SIZE_OVERRIDE
    is_mod.CHUNK_SIZE_OVERRIDE = None
    yield
    is_mod.CHUNK_SIZE_OVERRIDE = saved


# ---------------------------------------------------------------------------
# Numerical equivalence: single-batch vs chunked on identical inputs
# ---------------------------------------------------------------------------

@pytest.mark.parametrize("chunk_size", [50, 100, 250])
def test_chunked_output_matches_single_batch(chunk_size):
    """For N >> chunk_size, the chunked path must produce equivalent
    u_grid / v_grid / cc_max / qfactors (within float32 tolerance)."""
    h = w = 256
    half_w = 15  # subset_size = 31 → half_w = 15
    search = 12
    step = 8     # gives ~25×25 = 625 grid points
    ref, deformed = _make_synthetic_pair(h, w, shift_px=1.5)

    x0, y0 = _build_grid(h, w, half_w, search, step)
    n_grid = len(x0) * len(y0)
    assert n_grid > chunk_size, (
        f"need n_grid ({n_grid}) >> chunk_size ({chunk_size}) to "
        "actually exercise the multi-chunk path"
    )

    # Run with chunking disabled (single batch)
    is_mod.CHUNK_SIZE_OVERRIDE = None
    u_full, v_full, cc_full, qf_full = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )

    # Run with forced small chunks
    is_mod.CHUNK_SIZE_OVERRIDE = chunk_size
    u_ch, v_ch, cc_ch, qf_ch = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )

    # u_grid, v_grid: same matchTemplate calls per node, _batch_subpixel
    # is per-node so output is bit-identical.
    np.testing.assert_array_equal(
        u_full, u_ch, err_msg=f"u_grid drift at chunk_size={chunk_size}",
    )
    np.testing.assert_array_equal(
        v_full, v_ch, err_msg=f"v_grid drift at chunk_size={chunk_size}",
    )
    # cc_max: per-node sub_val from _batch_subpixel; theoretically
    # identical, but BLAS ordering inside the (6,9) @ (n,9,1) matmul
    # can produce ~1 ulp drift across batch sizes. Tolerate machine eps.
    np.testing.assert_allclose(
        cc_full, cc_ch, rtol=1e-12, atol=1e-14, equal_nan=True,
        err_msg=f"cc_max drift at chunk_size={chunk_size}",
    )
    # qfactors goes through _batch_qfactors per-chunk. The math is
    # identical per node, but einsum's summation order differs slightly
    # between chunks of different sizes — the end-to-end drift is at
    # machine epsilon (~3e-16 max relative for float64). rtol=1e-12
    # leaves comfortable headroom.
    # Diff is ~3e-16 (1.5× machine epsilon for float64) from einsum
    # summation order; rtol=1e-12 leaves comfortable headroom (still
    # tighter than the 5% tolerance the qfactors values themselves
    # warrant for downstream outlier filtering).
    np.testing.assert_allclose(
        qf_full, qf_ch, rtol=1e-12, atol=1e-12, equal_nan=True,
        err_msg=f"qfactors drift at chunk_size={chunk_size}",
    )


# ---------------------------------------------------------------------------
# Edge cases for the chunk-loop boundary
# ---------------------------------------------------------------------------

def test_chunk_size_equals_n_valid_no_drift():
    """chunk_size == n_valid is a degenerate single-chunk case; result
    must still equal the no-override path."""
    h = w = 256
    half_w = 15
    search = 12
    step = 16
    ref, deformed = _make_synthetic_pair(h, w, shift_px=1.0)
    x0, y0 = _build_grid(h, w, half_w, search, step)

    is_mod.CHUNK_SIZE_OVERRIDE = None
    u_a, v_a, cc_a, qf_a = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )

    is_mod.CHUNK_SIZE_OVERRIDE = len(x0) * len(y0)
    u_b, v_b, cc_b, qf_b = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )
    np.testing.assert_array_equal(u_a, u_b)
    np.testing.assert_array_equal(v_a, v_b)
    np.testing.assert_array_equal(cc_a, cc_b)


def test_chunk_size_one_extreme():
    """chunk_size=1 (process one node at a time) should also be
    equivalent — slow but a worst-case smoke test for off-by-one bugs in
    the chunk loop / slice indexing."""
    h = w = 192
    half_w = 11
    search = 8
    step = 16
    ref, deformed = _make_synthetic_pair(h, w, shift_px=1.0)
    x0, y0 = _build_grid(h, w, half_w, search, step)

    is_mod.CHUNK_SIZE_OVERRIDE = None
    u_a, _, _, _ = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )

    is_mod.CHUNK_SIZE_OVERRIDE = 1
    u_b, _, _, _ = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )
    np.testing.assert_array_equal(u_a, u_b)


def test_decide_chunk_size_respects_budget():
    """The auto-sizer must keep ncc_maps_chunk under the GB budget."""
    # Massive search radius (350) like in the real OOM case
    big_search = 350
    ncc_h = 2 * big_search + 1
    ncc_w = ncc_h
    chunk = is_mod._decide_chunk_size(
        n_valid=100_000, ncc_h=ncc_h, ncc_w=ncc_w,
    )
    chunk_bytes_gb = chunk * ncc_h * ncc_w * 4 / 1e9
    assert chunk_bytes_gb <= is_mod.CHUNK_TARGET_GB + 0.01, (
        f"chunk={chunk} produces ncc_maps of {chunk_bytes_gb:.2f} GB, "
        f"exceeding target {is_mod.CHUNK_TARGET_GB} GB"
    )


def test_decide_chunk_size_floor_500_for_small_search():
    """When search is tiny, the auto-sizer would otherwise return huge
    chunks; we floor at 500 for OpenCV thread-pool efficiency, AND we
    cap at n_valid so we never request more than we have."""
    chunk = is_mod._decide_chunk_size(
        n_valid=300, ncc_h=11, ncc_w=11,   # tiny search radius
    )
    # n_valid=300 < 500 floor → return n_valid
    assert chunk == 300


def test_decide_chunk_size_override_takes_precedence():
    """CHUNK_SIZE_OVERRIDE bypasses the budget calculation entirely."""
    is_mod.CHUNK_SIZE_OVERRIDE = 42
    try:
        chunk = is_mod._decide_chunk_size(
            n_valid=10_000, ncc_h=33, ncc_w=33,
        )
        assert chunk == 42
    finally:
        is_mod.CHUNK_SIZE_OVERRIDE = None


# ---------------------------------------------------------------------------
# OOM regression: large search radius would have allocated ~99 GB pre-fix
# ---------------------------------------------------------------------------

@pytest.mark.large
def test_large_search_radius_does_not_oom():
    """Pre-fix, search=300 with N≈30K would have tried to allocate
    ncc_maps of shape (30000, 601, 601) float32 = ~43 GB in one call,
    plus an equal-sized `shifted` buffer in _batch_qfactors. With chunking
    + streaming qfactors, peak should stay well under 6 GB regardless.

    Marked @large because allocating even the chunk arrays for search=300
    needs ~4 GB headroom; small CI runners shouldn't run this.
    """
    try:
        import psutil
        avail_gb = psutil.virtual_memory().available / 1e9
        if avail_gb < 8.0:
            pytest.skip(f"Only {avail_gb:.1f} GB free; need ≥8 GB.")
    except ImportError:
        pass

    h = w = 1024
    half_w = 15
    search = 300                    # would pre-fix have allocated ~43 GB
    step = 4                        # dense mesh → many nodes
    ref, deformed = _make_synthetic_pair(h, w, shift_px=2.0)
    x0, y0 = _build_grid(h, w, half_w, search, step)

    # Verify the auto-sized chunk would actually engage chunking
    n_grid = len(x0) * len(y0)
    ncc_h = 2 * search + 1
    chunk = is_mod._decide_chunk_size(n_grid, ncc_h, ncc_h)
    assert chunk < n_grid, (
        f"chunking won't engage: chunk={chunk} >= n_grid={n_grid}; "
        f"need to scale up the test to actually exercise chunked path"
    )

    # Run — should complete without MemoryError
    is_mod.CHUNK_SIZE_OVERRIDE = None
    u, v, cc, qf = is_mod._batch_ncc_search(
        ref, deformed, x0, y0, half_w, search,
    )
    assert u.shape == (len(y0), len(x0))
    # Most nodes should converge to a sensible displacement
    finite_u = u[np.isfinite(u)]
    assert len(finite_u) > 0
    # Mean displacement should be within a few pixels of the injected 2.0
    assert -10 < np.median(finite_u) < 10
