import { Rocket, Search, Clock, Zap } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideScale() {
  return (
    <SlideLayout title="省下的時間，用來擴大搜尋" subtitle="The True Value of Agent Loops" icon={Rocket}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto h-full items-center">
        
        <div className="space-y-6">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative shadow-lg">
            <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-4">
              <Clock className="text-emerald-400" size={28} />
              省下時間，但前提是流程要先設計好
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-4">
              Agent 確實省下了大量時間，但這不代表可以完全放手，你的角色從「執行者」變成「設計流程的人」。
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              工作模式與驗收標準都要更明確。設計得當的話，很多以前因為太耗人力而不會去做的事，現在變得可行。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900/50 border border-sky-900/30 rounded-3xl p-6 relative shadow-lg">
             <div className="flex items-center gap-4">
               <div className="bg-sky-500/20 p-4 rounded-full">
                 <Zap className="text-sky-400" size={32} />
               </div>
               <div>
                 <h4 className="text-xl font-bold text-slate-200">數量夠多，結論才會不一樣</h4>
                 <p className="text-slate-400 text-sm mt-1">從「挑兩個看看」變成「過濾三百個再做決定」</p>
               </div>
             </div>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 h-full flex flex-col justify-center relative shadow-lg hover:border-sky-500/30 transition-colors group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Search size={120} className="text-sky-400" />
          </div>
          
          <h3 className="text-2xl font-bold text-sky-400 mb-6 z-10">
            搜尋量級的巨大差異
          </h3>
          
          <div className="space-y-8 z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">👤</div>
                <h4 className="text-lg font-bold text-slate-300">過去：人類執行</h4>
              </div>
              <div className="ml-12 pl-4 border-l-2 border-slate-800 text-slate-400">
                <p>時間精力有限，只能先憑直覺挑 2 到 3 個選項來深入研究。</p>
                <div className="flex gap-2 mt-2">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-sky-900/30 rounded-full flex items-center justify-center text-sky-400 border border-sky-500/30">🤖</div>
                <h4 className="text-lg font-bold text-sky-300">現在：Agent 支援</h4>
              </div>
              <div className="ml-12 pl-4 border-l-2 border-sky-900 text-slate-300">
                <p>重複的驗證交給 AI。它可以幫你篩過 200～300 個選項，留下少數幾個較合適的給你判斷，但別忘了這些次數都是要付費的。</p>
                <div className="flex flex-wrap gap-1.5 mt-3 max-w-[200px]">
                  {/* 靜態點陣：只用顏色分層表示「篩過的量」，不做常駐閃爍動畫 */}
                  {Array.from({ length: 45 }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i % 7 === 0 ? 'bg-sky-400' : 'bg-sky-900/50'}`}></div>
                  ))}
                  <div className="text-xs text-sky-500/50">+200...</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
