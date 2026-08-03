import { motion } from 'motion/react';
import { Check } from 'lucide-react';

/**
 * 系列頁的進度軌。一個系列拆成好幾頁的時候，掛這個在標題下面，
 * 觀眾隨時知道現在在第幾站、還剩幾站。
 *
 * 這是唯一一份實作。_HealthRail、_LayerRail、_RouteRail、_SurfaceRail
 * 原本各自複製了一份幾乎一樣的程式碼，現在都轉成薄薄一層包裝，
 * 只負責帶自己的標籤陣列進來。要改樣式改這裡就好。
 *
 * active 可以是單一站，也可以是一組（例如收合成一站的那幾頁）。
 * 傳 0 表示總覽，全部不高亮。
 *
 * spacing 只有三到四站時用 fill，等寬撐滿比較不會中間空一大塊；
 * 五站以上用 spread，讓每顆藥丸維持自己的文字寬度。
 */
export function SeriesRail({
  steps,
  active,
  spacing = 'fill',
  className = 'mb-8',
}: {
  steps: string[];
  active: number | number[];
  spacing?: 'fill' | 'spread';
  className?: string;
}) {
  const on = Array.isArray(active) ? active : [active];
  const first = Math.min(...on);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-slate-800" />
      <div className={`relative flex items-center ${spacing === 'fill' ? 'gap-4' : 'justify-between'}`}>
        {steps.map((s, i) => {
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
                spacing === 'fill' ? 'flex-1 justify-center' : ''
              } ${
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
