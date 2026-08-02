import { Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-49-recap-two',
  title: '這一段你完成了哪三件事？',
  script:
    '第二件，你知道它沒照做的時候要先查哪裡。順序是固定的：先看那條規則有沒有被載入，再看它在整份手冊裡的份量夠不夠，最後才看句子本身寫得能不能判定。這個順序重要的地方在於，它擋掉了最常見的反射動作。多數人一發現沒照做就急著再加一條規則，結果手冊越來越長，遵循度反而更低。',
  seconds: 40,
  from: 76,
};

export default function RecRecapTwo() {
  return (
    <SlideLayout title={meta.title} subtitle="Module 2 Recap" icon={Search}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-3">第 2 件，共 3 件</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">知道它沒照做時要先查哪裡</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-4">
          {['有沒有被載入', '份量夠不夠', '句子能不能判定'].map((s, i) => (
            <div key={s} className="flex items-baseline gap-5">
              <span className="text-sky-400 font-bold text-xl font-mono shrink-0">{i + 1}</span>
              <span className="text-slate-300 text-xl">{s}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            不要一發現沒照做就急著再加一條。手冊越長，遵循度越低。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
