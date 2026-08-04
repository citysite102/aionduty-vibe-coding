import { Ruler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-31-handbook-length',
  title: '一份手冊該寫多長？',
  script:
    '一份大約控制在 200 行以內。這不是硬性規定，是實務上的觀察：越長，被遵守的比例越低，因為規矩越多，每一條分到的份量就越少。所以手冊變長的時候，正確的動作不是接著往下加，是回頭整理，這也是後面「手冊越寫越肥怎麼整理」那一段要處理的事。另外，第一版不必自己從零寫，在專案裡輸入斜線 init，它會讀過你的專案再生一份草稿，你在上面改就好。',
  seconds: 44,
  from: 55,
};

export default function RecHandbookLength() {
  return (
    <SlideLayout title={meta.title} subtitle="Keep It Short" icon={Ruler}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-4xl font-bold leading-snug">一份大約 <Key>200 行以內</Key></p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            越長被遵守的比例越低。規矩越多，每一條分到的份量就越少。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <p className="text-slate-300 text-xl leading-relaxed">
            所以變長的時候，動作不是往下加，是回頭整理。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">第一版</span>
          <span className="text-slate-300 text-xl">
            用 <code className="text-sky-300 font-mono">/init</code> 生一份草稿，你在上面改
          </span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
