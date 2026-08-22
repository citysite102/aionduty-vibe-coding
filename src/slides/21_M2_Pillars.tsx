import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/*
 * 開頭那句的順序要跟下面三格一致。原本寫「規則文件與工具」，但格子是
 * 1 工具、2 規則文件、3 切小，兩邊對不上，學員讀完第一句再看格子會先愣一下。
 * 改的是句子不是格子：下一頁（21a）整頁在講 MCP 與 Skills，也就是第 1 格的工具，
 * 格子的順序是對的，動格子會連下一頁一起斷掉。
 */
export default function SlidePillars() {
  return (
    <SlideLayout title="六個零件裡，你要自己裝的是這三塊" subtitle="What We Actually Build" icon={Layers}>
      <p className="text-slate-400 text-[15px] leading-relaxed max-w-4xl mx-auto mt-2 mb-5 text-center">
        前面那六個零件裡，這門課真的會動手的是
        <strong className="text-slate-200">工具</strong>與<strong className="text-slate-200">規則文件</strong>兩塊，
        再加一件零件表沒列、但你每天都會用到的事：<strong className="text-slate-200">把大題目切小</strong>。
      </p>
      {/*
        第四塊沒有做成第四格，因為它不是「你要建的東西」，是你在建的過程中一直要轉的旋鈕。
        但它一定要在這張地圖上：學員拿這一頁當進度表，走到監督與邊界那兩頁會找不到自己在哪。
      */}
      <p className="text-slate-500 text-sm leading-relaxed max-w-4xl mx-auto mb-5 text-center">
        工具講完會先插一段<strong className="text-slate-300">權限與邊界</strong>，那是六個零件裡的第四塊：
        手給出去了，你得知道怎麼收緊它碰得到的範圍，再往下動手才安全。
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
          {/*
            這一格原本把 MCP 與 Skills 的定義寫完了，但下一頁整頁就是在講它們，
            學員等於同一件事聽兩次，而且第二次才是完整的。
            這裡只留名字，定義交給下一頁。
          */}
          <ul className="space-y-3">
            <li className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-300 block mb-1.5">系統擴充 (MCP)</strong>
              <span className="text-slate-400 text-sm leading-relaxed block">讓它碰得到你電腦以外的東西。</span>
            </li>
            <li className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong className="text-sky-300 block mb-1.5">專屬技能 (Skills)</strong>
              <span className="text-slate-400 text-sm leading-relaxed block">把你重複交代的那套流程包起來。</span>
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
