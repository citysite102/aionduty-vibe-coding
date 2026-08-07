import { Map, Target } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的主角是那四個單元，所以它們佔滿版面排成 2×2，
 * 核心目標收成上方一條橫幅。
 *
 * 學員會拿這一頁對照講者選單裡的分節名，但兩者不是一對一：
 * 選單的分節比單元細，單元 03 與 04 各橫跨兩節
 * （03 = 運作框架與成本分析 ＋ 手冊（CLAUDE.md）的疑難雜症與轉移，
 *   04 = 讓 Agent 分工 ＋ Agent 循環開發流程）。
 * 改單元名稱時，要確認學員還對得回 App.tsx 的 SECTION_DEFS。
 */
const UNITS = [
  {
    n: '01',
    title: '解構 Vibe Coding：跳脫對話框的開發新典範',
    desc: '跳脫對話框，理解從輔助生成到 Agent 自動化的本質差異。',
  },
  {
    n: '02',
    title: 'Agent 的心智模型與 Claude Code 實作',
    desc: '建立發包思維，從只能問的對話框走到能動手的 Agent，掌握 Claude Code 的安全邊界。',
  },
  {
    n: '03',
    title: 'CLAUDE.md 設計邏輯與運作框架',
    desc: '把專案的規矩與慣例寫下來，讓 AI 每次進來都照同一套標準做事。',
  },
  {
    n: '04',
    title: 'Agent 團隊與開發循環架構',
    desc: '建構多角色協作網路，與自動化開發循環，獨立交付軟體。',
  },
];

export default function SlidePhilosophy() {
  return (
    <SlideLayout title="這一天你會走過的四個關卡" subtitle="Unit Overview" icon={Map}>
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock
          stepIndex={1}
          className="flex items-start gap-3 rounded-2xl border border-sky-500/25 bg-sky-500/10 px-5 py-4"
        >
          <Target size={18} className="text-sky-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sky-300 text-xs font-mono uppercase tracking-wider mb-1">核心目標</div>
            <div className="text-slate-100 text-base font-bold leading-snug">
              能自己做出工具與網頁，而不只是會挑工具
            </div>
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {UNITS.map((u, i) => (
            <AnimatedBlock
              key={u.n}
              stepIndex={i + 2}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              {/* 標題最長的那張會折兩行，所以編號放右下角，不跟標題搶第一行 */}
              <span className="pointer-events-none absolute -bottom-4 right-2 select-none font-mono text-7xl font-black text-sky-500/10">
                {u.n}
              </span>
              <h3 className="relative text-xl font-bold text-slate-100 leading-snug mb-2">{u.title}</h3>
              <p className="relative text-slate-400 text-base leading-relaxed pr-16">{u.desc}</p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
