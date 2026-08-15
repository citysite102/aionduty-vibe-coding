import { Repeat2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { AskFirst } from '../../components/AskFirst';
import { ProposalDraft } from './_ProposalDraft';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-42-transfer-q1',
  title: '先問哪三題：每次都要重講的',
  script:
    '第一題：哪些事情你每次都要重講一次？以提案來說，就是分哪幾段、公司簡介用哪一版、語氣要多正式。這三件事一寫下來，你的手冊就有前三行了。往後不用再講，它每次都看得到。',
  seconds: 36,
  from: 75,
};

export default function RecTransferQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Repeat2}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-500 text-base font-mono mb-3">第 1 題，共 3 題</div>
          <p className="text-slate-200 text-2xl leading-snug mb-4 border-l-2 border-slate-700 pl-5">哪些事情你每次都要重講一次？</p>
          <AskFirst />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">這些是<Key>手冊的第一批內容</Key></p>
        </AnimatedBlock>

        <ProposalDraft stage={1} stepIndex={3} />
      </RecPage>
    </SlideLayout>
  );
}
