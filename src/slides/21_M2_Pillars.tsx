import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/*
 * 2026-09-21 大改。這一頁原本在成本那一段的最後，三格各自對應上一頁列的
 * 「三個浪費」，開頭卻在講六個零件與第四塊權限，兩個框架疊在一起，
 * 三格跟開頭讀起來沒有關係。現在開頭只講這三格本身。
 *
 * **格子順序換過：1 規則文件、2 工具、3 切小。** 這是照著後面的教學順序排的，
 * 下一頁是「為什麼需要規則文件」，再下一頁才是 MCP 與 Skills。
 * 要動格子順序之前先看那兩頁還在不在原位。
 *
 * 每一格開頭那句「它缺的是什麼」不要換成「解的是第 N 個浪費」：
 * 那份浪費清單原本在 11c3_M1_SpendLess，2026-09-22 連同另外兩頁採購決策整組移除了，
 * 全片已經沒有那三個浪費，不要再拿它當這三格的骨架。
 */
export default function SlidePillars() {
  return (
    <SlideLayout title="三個動作，提高 Agent 任務的效益" subtitle="What We Actually Build" icon={Layers}>
      <p className="text-slate-300 text-base leading-relaxed max-w-4xl mx-auto mt-2 mb-6 text-center">
        同一件事交代出去，結果準不準、花掉多少，你能調整的就是下面這三件。
        <strong className="text-slate-100">換成更新的模型，這三件照樣要做。</strong>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto items-stretch">

        {/* 一、規則文件與 context */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base">1</div>
            只給它需要的資料
          </h3>
          <p className="text-slate-300 mb-5 text-sm leading-relaxed">
            <span className="text-slate-500">它缺的是你的規矩。</span>
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

        {/* 二、工具 */}
        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base">2</div>
            讓它有工具可用
          </h3>
          <p className="text-slate-300 mb-5 text-sm leading-relaxed">
            <span className="text-slate-500">它缺的是手。</span>
            查不到的東西它就會用猜的。給它真的能查、能動手的工具。
          </p>
          {/*
            這一格原本把 MCP 與 Skills 的定義寫完了，但下一頁整頁就是在講它們，
            學員等於同一件事聽兩次，而且第二次才是完整的。
            這裡只留名字，定義交給下一頁。
          */}
          <ul className="space-y-3">
            <li className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-300 block mb-1.5">外部連線 (MCP)</strong>
              <span className="text-slate-400 text-sm leading-relaxed block">照 MCP 這套規範接上外部服務，它才碰得到你電腦以外的東西。</span>
            </li>
            <li className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-300 block mb-1.5">專屬技能 (Skills)</strong>
              <span className="text-slate-400 text-sm leading-relaxed block">把你重複交代的那套流程包起來。</span>
            </li>
          </ul>
        </AnimatedBlock>

        {/* 三、把大題目切小 */}
        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-3 mb-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-base">3</div>
            把大題目切小
          </h3>
          <p className="text-slate-300 mb-5 text-sm leading-relaxed">
            <span className="text-slate-500">它缺的是範圍。</span>
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
