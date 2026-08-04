import React from 'react';
import { AlertTriangle, Terminal, HelpCircle, ArrowRight, MessageSquareCode } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideError() {
  return (
    <SlideLayout title="紅字不是壞事，它在告訴你哪裡卡住" subtitle="Don't Panic" icon={AlertTriangle}>
      
      <div className="max-w-6xl mx-auto mt-2 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Panel: Mindset & Magic Prompt */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <AnimatedBlock stepIndex={1} className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute -right-6 -top-6 text-red-500/5 select-none pointer-events-none">
                <AlertTriangle size={150} />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-500/10 border border-red-500/20 rounded-full text-xs font-mono text-red-400 font-bold tracking-wider uppercase">
                  Mindset Shift
                </div>
                
                <h3 className="text-xl md:text-2xl font-extrabold text-red-200 leading-snug">
                  不要因為螢幕冒出紅色警告就慌張。
                </h3>
                
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  在終端機開發中，出現紅色錯誤訊息（Error Logs）是<strong>極其正常且健康的日常</strong>。錯誤不是懲罰，而是系統正在用最精確的語言告訴你：它在第幾行、因為什麼原因卡住了。
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                    <ArrowRight size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <span><strong>不要盲目亂改：</strong> 在還沒搞懂錯誤原因前，切忌隨意更改其他程式碼。</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                    <ArrowRight size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <span><strong>直接傳遞訊息：</strong> 將整個紅色警告區塊複製起來，直接丟給 AI：</span>
                  </div>
                </div>

                {/* Magic Prompt Container */}
                <div className="mt-4 bg-slate-950 border border-slate-800 p-4 rounded-xl relative">
                  <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                    <MessageSquareCode size={11} className="text-sky-400" />
                    <span>Recommended Prompt</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1.5 font-bold">💡 萬用除錯詢問法：</div>
                  <p className="text-xs md:text-sm text-sky-300 font-medium leading-relaxed font-sans">
                    「我遇到了這個錯誤，請用最簡單的白話文解釋它發生了什麼事，並給出 3 個可能的原因與具體解法。」
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-950/40 space-y-2">
                <div className="text-xs md:text-sm text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>重點不在於盲目排除，而在於知道發生了什麼事。</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  這一頁講的是<strong className="text-slate-400">終端機裡的紅字</strong>。還有另一種狀況是終端機安安靜靜，畫面卻壞掉，那種錯要去瀏覽器裡撈，課程後面會單獨講。
                </p>
              </div>
            </AnimatedBlock>
          </div>

          {/* Right Panel: Simulated Terminal Error Screen */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatedBlock stepIndex={2} className="bg-slate-950 border border-red-500/30 rounded-2xl p-4 font-mono shadow-[0_0_30px_rgba(239,68,68,0.05)] h-full flex flex-col justify-between">
              
              <div>
                {/* Terminal Header */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-900">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-500 ml-2 text-[11px] font-bold">zsh - mission-timer</span>
                  </div>
                  <span className="text-rose-500/90 text-[11px] font-extrabold bg-rose-950/30 px-1.5 py-0.5 rounded border border-rose-900/20 tracking-wider">BUILD ERROR</span>
                </div>

                {/* Terminal Code Log */}
                <div className="space-y-2 text-[11px] text-slate-300 leading-relaxed">
                  <div className="text-slate-500">$ npm run dev</div>
                  <div className="text-slate-400">&gt; vite-react-app@1.0.0 dev</div>
                  <div className="text-slate-400">&gt; vite</div>
                  <div className="text-emerald-400">  ➜  Local:   http://localhost:3000/</div>
                  
                  <div className="text-red-400 font-bold mt-4 flex items-center gap-1">
                    <span>❌ [Build Error] in /src/timer.js (4:23)</span>
                  </div>

                  {/* Detailed Error Block */}
                  <div className="bg-rose-950/20 border-l-2 border-red-500/80 p-2.5 rounded text-slate-300 my-2">
                    <div className="font-bold text-red-300 mb-1 flex items-center gap-1">
                      <span>Module Resolution Failed:</span>
                    </div>
                    <p className="leading-relaxed text-[11px] text-slate-300">
                      Failed to resolve import <code className="bg-slate-900 text-rose-300 px-1 py-0.5 rounded font-mono">"./planet-renderer"</code> from "src/timer.js". Does the file exist?
                    </p>
                  </div>

                  {/* Code snippet with indicator */}
                  <div className="text-slate-500 font-mono text-[11px] bg-slate-900/30 p-2 rounded border border-slate-900">
                    <div>3 | import &#123; startCountdown &#125; from "./countdown";</div>
                    <div className="text-rose-300 bg-rose-950/15 border-l-2 border-rose-500/50 -ml-2 pl-2">
                      4 | import &#123; drawPlanet &#125; from "./planet-renderer";
                    </div>
                    <div className="text-rose-400 font-bold ml-4">^ 找不到這個檔案</div>
                    <div>5 | </div>
                  </div>
                </div>
              </div>

              {/* Informative Tip Box */}
              <div className="mt-4 bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-[11px] leading-relaxed text-slate-400 flex gap-2">
                <HelpCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200">把上面整段丟給 AI，它會這樣回答你：</strong>
                  <p className="mt-1 mb-1.5">第 4 行要載入一個叫 planet-renderer 的檔案，但它找不到。三個可能原因：</p>
                  <ol className="space-y-0.5 list-decimal pl-4 text-slate-400">
                    <li>那個檔案根本還沒被建立</li>
                    <li>檔名或大小寫拼錯了</li>
                    <li>檔案存在，但放在別的資料夾</li>
                  </ol>
                  <p className="mt-1.5 text-slate-500">終端機能抓到的，都是這種「還沒跑起來就出事」的錯。</p>
                </div>
              </div>

            </AnimatedBlock>
          </div>

        </div>
      </div>

    </SlideLayout>
  );
}
