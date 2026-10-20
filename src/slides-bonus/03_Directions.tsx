import type React from 'react';
import { Layers, PackageOpen, FileStack, Gauge, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo, brandColor, type Brand } from '../components/BrandLogos';
import { SourceFoot, SRC } from './_Source';

/**
 * 四個變化方向，一個方向一塊，每一塊固定三欄：Claude、ChatGPT、Gemini。
 *
 * **2026-10-20 從「2x2 卡片」改成這個版面，理由留著。** 卡片版一張卡裡的三家是用條列排的，
 * 三家的條數不一樣時（例如「回答」只有兩家），讀者得自己對；而講師在季度泳道上
 * 也指出同一個毛病：「上下根本對不起來」。現在欄位固定三個，**沒有的那一家也要留一格**，
 * 寫清楚為什麼沒有，對齊就不會壞掉。
 *
 * 一塊的標題就是前後對照（「三個分開的 App → 一個視窗，幾個入口」），
 * 那一句是這一塊要人記住的東西；底下灰字是白話翻譯，三欄是證據與日期。
 * 要再加第五個方向之前先確認它也寫得出前後對照，而且三家都舉得出例子，
 * 只有一家做過的事不算共同方向，那是那一家的功能，放回它自己那一頁。
 *
 * **第二塊（指示）2026-10-19 改過，原本寫「ChatGPT 查證時沒有找到同一類的東西」，那是錯的。**
 * ChatGPT 有 Skills，而且照的是同一個 Agent Skills 開放標準：官方
 * learn.chatgpt.com/docs/build-skills 寫「Skills build on the open agent skills standard」，
 * 結構一樣是 SKILL.md＋scripts／references。漏掉的原因是查開放標準那一輪，
 * 搜尋結果裡就寫著「Microsoft、OpenAI、Cursor、GitHub 已採用」，而我沒有回頭補 ChatGPT 欄。
 * **「某某已採用」這種句子要當成待查清單，不是背景資訊。**
 *
 * 最後查證：2026-10-19（Antigravity 的位置是 2026-10-20 補的）。出處：
 *   入口      support.claude.com release notes（2026-09-16）、
 *            learn.chatgpt.com/docs/whats-new（2026-07-09 Codex app 併進 ChatGPT 桌面版，
 *            原文「Codex keeps its dedicated coding experience alongside ChatGPT's Chat and Work」，
 *            全方案都有）、en.wikipedia.org/wiki/ChatGPT_Atlas（2026-08-09 關站）、
 *            gemini.google/release-notes（2026.10.13，原文「在 Mac 上點選 Gemini 應用程式頂端的
 *            『Antigravity』」，所以畫面上寫的是那個按鈕，不是「內建」）。
 *            **2026-10-20 補上「限英文介面」**：同一條官方條目寫「這項功能支援英文，
 *            並在所有支援 Antigravity 的地區推出」，所以繁中介面上沒有這個按鈕。
 *            講師開自己的 Mac 找不到它，正是因為介面是繁中。少了這五個字，
 *            學員會打開 app 找一個他看不到的東西，細節寫在 `10_Gemini_UI` 的檔頭。
 *   指示      anthropic.com/news/skills（2025-10-16）、
 *            **兩家同格式這件事 2026-10-19 查證過**：Google 官方的
 *            knowledge.workspace.google.com 那一頁寫「Skills use the open, Markdown-based
 *            SKILL.md format」「without platform lock-in」，docs.cloud.google.com 的
 *            Gemini Enterprise 文件也寫「Each skill is defined by a core SKILL.md file」。
 *            support.claude.com release notes（2025-12-18 開放標準）、
 *            learn.chatgpt.com/docs/build-skills（2026-03-23 那一週）、
 *            gemini.google/release-notes（2026.09.30）
 *   回答      claude.com/resources/articles/dashboards-and-motion（2026-10-08）、
 *            help.openai.com/en/articles/20001598-intelligent-ui-in-chatgpt
 *            （2026-10-19 補查到的官方條目，直接開是 403，內文從搜尋結果讀到）。
 *            **Gemini 這一欄刻意留白**：Canvas 一直都在，但這一年的官方更新頁上
 *            沒有查到它改版，查無資料就寫查無資料，不要為了填滿一列去湊。
 *   模型      anthropic.com/news 三條（09-22、09-28、10-07）、
 *            ai.google.dev changelog、en.wikipedia.org/wiki/GPT-6
 */
type Cell = { text: string; date: string };
/** 三家固定三欄，所以這裡只收這三個牌子，不是 `Brand` 全集。 */
type Who = Extract<Brand, 'claude' | 'openai' | 'gemini'>;

const DIRECTIONS: {
  icon: React.ElementType;
  name: string;
  before: string;
  after: string;
  plain: string;
  cells: Record<Who, Cell>;
}[] = [
  {
    icon: Layers,
    name: '入口',
    before: '三個分開的 App',
    after: '一個視窗，幾個入口',
    plain: '以前要先決定開哪一個產品，現在是進同一個地方，再決定要它怎麼幫你做事。',
    cells: {
      claude: { text: 'Cowork 併進所有對話，開工前不必先選模式', date: '2026-09-16' },
      openai: { text: 'Chat、Work、Codex 收成三個入口', date: '2026-07-09' },
      gemini: { text: 'Antigravity 併進 Mac 的 Gemini 應用，點頂端那個按鈕（限英文介面）', date: '2026-10-13' },
    },
  },
  {
    icon: PackageOpen,
    name: '指示',
    before: '每次重打一遍',
    after: '存成檔案，要用才載入',
    plain: '你交代的方法變成一份檔案，三家吃同一種 SKILL.md，寫過一次搬過去也讀得到。',
    cells: {
      claude: { text: 'Agent Skills 上線，12-18 成為公開規格', date: '2025-10-16' },
      openai: { text: 'Skills 上線，照同一個標準（免費與 Go 用不到）', date: '2026-03-23' },
      gemini: { text: 'Skills 取代 Gems，一樣是 SKILL.md', date: '2026-09-30' },
    },
  },
  {
    icon: FileStack,
    name: '回答',
    before: '一段讓你複製的文字',
    after: '檔案與可以點的面板',
    plain: '它不再只回你一段文字，而是交出一份用得到的成果：改得動的檔案、點得下去的面板。',
    cells: {
      claude: { text: 'Docs、Slides、Design 轉正式，另加 Dashboards 與 Motion', date: '2026-10-08' },
      openai: { text: 'Intelligent UI：回答裡出現按鈕、表單與圖表', date: '2026-10-07' },
      gemini: { text: 'Canvas 一直都在，這一年沒有查到改版', date: '—' },
    },
  },
  {
    icon: Gauge,
    name: '模型',
    before: '一個旗艦',
    after: '快的便宜、強的貴，照任務挑',
    plain: '同一家底下也開始讓你按用途挑，不必每次都用最強的那一層，挑的方法一年沒變。',
    cells: {
      claude: { text: 'Fable、Opus、Sonnet、Haiku 四層', date: '2026-10-07' },
      openai: { text: 'GPT-6 底下分 Astra、Sol、Luna、Instant', date: '2026-10-07' },
      gemini: { text: '難題走 4 Argon，量大的工作走 Flash 系列', date: '2026-10-13' },
    },
  },
];

const COLS: { brand: Who; name: string }[] = [
  { brand: 'claude', name: 'Claude' },
  { brand: 'openai', name: 'ChatGPT' },
  { brand: 'gemini', name: 'Gemini' },
];

export default function SlideBonusDirections() {
  return (
    <SlideLayout title="四個變化方向，三家各做了什麼" subtitle="Four directions" icon={Layers}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3.5">
        {DIRECTIONS.map((d, i) => (
          <AnimatedBlock
            key={d.name}
            stepIndex={i + 1}
            className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3.5 text-left"
          >
            {/* 標題列就是前後對照，這一行是這一塊要人記住的東西 */}
            <div className="flex items-center gap-2.5">
              <span className="shrink-0 rounded bg-slate-800 p-1.5 text-slate-400">
                <d.icon size={14} />
              </span>
              <span className="shrink-0 text-sm font-bold text-slate-300">{d.name}</span>
              <span className="shrink-0 rounded-lg bg-slate-800/70 px-2.5 py-1 text-sm text-slate-400">
                {d.before}
              </span>
              <ArrowRight size={16} className="shrink-0 text-slate-600" aria-hidden="true" />
              <span className="shrink-0 rounded-lg border border-sky-500/30 bg-sky-500/10 px-2.5 py-1 text-sm font-bold text-sky-200">
                {d.after}
              </span>
              <span className="text-sm leading-snug text-slate-400">{d.plain}</span>
            </div>

            {/* 三欄固定，沒有的那一家也要留一格，否則上下就對不起來了 */}
            <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-800 pt-3 md:grid-cols-3">
              {COLS.map((c) => {
                const cell = d.cells[c.brand];
                return (
                  <div key={c.name} className="flex flex-col gap-1">
                    <span className="flex items-center gap-2">
                      <span style={{ color: brandColor(c.brand) }}>
                        <BrandLogo brand={c.brand} size={13} />
                      </span>
                      <span className="text-xs font-bold text-slate-400">{c.name}</span>
                      <span className="font-mono text-xs text-slate-500">{cell.date}</span>
                    </span>
                    <span
                      className={`text-sm leading-snug ${
                        cell.date === '—' ? 'text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {cell.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </AnimatedBlock>
        ))}

        <Callout tone="focus" stepIndex={5}>
          四個方向合起來看：三家都在把聊天的視窗，改成
          <strong className="text-slate-100">可以把一整段工作交出去的地方</strong>。
        </Callout>

        <SourceFoot
          checked="2026-10-20"
          links={[SRC.claudeSkills, SRC.geminiSkills, SRC.claudeDash]}
          secondhand="Intelligent UI 的官方條目直接開是 403，內文從搜尋結果讀到"
        />
      </div>
    </SlideLayout>
  );
}
