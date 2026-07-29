import { motion } from 'motion/react';
import React from 'react';

export function SectionDivider({
  title,
  subtitle,
  number,
  roadmap,
}: {
  title: string;
  subtitle: string;
  number: string;
  /** 較長的段落可以給一條路線圖，讓學員知道這一段分幾塊、還要走多久 */
  roadmap?: { label: string; range: string }[];
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[40rem] font-black leading-none">{number}</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-8 max-w-5xl mx-auto"
      >
        <div className="text-sky-400 font-mono text-xl md:text-2xl tracking-[0.2em] mb-6 font-bold uppercase">{subtitle}</div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 tracking-tight leading-tight mx-auto text-balance max-w-4xl">
          {title}
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-sky-500 to-indigo-500 mx-auto mt-12 rounded-full"></div>

        {roadmap && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
            {roadmap.map((r, i) => (
              <div key={r.label} className="flex items-center gap-3">
                {i > 0 && <span className="text-slate-700 text-lg">→</span>}
                <div className="px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-left">
                  <div className="text-slate-200 text-base font-bold leading-tight">{r.label}</div>
                  <div className="text-slate-500 text-xs font-mono mt-1">{r.range}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
