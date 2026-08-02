import { ArrowRightLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-25-why-diff',
  title: '有手冊跟沒手冊，差在哪？',
  script:
    '兩邊的差別不在它變聰明了，是你的要求換了一個存放的位置。沒有手冊的時候，你的規矩存在這次對話裡，對話關掉就沒了，下一輪要重講一次。寫進 CLAUDE.md 之後，規矩存在這個專案裡，每一次新對話都從同一個起點開始。這就是 CLAUDE.md 在做的事，把你的要求從這次對話搬到這個專案。',
  seconds: 38,
  from: 55,
};

export default function RecWhyDiff() {
  return (
    <SlideLayout title={meta.title} subtitle="Why a Handbook" icon={ArrowRightLeft}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-2">對照 3 / 3</div>
          <p className="text-slate-300 text-2xl leading-snug">差別不在它變聰明，在你的要求存在哪裡</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-4">
          <div className="flex items-baseline gap-5">
            <span className="text-slate-500 text-lg shrink-0 w-32">存在對話裡</span>
            <span className="text-slate-400 text-xl">關掉就沒了，下一輪重講一次</span>
          </div>
          <div className="flex items-baseline gap-5">
            <span className="text-sky-400 text-lg font-bold shrink-0 w-32">存在專案裡</span>
            <span className="text-slate-300 text-xl">每次新對話都從同一個起點開始</span>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">
            把你的要求從這次對話，搬到這個專案
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
