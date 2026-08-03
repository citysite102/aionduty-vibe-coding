import { Scissors } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-16-write-one-thing',
  title: '規則怎麼寫：一次只講一件',
  script:
    '最後一個技巧：一條規則只講一件事。把三件事寫成一句，看起來很精簡，但它做到兩件漏掉一件的時候，你只會覺得這條規則沒用。拆成三條各自獨立，你才分得出來是哪一條沒做到，也才知道要改哪一條。這一點跟前面的可檢查性是同一件事：規則要能被單獨驗證，才有意義。',
  seconds: 36,
  from: 70,
};

export default function RecWrite6() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It" icon={Scissors}>
      <RecPage className="space-y-6" handbook={3}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-4xl font-bold leading-snug"><Key>一條規則只講一件事</Key></p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="「元件放 src/components/，嚴禁 inline style，並且一律使用 TypeScript。」"
          badNote="它做到兩件、漏掉一件，你會以為整條都沒遵守。"
          good="拆成三條，各自獨立一行。"
          goodNote="能分開檢查，才知道是哪一條沒做到。"
        />

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 這六個技巧不只適用 CLAUDE.md。任何你要交代給 AI 的規範都一樣，包括接下來要看的網頁版工具。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
