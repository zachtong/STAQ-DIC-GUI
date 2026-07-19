<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="es" sourcelanguage="en_US">
<context>
    <name>AdvancedTuningWidget</name>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="44"/>
        <source>AL-DIC Iterations</source>
        <translation>Iteraciones AL-DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="52"/>
        <source>Number of global refinement cycles for the AL-DIC solver.
1 = single global pass (fastest), 3 = default,
5+ = diminishing returns for most cases.</source>
        <translation>Número de ciclos de refinamiento global del solucionador AL-DIC.
1 = pasada única (más rápido), 3 = predeterminado,
5+ = rendimientos decrecientes en la mayoría de los casos.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="60"/>
        <source>Only affects AL-DIC solver. Ignored by Local DIC.</source>
        <translation>Solo afecta al solucionador AL-DIC. Local DIC lo ignora.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="73"/>
        <source>Auto-expand FFT search on clipped peaks</source>
        <translation>Expandir automáticamente la búsqueda FFT cuando los picos se recortan</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="76"/>
        <source>When the NCC peak reaches the edge of the search region, automatically retry with a larger region (up to image half-size, 6 retries with 2x growth).

Only relevant for the FFT init-guess mode.</source>
        <translation>Cuando el pico NCC alcanza el borde de la región de búsqueda, reintenta automáticamente con una región mayor (hasta la mitad del tamaño de la imagen, 6 reintentos con crecimiento ×2).

Solo relevante para el modo de estimación inicial FFT.</translation>
    </message>
</context>
<context>
    <name>App</name>
    <message>
        <location filename="../../gui/app.py" line="926"/>
        <source>Imported Region of Interest for %n frame(s)</source>
        <translation>Región de interés importada para %n fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="940"/>
        <source>Run DIC first -- no displacement results to post-process.</source>
        <translation>Ejecute primero el DIC — no hay resultados de desplazamiento para posprocesar.</translation>
    </message>
</context>
<context>
    <name>AutoFixedSelector</name>
    <message>
        <location filename="../../gui/widgets/range_mode.py" line="33"/>
        <source>Auto</source>
        <comment>Color range mode: rescale to the data range</comment>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/range_mode.py" line="36"/>
        <source>Rescale the color range to each frame&apos;s data range</source>
        <translation>Ajustar el rango de colores al rango de datos de cada fotograma</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/range_mode.py" line="39"/>
        <source>Fixed</source>
        <comment>Color range mode: manual min/max bounds</comment>
        <translation>Fijo</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/range_mode.py" line="42"/>
        <source>Keep the manual Min/Max bounds for every frame</source>
        <translation>Mantener los límites Mín/Máx manuales en todos los fotogramas</translation>
    </message>
</context>
<context>
    <name>BatchImportDialog</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="367"/>
        <source>Batch Import Region of Interest Masks</source>
        <translation>Importar por lotes máscaras de región de interés</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="418"/>
        <source>Mask Folder:</source>
        <translation>Carpeta de máscaras:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="419"/>
        <source>(none)</source>
        <translation>(ninguna)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="424"/>
        <source>Browse...</source>
        <translation>Examinar…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="443"/>
        <source>Available Masks</source>
        <translation>Máscaras disponibles</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="454"/>
        <source>Auto-Match by Name</source>
        <translation>Coincidencia automática por nombre</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="456"/>
        <source>Match mask files to frames by number in filename</source>
        <translation>Asociar archivos de máscara a fotogramas según el número del nombre de archivo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Assign Sequential</source>
        <translation>Asignar secuencialmente</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="462"/>
        <source>Assign masks to frames in order starting from frame 0</source>
        <translation>Asignar máscaras a los fotogramas en orden desde el fotograma 0</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="470"/>
        <source>Frame Assignments</source>
        <translation>Asignaciones de fotograma</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Frame</source>
        <translation>Fotograma</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Image</source>
        <translation>Imagen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Mask</source>
        <translation>Máscara</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="484"/>
        <source>Assign Selected -&gt;</source>
        <translation>Asignar selección -&gt;</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="486"/>
        <source>Pair selected mask(s) with selected frame(s)</source>
        <translation>Emparejar las máscaras seleccionadas con los fotogramas seleccionados</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="490"/>
        <source>Clear All</source>
        <translation>Limpiar todo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="535"/>
        <source>Select Mask Folder</source>
        <translation>Seleccionar carpeta de máscaras</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="589"/>
        <source>Failed to read mask file.</source>
        <translation>No se pudo leer el archivo de máscara.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="593"/>
        <source>Mismatched shape: %1×%2 (expected %3×%4)</source>
        <translation>Forma no coincide: %1×%2 (se esperaba %3×%4)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="666"/>
        <source>%n mask(s) have mismatched sizes and are disabled.</source>
        <translation>%n máscara(s) tienen tamaños no coincidentes y están deshabilitadas.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="725"/>
        <source>Invalid assignment</source>
        <translation>Asignación no válida</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="727"/>
        <source>A frame can only have one mask. Select exactly one mask, or select multiple frames to assign one mask to many.</source>
        <translation>Un fotograma solo puede tener una máscara. Seleccione exactamente una máscara, o seleccione varios fotogramas para asignar una máscara a muchos.</translation>
    </message>
</context>
<context>
    <name>CanvasArea</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1202"/>
        <source>Fit</source>
        <translation>Ajustar</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1203"/>
        <source>Fit image to viewport</source>
        <translation>Ajustar la imagen a la vista</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1208"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1209"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>Zoom al 100% (1:1)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1213"/>
        <source>Zoom in</source>
        <translation>Acercar</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1219"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1220"/>
        <source>Zoom out</source>
        <translation>Alejar</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1233"/>
        <source>Show Grid</source>
        <translation>Mostrar cuadrícula</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1234"/>
        <source>Show/hide computational mesh grid</source>
        <translation>Mostrar/ocultar la cuadrícula de la malla</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1237"/>
        <source>Show Subset</source>
        <translation>Mostrar subconjunto</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1238"/>
        <source>Show subset window on hover (requires Grid)</source>
        <translation>Mostrar ventana del subconjunto al pasar el cursor (requiere cuadrícula)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1492"/>
        <source>Placing Starting Points</source>
        <translation>Colocando puntos de inicio</translation>
    </message>
</context>
<context>
    <name>CanvasConfigOverlay</name>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="41"/>
        <source>Mode</source>
        <translation>Modo</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="42"/>
        <source>Solver</source>
        <translation>Solucionador</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="43"/>
        <source>Init</source>
        <translation>Inicial</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="93"/>
        <source>Accumulative</source>
        <translation>Acumulativo</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="94"/>
        <source>Incremental</source>
        <translation>Incremental</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="101"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="103"/>
        <source>ADMM (%1 iter)</source>
        <translation>ADMM (%1 iter.)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="110"/>
        <source>Starting Points</source>
        <translation>Puntos de inicio</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="112"/>
        <source>Previous frame</source>
        <translation>Fotograma anterior</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="114"/>
        <source>FFT every frame</source>
        <translation>FFT cada fotograma</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="116"/>
        <source>FFT every %1 fr</source>
        <translation>FFT cada %1 fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="117"/>
        <source>FFT</source>
        <translation>FFT</translation>
    </message>
</context>
<context>
    <name>ColorRange</name>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="27"/>
        <source>Range</source>
        <translation>Rango</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="37"/>
        <source>Min</source>
        <translation>Mín</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="47"/>
        <source>Max</source>
        <translation>Máx</translation>
    </message>
</context>
<context>
    <name>ExportDialog</name>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="813"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="956"/>
        <source>Auto</source>
        <translation>Auto</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="435"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1312"/>
        <source>Opacity</source>
        <translation>Opacidad</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="437"/>
        <source>Field opacity (0 = transparent, 1 = fully opaque)</source>
        <translation>Opacidad del campo (0 = transparente, 1 = completamente opaco)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="545"/>
        <source>All</source>
        <translation>Todos</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="547"/>
        <source>None</source>
        <translation>Ninguno</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="576"/>
        <source>Export Results</source>
        <translation>Exportar resultados</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="600"/>
        <source>OUTPUT FOLDER</source>
        <translation>CARPETA DE SALIDA</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="608"/>
        <source>Select output folder…</source>
        <translation>Seleccionar carpeta de salida…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="612"/>
        <source>Browse…</source>
        <translation>Examinar…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="617"/>
        <source>Open Folder</source>
        <translation>Abrir carpeta</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="625"/>
        <source>PHYSICAL UNITS</source>
        <translation>UNIDADES FÍSICAS</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="629"/>
        <source>Enable physical units</source>
        <translation>Activar unidades físicas</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="632"/>
        <source>Scale displacement values by pixel size and show physical units on colorbar labels. Strain is dimensionless and unaffected.</source>
        <translation>Escalar los valores de desplazamiento por el tamaño del píxel y mostrar unidades físicas en las etiquetas de la barra de color. La deformación es adimensional y no se ve afectada.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="649"/>
        <source>/ pixel</source>
        <translation>/ píxel</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="651"/>
        <source>Pixel size</source>
        <translation>Tamaño del píxel</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="666"/>
        <source>fps</source>
        <translation>fps</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="668"/>
        <source>Frame rate</source>
        <translation>Fotogramas por segundo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="676"/>
        <source>Data</source>
        <translation>Datos</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="677"/>
        <source>Images</source>
        <translation>Imágenes</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="678"/>
        <source>Animation</source>
        <translation>Animación</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="679"/>
        <source>Report</source>
        <translation>Informe</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="681"/>
        <source>Preview &amp; Colorbar</source>
        <translation>Vista previa y barra de color</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="712"/>
        <source>FORMAT</source>
        <translation>FORMATO</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="714"/>
        <source>NumPy Archive (.npz)</source>
        <translation>Archivo NumPy (.npz)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="716"/>
        <source>MATLAB (.mat)</source>
        <translation>MATLAB (.mat)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="718"/>
        <source>CSV (per frame)</source>
        <translation>CSV (por fotograma)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="721"/>
        <source>NPZ: one file per frame (default: single merged file)</source>
        <translation>NPZ: un archivo por fotograma (predeterminado: un único archivo combinado)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="729"/>
        <source>DISPLACEMENT</source>
        <translation>DESPLAZAMIENTO</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="738"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="765"/>
        <source>Select:</source>
        <translation>Seleccionar:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="753"/>
        <source>STRAIN</source>
        <translation>DEFORMACIÓN</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="756"/>
        <source>Run Compute Strain first.</source>
        <translation>Ejecute primero «Calcular deformación».</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="783"/>
        <source>✓ Parameters file (JSON) always exported</source>
        <translation>✓ El archivo de parámetros (JSON) siempre se exporta</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="789"/>
        <source>Export Data</source>
        <translation>Exportar datos</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="810"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="953"/>
        <source>Export</source>
        <translation>Exportar</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="811"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="954"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1198"/>
        <source>Field</source>
        <translation>Campo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="812"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="955"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1285"/>
        <source>Colormap</source>
        <translation>Mapa de colores</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="814"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="957"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1297"/>
        <source>Min</source>
        <translation>Mín</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="815"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="958"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1304"/>
        <source>Max</source>
        <translation>Máx</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="834"/>
        <source>IMAGE SETTINGS</source>
        <translation>AJUSTES DE IMAGEN</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="844"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="987"/>
        <source>Format</source>
        <translation>Formato</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="852"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="995"/>
        <source>Full resolution</source>
        <translation>Resolución completa</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="854"/>
        <source>Cap the exported image&apos;s long edge (the larger of width/height; aspect ratio is kept).
Field detail is bounded by the mesh, so a smaller cap is near-lossless
but much smaller on disk and faster to encode. Lower = faster. &apos;Full resolution&apos; keeps the native size.</source>
        <translation>Limita el borde largo de la imagen exportada (el mayor de ancho/alto; se mantiene la relación de aspecto).
El detalle del campo está limitado por la malla, por lo que un límite menor es casi sin pérdida,
pero mucho más pequeño y rápido de codificar. Menor = más rápido. «Resolución completa» mantiene el tamaño nativo.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="861"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1002"/>
        <source>Resolution (long edge)</source>
        <translation>Resolución (borde largo)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="997"/>
        <source>Cap the animation&apos;s long edge (the larger of width/height).
Lower = faster and much smaller. Strongly recommended for GIF, whose size explodes at native resolution.</source>
        <translation>Limita el borde largo de la animación (el mayor de ancho/alto).
Menor = más rápido y mucho más pequeño. Muy recomendable para GIF, cuyo tamaño se dispara a resolución nativa.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="869"/>
        <source>JPEG quality (higher = larger file). Ignored for PNG/TIFF.</source>
        <translation>Calidad JPEG (mayor = archivo más grande). Se ignora para PNG/TIFF.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="872"/>
        <source>JPEG quality</source>
        <translation>Calidad JPEG</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="881"/>
        <source>DPI</source>
        <translation>PPP</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="883"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1028"/>
        <source>Include colorbar</source>
        <translation>Incluir barra de color</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="886"/>
        <source>Append a vertical colorbar strip to the right of each image.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>Añade una barra de color vertical a la derecha de cada imagen.
Las etiquetas se actualizan por fotograma cuando el rango auto está activo.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="893"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1038"/>
        <source>Original (frame 1 background)</source>
        <translation>Original (fotograma 1 como fondo)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="896"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1041"/>
        <source>Field is drawn at the original (undeformed) node positions.
Background image is always the first frame.</source>
        <translation>El campo se dibuja en las posiciones originales (no deformadas) de los nodos.
La imagen de fondo es siempre el primer fotograma.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="900"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1045"/>
        <source>Deformed (current frame background)</source>
        <translation>Deformado (fotograma actual como fondo)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="904"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1049"/>
        <source>Field is drawn at the displaced node positions (reference + displacement).
Background image follows each frame&apos;s own photo.</source>
        <translation>El campo se dibuja en las posiciones de nodo desplazadas (referencia + desplazamiento).
La imagen de fondo sigue la foto de cada fotograma.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="911"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1056"/>
        <source>Render as</source>
        <translation>Representar como</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="929"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1072"/>
        <source>Cancel Export</source>
        <translation>Cancelar exportación</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="934"/>
        <source>Export Images</source>
        <translation>Exportar imágenes</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="977"/>
        <source>ANIMATION SETTINGS</source>
        <translation>AJUSTES DE ANIMACIÓN</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1011"/>
        <source>FPS</source>
        <translation>FPS</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1021"/>
        <source>Export every Nth frame (1 = every frame). Higher is faster and smaller
but looks choppier. Playback duration is preserved (the FPS above is the pre-decimation rate).</source>
        <translation>Exporta uno de cada N fotogramas (1 = todos). Mayor = más rápido y pequeño,
pero se ve más entrecortado. La duración se conserva (los FPS de arriba son la tasa antes de diezmar).</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1026"/>
        <source>Frame step</source>
        <translation>Paso de fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1031"/>
        <source>Append a vertical colorbar strip to the right of each frame.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>Añade una barra de color vertical a la derecha de cada fotograma.
Las etiquetas se actualizan por fotograma cuando el rango auto está activo.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1077"/>
        <source>Export Animation</source>
        <translation>Exportar animación</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1094"/>
        <source>CONTENT</source>
        <translation>CONTENIDO</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1096"/>
        <source>Parameter summary table</source>
        <translation>Tabla resumen de parámetros</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1099"/>
        <source>Field statistics (min/max/mean/std per frame)</source>
        <translation>Estadísticas de campo (mín/máx/media/desv.típ. por fotograma)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1102"/>
        <source>Sample field images</source>
        <translation>Imágenes de campo de muestra</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1109"/>
        <source>Sample every</source>
        <translation>Muestrear cada</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1115"/>
        <source>frames</source>
        <comment>Report: sample every N frames</comment>
        <translation>fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1121"/>
        <source>FIELDS</source>
        <translation>CAMPOS</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1124"/>
        <source>Displacement:</source>
        <translation>Desplazamiento:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1139"/>
        <source>Strain:</source>
        <translation>Deformación:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1161"/>
        <source>Format: HTML (self-contained, view in any browser)</source>
        <translation>Formato: HTML (autocontenido, se puede ver en cualquier navegador)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1168"/>
        <source>Generate Report</source>
        <translation>Generar informe</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1190"/>
        <source>Open this tab to render a preview.</source>
        <translation>Abre esta pestaña para generar una vista previa.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1206"/>
        <source>Frame</source>
        <translation>Fotograma</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1218"/>
        <source>COLORBAR STYLE</source>
        <translation>ESTILO DE BARRA DE COLOR</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1221"/>
        <source>Right</source>
        <translation>Derecha</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1221"/>
        <source>Left</source>
        <translation>Izquierda</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1222"/>
        <source>Top</source>
        <translation>Arriba</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1222"/>
        <source>Bottom</source>
        <translation>Abajo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1225"/>
        <source>Position</source>
        <translation>Posición</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1231"/>
        <source>Font size</source>
        <translation>Tamaño de fuente</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1237"/>
        <source>Font family</source>
        <translation>Fuente</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1245"/>
        <source>Bar thickness</source>
        <translation>Grosor de la barra</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1248"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1264"/>
        <source>Black</source>
        <translation>Negro</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1248"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1264"/>
        <source>White</source>
        <translation>Blanco</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1251"/>
        <source>Background</source>
        <translation>Fondo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1258"/>
        <source>Add a blank border around the exported content, as a fraction of the long edge (0 = none).</source>
        <translation>Añade un borde en blanco alrededor del contenido exportado, como fracción del borde largo (0 = ninguna).</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1261"/>
        <source>Margin</source>
        <translation>Margen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1267"/>
        <source>Margin color</source>
        <translation>Color del margen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1269"/>
        <source>Refresh preview</source>
        <translation>Actualizar vista previa</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1276"/>
        <source>FIELD APPEARANCE</source>
        <translation>APARIENCIA DEL CAMPO</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1290"/>
        <source>Range</source>
        <translation>Rango</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1314"/>
        <source>Apply to all fields</source>
        <translation>Aplicar a todos los campos</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1316"/>
        <source>Apply this field&apos;s colormap, opacity and auto-range to every enabled field (each field keeps its own min/max).</source>
        <translation>Aplica el colormap, la opacidad y el rango automático de este campo a todos los campos activados (cada campo conserva su propio mín/máx).</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1439"/>
        <source>Preview failed: </source>
        <translation>Error en la vista previa: </translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1454"/>
        <source>Enable a field on the Images tab to preview.</source>
        <translation>Active un campo en la pestaña Images para la vista previa.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1467"/>
        <source>No data for this field/frame.</source>
        <translation>No hay datos para este campo/fotograma.</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1525"/>
        <source>FRAME RANGE</source>
        <translation>RANGO DE FOTOGRAMAS</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1528"/>
        <source>All frames</source>
        <translation>Todos los fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1534"/>
        <source>From</source>
        <comment>Frame range: starting frame</comment>
        <translation>Desde</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1542"/>
        <source>to</source>
        <comment>Frame range: ending frame</comment>
        <translation>a</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1573"/>
        <source>Select Output Folder</source>
        <translation>Seleccionar carpeta de salida</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1632"/>
        <source>Exported %1 files → %2</source>
        <translation>Exportados %1 archivos → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1641"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1716"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1795"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1837"/>
        <source>Error: %1</source>
        <translation>Error: %1</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1666"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1744"/>
        <source>Starting…</source>
        <translation>Iniciando…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1689"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1767"/>
        <source>Rendering %1 (%2/%3)</source>
        <translation>Renderizando %1 (%2/%3)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1695"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1773"/>
        <source>Frame %1/%2</source>
        <translation>Fotograma %1/%2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1705"/>
        <source>Exported %1 images → %2</source>
        <translation>%1 imágenes exportadas → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1830"/>
        <source>Report saved → %1</source>
        <translation>Informe guardado → %1</translation>
    </message>
</context>
<context>
    <name>FieldSelector</name>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="18"/>
        <source>Disp U</source>
        <translation>Despl. U</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="19"/>
        <source>Disp V</source>
        <translation>Despl. V</translation>
    </message>
</context>
<context>
    <name>FrameNavigator</name>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="59"/>
        <source>Previous frame</source>
        <translation>Fotograma anterior</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="69"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="170"/>
        <source>Play animation</source>
        <translation>Reproducir animación</translation>
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
        <translation>Fotograma siguiente</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="93"/>
        <source>Playback speed</source>
        <translation>Velocidad de reproducción</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="98"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="194"/>
        <source>FRAME 0/0</source>
        <translation>FOTOGRAMA 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="159"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="160"/>
        <source>Pause animation</source>
        <translation>Pausar animación</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="191"/>
        <source>FRAME %1/%2</source>
        <translation>FOTOGRAMA %1/%2</translation>
    </message>
</context>
<context>
    <name>ImageCanvas</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1048"/>
        <source>Load images first before drawing a Region of Interest.</source>
        <translation>Cargue primero las imágenes antes de dibujar una región de interés.</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1067"/>
        <source>The three points are nearly collinear — pick points spread around the circle&apos;s edge.</source>
        <translation>Los tres puntos son casi colineales — elija puntos repartidos por el borde del círculo.</translation>
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
        <translation>Nombre de archivo</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="97"/>
        <source>Region</source>
        <comment>Image list column: ROI status</comment>
        <translation>Región</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="190"/>
        <location filename="../../gui/widgets/image_list.py" line="248"/>
        <source>Add</source>
        <translation>Añadir</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="242"/>
        <source>Edit</source>
        <translation>Editar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="245"/>
        <source>Need</source>
        <translation>Falta</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="362"/>
        <source>Import Region of Interest for %n frame(s)</source>
        <translation>Importar región de interés para %n fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="378"/>
        <source>Clear Region of Interest (%1 with region)</source>
        <translation>Borrar región de interés (%1 con región)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="382"/>
        <source>Clear Region of Interest</source>
        <translation>Borrar región de interés</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="393"/>
        <source>Delete %n image(s)</source>
        <translation>Eliminar %n imágenes</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="496"/>
        <source>Images</source>
        <translation>Imágenes</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="497"/>
        <source>All Files</source>
        <translation>Todos los archivos</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="506"/>
        <source>Selected %1 files for %2 frames — count must match</source>
        <translation>Seleccionados %1 archivos para %2 fotogramas — las cantidades deben coincidir</translation>
    </message>
</context>
<context>
    <name>InitGuessWidget</name>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="80"/>
        <source>Starting Points</source>
        <translation>Puntos de inicio</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="84"/>
        <source>Place a few points; pyALDIC bootstraps each with a single-point NCC and propagates the field along mesh neighbours.

Best for:
• Large inter-frame displacement (&gt; 50 px)
• Discontinuous fields (cracks, shear bands)
• Scenarios where FFT picks wrong peaks

Auto-placed per region when you draw or edit an ROI.</source>
        <translation>Coloque algunos puntos; pyALDIC inicializa cada uno con una NCC puntual y propaga el campo a lo largo de los vecinos de la malla.

Ideal para:
• Grandes desplazamientos entre fotogramas (&gt; 50 px)
• Campos discontinuos (grietas, bandas de cortante)
• Escenarios donde la FFT elige picos incorrectos

Se colocan automáticamente por región al dibujar o editar una ROI.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="100"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="281"/>
        <source>Place Starting Points</source>
        <translation>Colocar puntos de inicio</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="103"/>
        <source>Enter placement mode on the canvas. Left-click to add, right-click to remove, Esc or click again to exit.</source>
        <translation>Entrar en modo de colocación en el lienzo. Clic izquierdo para añadir, clic derecho para eliminar, Esc o nuevo clic para salir.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="107"/>
        <source>Auto-place</source>
        <translation>Colocación automática</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="109"/>
        <source>Fill empty regions with the highest-NCC node in each. Existing Starting Points are preserved.</source>
        <translation>Rellenar las regiones vacías con el nodo de mayor NCC en cada una. Se conservan los puntos de inicio existentes.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="113"/>
        <source>Clear</source>
        <translation>Limpiar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="115"/>
        <source>Remove every Starting Point. Faster than right-clicking each one individually.</source>
        <translation>Eliminar todos los puntos de inicio. Más rápido que hacer clic derecho en cada uno.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="122"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="292"/>
        <source>%1 / %2 regions ready</source>
        <translation>%1 / %2 regiones listas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="141"/>
        <source>FFT (cross-correlation)</source>
        <translation>FFT (correlación cruzada)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="145"/>
        <source>Full-grid normalized cross-correlation. Robust within the search radius; the search auto-expands when peaks clip.

Best for:
• Small-to-moderate smooth motion
• Well-textured speckle
• No special user setup needed

Cost grows with the search radius, so very large displacements become slow.</source>
        <translation>Correlación cruzada normalizada en toda la cuadrícula. Robusta dentro del radio de búsqueda; la búsqueda se expande automáticamente cuando los picos se recortan.

Ideal para:
• Movimientos suaves pequeños o moderados
• Moteado bien texturado
• No se requiere configuración especial del usuario

El coste crece con el radio de búsqueda, por lo que desplazamientos muy grandes se vuelven lentos.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="163"/>
        <source>Every</source>
        <translation>Cada</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="165"/>
        <source>Run FFT every N frames. N = 1 means FFT every frame (safest, slowest). N &gt; 1 uses warm-start between resets to limit error propagation to N frames.</source>
        <translation>Ejecutar FFT cada N fotogramas. N = 1 significa FFT en cada fotograma (más seguro, más lento). N &gt; 1 usa arranque en caliente entre reinicios para limitar la propagación de errores a N fotogramas.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="175"/>
        <source>(N=1 = every frame)</source>
        <translation>(N=1 = cada fotograma)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="184"/>
        <source>Only when reference frame updates (incremental only)</source>
        <translation>Solo cuando se actualiza el fotograma de referencia (solo incremental)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="187"/>
        <source>Run FFT whenever the reference frame changes; warm-start within each segment. Typical default for incremental mode.</source>
        <translation>Ejecutar FFT siempre que cambie el fotograma de referencia; arranque en caliente dentro de cada segmento. Valor predeterminado típico para el modo incremental.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="198"/>
        <source>Previous frame</source>
        <translation>Fotograma anterior</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="202"/>
        <source>Use the previous frame&apos;s converged displacement as the initial guess. No cross-correlation runs.

Best for:
• Very small inter-frame motion (a few pixels)
• Fastest option when motion is smooth

Errors can accumulate over long sequences. Prefer FFT or Starting Points on noisy data or when motion is larger.</source>
        <translation>Usar el desplazamiento convergido del fotograma anterior como estimación inicial. No se ejecuta correlación cruzada.

Ideal para:
• Movimientos entre fotogramas muy pequeños (unos pocos píxeles)
• La opción más rápida cuando el movimiento es suave

Los errores pueden acumularse en secuencias largas. Prefiera FFT o puntos de inicio con datos ruidosos o cuando el movimiento sea mayor.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="280"/>
        <source>Placing... (click to exit)</source>
        <translation>Colocando… (clic para salir)</translation>
    </message>
</context>
<context>
    <name>LeftSidebar</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="178"/>
        <source>IMAGES</source>
        <translation>IMÁGENES</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="185"/>
        <source>Natural Sort (1, 2, …, 10)</source>
        <translation>Orden natural (1, 2, …, 10)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="188"/>
        <source>Sort by embedded numbers: image1, image2, …, image10
Default (unchecked): lexicographic — best for zero-padded names</source>
        <translation>Ordenar por números incrustados: image1, image2, …, image10
Predeterminado (desmarcado): lexicográfico — ideal para nombres con ceros a la izquierda</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="261"/>
        <source>WORKFLOW TYPE</source>
        <translation>TIPO DE FLUJO</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="274"/>
        <source>INITIAL GUESS</source>
        <translation>ESTIMACIÓN INICIAL</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="281"/>
        <source>REGION OF INTEREST</source>
        <translation>REGIÓN DE INTERÉS</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="291"/>
        <source>PARAMETERS</source>
        <translation>PARÁMETROS</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="297"/>
        <source>ADVANCED</source>
        <translation>AVANZADO</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../../gui/app.py" line="199"/>
        <source>&amp;File</source>
        <translation>Archivo</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="201"/>
        <source>Open Session…</source>
        <translation>Abrir sesión…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="206"/>
        <source>Save Session…</source>
        <translation>Guardar sesión…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="215"/>
        <source>Associate .aldic files with pyALDIC…</source>
        <translation>Asociar archivos .aldic con pyALDIC…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="217"/>
        <source>Register .aldic so double-clicking a session file opens pyALDIC (current user only, no admin rights needed).</source>
        <translation>Registra .aldic para que hacer doble clic en un archivo de sesión abra pyALDIC (solo el usuario actual, sin permisos de administrador).</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="223"/>
        <source>Quit</source>
        <translation>Salir</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="231"/>
        <source>&amp;Settings</source>
        <translation>Configuración</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="232"/>
        <source>Language</source>
        <translation>Idioma</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="261"/>
        <source>Language changed</source>
        <translation>Idioma cambiado</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="264"/>
        <source>Language set to %1. Please restart pyALDIC for all widgets to pick up the new language.</source>
        <translation>Idioma establecido en %1. Reinicie pyALDIC para que todos los elementos adopten el nuevo idioma.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="278"/>
        <source>Save Session</source>
        <translation>Guardar sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="280"/>
        <location filename="../../gui/app.py" line="329"/>
        <source>pyALDIC Session</source>
        <translation>Sesión de pyALDIC</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="281"/>
        <location filename="../../gui/app.py" line="330"/>
        <source>All Files</source>
        <translation>Todos los archivos</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="294"/>
        <source>large</source>
        <translation>grande</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="297"/>
        <source>Include Results?</source>
        <translation>¿Incluir resultados?</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="299"/>
        <source>Include the computed results in this session?</source>
        <translation>¿Incluir los resultados calculados en esta sesión?</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="302"/>
        <source>Including results (about %1 uncompressed) lets you reopen the session without recomputing. Choose No to save a small configuration-only file for sharing.</source>
        <translation>Incluir los resultados (unos %1 sin comprimir) permite reabrir la sesión sin recalcular. Elija No para guardar un pequeño archivo solo de configuración para compartir.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="315"/>
        <source>Saving Session</source>
        <translation>Guardando sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="320"/>
        <source>Save Session Failed</source>
        <translation>Error al guardar la sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="327"/>
        <source>Open Session</source>
        <translation>Abrir sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="342"/>
        <source>Loading Session</source>
        <translation>Cargando sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="345"/>
        <location filename="../../gui/app.py" line="380"/>
        <source>Open Session Failed</source>
        <translation>Error al abrir la sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="354"/>
        <source>Locate Session Images</source>
        <translation>Localizar imágenes de la sesión</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="357"/>
        <source>The image folder saved with this session was not found:
%1

Results were restored. To show the background images, select the folder that now contains them.</source>
        <translation>No se encontró la carpeta de imágenes guardada con esta sesión:
%1

Los resultados se restauraron. Para mostrar las imágenes de fondo, seleccione la carpeta que ahora las contiene.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="365"/>
        <source>Select Image Folder</source>
        <translation>Seleccionar carpeta de imágenes</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="434"/>
        <source>File Association Failed</source>
        <translation>Error al asociar archivos</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="435"/>
        <source>Could not register .aldic files: </source>
        <translation>No se pudieron registrar los archivos .aldic: </translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="438"/>
        <source>File Association</source>
        <translation>Asociación de archivos</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="439"/>
        <source>Done. Double-clicking a .aldic file will now open pyALDIC and restore that session.</source>
        <translation>Listo. Ahora, hacer doble clic en un archivo .aldic abrirá pyALDIC y restaurará esa sesión.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="786"/>
        <location filename="../../gui/app.py" line="839"/>
        <source>Load images first.</source>
        <translation>Cargue primero las imágenes.</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="888"/>
        <source>  Imported mask for frame %1</source>
        <translation>  Máscara importada para el fotograma %1</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="894"/>
        <source>Batch import: %n mask(s) loaded</source>
        <translation>Importación por lotes: %n máscara(s) cargada(s)</translation>
    </message>
</context>
<context>
    <name>MeshAppearanceWidget</name>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="38"/>
        <source>Mesh color</source>
        <translation>Color de malla</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="41"/>
        <source>Click to choose mesh line color</source>
        <translation>Haga clic para elegir el color de las líneas de la malla</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="50"/>
        <source>Line width</source>
        <translation>Grosor de línea</translation>
    </message>
</context>
<context>
    <name>ParamPanel</name>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="37"/>
        <source>Subset Size</source>
        <translation>Tamaño del subconjunto</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="43"/>
        <source>IC-GN subset window size in pixels (odd number)</source>
        <translation>Tamaño de la ventana del subconjunto IC-GN en píxeles (número impar)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="50"/>
        <source>Subset Step</source>
        <translation>Paso del subconjunto</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="53"/>
        <source>Node spacing in pixels (must be power of 2)</source>
        <translation>Espaciado de nodos en píxeles (debe ser potencia de 2)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="61"/>
        <location filename="../../gui/widgets/param_panel.py" line="186"/>
        <source>Search Range</source>
        <translation>Rango de búsqueda</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="76"/>
        <source>Refine Inner Boundary</source>
        <translation>Refinar borde interior</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="79"/>
        <source>Locally refine the mesh along internal mask boundaries
(holes inside the Region of Interest). Useful for bubble / void edges.</source>
        <translation>Refinar localmente la malla a lo largo de los bordes internos de la máscara
(agujeros dentro de la región de interés). Útil para bordes de burbujas o huecos.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="83"/>
        <source>Refine Outer Boundary</source>
        <translation>Refinar borde exterior</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="86"/>
        <source>Locally refine the mesh along the outer Region of Interest
boundary.</source>
        <translation>Refinar localmente la malla a lo largo del borde exterior de la región de interés.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="102"/>
        <source>Refinement aggressiveness. min element size = max(2, subset_step / 2^level). Applies uniformly to inner-, outer-boundary AND brush-painted refinement zones. Available levels depend on subset size and subset step.</source>
        <translation>Intensidad del refinamiento. Tamaño mínimo de elemento = max(2, subset_step / 2^nivel). Se aplica uniformemente a bordes interiores, exteriores Y zonas pintadas con el pincel. Los niveles disponibles dependen del tamaño y el paso del subconjunto.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="108"/>
        <source>Refinement Level</source>
        <translation>Nivel de refinamiento</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="167"/>
        <source>Maximum per-frame displacement the FFT search can detect (pixels).
Set comfortably larger than the expected inter-frame motion.
For large rotations in incremental mode, this must cover
  radius × sin(per-step angle).</source>
        <translation>Desplazamiento máximo por fotograma que puede detectar la búsqueda FFT (píxeles).
Configúrelo claramente mayor que el movimiento esperado entre fotogramas.
Para grandes rotaciones en modo incremental, debe cubrir:
  radio × sin(ángulo por paso).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="174"/>
        <source>Initial half-width (pixels) of the single-point NCC search at each Starting Point.
Auto-expands 2x per retry if the peak is clipped, up to image half-size.
Only affects Starting Point bootstrap; other nodes use F-aware propagation (no per-node search).</source>
        <translation>Semianchura inicial (píxeles) de la búsqueda NCC puntual en cada punto de inicio.
Se expande automáticamente 2× por reintento si el pico se recorta, hasta la mitad del tamaño de la imagen.
Solo afecta a la inicialización de los puntos de inicio; los demás nodos usan propagación F-aware (sin búsqueda por nodo).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="182"/>
        <source>Initial Seed Search</source>
        <translation>Búsqueda inicial de semilla</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="218"/>
        <source>Light</source>
        <comment>Mesh refinement severity</comment>
        <translation>Ligero</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="219"/>
        <source>Medium</source>
        <comment>Mesh refinement severity</comment>
        <translation>Medio</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="220"/>
        <source>Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>Fuerte</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="221"/>
        <source>Extra Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>Muy fuerte</translation>
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
        <location filename="../../gui/widgets/param_panel.py" line="250"/>
        <source>min element size = %1 px  (subset_step=%2, level=%3)</source>
        <translation>tamaño mín. de elemento = %1 px  (subset_step=%2, nivel=%3)</translation>
    </message>
</context>
<context>
    <name>PhysicalUnitsWidget</name>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="54"/>
        <source>Use physical units</source>
        <translation>Usar unidades físicas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="65"/>
        <source>Physical size of one image pixel</source>
        <translation>Tamaño físico de un píxel de la imagen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="80"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="83"/>
        <source>Pixel size</source>
        <translation>Tamaño de píxel</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="93"/>
        <source>Acquisition frame rate (used for velocity field)</source>
        <translation>Frecuencia de adquisición (usada para el campo de velocidad)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="94"/>
        <source>Frame rate</source>
        <translation>Velocidad de fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="162"/>
        <source>Disp: %1  Velocity: %2/s</source>
        <translation>Despl.: %1  Velocidad: %2/s</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="167"/>
        <source>Disp: px  Velocity: px/fr</source>
        <translation>Despl.: px  Velocidad: px/fot.</translation>
    </message>
</context>
<context>
    <name>PipelineController</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="394"/>
        <source>Building pipeline configuration...</source>
        <translation>Construyendo configuración del flujo…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="552"/>
        <source>Loading images...</source>
        <translation>Cargando imágenes…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="565"/>
        <source>  Loaded %1 images, shape=%2</source>
        <translation>  %1 imágenes cargadas, forma=%2</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="578"/>
        <source>  ROI mask: %1, %2 pixels (%3%)</source>
        <translation>  Máscara ROI: %1, %2 píxeles (%3%)</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="604"/>
        <source>Run cancelled: define per-frame Regions of Interest for the missing reference frames or accept the inherited frame-1 mask in the next run.</source>
        <translation>Ejecución cancelada: defina regiones de interés por fotograma para los fotogramas de referencia que faltan, o acepte la máscara heredada del fotograma 1 en la próxima ejecución.</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="625"/>
        <source>  %n frame(s) with custom ROI masks</source>
        <translation>  %n fotogramas con máscaras ROI personalizadas</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="755"/>
        <source>Results received: %n frame(s)</source>
        <translation>Resultados recibidos: %n fotogramas</translation>
    </message>
</context>
<context>
    <name>PipelineWorker</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="209"/>
        <source>Starting DIC analysis...</source>
        <translation>Iniciando análisis DIC…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="257"/>
        <source>Analysis complete in %1s</source>
        <translation>Análisis completado en %1 s</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="250"/>
        <location filename="../../gui/controllers/pipeline_controller.py" line="265"/>
        <source>Analysis stopped by user.</source>
        <translation>Análisis detenido por el usuario.</translation>
    </message>
</context>
<context>
    <name>ROIHint</name>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="62"/>
        <source>Load images first, then draw a Region of Interest on frame 1.</source>
        <translation>Cargue primero las imágenes y luego dibuje una región de interés en el fotograma 1.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="69"/>
        <source>&lt;b&gt;Accumulative mode&lt;/b&gt; — only frame 1 needs a Region of Interest. All later frames are compared against it directly.</source>
        <translation>&lt;b&gt;Modo acumulativo&lt;/b&gt; — solo el fotograma 1 requiere una región de interés. Todos los fotogramas posteriores se comparan directamente con ella.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="79"/>
        <source>&lt;b&gt;Incremental, every frame&lt;/b&gt; — frame 1 needs a Region of Interest. It is automatically warped forward to each later frame (no per-frame drawing required).</source>
        <translation>&lt;b&gt;Incremental, cada fotograma&lt;/b&gt; — el fotograma 1 requiere una región de interés. Se propaga automáticamente hacia cada fotograma posterior (no es necesario dibujar por fotograma).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="96"/>
        <source>&lt;b&gt;Incremental, every %1 frames&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%2&lt;/b&gt; (%3 reference frames total).</source>
        <translation>&lt;b&gt;Incremental, cada %1 fotogramas&lt;/b&gt; — dibuje una región de interés en los fotogramas: &lt;b&gt;%2&lt;/b&gt; (%3 fotogramas de referencia en total).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="110"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — no custom reference frames set. Frame 1 will be the only reference; add more indices in the Reference Frames field.</source>
        <translation>&lt;b&gt;Incremental, personalizado&lt;/b&gt; — no hay fotogramas de referencia personalizados definidos. El fotograma 1 será la única referencia; añada más índices en el campo «Fotogramas de referencia».</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="120"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%1&lt;/b&gt; (%2 reference frames total).</source>
        <translation>&lt;b&gt;Incremental, personalizado&lt;/b&gt; — dibuje una región de interés en los fotogramas: &lt;b&gt;%1&lt;/b&gt; (%2 fotogramas de referencia en total).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="128"/>
        <source>Draw a Region of Interest on frame 1.</source>
        <translation>Dibuje una región de interés en el fotograma 1.</translation>
    </message>
</context>
<context>
    <name>ROIToolbar</name>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="72"/>
        <source>+ Add</source>
        <translation>+ Añadir</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="74"/>
        <source>Add region to the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>Añadir región a la región de interés (Polígono / Rectángulo / Círculo)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="79"/>
        <source>Cut</source>
        <translation>Recortar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="81"/>
        <source>Cut region from the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>Recortar región de la región de interés (Polígono / Rectángulo / Círculo)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="86"/>
        <source>+ Refine</source>
        <translation>+ Refinar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="90"/>
        <source>Paint extra mesh-refinement zones with a brush
(only on frame 1 — material points auto-warped to later frames)</source>
        <translation>Pintar zonas adicionales de refinamiento de malla con un pincel
(solo en el fotograma 1 — los puntos materiales se propagan automáticamente a los fotogramas posteriores)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="94"/>
        <source>Refine brush is only available on frame 1. Switch to frame 1 to paint refinement zones; they are automatically warped to later frames.</source>
        <translation>El pincel de refinamiento solo está disponible en el fotograma 1. Cambie al fotograma 1 para pintar zonas de refinamiento; se propagan automáticamente a los fotogramas posteriores.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="118"/>
        <source>Import</source>
        <translation>Importar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="119"/>
        <source>Import mask from image file</source>
        <translation>Importar máscara desde archivo de imagen</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="124"/>
        <source>Batch Import</source>
        <translation>Importación por lotes</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="126"/>
        <source>Batch import mask files for multiple frames</source>
        <translation>Importar por lotes archivos de máscara para varios fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="139"/>
        <source>Save</source>
        <translation>Guardar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="140"/>
        <source>Save current mask to PNG file</source>
        <translation>Guardar la máscara actual en archivo PNG</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="145"/>
        <source>Invert</source>
        <translation>Invertir</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="147"/>
        <source>Invert the Region of Interest mask</source>
        <translation>Invertir la máscara de la región de interés</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="152"/>
        <source>Clear</source>
        <translation>Limpiar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="154"/>
        <source>Clear all Region of Interest masks</source>
        <translation>Limpiar todas las máscaras de región de interés</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="186"/>
        <source>Radius</source>
        <translation>Radio</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="204"/>
        <source>Paint</source>
        <translation>Pintar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="209"/>
        <source>Erase</source>
        <translation>Borrar</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="219"/>
        <source>Clear Brush</source>
        <translation>Limpiar pincel</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="256"/>
        <source>Circle (3-point)</source>
        <translation>Círculo (3 puntos)</translation>
    </message>
</context>
<context>
    <name>RightSidebar</name>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="58"/>
        <source>Run DIC Analysis</source>
        <translation>Ejecutar análisis DIC</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="71"/>
        <source>Cancel</source>
        <translation>Cancelar</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="76"/>
        <source>Cancel the current analysis. Frames already computed are kept so you can review or export the partial run.</source>
        <translation>Cancelar el análisis actual. Los fotogramas ya calculados se conservan, por lo que puede revisar o exportar la ejecución parcial.</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="84"/>
        <source>Export Results</source>
        <translation>Exportar resultados</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="92"/>
        <source>Open Strain Window</source>
        <translation>Abrir ventana de deformación</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="95"/>
        <source>Compute and visualize strain in a separate post-processing window. Requires displacement results from a completed Run.</source>
        <translation>Calcular y visualizar la deformación en una ventana de post-procesado separada. Requiere resultados de desplazamiento de una ejecución completada.</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="104"/>
        <source>PROGRESS</source>
        <translation>PROGRESO</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="113"/>
        <location filename="../../gui/panels/right_sidebar.py" line="350"/>
        <source>Ready</source>
        <translation>Listo</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="121"/>
        <location filename="../../gui/panels/right_sidebar.py" line="352"/>
        <location filename="../../gui/panels/right_sidebar.py" line="406"/>
        <source>ELAPSED  %1</source>
        <translation>TRANSCURRIDO  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="126"/>
        <location filename="../../gui/panels/right_sidebar.py" line="354"/>
        <location filename="../../gui/panels/right_sidebar.py" line="414"/>
        <location filename="../../gui/panels/right_sidebar.py" line="418"/>
        <source>REMAINING  %1</source>
        <translation>RESTANTE  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="134"/>
        <source>FIELD</source>
        <translation>CAMPO</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="141"/>
        <source>Show on deformed frame</source>
        <translation>Mostrar en fotograma deformado</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="144"/>
        <source>When checked, overlay results on the deformed (current) frame instead of the reference frame</source>
        <translation>Si está activado, los resultados se superponen sobre el fotograma deformado (actual) en lugar del fotograma de referencia</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="151"/>
        <source>VISUALIZATION</source>
        <translation>VISUALIZACIÓN</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="156"/>
        <source>Colormap</source>
        <translation>Paleta de colores</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="177"/>
        <source>Opacity</source>
        <translation>Opacidad</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="184"/>
        <source>Overlay opacity (0 = transparent, 100 = opaque)</source>
        <translation>Opacidad de la superposición (0 = transparente, 100 = opaco)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="190"/>
        <source>PHYSICAL UNITS</source>
        <translation>UNIDADES FÍSICAS</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="196"/>
        <source>LOG</source>
        <translation>REGISTRO</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="202"/>
        <source>Clear</source>
        <translation>Limpiar</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="319"/>
        <source>Place at least one Starting Point in each red region before running (red = needs a Starting Point).</source>
        <translation>Coloque al menos un punto de inicio en cada región roja antes de ejecutar (rojo = requiere punto de inicio).</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="389"/>
        <source>%1  —  Frame %2</source>
        <translation>%1  —  Fotograma %2</translation>
    </message>
</context>
<context>
    <name>StrainFieldSelector</name>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="150"/>
        <source>DISPLACEMENT</source>
        <translation>DESPLAZAMIENTO</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="161"/>
        <source>STRAIN</source>
        <translation>DEFORMACIÓN</translation>
    </message>
</context>
<context>
    <name>StrainNavigator</name>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="73"/>
        <source>Previous frame</source>
        <translation>Fotograma anterior</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="84"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="216"/>
        <source>Play animation</source>
        <translation>Reproducir animación</translation>
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
        <translation>Fotograma siguiente</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="109"/>
        <source>Playback speed</source>
        <translation>Velocidad de reproducción</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="114"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="228"/>
        <source>FRAME 0/0</source>
        <translation>FOTOGRAMA 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="205"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="206"/>
        <source>Pause animation</source>
        <translation>Pausar animación</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="223"/>
        <source>FRAME %1/%2</source>
        <translation>FOTOGRAMA %1/%2</translation>
    </message>
</context>
<context>
    <name>StrainParamPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="85"/>
        <source>Plane fitting</source>
        <translation>Ajuste de plano</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="86"/>
        <source>FEM nodal</source>
        <translation>FEM nodal</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="88"/>
        <source>Method</source>
        <translation>Método</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="102"/>
        <source>VSG (Virtual Strain Gauge) size is the diameter, in pixels, of the circular region around each mesh node used to fit a local displacement plane. Strain is then taken as the plane&apos;s slope.

• Larger VSG → smoother strain, lower spatial resolution.
• Smaller VSG → sharper strain, more noise.
• Rule of thumb: VSG ≥ 2 × subset step + 1 (default: 41 px).

Not used when Method = FEM nodal (there, mesh spacing itself sets the gauge size).</source>
        <translation>El tamaño VSG (Virtual Strain Gauge, galga de deformación virtual) es el diámetro, en píxeles, de la región circular alrededor de cada nodo de malla utilizada para ajustar un plano de desplazamiento local. La deformación se toma como la pendiente de dicho plano.

• VSG más grande → deformación más suave, menor resolución espacial.
• VSG más pequeño → deformación más nítida, pero con más ruido.
• Regla práctica: VSG ≥ 2 × paso del subset + 1 (predeterminado: 41 px).

No se usa con Method = FEM nodal (allí el espaciado de la malla establece el tamaño).</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="115"/>
        <source>VSG size</source>
        <translation>Tamaño VSG</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="146"/>
        <source>Hides low-confidence strain at ROI / hole edges, where the VSG window crosses the boundary and the local plane fit becomes one-sided and unreliable.

• Coefficient × VSG radius = width of the trimmed boundary band.
• 0.00 = keep every node (no trimming).
• 0.70 = recommended (trims where edge error rises sharply).
• 1.00 = strictest (trim any node whose window touches the edge).

Only applies when Method = Plane fitting.</source>
        <translation>Oculta la deformación de baja confianza en los bordes de la ROI / huecos, donde la ventana VSG cruza el límite y el ajuste de plano local se vuelve unilateral y poco fiable.

• Coeficiente × radio VSG = ancho de la banda de borde recortada.
• 0.00 = conservar todos los nodos (sin recorte).
• 0.70 = recomendado (recorta donde el error de borde aumenta bruscamente).
• 1.00 = más estricto (recorta cualquier nodo cuya ventana toque el borde).

Solo se aplica cuando Método = Ajuste de plano.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="158"/>
        <source>Trim low-confidence edges</source>
        <translation>Recortar bordes de baja confianza</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="185"/>
        <source>Off</source>
        <comment>Strain smoothing preset</comment>
        <translation>Desactivado</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="186"/>
        <source>Light (σ = 0.5 × step)</source>
        <translation>Ligero (σ = 0,5 × step)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="187"/>
        <source>Medium (σ = 1 × step)</source>
        <translation>Medio (σ = 1 × step)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="188"/>
        <source>Strong (σ = 2 × step) ⚠</source>
        <translation>Fuerte (σ = 2 × step) ⚠</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="194"/>
        <source>Gaussian smoothing of the strain field after computation.
σ is the Gaussian kernel width; &apos;step&apos; = DIC node spacing.
  Light  (0.5 × step):  subtle, preserves fine features.
  Medium (1 × step):    balanced, recommended for noisy data.
  Strong (2 × step) ⚠:  aggressive, may blur real gradients.</source>
        <translation>Suavizado gaussiano del campo de deformación tras el cálculo.
σ es el ancho del núcleo gaussiano; «step» = espaciado de nodos DIC.
  Ligero  (0,5 × step): sutil, conserva detalles finos.
  Medio   (1 × step):   equilibrado, recomendado para datos ruidosos.
  Fuerte  (2 × step) ⚠: agresivo, puede difuminar gradientes reales.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="200"/>
        <source>Strain field smoothing</source>
        <translation>Suavizado del campo de deformación</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="205"/>
        <source>Infinitesimal</source>
        <translation>Infinitesimal</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="206"/>
        <source>Eulerian</source>
        <translation>Euleriana</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="207"/>
        <source>Green-Lagrangian</source>
        <translation>Green-Lagrange</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="209"/>
        <source>Strain type</source>
        <translation>Tipo de deformación</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="271"/>
        <source>Trimmed: %1 nodes (%2%)</source>
        <translation>Recortados: %1 nodos (%2%)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="342"/>
        <source>⚠ VSG radius (%1 px) &lt; DIC node spacing (%2 px); plane fit will fail. Use VSG ≥ %3 px or switch Method to FEM nodal.</source>
        <translation>⚠ Radio VSG (%1 px) &lt; espaciado de nodos DIC (%2 px); el ajuste de plano fallará. Use VSG ≥ %3 px o cambie Método a FEM nodal.</translation>
    </message>
</context>
<context>
    <name>StrainVizPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="68"/>
        <source>Show on deformed frame</source>
        <translation>Mostrar en fotograma deformado</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="70"/>
        <source>Deformed</source>
        <translation>Deformado</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="77"/>
        <source>Colormap</source>
        <translation>Mapa de colores</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="81"/>
        <source>Range</source>
        <translation>Rango</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="101"/>
        <source>Min</source>
        <translation>Mín</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="103"/>
        <source>Max</source>
        <translation>Máx</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="113"/>
        <source>Opacity</source>
        <translation>Opacidad</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="122"/>
        <source>Fill trimmed edges (display only)</source>
        <translation>Rellenar bordes recortados (solo visualización)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="126"/>
        <source>Re-interpolate the edge-trimmed strain band from reliable interior nodes. Affects the on-screen view and exported images/animations; exported data files always keep the trimmed edge as NaN.</source>
        <translation>Reinterpola la banda de deformación recortada en los bordes a partir de nodos interiores fiables. Afecta a la vista en pantalla y a las imágenes/animaciones exportadas; los archivos de datos exportados siempre mantienen el borde recortado como NaN.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="131"/>
        <source>Edges</source>
        <translation>Bordes</translation>
    </message>
</context>
<context>
    <name>StrainWindow</name>
    <message>
        <location filename="../../gui/strain_window.py" line="153"/>
        <source>Strain Post-Processing</source>
        <translation>Post-procesado de deformación</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="201"/>
        <source>Fit</source>
        <translation>Ajustar</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="202"/>
        <source>Fit image to viewport</source>
        <translation>Ajustar la imagen a la vista</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="208"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="209"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>Zoom al 100% (1:1)</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="212"/>
        <source>Zoom in</source>
        <translation>Acercar</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="217"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="270"/>
        <source>STRAIN PARAMETERS</source>
        <translation>PARÁMETROS DE DEFORMACIÓN</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="289"/>
        <source>Cancel</source>
        <translation>Cancelar</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="293"/>
        <source>Cancel the running strain computation. The previous strain result is kept.</source>
        <translation>Cancelar el cálculo de deformación en curso. Se conserva el resultado de deformación anterior.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="305"/>
        <source>Export displacement and strain results to NPZ / MAT / CSV / PNG</source>
        <translation>Exportar resultados de desplazamiento y deformación a NPZ / MAT / CSV / PNG</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="338"/>
        <source>FIELD</source>
        <translation>CAMPO</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="347"/>
        <source>VISUALIZATION</source>
        <translation>VISUALIZACIÓN</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="357"/>
        <source>PHYSICAL UNITS</source>
        <translation>UNIDADES FÍSICAS</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="366"/>
        <source>LOG</source>
        <translation>REGISTRO</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="463"/>
        <source>Strain compute failed: %1: %2</source>
        <translation>Fallo en el cálculo de deformación: %1: %2</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="471"/>
        <location filename="../../gui/strain_window.py" line="530"/>
        <source>Strain computation complete.</source>
        <translation>Cálculo de deformación completado.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="482"/>
        <source>Strain window: no displacement results to post-process.</source>
        <translation>Ventana de deformación: no hay resultados de desplazamiento para posprocesar.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="513"/>
        <source>Cancelling…</source>
        <translation>Cancelando…</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="547"/>
        <source>Strain computation cancelled.</source>
        <translation>Cálculo de deformación cancelado.</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="556"/>
        <source>Strain compute failed: %1</source>
        <translation>Fallo en el cálculo de deformación: %1</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="563"/>
        <source>Strain Computation Failed</source>
        <translation>Fallo en el cálculo de deformación</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="600"/>
        <source>⚠ Params changed -- click Compute Strain</source>
        <translation>⚠ Parámetros modificados — haga clic en «Calcular deformación»</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="218"/>
        <source>Zoom out</source>
        <translation>Alejar</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="280"/>
        <source>Compute Strain</source>
        <translation>Calcular deformación</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="302"/>
        <source>Export Results</source>
        <translation>Exportar resultados</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="493"/>
        <source>Starting…</source>
        <translation>Iniciando…</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="526"/>
        <source>Complete</source>
        <translation>Completado</translation>
    </message>
</context>
<context>
    <name>VelocitySettingsWidget</name>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="47"/>
        <source>Use physical units</source>
        <translation>Usar unidades físicas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="69"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="84"/>
        <source>Unit: px/frame</source>
        <translation>Unidad: px/fotograma</translation>
    </message>
</context>
<context>
    <name>WorkflowTypePanel</name>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="51"/>
        <source>Incremental</source>
        <translation>Incremental</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="52"/>
        <source>Accumulative</source>
        <translation>Acumulativo</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="57"/>
        <source>Incremental: each frame is compared to the previous reference frame.
Suitable for large accumulated deformation, required for large rotations.

Accumulative: every frame is compared to frame 1.
Accurate for small, monotonic deformation only.</source>
        <translation>Incremental: cada fotograma se compara con el fotograma de referencia anterior.
Adecuado para grandes deformaciones acumuladas; obligatorio en grandes rotaciones.

Acumulativo: cada fotograma se compara con el fotograma 1.
Preciso solo para deformaciones pequeñas y monótonas.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="64"/>
        <source>Tracking Mode</source>
        <translation>Modo de seguimiento</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="75"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="78"/>
        <source>Local DIC: Independent subset matching (IC-GN). Fast,
preserves sharp local features. Best for small
deformations or high-quality images.

AL-DIC: Augmented Lagrangian with global FEM
regularization. Enforces displacement compatibility
between subsets. Best for large deformations, noisy
images, or when strain accuracy matters.</source>
        <translation>Local DIC: Coincidencia de subconjuntos independiente (IC-GN). Rápido,
conserva detalles locales nítidos. Ideal para pequeñas
deformaciones o imágenes de alta calidad.

AL-DIC: Lagrangiano aumentado con regularización
FEM global. Impone compatibilidad de desplazamientos
entre subconjuntos. Ideal para grandes deformaciones, imágenes
con ruido o cuando la precisión de la deformación es importante.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="87"/>
        <source>Solver</source>
        <translation>Solucionador</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="104"/>
        <source>Every Frame</source>
        <translation>Cada fotograma</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="105"/>
        <source>Every N Frames</source>
        <translation>Cada N fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="106"/>
        <source>Custom Frames</source>
        <translation>Fotogramas personalizados</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="109"/>
        <source>When the reference frame refreshes during incremental tracking.
Every Frame: reset reference every frame (smallest per-step displacement,
most robust for large deformation).
Every N Frames: reset every N frames (balance speed vs robustness).
Custom Frames: user-defined list of reference frame indices.</source>
        <translation>Cuándo se actualiza el fotograma de referencia durante el seguimiento incremental.
Cada fotograma: reiniciar la referencia en cada fotograma (menor desplazamiento por paso,
más robusto para grandes deformaciones).
Cada N fotogramas: reiniciar cada N fotogramas (equilibrio entre velocidad y robustez).
Fotogramas personalizados: lista de índices definida por el usuario.</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="118"/>
        <source>Reference Update</source>
        <translation>Actualización de la referencia</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="128"/>
        <source>Update reference every N frames</source>
        <translation>Actualizar la referencia cada N fotogramas</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="130"/>
        <source>Interval</source>
        <translation>Intervalo</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="139"/>
        <source>Comma-separated frame indices to use as reference frames (0-based)</source>
        <translation>Índices de fotograma separados por comas para usar como fotogramas de referencia (base 0)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="143"/>
        <source>Reference Frames</source>
        <translation>Fotogramas de referencia</translation>
    </message>
</context>
<context>
    <name>_DropZone</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="120"/>
        <source>Drop image folder
or Browse</source>
        <translation>Arrastre la carpeta de imágenes
o Examinar</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="130"/>
        <source>Select Image Folder</source>
        <translation>Seleccionar carpeta de imágenes</translation>
    </message>
</context>
<context>
    <name>_MaskPreviewPanel</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="132"/>
        <source>Preview</source>
        <translation>Vista previa</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="136"/>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="262"/>
        <source>(no image)</source>
        <translation>(sin imagen)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="156"/>
        <source>Image only</source>
        <translation>Solo imagen</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="157"/>
        <source>Image + Mask</source>
        <translation>Imagen + máscara</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="158"/>
        <source>Mask only</source>
        <translation>Solo máscara</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="161"/>
        <source>View:</source>
        <translation>Vista:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="167"/>
        <source>Alpha:</source>
        <translation>Alfa:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="175"/>
        <source>Blue</source>
        <comment>Mask overlay color</comment>
        <translation>Azul</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="179"/>
        <source>Red</source>
        <comment>Mask overlay color</comment>
        <translation>Rojo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="183"/>
        <source>Green</source>
        <comment>Mask overlay color</comment>
        <translation>Verde</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="187"/>
        <source>Yellow</source>
        <comment>Mask overlay color</comment>
        <translation>Amarillo</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="191"/>
        <source>Mask color:</source>
        <translation>Color de máscara:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="268"/>
        <source>No mask assigned</source>
        <translation>Sin máscara asignada</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="274"/>
        <source>Frame %1 — %2</source>
        <translation>Fotograma %1 — %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="289"/>
        <source>Failed to load image</source>
        <translation>No se pudo cargar la imagen</translation>
    </message>
</context>
</TS>
