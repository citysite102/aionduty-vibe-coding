import React from 'react';
import { Terminal, Sparkles, MessageSquare, RefreshCw, Image, Compass } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideClaudeFlowCmds() {
  return (
    <SlideLayout 
      title="Claude Code 對話與會話控制命令" 
      subtitle="Interactive Flow Commands & Multimodal Terminal Inputs" 
      icon={Compass}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mt-2 items-stretch text-left pb-6">
        
        {/* Left column: Contextual Flow */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatedBlock stepIndex={1} className="bg-gradient-to-b from-slate-900 to-sky-950/20 border border-slate-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 text-sky-400 text-xs font-bold bg-sky-950/50 px-3 py-1 rounded-full border border-sky-800">
                <Terminal size={14} /> FLOW CONTROL
              </div>
              
              <h3 className="text-xl font-black text-slate-100 leading-tight">
                「掌控記憶與輸入」<br/>
                讓 AI 保持專注
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                任務一長，AI 的上下文（Context Window）會越積越多。<strong>Token 成本會跟著上去</strong>，注意力也會被稀釋，開始出現幻覺。
              </p>
              <p className="text-slate-400 text-xs leading-relaxed">
                這組「進階控制命令」可以整理記憶、把離題的問題隔開，也可以直接貼圖給它看畫面（多模態）。
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-[11px] text-slate-500 leading-normal italic">
                💡 提醒：長對話時養成隨手壓縮記憶（/compact）的習慣，後面比較不會因為上下文太滿而出錯。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right column: Interactive Commands */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            
            {/* Command 1: /compact & /resume */}
            <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl">
                    <RefreshCw size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">歷史壓縮與重啟</h4>
                    <span className="text-[11px] font-mono text-sky-300 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">/compact & /resume</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  輸入 <code className="text-sky-300 font-mono">/compact</code> 會把前面的對話做有損壓縮，清掉重複的程式碼上下文，後續的 Token 消耗會降下來。<code className="text-sky-300 font-mono">/resume</code> 則是回到前一天的會話狀態繼續。
                </p>
              </div>
            </AnimatedBlock>

            {/* Command 2: /btw for Side Questions */}
            <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">題外話隔離器</h4>
                    <span className="text-[11px] font-mono text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">/btw 指令</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>保持專注：</strong>修改複雜專案時，突然想問個不相干的問題（如「這個 API 指令是什麼意思？」），若直接問會污染當前的程式碼上下文。用 <code className="text-sky-300 font-mono">/btw [問題]</code>，此問題與回答將不載入上下文！
                </p>
              </div>
            </AnimatedBlock>

          </div>

          {/* Bottom Pro Tip: Ctrl + V Image Clipboard */}
          <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex gap-4 items-center">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-2xl shrink-0">
              <Image size={24} />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-100">多模態截圖貼上</h4>
                <span className="text-[11px] font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">Ctrl + V</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>多模態視覺修正：</strong>在與 Claude Code 對話時，直接複製網頁上的 Bug 畫面、或是設計師提供的 Figma 設計稿，在輸入框按下 <code className="text-amber-400 bg-amber-500/10 px-1 py-0.5 rounded font-mono font-bold">Ctrl+V</code>。多模態終端機會自動上傳圖片，讓 AI 照著畫面直接修復前端程式！
              </p>
            </div>
          </AnimatedBlock>

        </div>

      </div>
    </SlideLayout>
  );
}
