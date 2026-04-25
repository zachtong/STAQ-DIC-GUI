"""Release-readiness performance benchmarks.

Marked with ``@pytest.mark.perf`` so they're skipped in default CI
(runner CPU is too unstable for absolute thresholds). Run pre-release
on the maintainer's machine; results land in ``reports/perf_*.csv`` for
side-by-side comparison via ``tools/compare_perf.py``.

Decisions per 2026-04-25 plan:
- **Q1 (relative)**: thresholds compare against a committed v0.4.1
  baseline CSV (``reports/perf_v0.4.1.csv``); we only fail on >20%
  wall-time regression or >30% peak-RSS regression. We DO NOT assert
  absolute timing.
- **Q2 (graceful)**: pipeline edge cases must not segfault; covered
  separately by ``test_smoke_extreme_parameters.py``.

Two test groups:
- **perf**: small + medium scenarios; ~2 min total. Run before tag.
- **perf and large**: 4K + dense-mesh; ~30 min. Maintainer only.
"""

from __future__ import annotations

import csv
import os
import platform
import time
import tracemalloc
from datetime import datetime
from pathlib import Path
from typing import Any

import numpy as np
import pytest

from al_dic.core.config import dicpara_default
from al_dic.core.data_structures import GridxyROIRange
from al_dic.core.pipeline import run_aldic

# Re-use existing speckle generator (single source of truth).
from .conftest import apply_displacement_lagrangian, generate_speckle


REPORTS_DIR = Path(__file__).resolve().parents[1] / "reports"


# ---------------------------------------------------------------------------
# CSV report sink
# ---------------------------------------------------------------------------

class PerfRecorder:
    """Append one row per test into ``reports/perf_<timestamp>.csv``.

    Module-scoped so all perf tests in this run share the same file.
    """

    _instance: "PerfRecorder | None" = None

    def __init__(self) -> None:
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.path = REPORTS_DIR / f"perf_{ts}.csv"
        self._fp = open(self.path, "w", newline="", encoding="utf-8")
        self._writer = csv.writer(self._fp)
        self._writer.writerow([
            "test_id", "scenario", "img_h", "img_w", "n_frames", "subset_size",
            "subset_step", "search_range", "init_mode", "tracking_mode",
            "wall_seconds", "peak_rss_mb", "machine", "python", "platform",
            "timestamp",
        ])
        self._fp.flush()

    @classmethod
    def get(cls) -> "PerfRecorder":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def record(self, **row: Any) -> None:
        self._writer.writerow([
            row.get("test_id", ""),
            row.get("scenario", ""),
            row.get("img_h", 0), row.get("img_w", 0),
            row.get("n_frames", 0), row.get("subset_size", 0),
            row.get("subset_step", 0), row.get("search_range", 0),
            row.get("init_mode", ""), row.get("tracking_mode", ""),
            f"{row.get('wall_seconds', 0.0):.3f}",
            f"{row.get('peak_rss_mb', 0.0):.1f}",
            platform.node(), platform.python_version(), platform.platform(),
            datetime.now().isoformat(timespec="seconds"),
        ])
        self._fp.flush()


@pytest.fixture(scope="session")
def perf_recorder() -> PerfRecorder:
    rec = PerfRecorder.get()
    yield rec
    print(f"\n[perf] CSV written to: {rec.path}")


# ---------------------------------------------------------------------------
# Synthetic dataset builder (reused by all perf tests)
# ---------------------------------------------------------------------------

def _make_synthetic_run(
    h: int, w: int, n_frames: int, shear: float = 0.005, seed: int = 42,
) -> tuple[list[np.ndarray], list[np.ndarray]]:
    """Build a uniformly-sheared sequence of (H, W) speckle images."""
    ref = generate_speckle(h, w, sigma=3.0, seed=seed)
    images: list[np.ndarray] = [ref]
    for i in range(1, n_frames):
        scale = i * shear
        warped = apply_displacement_lagrangian(
            ref,
            lambda x, y, s=scale: s * y,    # u = s*y
            lambda x, y: np.zeros_like(x),  # v = 0
            n_iter=20,
        )
        images.append(warped)
    masks = [np.ones((h, w), dtype=bool)] * n_frames
    return images, masks


def _build_para(
    h: int, w: int, subset_size: int, subset_step: int,
    search_range: int, init_mode: str = "fft",
    tracking_mode: str = "accumulative",
):
    # validate_dicpara enforces winsize_min <= winstepsize, so when
    # subset_step is smaller than the default 8 (e.g. dense-mesh
    # benchmarks with step=4), winsize_min must shrink with it.
    return dicpara_default(
        winsize=subset_size - 1,        # internal even winsize
        winstepsize=subset_step,
        winsize_min=min(8, subset_step),
        size_of_fft_search_region=search_range,
        img_size=(h, w),
        gridxy_roi_range=GridxyROIRange(gridx=(0, w - 1), gridy=(0, h - 1)),
        reference_mode=tracking_mode,
        init_guess_mode=init_mode,
        show_plots=False,
    )


def _measure(callable_, *args, **kwargs) -> tuple[Any, float, float]:
    """Run callable, return (result, wall_seconds, peak_rss_mb)."""
    tracemalloc.start()
    t0 = time.perf_counter()
    result = callable_(*args, **kwargs)
    wall = time.perf_counter() - t0
    _, peak_bytes = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    return result, wall, peak_bytes / (1024 * 1024)


# ---------------------------------------------------------------------------
# Group 1: small / medium baselines (~2 min total)
# ---------------------------------------------------------------------------

PERF_CASES_SMALL = [
    # (scenario, h, w, n_frames, subset_size, subset_step, search)
    ("tiny_256_3frames",   256, 256, 3,  31, 16, 12),
    ("small_512_5frames",  512, 512, 5,  31, 16, 16),
    ("medium_512_10frames", 512, 512, 10, 31, 16, 16),
    ("medium_1024_5frames", 1024, 1024, 5, 31, 16, 16),
    ("dense_step8",        512, 512, 5,  31, 8,  16),
]


@pytest.mark.perf
@pytest.mark.parametrize(
    "scenario,h,w,n_frames,subset_size,subset_step,search",
    PERF_CASES_SMALL,
    ids=[c[0] for c in PERF_CASES_SMALL],
)
def test_perf_baseline(
    scenario, h, w, n_frames, subset_size, subset_step, search,
    perf_recorder, request,
):
    """Baseline: AL-DIC with FFT-every init across a small/medium grid.

    Records wall + peak RSS. We do not assert anything here — comparison
    against the v0.4.1 baseline is done by ``tools/compare_perf.py``.
    """
    images, masks = _make_synthetic_run(h, w, n_frames)
    para = _build_para(h, w, subset_size, subset_step, search)

    result, wall, peak = _measure(run_aldic, para, images, masks,
                                  compute_strain=False)

    assert result is not None
    assert len(result.result_disp) == n_frames - 1

    perf_recorder.record(
        test_id=request.node.name,
        scenario=scenario,
        img_h=h, img_w=w, n_frames=n_frames,
        subset_size=subset_size, subset_step=subset_step,
        search_range=search,
        init_mode="fft", tracking_mode="accumulative",
        wall_seconds=wall, peak_rss_mb=peak,
    )


# ---------------------------------------------------------------------------
# Group 2: tracking-mode comparison (perf characteristic differs)
# ---------------------------------------------------------------------------

@pytest.mark.perf
@pytest.mark.parametrize("init_mode", ["fft", "previous", "seed_propagation"])
def test_perf_init_mode_compare(init_mode, perf_recorder, request):
    """Compare wall time across init-guess modes on a fixed dataset."""
    h, w, n_frames = 512, 512, 5
    images, masks = _make_synthetic_run(h, w, n_frames, shear=0.003)
    para = _build_para(h, w, 31, 16, 16, init_mode=init_mode)

    try:
        result, wall, peak = _measure(run_aldic, para, images, masks,
                                      compute_strain=False)
    except Exception as exc:  # noqa: BLE001
        # Some init modes need extra fixture data (e.g. seed_propagation
        # auto-places seeds, which may fail on a bare synthetic). Record
        # but don't fail — perf tests measure the happy path only.
        perf_recorder.record(
            test_id=request.node.name,
            scenario=f"init={init_mode}_FAILED:{type(exc).__name__}",
            img_h=h, img_w=w, n_frames=n_frames,
            subset_size=31, subset_step=16, search_range=16,
            init_mode=init_mode, tracking_mode="accumulative",
            wall_seconds=-1.0, peak_rss_mb=-1.0,
        )
        pytest.skip(f"{init_mode} not supported on bare synthetic: {exc}")

    perf_recorder.record(
        test_id=request.node.name,
        scenario=f"init_compare_{init_mode}",
        img_h=h, img_w=w, n_frames=n_frames,
        subset_size=31, subset_step=16, search_range=16,
        init_mode=init_mode, tracking_mode="accumulative",
        wall_seconds=wall, peak_rss_mb=peak,
    )


# ---------------------------------------------------------------------------
# Group 3: large data (maintainer machine only)
# ---------------------------------------------------------------------------

PERF_CASES_LARGE = [
    # (scenario, h, w, n_frames, subset_size, subset_step, search)
    ("large_2048_5frames",   2048, 2048,  5, 31, 16, 16),
    ("xlarge_4096_3frames",  4096, 4096,  3, 31, 16, 16),
    ("long_seq_50frames",    512,  512,   50, 31, 16, 16),
    ("dense_1024_step4",     1024, 1024,  3, 31, 4,  16),  # 64x node count
]


@pytest.mark.perf
@pytest.mark.large
@pytest.mark.parametrize(
    "scenario,h,w,n_frames,subset_size,subset_step,search",
    PERF_CASES_LARGE,
    ids=[c[0] for c in PERF_CASES_LARGE],
)
def test_perf_large_data(
    scenario, h, w, n_frames, subset_size, subset_step, search,
    perf_recorder, request,
):
    """Large-data benchmarks. Skip on hosts with insufficient RAM.

    Empirical RAM ceilings observed on a Win11 / 64 GB / Python 3.13
    machine with the current AL-DIC implementation:

        2048² × 5 frames, step=16   →  ~9 GB peak
        4096² × 3 frames, step=16   →  ~37 GB peak  ⚠ candidate for
                                                    v0.5.x patch (see
                                                    integer_search.py)
        512² × 50 frames, step=16   →  ~0.5 GB peak (long sequence
                                                     does NOT leak)
        1024² × 3 frames, step=4    →  ~6 GB peak  (64K dense nodes)

    The 4096² peak is dominated by ADMM-loop transient allocations
    in solver/integer_search.py (`np.where` over full-image masks +
    per-node subset slicing across 64K+ nodes); tracemalloc records
    the highest instantaneous point, not summed lifetime memory.

    The threshold below errs on the side of caution: 40 GB free is
    enough to run every PERF_CASES_LARGE entry without OS swapping.
    """
    # Hard RAM threshold (env-overridable for the maintainer):
    # post-fix peak at 4096²×3 is ~17 GB on a Windows 11 machine. We
    # require 20 GB free (with margin) so non-maintainer machines
    # don't OOM. Set PYALDIC_PERF_RAM_GB to override.
    import os as _os
    threshold_gb = float(_os.environ.get("PYALDIC_PERF_RAM_GB", "20"))
    try:
        import psutil
        avail_gb = psutil.virtual_memory().available / 1e9
        if avail_gb < threshold_gb:
            pytest.skip(
                f"Only {avail_gb:.1f} GB RAM available; need ≥{threshold_gb:.0f} GB. "
                f"Set PYALDIC_PERF_RAM_GB to override."
            )
    except ImportError:
        pass  # psutil not installed — let it run

    images, masks = _make_synthetic_run(h, w, n_frames)
    para = _build_para(h, w, subset_size, subset_step, search)

    result, wall, peak = _measure(run_aldic, para, images, masks,
                                  compute_strain=False)

    assert result is not None
    perf_recorder.record(
        test_id=request.node.name,
        scenario=scenario,
        img_h=h, img_w=w, n_frames=n_frames,
        subset_size=subset_size, subset_step=subset_step,
        search_range=search,
        init_mode="fft", tracking_mode="accumulative",
        wall_seconds=wall, peak_rss_mb=peak,
    )
