"""Local weighted deformation gradient via plane fitting.

Port of MATLAB strain/comp_def_grad.m (Jin Yang, Caltech).

Computes the deformation gradient tensor at each node by fitting a plane
(1st-order polynomial) to the displacement field within a local
neighborhood defined by a pixel-unit search radius.  Uses moving least
squares (MLS) with Gaussian weighting.

MATLAB/Python differences:
    - MATLAB ``rangesearch`` -> ``scipy.spatial.KDTree.query_ball_point``.
    - MATLAB per-node backslash solve -> per-node weighted normal equations
      solved in a parallel Numba kernel (:mod:`al_dic.strain.platefit_kernel`),
      with an equivalent NumPy fallback.  Numerically identical to the earlier
      per-node ``np.linalg.lstsq`` to ~1e-15, ~10-16x faster on dense meshes.
    - Python returns only F (coordinates and U available to caller).
    - Neighbor filtering: only nodes with finite displacement AND inside
      the ROI mask may contribute to any plane fit.  The KDTree is built
      from this valid subset so invalid nodes are structurally excluded,
      not just masked after the fact.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray
from scipy.ndimage import binary_dilation
from scipy.spatial import KDTree, cKDTree

from .platefit_kernel import solve_platefit, solve_platefit_cached


def node_boundary_distance(
    coordinates: NDArray[np.float64],
    mask: NDArray[np.float64],
) -> NDArray[np.float64]:
    """Euclidean distance from each node's pixel to the nearest INTERIOR
    barrier pixel (``mask <= 0.5``), evaluated at the nodes only.

    Equal to ``distance_transform_edt(mask > 0.5)`` sampled at the nodes'
    clipped-rounded pixels -- the image border is NOT counted (that is added
    separately by :func:`edge_valid_mask`) -- but computed in
    O(n_nodes + n_boundary) via an 8-connected boundary-pixel KDTree instead of
    O(H*W).  The nearest background pixel to any foreground node is provably an
    8-connected boundary pixel, so this is exact; a node whose own pixel is
    background sits on the barrier and gets 0.  Returns ``+inf`` where the mask
    has no background at all (no barrier).
    """
    H, W = mask.shape
    fg = mask > 0.5
    cc = np.clip(np.round(coordinates[:, 0]).astype(np.int64), 0, W - 1)
    rc = np.clip(np.round(coordinates[:, 1]).astype(np.int64), 0, H - 1)

    boundary = (~fg) & binary_dilation(fg, structure=np.ones((3, 3), bool))
    ys, xs = np.where(boundary)
    if len(ys) == 0:
        d = np.full(coordinates.shape[0], np.inf, dtype=np.float64)
    else:
        tree = cKDTree(np.column_stack([xs, ys]).astype(np.float64))
        d, _ = tree.query(np.column_stack([cc, rc]).astype(np.float64))
    # A node whose own pixel is background is ON the barrier -> distance 0,
    # matching distance_transform_edt (which is 0 at every background pixel).
    return np.where(fg[rc, cc], d, 0.0)


def edge_valid_mask(
    coordinates: NDArray[np.float64],
    mask: NDArray[np.float64] | None,
    rad: float,
    alpha: float = 0.7,
    node_dist: NDArray[np.float64] | None = None,
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

        node_dist: Optional precomputed node-to-interior-barrier distance
            (:func:`node_boundary_distance`); pass it to share the boundary
            KDTree with ``comp_def_grad``'s near-barrier computation instead of
            recomputing.  Must correspond to the same *mask*.

    Returns:
        Boolean array (n_nodes,): True = reliable, False = edge-trimmed.
    """
    n_nodes = coordinates.shape[0]
    if mask is None or alpha <= 0.0:
        return np.ones(n_nodes, dtype=bool)

    # Distance to the nearest INTERIOR barrier (ROI/hole/crack edge), at the
    # nodes.  Equivalent to sampling distance_transform_edt(mask>0.5), but
    # O(nodes + boundary).  Shared with comp_def_grad when passed in.
    d_internal = (node_dist if node_dist is not None
                  else node_boundary_distance(coordinates, mask))

    # Add the image border as a boundary too (the old code np.pad()ed a zero
    # ring): the nearest border pixel to node pixel (rc, cc) is its
    # perpendicular foot, so the exact Euclidean distance is the analytic min.
    H, W = mask.shape
    cc = np.clip(np.round(coordinates[:, 0]).astype(np.int64), 0, W - 1)
    rc = np.clip(np.round(coordinates[:, 1]).astype(np.int64), 0, H - 1)
    d_border = np.minimum.reduce([rc + 1, H - rc, cc + 1, W - cc]).astype(np.float64)

    return np.minimum(d_internal, d_border) >= alpha * rad


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
    neighbors: tuple | None = None,
    near_barrier: NDArray[np.bool_] | None = None,
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
        neighbors: Optional precomputed frame-invariant all-node neighbour CSR
            (``(indptr, indices)`` from
            :func:`al_dic.strain.platefit_kernel.build_neighbor_cache`).  When
            given, the per-frame KDTree build + ``query_ball_point`` is skipped
            and neighbours are filtered by *valid* inside the kernel.  The
            coordinates must match those the cache was built from; results are
            identical to the default path.

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

    # Nodes within `rad` of a masked barrier (crack/hole/ROI edge) are the only
    # ones whose VSG disk can reach across it, so the (per-pair) line-of-sight
    # filter runs only there -- elsewhere the Euclidean neighbours are all on
    # the same side already.  Distance is computed at the nodes only
    # (node_boundary_distance == unpadded distance_transform_edt sampled at the
    # nodes), or reused from the caller (compute_strain shares it with the
    # edge-trim to avoid a second boundary scan per frame).
    if near_barrier is None and mask is not None:
        near_barrier = node_boundary_distance(coordinates, mask) < rad

    # Fast path: reuse a precomputed frame-invariant all-node neighbour CSR
    # (coordinates never move -- strain is total-Lagrangian), skipping the
    # per-frame KDTree build + query.  Neighbours are filtered by *valid*
    # inside the kernel, so the usable neighbour set (valid nodes within the
    # radius) -- and the result -- is identical to the default path.
    if neighbors is not None:
        return solve_platefit_cached(
            coordinates, u, v, valid, neighbors, rad, mask, near_barrier,
        )

    # Default path: build the KDTree from valid nodes only so invalid nodes
    # never enter any fit; neighbor_lists index INTO valid_* arrays.  The
    # per-node weighted least squares is solved via normal equations in a
    # Numba kernel (parallel, no per-node SVD), with a pure-Python fallback.
    valid_coords = coordinates[valid_idx]
    valid_u = u[valid_idx]
    valid_v = v[valid_idx]
    tree = KDTree(valid_coords)
    neighbor_lists = tree.query_ball_point(coordinates, rad)

    F = solve_platefit(
        coordinates, valid_coords, valid_u, valid_v,
        neighbor_lists, rad, mask, near_barrier,
    )

    return F
