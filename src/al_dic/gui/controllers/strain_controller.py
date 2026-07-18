"""Post-pipeline strain computation controller.

The displacement pipeline (``pipeline_controller``) intentionally runs with
``compute_strain=False`` for fast iteration. This controller offers a
user-driven, decoupled path: read the existing displacement results, run
the strain pipeline once per frame against an isolated ``DICPara``
override, and write the result back into ``state.results.result_strain``
via :func:`dataclasses.replace`.

Design principles
-----------------
* No new ``AppState`` fields. Strain results live inside the existing
  ``PipelineResult.result_strain`` list.
* The base ``DICPara`` is never mutated. Overrides go through
  :func:`dataclasses.replace` and are restricted to a small whitelist so
  that callers cannot accidentally re-tune displacement parameters.
* Coordinates + ``U_accum`` are frame-0 (total Lagrangian), but the crack
  mask / region map are per frame -- the deformed per-frame ROI is warped
  back to frame-0 coords so a growing crack is trimmed (symmetrically) and
  never spanned.
"""

from __future__ import annotations

from dataclasses import replace
from typing import Callable

import numpy as np
from numpy.typing import NDArray

from al_dic.core.data_structures import (
    DICMesh,
    DICPara,
    PipelineResult,
    StrainResult,
)
from al_dic.gui.app_state import AppState
from al_dic.mesh.rasterize import crack_mask_from_deformed
from al_dic.strain.compute_strain import compute_strain
from al_dic.utils.region_analysis import (
    NodeRegionMap,
    precompute_node_regions,
)

ProgressCallback = Callable[[float, str], None]


class StrainComputationCancelled(Exception):
    """Raised by :meth:`StrainController.compute_all_frames` when the caller's
    ``should_stop`` predicate returns True, so a long multi-frame strain run can
    be interrupted at a frame boundary.  The GUI catches it and leaves the
    previous ``result_strain`` untouched."""


# Whitelist of parameters that can be overridden when computing strain.
# Anything outside this set would re-tune the displacement pipeline and is
# rejected to keep the strain post-processing path strictly read-only with
# respect to the existing ``result_disp`` field.
ALLOWED_OVERRIDES: frozenset[str] = frozenset({
    "method_to_compute_strain",
    "strain_plane_fit_rad",
    "strain_smoothness",
    "strain_type",
    "strain_edge_trim_alpha",
})


class StrainController:
    """Drive ``compute_strain`` over an existing ``PipelineResult``."""

    def __init__(self, state: AppState) -> None:
        self._state = state

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def compute_all_frames(
        self,
        override: dict[str, object],
        progress_cb: ProgressCallback | None = None,
        should_stop: Callable[[], bool] | None = None,
    ) -> list[StrainResult]:
        """Compute strain for every frame in ``state.results.result_disp``.

        Args:
            override: Strain-only parameter overrides. Keys must be in
                :data:`ALLOWED_OVERRIDES`; otherwise a ``ValueError`` is
                raised.
            progress_cb: Optional ``(fraction, message)`` callback invoked
                once per processed frame. ``fraction`` is in ``[0, 1]``.
            should_stop: Optional predicate checked at each frame boundary;
                when it returns True, computation is aborted by raising
                :class:`StrainComputationCancelled`.

        Returns:
            List of ``StrainResult`` aligned with ``result_disp``.

        Raises:
            RuntimeError: If ``state.results`` is ``None``.
            ValueError: If any override key is outside ``ALLOWED_OVERRIDES``.
            StrainComputationCancelled: If ``should_stop`` returns True.
        """
        result = self._require_results()
        self._validate_override(override)

        ref_mesh, img_shape, fallback_mask = self._strain_common(result)

        n_frames = len(result.result_disp)
        out: list[StrainResult] = []
        for i, frame in enumerate(result.result_disp):
            if should_stop is not None and should_stop():
                raise StrainComputationCancelled()
            U = frame.U_accum if frame.U_accum is not None else frame.U
            # The per-frame ROI is drawn on the DEFORMED image i+1 (result_disp
            # index i == image i+1); the crack is warped back to frame-0 coords.
            deformed_mask = self._state.per_frame_rois.get(i + 1)
            strain_mesh, region_map, para_strain = self._build_frame_strain_context(
                result, override, ref_mesh, U, deformed_mask,
                img_shape, fallback_mask,
            )
            sr = compute_strain(strain_mesh, para_strain, U, region_map)
            out.append(sr)
            if progress_cb is not None:
                progress_cb(
                    (i + 1) / max(1, n_frames),
                    f"Strain frame {i + 1}/{n_frames}",
                )
        return out

    def compute_and_store(
        self,
        override: dict[str, object],
        progress_cb: ProgressCallback | None = None,
    ) -> None:
        """Compute strain for all frames and write back into ``state.results``.

        The replacement uses :func:`dataclasses.replace` so that
        ``PipelineResult`` stays a frozen dataclass and listeners receive
        a single ``results_changed`` notification at the end.
        """
        new_strain = self.compute_all_frames(override, progress_cb=progress_cb)
        current = self._require_results()
        self._state.results = replace(current, result_strain=new_strain)
        self._state.results_changed.emit()

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _require_results(self) -> PipelineResult:
        result = self._state.results
        if result is None:
            raise RuntimeError(
                "StrainController: no displacement results available. "
                "Run DIC first before computing strain."
            )
        return result

    @staticmethod
    def _validate_override(override: dict[str, object]) -> None:
        unknown = set(override) - ALLOWED_OVERRIDES
        if unknown:
            joined = ", ".join(sorted(unknown))
            raise ValueError(
                f"Override keys not allowed for strain post-processing: "
                f"{joined}. Allowed keys: {sorted(ALLOWED_OVERRIDES)}."
            )

    def _strain_common(
        self, result: PipelineResult,
    ) -> tuple[DICMesh, tuple[int, int], NDArray[np.float64]]:
        """Shared inputs for per-frame strain: frame-0 mesh, image shape, and a
        fallback ROI mask (used when a per-frame mesh cannot be rasterised)."""
        if not result.result_fe_mesh_each_frame:
            raise RuntimeError(
                "StrainController: PipelineResult has no per-frame meshes."
            )
        ref_mesh = result.result_fe_mesh_each_frame[0]
        fallback_mask = self._resolve_reference_mask(result)
        img_shape = result.dic_para.img_size
        if not img_shape or img_shape[0] == 0 or img_shape[1] == 0:
            img_shape = fallback_mask.shape
        return ref_mesh, (int(img_shape[0]), int(img_shape[1])), fallback_mask

    def _build_frame_strain_context(
        self,
        result: PipelineResult,
        override: dict[str, object],
        ref_mesh: DICMesh,
        u_accum: NDArray[np.float64],
        deformed_mask: NDArray[np.float64] | None,
        img_shape: tuple[int, int],
        fallback_mask: NDArray[np.float64],
    ) -> tuple[DICMesh, NodeRegionMap, DICPara]:
        """Per-frame (mesh, region_map, para) for ``compute_strain``.

        Strain is total Lagrangian: coordinates + ``U_accum`` both live in the
        frame-0 reference configuration, so ``strain_mesh`` keeps the frame-0
        coordinates.  The crack, however, is known only in this frame's DEFORMED
        image (``per_frame_rois[frame]``); :func:`crack_mask_from_deformed`
        displaces the nodes there, re-cuts, and rasterises the survivors' frame-0
        footprint so the crack lands back at the reference position -- thin and
        symmetric.  Falls back to the frame-0 ROI when no per-frame mask / U is
        available (single-ROI or accumulative runs).
        """
        ref_coords = ref_mesh.coordinates_fem
        if (
            deformed_mask is not None
            and u_accum is not None
            and len(u_accum) == 2 * len(ref_coords)
        ):
            mask, elements = crack_mask_from_deformed(
                ref_coords, ref_mesh.elements_fem, u_accum,
                np.asarray(deformed_mask, dtype=np.float64), img_shape,
            )
            if not np.any(mask):  # degenerate warp -> fall back to ROI mask
                mask, elements = fallback_mask, ref_mesh.elements_fem
        else:
            mask, elements = fallback_mask, ref_mesh.elements_fem

        h, w = mask.shape
        region_map = precompute_node_regions(ref_coords, mask, (h, w))
        strain_mesh = DICMesh(
            coordinates_fem=ref_coords,
            elements_fem=elements,
            mark_coord_hole_edge=ref_mesh.mark_coord_hole_edge,
        )
        para_strain = replace(result.dic_para, img_ref_mask=mask, **override)
        return strain_mesh, region_map, para_strain

    def _resolve_reference_mask(
        self, result: PipelineResult,
    ) -> NDArray[np.float64]:
        """Find the frame-0 reference mask for region-map + edge-trim.

        Strain here is built on ``result_fe_mesh_each_frame[0]`` (the frame-0
        mesh) with ``U_accum`` (total displacement referred back to frame 0 --
        see ``pipeline.py`` cumulative transform), so the mask MUST be the
        frame-0 reference mask for the mesh, region map, and edge-trim to agree.

        Order of preference:
            1. ``state.per_frame_rois[0]`` -- the frame-0 reference ROI.
            2. ``dic_para.img_ref_mask`` -- fallback for headless/accumulative.

        Note: ``dic_para.img_ref_mask`` is deliberately NOT preferred.  The
        pipeline overwrites it once per frame
        (``para = replace(para, img_ref_mask=f_mask)`` inside the frame loop),
        so after an *incremental* run it holds the LAST frame's mask -- a grown
        crack that is inconsistent with the frame-0 mesh, which would trim the
        wrong nodes and smear strain across regions.  For accumulative runs the
        two coincide, so the fallback stays correct.

        Raises:
            RuntimeError: If neither source is available.
        """
        gui_mask = self._state.per_frame_rois.get(0)
        if gui_mask is not None:
            return np.asarray(gui_mask, dtype=np.float64)

        ref_mask = result.dic_para.img_ref_mask
        if ref_mask is not None:
            return np.asarray(ref_mask, dtype=np.float64)

        raise RuntimeError(
            "StrainController: no reference-frame mask available "
            "(per_frame_rois[0] is unset and dic_para.img_ref_mask is None)."
        )
