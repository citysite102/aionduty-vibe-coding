import { Lightbulb, Zap, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideIntroVibe() {
  return (
    <SlideLayout title="什麼是 Vibe Coding？" subtitle="Vibe Coding & Breakthroughs" icon={Lightbulb}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Lightbulb className="text-amber-400" size={28} />
            <h3 className="text-2xl font-bold text-slate-100">完全交給感覺？</h3>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            「用講的、不用手刻。你描述要什麼，AI 把程式碼寫出來，你看結果對不對，不對就再講一句。」
          </p>
          <div className="bg-indigo-950/30 p-5 rounded-lg border border-indigo-500/20">
            <h4 className="text-indigo-400 font-bold mb-2">嚴格的定義：</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              如果你有親自審查程式碼、寫好測試、講得出它怎麼運作，那不叫 vibe coding，那只是寫程式。嚴格講是<strong className="text-indigo-300">「在不看懂程式碼的情況下用 AI 把軟體做出來」</strong>。<br/>
              <span className="text-slate-500 text-xs mt-2 block">（Vibe Coding 一詞由 Andrej Karpathy 於 2025 年 2 月在 X 提出，原文是「完全交給感覺，忘記程式碼的存在」；上面這條以「有沒有審查程式碼」劃線的嚴格定義，出自 Simon Willison, 2025/03）</span>
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Zap className="text-sky-400" size={28} />
            <h3 className="text-2xl font-bold text-slate-100">Vibe Coding 不是不用打磨產品</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Vibe Coding 讓做出產品的門檻大幅下降，但不代表技術架構不再重要：
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="text-slate-200 block text-base">從寫語法轉為「系統架構設計」</strong>
                <span className="text-slate-500 text-sm">對於具備軟體與商業背景的夥伴，反而能站在更高的位置去設計軟體。</span>
              </div>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="text-slate-200 block text-base">先把需求和驗收標準寫清楚，再交給 AI</strong>
                <span className="text-slate-500 text-sm">先定義好程式的規格、想要的功能與驗收方式，再交由 AI 產出符合標準的程式碼與測試。</span>
              </div>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="text-slate-200 block text-base">打磨與把關的責任依舊在你</strong>
                <span className="text-slate-500 text-sm">AI 降低了實作成本，但商業邏輯的正確性與產品的精緻度，取決於你的標準。</span>
              </div>
            </li>
          </ul>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
