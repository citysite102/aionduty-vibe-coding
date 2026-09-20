import { Repeat2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { AskFirst } from '../../components/AskFirst';
import { ProposalDraft } from './_ProposalDraft';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-42-transfer-q1',
  title: '每次都要重講的，寫進根目錄手冊',
  script:
    '第三題：哪些事情你每次都要重講一次？以提案來說，就是分哪幾段、公司簡介用哪一版、語氣要多正式。這三件事你想的時候會覺得太瑣碎、不值得寫，但正因為瑣碎，你每次都會重講一遍。一寫下來，手冊就補齊了。往後不用再講一次，它每一輪都讀得到；真的沒照做，你也有一條可以指。',
  seconds: 36,
  from: 75,
};

export default function RecTransferQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Repeat2}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-500 text-base font-mono mb-3">第 3 題，共 3 題</div>
          <p className="text-slate-200 text-2xl leading-snug mb-4">哪些事情你每次都要重講一次？</p>
          <AskFirst />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">這些是<Key>手冊最後補上的那一批</Key></p>
        </AnimatedBlock>

        <ProposalDraft stage={3} stepIndex={3} />
      </RecPage>
    </SlideLayout>
  );
}
