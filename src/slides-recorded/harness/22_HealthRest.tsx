import { Sparkles } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-22-health-rest',
  title: '手冊健檢：剩下三步',
  script:
    '最後三步很快。第三步分流，就是前面那四個問題，會出事的交給機制，只在某一區的分出去。第四步才輪到加法，這個順序值得停一下：發現手冊沒生效的時候，多數人的第一個動作就是再加一條，健檢刻意把加法排在後面。第五步修剪，把要優雅這種句子改寫成可以檢查的敘述，具體做法是下一段的主題。',
  seconds: 44,
  from: 69,
};

export default function RecHealthRest() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Sparkles}>
      <RecPage handbook={2}>
        <AnimatedBlock stepIndex={1} className="mb-6">
          {/*
            大字位置給的是主張，不是進度。原本寫「剩下三步，你已經學過兩步」，
            那是在安撫學員而不是教東西，而且不精確（分流也是前面講過的）。
            這一頁真正反直覺的是加法的排序：手冊沒生效時，多數人的第一反應是再加一條。
          */}
          <p className="text-slate-300 text-4xl font-bold leading-snug">剩下三步，<Key>加法排在第四，不是第一</Key></p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-4">
          {[
            ['3　分流', '就是前面那四個問題。會出事的交給機制，只在某一區的分出去。'],
            ['4　加法', '這時候才補新規則，而且補在正確的位置，不要一律往根目錄堆。'],
            ['5　修剪', '把「要優雅」這種改寫成可以檢查的句子。'],
          ].map(([n, d]) => (
            <div key={n} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5 flex gap-6 items-baseline">
              <span className="text-sky-400 font-bold text-xl font-mono shrink-0 w-24">{n}</span>
              <p className="text-slate-400 text-lg leading-relaxed">{d}</p>
            </div>
          ))}
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
