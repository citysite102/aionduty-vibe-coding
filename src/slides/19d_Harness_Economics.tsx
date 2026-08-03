import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { DollarSign, TrendingDown, TrendingUp, AlertCircle, Factory } from 'lucide-react';

export default function SlideHarnessEconomics() {
  return (
    <SlideLayout title="Token 經濟學：資本支出與營運成本" subtitle="Token Economics: Capex vs Opex" icon={DollarSign}>
      <div className="pt-8 max-w-6xl mx-auto h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-amber-950/30 rounded-xl text-amber-400 border border-amber-900/50">
                <TrendingDown size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Vibe Coding</h3>
                <p className="text-amber-400/80 text-base font-medium">類似營運成本 (Opex)</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              前期投資趨近於零，隨時能開工。但藏著三個會<strong className="text-amber-400 font-bold">複利成長的隱形成本</strong>：
            </p>
            
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">Token 消耗高：</strong>因為缺乏邊界與測試，反覆除錯會消耗大量 Token。</span>
              </li>
              <li className="flex items-start gap-4">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">維護稅：</strong>半年後得回頭維護一堆毫無結構的義大利麵程式碼。</span>
              </li>
              <li className="flex items-start gap-4">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">資安補救成本：</strong>初期忽略架構，後期需花費巨大代價修補漏洞。</span>
              </li>
            </ul>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-sky-900/50 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-sky-950/30 rounded-xl text-sky-400 border border-sky-900/50">
                <TrendingUp size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Agentic Engineering</h3>
                <p className="text-sky-400/80 text-base font-medium">類似資本支出 (Capex)</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              前期需要投入工程時間來設計架構、編寫測試與建置運作框架 (前期成本高)。
            </p>
            
            <div className="bg-sky-950/20 p-6 rounded-xl border border-sky-900/40 flex items-start gap-5">
              <Factory size={28} className="text-sky-400 shrink-0 mt-1" />
              <p className="text-sky-100 text-base leading-relaxed">
                但架好之後，每次生成新功能的成本會降下來。因為架構、測試與規則都在，<strong className="text-sky-300 font-bold">它比較常一次就寫對，來回修改的次數變少</strong>。
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
