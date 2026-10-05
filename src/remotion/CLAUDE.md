# Remotion 動畫規範

**適用範圍只有這個目錄。**投影片在 `src/slides/`，走的是根目錄那份 `CLAUDE.md` 的 A、B、D 章，兩邊的節奏機制完全不同：投影片沒有 frame 的概念，它靠 `currentStep` 推進。不要把這裡的規則套到投影片上，也不要反過來。

> 2026-10-05 起這個目錄有了用途：**課程預告片的動畫片段**。它仍然不被任何投影片引用
> （`src/components/RemotionPlayer.tsx` 一樣還沒有人用），輸出的是 mp4，進剪輯軟體。

## 怎麼預覽與輸出

```bash
npm run studio                              # 開 Remotion Studio，左欄選片段，可拖時間軸
npm run render:mg ChatVsAgent               # 輸出單支到 out/
npx remotion still src/remotion/index.ts ChatVsAgent out/x.png --frame=280   # 只要一張圖
```

- 片段清單在 `Root.tsx`，一個 `<Composition>` 就是一支 mp4。
- `durationInFrames` 一律比腳本上需要的長度多一兩秒，剪接修尾巴比補畫面容易。
- `out/` 是輸出目錄，已排除在版控外。
- 字體靠 `fonts.ts` 載，**新增 Composition 時不用自己 import 它**，`Root.tsx` 已經載過一次。
  渲染時跑的是無頭瀏覽器，吃不到 `index.html` 那個 Google Fonts link，少了這一步中文會掉回系統預設字。

## 畫布

- 解析度 1920×1080，fps 30
- 每個概念一個 Composition
- 字級下限比投影片高：**內文 32px、標題 40px 起跳**。影片會被人用手機看，而且沒有暫停細讀的機會。

## 色彩

**2026-10-05 改成跟投影片同一套。**原本是另一組深藍黑加另一個藍（`#0E0F13`／`#5B8DEF`），
但預告片會把這裡輸出的片段跟投影片的螢幕錄影剪在一起，兩套深色底接在一起看得出色溫不同。
現在的值在 `theme.ts` 檔頭有一張對照表，對應根目錄 `CLAUDE.md` A-1 的 `slate`／`sky` 階。

- 不要引入 `theme.ts` 以外的顏色。要加顏色先讀 A-1，只有那七個色相，`green` 與 `blue` 都不在裡面。
- 一支片段最多兩種強調色，規則同 A-1。
- **不要用發光（`boxShadow` 的彩色光暈）**。投影片沒有這個手法，接在一起會看起來像兩套素材。

## 字體

- 中文：Noto Sans TC
- 英文／程式碼：JetBrains Mono（用於指令、`/goal` 等 token）

## 動態

- **沿用根目錄 `CLAUDE.md` A-3 的六條動態原則**（一次只動一個重點、禁止常駐無限動畫、進場只用 opacity 加小位移等）。那六條跟渲染方式無關，兩邊共用。
- 時間一律用 frame 控制（`useCurrentFrame`、`interpolate`、`spring`），**嚴禁 `setTimeout`**。
- 不要用 CSS `transition` 或 `animate-spin`。逐格輸出時不生效，預覽會跟成品不一致，改用 `interpolate`。
- spring 統一取用 `theme.ts` 的 `springConfig`，不要各自寫 damping／stiffness。
- 不要用 `frame % N` 驅動 spring，會在每個週期邊界跳變。
- 不要 hardcode 畫布中心座標（如 `960`），改用相對值。
- 卡片不要寫 `flex: 1` 去撐滿整個畫布高度，內容短的時候底下會留一大塊空的。高度吃內容，整組再用外層 `justifyContent: 'center'` 置中。

## 文案照根目錄 CLAUDE.md 的 D 章

片段上的字跟投影片的字是同一個讀者在看，所以 D-2 到 D-4 全部適用：不要過度承諾、
不要用只有工程師看得懂的字、譯名照 D-4 那張表。`check:words` **掃不到這個目錄**
（它的 ROOTS 只有 `src/slides`、`src/slides-recorded`、`src/components`、`逐字稿/`、`.claude/agents/`），
所以這裡只能靠人看。

## 2026 年初那四支的現況

`OrchestratorSplit`、`WorkflowLoop`、`TwoDials`、`OvernightLoop` 是接上渲染路徑之前就寫好的，
配色已經跟著 `theme.ts` 換過來，但**內容還沒有照這份規範整理過，先不要直接拿去用**。
已知的問題：彩色光暈滿畫面、文字互相重疊（`OvernightLoop` 第 400 frame 的
「長時思考」壓在圓圈上）、用了 `green` 這個不在色票裡的色相、字小、版面偏一邊底下留白一大塊，
以及「最終完整系統」「Test-Time Compute」這類 D-2 擋的過度承諾與工程術語。
要用哪一支就先整理那一支，不要整批改。
