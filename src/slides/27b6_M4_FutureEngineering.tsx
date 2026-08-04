import React from 'react';
import { Compass, Target, GraduationCap } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideFutureEngineering() {
  return (
    <SlideLayout 
      title="先說清楚，再讓它自己驗"
      subtitle="Spec First, Tests as the Finish Line"
      icon={Compass}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 items-stretch text-left">
        
        {/* Left Column: SDD & TDD 2.0 */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-sky-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Target size={14} /> Modern Paradigms
              </div>
              <h3 className="text-xl font-black text-slate-100 mb-3 leading-snug">
                精準定義指標，<br/>
                讓 AI 跑完最後一哩路
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                這兩個經典術語，在 Agent 時代有了新的意義：
              </p>

              <div className="space-y-4 mt-2">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 bg-sky-500/10 text-sky-400 text-[11px] font-mono rounded font-bold">SDD</span>
                    規格驅動開發 (Specification-Driven)
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    <strong>核心本質：</strong>「先想清楚，再動手做」。在寫程式不再是瓶頸的時代，寫出「清晰、沒有歧義的規格」才是核心。你把邏輯交代得越清楚，Agent 做出來的東西就越接近你要的樣子。
                  </p>
                </div>

                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/60">
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 text-[11px] font-mono rounded font-bold">TDD 2.0</span>
                    測試驅動開發 2.0 (Agentic TDD)
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    <strong>核心本質：</strong>「設定終點，自動導航」。你定出客觀的 Done-when 驗收條件（測試案例），Agent 就會在背景自動寫測試、跑測試、並自己修正程式碼，直到「測試報告全綠」才向你回報，自動朝目標收斂。
                  </p>
                </div>
              </div>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Column: Action Map */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <AnimatedBlock stepIndex={2} className="bg-gradient-to-b from-slate-900 to-indigo-950/20 border border-indigo-950/40 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            
            <div>
              <div className="flex items-center gap-2 mb-4 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <GraduationCap size={16} /> Roadmap for Ambitious Creators
              </div>
              <h3 className="text-xl font-black text-slate-100 mb-4">
                接下來可以練的三件事
              </h3>
              
              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">刻意練習「結構化表達需求」</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      戒掉語意模糊的日常閒聊，習慣用條列、Done-when 驗收條件或表格來交代複雜的邏輯。這是你之後每天都會用到的基本功。
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">理解網頁應用的基本拼圖 (No-Code Blueprint)</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      不需手寫語法，但要理解「前端呈現、後端 API 運算、資料庫保存狀態」這三者的協作關係。懂了資料如何傳遞，就能更好地引導 Agent 規劃出具擴充性的分層系統。
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">習慣去看它到底改了哪幾行</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      兩種看法，挑一種就好：<strong className="text-slate-300">問它</strong>「你剛剛改了哪些檔案、各改了什麼，用中文條列給我」；或<strong className="text-slate-300">打開 VS Code 左側的「原始檔控制」</strong>點任一檔案，綠色是新增的行、紅色是刪掉的行。看不懂的段落就直接圈起來問它為什麼這樣改。
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[11px] text-slate-400 font-bold">往後的工作方式：用清楚的規格交代，用自動測試驗收</span>
            </div>

          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
