import { ArrowRightLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-55-handbook-v2',
  title: '分流之後，有一條搬走了',
  script:
    '四個問題問完，不要做那一區的第一條先被篩掉了。絕對不要刪掉我的檔案，違反了會出事，這種不能只靠手冊，因為它讀到了也可能份量不夠。搬去 Hook，讓程式擋。手冊裡留一行提醒就好。',
  seconds: 30,
  from: 68,
};

export default function RecHandbookV2() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={ArrowRightLeft}>
      <RecPage className="space-y-4" handbook={2}>
        <HandbookState stepIndex={1} version={2} />

        <AnimatedBlock stepIndex={2} className="px-1 space-y-2.5">
          <p className="text-slate-300 text-xl leading-relaxed">
            「絕對不要刪掉我的檔案」這種，<Key>它讀到了，份量也可能不夠</Key>。
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            違反了會出事的，搬去 Hook 讓程式擋，手冊裡留一行提醒就好。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
