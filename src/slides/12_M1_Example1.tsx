import { useState } from 'react';
import { Layout, Check, Terminal, Lightbulb, Rocket } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { SpaceCanvas, PLANETS, type PlanetKey } from '../components/SpaceCanvas';

const PLANET_ORDER: PlanetKey[] = ['earth', 'mars', 'moon', 'jupiter', 'saturn'];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")";

const PROMPT =
  '請開一個 mission-timer 資料夾，在裡面建立一個單頁的任務計時器，一個 index.html 就好。';

export default function SlideExample1() {
  const [planet, setPlanet] = useState<PlanetKey>('earth');

  return (
    <SlideLayout title="做出你的第一個作品" subtitle="Example 1: Mission Timer" icon={Layout}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-start min-h-full">

        <div className="flex flex-col space-y-6">
          <AnimatedBlock stepIndex={1}>
            <h3 className="text-2xl font-bold text-sky-400 mb-4 flex items-center gap-3">
              <Lightbulb size={24} className="text-sky-400" />
              先做一個任務計時器
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              說穿了就是番茄鐘，只是換成太空任務的樣子。你不用看得懂 HTML 或 CSS，把想要什麼講清楚就好。
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              這個作品不是做完就丟。接下來整門課都會回頭改它，最後把它放上網路，你會拿到一個可以傳給別人的網址。
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              前面那個五分鐘計時器只是試跑，可以放著不管。正式的作品另外開一個資料夾，
              叫 <code className="font-mono text-slate-400">mission-timer</code>，整門課都會回頭改它。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl relative mt-4">
            <div className="absolute top-0 left-6 -translate-y-1/2 bg-slate-800 px-3 py-1 rounded-md text-slate-300 text-xs font-mono border border-slate-700 flex items-center gap-2">
              <Terminal size={14} /> Prompt
            </div>

            <p className="text-slate-100 leading-relaxed font-medium text-sm mb-2">「{PROMPT}」</p>
            <CopyAction text={PROMPT} className="mb-3" />

            <div className="space-y-2.5 text-[13px] leading-relaxed">
              <div>
                <div className="text-slate-500 text-[11px] font-bold mb-1">畫面</div>
                <ul className="text-slate-300 space-y-1 list-disc pl-4 marker:text-slate-600">
                  <li>25 分鐘倒數，等寬字體，放大置中</li>
                  <li>三個按鈕：<strong className="text-sky-300">發射、待機、返航</strong>。只有「發射」是實心主色，其他保持灰階</li>
                  <li>一條細進度條，一艘小火箭沿著進度往前移動</li>
                </ul>
              </div>
              <div>
                <div className="text-slate-500 text-[11px] font-bold mb-1">背景：從軌道上看星球</div>
                <ul className="text-slate-300 space-y-1 list-disc pl-4 marker:text-slate-600">
                  <li>星球用 canvas 畫成<strong className="text-amber-300">經緯排列的粒子點陣</strong>，只露出畫面下方一道弧</li>
                  <li>光源在左上。受光面亮、背面暗，<strong className="text-amber-300">越靠近輪廓的粒子要越亮</strong>，做出邊緣光</li>
                  <li>地平線外緣加一圈大氣輝光</li>
                  <li>星星座標固定寫死，重繪時不可以跳動</li>
                </ul>
              </div>
              <p className="text-amber-300 font-bold pt-1">不要引用任何外部圖片。</p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-950/50 border border-slate-800 rounded-xl px-5 py-4 space-y-2.5">
            <p className="text-slate-400 text-xs leading-relaxed">
              <strong className="text-slate-200">別期待一次就長成右邊那樣。</strong>
              右邊那張圖不是第一次就長這樣：第一版星球太亮蓋住按鈕，第二版粒子排太密，疊出一圈一圈的干擾波紋，第三版才換成經緯排列。
              <strong className="text-slate-300">寫得越具體，需要的來回就越少，但不會變成零。</strong>
            </p>
            <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-800 pt-2.5">
              🖼️ 心裡已經有畫面的話，把參考圖一起拖進終端機貼給它。
            </p>
          </AnimatedBlock>
        </div>

        <div className="flex flex-col gap-6 pt-8 lg:pt-0">
          <AnimatedBlock
            stepIndex={3}
            className="relative w-full h-[420px] shrink-0 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#04060C]"
          >
            {/* 星塵與粒子星球 */}
            <SpaceCanvas planet={planet} />

            {/* 顆粒感：抵銷數位漸層的塑膠味 */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay z-10"
              style={{ opacity: 0.4, backgroundImage: GRAIN }}
            />

            {/* 瀏覽器視窗示意 */}
            <div className="absolute top-4 left-4 flex gap-2 z-30">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            </div>

            {/* 目的地切換 */}
            <div className="absolute top-3.5 right-4 flex gap-1 z-30">
              {PLANET_ORDER.map(key => (
                <button
                  key={key}
                  onClick={() => setPlanet(key)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                    planet === key
                      ? 'bg-slate-100/90 text-slate-900 border-slate-100/90'
                      : 'bg-slate-950/50 text-slate-400 border-slate-700/70 hover:text-slate-200 hover:border-slate-500'
                  }`}
                >
                  {PLANETS[key].label}
                </button>
              ))}
            </div>

            {/* 計時器介面 */}
            <div
              className="relative z-20 h-full flex flex-col items-center justify-center gap-7 px-10 pb-24"
              style={{ filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.7))' }}
            >
              <div className="text-[64px] leading-none font-mono font-bold text-slate-100 tabular-nums tracking-widest">
                17:42
              </div>

              <div className="w-full max-w-[280px]">
                <div className="relative h-[2px] bg-slate-700/60 rounded-full">
                  <div className="absolute left-0 top-0 h-[2px] bg-sky-400/70 rounded-full" style={{ width: '30%' }} />
                  <div className="absolute -top-[9px] text-sky-400" style={{ left: '30%', transform: 'translateX(-50%)' }}>
                    <Rocket size={20} className="rotate-45 fill-sky-400/20" />
                  </div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-3">
                  <span>啟程</span>
                  <span>抵達</span>
                </div>
              </div>

              <div className="flex gap-3">
                <div
                  className="glitch px-7 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-full text-sm"
                  data-text="發射"
                >
                  發射
                </div>
                <div className="px-6 py-2.5 bg-slate-900/70 text-slate-300 font-bold rounded-full text-sm border border-slate-700">待機</div>
                <div className="px-6 py-2.5 bg-slate-900/70 text-slate-300 font-bold rounded-full text-sm border border-slate-700">返航</div>
              </div>
            </div>

            {/* 產出確認 */}
            <div className="absolute bottom-0 left-0 w-full bg-slate-950/85 backdrop-blur-sm border-t border-slate-800 p-4 z-30">
              <div className="flex items-center gap-3 text-slate-300 text-sm font-bold">
                <Check size={16} /> <span>檔案已生成：index.html</span>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 space-y-2.5">
            <p className="text-slate-200 text-sm font-bold">做完之後，打開來看</p>
            <ul className="text-slate-300 text-sm leading-relaxed space-y-1 list-disc pl-4 marker:text-slate-600">
              <li>
                <code className="font-mono text-slate-400">mission-timer</code> 在你安裝那一頁選的那個資料夾裡面，
                照著建議選桌面的話，它就在桌面上
              </li>
              <li>
                Mac 在 Finder、Windows 在檔案總管打開它，
                對裡面的 <code className="font-mono text-slate-400">index.html</code> 按兩下
              </li>
            </ul>
            <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-800 pt-2.5">
              它會用你平常的瀏覽器打開，網址列是一串本機路徑，不是網站網址。這就是前面說的「在本機跑」，
              只有你這台電腦看得到。要變成可以傳給別人的網址還差一步，那一步在後面。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
