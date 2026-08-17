import { GitBranch } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { AskFirst } from '../../components/AskFirst';
import { ProposalDraft } from './_ProposalDraft';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-44-transfer-q3',
  title: '先問哪三題：只有特定情況的',
  script:
    '第三題：哪些事情只有特定情況才適用？一個客戶要英文版、另一個不收 PDF，這種只跟某一個客戶有關的規矩不要全塞進同一份，不然它會越寫越肥。分到子目錄，手冊裡只留一行指過去。三題問完，這份手冊就寫好了。',
  seconds: 38,
  from: 75,
};

export default function RecTransferQ3() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={GitBranch}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-500 text-base font-mono mb-3">第 3 題，共 3 題</div>
          <p className="text-slate-200 text-2xl leading-snug mb-4">哪些事情只有特定情況才適用？</p>
          <AskFirst />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-3">
          <p className="text-slate-300 text-3xl font-bold leading-snug">這些分出去，<Key>用到的時候才讀</Key></p>
          <p className="text-slate-400 text-lg leading-relaxed">
            像是一個客戶要英文版、另一個不收 PDF。全塞進同一份，手冊只會越寫越肥。
            分到子目錄，手冊裡留一行指過去就好。
          </p>
        </AnimatedBlock>

        <ProposalDraft stage={3} stepIndex={3} />
      </RecPage>
    </SlideLayout>
  );
}
