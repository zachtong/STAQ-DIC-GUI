"""Probe-based post-processing analysis.

Core layer: no Qt, no ``tr()``. The GUI in ``al_dic.gui.panels.analysis_tab``
is one consumer; a batch script using the ``run_aldic`` API is another.
"""

from al_dic.analysis.probes import (
    AreaGeom,
    LineGeom,
    PointGeom,
    Probe,
    ProbeSet,
    allowed_reductions,
)

__all__ = [
    "AreaGeom",
    "LineGeom",
    "PointGeom",
    "Probe",
    "ProbeSet",
    "allowed_reductions",
]
