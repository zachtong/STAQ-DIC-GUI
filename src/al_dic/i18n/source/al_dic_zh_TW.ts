<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh_TW" sourcelanguage="en_US">
<context>
    <name>AdvancedTuningWidget</name>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="44"/>
        <source>AL-DIC Iterations</source>
        <translation>AL-DIC 迭代次數</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="55"/>
        <source>Number of global refinement cycles for the AL-DIC solver.
1 = single global pass (fastest), 3 = default,
5+ = diminishing returns for most cases.</source>
        <translation>AL-DIC 求解器的全域精修迭代次數。
1 = 單次全域求解（最快），3 = 預設值，
5 次以上大多數情況下收益遞減。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="61"/>
        <source>Only affects AL-DIC solver. Ignored by Local DIC.</source>
        <translation>僅對 AL-DIC 求解器生效，Local DIC 會忽略。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="74"/>
        <source>Auto-expand FFT search on clipped peaks</source>
        <translation>峰值被截斷時自動擴大 FFT 搜尋範圍</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="80"/>
        <source>When the NCC peak reaches the edge of the search region, automatically retry with a larger region (up to image half-size, 6 retries with 2x growth).

Only relevant for the FFT init-guess mode.</source>
        <translation>當 NCC 峰值觸及搜尋區域邊緣時，自動以更大的搜尋範圍重試（最大到影像一半尺寸，每次放大 2 倍，共 6 次重試）。

僅對 FFT 初始猜測模式有效。</translation>
    </message>
</context>
<context>
    <name>App</name>
    <message>
        <location filename="../../gui/app.py" line="797"/>
        <source>Imported Region of Interest for %n frame(s)</source>
        <translation>為 %n 影格匯入了感興趣區域</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="809"/>
        <source>Run DIC first -- no displacement results to post-process.</source>
        <translation>請先執行 DIC —— 目前沒有可後處理的位移結果。</translation>
    </message>
</context>
<context>
    <name>BatchImportDialog</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="365"/>
        <source>Batch Import Region of Interest Masks</source>
        <translation>批量匯入感興趣區域掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="405"/>
        <source>Mask Folder:</source>
        <translation>掩模資料夾：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="406"/>
        <source>(none)</source>
        <translation>（無）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="411"/>
        <source>Browse...</source>
        <translation>瀏覽…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="430"/>
        <source>Available Masks</source>
        <translation>可用掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="441"/>
        <source>Auto-Match by Name</source>
        <translation>按檔案名自動匹配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="443"/>
        <source>Match mask files to frames by number in filename</source>
        <translation>根據檔案名中的數字把掩模檔案匹配到對應幀</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="447"/>
        <source>Assign Sequential</source>
        <translation>順序分配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="449"/>
        <source>Assign masks to frames in order starting from frame 0</source>
        <translation>從第 0 幀起按順序把掩模分配給各幀</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="457"/>
        <source>Frame Assignments</source>
        <translation>幀分配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Frame</source>
        <translation>幀</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Image</source>
        <translation>影像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Mask</source>
        <translation>掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="471"/>
        <source>Assign Selected -&gt;</source>
        <translation>分配所選 -&gt;</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Pair selected mask(s) with selected frame(s)</source>
        <translation>將所選掩模與所選幀配對</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="477"/>
        <source>Clear All</source>
        <translation>全部清除</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="523"/>
        <source>Select Mask Folder</source>
        <translation>選擇遮罩資料夾</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="576"/>
        <source>Failed to read mask file.</source>
        <translation>無法讀取遮罩檔案。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="581"/>
        <source>Mismatched shape: %1×%2 (expected %3×%4)</source>
        <translation>尺寸不符：%1×%2（預期 %3×%4）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="659"/>
        <source>%n mask(s) have mismatched sizes and are disabled.</source>
        <translation>%n 個遮罩尺寸不符，已停用。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="712"/>
        <source>Invalid assignment</source>
        <translation>無效的指派</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="717"/>
        <source>A frame can only have one mask. Select exactly one mask, or select multiple frames to assign one mask to many.</source>
        <translation>一個影格只能對應一個遮罩。請選擇恰好一個遮罩，或選擇多個影格以將同一個遮罩套用到多個影格。</translation>
    </message>
</context>
<context>
    <name>CanvasArea</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1197"/>
        <source>Fit</source>
        <translation>適配</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1198"/>
        <source>Fit image to viewport</source>
        <translation>將影像適配到視口</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1203"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1204"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>縮放到 100%（1:1）</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1208"/>
        <source>Zoom in</source>
        <translation>放大</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1214"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1215"/>
        <source>Zoom out</source>
        <translation>縮小</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1228"/>
        <source>Show Grid</source>
        <translation>顯示網格</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1229"/>
        <source>Show/hide computational mesh grid</source>
        <translation>顯示/隱藏計算網格</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1232"/>
        <source>Show Subset</source>
        <translation>顯示子集</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1233"/>
        <source>Show subset window on hover (requires Grid)</source>
        <translation>懸停時顯示子集窗口（需要先開啟網格）</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1487"/>
        <source>Placing Starting Points</source>
        <translation>正在放置種子點</translation>
    </message>
</context>
<context>
    <name>CanvasConfigOverlay</name>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="41"/>
        <source>Mode</source>
        <translation>模式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="42"/>
        <source>Solver</source>
        <translation>求解器</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="43"/>
        <source>Init</source>
        <translation>初始猜測</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="93"/>
        <source>Accumulative</source>
        <translation>累積式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="94"/>
        <source>Incremental</source>
        <translation>增量式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="102"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="103"/>
        <source>ADMM (%1 iter)</source>
        <translation>ADMM（%1 次迭代）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="111"/>
        <source>Starting Points</source>
        <translation>種子點</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="113"/>
        <source>Previous frame</source>
        <translation>上一幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="115"/>
        <source>FFT every frame</source>
        <translation>每幀 FFT</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="116"/>
        <source>FFT every %1 fr</source>
        <translation>每 %1 幀 FFT</translation>
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
        <translation>範圍</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="30"/>
        <source>Auto</source>
        <translation>自動</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="41"/>
        <source>Min</source>
        <translation>最小</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="51"/>
        <source>Max</source>
        <translation>最大</translation>
    </message>
</context>
<context>
    <name>ExportDialog</name>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="396"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="779"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="922"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1231"/>
        <source>Auto</source>
        <translation>自動</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="420"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1256"/>
        <source>Opacity</source>
        <translation>不透明度</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="424"/>
        <source>Field opacity (0 = transparent, 1 = fully opaque)</source>
        <translation>欄位不透明度（0 = 透明，1 = 完全不透明）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="530"/>
        <source>All</source>
        <translation>全選</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="532"/>
        <source>None</source>
        <translation>全不選</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="561"/>
        <source>Export Results</source>
        <translation>匯出結果</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="581"/>
        <source>OUTPUT FOLDER</source>
        <translation>輸出資料夾</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="589"/>
        <source>Select output folder…</source>
        <translation>選擇輸出資料夾…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="593"/>
        <source>Browse…</source>
        <translation>瀏覽…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="598"/>
        <source>Open Folder</source>
        <translation>開啟資料夾</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="606"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理單位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="610"/>
        <source>Enable physical units</source>
        <translation>啟用物理單位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="615"/>
        <source>Scale displacement values by pixel size and show physical units on colorbar labels. Strain is dimensionless and unaffected.</source>
        <translation>按像素尺寸縮放位移值，並在色條標籤顯示物理單位。應變為無量綱，不受影響。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="630"/>
        <source>/ pixel</source>
        <translation>/ 像素</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="632"/>
        <source>Pixel size</source>
        <translation>像素尺寸</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="641"/>
        <source>fps</source>
        <translation>fps</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="643"/>
        <source>Frame rate</source>
        <translation>幀率</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="651"/>
        <source>Data</source>
        <translation>資料</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="652"/>
        <source>Images</source>
        <translation>影像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="653"/>
        <source>Animation</source>
        <translation>動畫</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="654"/>
        <source>Report</source>
        <translation>報告</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="656"/>
        <source>Preview &amp; Colorbar</source>
        <translation>預覽與色條</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="678"/>
        <source>FORMAT</source>
        <translation>格式</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="680"/>
        <source>NumPy Archive (.npz)</source>
        <translation>NumPy 歸檔 (.npz)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="682"/>
        <source>MATLAB (.mat)</source>
        <translation>MATLAB (.mat)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="684"/>
        <source>CSV (per frame)</source>
        <translation>CSV（逐幀）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="687"/>
        <source>NPZ: one file per frame (default: single merged file)</source>
        <translation>NPZ：逐幀一個檔案（預設：合併為單個檔案）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="695"/>
        <source>DISPLACEMENT</source>
        <translation>位移</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="704"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="731"/>
        <source>Select:</source>
        <translation>選擇：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="719"/>
        <source>STRAIN</source>
        <translation>應變</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="722"/>
        <source>Run Compute Strain first.</source>
        <translation>請先運行“計算應變”。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="749"/>
        <source>✓ Parameters file (JSON) always exported</source>
        <translation>✓ 參數檔案（JSON）始終匯出</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="755"/>
        <source>Export Data</source>
        <translation>匯出資料</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="776"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="919"/>
        <source>Export</source>
        <translation>匯出</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="777"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="920"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1164"/>
        <source>Field</source>
        <translation>欄位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="778"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="921"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1229"/>
        <source>Colormap</source>
        <translation>色彩對映</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="780"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="923"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1241"/>
        <source>Min</source>
        <translation>最小</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="781"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="924"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1248"/>
        <source>Max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="800"/>
        <source>IMAGE SETTINGS</source>
        <translation>影像設定</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="810"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="953"/>
        <source>Format</source>
        <translation>格式</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="818"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="961"/>
        <source>Full resolution</source>
        <translation>原始解析度</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="824"/>
        <source>Cap the exported image&apos;s long edge (the larger of width/height; aspect ratio is kept).
Field detail is bounded by the mesh, so a smaller cap is near-lossless
but much smaller on disk and faster to encode. Lower = faster. &apos;Full resolution&apos; keeps the native size.</source>
        <translation>限制匯出影像的長邊（寬與高中較大的一個；保持長寬比）。
場的細節由網格密度決定，因此較小的上限幾乎無損，
但檔案更小、編碼更快。越低越快。「原始解析度」保持原生尺寸。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="827"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="968"/>
        <source>Resolution (long edge)</source>
        <translation>解析度（長邊）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="965"/>
        <source>Cap the animation&apos;s long edge (the larger of width/height).
Lower = faster and much smaller. Strongly recommended for GIF, whose size explodes at native resolution.</source>
        <translation>限制動畫的長邊（寬與高中較大的一個）。
越低越快、越小。強烈建議用於 GIF：其體積在原生解析度下會急劇膨脹。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="835"/>
        <source>JPEG quality (higher = larger file). Ignored for PNG/TIFF.</source>
        <translation>JPEG 品質（越高檔案越大）。對 PNG/TIFF 無效。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="838"/>
        <source>JPEG quality</source>
        <translation>JPEG 品質</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="847"/>
        <source>DPI</source>
        <translation>DPI</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="849"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="994"/>
        <source>Include colorbar</source>
        <translation>包含色條</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="854"/>
        <source>Append a vertical colorbar strip to the right of each image.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>在每張影像右側添加一條垂直色條。
啟用自動範圍時，刻度標籤會依影格更新。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="859"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1004"/>
        <source>Original (frame 1 background)</source>
        <translation>原始配置（第 1 影格作背景）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="864"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1009"/>
        <source>Field is drawn at the original (undeformed) node positions.
Background image is always the first frame.</source>
        <translation>欄位繪製在原始（未變形）節點位置。
背景影像始終是第一影格。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="867"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1012"/>
        <source>Deformed (current frame background)</source>
        <translation>變形配置（當前影格作背景）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="873"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1018"/>
        <source>Field is drawn at the displaced node positions (reference + displacement).
Background image follows each frame&apos;s own photo.</source>
        <translation>欄位繪製在位移後節點位置（參考位置 + 位移）。
背景影像跟隨每影格自身的照片。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="877"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1022"/>
        <source>Render as</source>
        <translation>繪製為</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="895"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1038"/>
        <source>Cancel Export</source>
        <translation>取消匯出</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="900"/>
        <source>Export Images</source>
        <translation>匯出影像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="943"/>
        <source>ANIMATION SETTINGS</source>
        <translation>動畫設定</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="977"/>
        <source>FPS</source>
        <translation>影格率</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="989"/>
        <source>Export every Nth frame (1 = every frame). Higher is faster and smaller
but looks choppier. Playback duration is preserved (the FPS above is the pre-decimation rate).</source>
        <translation>每 N 幀匯出一幀（1 = 每幀都匯出）。越大越快、越小，
但看起來更卡頓。播放時長保持不變（上方 FPS 為抽幀前的幀率）。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="992"/>
        <source>Frame step</source>
        <translation>抽幀間隔</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="999"/>
        <source>Append a vertical colorbar strip to the right of each frame.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>在每一影格右側添加一條垂直色條。
啟用自動範圍時，刻度標籤會依影格更新。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1043"/>
        <source>Export Animation</source>
        <translation>匯出動畫</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1060"/>
        <source>CONTENT</source>
        <translation>內容</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1062"/>
        <source>Parameter summary table</source>
        <translation>參數摘要表</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1066"/>
        <source>Field statistics (min/max/mean/std per frame)</source>
        <translation>欄位統計（每影格 最小/最大/平均/標準差）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1068"/>
        <source>Sample field images</source>
        <translation>範例欄位影像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1075"/>
        <source>Sample every</source>
        <translation>每隔</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1081"/>
        <source>frames</source>
        <comment>Report: sample every N frames</comment>
        <translation>影格</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1087"/>
        <source>FIELDS</source>
        <translation>欄位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1090"/>
        <source>Displacement:</source>
        <translation>位移：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1105"/>
        <source>Strain:</source>
        <translation>應變：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1128"/>
        <source>Format: HTML (self-contained, view in any browser)</source>
        <translation>格式：HTML（自包含，可在任意瀏覽器中檢視）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1134"/>
        <source>Generate Report</source>
        <translation>產生報告</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1156"/>
        <source>Open this tab to render a preview.</source>
        <translation>開啟此分頁以算繪預覽。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1172"/>
        <source>Frame</source>
        <translation>影格</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1184"/>
        <source>COLORBAR STYLE</source>
        <translation>色條樣式</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1187"/>
        <source>Right</source>
        <translation>右</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1187"/>
        <source>Left</source>
        <translation>左</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1188"/>
        <source>Top</source>
        <translation>上</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1188"/>
        <source>Bottom</source>
        <translation>下</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1191"/>
        <source>Position</source>
        <translation>位置</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1197"/>
        <source>Font size</source>
        <translation>字級</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1205"/>
        <source>Bar thickness</source>
        <translation>色條粗細</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1208"/>
        <source>Black</source>
        <translation>黑色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1208"/>
        <source>White</source>
        <translation>白色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1211"/>
        <source>Background</source>
        <translation>背景</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1213"/>
        <source>Refresh preview</source>
        <translation>重新整理預覽</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1220"/>
        <source>FIELD APPEARANCE</source>
        <translation>欄位外觀</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1362"/>
        <source>Preview failed: </source>
        <translation>預覽失敗：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1377"/>
        <source>Enable a field on the Images tab to preview.</source>
        <translation>在 Images 頁啟用一個欄位以進行預覽。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1390"/>
        <source>No data for this field/frame.</source>
        <translation>該欄位/影格沒有資料。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1446"/>
        <source>FRAME RANGE</source>
        <translation>影格範圍</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1449"/>
        <source>All frames</source>
        <translation>所有影格</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1455"/>
        <source>From</source>
        <comment>Frame range: starting frame</comment>
        <translation>從</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1463"/>
        <source>to</source>
        <comment>Frame range: ending frame</comment>
        <translation>到</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1494"/>
        <source>Select Output Folder</source>
        <translation>選擇輸出資料夾</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1553"/>
        <source>Exported %1 files → %2</source>
        <translation>已匯出 %1 個檔案 → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1562"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1637"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1716"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1758"/>
        <source>Error: %1</source>
        <translation>錯誤：%1</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1587"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1665"/>
        <source>Starting…</source>
        <translation>開始中…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1610"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1688"/>
        <source>Rendering %1 (%2/%3)</source>
        <translation>正在繪製 %1 (%2/%3)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1616"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1694"/>
        <source>Frame %1/%2</source>
        <translation>影格 %1/%2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1626"/>
        <source>Exported %1 images → %2</source>
        <translation>已匯出 %1 張影像 → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1751"/>
        <source>Report saved → %1</source>
        <translation>報告已儲存 → %1</translation>
    </message>
</context>
<context>
    <name>FieldSelector</name>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="18"/>
        <source>Disp U</source>
        <translation>位移 U</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="19"/>
        <source>Disp V</source>
        <translation>位移 V</translation>
    </message>
</context>
<context>
    <name>FrameNavigator</name>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="59"/>
        <source>Previous frame</source>
        <translation>上一幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="69"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="170"/>
        <source>Play animation</source>
        <translation>播放動畫</translation>
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
        <translation>下一幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="93"/>
        <source>Playback speed</source>
        <translation>播放速度</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="98"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="194"/>
        <source>FRAME 0/0</source>
        <translation>第 0/0 幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="159"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="160"/>
        <source>Pause animation</source>
        <translation>暫停動畫</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="191"/>
        <source>FRAME %1/%2</source>
        <translation>影格 %1/%2</translation>
    </message>
</context>
<context>
    <name>ImageCanvas</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1044"/>
        <source>Load images first before drawing a Region of Interest.</source>
        <translation>請先載入影像，再繪製感興趣區域。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1064"/>
        <source>The three points are nearly collinear — pick points spread around the circle&apos;s edge.</source>
        <translation>三個點幾乎共線 — 請在圓周上分散地選取三個點。</translation>
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
        <translation>檔名</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="97"/>
        <source>Region</source>
        <comment>Image list column: ROI status</comment>
        <translation>區域</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="190"/>
        <location filename="../../gui/widgets/image_list.py" line="248"/>
        <source>Add</source>
        <translation>添加</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="242"/>
        <source>Edit</source>
        <translation>編輯</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="245"/>
        <source>Need</source>
        <translation>待繪</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="368"/>
        <source>Import Region of Interest for %n frame(s)</source>
        <translation>為 %n 影格匯入感興趣區域</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="378"/>
        <source>Clear Region of Interest (%1 with region)</source>
        <translation>清除感興趣區域（%1 影格已有區域）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="383"/>
        <source>Clear Region of Interest</source>
        <translation>清除感興趣區域</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="396"/>
        <source>Delete %n image(s)</source>
        <translation>刪除 %n 張影像</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="496"/>
        <source>Images</source>
        <translation>影像</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="497"/>
        <source>All Files</source>
        <translation>所有檔案</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="508"/>
        <source>Selected %1 files for %2 frames — count must match</source>
        <translation>已選擇 %1 個檔案用於 %2 影格 — 數量必須相符</translation>
    </message>
</context>
<context>
    <name>InitGuessWidget</name>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="80"/>
        <source>Starting Points</source>
        <translation>種子點</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="91"/>
        <source>Place a few points; pyALDIC bootstraps each with a single-point NCC and propagates the field along mesh neighbours.

Best for:
• Large inter-frame displacement (&gt; 50 px)
• Discontinuous fields (cracks, shear bands)
• Scenarios where FFT picks wrong peaks

Auto-placed per region when you draw or edit an ROI.</source>
        <translation>放置若干種子點；pyALDIC 在每個點上運行單點 NCC 引導，然後沿網格鄰居傳播位移場。

最適合：
• 大幀間位移（&gt; 50 px）
• 不連續場（裂紋、剪切帶）
• FFT 容易選錯峰的場景

繪製或編輯 ROI 時會為每個區域自動放置。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="100"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="282"/>
        <source>Place Starting Points</source>
        <translation>放置種子點</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="105"/>
        <source>Enter placement mode on the canvas. Left-click to add, right-click to remove, Esc or click again to exit.</source>
        <translation>在畫布上進入放置模式。左鍵添加、右鍵刪除，按 Esc 或再次點擊離開。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="107"/>
        <source>Auto-place</source>
        <translation>自動放置</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="111"/>
        <source>Fill empty regions with the highest-NCC node in each. Existing Starting Points are preserved.</source>
        <translation>在每個空區域填入 NCC 最高的節點。已有種子點會保留。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="113"/>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="117"/>
        <source>Remove every Starting Point. Faster than right-clicking each one individually.</source>
        <translation>移除所有種子點。比逐個右鍵刪除快。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="122"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="292"/>
        <source>%1 / %2 regions ready</source>
        <translation>%1 / %2 區域就緒</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="141"/>
        <source>FFT (cross-correlation)</source>
        <translation>FFT（互相關）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="152"/>
        <source>Full-grid normalized cross-correlation. Robust within the search radius; the search auto-expands when peaks clip.

Best for:
• Small-to-moderate smooth motion
• Well-textured speckle
• No special user setup needed

Cost grows with the search radius, so very large displacements become slow.</source>
        <translation>全網格歸一化互相關。在搜尋半徑內穩健；峰值被截斷時搜尋自動擴展。

最適合：
• 小到中等的平滑運動
• 紋理良好的散斑
• 不需要用戶額外設定

計算成本隨搜尋半徑增長，極大位移會變慢。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="163"/>
        <source>Every</source>
        <translation>每</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="168"/>
        <source>Run FFT every N frames. N = 1 means FFT every frame (safest, slowest). N &gt; 1 uses warm-start between resets to limit error propagation to N frames.</source>
        <translation>每 N 幀運行一次 FFT。N = 1 表示每幀都做 FFT（最安全但最慢）。N &gt; 1 在兩次重置之間使用熱啟動，將誤差傳播限制在 N 幀內。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="175"/>
        <source>(N=1 = every frame)</source>
        <translation>（N=1 即每幀）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="185"/>
        <source>Only when reference frame updates (incremental only)</source>
        <translation>僅在參考幀更新時（只對增量模式）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="189"/>
        <source>Run FFT whenever the reference frame changes; warm-start within each segment. Typical default for incremental mode.</source>
        <translation>參考幀變化時運行 FFT；每段內使用熱啟動。是增量模式的典型預設值。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="198"/>
        <source>Previous frame</source>
        <translation>上一幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="208"/>
        <source>Use the previous frame&apos;s converged displacement as the initial guess. No cross-correlation runs.

Best for:
• Very small inter-frame motion (a few pixels)
• Fastest option when motion is smooth

Errors can accumulate over long sequences. Prefer FFT or Starting Points on noisy data or when motion is larger.</source>
        <translation>使用前一幀收斂的位移作為初始猜測。不運行任何互相關。

最適合：
• 非常小的幀間運動（幾像素）
• 運動平滑時速度最快

長序列中誤差會累積。資料有噪聲或運動較大時請選 FFT 或種子點。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="280"/>
        <source>Placing... (click to exit)</source>
        <translation>放置中…（再次點擊離開）</translation>
    </message>
</context>
<context>
    <name>LeftSidebar</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="178"/>
        <source>IMAGES</source>
        <translation>影像</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="185"/>
        <source>Natural Sort (1, 2, …, 10)</source>
        <translation>自然排序（1, 2, …, 10）</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="190"/>
        <source>Sort by embedded numbers: image1, image2, …, image10
Default (unchecked): lexicographic — best for zero-padded names</source>
        <translation>按檔案名中的數字排序：image1, image2, …, image10
預設（不勾選）：字典序 — 適合已補零的檔案名</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="261"/>
        <source>WORKFLOW TYPE</source>
        <translation>工作流類型</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="274"/>
        <source>INITIAL GUESS</source>
        <translation>初始猜測</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="281"/>
        <source>REGION OF INTEREST</source>
        <translation>感興趣區域</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="291"/>
        <source>PARAMETERS</source>
        <translation>參數</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="297"/>
        <source>ADVANCED</source>
        <translation>高級</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../../gui/app.py" line="195"/>
        <source>&amp;File</source>
        <translation>檔案</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="197"/>
        <source>Open Session…</source>
        <translation>開啟會話…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="202"/>
        <source>Save Session…</source>
        <translation>儲存會話…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="208"/>
        <source>Quit</source>
        <translation>離開</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="216"/>
        <source>&amp;Settings</source>
        <translation>設定</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="217"/>
        <source>Language</source>
        <translation>語言</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="246"/>
        <source>Language changed</source>
        <translation>語言已切換</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="250"/>
        <source>Language set to %1. Please restart pyALDIC for all widgets to pick up the new language.</source>
        <translation>語言已切換至 %1。請重啟 pyALDIC 以讓所有界面生效。</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="261"/>
        <source>Save Session</source>
        <translation>儲存會話</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="263"/>
        <location filename="../../gui/app.py" line="290"/>
        <source>pyALDIC Session</source>
        <translation>pyALDIC 會話</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="264"/>
        <location filename="../../gui/app.py" line="292"/>
        <source>All Files</source>
        <translation>全部檔案</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="274"/>
        <source>Save Session Failed</source>
        <translation>儲存會話失敗</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="288"/>
        <source>Open Session</source>
        <translation>開啟會話</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="291"/>
        <source>JSON</source>
        <translation>JSON</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="300"/>
        <source>Open Session Failed</source>
        <translation>開啟會話失敗</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="652"/>
        <location filename="../../gui/app.py" line="705"/>
        <source>Load images first.</source>
        <translation>請先載入影像。</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="754"/>
        <source>  Imported mask for frame %1</source>
        <translation>  已匯入影格 %1 的遮罩</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="765"/>
        <source>Batch import: %n mask(s) loaded</source>
        <translation>批次匯入：已載入 %n 個遮罩</translation>
    </message>
</context>
<context>
    <name>MeshAppearanceWidget</name>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="38"/>
        <source>Mesh color</source>
        <translation>網格顏色</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="41"/>
        <source>Click to choose mesh line color</source>
        <translation>點擊選擇網格線顏色</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="50"/>
        <source>Line width</source>
        <translation>線寬</translation>
    </message>
</context>
<context>
    <name>ParamPanel</name>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="37"/>
        <source>Subset Size</source>
        <translation>子集尺寸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="43"/>
        <source>IC-GN subset window size in pixels (odd number)</source>
        <translation>IC-GN 子集窗口尺寸（像素，奇數）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="50"/>
        <source>Subset Step</source>
        <translation>子集步長</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="53"/>
        <source>Node spacing in pixels (must be power of 2)</source>
        <translation>節點間距（像素，必須是 2 的冪）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="61"/>
        <location filename="../../gui/widgets/param_panel.py" line="186"/>
        <source>Search Range</source>
        <translation>搜尋範圍</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="76"/>
        <source>Refine Inner Boundary</source>
        <translation>加密內部邊界</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="82"/>
        <source>Locally refine the mesh along internal mask boundaries
(holes inside the Region of Interest). Useful for bubble / void edges.</source>
        <translation>沿內部掩模邊界局部加密網格
（感興趣區域內部的孔洞）。適合氣泡 / 空洞邊緣。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="83"/>
        <source>Refine Outer Boundary</source>
        <translation>加密外部邊界</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="88"/>
        <source>Locally refine the mesh along the outer Region of Interest
boundary.</source>
        <translation>沿感興趣區域的外部邊界局部加密網格。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="106"/>
        <source>Refinement aggressiveness. min element size = max(2, subset_step / 2^level). Applies uniformly to inner-, outer-boundary AND brush-painted refinement zones. Available levels depend on subset size and subset step.</source>
        <translation>加密強度。最小單元尺寸 = max(2, 子集步長 / 2^級別)。對內部邊界、外部邊界和畫筆加密區域統一生效。可用級別取決於子集尺寸和步長。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="108"/>
        <source>Refinement Level</source>
        <translation>加密級別</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="173"/>
        <source>Maximum per-frame displacement the FFT search can detect (pixels).
Set comfortably larger than the expected inter-frame motion.
For large rotations in incremental mode, this must cover
  radius × sin(per-step angle).</source>
        <translation>FFT 搜尋可檢測到的每幀最大位移（像素）。
設定值應略大於預期的幀間運動。
對於增量模式下的大旋轉，該值必須覆蓋
  半徑 × sin(單步角度)。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="181"/>
        <source>Initial half-width (pixels) of the single-point NCC search at each Starting Point.
Auto-expands 2x per retry if the peak is clipped, up to image half-size.
Only affects Starting Point bootstrap; other nodes use F-aware propagation (no per-node search).</source>
        <translation>每個種子點處單點 NCC 搜尋的初始半寬（像素）。
若峰值被截斷，每次重試自動放大 2 倍，最大到影像一半尺寸。
僅影響種子點引導；其他節點使用 F-aware 傳播（無需逐節點搜尋）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="182"/>
        <source>Initial Seed Search</source>
        <translation>初始種子搜尋</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="218"/>
        <source>Light</source>
        <comment>Mesh refinement severity</comment>
        <translation>輕度</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="219"/>
        <source>Medium</source>
        <comment>Mesh refinement severity</comment>
        <translation>中等</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="220"/>
        <source>Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>強</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="221"/>
        <source>Extra Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>超強</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="222"/>
        <source>Ultra</source>
        <comment>Mesh refinement severity</comment>
        <translation>極限</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="228"/>
        <source>%1 (L%2)</source>
        <translation>%1 (L%2)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="252"/>
        <source>min element size = %1 px  (subset_step=%2, level=%3)</source>
        <translation>最小單元尺寸 = %1 px  (子集步長=%2, 級別=%3)</translation>
    </message>
</context>
<context>
    <name>PhysicalUnitsWidget</name>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="54"/>
        <source>Use physical units</source>
        <translation>使用物理單位</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="65"/>
        <source>Physical size of one image pixel</source>
        <translation>單個影像像素對應的物理尺寸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="80"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="83"/>
        <source>Pixel size</source>
        <translation>像素尺寸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="93"/>
        <source>Acquisition frame rate (used for velocity field)</source>
        <translation>採集幀率（用於速度場）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="94"/>
        <source>Frame rate</source>
        <translation>影格率</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="162"/>
        <source>Disp: %1  Velocity: %2/s</source>
        <translation>位移：%1  速度：%2/s</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="167"/>
        <source>Disp: px  Velocity: px/fr</source>
        <translation>位移：px  速度：px/幀</translation>
    </message>
</context>
<context>
    <name>PipelineController</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="373"/>
        <source>Building pipeline configuration...</source>
        <translation>正在構建流水線配置…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="530"/>
        <source>Loading images...</source>
        <translation>正在載入影像…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="545"/>
        <source>  Loaded %1 images, shape=%2</source>
        <translation>  已載入 %1 張影像，尺寸=%2</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="558"/>
        <source>  ROI mask: %1, %2 pixels (%3%)</source>
        <translation>  感興趣區域遮罩：%1，%2 像素（%3%）</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="586"/>
        <source>Run cancelled: define per-frame Regions of Interest for the missing reference frames or accept the inherited frame-1 mask in the next run.</source>
        <translation>已取消執行：請為缺失的參考影格定義逐影格感興趣區域，或在下次執行時接受繼承自第 1 影格的遮罩。</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="607"/>
        <source>  %n frame(s) with custom ROI masks</source>
        <translation>  %n 影格使用自訂感興趣區域遮罩</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="738"/>
        <source>Results received: %n frame(s)</source>
        <translation>已收到結果：%n 影格</translation>
    </message>
</context>
<context>
    <name>PipelineWorker</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="199"/>
        <source>Starting DIC analysis...</source>
        <translation>開始 DIC 分析…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="236"/>
        <source>Analysis complete in %1s</source>
        <translation>分析完成，耗時 %1 秒</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="244"/>
        <source>Analysis stopped by user.</source>
        <translation>使用者已停止分析。</translation>
    </message>
</context>
<context>
    <name>ROIHint</name>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="64"/>
        <source>Load images first, then draw a Region of Interest on frame 1.</source>
        <translation>請先載入影像，再在第 1 幀上繪製感興趣區域。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="72"/>
        <source>&lt;b&gt;Accumulative mode&lt;/b&gt; — only frame 1 needs a Region of Interest. All later frames are compared against it directly.</source>
        <translation>&lt;b&gt;累積模式&lt;/b&gt; — 只有第 1 幀需要感興趣區域。後續幀都直接與其比較。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="82"/>
        <source>&lt;b&gt;Incremental, every frame&lt;/b&gt; — frame 1 needs a Region of Interest. It is automatically warped forward to each later frame (no per-frame drawing required).</source>
        <translation>&lt;b&gt;增量模式，每幀&lt;/b&gt; — 第 1 幀需要感興趣區域。系統會自動將其扭曲到每個後續幀（無需逐幀繪製）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="99"/>
        <source>&lt;b&gt;Incremental, every %1 frames&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%2&lt;/b&gt; (%3 reference frames total).</source>
        <translation>&lt;b&gt;增量模式，每 %1 幀&lt;/b&gt; — 請在以下幀繪製感興趣區域：&lt;b&gt;%2&lt;/b&gt;（共 %3 個參考幀）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="113"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — no custom reference frames set. Frame 1 will be the only reference; add more indices in the Reference Frames field.</source>
        <translation>&lt;b&gt;增量模式，自定義&lt;/b&gt; — 未設定自定義參考幀。僅第 1 幀為參考；請在參考幀清單中添加更多索引。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="123"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%1&lt;/b&gt; (%2 reference frames total).</source>
        <translation>&lt;b&gt;增量模式，自定義&lt;/b&gt; — 請在以下幀繪製感興趣區域：&lt;b&gt;%1&lt;/b&gt;（共 %2 個參考幀）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="129"/>
        <source>Draw a Region of Interest on frame 1.</source>
        <translation>請在第 1 幀繪製感興趣區域。</translation>
    </message>
</context>
<context>
    <name>ROIToolbar</name>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="72"/>
        <source>+ Add</source>
        <translation>+ 添加</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="76"/>
        <source>Add region to the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>向感興趣區域添加形狀（多邊形 / 矩形 / 圓形）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="79"/>
        <source>Cut</source>
        <translation>裁剪</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="83"/>
        <source>Cut region from the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>從感興趣區域裁剪形狀（多邊形 / 矩形 / 圓形）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="86"/>
        <source>+ Refine</source>
        <translation>+ 加密</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="93"/>
        <source>Paint extra mesh-refinement zones with a brush
(only on frame 1 — material points auto-warped to later frames)</source>
        <translation>用畫筆繪製額外的網格加密區域
（僅在第 1 幀可用 — 網格點會自動扭曲到後續幀）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="98"/>
        <source>Refine brush is only available on frame 1. Switch to frame 1 to paint refinement zones; they are automatically warped to later frames.</source>
        <translation>加密畫筆僅在第 1 幀可用。切換到第 1 幀後可繪製加密區域；系統會自動將其扭曲到後續幀。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="118"/>
        <source>Import</source>
        <translation>匯入</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="119"/>
        <source>Import mask from image file</source>
        <translation>從影像檔案匯入掩模</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="124"/>
        <source>Batch Import</source>
        <translation>批量匯入</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="126"/>
        <source>Batch import mask files for multiple frames</source>
        <translation>批量匯入多幀的掩模檔案</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="139"/>
        <source>Save</source>
        <translation>儲存</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="140"/>
        <source>Save current mask to PNG file</source>
        <translation>將當前掩模儲存為 PNG 檔案</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="145"/>
        <source>Invert</source>
        <translation>反選</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="147"/>
        <source>Invert the Region of Interest mask</source>
        <translation>反轉感興趣區域掩模</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="152"/>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="154"/>
        <source>Clear all Region of Interest masks</source>
        <translation>清除所有感興趣區域掩模</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="186"/>
        <source>Radius</source>
        <translation>半徑</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="204"/>
        <source>Paint</source>
        <translation>繪製</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="209"/>
        <source>Erase</source>
        <translation>擦除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="219"/>
        <source>Clear Brush</source>
        <translation>清除畫筆</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="256"/>
        <source>Circle (3-point)</source>
        <translation>圓（三點）</translation>
    </message>
</context>
<context>
    <name>RightSidebar</name>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="58"/>
        <source>Run DIC Analysis</source>
        <translation>運行 DIC 分析</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="71"/>
        <source>Cancel</source>
        <translation>取消</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="78"/>
        <source>Cancel the current analysis. Already-computed frames are kept; the run is marked as IDLE (not DONE).</source>
        <translation>取消當前分析。已計算的幀會保留；運行狀態標記為 IDLE（非 DONE）。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="84"/>
        <source>Export Results</source>
        <translation>匯出結果</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="92"/>
        <source>Open Strain Window</source>
        <translation>開啟應變窗口</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="97"/>
        <source>Compute and visualize strain in a separate post-processing window. Requires displacement results from a completed Run.</source>
        <translation>在獨立的後處理窗口中計算並可視化應變。需先完成一次運行以獲得位移結果。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="104"/>
        <source>PROGRESS</source>
        <translation>進度</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="113"/>
        <location filename="../../gui/panels/right_sidebar.py" line="350"/>
        <source>Ready</source>
        <translation>就緒</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="121"/>
        <location filename="../../gui/panels/right_sidebar.py" line="352"/>
        <location filename="../../gui/panels/right_sidebar.py" line="406"/>
        <source>ELAPSED  %1</source>
        <translation>已用  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="126"/>
        <location filename="../../gui/panels/right_sidebar.py" line="354"/>
        <location filename="../../gui/panels/right_sidebar.py" line="414"/>
        <location filename="../../gui/panels/right_sidebar.py" line="418"/>
        <source>REMAINING  %1</source>
        <translation>剩餘  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="134"/>
        <source>FIELD</source>
        <translation>場變量</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="141"/>
        <source>Show on deformed frame</source>
        <translation>在變形幀上顯示</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="146"/>
        <source>When checked, overlay results on the deformed (current) frame instead of the reference frame</source>
        <translation>勾選後，將結果疊加在變形（當前）幀上，而非參考幀</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="151"/>
        <source>VISUALIZATION</source>
        <translation>可視化</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="156"/>
        <source>Colormap</source>
        <translation>色圖</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="177"/>
        <source>Opacity</source>
        <translation>透明度</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="184"/>
        <source>Overlay opacity (0 = transparent, 100 = opaque)</source>
        <translation>疊加圖透明度（0 = 透明，100 = 不透明）</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="190"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理單位</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="196"/>
        <source>LOG</source>
        <translation>日誌</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="202"/>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="321"/>
        <source>Place at least one Starting Point in each red region before running (red = needs a Starting Point).</source>
        <translation>運行前請在每個紅色區域放置至少一個種子點（紅色 = 需要種子點）。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="389"/>
        <source>%1  —  Frame %2</source>
        <translation>%1  —  第 %2 幀</translation>
    </message>
</context>
<context>
    <name>StrainFieldSelector</name>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="150"/>
        <source>DISPLACEMENT</source>
        <translation>位移</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="161"/>
        <source>STRAIN</source>
        <translation>應變</translation>
    </message>
</context>
<context>
    <name>StrainNavigator</name>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="73"/>
        <source>Previous frame</source>
        <translation>上一幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="84"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="216"/>
        <source>Play animation</source>
        <translation>播放動畫</translation>
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
        <translation>下一幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="109"/>
        <source>Playback speed</source>
        <translation>播放速度</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="114"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="228"/>
        <source>FRAME 0/0</source>
        <translation>第 0/0 幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="205"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="206"/>
        <source>Pause animation</source>
        <translation>暫停動畫</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="223"/>
        <source>FRAME %1/%2</source>
        <translation>影格 %1/%2</translation>
    </message>
</context>
<context>
    <name>StrainParamPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="85"/>
        <source>Plane fitting</source>
        <translation>平面擬合</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="86"/>
        <source>FEM nodal</source>
        <translation>有限元節點</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="88"/>
        <source>Method</source>
        <translation>方法</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="112"/>
        <source>VSG (Virtual Strain Gauge) size is the diameter, in pixels, of the circular region around each mesh node used to fit a local displacement plane. Strain is then taken as the plane&apos;s slope.

• Larger VSG → smoother strain, lower spatial resolution.
• Smaller VSG → sharper strain, more noise.
• Rule of thumb: VSG ≥ 2 × subset step + 1 (default: 41 px).

Not used when Method = FEM nodal (there, mesh spacing itself sets the gauge size).</source>
        <translation>VSG（虛擬應變計，Virtual Strain Gauge）尺寸指圍繞每個網格節點、用於擬合局部位移平面的圓形區域的直徑（像素）。應變由該平面的斜率給出。

• VSG 越大 → 應變越平滑，空間解析度越低。
• VSG 越小 → 應變越銳利，但雜訊越大。
• 經驗法則：VSG ≥ 2 × 子集步長 + 1（預設：41 px）。

方法選擇 FEM nodal 時不使用此參數（此時由網格間距決定虛擬應變計尺寸）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="115"/>
        <source>VSG size</source>
        <translation>VSG 尺寸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="155"/>
        <source>Hides low-confidence strain at ROI / hole edges, where the VSG window crosses the boundary and the local plane fit becomes one-sided and unreliable.

• Coefficient × VSG radius = width of the trimmed boundary band.
• 0.00 = keep every node (no trimming).
• 0.70 = recommended (trims where edge error rises sharply).
• 1.00 = strictest (trim any node whose window touches the edge).

Only applies when Method = Plane fitting.</source>
        <translation>在 ROI / 孔洞邊緣隱藏低可信度的應變：那裡 VSG 視窗跨越邊界，局部平面擬合變成單邊、不可靠。

• 係數 × VSG 半徑 = 裁剪邊界帶的寬度。
• 0.00 = 保留所有節點（不裁剪）。
• 0.70 = 推薦（裁掉誤差明顯上升的區域）。
• 1.00 = 最嚴格（視窗一旦觸及邊界即裁剪）。

僅在 方法 = 平面擬合 時生效。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="158"/>
        <source>Trim low-confidence edges</source>
        <translation>裁剪低可信度邊緣</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="185"/>
        <source>Off</source>
        <comment>Strain smoothing preset</comment>
        <translation>關閉</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="186"/>
        <source>Light (σ = 0.5 × step)</source>
        <translation>輕度（σ = 0.5 × step）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="187"/>
        <source>Medium (σ = 1 × step)</source>
        <translation>中等（σ = 1 × step）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="188"/>
        <source>Strong (σ = 2 × step) ⚠</source>
        <translation>強（σ = 2 × step）⚠</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="199"/>
        <source>Gaussian smoothing of the strain field after computation.
σ is the Gaussian kernel width; &apos;step&apos; = DIC node spacing.
  Light  (0.5 × step):  subtle, preserves fine features.
  Medium (1 × step):    balanced, recommended for noisy data.
  Strong (2 × step) ⚠:  aggressive, may blur real gradients.</source>
        <translation>計算後對應變場做高斯平滑。
σ 為高斯核寬度；“step” 為 DIC 節點間距。
  Light（0.5 × step）：輕度平滑，保留細節。
  Medium（1 × step）：平衡選擇，推薦用於噪聲資料。
  Strong（2 × step）⚠：強平滑，可能模糊真實梯度。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="200"/>
        <source>Strain field smoothing</source>
        <translation>應變場平滑</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="205"/>
        <source>Infinitesimal</source>
        <translation>無窮小應變</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="206"/>
        <source>Eulerian</source>
        <translation>歐拉應變</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="207"/>
        <source>Green-Lagrangian</source>
        <translation>格林-拉格朗日應變</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="209"/>
        <source>Strain type</source>
        <translation>應變類型</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="271"/>
        <source>Trimmed: %1 nodes (%2%)</source>
        <translation>已裁剪：%1 個節點 (%2%)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="324"/>
        <source>⚠ VSG radius (%1 px) &lt; DIC node spacing (%2 px); plane fit will fail. Use VSG ≥ %3 px or switch Method to FEM nodal.</source>
        <translation>⚠ VSG 半徑（%1 px）&lt; DIC 節點間距（%2 px）；平面擬合將失敗。請將 VSG ≥ %3 px 或將方法切換為 FEM nodal。</translation>
    </message>
</context>
<context>
    <name>StrainVizPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="62"/>
        <source>Show on deformed frame</source>
        <translation>在變形幀上顯示</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="64"/>
        <source>Deformed</source>
        <translation>變形後</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="71"/>
        <source>Colormap</source>
        <translation>色彩對映</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="74"/>
        <source>Auto</source>
        <translation>自動</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="76"/>
        <source>Range</source>
        <translation>範圍</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="96"/>
        <source>Min</source>
        <translation>最小</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="98"/>
        <source>Max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="108"/>
        <source>Opacity</source>
        <translation>不透明度</translation>
    </message>
</context>
<context>
    <name>StrainWindow</name>
    <message>
        <location filename="../../gui/strain_window.py" line="123"/>
        <source>Strain Post-Processing</source>
        <translation>應變後處理</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="169"/>
        <source>Fit</source>
        <translation>適配</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="170"/>
        <source>Fit image to viewport</source>
        <translation>將影像適配到視口</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="176"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="177"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>縮放到 100%（1:1）</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="180"/>
        <source>Zoom in</source>
        <translation>放大</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="185"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="238"/>
        <source>STRAIN PARAMETERS</source>
        <translation>應變參數</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="258"/>
        <source>Export displacement and strain results to NPZ / MAT / CSV / PNG</source>
        <translation>將位移和應變結果匯出為 NPZ / MAT / CSV / PNG</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="290"/>
        <source>FIELD</source>
        <translation>場變量</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="299"/>
        <source>VISUALIZATION</source>
        <translation>可視化</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="309"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理單位</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="318"/>
        <source>LOG</source>
        <translation>日誌</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="400"/>
        <source>Strain compute failed: %1: %2</source>
        <translation>應變計算失敗：%1：%2</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="408"/>
        <location filename="../../gui/strain_window.py" line="456"/>
        <source>Strain computation complete.</source>
        <translation>應變計算完成。</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="420"/>
        <source>Strain window: no displacement results to post-process.</source>
        <translation>應變視窗：沒有可後處理的位移結果。</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="472"/>
        <source>Strain compute failed: %1</source>
        <translation>應變計算失敗：%1</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="509"/>
        <source>⚠ Params changed -- click Compute Strain</source>
        <translation>⚠ 參數已變更 — 請點擊“計算應變”</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="186"/>
        <source>Zoom out</source>
        <translation>縮小</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="248"/>
        <source>Compute Strain</source>
        <translation>計算應變</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="254"/>
        <source>Export Results</source>
        <translation>匯出結果</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="430"/>
        <source>Starting…</source>
        <translation>啟動中…</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="452"/>
        <source>Complete</source>
        <translation>完成</translation>
    </message>
</context>
<context>
    <name>VelocitySettingsWidget</name>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="46"/>
        <source>Use physical units</source>
        <translation>使用物理單位</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="68"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="83"/>
        <source>Unit: px/frame</source>
        <translation>單位：px/幀</translation>
    </message>
</context>
<context>
    <name>WorkflowTypePanel</name>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="51"/>
        <source>Incremental</source>
        <translation>增量式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="52"/>
        <source>Accumulative</source>
        <translation>累積式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="62"/>
        <source>Incremental: each frame is compared to the previous reference frame.
Suitable for large accumulated deformation, required for large rotations.

Accumulative: every frame is compared to frame 1.
Accurate for small, monotonic deformation only.</source>
        <translation>增量式：每幀與前一個參考幀比較。
適用於大量累積變形，大旋轉場景必須使用。

累積式：每幀都與第 1 幀比較。
僅適用於小的、單調的變形。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="64"/>
        <source>Tracking Mode</source>
        <translation>追蹤模式</translation>
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
        <translation>Local DIC：獨立子集匹配（IC-GN）。速度快，
保留局部銳利特徵。適合小變形
或高質量影像。

AL-DIC：全局 FEM 正則化的增廣拉格朗日方法。
強制子集間的位移相容性。適合大變形、
噪聲影像，或對應變精度要求高的場景。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="87"/>
        <source>Solver</source>
        <translation>求解器</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="104"/>
        <source>Every Frame</source>
        <translation>每幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="105"/>
        <source>Every N Frames</source>
        <translation>每 N 幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="106"/>
        <source>Custom Frames</source>
        <translation>自定義幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="116"/>
        <source>When the reference frame refreshes during incremental tracking.
Every Frame: reset reference every frame (smallest per-step displacement,
most robust for large deformation).
Every N Frames: reset every N frames (balance speed vs robustness).
Custom Frames: user-defined list of reference frame indices.</source>
        <translation>增量追蹤中參考幀的刷新策略。
每幀：每幀都更新參考（單步位移最小，
對大變形最穩健）。
每 N 幀：每 N 幀更新一次（速度與穩健性的折中）。
自定義：由用戶指定參考幀索引清單。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="118"/>
        <source>Reference Update</source>
        <translation>參考幀更新</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="128"/>
        <source>Update reference every N frames</source>
        <translation>每 N 幀更新一次參考幀</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="130"/>
        <source>Interval</source>
        <translation>間隔</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="141"/>
        <source>Comma-separated frame indices to use as reference frames (0-based)</source>
        <translation>用作參考幀的幀索引清單（0 為起始），用逗號分隔</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="143"/>
        <source>Reference Frames</source>
        <translation>參考幀清單</translation>
    </message>
</context>
<context>
    <name>_DropZone</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="120"/>
        <source>Drop image folder
or Browse</source>
        <translation>拖入影像資料夾
或點擊瀏覽</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="130"/>
        <source>Select Image Folder</source>
        <translation>選擇影像資料夾</translation>
    </message>
</context>
<context>
    <name>_MaskPreviewPanel</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="130"/>
        <source>Preview</source>
        <translation>預覽</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="134"/>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="260"/>
        <source>(no image)</source>
        <translation>（無影像）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="154"/>
        <source>Image only</source>
        <translation>僅影像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="155"/>
        <source>Image + Mask</source>
        <translation>影像 + 遮罩</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="156"/>
        <source>Mask only</source>
        <translation>僅遮罩</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="159"/>
        <source>View:</source>
        <translation>檢視：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="165"/>
        <source>Alpha:</source>
        <translation>透明度：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="173"/>
        <source>Blue</source>
        <comment>Mask overlay color</comment>
        <translation>藍色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="177"/>
        <source>Red</source>
        <comment>Mask overlay color</comment>
        <translation>紅色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="181"/>
        <source>Green</source>
        <comment>Mask overlay color</comment>
        <translation>綠色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="185"/>
        <source>Yellow</source>
        <comment>Mask overlay color</comment>
        <translation>黃色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="189"/>
        <source>Mask color:</source>
        <translation>遮罩顏色：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="267"/>
        <source>No mask assigned</source>
        <translation>未指派遮罩</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="272"/>
        <source>Frame %1 — %2</source>
        <translation>影格 %1 — %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="287"/>
        <source>Failed to load image</source>
        <translation>無法載入影像</translation>
    </message>
</context>
</TS>
