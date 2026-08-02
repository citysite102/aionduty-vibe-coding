import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-48-recap-one',
  title: '這一段你完成了哪三件事？',
  script:
    '第一件，你寫出了一份會被讀到的手冊。重點在後半句：會被讀到。你不是寫完就算了，你用斜線 context 打開載入清單，親眼確認 CLAUDE.md 在裡面。這一步是整段最容易被跳過的，也是後面所有問題的起點，因為一份沒被載入的手冊，寫得再好都不會生效。',
  seconds: 36,
  from: 76,
};

export default function RecRecapOne() {
  return (
    <SlideLayout title={meta.title} subtitle="Module 2 Recap" icon={ListChecks}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-3">第 1 件，共 3 件</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">寫出一份會被讀到的手冊</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <p className="text-slate-300 text-xl leading-relaxed">
            你用 <code className="text-sky-300 font-mono">/context</code> 打開載入清單，親眼確認它在裡面。
          </p>
          <p className="text-slate-500 text-lg leading-relaxed mt-3">
            沒被載入的手冊，寫得再好都不會生效。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
