import { SlidersHorizontal, Eye, Fence } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本是一個 3x3 的互動矩陣：兩個滑桿選出九種模式，每種有一個自創名字
 * （安全觀察員、貼身實習生、要先報備的系統管理員⋯），還附 speed 15 / risk 0 這類
 * 編出來的數值長條。三個問題：
 *
 *   1. 那九種在產品裡不存在，下一頁講的四種權限模式才是真的，學員得先忘掉這一頁。
 *   2. 九個自創比喻，D-2 明確禁的那一類。
 *   3. 速度與風險的數字是編的，D-2 禁的編造量化數據，還畫成長條圖。
 *
 * 留下來的是它唯一有效的東西：兩個軸各自獨立。那個觀念下一頁用得到，
 * 因為四種權限模式就是這兩軸上的幾個檔位。矩陣與數值全部拿掉，改成靜態兩欄。
 */
const DIALS = [
  {
    icon: Eye,
    n: '旋鈕一',
    name: '監督程度',
    en: 'How often it asks',
    question: '它每做一件事，要不要先問過你？',
    ends: ['每一步都停下來等你按同意', '整段做完才回報'],
    cost: '這個旋鈕決定你要花多少時間盯著它。',
    tone: 'sky' as const,
  },
  {
    icon: Fence,
    n: '旋鈕二',
    name: '邊界大小',
    en: 'How far it can reach',
    question: '它碰得到的範圍有多大？',
    ends: ['只能讀，不能改任何東西', '能改整台電腦、能裝東西'],
    cost: '這個旋鈕決定它做錯的時候，最壞會壞到什麼程度。',
    tone: 'indigo' as const,
  },
];

const TONES = {
  sky: {
    card: 'bg-slate-900 border-sky-900/50',
    icon: 'bg-sky-500/10 text-sky-400',
    label: 'text-sky-300',
    bar: 'from-sky-500/60',
  },
  indigo: {
    card: 'bg-slate-900 border-indigo-900/50',
    icon: 'bg-indigo-500/10 text-indigo-400',
    label: 'text-indigo-300',
    bar: 'from-indigo-500/60',
  },
};

export default function SlideCheatDials() {
  return (
    <SlideLayout title="監督與邊界" subtitle="Two Independent Dials" icon={SlidersHorizontal}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          「放手讓它跑，會不會把我的東西改壞？」這件事你可以調，而且
          <strong className="text-slate-100">有兩個旋鈕可以轉，它們各自獨立</strong>。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DIALS.map((d, i) => {
            const Icon = d.icon;
            const t = TONES[d.tone];
            return (
              <AnimatedBlock
                key={d.name}
                stepIndex={i + 2}
                className={`rounded-2xl border p-5 ${t.card}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.icon}`}>
                    <Icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-xs font-mono text-slate-500">{d.n}</span>
                      <span className={`text-lg font-bold ${t.label}`}>{d.name}</span>
                    </div>
                    <div className="font-mono text-xs text-slate-600">{d.en}</div>
                  </div>
                </div>

                <p className="text-slate-200 text-base leading-relaxed mb-4">{d.question}</p>

                {/* 兩端只標文字，不給刻度也不給數字：中間有幾格是下一頁的事 */}
                <div className={`h-1 rounded-full bg-gradient-to-r ${t.bar} to-slate-800 mb-2`} />
                <div className="flex justify-between gap-4 text-sm text-slate-400 leading-snug mb-3">
                  <span className="max-w-[45%]">{d.ends[0]}</span>
                  <span className="max-w-[45%] text-right">{d.ends[1]}</span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-800 pt-3">
                  {d.cost}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <div className="text-base font-bold text-slate-100 mb-2">兩個是分開的，不會一起動</div>
          <p className="text-slate-400 text-sm leading-relaxed">
            權限開很大、但每一步都問你，這樣可以。權限縮到最小、然後完全放手，這樣也可以。
            <strong className="text-slate-300">還不熟的時候建議選後面那種</strong>，
            因為就算它整段跑歪，能壞的也就那一個資料夾。
            要小心的是兩個旋鈕都轉到底：權限全開，又懶得看它做了什麼。
          </p>
        </AnimatedBlock>

        <Callout tone="focus" label="怎麼決定要轉到哪" stepIndex={5}>
          回到前面那條判準：<strong className="text-slate-100">你驗得動多少，就放多少。</strong>
          看得懂它改了什麼，監督那個旋鈕就可以往右轉。
          不會檢查的話，就把邊界縮小，讓它做錯了你也賠得起。
        </Callout>

      </div>
    </SlideLayout>
  );
}
