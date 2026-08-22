import { BookCopy, FileText, Bot, Play, Sliders } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import type { RecordedMeta } from '../slides-recorded/types';

/**
 * 速查表，學員會停在上面逐列對照，所以 kind 標 reference，不套 160 字與 45 秒。
 * 口白照樣要有，否則錄影時這一頁無聲。
 */
export const meta: RecordedMeta = {
  id: 'live-118-cheat-tools',
  title: '同一件事，別家叫什麼名字',
  script:
    '前面講的都是 Claude Code，但這四件事換到 Cursor、Codex 或別家一樣成立，換工具要重學的只有名字。專案規則手冊在這裡叫 CLAUDE.md，別家叫 AGENTS.md，或者放在 Cursor 的 rules 資料夾底下，內容幾乎不用改。先想再動手，這裡是 plan 模式，別家叫 Chat-only 或 Ask。分工派工，這裡叫子代理，別家叫 Agent Teams 或 Role。自己跑自己修，這裡是寫好完成條件讓它自己驗，別家叫 Composer 或 Autonomous Loop。所以到新工具的第一天，你要找的就是這四個東西放在哪裡。',
  seconds: 52,
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
 */
const ROWS = [
  {
    icon: FileText,
    concept: '專案規則手冊',
    claude: 'CLAUDE.md',
    others: 'AGENTS.md（通用）、.cursor/rules/（Cursor）',
    why: '換工具的時候，內容幾乎不用改，改的是檔名跟放的位置。',
  },
  {
    icon: Sliders,
    concept: '先想再動手',
    claude: 'plan 模式（Shift + Tab 切過去）',
    others: 'Chat-only、Ask 模式：只對談，不按套用',
    why: '大改之前先看它打算怎麼做，你才有機會在動工前喊停。',
  },
  {
    icon: Bot,
    concept: '分工與派工',
    claude: '子代理（Subagent）',
    others: 'Agent Teams、CrewAI 這類框架的 Role',
    why: '對話越長，前面交代的事越容易被稀釋。分開跑才守得住。',
  },
  {
    icon: Play,
    concept: '自己跑、自己修',
    claude: '寫好完成條件，讓它自己驗自己修',
    others: 'Composer、Autonomous Loop、Goal-oriented Loop',
    why: '名字每家都不一樣，但要你給的東西都一樣：目標、完成條件、邊界。',
  },
];

export default function Slide32() {
  return (
    <SlideLayout title="同一件事，別家叫什麼名字" subtitle="Universal Translation Map for AI Coding Agents" icon={BookCopy}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          前面講的都是 Claude Code，但這四件事換到 Cursor、Codex 或別家一樣成立。
          <strong className="text-slate-100">換工具要重學的只有名字</strong>，你要準備的東西沒有變。
        </AnimatedBlock>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 divide-y divide-slate-800">
          <div className="grid grid-cols-[11rem_1fr_1fr] gap-5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-slate-500">
            <span>這件事</span>
            <span className="text-orange-400">Claude Code 叫它</span>
            <span>別家叫它</span>
          </div>

          {ROWS.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedBlock key={r.concept} stepIndex={i + 2} className="px-6 py-4">
                <div className="grid grid-cols-[11rem_1fr_1fr] gap-5 items-baseline">
                  <div className="flex items-baseline gap-2.5">
                    <Icon aria-hidden="true" size={16} className="text-slate-500 shrink-0 translate-y-0.5" />
                    <span className="text-slate-100 text-base font-bold leading-snug">{r.concept}</span>
                  </div>
                  <span className="font-mono text-sm text-orange-300 leading-relaxed">{r.claude}</span>
                  <span className="font-mono text-sm text-slate-300 leading-relaxed">{r.others}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">{r.why}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            所以到新工具的第一天，你要找的是這四個東西放在哪裡：
            <strong className="text-slate-200">手冊叫什麼名字、怎麼切到只想不動手、怎麼派子任務、完成條件寫在哪。</strong>
            找到就接得上，找不到的那一項通常代表那個工具還沒做。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
