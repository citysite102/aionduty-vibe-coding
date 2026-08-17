import { Filter } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 第二層。這一層最容易被跳過，因為不寫它也能跑，只是會變成每一次都插手，
 * 然後你會開始覺得 Hook 很煩、想把它關掉。
 *
 * 上面那一行是設定檔裡真正的寫法，下面的膠囊是那一行的結果：哪幾個過得去。
 * 一行設定加一排結果，比一句「範圍要收窄」看得懂。
 *
 * 最後那一段是真的發生過：原本那條 hook 沒有限定資料夾，結果擋掉一支必須拿
 * 破折號當比對樣式的工具腳本，一連擋三次。學員記不住抽象的原則，記得住這種事。
 */
const TOOLS = [
  { name: 'Read', keep: false },
  { name: 'Bash', keep: false },
  { name: 'Write', keep: true },
  { name: 'Edit', keep: true },
  { name: 'WebFetch', keep: false },
];

export const meta: RecordedMeta = {
  id: 'harness-65-hook-matcher',
  title: '第二層：只留你要管的那一次',
  script:
    '第二層是範圍。時機到了，這一輪它可能在讀檔案、可能在跑指令、也可能在寫檔案，範圍那一行決定哪幾種你要管。畫面上那一行就是實際的寫法，用直線隔開你要管的工具，下面那排是它的結果：寫檔案跟改檔案會被檢查，讀東西跟查網頁完全不會被打擾。這一層不寫也能跑，所以最容易被跳過，代價是它每一次都插手，然後你會開始覺得 Hook 很煩、想把它關掉。範圍也不是越大越好。這條 hook 原本沒有限定資料夾，結果連我們自己那支必須拿破折號當比對樣式的工具腳本都被擋下來，一連擋了三次。後來把範圍收到只管投影片那一區才解決。',
  seconds: 45,
};

export default function RecHookMatcher() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 2: Matcher" icon={Filter}>
      <RecPage className="space-y-5" handbook={1}>
        <SeriesRail {...HOOK_RAIL} current={1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            時機到了，<Key>還要挑這一次管不管</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['時機到了', '看它在用哪個工具', '只留這幾個']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 font-mono text-lg text-orange-300">
            matcher: Write|Edit|MultiEdit
          </div>
          <div className="px-6 py-5 flex flex-wrap gap-3">
            {TOOLS.map((t) => (
              <span
                key={t.name}
                className={`rounded-xl border px-4 py-2 font-mono text-lg ${
                  t.keep
                    ? 'border-sky-500/40 bg-sky-500/10 text-sky-200'
                    : 'border-slate-800 bg-slate-900 text-slate-600'
                }`}
              >
                {t.keep ? '✓ ' : '✗ '}
                {t.name}
              </span>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            範圍開太大會擋到不該擋的。這條原本沒限定資料夾，連我們自己的工具腳本都被擋了三次。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
