import { Database, Table, FileJson, ServerCog } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

export default function Slide10d() {
  return (
    <SlideLayout title="讓記憶永久保存" subtitle="Database Basics" icon={Database}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2 h-full items-start max-w-6xl mx-auto pb-8">

        <div className="space-y-6 text-left">
          <AnimatedBlock stepIndex={1}>
            <h2 className="text-2xl font-bold text-slate-100 mb-3">為什麼需要資料庫？</h2>
            <p className="text-slate-300 text-base leading-relaxed">
              沒有資料庫的話，程式一關掉，使用者的帳號和貼文就跟著不見。
              資料庫就是軟體的<strong className="text-slate-100">長期記憶</strong>。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-sky-900/30 rounded-lg text-sky-400 shrink-0">
                <Table size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-100">關聯式 (SQL)</h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-3">
              像一疊<strong className="text-slate-100">互相拉好線的 Excel 分頁</strong>。欄位要先講清楚，改起來比較費工，
              但關係嚴謹，適合訂單、金流這種錯不得的資料。
            </p>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-slate-950 text-slate-400 text-xs rounded border border-slate-800 font-mono">PostgreSQL</span>
              <span className="px-2.5 py-1 bg-slate-950 text-slate-400 text-xs rounded border border-slate-800 font-mono">MySQL</span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-amber-900/30 rounded-lg text-amber-400 shrink-0">
                <FileJson size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-100">非關聯式 (NoSQL)</h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-3">
              像一個<strong className="text-slate-100">巨大的資料夾</strong>，每份檔案格式自由，想加什麼欄位隨時加。
              開發快，但少了硬性約束，複雜的交叉查詢就吃力。
            </p>
            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-slate-950 text-slate-400 text-xs rounded border border-slate-800 font-mono">MongoDB</span>
              <span className="px-2.5 py-1 bg-slate-950 text-slate-400 text-xs rounded border border-slate-800 font-mono">Firebase</span>
            </div>
          </AnimatedBlock>
        </div>

        <div className="space-y-6">
          <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl text-left">
            <h4 className="text-base font-extrabold text-amber-400 mb-3">
              🙋 AI 都會自己寫了，我還需要看懂嗎？
            </h4>
            <p className="text-slate-200 text-base leading-relaxed mb-3">
              需要。<strong className="text-white">你看不懂它給的資料表，就抓不出它的邏輯錯誤。</strong>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              你不用會寫 SQL，但要看得懂大致的結構，才有辦法這樣指正它：
            </p>
            <p className="text-sm leading-relaxed text-sky-300 font-medium bg-sky-950/20 border border-sky-950/40 rounded-lg px-3.5 py-3">
              「使用者跟文章是一對多。使用者被刪掉的時候，他的文章要一起刪嗎？你有處理嗎？」
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[260px]">
            <h4 className="text-slate-400 text-sm font-bold mb-5">資料怎麼被取出來</h4>

            <div className="relative w-full max-w-sm flex flex-col items-center justify-between gap-3 py-2">

              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 z-10 w-full text-center flex flex-col items-center">
                <ServerCog className="text-indigo-400 mb-1" size={24} />
                <span className="text-slate-200 text-sm font-bold">後端伺服器 (API)</span>
              </div>

              <div className="h-14 w-1 bg-slate-800 relative my-1">
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-emerald-400 rounded-full"
                  animate={{ top: ["10%", "85%", "10%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 z-10 w-full text-center flex flex-col items-center shadow-2xl">
                <Database className="text-amber-400 mb-1.5" size={32} />
                <span className="text-slate-200 text-sm font-bold">資料庫 (長期記憶)</span>
                <motion.div
                  className="mt-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                >
                  SELECT * FROM users WHERE id = 12;
                </motion.div>
              </div>
            </div>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
