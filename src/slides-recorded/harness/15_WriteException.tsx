import { GitBranch } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { DontDo } from './_DontDo';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-15-write-exception',
  title: '規則要怎麼寫？',
  script:
    '第五個技巧：寫出例外。規則寫得越絕對，它套得越死。你寫禁止使用常駐的無限動畫，它可能連該有的載入指示也一起拿掉，然後你要回頭一條一條解釋。正確的寫法是把例外一起寫進去：禁止常駐的無限動畫，例外是真的要表達系統正在運轉的時候，全頁最多留一組，而且必須慢速、低對比。把邊界講完整，它才知道分寸在哪。',
  seconds: 42,
  from: 70,
};

export default function RecWrite5() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It" icon={GitBranch}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-2">技巧 5 / 6</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">寫出例外，它才不會硬套</p>
        </AnimatedBlock>

        <DontDo
          stepFrom={2}
          bad="「禁止使用常駐的無限動畫。」"
          badNote="它會連該有的載入指示也一起拿掉，然後你得回頭解釋。"
          good="「禁止常駐的無限動畫。例外：真的要表達系統正在運轉時，全頁最多留一組，且必須慢速、低對比。」"
          goodNote="把邊界講完整，它才知道分寸在哪。"
        />
      </RecPage>
    </SlideLayout>
  );
}
