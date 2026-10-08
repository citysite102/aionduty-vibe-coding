import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { ArrowRight } from 'lucide-react';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import { CaseHandbook } from '../components/CaseHandbook';
import tokyoLoopShot from '../../assets/cases/case-02-tokyo-loop.jpg';

const ROUTE = [
  { label: '起點', text: '一個空資料夾、十張你自己選的照片，以及一張寫下十個時刻各自長什麼樣的表。照片可以是你自己拍的任何一個地方的一天，題目不必是東京' },
  { label: '過程', text: '先決定每件事交給套件還是自己算，再依序疊上資料、背景、照片、介面與面板' },
  { label: '產出', text: '一個捲動穿越的照片藝廊，以及一張換個專案還用得到的選型判斷表' },
];

/** 兩段原本是整段文字，2026-10-08（講師）改成看得出步驟的小流程：每一條都是
 *  「拿什麼 → 算什麼 → 得到什麼」，最後一格上 sky，因為那一格才是「算出來的」那個結果。
 *  **兩塊都走同一套灰階加一格 sky，不要一塊一色**：它們是同一個原則的兩個例子，不是對照（A-1）。
 *  步驟文字就是原本句子裡的關鍵詞，改文案的時候兩邊一起看，不要讓 note 重複講一次步驟。 */
const CALC = [
  {
    title: '顏色是量出來的，不是挑出來的',
    steps: ['照片縮小', '每個點加起來', '平均色與最暗色', '只調明度，色相不動'],
    note: '改一行資料就換一段視覺，不用去動畫面。',
  },
  {
    title: '文字什麼時候翻成深色，也是算出來的',
    steps: ['量背景亮度', '低於門檻', '整層反色'],
    note: '跟著一天的時間自己切換。整份樣式只有一組變數在換，沒有第二套樣式表。',
  },
];

export default function SlideCase2TokyoLoop() {
  return (
    <SlideLayout title="案例二：東京環状 24 時" subtitle="Case 02 · 捲動穿越的照片藝廊" icon={Layers}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <CaseShot
              src={tokyoLoopShot}
              alt="東京環状 24 時的畫面：中央是丸之內夜景與水面倒影，左側是 18:12 與抽出色 #AF6B30，右側是直排的場面名，整片背景是從照片抽出來的橘褐色"
              url="https://case-02-tokyo-loop.samioo.chatgpt.site/"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-5 py-4">
              <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
                這個案例要回答的問題
              </div>
              <p className="text-slate-100 text-base font-bold leading-relaxed">
                這種看起來很厲害的效果，實際上要用什麼做出來？
              </p>
            </div>

            <dl className="space-y-3">
              {ROUTE.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="w-10 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500 pt-1">
                    {r.label}
                  </dt>
                  <dd className="text-slate-300 text-sm leading-relaxed">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-3">這個作品在做的事</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            東京的一天，取十個時刻。捲動穿過它們，背景的顏色就是那張照片的顏色。
            捲到 00:40 之後接回 04:52，一天是一個環，所以捲動也沒有盡頭。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CALC.map((c) => (
              <div key={c.title} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="text-slate-100 text-sm font-bold mb-2.5">{c.title}</div>
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 mb-2.5">
                  {c.steps.map((s, i) => (
                    <span key={s} className="flex items-center gap-1.5">
                      {i > 0 && <ArrowRight aria-hidden="true" size={13} className="text-slate-600 shrink-0" />}
                      <span
                        className={`rounded-md px-2 py-1 text-sm ${
                          i === c.steps.length - 1
                            ? 'border border-sky-500/40 bg-sky-500/10 text-sky-200'
                            : 'border border-slate-800 bg-slate-900 text-slate-300'
                        }`}
                      >
                        {s}
                      </span>
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <Callout tone="warn" label="這個案例有兩個終點" stepIndex={3}>
          手冊做到倒數第二步，照片、字體與套件全部來自三個外部網站，其中一個掛掉，整個作品不會啟動。
          自己練習沒問題，對外就不行。任何要拿出去的東西都一樣：外部來源在你控制不到的地方。
          <strong className="text-slate-100">最後一步專門在做這件事</strong>：把三個外部來源收回自己的專案，
          加上打包步驟，真機測過、效能量過，做完才算可以當正式版的起點。
        </Callout>

        <AnimatedBlock stepIndex={4}>
          <CaseHandbook
            file="case-02-tokyo-loop.pdf"
            title="東京環状 24 時：捲動穿越的 3D 藝廊"
            hours="約 8.6 小時"
          />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
