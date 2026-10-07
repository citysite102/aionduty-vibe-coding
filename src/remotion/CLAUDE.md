# v0.5 新逐字稿（使用者授權，2026-10-05）

全文保留，重排九段敘事：Opening → Problem → ChatVsAgent → SamuelIntro → Build → Harness → LoopEngineering → Ship → Finale。
TrailerFullScript 為自然口語節奏版，197 秒／5910 畫格；Trailer123 為使用者標示時間碼的 123 秒版，字幕與配音加速對齊；Harness 與結尾較密。
Trailer100 保留 v0.4；其餘歷史版本保留。新時序依各段口白分配，局部動態仍用固定曲線，影片循環只在鏡頭內發生。
保留使用者完整新稿，旁白暫用合成配音，並非 Samuel 聲音。左上角幕號仍移除，使用者四段實作錄影繼續使用。

# Remotion 動畫規範

## 募資影片的已確認例外（2026-10-05）

v0.4 延續使用者要求的 100 秒，3000 畫格、一支完整 Composition。八幕時間為 0–10／10–22／22–30／30–50／50–64／64–82／82–92／92–100 秒。
新增 Error 動畫、同任務的 CHAT／Agent 演示、Harness、CLAUDE.md、Rules、Hooks、子代理（Subagent）、Claude Desktop 實作與 Codex／其他 Agent 的共通觀念。各設定分開呈現，不宣稱都在 CLAUDE.md，也不宣稱跨工具設定檔相同。

- Trailer100：最新 v0.4。
- Trailer100-v03：保留 v0.3。
- Trailer90：保留 v0.2（TrailerV02.tsx、trailer-v02/、soundtrack-v02.wav）。
- Trailer90-v01：保留 v0.1。

Trailer.tsx 與 trailer/ 使用封面的深海軍藍、cyan、白色撕紙框、Samuel cutout 與 PUSH／RIP／STICK／SPLIT／LOOP／COLLAPSE；依使用者要求允許旋轉、貼紙與 cyan／blue。下方投影片規則繼續適用其他既有片段。
動態由畫格控制，跨幕物件連續。UI、資料與驗收為動畫示意；旁白為暫用 Meijia 合成配音，並非 Samuel 聲音。
文案依根目錄 D 章，保留課堂口氣與具體操作，避免空洞標語與過度承諾。

v0.4 依使用者回饋移除左上角 AI ON DUTY／幕號，加入 Ease In、Ease Out、Ease In Out 的 Bezier 曲線與貼紙落點。新增四段使用者提供的實作錄影，素材在 public/assets/clips/，Footage.tsx 以局部 Sequence 時間播放，保留桌面影片比例。右上角主題仍保留。

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

## v0.6（2026-10-06）

TrailerFullScript 與 Trailer123 使用 TrailerV06／TrailerV06Timed，保留 v0.5 兩版作比較。四項問題與 Loop 五個條件改為逐句動態大字；修正回傳錯誤箭頭與單向 AGENT 字幕板轉場；採用使用者提供的 Claude Desktop／Codex 截圖，結尾增加手繪圈線。全文、旁白與兩種片長沿用 v0.5。Motion Graphics 與 HyperFrames Animation skill 的動態原則以 Remotion 畫格實作，未切換框架。

## v0.7（2026-10-06）

TrailerFullScript 與 Trailer123 使用 TrailerV07／TrailerV07Timed，保留 v0.5 兩版作比較。移除資料庫到 CLAUDE.md 的物件橋接；移除畫面句號；字幕改為 68 px 與半透明黑底；縮入安全區；任務與驗收改為儲存及倒數提醒；新增 Samuel 企業培訓與總監資歷；標籤簡化為 Subagent。全文、旁白與兩種片長沿用 v0.5。Motion Graphics 與 HyperFrames Animation skill 的動態原則以 Remotion 畫格實作，未切換框架。

## v0.8（2026-10-06）

新 VESSEL 錄影 0–11.8 秒；結尾 cyan 粗麥克筆字稿逐字入場；主標 Black，字幕 Regular 且移除行首尾標點；移除 Problem→Chat 重疊橋接。v0.7 保留。

## v0.9（2026-10-06）

新 VESSEL 錄影 0–11.8 秒；結尾 cyan 粗麥克筆字稿逐字入場；主標 Black，字幕 Regular 且移除行首尾標點；移除 Problem→Chat 重疊橋接。v0.7 保留。

## v0.10（2026-10-06）

乾淨 Black 主標、細框與四角定位線；取消錯位描邊與字型扭曲；開場任務打字；Loop 五節點含最終 VERIFY。保留 v0.9 培訓資歷與案例素材，舊版保留。

## v0.11（2026-10-06）

沿用 v0.10 乾淨科技排版，加入兩張黑白透明迷因：開場問題段落的扶額反應、最後驗收卡片的懷疑貓。各只出現一次，保留旁白、字幕與片長。v0.10 保留。

## v0.12（2026-10-06）

沿用 v0.11 內容，迷因放大約兩倍並獨立放於右側，加入 6 幀衝入、回彈、停頓後第二拍放大、快速縮回；短句為「蛤？」「你確定？」。文字資訊改排左側，避免遮擋。旁白與片長沿用，v0.11 保留。

## v0.13（2026-10-06）

音效重新製作；無合成旁白。視覺沿用 v0.12。新混音讀取 soundtrack-v13-natural.wav／soundtrack-v13.wav，舊版混音與 Composition 均保留。獨立單聲道 SFX、立體聲配樂與提示影格表位於工作區 outputs/audio-v13。

## v0.14（2026-10-06）

自製 116 BPM 電子配樂；元件聲改乾短 pop／click，移除高音叮聲；無合成旁白。視覺沿用 v0.12。新混音讀取 soundtrack-v14-natural.wav／soundtrack-v14.wav，舊版混音與 Composition 均保留。獨立單聲道 SFX、立體聲配樂與提示影格表位於工作區 outputs/audio-v14。

## v0.15（2026-10-06）

使用提供的 Feel the Beat 配樂与八支音效節錄，原檔保留在交付來源資料夾；無合成旁白。視覺沿用 v0.12。新混音讀取 soundtrack-v15-natural.wav／soundtrack-v15.wav，舊版混音與 Composition 均保留。獨立單聲道 SFX、立體聲配樂與提示影格表位於工作區 outputs/audio-v15。

## v0.16（2026-10-06）

知識項目每次高亮加 145ms UI switch；Claude Desktop→Codex 箭頭統一尖端與同步繪製；沿用 Feel the Beat 配樂；無合成旁白。視覺沿用 v0.12。新混音讀取 soundtrack-v16-natural.wav／soundtrack-v16.wav，舊版混音與 Composition 均保留。獨立單聲道 SFX、立體聲配樂與提示影格表位於工作區 outputs/audio-v16。

## v0.17（2026-10-06）

資歷區改成雙欄數字與獨立職務區；Harness 新標題；加入資料庫 SVG 堆疊圖示及微動畫；音訊沿用 v0.16；無合成旁白。視覺沿用 v0.12。新混音讀取 soundtrack-v17-natural.wav／soundtrack-v17.wav，舊版混音與 Composition 均保留。獨立單聲道 SFX、立體聲配樂與提示影格表位於工作區 outputs/audio-v17。

## 版本保留（2026-10-06）

依使用者要求，預告片只保留 v16、v17；最新版為 v17。更早的版本元件與混音已移除；共用照片、封面、字型、剪輯素材保留以供兩版使用。

## v17 Motion 掃描（2026-10-06）

動態大字改連續水平交接；Loop 舊層保留至下一層遮罩完成；九句大字音效依中點／定格對點；去掉 Loop 首標重複刷聲。v17 使用 audio-v17 分軌；v16 保留原版分軌。


## v17 九段真人新口白

TrailerVoiceNine 為九段新錄音對位版，4888 幀、162.933 秒，無字幕。trailer-v17-voice-nine/voiceMap.ts 與 sceneTiming.ts 是字詞／動畫共用的非線性對位；音效對點見 public/assets/voice-nine/sound-cues.csv。不要把人聲加速來配畫面；v17 無字幕原版仍保留。
