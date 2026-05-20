<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="de" sourcelanguage="en_US">
<context>
    <name>AdvancedTuningWidget</name>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="44"/>
        <source>AL-DIC Iterations</source>
        <translation>AL-DIC-Iterationen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="55"/>
        <source>Number of global refinement cycles for the AL-DIC solver.
1 = single global pass (fastest), 3 = default,
5+ = diminishing returns for most cases.</source>
        <translation>Anzahl globaler Verfeinerungszyklen für den AL-DIC-Solver.
1 = einmaliger Durchlauf (schnellste), 3 = Standard,
5+ = abnehmender Ertrag in den meisten Fällen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="61"/>
        <source>Only affects AL-DIC solver. Ignored by Local DIC.</source>
        <translation>Betrifft nur den AL-DIC-Löser. Wird von Local DIC ignoriert.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="74"/>
        <source>Auto-expand FFT search on clipped peaks</source>
        <translation>FFT-Suche bei abgeschnittenen Peaks automatisch erweitern</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="80"/>
        <source>When the NCC peak reaches the edge of the search region, automatically retry with a larger region (up to image half-size, 6 retries with 2x growth).

Only relevant for the FFT init-guess mode.</source>
        <translation>Wenn der NCC-Peak den Rand des Suchbereichs erreicht, wird automatisch mit einem größeren Bereich wiederholt (bis zur halben Bildgröße, 6 Versuche mit 2-facher Vergrößerung).

Nur relevant für den FFT-Startschätzungsmodus.</translation>
    </message>
</context>
<context>
    <name>App</name>
    <message>
        <location filename="../../gui/app.py" line="797"/>
        <source>Imported Region of Interest for %n frame(s)</source>
        <translation>Region of Interest für %n Bilder importiert</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="809"/>
        <source>Run DIC first -- no displacement results to post-process.</source>
        <translation>DIC zuerst ausführen — keine Verschiebungs-Ergebnisse zur Nachbearbeitung.</translation>
    </message>
</context>
<context>
    <name>BatchImportDialog</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="365"/>
        <source>Batch Import Region of Interest Masks</source>
        <translation>Masken des Interessenbereichs stapelweise importieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="405"/>
        <source>Mask Folder:</source>
        <translation>Maskenordner:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="406"/>
        <source>(none)</source>
        <translation>(keine)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="411"/>
        <source>Browse...</source>
        <translation>Durchsuchen…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="430"/>
        <source>Available Masks</source>
        <translation>Verfügbare Masken</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="441"/>
        <source>Auto-Match by Name</source>
        <translation>Automatisch nach Name zuordnen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="443"/>
        <source>Match mask files to frames by number in filename</source>
        <translation>Maskendateien anhand der Zahl im Dateinamen Frames zuordnen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="447"/>
        <source>Assign Sequential</source>
        <translation>Sequentiell zuweisen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="449"/>
        <source>Assign masks to frames in order starting from frame 0</source>
        <translation>Masken den Frames der Reihe nach ab Frame 0 zuweisen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="457"/>
        <source>Frame Assignments</source>
        <translation>Frame-Zuweisungen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Frame</source>
        <translation>Frame</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Image</source>
        <translation>Bild</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Mask</source>
        <translation>Maske</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="471"/>
        <source>Assign Selected -&gt;</source>
        <translation>Auswahl zuweisen -&gt;</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Pair selected mask(s) with selected frame(s)</source>
        <translation>Ausgewählte Maske(n) mit ausgewähltem/ausgewählten Frame(s) koppeln</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="477"/>
        <source>Clear All</source>
        <translation>Alle leeren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="523"/>
        <source>Select Mask Folder</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="576"/>
        <source>Failed to read mask file.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="581"/>
        <source>Mismatched shape: %1×%2 (expected %3×%4)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="659"/>
        <source>%n mask(s) have mismatched sizes and are disabled.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="712"/>
        <source>Invalid assignment</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="717"/>
        <source>A frame can only have one mask. Select exactly one mask, or select multiple frames to assign one mask to many.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>CanvasArea</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1107"/>
        <source>Fit</source>
        <translation>Anpassen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1108"/>
        <source>Fit image to viewport</source>
        <translation>Bild an den Ansichtsbereich anpassen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1113"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1114"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>Auf 100% (1:1) zoomen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1118"/>
        <source>Zoom in</source>
        <translation>Vergrößern</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1124"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1125"/>
        <source>Zoom out</source>
        <translation>Verkleinern</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1138"/>
        <source>Show Grid</source>
        <translation>Gitter anzeigen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1139"/>
        <source>Show/hide computational mesh grid</source>
        <translation>Berechnungsnetz ein-/ausblenden</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1142"/>
        <source>Show Subset</source>
        <translation>Subset anzeigen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1143"/>
        <source>Show subset window on hover (requires Grid)</source>
        <translation>Subset-Fenster beim Überfahren anzeigen (erfordert Gitter)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1397"/>
        <source>Placing Starting Points</source>
        <translation>Startpunkte werden platziert</translation>
    </message>
</context>
<context>
    <name>CanvasConfigOverlay</name>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="41"/>
        <source>Mode</source>
        <translation>Modus</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="42"/>
        <source>Solver</source>
        <translation>Löser</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="43"/>
        <source>Init</source>
        <translation>Start</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="93"/>
        <source>Accumulative</source>
        <translation>Akkumulativ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="94"/>
        <source>Incremental</source>
        <translation>Inkrementell</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="102"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="103"/>
        <source>ADMM (%1 iter)</source>
        <translation>ADMM (%1 Iter.)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="111"/>
        <source>Starting Points</source>
        <translation>Startpunkte</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="113"/>
        <source>Previous frame</source>
        <translation>Vorheriger Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="115"/>
        <source>FFT every frame</source>
        <translation>FFT jeder Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="116"/>
        <source>FFT every %1 fr</source>
        <translation>FFT alle %1 Frames</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="123"/>
        <source>FFT</source>
        <translation>FFT</translation>
    </message>
</context>
<context>
    <name>ColorRange</name>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="29"/>
        <source>Range</source>
        <translation>Bereich</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="30"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="41"/>
        <source>Min</source>
        <translation>Min</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="51"/>
        <source>Max</source>
        <translation>Max</translation>
    </message>
</context>
<context>
    <name>ExportDialog</name>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="380"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="721"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="836"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="404"/>
        <source>Opacity</source>
        <translation>Deckkraft</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="408"/>
        <source>Field opacity (0 = transparent, 1 = fully opaque)</source>
        <translation>Feld-Deckkraft (0 = transparent, 1 = vollständig deckend)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="476"/>
        <source>All</source>
        <translation>Alle</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="478"/>
        <source>None</source>
        <translation>Keine</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="507"/>
        <source>Export Results</source>
        <translation>Ergebnisse exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="527"/>
        <source>OUTPUT FOLDER</source>
        <translation>AUSGABEORDNER</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="535"/>
        <source>Select output folder…</source>
        <translation>Ausgabeordner wählen…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="539"/>
        <source>Browse…</source>
        <translation>Durchsuchen…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="544"/>
        <source>Open Folder</source>
        <translation>Ordner öffnen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="552"/>
        <source>PHYSICAL UNITS</source>
        <translation>PHYSIKALISCHE EINHEITEN</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="556"/>
        <source>Enable physical units</source>
        <translation>Physikalische Einheiten aktivieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="561"/>
        <source>Scale displacement values by pixel size and show physical units on colorbar labels. Strain is dimensionless and unaffected.</source>
        <translation>Verschiebungswerte mit der Pixelgröße skalieren und physikalische Einheiten auf den Farbleistenbeschriftungen anzeigen. Dehnung ist dimensionslos und wird nicht beeinflusst.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="576"/>
        <source>/ pixel</source>
        <translation>/ Pixel</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="578"/>
        <source>Pixel size</source>
        <translation>Pixelgröße</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="587"/>
        <source>fps</source>
        <translation>fps</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="589"/>
        <source>Frame rate</source>
        <translation>Framerate</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="597"/>
        <source>Data</source>
        <translation>Daten</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="598"/>
        <source>Images</source>
        <translation>Bilder</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="599"/>
        <source>Animation</source>
        <translation>Animation</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="600"/>
        <source>Report</source>
        <translation>Bericht</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="620"/>
        <source>FORMAT</source>
        <translation>FORMAT</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="622"/>
        <source>NumPy Archive (.npz)</source>
        <translation>NumPy-Archiv (.npz)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="624"/>
        <source>MATLAB (.mat)</source>
        <translation>MATLAB (.mat)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="626"/>
        <source>CSV (per frame)</source>
        <translation>CSV (pro Frame)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="629"/>
        <source>NPZ: one file per frame (default: single merged file)</source>
        <translation>NPZ: eine Datei pro Frame (Standard: eine zusammengeführte Datei)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="637"/>
        <source>DISPLACEMENT</source>
        <translation>VERSCHIEBUNG</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="646"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="673"/>
        <source>Select:</source>
        <translation>Auswählen:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="661"/>
        <source>STRAIN</source>
        <translation>DEHNUNG</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="664"/>
        <source>Run Compute Strain first.</source>
        <translation>Zuerst „Dehnung berechnen“ ausführen.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="691"/>
        <source>✓ Parameters file (JSON) always exported</source>
        <translation>✓ Parameterdatei (JSON) wird immer exportiert</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="697"/>
        <source>Export Data</source>
        <translation>Daten exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="718"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="833"/>
        <source>Export</source>
        <translation>Exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="719"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="834"/>
        <source>Field</source>
        <translation>Feld</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="720"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="835"/>
        <source>Colormap</source>
        <translation>Farbskala</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="722"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="837"/>
        <source>Min</source>
        <translation>Min</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="723"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="838"/>
        <source>Max</source>
        <translation>Max</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="742"/>
        <source>IMAGE SETTINGS</source>
        <translation>BILDEINSTELLUNGEN</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="752"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="867"/>
        <source>Format</source>
        <translation>Format</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="761"/>
        <source>DPI</source>
        <translation>DPI</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="763"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="878"/>
        <source>Include colorbar</source>
        <translation>Farbleiste einfügen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="768"/>
        <source>Append a vertical colorbar strip to the right of each image.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>Fügt rechts neben jedem Bild eine vertikale Farbleiste hinzu.
Die Beschriftungen aktualisieren sich pro Bild, wenn Auto aktiv ist.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="773"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="888"/>
        <source>Original (frame 1 background)</source>
        <translation>Original (Bild 1 als Hintergrund)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="778"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="893"/>
        <source>Field is drawn at the original (undeformed) node positions.
Background image is always the first frame.</source>
        <translation>Feld wird an den ursprünglichen (unverformten) Knotenpositionen gezeichnet.
Das Hintergrundbild ist immer das erste Bild.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="781"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="896"/>
        <source>Deformed (current frame background)</source>
        <translation>Verformt (aktuelles Bild als Hintergrund)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="787"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="902"/>
        <source>Field is drawn at the displaced node positions (reference + displacement).
Background image follows each frame&apos;s own photo.</source>
        <translation>Feld wird an den verschobenen Knotenpositionen (Referenz + Verschiebung) gezeichnet.
Das Hintergrundbild folgt dem Foto jedes Bildes.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="791"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="906"/>
        <source>Render as</source>
        <translation>Darstellen als</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="809"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="922"/>
        <source>Cancel Export</source>
        <translation>Export abbrechen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="814"/>
        <source>Export Images</source>
        <translation>Bilder exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="857"/>
        <source>ANIMATION SETTINGS</source>
        <translation>ANIMATIONSEINSTELLUNGEN</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="876"/>
        <source>FPS</source>
        <translation>FPS</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="883"/>
        <source>Append a vertical colorbar strip to the right of each frame.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>Fügt rechts neben jedem Bild eine vertikale Farbleiste hinzu.
Die Beschriftungen aktualisieren sich pro Bild, wenn Auto aktiv ist.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="927"/>
        <source>Export Animation</source>
        <translation>Animation exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="944"/>
        <source>CONTENT</source>
        <translation>INHALT</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="946"/>
        <source>Parameter summary table</source>
        <translation>Parameter-Übersichtstabelle</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="950"/>
        <source>Field statistics (min/max/mean/std per frame)</source>
        <translation>Feldstatistik (min/max/Mittelwert/Stdabw. pro Bild)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="952"/>
        <source>Sample field images</source>
        <translation>Beispiel-Feldbilder</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="959"/>
        <source>Sample every</source>
        <translation>Alle</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="965"/>
        <source>frames</source>
        <comment>Report: sample every N frames</comment>
        <translation>Bilder</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="971"/>
        <source>FIELDS</source>
        <translation>FELDER</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="974"/>
        <source>Displacement:</source>
        <translation>Verschiebung:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="989"/>
        <source>Strain:</source>
        <translation>Dehnung:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1012"/>
        <source>Format: HTML (self-contained, view in any browser)</source>
        <translation>Format: HTML (eigenständig, in jedem Browser anzeigbar)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1018"/>
        <source>Generate Report</source>
        <translation>Bericht erstellen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1032"/>
        <source>FRAME RANGE</source>
        <translation>BILDBEREICH</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1035"/>
        <source>All frames</source>
        <translation>Alle Bilder</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1041"/>
        <source>From</source>
        <comment>Frame range: starting frame</comment>
        <translation>Von</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1049"/>
        <source>to</source>
        <comment>Frame range: ending frame</comment>
        <translation>bis</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1080"/>
        <source>Select Output Folder</source>
        <translation>Ausgabeordner wählen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1139"/>
        <source>Exported %1 files → %2</source>
        <translation>%1 Dateien exportiert → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1148"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1223"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1302"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1344"/>
        <source>Error: %1</source>
        <translation>Fehler: %1</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1173"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1251"/>
        <source>Starting…</source>
        <translation>Wird gestartet…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1196"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1274"/>
        <source>Rendering %1 (%2/%3)</source>
        <translation>Rendere %1 (%2/%3)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1202"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1280"/>
        <source>Frame %1/%2</source>
        <translation>Bild %1/%2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1212"/>
        <source>Exported %1 images → %2</source>
        <translation>%1 Bilder exportiert → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1337"/>
        <source>Report saved → %1</source>
        <translation>Bericht gespeichert → %1</translation>
    </message>
</context>
<context>
    <name>FieldSelector</name>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="18"/>
        <source>Disp U</source>
        <translation>Versch. U</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="19"/>
        <source>Disp V</source>
        <translation>Versch. V</translation>
    </message>
</context>
<context>
    <name>FrameNavigator</name>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="59"/>
        <source>Previous frame</source>
        <translation>Vorheriger Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="69"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="170"/>
        <source>Play animation</source>
        <translation>Animation abspielen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="73"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="169"/>
        <source>▶</source>
        <translation>▶</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="80"/>
        <source>Next frame</source>
        <translation>Nächster Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="93"/>
        <source>Playback speed</source>
        <translation>Wiedergabegeschwindigkeit</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="98"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="194"/>
        <source>FRAME 0/0</source>
        <translation>FRAME 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="159"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="160"/>
        <source>Pause animation</source>
        <translation>Animation pausieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="191"/>
        <source>FRAME %1/%2</source>
        <translation>BILD %1/%2</translation>
    </message>
</context>
<context>
    <name>ImageList</name>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="95"/>
        <source>#</source>
        <comment>Image list column: frame index</comment>
        <translation>#</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="96"/>
        <source>Filename</source>
        <translation>Dateiname</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="97"/>
        <source>Region</source>
        <comment>Image list column: ROI status</comment>
        <translation>Bereich</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="190"/>
        <location filename="../../gui/widgets/image_list.py" line="248"/>
        <source>Add</source>
        <translation>Hinzu.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="242"/>
        <source>Edit</source>
        <translation>Bearb.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="245"/>
        <source>Need</source>
        <translation>Offen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="368"/>
        <source>Import Region of Interest for %n frame(s)</source>
        <translation>Region of Interest für %n Bilder importieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="378"/>
        <source>Clear Region of Interest (%1 with region)</source>
        <translation>Region of Interest löschen (%1 mit Region)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="383"/>
        <source>Clear Region of Interest</source>
        <translation>Region of Interest löschen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="396"/>
        <source>Delete %n image(s)</source>
        <translation>%n Bilder löschen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="496"/>
        <source>Images</source>
        <translation>Bilder</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="497"/>
        <source>All Files</source>
        <translation>Alle Dateien</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="508"/>
        <source>Selected %1 files for %2 frames — count must match</source>
        <translation>%1 Dateien für %2 Bilder ausgewählt — Anzahl muss übereinstimmen</translation>
    </message>
</context>
<context>
    <name>InitGuessWidget</name>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="80"/>
        <source>Starting Points</source>
        <translation>Startpunkte</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="91"/>
        <source>Place a few points; pyALDIC bootstraps each with a single-point NCC and propagates the field along mesh neighbours.

Best for:
• Large inter-frame displacement (&gt; 50 px)
• Discontinuous fields (cracks, shear bands)
• Scenarios where FFT picks wrong peaks

Auto-placed per region when you draw or edit an ROI.</source>
        <translation>Platzieren Sie einige Punkte; pyALDIC initialisiert jeden mit einer Einpunkt-NCC und propagiert das Feld entlang der Netz-Nachbarn.

Optimal für:
• Große Verschiebungen zwischen Frames (&gt; 50 px)
• Diskontinuierliche Felder (Risse, Scherbänder)
• Szenarien, in denen FFT falsche Peaks wählt

Beim Zeichnen oder Bearbeiten eines ROI automatisch pro Region platziert.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="100"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="282"/>
        <source>Place Starting Points</source>
        <translation>Startpunkte platzieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="105"/>
        <source>Enter placement mode on the canvas. Left-click to add, right-click to remove, Esc or click again to exit.</source>
        <translation>Platzierungsmodus auf der Zeichenfläche aktivieren. Linksklick zum Hinzufügen, Rechtsklick zum Entfernen, Esc oder erneuter Klick zum Beenden.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="107"/>
        <source>Auto-place</source>
        <translation>Auto-Platzieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="111"/>
        <source>Fill empty regions with the highest-NCC node in each. Existing Starting Points are preserved.</source>
        <translation>Leere Regionen mit dem Knoten mit höchstem NCC-Wert füllen. Vorhandene Startpunkte bleiben erhalten.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="113"/>
        <source>Clear</source>
        <translation>Leeren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="117"/>
        <source>Remove every Starting Point. Faster than right-clicking each one individually.</source>
        <translation>Alle Startpunkte entfernen. Schneller als jeden einzeln per Rechtsklick zu löschen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="122"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="292"/>
        <source>%1 / %2 regions ready</source>
        <translation>%1 / %2 Regionen bereit</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="141"/>
        <source>FFT (cross-correlation)</source>
        <translation>FFT (Kreuzkorrelation)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="152"/>
        <source>Full-grid normalized cross-correlation. Robust within the search radius; the search auto-expands when peaks clip.

Best for:
• Small-to-moderate smooth motion
• Well-textured speckle
• No special user setup needed

Cost grows with the search radius, so very large displacements become slow.</source>
        <translation>Normalisierte Kreuzkorrelation auf dem gesamten Gitter. Robust innerhalb des Suchradius; die Suche erweitert sich automatisch bei abgeschnittenen Peaks.

Optimal für:
• Kleine bis mittlere gleichmäßige Bewegungen
• Gut texturierte Speckles
• Keine spezielle Nutzerkonfiguration erforderlich

Aufwand wächst mit dem Suchradius, sehr große Verschiebungen werden langsam.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="163"/>
        <source>Every</source>
        <translation>Alle</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="168"/>
        <source>Run FFT every N frames. N = 1 means FFT every frame (safest, slowest). N &gt; 1 uses warm-start between resets to limit error propagation to N frames.</source>
        <translation>FFT alle N Frames ausführen. N = 1 bedeutet FFT in jedem Frame (sicherste, langsamste Option). N &gt; 1 verwendet Warmstart zwischen Resets, um die Fehlerausbreitung auf N Frames zu begrenzen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="175"/>
        <source>(N=1 = every frame)</source>
        <translation>(N=1 = jeder Frame)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="185"/>
        <source>Only when reference frame updates (incremental only)</source>
        <translation>Nur bei Referenzframe-Aktualisierung (nur inkrementell)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="189"/>
        <source>Run FFT whenever the reference frame changes; warm-start within each segment. Typical default for incremental mode.</source>
        <translation>FFT bei jedem Wechsel des Referenzframes ausführen; Warmstart innerhalb jedes Segments. Typischer Standard für den inkrementellen Modus.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="198"/>
        <source>Previous frame</source>
        <translation>Vorheriger Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="208"/>
        <source>Use the previous frame&apos;s converged displacement as the initial guess. No cross-correlation runs.

Best for:
• Very small inter-frame motion (a few pixels)
• Fastest option when motion is smooth

Errors can accumulate over long sequences. Prefer FFT or Starting Points on noisy data or when motion is larger.</source>
        <translation>Die konvergierte Verschiebung des vorherigen Frames als Startschätzung verwenden. Keine Kreuzkorrelation wird ausgeführt.

Optimal für:
• Sehr kleine Bewegungen zwischen Frames (wenige Pixel)
• Schnellste Option bei gleichmäßiger Bewegung

Fehler können sich über lange Sequenzen akkumulieren. Bei verrauschten Daten oder größerer Bewegung FFT oder Startpunkte bevorzugen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="280"/>
        <source>Placing... (click to exit)</source>
        <translation>Platzieren… (zum Beenden klicken)</translation>
    </message>
</context>
<context>
    <name>LeftSidebar</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="178"/>
        <source>IMAGES</source>
        <translation>BILDER</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="185"/>
        <source>Natural Sort (1, 2, …, 10)</source>
        <translation>Natürliche Sortierung (1, 2, …, 10)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="190"/>
        <source>Sort by embedded numbers: image1, image2, …, image10
Default (unchecked): lexicographic — best for zero-padded names</source>
        <translation>Nach eingebetteten Zahlen sortieren: image1, image2, …, image10
Standard (nicht aktiviert): lexikographisch — ideal für nullgefüllte Namen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="261"/>
        <source>WORKFLOW TYPE</source>
        <translation>WORKFLOW-TYP</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="274"/>
        <source>INITIAL GUESS</source>
        <translation>STARTSCHÄTZUNG</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="281"/>
        <source>REGION OF INTEREST</source>
        <translation>INTERESSENBEREICH</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="291"/>
        <source>PARAMETERS</source>
        <translation>PARAMETER</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="297"/>
        <source>ADVANCED</source>
        <translation>ERWEITERT</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../../gui/app.py" line="195"/>
        <source>&amp;File</source>
        <translation>Datei</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="197"/>
        <source>Open Session…</source>
        <translation>Sitzung öffnen…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="202"/>
        <source>Save Session…</source>
        <translation>Sitzung speichern…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="208"/>
        <source>Quit</source>
        <translation>Beenden</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="216"/>
        <source>&amp;Settings</source>
        <translation>Einstellungen</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="217"/>
        <source>Language</source>
        <translation>Sprache</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="246"/>
        <source>Language changed</source>
        <translation>Sprache geändert</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="250"/>
        <source>Language set to %1. Please restart pyALDIC for all widgets to pick up the new language.</source>
        <translation>Sprache auf %1 eingestellt. Bitte starten Sie pyALDIC neu, damit alle Elemente die neue Sprache übernehmen.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="261"/>
        <source>Save Session</source>
        <translation>Sitzung speichern</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="263"/>
        <location filename="../../gui/app.py" line="290"/>
        <source>pyALDIC Session</source>
        <translation>pyALDIC-Sitzung</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="264"/>
        <location filename="../../gui/app.py" line="292"/>
        <source>All Files</source>
        <translation>Alle Dateien</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="274"/>
        <source>Save Session Failed</source>
        <translation>Speichern der Sitzung fehlgeschlagen</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="288"/>
        <source>Open Session</source>
        <translation>Sitzung öffnen</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="291"/>
        <source>JSON</source>
        <translation>JSON</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="300"/>
        <source>Open Session Failed</source>
        <translation>Öffnen der Sitzung fehlgeschlagen</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="652"/>
        <location filename="../../gui/app.py" line="705"/>
        <source>Load images first.</source>
        <translation>Bitte zuerst Bilder laden.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="754"/>
        <source>  Imported mask for frame %1</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="765"/>
        <source>Batch import: %n mask(s) loaded</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>MeshAppearanceWidget</name>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="38"/>
        <source>Mesh color</source>
        <translation>Netzfarbe</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="41"/>
        <source>Click to choose mesh line color</source>
        <translation>Klicken, um die Netzlinienfarbe zu wählen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="50"/>
        <source>Line width</source>
        <translation>Linienbreite</translation>
    </message>
</context>
<context>
    <name>ParamPanel</name>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="37"/>
        <source>Subset Size</source>
        <translation>Subset-Größe</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="43"/>
        <source>IC-GN subset window size in pixels (odd number)</source>
        <translation>IC-GN-Subset-Fenstergröße in Pixeln (ungerade Zahl)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="50"/>
        <source>Subset Step</source>
        <translation>Subset-Schrittweite</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="53"/>
        <source>Node spacing in pixels (must be power of 2)</source>
        <translation>Knotenabstand in Pixeln (muss eine Zweierpotenz sein)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="61"/>
        <location filename="../../gui/widgets/param_panel.py" line="186"/>
        <source>Search Range</source>
        <translation>Suchbereich</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="76"/>
        <source>Refine Inner Boundary</source>
        <translation>Innere Grenze verfeinern</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="82"/>
        <source>Locally refine the mesh along internal mask boundaries
(holes inside the Region of Interest). Useful for bubble / void edges.</source>
        <translation>Netz entlang innerer Maskenränder lokal verfeinern
(Löcher im Interessenbereich). Nützlich für Blasen- oder Porenränder.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="83"/>
        <source>Refine Outer Boundary</source>
        <translation>Äußere Grenze verfeinern</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="88"/>
        <source>Locally refine the mesh along the outer Region of Interest
boundary.</source>
        <translation>Netz entlang des äußeren Rands des Interessenbereichs lokal verfeinern.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="106"/>
        <source>Refinement aggressiveness. min element size = max(2, subset_step / 2^level). Applies uniformly to inner-, outer-boundary AND brush-painted refinement zones. Available levels depend on subset size and subset step.</source>
        <translation>Verfeinerungsstärke. Minimale Elementgröße = max(2, subset_step / 2^Stufe). Wird gleichmäßig auf innere, äußere Grenzen UND mit dem Pinsel gemalte Verfeinerungszonen angewendet. Verfügbare Stufen hängen von Subset-Größe und Subset-Schrittweite ab.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="108"/>
        <source>Refinement Level</source>
        <translation>Verfeinerungsstufe</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="173"/>
        <source>Maximum per-frame displacement the FFT search can detect (pixels).
Set comfortably larger than the expected inter-frame motion.
For large rotations in incremental mode, this must cover
  radius × sin(per-step angle).</source>
        <translation>Maximale Verschiebung pro Frame, die die FFT-Suche erkennen kann (Pixel).
Deutlich größer als die erwartete Bewegung zwischen Frames einstellen.
Für große Rotationen im inkrementellen Modus muss dies abdecken:
  Radius × sin(Winkel pro Schritt).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="181"/>
        <source>Initial half-width (pixels) of the single-point NCC search at each Starting Point.
Auto-expands 2x per retry if the peak is clipped, up to image half-size.
Only affects Starting Point bootstrap; other nodes use F-aware propagation (no per-node search).</source>
        <translation>Anfängliche Halbbreite (Pixel) der Einpunkt-NCC-Suche an jedem Startpunkt.
Erweitert sich bei abgeschnittenem Peak automatisch um den Faktor 2 pro Wiederholung bis zur halben Bildgröße.
Betrifft nur die Initialisierung der Startpunkte; andere Knoten verwenden F-aware-Propagation (keine knotenweise Suche).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="182"/>
        <source>Initial Seed Search</source>
        <translation>Anfängliche Seed-Suche</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="218"/>
        <source>Light</source>
        <comment>Mesh refinement severity</comment>
        <translation>Leicht</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="219"/>
        <source>Medium</source>
        <comment>Mesh refinement severity</comment>
        <translation>Mittel</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="220"/>
        <source>Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>Stark</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="221"/>
        <source>Extra Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>Sehr stark</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="222"/>
        <source>Ultra</source>
        <comment>Mesh refinement severity</comment>
        <translation>Ultra</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="228"/>
        <source>%1 (L%2)</source>
        <translation>%1 (L%2)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="252"/>
        <source>min element size = %1 px  (subset_step=%2, level=%3)</source>
        <translation>min. Elementgröße = %1 px  (subset_step=%2, Stufe=%3)</translation>
    </message>
</context>
<context>
    <name>PhysicalUnitsWidget</name>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="54"/>
        <source>Use physical units</source>
        <translation>Physikalische Einheiten verwenden</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="65"/>
        <source>Physical size of one image pixel</source>
        <translation>Physikalische Größe eines Bildpixels</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="80"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="83"/>
        <source>Pixel size</source>
        <translation>Pixelgröße</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="93"/>
        <source>Acquisition frame rate (used for velocity field)</source>
        <translation>Aufnahme-Framerate (für das Geschwindigkeitsfeld verwendet)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="94"/>
        <source>Frame rate</source>
        <translation>Bildrate</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="162"/>
        <source>Disp: %1  Velocity: %2/s</source>
        <translation>Verschiebung: %1  Geschwindigkeit: %2/s</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="167"/>
        <source>Disp: px  Velocity: px/fr</source>
        <translation>Versch.: px  Geschw.: px/fr</translation>
    </message>
</context>
<context>
    <name>PipelineController</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="359"/>
        <source>Building pipeline configuration...</source>
        <translation>Pipeline-Konfiguration wird erstellt…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="516"/>
        <source>Loading images...</source>
        <translation>Bilder werden geladen…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="526"/>
        <source>  Loaded %1 images, shape=%2</source>
        <translation>  %1 Bilder geladen, Form=%2</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="539"/>
        <source>  ROI mask: %1, %2 pixels (%3%)</source>
        <translation>  ROI-Maske: %1, %2 Pixel (%3%)</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="567"/>
        <source>Run cancelled: define per-frame Regions of Interest for the missing reference frames or accept the inherited frame-1 mask in the next run.</source>
        <translation>Lauf abgebrochen: Definieren Sie pro Bild Regions of Interest für die fehlenden Referenzbilder, oder akzeptieren Sie beim nächsten Lauf die vom 1. Bild geerbte Maske.</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="588"/>
        <source>  %n frame(s) with custom ROI masks</source>
        <translation>  %n Bilder mit benutzerdefinierten ROI-Masken</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="719"/>
        <source>Results received: %n frame(s)</source>
        <translation>Ergebnisse empfangen: %n Bilder</translation>
    </message>
</context>
<context>
    <name>PipelineWorker</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="189"/>
        <source>Starting DIC analysis...</source>
        <translation>DIC-Analyse wird gestartet…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="222"/>
        <source>Analysis complete in %1s</source>
        <translation>Analyse in %1 s abgeschlossen</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="230"/>
        <source>Analysis stopped by user.</source>
        <translation>Analyse wurde vom Benutzer gestoppt.</translation>
    </message>
</context>
<context>
    <name>ROIHint</name>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="64"/>
        <source>Load images first, then draw a Region of Interest on frame 1.</source>
        <translation>Laden Sie zuerst Bilder und zeichnen Sie dann einen Interessenbereich auf Frame 1.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="72"/>
        <source>&lt;b&gt;Accumulative mode&lt;/b&gt; — only frame 1 needs a Region of Interest. All later frames are compared against it directly.</source>
        <translation>&lt;b&gt;Akkumulativer Modus&lt;/b&gt; — nur Frame 1 benötigt einen Interessenbereich. Alle späteren Frames werden direkt damit verglichen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="82"/>
        <source>&lt;b&gt;Incremental, every frame&lt;/b&gt; — frame 1 needs a Region of Interest. It is automatically warped forward to each later frame (no per-frame drawing required).</source>
        <translation>&lt;b&gt;Inkrementell, jeder Frame&lt;/b&gt; — Frame 1 benötigt einen Interessenbereich. Er wird automatisch auf jeden späteren Frame vorwärts übertragen (kein frameweises Zeichnen erforderlich).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="99"/>
        <source>&lt;b&gt;Incremental, every %1 frames&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%2&lt;/b&gt; (%3 reference frames total).</source>
        <translation>&lt;b&gt;Inkrementell, alle %1 Frames&lt;/b&gt; — Interessenbereich auf folgenden Frames zeichnen: &lt;b&gt;%2&lt;/b&gt; (insgesamt %3 Referenzframes).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="113"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — no custom reference frames set. Frame 1 will be the only reference; add more indices in the Reference Frames field.</source>
        <translation>&lt;b&gt;Inkrementell, benutzerdefiniert&lt;/b&gt; — keine benutzerdefinierten Referenzframes festgelegt. Frame 1 wird die einzige Referenz sein; fügen Sie weitere Indizes im Feld „Referenzframes“ hinzu.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="123"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%1&lt;/b&gt; (%2 reference frames total).</source>
        <translation>&lt;b&gt;Inkrementell, benutzerdefiniert&lt;/b&gt; — Interessenbereich auf folgenden Frames zeichnen: &lt;b&gt;%1&lt;/b&gt; (insgesamt %2 Referenzframes).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="129"/>
        <source>Draw a Region of Interest on frame 1.</source>
        <translation>Zeichnen Sie einen Interessenbereich auf Frame 1.</translation>
    </message>
</context>
<context>
    <name>ROIToolbar</name>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="72"/>
        <source>+ Add</source>
        <translation>+ Hinzufügen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="76"/>
        <source>Add region to the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>Region zum Interessenbereich hinzufügen (Polygon / Rechteck / Kreis)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="79"/>
        <source>Cut</source>
        <translation>Ausschneiden</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="83"/>
        <source>Cut region from the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>Region aus dem Interessenbereich ausschneiden (Polygon / Rechteck / Kreis)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="86"/>
        <source>+ Refine</source>
        <translation>+ Verfeinern</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="93"/>
        <source>Paint extra mesh-refinement zones with a brush
(only on frame 1 — material points auto-warped to later frames)</source>
        <translation>Zusätzliche Netzverfeinerungszonen mit einem Pinsel malen
(nur auf Frame 1 — Materialpunkte werden automatisch auf spätere Frames übertragen)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="98"/>
        <source>Refine brush is only available on frame 1. Switch to frame 1 to paint refinement zones; they are automatically warped to later frames.</source>
        <translation>Der Verfeinerungspinsel ist nur auf Frame 1 verfügbar. Wechseln Sie zu Frame 1, um Verfeinerungszonen zu malen; sie werden automatisch auf spätere Frames übertragen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="118"/>
        <source>Import</source>
        <translation>Importieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="119"/>
        <source>Import mask from image file</source>
        <translation>Maske aus Bilddatei importieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="124"/>
        <source>Batch Import</source>
        <translation>Stapelimport</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="126"/>
        <source>Batch import mask files for multiple frames</source>
        <translation>Maskendateien für mehrere Frames stapelweise importieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="139"/>
        <source>Save</source>
        <translation>Speichern</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="140"/>
        <source>Save current mask to PNG file</source>
        <translation>Aktuelle Maske als PNG-Datei speichern</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="145"/>
        <source>Invert</source>
        <translation>Invertieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="147"/>
        <source>Invert the Region of Interest mask</source>
        <translation>Maske des Interessenbereichs invertieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="152"/>
        <source>Clear</source>
        <translation>Leeren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="154"/>
        <source>Clear all Region of Interest masks</source>
        <translation>Alle Masken des Interessenbereichs leeren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="186"/>
        <source>Radius</source>
        <translation>Radius</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="204"/>
        <source>Paint</source>
        <translation>Malen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="209"/>
        <source>Erase</source>
        <translation>Radieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="219"/>
        <source>Clear Brush</source>
        <translation>Pinsel leeren</translation>
    </message>
</context>
<context>
    <name>RightSidebar</name>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="58"/>
        <source>Run DIC Analysis</source>
        <translation>DIC-Analyse ausführen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="71"/>
        <source>Cancel</source>
        <translation>Abbrechen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="78"/>
        <source>Cancel the current analysis. Already-computed frames are kept; the run is marked as IDLE (not DONE).</source>
        <translation>Laufende Analyse abbrechen. Bereits berechnete Frames bleiben erhalten; der Lauf wird als IDLE (nicht DONE) markiert.</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="84"/>
        <source>Export Results</source>
        <translation>Ergebnisse exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="92"/>
        <source>Open Strain Window</source>
        <translation>Dehnungsfenster öffnen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="97"/>
        <source>Compute and visualize strain in a separate post-processing window. Requires displacement results from a completed Run.</source>
        <translation>Dehnung in einem separaten Nachbearbeitungsfenster berechnen und visualisieren. Benötigt Verschiebungsergebnisse eines abgeschlossenen Laufs.</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="104"/>
        <source>PROGRESS</source>
        <translation>FORTSCHRITT</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="113"/>
        <location filename="../../gui/panels/right_sidebar.py" line="350"/>
        <source>Ready</source>
        <translation>Bereit</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="121"/>
        <location filename="../../gui/panels/right_sidebar.py" line="352"/>
        <location filename="../../gui/panels/right_sidebar.py" line="406"/>
        <source>ELAPSED  %1</source>
        <translation>VERSTRICHEN  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="126"/>
        <location filename="../../gui/panels/right_sidebar.py" line="354"/>
        <location filename="../../gui/panels/right_sidebar.py" line="414"/>
        <location filename="../../gui/panels/right_sidebar.py" line="418"/>
        <source>REMAINING  %1</source>
        <translation>VERBLEIBEND  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="134"/>
        <source>FIELD</source>
        <translation>FELD</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="141"/>
        <source>Show on deformed frame</source>
        <translation>Auf deformiertem Frame anzeigen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="146"/>
        <source>When checked, overlay results on the deformed (current) frame instead of the reference frame</source>
        <translation>Wenn aktiviert, werden die Ergebnisse auf dem deformierten (aktuellen) Frame statt auf dem Referenzframe überlagert</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="151"/>
        <source>VISUALIZATION</source>
        <translation>VISUALISIERUNG</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="156"/>
        <source>Colormap</source>
        <translation>Farbkarte</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="177"/>
        <source>Opacity</source>
        <translation>Deckkraft</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="184"/>
        <source>Overlay opacity (0 = transparent, 100 = opaque)</source>
        <translation>Deckkraft der Überlagerung (0 = transparent, 100 = deckend)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="190"/>
        <source>PHYSICAL UNITS</source>
        <translation>PHYSIKALISCHE EINHEITEN</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="196"/>
        <source>LOG</source>
        <translation>PROTOKOLL</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="202"/>
        <source>Clear</source>
        <translation>Leeren</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="321"/>
        <source>Place at least one Starting Point in each red region before running (red = needs a Starting Point).</source>
        <translation>Platzieren Sie vor dem Ausführen mindestens einen Startpunkt in jeder roten Region (rot = Startpunkt benötigt).</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="389"/>
        <source>%1  —  Frame %2</source>
        <translation>%1  —  Frame %2</translation>
    </message>
</context>
<context>
    <name>StrainFieldSelector</name>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="150"/>
        <source>DISPLACEMENT</source>
        <translation>VERSCHIEBUNG</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="161"/>
        <source>STRAIN</source>
        <translation>DEHNUNG</translation>
    </message>
</context>
<context>
    <name>StrainNavigator</name>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="73"/>
        <source>Previous frame</source>
        <translation>Vorheriger Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="84"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="216"/>
        <source>Play animation</source>
        <translation>Animation abspielen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="88"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="215"/>
        <source>▶</source>
        <translation>▶</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="95"/>
        <source>Next frame</source>
        <translation>Nächster Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="109"/>
        <source>Playback speed</source>
        <translation>Wiedergabegeschwindigkeit</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="114"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="228"/>
        <source>FRAME 0/0</source>
        <translation>FRAME 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="205"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="206"/>
        <source>Pause animation</source>
        <translation>Animation pausieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="223"/>
        <source>FRAME %1/%2</source>
        <translation>BILD %1/%2</translation>
    </message>
</context>
<context>
    <name>StrainParamPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="79"/>
        <source>Plane fitting</source>
        <translation>Ebenenanpassung</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="80"/>
        <source>FEM nodal</source>
        <translation>FEM-Knoten</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="82"/>
        <source>Method</source>
        <translation>Methode</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="106"/>
        <source>VSG (Virtual Strain Gauge) size is the diameter, in pixels, of the circular region around each mesh node used to fit a local displacement plane. Strain is then taken as the plane&apos;s slope.

• Larger VSG → smoother strain, lower spatial resolution.
• Smaller VSG → sharper strain, more noise.
• Rule of thumb: VSG ≥ 2 × subset step + 1 (default: 41 px).

Not used when Method = FEM nodal (there, mesh spacing itself sets the gauge size).</source>
        <translation>VSG (Virtual Strain Gauge) ist der Durchmesser in Pixel des kreisförmigen Bereichs um jeden Netzknoten, der zum Anpassen einer lokalen Verschiebungs-ebene verwendet wird. Die Dehnung ergibt sich aus der Steigung dieser Ebene.

• Größeres VSG → glattere Dehnung, geringere räumliche Auflösung.
• Kleineres VSG → schärfere Dehnung, mehr Rauschen.
• Faustregel: VSG ≥ 2 × Subset-Schritt + 1 (Standard: 41 px).

Nicht verwendet bei Methode = FEM nodal (dort bestimmt der Netzabstand die Größe).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="109"/>
        <source>VSG size</source>
        <translation>VSG-Größe</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="139"/>
        <source>Off</source>
        <comment>Strain smoothing preset</comment>
        <translation>Aus</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="140"/>
        <source>Light (σ = 0.5 × step)</source>
        <translation>Leicht (σ = 0,5 × step)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="141"/>
        <source>Medium (σ = 1 × step)</source>
        <translation>Mittel (σ = 1 × step)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="142"/>
        <source>Strong (σ = 2 × step) ⚠</source>
        <translation>Stark (σ = 2 × step) ⚠</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="153"/>
        <source>Gaussian smoothing of the strain field after computation.
σ is the Gaussian kernel width; &apos;step&apos; = DIC node spacing.
  Light  (0.5 × step):  subtle, preserves fine features.
  Medium (1 × step):    balanced, recommended for noisy data.
  Strong (2 × step) ⚠:  aggressive, may blur real gradients.</source>
        <translation>Gauß-Glättung des Dehnungsfelds nach der Berechnung.
σ ist die Breite des Gauß-Kerns; „step“ = DIC-Knotenabstand.
  Leicht   (0,5 × step): dezent, feine Merkmale bleiben erhalten.
  Mittel   (1 × step):   ausgewogen, empfohlen für verrauschte Daten.
  Stark    (2 × step) ⚠: aggressiv, kann echte Gradienten verwischen.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="154"/>
        <source>Strain field smoothing</source>
        <translation>Dehnungsfeldglättung</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="159"/>
        <source>Infinitesimal</source>
        <translation>Infinitesimal</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="160"/>
        <source>Eulerian</source>
        <translation>Euler</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="161"/>
        <source>Green-Lagrangian</source>
        <translation>Green-Lagrange</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="163"/>
        <source>Strain type</source>
        <translation>Dehnungstyp</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="256"/>
        <source>⚠ VSG radius (%1 px) &lt; DIC node spacing (%2 px); plane fit will fail. Use VSG ≥ %3 px or switch Method to FEM nodal.</source>
        <translation>⚠ VSG-Radius (%1 px) &lt; DIC-Knotenabstand (%2 px); Ebenenanpassung wird fehlschlagen. VSG ≥ %3 px verwenden oder Methode auf FEM nodal wechseln.</translation>
    </message>
</context>
<context>
    <name>StrainVizPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="62"/>
        <source>Show on deformed frame</source>
        <translation>Auf deformiertem Frame anzeigen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="64"/>
        <source>Deformed</source>
        <translation>Verformt</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="71"/>
        <source>Colormap</source>
        <translation>Farbskala</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="74"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="76"/>
        <source>Range</source>
        <translation>Bereich</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="96"/>
        <source>Min</source>
        <translation>Min</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="98"/>
        <source>Max</source>
        <translation>Max</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="108"/>
        <source>Opacity</source>
        <translation>Deckkraft</translation>
    </message>
</context>
<context>
    <name>StrainWindow</name>
    <message>
        <location filename="../../gui/strain_window.py" line="119"/>
        <source>Strain Post-Processing</source>
        <translation>Dehnungs-Nachbearbeitung</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="165"/>
        <source>Fit</source>
        <translation>Anpassen</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="166"/>
        <source>Fit image to viewport</source>
        <translation>Bild an den Ansichtsbereich anpassen</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="172"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="173"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>Auf 100% (1:1) zoomen</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="176"/>
        <source>Zoom in</source>
        <translation>Vergrößern</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="181"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="223"/>
        <source>STRAIN PARAMETERS</source>
        <translation>DEHNUNGSPARAMETER</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="239"/>
        <source>Export displacement and strain results to NPZ / MAT / CSV / PNG</source>
        <translation>Verschiebungs- und Dehnungsergebnisse als NPZ / MAT / CSV / PNG exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="270"/>
        <source>FIELD</source>
        <translation>FELD</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="276"/>
        <source>VISUALIZATION</source>
        <translation>VISUALISIERUNG</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="283"/>
        <source>PHYSICAL UNITS</source>
        <translation>PHYSIKALISCHE EINHEITEN</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="288"/>
        <source>LOG</source>
        <translation>PROTOKOLL</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="354"/>
        <source>Strain compute failed: %1: %2</source>
        <translation>Dehnungsberechnung fehlgeschlagen: %1: %2</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="362"/>
        <location filename="../../gui/strain_window.py" line="410"/>
        <source>Strain computation complete.</source>
        <translation>Dehnungsberechnung abgeschlossen.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="374"/>
        <source>Strain window: no displacement results to post-process.</source>
        <translation>Dehnungsfenster: Keine Verschiebungs-Ergebnisse zur Nachbearbeitung.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="426"/>
        <source>Strain compute failed: %1</source>
        <translation>Dehnungsberechnung fehlgeschlagen: %1</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="463"/>
        <source>⚠ Params changed -- click Compute Strain</source>
        <translation>⚠ Parameter geändert — „Dehnung berechnen“ klicken</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="182"/>
        <source>Zoom out</source>
        <translation>Verkleinern</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="229"/>
        <source>Compute Strain</source>
        <translation>Dehnung berechnen</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="235"/>
        <source>Export Results</source>
        <translation>Ergebnisse exportieren</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="384"/>
        <source>Starting…</source>
        <translation>Wird gestartet…</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="406"/>
        <source>Complete</source>
        <translation>Abgeschlossen</translation>
    </message>
</context>
<context>
    <name>VelocitySettingsWidget</name>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="46"/>
        <source>Use physical units</source>
        <translation>Physikalische Einheiten verwenden</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="68"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="83"/>
        <source>Unit: px/frame</source>
        <translation>Einheit: px/Frame</translation>
    </message>
</context>
<context>
    <name>WorkflowTypePanel</name>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="51"/>
        <source>Incremental</source>
        <translation>Inkrementell</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="52"/>
        <source>Accumulative</source>
        <translation>Akkumulativ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="62"/>
        <source>Incremental: each frame is compared to the previous reference frame.
Suitable for large accumulated deformation, required for large rotations.

Accumulative: every frame is compared to frame 1.
Accurate for small, monotonic deformation only.</source>
        <translation>Inkrementell: Jeder Frame wird mit dem vorherigen Referenzframe verglichen.
Geeignet für große kumulierte Verformungen, erforderlich bei großen Rotationen.

Akkumulativ: Jeder Frame wird mit Frame 1 verglichen.
Nur für kleine, monotone Verformungen genau.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="64"/>
        <source>Tracking Mode</source>
        <translation>Tracking-Modus</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="75"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="85"/>
        <source>Local DIC: Independent subset matching (IC-GN). Fast,
preserves sharp local features. Best for small
deformations or high-quality images.

AL-DIC: Augmented Lagrangian with global FEM
regularization. Enforces displacement compatibility
between subsets. Best for large deformations, noisy
images, or when strain accuracy matters.</source>
        <translation>Local DIC: Unabhängiges Subset-Matching (IC-GN). Schnell,
erhält scharfe lokale Merkmale. Optimal für kleine
Verformungen oder hochwertige Bilder.

AL-DIC: Augmented Lagrangian mit globaler FEM-
Regularisierung. Erzwingt Verschiebungskompatibilität
zwischen Subsets. Optimal für große Verformungen,
verrauschte Bilder oder hohe Dehnungsgenauigkeit.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="87"/>
        <source>Solver</source>
        <translation>Löser</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="104"/>
        <source>Every Frame</source>
        <translation>Jeder Frame</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="105"/>
        <source>Every N Frames</source>
        <translation>Alle N Frames</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="106"/>
        <source>Custom Frames</source>
        <translation>Benutzerdefiniert</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="116"/>
        <source>When the reference frame refreshes during incremental tracking.
Every Frame: reset reference every frame (smallest per-step displacement,
most robust for large deformation).
Every N Frames: reset every N frames (balance speed vs robustness).
Custom Frames: user-defined list of reference frame indices.</source>
        <translation>Zeitpunkt der Referenzaktualisierung beim inkrementellen Tracking.
Jeder Frame: Referenz bei jedem Frame zurücksetzen (kleinste Schrittverschiebung,
am robustesten für große Verformungen).
Alle N Frames: alle N Frames zurücksetzen (Balance zwischen Geschwindigkeit und Robustheit).
Benutzerdefiniert: vom Benutzer festgelegte Liste der Referenz-Frame-Indizes.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="118"/>
        <source>Reference Update</source>
        <translation>Referenzaktualisierung</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="128"/>
        <source>Update reference every N frames</source>
        <translation>Referenz alle N Frames aktualisieren</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="130"/>
        <source>Interval</source>
        <translation>Intervall</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="141"/>
        <source>Comma-separated frame indices to use as reference frames (0-based)</source>
        <translation>Komma-getrennte Frame-Indizes als Referenzframes (0-basiert)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="143"/>
        <source>Reference Frames</source>
        <translation>Referenzframes</translation>
    </message>
</context>
<context>
    <name>_DropZone</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="120"/>
        <source>Drop image folder
or Browse</source>
        <translation>Bildordner hier ablegen
oder Durchsuchen</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="130"/>
        <source>Select Image Folder</source>
        <translation>Bildordner auswählen</translation>
    </message>
</context>
<context>
    <name>_MaskPreviewPanel</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="130"/>
        <source>Preview</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="134"/>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="260"/>
        <source>(no image)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="154"/>
        <source>Image only</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="155"/>
        <source>Image + Mask</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="156"/>
        <source>Mask only</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="159"/>
        <source>View:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="165"/>
        <source>Alpha:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="173"/>
        <source>Blue</source>
        <comment>Mask overlay color</comment>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="177"/>
        <source>Red</source>
        <comment>Mask overlay color</comment>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="181"/>
        <source>Green</source>
        <comment>Mask overlay color</comment>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="185"/>
        <source>Yellow</source>
        <comment>Mask overlay color</comment>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="189"/>
        <source>Mask color:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="267"/>
        <source>No mask assigned</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="272"/>
        <source>Frame %1 — %2</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="287"/>
        <source>Failed to load image</source>
        <translation type="unfinished"></translation>
    </message>
</context>
</TS>
