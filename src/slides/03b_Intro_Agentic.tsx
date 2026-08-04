import { ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideIntroAgentic() {
  return (
    <SlideLayout title="從 Vibe Coding 到 Agentic Engineering" subtitle="2026 Update" icon={ArrowRight}>
      <div className="max-w-5xl mx-auto mt-6 space-y-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3 text-sky-400 font-mono text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
            2026 Update: From Vibe to Agentic
          </div>
          <h3 className="text-2xl font-black text-slate-100 mb-4">
            Andrej Karpathy 於 2026 年 2 月宣告：Vibe Coding 已經過時
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed">
            隨著 LLM 的推理與執行能力提升，透過 Agent 寫程式逐漸成為專業工作者的預設工作流。Karpathy 為這個新階段提出了新名稱：<strong className="text-sky-400 font-bold">「Agentic Engineering」</strong>。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedBlock stepIndex={2} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
            <div className="text-lg font-bold text-sky-400 font-mono mb-2">「Agentic」</div>
            <p className="text-slate-300 text-base leading-relaxed">
              你多數時間不是自己在寫程式碼，而是在指揮、調度一群 Agent，並扮演核心監督者的角色。
            </p>
          </AnimatedBlock>
          <AnimatedBlock stepIndex={3} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
            <div className="text-lg font-bold text-amber-400 font-mono mb-2">「Engineering」</div>
            <p className="text-slate-300 text-base leading-relaxed">
              強調這依然是一門需要高度專業的學問，著重在規格定義、架構設計與邊界測試的把關。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
