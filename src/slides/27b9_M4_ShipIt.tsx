import { Globe, Terminal, Smartphone, Laptop, ArrowRight, Database } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideShipIt() {
  return (
    <SlideLayout title="上線之後才發現的問題" subtitle="Mission Timer v3: Ship It" icon={Globe}>
      <div className="max-w-6xl mx-auto text-left space-y-5 pb-8">

        {/* 一、把它送上線 */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-3">先把它送上線</h3>
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 relative">
            <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[11px] font-mono text-slate-500 uppercase tracking-wider font-bold">
              <Terminal size={11} className="text-sky-400" /> Prompt
            </div>
            <p className="text-sky-300 text-xs leading-relaxed font-medium mt-1">
              「幫我把 mission-timer 部署到 Vercel。先確認本機打開沒問題，建立 Git repository 推上 GitHub，
              連結 Vercel 完成部署，最後把網址給我。」
            </p>
          </div>
          <p className="text-slate-500 text-[11px] mt-3 leading-relaxed">
            這一步就是前面「從本機到上線」那一頁講的事。你不用碰伺服器，平台負責維運，Agent 負責跑步驟。
          </p>
        </AnimatedBlock>

        {/* 二、痛點 */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
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
        <AnimatedBlock stepIndex={3} className="bg-gradient-to-br from-emerald-950/25 to-slate-950 border border-emerald-900/30 rounded-2xl p-5 flex gap-4 items-start">
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
              前面「讓記憶永久保存」那一頁講的就是它。差別在於，你現在是<strong className="text-slate-200">先撞到問題，才需要這個答案</strong>。
              真的要接的話，用 Supabase 這類託管服務，不用自己架資料庫，但會多出註冊帳號、金鑰、環境變數這些設定工。
            </p>
            <div className="mt-3 text-[11px] text-slate-500 bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 leading-relaxed">
              課堂上我們停在這裡。<strong className="text-slate-400">你的計時器已經上線，而且你知道下一步該往哪走。</strong>接資料庫留作課後延伸。
            </div>
          </div>
        </AnimatedBlock>

        {/* 四、收線 */}
        <AnimatedBlock stepIndex={4} className="text-center text-slate-400 text-sm border-t border-slate-800 pt-4">
          從一個 25 分鐘的倒數，到一個有紀錄、有規範、有人審查、掛在網路上的東西。
          <strong className="text-slate-100">這一路你沒有寫過一行程式，但每一個決定都是你下的。</strong>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
