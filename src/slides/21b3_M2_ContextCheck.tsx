import { ScanLine } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const READINGS = [
  {
    n: '1',
    q: '有沒有？',
    desc: '你的 CLAUDE.md 不在這份清單裡，代表這一輪它根本沒被讀到。先解決這件事，再談規則寫得好不好。',
  },
  {
    n: '2',
    q: '有幾份？',
    desc: '全域、專案、子目錄可能同時載入。兩條規則互相矛盾，多半發生在這裡。',
  },
  {
    n: '3',
    q: '佔多大？',
    desc: '手冊吃掉的 token 越多，後面那幾條越容易被當成背景。這就是為什麼建議一份不要超過約 200 行。',
  },
];

export default function SlideM2ContextCheck() {
  return (
    <SlideLayout title="怎麼確認它真的讀到了" subtitle="Verify with /context" icon={ScanLine}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 max-w-6xl mx-auto items-start pb-4">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            手冊寫完了，但它這一輪有沒有真的被讀進去？在對話框輸入 <code className="text-orange-300 font-mono">/context</code>，答案在最下面那一段。
          </p>
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 font-mono text-xs shadow-xl">
            <div className="flex gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <div className="text-slate-200 font-bold mb-3">Context Usage</div>
            <div className="space-y-1 text-slate-500">
              <div>System prompt <span className="float-right">5.1k (0.5%)</span></div>
              <div>System tools <span className="float-right">16.9k (1.7%)</span></div>
              <div>Messages <span className="float-right">33.3k (3.3%)</span></div>
              <div>Free space <span className="float-right">940k (94%)</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="text-sky-400 font-bold mb-2">Memory files · /memory</div>
              <div className="space-y-1 text-slate-300">
                <div>├ CLAUDE.md<span className="float-right text-slate-500">3.7k tokens</span></div>
                <div>└ ~/.claude/CLAUDE.md<span className="float-right text-slate-500">126 tokens</span></div>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <div className="space-y-3">
          {READINGS.map((r, i) => (
            <AnimatedBlock
              key={r.n}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 flex gap-4 items-start shadow-md"
            >
              <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono text-sm">
                {r.n}
              </div>
              <div>
                <div className="text-slate-200 text-sm font-bold mb-1">{r.q}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{r.desc}</div>
              </div>
            </AnimatedBlock>
          ))}

          <AnimatedBlock stepIndex={5} className="border rounded-2xl px-4 py-3 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
            <p className="text-slate-400 text-sm leading-relaxed">
              寫完手冊的下一步不是繼續加規則，是先跑一次 <code className="text-orange-300 font-mono">/context</code>，確認它真的在清單裡。<span className="text-slate-200">沒被載入的規則，寫得再好都沒有用。</span>
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
