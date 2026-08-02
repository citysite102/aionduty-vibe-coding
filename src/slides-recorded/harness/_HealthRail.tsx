import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const STEPS = ['盤點', '減法', '分流', '加法', '修剪'];

/**
 * 五步健檢的流程軌。active 可以是單一步驟，也可以是一組步驟。
 * 傳 0 表示總覽，全部不高亮。
 */
export function HealthRail({ active }: { active: number | number[] }) {
  const on = Array.isArray(active) ? active : [active];
  const first = Math.min(...on);

  return (
    <div className="relative mb-8">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-slate-800" />
      <div className="relative flex items-center justify-between">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const isActive = on.includes(n);
          const isDone = n < first;
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.05 }}
              className={`relative flex items-center gap-2.5 rounded-full border px-5 py-2.5 ${
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
