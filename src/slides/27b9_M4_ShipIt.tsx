import { Globe, Smartphone, Laptop, ArrowRight, Database } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideShipIt() {
  return (
    <SlideLayout title="上線之後才發現的問題" subtitle="Mission Timer v3: Ship It" icon={Globe}>
      <div className="max-w-6xl mx-auto text-left space-y-5 pb-8">

        {/*
          部署那段 prompt 搬到前一頁去了，那裡才是真的動手做出網址的地方。
          這一頁留給它原本更有價值的職務：網址有了之後才會發現的那個問題。
        */}
        {/* 一、痛點 */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-4">拿手機打開你的網址，日誌是空的</h3>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Laptop size={16} className="text-emerald-400" />
                <span className="text-slate-200 text-xs font-bold">你的電腦</span>
              </div>
              <div className="text-emerald-300 text-2xl font-mono font-bold">12 趟</div>
              <div className="text-slate-500 text-[11px] mt-1">連續出勤 5 天</div>
            </div>

            <ArrowRight size={18} className="text-slate-600 mx-auto hidden md:block" />

            <div className="bg-slate-950 border border-rose-900/40 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone size={16} className="text-rose-400" />
                <span className="text-slate-200 text-xs font-bold">你的手機</span>
              </div>
              <div className="text-rose-300 text-2xl font-mono font-bold">0 趟</div>
              <div className="text-slate-500 text-[11px] mt-1">連續出勤 0 天</div>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mt-4">
            同一個網址，同一個人，紀錄卻不一樣。
            <strong className="text-slate-100">為什麼？</strong>
          </p>
        </AnimatedBlock>

        {/* 三、答案 */}
        <AnimatedBlock stepIndex={2} className="bg-gradient-to-br from-emerald-950/25 to-slate-950 border border-emerald-900/30 rounded-2xl p-5 flex gap-4 items-start">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
            <Database size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-emerald-300 mb-2">因為 localStorage 是記在那台電腦裡的</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              它從來沒有離開過你的筆電。網站是上線了，資料沒有。
              要讓任何一台裝置打開都看得到同一份紀錄，就需要一個放在雲端、大家共用的地方。
              <strong className="text-slate-100">那個東西就叫資料庫。</strong>
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              真的要接的話，用 Supabase 這類託管服務，不用自己架資料庫，但會多出註冊帳號、金鑰、環境變數這些設定工。
            </p>
            <div className="mt-3 text-[11px] text-slate-500 bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 leading-relaxed">
              接資料庫留作課後延伸。
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
