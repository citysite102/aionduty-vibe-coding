import { ClipboardCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HealthRail } from './_HealthRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-17-health-overview',
  title: '手冊越寫越肥，怎麼整理？',
  script:
    '手冊越寫越長是正常的，每加一條當下都有理由。所以需要一套固定的整理流程，建議每三個月跑一次，或是在你發現它又沒照做的時候跑一次。流程有五步：盤點、減法、分流、加法、修剪。順序不能換，最重要的是減法一定要排在分流前面，先刪再搬。順序反了，你會把本來該刪掉的規則搬到別的地方，繼續佔著空間。',
  seconds: 44,
  from: 69,
};

export default function RecHealthOverview() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ClipboardCheck}>
      <div className="max-w-4xl mx-auto pt-2">
        <HealthRail active={0} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">五個步驟，順序不能換</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-3">
          {[
            ['1　盤點', '找出每一條規則的來由'],
            ['2　減法', '刪掉已經不需要的'],
            ['3　分流', '把留下來的送到該去的地方'],
            ['4　加法', '這時候才補新規則'],
            ['5　修剪', '把句子改成可以檢查的'],
          ].map(([n, d]) => (
            <div key={n} className="flex items-baseline gap-6">
              <span className="text-sky-400 font-bold text-xl font-mono shrink-0 w-24">{n}</span>
              <span className="text-slate-300 text-xl">{d}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-5 bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-4">
          <p className="text-slate-300 text-xl leading-relaxed">先刪再搬，順序反了就會把該刪的搬到別處，繼續佔著空間。</p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
