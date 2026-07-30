import React, { useState } from 'react';
import { Box, Play, AlertCircle, CheckCircle, ArrowRight, Zap, RefreshCw, Cpu, Activity } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

export default function SlideHarnessIntro() {
  const [activeTab, setActiveTab] = useState<'with' | 'without'>('with');
  const [triggerCount, setTriggerCount] = useState(0);

  return (
    <SlideLayout title="什麼是運作框架？" subtitle="What Is a Harness?" icon={Box}>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mt-2 items-stretch text-left pb-6">
        
        {/* Left Column: Conceptual Core */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 text-sky-400 text-xs font-bold bg-sky-950/50 px-3 py-1 rounded-full border border-sky-800">
                <Cpu size={14} /> HARNESS Mental Model
              </div>
              
              <h3 className="text-xl font-bold text-slate-100 leading-tight">
                「表現不佳，往往不是模型不夠聰明，<br/>
                <span className="text-sky-400">而是你給的『工作環境』太簡陋。</span>」
              </h3>
              
              <p className="text-slate-300 text-xs leading-relaxed">
                隨著各大頂尖模型的基礎能力（Claude、GPT、Gemini）落差逐漸縮小，<strong className="text-sky-300 font-bold">你為 AI 準備的「運作框架 (Harness)」才是拉開產出差距的地方。</strong>
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-3">
                <div className="flex gap-2.5">
                  <div className="text-amber-400 font-bold shrink-0">引擎 (LLM)：</div>
                  <div className="text-slate-400">就像是高馬力的賽車引擎（純模型算力）。若沒有底盤、懸吊與賽道約束，只會在原地空轉或直接失控撞牆。</div>
                </div>
                <div className="border-t border-slate-900 pt-2 flex gap-2.5">
                  <div className="text-sky-400 font-bold shrink-0">軌道＝運作框架：</div>
                  <div className="text-slate-400">就是你準備的環境設定：包含專案規範（CLAUDE.md）、輔助工具（MCP）與限制條件，把引擎的力量約束在正確方向上，才跑得快又不失控。</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-bold font-mono">CORE CONCEPT: RAILWAYS & CHASSIS</span>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Column: Interactive Framer Motion Animation Flow */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                  <Activity size={16} className="text-sky-400" />
                  動態流程示意：能量的軌道約束
                </h3>
                <button 
                  onClick={() => setTriggerCount(c => c + 1)}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[11px] font-mono text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-all"
                >
                  <RefreshCw size={10} className="animate-spin-slow" />
                  重新模擬 (Re-simulate)
                </button>
              </div>

              {/* Tab Selector */}
              <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
                <button
                  onClick={() => setActiveTab('without')}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'without' 
                      ? 'bg-red-950/40 text-red-400 border border-red-900/30' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <AlertCircle size={14} />
                  無環境導引 (No Harness)
                </button>
                <button
                  onClick={() => setActiveTab('with')}
                  className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'with' 
                      ? 'bg-sky-950/40 text-sky-400 border border-sky-900/30' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle size={14} />
                  有 Harness 軌道 (With Harness)
                </button>
              </div>

              {/* Flow Stage Panel */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 min-h-[220px] relative flex flex-col justify-between overflow-hidden">
                
                {/* Flow Lines and Background Dots */}
                <div className="absolute inset-0 bg-grid-slate-900/10 pointer-events-none" />
                
                {activeTab === 'without' ? (
                  /* CHAOTIC VIEW */
                  <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                      <span>1. 使用者提問</span>
                      <span>2. LLM 引擎 (直接發散)</span>
                      <span>3. 混亂產出</span>
                    </div>

                    <div className="relative h-20 bg-slate-900/40 rounded-xl border border-red-950/30 overflow-hidden flex items-center justify-between px-6">
                      {/* Source */}
                      <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs shrink-0 border border-red-500/30">
                        需求
                      </div>

                      {/* Chaotic Paths */}
                      <div className="absolute inset-x-12 inset-y-0 pointer-events-none overflow-hidden">
                        {[0, 1, 2, 3].map((i) => (
                          <motion.div
                            key={`${triggerCount}-${i}`}
                            className="absolute w-2 h-2 rounded-full bg-red-400"
                            style={{ left: '10px', top: '50%' }}
                            animate={{
                              x: [0, 180, 260],
                              y: [0, (i - 1.5) * 35, (i - 1.5) * 60],
                              opacity: [1, 1, 0],
                              scale: [1, 0.8, 0]
                            }}
                            transition={{
                              duration: 1.8,
                              delay: i * 0.25,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      {/* Engine */}
                      <div className="w-10 h-10 rounded-xl bg-slate-950 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-800 flex-col">
                        <Zap size={14} className="text-red-500 animate-pulse" />
                        <span className="text-[8px] mt-0.5">LLM</span>
                      </div>

                      {/* Destination Chaos */}
                      <div className="flex flex-col gap-1 items-end shrink-0">
                        <span className="text-[11px] font-mono text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20 flex items-center gap-1">
                          幻覺程式碼 (404)
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">無法理解檔案結構、瞎編 API</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* GUIDED HARNESS VIEW */
                  <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>1. 觸發指令</span>
                      <span>2. Harness 限制與 SOP 注入</span>
                      <span>3. 精準執行</span>
                    </div>

                    <div className="relative h-20 bg-slate-900/40 rounded-xl border border-sky-950/30 overflow-hidden flex items-center justify-between px-6">
                      {/* Source */}
                      <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 border border-sky-500/30">
                        指令
                      </div>

                      {/* Rail / Pipeline Path */}
                      <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-1 bg-slate-800 rounded-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 opacity-30" />
                      </div>

                      {/* Dynamic Pulse along the track */}
                      <div className="absolute inset-x-12 inset-y-0 pointer-events-none">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={`${triggerCount}-${i}`}
                            className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 shadow-lg shadow-sky-500/50"
                            style={{ top: 'calc(50% - 5px)' }}
                            animate={{
                              left: ['0%', '50%', '100%'],
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 2.2,
                              delay: i * 0.6,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                        ))}
                      </div>

                      {/* Harness constraint node */}
                      <div className="w-12 h-12 rounded-full bg-slate-950 text-sky-400 flex flex-col items-center justify-center font-bold text-[11px] shrink-0 border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/15 z-10">
                        <CheckCircle size={14} className="text-emerald-400 mb-0.5 animate-bounce" />
                        <span>SOP 檢查</span>
                      </div>

                      {/* Clean Output */}
                      <div className="flex flex-col gap-1 items-end shrink-0">
                        <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                          編譯成功 (200 OK)
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">符合 CLAUDE.md、精準讀寫</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-explanation */}
                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[11px] font-mono">
                  {activeTab === 'without' ? (
                    <>
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        ❌ 發散空轉 (Chaos)
                      </span>
                      <span className="text-slate-500">模型在未知其專案上下文的情況下胡亂猜測，浪費 Token。</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        🚀 軌道引導 (Rails)
                      </span>
                      <span className="text-slate-400">注入 CLAUDE.md 規範、搭配本機 MCP 工具、自動核對型別與程式碼。</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-950/40 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <span className="text-sky-400 font-bold block mb-1">💡 實踐啟示：</span>
              {activeTab === 'without' ? (
                <span>在沒有 CLAUDE.md 或 MCP 等 Harness 設定時，AI 只能像一般網頁對話框一樣「盲修」，容易偏離並寫出與專案架構完全衝突的冗餘程式碼。</span>
              ) : (
                <span>建置乾淨的規範 Harness (包括專案讀寫權、環境依賴與明確規則) 能讓 AI 在對的框架內工作，<strong>大幅提高一次到位、可編譯通過的成功率</strong>！</span>
              )}
            </div>
          </AnimatedBlock>
        </div>
        
      </div>
    </SlideLayout>
  );
}
