import { Bot, RefreshCw, Terminal, TrendingUp, Lightbulb, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

export default function SlideGoalLoop() {
  return (
    <SlideLayout title="設定目標，讓它自己跑到完成" subtitle="Goal-Driven Loops, Built into Official CLIs" icon={Bot}>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 items-stretch">
        
        {/* Left Side: Claude Code vs Codex comparison */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Claude Code Card */}
            <AnimatedBlock stepIndex={1} className="bg-slate-900/80 border border-sky-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-sky-500/10 p-2 rounded-xl border border-sky-500/20">
                    <Terminal className="text-sky-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 font-mono">Claude Code</h3>
                    <p className="text-[11px] text-sky-400 font-mono uppercase tracking-wider">Anthropic CLI</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  <code className="text-sky-300 bg-slate-950 px-2 py-0.5 rounded text-xs font-mono">/goal</code> 是 Session 層級的完成條件，Claude 會跨多輪一直朝它收斂，這就是 Loop Engineering 講的<strong>「遞迴式目標」</strong>。
                </p>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="bg-sky-500/20 text-sky-400 text-[11px] font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5">/goal</span>
                    <div className="text-xs text-slate-300 font-medium">
                      回答：<strong>「做什麼，什麼叫做完」</strong>。
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-indigo-500/20 text-indigo-400 text-[11px] font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5">/loop</span>
                    <div className="text-xs text-slate-300 font-medium">
                      回答：<strong>「多久做一次」</strong>（排程與監控）。
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/80 mt-5 pt-3 text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={12} className="text-emerald-400" />
                兩者相乘，成了一條會自我修正直到通過的完整迴圈。
              </div>
            </AnimatedBlock>

            {/* Codex OpenAI Card */}
            <AnimatedBlock stepIndex={2} className="bg-slate-900/80 border border-indigo-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20">
                    <Bot className="text-indigo-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 font-mono">Codex (OpenAI)</h3>
                    <p className="text-[11px] text-indigo-400 font-mono uppercase tracking-wider">OpenAI CLI</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  OpenAI 官方推出的 CLI，在 2026 年上線了 <code className="text-indigo-300 bg-slate-950 px-2 py-0.5 rounded text-xs font-mono">/goal</code> 功能。它並非傳統的「一問一答」，而是真正的<strong>自動代理迴圈</strong>。
                </p>

                {/* Ralph Loop Pipeline */}
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-slate-400 tracking-wider">自己回頭修正的流程（Ralph 技巧）：</span>
                    <span className="text-[11px] px-1.5 py-0.5 bg-indigo-950/80 text-indigo-300 rounded border border-indigo-900/40 whitespace-nowrap">試錯循環</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    <strong>Ralph Loop</strong> 源自開源社群（由 Geoffrey Huntley 提出的 Ralph 技巧：用一個簡單的迴圈，反覆把錯誤訊息餵回去請 AI 修），現在官方工具已經把它做成內建功能。
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {['Plan', 'Act', 'Test', 'Review'].map((step, idx) => (
                      <div key={step} className="flex items-center gap-1">
                        <span className="text-[11px] font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-500/20 px-1.5 py-1 rounded font-mono">
                          {step}
                        </span>
                        {idx < 3 && <span className="text-[11px] text-slate-600 font-mono">➔</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/80 mt-5 pt-3 text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                <ShieldAlert size={12} className="text-amber-400" />
                持續循環，直到「目標達成」或「Token 預算燒完」才停。
              </div>
            </AnimatedBlock>

          </div>

          {/* Bottom Callout: Trend analysis */}
          <AnimatedBlock stepIndex={3} className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 shrink-0">
              <TrendingUp className="text-emerald-400" size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">官方把社群自己摸索出來的做法，收進了正式功能</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                原本是社群自己寫迴圈餵錯誤訊息，現在 OpenAI 與 Anthropic 都把它做成內建功能。共通的形狀都一樣：<strong>給它一個目標、一個預算，再留一道檢查關卡</strong>，然後讓它自己跑。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Side: What this trend means to learners */}
        <div className="xl:col-span-4 flex">
          <AnimatedBlock stepIndex={4} className="bg-gradient-to-b from-slate-900 to-indigo-950/30 border border-indigo-950/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full w-full">
            <div>
              <h3 className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-2">
                <Lightbulb size={20} className="text-amber-400" /> 這個變化的意思是
              </h3>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200">1. 兩家同時做了同一件事</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    兩個主要的 AI 供應商，都把「設定目標、讓它自己反覆試」做進官方自己的 CLI 工具裡，而不是留給使用者自己拼裝。
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200">2. 官方自己做的差別在哪</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cursor 的 Agent Mode 也能自動循環，但官方自己的 CLI 能把這套流程和底層系統、隔離環境綁得更緊，權限與邊界也控制得比較細。
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200">3. 要練的東西換了</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    要練的技能，從「怎麼寫一條好提示詞」，變成<strong>「怎麼設計一條會自己修正的迴圈」</strong>。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0f19] p-4 rounded-2xl border border-slate-800 mt-6 text-center">
              <span className="text-[11px] text-indigo-400 font-mono block mb-1 uppercase tracking-wider">換個角度看</span>
              <span className="text-xs text-slate-300 font-bold">從「下提示詞的人」變成「設計迴圈的人」</span>
            </div>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
