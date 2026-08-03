import { Signpost, Check } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 把 M2 的規則分流四問拿回來，套在 M4 的 Grill Me 上。
 * 跑到第三題就停了，所以只列三題，第四題不必出現。
 */
const ROUTE = [
  { q: '違反了會出事嗎？', a: '否', note: '不用交給 Hook 或 CI', hit: false },
  { q: '只在某一區適用嗎？', a: '否', note: '不用分到子目錄', hit: false },
  {
    q: '有固定步驟，而且只有做某件事才用到嗎？',
    a: '是',
    note: '寫成 Skill 或指令',
    hit: true,
  },
];

export default function SlideGrillMeRouting() {
  return (
    <SlideLayout
      title="想讓它每次都這樣問，寫進手冊就好了嗎？"
      subtitle="Where Does This Rule Belong?"
      icon={Signpost}
    >
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            這個問題你已經有答案了。把 Grill Me 當成一條規則，拿前面那組分流四問跑一遍。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          {ROUTE.map((r, i) => (
            <div
              key={r.q}
              className={`grid grid-cols-[auto_1fr_auto] items-center gap-5 px-6 py-4 ${
                i > 0 ? 'border-t border-slate-800' : ''
              } ${r.hit ? 'bg-emerald-500/5' : ''}`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-bold ${
                  r.hit ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-600'
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-base ${r.hit ? 'text-slate-100 font-bold' : 'text-slate-400'}`}>
                {r.q}
              </span>
              <span className="flex items-center gap-3 shrink-0">
                <span className={`text-sm ${r.hit ? 'text-slate-400' : 'text-slate-600'}`}>{r.note}</span>
                <span
                  className={`inline-flex h-7 w-9 items-center justify-center rounded-md border font-mono text-sm font-bold ${
                    r.hit
                      ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-600'
                  }`}
                >
                  {r.a}
                </span>
              </span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={3}
          className="flex items-center gap-4 rounded-2xl border border-slate-800 border-l-4 border-l-emerald-500 bg-slate-900 px-6 py-4"
        >
          <Check size={20} className="text-emerald-400 shrink-0" strokeWidth={3} />
          <p className="text-slate-200 text-base leading-relaxed">
            停在第三題，所以它該是 Skill。<strong className="text-slate-100">/grill-me 已經在對的位置了</strong>，不需要搬進 CLAUDE.md。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="pt-1">
          <p className="text-slate-400 text-base leading-relaxed">
            那如果你就是希望它更主動一點呢？可以寫，但不要寫成「一律」。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedBlock
            stepIndex={5}
            className="rounded-2xl border border-slate-800 border-l-4 border-l-rose-500 bg-slate-900 p-5"
          >
            <div className="text-rose-400 font-bold text-sm mb-3">✕ 寫成一律</div>
            <p className="text-slate-300 text-base leading-relaxed mb-3">
              「盡可能都用 Grill Me 引導我把需求講清楚。」
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              它會套用在「幫我把這個變數改名」上。你開始無視它的提問，接著整條規則就失效了，而且它每一輪都佔著 context。
            </p>
          </AnimatedBlock>

          <AnimatedBlock
            stepIndex={6}
            className="rounded-2xl border border-slate-800 border-l-4 border-l-emerald-500 bg-slate-900 p-5"
          >
            <div className="text-emerald-400 font-bold text-sm mb-3">✓ 加上觸發條件</div>
            <p className="text-slate-300 text-base leading-relaxed mb-3">
              「需求沒指明改哪個檔案或怎樣算做完，先問我最多三個問題再開始，一次一題，附上你的建議。」
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              有觸發條件、指得出它該問卻沒問、最多三題不會沒完沒了。這三點就是前面六個技巧裡的其中三個。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            兩邊不衝突：CLAUDE.md 那條管日常的小需求，
            <code className="text-emerald-300 font-mono">/grill-me</code> 留給要開新功能、值得跑完整決策樹的時候。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
