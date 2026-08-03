import { Network, Star } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

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
          {/* Framer Motion elegant pulsating background glow - positioned slightly lower to avoid clipping */}
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1], 
              opacity: [0.15, 0.35, 0.15],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="w-[350px] h-[350px] bg-gradient-to-tr from-sky-500/25 to-emerald-500/25 blur-[90px] rounded-full absolute top-[15%]"
          />
        </div>

        <AnimatedBlock stepIndex={1} className="max-w-4xl relative z-10 mt-2">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, type: "spring" }}
            className="w-20 h-20 mx-auto bg-slate-900 rounded-full flex items-center justify-center mb-6 border border-sky-500/30 shadow-[0_0_40px_rgba(14,165,233,0.35)] relative"
          >
             <Network size={36} className="text-sky-400 z-10" />
             <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-r-2 border-sky-400 rounded-full"
             />
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
            今天做的那個計時器已經在線上了，網址可以直接傳給別人看。
            <strong className="text-slate-100">下次換一個題目，流程還是一樣：講清楚要什麼、說好什麼叫做完、跑完自己抽查幾筆。</strong>
          </p>
        </AnimatedBlock>
        
        <AnimatedBlock stepIndex={2} className="w-full max-w-4xl relative z-10 mt-2">
          <div className="bg-gradient-to-r from-sky-950/40 to-slate-900 p-[1px] rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-950/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Star className="text-amber-400" size={20} />
                下一步可以練什麼
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                挑一件你每週都要重複做的事，把做法和判斷標準整理成一份 <code className="text-sky-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono">SKILL.md</code>，交給它跑一次看看。不必等到會寫程式才開始。
              </p>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
