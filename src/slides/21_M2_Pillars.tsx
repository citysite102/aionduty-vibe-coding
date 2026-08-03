import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide09() {
  return (
    <SlideLayout title="接下來要動手的三件事" subtitle="What We Actually Build" icon={Layers}>
      <p className="text-slate-400 text-[15px] leading-relaxed max-w-4xl mx-auto mt-2 mb-5 text-center">
        錢的部分先講到這裡，回到零件。前面那六個零件裡，這堂課真的會動手的是
        <strong className="text-slate-200">規則文件</strong>與<strong className="text-slate-200">工具</strong>兩塊，
        再加一件零件表沒列、但你每天都會用到的事：<strong className="text-slate-200">把大題目切小</strong>。
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">

        {/* 一、工具 */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base">1</div>
            讓它有工具可用
          </h3>
          <p className="text-slate-300 mb-5 text-[15px] leading-relaxed">
            查不到的東西它就會用猜的。給它真的能查、能動手的工具。
          </p>
          <ul className="space-y-3">
            <li className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-300 block mb-1.5">系統擴充 (MCP)</strong>
              <span className="text-slate-400 text-sm leading-relaxed block">
                接上外部工具，例如讓它直接操作你的 GitHub、讀取 Notion 文件。
              </span>
            </li>
            <li className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-300 block mb-1.5">專屬技能 (Skills)</strong>
              <span className="text-slate-400 text-sm leading-relaxed block">
                教它「怎麼做」。把一套 SOP 包起來，遇到那類任務就照著走。
              </span>
            </li>
          </ul>
        </AnimatedBlock>

        {/* 二、規則文件與 context */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base">2</div>
            只給它需要的資料
          </h3>
          <p className="text-slate-300 mb-5 text-[15px] leading-relaxed">
            該給的要給，但塞太多它會抓不到重點。
          </p>
          <div className="space-y-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-sky-300 font-bold block mb-1.5">專案手冊 (CLAUDE.md)</span>
              <span className="text-slate-400 text-sm leading-relaxed block">把規矩和命名習慣定下來。</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-sky-300 font-bold block mb-1.5">壓縮與清理</span>
              <span className="text-slate-400 text-sm leading-relaxed block">
                對話快滿時系統會把先前內容摘要後重開，也可以手動下 <code className="text-slate-300">/compact</code>。
                這個過程會掉細節。
              </span>
            </div>
          </div>
        </AnimatedBlock>

        {/* 三、把大題目切小 */}
        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base">3</div>
            把大題目切小
          </h3>
          <p className="text-slate-300 mb-5 text-[15px] leading-relaxed">
            一次交代太大，出錯的機會就變高。
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="mb-4 text-slate-500 line-through">
              「我想知道自己今天完成幾趟任務」
            </div>
            <div className="text-emerald-400 font-bold mb-3 border-b border-emerald-900/30 pb-2">
              轉換為待辦清單：
            </div>
            <ul className="text-slate-300 text-sm space-y-2 list-disc pl-5 marker:text-emerald-700">
              <li>一趟任務要記下哪些欄位</li>
              <li>這些紀錄存在哪裡</li>
              <li>畫面上要怎麼呈現</li>
            </ul>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
