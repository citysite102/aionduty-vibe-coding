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
| 對照的另一邊 | `indigo` | 僅在同一頁有成對對照時使用，見下方 |
| 成功／正解 | `emerald` | 僅在有正反對照時使用 |
| 警告／注意 | `amber` | 僅在有風險提示時使用 |
| 錯誤／禁止 | `red`／`rose` | 僅在示範錯誤做法時使用 |

**同一頁最多兩種強調色**。`violet`、`purple`、`orange`、`teal`、`cyan`、`pink`、`fuchsia`、`lime`、`yellow` 等一律不要新增；沒有語意的地方就用灰階。顏色越少越乾淨。

#### `indigo` 的職務：成對對照的第二邊

`indigo` 只有一個用途：一頁裡有兩個並列、需要互相對照的東西時，第一邊用 `sky`，第二邊用 `indigo`。

已經在用這個模式的頁面：

| 頁面 | 第一邊（`sky`） | 第二邊（`indigo`） |
|---|---|---|
| `10c_M1_WebArch` | 前端 (Client) | 後端 (Server) |
| `10c2_M1_WebArchDuties` | 前端負責 | 後端與資料庫 |
| `06_Threads` | Thread A | Thread B |
| `09_M1_CodeIntro` | 對話框 | 裝在你電腦裡 |
| `13_M1_Example2` | 執行前 | 執行後 |

判斷方式很簡單：**如果拿掉 `indigo` 那一邊，畫面上就沒有東西在跟它對照，那就不該用 `indigo`。**

因此以下三種都不算對照，要改掉：

1. **單一強調**：整頁只有一個重點，卻標成 `indigo`。那是 `sky` 的工作。
2. **項目編號**：三、四個平等的項目各給一色，`indigo` 只是其中一格。平等的項目一律灰階，只讓當下要講的那一個亮起來。
3. **純裝飾**：漸層、光暈、背景色塊裡的 `indigo`，沒有掛在任何文字或概念上。直接刪掉。

`sky` 與 `indigo` 成對出現時**合計算一種強調色**，因為它們是同一個對照關係的兩邊。所以「前端 sky / 後端 indigo / API emerald」的三段式圖解是合法的。單獨出現的 `indigo`（沒有 `sky` 跟它配對）則算違規，不是算一種。

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
- **內容區的外層要用 `min-h-full`，不要用 `h-full`。** `SlideLayout` 的內容區是 `overflow-y-auto`，外層寫 `h-full` 加 `justify-center` 時，內容一旦超過高度就會上下同時溢出，**上緣會被推到捲動範圍外面，捲不到也看不到**。`min-h-full` 是「至少這麼高」，超過就往下長，捲動正常。這種錯不會報錯也不會被 typecheck 抓到。
- **不引用外部網址資源**（圖片、字型、背景貼圖）。現場離線播放會破圖，一律放 `assets/`。
- 不要留不可點的裝飾性按鈕，現場真的會有人去點。用 `div` 或加上真實行為。
- 提交前跑 `npm run lint`（`tsc --noEmit`）。注意它抓不到上面兩類 class 錯誤，那要靠肉眼。

---

## B. 新增或搬動投影片的檢查清單

### B-0 先看懂兩層結構

畫面上的頁面順序不是手寫的，是推導出來的：

```
LIVE_SLIDES  ─┐
LIVE_TITLES  ─┼─→ ENTRIES ─→ SLIDES / SLIDE_TITLES（畫面實際播的）
REPLACEMENTS ─┘
```

- **`LIVE_SLIDES` / `LIVE_TITLES`**（`src/App.tsx`）是「未拆頁」的順序，兩個陣列靠 index 對齊，長度必須一致。
- **`REPLACEMENTS`**（`src/slides-recorded/registry.ts`）的 key 是 **LIVE index**，把那一頁換成一組預錄頁。目前 8 頁被拆成 56 頁。
- **`SECTION_DEFS`** 的 `start` 也是 **LIVE index**，指向一張分節頁（`*_Div_*.tsx`）。下拉選單的 `optgroup` 由它自動推導，**不需要手動維護 slice 範圍**。

`SLIDES`、`SLIDE_TITLES`、`SECTIONS` 都是衍生值，不要直接改。

### B-1 插一頁 live 頁面

1. 在 `src/slides/` 建檔，檔名沿用 `編號_模組_主題.tsx` 慣例。
2. 在 `App.tsx` 上方加 `import`。
3. 插進 `LIVE_SLIDES` 的正確位置。
4. 在 `LIVE_TITLES` 的**完全相同位置**插標題。
5. **把所有「大於等於插入位置」的 index 往後推 1**，這是最容易漏的一步：
   - `SECTION_DEFS` 的每個 `start`
   - `REPLACEMENTS` 的每個 key（連同它上面的 `// index N = 原「⋯」` 註解）

刪頁就是同樣的事往前推 1。**在陣列尾端加頁、或是往 `REPLACEMENTS` 既有的 key 底下多塞一頁預錄頁，都不會造成位移**，可以跳過第 5 步。

### B-2 跑自檢，不要靠肉眼數

```bash
npm run check:slides
```

它會抓四類「不會報錯、typecheck 也抓不到」的錯：

| 檢查 | 抓什麼 |
|---|---|
| 兩個陣列長度 | `LIVE_SLIDES` 與 `LIVE_TITLES` 不一致 |
| `REPLACEMENTS` key | key 指到了別頁（拿註解裡的標題比對 `LIVE_TITLES[key]`） |
| `SECTION_DEFS` start | start 沒有落在分節頁上 |
| 分節頁涵蓋率 | 有 `*_Div_*.tsx` 卻沒有對應的 `SECTION_DEFS`，講者在選單裡會找不到那一節 |

**每個 `REPLACEMENTS` 項目上面都要有 `// index N = 原「標題」` 註解。** 那是自檢唯一能核對 key 有沒有指錯的依據，少了它，key 被改錯也看不出來，所以缺註解會直接報錯。

改完順序也跑一次 `npm run lint` 與 `npm run check:rec`。三支都過再提交。

### B-3 投影片內文不要寫絕對頁碼或頁數

`p70 - 73`、「這一段共 14 頁」、「你現在看到的這 86 頁」、「接下來四頁講這個」這類寫法，插頁或拆頁之後全部會失效，而且**畫面右下角一直顯示著正確的「Slide N / 總數」，兩邊對不上比沒寫更糟**。typecheck 也抓不到。

改用不帶數字的說法：「接下來這一段」「整份簡報」。分節頁的路線圖用 `SectionDivider` 的 `weight`，那是相對比例，不是頁數。

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
- **收尾金句**：「答得出這三題，這一段就過了」「規矩靠人記會忘，靠程式擋不會」這種自我滿足的結語。頁面結尾要嘛給具體的下一步，要嘛就不要寫。
- **自創比喻**：「不是預設收容所」「像一位隨時待命的副駕駛」。比喻若沒有增加理解就是裝飾，直接講事實。
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
| 本地／本地端 | 本機 |
| 運行 | 執行、跑（「運作原理」這種詞組不受影響） |
| 場景 | 情境 |
| 加載 | 載入 |
| 開箱即用 | 現成可用、不用自己架 |
| 痛點 | 問題、卡住的地方 |
| 土炮 | 自己摸索、自己土法做 |
| 質變／量變 | 直接講清楚變化是什麼 |

**判定原則**：台灣也在用的詞不算中國用語，不要為了「看起來更正式」去改。以下是常見的誤判，維持原樣即可：

| 常被誤判 | 判定 |
|---|---|
| 打開、點擊 | 台灣日常與正式文件都在用。「開啟」「點選」只是文體偏好，本專案走白話路線，維持口語 |
| 通過 | 「通過測試」「通過 Code Review」是正確用法。只有當它等於「經由」時才要改（例：資料通過網路送出 → 經由網路送出） |
| 日誌 | 台灣技術圈通用。本專案的「航行日誌」是刻意的比喻設計 |
| 配置 | 「配置記憶體」是 memory allocation 的標準譯法 |
| 在線上 | 台灣用法，意思是已經上線 |

### D-4 譯名統一

| 原文 | 統一譯法 | 不要用 |
|---|---|---|
| Subagent | 子代理（Subagent） | 子層小幫手、側任務專員、專業側任務專員、Sub Agent |
| Orchestrator | 指揮者 | AI 專案經理 |
| Harness | 運作框架（Harness） | 安全沙箱（sandbox 才是沙箱） |
| Agentic Engineering | 代理工程（Agentic Engineering） | Agent Engineering |
| Context Engineering | 上下文工程 | 語境工程 |

大小寫固定寫法：`CLAUDE.md`（全大寫）、`claude.ai`（全小寫）、`Claude Code`、`MCP`、`Skills`。
