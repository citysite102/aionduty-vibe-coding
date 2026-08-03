import { RefreshCcw, Search, FileEdit, PlaySquare, CheckCircle2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

export default function Slide06() {
  return (
    <SlideLayout title="一次改一點，比一次改完安全" subtitle="A Healthy Workflow" icon={RefreshCcw}>
      <div className="w-full max-w-5xl mx-auto mt-4">
        
        <AnimatedBlock stepIndex={1} className="text-center mb-10">
          <p className="text-slate-300 text-lg">
            許多初學者會犯的錯誤：<strong className="text-rose-400">一開口就要求馬上產出最終結果。</strong><br/>
            這就像讓設計師「立刻畫出一張海報」而不給參考。正確的做法是：
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="w-full max-w-5xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-900 border border-sky-900/50 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">1. 探索</h3>
              <p className="text-slate-400 text-xs leading-relaxed">釐清現況、讀取檔案、確認需求</p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-amber-900/50 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mb-4">
                <FileEdit size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">2. 計畫</h3>
              <p className="text-slate-400 text-xs leading-relaxed">提出修改方案、確認實作步驟</p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-emerald-900/50 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-4">
                <PlaySquare size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">3. 執行</h3>
              <p className="text-slate-400 text-xs leading-relaxed">撰寫程式碼、安裝所需套件</p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900 border border-sky-900/50 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">4. 驗證</h3>
              <p className="text-slate-400 text-xs leading-relaxed">自動測試、除錯、確保能跑</p>
            </div>
            
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-slate-800 -translate-y-1/2 z-0 border-t border-dashed border-slate-600"></div>
          </div>
          
          <div className="flex justify-center mt-4">
             <div className="bg-slate-800/50 px-4 py-2 rounded-full text-slate-400 text-xs flex items-center gap-2 border border-slate-700/50">
               <RefreshCcw size={14} />
               <span>遇到錯誤或新需求，回到第一步重新探索</span>
             </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="text-center text-slate-300 max-w-3xl mx-auto bg-slate-900/50 py-6 px-10 rounded-xl border border-slate-800">
          <p className="text-lg leading-relaxed">
            <span className="text-sky-300 font-bold tracking-wider">探索 → 計畫 → 執行 → 驗證</span>
            <br/><br/>
            以此循環不斷迭代。這正是為什麼我們需要讓 Agent 在終端機工作：<br/>
            <strong className="text-sky-400">它能自動幫你完成這個循環中的「執行與驗證」步驟。</strong>
            <span className="block mt-4 pt-4 border-t border-slate-800 text-sm text-slate-400">
              接下來要教的每一個操作，都會落在這四格的其中一格上。先記住這張圖，後面就不會迷路。
            </span>
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
