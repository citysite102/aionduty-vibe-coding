# 專案共用規範

本專案有兩個性質不同的區塊，套用的規範不同：

| 區塊 | 路徑 | 技術 | 適用章節 |
|---|---|---|---|
| 簡報投影片（主要產出） | `src/slides/`、`src/components/` | React + Tailwind + `motion/react` | A、B、D |
| Remotion 動畫元件 | `src/remotion/` | Remotion，frame 驅動 | C、D |

> `src/remotion/` 目前尚未被任何投影片引用，屬保留狀態。**C 章的規範只適用該目錄，不要套用到投影片上**（例如投影片沒有 frame 的概念，節奏是靠 `currentStep`）。

---

## A. 投影片規範（`src/slides/`）

### A-1 色彩

底色與文字一律走 Tailwind `slate` 階：

- 背景：`bg-[#020617]`（App 層已設定，投影片不要自行覆蓋整頁背景）
- 卡片／區塊：`bg-slate-900`，邊框 `border-slate-800`
- 主文字：`text-slate-100`／`text-slate-200`
- 次要文字：`text-slate-300` 到 `text-slate-500`

強調色只有一個主色，其餘色相僅限「語意用途」：

| 用途 | 色相 | 說明 |
|---|---|---|
| 主 accent | `sky` | 標題 icon、副標、當下要強調的那一個元素 |
| 成功／正解 | `emerald` | 僅在有正反對照時使用 |
| 警告／注意 | `amber` | 僅在有風險提示時使用 |
| 錯誤／禁止 | `red`／`rose` | 僅在示範錯誤做法時使用 |

**同一頁最多兩種強調色**。`indigo`、`violet`、`purple`、`orange`、`teal`、`cyan`、`pink`、`fuchsia`、`lime`、`yellow` 等一律不要新增；沒有語意的地方就用灰階。顏色越少越乾淨。

### A-2 節奏與分段

- 投影片內的分段一律用 `AnimatedBlock` 的 `stepIndex`，由 `currentStep` 驅動。
- **嚴禁用 `setTimeout` / `setInterval` 驅動畫面內容切換**。講者講到一半畫面自己跳走是嚴重問題。需要「切換分頁」這類效果時，用 `currentStep >= N` 決定預設值，再讓講者可手動覆蓋。
- `stepIndex` 由 1 開始，同一頁內遞增。左右兩欄要同時出現才可共用同一個號碼，否則不要重號。

### A-3 動態原則（防 AI 味的負面清單）

1. **一次只動一個重點，其他元素保持靜止。**
2. **禁止常駐無限動畫。** 具體包含：
   - Tailwind：`animate-pulse`、`animate-ping`、`animate-bounce`、`animate-spin`
   - motion：`transition={{ repeat: Infinity }}`
   - 特別注意 `.map()` 裡的條件式 class，一行程式可能生出七個閃爍點。
   - 例外：真的要表達「系統正在運轉」時，全頁最多留一組，且必須是慢速、低對比。
3. 進場用 opacity 0→1 加小位移（10 到 16px）。不要大幅飛入、不要旋轉進場、不要 `scale: 0→1` 彈跳。
4. easing 全片統一，沿用 `AnimatedBlock` 的 `easeOut`。要用 spring 就把 damping 調高，不要 Q 彈。
5. 每個重點停留夠久讓人讀完，關鍵文字至少停 1.5 到 2 秒。
6. 不要把「fade-in 加 slide-up」套在每個元素上，寧可少動。

### A-4 Tailwind 與資源

- **只用內建色階。** `slate-850`、`sky-350` 這類不存在的色階不會報錯、typecheck 也會過，但邊框會直接不渲染。
- **只用合法的間距 class。** `py-0.2`、`px-1.7` 等同樣是靜默失效，寫 `py-0.5`。
- **不引用外部網址資源**（圖片、字型、背景貼圖）。現場離線播放會破圖，一律放 `assets/`。
- 不要留不可點的裝飾性按鈕，現場真的會有人去點。用 `div` 或加上真實行為。
- 提交前跑 `npm run lint`（`tsc --noEmit`）。注意它抓不到上面兩類 class 錯誤，那要靠肉眼。

---

## B. 新增或搬動投影片的檢查清單

投影片的順序資訊分散在 `src/App.tsx` 的四個地方，漏改任何一處都會錯位，而且畫面不會報錯。**每次插頁、刪頁、換順序都要從頭走完這五步**：

1. 在 `src/slides/` 建檔，檔名沿用 `編號_模組_主題.tsx` 慣例。
2. 在 `App.tsx` 上方加 `import`。
3. 加進 `SLIDES` 陣列的正確位置。
4. 在 `SLIDE_TITLES` 的**完全相同位置**加標題。兩個陣列是靠 index 對齊的，長度必須一致。
5. **檢查是否跨越分節頁，若是則調整下拉選單的 `optgroup` 切點。**

分節頁（`*_Div_*.tsx`）目前落在 index `3` / `12` / `40` / `63`，對應的 `optgroup` 切點必須完全吻合：

| optgroup | slice 範圍 |
|---|---|
| 課前導讀 | `slice(0, 3)` |
| 解構 Vibe Coding | `slice(3, 12)` |
| Agent 的心智模型與 Claude Code 終端機實作 | `slice(12, 40)` |
| Agent 運作框架與成本分析 | `slice(40, 63)` |
| Agent 團隊與開發循環架構 | `slice(63, SLIDES.length - 1)` |
| 結語 | 最後一張 |

每組 `optgroup` 內的 `key`、`value`、`SLIDE_TITLES[]` 索引、以及顯示用的 `Slide {n}` 都帶有同一個偏移量，改切點時四個數字要一起改。**在某一節中間插一頁，該節之後的每一組切點都要往後推**，這是最常漏的一步。

---

## C. Remotion 動畫規範（僅適用 `src/remotion/`）

**畫布**
- 解析度 1920×1080，fps 30
- 每個概念一個 Composition

**色彩**
- 背景：深色 `#0E0F13`
- 主文字：`#F5F5F4`
- 次要文字／灰階：`#8A8F98`
- 主色 accent：`#5B8DEF`（只用在當下要強調的那一個元素，其他一律灰階）
- 不要引入 `theme.ts` 以外的顏色

**字體**
- 中文：Noto Sans TC
- 英文／程式碼：JetBrains Mono（用於指令、`/goal` 等 token）

**動態**
- 沿用 A-3 的六條動態原則。
- 時間一律用 frame 控制（`useCurrentFrame`、`interpolate`、`spring`），**嚴禁 `setTimeout`**。
- 不要用 CSS `transition` 或 `animate-spin`。逐格輸出時不生效，預覽會跟成品不一致，改用 `interpolate`。
- spring 統一取用 `theme.ts` 的 `springConfig`，不要各自寫 damping／stiffness。
- 不要用 `frame % N` 驅動 spring，會在每個週期邊界跳變。
- 不要 hardcode 畫布中心座標（如 `960`），改用相對值。

---

## D. 中文寫作規範

### D-1 標點

- **禁用中文破折號（U+2014，通常連打兩個）**，一律改用「，」「。」「：」或（）括號。此規則有 `.claude/settings.json` 的 PreToolUse hook 把關，但手動編輯不會被攔，仍請遵守。

### D-2 禁用的語感

- **對仗句型**：「不僅是 X，而是 Y」「不只 X，更是 Y」。
- **編造的量化數據**：「92% 精準鎖定」「99% 的機率」「效率提升 300%」。沒有可查證來源的百分比一律刪掉。
- **空洞標語**：「用最低成本發揮最大效益」「駕馭未來的最高權限」「長保不敗的通識內功」。
- **浮誇修辭**：「彈指載入」「秒速掌控」「瞬間秒殺 Bug」「無痛」「一鍵」「多功能戰情室」。
- **過度承諾**：「安全 100%」「成功率極高」「它會自己修好」「指數級成長」。
- **未來預測寫成事實**：「不可逆的趨勢」「這是接下來幾年的基本功」。要講預測就標明是預測。
- 「打造」全片留 1 到 2 處就好。

### D-3 中國用語

| 不用 | 改用 |
|---|---|
| 一鍵 | 依實際操作描述（若是組合鍵，「一鍵」語意本身就錯） |
| 上手 | 熟悉 |
| 技術棧 | 技術堆疊 |
| 調用 | 呼叫（但「呼叫 AI」多半該寫「使用 AI」） |
| 高併發 | 平行處理 |
| 依賴套件 | 相依套件 |

### D-4 譯名統一

| 原文 | 統一譯法 | 不要用 |
|---|---|---|
| Subagent | 子代理（Subagent） | 子層小幫手、側任務專員、專業側任務專員、Sub Agent |
| Orchestrator | 指揮者 | AI 專案經理 |
| Harness | 運作框架（Harness） | 安全沙箱（sandbox 才是沙箱） |
| Agentic Engineering | 代理工程（Agentic Engineering） | Agent Engineering |
| Context Engineering | 上下文工程 | 語境工程 |

大小寫固定寫法：`CLAUDE.md`（全大寫）、`claude.ai`（全小寫）、`Claude Code`、`MCP`、`Skills`。
