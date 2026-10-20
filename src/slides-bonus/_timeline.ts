import type React from 'react';
import { Gauge, Layers, PackageOpen, FileStack, Brain, Bot, Image, Megaphone } from 'lucide-react';

/**
 * 這一年的完整更新清單。**這一疊所有跟日期有關的頁面都從這裡取資料**，
 * 不要在頁面裡另外寫一份：附錄（`15_Appendix`）與收尾（`14_Outlook`）
 * 引用的數字都靠它對齊。
 *
 * **2026-10-20 起沒有頁面在印 `headline` 與 `naming`**：季度泳道那一頁換成了
 * 階段圖與方向表（見 `index.ts` 的檔頭）。兩個欄位與下面那些寫法規定都留著，
 * 因為那是一季一家挑一到兩條的策展結果，刪掉就得重挑一次。
 *
 * ## 兩個欄位的分工
 *
 * `text` 是完整敘述，附錄整條印出來。
 * `headline` 只有關鍵事件才有，泳道上印的是它。有 `headline` 就等於
 * 「這一條是那一季那一家的關鍵突破」。
 *
 * **`headline` 要自己說得通，不是把 `text` 砍短。** 2026-10-19 踩過：
 * 原本寫「GPT-5.2 分三種」，分哪三種？那是把「分回得快、想得久、最強三種」
 * 砍掉受詞之後留下的殘句。同一輪還有「Antigravity 同日上線」（跟什麼同日？）
 * 與「Dashboards 與 Motion」（那是什麼？）。砍的時候要重寫，不是截斷。
 *
 * 兩種寫法，照那一條的性質挑：
 *   **模型發布 → 就寫型號**（`GPT-5.2`、`Gemini 4 Argon`）。型號本身就是資訊，
 *   而名牌欄的命名說明已經解釋了階層，再加形容只會讓那一格變長。
 *   **功能發布 → 說出它做什麼**，產品名第一次出現時寫成「名字：做什麼」
 *   （`Agent Skills：指示存成檔案`、`Spark：雲端替你辦事`）。
 *   同一個產品在後面的季度再出現就不必重複解釋（`Cowork 轉正式版`）。
 *
 * 長度上限 **34 個半形**（全形 17 字），那是泳道一格兩行的寬度。
 *
 * **每一季每一家一到兩條為原則，三條是上限**（`headlines()` 會截掉多的）。
 * 挑的標準是「這一季它最大的那一步」，不是「最新的那一條」：
 * Q4 Claude 挑 Dashboards 不挑 Haiku 5.5，因為模型改版每一季都有，
 * 產出物開到免費方案這一年只有一次。
 * 寫第三條之前先想想前兩條是不是其實是同一件事（Q3 ChatGPT 的「三個入口合一」
 * 與「Atlas 關站」就是，但那個產品的收場值得單獨列，所以留了三條）。
 *
 * ## 寫條目的兩個規定
 *
 * 1. **寫「那是什麼」，不是只寫「發生了什麼」。** 判斷方式：把那一條遮住日期念出來，
 *    沒聽過這個產品的人知道它在講什麼嗎？產品名第一次在表上出現時最需要這一步。
 * 2. **一條只能有一個 `kind`。** 一條同時講兩件事（「GPT-5.6；桌面版收成三個入口」）就拆成兩條，
 *    否則 icon 一定會標錯其中一半。
 *
 * ## 插條目之後要驗日期順序
 *
 * 插在中間最容易排亂，而 typecheck 抓不到（2026-10-19 一次就插錯兩欄）：
 *
 * ```bash
 * python3 -c "
 * import re, pathlib
 * s = pathlib.Path('src/slides-bonus/_timeline.ts').read_text()
 * for m in re.finditer(r\"quarter: '([^']+)'([\\s\\S]*?)\\n  },\", s):
 *     for who in ('claude', 'openai', 'gemini'):
 *         b = re.search(who + r': \\[([\\s\\S]*?)\\n    \\]', m.group(2))
 *         if not b: continue
 *         d = re.findall(r\\\"date: '([\\d-]+)'\\\", b.group(1))
 *         if d != sorted(d): print('順序不對', m.group(1), who, d)
 * "
 * ```
 *
 * ## 查證紀錄
 *
 * 最後查證：2026-10-19。逐欄的出處：
 *   Claude    support.claude.com/en/articles/12138966-release-notes（2025-10 起逐條）、
 *             anthropic.com/news（Opus 5.5 09-22、Sonnet 5.5 09-28、Haiku 5.5 10-07）、
 *             claude.com/blog/skills（2025-10-16）、
 *             claude.com/resources/articles/dashboards-and-motion（2026-10-08）。
 *             2025-10-20 的 Claude Code 網頁版官方更新頁沒收（10-15 之後直接跳到 10-23），
 *             但 claude.com/blog/claude-code-on-the-web 有：研究預覽先給 Pro 與 Max，
 *             2025-11-12 再加上 Team 與 Enterprise 的 premium seats。
 *   ChatGPT   learn.chatgpt.com/docs/whats-new（官方，週為單位）與
 *             deploymentsafety.openai.com/gpt-6-october（官方）。
 *             Skills 走 learn.chatgpt.com/docs/build-skills，原文「Skills build on the open
 *             agent skills standard」；日期取週表 2026-03-23 那一週的 Plugins launch，
 *             因為官方文件說 skills 是打包成 plugin 發的，確切公告日週表沒寫。
 *             Record & Replay 取週表 2026-06-15 那一週，說明在 /docs/extend/record-and-replay。
 *             dots 走 learn.chatgpt.com/docs/dots 與 DevDay 2026（2026-09-29）。
 *             廣告走 help.openai.com/en/articles/20001047-ads-in-chatgpt。
 *             5.1 到 5.6 的確切日期仍然來自 en.wikipedia.org/wiki/GPT-5.x 各頁，
 *             廣告後台那兩條來自新聞報導，因為 openai.com 擋自動抓取。
 *   Gemini    gemini.google/release-notes 與 ai.google.dev/gemini-api/docs/changelog。
 *             這兩份是官方的，日期以它們為準。Spark 另外對照
 *             blog.google/intl/zh-tw/products/devices-services/gemini-spark-ai，
 *             因為 release notes 的一句摘要寫成「macOS 上的 personal AI agent」，
 *             照它寫會讓學員以為那是 macOS 版的桌面程式。
 *             Antigravity 的形態對照 antigravity.google/download：它仍然是五種獨立產品
 *             （桌面應用、IDE、CLI、編輯器外掛、Python SDK），**內建進 Gemini 應用不等於被收掉**。
 *             **「內建在哪」2026-10-20 補查 gemini.google/release-notes 的 2026.10.13 條目**：
 *             原文寫「在 Mac 上點選 Gemini 應用程式頂端的『Antigravity』」，
 *             點下去可以在對話裡寫程式、做網頁與原型。也就是應用程式頂端的一個按鈕，
 *             不是分頁也不是另一個模式。限制：個人 Google 帳號與符合資格的商業帳號、
 *             18 歲以上、目前只有英文、限 Antigravity 本來就支援的地區。
 *             **畫面上寫「內建」沒有回答學員「我要點哪裡」，三頁都改成講那個按鈕。**
 *
 * **2026-10-19 逐條覆核過三輪，改動最大的幾處不要改回去：**
 *   support.claude.com 的 release notes 回溯得到 2025-10，第一次只抓到 2026-07 之後，
 *   於是 Claude 欄整個 2026 上半年都是二手摘要，錯了四處：Cowork 研究預覽是 01-12
 *   （01-16 就開到 Pro，不是「只給 Max」）、操作電腦是 03-23 的研究預覽不是跟正式版一起來、
 *   Opus 4.8 是 05-28 不是 6 月、「2026-03-20 Projects」查無此事（已刪）。
 *   Opus 5.5 的「便宜四成」比的是 Opus 5（$4／$20 對 $5／$25），不是 Fable 5.1，
 *   錯誤來源是一則新聞摘要把兩個比較對象接成一句。
 *   ChatGPT 的 Skills 原本整欄漏掉，而查開放標準時搜尋結果就寫著「OpenAI 已採用」，
 *   **「某某已採用」要當待查清單，不是背景資訊**。
 *   廣告原本寫「付費方案沒有」是錯的：官方寫 Free 與 Go 會有，而 Go 是付費方案。
 *
 * 細節（記憶的三個階段、API 額度的金額與限制、M365 四個 app、Cowork 與 Research 的差別、
 * dots 的方案與地區、Antigravity 2.0 跟 1.0 差在哪）寫在 `15_Appendix.tsx` 的檔頭。
 */

/** 類別記號。只用圖形區分不上色：一頁最多兩個強調色，八類各給一色會變成調色盤。 */
export const KINDS = {
  model: { icon: Gauge, label: '模型' },
  entry: { icon: Layers, label: '開工的入口' },
  instruct: { icon: PackageOpen, label: '存起來的指示' },
  output: { icon: FileStack, label: '回答的形式' },
  memory: { icon: Brain, label: '記憶' },
  agent: { icon: Bot, label: '替你操作電腦' },
  media: { icon: Image, label: '圖像影音' },
  biz: { icon: Megaphone, label: '方案與廣告' },
} as const satisfies Record<string, { icon: React.ElementType; label: string }>;

export type Kind = keyof typeof KINDS;

export type Entry = {
  date: string;
  text: string;
  kind: Kind;
  /** 有這個欄位＝這一季那一家的關鍵突破，泳道會印它。全形 12 字以內。 */
  headline?: string;
};

export type Quarter = {
  quarter: string;
  /** 泳道上那一季的欄頭。寫三家共同在動的那件事，寫不出來就不要硬寫。 */
  theme: string;
  claude: Entry[];
  openai: Entry[];
  gemini: Entry[];
};

export const QUARTERS: Quarter[] = [
  {
    quarter: '2025 Q4',
    theme: '指示存成檔案、瀏覽器',
    claude: [
      { date: '10-15', text: 'Haiku 4.5', kind: 'model' },
      {
        date: '10-16',
        text: 'Agent Skills：把常用的指示存成檔案，要用才載入',
        kind: 'instruct',
        headline: 'Agent Skills：指示存成檔案',
      },
      { date: '10-20', text: 'Claude Code 上網頁版，研究預覽先給 Pro 與 Max', kind: 'entry' },
      { date: '10-23', text: '記憶上線：記得你講過的事，先給 Max', kind: 'memory', headline: '記憶：記得你講過的事' },
      { date: '11-24', text: 'Opus 4.5', kind: 'model' },
      { date: '11-24', text: 'Claude for Excel 開 beta，在試算表裡直接叫它改報表', kind: 'entry' },
      { date: '12-18', text: 'Agent Skills 成為公開規格，像 MCP 一樣別家也能照著做', kind: 'instruct' },
    ],
    openai: [
      { date: '10-21', text: 'Atlas 瀏覽器（只有 macOS）', kind: 'entry', headline: 'Atlas 瀏覽器上線' },
      { date: '11-12', text: 'GPT-5.1', kind: 'model' },
      { date: '12-11', text: 'GPT-5.2，分回得快、想得久、最強三種', kind: 'model', headline: 'GPT-5.2' },
    ],
    gemini: [
      { date: '11-18', text: 'Gemini 3', kind: 'model', headline: 'Gemini 3' },
      {
        date: '11-18',
        text: 'Antigravity 與 Gemini 3 同日上線，Google 的程式開發工具',
        kind: 'entry',
        headline: 'Antigravity：寫程式的工具',
      },
      { date: '11-20', text: 'Nano Banana Pro', kind: 'media' },
      { date: '12-05', text: 'Gemini 3 Pro DeepThink，想久一點再回答的版本', kind: 'model' },
      { date: '12-17', text: 'Gemini 3 Flash', kind: 'model' },
    ],
  },
  {
    quarter: '2026 Q1',
    theme: '代理開始動手',
    claude: [
      {
        date: '01-12',
        text: 'Cowork 研究預覽：把事情交給它做完，先給 Max',
        kind: 'agent',
        headline: 'Cowork：事情交給它做完',
      },
      { date: '02-05', text: 'Opus 4.6', kind: 'model' },
      { date: '02-17', text: 'Sonnet 4.6，一次讀得進一百萬個 token（beta）', kind: 'model' },
      { date: '03-02', text: '記憶開到所有方案，含免費', kind: 'memory' },
      {
        date: '03-23',
        text: '操作電腦的研究預覽擴到 Pro 與 Max',
        kind: 'agent',
        headline: '會操作你的電腦',
      },
    ],
    openai: [
      { date: '01-16', text: '宣布要在 ChatGPT 放廣告', kind: 'biz' },
      { date: '02-05', text: 'GPT-5.3-Codex，專門給寫程式用的版本', kind: 'model' },
      {
        date: '02-09',
        text: '免費與 Go（低價方案）開始出現標示過的廣告',
        kind: 'biz',
        headline: '免費方案開始有廣告',
      },
      { date: '03-05', text: 'GPT-5.4', kind: 'model' },
      {
        date: '03-19',
        text: '宣布 ChatGPT、Codex、Atlas 要併成一個 App',
        kind: 'entry',
        headline: '宣布三個 App 要合併',
      },
      { date: '03-23', text: 'Skills 上線，跟 Claude 同一種檔案格式', kind: 'instruct' },
    ],
    gemini: [
      { date: '02-19', text: 'Gemini 3.1 Pro', kind: 'model', headline: 'Gemini 3.1 Pro' },
      { date: '02-26', text: 'Nano Banana 2', kind: 'media', headline: 'Nano Banana 2：做圖' },
    ],
  },
  {
    quarter: '2026 Q2',
    theme: '進到你原本的工具裡',
    claude: [
      { date: '04-09', text: 'Cowork 正式版上 macOS 與 Windows', kind: 'agent' },
      { date: '04-16', text: 'Opus 4.7', kind: 'model' },
      {
        date: '05-07',
        text: 'Claude 進 Excel、PowerPoint、Word 正式版，Outlook beta',
        kind: 'entry',
        headline: '進 Office 四件套',
      },
      { date: '05-28', text: 'Opus 4.8，開始可以調它要想多久', kind: 'model' },
      {
        date: '05-28',
        text: 'Dynamic Workflows 研究預覽：一次派出上百個子代理',
        kind: 'agent',
        headline: '一次派出上百個代理',
      },
      {
        date: '06-09',
        text: 'Fable 5：當時最強的一層，難題與長時間的專案用',
        kind: 'model',
        headline: 'Fable 5：最強的那一層',
      },
      { date: '06-30', text: 'Sonnet 5', kind: 'model' },
    ],
    openai: [
      {
        date: '04-21',
        text: 'ChatGPT Images 2.0（gpt-image-2），全部方案都能用',
        kind: 'media',
        headline: 'Images 2.0 做圖',
      },
      { date: '04-23', text: 'GPT-5.5', kind: 'model' },
      { date: '05-05', text: '廣告後台自助版 beta 開放全美廣告主', kind: 'biz' },
      {
        date: '06-15',
        text: 'Record & Replay：錄一次就產生 Skill（限 macOS）',
        kind: 'instruct',
        headline: '錄一次就產生 Skill',
      },
    ],
    gemini: [
      {
        date: '04-15',
        text: 'Gemini for Mac：免費下載的桌面應用，macOS 15 以上',
        kind: 'entry',
        headline: 'Mac 桌面版，免費下載',
      },
      { date: '05-07', text: 'Gemini 3.1 Flash-Lite，主打快與便宜', kind: 'model' },
      { date: '05-19', text: 'Gemini 3.5 Flash', kind: 'model' },
      {
        date: '05-19',
        text: 'Antigravity 2.0：改成同時管好幾個代理的桌面應用',
        kind: 'entry',
        headline: 'Antigravity 2.0 管多個代理',
      },
      { date: '05-19', text: 'Antigravity Agent 預覽：用 API 叫得動的代理', kind: 'agent' },
      { date: '06-24', text: 'Computer Use 工具公開預覽，它可以代替你點畫面', kind: 'agent' },
      {
        date: '06-30',
        text: 'Spark：macOS 應用裡的個人 AI 代理，接上 Gmail 與文件替你辦事',
        kind: 'agent',
        headline: 'Spark：雲端替你辦事',
      },
    ],
  },
  {
    quarter: '2026 Q3',
    theme: '入口收成一個視窗',
    claude: [
      { date: '07-07', text: 'Cowork 上網頁與手機', kind: 'agent' },
      { date: '07-24', text: 'Opus 5', kind: 'model' },
      { date: '08-25', text: '記憶跨對話與 Cowork，條目可以自己改', kind: 'memory' },
      { date: '09-01', text: 'Fable 5.1，官方說是寫程式與知識工作最強的一個', kind: 'model' },
      { date: '09-16', text: 'Cowork 併進所有對話', kind: 'entry', headline: 'Cowork 併進對話' },
      { date: '09-16', text: '回答可以直接是一份 Slides 或 Docs', kind: 'output', headline: '回答可以是 Slides 或 Docs' },
      { date: '09-22', text: 'Opus 5.5（09-28 接著出 Sonnet 5.5）', kind: 'model' },
    ],
    openai: [
      { date: '07-09', text: 'GPT-5.6', kind: 'model' },
      {
        date: '07-09',
        text: '桌面版收成 Chat、Work、Codex 三個入口，Codex 同時管多個代理',
        kind: 'entry',
        headline: 'Chat／Work／Codex 合一',
      },
      {
        date: '08-09',
        text: 'Atlas 關站，瀏覽能力移進 ChatGPT 與 Codex',
        kind: 'entry',
        headline: 'Atlas 關站',
      },
      { date: '08-31', text: 'GPT-6 Astra 先上 Pro 與 Enterprise', kind: 'model' },
      { date: '09-08', text: 'ChatGPT Images 2.5，改圖更準、出圖更快', kind: 'media' },
      {
        date: '09-22',
        text: 'GPT-6 Sol 與 Luna：Sol 接複雜的程式與專業工作',
        kind: 'model',
      },
      {
        date: '09-29',
        text: 'DevDay：dots 常駐代理，Slack 與 Teams 也叫得到',
        kind: 'agent',
        headline: 'dots 常駐代理',
      },
    ],
    gemini: [
      { date: '07-21', text: 'Gemini 3.6 Flash', kind: 'model' },
      {
        date: '08-13',
        text: 'Gemini 3.7 Flash，主打寫程式與代理',
        kind: 'model',
        headline: 'Flash 這一年換六版',
      },
      { date: '09-02', text: 'Gemini 3.8 Flash', kind: 'model' },
      {
        date: '09-10',
        text: '桌面版補上 Windows，按 Alt + Space 從任何畫面叫出來',
        kind: 'entry',
        headline: '桌面版補上 Windows',
      },
      {
        date: '09-30',
        text: 'Skills 取代 Gems（舊的自訂角色），自動搬過去',
        kind: 'instruct',
        headline: 'Skills 取代 Gems',
      },
    ],
  },
  {
    quarter: '2026 Q4',
    theme: '回答不再只是文字',
    claude: [
      { date: '10-07', text: 'Haiku 5.5', kind: 'model' },
      { date: '10-07', text: 'Max 與 Team 每月附 API 額度，拿去串自己的程式', kind: 'biz' },
      {
        date: '10-08',
        text: '做看板的 Dashboards 與做動畫的 Motion 進 beta',
        kind: 'output',
        headline: '多了做看板與做動畫',
      },
      {
        date: '10-08',
        text: 'Docs、Slides、Design 出 beta，每個方案都能用',
        kind: 'output',
        headline: 'Docs 與 Slides 免費就能用',
      },
    ],
    openai: [
      {
        date: '10-07',
        text: 'GPT-6 換上 ChatGPT，免費與付費方案都有',
        kind: 'model',
        headline: 'GPT-6 上線，Sol 接難題',
      },
      {
        date: '10-07',
        text: 'Intelligent UI：回答裡開始出現可以點的面板',
        kind: 'output',
        headline: 'Intelligent UI：可點的面板',
      },
    ],
    gemini: [
      { date: '10-06', text: 'Nano Banana 2.1', kind: 'media' },
      { date: '10-13', text: 'Gemini 4 Argon', kind: 'model', headline: 'Gemini 4 Argon' },
      {
        date: '10-13',
        text: 'Mac 的 Gemini 應用頂端多一個 Antigravity 按鈕，點了在對話裡寫程式',
        kind: 'entry',
        headline: 'Gemini 應用裡就能寫程式',
      },
    ],
  },
];

/**
 * 三家的欄位名與命名方式。沒有命名那一行，學員第一次撞到的就是不知道誰大誰小的型號。
 * `naming` 印在泳道的名牌欄，那一欄只有 7.5rem，**超過三行就會把整條泳道撐高**，
 * 所以寫到剛好講完規則就停，完整的說明在各家自己那一頁。
 */
export const BRANDS = [
  {
    key: 'claude' as const,
    brand: 'claude' as const,
    name: 'Claude',
    naming: 'Haiku → Sonnet → Opus → Fable 由便宜到貴',
  },
  {
    key: 'openai' as const,
    brand: 'openai' as const,
    name: 'ChatGPT',
    naming: '數字是世代，同一代再分四種',
  },
  {
    key: 'gemini' as const,
    brand: 'gemini' as const,
    name: 'Gemini',
    naming: 'Pro 想得久，Flash 接量大的工作',
  },
];

/**
 * 那一季那一家的關鍵突破。**三條是硬上限**，多挑的會被截掉。
 * 一格放幾條決定整條泳道的高度（grid 的列高吃最高的那一格），
 * 2026-10-19 試過放四條，整頁溢出 249px，收尾跟出處都被擠到摺線下。
 *
 * 所以挑第三條之前先問：這一季那一家真的有三件事嗎？挑不下的兩種解法：
 *   **同一個產品在別的季度也現身**，就讓中間那次讓位（Cowork 留 Q1 與 Q3，Q2 的轉正式版不掛）。
 *   **同一代的事情**，併到後面那一條去講（Sol 的強項寫進 Q4 的「GPT-6 上線，Sol 接難題」）。
 */
export function headlines(q: Quarter, who: 'claude' | 'openai' | 'gemini') {
  return q[who].filter((e) => e.headline).slice(0, 3);
}
