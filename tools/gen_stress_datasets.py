"""Generate synthetic stress-test datasets for benchmarks + manual UAT.

Outputs reproducible PNG sequences under ``datasets/synthetic/<scenario>/``.
Each scenario has a fixed seed so results are byte-identical across runs.

Usage:
    python tools/gen_stress_datasets.py --list
    python tools/gen_stress_datasets.py --preset minimal       # ~200 MB, fast
    python tools/gen_stress_datasets.py --preset bench_full    # ~5 GB
    python tools/gen_stress_datasets.py --gen pure_shear_512   # one scenario

Each generated folder contains:
    img_00.png ... img_NN.png
    mask.png            (binary ROI mask, optional)
    metadata.json       (scenario name, params, ground truth refs)

Scenarios cover three axes:
    - **Geometry**: image size, n_frames, ROI shape
    - **Deformation**: pure translation, shear, rotation, large strain,
      cracks, occlusion
    - **Imaging**: speckle quality, noise, saturation, repetitive texture

We deliberately re-use ``tests/conftest.py::generate_speckle`` and
``apply_displacement_lagrangian`` so that the synthetic data here matches
what the test suite already validates against.
"""

from __future__ import annotations

import argparse
import json
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable

import numpy as np
from numpy.typing import NDArray

# Re-use existing helpers from the test suite — single source of truth.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "tests"))
from conftest import (  # type: ignore[import-not-found]
    generate_speckle,
    apply_displacement_lagrangian,
)

PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEST_ROOT = PROJECT_ROOT / "datasets" / "synthetic"


# ---------- Scenario definitions -------------------------------------------

@dataclass
class Scenario:
    key: str
    description: str
    img_shape: tuple[int, int]
    n_frames: int
    speckle_sigma: float
    seed: int
    # u_func, v_func: (i_frame, x, y) -> displacement field
    u_func: Callable[[int, NDArray, NDArray], NDArray]
    v_func: Callable[[int, NDArray, NDArray], NDArray]
    mask_builder: Callable[[int, int], NDArray] | None = None
    noise_sigma: float = 0.0
    saturate_above: float | None = None
    saturate_below: float | None = None
    extra_metadata: dict = field(default_factory=dict)


def _full_mask(h: int, w: int) -> NDArray:
    return np.ones((h, w), dtype=bool)


def _circular_roi(h: int, w: int, radius_frac: float = 0.4) -> NDArray:
    """ROI = inscribed circle, ``radius_frac`` * min(h, w)."""
    yy, xx = np.mgrid[0:h, 0:w]
    cy, cx = h / 2.0, w / 2.0
    r = radius_frac * min(h, w)
    return ((yy - cy) ** 2 + (xx - cx) ** 2) <= r ** 2


def _disjoint_roi(h: int, w: int, n_regions: int = 3) -> NDArray:
    """ROI = `n_regions` non-overlapping squares — exercises multi-region
    seed propagation."""
    mask = np.zeros((h, w), dtype=bool)
    region_h = h // (n_regions + 1)
    region_w = w // (n_regions + 1)
    for k in range(n_regions):
        cy = (2 * k + 1) * h // (2 * n_regions)
        cx = (2 * k + 1) * w // (2 * n_regions)
        mask[
            max(0, cy - region_h // 2): cy + region_h // 2,
            max(0, cx - region_w // 2): cx + region_w // 2,
        ] = True
    return mask


def _one_pixel_wide_roi(h: int, w: int) -> NDArray:
    """ROI is a 1-pixel-wide horizontal strip — pathological."""
    mask = np.zeros((h, w), dtype=bool)
    mask[h // 2, :] = True
    return mask


# Deformation field factories: closures capture parameters cleanly so
# Scenario.u_func / v_func remain pure (i, x, y) -> field.
def _zero(i, x, y):  # noqa: ARG001
    return np.zeros_like(x)


def _pure_translation_x(per_frame_px: float):
    return lambda i, x, y: np.full_like(x, per_frame_px * i)


def _pure_shear_uniform(per_frame_shear: float):
    return lambda i, x, y: per_frame_shear * i * y


def _rotation(per_frame_rad: float, cx: float, cy: float):
    """Rigid rotation about (cx, cy). Returns (u_func, v_func) tuple."""
    def u(i, x, y):
        theta = per_frame_rad * i
        return (np.cos(theta) - 1) * (x - cx) - np.sin(theta) * (y - cy)

    def v(i, x, y):
        theta = per_frame_rad * i
        return np.sin(theta) * (x - cx) + (np.cos(theta) - 1) * (y - cy)
    return u, v


def _stretch_y(per_frame_strain: float):
    """Uniaxial tension along y (eyy = constant)."""
    return lambda i, x, y: np.zeros_like(x), \
           lambda i, x, y: per_frame_strain * i * y


def _gaussian_blob(amplitude: float, sigma: float, cx: float, cy: float):
    """Localized Gaussian bump in the u field — non-uniform deformation."""
    def u(i, x, y):
        return amplitude * i * np.exp(
            -((x - cx) ** 2 + (y - cy) ** 2) / (2 * sigma ** 2)
        )
    return u, lambda i, x, y: np.zeros_like(x)


# ---------- Catalog --------------------------------------------------------

def _build_catalog() -> dict[str, Scenario]:
    cat: dict[str, Scenario] = {}

    # ---- Geometry stress ----
    cat["geom_baseline_512"] = Scenario(
        key="geom_baseline_512",
        description="Small reference: 512² × 10 frames, gentle shear. "
                    "Used as the canonical perf baseline.",
        img_shape=(512, 512), n_frames=10,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_shear_uniform(0.005), v_func=_zero,
    )

    cat["geom_long_sequence_200"] = Scenario(
        key="geom_long_sequence_200",
        description="Long sequence: 512² × 200 frames. Stresses memory "
                    "accumulation and any per-frame leak.",
        img_shape=(512, 512), n_frames=200,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_translation_x(0.5), v_func=_zero,
    )

    cat["geom_high_res_4k"] = Scenario(
        key="geom_high_res_4k",
        description="5 frames @ 4096² — stresses single-frame memory "
                    "and FFT search region.",
        img_shape=(4096, 4096), n_frames=5,
        speckle_sigma=4.0, seed=42,
        u_func=_pure_shear_uniform(0.001), v_func=_zero,
    )

    cat["geom_dense_mesh_step4"] = Scenario(
        key="geom_dense_mesh_step4",
        description="1024² × 10 frames, intended for use with subset_step=4 "
                    "so node count is ~64× the baseline.",
        img_shape=(1024, 1024), n_frames=10,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_shear_uniform(0.002), v_func=_zero,
        extra_metadata={"recommended_subset_step": 4},
    )

    cat["geom_two_frames"] = Scenario(
        key="geom_two_frames",
        description="Edge case: only two frames — minimum valid input.",
        img_shape=(256, 256), n_frames=2,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_translation_x(1.5), v_func=_zero,
    )

    # ---- ROI / mask shape ----
    cat["roi_circular"] = Scenario(
        key="roi_circular",
        description="Circular ROI (40% radius) — tests boundary-fitting.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_shear_uniform(0.003), v_func=_zero,
        mask_builder=_circular_roi,
    )

    cat["roi_disjoint_3regions"] = Scenario(
        key="roi_disjoint_3regions",
        description="Three non-overlapping square ROIs — multi-region "
                    "seed propagation.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_shear_uniform(0.003), v_func=_zero,
        mask_builder=lambda h, w: _disjoint_roi(h, w, n_regions=3),
    )

    cat["roi_pathological_1px"] = Scenario(
        key="roi_pathological_1px",
        description="ROI is a 1-pixel-wide horizontal strip — should "
                    "either reject or degrade gracefully.",
        img_shape=(256, 256), n_frames=3,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_translation_x(0.5), v_func=_zero,
        mask_builder=_one_pixel_wide_roi,
    )

    # ---- Deformation extremes ----
    cat["deform_zero"] = Scenario(
        key="deform_zero",
        description="Zero displacement — every frame identical. NCC ≈ 1, "
                    "result strain ≈ 0.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        u_func=_zero, v_func=_zero,
    )

    cat["deform_translation_50px"] = Scenario(
        key="deform_translation_50px",
        description="50 px/frame translation — exceeds typical FFT search "
                    "window; FFT must auto-expand or fail clearly.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_translation_x(50.0), v_func=_zero,
        extra_metadata={"recommended_search_range": 100},
    )

    cat["deform_translation_huge"] = Scenario(
        key="deform_translation_huge",
        description="200 px translation in 5 frames — tests seed_propagation "
                    "vs FFT failure modes.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_translation_x(40.0), v_func=_zero,
    )

    rot_u, rot_v = _rotation(np.deg2rad(5.0), cx=256.0, cy=256.0)
    cat["deform_rotation_5deg_per_frame"] = Scenario(
        key="deform_rotation_5deg_per_frame",
        description="5° per frame rotation about image center — large "
                    "displacements at boundary, F dominated by rotation.",
        img_shape=(512, 512), n_frames=10,
        speckle_sigma=3.0, seed=42,
        u_func=rot_u, v_func=rot_v,
    )

    bigrot_u, bigrot_v = _rotation(np.deg2rad(45.0), cx=256.0, cy=256.0)
    cat["deform_rotation_45deg_total"] = Scenario(
        key="deform_rotation_45deg_total",
        description="45° rotation across 5 frames — extreme; many FFT "
                    "init paths will fail, seed_propagation should rescue.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        u_func=lambda i, x, y: bigrot_u(i, x, y),
        v_func=lambda i, x, y: bigrot_v(i, x, y),
    )

    cat["deform_pure_shear_50pct"] = Scenario(
        key="deform_pure_shear_50pct",
        description="Cumulative shear γ ≈ 0.5 — extreme strain, tests "
                    "Green-Lagrangian vs Eulerian strain measure.",
        img_shape=(512, 512), n_frames=10,
        speckle_sigma=3.0, seed=42,
        u_func=_pure_shear_uniform(0.05), v_func=_zero,
    )

    bump_u, bump_v = _gaussian_blob(amplitude=4.0, sigma=80.0,
                                    cx=256.0, cy=256.0)
    cat["deform_gaussian_bump"] = Scenario(
        key="deform_gaussian_bump",
        description="Localized Gaussian bump in u — non-uniform field, "
                    "tests gradient capture.",
        img_shape=(512, 512), n_frames=8,
        speckle_sigma=3.0, seed=42,
        u_func=bump_u, v_func=bump_v,
    )

    # ---- Imaging stress ----
    cat["image_low_texture"] = Scenario(
        key="image_low_texture",
        description="Very smooth speckle (σ=8) — low-frequency texture, "
                    "stresses correlation strength.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=8.0, seed=42,
        u_func=_pure_shear_uniform(0.003), v_func=_zero,
    )

    cat["image_strong_noise"] = Scenario(
        key="image_strong_noise",
        description="Speckle + Gaussian noise σ=15 — tests outlier "
                    "rejection and smoothing presets.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        noise_sigma=15.0,
        u_func=_pure_shear_uniform(0.003), v_func=_zero,
    )

    cat["image_saturated"] = Scenario(
        key="image_saturated",
        description="Speckle clipped above 230 — saturation in part of "
                    "the image. NCC must remain usable.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        saturate_above=230.0,
        u_func=_pure_shear_uniform(0.003), v_func=_zero,
    )

    cat["image_underexposed"] = Scenario(
        key="image_underexposed",
        description="Speckle compressed to [40, 80] — low contrast.",
        img_shape=(512, 512), n_frames=5,
        speckle_sigma=3.0, seed=42,
        saturate_below=40.0, saturate_above=80.0,
        u_func=_pure_shear_uniform(0.003), v_func=_zero,
    )

    return cat


CATALOG = _build_catalog()


# ---------- Presets --------------------------------------------------------

PRESETS: dict[str, list[str]] = {
    "minimal": [
        "geom_baseline_512",
        "geom_two_frames",
        "deform_zero",
        "deform_pure_shear_50pct",
        "image_strong_noise",
    ],
    "bench_full": list(CATALOG.keys()),
    "extreme_only": [
        "deform_translation_50px",
        "deform_translation_huge",
        "deform_rotation_45deg_total",
        "deform_pure_shear_50pct",
        "image_low_texture",
        "image_underexposed",
        "roi_pathological_1px",
    ],
}


# ---------- Generation -----------------------------------------------------

def _save_png(arr: NDArray, path: Path) -> None:
    """Save a 2D float array to 8-bit PNG (clip + round)."""
    from PIL import Image
    a = np.clip(arr, 0.0, 255.0).astype(np.uint8)
    Image.fromarray(a).save(str(path))


def _save_mask_png(mask: NDArray, path: Path) -> None:
    from PIL import Image
    Image.fromarray((mask.astype(np.uint8) * 255)).save(str(path))


def _generate_one(scn: Scenario, dest: Path) -> None:
    h, w = scn.img_shape
    print(f"[gen] {scn.key:<40} {h}×{w} × {scn.n_frames} frames")

    rng = np.random.default_rng(scn.seed)
    ref = generate_speckle(h, w, sigma=scn.speckle_sigma, seed=scn.seed)
    if scn.saturate_below is not None or scn.saturate_above is not None:
        lo = scn.saturate_below if scn.saturate_below is not None else 0.0
        hi = scn.saturate_above if scn.saturate_above is not None else 255.0
        # Re-scale into [lo, hi] then re-clip — gives both compression
        # (low contrast) and saturation effects depending on params.
        ref = lo + (ref - ref.min()) * (hi - lo) / (ref.max() - ref.min())
        ref = np.clip(ref, lo, hi)

    dest.mkdir(parents=True, exist_ok=True)

    # Reference frame — index 0
    ref_with_noise = (
        ref + rng.standard_normal(ref.shape) * scn.noise_sigma
        if scn.noise_sigma > 0 else ref
    )
    _save_png(ref_with_noise, dest / "img_00.png")

    # Build factories that close over scenario params
    for i in range(1, scn.n_frames):
        # u/v as full fields, then warp (Lagrangian) so the warped image
        # matches what the DIC algorithm should recover.
        def u_func_lagrangian(x, y, frame=i):
            return scn.u_func(frame, x, y)

        def v_func_lagrangian(x, y, frame=i):
            return scn.v_func(frame, x, y)

        warped = apply_displacement_lagrangian(
            ref, u_func_lagrangian, v_func_lagrangian, n_iter=20,
        )
        if scn.noise_sigma > 0:
            warped = warped + rng.standard_normal(warped.shape) * scn.noise_sigma
        _save_png(warped, dest / f"img_{i:02d}.png")

    # Mask
    if scn.mask_builder is not None:
        mask = scn.mask_builder(h, w)
        _save_mask_png(mask, dest / "mask.png")

    # Metadata
    metadata = {
        "key": scn.key,
        "description": scn.description,
        "img_shape": list(scn.img_shape),
        "n_frames": scn.n_frames,
        "speckle_sigma": scn.speckle_sigma,
        "noise_sigma": scn.noise_sigma,
        "saturate_above": scn.saturate_above,
        "saturate_below": scn.saturate_below,
        "seed": scn.seed,
        "has_mask": scn.mask_builder is not None,
        **scn.extra_metadata,
    }
    (dest / "metadata.json").write_text(
        json.dumps(metadata, indent=2), encoding="utf-8",
    )


# ---------- Subcommands ----------------------------------------------------

def cmd_list(_args: argparse.Namespace) -> None:
    print(f"{'KEY':<38} {'SIZE':<14} {'FRAMES':>7}  DESCRIPTION")
    print("-" * 110)
    for key, scn in CATALOG.items():
        size = f"{scn.img_shape[0]}×{scn.img_shape[1]}"
        existing = "✓" if (DEST_ROOT / key).is_dir() else " "
        print(f"{existing} {key:<36} {size:<14} {scn.n_frames:>7}  {scn.description}")
    print()
    print("Presets:")
    for name, keys in PRESETS.items():
        print(f"  {name:<14} → {len(keys)} scenarios")


def cmd_preset(args: argparse.Namespace) -> None:
    if args.preset not in PRESETS:
        raise SystemExit(
            f"Unknown preset {args.preset!r}. "
            f"Available: {', '.join(PRESETS.keys())}"
        )
    for key in PRESETS[args.preset]:
        target = DEST_ROOT / key
        if target.is_dir() and not args.force:
            print(f"[skip] {key} already exists (use --force to regenerate)")
            continue
        _generate_one(CATALOG[key], target)


def cmd_gen(args: argparse.Namespace) -> None:
    if args.key not in CATALOG:
        raise SystemExit(f"Unknown scenario {args.key!r}; run --list.")
    target = DEST_ROOT / args.key
    if target.is_dir() and not args.force:
        print(f"[skip] {args.key} already exists (use --force to regenerate)")
        return
    _generate_one(CATALOG[args.key], target)


def cmd_clean(_args: argparse.Namespace) -> None:
    import shutil
    if DEST_ROOT.exists():
        shutil.rmtree(DEST_ROOT)
        print(f"Removed {DEST_ROOT.relative_to(PROJECT_ROOT)}")


# ---------- Entry point ----------------------------------------------------

def main() -> None:
    # Force UTF-8 stdout on Windows (default cp1252 chokes on ≈ ² etc.
    # in scenario descriptions).
    import io
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        try:
            sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[attr-defined]
        except (AttributeError, io.UnsupportedOperation):
            pass

    # Single-flag interface (matches the docstring usage examples).
    # Mutually-exclusive: --list, --preset, --gen, --clean.
    parser = argparse.ArgumentParser(
        description=__doc__.splitlines()[0],
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    action = parser.add_mutually_exclusive_group(required=True)
    action.add_argument("--list", action="store_true",
                        help="show all scenarios + presets")
    action.add_argument("--preset", help="generate a preset bundle")
    action.add_argument("--gen", help="generate one scenario by key")
    action.add_argument("--clean", action="store_true",
                        help="remove all generated datasets")
    parser.add_argument("--force", action="store_true",
                        help="regenerate even if scenario already exists")

    args = parser.parse_args()
    if args.list:
        cmd_list(args)
    elif args.preset:
        cmd_preset(argparse.Namespace(preset=args.preset, force=args.force))
    elif args.gen:
        cmd_gen(argparse.Namespace(key=args.gen, force=args.force))
    elif args.clean:
        cmd_clean(args)


if __name__ == "__main__":
    main()
