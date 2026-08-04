import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide12() {
  return (
    <SlideLayout title="設立品質防線 (Anti-Slop)" subtitle="Quality Defense" icon={ShieldCheck}>
      
      <div className="max-w-5xl mx-auto mt-10">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="text-emerald-400 mt-2 bg-emerald-400/10 p-4 rounded-full border border-emerald-400/20">
              <ShieldCheck aria-hidden="true" size={48} />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6">獨立的審查子代理 (Reviewer)</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f111a] p-5 rounded-2xl border border-slate-800 shadow-inner">
                  <h4 className="text-lg font-bold text-slate-300 mb-3 border-b border-slate-700 pb-2">簡單的 Review</h4>
                  <ul className="text-slate-400 text-sm space-y-2 list-disc pl-4 marker:text-slate-600">
                    <li>只說「幫我看一下有沒有問題」</li>
                    <li>沒有交代誰是使用者、什麼算合格</li>
                    <li>沒有標準，AI 想到什麼說什麼</li>
                    <li>常常說「看起來很好」就放行</li>
                  </ul>
                </div>
                
                <div className="bg-[#050b14] p-5 rounded-2xl border border-sky-900/50 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>
                  <h4 className="text-lg font-bold text-sky-400 mb-3 border-b border-sky-900/50 pb-2">有標準的 Reviewer</h4>
                  <ul className="text-slate-300 text-sm space-y-3 pl-2">
                    <li className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">▪</span> 
                      <span><strong>先讀範例</strong>：參照合格報價單、品牌語氣或過往成功案例。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">▪</span> 
                      <span><strong>依循準則</strong>：逐項檢查欄位、用字、價格規則與例外條件。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">▪</span> 
                      <span><strong>明確退回</strong>：只要缺少必要資訊，就列出缺口，不要替你腦補。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-sky-950/30 border border-sky-900/50 rounded-2xl p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-sky-400 mb-4">這不是工程專用</h3>
          <p className="text-slate-300 text-lg leading-relaxed">
            Code Reviewer 只是最容易理解的例子。只要你能寫出檢查標準，就能養出報價審查、客服回覆審查、教材審查或品牌文案審查。
          </p>
        </AnimatedBlock>
      </div>

    </SlideLayout>
  );
}
