"""Tests for al_dic.utils.geometry.circumcircle."""

import math

import pytest

from al_dic.utils.geometry import circumcircle


def test_unit_circle():
    """Three points on the unit circle -> center (0,0), radius 1."""
    res = circumcircle((1.0, 0.0), (0.0, 1.0), (-1.0, 0.0))
    assert res is not None
    cx, cy, r = res
    assert cx == pytest.approx(0.0, abs=1e-9)
    assert cy == pytest.approx(0.0, abs=1e-9)
    assert r == pytest.approx(1.0, abs=1e-9)


def test_offset_circle():
    """Circle of radius 5 centered at (10, -3)."""
    cx0, cy0, r0 = 10.0, -3.0, 5.0
    pts = [
        (cx0 + r0 * math.cos(t), cy0 + r0 * math.sin(t))
        for t in (0.3, 2.1, 4.4)
    ]
    res = circumcircle(*pts)
    assert res is not None
    cx, cy, r = res
    assert cx == pytest.approx(cx0, abs=1e-6)
    assert cy == pytest.approx(cy0, abs=1e-6)
    assert r == pytest.approx(r0, abs=1e-6)


def test_collinear_returns_none():
    """Three points on a line have no finite circumcircle."""
    assert circumcircle((0.0, 0.0), (1.0, 1.0), (2.0, 2.0)) is None
    assert circumcircle((0.0, 5.0), (3.0, 5.0), (9.0, 5.0)) is None  # horizontal
    assert circumcircle((4.0, 0.0), (4.0, 7.0), (4.0, 20.0)) is None  # vertical


def test_point_order_independent():
    """The circumcircle does not depend on point ordering."""
    a, b, c = (2.0, 0.0), (0.0, 2.0), (-2.0, 0.0)
    r1 = circumcircle(a, b, c)
    r2 = circumcircle(c, a, b)
    assert r1 is not None and r2 is not None
    for x, y in zip(r1, r2):
        assert x == pytest.approx(y, abs=1e-9)


def test_near_collinear_is_large_not_none():
    """Slightly off-collinear points form a valid but very large circle."""
    res = circumcircle((0.0, 0.0), (100.0, 0.1), (200.0, 0.0))
    assert res is not None
    _, _, r = res
    assert r > 1000.0  # huge -> callers must cap against canvas size
