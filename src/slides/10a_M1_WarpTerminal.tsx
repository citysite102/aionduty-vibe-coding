import React, { useState } from 'react';
import { Terminal, Cpu, Share2, Award, AlertCircle, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';
import { motion } from 'motion/react';

export default function SlideWarpTerminal() {
  const [activeTab, setActiveTab] = useState<'agent' | 'features'>('agent');

  return (
    <SlideLayout title="推薦現代 AI 終端機 Warp" subtitle="Modern Terminal with Warp AI" icon={Terminal}>
      <LiveDemo kind="terminal" note="打開 Warp 看實際操作" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">
        
        {/* Left column: Warp Intro */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <AnimatedBlock stepIndex={1}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-xs text-sky-400 font-mono mb-3">
                <Award size={12} /> RECOMMENDED TOOL
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3">
                別再用內建終端機了！<br/>
                用 <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Warp</span> 提升終端機體驗
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                傳統終端機（如 Mac Terminal、Windows 終端機）是一行行生硬且難以編輯的文字。<strong>Warp</strong> 是一款內建 AI 輔助與現代操作邏輯的終端機工具。
              </p>
            </AnimatedBlock>

            <div className="space-y-3">
              <AnimatedBlock stepIndex={2} className="flex gap-3 items-start bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                  <Cpu size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">像編輯器一樣好打字</h4>
                  <p className="text-xs text-slate-400 mt-0.5">滑鼠點擊任意處定位、複製、貼上，甚至內建拼字檢查，不用背一堆 Ctrl 快捷鍵。</p>
                </div>
              </AnimatedBlock>

              <AnimatedBlock stepIndex={3} className="flex gap-3 items-start bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg shrink-0">
                  <Terminal size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">內建 AI 提示與 Command Search</h4>
                  <p className="text-xs text-slate-400 mt-0.5">忘記指令？直接按 <code>#</code> 輸入中文：「幫我把連接埠 3000 的程式關掉」，AI 直接幫你寫出指令。</p>
                </div>
              </AnimatedBlock>

              <AnimatedBlock stepIndex={4} className="flex gap-3 items-start bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                  <Share2 size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Warp Drive：保存常用指令</h4>
                  <p className="text-xs text-slate-400 mt-0.5">把調通的指令或 SOP 存到雲端，之後可以分享給團隊或自己回頭用。</p>
                </div>
              </AnimatedBlock>
            </div>
          </div>

          <AnimatedBlock stepIndex={5} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <p>
              💡 <strong>推薦理由：</strong>非工程師常對全黑的文字畫面感到陌生。Warp 的現代編輯邏輯與 AI 輔助功能，能大幅減輕學習 Terminal 的適應門檻。(支援 Mac / Linux / Windows)
            </p>
            <p className="text-slate-500 border-t border-slate-900 pt-2 text-[11px]">
              ⚠️ <strong>重要提醒：</strong>前面教的指令（如 <code>pwd</code>, <code>ls</code>, <code>mkdir</code>）都是<strong>全平台通用的標準指令</strong>。Warp 只是讓你打字更舒服、提供 AI 輔助的工具，<strong>不裝也完全不影響後面所有課程的進行</strong>！
            </p>
          </AnimatedBlock>
        </div>

        {/* Right column: Interactive high-fidelity Warp mockup (Image 2) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatedBlock stepIndex={2} className="relative bg-[#09090b] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[460px]">
            
            {/* Mac Window Header */}
            <div className="bg-[#18181b] px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500 block"></span>
                <span className="text-xs text-slate-400 font-mono ml-4 truncate max-w-[200px] md:max-w-xs">
                  Add Popularity Indicator to Warp Drive Objects
                </span>
              </div>
              <div className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[11px] font-mono rounded">
                Warp Drive
              </div>
            </div>

            {/* Split Screen Layout */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 text-left font-mono text-xs overflow-hidden">
              
              {/* Left Pane: Agent Running */}
              <div className="md:col-span-7 p-4 border-r border-slate-800 flex flex-col justify-between overflow-y-auto bg-slate-950/40">
                <div>
                  {/* Task 4 */}
                  <div className="mb-4">
                    <div className="text-slate-400 font-bold mb-1">Task 4: Update API route to calculate popularity scores</div>
                    <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/5 p-2 rounded border border-emerald-500/10 mb-1">
                      <CheckCircle2 size={14} className="shrink-0" />
                      <span>Calculate popularity scores in API route <span className="text-[11px] bg-emerald-950 px-1 py-0.5 rounded font-semibold text-emerald-300 ml-1">+8 • -1</span></span>
                    </div>
                    <div className="text-slate-600 pl-4 text-[12px] mb-2">Thought for 1 second &gt;</div>
                    <div className="flex items-center gap-2 text-emerald-400 pl-4">
                      <CheckCircle2 size={12} />
                      <span className="text-[12px]">Completed Update API route to calculate popularity... (4/9)</span>
                    </div>
                  </div>

                  {/* Task 5 */}
                  <div className="mb-4">
                    <div className="text-slate-500 font-bold mb-1">Thought for 6 seconds &gt;</div>
                    <div className="text-slate-200 font-bold mb-1">Task 5: Add popularity...</div>
                    <div className="flex items-center gap-2 text-pink-400 bg-pink-500/5 p-2 rounded border border-pink-500/10">
                      <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                      <span>Add popularity indicator to ObjectCard</span>
                    </div>
                  </div>

                  {/* Simulated interactive task popover */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-xl space-y-1.5 max-w-[90%] mx-auto mt-2">
                    <div className="text-slate-400 font-bold border-b border-slate-800 pb-1 mb-1 text-[11px] flex justify-between">
                      <span>TASKS RUNNING (4/9)</span>
                      <span className="text-indigo-400">Warp Agent</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                      <CheckCircle2 size={10} /> <span>Create popularity utility functions</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                      <CheckCircle2 size={10} /> <span>Update ObjectData type with popularity</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-pink-400 text-[11px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0"></span>
                      <span>Add popularity indicator to ObjectCard</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                      <Circle size={10} /> <span>Implement popularity sorting logic</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900">
                  <div className="text-slate-600 text-[11px]">~/repos/do-things [main] 5• +152 -12</div>
                  <div className="text-sky-400 text-[12px] flex items-center gap-1 mt-1">
                    <span className="text-slate-400">&gt;</span> Warp anything e.g. "Find and fix the error"
                  </div>
                </div>
              </div>

              {/* Right Pane: Code Review State */}
              <div className="md:col-span-5 p-4 bg-slate-900/50 overflow-y-auto flex flex-col justify-between">
                <div>
                  <h4 className="text-slate-200 font-bold border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-1">
                    <AlertCircle size={12} className="text-indigo-400" />
                    Problem Statement
                  </h4>
                  <p className="text-slate-400 text-[12px] leading-relaxed mb-4">
                    The site currently displays Warp Drive objects but lacks a way to highlight popular or trending objects. Users have no indication of which objects are more popular or worth exploring first.
                  </p>

                  <h4 className="text-slate-200 font-bold border-b border-slate-800 pb-1.5 mb-2">
                    Current State Overview
                  </h4>
                  <p className="text-slate-400 text-[12px] leading-relaxed mb-4">
                    Next.js app using TypeScript, Tailwind CSS, and shadcn/ui components. Objects loaded from YAML files.
                  </p>
                </div>

                <div className="text-right text-[11px] text-slate-500">
                  <span>Warp.dev 官方 AI Agent 示範</span>
                </div>
              </div>

            </div>

            {/* Source Credit overlay at bottom */}
            <div className="bg-[#111] border-t border-slate-800 px-4 py-2 text-center text-[11px] text-slate-500 flex justify-between items-center">
              <span>💡 Warp Terminal 獨特的「區塊」與 AI 整合介面</span>
              <span>
                官方網站: <a href="https://www.warp.dev/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">warp.dev</a>
              </span>
            </div>

          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
