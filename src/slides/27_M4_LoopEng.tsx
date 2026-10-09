import { RefreshCw, ExternalLink, User, Bot, ArrowRight, Cpu, Clock } from 'lucide-react';
import { SlideLayout, AnimatedBlock, useSlide } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

/**
 * ⚠ 待查證（C-1／C-3）。這一頁引用了 Boris Cherny 那句話，並標著「Anthropic Claude Code 負責人」。
 * 引言的內容不會變，**但一個人的職稱與所屬公司正是 C-3 最會過期的那一類**，而這一頁從來沒有
 * 標過查證日期。2026-10-09 盤點時發現，本輪沒有查。
 *
 * 下次改版前決定一件事就好：查得到現況就補成 C-1 的三行格式（最後查證／當時的現況／下次重查哪裡）；
 * 查不到或懶得每年追，就把職稱拿掉只留名字，引言照樣成立。
 * **不要憑印象改職稱。**
 *
 * 收尾那句「怎麼設上限、怎麼喊停，下一段整段在講」指的是下一個單元
 * （27b3 的五個步驟、27b4c 的介入、28_M4_Safety 的五道邊界），
 * 2026-10-04 重切單元之後那一整支就在講這件事。搬頁之前先確認這句話還指得到（B-4）。
 *
 * 上一頁（27a_M4_EngEvolution）已經把 Prompt 到 Loop 這條線走過一遍，
 * 所以這一頁不要再從「你前面每做一步都要回來打一句話」開場，那是上一頁的收尾。
 * 這一頁只負責一件事：Loop 換掉的到底是哪一個動作。
 */

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
                  <span className="text-xs text-slate-500 mt-0.5">思考、打字、等待</span>
                </div>

                {/* Arrow with typing packet */}
                <div className="relative flex flex-col items-center">
                  <span className="text-xs font-mono text-slate-500 mb-1">手動輸入 Prompt</span>
                  <div className="flex items-center relative">
                    <ArrowRight className="text-slate-700" size={32} />
                    <div className="absolute left-1 w-2.5 h-2.5 bg-slate-500 rounded-full" />
                  </div>
                </div>

                {/* AI Model */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Bot className="text-slate-500" size={32} />
                  </div>
                  <span className="text-xs text-slate-400 mt-2 font-bold">AI 模型</span>
                  <span className="text-xs text-slate-500 mt-0.5">單次回答後即停止</span>
                </div>
              </div>

              {/* Bullet points */}
              <div className="mt-10 bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center max-w-md">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  每一次推進都要你手動重複一遍：發問、等待、看結果、修正、再發問。
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
                    <RefreshCw size={12} /> 改一輪、驗一輪，自己重來
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
                    <div className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider">
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
      <div className="text-center text-xs text-slate-400 border-t border-slate-900 pt-4 z-10 flex justify-end items-center px-2">
        <span className="text-sky-400 font-mono text-xs font-bold">PROMPT → CODE → TEST → FIX</span>
      </div>
    </div>
  );
};

export default function SlideLoopEngineering() {
  return (
    <SlideLayout title="什麼是 Loop Engineering？" subtitle="Loop Engineering" icon={RefreshCw}>
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
                你寫的是完成條件與邊界，每一輪由它自己發動
              </h3>
              <p className="text-slate-300 text-base leading-relaxed font-medium mb-6">
                Loop Engineering 換掉的是「誰按下一步」。原本每一輪都要你看完結果、打一句話，它才再動一次；
                現在你把完成條件與邊界寫在同一段指令裡，之後的每一輪由它自己發動，
                直到條件達成，或是撞到你設的上限。<br/><br/>
                這件事能成立，不是因為你把話講得更漂亮，是因為它中間會自己讀回饋：
                程式有沒有跑起來、測試過不過、瀏覽器上點下去對不對。有回饋，它才知道下一輪要改什麼。
              </p>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                   別再自己當那個一直下提示詞的人，而是去設計一套會自動下提示詞的系統。
                </p>
                <p className="text-slate-500 text-xs text-right">Boris Cherny (Anthropic Claude Code 負責人)</p>
              </div>
            </div>

            <AnimatedBlock stepIndex={3} className="pt-5 mt-5 border-t border-slate-800">
              <h4 className="text-slate-100 font-bold mb-2 text-base">為什麼「多花時間」會有用？</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                以前是問一次、答一次，它答完就停。現在是邊界設好之後，讓它花更多時間反覆試、反覆檢查，
                用多花的運算換更高的正確率，業界叫這件事 Test-time Compute。
                代價是它會自己試、自己改，所以也會自己花錢。怎麼設上限、怎麼喊停，下一段整段在講。
              </p>
            </AnimatedBlock>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
