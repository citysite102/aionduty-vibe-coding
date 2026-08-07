import { Scissors } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-56-handbook-v3',
  title: '健檢之後，刪掉一條',
  script:
    '五步健檢跑完，程式那一區的一律用繁體中文回答被刪了。不是它不對，是它已經寫在全域手冊裡，每個專案都適用。同一條寫在兩個地方，改的時候你只會改到其中一份。留在上面那一層就好。',
  seconds: 30,
  from: 69,
};

export default function RecHandbookV3() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={Scissors}>
      <RecPage className="space-y-4" handbook={3}>
        <HandbookState stepIndex={1} version={3} />

        <AnimatedBlock stepIndex={2} className="px-1 space-y-2.5">
          <p className="text-slate-300 text-xl leading-relaxed">
            刪掉它<Key>不是因為它寫錯了</Key>，是全域手冊裡已經有同一條，每個專案都適用。
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            同一條寫在兩個地方，之後要改的時候，你只會改到其中一份。留在上面那一層就好。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
