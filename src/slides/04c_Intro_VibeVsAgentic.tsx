import React from 'react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { ArrowRight, CheckCircle2, AlertTriangle, FileCode2 } from 'lucide-react';

/**
 * 原本是三張各自獨立的卡，同一個問題（怎麼交代、怎麼驗、出錯怎麼辦）在三張卡裡
 * 高度不一樣，所以要橫著比很難比。現在拆成對齊的帶狀表格：左邊是題目，
 * 右邊三欄同一列一定講同一件事，差別才看得出來。
 *
 * 最上面那條是這一頁的軸線：三種模式的差別只有一個變數，就是結構與驗證的量。
 * 第二列是全頁重點，同一個需求寫成三種樣子，那是學員唯一能自己複製的差別。
 *
 * 顏色兩種：amber 是「幾乎沒有結構」那一端，emerald 是目標狀態，中間維持灰階。
 */
const MODES = [
  {
    name: 'Vibe Coding',
    icon: AlertTriangle,
    tag: null,
    filled: 1,
    head: 'border-amber-500/25 bg-amber-500/5',
    title: 'text-amber-300',
    iconClass: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
    bar: 'bg-amber-400/70',
    cell: 'border-amber-900/40 bg-amber-500/5',
    prompt: '幫我加一個匯出按鈕',
    promptNote: '沒說加在哪一頁、匯出成什麼格式，它只能自己猜一個。',
    done: '「看起來會動」就好',
    doneNote: '你自己點一下，沒壞就算過。',
    fix: '把整段錯誤訊息丟回去，叫它再修一次',
    fixNote: '修到不報錯為止，沒有人在確認它有沒有修對地方。',
  },
  {
    name: 'AI 輔助開發',
    icon: FileCode2,
    tag: null,
    filled: 2,
    head: 'border-slate-800 bg-slate-950',
    title: 'text-slate-100',
    iconClass: 'text-slate-400 bg-slate-800/60 border-slate-700',
    bar: 'bg-slate-400/70',
    cell: 'border-slate-800 bg-slate-900',
    prompt: '在報表頁加一個匯出按鈕，按下去把目前表格存成 CSV',
    promptNote: '說了加在哪、做什麼，但沒說照什麼規範寫，也沒說怎麼算做完。',
    done: '自己點過一次，重要的地方補幾個測試',
    doneNote: '算不算做完，還是你當下的判斷。',
    fix: '你先看懂錯在哪，再引導它改',
    fixNote: '它不會自己回頭驗，每一輪都要你出手。',
  },
  {
    name: 'Agentic Engineering',
    icon: CheckCircle2,
    tag: '目標狀態',
    filled: 3,
    head: 'border-emerald-500/25 bg-emerald-500/5',
    title: 'text-emerald-300',
    iconClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
    bar: 'bg-emerald-400/70',
    cell: 'border-emerald-900/40 bg-emerald-500/5',
    prompt: (
      <>
        照 <code className="text-orange-300">CLAUDE.md</code> 的元件慣例，在報表頁加匯出 CSV
        的功能，補一個測試蓋住空資料的情況，跑過檢查再回報
      </>
    ),
    promptNote: '多說了三件事：照哪份規範、怎麼驗、什麼情況算做完。',
    done: '每次改動自動跑驗證，再讓另一個 AI 審一次',
    doneNote: '做完的定義寫在檔案裡，不是寫在你腦袋裡。',
    fix: 'Agent 在你設的邊界內自己診斷、自己修',
    fixNote: '修不好才停下來問你，並且告訴你卡在哪一題。',
  },
];

const ROWS = [
  { key: 'prompt', label: '同一個需求，你會怎麼寫' },
  { key: 'done', label: '怎麼算做完' },
  { key: 'fix', label: '出錯的時候' },
] as const;

export default function SlideVibeVsAgentic() {
  return (
    <SlideLayout title="Vibe Coding 與 Agentic Engineering" subtitle="From Vibe to Agentic" icon={ArrowRight}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          決定開發模式的不是「有沒有用 AI」，三種都在用。差別只有一個變數：
          <strong className="text-slate-100">AI 動手之前，你給了多少結構；它交出來之後，誰在驗。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-[7rem_repeat(3,minmax(0,1fr))] gap-x-4 gap-y-2.5 items-stretch">

          {/* 表頭，右下角那條是結構與驗證的量 */}
          <div className="flex items-end justify-end pr-1 pb-1 text-right font-mono text-xs leading-tight text-slate-500">
            結構與驗證
          </div>
          {MODES.map((m, i) => {
            const Icon = m.icon;
            return (
              <AnimatedBlock
                key={`h-${m.name}`}
                stepIndex={i + 2}
                className={`relative rounded-xl border px-4 py-2.5 ${m.head}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${m.iconClass}`}>
                    <Icon size={18} />
                  </span>
                  <h3 className={`text-base font-bold leading-snug ${m.title}`}>{m.name}</h3>
                  {m.tag && (
                    <span className="ml-auto shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                      {m.tag}
                    </span>
                  )}
                </div>
                {/* 結構與驗證的量，三格填滿幾格就是差在哪 */}
                <div className="mt-2.5 flex items-center gap-1.5">
                  {[1, 2, 3].map((seg) => (
                    <span
                      key={seg}
                      className={`h-1.5 flex-1 rounded-full ${seg <= m.filled ? m.bar : 'bg-slate-800'}`}
                    />
                  ))}
                </div>
              </AnimatedBlock>
            );
          })}

          {/* 三個問題，同一列一定講同一件事 */}
          {ROWS.map((row) => (
            <React.Fragment key={row.key}>
              <div className="col-span-4 h-px bg-slate-800/70" />
              <div className="flex items-start justify-end pr-1 pt-3 text-right font-mono text-xs leading-tight text-slate-500">
                {row.label}
              </div>
              {MODES.map((m, i) => (
                <AnimatedBlock
                  key={`${row.key}-${m.name}`}
                  stepIndex={i + 2}
                  className={`rounded-xl border px-4 py-3 ${m.cell}`}
                >
                  {row.key === 'prompt' ? (
                    <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2.5 font-mono text-sm leading-relaxed text-slate-200">
                      {m.prompt}
                    </div>
                  ) : (
                    <p className="text-slate-100 text-base font-bold leading-snug">
                      {row.key === 'done' ? m.done : m.fix}
                    </p>
                  )}
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
                    {row.key === 'prompt' ? m.promptNote : row.key === 'done' ? m.doneNote : m.fixNote}
                  </p>
                </AnimatedBlock>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
