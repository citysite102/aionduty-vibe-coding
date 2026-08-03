import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Callout } from './_Callout';
import { TransferRail } from './_TransferRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-43-transfer-q2',
  title: '想不出來的話，先問哪三題？',
  script:
    '第二題：哪些事情違反了會出事？以會議紀錄來說，最明顯的是不能把電話、地址這類個資寫進去。這種規矩不要只寫進手冊，因為手冊是提醒，不是防線，它讀到了也可能份量不夠。要找一個機制擋，例如寄出前跑一次檢查、或是在流程裡加一道人工確認。這就是前面規則分流的第一個問題，只是換成你的工作。',
  seconds: 42,
  from: 75,
};

export default function RecTransferQ2() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={ShieldAlert}>
      <RecPage>
        <TransferRail active={2} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <div className="text-slate-500 text-base font-mono mb-3">第 2 題，共 3 題</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-5">
            <p className="text-slate-300 text-2xl leading-snug">哪些事情違反了會出事？</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold leading-snug">這些不要只寫進手冊，要找機制擋</p>
        </AnimatedBlock>

        <Callout stepIndex={2} label="例如">
          不能把電話、地址這類個資寫進去
        </Callout>

        <AnimatedBlock stepIndex={3} className="mt-5 px-1">
          <p className="text-slate-400 text-xl leading-relaxed">手冊是提醒，不是防線。它讀到了也可能份量不夠。</p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
