import { motion } from 'motion/react';
import { ArrowRight, ArrowDown, Terminal, Activity, CheckCircle2, User } from 'lucide-react';

export default function Slide01() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6 absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]/80"
    >
      {/* Floating UI Decorative Elements (mimicking the original cover) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
        className="absolute top-[20%] left-[15%] hidden md:flex items-center gap-3 bg-slate-900/50 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-2xl"
      >
        <div className="w-10 h-10 rounded-full border-4 border-slate-700 border-t-slate-500" />
        <div className="h-2 w-12 bg-slate-700 rounded-full" />
      </motion.div>
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 1 }}
        className="absolute top-[15%] right-[20%] hidden md:flex items-center gap-2 bg-slate-900/60 backdrop-blur-md border border-sky-500/30 p-2 px-4 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)]"
      >
        <span className="text-xs text-sky-400 font-mono">Prompt</span>
        <div className="h-4 w-[1px] bg-slate-600 mx-2" />
        <span className="text-xs text-slate-400 font-mono">...</span>
        <div className="ml-4 flex items-center gap-1 text-xs text-emerald-400">
          <CheckCircle2 size={14} /> Generate
        </div>
      </motion.div>

      <motion.div 
        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 1 }}
        className="absolute bottom-[20%] left-[20%] hidden md:flex flex-col gap-2 bg-slate-900/50 backdrop-blur-md border border-slate-700 p-4 rounded-xl"
      >
        <Activity size={24} className="text-slate-400" />
        <div className="h-1.5 w-16 bg-slate-600 rounded-full mt-2" />
        <div className="h-1.5 w-10 bg-slate-700 rounded-full" />
      </motion.div>
      
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10 w-full flex flex-col items-center"
      >
        {/* User Icon Badge */}
        <div className="mb-8 relative">
          <div className="bg-sky-200 text-sky-900 p-3 rounded-xl shadow-[0_0_20px_rgba(14,165,233,0.4)]">
             <User size={32} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-900 rounded-full p-0.5 border-2 border-[#020617]">
             <CheckCircle2 size={16} />
          </div>
        </div>
        
        {/* Series eyebrow */}
        <p className="text-sm md:text-base text-slate-400 font-mono tracking-[0.35em] uppercase mb-5">
          AI On Duty 系列
        </p>

        {/* Main Glitch-like Title：起點與目標狀態，對照見 04c_Intro_VibeVsAgentic */}
        <h1 className="flex flex-col items-center mb-10">
          <span className="text-5xl md:text-7xl font-black text-slate-300 italic tracking-wider">
            Vibe Coding
          </span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
            className="text-sky-400 my-3"
          >
            <ArrowDown size={32} />
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-black text-white italic tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Agentic Engineering
          </motion.span>
        </h1>
        
        {/* Pill Subtitle */}
        <div className="bg-gradient-to-r from-slate-100 via-white to-sky-100 text-slate-900 font-bold px-8 py-4 rounded-full text-xl md:text-2xl flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)] border-2 border-white/80 mb-10">
          <Terminal size={24} className="mr-3 text-sky-600" />
          <span className="tracking-wide">實戰：AI 開發流程完整指南</span>
        </div>
        
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
          補上軟體基礎，建立一套自己能重複用的 AI 開發流程。
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6 text-sm text-slate-300 font-mono tracking-widest uppercase"
        >
          <span>講師 Samuel 高玉璁</span>
        </motion.div>
      </motion.div>
      
    </motion.div>
  );
}
