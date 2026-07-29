import { motion } from 'motion/react';
import React from 'react';

export function SectionDivider({ title, subtitle, number }: { title: string; subtitle: string; number: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <span className="text-[40rem] font-black leading-none">{number}</span>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-8 max-w-5xl mx-auto"
      >
        <div className="text-sky-400 font-mono text-xl md:text-2xl tracking-[0.2em] mb-6 font-bold uppercase">{subtitle}</div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 tracking-tight leading-tight mx-auto text-balance max-w-4xl">
          {title}
        </h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-sky-500 to-indigo-500 mx-auto mt-12 rounded-full"></div>
      </motion.div>
    </div>
  );
}
