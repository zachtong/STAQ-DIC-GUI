<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ja" sourcelanguage="en_US">
<context>
    <name>AdvancedTuningWidget</name>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="44"/>
        <source>AL-DIC Iterations</source>
        <translation>AL-DIC 反復回数</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="55"/>
        <source>Number of global refinement cycles for the AL-DIC solver.
1 = single global pass (fastest), 3 = default,
5+ = diminishing returns for most cases.</source>
        <translation>AL-DIC ソルバーの全体的な精密化反復回数。
1 = 単一パス（最速）、3 = デフォルト、
5 以上はほとんどの場合で効果逓減。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="61"/>
        <source>Only affects AL-DIC solver. Ignored by Local DIC.</source>
        <translation>AL-DIC ソルバーにのみ影響します。Local DIC では無視されます。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="74"/>
        <source>Auto-expand FFT search on clipped peaks</source>
        <translation>ピークが打ち切られたら FFT 探索を自動拡大</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/advanced_tuning_widget.py" line="80"/>
        <source>When the NCC peak reaches the edge of the search region, automatically retry with a larger region (up to image half-size, 6 retries with 2x growth).

Only relevant for the FFT init-guess mode.</source>
        <translation>NCC ピークが探索領域の端に達したら、より広い領域で自動的に再試行します(最大で画像半分まで、2 倍ずつ 6 回)。

FFT 初期推定モードでのみ有効です。</translation>
    </message>
</context>
<context>
    <name>App</name>
    <message>
        <location filename="../../gui/app.py" line="797"/>
        <source>Imported Region of Interest for %n frame(s)</source>
        <translation>%n フレームに関心領域をインポートしました</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="809"/>
        <source>Run DIC first -- no displacement results to post-process.</source>
        <translation>先に DIC を実行してください —— 後処理する変位結果がありません。</translation>
    </message>
</context>
<context>
    <name>BatchImportDialog</name>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="365"/>
        <source>Batch Import Region of Interest Masks</source>
        <translation>関心領域マスクを一括インポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="405"/>
        <source>Mask Folder:</source>
        <translation>マスクフォルダ:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="406"/>
        <source>(none)</source>
        <translation>(なし)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="411"/>
        <source>Browse...</source>
        <translation>参照…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="430"/>
        <source>Available Masks</source>
        <translation>利用可能なマスク</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="441"/>
        <source>Auto-Match by Name</source>
        <translation>ファイル名で自動マッチ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="443"/>
        <source>Match mask files to frames by number in filename</source>
        <translation>ファイル名中の番号でマスクをフレームに対応付けます</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="447"/>
        <source>Assign Sequential</source>
        <translation>順次割り当て</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="449"/>
        <source>Assign masks to frames in order starting from frame 0</source>
        <translation>フレーム 0 から順番にマスクを割り当てます</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="457"/>
        <source>Frame Assignments</source>
        <translation>フレーム割り当て</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Frame</source>
        <translation>フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Image</source>
        <translation>画像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="460"/>
        <source>Mask</source>
        <translation>マスク</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="471"/>
        <source>Assign Selected -&gt;</source>
        <translation>選択項目を割り当て -&gt;</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="473"/>
        <source>Pair selected mask(s) with selected frame(s)</source>
        <translation>選択したマスクと選択したフレームを対応付けます</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/batch_import_dialog.py" line="477"/>
        <source>Clear All</source>
        <translation>すべてクリア</translation>
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
        <translation>フィット</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1108"/>
        <source>Fit image to viewport</source>
        <translation>画像をビューポートに合わせる</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1113"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1114"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>100% (1:1) ズーム</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1118"/>
        <source>Zoom in</source>
        <translation>拡大</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1124"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1125"/>
        <source>Zoom out</source>
        <translation>縮小</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1138"/>
        <source>Show Grid</source>
        <translation>グリッドを表示</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1139"/>
        <source>Show/hide computational mesh grid</source>
        <translation>計算メッシュグリッドの表示/非表示</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1142"/>
        <source>Show Subset</source>
        <translation>サブセットを表示</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1143"/>
        <source>Show subset window on hover (requires Grid)</source>
        <translation>ホバー時にサブセットウィンドウを表示(グリッド必須)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/canvas_area.py" line="1397"/>
        <source>Placing Starting Points</source>
        <translation>シード点を配置中</translation>
    </message>
</context>
<context>
    <name>CanvasConfigOverlay</name>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="41"/>
        <source>Mode</source>
        <translation>モード</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="42"/>
        <source>Solver</source>
        <translation>ソルバー</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="43"/>
        <source>Init</source>
        <translation>初期推定</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="93"/>
        <source>Accumulative</source>
        <translation>累積式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="94"/>
        <source>Incremental</source>
        <translation>逐次式</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="102"/>
        <source>Local DIC</source>
        <translation>Local DIC</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="103"/>
        <source>ADMM (%1 iter)</source>
        <translation>ADMM (%1 反復)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="111"/>
        <source>Starting Points</source>
        <translation>シード点</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="113"/>
        <source>Previous frame</source>
        <translation>前フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="115"/>
        <source>FFT every frame</source>
        <translation>毎フレーム FFT</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/canvas_config_overlay.py" line="116"/>
        <source>FFT every %1 fr</source>
        <translation>%1 フレームごと FFT</translation>
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
        <translation>範囲</translation>
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
        <location filename="../../gui/dialogs/export_dialog.py" line="380"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="721"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="836"/>
        <source>Auto</source>
        <translation>自動</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="404"/>
        <source>Opacity</source>
        <translation>不透明度</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="408"/>
        <source>Field opacity (0 = transparent, 1 = fully opaque)</source>
        <translation>フィールドの不透明度（0 = 透明、1 = 完全に不透明）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="476"/>
        <source>All</source>
        <translation>全選択</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="478"/>
        <source>None</source>
        <translation>全解除</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="507"/>
        <source>Export Results</source>
        <translation>結果をエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="527"/>
        <source>OUTPUT FOLDER</source>
        <translation>出力フォルダ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="535"/>
        <source>Select output folder…</source>
        <translation>出力フォルダを選択…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="539"/>
        <source>Browse…</source>
        <translation>参照…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="544"/>
        <source>Open Folder</source>
        <translation>フォルダを開く</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="552"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理単位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="556"/>
        <source>Enable physical units</source>
        <translation>物理単位を有効化</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="561"/>
        <source>Scale displacement values by pixel size and show physical units on colorbar labels. Strain is dimensionless and unaffected.</source>
        <translation>変位値をピクセルサイズでスケールし、カラーバーのラベルに物理単位を表示します。ひずみは無次元量のため影響を受けません。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="576"/>
        <source>/ pixel</source>
        <translation>/ ピクセル</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="578"/>
        <source>Pixel size</source>
        <translation>ピクセルサイズ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="587"/>
        <source>fps</source>
        <translation>fps</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="589"/>
        <source>Frame rate</source>
        <translation>フレームレート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="597"/>
        <source>Data</source>
        <translation>データ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="598"/>
        <source>Images</source>
        <translation>画像</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="599"/>
        <source>Animation</source>
        <translation>アニメーション</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="600"/>
        <source>Report</source>
        <translation>レポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="620"/>
        <source>FORMAT</source>
        <translation>形式</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="622"/>
        <source>NumPy Archive (.npz)</source>
        <translation>NumPy アーカイブ (.npz)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="624"/>
        <source>MATLAB (.mat)</source>
        <translation>MATLAB (.mat)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="626"/>
        <source>CSV (per frame)</source>
        <translation>CSV(フレーム単位)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="629"/>
        <source>NPZ: one file per frame (default: single merged file)</source>
        <translation>NPZ: フレーム単位で 1 ファイル(デフォルト: 統合 1 ファイル)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="637"/>
        <source>DISPLACEMENT</source>
        <translation>変位</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="646"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="673"/>
        <source>Select:</source>
        <translation>選択:</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="661"/>
        <source>STRAIN</source>
        <translation>ひずみ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="664"/>
        <source>Run Compute Strain first.</source>
        <translation>先に「ひずみを計算」を実行してください。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="691"/>
        <source>✓ Parameters file (JSON) always exported</source>
        <translation>✓ パラメータファイル (JSON) は常にエクスポートされます</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="697"/>
        <source>Export Data</source>
        <translation>データをエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="718"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="833"/>
        <source>Export</source>
        <translation>エクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="719"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="834"/>
        <source>Field</source>
        <translation>フィールド</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="720"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="835"/>
        <source>Colormap</source>
        <translation>カラーマップ</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="722"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="837"/>
        <source>Min</source>
        <translation>最小</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="723"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="838"/>
        <source>Max</source>
        <translation>最大</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="742"/>
        <source>IMAGE SETTINGS</source>
        <translation>画像設定</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="752"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="867"/>
        <source>Format</source>
        <translation>形式</translation>
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
        <translation>カラーバーを含める</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="768"/>
        <source>Append a vertical colorbar strip to the right of each image.
Tick labels update per frame when Auto range is enabled.</source>
        <translation>各画像の右側に垂直カラーバーを追加します。
自動レンジ有効時、目盛りラベルはフレームごとに更新されます。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="773"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="888"/>
        <source>Original (frame 1 background)</source>
        <translation>原形（第 1 フレームを背景）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="778"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="893"/>
        <source>Field is drawn at the original (undeformed) node positions.
Background image is always the first frame.</source>
        <translation>フィールドは元の（未変形の）ノード位置に描画されます。
背景画像は常に最初のフレームです。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="781"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="896"/>
        <source>Deformed (current frame background)</source>
        <translation>変形後（現在のフレームを背景）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="787"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="902"/>
        <source>Field is drawn at the displaced node positions (reference + displacement).
Background image follows each frame&apos;s own photo.</source>
        <translation>フィールドは変位後のノード位置（参照 + 変位）に描画されます。
背景画像は各フレーム自身の写真を使用します。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="791"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="906"/>
        <source>Render as</source>
        <translation>描画方法</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="809"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="922"/>
        <source>Cancel Export</source>
        <translation>エクスポートをキャンセル</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="814"/>
        <source>Export Images</source>
        <translation>画像をエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="857"/>
        <source>ANIMATION SETTINGS</source>
        <translation>アニメーション設定</translation>
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
        <translation>各フレームの右側に垂直カラーバーを追加します。
自動レンジ有効時、目盛りラベルはフレームごとに更新されます。</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="927"/>
        <source>Export Animation</source>
        <translation>アニメーションをエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="944"/>
        <source>CONTENT</source>
        <translation>内容</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="946"/>
        <source>Parameter summary table</source>
        <translation>パラメータ要約表</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="950"/>
        <source>Field statistics (min/max/mean/std per frame)</source>
        <translation>フィールド統計（フレームごとの最小/最大/平均/標準偏差）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="952"/>
        <source>Sample field images</source>
        <translation>フィールド画像のサンプル</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="959"/>
        <source>Sample every</source>
        <translation>抽出間隔</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="965"/>
        <source>frames</source>
        <comment>Report: sample every N frames</comment>
        <translation>フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="971"/>
        <source>FIELDS</source>
        <translation>フィールド</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="974"/>
        <source>Displacement:</source>
        <translation>変位：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="989"/>
        <source>Strain:</source>
        <translation>ひずみ：</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1012"/>
        <source>Format: HTML (self-contained, view in any browser)</source>
        <translation>形式：HTML（自己完結型、任意のブラウザで表示可能）</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1018"/>
        <source>Generate Report</source>
        <translation>レポートを生成</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1032"/>
        <source>FRAME RANGE</source>
        <translation>フレーム範囲</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1035"/>
        <source>All frames</source>
        <translation>すべてのフレーム</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1041"/>
        <source>From</source>
        <comment>Frame range: starting frame</comment>
        <translation>開始</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1049"/>
        <source>to</source>
        <comment>Frame range: ending frame</comment>
        <translation>まで</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1080"/>
        <source>Select Output Folder</source>
        <translation>出力フォルダーを選択</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1139"/>
        <source>Exported %1 files → %2</source>
        <translation>%1 個のファイルをエクスポートしました → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1148"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1223"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1302"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1344"/>
        <source>Error: %1</source>
        <translation>エラー：%1</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1173"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1251"/>
        <source>Starting…</source>
        <translation>開始中…</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1196"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1274"/>
        <source>Rendering %1 (%2/%3)</source>
        <translation>%1 を描画中 (%2/%3)</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1202"/>
        <location filename="../../gui/dialogs/export_dialog.py" line="1280"/>
        <source>Frame %1/%2</source>
        <translation>フレーム %1/%2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1212"/>
        <source>Exported %1 images → %2</source>
        <translation>%1 枚の画像をエクスポートしました → %2</translation>
    </message>
    <message>
        <location filename="../../gui/dialogs/export_dialog.py" line="1337"/>
        <source>Report saved → %1</source>
        <translation>レポートを保存しました → %1</translation>
    </message>
</context>
<context>
    <name>FieldSelector</name>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="18"/>
        <source>Disp U</source>
        <translation>変位 U</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/field_selector.py" line="19"/>
        <source>Disp V</source>
        <translation>変位 V</translation>
    </message>
</context>
<context>
    <name>FrameNavigator</name>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="59"/>
        <source>Previous frame</source>
        <translation>前フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="69"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="170"/>
        <source>Play animation</source>
        <translation>アニメーションを再生</translation>
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
        <translation>次のフレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="93"/>
        <source>Playback speed</source>
        <translation>再生速度</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="98"/>
        <location filename="../../gui/widgets/frame_navigator.py" line="194"/>
        <source>FRAME 0/0</source>
        <translation>フレーム 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="159"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="160"/>
        <source>Pause animation</source>
        <translation>アニメーションを一時停止</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/frame_navigator.py" line="191"/>
        <source>FRAME %1/%2</source>
        <translation>フレーム %1/%2</translation>
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
        <translation>ファイル名</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="97"/>
        <source>Region</source>
        <comment>Image list column: ROI status</comment>
        <translation>領域</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="190"/>
        <location filename="../../gui/widgets/image_list.py" line="248"/>
        <source>Add</source>
        <translation>追加</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="242"/>
        <source>Edit</source>
        <translation>編集</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="245"/>
        <source>Need</source>
        <translation>未設定</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="368"/>
        <source>Import Region of Interest for %n frame(s)</source>
        <translation>%n フレームに関心領域をインポート</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="378"/>
        <source>Clear Region of Interest (%1 with region)</source>
        <translation>関心領域をクリア（%1 フレームに領域あり）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="383"/>
        <source>Clear Region of Interest</source>
        <translation>関心領域をクリア</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="396"/>
        <source>Delete %n image(s)</source>
        <translation>%n 個の画像を削除</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="496"/>
        <source>Images</source>
        <translation>画像</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="497"/>
        <source>All Files</source>
        <translation>すべてのファイル</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/image_list.py" line="508"/>
        <source>Selected %1 files for %2 frames — count must match</source>
        <translation>%2 フレームに対し %1 個のファイルが選択されました — 数量が一致する必要があります</translation>
    </message>
</context>
<context>
    <name>InitGuessWidget</name>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="80"/>
        <source>Starting Points</source>
        <translation>シード点</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="91"/>
        <source>Place a few points; pyALDIC bootstraps each with a single-point NCC and propagates the field along mesh neighbours.

Best for:
• Large inter-frame displacement (&gt; 50 px)
• Discontinuous fields (cracks, shear bands)
• Scenarios where FFT picks wrong peaks

Auto-placed per region when you draw or edit an ROI.</source>
        <translation>シード点をいくつか配置します。pyALDIC は単点 NCC で初期化し、メッシュ隣接に沿って場を伝播します。

最適な場面:
• 大きなフレーム間変位(&gt; 50 px)
• 不連続な場(亀裂、せん断帯)
• FFT が誤ピークを選ぶケース

ROI 作成/編集時に領域ごとに自動配置されます。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="100"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="282"/>
        <source>Place Starting Points</source>
        <translation>シード点を配置</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="105"/>
        <source>Enter placement mode on the canvas. Left-click to add, right-click to remove, Esc or click again to exit.</source>
        <translation>キャンバスで配置モードに入ります。左クリックで追加、右クリックで削除、Esc または再クリックで終了。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="107"/>
        <source>Auto-place</source>
        <translation>自動配置</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="111"/>
        <source>Fill empty regions with the highest-NCC node in each. Existing Starting Points are preserved.</source>
        <translation>各空領域に最高 NCC のノードを配置します。既存のシード点は保持されます。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="113"/>
        <source>Clear</source>
        <translation>クリア</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="117"/>
        <source>Remove every Starting Point. Faster than right-clicking each one individually.</source>
        <translation>すべてのシード点を削除します。1 つずつ右クリックするより高速です。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="122"/>
        <location filename="../../gui/widgets/init_guess_widget.py" line="292"/>
        <source>%1 / %2 regions ready</source>
        <translation>%1 / %2 領域 準備完了</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="141"/>
        <source>FFT (cross-correlation)</source>
        <translation>FFT(相互相関)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="152"/>
        <source>Full-grid normalized cross-correlation. Robust within the search radius; the search auto-expands when peaks clip.

Best for:
• Small-to-moderate smooth motion
• Well-textured speckle
• No special user setup needed

Cost grows with the search radius, so very large displacements become slow.</source>
        <translation>格子全体の正規化相互相関。探索半径内で頑健、ピークが打ち切られたら自動拡大します。

最適な場面:
• 小〜中程度の滑らかな動き
• 良好なスペックル
• 特別な設定が不要

コストが探索半径とともに増加するため、非常に大きな変位では遅くなります。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="163"/>
        <source>Every</source>
        <translation>毎</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="168"/>
        <source>Run FFT every N frames. N = 1 means FFT every frame (safest, slowest). N &gt; 1 uses warm-start between resets to limit error propagation to N frames.</source>
        <translation>N フレームごとに FFT を実行します。N = 1 で毎フレーム FFT(最も安全・低速)。N &gt; 1 ではリセット間でウォームスタートし、誤差伝播を N フレーム以内に抑えます。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="175"/>
        <source>(N=1 = every frame)</source>
        <translation>(N=1 は毎フレーム)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="185"/>
        <source>Only when reference frame updates (incremental only)</source>
        <translation>参照フレーム更新時のみ(逐次のみ)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="189"/>
        <source>Run FFT whenever the reference frame changes; warm-start within each segment. Typical default for incremental mode.</source>
        <translation>参照フレームが変わるたびに FFT を実行し、区間内ではウォームスタートします。逐次モードの標準設定です。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="198"/>
        <source>Previous frame</source>
        <translation>前フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="208"/>
        <source>Use the previous frame&apos;s converged displacement as the initial guess. No cross-correlation runs.

Best for:
• Very small inter-frame motion (a few pixels)
• Fastest option when motion is smooth

Errors can accumulate over long sequences. Prefer FFT or Starting Points on noisy data or when motion is larger.</source>
        <translation>前フレームの収束変位を初期推定として使用します。相互相関は実行しません。

最適な場面:
• 非常に小さなフレーム間動き(数ピクセル)
• 動きが滑らかな場合の最速オプション

長いシーケンスでは誤差が累積します。ノイズの多いデータや動きが大きい場合は FFT またはシード点を推奨します。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/init_guess_widget.py" line="280"/>
        <source>Placing... (click to exit)</source>
        <translation>配置中…(クリックで終了)</translation>
    </message>
</context>
<context>
    <name>LeftSidebar</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="178"/>
        <source>IMAGES</source>
        <translation>画像</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="185"/>
        <source>Natural Sort (1, 2, …, 10)</source>
        <translation>自然順ソート (1, 2, …, 10)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="190"/>
        <source>Sort by embedded numbers: image1, image2, …, image10
Default (unchecked): lexicographic — best for zero-padded names</source>
        <translation>ファイル名中の数字順でソート: image1, image2, …, image10
デフォルト(オフ): 辞書順 — ゼロ埋めされた名前に適しています</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="261"/>
        <source>WORKFLOW TYPE</source>
        <translation>ワークフロー種別</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="274"/>
        <source>INITIAL GUESS</source>
        <translation>初期推定</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="281"/>
        <source>REGION OF INTEREST</source>
        <translation>関心領域</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="291"/>
        <source>PARAMETERS</source>
        <translation>パラメータ</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="297"/>
        <source>ADVANCED</source>
        <translation>詳細設定</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../../gui/app.py" line="195"/>
        <source>&amp;File</source>
        <translation>ファイル</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="197"/>
        <source>Open Session…</source>
        <translation>セッションを開く…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="202"/>
        <source>Save Session…</source>
        <translation>セッションを保存…</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="208"/>
        <source>Quit</source>
        <translation>終了</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="216"/>
        <source>&amp;Settings</source>
        <translation>設定</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="217"/>
        <source>Language</source>
        <translation>言語</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="246"/>
        <source>Language changed</source>
        <translation>言語を変更しました</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="250"/>
        <source>Language set to %1. Please restart pyALDIC for all widgets to pick up the new language.</source>
        <translation>言語を %1 に変更しました。すべての画面に反映するには pyALDIC を再起動してください。</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="261"/>
        <source>Save Session</source>
        <translation>セッションを保存</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="263"/>
        <location filename="../../gui/app.py" line="290"/>
        <source>pyALDIC Session</source>
        <translation>pyALDIC セッション</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="264"/>
        <location filename="../../gui/app.py" line="292"/>
        <source>All Files</source>
        <translation>すべてのファイル</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="274"/>
        <source>Save Session Failed</source>
        <translation>セッションの保存に失敗しました</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="288"/>
        <source>Open Session</source>
        <translation>セッションを開く</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="291"/>
        <source>JSON</source>
        <translation>JSON</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="300"/>
        <source>Open Session Failed</source>
        <translation>セッションを開けませんでした</translation>
    </message>
    <message>
        <location filename="../../gui/app.py" line="652"/>
        <location filename="../../gui/app.py" line="705"/>
        <source>Load images first.</source>
        <translation>先に画像を読み込んでください。</translation>
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
        <translation>メッシュ色</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="41"/>
        <source>Click to choose mesh line color</source>
        <translation>クリックしてメッシュ線の色を選択</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/mesh_appearance_widget.py" line="50"/>
        <source>Line width</source>
        <translation>線幅</translation>
    </message>
</context>
<context>
    <name>ParamPanel</name>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="37"/>
        <source>Subset Size</source>
        <translation>サブセットサイズ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="43"/>
        <source>IC-GN subset window size in pixels (odd number)</source>
        <translation>IC-GN サブセットウィンドウサイズ(ピクセル、奇数)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="50"/>
        <source>Subset Step</source>
        <translation>サブセットステップ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="53"/>
        <source>Node spacing in pixels (must be power of 2)</source>
        <translation>ノード間隔(ピクセル、2 の累乗)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="61"/>
        <location filename="../../gui/widgets/param_panel.py" line="186"/>
        <source>Search Range</source>
        <translation>探索範囲</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="76"/>
        <source>Refine Inner Boundary</source>
        <translation>内部境界を細分化</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="82"/>
        <source>Locally refine the mesh along internal mask boundaries
(holes inside the Region of Interest). Useful for bubble / void edges.</source>
        <translation>内部マスク境界に沿ってメッシュを局所的に細分化します
(関心領域内の穴)。気泡や空隙の縁に有用です。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="83"/>
        <source>Refine Outer Boundary</source>
        <translation>外部境界を細分化</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="88"/>
        <source>Locally refine the mesh along the outer Region of Interest
boundary.</source>
        <translation>関心領域の外部境界に沿ってメッシュを局所的に細分化します。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="106"/>
        <source>Refinement aggressiveness. min element size = max(2, subset_step / 2^level). Applies uniformly to inner-, outer-boundary AND brush-painted refinement zones. Available levels depend on subset size and subset step.</source>
        <translation>細分化の強さ。最小要素サイズ = max(2, サブセットステップ / 2^レベル)。内部・外部境界およびブラシで塗った領域すべてに一律適用されます。利用可能なレベルはサブセットサイズとステップに依存します。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="108"/>
        <source>Refinement Level</source>
        <translation>細分化レベル</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="173"/>
        <source>Maximum per-frame displacement the FFT search can detect (pixels).
Set comfortably larger than the expected inter-frame motion.
For large rotations in incremental mode, this must cover
  radius × sin(per-step angle).</source>
        <translation>FFT 探索で検出可能な 1 フレームあたりの最大変位(ピクセル)。
想定されるフレーム間動きより十分大きく設定してください。
逐次モードで大回転が発生する場合、次を満たす必要があります:
  半径 × sin(1 ステップ角)。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="181"/>
        <source>Initial half-width (pixels) of the single-point NCC search at each Starting Point.
Auto-expands 2x per retry if the peak is clipped, up to image half-size.
Only affects Starting Point bootstrap; other nodes use F-aware propagation (no per-node search).</source>
        <translation>各シード点における単点 NCC 探索の初期半径(ピクセル)。
ピークが打ち切られた場合、画像半サイズまで 2 倍ずつ自動拡大します。
シード点の初期化にのみ影響し、他のノードは F-aware 伝播(ノード単位の探索なし)を使用します。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="182"/>
        <source>Initial Seed Search</source>
        <translation>初期シード探索</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="218"/>
        <source>Light</source>
        <comment>Mesh refinement severity</comment>
        <translation>軽度</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/param_panel.py" line="219"/>
        <source>Medium</source>
        <comment>Mesh refinement severity</comment>
        <translation>中程度</translation>
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
        <translation>最強</translation>
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
        <translation>最小要素サイズ = %1 px  (サブセットステップ=%2, レベル=%3)</translation>
    </message>
</context>
<context>
    <name>PhysicalUnitsWidget</name>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="54"/>
        <source>Use physical units</source>
        <translation>物理単位を使用</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="65"/>
        <source>Physical size of one image pixel</source>
        <translation>1 画像ピクセルの物理サイズ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="80"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="83"/>
        <source>Pixel size</source>
        <translation>ピクセルサイズ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="93"/>
        <source>Acquisition frame rate (used for velocity field)</source>
        <translation>取得フレームレート(速度場に使用)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="94"/>
        <source>Frame rate</source>
        <translation>フレームレート</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="162"/>
        <source>Disp: %1  Velocity: %2/s</source>
        <translation>変位：%1  速度：%2/s</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/physical_units_widget.py" line="167"/>
        <source>Disp: px  Velocity: px/fr</source>
        <translation>変位: px  速度: px/fr</translation>
    </message>
</context>
<context>
    <name>PipelineController</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="359"/>
        <source>Building pipeline configuration...</source>
        <translation>パイプライン設定を構築中…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="516"/>
        <source>Loading images...</source>
        <translation>画像を読み込み中…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="526"/>
        <source>  Loaded %1 images, shape=%2</source>
        <translation>  %1 枚の画像を読み込みました、shape=%2</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="539"/>
        <source>  ROI mask: %1, %2 pixels (%3%)</source>
        <translation>  ROI マスク：%1、%2 ピクセル（%3%）</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="567"/>
        <source>Run cancelled: define per-frame Regions of Interest for the missing reference frames or accept the inherited frame-1 mask in the next run.</source>
        <translation>実行をキャンセルしました：欠けている参照フレームに対してフレーム別の関心領域を定義するか、次回実行時に第 1 フレームのマスクを継承してください。</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="588"/>
        <source>  %n frame(s) with custom ROI masks</source>
        <translation>  %n 個のフレームでカスタム ROI マスクを使用</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="719"/>
        <source>Results received: %n frame(s)</source>
        <translation>結果を受信：%n フレーム</translation>
    </message>
</context>
<context>
    <name>PipelineWorker</name>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="189"/>
        <source>Starting DIC analysis...</source>
        <translation>DIC 解析を開始します…</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="222"/>
        <source>Analysis complete in %1s</source>
        <translation>解析が完了しました（%1 秒）</translation>
    </message>
    <message>
        <location filename="../../gui/controllers/pipeline_controller.py" line="230"/>
        <source>Analysis stopped by user.</source>
        <translation>ユーザーにより解析が停止されました。</translation>
    </message>
</context>
<context>
    <name>ROIHint</name>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="64"/>
        <source>Load images first, then draw a Region of Interest on frame 1.</source>
        <translation>まず画像を読み込み、その後フレーム 1 に関心領域を描画してください。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="72"/>
        <source>&lt;b&gt;Accumulative mode&lt;/b&gt; — only frame 1 needs a Region of Interest. All later frames are compared against it directly.</source>
        <translation>&lt;b&gt;累積モード&lt;/b&gt; — 関心領域はフレーム 1 にのみ必要です。後続フレームはすべて直接比較されます。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="82"/>
        <source>&lt;b&gt;Incremental, every frame&lt;/b&gt; — frame 1 needs a Region of Interest. It is automatically warped forward to each later frame (no per-frame drawing required).</source>
        <translation>&lt;b&gt;逐次、毎フレーム&lt;/b&gt; — フレーム 1 に関心領域が必要です。後続フレームには自動で前方ワープされます(フレーム単位の描画は不要)。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="99"/>
        <source>&lt;b&gt;Incremental, every %1 frames&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%2&lt;/b&gt; (%3 reference frames total).</source>
        <translation>&lt;b&gt;逐次、%1 フレームごと&lt;/b&gt; — 次のフレームに関心領域を描画してください: &lt;b&gt;%2&lt;/b&gt;(参照フレーム合計 %3)。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="113"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — no custom reference frames set. Frame 1 will be the only reference; add more indices in the Reference Frames field.</source>
        <translation>&lt;b&gt;逐次、カスタム&lt;/b&gt; — カスタム参照フレーム未設定。フレーム 1 が唯一の参照となります。参照フレーム欄にインデックスを追加してください。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="123"/>
        <source>&lt;b&gt;Incremental, custom&lt;/b&gt; — draw a Region of Interest on frames: &lt;b&gt;%1&lt;/b&gt; (%2 reference frames total).</source>
        <translation>&lt;b&gt;逐次、カスタム&lt;/b&gt; — 次のフレームに関心領域を描画してください: &lt;b&gt;%1&lt;/b&gt;(参照フレーム合計 %2)。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_hint.py" line="129"/>
        <source>Draw a Region of Interest on frame 1.</source>
        <translation>フレーム 1 に関心領域を描画してください。</translation>
    </message>
</context>
<context>
    <name>ROIToolbar</name>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="72"/>
        <source>+ Add</source>
        <translation>+ 追加</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="76"/>
        <source>Add region to the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>関心領域に形状を追加します(多角形 / 矩形 / 円)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="79"/>
        <source>Cut</source>
        <translation>切り取り</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="83"/>
        <source>Cut region from the Region of Interest (Polygon / Rectangle / Circle)</source>
        <translation>関心領域から形状を切り取ります(多角形 / 矩形 / 円)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="86"/>
        <source>+ Refine</source>
        <translation>+ 細分化</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="93"/>
        <source>Paint extra mesh-refinement zones with a brush
(only on frame 1 — material points auto-warped to later frames)</source>
        <translation>ブラシで追加の細分化領域を塗ります
(フレーム 1 のみ — 後続フレームへ自動ワープされます)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="98"/>
        <source>Refine brush is only available on frame 1. Switch to frame 1 to paint refinement zones; they are automatically warped to later frames.</source>
        <translation>細分化ブラシはフレーム 1 でのみ使用可能です。フレーム 1 に切り替えて領域を塗ってください。後続フレームには自動でワープされます。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="118"/>
        <source>Import</source>
        <translation>インポート</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="119"/>
        <source>Import mask from image file</source>
        <translation>画像ファイルからマスクをインポート</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="124"/>
        <source>Batch Import</source>
        <translation>一括インポート</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="126"/>
        <source>Batch import mask files for multiple frames</source>
        <translation>複数フレームのマスクファイルを一括インポート</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="139"/>
        <source>Save</source>
        <translation>保存</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="140"/>
        <source>Save current mask to PNG file</source>
        <translation>現在のマスクを PNG ファイルに保存</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="145"/>
        <source>Invert</source>
        <translation>反転</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="147"/>
        <source>Invert the Region of Interest mask</source>
        <translation>関心領域マスクを反転</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="152"/>
        <source>Clear</source>
        <translation>クリア</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="154"/>
        <source>Clear all Region of Interest masks</source>
        <translation>すべての関心領域マスクをクリア</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="186"/>
        <source>Radius</source>
        <translation>半径</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="204"/>
        <source>Paint</source>
        <translation>塗り</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="209"/>
        <source>Erase</source>
        <translation>消去</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/roi_toolbar.py" line="219"/>
        <source>Clear Brush</source>
        <translation>ブラシをクリア</translation>
    </message>
</context>
<context>
    <name>RightSidebar</name>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="58"/>
        <source>Run DIC Analysis</source>
        <translation>DIC 解析を実行</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="71"/>
        <source>Cancel</source>
        <translation>キャンセル</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="78"/>
        <source>Cancel the current analysis. Already-computed frames are kept; the run is marked as IDLE (not DONE).</source>
        <translation>現在の解析をキャンセルします。計算済みのフレームは保持され、ジョブは IDLE（DONE ではない）となります。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="84"/>
        <source>Export Results</source>
        <translation>結果をエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="92"/>
        <source>Open Strain Window</source>
        <translation>ひずみウィンドウを開く</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="97"/>
        <source>Compute and visualize strain in a separate post-processing window. Requires displacement results from a completed Run.</source>
        <translation>別ウィンドウでひずみを計算・可視化します。完了した実行結果の変位データが必要です。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="104"/>
        <source>PROGRESS</source>
        <translation>進捗</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="113"/>
        <location filename="../../gui/panels/right_sidebar.py" line="350"/>
        <source>Ready</source>
        <translation>準備完了</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="121"/>
        <location filename="../../gui/panels/right_sidebar.py" line="352"/>
        <location filename="../../gui/panels/right_sidebar.py" line="406"/>
        <source>ELAPSED  %1</source>
        <translation>経過  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="126"/>
        <location filename="../../gui/panels/right_sidebar.py" line="354"/>
        <location filename="../../gui/panels/right_sidebar.py" line="414"/>
        <location filename="../../gui/panels/right_sidebar.py" line="418"/>
        <source>REMAINING  %1</source>
        <translation>残り  %1</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="134"/>
        <source>FIELD</source>
        <translation>表示項目</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="141"/>
        <source>Show on deformed frame</source>
        <translation>変形後フレームに表示</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="146"/>
        <source>When checked, overlay results on the deformed (current) frame instead of the reference frame</source>
        <translation>オンにすると、結果を参照フレームではなく変形後(現在)フレームに重ねて表示します</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="151"/>
        <source>VISUALIZATION</source>
        <translation>可視化</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="156"/>
        <source>Colormap</source>
        <translation>カラーマップ</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="177"/>
        <source>Opacity</source>
        <translation>不透明度</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="184"/>
        <source>Overlay opacity (0 = transparent, 100 = opaque)</source>
        <translation>オーバーレイの不透明度(0 = 透明、100 = 不透明)</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="190"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理単位</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="196"/>
        <source>LOG</source>
        <translation>ログ</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="202"/>
        <source>Clear</source>
        <translation>クリア</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="321"/>
        <source>Place at least one Starting Point in each red region before running (red = needs a Starting Point).</source>
        <translation>実行前に、各赤色領域に少なくとも 1 つのシード点を配置してください(赤色 = シード点が必要)。</translation>
    </message>
    <message>
        <location filename="../../gui/panels/right_sidebar.py" line="389"/>
        <source>%1  —  Frame %2</source>
        <translation>%1  —  フレーム %2</translation>
    </message>
</context>
<context>
    <name>StrainFieldSelector</name>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="150"/>
        <source>DISPLACEMENT</source>
        <translation>変位</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_field_selector.py" line="161"/>
        <source>STRAIN</source>
        <translation>ひずみ</translation>
    </message>
</context>
<context>
    <name>StrainNavigator</name>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="73"/>
        <source>Previous frame</source>
        <translation>前フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="84"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="216"/>
        <source>Play animation</source>
        <translation>アニメーションを再生</translation>
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
        <translation>次のフレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="109"/>
        <source>Playback speed</source>
        <translation>再生速度</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="114"/>
        <location filename="../../gui/widgets/strain_navigator.py" line="228"/>
        <source>FRAME 0/0</source>
        <translation>フレーム 0/0</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="205"/>
        <source>⏸</source>
        <translation>⏸</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="206"/>
        <source>Pause animation</source>
        <translation>アニメーションを一時停止</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_navigator.py" line="223"/>
        <source>FRAME %1/%2</source>
        <translation>フレーム %1/%2</translation>
    </message>
</context>
<context>
    <name>StrainParamPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="79"/>
        <source>Plane fitting</source>
        <translation>平面フィッティング</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="80"/>
        <source>FEM nodal</source>
        <translation>FEM 節点</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="82"/>
        <source>Method</source>
        <translation>手法</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="106"/>
        <source>VSG (Virtual Strain Gauge) size is the diameter, in pixels, of the circular region around each mesh node used to fit a local displacement plane. Strain is then taken as the plane&apos;s slope.

• Larger VSG → smoother strain, lower spatial resolution.
• Smaller VSG → sharper strain, more noise.
• Rule of thumb: VSG ≥ 2 × subset step + 1 (default: 41 px).

Not used when Method = FEM nodal (there, mesh spacing itself sets the gauge size).</source>
        <translation>VSG（バーチャルひずみゲージ、Virtual Strain Gauge）サイズとは、各メッシュノード周辺で局所変位平面をフィットさせるために使う円形領域の直径（ピクセル）のことです。ひずみはこの平面の勾配として算出されます。

• VSG が大きい → ひずみは平滑になるが、空間解像度は低下。
• VSG が小さい → ひずみは鋭敏になるが、ノイズが増加。
• 目安：VSG ≥ 2 × サブセットステップ + 1（既定：41 px）。

方法が FEM nodal の場合は使用されません（そこではメッシュ間隔がゲージサイズを決定します）。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="109"/>
        <source>VSG size</source>
        <translation>VSG サイズ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="139"/>
        <source>Off</source>
        <comment>Strain smoothing preset</comment>
        <translation>オフ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="140"/>
        <source>Light (σ = 0.5 × step)</source>
        <translation>軽度（σ = 0.5 × step）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="141"/>
        <source>Medium (σ = 1 × step)</source>
        <translation>中程度（σ = 1 × step）</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="142"/>
        <source>Strong (σ = 2 × step) ⚠</source>
        <translation>強（σ = 2 × step）⚠</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="153"/>
        <source>Gaussian smoothing of the strain field after computation.
σ is the Gaussian kernel width; &apos;step&apos; = DIC node spacing.
  Light  (0.5 × step):  subtle, preserves fine features.
  Medium (1 × step):    balanced, recommended for noisy data.
  Strong (2 × step) ⚠:  aggressive, may blur real gradients.</source>
        <translation>計算後のひずみ場にガウス平滑化を適用。
σ はガウスカーネル幅、&apos;step&apos; は DIC ノード間隔。
  Light  (0.5 × step): 穏やか、細部を保持。
  Medium (1 × step):    バランス型、ノイズデータに推奨。
  Strong (2 × step) ⚠: 強め、実勾配をぼかす可能性あり。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="154"/>
        <source>Strain field smoothing</source>
        <translation>ひずみ場の平滑化</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="159"/>
        <source>Infinitesimal</source>
        <translation>微小ひずみ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="160"/>
        <source>Eulerian</source>
        <translation>オイラーひずみ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="161"/>
        <source>Green-Lagrangian</source>
        <translation>グリーン-ラグランジュひずみ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="163"/>
        <source>Strain type</source>
        <translation>ひずみ種別</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_param_panel.py" line="256"/>
        <source>⚠ VSG radius (%1 px) &lt; DIC node spacing (%2 px); plane fit will fail. Use VSG ≥ %3 px or switch Method to FEM nodal.</source>
        <translation>⚠ VSG 半径（%1 px）&lt; DIC ノード間隔（%2 px）；平面フィットは失敗します。VSG ≥ %3 px にするか、方法を FEM nodal に切り替えてください。</translation>
    </message>
</context>
<context>
    <name>StrainVizPanel</name>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="62"/>
        <source>Show on deformed frame</source>
        <translation>変形後フレームに表示</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="64"/>
        <source>Deformed</source>
        <translation>変形後</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="71"/>
        <source>Colormap</source>
        <translation>カラーマップ</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="74"/>
        <source>Auto</source>
        <translation>自動</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/strain_viz_panel.py" line="76"/>
        <source>Range</source>
        <translation>範囲</translation>
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
        <translation>ひずみ後処理</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="169"/>
        <source>Fit</source>
        <translation>フィット</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="170"/>
        <source>Fit image to viewport</source>
        <translation>画像をビューポートに合わせる</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="176"/>
        <source>100%</source>
        <translation>100%</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="177"/>
        <source>Zoom to 100% (1:1)</source>
        <translation>100% (1:1) ズーム</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="180"/>
        <source>Zoom in</source>
        <translation>拡大</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="185"/>
        <source>–</source>
        <translation>–</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="238"/>
        <source>STRAIN PARAMETERS</source>
        <translation>ひずみパラメータ</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="258"/>
        <source>Export displacement and strain results to NPZ / MAT / CSV / PNG</source>
        <translation>変位とひずみ結果を NPZ / MAT / CSV / PNG にエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="290"/>
        <source>FIELD</source>
        <translation>表示項目</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="299"/>
        <source>VISUALIZATION</source>
        <translation>可視化</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="309"/>
        <source>PHYSICAL UNITS</source>
        <translation>物理単位</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="318"/>
        <source>LOG</source>
        <translation>ログ</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="400"/>
        <source>Strain compute failed: %1: %2</source>
        <translation>ひずみ計算に失敗しました：%1：%2</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="408"/>
        <location filename="../../gui/strain_window.py" line="456"/>
        <source>Strain computation complete.</source>
        <translation>ひずみ計算が完了しました。</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="420"/>
        <source>Strain window: no displacement results to post-process.</source>
        <translation>ひずみウィンドウ：後処理する変位結果がありません。</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="472"/>
        <source>Strain compute failed: %1</source>
        <translation>ひずみ計算に失敗しました：%1</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="509"/>
        <source>⚠ Params changed -- click Compute Strain</source>
        <translation>⚠ パラメータが変更されました — 「ひずみを計算」をクリックしてください</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="186"/>
        <source>Zoom out</source>
        <translation>縮小</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="248"/>
        <source>Compute Strain</source>
        <translation>ひずみを計算</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="254"/>
        <source>Export Results</source>
        <translation>結果をエクスポート</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="430"/>
        <source>Starting…</source>
        <translation>開始中…</translation>
    </message>
    <message>
        <location filename="../../gui/strain_window.py" line="452"/>
        <source>Complete</source>
        <translation>完了</translation>
    </message>
</context>
<context>
    <name>VelocitySettingsWidget</name>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="46"/>
        <source>Use physical units</source>
        <translation>物理単位を使用</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="68"/>
        <source>/ px</source>
        <translation>/ px</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/velocity_settings.py" line="83"/>
        <source>Unit: px/frame</source>
        <translation>単位: px/frame</translation>
    </message>
</context>
<context>
    <name>WorkflowTypePanel</name>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="51"/>
        <source>Incremental</source>
        <translation>逐次式</translation>
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
        <translation>逐次: 各フレームを直前の参照フレームと比較します。
大きな累積変形に適し、大回転では必須です。

累積: 各フレームを第 1 フレームと比較します。
小さく単調な変形にのみ適します。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="64"/>
        <source>Tracking Mode</source>
        <translation>追跡モード</translation>
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
        <translation>Local DIC: 独立サブセットマッチング(IC-GN)。高速で
局所特徴を保持します。小変形や高品質画像に最適です。

AL-DIC: 全体 FEM 正則化付き拡張ラグランジュ。
サブセット間の変位適合性を強制します。
大変形・ノイズ画像・ひずみ精度重視の場合に最適です。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="87"/>
        <source>Solver</source>
        <translation>ソルバー</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="104"/>
        <source>Every Frame</source>
        <translation>毎フレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="105"/>
        <source>Every N Frames</source>
        <translation>N フレームごと</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="106"/>
        <source>Custom Frames</source>
        <translation>カスタムフレーム</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="116"/>
        <source>When the reference frame refreshes during incremental tracking.
Every Frame: reset reference every frame (smallest per-step displacement,
most robust for large deformation).
Every N Frames: reset every N frames (balance speed vs robustness).
Custom Frames: user-defined list of reference frame indices.</source>
        <translation>逐次追跡中の参照フレームの更新タイミング。
毎フレーム: 毎フレーム参照をリセット(ステップ変位最小、
大変形に最もロバスト)。
N フレームごと: N フレームごとにリセット(速度と頑健性のバランス)。
カスタム: ユーザ指定の参照フレームインデックス。</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="118"/>
        <source>Reference Update</source>
        <translation>参照フレーム更新</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="128"/>
        <source>Update reference every N frames</source>
        <translation>N フレームごとに参照を更新</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="130"/>
        <source>Interval</source>
        <translation>間隔</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="141"/>
        <source>Comma-separated frame indices to use as reference frames (0-based)</source>
        <translation>参照フレームとして使用するフレーム番号(0 始まり、カンマ区切り)</translation>
    </message>
    <message>
        <location filename="../../gui/widgets/workflow_type_panel.py" line="143"/>
        <source>Reference Frames</source>
        <translation>参照フレーム</translation>
    </message>
</context>
<context>
    <name>_DropZone</name>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="120"/>
        <source>Drop image folder
or Browse</source>
        <translation>画像フォルダをドロップ
または参照</translation>
    </message>
    <message>
        <location filename="../../gui/panels/left_sidebar.py" line="130"/>
        <source>Select Image Folder</source>
        <translation>画像フォルダを選択</translation>
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
