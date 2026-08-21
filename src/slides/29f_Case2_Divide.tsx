import { Split } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁是成對對照：交給套件（sky）與自己算（indigo）是同一個判斷的兩邊，
 * 所以合計算一種強調色，加上下面那個 warn 剛好兩種（A-1）。
 *
 * 「離散／連續」是案例二手冊的用語，但它是第一次出現的抽象名詞，
 * 拿它當標題或當卡片的第一行，沒學過的人第一眼就卡住。
 * 所以第一眼一律給動作（交給套件／自己算），名詞降級成卡片最後一行的註記。
 */
const JOBS = [
  {
    task: '滑鼠滾一格、觸控板推一下、手指滑一段，換算成同一個數字',
    side: '離散',
    who: '交給套件',
    why: '三種裝置送出來的單位差太多，自己寫測不完',
  },
  {
    task: '開場：背景先壓暗、文字再一句一句進來',
    side: '離散',
    who: '交給套件',
    why: '有明確的起點與終點，自己寫等於再做一條時間軸出來',
  },
  {
    task: '點一張照片，它從原本的位置飛到面板上',
    side: '離散',
    who: '交給套件',
    why: '起點是它此刻在畫面上的位置，終點由版面決定，兩邊不在同一套座標裡',
  },
  {
    task: '手放開之後捲動慢慢停下來，滑得越快照片彎得越明顯',
    side: '連續',
    who: '自己算',
    why: '每一幀都在變。交給套件去補中間的過程，會得到一堆互相打架的動畫',
  },
  {
    task: '背景的顏色隨著捲動一路混過去，照片邊緣柔柔地淡掉',
    side: '連續',
    who: '自己算，交給顯示卡',
    why: '這是畫面上每一個點各自算一次的事，顯示卡本來就在做這個',
  },
];

export default function SlideCase2Divide() {
  return (
    <SlideLayout title="哪些交給套件，哪些自己算" subtitle="Case 02 · 進階的動畫效果怎麼做出來" icon={Split}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
              交給現成的套件
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">有明確的開始和結束</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              點一下展開、跑一段轉場、開場那幾樣東西的先後順序。
              這種效果別人已經寫好了，而且替你把不同裝置的差異都處理完了。
            </p>
            <p className="mt-3 border-t border-sky-500/20 pt-3 text-slate-500 text-sm">
              手冊裡把這一邊叫做「離散」
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-2">
              自己算
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">每一幀都在變，沒有終點</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              手放開之後捲動慢慢減速、滑得越快照片彎得越明顯、遠近兩層跑的速度不一樣。
              這種值一行公式就算得出來，交給套件反而會打架。
            </p>
            <p className="mt-3 border-t border-indigo-500/20 pt-3 text-slate-500 text-sm">
              手冊裡把這一邊叫做「連續」
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-4">這個作品裡的五個效果，各自是怎麼做出來的</h3>
          <ul className="space-y-2">
            {JOBS.map((j) => {
              const isDiscrete = j.side === '離散';
              return (
                <li
                  key={j.task}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-slate-100 text-sm font-bold">{j.task}</div>
                    <p className="text-slate-400 text-sm leading-relaxed mt-0.5">{j.why}</p>
                  </div>
                  <div
                    className={`shrink-0 self-start rounded-lg border px-3 py-1.5 text-xs font-mono ${
                      isDiscrete
                        ? 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                        : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                    }`}
                  >
                    {j.who}
                  </div>
                </li>
              );
            })}
          </ul>
        </AnimatedBlock>

        <Callout tone="warn" label="分錯邊的代價" stepIndex={3}>
          這種每一幀都在變的值交給套件去補，那些補出來的動畫會互相疊加、互相覆寫，畫面既延遲又會抖，
          <strong className="text-slate-100">而且不會有任何錯誤訊息</strong>，你只知道「怪怪的」。
          這個判斷在手冊的第二步就要定下來，後面每做一個效果都會再用一次。
        </Callout>

      </div>
    </SlideLayout>
  );
}
