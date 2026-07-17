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
  mask / region map are per frame -- rasterised from each frame's own
  trimmed mesh so a growing crack is trimmed and never spanned.
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
from al_dic.mesh.rasterize import rasterize_element_mask
from al_dic.strain.compute_strain import compute_strain
from al_dic.utils.region_analysis import (
    NodeRegionMap,
    precompute_node_regions,
)

ProgressCallback = Callable[[float, str], None]


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
    ) -> list[StrainResult]:
        """Compute strain for every frame in ``state.results.result_disp``.

        Args:
            override: Strain-only parameter overrides. Keys must be in
                :data:`ALLOWED_OVERRIDES`; otherwise a ``ValueError`` is
                raised.
            progress_cb: Optional ``(fraction, message)`` callback invoked
                once per processed frame. ``fraction`` is in ``[0, 1]``.

        Returns:
            List of ``StrainResult`` aligned with ``result_disp``.

        Raises:
            RuntimeError: If ``state.results`` is ``None``.
            ValueError: If any override key is outside ``ALLOWED_OVERRIDES``.
        """
        result = self._require_results()
        self._validate_override(override)

        ref_mesh, img_shape, fallback_mask = self._strain_common(result)
        meshes = result.result_fe_mesh_each_frame
        # Cache (mask, region_map) per distinct crack cut so frames that share a
        # crack geometry rasterise only once.
        raster_cache: dict[int, tuple[NDArray[np.float64], NodeRegionMap]] = {}

        n_frames = len(result.result_disp)
        out: list[StrainResult] = []
        for i, frame in enumerate(result.result_disp):
            U = frame.U_accum if frame.U_accum is not None else frame.U
            mesh_i = meshes[i] if (i < len(meshes) and meshes[i] is not None) else ref_mesh
            strain_mesh, region_map, para_strain = self._build_frame_strain_context(
                result, override, ref_mesh, mesh_i, img_shape,
                fallback_mask, raster_cache,
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
        mesh_i: DICMesh,
        img_shape: tuple[int, int],
        fallback_mask: NDArray[np.float64],
        cache: dict[int, tuple[NDArray[np.float64], NodeRegionMap]],
    ) -> tuple[DICMesh, NodeRegionMap, DICPara]:
        """Per-frame (mesh, region_map, para) for ``compute_strain``.

        Strain is total Lagrangian: the coordinates and ``U_accum`` both live in
        the frame-0 reference configuration, so ``strain_mesh`` keeps the frame-0
        coordinates.  The **crack geometry**, however, is taken per frame from
        ``mesh_i`` -- the frame's own already-trimmed mesh -- rasterised back to
        a pixel mask.  This makes the edge-trim and crack-aware plane fit follow
        that frame's crack (a grown crack is trimmed and never spanned), instead
        of freezing on a single frame-0 mask for every frame.
        """
        # Rasterise the frame's crack cut; cache by element identity so frames
        # that share a crack geometry rasterise (and build a region map) once.
        key = hash(mesh_i.elements_fem.tobytes())
        cached = cache.get(key)
        if cached is None:
            mask = rasterize_element_mask(
                mesh_i.coordinates_fem, mesh_i.elements_fem, img_shape,
            )
            if not np.any(mask):  # degenerate mesh -> fall back to ROI mask
                mask = fallback_mask
            h, w = mask.shape
            region_map = precompute_node_regions(
                ref_mesh.coordinates_fem, mask, (h, w),
            )
            cache[key] = (mask, region_map)
        else:
            mask, region_map = cached

        # Element connectivity: use the per-frame cut when the node set matches
        # the frame-0 coords (uniform mesh -- the common case).  Otherwise keep
        # frame-0 elements; method 2 (plane fit) ignores elements and is driven
        # by the per-frame ``mask`` above, so only method 3 (FEM nodal) on a
        # refined mesh falls back.
        if (
            mesh_i.coordinates_fem.shape == ref_mesh.coordinates_fem.shape
            and np.array_equal(mesh_i.coordinates_fem, ref_mesh.coordinates_fem)
        ):
            elements = mesh_i.elements_fem
        else:
            elements = ref_mesh.elements_fem

        strain_mesh = DICMesh(
            coordinates_fem=ref_mesh.coordinates_fem,
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
