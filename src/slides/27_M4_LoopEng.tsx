import { RefreshCw, ExternalLink, User, Bot, ArrowRight, Cpu, Clock } from 'lucide-react';
import { SlideLayout, AnimatedBlock, useSlide } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const LoopEngineeringAnimation = () => {
  const { currentStep } = useSlide();
  // 預設跟著簡報節奏走：第一拍看「過去」，推進到第二拍自動切到「現在」。
  // 講者仍可手動點分頁覆蓋，不會有畫面自己跳走的情況。
  const [override, setOverride] = useState<'manual' | 'loop' | null>(null);
  const activeTab: 'manual' | 'loop' = override ?? (currentStep >= 2 ? 'loop' : 'manual');

  return (
    <div className="w-full h-[440px] bg-slate-950 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_75%)] pointer-events-none"></div>

      {/* Tab controls */}
      <div className="flex bg-slate-900/80 backdrop-blur border border-slate-800 p-1.5 rounded-xl self-center z-10 gap-2">
        <button
          onClick={() => setOverride('manual')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'manual'
              ? 'bg-slate-800 text-slate-200 border border-slate-700'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <User size={14} /> 過去：手動下指令 (Manual)
        </button>
        <button
          onClick={() => setOverride('loop')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'loop'
              ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <RefreshCw size={14} /> 現在：讓系統自己跑迴圈 (Loop)
        </button>
      </div>

      {/* Animation stage */}
      <div className="flex-1 flex items-center justify-center relative mt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'manual' ? (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="flex items-center gap-10 md:gap-14 relative">
                {/* Human Designer */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center relative">
                    <User className="text-slate-300" size={32} />
                    <span className="absolute -top-3 -right-2 text-xs font-bold text-slate-600 font-mono">zzz</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-bold">人類執行者</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">思考、打字、等待</span>
                </div>

                {/* Arrow with typing packet */}
                <div className="relative flex flex-col items-center">
                  <span className="text-[11px] font-mono text-slate-500 mb-1">手動輸入 Prompt</span>
                  <div className="flex items-center relative">
                    <ArrowRight className="text-slate-700" size={32} />
                    <motion.div
                      animate={{ x: [0, 80] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-1 w-2.5 h-2.5 bg-slate-500 rounded-full"
                    />
                  </div>
                </div>

                {/* AI Model */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Bot className="text-slate-500" size={32} />
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-bold">AI 模型</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">單次回答後即停止</span>
                </div>
              </div>

              {/* Bullet points */}
              <div className="mt-10 bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center max-w-md">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  <strong className="text-slate-100">人類成為最大的頻寬瓶頸</strong><br />
                  每一次推進都需要你手動重複：發問、等待、看結果、修正、再發問。
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Outer Loop visual circle */}
              <div className="relative w-72 h-72 flex items-center justify-center">

                {/* Rotating loop border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border border-dashed border-sky-500/20 rounded-full"
                />

                {/* Central AI Node */}
                <div className="absolute flex flex-col items-center z-10">
                  <div className="w-20 h-20 bg-sky-950 border-2 border-sky-400 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.25)] relative">
                    <Bot className="text-sky-300" size={38} />
                  </div>
                  <span className="text-xs text-sky-400 mt-3 font-bold flex items-center gap-1.5">
                    <RefreshCw size={12} /> 自主控制循環
                  </span>
                </div>

                {/* Floating "reasoning thoughts" packets around the circle */}
                {[0, 1, 2].map((i) => {
                  // Explicit angles to avoid the bottom area (where the "Test-Time Compute" pill sits):
                  // i = 0: 0° (Right), i = 1: 180° (Left), i = 2: 270° (Top)
                  const angles = [0, 180, 270];
                  const angle = angles[i] * (Math.PI / 180);
                  const radius = 100;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={i}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className="absolute w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center"
                    >
                      {i === 0 ? <Cpu className="text-slate-400" size={20} /> :
                       i === 1 ? <Clock className="text-slate-400" size={20} /> :
                                 <RefreshCw className="text-slate-400" size={20} />}
                    </div>
                  );
                })}

                {/* Connecting lines for the floating packets */}
                <svg className="absolute w-full h-full overflow-visible pointer-events-none">
                  {[0, 1, 2].map((i) => {
                    const angles = [0, 180, 270];
                    const angle = angles[i] * (Math.PI / 180);
                    const radius = 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <line
                        key={i}
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke="rgba(56,189,248,0.15)"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Test-Time Compute label */}
              <div className="absolute bottom-2 flex flex-col items-center">
                <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-2xl flex items-center gap-3">
                  <Clock size={14} className="text-sky-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-[11px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                      Test-Time Compute
                    </div>
                    <div className="text-xs text-slate-300 font-bold">多花時間反覆試、反覆檢查，換更高的正確率</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Narrative caption */}
      <div className="text-center text-xs text-slate-400 border-t border-slate-900 pt-4 z-10 flex justify-between items-center px-2">
        <span>有了系統化的 Loop，AI 才有自己試錯與反覆檢查的空間</span>
        <span className="text-sky-400 font-mono text-[11px] font-bold">PROMPT → CODE → TEST → FIX</span>
      </div>
    </div>
  );
};

export default function SlideLoopEngineering() {
  return (
    <SlideLayout title="做完一次不算完，要能自己跑下一輪" subtitle="Loop Engineering" icon={RefreshCw}>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 mt-6 items-stretch">

        <div className="space-y-4 flex flex-col justify-between h-full">
          <AnimatedBlock stepIndex={1} className="w-full">
             <LoopEngineeringAnimation />
          </AnimatedBlock>
          <AnimatedBlock stepIndex={2} className="text-right text-xs text-slate-500">
            <p className="flex items-center justify-end gap-1">
              參考來源：<a href="https://cobusgreyling.substack.com/p/loop-engineering" target="_blank" rel="noreferrer" className="text-sky-500 hover:text-sky-400 flex items-center gap-1">Cobus Greyling - Loop Engineering <ExternalLink size={12} /></a>
            </p>
          </AnimatedBlock>
        </div>

        <div className="flex flex-col h-full">
          <AnimatedBlock stepIndex={2} className="text-left bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4">
                設計「自動調度」的控制系統
              </h3>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Loop Engineering 的核心主張是：<strong className="text-sky-400 font-bold mx-1">把「反覆下提示」這件事交給系統，而不是自己一直手動做。</strong><br/><br/>
                各大模型與框架（例如 Claude Code）陸續加入「讓它跑久一點」的能力，給 AI 足夠的時間與運算去試錯、去驗證。
              </p>

              <div className="bg-[#0f111a] p-5 rounded-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>
                <h4 className="text-sky-400 font-bold mb-3 border-b border-slate-800 pb-2">範式轉移</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                   別再自己當那個一直下提示詞的人，而是去設計一套會自動下提示詞的系統。
                </p>
                <p className="text-slate-500 text-[11px] text-right">— Boris Cherny (Anthropic Claude Code 負責人)</p>
              </div>
            </div>

            <AnimatedBlock stepIndex={3} className="pt-5 mt-5 border-t border-slate-800">
              <h4 className="text-slate-100 font-bold mb-2 text-base">為什麼「多花時間」會有用？</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                以前是問一次、答一次，它答完就停。現在是邊界設好之後，讓它花更多時間反覆試、反覆檢查，
                靠程式碼、環境與測試的回饋自己修正，用多花的運算換更高的正確率（業界叫這件事 Test-time Compute）。
                它會自己試、自己改，所以也會自己花錢。這件事後面會專門講怎麼設限與怎麼喊停。
              </p>
            </AnimatedBlock>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
