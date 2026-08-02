import { Sparkles } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HealthRail } from './_HealthRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-22-health-rest',
  title: '手冊越寫越肥，怎麼整理？',
  script:
    '最後三步很快。第三步分流，就是前面講過的那四個問題，會出事的交給機制，只在某一區適用的分出去。第四步加法，這時候才補新規則，而且要補在正確的位置，不要一律往根目錄堆。第五步修剪，把要優雅這種句子改寫成可以檢查的敘述。修剪的具體做法是下一段的主題，我們會講六個寫規則的技巧。',
  seconds: 42,
  from: 69,
};

export default function RecHealthRest() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Sparkles}>
      <div className="max-w-4xl mx-auto pt-2">
        <HealthRail active={[3, 4, 5]} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">剩下三步，你已經學過兩步</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-4">
          {[
            ['3　分流', '就是前面那四個問題。會出事的交給機制，只在某一區的分出去。'],
            ['4　加法', '這時候才補新規則，而且補在正確的位置，不要一律往根目錄堆。'],
            ['5　修剪', '把「要優雅」這種改寫成可以檢查的句子。下一段專門講怎麼寫。'],
          ].map(([n, d]) => (
            <div key={n} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5 flex gap-6 items-baseline">
              <span className="text-sky-400 font-bold text-xl font-mono shrink-0 w-24">{n}</span>
              <p className="text-slate-400 text-lg leading-relaxed">{d}</p>
            </div>
          ))}
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
