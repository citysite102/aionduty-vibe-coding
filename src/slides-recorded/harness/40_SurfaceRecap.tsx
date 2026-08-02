import { Repeat } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SurfaceRail } from './_SurfaceRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-40-surface-recap',
  title: '這三個地方，共同點是什麼？',
  script:
    '三個地方吃的是同一份規範，差別只在權限範圍，不在你要怎麼寫手冊。所以你手上那份 CLAUDE.md 寫一次，三個地方都用得上。想驗證的話，回去做一件事就好：把你已經寫好的 CLAUDE.md 內容貼進 Claude Projects 的指令欄，開一個新對話，丟同一句需求進去，看它是不是照著同樣的規矩回答。',
  seconds: 40,
  from: 72,
};

export default function RecSurfaceRecap() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={Repeat}>
      <div className="max-w-4xl mx-auto pt-2">
        <SurfaceRail active={0} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">手冊寫一次，三個地方都能用</p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            差別只在權限範圍，不在你要怎麼寫手冊。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-5"
        >
          <div className="text-sky-400 text-lg font-bold mb-3">回去做這件事</div>
          <p className="text-slate-300 text-xl leading-relaxed">
            把你寫好的 CLAUDE.md 貼進 Claude Projects 的指令欄，丟同一句需求，看它會不會照做。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
