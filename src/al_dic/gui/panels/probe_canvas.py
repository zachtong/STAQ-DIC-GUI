"""The analysis tab's canvas: place probes on the reference image.

A ``StrainCanvas`` subclass, so tab 1 is untouched: zoom, pan and the image
layer are inherited and only a placement tool and an overlay are added.

The background is always the **reference** frame. Probe coordinates are frame-0
image pixels, so a marker drawn over a deformed image would sit beside the
material it measures rather than on it. The reference implementation reaches the
same conclusion the hard way -- it force-switches its background to the
reference while placing and switches back afterwards.

Placement mirrors what people expect from drawing tools: one click for a point,
two for a line, rectangle or circle, N clicks and a double-click for a polygon,
Escape to cancel. A rubber band follows the cursor until the shape closes.
"""

from __future__ import annotations

from typing import Literal

from PySide6.QtCore import QPointF, Qt, Signal
from PySide6.QtGui import (
    QBrush,
    QColor,
    QKeyEvent,
    QMouseEvent,
    QPainterPath,
    QPen,
)
from PySide6.QtWidgets import QGraphicsPathItem, QWidget

from al_dic.analysis.probes import AreaGeom, LineGeom, PointGeom, Probe, ProbeSet
from al_dic.gui.panels.strain_canvas import StrainCanvas

Tool = Literal[
    "none", "point", "line", "area_rect", "area_circle", "area_polygon"
]

_MARKER_Z = 20
_PREVIEW_Z = 21
_POINT_RADIUS = 5.0
_SELECTED_WIDTH = 3.0
_NORMAL_WIDTH = 1.6


class ProbeCanvas(StrainCanvas):
    """Reference-frame canvas with probe overlay and placement."""

    probe_requested = Signal(str, object)     # (kind, geometry)
    probe_clicked = Signal(int)               # id of the probe under the cursor
    placement_cancelled = Signal()

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._tool: Tool = "none"
        self._pending: list[QPointF] = []
        self._probes: ProbeSet | None = None
        self._selected_id: int | None = None

        self._overlay_items: list[QGraphicsPathItem] = []
        self._preview = QGraphicsPathItem()
        self._preview.setZValue(_PREVIEW_Z)
        self._preview.setPen(
            QPen(QColor("#e2e8f0"), 1.2, Qt.PenStyle.DashLine)
        )
        self._preview.setBrush(QBrush(Qt.BrushStyle.NoBrush))
        self._scene.addItem(self._preview)

        self.setMouseTracking(True)
        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)

    # -- tool state -------------------------------------------------------

    @property
    def tool(self) -> Tool:
        return self._tool

    def set_tool(self, tool: Tool) -> None:
        self._tool = tool
        self._pending.clear()
        self._preview.setPath(QPainterPath())
        self.setCursor(
            Qt.CursorShape.ArrowCursor if tool == "none"
            else Qt.CursorShape.CrossCursor
        )

    def cancel_placement(self) -> None:
        if self._tool != "none":
            self.set_tool("none")
            self.placement_cancelled.emit()

    # -- overlay ----------------------------------------------------------

    def set_probes(self, probes: ProbeSet, selected_id: int | None) -> None:
        self._probes = probes
        self._selected_id = selected_id
        self._redraw_overlay()

    def _clear_overlay_items(self) -> None:
        for item in self._overlay_items:
            self._scene.removeItem(item)
        self._overlay_items.clear()

    def _redraw_overlay(self) -> None:
        self._clear_overlay_items()
        if self._probes is None:
            return
        for probe in self._probes:
            if not probe.visible:
                continue
            path = _probe_path(probe)
            if path is None:
                continue
            item = QGraphicsPathItem(path)
            colour = QColor(probe.color)
            width = (
                _SELECTED_WIDTH if probe.id == self._selected_id
                else _NORMAL_WIDTH
            )
            item.setPen(QPen(colour, width))
            if probe.kind == "area":
                fill = QColor(colour)
                fill.setAlphaF(0.15)
                item.setBrush(QBrush(fill))
            item.setZValue(_MARKER_Z)
            self._scene.addItem(item)
            self._overlay_items.append(item)

    # -- interaction ------------------------------------------------------

    def mousePressEvent(self, event: QMouseEvent) -> None:  # noqa: N802
        if (
            self._tool == "none"
            or event.button() != Qt.MouseButton.LeftButton
        ):
            super().mousePressEvent(event)
            return

        pos = self.mapToScene(event.position().toPoint())
        self._pending.append(pos)
        self._commit_if_complete()
        event.accept()

    def mouseMoveEvent(self, event: QMouseEvent) -> None:  # noqa: N802
        if self._tool != "none" and self._pending:
            self._update_preview(self.mapToScene(event.position().toPoint()))
        super().mouseMoveEvent(event)

    def mouseDoubleClickEvent(self, event: QMouseEvent) -> None:  # noqa: N802
        if self._tool == "area_polygon" and len(self._pending) >= 3:
            self._emit_polygon()
            event.accept()
            return
        super().mouseDoubleClickEvent(event)

    def keyPressEvent(self, event: QKeyEvent) -> None:  # noqa: N802
        if event.key() == Qt.Key.Key_Escape:
            self.cancel_placement()
            event.accept()
            return
        super().keyPressEvent(event)

    # -- shape assembly ---------------------------------------------------

    def _commit_if_complete(self) -> None:
        tool, pts = self._tool, self._pending
        if tool == "point":
            self._emit("point", PointGeom(pts[0].x(), pts[0].y()))
        elif tool == "line" and len(pts) == 2:
            self._emit_guarded(
                "line",
                lambda: LineGeom(pts[0].x(), pts[0].y(), pts[1].x(), pts[1].y()),
            )
        elif tool == "area_rect" and len(pts) == 2:
            self._emit_guarded(
                "area",
                lambda: AreaGeom.rect(
                    pts[0].x(), pts[0].y(), pts[1].x(), pts[1].y()
                ),
            )
        elif tool == "area_circle" and len(pts) == 2:
            radius = (pts[1] - pts[0])
            self._emit_guarded(
                "area",
                lambda: AreaGeom.circle(
                    pts[0].x(), pts[0].y(),
                    (radius.x() ** 2 + radius.y() ** 2) ** 0.5,
                ),
            )

    def _emit_polygon(self) -> None:
        pts = [(p.x(), p.y()) for p in self._pending]
        self._emit_guarded("area", lambda: AreaGeom.polygon(pts))

    def _emit_guarded(self, kind: str, build) -> None:
        """Build the geometry, discarding a degenerate one silently.

        A zero-length line or zero-radius circle is a double-click, not an
        instruction; refusing it beats storing a probe that can never measure.
        """
        try:
            geometry = build()
        except ValueError:
            self._pending.clear()
            self._preview.setPath(QPainterPath())
            return
        self._emit(kind, geometry)

    def _emit(self, kind: str, geometry) -> None:
        self._pending.clear()
        self._preview.setPath(QPainterPath())
        self.set_tool("none")
        self.probe_requested.emit(kind, geometry)

    def _update_preview(self, cursor: QPointF) -> None:
        path = QPainterPath()
        first = self._pending[0]
        if self._tool == "line":
            path.moveTo(first)
            path.lineTo(cursor)
        elif self._tool == "area_rect":
            path.addRect(
                min(first.x(), cursor.x()), min(first.y(), cursor.y()),
                abs(cursor.x() - first.x()), abs(cursor.y() - first.y()),
            )
        elif self._tool == "area_circle":
            r = ((cursor.x() - first.x()) ** 2
                 + (cursor.y() - first.y()) ** 2) ** 0.5
            path.addEllipse(first, r, r)
        elif self._tool == "area_polygon":
            path.moveTo(first)
            for p in self._pending[1:]:
                path.lineTo(p)
            path.lineTo(cursor)
        self._preview.setPath(path)


def _probe_path(probe: Probe) -> QPainterPath | None:
    """Outline for *probe* in scene (image pixel) coordinates."""
    path = QPainterPath()
    g = probe.geometry
    if isinstance(g, PointGeom):
        path.addEllipse(QPointF(g.x, g.y), _POINT_RADIUS, _POINT_RADIUS)
        path.moveTo(g.x - _POINT_RADIUS * 1.8, g.y)
        path.lineTo(g.x + _POINT_RADIUS * 1.8, g.y)
        path.moveTo(g.x, g.y - _POINT_RADIUS * 1.8)
        path.lineTo(g.x, g.y + _POINT_RADIUS * 1.8)
        return path
    if isinstance(g, LineGeom):
        path.moveTo(g.x0, g.y0)
        path.lineTo(g.x1, g.y1)
        for x, y in ((g.x0, g.y0), (g.x1, g.y1)):
            path.addEllipse(QPointF(x, y), 3.0, 3.0)
        return path
    if isinstance(g, AreaGeom):
        if g.shape == "rect":
            x0, y0, x1, y1 = g.data  # type: ignore[misc]
            path.addRect(x0, y0, x1 - x0, y1 - y0)
        elif g.shape == "circle":
            cx, cy, r = g.data  # type: ignore[misc]
            path.addEllipse(QPointF(cx, cy), r, r)
        else:
            verts = list(g.data)  # type: ignore[arg-type]
            path.moveTo(*verts[0])
            for x, y in verts[1:]:
                path.lineTo(x, y)
            path.closeSubpath()
        return path
    return None


__all__ = ["ProbeCanvas", "Tool"]
