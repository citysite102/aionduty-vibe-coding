import { ClipboardCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { PairTable } from './_PairTable';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-17-health-overview',
  title: '手冊健檢：五個步驟',
  script:
    '手冊越寫越長是正常的，每加一條當下都有理由。所以需要一套固定的整理流程，建議每三個月跑一次，或是在你發現它又沒照做的時候跑一次。流程有五步：盤點、減法、分流、加法、修剪。順序不能換，最重要的是減法一定要排在分流前面，先刪再搬。順序反了，你會把本來該刪掉的規則搬到別的地方，繼續佔著空間。',
  seconds: 44,
  from: 69,
};

const STEPS: [string, string][] = [
  ['1　盤點', '找出每一條規則的來由'],
  ['2　減法', '刪掉已經不需要的'],
  ['3　分流', '把留下來的送到該去的地方'],
  ['4　加法', '這時候才補新規則'],
  ['5　修剪', '把句子改成可以檢查的'],
];

export default function RecHealthOverview() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ClipboardCheck}>
      <RecPage handbook={2}>
        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">五個步驟，<Key>順序不能換</Key></p>
        </AnimatedBlock>

        {/* 上方流程軌已經列出五個步驟，這裡不再加表頭，只補分隔線把配對框起來 */}
        <PairTable
          stepIndex={2}
          ratio="narrow"
          density="compact"
          rows={STEPS.map(([n, d]) => [
            <span className="font-mono font-bold text-sky-400">{n}</span>,
            d,
          ])}
        />

        <AnimatedBlock stepIndex={3} className="mt-5 border rounded-2xl px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-xl leading-relaxed">先刪再搬，順序反了就會把該刪的搬到別處，繼續佔著空間。</p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
