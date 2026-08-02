import { ClipboardList } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-14-write-example',
  title: '規則要怎麼寫？',
  script:
    '第四個技巧：給一個範例，勝過三行描述。你寫中文請避免中國大陸慣用詞，聽起來很清楚，但它跟你對哪些字算的認知不一樣。改成附一張對照表，一鍵改成依實際操作描述、上手改成熟悉、技術棧改成技術堆疊，它就有具體樣本可以比對。這一招對風格類、語氣類的規則特別有效，因為那種標準本來就很難用文字描述。',
  seconds: 40,
  from: 70,
};

export default function RecWrite4() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It" icon={ClipboardList}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-2">技巧 4 / 6</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">給一個範例，勝過三行描述</p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="「中文寫作請避免使用中國大陸的慣用詞。」"
          badNote="它跟你對「哪些算」的認知不一樣。"
          good="附一張對照表：一鍵改成依實際操作描述、上手改成熟悉、技術棧改成技術堆疊。"
          goodNote="有具體樣本可以比對，它就不用猜你的標準。"
        />
      </div>
    </SlideLayout>
  );
}
