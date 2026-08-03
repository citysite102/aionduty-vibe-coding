import { FileSpreadsheet, GitPullRequest, TerminalSquare, Copy, AppWindow } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideIntroCases() {
  return (
    <SlideLayout title="同一個需求，三種做法" subtitle="When to Use What" icon={GitPullRequest}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-6 max-w-6xl mx-auto h-full items-start">
        
        <AnimatedBlock stepIndex={1} className="flex flex-col space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-xl font-bold text-sky-400 mb-4 border-b border-slate-800 pb-3">決策框架：你的需求在哪裡？</h3>
             <ul className="space-y-4 text-slate-300 text-sm">
               <li className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex gap-3 items-start">
                 <AppWindow className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                 <div>
                   <strong className="text-slate-100 block mb-1">情境一：視覺化元件、單一腳本 (網頁版 Artifacts)</strong>
                   <span className="text-slate-500 text-xs italic block mb-1">Artifacts＝Claude／ChatGPT 對話視窗右側那塊能即時預覽的產出面板。</span>
                   適合需要即時預覽、且與現有專案「無關」的獨立產出。缺點是無法讀取本機檔案。
                 </div>
               </li>
               <li className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex gap-3 items-start">
                 <Copy className="text-amber-400 shrink-0 mt-0.5" size={18} />
                 <div>
                   <strong className="text-slate-100 block mb-1">情境二：小幅度修改 (對話後複製貼上)</strong>
                   適合單次任務。但當專案變複雜時，來回複製貼上容易失去脈絡、覆蓋錯誤，或者忘記安裝相依套件。
                 </div>
               </li>
               <li className="bg-slate-950 p-4 rounded-lg border border-slate-800 border-l-4 border-l-sky-500 flex gap-3 items-start">
                 <TerminalSquare className="text-sky-400 shrink-0 mt-0.5" size={18} />
                 <div>
                   <strong className="text-slate-100 block mb-1">情境三：真實專案應用 (Claude Code 等 Agent)</strong>
                   直接在終端機運作，具備讀取檔案、執行指令的能力。能處理跨檔案邏輯，這才是真正實際執行的樣貌。
                 </div>
               </li>
             </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex flex-col">
          <h3 className="text-xl font-bold flex items-center gap-3 text-emerald-400 mb-4 border-b border-slate-800 pb-3">
            <FileSpreadsheet size={20} />
            具體案例：幫我處理報表
          </h3>
          
          <div className="flex-1 overflow-auto space-y-3">
            <div className="grid grid-cols-[auto_1fr] gap-3 text-sm">
              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-400">1</div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-slate-200 block mb-1">單次需求：老闆等一下要看</strong>
                <span className="text-slate-400">把資料丟進網頁版 Claude，請他直接幫你算好、畫出圓餅圖 (Artifacts)。</span>
              </div>
              
              <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-400">2</div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <strong className="text-slate-200 block mb-1">重複需求：每個月初都要做</strong>
                <span className="text-slate-400">在對話框請 AI 寫一支 Python 程式，你<span className="text-amber-400">複製貼上</span>到本機執行。如果出錯，你再把 Error 貼回對話框。</span>
              </div>

              <div className="w-8 h-8 rounded bg-sky-900/30 flex items-center justify-center font-bold text-sky-400 border border-sky-500/20">3</div>
              <div className="bg-slate-950 p-3 rounded-lg border border-sky-500/30">
                <strong className="text-slate-200 block mb-1">系統化需求：結合專案與工作流</strong>
                <span className="text-slate-400">在本機終端機開啟 <span className="text-sky-400 font-mono">Claude Code</span>，直接讓 Agent 在專案裡工作。<br/><br/><span className="text-emerald-400 block">Agent 會自己寫程式、自己安裝相依套件 (pip install)、自己除錯、自己 commit。</span></span>
                
                <details className="mt-3 group" onClick={(e) => e.stopPropagation()}>
                  <summary className="text-xs text-sky-400 cursor-pointer hover:text-sky-300 list-none flex items-center gap-1 font-bold">
                    <span className="group-open:rotate-90 transition-transform text-[11px]">▶</span> 展開查看範例 Prompt
                  </summary>
                  <div className="bg-slate-900 border border-slate-800 rounded p-3 text-xs font-mono text-emerald-300 mt-2 whitespace-pre-wrap leading-relaxed shadow-inner">
                    {`幫我寫一支 Python 腳本來處理報表，具體需求如下：\n1. 讀取 ./data/ 目錄下的所有 .csv 檔案\n2. 將這些檔案合併，並根據 '日期' 欄位排序\n3. 輸出到 ./output/summary.xlsx\n4. 執行腳本確認沒問題後，幫我用 'feat: add report processing script' 進行 git commit`}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
