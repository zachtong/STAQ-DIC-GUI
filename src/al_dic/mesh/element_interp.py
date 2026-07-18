"""Crack-aware displacement interpolation for the cumulative transform.

The cumulative-displacement transform interpolates per-pair incremental
displacements at tracked node positions via a Delaunay triangulation of the
pair mesh's nodes.  A Delaunay triangulation connects the two faces of an open
crack straight across the gap, so a query near the crack mixes both faces'
motions -- ``U_accum`` gets smeared along the crack wake, which pollutes both
the strain field and the warped crack mask built from it.

This module provides the crack-aware alternative for query points near a
masked gap:

* :class:`ElementInterpolator` -- bilinear interpolation INSIDE the pair
  mesh's own (already crack-cut) axis-aligned quad elements.  A kept element
  never spans an open crack (``trimmed_keep_indices`` removes bridging
  elements), so a face point only ever sees same-face nodes.
* :class:`GapSuspector` -- cheap conservative flag for "within ~radius of a
  masked-out pixel", so the override runs only near cracks / holes / ROI
  edges and everything else stays byte-identical with the Delaunay path.
* :func:`no_material_nearby` -- final arbiter for points that resolve to no
  element: a point deep inside an open gap has no material within a small
  margin and is declared dead (NaN), while boundary-jitter points survive.
"""

from __future__ import annotations

import numpy as np
from numpy.typing import NDArray
from scipy.ndimage import maximum_filter
from scipy.spatial import KDTree


class GapSuspector:
    """Flags query points within ~``radius`` px of any masked-out pixel.

    Conservative superset via a block-downsampled dilation: the mask is
    max-pooled into ``block``-px tiles, tiles containing any masked pixel are
    dilated by ``ceil(radius/block)+1`` tiles, and points are tested against
    the tile map.  Exactness is not needed -- a false positive only costs one
    extra element lookup whose value matches the Delaunay one away from the
    gap.  Build once per mask, flag many point sets.
    """

    def __init__(
        self,
        mask: NDArray[np.float64],
        radius: float,
        block: int = 8,
    ) -> None:
        h, w = mask.shape
        self._block = int(block)
        inv = np.asarray(mask) <= 0.5
        hb = -(-h // self._block)
        wb = -(-w // self._block)
        padded = np.zeros((hb * self._block, wb * self._block), dtype=bool)
        padded[:h, :w] = inv
        tiles = padded.reshape(hb, self._block, wb, self._block).any(axis=(1, 3))
        k = int(np.ceil(radius / self._block)) + 1
        self._near = maximum_filter(tiles, size=2 * k + 1)
        self._hb, self._wb = hb, wb

    def flag(self, points: NDArray[np.float64]) -> NDArray[np.bool_]:
        """Boolean per point; non-finite points flag False."""
        out = np.zeros(len(points), dtype=bool)
        finite = np.isfinite(points).all(axis=1)
        if not finite.any():
            return out
        bx = np.clip(
            np.floor(points[finite, 0] / self._block).astype(np.int64),
            0, self._wb - 1,
        )
        by = np.clip(
            np.floor(points[finite, 1] / self._block).astype(np.int64),
            0, self._hb - 1,
        )
        out[finite] = self._near[by, bx]
        return out


def majority_masked(
    points: NDArray[np.float64],
    mask: NDArray[np.float64],
    margin: int = 1,
) -> NDArray[np.bool_]:
    """True where the majority of the (2*margin+1)^2 window around the point
    is masked out.

    Discriminates destroyed material from tracking jitter: a point inside an
    open crack gap (or smeared to the gap's edge) sees a mostly-masked
    neighbourhood, while a live node sitting ON a boundary pixel still sees a
    material majority (a straight boundary yields at most ~half masked, and a
    node a sub-pixel outside it stays below the strict majority).  Points
    outside the image are conservatively kept.
    """
    h, w = mask.shape
    out = np.zeros(len(points), dtype=bool)
    for i, (px, py) in enumerate(points):
        if not (np.isfinite(px) and np.isfinite(py)):
            continue
        x = int(round(px))
        y = int(round(py))
        x0, x1 = max(0, x - margin), min(w, x + margin + 1)
        y0, y1 = max(0, y - margin), min(h, y + margin + 1)
        if x0 >= x1 or y0 >= y1:
            continue  # fully outside the image: keep (boundary semantics)
        win = mask[y0:y1, x0:x1] > 0.5
        out[i] = win.sum() * 2 < win.size
    return out


class ElementInterpolator:
    """Bilinear (u, v) lookup inside axis-aligned quad elements.

    Precomputes per-element corner/bbox data and a KDTree over element
    centres; :meth:`interpolate_uv` then resolves each query point to the
    containing element (with ``eps`` px of slack so boundary jitter does not
    orphan a point) and blends the four corner values bilinearly.  Weights are
    corner-order independent.  Non-rectangular elements are skipped (the
    caller falls back to the Delaunay value), so irregular imported meshes
    degrade gracefully to today's behaviour.
    """

    def __init__(
        self,
        coordinates: NDArray[np.float64],
        elements: NDArray[np.int64],
        eps: float = 1.0,
    ) -> None:
        corners = elements[:, :4]
        cx = coordinates[corners, 0]
        cy = coordinates[corners, 1]
        x0, x1 = cx.min(axis=1), cx.max(axis=1)
        y0, y1 = cy.min(axis=1), cy.max(axis=1)
        sx = np.sort(cx, axis=1)
        sy = np.sort(cy, axis=1)
        rect = (
            (sx[:, 0] == sx[:, 1]) & (sx[:, 2] == sx[:, 3])
            & (sy[:, 0] == sy[:, 1]) & (sy[:, 2] == sy[:, 3])
            & (x1 > x0) & (y1 > y0)
        )
        self._corners = corners[rect]
        self._cx, self._cy = cx[rect], cy[rect]
        self._x0, self._x1 = x0[rect], x1[rect]
        self._y0, self._y1 = y0[rect], y1[rect]
        self._eps = float(eps)
        if self._corners.shape[0]:
            centers = np.column_stack([
                0.5 * (self._x0 + self._x1),
                0.5 * (self._y0 + self._y1),
            ])
            self._tree: KDTree | None = KDTree(centers)
            self._search_r = (
                0.5 * float(np.hypot(self._x1 - self._x0,
                                     self._y1 - self._y0).max())
                + self._eps + 1e-9
            )
        else:
            self._tree = None

    def interpolate_uv(
        self,
        u: NDArray[np.float64],
        v: NDArray[np.float64],
        query_points: NDArray[np.float64],
    ) -> tuple[NDArray[np.float64], NDArray[np.float64], NDArray[np.bool_]]:
        """Resolve each query point inside a kept element.

        Returns ``(u_q, v_q, resolved)``; unresolved entries (no containing
        rectangular element within ``eps``, or a corner with non-finite
        displacement) are NaN with ``resolved=False`` and the caller decides
        the fallback.
        """
        m = len(query_points)
        u_q = np.full(m, np.nan)
        v_q = np.full(m, np.nan)
        resolved = np.zeros(m, dtype=bool)
        if self._tree is None:
            return u_q, v_q, resolved

        for qi in range(m):
            px, py = query_points[qi]
            if not (np.isfinite(px) and np.isfinite(py)):
                continue
            cand = sorted(self._tree.query_ball_point((px, py), self._search_r))
            best, best_pen = -1, np.inf
            for e in cand:
                pen = max(
                    0.0,
                    self._x0[e] - px, px - self._x1[e],
                    self._y0[e] - py, py - self._y1[e],
                )
                if pen <= self._eps and pen < best_pen:
                    best, best_pen = e, pen
                    if pen == 0.0:
                        break  # strict containment; candidates sorted -> deterministic
            if best < 0:
                continue

            nid = self._corners[best]
            uc = u[nid]
            vc = v[nid]
            if not (np.isfinite(uc).all() and np.isfinite(vc).all()):
                continue
            dx = self._x1[best] - self._x0[best]
            dy = self._y1[best] - self._y0[best]
            wx1 = (px - self._x0[best]) / dx
            wy1 = (py - self._y0[best]) / dy
            # Corner-order independent bilinear weights: a corner sitting at
            # x1 gets wx1, at x0 gets (1 - wx1); same for y.
            wx = np.where(self._cx[best] == self._x1[best], wx1, 1.0 - wx1)
            wy = np.where(self._cy[best] == self._y1[best], wy1, 1.0 - wy1)
            w = wx * wy
            u_q[qi] = w @ uc
            v_q[qi] = w @ vc
            resolved[qi] = True
        return u_q, v_q, resolved
