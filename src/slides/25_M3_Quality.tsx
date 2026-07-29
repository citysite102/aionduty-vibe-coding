import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide12() {
  return (
    <SlideLayout title="設立品質防線 (Anti-Slop)" subtitle="Quality Defense" icon={ShieldCheck}>
      
      <div className="max-w-5xl mx-auto mt-10">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="text-emerald-400 mt-2 bg-emerald-400/10 p-4 rounded-full border border-emerald-400/20">
              <ShieldCheck size={48} />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">獨立的審查小幫手 (Reviewer)</h3>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-6 font-medium">
                最好的品管，是安插一個「只負責挑錯」的獨立角色。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f111a] p-5 rounded-2xl border border-slate-800 shadow-inner">
                  <h4 className="text-lg font-bold text-slate-300 mb-3 border-b border-slate-700 pb-2">❌ 簡單的 Review</h4>
                  <ul className="text-slate-400 text-sm space-y-2 list-disc pl-4 marker:text-slate-600">
                    <li>只檢查有沒有 Syntax Error</li>
                    <li>請它「看看這段程式碼有沒有問題」</li>
                    <li>沒有標準，AI 想到什麼說什麼</li>
                    <li>常常說「看起來很好」就放行</li>
                  </ul>
                </div>
                
                <div className="bg-[#050b14] p-5 rounded-2xl border border-sky-900/50 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>
                  <h4 className="text-lg font-bold text-sky-400 mb-3 border-b border-sky-900/50 pb-2">✅ 完整的 Reviewer 系統</h4>
                  <ul className="text-slate-300 text-sm space-y-3 pl-2">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">▪</span> 
                      <span><strong>先讀取範例</strong>：參照 `docs/Convention.md` 與團隊過往成功的 PR 範例。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">▪</span> 
                      <span><strong>依循準則</strong>：檢查是否符合 Clean Architecture 規範、變數命名規則。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">▪</span> 
                      <span><strong>強制防線</strong>：要求「如果沒有寫 Unit Test，直接退回不准 Merge」。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-indigo-950/30 border border-indigo-900/50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-indigo-400 mb-4">業界慣例</h3>
          <p className="text-slate-300 text-lg leading-relaxed">
            在成熟的科技團隊裡，程式碼合併請求 (PR) 進入主線前，幾乎都必須先通過 Code Review 與自動化檢查；讓 AI 擔任第一道 Reviewer 也正快速普及中。
          </p>
        </AnimatedBlock>
      </div>

    </SlideLayout>
  );
}
