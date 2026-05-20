"""Batch ROI mask import dialog.

Two-panel layout for assigning mask image files to frames:
  - Left panel: available mask images from a selected folder
  - Right panel: frame assignments (frame index, image filename, mask filename)

Supports auto-match by filename number, sequential assignment, and
manual selected-to-selected pairing.

When ``required_frames`` is supplied, only those frame indices appear
in the assignment tree; other frames are hidden because the pipeline
will never consume their masks (e.g. non-reference frames in every-N
incremental mode).

When ``img_shape`` is supplied, masks are pre-scanned and any whose
on-disk size does not match the image size are disabled and excluded
from auto-match / sequential / manual assignment.
"""

from __future__ import annotations

import re
from pathlib import Path

import numpy as np
from PySide6.QtCore import Qt
from PySide6.QtGui import QColor
from PySide6.QtWidgets import (
    QDialog,
    QDialogButtonBox,
    QFileDialog,
    QHBoxLayout,
    QHeaderView,
    QLabel,
    QListWidget,
    QListWidgetItem,
    QMessageBox,
    QPushButton,
    QTreeWidget,
    QTreeWidgetItem,
    QVBoxLayout,
)

from al_dic.gui.theme import COLORS
from al_dic.i18n import tr_args

# Image file extensions accepted as mask files
_MASK_EXTENSIONS = {".png", ".bmp", ".tif", ".tiff", ".jpg", ".jpeg", ".jp2", ".webp"}


class BatchImportDialog(QDialog):
    """Dialog for batch-importing mask files and assigning them to frames."""

    def __init__(
        self,
        image_files: list[str],
        parent=None,
        required_frames: set[int] | None = None,
        img_shape: tuple[int, int] | None = None,
    ) -> None:
        super().__init__(parent)
        self.setWindowTitle(self.tr("Batch Import Region of Interest Masks"))
        self.setMinimumSize(700, 500)

        self._image_files = list(image_files)
        # Frames the pipeline will actually consume masks for.  None
        # means "no filter — list every frame" (backward-compatible
        # default for callers that don't yet pass this argument).
        if required_frames is None:
            self._required_frames: set[int] = set(range(len(self._image_files)))
        else:
            self._required_frames = set(required_frames)
        # Expected mask shape (H, W) used by the pre-scan size check.
        # None disables the check entirely.
        self._img_shape = img_shape

        self._mask_folder = ""
        self._mask_files: list[str] = []
        # Per-mask actual shape; populated by _load_mask_files.  Files
        # that fail to decode get shape == None and are treated as
        # mismatched.
        self._mask_shapes: dict[str, tuple[int, int] | None] = {}
        # Set of mask paths whose shape != img_shape (or that failed
        # to decode).  Members are excluded from every assignment path.
        self._mismatched: set[str] = set()
        self._assignments: dict[int, str] = {}

        self._build_ui()

    # ------------------------------------------------------------------
    # UI construction
    # ------------------------------------------------------------------

    def _build_ui(self) -> None:
        layout = QVBoxLayout(self)

        # --- Folder browser row ---
        folder_row = QHBoxLayout()
        folder_row.addWidget(QLabel(self.tr("Mask Folder:")))
        self._folder_label = QLabel(self.tr("(none)"))
        self._folder_label.setStyleSheet(
            f"color: {COLORS.TEXT_SECONDARY}; font-style: italic;"
        )
        folder_row.addWidget(self._folder_label, stretch=1)
        browse_btn = QPushButton(self.tr("Browse..."))
        browse_btn.clicked.connect(self._on_browse)
        folder_row.addWidget(browse_btn)
        layout.addLayout(folder_row)

        # --- Size-mismatch warning (hidden until a mismatch is detected) ---
        self._size_warning = QLabel("")
        self._size_warning.setStyleSheet(
            f"color: {COLORS.WARNING}; font-weight: bold;"
        )
        self._size_warning.setWordWrap(True)
        self._size_warning.hide()
        layout.addWidget(self._size_warning)

        # --- Two-panel area ---
        panels = QHBoxLayout()

        # Left panel: available mask files
        left = QVBoxLayout()
        left.addWidget(QLabel(self.tr("Available Masks")))
        self._mask_list = QListWidget()
        self._mask_list.setSelectionMode(
            QListWidget.SelectionMode.ExtendedSelection
        )
        left.addWidget(self._mask_list)

        auto_btn = QPushButton(self.tr("Auto-Match by Name"))
        auto_btn.setToolTip(self.tr(
            "Match mask files to frames by number in filename"))
        auto_btn.clicked.connect(self._auto_match)
        left.addWidget(auto_btn)

        seq_btn = QPushButton(self.tr("Assign Sequential"))
        seq_btn.setToolTip(self.tr(
            "Assign masks to frames in order starting from frame 0"))
        seq_btn.clicked.connect(self._assign_sequential)
        left.addWidget(seq_btn)

        panels.addLayout(left)

        # Right panel: frame assignments
        right = QVBoxLayout()
        right.addWidget(QLabel(self.tr("Frame Assignments")))
        self._assign_tree = QTreeWidget()
        self._assign_tree.setHeaderLabels([
            self.tr("Frame"), self.tr("Image"), self.tr("Mask")])
        self._assign_tree.setColumnCount(3)
        self._assign_tree.setRootIsDecorated(False)
        header = self._assign_tree.header()
        header.setSectionResizeMode(0, QHeaderView.ResizeMode.Fixed)
        header.setSectionResizeMode(1, QHeaderView.ResizeMode.Stretch)
        header.setSectionResizeMode(2, QHeaderView.ResizeMode.Stretch)
        self._assign_tree.setColumnWidth(0, 50)
        right.addWidget(self._assign_tree)

        assign_btn = QPushButton(self.tr("Assign Selected ->"))
        assign_btn.setToolTip(self.tr(
            "Pair selected mask(s) with selected frame(s)"))
        assign_btn.clicked.connect(self._assign_selected)
        right.addWidget(assign_btn)

        clear_btn = QPushButton(self.tr("Clear All"))
        clear_btn.clicked.connect(self._clear_assignments)
        right.addWidget(clear_btn)

        panels.addLayout(right)
        layout.addLayout(panels)

        # --- OK / Cancel ---
        btn_box = QDialogButtonBox(
            QDialogButtonBox.StandardButton.Ok
            | QDialogButtonBox.StandardButton.Cancel
        )
        btn_box.accepted.connect(self.accept)
        btn_box.rejected.connect(self.reject)
        layout.addWidget(btn_box)

        self._populate_frames()

    def _populate_frames(self) -> None:
        """Fill the assignment tree with one row per *required* image frame.

        When ``required_frames`` filters out a frame (e.g. non-reference
        frame in every-N incremental mode), it does not appear in the
        tree — the pipeline would never consume its mask anyway.
        """
        self._assign_tree.clear()
        for i, fpath in enumerate(self._image_files):
            if i not in self._required_frames:
                continue
            fname = Path(fpath).name
            item = QTreeWidgetItem([f"{i:02d}", fname, ""])
            item.setData(0, Qt.ItemDataRole.UserRole, i)
            self._assign_tree.addTopLevelItem(item)

    # ------------------------------------------------------------------
    # Folder browsing and mask loading
    # ------------------------------------------------------------------

    def _on_browse(self) -> None:
        folder = QFileDialog.getExistingDirectory(
            self, self.tr("Select Mask Folder")
        )
        if not folder:
            return
        self._mask_folder = folder
        self._folder_label.setText(folder)
        self._load_mask_files(folder)

    def _load_mask_files(self, folder: str) -> None:
        """Scan *folder* for image files, pre-check sizes, populate list."""
        p = Path(folder)
        self._mask_files = sorted(
            str(f)
            for f in p.iterdir()
            if f.is_file() and f.suffix.lower() in _MASK_EXTENSIONS
        )

        # Pre-scan: read each mask's actual on-disk shape so we can
        # disable mismatched files before the user assigns them.
        self._mask_shapes = {}
        self._mismatched.clear()
        if self._img_shape is not None:
            from al_dic.io.io_utils import _read_unchanged, _to_grayscale
            for mf in self._mask_files:
                try:
                    raw = _read_unchanged(mf)
                    gray = _to_grayscale(raw)
                    shape = gray.shape[:2]
                except (FileNotFoundError, IOError):
                    shape = None
                self._mask_shapes[mf] = shape
                if shape != self._img_shape:
                    self._mismatched.add(mf)

        # Drop any prior assignments that referenced now-mismatched files.
        if self._mismatched:
            self._assignments = {
                fr: path
                for fr, path in self._assignments.items()
                if path not in self._mismatched
            }

        self._mask_list.clear()
        for mf in self._mask_files:
            item = QListWidgetItem(Path(mf).name)
            item.setData(Qt.ItemDataRole.UserRole, mf)
            if mf in self._mismatched:
                # Visually deemphasize and explain via tooltip.  Disabled
                # items are skipped by every assignment path.
                item.setFlags(item.flags() & ~Qt.ItemFlag.ItemIsSelectable
                              & ~Qt.ItemFlag.ItemIsEnabled)
                item.setForeground(QColor(COLORS.TEXT_MUTED))
                shape = self._mask_shapes.get(mf)
                if shape is None:
                    item.setToolTip(self.tr("Failed to read mask file."))
                else:
                    item.setToolTip(tr_args(
                        self.tr(
                            "Mismatched shape: %1×%2 (expected %3×%4)"
                        ),
                        shape[0], shape[1],
                        self._img_shape[0], self._img_shape[1],
                    ))
            self._mask_list.addItem(item)

        # Update the top-of-dialog warning summary.
        self._update_size_warning()
        self._refresh_display()

    def _update_size_warning(self) -> None:
        """Show or hide the size-mismatch warning above the panels."""
        n = len(self._mismatched)
        if n == 0:
            self._size_warning.hide()
            return
        from PySide6.QtCore import QCoreApplication
        self._size_warning.setText(
            QCoreApplication.translate(
                "BatchImportDialog",
                "%n mask(s) have mismatched sizes and are disabled.",
                "",
                n,
            )
        )
        self._size_warning.show()

    # ------------------------------------------------------------------
    # Assignment strategies
    # ------------------------------------------------------------------

    def _auto_match(self) -> None:
        """Match masks to frames by extracting the last number in filename."""
        self._assignments.clear()
        for mf in self._mask_files:
            if mf in self._mismatched:
                continue
            numbers = re.findall(r"\d+", Path(mf).stem)
            if not numbers:
                continue
            idx = int(numbers[-1])
            if idx in self._required_frames:
                self._assignments[idx] = mf
        self._refresh_display()

    def _assign_sequential(self) -> None:
        """Assign masks to required frames in sorted order, 1:1."""
        self._assignments.clear()
        usable = [mf for mf in self._mask_files if mf not in self._mismatched]
        required_sorted = sorted(self._required_frames)
        for frame_idx, mf in zip(required_sorted, usable):
            self._assignments[frame_idx] = mf
        self._refresh_display()

    def _assign_selected(self) -> None:
        """Pair the selected mask(s) with the selected frame row(s).

        Three cases:
          * 1 mask + 1 frame: assign that pair.
          * 1 mask + N frames: broadcast the mask to every selected frame.
          * N masks + N frames: pair them in selection order.
          * N masks + 1 frame: rejected — a frame can only have one mask.
        """
        mask_items = [
            mi for mi in self._mask_list.selectedItems()
            if mi.data(Qt.ItemDataRole.UserRole) not in self._mismatched
        ]
        frame_items = self._assign_tree.selectedItems()
        if not mask_items or not frame_items:
            return

        # N masks -> 1 frame is ambiguous (which mask wins?).  Refuse
        # rather than silently overwriting, so the user gets a clear
        # signal that the relationship is one-mask-per-frame only.
        if len(mask_items) > 1 and len(frame_items) == 1:
            QMessageBox.warning(
                self,
                self.tr("Invalid assignment"),
                self.tr(
                    "A frame can only have one mask. Select exactly one "
                    "mask, or select multiple frames to assign one mask "
                    "to many."
                ),
            )
            return

        # 1 mask -> N frames: broadcast.
        if len(mask_items) == 1 and len(frame_items) > 1:
            path = mask_items[0].data(Qt.ItemDataRole.UserRole)
            for fi in frame_items:
                idx = fi.data(0, Qt.ItemDataRole.UserRole)
                if idx is not None and path:
                    self._assignments[idx] = path
        else:
            # 1:1 or N:N — pair in selection order.
            for mi, fi in zip(mask_items, frame_items):
                idx = fi.data(0, Qt.ItemDataRole.UserRole)
                path = mi.data(Qt.ItemDataRole.UserRole)
                if idx is not None and path:
                    self._assignments[idx] = path
        self._refresh_display()

    def _clear_assignments(self) -> None:
        """Remove all mask-to-frame assignments."""
        self._assignments.clear()
        self._refresh_display()

    # ------------------------------------------------------------------
    # Display refresh
    # ------------------------------------------------------------------

    def _refresh_display(self) -> None:
        """Update the Mask column in the assignment tree."""
        for i in range(self._assign_tree.topLevelItemCount()):
            item = self._assign_tree.topLevelItem(i)
            idx = item.data(0, Qt.ItemDataRole.UserRole)
            mask_path = self._assignments.get(idx, "")
            name = Path(mask_path).name if mask_path else ""
            item.setText(2, name)
            color = QColor(COLORS.SUCCESS) if name else QColor(COLORS.TEXT_MUTED)
            item.setForeground(2, color)

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def get_assignments(self) -> dict[int, str]:
        """Return the current frame-index-to-mask-path mapping."""
        return dict(self._assignments)

    def load_masks(self, img_shape: tuple[int, int]) -> dict[int, np.ndarray]:
        """Read and threshold all assigned mask files.

        Supports all bit depths (uint8, uint16, float) and common
        formats (tif, png, bmp, jpg, jp2, webp).  When ``img_shape``
        was supplied at construction, mismatched masks have already
        been excluded from ``self._assignments`` by ``_load_mask_files``
        and the pre-scan UI.

        Args:
            img_shape: (height, width) used as the resize target by
                :func:`read_mask_as_bool`.  Pre-scanned masks already
                match this shape, so the resize is a no-op for them.

        Returns:
            Mapping of frame_index -> boolean mask array.
        """
        from al_dic.io.io_utils import read_mask_as_bool

        result: dict[int, np.ndarray] = {}
        for idx, path in self._assignments.items():
            try:
                result[idx] = read_mask_as_bool(path, target_shape=img_shape)
            except (FileNotFoundError, IOError):
                continue
        return result
