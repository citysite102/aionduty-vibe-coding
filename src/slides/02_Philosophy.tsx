import { Map, Target } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的主角是那四個單元，所以它們佔滿版面排成 2×2，
 * 課程簡介收成上方一條橫幅。
 *
 * 原本是左右兩張卡：左邊只有一段簡介、右邊塞了四個單元，
 * 高度差快一倍，右邊那張還得把每一條壓成小字。
 *
 * 單元名稱要跟 App.tsx 的 SECTION_DEFS 對得上，
 * 學員會拿這一頁對照講者選單裡的分節名。
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
          className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:items-center"
        >
          <div className="flex items-start gap-3 rounded-xl border border-sky-500/25 bg-sky-500/10 px-4 py-3.5">
            <Target size={18} className="text-sky-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sky-300 text-xs font-mono uppercase tracking-wider mb-1">核心目標</div>
              <div className="text-slate-100 text-base font-bold leading-snug">
                能自己做出工具與網頁，而不只是會挑工具
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-base leading-relaxed">
            這堂課會帶你跳脫「只在對話框來回複製貼上」的限制，讓你主導整個{' '}
            <strong className="text-slate-100">AI 開發流程</strong>
            。你會學到怎麼調度 AI 寫出真正能跑的網頁、自動修好錯誤，把日常的點子親手指揮成好用的小工具與網站。
          </p>
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
