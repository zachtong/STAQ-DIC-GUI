"""Read a nodal field at probe geometry, honouring cracks and node validity.

This is the only module that decides whether a sample means anything. Reductions
and charts consume its verdict rather than forming their own, so a curve, a CSV
cell and the field on screen cannot disagree about where the data stops.

Three things can invalidate a sample:

* it falls outside the mesh, or inside a region with no nodes;
* the node it rests on failed the strain reliability test
  (``StrainResult.strain_valid``) or was trimmed at the edge;
* reaching it means crossing a crack or hole.

The last one reuses ``utils.crack_barrier.cross_crack_simplices``, the same
routine the renderer uses to blank cells, so a probe and the picture agree by
construction rather than by coincidence. Away from a barrier the result is
bit-identical to sampling with no mask at all.

Everything here works in frame-0 (reference) image pixels.
"""

from __future__ import annotations

import enum
from dataclasses import dataclass
from typing import Sequence

import numpy as np
from numpy.typing import NDArray
from scipy.spatial import Delaunay

from al_dic.analysis.probes import AreaGeom, LineGeom, PointGeom
from al_dic.utils.crack_barrier import cross_crack_simplices

#: Sampling along a line at a fraction of the mesh step. Finer than the node
#: spacing invents resolution the data does not have; coarser misses the crack.
_SAMPLES_PER_STEP = 2.0
_MIN_LINE_SAMPLES = 2
_MAX_LINE_SAMPLES = 512


class SampleFlag(enum.Enum):
    """Why some part of a probe yielded nothing."""

    OUTSIDE_ROI = "outside_roi"
    INVALID_NODES = "invalid_nodes"
    CROSSES_CRACK = "crosses_crack"


@dataclass(frozen=True)
class SampleSet:
    """What a probe read on one frame.

    ``values`` is NaN wherever ``valid`` is False, so a caller that ignores
    ``valid`` still cannot mistake a hole for a measurement.
    """

    values: NDArray[np.float64]
    valid: NDArray[np.bool_]
    flags: frozenset[SampleFlag]

    @property
    def valid_fraction(self) -> float:
        if self.values.size == 0:
            return 0.0
        return float(self.valid.sum()) / float(self.values.size)


class ProbeSampler:
    """Samples one mesh. Build once per frame geometry, reuse for every field.

    Parameters
    ----------
    nodes:
        ``(N, 2)`` node coordinates in frame-0 image pixels, i.e.
        ``DICMesh.coordinates_fem``.
    mask:
        Region-of-interest mask in the same pixel coordinates. ``< 0.5`` marks
        void: crack, hole, or outside the region. Optional; without it no
        barrier is enforced.
    node_valid:
        ``(N,)`` per-node reliability, e.g. ``StrainResult.strain_valid``.
    step:
        Mesh step in pixels (``DICPara.winstepsize``), used to choose how
        densely to sample a line.
    """

    def __init__(
        self,
        nodes: NDArray[np.float64],
        *,
        mask: NDArray | None = None,
        node_valid: NDArray[np.bool_] | None = None,
        step: float = 8.0,
    ) -> None:
        self._nodes = np.asarray(nodes, dtype=np.float64)
        if self._nodes.ndim != 2 or self._nodes.shape[1] != 2:
            raise ValueError(
                f"nodes must be (N, 2), got {self._nodes.shape}."
            )
        finite = np.isfinite(self._nodes).all(axis=1)
        if int(finite.sum()) < 3:
            raise ValueError(
                "Probe sampling needs at least three nodes with finite "
                f"coordinates (got {int(finite.sum())})."
            )
        self._finite = finite
        self._tri = Delaunay(self._nodes[finite])
        self._step = float(step)
        self._mask = None if mask is None else np.asarray(mask)

        if node_valid is None:
            self._node_valid = np.ones(len(self._nodes), dtype=bool)
        else:
            self._node_valid = np.asarray(node_valid, dtype=bool)
            if self._node_valid.shape[0] != self._nodes.shape[0]:
                raise ValueError(
                    "node_valid must have one entry per node "
                    f"({self._nodes.shape[0]}), got {self._node_valid.shape[0]}."
                )

        # Per-triangle: does reaching across it mean crossing a barrier?
        if self._mask is None:
            self._bad_simplex = np.zeros(len(self._tri.simplices), dtype=bool)
        else:
            self._bad_simplex = cross_crack_simplices(
                self._tri.simplices, self._nodes[finite], self._mask
            )
        # Per-triangle: does it rest on any unreliable node?
        valid_f = self._node_valid[finite]
        self._invalid_simplex = ~valid_f[self._tri.simplices].all(axis=1)

    # -- scattered queries ------------------------------------------------

    def _locate(self, xy: NDArray[np.float64]) -> NDArray[np.int64]:
        """Containing simplex per query point; -1 when outside the mesh."""
        return self._tri.find_simplex(np.asarray(xy, dtype=np.float64))

    def _sample_xy(
        self, values: NDArray[np.float64], xy: NDArray[np.float64]
    ) -> tuple[NDArray[np.float64], NDArray[np.bool_], set[SampleFlag]]:
        """Barycentric interpolation with the barrier and validity verdicts."""
        vals = np.asarray(values, dtype=np.float64)[self._finite]
        xy = np.atleast_2d(np.asarray(xy, dtype=np.float64))
        simplex = self._locate(xy)

        out = np.full(len(xy), np.nan, dtype=np.float64)
        valid = np.zeros(len(xy), dtype=bool)
        flags: set[SampleFlag] = set()

        outside = simplex < 0
        if outside.any():
            flags.add(SampleFlag.OUTSIDE_ROI)

        inside = ~outside
        if inside.any():
            idx = simplex[inside]
            blocked = self._bad_simplex[idx]
            unreliable = self._invalid_simplex[idx]
            if blocked.any():
                flags.add(SampleFlag.CROSSES_CRACK)
            if unreliable.any():
                flags.add(SampleFlag.INVALID_NODES)

            usable = ~(blocked | unreliable)
            if usable.any():
                keep = np.flatnonzero(inside)[usable]
                s = simplex[keep]
                transform = self._tri.transform[s]
                delta = xy[keep] - transform[:, 2]
                bary2 = np.einsum("ijk,ik->ij", transform[:, :2], delta)
                bary = np.column_stack(
                    [bary2, 1.0 - bary2.sum(axis=1)]
                )
                corners = self._tri.simplices[s]
                interpolated = np.einsum("ij,ij->i", bary, vals[corners])
                out[keep] = interpolated
                valid[keep] = np.isfinite(interpolated)
                # A NaN nodal value is unreliable data, not a geometry problem.
                if not valid[keep].all():
                    flags.add(SampleFlag.INVALID_NODES)
                out[keep[~valid[keep]]] = np.nan

        return out, valid, flags

    # -- probe kinds ------------------------------------------------------

    def sample_point(
        self, values: NDArray[np.float64], geom: PointGeom
    ) -> SampleSet:
        out, valid, flags = self._sample_xy(
            values, np.array([[geom.x, geom.y]], dtype=np.float64)
        )
        return SampleSet(out, valid, frozenset(flags))

    def line_sample_count(self, geom: LineGeom) -> int:
        """How many points to take along *geom*, from the mesh step.

        The reference uses 100 for every line whatever its length, so a 20 px
        gauge reports a resolution its data cannot support.
        """
        n = int(round(geom.length() / self._step * _SAMPLES_PER_STEP)) + 1
        return int(np.clip(n, _MIN_LINE_SAMPLES, _MAX_LINE_SAMPLES))

    def sample_line(
        self,
        values: NDArray[np.float64],
        geom: LineGeom,
        *,
        count: int | None = None,
    ) -> SampleSet:
        n = int(count) if count else self.line_sample_count(geom)
        t = np.linspace(0.0, 1.0, n)
        xy = np.column_stack([
            geom.x0 + t * (geom.x1 - geom.x0),
            geom.y0 + t * (geom.y1 - geom.y0),
        ])
        out, valid, flags = self._sample_xy(values, xy)
        return SampleSet(out, valid, frozenset(flags))

    def sample_endpoints(
        self,
        u: NDArray[np.float64],
        v: NDArray[np.float64],
        geom: LineGeom,
    ) -> tuple[tuple[float, float], tuple[float, float]]:
        """Displacement at both gauge endpoints, interpolated like everything else.

        The reference rounds the endpoint to the nearest array index and clamps
        it into range, so a sub-pixel gauge is quantised and a gauge point off
        the region silently measures the boundary.
        """
        xy = np.array(
            [[geom.x0, geom.y0], [geom.x1, geom.y1]], dtype=np.float64
        )
        us, _, _ = self._sample_xy(u, xy)
        vs, _, _ = self._sample_xy(v, xy)
        return (float(us[0]), float(vs[0])), (float(us[1]), float(vs[1]))

    def nodes_in_area(self, geom: AreaGeom) -> NDArray[np.bool_]:
        """Which mesh nodes lie inside *geom*."""
        x = self._nodes[:, 0]
        y = self._nodes[:, 1]
        if geom.shape == "rect":
            x0, y0, x1, y1 = geom.data  # type: ignore[misc]
            return (x >= x0) & (x <= x1) & (y >= y0) & (y <= y1)
        if geom.shape == "circle":
            cx, cy, r = geom.data  # type: ignore[misc]
            return (x - cx) ** 2 + (y - cy) ** 2 <= r * r
        if geom.shape == "polygon":
            return _points_in_polygon(x, y, geom.data)  # type: ignore[arg-type]
        raise ValueError(f"Unknown area shape {geom.shape!r}.")

    def sample_area(
        self, values: NDArray[np.float64], geom: AreaGeom
    ) -> SampleSet:
        """Nodal values inside *geom*.

        Node-based, not a rasterised pixel mask: the field lives on a mesh, and
        a region smaller than one mesh cell genuinely contains no measurement.
        Reporting that is better than interpolating a number from nodes that are
        all outside the region the user drew.
        """
        selected = self.nodes_in_area(geom) & self._finite
        flags: set[SampleFlag] = set()
        if not selected.any():
            return SampleSet(
                np.zeros(0, dtype=np.float64),
                np.zeros(0, dtype=bool),
                frozenset({SampleFlag.OUTSIDE_ROI}),
            )

        vals = np.asarray(values, dtype=np.float64)[selected]
        valid = self._node_valid[selected] & np.isfinite(vals)
        if not valid.all():
            flags.add(SampleFlag.INVALID_NODES)

        if self._mask is not None and self._region_touches_barrier(selected):
            flags.add(SampleFlag.CROSSES_CRACK)

        out = np.where(valid, vals, np.nan)
        return SampleSet(out, valid, frozenset(flags))

    def _region_touches_barrier(self, selected: NDArray[np.bool_]) -> bool:
        """True when any triangle among the selected nodes crosses a barrier."""
        keep = selected[self._finite]
        if not keep.any():
            return False
        member = keep[self._tri.simplices].all(axis=1)
        return bool((self._bad_simplex & member).any())


def _points_in_polygon(
    x: NDArray[np.float64],
    y: NDArray[np.float64],
    vertices: Sequence[tuple[float, float]],
) -> NDArray[np.bool_]:
    """Even-odd ray casting. Vectorised over the query points."""
    verts = np.asarray(vertices, dtype=np.float64)
    inside = np.zeros(x.shape, dtype=bool)
    n = len(verts)
    j = n - 1
    for i in range(n):
        xi, yi = verts[i]
        xj, yj = verts[j]
        straddles = (yi > y) != (yj > y)
        # Guard the horizontal-edge division; straddles is already False there.
        denom = np.where(yj != yi, yj - yi, 1.0)
        crossing_x = (xj - xi) * (y - yi) / denom + xi
        inside ^= straddles & (x < crossing_x)
        j = i
    return inside


__all__ = ["ProbeSampler", "SampleFlag", "SampleSet"]
