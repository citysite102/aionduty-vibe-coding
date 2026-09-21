import { AlertTriangle, ArrowRight, MessageSquareCode, MessageSquare, Globe, SquareTerminal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本整片是終端機：模擬 zsh 跑 npm run dev，噴一個 React 專案的 vite build error。
 *
 * 但學員走到這裡還沒裝終端機（那在選修那一段），手上只有桌面版跟一個
 * index.html，不可能產生那種錯。等於拿一個他這堂課不會遇到的錯當範例。
 *
 * 換成他真的會撞到的：叫 Claude Code 做事，它跑的指令失敗，紅字就印在對話裡。
 * 這個桌面版跟終端機都成立，跟前一頁「終端機只是其中一個介面」的立場一致。
 *
 * 2026-09-21 重排教學順序，三件事：
 *
 * 1. 先教「認出來」，再教「它會自己修」。原本假對話四行一次全出現，
 *    最後一行就是它自己說要改，等於第一拍就把「你可以不用管」講掉了，
 *    學員還沒學會認紅字就先學會忽略它。現在前三行是第 2 拍（只認位置），
 *    第四行是第 3 拍（它自己接下去修）。**不要把這兩拍併回去。**
 *
 * 2. 換你出手的判準原本是「它連續試了兩三次還在同一個地方繞」。
 *    「繞」是講者才懂的說法，學員盯著畫面判斷不出來什麼叫繞。
 *    改成數得出來的：同一段紅字出現第三次。紅字沒變代表它沒找到那個點。
 *
 * 3. 三個位置原本是純文字條列。它要講的是「三個地方長得不一樣，動作一樣」，
 *    那是視覺的事，條列講不出來，所以改成三個示意畫面，紅色那一行的位置
 *    在三個畫面裡都標出來。示意畫面裡的錯誤訊息是編的範例，不是真的截圖。
 */
const HABITS = [
  {
    title: '不要盲目亂改',
    body: '還沒搞懂哪裡出事之前，不要跑去動其他地方。改到後來會變成兩個問題疊在一起。',
  },
  {
    title: '整段複製，不要只抓一句',
    body: '紅字通常有好幾行，有用的資訊常常在最後一行或路徑那一段。你判斷不出哪句重要，就整段給它。',
  },
];

const PLACES = [
  {
    icon: MessageSquare,
    name: 'Claude Code 的對話裡',
    when: '它跑指令失敗的時候。這是你現在最常看到的。',
    chrome: '● Bash(npm install)',
    red: 'npm ERR! 404 Not Found',
  },
  {
    icon: Globe,
    name: '瀏覽器的 Console',
    when: '網頁打開怪怪的時候。按 F12（Mac 是 Cmd + Opt + I），點 Console。',
    chrome: 'Elements   Console   Network',
    red: "Uncaught TypeError: 讀不到 'name'",
  },
  {
    icon: SquareTerminal,
    name: '終端機',
    when: '你自己在跑東西的時候。走完選修那一段才會用到。',
    chrome: '$ python report.py',
    red: 'FileNotFoundError: data/',
  },
];

export default function SlideError() {
  return (
    <SlideLayout title="紅字不是壞事，它在告訴你哪裡卡住" subtitle="Don't Panic" icon={AlertTriangle}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          它做事的時候會自己跑指令，跑失敗就把錯誤訊息印出來，那幾行是紅色的。
          <strong className="text-slate-100">你先只要認得出哪一行是紅字就好</strong>，不用看懂它在說什麼。
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 items-start">

          <div className="space-y-4">
            <AnimatedBlock stepIndex={2} className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5">
              <div className="text-sm font-bold text-rose-300 mb-3">紅字長這樣</div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm space-y-2.5">
                <div className="text-slate-400">
                  <span className="text-slate-600">你 </span>
                  幫我看看這個資料夾裡有什麼
                </div>
                <div className="text-slate-500">
                  <span className="text-slate-600">● </span>
                  Bash(ls my-projcet)
                </div>
                <div className="rounded border border-rose-500/25 bg-rose-950/20 px-3 py-2 text-rose-300 leading-relaxed">
                  ls: my-projcet: No such file or directory
                </div>

                <AnimatedBlock stepIndex={3} className="text-slate-500 leading-relaxed">
                  <span className="text-slate-600">● </span>
                  資料夾名稱好像拼錯了，我改成 my-project 再試一次。
                </AnimatedBlock>
              </div>
            </AnimatedBlock>

            <AnimatedBlock stepIndex={3} as="p" className="text-slate-400 text-sm leading-relaxed px-1">
              多數時候它自己就接下去修了，你只要看著。
              <strong className="text-slate-200">同一段紅字出現第三次</strong>，才輪到你出手。
            </AnimatedBlock>
          </div>

          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
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

        <Callout tone="focus" label="同一件事會出現在三個地方，長得不一樣" stepIndex={5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {PLACES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.name} className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/60 px-3 py-2">
                    <Icon size={13} className="text-slate-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-200 leading-tight">{p.name}</span>
                  </div>
                  <div className="p-3 font-mono text-xs space-y-1.5">
                    <div className="truncate text-slate-600">{p.chrome}</div>
                    <div className="rounded border border-rose-500/25 bg-rose-950/20 px-2 py-1 text-rose-300 leading-relaxed">
                      {p.red}
                    </div>
                  </div>
                  <p className="border-t border-slate-800 px-3 py-2 text-xs leading-relaxed text-slate-500">
                    {p.when}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-slate-400">
            三個畫面長得不一樣，紅色那一行的意思一樣，
            <strong className="text-slate-200">你要做的也一樣：整段複製，貼回對話框。</strong>
          </p>
        </Callout>

      </div>
    </SlideLayout>
  );
}
