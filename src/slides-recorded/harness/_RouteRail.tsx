import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const STEPS = ['會出事', '只在某一區', '有固定步驟', '以上皆非'];

/**
 * 規則分流的四個問題。每一頁都顯示整條流程，高亮當前這一問。
 * 進場是一次性的錯開淡入，沒有常駐動畫。
 */
export function RouteRail({ active }: { active: number }) {
  return (
    <div className="relative mb-9">
      {/* 底層進度線 */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-800 -translate-y-1/2" />
      <motion.div
        className="absolute left-0 top-1/2 h-px bg-sky-500/60 -translate-y-1/2"
        initial={{ width: 0 }}
        animate={{ width: `${((active - 1) / (STEPS.length - 1)) * 100}%` }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
      />

      <div className="relative flex items-center justify-between">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const isActive = n === active;
          const isDone = n < active;
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.06 }}
              className={`relative flex items-center gap-3 rounded-full border px-5 py-2.5 ${
                isActive
                  ? 'border-sky-500/60 bg-[#0b1220] shadow-[0_0_28px_-8px_rgba(56,189,248,0.55)]'
                  : 'border-slate-800 bg-[#020617]'
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-sm font-bold ${
                  isActive
                    ? 'bg-sky-500 text-slate-950'
                    : isDone
                      ? 'bg-sky-500/20 text-sky-400'
                      : 'bg-slate-800 text-slate-600'
                }`}
              >
                {isDone ? <Check size={14} strokeWidth={3} /> : n}
              </span>
              <span
                className={`text-lg ${
                  isActive ? 'font-bold text-sky-300' : isDone ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {s}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
