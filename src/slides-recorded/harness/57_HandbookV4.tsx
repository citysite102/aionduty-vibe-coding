import { PenLine } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-57-handbook-v4',
  title: '最後一條，改寫成看得出有沒有做到',
  script:
    '剩下畫面那一區的最後一條。畫面要好看，風格保持一致，你寫的時候大概覺得講得很清楚，但它無法判定，做完了它自己也不知道有沒有達成，你也沒辦法指著結果說它違規。改寫的方法是把你心裡的標準寫出來，這一版換成背景固定一個色碼，強調色只用一種，其他一律灰階。',
  seconds: 32,
  from: 70,
};

export default function RecHandbookV4() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={PenLine}>
      <RecPage className="space-y-4" handbook={4}>
        <HandbookState stepIndex={1} version={4} />

        <AnimatedBlock stepIndex={2} className="px-1 space-y-2.5">
          <p className="text-slate-300 text-xl leading-relaxed">
            「畫面要好看、風格保持一致」它無法判定，
            <Key>做完了它自己也不知道有沒有達成</Key>，你也沒辦法指著結果說它違規。
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            改法是把你心裡的標準寫出來。判斷標準只有一句：只看做出來的東西，你能不能回答「有做到」或「沒做到」。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
