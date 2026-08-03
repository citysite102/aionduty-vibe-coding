import { HelpCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { TransferRail } from './_TransferRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const TRAITS = ['重複發生', '有你自己的規矩', '每次都要重講一遍'];

export const meta: RecordedMeta = {
  id: 'harness-41-transfer-case',
  title: '換成你的工作，手冊該寫什麼？',
  script:
    '換一個完全不是程式的工作試試看。情境是這樣：你每週要把三場會議的逐字稿整理成一份紀錄，寄給同一群人。這件事跟程式無關，但它符合前面所有條件，重複發生、有你自己的規矩、每次都要重講一遍。如果要交給 Claude 做，你的手冊會寫什麼？先自己想三十秒，再看下一頁。',
  seconds: 38,
  from: 75,
};

export default function RecTransferCase() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={HelpCircle}>
      <RecPage className="space-y-6">
        <TransferRail active={1} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-slate-500 text-base font-mono mb-3">情境</div>
          <p className="text-slate-300 text-2xl leading-snug">
            你每週要把三場會議的逐字稿整理成一份紀錄，寄給同一群人。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">交給 Claude 做，你的手冊會寫什麼？</p>
          <p className="text-slate-500 text-lg leading-relaxed mt-4">先自己想三十秒，再往下看。</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex flex-wrap gap-3">
          {TRAITS.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-800 bg-slate-900 px-5 py-2 text-slate-400 text-lg"
            >
              {t}
            </span>
          ))}
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
