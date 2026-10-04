import { PenLine } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-04 調到 16b_WritePractice 後面（講師）。學員已經自己改過一條了，
 * 所以這一頁的職務從「示範怎麼改」變成「我這邊改出來長這樣，給你對照」。
 * 開場與收尾都照 D-6b 留了退路：你改出來的不會跟我一樣。
 * 判斷標準那一句不再重講，上一頁剛說過。
 */
export const meta: RecordedMeta = {
  id: 'harness-57-handbook-v4',
  title: '手冊 v4：把「畫面要好看」改成驗得了',
  script:
    '換我這邊也改一條給你對照。這是計時器那份示範手冊，畫面那一區剩下最後一條沒處理：畫面要好看，風格保持一致。寫的時候大概覺得講得很清楚，但它無法判定，做完了它自己也不知道有沒有達成，你也沒辦法指著結果說它違規。我把心裡的標準寫出來，這一版換成背景固定一個色碼，強調色只用一種，其他一律灰階。你那一條改出來不會跟我一樣，要看的是它有沒有變成數得出來的。',
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
            改法是把心裡的標準寫出來。你那一條改出來不會跟我一樣，要看的是它有沒有變成數得出來的。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
