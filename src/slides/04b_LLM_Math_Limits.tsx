import { useState } from 'react';
import { Target, BrainCircuit, Activity, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

type QueryType = 'vague' | 'precise';

// 四個候選做法，位置對應右側示意圖上的座標
const NODES = [
  { id: 'crop', label: '去背', x: 320, y: 60, anchor: 'end' as const, tx: 396, ty: 50 },
  { id: 'bright', label: '調亮度', x: 280, y: 90, anchor: 'end' as const, tx: 396, ty: 82 },
  { id: 'resize', label: '改尺寸', x: 100, y: 70, anchor: 'start' as const, tx: 5, ty: 74 },
  { id: 'text', label: '換掉圖上的字', x: 120, y: 170, anchor: 'start' as const, tx: 5, ty: 174 },
];

export default function SlideLLMMathLimits() {
  const [selectedQuery, setSelectedQuery] = useState<QueryType>('vague');

  const vectors = {
    vague: {
      queryText: '幫我把那張圖修一下',
      scores: [
        { id: 'crop', key: '把背景去掉', weight: 0.31 },
        { id: 'bright', key: '調亮一點', weight: 0.27 },
        { id: 'resize', key: '改成別的尺寸', weight: 0.22 },
        { id: 'text', key: '換掉圖上的字', weight: 0.20 },
      ],
      itPos: { x: 180, y: 105 },
      itError: true,
      state: '意圖分散',
      hint: '四種做法的可能性都差不多。它沒有常識可以幫你選，只能挑一個，然後你再重講一次。',
    },
    precise: {
      queryText: '這張商品照，請把背景去掉，存成透明背景的 PNG，商品本身不要動',
      scores: [
        { id: 'crop', key: '把背景去掉', weight: 0.93 },
        { id: 'bright', key: '調亮一點', weight: 0.04 },
        { id: 'resize', key: '改成別的尺寸', weight: 0.02 },
        { id: 'text', key: '換掉圖上的字', weight: 0.01 },
      ],
      itPos: { x: 315, y: 65 },
      itError: false,
      state: '意圖集中',
      hint: '你講明了對象（這張商品照）、動作（去背）、格式（透明 PNG）跟邊界（商品不要動），它不用猜。',
    },
  };

  const activeData = vectors[selectedQuery];
  const topId = activeData.scores[0].weight > 0.5 ? activeData.scores[0].id : null;

  return (
    <SlideLayout
      title={
        <div className="flex flex-col md:flex-row md:items-baseline gap-x-2.5 gap-y-1 leading-tight flex-wrap">
          <span className="text-3xl md:text-5xl font-black tracking-tight text-white shrink-0">
            它不是在理解，
          </span>
          <span className="text-2xl md:text-[38px] font-black tracking-tight text-sky-400 shrink-0">
            是在算哪個答案離你最近
          </span>
        </div>
      }
      subtitle="Why Vague Instructions Fail"
      icon={BrainCircuit}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-2 text-left items-stretch">

        {/* 左側：說明與可能性列表 */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-400 text-sm leading-relaxed">
              它把你的話換算成一個位置，再看記憶裡哪些做法離這個位置最近。<strong className="text-slate-200">離得越近的，它越可能拿來用。</strong>它沒有常識可以幫你判斷你真正想要哪一個，所以你講得夠不夠清楚，直接決定它會不會猜錯。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="flex gap-2">
            <button
              onClick={() => setSelectedQuery('vague')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors duration-200 flex items-center justify-center gap-2 ${
                selectedQuery === 'vague'
                  ? 'bg-amber-500/10 border-amber-500/50 text-amber-400'
                  : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <AlertTriangle size={13} />
              <span>模糊的講法</span>
            </button>

            <button
              onClick={() => setSelectedQuery('precise')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors duration-200 flex items-center justify-center gap-2 ${
                selectedQuery === 'precise'
                  ? 'bg-sky-500/10 border-sky-500/50 text-sky-400'
                  : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target size={13} />
              <span>講清楚的講法</span>
            </button>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-900">
              <span className="text-xs text-slate-500 font-bold">它猜你想要的是哪一個</span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${selectedQuery === 'vague' ? 'bg-amber-500/10 text-amber-400' : 'bg-sky-500/10 text-sky-400'}`}>
                {activeData.state}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 mb-1">你說的話</div>
                <div className="bg-slate-900 text-sm px-3 py-2 rounded-lg text-slate-200 font-medium border border-slate-800 leading-relaxed">
                  「{activeData.queryText}」
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-2">
                  它心裡的可能性<span className="text-slate-600 ml-1.5">（數值為示意，用來說明分配方式）</span>
                </div>
                <div className="space-y-2">
                  {activeData.scores.map((score) => (
                    <div key={score.id} className="text-xs">
                      <div className="flex justify-between mb-1">
                        <span className={score.id === topId ? 'text-sky-300' : 'text-slate-400'}>{score.key}</span>
                        <span className={`font-bold font-mono ${score.id === topId ? 'text-sky-400' : 'text-slate-500'}`}>
                          {score.weight.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${score.id === topId ? 'bg-sky-500' : 'bg-slate-700'}`}
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

        {/* 右側：距離示意圖 */}
        <div className="lg:col-span-6 flex flex-col">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col">
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 mb-2">
              <Activity size={15} className="text-sky-400" />
              <span>它腦中的距離圖（示意）</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              意思接近的東西，位置就靠近；沒關係的就離得遠。<span className="text-slate-300">你講得越清楚，箭頭指的地方越明確。</span>
            </p>

            <div className="relative w-full h-56 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <svg viewBox="0 0 400 224" className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                <line x1="0" y1="112" x2="400" y2="112" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="200" y1="0" x2="200" y2="224" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                {NODES.map((n) => {
                  const active = n.id === topId;
                  return (
                    <g key={n.id}>
                      <line
                        x1="200" y1="112" x2={n.x} y2={n.y}
                        stroke={active ? '#38bdf8' : '#334155'}
                        strokeWidth="1.5" strokeDasharray="2 2"
                      />
                      <circle cx={n.x} cy={n.y} r="6" fill={active ? '#38bdf8' : '#475569'} />
                      <text
                        x={n.tx} y={n.ty}
                        textAnchor={n.anchor}
                        className={`text-xs font-bold ${active ? 'fill-sky-400' : 'fill-slate-500'}`}
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}

                <motion.line
                  x1={200}
                  y1={112}
                  initial={{ x2: 200, y2: 112 }}
                  animate={{ x2: activeData.itPos.x, y2: activeData.itPos.y }}
                  transition={{ type: 'spring', damping: 22, stiffness: 90 }}
                  stroke={activeData.itError ? '#f59e0b' : '#38bdf8'}
                  strokeWidth="2.5"
                />

                <motion.g
                  animate={{ x: activeData.itPos.x, y: activeData.itPos.y }}
                  transition={{ type: 'spring', damping: 22, stiffness: 90 }}
                >
                  <circle cx="0" cy="0" r="8" fill={activeData.itError ? '#f59e0b' : '#38bdf8'} />
                  <rect x="10" y="-18" width="86" height="24" rx="4" fill="#020617" stroke={activeData.itError ? '#f59e0b' : '#38bdf8'} strokeWidth="1" />
                  <text x="16" y="-2" className="text-xs font-bold fill-slate-200">
                    你說的話
                  </text>
                </motion.g>
              </svg>
            </div>

            <div className={`text-xs py-2.5 px-3 rounded-lg flex items-start gap-2 mt-4 leading-relaxed ${
              selectedQuery === 'vague'
                ? 'bg-amber-500/5 border border-amber-500/20 text-amber-300'
                : 'bg-sky-500/5 border border-sky-500/20 text-sky-300'
            }`}>
              {selectedQuery === 'vague'
                ? <AlertTriangle size={13} className="shrink-0 text-amber-400 mt-0.5" />
                : <Target size={13} className="shrink-0 text-sky-400 mt-0.5" />}
              <span>{activeData.hint}</span>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              圓點是它記得的幾種做法，實線是你的話落在哪裡。落在中間，代表它誰都不確定。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
