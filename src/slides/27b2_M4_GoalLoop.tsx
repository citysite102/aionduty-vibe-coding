import { Bot, Terminal, TrendingUp, Lightbulb, CheckCircle2, ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideGoalLoop() {
  return (
    <SlideLayout title="設定目標，讓它自己跑到完成" subtitle="Goal-Driven Agent Workflow" icon={Bot}>
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
                  Claude Code 的重點不是某個特定指令，而是它能在專案脈絡裡讀檔、改檔、呼叫工具，並受權限模式限制。你要練的是把一輪工作說成<strong>「目標、完成條件與邊界」</strong>。
                </p>

                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="bg-sky-500/20 text-sky-400 text-[11px] font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5">目標</span>
                    <div className="text-xs text-slate-300 font-medium">
                      說清楚：<strong>「做什麼，什麼叫做完」</strong>。
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="bg-sky-500/20 text-sky-400 text-[11px] font-mono px-1.5 py-0.5 rounded shrink-0 mt-0.5">邊界</span>
                    <div className="text-xs text-slate-300 font-medium">
                      說清楚：<strong>「能跑幾輪、能動哪些檔案、何時停下來問」</strong>。
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800/80 mt-5 pt-3 text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={12} className="text-emerald-400" />
                目標明確，邊界清楚，Agent 才能連續做事而不失控。
              </div>
            </AnimatedBlock>

            {/* Codex OpenAI Card */}
            <AnimatedBlock stepIndex={2} className="bg-slate-900/80 border border-sky-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-sky-500/10 p-2 rounded-xl border border-sky-500/20">
                    <Bot className="text-sky-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 font-mono">Codex (OpenAI)</h3>
                    <p className="text-[11px] text-sky-400 font-mono uppercase tracking-wider">OpenAI CLI</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Codex 類工具的共同價值，是讓代理讀懂 repo、提出修改、執行檢查，再把結果交回來。不同工具的介面名稱會變，但你要設計的工作流形狀不變。
                </p>

                {/* Agent loop pipeline */}
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] text-slate-400 tracking-wider">自己回頭修正的基本形狀：</span>
                    <span className="text-[11px] px-1.5 py-0.5 bg-sky-950/80 text-sky-300 rounded border border-sky-900/40 whitespace-nowrap">試錯循環</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    不要記某個產品名稱，記這條鏈：先計畫、再修改、跑檢查、看結果，失敗就帶著證據回到下一輪。
                    這就是第一單元「探索、計畫、執行、驗證」那張圖，差別只在原本每一格都要你按一次，現在它自己走完。
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    {['Plan', 'Act', 'Test', 'Review'].map((step, idx) => (
                      <div key={step} className="flex items-center gap-1">
                        <span className="text-[11px] font-bold text-sky-300 bg-sky-950/50 border border-sky-500/20 px-1.5 py-1 rounded font-mono">
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
                讓它連續跑之前，先設定預算、權限與人工檢查點。
              </div>
            </AnimatedBlock>

          </div>

          {/* Bottom Callout: Trend analysis */}
          <AnimatedBlock stepIndex={3} className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/20 shrink-0">
              <TrendingUp className="text-emerald-400" size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100">工具名稱會變，工作流形狀不會變</h4>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                不管你用哪一套 Agent 工具，共通的形狀都一樣：<strong>給它一個目標、一個預算，再留一道檢查關卡</strong>，然後讓它依證據推進下一步。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Side: What this trend means to learners */}
        <div className="xl:col-span-4 flex">
          <AnimatedBlock stepIndex={4} className="bg-gradient-to-b from-slate-900 to-sky-950/30 border border-sky-950/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full w-full">
            <div>
              <h3 className="text-lg font-bold text-sky-300 mb-4 flex items-center gap-2">
                <Lightbulb size={20} className="text-amber-400" /> 這個變化的意思是
              </h3>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200">1. 先學共同模型，不追單一指令</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    不同工具會用不同入口處理長任務。課程要你帶走的是：如何定義目標、預算、邊界與檢查點。
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-200">2. 放手不是全放行</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    讓 Agent 連續工作時，仍要決定它能讀哪裡、能寫哪裡、能不能下指令，以及什麼情況必須停下來。
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
              <span className="text-[11px] text-sky-400 font-mono block mb-1 uppercase tracking-wider">換個角度看</span>
              <span className="text-xs text-slate-300 font-bold">從「下提示詞的人」變成「設計迴圈的人」</span>
            </div>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
