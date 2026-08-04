import { MessagesSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Callout } from '../../components/Callout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-39b-why-not-new-chat',
  title: '為什麼不直接開新對話就好？',
  script:
    '有人會問，我每次開新對話把規矩貼一次不就好了，何必弄一個專案。差別在兩件事。第一，你會漏。貼了三次之後就會少貼一條，而且是哪一條漏了你不會察覺。第二，貼在對話裡的東西會被稀釋，對話一長，前面交代的設定會被後面的內容蓋過去。放在指令欄的規矩不一樣，它每一輪都在，不會被推走。這跟終端機那邊根目錄的 CLAUDE.md 每一輪都載入，是同一個機制。',
  seconds: 42,
  from: 72,
};

export default function RecWhyNotNewChat() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={MessagesSquare}>
      {/* 這一頁跟前面幾頁一樣不掛 SurfaceRail，收尾頁才把三個地方一起收回來 */}
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-4xl font-bold leading-snug">貼在對話裡的會被推走，<Key>寫在設定裡的不會</Key></p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5">
          <div className="text-slate-500 text-base font-mono mb-2">每次開新對話重貼一次</div>
          <p className="text-slate-400 text-xl leading-relaxed">
            貼到第三次就會少貼一條，而且漏了哪一條你不會察覺。
          </p>
        </AnimatedBlock>

        {/* 這一頁是正反對照，正解那側走 good：綠色加微光，不是 sky */}
        <Callout stepIndex={3} tone="good" size="rec" label="寫在指令欄">
          每一輪都在，不會被後面的內容蓋過去。跟根目錄的 CLAUDE.md 是同一個機制。
        </Callout>
      </RecPage>
    </SlideLayout>
  );
}
