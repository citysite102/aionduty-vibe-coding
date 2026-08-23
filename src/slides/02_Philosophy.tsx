import { Map, Target } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的主角是那四個階段，所以它們佔滿版面排成 2×2，
 * 核心目標收成上方一條橫幅。
 *
 * 「階段」原本叫「單元」，2026-08-18 改掉。課程改成一單元一支影片之後，
 * 「單元」被錄製單元（courseUnits.ts 的 X-Y 編號）佔走了，同一個詞指兩種東西，
 * 而且兩邊的編號還對不起來：內文寫的「第一單元的計時器」指的其實是這一頁的 02。
 * 現在三個詞各指一件事：階段是這一頁，章節是分節，單元是一支影片。
 *
 * 階段跟章節不是一對一，02 到 04 各橫跨兩章，所以每張卡要標出它涵蓋哪幾章，
 * 學員才對得回播放器選單。改章節結構時，chapters 那一欄要重新核對一次
 * （npm run units 會印出目前的章節與單元）。
 */
const STAGES = [
  {
    n: '01',
    chapters: '章節二',
    title: 'Vibe Coding 與 Agentic Engineering',
    desc: '從輔助生成到 Agent 自動化，中間差在哪裡，工具又該怎麼挑。',
  },
  {
    n: '02',
    chapters: '章節三、四',
    title: 'Claude Code 實作與網頁開發基礎',
    desc: '建立發包思維，從只能問的對話框走到能動手的 Agent，掌握 Claude Code 的安全邊界。',
  },
  {
    n: '03',
    chapters: '章節五、六',
    title: 'CLAUDE.md 設計邏輯與運作框架',
    desc: '把專案的規矩與慣例寫下來，讓 AI 每次進來都照同一套標準做事。',
  },
  {
    n: '04',
    chapters: '章節七、八',
    title: 'Agent 團隊與開發循環架構',
    desc: '建構多角色協作網路，與自動化開發循環，獨立交付軟體。',
  },
];

export default function SlidePhilosophy() {
  return (
    <SlideLayout title="四個階段，從看懂走到自己做出來" subtitle="Course Arc" icon={Map}>
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
          {STAGES.map((s, i) => (
            <AnimatedBlock
              key={s.n}
              stepIndex={i + 2}
              className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              {/* 標題最長的那張會折兩行，所以編號放右下角，不跟標題搶第一行 */}
              <span className="pointer-events-none absolute -bottom-4 right-2 select-none font-mono text-7xl font-black text-sky-500/10">
                {s.n}
              </span>
              {/* 對回播放器與課程平台上的章節名，維持灰階，不多加一種強調色 */}
              <div className="relative text-slate-500 text-xs font-mono tracking-wider mb-1.5">
                {s.chapters}
              </div>
              <h3 className="relative text-xl font-bold text-slate-100 leading-snug mb-2">{s.title}</h3>
              <p className="relative text-slate-400 text-base leading-relaxed pr-16">{s.desc}</p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
