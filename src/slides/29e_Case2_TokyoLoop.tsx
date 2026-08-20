import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import tokyoLoopShot from '../../assets/cases/case-02-tokyo-loop.jpg';

const ROUTE = [
  { label: '起點', text: '一個空資料夾、十張你自己選的照片，以及一張寫下十個時刻各自長什麼樣的表' },
  { label: '過程', text: '先決定每件事交給套件還是自己算，再依序疊上資料、主迴圈、背景、照片、介面與面板' },
  { label: '產出', text: '一個捲動穿越的照片藝廊，以及一張換個專案還用得到的選型判斷表' },
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
            東京的一天，切成十個斷面。捲動穿過它們，背景的顏色就是那張照片的顏色。
            捲到 00:40 之後接回 04:52，一天是一個環，所以捲動也沒有盡頭。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-100 text-sm font-bold mb-1">顏色是量出來的，不是挑出來的</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                把照片縮小、逐像素累加，取出平均色與最暗的色，只依時刻調明度，色相不動。
                改一行資料就換一段視覺，不用去動畫面。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-100 text-sm font-bold mb-1">文字什麼時候翻成深色，也是算出來的</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                背景亮度低於門檻就整層反色，跟著一天的時間自己切換。整份樣式只有一組變數在換，
                沒有第二套樣式表。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <Callout tone="warn" label="這個案例有兩個終點" stepIndex={3}>
          手冊做到倒數第二步，照片、字體與套件全部來自三個外部網站，其中一個掛掉，整個作品不會啟動。
          自己練習沒問題，對外就不行。
          <strong className="text-slate-100">最後一步專門在做這件事</strong>：把三個外部來源收回自己的專案，
          加上打包步驟，真機測過、效能量過，做完才算可以當正式版的起點。
        </Callout>

      </div>
    </SlideLayout>
  );
}
