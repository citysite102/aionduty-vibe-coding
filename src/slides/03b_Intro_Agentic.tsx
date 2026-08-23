import { ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideIntroAgentic() {
  return (
    <SlideLayout title="三個詞的定位：Vibe Coding、Agentic Engineering 與 Agent" subtitle="2026 Update" icon={ArrowRight}>
      <div className="max-w-5xl mx-auto mt-6 space-y-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3 text-sky-400 font-mono text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
            2026 Update: From Vibe to Agentic
          </div>
          {/*
            原本寫「Karpathy 於 2026 年 2 月宣告：Vibe Coding 已經過時」，三件事都不準：
            時間是 4 月底、形式是 fireside chat 不是有標題的演講，
            而他的結論是兩者互補，不是誰取代誰。查證出處：
            karpathy.bearblog.dev/sequoia-ascent-2026/（2026-04-30）。
            這是指名歸屬的引述，又擺在整堂課的定調位置，不能寫成他沒說過的話。
          */}
          <h3 className="text-2xl font-black text-slate-100 mb-4">
            Andrej Karpathy：這兩個不是誰取代誰，是各做各的事
          </h3>
          <p className="text-slate-500 text-xs mb-3">
            2026 年 4 月，Sequoia AI Ascent 的對談。
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-3">
            他的原話是：<strong className="text-sky-400 font-bold">「Vibe coding 把地板墊高，Agentic engineering 守住專業軟體的品質水準。」</strong>
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            前者讓本來做不出軟體的人做得出來，後者處理的是「做得出來之後，怎麼確定它是對的」。
            <strong className="text-slate-100">這門課兩個都會碰到</strong>：先用前者做出東西，再用後者把它變成敢交出去的東西。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-base font-bold text-slate-100 mb-2">那 Agent 是什麼？</div>
          <p className="text-slate-300 text-base leading-relaxed">
            你現在用的對話框，是你問一句、它回一段字，真正要照著做的還是你自己。
            <strong className="text-slate-100">Agent 是你交代一件事，它自己去開檔案、跑指令、改東西，做完回報結果給你。</strong>
            差別只有一個：它有沒有手。這門課都會用到這個詞，指的都是這件事。
            <span className="block mt-2 text-slate-400">它開的是你電腦裡真正的檔案，但預設會在改檔案、跑指令之前停下來問你，只有讀取不打擾。要放寬到什麼程度是你決定的。</span>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedBlock stepIndex={3} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
            <div className="text-lg font-bold text-sky-400 font-mono mb-2">「Agentic」</div>
            <p className="text-slate-300 text-base leading-relaxed">
              你多數時間不是自己在寫程式碼，而是在指揮、調度一群 Agent，並扮演核心監督者的角色。
            </p>
          </AnimatedBlock>
          <AnimatedBlock stepIndex={4} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
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
