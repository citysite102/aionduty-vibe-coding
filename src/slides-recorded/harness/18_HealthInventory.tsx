import { ListTodo } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { PairTable } from './_PairTable';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-18-health-inventory',
  title: '手冊健檢：每條規則為了什麼而加',
  script:
    '第一步是盤點。把手冊裡每一條規則抄下來，在後面標上它是為了解決哪一次的問題。像是禁用 inline style，是因為上次改版時樣式打架。有些你會想不起來，那就先打一個問號。這些打問號的規則就是下一步要處理的對象。注意這一步不做任何刪除，只是先看清楚手上有什麼。',
  seconds: 40,
  from: 69,
};

/** 右欄留空的那一列，畫面上會顯示成問號標記 */
const ROWS: [string, string][] = [
  ['禁用 inline style', '上次改版時樣式打架'],
  ['按鈕用航太語彙', ''],
];

export default function RecHealthInventory() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ListTodo}>
      <RecPage>
        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">每一條規則後面，<Key>標上它當初在解決什麼</Key></p>
        </AnimatedBlock>

        <PairTable
          stepIndex={2}
          headers={['規則', '為了解決哪一次的問題']}
          rows={ROWS.map(([rule, why]) => [
            rule,
            why || (
              <span className="inline-flex items-center rounded-md border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 font-mono font-bold text-sky-300">
                ？
              </span>
            ),
          ])}
        />

        <AnimatedBlock stepIndex={3} className="mt-5 text-slate-400 text-xl leading-relaxed px-1">
          想不起來的先打問號。這些就是下一步要處理的對象。
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
