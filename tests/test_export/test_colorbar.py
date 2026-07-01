"""Tests for the styled colorbar module (position/font/thickness/background)."""

import numpy as np
import pytest

from al_dic.export.colorbar import (
    ColorbarStyle, add_margin, attach_colorbar, render_colorbar_strip,
)


@pytest.fixture
def img():
    return np.full((240, 320, 3), 60, dtype=np.uint8)


def test_style_defaults():
    s = ColorbarStyle()
    assert s.position == "right"
    assert s.font_size == 9.0
    assert s.background == "black"
    assert 0 < s.width_ratio < 1
    assert "right" in ColorbarStyle.POSITIONS and "bottom" in ColorbarStyle.POSITIONS


def test_render_colorbar_strip_matches_height():
    strip = render_colorbar_strip(200, "jet", 0.0, 1.0, "U (px)", dpi=72)
    assert strip is not None
    assert strip.shape[0] == 200
    assert strip.ndim == 3 and strip.shape[2] == 3


@pytest.mark.parametrize("pos", ["right", "left"])
def test_attach_vertical_grows_width_keeps_height(img, pos):
    style = ColorbarStyle(position=pos)
    out = attach_colorbar(img, style, "jet", -1.0, 2.0, "eyy", dpi=72)
    assert out.shape[0] == img.shape[0]      # height unchanged
    assert out.shape[1] > img.shape[1]       # colorbar added on the side
    assert out.dtype == np.uint8


@pytest.mark.parametrize("pos", ["top", "bottom"])
def test_attach_horizontal_grows_height_keeps_width(img, pos):
    style = ColorbarStyle(position=pos)
    out = attach_colorbar(img, style, "viridis", 0.0, 1.0, "U", dpi=72)
    assert out.shape[1] == img.shape[1]      # width unchanged
    assert out.shape[0] > img.shape[0]       # colorbar added top/bottom


def test_attach_left_vs_right_place_bar_on_opposite_sides(img):
    right = attach_colorbar(img, ColorbarStyle(position="right"), "jet", 0, 1, "U", dpi=72)
    left = attach_colorbar(img, ColorbarStyle(position="left"), "jet", 0, 1, "U", dpi=72)
    # image body (grey 60) sits on the left for 'right' and on the right for 'left'
    assert np.all(right[:, 0] == 60)         # left column is the image
    assert np.all(left[:, -1] == 60)         # right column is the image


def test_width_ratio_controls_thickness(img):
    thin = attach_colorbar(img, ColorbarStyle(width_ratio=0.03), "jet", 0, 1, "U", dpi=72)
    thick = attach_colorbar(img, ColorbarStyle(width_ratio=0.15), "jet", 0, 1, "U", dpi=72)
    assert thick.shape[1] > thin.shape[1]    # thicker bar => wider output


def test_white_background_supported(img):
    out = attach_colorbar(img, ColorbarStyle(background="white"), "jet", 0, 1, "U", dpi=72)
    assert out.shape[0] == img.shape[0] and out.shape[1] > img.shape[1]


@pytest.mark.parametrize("fam", list(ColorbarStyle.FONT_FAMILIES))
def test_font_family_renders(img, fam):
    out = attach_colorbar(img, ColorbarStyle(font_family=fam), "jet", 0, 1, "U", dpi=72)
    assert out.shape[0] == img.shape[0] and out.shape[1] > img.shape[1]


def test_font_family_default_is_sans():
    assert ColorbarStyle().font_family == "sans-serif"


def test_add_margin_grows_all_sides(img):
    out = add_margin(img, 0.1, "white")
    assert out.shape[0] > img.shape[0]
    assert out.shape[1] > img.shape[1]
    assert tuple(int(x) for x in out[0, 0]) == (255, 255, 255)  # white border
    assert tuple(int(x) for x in out[-1, -1]) == (255, 255, 255)


def test_add_margin_black(img):
    out = add_margin(img, 0.05, "black")
    assert tuple(int(x) for x in out[0, 0]) == (0, 0, 0)


def test_add_margin_zero_is_noop(img):
    out = add_margin(img, 0.0)
    assert out.shape == img.shape
