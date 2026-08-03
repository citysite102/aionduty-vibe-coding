import { FolderCog } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SurfaceRail } from './_SurfaceRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-33-surface-intro',
  title: '換個地方用，觀念要重學嗎？',
  script:
    '那換到另外兩個地方，前面學的要重學嗎？不用。手冊怎麼寫、分層怎麼分、規則該放哪，這三個地方都成立。會變的只有兩件事：它碰得到哪些檔案，以及它能不能自己動手。接下來就用這兩個問題，一個一個看過去，你會發現差別都落在權限，不在你要怎麼寫手冊。',
  seconds: 38,
  from: 72,
};

export default function RecSurfaceIntro() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={FolderCog}>
      <RecPage>
        <SurfaceRail active={0} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">不用，會變的只有兩件事</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-4">
          <div className="flex items-baseline gap-5">
            <span className="text-sky-400 font-bold text-xl font-mono shrink-0">1</span>
            <span className="text-slate-300 text-xl">它碰得到哪些檔案</span>
          </div>
          <div className="flex items-baseline gap-5">
            <span className="text-sky-400 font-bold text-xl font-mono shrink-0">2</span>
            <span className="text-slate-300 text-xl">它能不能自己動手</span>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-5 text-slate-500 text-lg leading-relaxed px-1">
          接下來就用這兩個問題，一個一個看過去。
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
