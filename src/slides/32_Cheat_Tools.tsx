import React, { useState } from 'react';
import { 
  BookCopy, FileText, Layers, Bot, Play, Check, 
  ArrowRight, ChevronRight, Terminal, Cpu, Sliders, ShieldAlert
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

interface ConceptDetail {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  whyItMatters: string;
  claudeName: string;
  claudeDesc: string;
  claudeCode: string;
  claudeBadge: string;
  openSourceName: string;
  openSourceDesc: string;
  openSourceCode: string;
  openSourceBadge: string;
}

const CONCEPTS: ConceptDetail[] = [
  {
    id: 'handbook',
    title: '專案規則手冊',
    icon: FileText,
    description: '奠定系統對該專案的整體規矩、程式碼風格、命名規範與架構習慣，讓 AI 寫出的程式像你親自寫的一樣。',
    whyItMatters: '避免 AI 在程式中任意發揮、寫出脫離專案慣例的程式碼，能省下大量事後人工修正的時間。',
    claudeName: 'CLAUDE.md',
    claudeDesc: '放置於專案根目錄，Claude Code 每次啟動會自動載入。注意這是「強烈建議」而非硬性規則，它會盡量遵循，但不保證。',
    claudeBadge: 'Claude Code 專屬事實標準',
    claudeCode: `# Code Style
- Use TypeScript with ES Modules.
- Prefer clean, descriptive, functional components.
- Run "npm run lint" to verify syntax before finishing.`,
    openSourceName: 'AGENTS.md',
    openSourceDesc: 'AGENTS.md 是各工具通用的標準寫法；Cursor 另有 .cursor/rules/，Copilot 也有類似設定。核心邏輯幾乎一致。',
    openSourceBadge: '開源與各大工具通用標準',
    openSourceCode: `# Project Guidelines
- React 18+ with Tailwind CSS.
- Keep components modular (split files).
- Always ensure responsive mobile-first patterns.`
  },
  {
    id: 'plan',
    title: '專注思考與規劃',
    icon: Sliders,
    description: '在動手大改之前，讓 AI 保持在「只動腦、不動手」的規劃模式，先把問題分析完、把做法寫出來給你看。',
    whyItMatters: '避免它還沒看懂就動手，改一行壞十行。先看到它打算怎麼做，你才有機會在動工前喊停。',
    claudeName: 'Plan Mode (Shift + Tab 切換)',
    claudeDesc: '連按 Shift + Tab 循環到 plan mode。切換之後它只讀不寫，負責架構思考、問題診斷並提出草稿。',
    claudeBadge: '內建 CLI 快速切換',
    claudeCode: `> /plan
[Plan Mode Activated]
I will analyze the repository and draft a roadmap 
WITHOUT modifying any files or running build tools.`,
    openSourceName: '唯讀對話 (Chat-Only Mode)',
    openSourceDesc: '在 Cursor Chat 視窗只對答，不輕易按 "Apply" 寫入，保持對程式碼的唯讀探索。',
    openSourceBadge: '手動或參數鎖定',
    openSourceCode: `[Cursor Chat]
[ReadOnly Mode]
Files are loaded as context, but write access is blocked.
Ask me for architectural analysis or plan generation.`
  },
  {
    id: 'delegation',
    title: '分工與任務派發',
    icon: Bot,
    description: '將龐大且複雜的專案任務切片，派發給多個各自獨立的子代理（Subagents）處理，主對話只做最後審查。',
    whyItMatters: '單一對話越長，先前的重點越容易被稀釋掉。分而治之是開發中大型軟體的必備觀念。',
    claudeName: '子代理 (Subagents)',
    claudeDesc: '先建立好子代理定義，之後在對話中直接指名請它處理。它有自己獨立的上下文，做完只回傳結果摘要。',
    claudeBadge: '獨立上下文的子任務',
    claudeCode: `> 建立一個 test-writer 子代理
> 請 test-writer 幫 authentication.ts 寫測試

[test-writer] 已在獨立的上下文中執行
- 讀取 authentication.ts
- 產生 authentication.test.ts
- 回傳摘要給主對話（過程不佔用主對話空間）`,
    openSourceName: '代理團隊 (Agent Teams)',
    openSourceDesc: 'CrewAI、Autogen 這類框架，分配專屬 Role (例如 QA, Backend, PM) 進行接力。',
    openSourceBadge: '自建或框架多重協同',
    openSourceCode: `team = AgentTeam(
  agents=[auth_coder, test_engineer],
  manager=project_manager,
  workflow="hierarchical"
)
team.dispatch("Implement auth tests")`
  },
  {
    id: 'loop',
    title: '無人值守與自動導航',
    icon: Play,
    description: 'AI 擁有自組「執行命令、讀取錯誤、自我除錯」的自動化循環（Feedback Loop），不需要人類每一秒按確認。',
    whyItMatters: '省下人力。你去泡杯咖啡的時間，AI 已經跑了五次編譯，修掉幾個拼字錯誤與語法報錯。',
    claudeName: '自組除錯迴圈',
    claudeDesc: 'Claude Code 預設就會這樣做，不用額外設定：編譯失敗時它讀 stack trace、改檔、重跑。要交代一整段長任務時，把驗收條件一起寫進去，它才知道什麼時候算跑完。',
    claudeBadge: '內建，不用外掛',
    claudeCode: `> 請修好所有失敗的測試
> 完成條件：npm test 通過，最多跑 5 輪

$ npm test
[2 failed]
- 讀取錯誤 → 改檔 → 重跑
- Re-running: npm test [Success ✓]`,
    openSourceName: '目標驅動迴圈 (Goal-oriented Loop)',
    openSourceDesc: '如 Devin、Replit Agent 或 Cursor 的 Composer。給一個最終目標，自動跑指令與測試直到通過。做的事情跟上面類似，只是各家介面不同。',
    openSourceBadge: '給目標就自己跑完',
    openSourceCode: `> 目標：修好所有失敗的測試

[Running Autonomous Loop]
- Step 1: run pytest (2 failed)
- Step 2: analyzing test_api.py...
- Step 3: applying fixes... (Iterating...)`
  }
];

export default function Slide32() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const activeConcept = CONCEPTS[activeTab];

  return (
    <SlideLayout title="跨工具思維對照表" subtitle="Universal Translation Map for AI Coding Agents" icon={BookCopy}>
      
      {/* Context Bridge Banner */}
      <AnimatedBlock stepIndex={1} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl px-6 py-3.5 mb-5 max-w-6xl mx-auto text-left flex flex-col md:flex-row md:items-center gap-4">
        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-mono shrink-0 self-start md:self-center font-bold">
          換工具也通用
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          前面談的都是 Claude Code，但這些觀念換到 <strong>Cursor</strong>、<strong>Codex</strong> 或其他工具一樣成立。點左側清單，看同一件事在各工具裡叫什麼名字：
        </p>
      </AnimatedBlock>

      <AnimatedBlock stepIndex={2} className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 items-stretch text-left">
        
        {/* Left Side: Dynamic Selector Tabs */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {CONCEPTS.map((concept, index) => {
            const IconComponent = concept.icon;
            const isActive = activeTab === index;
            
            return (
              <button
                key={concept.id}
                id={`translation-tab-${concept.id}`}
                onClick={() => setActiveTab(index)}
                className={`relative p-4 rounded-xl text-left border transition-all flex gap-3.5 items-start cursor-pointer group ${
                  isActive 
                    ? 'bg-slate-900 border-sky-500/40 shadow-lg' 
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/30'
                }`}
              >
                {/* Framer Motion Active Indicator Accent Pill */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabPill"
                    className="absolute left-0 top-3 bottom-3 w-1 bg-sky-400 rounded-r-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                  isActive ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-900 text-slate-500 group-hover:text-slate-400'
                }`}>
                  <IconComponent size={18} />
                </div>
                
                <div>
                  <h4 className={`text-sm font-bold transition-colors ${
                    isActive ? 'text-sky-400' : 'text-slate-300 group-hover:text-slate-100'
                  }`}>
                    {concept.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] mt-1 leading-relaxed line-clamp-2">
                    {concept.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Animated Comparison Canvas */}
        <div className="lg:col-span-8 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeConcept.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col justify-between h-full min-h-[460px]"
            >
              {/* Active Concept Explanation Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-slate-500 text-[11px] font-mono tracking-wider uppercase">CORE AGENT METAPHOR</span>
                    <h3 className="text-lg font-black text-slate-100 flex items-center gap-2 mt-0.5">
                      <Cpu size={16} className="text-sky-400" />
                      {activeConcept.title}
                    </h3>
                  </div>
                  <span className="px-3 py-0.5 bg-slate-800 text-slate-400 text-[11px] rounded-full font-mono">
                    {activeConcept.id.toUpperCase()}_PATTERN
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {activeConcept.description}
                </p>

                <div className="bg-sky-950/10 border border-sky-900/30 rounded-xl p-3.5 flex items-start gap-2.5">
                  <span className="text-xs font-bold text-sky-400 font-mono shrink-0 bg-sky-950 px-1.5 py-0.5 rounded border border-sky-800/40 mt-0.5">WHY</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {activeConcept.whyItMatters}
                  </p>
                </div>

                {/* Comparative Double-Pane Terminal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  
                  {/* Left Pane: Claude Ecosystem */}
                  <div className="flex flex-col bg-slate-950/60 rounded-xl border border-orange-500/20 overflow-hidden">
                    <div className="bg-[#1c1410] px-3 py-2 flex justify-between items-center border-b border-orange-950/30 shrink-0">
                      <span className="text-[12px] font-bold text-orange-400 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                        Claude 生態系
                      </span>
                      <span className="text-[11px] text-orange-400/50 font-mono scale-90">{activeConcept.claudeName}</span>
                    </div>
                    <div className="p-3.5 flex flex-col justify-between flex-1 min-h-[160px]">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">如何實現：</span>
                        <p className="text-slate-400 text-xs leading-relaxed mb-3">
                          {activeConcept.claudeDesc}
                        </p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-900 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                        {activeConcept.claudeCode}
                      </div>
                    </div>
                    <div className="bg-[#120d0b] px-3 py-1.5 text-[11px] text-orange-400/80 border-t border-orange-950/20 font-mono">
                      🏷️ {activeConcept.claudeBadge}
                    </div>
                  </div>

                  {/* Right Pane: Open Source Ecosystem */}
                  <div className="flex flex-col bg-slate-950/60 rounded-xl border border-emerald-500/20 overflow-hidden">
                    <div className="bg-[#101c15] px-3 py-2 flex justify-between items-center border-b border-emerald-950/30 shrink-0">
                      <span className="text-[12px] font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        開源通用陣營
                      </span>
                      <span className="text-[11px] text-emerald-400/50 font-mono scale-90">{activeConcept.openSourceName}</span>
                    </div>
                    <div className="p-3.5 flex flex-col justify-between flex-1 min-h-[160px]">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">如何實現：</span>
                        <p className="text-slate-400 text-xs leading-relaxed mb-3">
                          {activeConcept.openSourceDesc}
                        </p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded border border-slate-900 font-mono text-[11px] text-slate-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                        {activeConcept.openSourceCode}
                      </div>
                    </div>
                    <div className="bg-[#0b120e] px-3 py-1.5 text-[11px] text-emerald-400/80 border-t border-emerald-950/20 font-mono">
                      🏷️ {activeConcept.openSourceBadge}
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </AnimatedBlock>
    </SlideLayout>
  );
}
