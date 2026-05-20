<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="fr" sourcelanguage="en_US">
<context>
    <name>AdvancedTuningWidget</name>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="44"/>
        <source>AL-DIC Iterations</source>
        <translation>Itérations AL-DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="55"/>
        <source>Number of global refinement cycles for the AL-DIC solver.
1 = single global pass (fastest), 3 = default,
5+ = diminishing returns for most cases.</source>
        <translation>Nombre de cycles de raffinement global du solveur AL-DIC.
1 = passe unique (le plus rapide), 3 = par défaut,
5+ = rendement décroissant dans la plupart des cas.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="61"/>
        <source>Only affects AL-DIC solver. Ignored by Local DIC.</source>
        <translation>N&apos;affecte que le solveur AL-DIC. Ignoré par Local DIC.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="74"/>
        <source>Auto-expand FFT search on clipped peaks</source>
        <translation>Étendre automatiquement la recherche FFT lors de pics tronqués</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="80"/>
        <source>When the NCC peak reaches the edge of the search region, automatically retry with a larger region (up to image half-size, 6 retries with 2x growth).

Only relevant for the FFT init-guess mode.</source>
        <translation>Lorsque le pic NCC atteint le bord de la zone de recherche, réessaie automatiquement avec une zone plus large (jusqu&apos;à la moitié de l&apos;image, 6 tentatives avec une croissance de 2×).

Uniquement pertinent pour le mode d&apos;estimation initiale FFT.</translation>
    </message>
</context>
<context>
    <name>App</name>
    <message>
        <location filename="../../gui/app.py" line="797"/>
        <source>Imported Region of Interest for %n frame(s)</source>
        <translation>Région d&apos;intérêt importée pour %n images</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="809"/>
        <source>Run DIC first -- no displacement results to post-process.</source>
        <translation>Exécutez d&apos;abord le DIC — aucun résultat de déplacement à post-traiter.</translation>
    </message>
</context>
<context>
    <name>BatchImportDialog</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="365"/>
        <source>Batch Import Region of Interest Masks</source>
        <translation>Import par lot des masques de région d&apos;intérêt</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="405"/>
        <source>Mask Folder:</source>
        <translation>Dossier de masques :</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="406"/>
        <source>(none)</source>
        <translation>(aucun)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="411"/>
        <source>Browse...</source>
        <translation>Parcourir…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="430"/>
        <source>Available Masks</source>
        <translation>Masques disponibles</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="441"/>
        <source>Auto-Match by Name</source>
        <translation>Correspondance auto par nom</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="443"/>
        <source>Match mask files to frames by number in filename</source>
        <translation>Associer les fichiers de masque aux images d&apos;après le numéro du nom de fichier</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="447"/>
        <source>Assign Sequential</source>
        <translation>Attribuer séquentiellement</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="449"/>
        <source>Assign masks to frames in order starting from frame 0</source>
        <translation>Attribuer les masques aux images dans l&apos;ordre à partir de l&apos;image 0</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="457"/>
        <source>Frame Assignments</source>
        <translation>Attributions d&apos;images</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Frame</source>
        <translation>Image</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Image</source>
        <translation>Image</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Mask</source>
        <translation>Masque</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="471"/>
        <source>Assign Selected -&gt;</source>
        <translation>Attribuer la sélection -&gt;</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Pair selected mask(s) with selected frame(s)</source>
        <translation>Associer les masques sélectionnés aux images sélectionnées</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="477"/>
        <source>Clear All</source>
        <translation>Tout effacer</translation>
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
        <translation>Ajuster</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1108"/>
        <source>Fit image to viewport</source>
        <translation>Ajuster l&apos;image à la vue</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1113"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1114"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>Zoomer à 100% (1:1)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1118"/>
        <source>Zoom in</source>
        <translation>Zoom avant</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1124"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1125"/>
        <source>Zoom out</source>
        <translation>Zoom arrière</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1138"/>
        <source>Show Grid</source>
        <translation>Afficher la grille</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1139"/>
        <source>Show/hide computational mesh grid</source>
        <translation>Afficher/masquer la grille du maillage</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1142"/>
        <source>Show Subset</source>
        <translation>Afficher l&apos;imagette</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1143"/>
        <source>Show subset window on hover (requires Grid)</source>
        <translation>Afficher la fenêtre d&apos;imagette au survol (nécessite la grille)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1397"/>
        <source>Placing Starting Points</source>
        <translation>Placement des points de départ</translation>
    </message>
</context>
<context>
    <name>CanvasConfigOverlay</name>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="41"/>
        <source>Mode</source>
        <translation>Mode</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="42"/>
        <source>Solver</source>
        <translation>Solveur</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="43"/>
        <source>Init</source>
        <translation>Initial</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="93"/>
        <source>Accumulative</source>
        <translation>Cumulatif</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="94"/>
        <source>Incremental</source>
        <translation>Incrémental</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="102"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="103"/>
        <source>ADMM (%1 iter)</source>
        <translation>ADMM (%1 itér.)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="111"/>
        <source>Starting Points</source>
        <translation>Points de départ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="113"/>
        <source>Previous frame</source>
        <translation>Image précédente</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="115"/>
        <source>FFT every frame</source>
        <translation>FFT chaque image</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="116"/>
        <source>FFT every %1 fr</source>
        <translation>FFT toutes les %1 images</translation>
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
        <translation>Plage</translation>
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
        <translation>Opacité</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="408"/>
        <source>Field opacity (0 = transparent, 1 = fully opaque)</source>
        <translation>Opacité du champ (0 = transparent, 1 = opaque)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="476"/>
        <source>All</source>
        <translation>Tout</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="478"/>
        <source>None</source>
        <translation>Aucun</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="507"/>
        <source>Export Results</source>
        <translation>Exporter les résultats</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="527"/>
        <source>OUTPUT FOLDER</source>
        <translation>DOSSIER DE SORTIE</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="535"/>
        <source>Select output folder…</source>
        <translation>Sélectionner le dossier de sortie…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="539"/>
        <source>Browse…</source>
        <translation>Parcourir…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="544"/>
        <source>Open Folder</source>
        <translation>Ouvrir le dossier</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="552"/>
        <source>PHYSICAL UNITS</source>
        <translation>UNITÉS PHYSIQUES</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="556"/>
        <source>Enable physical units</source>
        <translation>Activer les unités physiques</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="561"/>
        <source>Scale displacement values by pixel size and show physical units on colorbar labels. Strain is dimensionless and unaffected.</source>
        <translation>Mettre à l&apos;échelle les valeurs de déplacement par la taille du pixel et afficher les unités physiques sur les étiquettes de la barre de couleurs. La déformation est sans dimension et n&apos;est pas affectée.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="576"/>
        <source>/ pixel</source>
        <translation>/ pixel</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="578"/>
        <source>Pixel size</source>
        <translation>Taille du pixel</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="587"/>
        <source>fps</source>
        <translation>fps</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="589"/>
        <source>Frame rate</source>
        <translation>Cadence</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="597"/>
        <source>Data</source>
        <translation>Données</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="598"/>
        <source>Images</source>
        <translation>Images</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="599"/>
        <source>Animation</source>
        <translation>Animation</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="600"/>
        <source>Report</source>
        <translation>Rapport</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="620"/>
        <source>FORMAT</source>
        <translation>FORMAT</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="622"/>
        <source>NumPy Archive (.npz)</source>
        <translation>Archive NumPy (.npz)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="624"/>
        <source>MATLAB (.mat)</source>
        <translation>MATLAB (.mat)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="626"/>
        <source>CSV (per frame)</source>
        <translation>CSV (par image)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="629"/>
        <source>NPZ: one file per frame (default: single merged file)</source>
        <translation>NPZ : un fichier par image (par défaut : un seul fichier fusionné)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="637"/>
        <source>DISPLACEMENT</source>
        <translation>DÉPLACEMENT</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="646"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="673"/>
        <source>Select:</source>
        <translation>Sélectionner :</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="661"/>
        <source>STRAIN</source>
        <translation>DÉFORMATION</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="664"/>
        <source>Run Compute Strain first.</source>
        <translation>Exécutez d&apos;abord « Calculer la déformation ».</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="691"/>
        <source>✓ Parameters file (JSON) always exported</source>
        <translation>✓ Le fichier de paramètres (JSON) est toujours exporté</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="697"/>
        <source>Export Data</source>
        <translation>Exporter les données</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="718"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="833"/>
        <source>Export</source>
        <translation>Exporter</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="719"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="834"/>
        <source>Field</source>
        <translation>Champ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="720"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="835"/>
        <source>Colormap</source>
        <translation>Palette</translation>
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
        <translation>PARAMÈTRES D&apos;IMAGE</translation>
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
        <translation>Inclure la barre de couleur</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="768"/>
        <source>Append a vertical colorbar strip to the right of each image.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>Ajoute une barre de couleur verticale à droite de chaque image.
Les étiquettes se mettent à jour par image quand la plage auto est activée.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="773"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="888"/>
        <source>Original (frame 1 background)</source>
        <translation>Original (image 1 en arrière-plan)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="778"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="893"/>
        <source>Field is drawn at the original (undeformed) node positions.
Background image is always the first frame.</source>
        <translation>Le champ est tracé aux positions de nœud originales (non déformées).
L&apos;image de fond est toujours la première image.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="781"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="896"/>
        <source>Deformed (current frame background)</source>
        <translation>Déformé (image actuelle en arrière-plan)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="787"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="902"/>
        <source>Field is drawn at the displaced node positions (reference + displacement).
Background image follows each frame&apos;s own photo.</source>
        <translation>Le champ est tracé aux positions de nœud déplacées (référence + déplacement).
L&apos;image de fond suit la photo de chaque image.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="791"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="906"/>
        <source>Render as</source>
        <translation>Rendu</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="809"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="922"/>
        <source>Cancel Export</source>
        <translation>Annuler l&apos;export</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="814"/>
        <source>Export Images</source>
        <translation>Exporter les images</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="857"/>
        <source>ANIMATION SETTINGS</source>
        <translation>PARAMÈTRES D&apos;ANIMATION</translation>
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
        <translation>Ajoute une barre de couleur verticale à droite de chaque image.
Les étiquettes se mettent à jour par image quand la plage auto est activée.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="927"/>
        <source>Export Animation</source>
        <translation>Exporter l&apos;animation</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="944"/>
        <source>CONTENT</source>
        <translation>CONTENU</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="946"/>
        <source>Parameter summary table</source>
        <translation>Tableau récapitulatif des paramètres</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="950"/>
        <source>Field statistics (min/max/mean/std per frame)</source>
        <translation>Statistiques de champ (min/max/moyenne/écart-type par image)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="952"/>
        <source>Sample field images</source>
        <translation>Exemples d&apos;images de champ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="959"/>
        <source>Sample every</source>
        <translation>Échantillonner toutes les</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="965"/>
        <source>frames</source>
        <comment>Report: sample every N frames</comment>
        <translation>images</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="971"/>
        <source>FIELDS</source>
        <translation>CHAMPS</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="974"/>
        <source>Displacement:</source>
        <translation>Déplacement :</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="989"/>
        <source>Strain:</source>
        <translation>Déformation :</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1012"/>
        <source>Format: HTML (self-contained, view in any browser)</source>
        <translation>Format : HTML (autonome, consultable dans n&apos;importe quel navigateur)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1018"/>
        <source>Generate Report</source>
        <translation>Générer le rapport</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1032"/>
        <source>FRAME RANGE</source>
        <translation>PLAGE D&apos;IMAGES</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1035"/>
        <source>All frames</source>
        <translation>Toutes les images</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1041"/>
        <source>From</source>
        <comment>Frame range: starting frame</comment>
        <translation>De</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1049"/>
        <source>to</source>
        <comment>Frame range: ending frame</comment>
        <translation>à</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1080"/>
        <source>Select Output Folder</source>
        <translation>Sélectionner le dossier de sortie</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1139"/>
        <source>Exported %1 files → %2</source>
        <translation>%1 fichiers exportés → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1148"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1223"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1302"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1344"/>
        <source>Error: %1</source>
        <translation>Erreur : %1</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1173"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1251"/>
        <source>Starting…</source>
        <translation>Démarrage…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1196"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1274"/>
        <source>Rendering %1 (%2/%3)</source>
        <translation>Rendu de %1 (%2/%3)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1202"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1280"/>
        <source>Frame %1/%2</source>
        <translation>Image %1/%2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1212"/>
        <source>Exported %1 images → %2</source>
        <translation>%1 images exportées → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1337"/>
        <source>Report saved → %1</source>
        <translation>Rapport enregistré → %1</translation>
    </message>
</context>
<context>
    <name>FieldSelector</name>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="18"/>
        <source>Disp U</source>
        <translation>Dépl. U</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="19"/>
        <source>Disp V</source>
        <translation>Dépl. V</translation>
    </message>
</context>
<context>
    <name>FrameNavigator</name>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="59"/>
        <source>Previous frame</source>
        <translation>Image précédente</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="69"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="170"/>
        <source>Play animation</source>
        <translation>Lire l&apos;animation</translation>
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
        <translation>Image suivante</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="93"/>
        <source>Playback speed</source>
        <translation>Vitesse de lecture</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="98"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="194"/>
        <source>FRAME 0/0</source>
        <translation>IMAGE 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="159"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="160"/>
        <source>Pause animation</source>
        <translation>Pause</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="191"/>
        <source>FRAME %1/%2</source>
        <translation>IMAGE %1/%2</translation>
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
        <translation>Nom de fichier</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="97"/>
        <source>Region</source>
        <comment>Image list column: ROI status</comment>
        <translation>Région</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="190"/>
        <location filename="../../gui/widgets/image_list.py" line="248"/>
        <source>Add</source>
        <translation>Ajouter</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="242"/>
        <source>Edit</source>
        <translation>Modifier</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="245"/>
        <source>Need</source>
        <translation>Requis</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="368"/>
        <source>Import Region of Interest for %n frame(s)</source>
        <translation>Importer la région d&apos;intérêt pour %n images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="378"/>
        <source>Clear Region of Interest (%1 with region)</source>
        <translation>Effacer la région d&apos;intérêt (%1 avec région)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="383"/>
        <source>Clear Region of Interest</source>
        <translation>Effacer la région d&apos;intérêt</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="396"/>
        <source>Delete %n image(s)</source>
        <translation>Supprimer %n images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="496"/>
        <source>Images</source>
        <translation>Images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="497"/>
        <source>All Files</source>
        <translation>Tous les fichiers</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="508"/>
        <source>Selected %1 files for %2 frames — count must match</source>
        <translation>%1 fichiers sélectionnés pour %2 images — le nombre doit correspondre</translation>
    </message>
</context>
<context>
    <name>InitGuessWidget</name>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="80"/>
        <source>Starting Points</source>
        <translation>Points de départ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="91"/>
        <source>Place a few points; pyALDIC bootstraps each with a single-point NCC and propagates the field along mesh neighbours.

Best for:
• Large inter-frame displacement (&gt; 50 px)
• Discontinuous fields (cracks, shear bands)
• Scenarios where FFT picks wrong peaks

Auto-placed per region when you draw or edit an ROI.</source>
        <translation>Placez quelques points ; pyALDIC initialise chacun avec une NCC mono-point et propage le champ le long des voisins du maillage.

Idéal pour :
• Grands déplacements inter-images (&gt; 50 px)
• Champs discontinus (fissures, bandes de cisaillement)
• Scénarios où la FFT choisit de mauvais pics

Placés automatiquement par région lorsque vous dessinez ou modifiez une ROI.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="100"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="282"/>
        <source>Place Starting Points</source>
        <translation>Placer les points de départ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="105"/>
        <source>Enter placement mode on the canvas. Left-click to add, right-click to remove, Esc or click again to exit.</source>
        <translation>Entrer en mode placement sur le canevas. Clic gauche pour ajouter, clic droit pour supprimer, Échap ou nouveau clic pour sortir.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="107"/>
        <source>Auto-place</source>
        <translation>Placement automatique</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="111"/>
        <source>Fill empty regions with the highest-NCC node in each. Existing Starting Points are preserved.</source>
        <translation>Remplit les régions vides avec le nœud ayant la meilleure NCC. Les points de départ existants sont conservés.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="113"/>
        <source>Clear</source>
        <translation>Effacer</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="117"/>
        <source>Remove every Starting Point. Faster than right-clicking each one individually.</source>
        <translation>Supprimer tous les points de départ. Plus rapide que de cliquer droit sur chacun.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="122"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="292"/>
        <source>%1 / %2 regions ready</source>
        <translation>%1 / %2 régions prêtes</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="141"/>
        <source>FFT (cross-correlation)</source>
        <translation>FFT (corrélation croisée)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="152"/>
        <source>Full-grid normalized cross-correlation. Robust within the search radius; the search auto-expands when peaks clip.

Best for:
• Small-to-moderate smooth motion
• Well-textured speckle
• No special user setup needed

Cost grows with the search radius, so very large displacements become slow.</source>
        <translation>Corrélation croisée normalisée sur la grille complète. Robuste dans le rayon de recherche ; la recherche s&apos;étend automatiquement lorsque les pics sont tronqués.

Idéal pour :
• Mouvements lisses petits à modérés
• Speckle bien texturé
• Aucune configuration spéciale requise

Le coût augmente avec le rayon de recherche, les très grands déplacements deviennent donc lents.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="163"/>
        <source>Every</source>
        <translation>Toutes les</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="168"/>
        <source>Run FFT every N frames. N = 1 means FFT every frame (safest, slowest). N &gt; 1 uses warm-start between resets to limit error propagation to N frames.</source>
        <translation>Exécute la FFT toutes les N images. N = 1 signifie FFT à chaque image (le plus sûr, le plus lent). N &gt; 1 utilise un démarrage à chaud entre les réinitialisations pour limiter la propagation d&apos;erreurs à N images.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="175"/>
        <source>(N=1 = every frame)</source>
        <translation>(N=1 = chaque image)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="185"/>
        <source>Only when reference frame updates (incremental only)</source>
        <translation>Uniquement à la mise à jour de la référence (incrémental seulement)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="189"/>
        <source>Run FFT whenever the reference frame changes; warm-start within each segment. Typical default for incremental mode.</source>
        <translation>Exécute la FFT à chaque changement d&apos;image de référence ; démarrage à chaud dans chaque segment. Valeur par défaut typique pour le mode incrémental.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="198"/>
        <source>Previous frame</source>
        <translation>Image précédente</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="208"/>
        <source>Use the previous frame&apos;s converged displacement as the initial guess. No cross-correlation runs.

Best for:
• Very small inter-frame motion (a few pixels)
• Fastest option when motion is smooth

Errors can accumulate over long sequences. Prefer FFT or Starting Points on noisy data or when motion is larger.</source>
        <translation>Utilise le déplacement convergé de l&apos;image précédente comme estimation initiale. Aucune corrélation croisée n&apos;est exécutée.

Idéal pour :
• Très petits mouvements inter-images (quelques pixels)
• Option la plus rapide lorsque le mouvement est lisse

Les erreurs peuvent s&apos;accumuler sur les séquences longues. Préférez FFT ou les points de départ sur des données bruitées ou lorsque le mouvement est plus important.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="280"/>
        <source>Placing... (click to exit)</source>
        <translation>Placement… (cliquez pour sortir)</translation>
    </message>
</context>
<context>
    <name>LeftSidebar</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="178"/>
        <source>IMAGES</source>
        <translation>IMAGES</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="185"/>
        <source>Natural Sort (1, 2, …, 10)</source>
        <translation>Tri naturel (1, 2, …, 10)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="190"/>
        <source>Sort by embedded numbers: image1, image2, …, image10
Default (unchecked): lexicographic — best for zero-padded names</source>
        <translation>Tri par numéros intégrés : image1, image2, …, image10
Par défaut (non coché) : lexicographique — idéal pour les noms avec zéros de remplissage</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="261"/>
        <source>WORKFLOW TYPE</source>
        <translation>TYPE DE FLUX</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="274"/>
        <source>INITIAL GUESS</source>
        <translation>ESTIMATION INITIALE</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="281"/>
        <source>REGION OF INTEREST</source>
        <translation>RÉGION D&apos;INTÉRÊT</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="291"/>
        <source>PARAMETERS</source>
        <translation>PARAMÈTRES</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="297"/>
        <source>ADVANCED</source>
        <translation>AVANCÉ</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../../gui/app.py" line="195"/>
        <source>&amp;File</source>
        <translation>Fichier</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="197"/>
        <source>Open Session…</source>
        <translation>Ouvrir une session…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="202"/>
        <source>Save Session…</source>
        <translation>Enregistrer la session…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="208"/>
        <source>Quit</source>
        <translation>Quitter</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="216"/>
        <source>&amp;Settings</source>
        <translation>Paramètres</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="217"/>
        <source>Language</source>
        <translation>Langue</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="246"/>
        <source>Language changed</source>
        <translation>Langue modifiée</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="250"/>
        <source>Language set to %1. Please restart pyALDIC for all widgets to pick up the new language.</source>
        <translation>Langue définie sur %1. Veuillez redémarrer pyALDIC pour que tous les éléments prennent en compte la nouvelle langue.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="261"/>
        <source>Save Session</source>
        <translation>Enregistrer la session</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="263"/>
        <location filename="../../gui/app.py" line="290"/>
        <source>pyALDIC Session</source>
        <translation>Session pyALDIC</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="264"/>
        <location filename="../../gui/app.py" line="292"/>
        <source>All Files</source>
        <translation>Tous les fichiers</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="274"/>
        <source>Save Session Failed</source>
        <translation>Échec de l&apos;enregistrement de la session</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="288"/>
        <source>Open Session</source>
        <translation>Ouvrir une session</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="291"/>
        <source>JSON</source>
        <translation>JSON</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="300"/>
        <source>Open Session Failed</source>
        <translation>Échec de l&apos;ouverture de la session</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="652"/>
        <location filename="../../gui/app.py" line="705"/>
        <source>Load images first.</source>
        <translation>Veuillez d&apos;abord charger des images.</translation>
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
        <translation>Couleur du maillage</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="41"/>
        <source>Click to choose mesh line color</source>
        <translation>Cliquer pour choisir la couleur des lignes du maillage</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="50"/>
        <source>Line width</source>
        <translation>Épaisseur</translation>
    </message>
</context>
<context>
    <name>ParamPanel</name>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="37"/>
        <source>Subset Size</source>
        <translation>Taille d&apos;imagette</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="43"/>
        <source>IC-GN subset window size in pixels (odd number)</source>
        <translation>Taille de la fenêtre d&apos;imagette IC-GN en pixels (nombre impair)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="50"/>
        <source>Subset Step</source>
        <translation>Pas d&apos;imagette</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="53"/>
        <source>Node spacing in pixels (must be power of 2)</source>
        <translation>Espacement des nœuds en pixels (doit être une puissance de 2)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="61"/>
        <location filename="../../gui/widgets/param_panel.py" line="186"/>
        <source>Search Range</source>
        <translation>Plage de recherche</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="76"/>
        <source>Refine Inner Boundary</source>
        <translation>Raffiner la limite interne</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="82"/>
        <source>Locally refine the mesh along internal mask boundaries
(holes inside the Region of Interest). Useful for bubble / void edges.</source>
        <translation>Raffiner localement le maillage le long des limites internes du masque
(trous à l&apos;intérieur de la région d&apos;intérêt). Utile pour les bords de bulles / vides.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="83"/>
        <source>Refine Outer Boundary</source>
        <translation>Raffiner la limite externe</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="88"/>
        <source>Locally refine the mesh along the outer Region of Interest
boundary.</source>
        <translation>Raffiner localement le maillage le long de la limite externe de la région d&apos;intérêt.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="106"/>
        <source>Refinement aggressiveness. min element size = max(2, subset_step / 2^level). Applies uniformly to inner-, outer-boundary AND brush-painted refinement zones. Available levels depend on subset size and subset step.</source>
        <translation>Intensité du raffinage. Taille minimale d&apos;élément = max(2, subset_step / 2^niveau). S&apos;applique uniformément aux limites internes, externes ET aux zones peintes au pinceau. Les niveaux disponibles dépendent de la taille et du pas d&apos;imagette.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="108"/>
        <source>Refinement Level</source>
        <translation>Niveau de raffinage</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="173"/>
        <source>Maximum per-frame displacement the FFT search can detect (pixels).
Set comfortably larger than the expected inter-frame motion.
For large rotations in incremental mode, this must cover
  radius × sin(per-step angle).</source>
        <translation>Déplacement maximal par image détectable par la recherche FFT (pixels).
Définissez une valeur nettement supérieure au mouvement inter-image attendu.
Pour les grandes rotations en mode incrémental, cela doit couvrir :
  rayon × sin(angle par étape).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="181"/>
        <source>Initial half-width (pixels) of the single-point NCC search at each Starting Point.
Auto-expands 2x per retry if the peak is clipped, up to image half-size.
Only affects Starting Point bootstrap; other nodes use F-aware propagation (no per-node search).</source>
        <translation>Demi-largeur initiale (pixels) de la recherche NCC mono-point à chaque point de départ.
S&apos;étend automatiquement d&apos;un facteur 2 par tentative si le pic est tronqué, jusqu&apos;à la moitié de la taille de l&apos;image.
N&apos;affecte que l&apos;initialisation des points de départ ; les autres nœuds utilisent la propagation F-aware (pas de recherche par nœud).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="182"/>
        <source>Initial Seed Search</source>
        <translation>Recherche initiale du germe</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="218"/>
        <source>Light</source>
        <comment>Mesh refinement severity</comment>
        <translation>Léger</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="219"/>
        <source>Medium</source>
        <comment>Mesh refinement severity</comment>
        <translation>Moyen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="220"/>
        <source>Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>Fort</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="221"/>
        <source>Extra Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>Très fort</translation>
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
        <translation>taille min. d&apos;élément = %1 px  (subset_step=%2, niveau=%3)</translation>
    </message>
</context>
<context>
    <name>PhysicalUnitsWidget</name>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="54"/>
        <source>Use physical units</source>
        <translation>Utiliser les unités physiques</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="65"/>
        <source>Physical size of one image pixel</source>
        <translation>Taille physique d&apos;un pixel de l&apos;image</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="80"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="83"/>
        <source>Pixel size</source>
        <translation>Taille de pixel</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="93"/>
        <source>Acquisition frame rate (used for velocity field)</source>
        <translation>Cadence d&apos;acquisition (utilisée pour le champ de vitesse)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="94"/>
        <source>Frame rate</source>
        <translation>Fréquence d&apos;images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="162"/>
        <source>Disp: %1  Velocity: %2/s</source>
        <translation>Dépl. : %1  Vitesse : %2/s</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="167"/>
        <source>Disp: px  Velocity: px/fr</source>
        <translation>Dépl. : px  Vitesse : px/im</translation>
    </message>
</context>
<context>
    <name>PipelineController</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="359"/>
        <source>Building pipeline configuration...</source>
        <translation>Construction de la configuration du pipeline…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="516"/>
        <source>Loading images...</source>
        <translation>Chargement des images…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="526"/>
        <source>  Loaded %1 images, shape=%2</source>
        <translation>  %1 images chargées, forme=%2</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="539"/>
        <source>  ROI mask: %1, %2 pixels (%3%)</source>
        <translation>  Masque ROI : %1, %2 pixels (%3%)</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="567"/>
        <source>Run cancelled: define per-frame Regions of Interest for the missing reference frames or accept the inherited frame-1 mask in the next run.</source>
        <translation>Exécution annulée : définissez les régions d&apos;intérêt par image pour les images de référence manquantes, ou acceptez le masque hérité de l&apos;image 1 au prochain lancement.</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="588"/>
        <source>  %n frame(s) with custom ROI masks</source>
        <translation>  %n images avec des masques ROI personnalisés</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="719"/>
        <source>Results received: %n frame(s)</source>
        <translation>Résultats reçus : %n images</translation>
    </message>
</context>
<context>
    <name>PipelineWorker</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="189"/>
        <source>Starting DIC analysis...</source>
        <translation>Démarrage de l&apos;analyse DIC…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="222"/>
        <source>Analysis complete in %1s</source>
        <translation>Analyse terminée en %1 s</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="230"/>
        <source>Analysis stopped by user.</source>
        <translation>Analyse arrêtée par l&apos;utilisateur.</translation>
    </message>
</context>
<context>
    <name>ROIHint</name>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="64"/>
        <source>Load images first, then draw a Region of Interest on frame 1.</source>
        <translation>Chargez d&apos;abord des images, puis dessinez une région d&apos;intérêt sur l&apos;image 1.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="72"/>
        <source>&lt;b&gt;Accumulative mode&lt;/b&gt; — only frame 1 needs a Region of Interest. All later frames are compared against it directly.</source>
        <translation>&lt;b&gt;Mode cumulatif&lt;/b&gt; — seule l&apos;image 1 a besoin d&apos;une région d&apos;intérêt. Toutes les images suivantes sont comparées directement à celle-ci.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="82"/>
        <source>&lt;b&gt;Incremental, every frame&lt;/b&gt; — frame 1 needs a Region of Interest. It is automatically warped forward to each later frame (no per-frame drawing required).</source>
        <translation>&lt;b&gt;Incrémental, chaque image&lt;/b&gt; — l&apos;image 1 a besoin d&apos;une région d&apos;intérêt. Elle est automatiquement propagée à chaque image suivante (pas de dessin par image requis).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="99"/>
        <source>&lt;b&gt;Incremental, every %1 frames&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%2&lt;/b&gt; (%3 reference frames total).</source>
        <translation>&lt;b&gt;Incrémental, toutes les %1 images&lt;/b&gt; — dessinez une région d&apos;intérêt sur les images : &lt;b&gt;%2&lt;/b&gt; (%3 images de référence au total).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="113"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — no custom reference frames set. Frame 1 will be the only reference; add more indices in the Reference Frames field.</source>
        <translation>&lt;b&gt;Incrémental, personnalisé&lt;/b&gt; — aucune image de référence personnalisée définie. L&apos;image 1 sera la seule référence ; ajoutez d&apos;autres indices dans le champ Images de référence.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="123"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%1&lt;/b&gt; (%2 reference frames total).</source>
        <translation>&lt;b&gt;Incrémental, personnalisé&lt;/b&gt; — dessinez une région d&apos;intérêt sur les images : &lt;b&gt;%1&lt;/b&gt; (%2 images de référence au total).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="129"/>
        <source>Draw a Region of Interest on frame 1.</source>
        <translation>Dessinez une région d&apos;intérêt sur l&apos;image 1.</translation>
    </message>
</context>
<context>
    <name>ROIToolbar</name>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="72"/>
        <source>+ Add</source>
        <translation>+ Ajouter</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="76"/>
        <source>Add region to the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>Ajouter une région à la région d&apos;intérêt (Polygone / Rectangle / Cercle)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="79"/>
        <source>Cut</source>
        <translation>Découper</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="83"/>
        <source>Cut region from the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>Découper une région de la région d&apos;intérêt (Polygone / Rectangle / Cercle)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="86"/>
        <source>+ Refine</source>
        <translation>+ Raffiner</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="93"/>
        <source>Paint extra mesh-refinement zones with a brush
(only on frame 1 — material points auto-warped to later frames)</source>
        <translation>Peindre des zones de raffinage de maillage supplémentaires au pinceau
(uniquement sur l&apos;image 1 — les points matériels sont automatiquement reportés sur les images suivantes)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="98"/>
        <source>Refine brush is only available on frame 1. Switch to frame 1 to paint refinement zones; they are automatically warped to later frames.</source>
        <translation>Le pinceau de raffinage n&apos;est disponible que sur l&apos;image 1. Passez à l&apos;image 1 pour peindre les zones de raffinage ; elles sont automatiquement reportées sur les images suivantes.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="118"/>
        <source>Import</source>
        <translation>Importer</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="119"/>
        <source>Import mask from image file</source>
        <translation>Importer le masque depuis un fichier image</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="124"/>
        <source>Batch Import</source>
        <translation>Import par lot</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="126"/>
        <source>Batch import mask files for multiple frames</source>
        <translation>Importer par lot des fichiers de masques pour plusieurs images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="139"/>
        <source>Save</source>
        <translation>Enregistrer</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="140"/>
        <source>Save current mask to PNG file</source>
        <translation>Enregistrer le masque actuel en PNG</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="145"/>
        <source>Invert</source>
        <translation>Inverser</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="147"/>
        <source>Invert the Region of Interest mask</source>
        <translation>Inverser le masque de la région d&apos;intérêt</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="152"/>
        <source>Clear</source>
        <translation>Effacer</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="154"/>
        <source>Clear all Region of Interest masks</source>
        <translation>Effacer tous les masques de région d&apos;intérêt</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="186"/>
        <source>Radius</source>
        <translation>Rayon</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="204"/>
        <source>Paint</source>
        <translation>Peindre</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="209"/>
        <source>Erase</source>
        <translation>Effacer</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="219"/>
        <source>Clear Brush</source>
        <translation>Effacer le pinceau</translation>
    </message>
</context>
<context>
    <name>RightSidebar</name>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="58"/>
        <source>Run DIC Analysis</source>
        <translation>Lancer l&apos;analyse DIC</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="71"/>
        <source>Cancel</source>
        <translation>Annuler</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="78"/>
        <source>Cancel the current analysis. Already-computed frames are kept; the run is marked as IDLE (not DONE).</source>
        <translation>Annuler l&apos;analyse en cours. Les images déjà calculées sont conservées ; l&apos;exécution passe à l&apos;état IDLE (et non DONE).</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="84"/>
        <source>Export Results</source>
        <translation>Exporter les résultats</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="92"/>
        <source>Open Strain Window</source>
        <translation>Ouvrir la fenêtre de déformation</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="97"/>
        <source>Compute and visualize strain in a separate post-processing window. Requires displacement results from a completed Run.</source>
        <translation>Calculer et visualiser la déformation dans une fenêtre de post-traitement séparée. Nécessite des résultats de déplacement d&apos;une exécution terminée.</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="104"/>
        <source>PROGRESS</source>
        <translation>PROGRESSION</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="113"/>
        <location filename="../../gui/panels/right_sidebar.py" line="350"/>
        <source>Ready</source>
        <translation>Prêt</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="121"/>
        <location filename="../../gui/panels/right_sidebar.py" line="352"/>
        <location filename="../../gui/panels/right_sidebar.py" line="406"/>
        <source>ELAPSED  %1</source>
        <translation>ÉCOULÉ  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="126"/>
        <location filename="../../gui/panels/right_sidebar.py" line="354"/>
        <location filename="../../gui/panels/right_sidebar.py" line="414"/>
        <location filename="../../gui/panels/right_sidebar.py" line="418"/>
        <source>REMAINING  %1</source>
        <translation>RESTANT  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="134"/>
        <source>FIELD</source>
        <translation>CHAMP</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="141"/>
        <source>Show on deformed frame</source>
        <translation>Afficher sur l&apos;image déformée</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="146"/>
        <source>When checked, overlay results on the deformed (current) frame instead of the reference frame</source>
        <translation>Lorsque cette option est activée, les résultats sont superposés sur l&apos;image déformée (actuelle) au lieu de l&apos;image de référence</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="151"/>
        <source>VISUALIZATION</source>
        <translation>VISUALISATION</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="156"/>
        <source>Colormap</source>
        <translation>Palette de couleurs</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="177"/>
        <source>Opacity</source>
        <translation>Opacité</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="184"/>
        <source>Overlay opacity (0 = transparent, 100 = opaque)</source>
        <translation>Opacité de la superposition (0 = transparent, 100 = opaque)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="190"/>
        <source>PHYSICAL UNITS</source>
        <translation>UNITÉS PHYSIQUES</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="196"/>
        <source>LOG</source>
        <translation>JOURNAL</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="202"/>
        <source>Clear</source>
        <translation>Effacer</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="321"/>
        <source>Place at least one Starting Point in each red region before running (red = needs a Starting Point).</source>
        <translation>Placez au moins un point de départ dans chaque région rouge avant de lancer l&apos;exécution (rouge = point de départ requis).</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="389"/>
        <source>%1  —  Frame %2</source>
        <translation>%1  —  Image %2</translation>
    </message>
</context>
<context>
    <name>StrainFieldSelector</name>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="150"/>
        <source>DISPLACEMENT</source>
        <translation>DÉPLACEMENT</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="161"/>
        <source>STRAIN</source>
        <translation>DÉFORMATION</translation>
    </message>
</context>
<context>
    <name>StrainNavigator</name>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="73"/>
        <source>Previous frame</source>
        <translation>Image précédente</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="84"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="216"/>
        <source>Play animation</source>
        <translation>Lire l&apos;animation</translation>
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
        <translation>Image suivante</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="109"/>
        <source>Playback speed</source>
        <translation>Vitesse de lecture</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="114"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="228"/>
        <source>FRAME 0/0</source>
        <translation>IMAGE 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="205"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="206"/>
        <source>Pause animation</source>
        <translation>Pause</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="223"/>
        <source>FRAME %1/%2</source>
        <translation>IMAGE %1/%2</translation>
    </message>
</context>
<context>
    <name>StrainParamPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="79"/>
        <source>Plane fitting</source>
        <translation>Ajustement de plan</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="80"/>
        <source>FEM nodal</source>
        <translation>FEM nodal</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="82"/>
        <source>Method</source>
        <translation>Méthode</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="106"/>
        <source>VSG (Virtual Strain Gauge) size is the diameter, in pixels, of the circular region around each mesh node used to fit a local displacement plane. Strain is then taken as the plane&apos;s slope.

• Larger VSG → smoother strain, lower spatial resolution.
• Smaller VSG → sharper strain, more noise.
• Rule of thumb: VSG ≥ 2 × subset step + 1 (default: 41 px).

Not used when Method = FEM nodal (there, mesh spacing itself sets the gauge size).</source>
        <translation>La taille VSG (Virtual Strain Gauge, jauge de déformation virtuelle) est le diamètre, en pixels, de la région circulaire autour de chaque nœud du maillage, utilisée pour ajuster un plan de déplacement local. La déformation est ensuite prise comme la pente de ce plan.

• VSG plus grande → déformation plus lisse, résolution spatiale plus faible.
• VSG plus petite → déformation plus fine, mais plus de bruit.
• Règle empirique : VSG ≥ 2 × pas de subset + 1 (par défaut : 41 px).

Non utilisée quand Méthode = FEM nodal (l&apos;espacement du maillage fixe alors la taille).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="109"/>
        <source>VSG size</source>
        <translation>Taille VSG</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="139"/>
        <source>Off</source>
        <comment>Strain smoothing preset</comment>
        <translation>Désactivé</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="140"/>
        <source>Light (σ = 0.5 × step)</source>
        <translation>Léger (σ = 0,5 × step)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="141"/>
        <source>Medium (σ = 1 × step)</source>
        <translation>Moyen (σ = 1 × step)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="142"/>
        <source>Strong (σ = 2 × step) ⚠</source>
        <translation>Fort (σ = 2 × step) ⚠</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="153"/>
        <source>Gaussian smoothing of the strain field after computation.
σ is the Gaussian kernel width; &apos;step&apos; = DIC node spacing.
  Light  (0.5 × step):  subtle, preserves fine features.
  Medium (1 × step):    balanced, recommended for noisy data.
  Strong (2 × step) ⚠:  aggressive, may blur real gradients.</source>
        <translation>Lissage gaussien du champ de déformation après calcul.
σ est la largeur du noyau gaussien ; « step » = espacement des nœuds DIC.
  Léger   (0,5 × step) : subtil, préserve les détails fins.
  Moyen   (1 × step) :   équilibré, recommandé pour des données bruitées.
  Fort    (2 × step) ⚠ : agressif, peut flouter les vrais gradients.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="154"/>
        <source>Strain field smoothing</source>
        <translation>Lissage du champ de déformation</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="159"/>
        <source>Infinitesimal</source>
        <translation>Infinitésimal</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="160"/>
        <source>Eulerian</source>
        <translation>Eulérien</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="161"/>
        <source>Green-Lagrangian</source>
        <translation>Green-Lagrange</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="163"/>
        <source>Strain type</source>
        <translation>Type de déformation</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="256"/>
        <source>⚠ VSG radius (%1 px) &lt; DIC node spacing (%2 px); plane fit will fail. Use VSG ≥ %3 px or switch Method to FEM nodal.</source>
        <translation>⚠ Rayon VSG (%1 px) &lt; espacement des nœuds DIC (%2 px) ; l&apos;ajustement de plan échouera. Utilisez VSG ≥ %3 px ou passez la Méthode en FEM nodal.</translation>
    </message>
</context>
<context>
    <name>StrainVizPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="62"/>
        <source>Show on deformed frame</source>
        <translation>Afficher sur l&apos;image déformée</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="64"/>
        <source>Deformed</source>
        <translation>Déformé</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="71"/>
        <source>Colormap</source>
        <translation>Palette</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="74"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="76"/>
        <source>Range</source>
        <translation>Plage</translation>
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
        <translation>Opacité</translation>
    </message>
</context>
<context>
    <name>StrainWindow</name>
    <message>
        <location filename="../../gui/strain_window.py" line="123"/>
        <source>Strain Post-Processing</source>
        <translation>Post-traitement de la déformation</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="169"/>
        <source>Fit</source>
        <translation>Ajuster</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="170"/>
        <source>Fit image to viewport</source>
        <translation>Ajuster l&apos;image à la vue</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="176"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="177"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>Zoomer à 100% (1:1)</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="180"/>
        <source>Zoom in</source>
        <translation>Zoom avant</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="185"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="238"/>
        <source>STRAIN PARAMETERS</source>
        <translation>PARAMÈTRES DE DÉFORMATION</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="258"/>
        <source>Export displacement and strain results to NPZ / MAT / CSV / PNG</source>
        <translation>Exporter les résultats de déplacement et de déformation en NPZ / MAT / CSV / PNG</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="290"/>
        <source>FIELD</source>
        <translation>CHAMP</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="299"/>
        <source>VISUALIZATION</source>
        <translation>VISUALISATION</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="309"/>
        <source>PHYSICAL UNITS</source>
        <translation>UNITÉS PHYSIQUES</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="318"/>
        <source>LOG</source>
        <translation>JOURNAL</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="400"/>
        <source>Strain compute failed: %1: %2</source>
        <translation>Échec du calcul de déformation : %1 : %2</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="408"/>
        <location filename="../../gui/strain_window.py" line="456"/>
        <source>Strain computation complete.</source>
        <translation>Calcul de déformation terminé.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="420"/>
        <source>Strain window: no displacement results to post-process.</source>
        <translation>Fenêtre de déformation : aucun résultat de déplacement à post-traiter.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="472"/>
        <source>Strain compute failed: %1</source>
        <translation>Échec du calcul de déformation : %1</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="509"/>
        <source>⚠ Params changed -- click Compute Strain</source>
        <translation>⚠ Paramètres modifiés — cliquez sur « Calculer la déformation »</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="186"/>
        <source>Zoom out</source>
        <translation>Zoom arrière</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="248"/>
        <source>Compute Strain</source>
        <translation>Calculer la déformation</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="254"/>
        <source>Export Results</source>
        <translation>Exporter les résultats</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="430"/>
        <source>Starting…</source>
        <translation>Démarrage…</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="452"/>
        <source>Complete</source>
        <translation>Terminé</translation>
    </message>
</context>
<context>
    <name>VelocitySettingsWidget</name>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="46"/>
        <source>Use physical units</source>
        <translation>Utiliser les unités physiques</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="68"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="83"/>
        <source>Unit: px/frame</source>
        <translation>Unité : px/image</translation>
    </message>
</context>
<context>
    <name>WorkflowTypePanel</name>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="51"/>
        <source>Incremental</source>
        <translation>Incrémental</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="52"/>
        <source>Accumulative</source>
        <translation>Cumulatif</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="62"/>
        <source>Incremental: each frame is compared to the previous reference frame.
Suitable for large accumulated deformation, required for large rotations.

Accumulative: every frame is compared to frame 1.
Accurate for small, monotonic deformation only.</source>
        <translation>Incrémental : chaque image est comparée à l&apos;image de référence précédente.
Adapté aux grandes déformations cumulées, requis pour les grandes rotations.

Cumulatif : chaque image est comparée à l&apos;image 1.
Précis uniquement pour les petites déformations monotones.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="64"/>
        <source>Tracking Mode</source>
        <translation>Mode de suivi</translation>
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
        <translation>Local DIC : Appariement d&apos;imagettes indépendant (IC-GN). Rapide,
préserve les détails locaux. Idéal pour les petites
déformations ou les images de haute qualité.

AL-DIC : Lagrangien augmenté avec régularisation
FEM globale. Impose la compatibilité des déplacements
entre imagettes. Idéal pour les grandes déformations, les images
bruitées ou lorsque la précision de la déformation est importante.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="87"/>
        <source>Solver</source>
        <translation>Solveur</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="104"/>
        <source>Every Frame</source>
        <translation>Chaque image</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="105"/>
        <source>Every N Frames</source>
        <translation>Toutes les N images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="106"/>
        <source>Custom Frames</source>
        <translation>Images personnalisées</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="116"/>
        <source>When the reference frame refreshes during incremental tracking.
Every Frame: reset reference every frame (smallest per-step displacement,
most robust for large deformation).
Every N Frames: reset every N frames (balance speed vs robustness).
Custom Frames: user-defined list of reference frame indices.</source>
        <translation>Quand l&apos;image de référence est rafraîchie lors du suivi incrémental.
Chaque image : réinitialiser la référence à chaque image (plus petit déplacement par étape,
plus robuste pour les grandes déformations).
Toutes les N images : réinitialiser toutes les N images (compromis vitesse/robustesse).
Images personnalisées : liste d&apos;indices définis par l&apos;utilisateur.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="118"/>
        <source>Reference Update</source>
        <translation>Mise à jour de la référence</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="128"/>
        <source>Update reference every N frames</source>
        <translation>Mettre à jour la référence toutes les N images</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="130"/>
        <source>Interval</source>
        <translation>Intervalle</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="141"/>
        <source>Comma-separated frame indices to use as reference frames (0-based)</source>
        <translation>Indices d&apos;images séparés par des virgules pour les images de référence (base 0)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="143"/>
        <source>Reference Frames</source>
        <translation>Images de référence</translation>
    </message>
</context>
<context>
    <name>_DropZone</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="120"/>
        <source>Drop image folder
or Browse</source>
        <translation>Déposez un dossier d&apos;images
ou Parcourir</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="130"/>
        <source>Select Image Folder</source>
        <translation>Sélectionner le dossier d&apos;images</translation>
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
