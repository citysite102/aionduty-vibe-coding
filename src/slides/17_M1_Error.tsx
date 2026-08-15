import { AlertTriangle, ArrowRight, MessageSquareCode } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本整片是終端機：模擬 zsh 跑 npm run dev，噴一個 React 專案的 vite build error。
 *
 * 但學員走到這裡還沒裝終端機（那在「手把手操作」那一頁），手上只有桌面版跟一個
 * index.html，不可能產生那種錯。等於拿一個他這堂課不會遇到的錯當範例。
 *
 * 換成他真的會撞到的：叫 Claude Code 做事，它跑的指令失敗，紅字就印在對話裡。
 * 這個桌面版跟終端機都成立，跟前一頁「終端機只是其中一個介面」的立場一致。
 *
 * 「紅字出現在三個地方，做法都一樣」那一段是這一頁真正要留下的東西。
 * 瀏覽器那一項只給一行，因為「畫面壞了但沒有紅字」是後面另一頁的主題，
 * 這裡講完就沒得講了。
 */
const HABITS = [
  {
    title: '不要盲目亂改',
    body: '還沒搞懂哪裡出事之前，不要跑去動其他地方。改到後來會變成兩個問題疊在一起。',
  },
  {
    title: '整段複製，不要只抓一句',
    body: '紅字通常有好幾行，真正有用的資訊常常在最後一行或路徑那一段。你判斷不出哪句重要，就整段給它。',
  },
];

export default function SlideError() {
  return (
    <SlideLayout title="紅字不是壞事，它在告訴你哪裡卡住" subtitle="Don't Panic" icon={AlertTriangle}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          它做事的時候會自己跑指令，跑失敗就把紅字印出來。
          <strong className="text-slate-100">那不是壞掉，是它在跟你說卡在哪。</strong>
          你不需要看懂那段紅字，只要知道拿它去做什麼。
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 items-start">

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5">
            <div className="text-sm font-bold text-rose-300 mb-3">你會看到的樣子</div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm space-y-2.5">
              <div className="text-slate-400">
                <span className="text-slate-600">你 </span>
                幫我看看這個資料夾裡有什麼
              </div>
              <div className="text-slate-500">
                <span className="text-slate-600">● </span>
                Bash(ls mission-tumer)
              </div>
              <div className="rounded border border-rose-500/25 bg-rose-950/20 px-3 py-2 text-rose-300 leading-relaxed">
                ls: mission-tumer: No such file or directory
              </div>
              <div className="text-slate-500 leading-relaxed">
                <span className="text-slate-600">● </span>
                資料夾名稱好像拼錯了，我改成 mission-timer 再試一次。
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mt-3">
              多數時候它自己就接下去修了，你只要看著。
              <strong className="text-slate-200">它連續試了兩三次還在同一個地方繞</strong>，才輪到你出手。
            </p>
          </AnimatedBlock>

          <div className="space-y-4">
            <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="text-sm font-bold text-slate-100 mb-3">輪到你出手的時候，兩個習慣</div>
              <div className="space-y-3">
                {HABITS.map((h) => (
                  <div key={h.title} className="flex gap-2.5 items-start">
                    <ArrowRight size={15} className="text-slate-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-slate-200 text-sm font-bold mb-0.5">{h.title}</div>
                      <p className="text-slate-400 text-sm leading-relaxed">{h.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-sky-400 mb-2">
                  <MessageSquareCode size={13} />
                  <span>貼回去的時候順便加這句</span>
                </div>
                <p className="text-sky-100 text-sm leading-relaxed">
                  「我遇到了這個錯誤，請用最簡單的白話文解釋它發生了什麼事，並給出 3 個可能的原因與具體解法。」
                </p>
              </div>
            </AnimatedBlock>
          </div>
        </div>

        <Callout tone="focus" label="紅字會出現在三個地方，做法都一樣" stepIndex={4}>
          <ul className="space-y-1.5 mb-3">
            <li>
              <strong className="text-slate-100">Claude Code 的對話裡</strong>，它跑指令失敗的時候。桌面版跟終端機都一樣，這是你最常看到的。
            </li>
            <li>
              <strong className="text-slate-100">瀏覽器</strong>，網頁打開怪怪的時候。按 <code className="font-mono text-slate-200">F12</code>（Mac 是 <code className="font-mono text-slate-200">Cmd + Opt + I</code>）開 Console 看。
            </li>
            <li>
              <strong className="text-slate-100">終端機</strong>，你自己在跑東西的時候。
            </li>
          </ul>
          <p className="text-slate-400">
            不管在哪一個，你要做的都是同一件事：<strong className="text-slate-200">整段複製，貼回對話框。</strong>
            另一種狀況是它說做完了，你打開卻是壞的，哪裡都沒有紅字，那種要另外處理。
          </p>
        </Callout>

      </div>
    </SlideLayout>
  );
}
