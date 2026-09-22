import { BookCopy, FileText, Bot, Play, Sliders } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import type { RecordedMeta } from '../slides-recorded/types';

/**
 * 速查表，學員會停在上面逐列對照，所以 kind 標 reference，不套 160 字與 45 秒。
 * 口白照樣要有，否則錄影時這一頁無聲。
 *
 * `id` 裡的數字不是頁碼（B-2b）：那是建檔當時的頁次，這一頁現在是 Slide 119。
 * 沒有任何程式讀那個欄位，搬頁時不用跟著改。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-09-23，右欄逐列對照下列官方文件：
 *   - agents.md：「A simple, open format for guiding coding agents」，列出二十幾種支援的工具，
 *     現由 Linux Foundation 底下的 Agentic AI Foundation 維護。
 *   - cursor.com/docs/context/rules：「Project rules live in `.cursor/rules` as `.mdc` files」，
 *     同一頁寫明 Cursor 也讀 `AGENTS.md`，是 `.cursor/rules` 的簡易替代。
 *   - cursor.com/docs/agent/modes：Cursor 的 Plan Mode。
 *   - developers.openai.com/codex（Plan mode 一節）：Codex 的 Plan mode，`/plan` 或 `Shift + Tab` 進入。
 *   - cursor.com/docs/agent/subagents：Cursor 也叫 subagents，放在 `.cursor/agents/`。
 *   - code.visualstudio.com/docs/copilot/chat/chat-modes：VS Code Copilot 的自訂 agent 是 `.agent.md`，
 *     並且「Subagents can run with a custom agent」。
 *
 * 這一輪改掉的是第 2 到第 4 列的右欄。原本寫「Chat-only」「Agent Teams」
 * 「Autonomous Loop、Goal-oriented Loop」，那幾個不是任何一家的產品名稱，
 * 是描述性的說法，學員拿去搜尋找不到東西。第 4 列查不到共通名稱，就誠實寫沒有，
 * 改成指出要找的那個能力與兩個真的指令。
 *
 * 下次改版前重查上面六個網址，不要憑印象改。產品的模式名稱是 C-3 點名最會改的那一類。
 * ─────────────────────────────────────────────────────
 */
export const meta: RecordedMeta = {
  id: 'live-118-cheat-tools',
  title: '跨工具名詞對照表',
  script:
    '前面講的都是 Claude Code，換一家會不會白學？不會，這四件事換到 Cursor、Codex 或別家一樣成立。專案規則手冊在這裡叫 CLAUDE.md，跨工具的共通檔名是 AGENTS.md，二十幾種工具都讀它，Cursor 另外有自己的 rules 資料夾。先想再動手這一項，連名字都一樣：Cursor 跟 Codex 也叫 Plan mode，Codex 打斜線 plan 或按 Shift Tab 進去。分工派工，這裡叫子代理，Cursor 也叫 subagents，放在它的 agents 資料夾，VS Code 的 Copilot 則是自訂 agent。最後一項比較特別：自己跑自己修沒有共通的名字，你要找的是能不能不互動地跑完一輪，Claude Code 是 claude 減 p，Codex 是 codex exec。到新工具的第一天，你要找的就是這四個東西放在哪裡；找不到的那一項，通常代表那個工具還沒做。畫面下面附了查證的出處，這幾家改版很快，用之前先對一次。',
  seconds: 72,
  kind: 'reference',
};

/**
 * 這一頁原本是一個四頁籤的互動元件，每個頁籤右邊掛兩塊英文程式碼範例。
 * 模擬授課時它是學員放空的五頁之一：投影幕上一整片英文，而她要看的其實只有
 * 「同一件事在別家叫什麼名字」這一句。程式碼範例在螢幕前有用，在投影幕上沒有。
 *
 * 現在只留對照本身，四列一次看完。左邊那欄的名字是這門課教過的東西，
 * 右邊那欄是換工具之後要去找什麼字，最後一欄回答「我為什麼會用到」。
 *
 * Plan Mode 那一列原本的範例寫 `> /plan`，那個斜線指令不存在，
 * 實際上是 Shift + Tab 循環過去。範例拿掉之後這個錯也一起沒了。
 * （Codex 那邊 `/plan` 是有的，兩家不要混著記。）
 */
const ROWS = [
  {
    icon: FileText,
    concept: '專案規則手冊',
    claude: 'CLAUDE.md',
    others: 'AGENTS.md（跨工具共通，二十幾種都讀）、.cursor/rules/ 的 .mdc（Cursor）',
    why: '換工具的時候，內容幾乎不用改，改的是檔名跟放的位置。',
  },
  {
    icon: Sliders,
    concept: '先想再動手',
    claude: 'plan 模式（Shift + Tab 切過去）',
    others: 'Plan Mode（Cursor）、Plan mode（Codex，/plan 或 Shift + Tab）',
    why: '大改之前先看它打算怎麼做，你才有機會在動工前喊停。',
  },
  {
    icon: Bot,
    concept: '分工與派工',
    claude: '子代理（Subagent），放在 .claude/agents/',
    others: 'subagents，放在 .cursor/agents/（Cursor）、自訂 agent 的 .agent.md（VS Code Copilot）',
    why: '對話越長，前面交代的事越容易被稀釋。分開跑才守得住。',
  },
  {
    icon: Play,
    concept: '自己跑、自己修',
    claude: '寫好完成條件，讓它自己驗自己修',
    others: '沒有共通名稱。要找的是不互動跑完一輪的模式：claude -p、codex exec',
    why: '名字每家都不一樣，甚至沒有名字，但要你給的東西都一樣：目標、完成條件、邊界。',
  },
];

/** 畫面上只印網域層級，完整的六個網址在檔頭的 C-1 註解裡，行數塞不下也沒必要念 */
const SOURCES = ['agents.md', 'cursor.com/docs', 'developers.openai.com/codex', 'code.visualstudio.com/docs'];

export default function Slide32() {
  return (
    <SlideLayout title="跨工具名詞對照表" subtitle="Universal Translation Map for AI Coding Agents" icon={BookCopy}>
      <div className="max-w-6xl mx-auto w-full space-y-3 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-sm leading-relaxed">
          前面講的都是 Claude Code，但這四件事換到 Cursor、Codex 或別家一樣成立。
          <strong className="text-slate-100">換工具要重學的只有名字</strong>，有一項連名字都一樣。
        </AnimatedBlock>

        {/* 整張表（含外框與表頭）跟第一列同時出現，都掛 stepIndex 2。
            原本外框與表頭都沒掛 AnimatedBlock，所以按第一下之前畫面上是
            一個空的大框加一排欄位名。跟 21d4_M2_PartsMap 同一個毛病，
            但那一頁每一列自己有邊框、沒有共用外框，所以只補表頭就夠。 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 divide-y divide-slate-800">
          <div className="grid grid-cols-[10rem_1fr_1.35fr] gap-5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-slate-500">
            <span>這件事</span>
            <span className="text-orange-400">Claude Code 叫它</span>
            <span>別家叫它</span>
          </div>

          {ROWS.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedBlock key={r.concept} stepIndex={i + 2} className="px-6 py-2.5">
                <div className="grid grid-cols-[10rem_1fr_1.35fr] gap-5 items-baseline">
                  <div className="flex items-baseline gap-2.5">
                    <Icon aria-hidden="true" size={16} className="text-slate-500 shrink-0 translate-y-0.5" />
                    <span className="text-slate-100 text-base font-bold leading-snug">{r.concept}</span>
                  </div>
                  <span className="font-mono text-sm text-orange-300 leading-relaxed">{r.claude}</span>
                  <span className="font-mono text-sm text-slate-300 leading-relaxed">{r.others}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-1.5">{r.why}</p>
              </AnimatedBlock>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-3.5">
          <p className="text-slate-400 text-sm leading-relaxed">
            所以到新工具的第一天，你要找的是這四個東西放在哪裡：
            <strong className="text-slate-200">手冊叫什麼名字、怎麼切到只想不動手、怎麼派子任務、完成條件寫在哪。</strong>
            找到就接得上，找不到的那一項通常代表那個工具還沒做。
          </p>
          {/* 右欄全是別人家的產品名稱，改版很快。出處印在畫面上，學員自己查得到，
              也逼下一個改這一頁的人去對一次（C-1）。併在這一塊裡，不另起一個 AnimatedBlock，
              多一塊就會把整頁推出可視範圍。 */}
          <p className="font-mono text-xs text-slate-600 leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800">
            出處（2026-09-23 查證）：{SOURCES.join('、')}
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
