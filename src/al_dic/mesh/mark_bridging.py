"""Cut mesh elements that a continuous mask barrier separates locally.

``mark_inside`` removes an element only when >50% of its bounding box is masked
(a hole).  That criterion ignores a thin crack: a continuous masked band far
narrower than an element leaves the element mostly unmasked, so the element
survives and *bridges* the two crack faces the mask meant to keep apart.

``mark_bridging`` closes that gap with a **local** topological test: an element
is bridging when the material (unmasked) pixels inside its own bounding box
split into two or more connected components and the element's corner nodes fall
in different components.  Such an element spans a local cut and must be removed
so the mesh honours the barrier -- however thin it is.

The test is deliberately local.  A Mode-I crack is an internal slit whose two
faces stay joined around the crack tip via far-field material, so the specimen
is globally one connected region.  A *global* connected-component map would see
that single region and never flag the crack; only a per-element test detects the
slit where it actually separates material.  At the tip the material wraps around
inside the element (one component), so tip elements are kept and the cut stops
there automatically.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray
from scipy import ndimage

from .mark_inside import mark_inside

# 4-connectivity for the material (foreground).  With 4-connected material a
# continuous masked band -- even a 1-px, diagonal one -- fully separates the two
# sides, because 4-connected material cannot leak through the diagonal gaps of
# the barrier.  (8-connected material could leak across a 1-px diagonal crack.)
_FOUR_CONN = np.array([[0, 1, 0], [1, 1, 1], [0, 1, 0]], dtype=np.int64)


def mark_bridging(
    coordinates: NDArray[np.float64],
    elements: NDArray[np.int64],
    mask: NDArray[np.float64],
) -> NDArray[np.bool_]:
    """Flag elements a continuous masked barrier locally cuts in two.

    Args:
        coordinates: (n_nodes, 2) node coordinates, columns [x, y].
        elements: (n_elements, 4+) connectivity; corners in the first 4 columns.
        mask: (H, W) binary mask; > 0.5 = material, else masked (hole/crack).

    Returns:
        (n_elements,) bool array.  True = the element's corner nodes fall in
        >= 2 material components within its own bounding box, i.e. it bridges a
        local cut and should be trimmed.
    """
    n_elem = elements.shape[0]
    bridging = np.zeros(n_elem, dtype=np.bool_)
    if n_elem == 0:
        return bridging

    h, w = mask.shape
    material = mask > 0.5
    corners = elements[:, :4]
    cx = coordinates[corners, 0]
    cy = coordinates[corners, 1]
    x_min = np.clip(np.floor(cx.min(axis=1)).astype(np.int64), 0, w - 1)
    x_max = np.clip(np.ceil(cx.max(axis=1)).astype(np.int64), 0, w - 1)
    y_min = np.clip(np.floor(cy.min(axis=1)).astype(np.int64), 0, h - 1)
    y_max = np.clip(np.ceil(cy.max(axis=1)).astype(np.int64), 0, h - 1)
    px = np.clip(np.round(cx).astype(np.int64), 0, w - 1)
    py = np.clip(np.round(cy).astype(np.int64), 0, h - 1)

    for i in range(n_elem):
        patch = material[y_min[i]:y_max[i] + 1, x_min[i]:x_max[i] + 1]
        # Only a straddling element (both material and masked pixels) can be
        # cut; pure-material and pure-masked patches are skipped for speed.
        if patch.all() or not patch.any():
            continue
        labels, n_comp = ndimage.label(patch, structure=_FOUR_CONN)
        if n_comp < 2:
            continue  # material still one piece inside the element -> no cut

        corner_labels: set[int] = set()
        mat_ys = mat_xs = None
        for k in range(4):
            ly = int(np.clip(py[i, k] - y_min[i], 0, patch.shape[0] - 1))
            lx = int(np.clip(px[i, k] - x_min[i], 0, patch.shape[1] - 1))
            lab = int(labels[ly, lx])
            if lab > 0:
                corner_labels.add(lab)
                continue
            # Corner sits on a masked pixel (node right on the crack): attribute
            # it to the nearest material component so it still counts as a side.
            if mat_ys is None:
                mat_ys, mat_xs = np.nonzero(labels)
            if mat_ys.size:
                d = (mat_ys - ly) ** 2 + (mat_xs - lx) ** 2
                j = int(d.argmin())
                corner_labels.add(int(labels[mat_ys[j], mat_xs[j]]))
        if len(corner_labels) >= 2:
            bridging[i] = True

    return bridging


def trimmed_keep_indices(
    coordinates: NDArray[np.float64],
    elements: NDArray[np.int64],
    mask: NDArray[np.float64],
) -> NDArray[np.int64]:
    """Return the element indices to KEEP after trimming to the mask.

    Combines the hole test (``mark_inside`` -- drop elements whose bounding box
    is >50% masked) with the thin-barrier cut (``mark_bridging`` -- drop
    elements a continuous masked band separates locally).  Result is sorted.
    """
    _, outside_idx = mark_inside(coordinates, elements, mask)
    if outside_idx.size == 0:
        return outside_idx
    bridging = mark_bridging(coordinates, elements, mask)
    keep = outside_idx[~bridging[outside_idx]]
    return keep
