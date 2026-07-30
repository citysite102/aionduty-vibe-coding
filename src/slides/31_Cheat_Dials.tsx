import React, { useState } from 'react';
import { 
  SlidersHorizontal, Sliders, Shield, ShieldAlert, Zap, 
  HelpCircle, RotateCcw, AlertCircle, CheckCircle2, Navigation,
  Eye, FileCode, Terminal, ChevronRight, Gauge
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

interface ScenarioState {
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
  speed: number;
  risk: number;
  advice: string;
}

const STATE_MATRIX: ScenarioState[][] = [
  // Supervision Level 0: Strict (每步都問)
  [
    {
      title: '「安全觀察員」模式',
      badge: '只能讀 • 每步都問你',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: '適合探索不信任的第三方開源庫。AI 只有讀取權，且每次檢索或下指令時，你都必須手動確認。這是最牢固的保險箱。',
      speed: 15,
      risk: 0,
      advice: '適合第一次下載陌生 Repo、進行安全性查殺、或是不確定程式碼是否有毒時的防禦姿態。'
    },
    {
      title: '「貼身實習生」模式',
      badge: '能改專案 • 每步都問你',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      description: 'AI 可以在目前專案內寫程式，但每一次修改、編譯、或是執行測試，都必須按下 Enter 同意。進度慢一點，但每一步你都看得到，也都可以喊停。',
      speed: 40,
      risk: 10,
      advice: '程式新手最推薦的日常起手式。在你的監督下，能避免 AI 寫出你看不懂的怪奇語法。'
    },
    {
      title: '「要先報備的系統管理員」模式',
      badge: '能動系統 • 每步都問你',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      description: 'AI 擁有安裝全域套件、修改環境、管理 Docker 等容器級操作權限，但每做一個小動作，都得停下來等你批准。',
      speed: 35,
      risk: 25,
      advice: '適合需要安裝複雜全域依賴，但你又擔心破壞主機設定時。雖然麻煩，但至少安全。'
    }
  ],
  // Supervision Level 1: Moderate (關鍵才問)
  [
    {
      title: '「只讀不寫的顧問」模式',
      badge: '只能讀 • 關鍵才問你',
      badgeColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      description: 'AI 能大範圍掃描專案並進行全面的關聯分析，不需要一再打擾你。唯有在需要進行特定沙箱操作或外部調研時才跳出提醒。',
      speed: 60,
      risk: 0,
      advice: '對應 plan 模式。適合動手重構前的方案分析階段，只讓 AI 讀懂程式碼並寫出規畫書，不改動任何檔案。'
    },
    {
      title: '「日常開發助理」模式',
      badge: '能改專案 • 關鍵才問你',
      badgeColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
      description: 'AI 享有專案資料夾內的完全讀寫權。普通的寫檔、微調不打擾你，只有當它要安裝新套件或執行外部 Bash 命令時，才會跳出二次確認。',
      speed: 75,
      risk: 15,
      advice: '對應 acceptEdits 模式。摸熟專案後最常用的日常設定，注意這不是預設值，預設是 default（寫入前都會問）。'
    },
    {
      title: '「連環境一起改的助理」模式',
      badge: '能動系統 • 關鍵才問你',
      badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      description: '允許 AI 跨系統、跨容器地安裝套件、編譯底層環境。AI 會在背景處理大宗搬移，只在遇到網路衝突或關鍵破壞性操作時向你核備。',
      speed: 85,
      risk: 45,
      advice: '當需要讓 AI 幫你一次性把 Node 環境、資料庫連線、甚至部署流程全部串接時使用。'
    }
  ],
  // Supervision Level 2: Autonomous (完全不問)
  [
    {
      title: '「自動讀完整個專案」模式',
      badge: '只能讀 • 全程不問你',
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
      description: 'AI 在背景同時分析所有程式碼，自己推敲架構、畫出關聯圖，過程中不需要人守在旁邊確認。',
      speed: 70,
      risk: 5,
      advice: '適合你要接手一個很大、又沒人整理過的舊專案時。丟給 AI 在背景自己讀一遍，你先去忙別的。'
    },
    {
      title: '「自己改到測試過」模式',
      badge: '能改專案 • 全程不問你',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      description: 'AI 在目前專案資料夾內自由行動。它可以「改寫檔案 ➜ 執行測試 ➜ 發現錯誤 ➜ 自我除錯 ➜ 重跑測試」無限循環直到通過。',
      speed: 90,
      risk: 20,
      advice: '經典的無人值守測試除錯迴圈。前提是先用 git commit 存好檔，邊界鎖在專案資料夾內，不代表它不會改壞你在意的檔案。'
    },
    {
      title: '「全自動 Loop」模式',
      badge: '能動系統 • 全程不問你',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      description: 'AI 擁有全開的權限，並且在執行過程中完全不彈出任何確認提示。它能自主下載依賴、設定系統、啟動服務，並自動分析錯誤日誌。',
      speed: 100,
      risk: 85,
      advice: '🔥 警告：這就是所謂的 Autonomous Loop。高速度的背後是極高風險，你必須搭配 Docker 容器隔離才能安心使用！'
    }
  ]
];

export default function Slide16() {
  const [supervision, setSupervision] = useState<number>(1); // 0: Strict, 1: Moderate, 2: Autonomous
  const [sandbox, setSandbox] = useState<number>(1); // 0: ReadOnly, 1: Restricted, 2: FullContainer

  const currentState = STATE_MATRIX[supervision][sandbox];

  // Helper to handle Quick Preset click
  const applyPreset = (sup: number, sand: number) => {
    setSupervision(sup);
    setSandbox(sand);
  };

  // Dial rotation degree helpers
  const getDialRotation = (val: number) => {
    if (val === 0) return -45;
    if (val === 1) return 0;
    return 45;
  };

  return (
    <SlideLayout title="監督與邊界" subtitle="Theory of Supervision: The Two Dials" icon={SlidersHorizontal}>
      
      {/* Context Bridge Banner */}
      <AnimatedBlock stepIndex={1} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl px-6 py-3.5 mb-4 max-w-6xl mx-auto text-left flex flex-col md:flex-row md:items-center gap-4">
        <div className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-mono shrink-0 self-start md:self-center font-bold">
          接續前面
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          先前我們建構了運作框架的<strong>三大支柱</strong>（工具、上下文、任務拆解）。但隨之而來的現實擔憂是：<strong>「如果放任 Agent 隨意讀寫與下指令，會不會把我的專案改壞？」</strong>要安全使用這股力量，就必須理解「監督與邊界」的兩個虛擬調節旋鈕。
        </p>
      </AnimatedBlock>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-1 max-w-6xl mx-auto items-stretch text-left">
        
        {/* Left Panel: The Dials Controller */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5 mb-4">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                  <Sliders size={15} className="text-sky-400" />
                  虛擬安全調節面板
                </h3>
                <span className="text-xs font-mono text-slate-500">點擊調整</span>
              </div>

              {/* Dial 1: Supervision Level */}
              <div className="space-y-3 mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                    旋鈕一：監督程度
                  </span>
                  <span className="text-xs font-mono text-orange-400 bg-orange-500/5 px-2 py-0.5 rounded border border-orange-500/10">
                    {supervision === 0 ? '每步都問' : supervision === 1 ? '關鍵才問' : '完全不問'}
                  </span>
                </div>
                
                {/* Visual Dial Slider row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '每步都問', desc: '每一步都要你點頭', val: 0 },
                    { label: '關鍵才問', desc: '只在關鍵處停下來', val: 1 },
                    { label: '完全不問', desc: '全程不打斷你', val: 2 }
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => setSupervision(btn.val)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        supervision === btn.val 
                          ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-md' 
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{btn.label}</div>
                      <div className="text-xs font-mono opacity-80 mt-0.5">{btn.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dial 2: Sandbox Scope */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                    旋鈕二：邊界大小
                  </span>
                  <span className="text-xs font-mono text-sky-400 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/10">
                    {sandbox === 0 ? '唯讀唯看' : sandbox === 1 ? '限制專案' : '容器全開'}
                  </span>
                </div>
                
                {/* Visual Dial Slider row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: '唯讀唯看', desc: '只能看，不能改', val: 0 },
                    { label: '限制專案', desc: '限在這個資料夾內', val: 1 },
                    { label: '容器全開', desc: '整台機器都能動', val: 2 }
                  ].map((btn) => (
                    <button
                      key={btn.val}
                      onClick={() => setSandbox(btn.val)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        sandbox === btn.val 
                          ? 'bg-sky-500/10 border-sky-500/40 text-sky-400 shadow-md' 
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{btn.label}</div>
                      <div className="text-xs font-mono opacity-80 mt-0.5">{btn.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Presets (The 3 original scenarios) */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-500 font-mono block mb-2">快速載入實戰情境</span>
              <div className="flex flex-col gap-1.5">
                <button 
                  onClick={() => applyPreset(0, 0)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex justify-between items-center transition-all cursor-pointer ${
                    supervision === 0 && sandbox === 0 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-slate-950/20 border-slate-900 text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">🔍 探索陌生開源 Repo</span>
                  <ChevronRight size={12} />
                </button>
                <button 
                  onClick={() => applyPreset(1, 1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex justify-between items-center transition-all cursor-pointer ${
                    supervision === 1 && sandbox === 1 
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                      : 'bg-slate-950/20 border-slate-900 text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">🛠️ 熟專案日常小修小改</span>
                  <ChevronRight size={12} />
                </button>
                <button 
                  onClick={() => applyPreset(2, 2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex justify-between items-center transition-all cursor-pointer ${
                    supervision === 2 && sandbox === 2 
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                      : 'bg-slate-950/20 border-slate-900 text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                  }`}
                >
                  <span className="flex items-center gap-1.5">🚀 執行無人值守除錯 Loop</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </AnimatedBlock>

          {/* Golden Rules Callout */}
          <AnimatedBlock stepIndex={3} className="bg-gradient-to-br from-indigo-950/30 to-slate-950 border border-indigo-900/30 rounded-2xl p-4 text-xs space-y-3">
            <span className="text-indigo-400 font-bold flex items-center gap-1">
              <Shield size={12} /> 權限規格提醒
            </span>
            <div className="space-y-2 text-slate-400">
              <p>
                <strong>「範圍開很大，但每步都問」：</strong><br/>
                代表你信任它在各處遊走，但不信任它的最終判斷。適合剛接觸的新手，在眼皮底下看它做事。
              </p>
              <p className="border-t border-slate-900/60 pt-2">
                <strong>「範圍縮很小，但完全不問」：</strong><br/>
                代表你不信任它的判斷，但只要確保破壞範圍極小，讓它自己跑也是安全的。這是自動化運轉的核心。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Panel: Stunning Vector Quadrant Graph with Smooth Pointer Gliding */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          
          <AnimatedBlock stepIndex={2} className="relative bg-[#09090b] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col justify-between flex-1 min-h-[360px] overflow-hidden">
            
            {/* Ambient subtle background glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex justify-between items-start border-b border-slate-900 pb-3 z-10 shrink-0">
              <div>
                <span className="text-slate-500 text-xs font-mono tracking-wider">兩個旋鈕的即時對照</span>
                <h4 className="text-base font-black text-slate-200 mt-0.5">監督與邊界對照圖</h4>
              </div>
              <div className="px-2.5 py-0.5 bg-slate-900 text-slate-500 text-xs font-mono rounded">
                座標圖
              </div>
            </div>

            {/* The 2D Coordinate Grid Screen */}
            <div className="relative flex-1 min-h-[220px] border border-slate-800/40 rounded-2xl bg-slate-950/40 m-2 flex items-center justify-center overflow-hidden">
              
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-10" />

              {/* Axes (Center lines) */}
              <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-slate-800/80 -translate-x-1/2 z-0" />
              <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-slate-800/80 -translate-y-1/2 z-0" />

              {/* Axis Labels */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-slate-500 flex items-center gap-1 z-10 bg-[#09090b] px-2 py-0.5 rounded border border-slate-800/40">
                監督極嚴 (每步都問)
              </div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-mono font-bold text-amber-500 flex items-center gap-1 z-10 bg-[#09090b] px-2 py-0.5 rounded border border-amber-500/20">
                完全不問
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-500 flex items-center gap-1 z-10 bg-[#09090b] px-2 py-0.5 rounded border border-slate-800/40 vertical-text">
                只能讀
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-sky-400 flex items-center gap-1 z-10 bg-[#09090b] px-2 py-0.5 rounded border border-sky-500/20">
                容器全開
              </div>

              {/* Quadrant Text Labels inside corners */}
              <div className="absolute top-6 left-6 text-xs text-slate-600 font-bold font-mono tracking-wider pointer-events-none">安全觀察</div>
              <div className="absolute top-6 right-6 text-xs text-slate-600 font-bold font-mono tracking-wider pointer-events-none">高防護助理</div>
              <div className="absolute bottom-6 left-6 text-xs text-slate-600 font-bold font-mono tracking-wider pointer-events-none">自主分析</div>
              <div className="absolute bottom-6 right-6 text-xs text-sky-500/40 font-bold font-mono tracking-wider pointer-events-none">全自動 Loop 區</div>

              {/* Preset Scenario Reference Dots */}
              {/* Preset 1: 探索陌生 Repo (Strict Supervision + ReadOnly) */}
              <button 
                onClick={() => applyPreset(0, 0)}
                className="absolute left-[20%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center ${
                  supervision === 0 && sandbox === 0 
                    ? 'bg-emerald-400 border-white scale-125 shadow-lg shadow-emerald-500/40' 
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                }`} />
                <span className="text-xs text-slate-400 font-bold mt-1 bg-slate-900/80 px-1 py-0.5 rounded border border-slate-800 pointer-events-none">探索陌生 Repo</span>
              </button>

              {/* Preset 2: 熟專案小改 (Moderate Supervision + Restricted) */}
              <button 
                onClick={() => applyPreset(1, 1)}
                className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all flex items-center justify-center ${
                  supervision === 1 && sandbox === 1 
                    ? 'bg-indigo-400 border-white scale-125 shadow-lg shadow-indigo-500/40' 
                    : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                }`} />
                <span className="text-xs text-slate-400 font-bold mt-1 bg-slate-900/80 px-1 py-0.5 rounded border border-slate-800 pointer-events-none font-sans">日常小修小改</span>
              </button>

              {/* Preset 3: 無人值守 Loop (Autonomous + FullContainer) */}
              <button 
                onClick={() => applyPreset(2, 2)}
                className="absolute left-[80%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                  supervision === 2 && sandbox === 2 
                    ? 'bg-rose-500 border-white scale-125 shadow-lg shadow-rose-500/60' 
                    : 'bg-slate-900 border-slate-700 hover:border-rose-400'
                }`} />
                <span className="text-xs text-rose-400 font-bold mt-1 bg-slate-900/80 px-1.5 py-0.5 rounded border border-rose-950/30 pointer-events-none">無人值守 Loop</span>
              </button>

              {/* Dynamic Gliding Target Cursor (Framer Motion!) */}
              <motion.div
                className="absolute z-20 pointer-events-none flex flex-col items-center justify-center"
                animate={{
                  // Map Supervision (0: top/20%, 1: mid/50%, 2: bottom/80%)
                  top: supervision === 0 ? '20%' : supervision === 1 ? '50%' : '80%',
                  // Map Sandbox (0: left/20%, 1: mid/50%, 2: bottom/80%)
                  left: sandbox === 0 ? '20%' : sandbox === 1 ? '50%' : '80%'
                }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
              >
                {/* Double Ring Pulsing Marker */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-10 w-10 rounded-full bg-sky-500/20 animate-ping opacity-75"></span>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center border-2 border-slate-900 shadow-xl">
                    <Navigation size={10} className="text-white fill-white transform rotate-45" />
                  </div>
                </div>
                <div className="bg-sky-500 text-white font-mono text-xs font-black px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  目前位置
                </div>
              </motion.div>

            </div>

            {/* Scenario Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${supervision}-${sandbox}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${currentState.badgeColor}`}>
                      {currentState.badge}
                    </span>
                    <h5 className="text-sm font-bold text-slate-100">{currentState.title}</h5>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {currentState.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[120px] md:border-l border-slate-900 md:pl-4">
                  {/* Speed Dial Gauge indicator */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 font-mono mb-1">
                      <span>開發效率</span>
                      <span className="text-sky-400 font-bold">{currentState.speed}%</span>
                    </div>
                    <div className="w-24 bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        className="bg-sky-400 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentState.speed}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  {/* Risk Level indicator */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 font-mono mb-1">
                      <span>失控風險</span>
                      <span className="text-rose-400 font-bold">{currentState.risk}%</span>
                    </div>
                    <div className="w-24 bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        className="bg-rose-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${currentState.risk}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </AnimatedBlock>

          {/* Status Evaluation */}
          <AnimatedBlock stepIndex={2}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`advice-${supervision}-${sandbox}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex gap-3 items-start"
              >
                <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-0.5">💡 狀態評估：</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {currentState.advice}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </AnimatedBlock>

        </div>

      </div>

      {/* Slide Concluding Takeaway footer statement */}
      <AnimatedBlock stepIndex={3} className="text-center text-slate-500 text-xs mt-4">
        🔑 記住一句話：<strong>「監督鬆（完全不問），不等於有邊界！」</strong>若要讓 AI 長時間沒人看著跑，請務必把邊界縮窄或綁定虛擬容器。
      </AnimatedBlock>
    </SlideLayout>
  );
}
