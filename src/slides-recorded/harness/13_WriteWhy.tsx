import { Lightbulb } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-13-write-why',
  title: '規則要怎麼寫？',
  script:
    '第三個技巧：寫下理由，不要只寫規則。規則永遠寫不完，一定會有你沒想到的情況。你手冊裡那條按鈕文案要用航太語彙，後面列了發射、待機、返航、補給，那出現清單以外的按鈕時，它就不知道該叫什麼了。但如果你加一句因為這是太空任務主題的計時器，它就有依據可以自己延伸。理由的價值不在當下那條規則，在你沒寫到的那些情況。',
  seconds: 42,
  from: 70,
};

export default function RecWrite3() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It" icon={Lightbulb}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-2">技巧 3 / 6</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">寫下理由，它才能推論你沒寫到的情況</p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="「按鈕文案使用航太語彙：發射、待機、返航、補給。」"
          badNote="出現清單以外的按鈕時，它不知道該叫什麼。"
          good="「按鈕文案使用航太語彙，因為這是太空任務主題的計時器。例如發射、待機、返航。」"
          goodNote="知道理由，它遇到新按鈕就能自己延伸。"
        />
      </div>
    </SlideLayout>
  );
}
