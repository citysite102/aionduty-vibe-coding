import { ListTodo } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HealthRail } from './_HealthRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-18-health-inventory',
  title: '手冊越寫越肥，怎麼整理？',
  script:
    '第一步是盤點。把手冊裡每一條規則抄下來，在後面標上它是為了解決哪一次的問題。像是禁用 inline style，是因為上次改版時樣式打架。有些你會想不起來，那就先打一個問號。這些打問號的規則就是下一步要處理的對象。注意這一步不做任何刪除，只是先看清楚手上有什麼。',
  seconds: 40,
  from: 69,
};

export default function RecHealthInventory() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ListTodo}>
      <RecPage>
        <HealthRail active={1} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">每一條規則後面，標上它的來由</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="grid grid-cols-[1fr_1fr] gap-6 text-xl">
            <div className="text-slate-500 text-base font-mono">規則</div>
            <div className="text-slate-500 text-base font-mono">為了解決哪一次的問題</div>
            <div className="text-slate-300">禁用 inline style</div>
            <div className="text-slate-400">上次改版時樣式打架</div>
            <div className="text-slate-300">按鈕用航太語彙</div>
            <div className="text-sky-400">？</div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-5 text-slate-400 text-xl leading-relaxed px-1">
          想不起來的先打問號。這些就是下一步要處理的對象。
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
