import { AppWindow, BarChart3, MousePointerClick, FolderOpen } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo } from '../components/BrandLogos';
import { PixelArt } from '../components/PixelArt';

/**
 * 這一頁的圖原本畫的是終端機的啟動畫面，但主線走的是桌面版，等於拿另一個外殼的圖
 * 解釋學員手上的外殼，說明寫得再清楚都隔一層。現在換成桌面版 Code 頁籤的真實版面。
 *
 * 換圖之後標註也跟著改，因為兩個版本的資訊擺法剛好相反：終端機是狀態在上、輸入在下；
 * 桌面版上面那一大塊是用量統計，真正的狀態（開哪個資料夾、用哪個模型）貼在輸入框旁邊。
 * 照舊圖那組「上面是狀態」講下去會講錯。
 *
 * 數字刻意用初學者規模（12 場對話、5 天），不是照抄截圖上的真實用量。
 * 那些數字對學員沒有教學價值，數字大反而會嚇到人。專案名也換成這門課的 mission-timer，
 * 學員才對得上自己的畫面。
 *
 * 顏色照抄真實畫面，這是 A-1 對這一頁的規定：學員要拿它對照自己的螢幕，改色反而是錯的。
 * 所以 mockup 裡走的是 hex 的 inline 值（跟舊版一樣），不進 Tailwind 色階，也不影響色相驗收。
 */

/** 貢獻熱區。'.' 是沒用的那天，1 到 3 是活動量，由淺到深。每列都是 28 格。 */
const HEATMAP = [
  '.....................1.2221.',
  '....................12321221',
  '.....................223321.',
  '.....................132321.',
  '......................23221.',
  '....................1223212.',
  '...................11.2.121.',
] as const;

const HEAT: Record<string, string> = {
  '.': '#2b2b2b',
  '1': '#a8c1f2',
  '2': '#7c9fe8',
  '3': '#4f7fd0',
};

const STATS: [string, string][] = [
  ['Sessions', '12'],
  ['Messages', '340'],
  ['Total tokens', '2.4M'],
  ['Active days', '5'],
  ['Current streak', '2d'],
  ['Longest streak', '3d'],
  ['Peak hour', '10 PM'],
  ['Favorite model', 'Opus 5'],
];

/** 輸入框右上角那隻小生物。純裝飾，但它在真實畫面上就在那裡。 */
const PX_CRAB = [
  '.XX.....XX.',
  '.XXXXXXXXX.',
  'XXXXXXXXXXX',
  'XX.XXXXX.XX',
  'XXXXXXXXXXX',
  'XXXXXXXXXXX',
  'X.X.....X.X',
  '.X.......X.',
] as const;

export default function SlideClaudeCodeUI() {
  return (
    <SlideLayout
      title="打開之後，你只需要動最下面那一條"
      subtitle="Claude Code Desktop"
      icon={AppWindow}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">

        {/* 左欄：說明 */}
        <div className="lg:col-span-5 flex flex-col space-y-3 text-left">
          <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
            第一次打開會看到一大片東西，
            <strong className="text-slate-100">那些幾乎都是資訊，不是要你回答的問題</strong>。
            真正要你動的只有最下面那一條，以及貼在它旁邊的兩個設定。
          </AnimatedBlock>

          <AnimatedBlock
            stepIndex={2}
            className="flex gap-3 items-start bg-slate-900 p-4 rounded-xl border border-slate-800"
          >
            <div className="p-1.5 bg-slate-800 text-slate-400 rounded shrink-0">
              <BarChart3 size={14} />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-slate-100">上面那一大塊：用量統計</h4>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                你用了幾次、花掉多少 token、最常用哪個模型。
                <strong className="text-slate-300">跟你要做的事沒關係，看過就好。</strong>
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock
            stepIndex={3}
            className="flex gap-3 items-start bg-slate-900 p-4 rounded-xl border border-slate-800"
          >
            <div className="p-1.5 bg-slate-800 text-slate-400 rounded shrink-0">
              <FolderOpen size={14} />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-slate-100">輸入框旁邊那幾個小標籤</h4>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                左邊是它現在打開的資料夾，右邊是用哪個模型。
                <strong className="text-slate-300">開工前先看資料夾對不對</strong>，它只會在那個範圍裡讀寫。
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock
            stepIndex={4}
            className="flex gap-3 items-start bg-sky-500/5 p-4 rounded-xl border border-sky-500/25"
          >
            <div className="p-1.5 bg-sky-500/10 text-sky-400 rounded shrink-0">
              <MousePointerClick size={14} />
            </div>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-sky-300">最下面那一條：你要動的地方</h4>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                整個畫面只有這裡要你輸入。上面那一整片都可以先跳過。
              </p>
            </div>
          </AnimatedBlock>

          <Callout tone="focus" stepIndex={5}>
            那一條寫著 <span className="font-mono text-slate-300">Describe a task or ask a question</span>，
            <strong className="text-slate-100">它在等你講話，不是在等程式碼</strong>。
            直接打中文就可以：「幫我看看這個專案要怎麼跑起來」。
          </Callout>
        </div>

        {/* 右欄：桌面版 Code 頁籤的真實版面。底色比 slate 暖，照抄真實畫面 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatedBlock
            stepIndex={2}
            className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-full min-h-[460px] text-left"
          >
            <div className="bg-[#1a1a19] flex-1 flex flex-col px-6 py-5">

              {/* 問候列 */}
              <div className="flex items-start justify-between mb-5 shrink-0">
                <div className="flex items-center gap-2.5 text-[#d97757]">
                  <BrandLogo brand="claude" size={20} />
                  <span className="text-slate-100 text-lg font-bold">What's up next, Samuel?</span>
                </div>
                <span className="text-slate-500 text-xs mt-1.5 shrink-0">What's new</span>
              </div>

              {/* 用量統計面板。這一整塊就是左邊第一條標註在講的東西 */}
              <div className="rounded-xl bg-[#232322] p-3 shrink-0">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-md bg-[#3a3a38] px-2 py-1 text-slate-100">Overview</span>
                    <span className="px-1 text-slate-500">Models</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-md bg-[#3a3a38] px-2 py-1 text-slate-100">All</span>
                    <span className="text-slate-500">30d</span>
                    <span className="text-slate-500">7d</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 mb-2.5">
                  {STATS.map(([label, value]) => (
                    <div key={label} className="rounded-lg bg-[#2c2c2b] px-2 py-1.5 min-w-0">
                      <div className="text-slate-500 text-xs truncate">{label}</div>
                      <div className="text-slate-100 text-sm font-bold truncate">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-[3px] mb-2">
                  {HEATMAP.map((row, y) => (
                    <div key={row} className="flex gap-[3px]">
                      {[...row].map((c, x) => (
                        <span
                          key={`${y}-${x}`}
                          className="flex-1 aspect-square rounded-[2px]"
                          style={{ backgroundColor: HEAT[c] }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="text-slate-500 text-xs">
                  You've used ~11&times; more tokens than The Great Gatsby.
                </div>
              </div>

              {/* 中間本來就是空的，這一段留白是真實畫面的一部分 */}
              <div className="flex-1 min-h-[1.5rem]" />

              {/* 底部：資料夾標籤、輸入框、模型設定 */}
              <div className="shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="rounded-lg bg-[#232322] px-2.5 py-1 text-xs text-slate-300">Local</span>
                  <span className="rounded-lg bg-[#232322] px-2.5 py-1 text-xs text-slate-300">
                    mission-timer
                  </span>
                  <span className="rounded-lg bg-[#232322] px-2 py-1 text-xs text-slate-500">+</span>
                  <PixelArt grid={PX_CRAB} size={22} className="ml-auto text-[#d97757]" />
                </div>

                <div className="rounded-xl bg-[#232322] border border-[#3a3a38] px-3 py-2.5 flex items-center justify-between gap-3">
                  <span className="text-slate-500 text-sm truncate">
                    Describe a task or ask a question
                  </span>
                  <span className="text-slate-600 text-sm shrink-0">&crarr;</span>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                  <span>Auto &nbsp;+&nbsp; &#127908;</span>
                  <span className="flex items-center gap-2">
                    <span className="text-slate-300">Opus 5</span>
                    <span className="text-slate-300">High</span>
                    <span className="inline-block h-2.5 w-2.5 rounded-full border border-slate-600" />
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#131312] border-t border-slate-800 px-4 py-2 text-xs text-slate-600 flex justify-between gap-3">
              <span className="truncate">桌面版 Code 頁籤，數字是示意</span>
              <span className="shrink-0">
                官方文件:{' '}
                <a
                  href="https://code.claude.com/docs/en/overview"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  code.claude.com
                </a>
              </span>
            </div>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
