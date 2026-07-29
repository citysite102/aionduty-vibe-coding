import { Network, Bot, Users, Activity, FileCode2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock, useSlide } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

const OrchestratorAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center min-h-[350px]">
    {/* Central Orchestrator */}
    <motion.div 
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
      className="absolute z-20 flex flex-col items-center justify-center w-24 h-24 bg-sky-950 border-2 border-sky-400 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.3)]"
    >
      <Bot className="text-sky-400" size={36} />
      <span className="text-[11px] text-sky-400 font-bold mt-1">PM</span>
    </motion.div>

    {/* Connecting Lines and animated tasks */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="absolute w-0 h-0 overflow-visible">
        {[0, 1, 2].map((i) => {
          const angle = (i * 120 + 30) * (Math.PI / 180);
          const x = Math.cos(angle) * 120;
          const y = Math.sin(angle) * 120;
          return (
            <g key={i}>
              {/* Connecting Line */}
              <line
                x1="0" y1="0" x2={x} y2={y}
                stroke="rgba(56,189,248,0.3)" strokeWidth="2" strokeDasharray="4 4"
              />
              {/* Outgoing Task */}
              <motion.circle
                r="4" fill="#38bdf8"
                initial={{ cx: 0, cy: 0, opacity: 0 }}
                animate={{ cx: [0, x], cy: [0, y], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
              />
              {/* Incoming Result */}
              <motion.circle
                r="4" fill="#818cf8"
                initial={{ cx: x, cy: y, opacity: 0 }}
                animate={{ cx: [x, 0], cy: [y, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 + 0.9 }}
              />
            </g>
          );
        })}
      </svg>
    </div>

    {/* Sub Agents */}
    {[0, 1, 2].map((i) => {
      const angle = (i * 120 + 30) * (Math.PI / 180);
      const x = Math.cos(angle) * 120;
      const y = Math.sin(angle) * 120;
      return (
        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0, x: 0, y: 0 }} animate={{ scale: 1, x, y }} transition={{ type: 'spring', delay: 0.2 }}
            className="absolute z-10 flex flex-col items-center justify-center w-16 h-16 bg-indigo-950 border border-indigo-400 rounded-full shadow-[0_0_20px_rgba(129,140,248,0.2)]"
          >
            <FileCode2 className="text-indigo-400" size={24} />
          </motion.div>
        </div>
      );
    })}
  </div>
);

const SwarmAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center min-h-[350px]">
    {/* All connecting lines in a single centered SVG coordinate space */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg className="absolute w-0 h-0 overflow-visible">
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * 90 + 45) * (Math.PI / 180);
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;
          return (
            <g key={i}>
              {/* Connect to other nodes */}
              {[0, 1, 2, 3].map((j) => {
                if (i >= j) return null;
                const angleJ = (j * 90 + 45) * (Math.PI / 180);
                const xJ = Math.cos(angleJ) * 100;
                const yJ = Math.sin(angleJ) * 100;
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={x}
                    y1={y}
                    x2={xJ}
                    y2={yJ}
                    stroke="rgba(52,211,153,0.35)"
                    strokeWidth="1.5"
                  />
                );
              })}
              {/* Sync ping circles centered at the node's (x, y) */}
              <motion.circle
                r="40"
                cx={x}
                cy={y}
                stroke="rgba(52,211,153,0.4)"
                strokeWidth="1"
                fill="none"
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: [0, 2.5], opacity: [1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              />
            </g>
          );
        })}
      </svg>
    </div>

    {/* Shared Context Badge in center */}
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="absolute z-20 w-32 h-32 bg-emerald-950/80 rounded-full backdrop-blur-md border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.1)]"
    >
      <span className="text-emerald-400 text-xs font-bold tracking-wider">Shared Context</span>
    </motion.div>

    {/* Sub Agents */}
    {[0, 1, 2, 3].map((i) => {
      const angle = (i * 90 + 45) * (Math.PI / 180);
      const x = Math.cos(angle) * 100;
      const y = Math.sin(angle) * 100;
      return (
        <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            initial={{ scale: 0, x: 0, y: 0 }} animate={{ scale: 1, x, y }} transition={{ type: 'spring' }}
            className="absolute z-10 flex items-center justify-center w-14 h-14 bg-emerald-950 border border-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.2)]"
          >
            <Users className="text-emerald-400" size={20} />
          </motion.div>
        </div>
      );
    })}
  </div>
);

const WorkflowAnim = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
    <div className="flex gap-4">
       {[0, 1, 2].map(i => (
         <motion.div 
           key={i}
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: i * 0.2 }}
           className="relative flex items-center"
         >
           <div className="w-16 h-16 bg-amber-950 border-2 border-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)] z-10">
             <Activity className="text-amber-400" size={24} />
           </div>
           {i < 2 && (
             <div className="w-8 h-1 bg-amber-900/50 -mr-4 ml-[-8px] relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-amber-400"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
             </div>
           )}
         </motion.div>
       ))}
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
      className="bg-amber-500/10 text-amber-300/80 px-4 py-2 rounded-full text-xs font-mono border border-amber-500/30"
    >
      state.next() → pipeline
    </motion.div>
  </div>
);

export default function Slide11() {
  const { currentStep } = useSlide();
  
  // Decide which animation to show based on step
  let ActiveAnim = OrchestratorAnim;
  let borderColor = "border-sky-900/50";
  let bgGlow = "shadow-[0_0_50px_-12px_rgba(14,165,233,0.15)]";
  
  if (currentStep >= 5) {
    ActiveAnim = WorkflowAnim;
    borderColor = "border-amber-900/50";
    bgGlow = "shadow-[0_0_50px_-12px_rgba(245,158,11,0.15)]";
  } else if (currentStep >= 4) {
    ActiveAnim = SwarmAnim;
    borderColor = "border-emerald-900/50";
    bgGlow = "shadow-[0_0_50px_-12px_rgba(52,211,153,0.15)]";
  } else if (currentStep >= 3) {
    ActiveAnim = OrchestratorAnim; // Both Orchestrator and SubAgent share this viz
    borderColor = "border-indigo-900/50";
    bgGlow = "shadow-[0_0_50px_-12px_rgba(129,140,248,0.15)]";
  }

  return (
    <SlideLayout title="協作角色拆解" subtitle="Roles in Action" icon={Network}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-6 items-stretch">
        
        <AnimatedBlock stepIndex={1} className={`w-full min-h-[400px] bg-slate-950 border ${borderColor} rounded-3xl ${bgGlow} transition-colors duration-1000 flex items-center justify-center relative overflow-hidden`}>
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]"></div>
           <AnimatePresence mode="wait">
             <motion.div
               key={currentStep >= 5 ? 'workflow' : currentStep >= 4 ? 'swarm' : 'orchestrator'}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               transition={{ duration: 0.5 }}
               className="w-full h-full"
             >
               <ActiveAnim />
             </motion.div>
           </AnimatePresence>
        </AnimatedBlock>

        <div className="flex flex-col justify-center space-y-4">
          <AnimatedBlock stepIndex={2} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep === 2 || currentStep === 1 ? 'border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.15)] bg-sky-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-sky-400 mb-1 flex justify-between items-center">
              <span>指揮者 (Orchestrator)</span>
              <span className="text-[11px] font-mono text-slate-500">適合：探索與動態決策</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              就像專案經理。負責將任務切分為細項、委派出去並做最終審核。🎯 <strong>選型準則</strong>：適合<strong>任務具有高度不確定性、需要隨時根據中間產出微調計畫與多級審查</strong>的場景。
            </p>
          </AnimatedBlock>
          
          <AnimatedBlock stepIndex={3} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep === 3 ? 'border-indigo-500/50 shadow-[0_0_20px_rgba(129,140,248,0.15)] bg-indigo-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-indigo-400 mb-1 flex justify-between items-center">
              <span>執行者 (Subagent)</span>
              <span className="text-[11px] font-mono text-slate-500">適合：特定功能單點爆破</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              專精特定工具的小幫手。<strong>它有自己獨立的上下文，做完只把結果摘要回傳</strong>，主 Agent 看不到它的完整過程，這也是它不會佔用主對話空間的原因。🎯 <strong>選型準則</strong>：適合<strong>重複性、獨立性高、不需理解整體架構的特定任務</strong>（如跑 Linter 語法檢查、特定 API 的單元測試或多語系翻譯）。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep === 4 ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.15)] bg-emerald-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-emerald-400 mb-1 flex justify-between items-center">
              <span>自治團隊 (Agent Swarm)</span>
              <span className="text-[11px] font-mono text-slate-500">適合：多元專業動態協同</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              成員主動認領任務，共同看著一張白板。注意 <strong>Agent 之間並不會直接對話</strong>，而是透過<strong>共享的 JSON 狀態檔或共用目錄</strong>交換進度，白板就是那些檔案。🎯 <strong>選型準則</strong>：適合<strong>需要多種專業接力探討的複雜任務</strong>。但共享狀態要自己設計與維護，協調成本極高（這筆管理摩擦叫「調度稅」，真正的上限往往是你自己能同時審核幾件事），必須在角色職責定義極清晰時才划算。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep >= 5 ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-amber-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-amber-400 mb-1 flex justify-between items-center">
              <span>流程腳本 (Workflow)</span>
              <span className="text-[11px] font-mono text-slate-500">適合：高頻且可預測的 SOP</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              將分工寫成白紙黑字的 SOP（程式腳本）。🎯 <strong>選型準則</strong>：適合<strong>任務難度高、但步驟高度可預測且有一致流程</strong>的任務。雖然缺乏動態調整的彈性，但執行效率與穩定度最高，適合大規模量產。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
