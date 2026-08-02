import React from 'react';
import { Terminal, Shield, ArrowRight, HelpCircle, Activity, Compass, Star } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

export default function SlideClaudeCodeUI() {
  return (
    <SlideLayout title="畫面上這幾塊分別在說什麼" subtitle="Claude Code Welcome Console" icon={Terminal}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">
        
        {/* Left column: Explaining sections */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-left">
          <div>
            <AnimatedBlock stepIndex={1}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-400 font-mono mb-3 animate-pulse">
                <Compass size={12} /> FIRST LAUNCH GUIDE
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3">
                第一次啟動？<br/>
                教你一眼看懂這個畫面
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                在專案目錄下輸入 <code>claude</code> 啟動後，很多人會對著黑畫面發愣。其實畫面上每一區都有它的用途：
              </p>
            </AnimatedBlock>

            <div className="space-y-3 text-xs md:text-sm">
              <AnimatedBlock stepIndex={2} className="flex gap-3 items-start bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <div className="p-1.5 bg-orange-500/10 text-orange-400 rounded shrink-0">
                  <Star size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">1. 目前狀態與模型 (左側)</h4>
                  <p className="text-[12px] text-slate-400 mt-0.5">顯示目前載入的模型、訂閱方案與目前專案目錄。想換模型可用 /model。</p>
                </div>
              </AnimatedBlock>

              <AnimatedBlock stepIndex={3} className="flex gap-3 items-start bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <div className="p-1.5 bg-sky-500/10 text-sky-400 rounded shrink-0">
                  <Activity size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">2. 近期活動記錄 (右上)</h4>
                  <p className="text-[12px] text-slate-400 mt-0.5">列出你前幾次對話修改的歷史紀錄，隨時可以輸入 <code>/resume</code> 繼續未完成的工作。</p>
                </div>
              </AnimatedBlock>

              <AnimatedBlock stepIndex={4} className="flex gap-3 items-start bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded shrink-0">
                  <Shield size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">3. 新版特色與快捷指令 (右下)</h4>
                  <p className="text-[12px] text-slate-400 mt-0.5">提示如 <code>/agents</code> (多子代理)、<code>/security-review</code> (安全性審查) 等進階指令。</p>
                </div>
              </AnimatedBlock>
            </div>
          </div>

          <AnimatedBlock stepIndex={5} className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/30 text-xs text-amber-300">
            💡 <strong>免驚指南：</strong>這不是程式語言編譯器！此時的游標 <code>&gt;</code> 正在等待你的口語指示。你可以打中文：「請幫我看看這個專案要怎麼跑起來」或「幫我寫個倒數計時網頁」，它就會立刻動起來！
          </AnimatedBlock>
        </div>

        {/* Right column: Claude Code High-Fidelity UI Mockup (Image 1) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatedBlock stepIndex={2} className="relative bg-[#0c0c0e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[460px] font-mono text-xs text-slate-300 text-left">
            
            {/* Mac Terminal Window Frame Header */}
            <div className="bg-[#141416] px-4 py-3 flex items-center gap-1.5 border-b border-slate-900 shrink-0">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 block"></span>
              <span className="text-[11px] text-slate-500 font-mono ml-4">Terminal - claude-code @ local</span>
            </div>

            {/* Terminal Screen Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              
              {/* Boxed area matching image 1 layout */}
              <div className="border border-dashed border-orange-500/20 rounded-xl p-5 relative bg-orange-500/[0.01]">
                
                {/* Title overlay */}
                <div className="absolute -top-2.5 left-4 bg-[#0c0c0e] px-2 text-[11px] text-orange-400 font-bold tracking-wider">
                  Claude Code v2.1.x
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-2">
                  
                  {/* Left Column: Welcome back & robot icon */}
                  <div className="flex flex-col items-center justify-center text-center border-r border-slate-800/50 md:pr-4">
                    <div className="text-orange-400 font-bold mb-4">Welcome back Meaghan!</div>
                    
                    {/* Space Invader Orange pixel art robot icon */}
                    <div className="w-20 h-16 flex flex-col justify-between items-center my-2 text-orange-500">
                      {/* Pixel layout representation */}
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-orange-500"></span>
                        <span className="w-2 h-2 bg-transparent"></span>
                        <span className="w-2 h-2 bg-transparent"></span>
                        <span className="w-2 h-2 bg-transparent"></span>
                        <span className="w-2 h-2 bg-orange-500"></span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-transparent"></span>
                        <span className="w-2 h-2 bg-orange-500"></span>
                        <span className="w-2 h-2 bg-orange-500"></span>
                        <span className="w-2 h-2 bg-orange-500"></span>
                        <span className="w-2 h-2 bg-transparent"></span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-orange-500 font-bold">■■■■■</span>
                      </div>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-orange-500"></span>
                        <span className="w-2 h-2 bg-transparent"></span>
                        <span className="w-2 h-2 bg-orange-500"></span>
                        <span className="w-2 h-2 bg-transparent"></span>
                        <span className="w-2 h-2 bg-orange-500"></span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-4">
                      Sonnet 5 • Max 20x
                    </div>
                    <div className="text-[11px] text-slate-600 truncate max-w-[200px] mt-1">
                      /users/meaghan/code/apps
                    </div>
                  </div>

                  {/* Right Column: Recent activity & What's new */}
                  <div className="space-y-4 md:pl-2">
                    {/* Recent activity box */}
                    <div>
                      <div className="text-orange-400/80 font-bold text-[12px] mb-1.5 border-b border-slate-900 pb-1">
                        Recent activity
                      </div>
                      <div className="space-y-1 text-[11px] text-slate-400">
                        <div className="flex justify-between"><span className="text-slate-500 shrink-0">1m ago</span> <span className="text-slate-300 truncate pl-3">Updated project memory</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 shrink-0">8m ago</span> <span className="text-slate-300 truncate pl-3">Updated claw'd feet</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 shrink-0">2d ago</span> <span className="text-slate-300 truncate pl-3">Add new words to spinner</span></div>
                        <div className="flex justify-between"><span className="text-slate-500 shrink-0">1w ago</span> <span className="text-slate-300 truncate pl-3">Update unit tests</span></div>
                        <div className="text-slate-600 italic text-[11px] mt-1">... /resume for more</div>
                      </div>
                    </div>

                    {/* What's new box */}
                    <div>
                      <div className="text-orange-400/80 font-bold text-[12px] mb-1.5 border-b border-slate-900 pb-1">
                        What's new
                      </div>
                      <div className="space-y-1 text-[11px] text-slate-400">
                        <div><code className="text-amber-500">/agents</code> to create subagents</div>
                        <div><code className="text-amber-500">/security-review</code> for review agent</div>
                        <div><code className="text-slate-500">ctrl+b</code> to background bashes</div>
                        <div className="text-slate-600 italic text-[11px] mt-1">... /help for more</div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom Interactive Command prompt area */}
              <div className="pt-4 border-t border-slate-900/60 flex flex-col justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-orange-500 font-bold shrink-0 animate-pulse">&gt;</span>
                  {/* Simulated blinking terminal cursor */}
                  <div className="flex items-center gap-1.5 w-full">
                    <span className="bg-slate-300 w-1.5 h-4 inline-block animate-[ping_1s_infinite]"></span>
                    <span className="text-slate-500 font-mono text-[12px] truncate">
                      try "edit &lt;filepath&gt; to ..."
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Credit Bar */}
            <div className="bg-[#08080a] border-t border-slate-900 px-4 py-2.5 text-center text-[11px] text-slate-600 flex justify-between">
              <span>來源：Anthropic Claude Code 官方終端機介面</span>
              <span>
                官方文件: <a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">code.claude.com</a>
              </span>
            </div>

          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
