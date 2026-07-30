import React, { useState } from 'react';
import { Target, BrainCircuit, Activity, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

type QueryType = 'vague' | 'precise';

export default function SlideLLMMathLimits() {
  const [selectedQuery, setSelectedQuery] = useState<QueryType>('vague');

  // Vector data depending on query style
  const vectors = {
    vague: {
      queryText: '幫我改一下那邊按鈕的對話框功能',
      description: '模糊指代（那邊、按鈕、對話框）會分散注意力權重，使機率向量與多個完全不同的技術實作產生「數學碰撞」，極易導致生成錯亂與程式碼幻覺。',
      scores: [
        { key: 'shadcn/ui Dialog (現代 React 元件)', weight: 0.40, color: 'text-rose-400', bg: 'bg-rose-500/10' },
        { key: 'Python Tkinter Dialog (桌面視窗)', weight: 0.30, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { key: 'React Sidebar.tsx (側邊欄元件)', weight: 0.15, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { key: 'Java Spring Security (安全驗證邏輯)', weight: 0.15, color: 'text-violet-400', bg: 'bg-violet-500/10' },
      ],
      itPos: { x: 180, y: 105 }, // Near origin - split vector representing zero strong consensus
      itError: true,
      entropy: 'High Entropy (高混亂度 / 意圖發散)'
    },
    precise: {
      queryText: '在 /src/components/Sidebar.tsx 的 LogOutButton 元件，整合 shadcn/ui 的 Dialog 做二次確認',
      description: '明確指定了「檔案路徑」、「元件名稱」、「要用哪一套元件庫（shadcn/ui Dialog）」與「功能情境（二次確認）」，注意力集中在同一個目標上，不會被其他長得很像的東西拉走。',
      scores: [
        { key: 'shadcn/ui Dialog (現代 React 元件)', weight: 0.92, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { key: 'React Sidebar.tsx (側邊欄元件)', weight: 0.06, color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { key: 'Python Tkinter Dialog (桌面視窗)', weight: 0.01, color: 'text-slate-500', bg: 'bg-slate-500/10' },
        { key: 'Java Spring Security (安全驗證邏輯)', weight: 0.01, color: 'text-slate-500', bg: 'bg-slate-500/10' },
      ],
      itPos: { x: 315, y: 65 }, // Highly localized near shadcn/ui Dialog node at (320, 60)
      itError: false,
      entropy: 'Low Entropy (低混亂度 / 意圖聚焦)'
    }
  };

  const activeData = vectors[selectedQuery];

  return (
    <SlideLayout 
      title={
        <div className="flex flex-col md:flex-row md:items-baseline gap-x-2.5 gap-y-1 leading-tight flex-wrap">
          <span className="text-3xl md:text-5xl font-black tracking-tight text-white shrink-0">
            運作原理解析：
          </span>
          <span className="text-2xl md:text-[38px] font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 shrink-0">
            LLM 跑的是數學，而不是常識
          </span>
        </div>
      }
      subtitle="Input -> Probability Computation & High-Dimensional Geometry" 
      icon={BrainCircuit}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 text-left items-stretch">
        
        {/* Left: Input & Computation Formula */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div>
            <AnimatedBlock stepIndex={1}>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-sky-500/10 border border-sky-500/20 rounded-full text-xs font-mono text-sky-400 font-bold tracking-wider uppercase mb-3">
                Probability Computation
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2 leading-snug">
                大語言模型的「本質」：機率運算
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                大語言模型並不具備人類的常識或主觀意圖。它做的是把你的問題變成一個<strong>「座標」（Query 向量）</strong>，再去比對記憶裡每個概念的<strong>「定位標籤」（Key 向量）</strong>，看誰離得最近就聽誰的。這個「該聽誰、聽多少」的分配，就是<strong>注意力權重（Attention Weight）</strong>。
              </p>
            </AnimatedBlock>

            {/* Selector buttons */}
            <AnimatedBlock stepIndex={2} className="flex gap-2 mb-4">
              <button 
                onClick={() => setSelectedQuery('vague')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedQuery === 'vague'
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle size={13} />
                <span>模糊指令</span>
              </button>
              
              <button 
                onClick={() => setSelectedQuery('precise')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all duration-300 flex items-center justify-center gap-2 ${
                  selectedQuery === 'precise'
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Target size={13} />
                <span>精準指令</span>
              </button>
            </AnimatedBlock>

            {/* Calculations Console */}
            <AnimatedBlock stepIndex={3} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono">
              <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-900">
                <span className="text-xs text-slate-500 font-bold">Vector Similarity Scoring</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded font-bold uppercase ${selectedQuery === 'vague' ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {activeData.entropy}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full" />
                    <span>Your Input Prompt:</span>
                  </div>
                  <div className="bg-slate-900 text-sm px-3 py-2 rounded-lg text-slate-200 font-sans font-medium border border-slate-800">
                    「{activeData.queryText}」
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 mb-2">
                    Attention Weights (Query × Key Token)
                    <span className="text-slate-500 ml-1.5">：以下數值為示意，用來說明注意力怎麼分配</span>
                  </div>
                  <div className="space-y-2">
                    {activeData.scores.map((score, i) => (
                      <div key={i} className="text-xs">
                        <div className="flex justify-between text-slate-300 mb-1">
                          <span>{score.key}</span>
                          <span className={`font-bold ${score.color}`}>{score.weight.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${score.bg.replace('/10', '')} rounded-full transition-all duration-500`} 
                            style={{ width: `${score.weight * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </AnimatedBlock>
          </div>
        </div>

        {/* Right: SVG 2D plane rendering embedding vectors */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                  <Activity size={15} className="text-sky-400" />
                  <span>2D 向量投影平面（Embedding Vector Visualization）</span>
                </h4>
                <span className="text-[11px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">Cosine Similarity Space</span>
              </div>
              <p className="text-xs text-slate-400 leading-normal mb-4">
                在 LLM 的多維幾何世界中，相似的概念靠得極近，無關的則拉遠。你的 Prompt 決定了 Query 向量在平面上投射出的精準錨點。
              </p>
            </div>

            {/* Coordinate Plane Area */}
            <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 400 224" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Draw axes from center */}
                <line x1="0" y1="112" x2="400" y2="112" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="224" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* SVG axes labels */}
                <text x="370" y="123" className="text-[11px] font-mono font-semibold fill-slate-500">Dim-X</text>
                <text x="206" y="12" className="text-[11px] font-mono font-semibold fill-slate-500">Dim-Y</text>

                {/* Base Key Nodes */}
                {/* 1. shadcn/ui Dialog [320, 60] */}
                <g className="transition-all">
                  <line x1="200" y1="112" x2="320" y2="60" stroke="#ec4899" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <circle cx="320" cy="60" r="6" fill="#ec4899" className="animate-pulse" />
                  <text x="396" y="50" textAnchor="end" className="text-[11px] font-mono font-bold fill-rose-400">shadcn Dialog [0.82, 0.48]</text>
                </g>

                {/* 2. React Sidebar [280, 90] */}
                <g>
                  <line x1="200" y1="112" x2="280" y2="90" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <circle cx="280" cy="90" r="6" fill="#0ea5e9" />
                  <text x="396" y="80" textAnchor="end" className="text-[11px] font-mono font-bold fill-sky-400">Sidebar.tsx [0.65, 0.18]</text>
                </g>

                {/* 3. Python Dialog [100, 70] */}
                <g>
                  <line x1="200" y1="112" x2="100" y2="70" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <circle cx="100" cy="70" r="6" fill="#f59e0b" />
                  <text x="5" y="74" className="text-[11px] font-mono font-bold fill-amber-400">Python Dialog [-0.55, 0.32]</text>
                </g>

                {/* 4. Java Security [120, 170] */}
                <g>
                  <line x1="200" y1="112" x2="120" y2="170" stroke="#a78bfa" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <circle cx="120" cy="170" r="6" fill="#a78bfa" />
                  <text x="5" y="174" className="text-[11px] font-mono font-bold fill-violet-400">Spring Security [-0.42, -0.65]</text>
                </g>

                {/* Active input query vector line */}
                <motion.line
                  x1={200}
                  y1={112}
                  initial={{ x2: 200, y2: 112 }}
                  animate={{
                    x2: activeData.itPos.x, 
                    y2: activeData.itPos.y 
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 80 }}
                  stroke={activeData.itError ? '#f59e0b' : '#10b981'} 
                  strokeWidth="2.5" 
                />

                {/* Active input query node */}
                <motion.g
                  animate={{
                    x: activeData.itPos.x,
                    y: activeData.itPos.y,
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 80 }}
                >
                  {/* Outer breathing ring */}
                  <circle cx="0" cy="0" r="14" fill="none" stroke={activeData.itError ? '#f59e0b' : '#10b981'} strokeWidth="1.5" className="animate-ping" style={{ animationDuration: '3s' }} />
                  
                  {/* Inner node */}
                  <circle cx="0" cy="0" r="8" fill={activeData.itError ? '#f59e0b' : '#10b981'} />
                  
                  {/* Title */}
                  <rect x="10" y="-18" width="75" height="24" rx="4" fill="#020617" stroke={activeData.itError ? '#f59e0b' : '#10b981'} strokeWidth="1" />
                  <text x="16" y="-2" className="text-[11px] font-sans font-bold fill-slate-200">
                    {selectedQuery === 'vague' ? '模糊指令' : '精準指令'}
                  </text>
                </motion.g>
              </svg>
            </div>

            {/* Warning tooltip block - placed cleanly under the coordinate plane to avoid overlapping SVG nodes */}
            {selectedQuery === 'vague' ? (
              <div className="bg-amber-950/80 border border-amber-900/40 text-xs text-amber-300 py-2 px-3 rounded-lg flex items-center gap-1.5 mt-3">
                <AlertTriangle size={13} className="shrink-0 text-amber-400" />
                <span>意圖過於分散：資訊不足使向量映射至多個技術域，容易導致模型產生不相關的程式碼。</span>
              </div>
            ) : (
              <div className="bg-emerald-950/80 border border-emerald-900/40 text-xs text-emerald-300 py-2 px-3 rounded-lg flex items-center gap-1.5 mt-3">
                <Target size={13} className="shrink-0 text-emerald-400" />
                <span>語意定位精確：注意力高度集中於 shadcn Dialog 向量，生成結構完整且穩定。</span>
              </div>
            )}

            <p className="text-xs text-slate-500 italic mt-3 text-center">
              * 實線代表輸入產生的注意力向量投影；圓點代表模型儲存的底層技術特徵。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
