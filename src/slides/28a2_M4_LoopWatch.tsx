import { Eye, Hand } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 上一頁給了指令，這一頁給的是「貼下去之後畫面上會發生什麼」。
 *
 * 學員對自動迴圈最大的疑問不是它怎麼寫，是「那我要幹嘛」。
 * 所以左邊是它自己跑的三輪，右邊是你出手的三個時間點，兩邊要對得上。
 *
 * 這一頁不用 sky 當內容強調色。通過與沒過本身就是一組正反對照，
 * emerald 與 rose 已經是一對，再加 sky 就變三種了。
 */
const ROUNDS = [
  {
    n: '1',
    what: '它改完 index.html，自己開瀏覽器把五題點過一次',
    pass: [1, 4, 5],
    fail: [2, 3],
    note: '第 2、3 題沒過：倒數中切換會直接接著跑，返航固定回到 25:00。',
    you: '不用動',
  },
  {
    n: '2',
    what: '它只針對第 2、3 題改，改完再驗一次五題',
    pass: [1, 2, 4, 5],
    fail: [3],
    note: '第 2 題過了，第 3 題還是回 25:00。它把「目前選的時間」記在錯的地方。',
    you: '不用動',
  },
  {
    n: '3',
    what: '五題全過，它停下來，把逐題結果貼給你',
    pass: [1, 2, 3, 4, 5],
    fail: [],
    note: '這時候才輪到你。它說全過，你自己再點一次確認。',
    you: '你上場',
  },
];

const YOUR_MOVES = [
  {
    when: '開跑前',
    what: '把上一頁那段話貼進去',
    detail: '這是你這一輪唯一一次打字。寫得越具體，後面的輪數越少。',
  },
  {
    when: '它停下來說全過時',
    what: '自己點一次，不要只看它的回報',
    detail: '它有可能「用講的」宣稱驗過了，卻沒有真的跑。前面講工具呼叫時提過這件事。',
  },
  {
    when: '跑滿 5 輪還沒全過',
    what: '換你出手，不要讓它繼續跑',
    detail: '它會停下來說卡在第幾題。這時候用前面那四招：縮小範圍、自己動手改一行、把規則寫進 CLAUDE.md，或按 Esc 重新指路。',
  },
];

function Marks({ pass, fail }: { pass: number[]; fail: number[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {[1, 2, 3, 4, 5].map((q) => {
        const failed = fail.includes(q);
        const passed = pass.includes(q);
        return (
          <span
            key={q}
            className={`inline-flex h-6 w-6 items-center justify-center rounded-md border font-mono text-xs font-bold ${
              failed
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-300'
                : passed
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-950 text-slate-600'
            }`}
          >
            {q}
          </span>
        );
      })}
    </div>
  );
}

export default function SlideLoopWatch() {
  return (
    <SlideLayout
      title="Agent 自己跑的時候，你在旁邊看什麼"
      subtitle="Watching the Loop"
      icon={Eye}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            貼下去之後，你會看到它自己重複「改一次、驗一次」。
            <strong className="text-slate-100">綠色是那一題過了，紅色是沒過。</strong>
            實際輪數會不一樣，但形狀是一樣的。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-5 items-start">
          <div className="space-y-3">
            {ROUNDS.map((r, i) => (
              <AnimatedBlock
                key={r.n}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono text-xs text-slate-600">第 {r.n} 輪</span>
                  <p className="text-slate-100 text-sm font-bold leading-snug">{r.what}</p>
                  <span
                    className={`ml-auto shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                      r.fail.length === 0
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                        : 'border-slate-800 bg-slate-950 text-slate-500'
                    }`}
                  >
                    {r.you}
                  </span>
                </div>
                <Marks pass={r.pass} fail={r.fail} />
                <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
                  {r.note}
                </p>
              </AnimatedBlock>
            ))}

            <AnimatedBlock
              stepIndex={5}
              className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4"
            >
              <p className="text-slate-400 text-sm leading-relaxed">
                第 1、2 輪你什麼都沒做，那兩輪原本是你自己要來回的。
                <strong className="text-slate-200">省下來的不是打字的時間，是坐在旁邊盯著它的時間。</strong>
                代價是那幾輪它都在花錢，所以「最多 5 輪」那一行不能省。
              </p>
            </AnimatedBlock>
          </div>

          <AnimatedBlock
            stepIndex={6}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-800">
              <Hand size={17} className="text-slate-400 shrink-0" />
              <h3 className="text-base font-bold text-slate-100">你只在這三個地方出手</h3>
            </div>

            <div className="space-y-4">
              {YOUR_MOVES.map((m, i) => (
                <div key={m.when}>
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="font-mono text-xs text-slate-600">{i + 1}</span>
                    <span className="text-xs text-slate-500">{m.when}</span>
                  </div>
                  <div className="text-slate-100 text-sm font-bold leading-snug mb-1 pl-6">{m.what}</div>
                  <p className="text-slate-400 text-sm leading-relaxed pl-6">{m.detail}</p>
                </div>
              ))}
            </div>

            <p className="text-slate-500 text-sm leading-relaxed mt-5 pt-4 border-t border-slate-800">
              這三件事都不需要你看懂程式碼。你負責的是「說清楚什麼叫做完」跟「驗收」，
              中間那幾輪才是它的工作。
            </p>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
