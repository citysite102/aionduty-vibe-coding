import { ArrowRightLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-12-write-latitude',
  title: '規則要怎麼寫？',
  script:
    '第二個技巧：還在摸索的時候把空間放開，已經確定的時候把規格釘死。很多人不管什麼階段都用同一種講法，一律嚴格限制，結果在自己都還不確定要什麼的時候，逼著它照錯的方向做完。探索期你該說的是，幫我試幾種做法，各寫一個簡單版本讓我看。等你確定了，再把規格寫死。同一件事，講法要跟著你的確定程度換。',
  seconds: 42,
  from: 70,
};

export default function RecWrite2() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It" icon={ArrowRightLeft}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-2">技巧 2 / 6</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">還在摸索就放開，已經確定就釘死</p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="不管什麼階段都寫「請嚴格按照規格實作，不要改動現有架構」。"
          badNote="你自己都還不確定要什麼的時候，這樣寫等於逼它照著錯的方向做完。"
          good="探索期：「幫我試幾種做法，各寫一個簡單版本讓我看。」　確定期：「照這份規格實作，不要改動現有架構。」"
          goodNote="同一件事，講法要跟著你的確定程度換。"
        />
      </RecPage>
    </SlideLayout>
  );
}
