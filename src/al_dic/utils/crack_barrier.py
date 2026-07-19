"""Crack / hole-aware field rendering.

The DIC mesh (``elements_fem``) is already cut at cracks and holes by
``mesh.mark_bridging``.  Field *rendering*, however, throws that connectivity
away and rebuilds a fresh Delaunay triangulation over the node *coordinates* --
which happily reconnects nodes on opposite sides of a crack the mesh
deliberately split.  Linear interpolation over such a bridging triangle smears
the displacement / strain discontinuity across the crack, so the rendered field
looks continuous where the material (and the computation) is not.

These helpers detect Delaunay triangles whose edge crosses a masked barrier
(``mask < 0.5`` = crack / hole / outside ROI) and blank the grid cells those
triangles cover, so the rendered field respects the crack exactly as the mesh
does.  They are **bit-exact away from barriers**: when no triangle edge crosses
a masked pixel nothing is blanked, so crack-free renders are unchanged.

Used by both the on-screen view (``FieldInterpolator.cross_crack_grid`` ->
``gui/controllers/viz_controller``) and image / animation export
(``export/export_png.render_field_frame``), so the two agree.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray

# Cap on samples-per-edge for the barrier scan.  Interior crack-bridging edges
# are ~one mesh step long, so this is ~1 px sampling for typical step sizes;
# only long convex-hull edges are under-sampled, and those rarely straddle an
# internal crack.  Bounds transient memory for large meshes.
_MAX_EDGE_SAMPLES = 64


def segment_crosses_barrier(
    x0: float, y0: float, x1: float, y1: float,
    mask: NDArray,
) -> bool:
    """True if the open segment (x0,y0)->(x1,y1) passes through ``mask < 0.5``.

    Scalar mirror of :func:`al_dic.strain.comp_def_grad._segment_hits_mask`,
    kept here to avoid a utils -> strain import.  Endpoints (mesh nodes, inside
    the ROI) are excluded; only the interior is sampled at ~1 px.
    """
    n = int(np.hypot(x1 - x0, y1 - y0))
    if n < 2:
        return False
    t = np.linspace(0.0, 1.0, n + 1)[1:-1]
    xs = np.clip(np.round(x0 + t * (x1 - x0)).astype(np.int64), 0, mask.shape[1] - 1)
    ys = np.clip(np.round(y0 + t * (y1 - y0)).astype(np.int64), 0, mask.shape[0] - 1)
    return bool(np.any(mask[ys, xs] < 0.5))


def cross_crack_simplices(
    simplices: NDArray[np.int64],
    points: NDArray[np.float64],
    mask: NDArray,
) -> NDArray[np.bool_]:
    """Per-triangle bool: True where any of a triangle's edges crosses ``mask``.

    Vectorised over the *unique* edges of the triangulation (each interior edge
    is shared by two triangles, so this roughly halves the work): all unique
    edges are sampled at once and each triangle is flagged if any of its three
    edges crosses a masked pixel.

    An edge counts as crossing only when BOTH its endpoints are inside the
    barrier (``mask >= 0.5``).  Render nodes normally lie inside the ROI, so a
    crossing then means an *internal* void (crack / hole / concavity) -- the
    same assumption ``_segment_hits_mask`` makes in the strain code.  Edges with
    an out-of-ROI endpoint are convex-hull / boundary artifacts, not material
    cracks, and are ignored; this keeps a convex ROI bit-exact even when mesh
    nodes overhang the mask.
    """
    n_tri = len(simplices)
    if n_tri == 0:
        return np.zeros(0, dtype=bool)

    # Undirected unique edges + mapping back to the (3 * n_tri) stacked edges.
    stacked = np.vstack([
        simplices[:, [0, 1]],
        simplices[:, [1, 2]],
        simplices[:, [2, 0]],
    ])
    stacked = np.sort(stacked, axis=1)
    uniq, inv = np.unique(stacked, axis=0, return_inverse=True)
    inv = np.asarray(inv).ravel()  # numpy>=2 may return a column vector

    p0 = points[uniq[:, 0]]
    p1 = points[uniq[:, 1]]

    # Both endpoints must be inside the barrier for the edge to be a crack.
    def _inside(pts: NDArray[np.float64]) -> NDArray[np.bool_]:
        xi = np.clip(np.round(pts[:, 0]).astype(np.int64), 0, mask.shape[1] - 1)
        yi = np.clip(np.round(pts[:, 1]).astype(np.int64), 0, mask.shape[0] - 1)
        return mask[yi, xi] >= 0.5
    endpoints_in = _inside(p0) & _inside(p1)

    lengths = np.hypot(p1[:, 0] - p0[:, 0], p1[:, 1] - p0[:, 1])
    k = int(min(_MAX_EDGE_SAMPLES, max(3, np.ceil(float(lengths.max())) if lengths.size else 3)))
    ts = np.linspace(0.0, 1.0, k)[1:-1]  # interior samples only, (k-2,)

    # (E, k-2) sample coordinates along every unique edge.
    xs = p0[:, None, 0] + ts[None, :] * (p1[:, 0] - p0[:, 0])[:, None]
    ys = p0[:, None, 1] + ts[None, :] * (p1[:, 1] - p0[:, 1])[:, None]
    xi = np.clip(np.round(xs).astype(np.int64), 0, mask.shape[1] - 1)
    yi = np.clip(np.round(ys).astype(np.int64), 0, mask.shape[0] - 1)
    edge_crosses = np.any(mask[yi, xi] < 0.5, axis=1) & endpoints_in  # (E,)

    # A triangle crosses if ANY of its three edges crosses.
    return edge_crosses[inv].reshape(3, n_tri).any(axis=0)


def cross_crack_cell_mask(
    tri,
    points: NDArray[np.float64],
    x_grid: NDArray[np.float64],
    y_grid: NDArray[np.float64],
    mask: NDArray | None,
) -> NDArray[np.bool_] | None:
    """Grid mask (True = blank) for cells inside a barrier-crossing triangle.

    Args:
        tri:    ``scipy.spatial.Delaunay`` used for the field interpolation.
        points: (N, 2) node coordinates ``tri`` was built from.
        x_grid, y_grid: query grid (any shape), matching the rendered field.
        mask:   (H, W) barrier mask in the SAME coordinate space as *points*
                (``mask < 0.5`` = crack / hole / outside).  ``None`` disables.

    Returns:
        Bool array shaped like *x_grid* (True where the cell should be blanked),
        or ``None`` when no triangle crosses the barrier -- in which case the
        caller leaves the field untouched (bit-exact, crack-free render).
    """
    if mask is None:
        return None
    x_grid = np.asarray(x_grid)
    y_grid = np.asarray(y_grid)
    cross = cross_crack_simplices(tri.simplices, points, mask)
    if not cross.any():
        return None
    query = np.column_stack([x_grid.ravel(), y_grid.ravel()])
    simplex_of = tri.find_simplex(query)
    out = np.zeros(query.shape[0], dtype=bool)
    inside = simplex_of >= 0
    out[inside] = cross[simplex_of[inside]]
    return out.reshape(x_grid.shape)
