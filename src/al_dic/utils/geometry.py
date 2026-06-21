"""Small pure-geometry helpers (no Qt / no image deps, easy to unit-test)."""

from __future__ import annotations

import math


def circumcircle(
    p1: tuple[float, float],
    p2: tuple[float, float],
    p3: tuple[float, float],
) -> tuple[float, float, float] | None:
    """Circle passing through three points (the circumcircle).

    Args:
        p1, p2, p3: ``(x, y)`` points.

    Returns:
        ``(cx, cy, radius)`` of the unique circle through the three points,
        or ``None`` when the points are collinear (no finite circumcircle).

    Note:
        Near-collinear (but not exactly collinear) points yield a valid but
        very large circle; callers that rasterize the result should sanity-cap
        the radius against their canvas size.
    """
    (ax, ay), (bx, by), (cx, cy) = p1, p2, p3
    d = 2.0 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    if abs(d) < 1e-9:
        return None  # collinear -> circumcenter at infinity

    a2 = ax * ax + ay * ay
    b2 = bx * bx + by * by
    c2 = cx * cx + cy * cy
    ux = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d
    uy = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d
    radius = math.hypot(ax - ux, ay - uy)
    return (ux, uy, radius)
