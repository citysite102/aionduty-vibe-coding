import { motion } from 'motion/react';
import React from 'react';
import { UnitMark } from './SlideLayout';

export function SectionDivider({
  title,
  subtitle,
  number,
  roadmap,
}: {
  title: string;
  subtitle: string;
  number: string;
  /**
   * 較長的段落可以給一條路線圖。用 weight 撐出每一塊的寬度，
   * 讓「哪一塊最長、還要撐多久」直接用比例看出來，而不是幾個一樣大的方塊。
   *
   * weight 只是相對比例，不要寫絕對頁碼。拆頁會讓頁碼一直漂，
   * 而畫面右下角本來就有「Slide N / 總數」，兩邊對不上比沒有更糟。
   */
  roadmap?: { label: string; weight: number; note?: string }[];
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* 分節頁是置中版面，記號放右上角，不要塞進中間那一疊去跟章名搶位置 */}
      <UnitMark className="absolute top-10 right-10 z-10" />

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
        <div className="w-24 h-1.5 bg-sky-500 mx-auto mt-12 rounded-full"></div>

        {roadmap && (
          <div className="mt-14 w-full max-w-3xl mx-auto">
            <div className="text-slate-500 text-sm mb-3 text-center">
              這一段分成 {roadmap.length} 塊
            </div>

            {/* 寬度＝相對長度，讓「哪一塊最長」用看的就知道。深淺交錯區分相鄰區塊。 */}
            <div className="flex gap-2">
              {roadmap.map((r, i) => (
                <div
                  key={r.label}
                  style={{ flex: r.weight }}
                  className={`rounded-2xl px-5 py-4 text-left border ${
                    i % 2 === 0
                      ? 'bg-sky-500/15 border-sky-500/30'
                      : 'bg-sky-500/[0.06] border-sky-500/15'
                  }`}
                >
                  <div className="text-slate-100 text-base font-bold leading-tight whitespace-nowrap">
                    {r.label}
                  </div>
                  {r.note && <div className="text-slate-500 text-xs mt-1.5">{r.note}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
