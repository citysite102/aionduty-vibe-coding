import { Minus } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-19-health-subtract',
  title: '手冊健檢：先刪再搬',
  script:
    '第二步是減法。這一步最容易被跳過，因為刪東西比加東西難決定。但順序很重要：一定要先刪再搬。如果你先分流再減法，會把本來該刪掉的規則搬到子目錄，然後它在那裡繼續佔著空間，下次健檢又要再處理一次。打問號的那幾條，用下一頁的三種證據來判斷。',
  seconds: 40,
  from: 69,
};

export default function RecHealthSubtract() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Minus}>
      <RecPage>
        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug"><Key>先刪再搬</Key>，順序不要反</p>
        </AnimatedBlock>

        {/* 口白說「這一步最容易被跳過，因為刪東西比加東西難決定」，畫面上原本沒有這句 */}
        <AnimatedBlock stepIndex={2} className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            這一步最容易被跳過，因為刪東西比加東西難決定。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            ⚠️ 如果先分流再減法，你會把本來該刪的規則搬到子目錄，然後在那裡繼續佔著空間，下次健檢又要處理一次。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
