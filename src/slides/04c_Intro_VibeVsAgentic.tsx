import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { ArrowRight, CheckCircle2, AlertTriangle, FileCode2 } from 'lucide-react';

export default function SlideVibeVsAgentic() {
  return (
    <SlideLayout title="Vibe Coding 與 Agentic Engineering" subtitle="From Vibe to Agentic" icon={ArrowRight}>
      <div className="pt-6 max-w-6xl mx-auto min-h-full flex flex-col">
        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
          決定開發模式的關鍵，不在於「是否使用 AI」，而是 <strong className="text-sky-300 font-bold">AI 輸出背後有多少結構、驗證與人類的控制</strong>。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-amber-950/30 rounded-xl text-amber-400 border border-amber-900/50">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">Vibe Coding</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">你怎麼交代任務</h4>
                <p className="text-slate-300 text-lg leading-snug">隨口說說的自然語言 Prompt</p>
                <p className="mt-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm leading-relaxed text-slate-400">
                  幫我加一個匯出按鈕
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  沒說加在哪一頁、匯出成什麼格式，它只能自己猜一個。
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">驗證方式</h4>
                <p className="text-slate-300 text-lg leading-snug">「看起來會動」就好</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">錯誤處理</h4>
                <p className="text-slate-300 text-lg leading-snug">把錯誤訊息直接丟回給 AI 修</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-slate-950 rounded-xl text-slate-400 border border-slate-800">
                <FileCode2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">AI 輔助開發</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">你怎麼交代任務</h4>
                <p className="text-slate-300 text-lg leading-snug">局部、半規格化的 Prompt 與程式碼引導</p>
                <p className="mt-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm leading-relaxed text-slate-400">
                  在報表頁加一個匯出按鈕，按下去把目前表格存成 CSV
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  說清楚了加在哪、做什麼，但沒說要照什麼規範寫，也沒說怎麼算做完。
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">驗證方式</h4>
                <p className="text-slate-300 text-lg leading-snug">部分單元測試與人工檢驗</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">錯誤處理</h4>
                <p className="text-slate-300 text-lg leading-snug">人工引導或微調修正</p>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-sky-950/20 border border-sky-900/50 rounded-2xl p-6 flex flex-col relative overflow-hidden hover:border-sky-700/50 transition-colors">
             <div className="absolute top-0 right-0 bg-sky-600/20 text-sky-300 text-xs font-bold px-3 py-1.5 rounded-bl-xl border-b border-l border-sky-600/30">
              目標狀態
            </div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-950/30 rounded-xl text-emerald-400 border border-emerald-900/50">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-emerald-300">Agentic Engineering</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-sky-600/80 mb-2 uppercase tracking-wider">你怎麼交代任務</h4>
                <p className="text-sky-100 text-lg font-medium leading-snug">正式的規格、架構文件與 Memory 記憶檔</p>
                <p className="mt-2 rounded-lg border border-sky-900/40 bg-slate-950/60 px-3 py-2 font-mono text-sm leading-relaxed text-sky-100/90">
                  照 <code className="text-orange-300">CLAUDE.md</code> 的元件慣例，在報表頁加匯出 CSV 的功能，補一個測試蓋住空資料的情況，跑過 lint 再回報
                </p>
                <p className="mt-2 text-sm leading-relaxed text-sky-200/60">
                  多講的三件事：照哪份規範、怎麼驗、什麼情況算做完。
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-sky-600/80 mb-2 uppercase tracking-wider">驗證方式</h4>
                <p className="text-sky-100 text-lg font-medium leading-snug">每次改動自動跑測試，再讓另一個 AI 審一次</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-sky-600/80 mb-2 uppercase tracking-wider">錯誤處理</h4>
                <p className="text-sky-100 text-lg font-medium leading-snug">Agent 在定義好的邊界內自我診斷，並梳理架構問題</p>
              </div>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
