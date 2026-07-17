"""Local weighted deformation gradient via plane fitting.

Port of MATLAB strain/comp_def_grad.m (Jin Yang, Caltech).

Computes the deformation gradient tensor at each node by fitting a plane
(1st-order polynomial) to the displacement field within a local
neighborhood defined by a pixel-unit search radius.  Uses moving least
squares (MLS) with Gaussian weighting.

MATLAB/Python differences:
    - MATLAB ``rangesearch`` -> ``scipy.spatial.KDTree.query_ball_point``.
    - MATLAB per-node backslash solve -> ``np.linalg.lstsq``.
    - Python returns only F (coordinates and U available to caller).
    - Neighbor filtering: only nodes with finite displacement AND inside
      the ROI mask may contribute to any plane fit.  The KDTree is built
      from this valid subset so invalid nodes are structurally excluded,
      not just masked after the fact.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray
from scipy.ndimage import distance_transform_edt
from scipy.spatial import KDTree


def edge_valid_mask(
    coordinates: NDArray[np.float64],
    mask: NDArray[np.float64] | None,
    rad: float,
    alpha: float = 0.7,
) -> NDArray[np.bool_]:
    """Flag plane-fit nodes whose VSG window crosses the ROI/hole boundary.

    A plane fit (``comp_def_grad``) is only reliable when its weighted
    neighbourhood is roughly symmetric.  At a node closer than ``alpha * rad``
    to the ROI (or an internal hole/crack) boundary, the VSG disk is truncated
    to one side, biasing the gradient and de-conditioning the least squares.
    This returns ``True`` for reliable (interior) nodes and ``False`` for
    edge nodes that should be trimmed.

    The criterion is purely geometric — distance from the node to the nearest
    boundary pixel, via the Euclidean distance transform of ``mask`` — so it is
    independent of mesh node density (uniform vs adaptive quadtree).

    Args:
        coordinates: Node coordinates (n_nodes, 2), columns [x, y].
        mask: Binary ROI mask (H, W); zero outside the ROI and inside holes.
            If None, all nodes are considered valid.
        rad: VSG / plane-fit search radius in pixels (``strain_plane_fit_rad``).
        alpha: Edge-trim coefficient. A node is valid iff its distance to the
            boundary is >= ``alpha * rad``.  ``alpha = 1.0`` trims any node
            whose disk touches the boundary; ``alpha = 0.0`` disables trimming
            (all nodes valid).

    Returns:
        Boolean array (n_nodes,): True = reliable, False = edge-trimmed.
    """
    n_nodes = coordinates.shape[0]
    if mask is None or alpha <= 0.0:
        return np.ones(n_nodes, dtype=bool)

    # Pad with a zero border so the image edge also counts as a boundary,
    # then distance-transform: dt[p] = distance from p to the nearest 0 pixel
    # (ROI outer edge, hole edge, or image border).
    m = np.pad(mask > 0, 1, mode="constant", constant_values=False)
    dt = distance_transform_edt(m)

    H, W = mask.shape
    col = np.clip(np.round(coordinates[:, 0]).astype(int), 0, W - 1) + 1
    row = np.clip(np.round(coordinates[:, 1]).astype(int), 0, H - 1) + 1
    return dt[row, col] >= alpha * rad


def _segment_hits_mask(
    x0: float, y0: float, x1: float, y1: float,
    mask: NDArray[np.float64] | np.ndarray,
) -> bool:
    """True if the open segment (x0,y0)->(x1,y1) passes through a masked pixel.

    Both endpoints are mesh nodes inside the ROI and are excluded; only the
    interior is sampled (~1 px spacing).  A neighbour is therefore dropped when
    the material between it and the query node is broken by a crack, hole, or
    ROI concavity -- the strain-side analogue of subset window splitting.
    """
    n = int(np.hypot(x1 - x0, y1 - y0))
    if n < 2:
        return False
    t = np.linspace(0.0, 1.0, n + 1)[1:-1]  # interior samples only
    xs = np.clip(np.round(x0 + t * (x1 - x0)).astype(np.int64),
                 0, mask.shape[1] - 1)
    ys = np.clip(np.round(y0 + t * (y1 - y0)).astype(np.int64),
                 0, mask.shape[0] - 1)
    return bool(np.any(mask[ys, xs] < 0.5))


def comp_def_grad(
    U: NDArray[np.float64],
    coordinates: NDArray[np.float64],
    elements: NDArray[np.int64],
    rad: float,
    mask: NDArray[np.float64] | None = None,
) -> NDArray[np.float64]:
    """Compute local deformation gradient via weighted plane fitting.

    For each node, finds *valid* neighbors within ``rad`` pixels, fits a
    1st-order polynomial to displacement using Gaussian weighting (MLS),
    and extracts the displacement gradients.

    Valid neighbor criteria (applied before building the KDTree):
        1. Finite displacement — ``isfinite(u) & isfinite(v)``.
        2. Inside ROI mask   — ``mask[row, col] > 0`` (if mask provided).

    Building the KDTree from valid nodes only ensures that invalid nodes
    (outside the ROI, or with NaN / diverged displacement) cannot appear
    in any node's fitting neighborhood, preventing boundary contamination.

    Args:
        U: Displacement vector (2*n_nodes,), interleaved [u0,v0,...].
        coordinates: Node coordinates (n_nodes, 2), columns [x, y].
        elements: Element connectivity (n_elements, 8), 0-based.
            Not used by this function; kept for API consistency.
        rad: Search radius in pixels.
        mask: Optional binary mask (H, W).  Nodes whose pixel-rounded
            coordinate falls in a zero region are excluded from being
            neighbors in all plane fits.

    Returns:
        Deformation gradient vector (4*n_nodes,), interleaved as
        [F11_0, F21_0, F12_0, F22_0, ...].  NaN where the valid
        neighbor count is < 3 or the least-squares solve fails.
    """
    n_nodes = coordinates.shape[0]
    F = np.full(4 * n_nodes, np.nan, dtype=np.float64)

    if n_nodes == 0:
        return F

    u = U[0::2]  # x-displacements
    v = U[1::2]  # y-displacements

    # --- Identify valid neighbor nodes ---
    # A node is valid as a *neighbor* only if its displacement is finite
    # AND its coordinate falls inside the ROI mask.  Building the KDTree
    # from this subset structurally prevents invalid nodes from entering
    # any plane fit, avoiding post-hoc contamination at ROI boundaries.
    valid = np.isfinite(u) & np.isfinite(v)
    if mask is not None:
        H, W = mask.shape
        col = np.clip(np.round(coordinates[:, 0]).astype(int), 0, W - 1)
        row = np.clip(np.round(coordinates[:, 1]).astype(int), 0, H - 1)
        valid &= mask[row, col] > 0

    valid_idx = np.where(valid)[0]
    if len(valid_idx) < 3:
        return F  # too few valid nodes for any plane fit

    valid_coords = coordinates[valid_idx]
    valid_u = u[valid_idx]
    valid_v = v[valid_idx]

    # KDTree built from valid nodes only.
    # neighbor_lists[i] contains indices INTO valid_* arrays (not original).
    tree = KDTree(valid_coords)
    rd_sq = rad * rad
    neighbor_lists = tree.query_ball_point(coordinates, rad)

    # Nodes within `rad` of a masked barrier (crack/hole/ROI edge) are the only
    # ones whose VSG disk can reach across it, so the (per-pair) line-of-sight
    # filter below runs only there -- elsewhere the Euclidean neighbours are all
    # on the same side already.
    near_barrier = None
    if mask is not None:
        dt = distance_transform_edt(mask > 0.5)
        h_mask, w_mask = mask.shape
        col = np.clip(np.round(coordinates[:, 0]).astype(int), 0, w_mask - 1)
        row = np.clip(np.round(coordinates[:, 1]).astype(int), 0, h_mask - 1)
        near_barrier = dt[row, col] < rad

    for i in range(n_nodes):
        # nb: indices into valid_coords / valid_u / valid_v
        nb = np.array(neighbor_lists[i], dtype=np.int64)

        xi = coordinates[i, 0]
        yi = coordinates[i, 1]

        # Crack-aware selection: drop neighbours whose straight segment to node
        # i crosses masked pixels, so a plane fit never spans a crack/hole even
        # when the VSG radius reaches across it.
        if near_barrier is not None and near_barrier[i] and nb.size:
            visible = np.array(
                [not _segment_hits_mask(
                    xi, yi, valid_coords[k, 0], valid_coords[k, 1], mask)
                 for k in nb],
                dtype=bool,
            )
            nb = nb[visible]

        # Need at least 3 neighbors for a plane fit (3 unknowns: a0, a1, a2)
        if len(nb) < 3:
            continue  # leave F[4i:4i+4] as NaN

        # Relative coordinates from query center to each valid neighbor
        dx = valid_coords[nb, 0] - xi
        dy = valid_coords[nb, 1] - yi
        dist_sq = dx * dx + dy * dy

        # Gaussian weights: w = exp(-d²/Rd²)
        w = np.exp(-dist_sq / max(rd_sq, 1e-10))

        # Weighted least squares: [1, dx, dy] * [a0; a1; a2] = u
        # a1 = du/dx = F11,  a2 = du/dy = F12
        W_diag = np.sqrt(w)
        A = np.column_stack([np.ones(len(nb)), dx, dy])
        Aw = A * W_diag[:, None]
        uw = valid_u[nb] * W_diag
        vw = valid_v[nb] * W_diag

        try:
            sol_u, _, _, _ = np.linalg.lstsq(Aw, uw, rcond=None)
            sol_v, _, _, _ = np.linalg.lstsq(Aw, vw, rcond=None)

            F[4 * i + 0] = sol_u[1]  # du/dx = F11
            F[4 * i + 1] = sol_v[1]  # dv/dx = F21
            F[4 * i + 2] = sol_u[2]  # du/dy = F12
            F[4 * i + 3] = sol_v[2]  # dv/dy = F22
        except np.linalg.LinAlgError:
            pass  # leave as NaN

    return F
