import { Network, Star, Repeat, Users, Share2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

/**
 * 收尾給三個方向而不是一個，因為台下三種人：手上有重複雜事的、
 * 身邊有人被爛流程卡住的、要帶團隊的。一個建議只接得住其中一種。
 * 三張都寫成「明天就能動手」的大小，不要寫成願景。
 */
const NEXT = [
  {
    icon: Repeat,
    title: '把重複的事寫成流程',
    body: (
      <>
        每週都要做一次的那件事（週報、對帳、整理名單），把做法與判斷標準寫成一份{' '}
        <code className="rounded bg-slate-950 px-1.5 py-0.5 font-mono text-sky-300">SKILL.md</code>，交給它跑一次看看。
      </>
    ),
  },
  {
    icon: Share2,
    title: '把卡住別人的東西做成工具',
    body: '部門一直用 Excel 互傳的那張表、每次都要重問一次的那份資料，做成一個網頁，網址發出去就有人在用。',
  },
  {
    icon: Users,
    title: '把規矩交給團隊',
    body: (
      <>
        把你寫的{' '}
        <code className="rounded bg-slate-950 px-1.5 py-0.5 font-mono text-sky-300">CLAUDE.md</code>{' '}
        放進團隊共用的專案，下一個接手的人，跟下一個 Agent，都從同一個起點開始。
      </>
    ),
  },
];

export default function SlideOutro() {
  return (
    <SlideLayout title="未來的工作者" subtitle="The Future Worker" icon={Star}>
      <div className="flex flex-col items-center justify-center min-h-[65vh] mt-2 px-4 text-center relative overflow-hidden">
        
        {/* Cool floating background effect */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="w-[800px] h-[800px] rounded-full border border-sky-500/10 border-dashed absolute opacity-40"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="w-[600px] h-[600px] rounded-full border border-sky-500/10 border-dashed absolute opacity-40"
          />
          {/* 背景光暈維持靜態：A-3 規定全頁最多留一組慢速動態，那一組是上面兩圈虛線環 */}
          <div className="w-[350px] h-[350px] bg-gradient-to-tr from-sky-500/25 to-emerald-500/25 blur-[90px] rounded-full absolute top-[15%] opacity-25" />
        </div>

        <AnimatedBlock stepIndex={1} className="max-w-4xl relative z-10 mt-2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="w-20 h-20 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-sky-500/30 shadow-[0_0_40px_rgba(14,165,233,0.35)] relative"
          >
             <Network size={36} className="text-sky-400 z-10" />
             <div className="absolute inset-0 border-t-2 border-r-2 border-sky-400 rounded-full" />
          </motion.div>
          
          <h2 className="text-2xl md:text-4xl font-black text-slate-100 mb-4 leading-tight">
            以前寫下來的東西是給人看的，<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              現在寫下來的東西，會自己跑起來。
            </span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
            過去我們的價值在於親手把每一件瑣事做完。<br/>
            接下來的價值在於<strong className="text-white mx-1">「把判斷標準、流程與邊界講清楚」</strong>。<br/>
            工具會一直換，但這件事練起來不會白費。
          </p>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto border-t border-slate-800 pt-5">
            你做出來的那個計時器已經在線上，網址可以直接傳給別人看。
            <strong className="text-slate-100">換一個題目，流程還是同一套：講清楚要什麼、說好什麼叫做完、跑完自己抽查幾筆。</strong>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="w-full max-w-4xl relative z-10 mt-2">
          <div className="bg-gradient-to-r from-sky-950/40 to-slate-900 p-[1px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-950/80 backdrop-blur-xl p-7 md:p-8 rounded-3xl border border-slate-800 text-left">
              <h3 className="text-xl font-bold text-white mb-1.5 flex items-center gap-2">
                <Star className="text-sky-400" size={20} />
                挑一個方向，這禮拜就能動手
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                三個都不必等到會寫程式才開始。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {NEXT.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div key={n.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={16} className="shrink-0 text-sky-400" />
                        <h4 className="text-sm font-bold text-slate-100">{n.title}</h4>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{n.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
