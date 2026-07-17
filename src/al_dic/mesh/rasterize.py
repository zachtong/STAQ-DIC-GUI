"""Rasterise a trimmed FE mesh back into a pixel ROI/crack mask.

The pipeline trims the mesh per frame (``trimmed_keep_indices`` +
``mark_bridging``) so that a growing crack cuts the mesh differently in each
frame.  Strain post-processing, however, consumes a *pixel* mask for
region-map construction, edge-trim (``edge_valid_mask``) and crack-aware plane
fitting (``comp_def_grad``).  This module converts the already-cut per-frame
mesh into that mask, so the strain edge-trim and crack barrier follow the same
per-frame crack the solver used -- rather than a single frame-0 mask smeared
across every frame.

Because the mask is derived from the mesh's own element footprint, it lives in
the mesh coordinate system (the frame-0 reference pixel grid) and needs no
displacement warping.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray

from al_dic.mesh.mark_bridging import trimmed_keep_indices


def rasterize_element_mask(
    coordinates: NDArray[np.float64],
    elements: NDArray[np.int64],
    img_shape: tuple[int, int],
) -> NDArray[np.float64]:
    """Binary mask (H, W) of pixels covered by the mesh's elements.

    A pixel is material (1.0) iff it falls inside the axis-aligned bounding box
    of some element's four corner nodes (``elements[:, :4]`` for Q8/Q4).  This
    is exact for the axis-aligned uniform quads that dominate DIC meshes and a
    mild over-approximation for irregular / quadtree-refined quads (the bounding
    box contains the quad), which errs toward keeping material -- i.e. conservative
    trimming rather than spurious holes.

    Removed (crack-bridging) elements leave their footprint at 0, so a crack
    that cut the mesh appears as a gap in the returned mask.

    Args:
        coordinates: Node coordinates (n_nodes, 2), columns [x, y] in pixels.
        elements: Element connectivity (n_elements, >=4), 0-based; first four
            columns are the corner nodes.
        img_shape: (height, width) of the target mask.

    Returns:
        Mask (H, W) float64 in {0.0, 1.0}; 1.0 = material, 0.0 = outside/crack.
    """
    h, w = int(img_shape[0]), int(img_shape[1])
    mask = np.zeros((h, w), dtype=np.float64)
    if elements.shape[0] == 0 or coordinates.shape[0] == 0:
        return mask

    corners = coordinates[elements[:, :4]]  # (n_elem, 4, 2)
    xs = corners[:, :, 0]
    ys = corners[:, :, 1]
    x0 = np.clip(np.floor(xs.min(axis=1)).astype(np.int64), 0, w - 1)
    x1 = np.clip(np.ceil(xs.max(axis=1)).astype(np.int64), 0, w - 1)
    y0 = np.clip(np.floor(ys.min(axis=1)).astype(np.int64), 0, h - 1)
    y1 = np.clip(np.ceil(ys.max(axis=1)).astype(np.int64), 0, h - 1)

    # One rectangle fill per element.  n_elements is O(1e3) for DIC meshes, so
    # the Python loop is cheap; callers cache the result per distinct mesh cut.
    for i in range(elements.shape[0]):
        mask[y0[i]:y1[i] + 1, x0[i]:x1[i] + 1] = 1.0
    return mask


def crack_mask_from_deformed(
    ref_coords: NDArray[np.float64],
    elements: NDArray[np.int64],
    u_accum: NDArray[np.float64],
    deformed_mask: NDArray[np.float64],
    img_shape: tuple[int, int],
) -> tuple[NDArray[np.float64], NDArray[np.int64]]:
    """Reference-coord ROI/crack mask for a frame whose crack is known only in
    the DEFORMED image (``per_frame_rois[frame]`` is drawn on the deformed frame).

    Strain is total Lagrangian on the frame-0 reference mesh, so the crack must
    be expressed in frame-0 coordinates.  A per-frame ROI, however, marks the
    *opened* crack at its deformed position -- rasterising the per-frame mesh (cut
    with that deformed mask) puts a wide, offset crack onto the reference nodes
    and over-trims one face.  Instead, displace each frame-0 node to its deformed
    position (``+ U_accum``), re-cut the mesh there against the deformed mask with
    the SAME trimmer the solver uses (``trimmed_keep_indices``), then rasterise the
    surviving elements' REFERENCE footprint.  The crack lands back at the frame-0
    (reference) position -- thin and symmetric about both faces.

    Args:
        ref_coords: Frame-0 node coordinates (n_nodes, 2), columns [x, y].
        elements: Frame-0 element connectivity (n_elements, >=4), 0-based.
        u_accum: Total displacement (2*n_nodes,), interleaved [u0, v0, u1, ...],
            defined on ``ref_coords``.
        deformed_mask: ROI mask (H, W) drawn on this frame's deformed image.
        img_shape: (height, width) of the reference mask to build.

    Returns:
        (mask, kept_elements): reference-coord mask (H, W) and the surviving
        element connectivity (for FEM-nodal strain / method 3).
    """
    deformed_coords = ref_coords.copy()
    deformed_coords[:, 0] += u_accum[0::2]
    deformed_coords[:, 1] += u_accum[1::2]
    keep = trimmed_keep_indices(deformed_coords, elements, deformed_mask)
    kept_elements = elements[keep]
    return rasterize_element_mask(ref_coords, kept_elements, img_shape), kept_elements
