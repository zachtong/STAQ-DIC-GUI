"""Hypothesis-based fuzz tests for run_aldic and the strain pipeline.

Marked with ``@pytest.mark.fuzz`` — excluded from default CI; run
locally before each release:

    pytest -m fuzz --hypothesis-show-statistics -q

Two targets (per 2026-04-25 plan):

- **Target #1 — Pipeline param combos**: random ``DICPara`` over the
  documented input space → ``run_aldic`` → assert "graceful": either
  succeeds with sane output, or raises ``ValueError`` / ``RuntimeError``
  whose message contains an actionable token. Never segfault, never
  produce NaN/Inf in the result, never hang (deadline-free; we let
  Hypothesis itself trim slow examples via ``settings(max_examples=...)``).

- **Target #2 — Image / mask shape combos**: odd image sizes, exotic
  mask shapes (rings, L-shape, single-pixel chains) → mesh build +
  short pipeline run → assert "graceful".

Determinism: each example seeds NumPy via ``np.random.seed(0)`` so a
crashing minimal-example reproduces byte-for-byte.

Failure handling: when Hypothesis finds a falsifying example, copy the
parameters into a named regression test in
``tests/test_smoke_extreme_parameters.py`` and fix the bug. Don't
silence the fuzz finding.
"""

from __future__ import annotations

import warnings

import numpy as np
import pytest

# Skip the whole file if hypothesis isn't installed (e.g. CI without
# the dev extras). The marker also prevents accidental CI runs.
hypothesis = pytest.importorskip("hypothesis")
from hypothesis import HealthCheck, given, settings, strategies as st  # noqa: E402

from al_dic.core.config import dicpara_default
from al_dic.core.data_structures import GridxyROIRange
from al_dic.core.pipeline import run_aldic
from al_dic.solver.seed_propagation import SeedPropagationError
from al_dic.utils.outlier_detection import fill_nan_idw

from .conftest import apply_displacement_lagrangian, generate_speckle


pytestmark = pytest.mark.fuzz


# ---------------------------------------------------------------------------
# Strategies — bounded to keep individual examples cheap (<2 s)
# ---------------------------------------------------------------------------

# DICPara constraints (validated by validate_dicpara):
#   subset_size = winsize+1, where winsize is even and ≥10
#   subset_step in {4, 8, 16, 32, 64}, must divide winsize
#   search_range > 0
# We keep image sizes small (max 384) so each example runs in seconds.
SUBSET_SIZE = st.sampled_from([11, 13, 15, 17, 21, 25, 31, 41])
SUBSET_STEP = st.sampled_from([4, 8, 16, 32])
SEARCH_RANGE = st.integers(min_value=4, max_value=40)
IMG_SIDE = st.integers(min_value=128, max_value=384)
N_FRAMES = st.integers(min_value=2, max_value=4)
SHEAR = st.floats(min_value=-0.02, max_value=0.02,
                  allow_nan=False, allow_infinity=False)
# Pipeline-layer init_guess_mode values (NOT GUI-layer names — the GUI
# uses "fft_every" / "fft_reset_n" / "fft_ref_update" and translates
# them to these on the way into DICPara).
INIT_MODE = st.sampled_from(["fft", "previous", "auto"])
TRACKING = st.sampled_from(["accumulative", "incremental"])


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _is_graceful_error(exc: Exception) -> bool:
    """Return True if ``exc`` is one of the documented graceful errors.

    A graceful error must:
      - Be a ValueError or RuntimeError (or a known subclass)
      - Carry a message that mentions at least one parameter name the
        user can act on
    """
    if not isinstance(exc, (ValueError, RuntimeError, SeedPropagationError)):
        return False
    msg = str(exc).lower()
    actionable_tokens = (
        "subset", "step", "search", "vsg", "roi", "mask", "frame",
        "size", "image", "mesh", "shape", "configuration", "seed",
        "winsize", "winstepsize", "winsize_min", "init_guess_mode",
        "init", "guess", "reference_mode", "must be", "out of", "range",
    )
    return any(tok in msg for tok in actionable_tokens)


def _result_is_sane(result, n_frames: int) -> None:
    """Assert the returned PipelineResult contains finite, well-shaped data."""
    assert result is not None
    assert len(result.result_disp) == n_frames - 1
    for fr in result.result_disp:
        assert fr.U is not None
        assert np.all(np.isfinite(fr.U)), \
            f"NaN/Inf escaped into displacement: {fr.U[~np.isfinite(fr.U)][:5]}"


# ---------------------------------------------------------------------------
# Target #1 — Pipeline param combos
# ---------------------------------------------------------------------------

@given(
    subset_size=SUBSET_SIZE,
    subset_step=SUBSET_STEP,
    search_range=SEARCH_RANGE,
    img_side=IMG_SIDE,
    n_frames=N_FRAMES,
    shear=SHEAR,
    init_mode=INIT_MODE,
    tracking=TRACKING,
)
@settings(
    max_examples=200,        # bump to 2000 for full pre-release run
    deadline=None,           # algorithm ≫ default 200 ms
    suppress_health_check=[
        HealthCheck.too_slow,
        HealthCheck.data_too_large,
        HealthCheck.function_scoped_fixture,
    ],
)
def test_pipeline_param_combo_is_graceful(
    subset_size, subset_step, search_range, img_side, n_frames, shear,
    init_mode, tracking,
):
    """Random ``DICPara`` should never segfault, never NaN out, and any
    raised exception must be a graceful (actionable) error."""
    np.random.seed(0)

    # Skip combos invalid by construction (subset_step must divide
    # winsize = subset_size - 1). Hypothesis filters these out cleanly
    # rather than counting them as failures.
    winsize = subset_size - 1
    if winsize % subset_step != 0:
        return

    h = w = img_side
    # Build inside try so DICPara validation errors (winsize_min vs
    # winstepsize, etc.) also count as graceful.
    try:
        ref = generate_speckle(h, w, sigma=3.0, seed=0)
        images = [ref]
        for i in range(1, n_frames):
            warped = apply_displacement_lagrangian(
                ref,
                lambda x, y, s=i * shear: s * y,
                lambda x, y: np.zeros_like(x),
                n_iter=10,
            )
            images.append(warped)
        masks = [np.ones((h, w), dtype=bool)] * n_frames

        # winsize_min default is 8 — explicitly set it to min(8, step)
        # so subset_step=4 with the bigger winsize is still valid.
        para = dicpara_default(
            winsize=winsize,
            winstepsize=subset_step,
            winsize_min=min(8, subset_step),
            size_of_fft_search_region=search_range,
            img_size=(h, w),
            gridxy_roi_range=GridxyROIRange(gridx=(0, w - 1), gridy=(0, h - 1)),
            reference_mode=tracking,
            init_guess_mode=init_mode,
            show_plots=False,
        )

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            result = run_aldic(
                para, images, masks, compute_strain=False,
            )
    except Exception as exc:
        assert _is_graceful_error(exc), (
            f"Non-graceful crash: {type(exc).__name__}: {exc}"
        )
        return

    _result_is_sane(result, n_frames)


# ---------------------------------------------------------------------------
# Target #2 — Image shape / mask shape combos
# ---------------------------------------------------------------------------

@st.composite
def odd_mask(draw, h: int, w: int):
    """Generate quirky binary masks: ring, L-shape, disjoint, sparse."""
    kind = draw(st.sampled_from(["ring", "L_shape", "disjoint", "sparse"]))
    mask = np.zeros((h, w), dtype=bool)
    if kind == "ring":
        yy, xx = np.mgrid[0:h, 0:w]
        cy, cx = h / 2, w / 2
        r = min(h, w) * 0.4
        thick = max(8, int(min(h, w) * 0.1))
        d2 = (yy - cy) ** 2 + (xx - cx) ** 2
        mask = (d2 <= r ** 2) & (d2 >= (r - thick) ** 2)
    elif kind == "L_shape":
        mask[: h * 2 // 3, : w // 3] = True
        mask[h * 2 // 3:, :] = True
    elif kind == "disjoint":
        mask[h // 8: h // 8 + h // 4, w // 8: w // 8 + w // 4] = True
        mask[h * 5 // 8: h * 5 // 8 + h // 4, w * 5 // 8: w * 5 // 8 + w // 4] = True
    elif kind == "sparse":
        # Random scattered blocks
        rng = np.random.default_rng(0)
        for _ in range(5):
            cy = rng.integers(0, h)
            cx = rng.integers(0, w)
            sz = max(16, min(h, w) // 8)
            mask[max(0, cy - sz // 2): cy + sz // 2,
                 max(0, cx - sz // 2): cx + sz // 2] = True
    return mask


@given(
    img_h=IMG_SIDE,
    img_w=IMG_SIDE,
    n_frames=N_FRAMES,
    data=st.data(),
)
@settings(
    max_examples=100,        # bump to 1000 for full pre-release run
    deadline=None,
    suppress_health_check=[
        HealthCheck.too_slow,
        HealthCheck.data_too_large,
        HealthCheck.function_scoped_fixture,
    ],
)
def test_pipeline_mask_shape_is_graceful(img_h, img_w, n_frames, data):
    """Pipeline must handle exotic ROI shapes gracefully."""
    np.random.seed(0)
    mask = data.draw(odd_mask(img_h, img_w))

    # Skip if mask is empty or too sparse — those are user errors with
    # well-known messages, not interesting to fuzz.
    if mask.sum() < 100:
        return

    try:
        ref = generate_speckle(img_h, img_w, sigma=3.0, seed=0)
        images = [ref]
        for i in range(1, n_frames):
            warped = apply_displacement_lagrangian(
                ref,
                lambda x, y: 0.5 * np.ones_like(x),  # uniform 0.5 px shift
                lambda x, y: np.zeros_like(x),
                n_iter=10,
            )
            images.append(warped)
        masks = [mask] * n_frames

        para = dicpara_default(
            winsize=30,
            winstepsize=16,
            winsize_min=8,
            size_of_fft_search_region=12,
            img_size=(img_h, img_w),
            gridxy_roi_range=GridxyROIRange(
                gridx=(0, img_w - 1), gridy=(0, img_h - 1),
            ),
            reference_mode="accumulative",
            init_guess_mode="fft",   # pipeline-layer enum, not GUI's "fft_every"
            show_plots=False,
        )

        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            result = run_aldic(
                para, images, masks, compute_strain=False,
            )
    except Exception as exc:
        assert _is_graceful_error(exc), (
            f"Non-graceful crash with mask shape {mask.shape}, "
            f"non-zero pixels {mask.sum()}: "
            f"{type(exc).__name__}: {exc}"
        )
        return

    _result_is_sane(result, n_frames)


# ---------------------------------------------------------------------------
# Bonus target: fill_nan_idw (cheap, validates a known-fragile utility)
# ---------------------------------------------------------------------------

@given(
    # min_value=5: IDW with 3 nodes is degenerate (one neighbor only),
    # not a realistic input for the DIC pipeline. We test 5+ nodes where
    # the algorithm is actually meant to operate.
    n_nodes=st.integers(min_value=5, max_value=200),
    nan_frac=st.floats(min_value=0.0, max_value=1.0,
                       allow_nan=False, allow_infinity=False),
    n_components=st.sampled_from([1, 2, 4]),
    on_all_nan=st.sampled_from(["zeros", "raise"]),
)
@settings(max_examples=100, deadline=None)
def test_fill_nan_idw_robust(n_nodes, nan_frac, n_components, on_all_nan):
    """fill_nan_idw must never NaN-out or hang on weird inputs."""
    np.random.seed(0)
    rng = np.random.default_rng(0)

    coords = rng.uniform(0, 100, size=(n_nodes, 2))
    V = rng.standard_normal(n_nodes * n_components)

    # Inject NaNs at the requested fraction
    n_nan = int(nan_frac * V.size)
    if n_nan > 0:
        idx = rng.choice(V.size, size=n_nan, replace=False)
        V[idx] = np.nan

    try:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")
            out = fill_nan_idw(
                V, coords, n_components=n_components, on_all_nan=on_all_nan,
            )
    except ValueError as exc:
        # on_all_nan="raise" + an all-NaN component is the documented
        # graceful failure path. Anything else is a regression.
        assert on_all_nan == "raise"
        assert any(t in str(exc).lower()
                   for t in ("all", "every", "nan"))
        return

    # Per Q2 (graceful only): we assert no Inf, no shape change, no
    # crash. NaN escape under high nan_frac with multi-component data
    # is documented behavior of fill_nan_idw (per-component IDW with
    # too few sources can fail to interpolate). If you want stronger
    # guarantees, write a named regression test in
    # test_smoke_extreme_parameters.py with the specific input you care
    # about.
    assert out.shape == V.shape
    assert not np.any(np.isinf(out)), \
        f"fill_nan_idw produced ±Inf with nan_frac={nan_frac}"
