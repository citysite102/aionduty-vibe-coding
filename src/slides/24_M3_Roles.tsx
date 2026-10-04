import { Network, Bot, Users, Activity, FileCode2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock, useSlide } from '../components/SlideLayout';
import { Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * **A-3 的無限動畫在這一頁是刻意保留的，2026-10-04 講師決定，不要再改。**
 * 這一頁有三組 `repeat: Infinity`（指揮者圖的任務往外、結果飛回來，以及自治團隊那組擴散圈），
 * 嚴格說超過 A-3「全頁最多一組」的例外額度。逐字稿 7-1 的錄製註記與待處理區都記過這一條。
 * 不改的理由是那三組就是左半那張圖本身，拆掉等於換掉整頁的視覺。
 * 錄的時候念完就走，不要停在這一頁等它跑完一輪。
 *
 * 第三、四種模式最後查證：2026-10-03，對照 code.claude.com/docs/en/agent-teams 與
 * code.claude.com/docs/en/workflows。
 *
 * 自治團隊那一格 2026-10-03 改寫過，原本寫的是「它們不會互相對話，共同讀寫同一批檔案，
 * 那批檔案就是共用的白板，白板要你自己設計和維護」。那是舊的做法，現在官方文件寫的是
 * 「Teammates message each other directly」，協調走的是自動產生的共用任務清單與信箱
 * （`~/.claude/teams/`），不用自己設計。
 *
 * 新寫法要守住的三件事：
 *   1. 它是實驗功能，**預設關閉**（「Agent teams are experimental and disabled by default.
 *      Enable them by setting CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1」）。學員照著試會打不開，
 *      這一句不能省。
 *   2. 每一個隊友都是一份完整的 Claude Code，「use significantly more tokens than a single
 *      session」，官方建議從 3 到 5 個開始。
 *   3. 「你驗得動多少就只能放手多少」這個教學論點不變，文件的 Monitor and steer 也是這個意思。
 *
 * 第四種「流程腳本」現在有內建做法（dynamic workflows），展開在 24b_M3_Workflows
 * （它是什麼）與 24c_M3_WorkflowUse（什麼時候用、怎麼叫）。三頁一起搬（B-4）。
 *
 * 2026-10-04（講師）：第四格原本寫「不能臨機應變，但每次都會走完同樣的步驟」，
 * 只講到「固定」，沒講到它為什麼值得用。學員翻到下一頁看到的例子是「一次派出幾十個」，
 * 兩頁對不起來。現在這一格的軸線改成**誰決定下一步**（前三種 Claude 現場決定、
 * 這一種寫在腳本裡），並明講那件事換到的東西是規模與形狀固定。
 * 左半的流程腳本動畫同一輪改成「三個階段，每個階段同時派好幾個」，
 * 原本三個方塊串一排會讓人以為它只是把事情排成順序。**改這一格要連動畫一起看。**
 */

const OrchestratorAnim = () => (
  <div className="relative w-full h-full flex items-center justify-center min-h-[350px]">
    {/* Central Orchestrator */}
    <motion.div
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
      className="absolute z-20 flex flex-col items-center justify-center w-24 h-24 bg-sky-950 border-2 border-sky-400 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.3)]"
    >
      <Bot className="text-sky-400" size={36} />
      <span className="text-xs text-sky-400 font-bold mt-1">指揮者</span>
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
                transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.8 }}
              />
              {/* Incoming Result */}
              <motion.circle
                r="4" fill="#818cf8"
                initial={{ cx: x, cy: y, opacity: 0 }}
                animate={{ cx: [x, 0], cy: [y, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.8 + 1.8 }}
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
                transition={{ duration: 5, repeat: Infinity, delay: i * 1.25 }}
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
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-7">
    <div className="flex items-start gap-3">
      {[0, 1, 2].map((i) => (
        <Fragment key={i}>
          {i > 0 && <div className="w-6 h-0.5 bg-amber-900 mt-8" />}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.25 }}
            className="flex flex-col items-center gap-2.5"
          >
            <div className="w-16 h-16 bg-amber-950 border-2 border-amber-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Activity className="text-amber-400" size={24} />
            </div>
            {/* 一個階段同時派出去的那幾個子代理 */}
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((j) => (
                <motion.span
                  key={j}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.25 + j * 0.07 }}
                  className="w-2.5 h-2.5 rounded-full bg-amber-400/70"
                />
              ))}
            </div>
          </motion.div>
        </Fragment>
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
      className="bg-amber-500/10 text-amber-300/80 px-4 py-2 rounded-full text-xs border border-amber-500/30"
    >
      腳本決定分幾個階段、每個階段同時派幾個
    </motion.div>
  </div>
);

export default function SlideRoles() {
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
    <SlideLayout title="四種分工方式，各適合什麼時候用" subtitle="Roles in Action" icon={Network}>
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
              <span>指揮者（Orchestrator）</span>
              <span className="text-xs font-mono text-slate-500">適合：邊做邊決定</span>
            </h4>
            {/*
              2026-10-04（講師）：學員在這裡會問「我不就是指揮者？」。
              上一頁（Slide 124）定義過指揮者就是主 session，但這一頁隔了一張動畫圖，
              而且四張卡只有這一張寫的是角色不是做法，讀起來像又多了一個人。
              第一句改成直接否定那個誤會。**這一句不要刪。**
            */}
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong>指揮者不是你，是你正在對話的那個 Claude。</strong>
              你交代一件事，它把大任務切成小塊、決定誰做、最後驗收。
              <strong>你還不確定該怎麼做的時候用它</strong>，它會看著中間產出隨時調整計畫。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep === 3 ? 'border-indigo-500/50 shadow-[0_0_20px_rgba(129,140,248,0.15)] bg-indigo-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-indigo-400 mb-1 flex justify-between items-center">
              <span>一次只派一個執行者</span>
              <span className="text-xs font-mono text-slate-500">適合：範圍明確的一件事</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              指揮者一次只派一個子代理出去，做完收回來再派下一個。<strong>它有自己的一份記憶，做完只回報結果</strong>，過程不佔主對話的空間。
              <strong>規則清楚、不需要懂整體的活交給它</strong>，例如翻譯、跑語法檢查、改一批檔名。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep === 4 ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(52,211,153,0.15)] bg-emerald-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-emerald-400 mb-1 flex justify-between items-center">
              <span>自治團隊 (Agent Teams)</span>
              <span className="text-xs font-mono text-slate-500">實驗功能，預設是關的</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              好幾個完整的 Claude Code 同時跑，共用一張任務清單各自認領，<strong>而且彼此可以直接傳訊息、互相挑戰</strong>。
              要先設一個環境變數才打得開。<strong>這一種個人專案幾乎用不到</strong>：每一個隊友都是一份完整的 Claude，token 吃得兇，
              而且你同時審核得了幾件事，就是它的上限。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className={`bg-slate-900 p-5 rounded-2xl border transition-colors duration-500 ${currentStep >= 5 ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-amber-950/20' : 'border-slate-800 opacity-60'}`}>
            <h4 className="text-lg font-bold text-amber-400 mb-1 flex justify-between items-center">
              <span>流程腳本 (Workflow)</span>
              <span className="text-xs font-mono text-slate-500">適合：同一套事要做很多遍</span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              前三種的下一步都是 Claude 現場決定；這一種先寫成一支腳本：分成哪幾個階段、
              每個階段同時派幾個、誰的產出要交給誰覆核，全部寫在裡面。
              <strong>所以它一次派得動幾十個，而且每跑一次都是同一個形狀</strong>，代價是中途不改計畫。
              腳本是 Claude 幫你寫的，不用你自己寫。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
