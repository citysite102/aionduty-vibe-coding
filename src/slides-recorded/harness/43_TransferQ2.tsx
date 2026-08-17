import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { AskFirst } from '../../components/AskFirst';
import { ProposalDraft } from './_ProposalDraft';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-43-transfer-q2',
  title: '先問哪三題：違反了會出事的',
  script:
    '第二題：哪些事情違反了會出事？成本結構和利潤率不能出現在給客戶的檔案裡。這一條也會進手冊，變成第四行，但它不能只有這一行。一次外洩的代價太高，光靠文字擋不住，下一頁會看到它該再加什麼。',
  seconds: 38,
  from: 75,
};

export default function RecTransferQ2() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={ShieldAlert}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-500 text-base font-mono mb-3">第 2 題，共 3 題</div>
          <p className="text-slate-200 text-2xl leading-snug mb-4">哪些事情違反了會出事？</p>
          <AskFirst />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">這些不要只寫進手冊，<Key>要找機制擋</Key></p>
        </AnimatedBlock>

        <ProposalDraft stage={2} stepIndex={3} />
      </RecPage>
    </SlideLayout>
  );
}
