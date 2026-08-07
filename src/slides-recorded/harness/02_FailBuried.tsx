import { Layers2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, FAIL_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-02-fail-buried',
  title: '規則沒生效：被埋在後面',
  script:
    '第二種情況不一樣。規則確實載入了，它就在對話裡，但檔案太長。一份三百行、六十條規則的手冊，排在最後面那幾條被遵守的機率，明顯低於排在最前面的。這不是它偷懶，而是越長的內容，每一條分到的注意力越少。一般建議一份控制在兩百行以內，原因就在這裡。判斷方式很簡單：如果你的手冊已經很長，而且沒照做的都是後面那幾條，多半就是這個問題。',
  seconds: 44,
  from: 68,
};

export default function RecFailBuried() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={Layers2}>
      <RecPage className="space-y-5" handbook={1}>
        <SeriesRail {...FAIL_RAIL} current={1} />
        <AnimatedBlock className="mb-6">
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            因為它排在三百行的後面，<Key>份量不夠</Key>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono">
          <div className="space-y-2 text-lg">
            <div className="text-slate-200">第 3 行　　禁用 inline style</div>
            <div className="text-slate-400">第 47 行　按鈕文案用航太語彙</div>
            <div className="text-slate-600">第 218 行　倒數分鐘數要集中成設定</div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-slate-500 text-base">
            同一份檔案裡，位置不同，份量就不同
          </div>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="border rounded-2xl p-6 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 如果沒照做的都是後面那幾條，多半就是這個問題。一般建議一份控制在 200 行以內。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
