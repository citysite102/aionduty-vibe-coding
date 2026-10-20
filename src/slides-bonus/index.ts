/**
 * 補充單元：三家工具的這一年（2025-10 → 2026-10）。
 *
 * **這一疊不在主簡報裡**，用網址參數單獨播：
 *
 *   npm run dev    然後開 http://localhost:5173/?deck=bonus
 *   錄製模式        ?deck=bonus&clean=1
 *   指定頁與步驟    ?deck=bonus&slide=5&step=9
 *
 * 為什麼不插進 `LIVE_SLIDES`：主簡報的頁碼、`REPLACEMENTS` 的 key、`UNIT_DEFS` 的 `live`
 * 與四十份逐字稿的絕對頁碼全部靠 index 對齊（B-1），插 13 頁進去要推的東西比這一疊本身還多，
 * 而這一疊跟那八個章節沒有依賴關係。所以它走自己的陣列，`App.tsx` 只多一個 `?deck=bonus` 的分支。
 *
 * 套用的規範：A 章（色彩、節奏、Tailwind）、C 章（會過期的內容）、D 章（中文寫作）全套。
 * 不套的只有 B 章那些 index 推移的規則，因為這一疊沒有 `REPLACEMENTS`、沒有分節頁、
 * 也沒有錄製單元，`npm run check:slides` 與 `check:rec` 都不會掃到它。
 *
 * 這一疊的特別要求（C-1）：**每一頁都要掛 `SourceFoot`**，而且檔頭要寫查證日期與出處。
 * 整個單元講的都是別人家產品這一年改了什麼，沒有出處的話下一個人只能整段重查或照信。
 * 2026-10-19 查證時 OpenAI 的官方頁擋自動抓取，所以 ChatGPT 相關的頁面在畫面上
 * 用 `SourceFoot` 的 `secondhand` 標明那幾條是二手來源，不要把那個標記拿掉。
 *
 * 加頁就在 `BONUS_SLIDES` 加一筆，順序就是播放順序，沒有別的地方要同步。
 *
 * **2026-10-20 把「四個共同變化」搬到時間軸前面，不要換回去。** 學員要先拿到那四條結論，
 * 再去看那張三家並排的表，表上的 66 個日期才有地方掛；反過來先看表，
 * 他讀完只記得「東西好多」。同一輪三家那三頁的欄序也對齊成
 * 「模型 → 入口 → 各家特色」，而且一欄最多五個節點，理由寫在各頁的檔頭。
 *
 * **時間軸的資料在 `_timeline.ts`，不在頁面裡。** 附錄（15）與收尾（14）引用的日期
 * 都從那裡來，改條目去那邊改一次就好。
 *
 * **2026-10-20 季度泳道那一頁（原本的 02）拿掉了**，換成階段圖（`02_Stages`）與
 * 對齊的方向表（`03_Directions`）。講師的回饋是泳道「上下根本對不起來」：
 * 一格一到兩條，三家條數不同，同一季的三格高度就不一樣。完整的 66 條仍在附錄。
 * `_timeline.ts` 的 `headline` 欄位因此暫時沒有頁面在用，留著是因為那是
 * 「一季一家挑一到兩條」的策展結果，要把泳道接回來時直接拿得回去。
 *
 * **2026-10-19 拿掉了原本的「四段實機示範與觀察重點」那一頁。** 它把四段示範集中列成一頁，
 * 但示範的時機本來就落在那四頁上（桌面版、產出物、ChatGPT、Gemini），
 * 講到那一頁就能直接操作，不需要先看一張清單再往回翻。
 * 「要看什麼」改用 `LiveDemo` 的 `note` 掛在那幾頁上，那是這個專案標示實機操作的既有做法。
 * 檔名的 12 號留空，不要為了補號去重新命名（B-2b：檔名編號不是頁碼）。
 *
 * **標題 2026-10-19 全部重寫過一次，有兩件事是刻意的，不要當成 AI 模具去改掉：**
 *
 * 1. 「X 的年度更新：A、B、C」出現三次（Claude、ChatGPT、Gemini），
 *    「X 桌面版：⋯」也出現三次。D-5 擋的是「不相干的頁被硬塞進同一個模具」，
 *    但這一疊本來就是一個三乘二的矩陣：同樣兩個問題問三家。句型一致是為了讓讀者
 *    一眼看出這三頁是同一種頁，換掉其中幾個反而會讓人以為它們在講不同層級的東西。
 *
 * 2. 標題裡列舉的項目，數量與名稱都對得上那一頁的卡片（D-5「列舉了什麼就回去數」）：
 *    四個共同變化＝四張卡、模型／介面／記憶＝三張卡、五個產出物＝表上五列、
 *    四段實機示範＝四張卡。**改標題的時候要回去數一次，改卡片的時候也要回頭看標題。**
 *    上一版就是這樣出錯的：標題寫「從 Skills 到 Dashboards」，但那一頁的三張卡是
 *    模型、介面、記憶，Skills 與 Dashboards 兩個都不在上面。
 */
import type React from 'react';

import Cover from './01_Cover';
import Stages from './02_Stages';
import Directions from './03_Directions';
import ClaudeYear from './04_Claude_Year';
import ClaudeUI from './05_Claude_UI';
import ClaudeArtifacts from './06_Claude_Artifacts';
import ChatGptYear from './07_ChatGPT_Year';
import ChatGptUI from './08_ChatGPT_UI';
import GeminiYear from './09_Gemini_Year';
import GeminiUI from './10_Gemini_UI';
import Crosswalk from './11_Crosswalk';
import Sources from './13_Sources';
import Outlook from './14_Outlook';
import Appendix from './15_Appendix';

/** 操作列的分組名與單元名都用這一個。 */
export const BONUS_TITLE = '補充單元：Claude、ChatGPT、Gemini 年度更新';

/** 標題要跟各頁 `SlideLayout` 的 `title` 一字不差，那是下拉選單用的副本（D-5）。 */
export const BONUS_SLIDES: { Component: React.ComponentType; title: string }[] = [
  { Component: Cover, title: '主流 AI 工具的變化' },
  { Component: Stages, title: '從回答問題到交付成果的五個階段' },
  { Component: Directions, title: '四個變化方向，三家各做了什麼' },
  { Component: ClaudeYear, title: 'Claude 2026 年的變化' },
  { Component: ClaudeUI, title: 'Claude 桌面版：Cowork 併進對話之後' },
  { Component: ClaudeArtifacts, title: 'Docs 到 Motion：五個產出物，誰用得到' },
  { Component: ChatGptYear, title: 'ChatGPT 2026 年的變化' },
  { Component: ChatGptUI, title: 'ChatGPT 桌面版：Chat、Work 與 Codex' },
  { Component: GeminiYear, title: 'Gemini 2026 年的變化' },
  { Component: GeminiUI, title: 'Gemini 桌面版：Skills 與 Antigravity' },
  { Component: Crosswalk, title: 'Claude、ChatGPT、Gemini 名詞對照表' },
  { Component: Sources, title: '三家官方更新頁與查證狀況' },
  { Component: Outlook, title: '這些更新，對我們真正代表什麼？' },
  { Component: Appendix, title: '完整更新清單（附錄）' },
];
