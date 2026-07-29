import { Rocket, Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideBenchmarks() {
  return (
    <SlideLayout
      title="這件事真的做得到嗎？"
      subtitle="Real-world Benchmarks — and the Argument About Them"
      icon={Rocket}
    >
      <div className="max-w-5xl mx-auto mt-4 text-left space-y-5">

        <AnimatedBlock stepIndex={1} className="text-center">
          <p className="text-slate-300 text-base leading-relaxed">
            既然本機 Agent 是「有手的執行者」，它到底能做到什麼程度？先看兩個真實案例，再談其中的爭議。
          </p>
        </AnimatedBlock>

        {/* Case 1: Bun */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-bold text-emerald-300 mb-4">
            Bun：把 53 萬行程式碼換一種語言重寫
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { v: '53 萬', l: '行程式碼' },
              { v: '11', l: '天完成' },
              { v: '64', l: '個 AI 代理並行' },
              { v: '$16.5 萬', l: 'API 費用' }
            ].map((s, i) => (
              <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-3 text-center">
                <div className="text-white font-mono font-bold text-lg">{s.v}</div>
                <div className="text-slate-500 text-[11px] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Bun 團隊把整個專案從 Zig 改寫成 Rust。這種規模的重寫，過去通常被認為「不值得做」。
          </p>
        </AnimatedBlock>

        {/* The controversy */}
        <AnimatedBlock stepIndex={3} className="bg-amber-950/15 border border-amber-900/40 rounded-2xl p-6">
          <h3 className="text-base font-bold text-amber-300 mb-3 flex items-center gap-2">
            <Scale size={17} />
            但這個案例有爭議
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Zig 語言作者 Andrew Kelley 公開批評這是「<strong className="text-amber-200">未經審查的產出</strong>」，
            並指出一個關鍵問題：<span className="text-slate-200">既有測試沒抓到的 bug，改寫成 Rust 後一樣抓不到。</span>
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-amber-900/30">
            速度是真的，品質誰把關也是真的問題。<strong className="text-slate-200">這門課要談的，正是後面這一半。</strong>
          </p>
        </AnimatedBlock>

        {/* Case 2: Anthropic */}
        <AnimatedBlock stepIndex={4} className="bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 flex items-center gap-5">
          <div className="text-slate-300 text-sm leading-relaxed flex-1">
            <strong className="text-slate-100">Anthropic 內部：</strong>
            新人從摸熟架構、裝好環境到能實際動工的時間
          </div>
          <div className="flex items-center gap-3 shrink-0 font-mono">
            <span className="text-slate-500 text-sm line-through">2~3 週</span>
            <span className="text-slate-600">→</span>
            <span className="text-emerald-400 font-bold text-lg">2~3 天</span>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
