import { AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HealthRail } from './_HealthRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-21-health-weak-evidence',
  title: '手冊越寫越肥，怎麼整理？',
  script:
    '如果三種證據只湊得出一種，不要直接刪，你有兩個比較安全的做法。第一個是降級，把它從根目錄搬到子目錄，讓它只在相關的時候才載入，這樣它還在，但不再佔用每一輪的空間。第二個是標記觀察，在那一行後面註記今天的日期，下一輪健檢再看。刪錯規則的代價，通常比多留一條高。',
  seconds: 42,
  from: 69,
};

export default function RecHealthWeakEvidence() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={AlertTriangle}>
      <RecPage>
        <HealthRail active={2} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">證據不足的時候，不要直接刪</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <div className="text-sky-400 font-bold text-xl mb-3">降級</div>
            <p className="text-slate-400 text-lg leading-relaxed">
              從根目錄搬到子目錄，讓它只在相關的時候才載入。
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <div className="text-sky-400 font-bold text-xl mb-3">標記觀察</div>
            <p className="text-slate-400 text-lg leading-relaxed">
              在那一行後面註記日期，下一輪健檢再看。
            </p>
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
