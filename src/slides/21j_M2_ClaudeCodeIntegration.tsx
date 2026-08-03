import React from 'react';
import { Terminal, Globe, ArrowRightLeft, Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideClaudeCodeIntegration() {
  return (
    <SlideLayout 
      title="Claude Projects 與 Claude Code 怎麼搭" 
      subtitle="Integrating Claude Projects with Claude Code" 
      icon={Layers}
    >
      <div className="flex flex-col gap-5 pb-8">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            很多人會問：「我既然有了 <strong>Claude Code</strong>，還需要網頁版的 <strong>Claude Projects</strong> 嗎？」<br/>
            答案是：<strong className="text-emerald-400">一個負責動手，一個負責討論，搭配起來用最順。</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Terminal size={40} /></div>
              <h4 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
                <Terminal size={18} /> 動手的那個：Claude Code
              </h4>
              <p className="text-sm text-slate-300 mb-2 leading-relaxed"><strong>它能做什麼：</strong>有執行權限，能讀整個資料夾、執行測試指令、操作版本控制，直接把檔案改出來。</p>
              <p className="text-sm text-slate-400 leading-relaxed"><strong>在哪裡用：</strong>終端機、VS Code 與 JetBrains 擴充、桌面版、瀏覽器（claude.ai/code）都跑得動，CLAUDE.md 與設定共用一份。</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10"><Globe size={40} /></div>
              <h4 className="text-sky-400 font-bold mb-3 flex items-center gap-2">
                <Globe size={18} /> 討論的那個：Claude Projects
              </h4>
              <p className="text-sm text-slate-300 mb-2 leading-relaxed"><strong>它能做什麼：</strong>圖文介面、Artifacts 視覺預覽，適合把團隊長期共用的規格文件放在同一個地方。</p>
              <p className="text-sm text-slate-400 leading-relaxed"><strong>它不能做什麼：</strong>不會在你的電腦裡建立檔案，也不會執行任何指令。</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mt-3">
            順帶澄清一個常見誤會：Claude Code 已經不是只有終端機那個黑畫面。桌面版與瀏覽器版看得到視覺化的變更對照，它也能把成果輸出成可以分享的 Artifacts 頁面。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-sky-400 font-bold mb-5 flex items-center gap-2 text-lg">
            <ArrowRightLeft size={20} />
            實務建議：工具切換的工作流程
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 bg-[#1e1e1e] border border-slate-800 p-5 rounded-xl text-center w-full">
              <div className="text-sm font-bold text-slate-200 mb-2">Step 1: 網頁端規劃</div>
              <div className="text-xs text-slate-400 text-left leading-relaxed">在 Claude Projects 中提供規格，請 AI 規劃系統架構，並利用 Artifacts 預覽 UI 原型。</div>
            </div>
            
            <ArrowRightLeft className="text-slate-600 shrink-0 hidden sm:block" size={24} />
            <ArrowRightLeft className="text-slate-600 shrink-0 sm:hidden rotate-90" size={24} />
            
            <div className="flex-1 bg-[#1e1e1e] border border-slate-800 p-5 rounded-xl text-center w-full">
              <div className="text-sm font-bold text-slate-200 mb-2">Step 2: 傳遞與交接</div>
              <div className="text-xs text-slate-400 text-left leading-relaxed">把網頁端規劃好的架構、Schema 與元件清單，複製成一份 <code>plan.md</code> 存檔到本機專案目錄中。</div>
            </div>

            <ArrowRightLeft className="text-slate-600 shrink-0 hidden sm:block" size={24} />
            <ArrowRightLeft className="text-slate-600 shrink-0 sm:hidden rotate-90" size={24} />

            <div className="flex-1 bg-[#1e1e1e] border border-slate-800 p-5 rounded-xl text-center w-full">
              <div className="text-sm font-bold text-slate-200 mb-2">Step 3: 本機實作</div>
              <div className="text-xs text-slate-400 text-left leading-relaxed">在終端機啟動 Claude Code：<br/><code className="text-amber-300 mt-2 block">請讀取 plan.md 並幫我建立所有相關的檔案與路由。</code></div>
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
