import { FolderSync, TextCursorInput, Terminal, Check } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideExample2() {
  return (
    <SlideLayout title="叫它寫個小工具，幫你做雜事" subtitle="Example 2: Automation Script" icon={FolderSync}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch min-h-full">
        
        <div className="flex flex-col justify-center space-y-6">
          <AnimatedBlock stepIndex={1}>
            <div className="inline-block mb-3 px-2.5 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-[11px] font-bold text-slate-400">
              支線示範，跟你的任務計時器無關
            </div>
            <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-3">
              <TextCursorInput size={24} className="text-indigo-400" />
              情境：批次整理混亂的檔案
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              處理枯燥的資料清理，例如：將一堆命名混亂的圖片檔，重新命名成流水號，並分類進不同的資料夾。這種工作不需要麻煩工程師，Claude Code 寫個小腳本就能處理完。
            </p>
          </AnimatedBlock>
          
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl relative mt-4">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-slate-800 px-3 py-1 rounded-md text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-2">
              <Terminal size={14} /> Prompt
            </div>
            <p className="text-slate-100 leading-relaxed font-medium">
              「請查看 imgs 資料夾裡面的所有圖片。撰寫一個 Node.js 腳本幫我全部重新命名，格式為：日期-流水號，<strong className="text-amber-300">副檔名保持原樣不要改</strong>。<strong className="text-amber-300">先印出預計的新舊檔名對照表給我確認，我說 OK 之後你再實際執行。</strong>」
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-indigo-950/20 border border-indigo-900/30 p-4 rounded-xl mt-4">
            <p className="text-indigo-300 text-sm font-bold mb-2">💡 執行腳本的小提示</p>
            <p className="text-slate-400 text-xs leading-relaxed mb-2">腳本通常使用 Node.js 或 Python 執行，確保你已經安裝對應環境：</p>
            <div className="bg-black/40 p-2 rounded text-xs font-mono text-slate-300 border border-indigo-900/50 space-y-1">
               <span className="text-emerald-400"># 執行 Node.js (先前已安裝)</span><br/>
               $ node script.js<br/><br/>
               <span className="text-sky-400"># 執行 Python (請至 python.org 下載安裝)</span><br/>
               $ python script.py
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-950/60 border border-slate-800 border-l-4 border-l-slate-700 p-4 rounded-xl mt-4">
            <p className="text-slate-300 text-sm font-bold mb-1.5">「這個用 Cowork 不是也可以？」</p>
            <p className="text-slate-400 text-xs leading-relaxed">
              可以。Cowork 綁上 <code className="text-slate-300">imgs</code> 那個資料夾就能改。
              差別在產出物：腳本留得下來，下次換一百張圖再跑一次就好；Cowork 是這一次幫你做完，下次還要再講一遍。
              這一頁要示範的是<strong className="text-slate-200">產出一個能重複用的工具</strong>，不是比誰改得快。Cowork 那條路後面會單獨講。
            </p>
          </AnimatedBlock>
        </div>

        <div className="flex justify-center items-center h-full pt-8 lg:pt-0">
           <AnimatedBlock stepIndex={3} className="bg-indigo-950/20 border border-indigo-900/40 rounded-3xl p-6 relative overflow-hidden w-full h-full max-h-[450px]">
             
             <div className="space-y-4">
               <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800/80">
                 <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">執行前 (Before)</div>
                 <div className="font-mono text-sm text-slate-400 space-y-1">
                   <div>├─ IMG_9981.JPG</div>
                   <div>├─ screen-shot-2026.png</div>
                   <div>└─ downloaded_pic_1.jpeg</div>
                 </div>
               </div>

               <div className="animate-pulse flex justify-center text-indigo-500">
                 ↓ 執行 rename.js ↓
               </div>

               <div className="bg-slate-900/80 rounded-xl p-4 border border-indigo-500/30">
                 <div className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">執行後 (After)</div>
                 <div className="font-mono text-sm text-slate-100 space-y-1">
                   <div>├─ 20260621-001.JPG</div>
                   <div>├─ 20260621-002.png</div>
                   <div>└─ 20260621-003.jpeg</div>
                 </div>
               </div>
             </div>

             <div className="mt-8 space-y-2">
                <div className="flex items-center gap-3 text-indigo-400 text-sm font-bold">
                  <Check size={16} /> <span>不用自己查語法，多數情況下遇到錯誤它會自己修。</span>
                </div>
                <div className="flex items-center gap-3 text-indigo-400 text-sm font-bold">
                  <Check size={16} /> <span>AI 幫你做的不只有網頁，也包括沒有畫面的小工具。</span>
                </div>
             </div>
           </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
