<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh_CN" sourcelanguage="en_US">
<context>
    <name>AdvancedTuningWidget</name>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="44"/>
        <source>AL-DIC Iterations</source>
        <translation>AL-DIC 迭代次数</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="55"/>
        <source>Number of global refinement cycles for the AL-DIC solver.
1 = single global pass (fastest), 3 = default,
5+ = diminishing returns for most cases.</source>
        <translation>AL-DIC 求解器的全局精修迭代次数。
1 = 单次全局求解（最快），3 = 默认值，
5 次以上大多数情况下收益递减。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="61"/>
        <source>Only affects AL-DIC solver. Ignored by Local DIC.</source>
        <translation>仅对 AL-DIC 求解器生效，Local DIC 会忽略。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="74"/>
        <source>Auto-expand FFT search on clipped peaks</source>
        <translation>峰值被截断时自动扩大 FFT 搜索范围</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="80"/>
        <source>When the NCC peak reaches the edge of the search region, automatically retry with a larger region (up to image half-size, 6 retries with 2x growth).

Only relevant for the FFT init-guess mode.</source>
        <translation>当 NCC 峰值触及搜索区域边缘时，自动以更大的搜索范围重试（最大到图像一半尺寸，每次放大 2 倍，共 6 次重试）。

仅对 FFT 初始猜测模式有效。</translation>
    </message>
</context>
<context>
    <name>App</name>
    <message>
        <location filename="../../gui/app.py" line="797"/>
        <source>Imported Region of Interest for %n frame(s)</source>
        <translation>为 %n 帧导入了感兴趣区域</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="809"/>
        <source>Run DIC first -- no displacement results to post-process.</source>
        <translation>请先运行 DIC —— 当前没有可后处理的位移结果。</translation>
    </message>
</context>
<context>
    <name>BatchImportDialog</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="365"/>
        <source>Batch Import Region of Interest Masks</source>
        <translation>批量导入感兴趣区域掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="405"/>
        <source>Mask Folder:</source>
        <translation>掩模文件夹：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="406"/>
        <source>(none)</source>
        <translation>（无）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="411"/>
        <source>Browse...</source>
        <translation>浏览…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="430"/>
        <source>Available Masks</source>
        <translation>可用掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="441"/>
        <source>Auto-Match by Name</source>
        <translation>按文件名自动匹配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="443"/>
        <source>Match mask files to frames by number in filename</source>
        <translation>根据文件名中的数字把掩模文件匹配到对应帧</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="447"/>
        <source>Assign Sequential</source>
        <translation>顺序分配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="449"/>
        <source>Assign masks to frames in order starting from frame 0</source>
        <translation>从第 0 帧起按顺序把掩模分配给各帧</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="457"/>
        <source>Frame Assignments</source>
        <translation>帧分配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Frame</source>
        <translation>帧</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Image</source>
        <translation>图像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Mask</source>
        <translation>掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="471"/>
        <source>Assign Selected -&gt;</source>
        <translation>分配所选 -&gt;</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Pair selected mask(s) with selected frame(s)</source>
        <translation>将所选掩模与所选帧配对</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="477"/>
        <source>Clear All</source>
        <translation>全部清除</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="523"/>
        <source>Select Mask Folder</source>
        <translation>选择掩模文件夹</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="576"/>
        <source>Failed to read mask file.</source>
        <translation>无法读取掩模文件。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="581"/>
        <source>Mismatched shape: %1×%2 (expected %3×%4)</source>
        <translation>尺寸不匹配：%1×%2（期望 %3×%4）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="659"/>
        <source>%n mask(s) have mismatched sizes and are disabled.</source>
        <translation>%n 个掩模尺寸不匹配，已禁用。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="712"/>
        <source>Invalid assignment</source>
        <translation>无效的分配</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="717"/>
        <source>A frame can only have one mask. Select exactly one mask, or select multiple frames to assign one mask to many.</source>
        <translation>一个帧只能对应一个掩模。请选择恰好一个掩模，或者选择多个帧以把同一个掩模应用到多个帧。</translation>
    </message>
</context>
<context>
    <name>CanvasArea</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1197"/>
        <source>Fit</source>
        <translation>适配</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1198"/>
        <source>Fit image to viewport</source>
        <translation>将图像适配到视口</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1203"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1204"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>缩放到 100%（1:1）</translation>
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
        <translation>缩小</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1228"/>
        <source>Show Grid</source>
        <translation>显示网格</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1229"/>
        <source>Show/hide computational mesh grid</source>
        <translation>显示/隐藏计算网格</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1232"/>
        <source>Show Subset</source>
        <translation>显示子集</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1233"/>
        <source>Show subset window on hover (requires Grid)</source>
        <translation>悬停时显示子集窗口（需要先开启网格）</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1487"/>
        <source>Placing Starting Points</source>
        <translation>正在放置种子点</translation>
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
        <translation>初始猜测</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="93"/>
        <source>Accumulative</source>
        <translation>累积式</translation>
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
        <translation>种子点</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="113"/>
        <source>Previous frame</source>
        <translation>上一帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="115"/>
        <source>FFT every frame</source>
        <translation>每帧 FFT</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="116"/>
        <source>FFT every %1 fr</source>
        <translation>每 %1 帧 FFT</translation>
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
        <translation>范围</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/color_range.py" line="30"/>
        <source>Auto</source>
        <translation>自动</translation>
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
        <location filename="../../gui/dialogs/export_dialog.py" line="389"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="730"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="873"/>
        <source>Auto</source>
        <translation>自动</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="413"/>
        <source>Opacity</source>
        <translation>不透明度</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="417"/>
        <source>Field opacity (0 = transparent, 1 = fully opaque)</source>
        <translation>字段不透明度（0 = 透明，1 = 完全不透明）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="485"/>
        <source>All</source>
        <translation>全选</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="487"/>
        <source>None</source>
        <translation>全不选</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="516"/>
        <source>Export Results</source>
        <translation>导出结果</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="536"/>
        <source>OUTPUT FOLDER</source>
        <translation>输出文件夹</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="544"/>
        <source>Select output folder…</source>
        <translation>选择输出文件夹…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="548"/>
        <source>Browse…</source>
        <translation>浏览…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="553"/>
        <source>Open Folder</source>
        <translation>打开文件夹</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="561"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理单位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="565"/>
        <source>Enable physical units</source>
        <translation>启用物理单位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="570"/>
        <source>Scale displacement values by pixel size and show physical units on colorbar labels. Strain is dimensionless and unaffected.</source>
        <translation>按像素尺寸缩放位移值，并在色条标签显示物理单位。应变为无量纲，不受影响。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="585"/>
        <source>/ pixel</source>
        <translation>/ 像素</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="587"/>
        <source>Pixel size</source>
        <translation>像素尺寸</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="596"/>
        <source>fps</source>
        <translation>fps</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="598"/>
        <source>Frame rate</source>
        <translation>帧率</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="606"/>
        <source>Data</source>
        <translation>数据</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="607"/>
        <source>Images</source>
        <translation>图像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="608"/>
        <source>Animation</source>
        <translation>动画</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="609"/>
        <source>Report</source>
        <translation>报告</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="629"/>
        <source>FORMAT</source>
        <translation>格式</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="631"/>
        <source>NumPy Archive (.npz)</source>
        <translation>NumPy 归档 (.npz)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="633"/>
        <source>MATLAB (.mat)</source>
        <translation>MATLAB (.mat)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="635"/>
        <source>CSV (per frame)</source>
        <translation>CSV（逐帧）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="638"/>
        <source>NPZ: one file per frame (default: single merged file)</source>
        <translation>NPZ：逐帧一个文件（默认：合并为单个文件）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="646"/>
        <source>DISPLACEMENT</source>
        <translation>位移</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="655"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="682"/>
        <source>Select:</source>
        <translation>选择：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="670"/>
        <source>STRAIN</source>
        <translation>应变</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="673"/>
        <source>Run Compute Strain first.</source>
        <translation>请先运行“计算应变”。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="700"/>
        <source>✓ Parameters file (JSON) always exported</source>
        <translation>✓ 参数文件（JSON）始终导出</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="706"/>
        <source>Export Data</source>
        <translation>导出数据</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="727"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="870"/>
        <source>Export</source>
        <translation>导出</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="728"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="871"/>
        <source>Field</source>
        <translation>字段</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="729"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="872"/>
        <source>Colormap</source>
        <translation>颜色映射</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="731"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="874"/>
        <source>Min</source>
        <translation>最小</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="732"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="875"/>
        <source>Max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="751"/>
        <source>IMAGE SETTINGS</source>
        <translation>图像设置</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="761"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="904"/>
        <source>Format</source>
        <translation>格式</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="769"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="912"/>
        <source>Full resolution</source>
        <translation>原始分辨率</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="775"/>
        <source>Cap the exported image&apos;s long edge (the larger of width/height; aspect ratio is kept).
Field detail is bounded by the mesh, so a smaller cap is near-lossless
but much smaller on disk and faster to encode. Lower = faster. &apos;Full resolution&apos; keeps the native size.</source>
        <translation>限制导出图像的长边（宽和高中较大的一个；保持宽高比）。
场的细节由网格密度决定，因此较小的上限几乎无损，
但文件更小、编码更快。越低越快。「原始分辨率」保持原生尺寸。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="778"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="919"/>
        <source>Resolution (long edge)</source>
        <translation>分辨率（长边）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="916"/>
        <source>Cap the animation&apos;s long edge (the larger of width/height).
Lower = faster and much smaller. Strongly recommended for GIF, whose size explodes at native resolution.</source>
        <translation>限制动画的长边（宽和高中较大的一个）。
越低越快、越小。强烈建议用于 GIF：其体积在原生分辨率下会急剧膨胀。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="786"/>
        <source>JPEG quality (higher = larger file). Ignored for PNG/TIFF.</source>
        <translation>JPEG 质量（越高文件越大）。对 PNG/TIFF 无效。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="789"/>
        <source>JPEG quality</source>
        <translation>JPEG 质量</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="798"/>
        <source>DPI</source>
        <translation>DPI</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="800"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="945"/>
        <source>Include colorbar</source>
        <translation>包含色条</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="805"/>
        <source>Append a vertical colorbar strip to the right of each image.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>在每张图像右侧添加一条垂直色条。
启用自动范围时，刻度标签会按帧更新。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="810"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="955"/>
        <source>Original (frame 1 background)</source>
        <translation>原始配置（第 1 帧作背景）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="815"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="960"/>
        <source>Field is drawn at the original (undeformed) node positions.
Background image is always the first frame.</source>
        <translation>字段绘制在原始（未变形）节点位置。
背景图像始终是第一帧。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="818"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="963"/>
        <source>Deformed (current frame background)</source>
        <translation>变形配置（当前帧作背景）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="824"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="969"/>
        <source>Field is drawn at the displaced node positions (reference + displacement).
Background image follows each frame&apos;s own photo.</source>
        <translation>字段绘制在位移后节点位置（参考位置 + 位移）。
背景图像跟随每帧自身的照片。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="828"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="973"/>
        <source>Render as</source>
        <translation>绘制为</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="846"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="989"/>
        <source>Cancel Export</source>
        <translation>取消导出</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="851"/>
        <source>Export Images</source>
        <translation>导出图像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="894"/>
        <source>ANIMATION SETTINGS</source>
        <translation>动画设置</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="928"/>
        <source>FPS</source>
        <translation>帧率</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="940"/>
        <source>Export every Nth frame (1 = every frame). Higher is faster and smaller
but looks choppier. Playback duration is preserved (the FPS above is the pre-decimation rate).</source>
        <translation>每 N 帧导出一帧（1 = 每帧都导出）。越大越快、越小，
但看起来更卡顿。播放时长保持不变（上方 FPS 为抽帧前的帧率）。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="943"/>
        <source>Frame step</source>
        <translation>抽帧间隔</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="950"/>
        <source>Append a vertical colorbar strip to the right of each frame.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>在每一帧右侧添加一条垂直色条。
启用自动范围时，刻度标签会按帧更新。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="994"/>
        <source>Export Animation</source>
        <translation>导出动画</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1011"/>
        <source>CONTENT</source>
        <translation>内容</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1013"/>
        <source>Parameter summary table</source>
        <translation>参数摘要表</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1017"/>
        <source>Field statistics (min/max/mean/std per frame)</source>
        <translation>字段统计（每帧 最小/最大/平均/标准差）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1019"/>
        <source>Sample field images</source>
        <translation>示例字段图像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1026"/>
        <source>Sample every</source>
        <translation>每隔</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1032"/>
        <source>frames</source>
        <comment>Report: sample every N frames</comment>
        <translation>帧</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1038"/>
        <source>FIELDS</source>
        <translation>字段</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1041"/>
        <source>Displacement:</source>
        <translation>位移：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1056"/>
        <source>Strain:</source>
        <translation>应变：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1079"/>
        <source>Format: HTML (self-contained, view in any browser)</source>
        <translation>格式：HTML（自包含，可在任意浏览器中查看）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1085"/>
        <source>Generate Report</source>
        <translation>生成报告</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1099"/>
        <source>FRAME RANGE</source>
        <translation>帧范围</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1102"/>
        <source>All frames</source>
        <translation>所有帧</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1108"/>
        <source>From</source>
        <comment>Frame range: starting frame</comment>
        <translation>从</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1116"/>
        <source>to</source>
        <comment>Frame range: ending frame</comment>
        <translation>到</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1147"/>
        <source>Select Output Folder</source>
        <translation>选择输出文件夹</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1206"/>
        <source>Exported %1 files → %2</source>
        <translation>已导出 %1 个文件 → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1215"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1290"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1369"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1411"/>
        <source>Error: %1</source>
        <translation>错误：%1</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1240"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1318"/>
        <source>Starting…</source>
        <translation>开始中…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1263"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1341"/>
        <source>Rendering %1 (%2/%3)</source>
        <translation>正在渲染 %1 (%2/%3)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1269"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1347"/>
        <source>Frame %1/%2</source>
        <translation>帧 %1/%2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1279"/>
        <source>Exported %1 images → %2</source>
        <translation>已导出 %1 张图像 → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1404"/>
        <source>Report saved → %1</source>
        <translation>报告已保存 → %1</translation>
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
        <translation>上一帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="69"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="170"/>
        <source>Play animation</source>
        <translation>播放动画</translation>
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
        <translation>下一帧</translation>
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
        <translation>第 0/0 帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="159"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="160"/>
        <source>Pause animation</source>
        <translation>暂停动画</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="191"/>
        <source>FRAME %1/%2</source>
        <translation>帧 %1/%2</translation>
    </message>
</context>
<context>
    <name>ImageCanvas</name>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1044"/>
        <source>Load images first before drawing a Region of Interest.</source>
        <translation>请先加载图像，再绘制感兴趣区域。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1064"/>
        <source>The three points are nearly collinear — pick points spread around the circle&apos;s edge.</source>
        <translation>三个点几乎共线 — 请在圆周上分散地选取三个点。</translation>
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
        <translation>文件名</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="97"/>
        <source>Region</source>
        <comment>Image list column: ROI status</comment>
        <translation>区域</translation>
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
        <translation>编辑</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="245"/>
        <source>Need</source>
        <translation>待绘</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="368"/>
        <source>Import Region of Interest for %n frame(s)</source>
        <translation>为 %n 帧导入感兴趣区域</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="378"/>
        <source>Clear Region of Interest (%1 with region)</source>
        <translation>清除感兴趣区域（%1 帧已有区域）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="383"/>
        <source>Clear Region of Interest</source>
        <translation>清除感兴趣区域</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="396"/>
        <source>Delete %n image(s)</source>
        <translation>删除 %n 张图像</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="496"/>
        <source>Images</source>
        <translation>图像</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="497"/>
        <source>All Files</source>
        <translation>所有文件</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="508"/>
        <source>Selected %1 files for %2 frames — count must match</source>
        <translation>已选择 %1 个文件用于 %2 帧 — 数量必须匹配</translation>
    </message>
</context>
<context>
    <name>InitGuessWidget</name>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="80"/>
        <source>Starting Points</source>
        <translation>种子点</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="91"/>
        <source>Place a few points; pyALDIC bootstraps each with a single-point NCC and propagates the field along mesh neighbours.

Best for:
• Large inter-frame displacement (&gt; 50 px)
• Discontinuous fields (cracks, shear bands)
• Scenarios where FFT picks wrong peaks

Auto-placed per region when you draw or edit an ROI.</source>
        <translation>放置若干种子点；pyALDIC 在每个点上运行单点 NCC 引导，然后沿网格邻居传播位移场。

最适合：
• 大帧间位移（&gt; 50 px）
• 不连续场（裂纹、剪切带）
• FFT 容易选错峰的场景

绘制或编辑 ROI 时会为每个区域自动放置。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="100"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="282"/>
        <source>Place Starting Points</source>
        <translation>放置种子点</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="105"/>
        <source>Enter placement mode on the canvas. Left-click to add, right-click to remove, Esc or click again to exit.</source>
        <translation>在画布上进入放置模式。左键添加、右键删除，按 Esc 或再次点击退出。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="107"/>
        <source>Auto-place</source>
        <translation>自动放置</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="111"/>
        <source>Fill empty regions with the highest-NCC node in each. Existing Starting Points are preserved.</source>
        <translation>在每个空区域填入 NCC 最高的节点。已有种子点会保留。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="113"/>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="117"/>
        <source>Remove every Starting Point. Faster than right-clicking each one individually.</source>
        <translation>移除所有种子点。比逐个右键删除快。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="122"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="292"/>
        <source>%1 / %2 regions ready</source>
        <translation>%1 / %2 区域就绪</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="141"/>
        <source>FFT (cross-correlation)</source>
        <translation>FFT（互相关）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="152"/>
        <source>Full-grid normalized cross-correlation. Robust within the search radius; the search auto-expands when peaks clip.

Best for:
• Small-to-moderate smooth motion
• Well-textured speckle
• No special user setup needed

Cost grows with the search radius, so very large displacements become slow.</source>
        <translation>全网格归一化互相关。在搜索半径内稳健；峰值被截断时搜索自动扩展。

最适合：
• 小到中等的平滑运动
• 纹理良好的散斑
• 不需要用户额外设置

计算成本随搜索半径增长，极大位移会变慢。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="163"/>
        <source>Every</source>
        <translation>每</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="168"/>
        <source>Run FFT every N frames. N = 1 means FFT every frame (safest, slowest). N &gt; 1 uses warm-start between resets to limit error propagation to N frames.</source>
        <translation>每 N 帧运行一次 FFT。N = 1 表示每帧都做 FFT（最安全但最慢）。N &gt; 1 在两次重置之间使用热启动，将误差传播限制在 N 帧内。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="175"/>
        <source>(N=1 = every frame)</source>
        <translation>（N=1 即每帧）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="185"/>
        <source>Only when reference frame updates (incremental only)</source>
        <translation>仅在参考帧更新时（只对增量模式）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="189"/>
        <source>Run FFT whenever the reference frame changes; warm-start within each segment. Typical default for incremental mode.</source>
        <translation>参考帧变化时运行 FFT；每段内使用热启动。是增量模式的典型默认值。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="198"/>
        <source>Previous frame</source>
        <translation>上一帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="208"/>
        <source>Use the previous frame&apos;s converged displacement as the initial guess. No cross-correlation runs.

Best for:
• Very small inter-frame motion (a few pixels)
• Fastest option when motion is smooth

Errors can accumulate over long sequences. Prefer FFT or Starting Points on noisy data or when motion is larger.</source>
        <translation>使用前一帧收敛的位移作为初始猜测。不运行任何互相关。

最适合：
• 非常小的帧间运动（几像素）
• 运动平滑时速度最快

长序列中误差会累积。数据有噪声或运动较大时请选 FFT 或种子点。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="280"/>
        <source>Placing... (click to exit)</source>
        <translation>放置中…（再次点击退出）</translation>
    </message>
</context>
<context>
    <name>LeftSidebar</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="178"/>
        <source>IMAGES</source>
        <translation>图像</translation>
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
        <translation>按文件名中的数字排序：image1, image2, …, image10
默认（不勾选）：字典序 — 适合已补零的文件名</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="261"/>
        <source>WORKFLOW TYPE</source>
        <translation>工作流类型</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="274"/>
        <source>INITIAL GUESS</source>
        <translation>初始猜测</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="281"/>
        <source>REGION OF INTEREST</source>
        <translation>感兴趣区域</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="291"/>
        <source>PARAMETERS</source>
        <translation>参数</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="297"/>
        <source>ADVANCED</source>
        <translation>高级</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../../gui/app.py" line="195"/>
        <source>&amp;File</source>
        <translation>文件</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="197"/>
        <source>Open Session…</source>
        <translation>打开会话…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="202"/>
        <source>Save Session…</source>
        <translation>保存会话…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="208"/>
        <source>Quit</source>
        <translation>退出</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="216"/>
        <source>&amp;Settings</source>
        <translation>设置</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="217"/>
        <source>Language</source>
        <translation>语言</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="246"/>
        <source>Language changed</source>
        <translation>语言已切换</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="250"/>
        <source>Language set to %1. Please restart pyALDIC for all widgets to pick up the new language.</source>
        <translation>语言已切换至 %1。请重启 pyALDIC 以让所有界面生效。</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="261"/>
        <source>Save Session</source>
        <translation>保存会话</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="263"/>
        <location filename="../../gui/app.py" line="290"/>
        <source>pyALDIC Session</source>
        <translation>pyALDIC 会话</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="264"/>
        <location filename="../../gui/app.py" line="292"/>
        <source>All Files</source>
        <translation>全部文件</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="274"/>
        <source>Save Session Failed</source>
        <translation>保存会话失败</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="288"/>
        <source>Open Session</source>
        <translation>打开会话</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="291"/>
        <source>JSON</source>
        <translation>JSON</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="300"/>
        <source>Open Session Failed</source>
        <translation>打开会话失败</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="652"/>
        <location filename="../../gui/app.py" line="705"/>
        <source>Load images first.</source>
        <translation>请先加载图像。</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="754"/>
        <source>  Imported mask for frame %1</source>
        <translation>  已导入帧 %1 的掩模</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="765"/>
        <source>Batch import: %n mask(s) loaded</source>
        <translation>批量导入：已加载 %n 个掩模</translation>
    </message>
</context>
<context>
    <name>MeshAppearanceWidget</name>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="38"/>
        <source>Mesh color</source>
        <translation>网格颜色</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="41"/>
        <source>Click to choose mesh line color</source>
        <translation>点击选择网格线颜色</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="50"/>
        <source>Line width</source>
        <translation>线宽</translation>
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
        <translation>IC-GN 子集窗口尺寸（像素，奇数）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="50"/>
        <source>Subset Step</source>
        <translation>子集步长</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="53"/>
        <source>Node spacing in pixels (must be power of 2)</source>
        <translation>节点间距（像素，必须是 2 的幂）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="61"/>
        <location filename="../../gui/widgets/param_panel.py" line="186"/>
        <source>Search Range</source>
        <translation>搜索范围</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="76"/>
        <source>Refine Inner Boundary</source>
        <translation>加密内部边界</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="82"/>
        <source>Locally refine the mesh along internal mask boundaries
(holes inside the Region of Interest). Useful for bubble / void edges.</source>
        <translation>沿内部掩模边界局部加密网格
（感兴趣区域内部的孔洞）。适合气泡 / 空洞边缘。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="83"/>
        <source>Refine Outer Boundary</source>
        <translation>加密外部边界</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="88"/>
        <source>Locally refine the mesh along the outer Region of Interest
boundary.</source>
        <translation>沿感兴趣区域的外部边界局部加密网格。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="106"/>
        <source>Refinement aggressiveness. min element size = max(2, subset_step / 2^level). Applies uniformly to inner-, outer-boundary AND brush-painted refinement zones. Available levels depend on subset size and subset step.</source>
        <translation>加密强度。最小单元尺寸 = max(2, 子集步长 / 2^级别)。对内部边界、外部边界和画笔加密区域统一生效。可用级别取决于子集尺寸和步长。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="108"/>
        <source>Refinement Level</source>
        <translation>加密级别</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="173"/>
        <source>Maximum per-frame displacement the FFT search can detect (pixels).
Set comfortably larger than the expected inter-frame motion.
For large rotations in incremental mode, this must cover
  radius × sin(per-step angle).</source>
        <translation>FFT 搜索可检测到的每帧最大位移（像素）。
设置值应略大于预期的帧间运动。
对于增量模式下的大旋转，该值必须覆盖
  半径 × sin(单步角度)。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="181"/>
        <source>Initial half-width (pixels) of the single-point NCC search at each Starting Point.
Auto-expands 2x per retry if the peak is clipped, up to image half-size.
Only affects Starting Point bootstrap; other nodes use F-aware propagation (no per-node search).</source>
        <translation>每个种子点处单点 NCC 搜索的初始半宽（像素）。
若峰值被截断，每次重试自动放大 2 倍，最大到图像一半尺寸。
仅影响种子点引导；其他节点使用 F-aware 传播（无需逐节点搜索）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="182"/>
        <source>Initial Seed Search</source>
        <translation>初始种子搜索</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="218"/>
        <source>Light</source>
        <comment>Mesh refinement severity</comment>
        <translation>轻度</translation>
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
        <translation>强</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="221"/>
        <source>Extra Heavy</source>
        <comment>Mesh refinement severity</comment>
        <translation>超强</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="222"/>
        <source>Ultra</source>
        <comment>Mesh refinement severity</comment>
        <translation>极限</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="228"/>
        <source>%1 (L%2)</source>
        <translation>%1 (L%2)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="252"/>
        <source>min element size = %1 px  (subset_step=%2, level=%3)</source>
        <translation>最小单元尺寸 = %1 px  (子集步长=%2, 级别=%3)</translation>
    </message>
</context>
<context>
    <name>PhysicalUnitsWidget</name>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="54"/>
        <source>Use physical units</source>
        <translation>使用物理单位</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="65"/>
        <source>Physical size of one image pixel</source>
        <translation>单个图像像素对应的物理尺寸</translation>
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
        <translation>采集帧率（用于速度场）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="94"/>
        <source>Frame rate</source>
        <translation>帧率</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="162"/>
        <source>Disp: %1  Velocity: %2/s</source>
        <translation>位移：%1  速度：%2/s</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="167"/>
        <source>Disp: px  Velocity: px/fr</source>
        <translation>位移：px  速度：px/帧</translation>
    </message>
</context>
<context>
    <name>PipelineController</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="373"/>
        <source>Building pipeline configuration...</source>
        <translation>正在构建流水线配置…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="530"/>
        <source>Loading images...</source>
        <translation>正在加载图像…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="545"/>
        <source>  Loaded %1 images, shape=%2</source>
        <translation>  已加载 %1 张图像，尺寸=%2</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="558"/>
        <source>  ROI mask: %1, %2 pixels (%3%)</source>
        <translation>  感兴趣区域蒙版：%1，%2 像素（%3%）</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="586"/>
        <source>Run cancelled: define per-frame Regions of Interest for the missing reference frames or accept the inherited frame-1 mask in the next run.</source>
        <translation>已取消运行：请为缺失的参考帧定义逐帧感兴趣区域，或在下次运行时接受继承自第 1 帧的蒙版。</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="607"/>
        <source>  %n frame(s) with custom ROI masks</source>
        <translation>  %n 帧使用自定义感兴趣区域蒙版</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="738"/>
        <source>Results received: %n frame(s)</source>
        <translation>已收到结果：%n 帧</translation>
    </message>
</context>
<context>
    <name>PipelineWorker</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="199"/>
        <source>Starting DIC analysis...</source>
        <translation>开始 DIC 分析…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="236"/>
        <source>Analysis complete in %1s</source>
        <translation>分析完成，用时 %1 秒</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="244"/>
        <source>Analysis stopped by user.</source>
        <translation>用户已停止分析。</translation>
    </message>
</context>
<context>
    <name>ROIHint</name>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="64"/>
        <source>Load images first, then draw a Region of Interest on frame 1.</source>
        <translation>请先加载图像，再在第 1 帧上绘制感兴趣区域。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="72"/>
        <source>&lt;b&gt;Accumulative mode&lt;/b&gt; — only frame 1 needs a Region of Interest. All later frames are compared against it directly.</source>
        <translation>&lt;b&gt;累积模式&lt;/b&gt; — 只有第 1 帧需要感兴趣区域。后续帧都直接与其比较。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="82"/>
        <source>&lt;b&gt;Incremental, every frame&lt;/b&gt; — frame 1 needs a Region of Interest. It is automatically warped forward to each later frame (no per-frame drawing required).</source>
        <translation>&lt;b&gt;增量模式，每帧&lt;/b&gt; — 第 1 帧需要感兴趣区域。系统会自动将其扭曲到每个后续帧（无需逐帧绘制）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="99"/>
        <source>&lt;b&gt;Incremental, every %1 frames&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%2&lt;/b&gt; (%3 reference frames total).</source>
        <translation>&lt;b&gt;增量模式，每 %1 帧&lt;/b&gt; — 请在以下帧绘制感兴趣区域：&lt;b&gt;%2&lt;/b&gt;（共 %3 个参考帧）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="113"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — no custom reference frames set. Frame 1 will be the only reference; add more indices in the Reference Frames field.</source>
        <translation>&lt;b&gt;增量模式，自定义&lt;/b&gt; — 未设置自定义参考帧。仅第 1 帧为参考；请在参考帧列表中添加更多索引。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="123"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%1&lt;/b&gt; (%2 reference frames total).</source>
        <translation>&lt;b&gt;增量模式，自定义&lt;/b&gt; — 请在以下帧绘制感兴趣区域：&lt;b&gt;%1&lt;/b&gt;（共 %2 个参考帧）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="129"/>
        <source>Draw a Region of Interest on frame 1.</source>
        <translation>请在第 1 帧绘制感兴趣区域。</translation>
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
        <translation>向感兴趣区域添加形状（多边形 / 矩形 / 圆形）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="79"/>
        <source>Cut</source>
        <translation>裁剪</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="83"/>
        <source>Cut region from the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>从感兴趣区域裁剪形状（多边形 / 矩形 / 圆形）</translation>
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
        <translation>用画笔绘制额外的网格加密区域
（仅在第 1 帧可用 — 网格点会自动扭曲到后续帧）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="98"/>
        <source>Refine brush is only available on frame 1. Switch to frame 1 to paint refinement zones; they are automatically warped to later frames.</source>
        <translation>加密画笔仅在第 1 帧可用。切换到第 1 帧后可绘制加密区域；系统会自动将其扭曲到后续帧。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="118"/>
        <source>Import</source>
        <translation>导入</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="119"/>
        <source>Import mask from image file</source>
        <translation>从图像文件导入掩模</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="124"/>
        <source>Batch Import</source>
        <translation>批量导入</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="126"/>
        <source>Batch import mask files for multiple frames</source>
        <translation>批量导入多帧的掩模文件</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="139"/>
        <source>Save</source>
        <translation>保存</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="140"/>
        <source>Save current mask to PNG file</source>
        <translation>将当前掩模保存为 PNG 文件</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="145"/>
        <source>Invert</source>
        <translation>反选</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="147"/>
        <source>Invert the Region of Interest mask</source>
        <translation>反转感兴趣区域掩模</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="152"/>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="154"/>
        <source>Clear all Region of Interest masks</source>
        <translation>清除所有感兴趣区域掩模</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="186"/>
        <source>Radius</source>
        <translation>半径</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="204"/>
        <source>Paint</source>
        <translation>绘制</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="209"/>
        <source>Erase</source>
        <translation>擦除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="219"/>
        <source>Clear Brush</source>
        <translation>清除画笔</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="256"/>
        <source>Circle (3-point)</source>
        <translation>圆（三点）</translation>
    </message>
</context>
<context>
    <name>RightSidebar</name>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="58"/>
        <source>Run DIC Analysis</source>
        <translation>运行 DIC 分析</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="71"/>
        <source>Cancel</source>
        <translation>取消</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="78"/>
        <source>Cancel the current analysis. Already-computed frames are kept; the run is marked as IDLE (not DONE).</source>
        <translation>取消当前分析。已计算的帧会保留；运行状态标记为 IDLE（非 DONE）。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="84"/>
        <source>Export Results</source>
        <translation>导出结果</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="92"/>
        <source>Open Strain Window</source>
        <translation>打开应变窗口</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="97"/>
        <source>Compute and visualize strain in a separate post-processing window. Requires displacement results from a completed Run.</source>
        <translation>在独立的后处理窗口中计算并可视化应变。需先完成一次运行以获得位移结果。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="104"/>
        <source>PROGRESS</source>
        <translation>进度</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="113"/>
        <location filename="../../gui/panels/right_sidebar.py" line="350"/>
        <source>Ready</source>
        <translation>就绪</translation>
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
        <translation>剩余  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="134"/>
        <source>FIELD</source>
        <translation>场变量</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="141"/>
        <source>Show on deformed frame</source>
        <translation>在变形帧上显示</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="146"/>
        <source>When checked, overlay results on the deformed (current) frame instead of the reference frame</source>
        <translation>勾选后，将结果叠加在变形（当前）帧上，而非参考帧</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="151"/>
        <source>VISUALIZATION</source>
        <translation>可视化</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="156"/>
        <source>Colormap</source>
        <translation>色图</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="177"/>
        <source>Opacity</source>
        <translation>透明度</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="184"/>
        <source>Overlay opacity (0 = transparent, 100 = opaque)</source>
        <translation>叠加图透明度（0 = 透明，100 = 不透明）</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="190"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理单位</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="196"/>
        <source>LOG</source>
        <translation>日志</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="202"/>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="321"/>
        <source>Place at least one Starting Point in each red region before running (red = needs a Starting Point).</source>
        <translation>运行前请在每个红色区域放置至少一个种子点（红色 = 需要种子点）。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="389"/>
        <source>%1  —  Frame %2</source>
        <translation>%1  —  第 %2 帧</translation>
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
        <translation>应变</translation>
    </message>
</context>
<context>
    <name>StrainNavigator</name>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="73"/>
        <source>Previous frame</source>
        <translation>上一帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="84"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="216"/>
        <source>Play animation</source>
        <translation>播放动画</translation>
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
        <translation>下一帧</translation>
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
        <translation>第 0/0 帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="205"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="206"/>
        <source>Pause animation</source>
        <translation>暂停动画</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="223"/>
        <source>FRAME %1/%2</source>
        <translation>帧 %1/%2</translation>
    </message>
</context>
<context>
    <name>StrainParamPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="85"/>
        <source>Plane fitting</source>
        <translation>平面拟合</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="86"/>
        <source>FEM nodal</source>
        <translation>有限元节点</translation>
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
        <translation>VSG（虚拟应变计，Virtual Strain Gauge）尺寸指围绕每个网格节点、用于拟合局部位移平面的圆形区域的直径（像素）。应变由该平面的斜率给出。

• VSG 越大 → 应变越平滑，空间分辨率越低。
• VSG 越小 → 应变越锐利，但噪声越大。
• 经验法则：VSG ≥ 2 × 子集步长 + 1（默认：41 px）。

方法选择 FEM nodal 时不使用此参数（此时由网格间距决定虚拟应变计尺寸）。</translation>
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
        <translation>在 ROI / 孔洞边缘隐藏低置信度的应变：那里 VSG 窗口跨越边界，局部平面拟合变成单边、不可靠。

• 系数 × VSG 半径 = 裁剪边界带的宽度。
• 0.00 = 保留所有节点（不裁剪）。
• 0.70 = 推荐（裁掉误差明显上升的区域）。
• 1.00 = 最严格（窗口一旦触及边界即裁剪）。

仅在 方法 = 平面拟合 时生效。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="158"/>
        <source>Trim low-confidence edges</source>
        <translation>裁剪低置信度边缘</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="185"/>
        <source>Off</source>
        <comment>Strain smoothing preset</comment>
        <translation>关闭</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="186"/>
        <source>Light (σ = 0.5 × step)</source>
        <translation>轻度（σ = 0.5 × step）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="187"/>
        <source>Medium (σ = 1 × step)</source>
        <translation>中等（σ = 1 × step）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="188"/>
        <source>Strong (σ = 2 × step) ⚠</source>
        <translation>强（σ = 2 × step）⚠</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="199"/>
        <source>Gaussian smoothing of the strain field after computation.
σ is the Gaussian kernel width; &apos;step&apos; = DIC node spacing.
  Light  (0.5 × step):  subtle, preserves fine features.
  Medium (1 × step):    balanced, recommended for noisy data.
  Strong (2 × step) ⚠:  aggressive, may blur real gradients.</source>
        <translation>计算后对应变场做高斯平滑。
σ 为高斯核宽度；“step” 为 DIC 节点间距。
  Light（0.5 × step）：轻度平滑，保留细节。
  Medium（1 × step）：平衡选择，推荐用于噪声数据。
  Strong（2 × step）⚠：强平滑，可能模糊真实梯度。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="200"/>
        <source>Strain field smoothing</source>
        <translation>应变场平滑</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="205"/>
        <source>Infinitesimal</source>
        <translation>无穷小应变</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="206"/>
        <source>Eulerian</source>
        <translation>欧拉应变</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="207"/>
        <source>Green-Lagrangian</source>
        <translation>格林-拉格朗日应变</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="209"/>
        <source>Strain type</source>
        <translation>应变类型</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="271"/>
        <source>Trimmed: %1 nodes (%2%)</source>
        <translation>已裁剪：%1 个节点 (%2%)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="324"/>
        <source>⚠ VSG radius (%1 px) &lt; DIC node spacing (%2 px); plane fit will fail. Use VSG ≥ %3 px or switch Method to FEM nodal.</source>
        <translation>⚠ VSG 半径（%1 px）&lt; DIC 节点间距（%2 px）；平面拟合将失败。请将 VSG ≥ %3 px 或将方法切换为 FEM nodal。</translation>
    </message>
</context>
<context>
    <name>StrainVizPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="62"/>
        <source>Show on deformed frame</source>
        <translation>在变形帧上显示</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="64"/>
        <source>Deformed</source>
        <translation>变形后</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="71"/>
        <source>Colormap</source>
        <translation>颜色映射</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="74"/>
        <source>Auto</source>
        <translation>自动</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="76"/>
        <source>Range</source>
        <translation>范围</translation>
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
        <translation>应变后处理</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="169"/>
        <source>Fit</source>
        <translation>适配</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="170"/>
        <source>Fit image to viewport</source>
        <translation>将图像适配到视口</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="176"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="177"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>缩放到 100%（1:1）</translation>
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
        <translation>应变参数</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="258"/>
        <source>Export displacement and strain results to NPZ / MAT / CSV / PNG</source>
        <translation>将位移和应变结果导出为 NPZ / MAT / CSV / PNG</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="290"/>
        <source>FIELD</source>
        <translation>场变量</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="299"/>
        <source>VISUALIZATION</source>
        <translation>可视化</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="309"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理单位</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="318"/>
        <source>LOG</source>
        <translation>日志</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="400"/>
        <source>Strain compute failed: %1: %2</source>
        <translation>应变计算失败：%1：%2</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="408"/>
        <location filename="../../gui/strain_window.py" line="456"/>
        <source>Strain computation complete.</source>
        <translation>应变计算完成。</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="420"/>
        <source>Strain window: no displacement results to post-process.</source>
        <translation>应变窗口：没有可后处理的位移结果。</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="472"/>
        <source>Strain compute failed: %1</source>
        <translation>应变计算失败：%1</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="509"/>
        <source>⚠ Params changed -- click Compute Strain</source>
        <translation>⚠ 参数已变更 — 请点击“计算应变”</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="186"/>
        <source>Zoom out</source>
        <translation>缩小</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="248"/>
        <source>Compute Strain</source>
        <translation>计算应变</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="254"/>
        <source>Export Results</source>
        <translation>导出结果</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="430"/>
        <source>Starting…</source>
        <translation>启动中…</translation>
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
        <translation>使用物理单位</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="68"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="83"/>
        <source>Unit: px/frame</source>
        <translation>单位：px/帧</translation>
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
        <translation>累积式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="62"/>
        <source>Incremental: each frame is compared to the previous reference frame.
Suitable for large accumulated deformation, required for large rotations.

Accumulative: every frame is compared to frame 1.
Accurate for small, monotonic deformation only.</source>
        <translation>增量式：每帧与前一个参考帧比较。
适用于大量累积变形，大旋转场景必须使用。

累积式：每帧都与第 1 帧比较。
仅适用于小的、单调的变形。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="64"/>
        <source>Tracking Mode</source>
        <translation>追踪模式</translation>
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
        <translation>Local DIC：独立子集匹配（IC-GN）。速度快，
保留局部锐利特征。适合小变形
或高质量图像。

AL-DIC：全局 FEM 正则化的增广拉格朗日方法。
强制子集间的位移相容性。适合大变形、
噪声图像，或对应变精度要求高的场景。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="87"/>
        <source>Solver</source>
        <translation>求解器</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="104"/>
        <source>Every Frame</source>
        <translation>每帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="105"/>
        <source>Every N Frames</source>
        <translation>每 N 帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="106"/>
        <source>Custom Frames</source>
        <translation>自定义帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="116"/>
        <source>When the reference frame refreshes during incremental tracking.
Every Frame: reset reference every frame (smallest per-step displacement,
most robust for large deformation).
Every N Frames: reset every N frames (balance speed vs robustness).
Custom Frames: user-defined list of reference frame indices.</source>
        <translation>增量追踪中参考帧的刷新策略。
每帧：每帧都更新参考（单步位移最小，
对大变形最稳健）。
每 N 帧：每 N 帧更新一次（速度与稳健性的折中）。
自定义：由用户指定参考帧索引列表。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="118"/>
        <source>Reference Update</source>
        <translation>参考帧更新</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="128"/>
        <source>Update reference every N frames</source>
        <translation>每 N 帧更新一次参考帧</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="130"/>
        <source>Interval</source>
        <translation>间隔</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="141"/>
        <source>Comma-separated frame indices to use as reference frames (0-based)</source>
        <translation>用作参考帧的帧索引列表（0 为起始），用逗号分隔</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="143"/>
        <source>Reference Frames</source>
        <translation>参考帧列表</translation>
    </message>
</context>
<context>
    <name>_DropZone</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="120"/>
        <source>Drop image folder
or Browse</source>
        <translation>拖入图像文件夹
或点击浏览</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="130"/>
        <source>Select Image Folder</source>
        <translation>选择图像文件夹</translation>
    </message>
</context>
<context>
    <name>_MaskPreviewPanel</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="130"/>
        <source>Preview</source>
        <translation>预览</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="134"/>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="260"/>
        <source>(no image)</source>
        <translation>（无图像）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="154"/>
        <source>Image only</source>
        <translation>仅图像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="155"/>
        <source>Image + Mask</source>
        <translation>图像 + 掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="156"/>
        <source>Mask only</source>
        <translation>仅掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="159"/>
        <source>View:</source>
        <translation>视图：</translation>
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
        <translation>蓝色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="177"/>
        <source>Red</source>
        <comment>Mask overlay color</comment>
        <translation>红色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="181"/>
        <source>Green</source>
        <comment>Mask overlay color</comment>
        <translation>绿色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="185"/>
        <source>Yellow</source>
        <comment>Mask overlay color</comment>
        <translation>黄色</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="189"/>
        <source>Mask color:</source>
        <translation>掩模颜色：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="267"/>
        <source>No mask assigned</source>
        <translation>未分配掩模</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="272"/>
        <source>Frame %1 — %2</source>
        <translation>帧 %1 — %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="287"/>
        <source>Failed to load image</source>
        <translation>无法加载图像</translation>
    </message>
</context>
</TS>
