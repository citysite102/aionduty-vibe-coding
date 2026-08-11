import { PackageCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 第三單元的收成頁。M1 與 M2 各有一頁，M3 原本沒有，所以整段十幾頁講完，
 * 學員說不出自己手上多了什麼，講者也不知道有多少人真的建出那個子代理。
 *
 * 判準跟 18c_M1_Harvest 一樣：只列學員打得開、指得出來的東西。
 * 「懂了分工的概念」不列，那個無從判斷自己有沒有做到。
 *
 * 最後那個動作是這一段的收尾：不寫進 CLAUDE.md，審查子代理下次就不會出場。
 */
const DONE = [
  {
    title: '建了一個只負責挑錯的角色',
    desc: (
      <>
        打 <code className="font-mono text-orange-300">/agents</code> 看得到 code-reviewer，
        專案裡也真的多了那個檔案。
      </>
    ),
  },
  {
    title: '叫過它一次，而且看得出它有沒有真的審',
    desc: '它指得到檔案跟第幾行才算數。回你「整體看起來沒問題」就是沒審。',
  },
  {
    title: '知道分工不是同時開很多個對話',
    desc: '差別在誰負責做、誰負責退回、誰不准自己動手改，寫在各自的檔案裡。',
  },
];

export default function SlideM3Harvest() {
  return (
    <SlideLayout title="這一段你手上多了什麼" subtitle="Module 3 Recap" icon={PackageCheck}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 max-w-6xl mx-auto items-start pb-4">

        <div className="space-y-3">
          {DONE.map((d, i) => (
            <AnimatedBlock
              key={d.title}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex gap-4 items-start"
            >
              <div className="w-7 h-7 shrink-0 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono text-sm">
                {i + 1}
              </div>
              <div>
                <div className="text-slate-200 text-base font-bold mb-1">{d.title}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{d.desc}</div>
              </div>
            </AnimatedBlock>
          ))}

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="text-base font-bold text-slate-100 mb-2">現在做一件事：讓它下次還會出場</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              子代理不會自己監聽。這條規矩沒寫下來，明天重開一個對話它就不會出現。
            </p>
            <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-4 py-3">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">Prompt</div>
              <p className="text-sky-100 text-sm leading-relaxed">
                「幫我在 CLAUDE.md 加一條：每次改完 index.html，先請 code-reviewer 檢查，
                它退回的話就照著修，修完再檢查一次，通過了再回報給我。」
              </p>
            </div>
          </AnimatedBlock>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
            <div className="text-sm font-mono uppercase tracking-widest text-sky-400 mb-3">你的專案裡多了什麼</div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 leading-relaxed">
              <div>mission-timer/</div>
              <div className="text-slate-500">├ index.html</div>
              <div className="text-slate-500">├ CLAUDE.md</div>
              <div className="text-slate-500">└ .claude/agents/</div>
              <div className="text-sky-300">　　└ code-reviewer.md　←　這一段的產出</div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              這個檔案跟著專案走，別人 clone 下去也會拿到同一個審查標準。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">還沒拿到的</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              報價系統那個規模的分工，今天只走過一次流程，沒有真的做出來。
              <span className="text-slate-200">那一段給你的是順序跟五個卡關的地方</span>，
              回去照著同一個順序推，才是真的做過一次。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
