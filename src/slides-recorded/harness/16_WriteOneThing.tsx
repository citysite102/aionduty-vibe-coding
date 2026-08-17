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
      <RecPage className="space-y-6">
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

        <AnimatedBlock stepIndex={4} className="border rounded-2xl px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 這六個技巧不限 CLAUDE.md。你交代給 AI 的任何規範都可以照這六條檢查一遍。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
