import { Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HealthRail } from './_HealthRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-20-health-evidence',
  title: '手冊越寫越肥，怎麼整理？',
  script:
    '憑印象刪會刪錯，所以要有證據。三種：第一種是現場證據，最近的對話裡它真的違反過這條嗎？從來沒違反過的規則，可能是在防一個不存在的問題。第二種是機制證據，這件事是不是已經有 Hook、CI 或 lint 在擋？有的話文字版就是重複的。第三種是時效證據，規則綁的那個資料夾、指令、流程還在嗎？專案改過名字，規則常常沒跟著改。三種裡面至少要有兩種成立，才動手刪。',
  seconds: 45,
  from: 69,
};

export default function RecHealthEvidence() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Scale}>
      <div className="max-w-4xl mx-auto pt-2">
        <HealthRail active={2} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">刪掉之前，至少要有兩種證據</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-4">
          {[
            ['現場證據', '最近的對話裡，它真的違反過這條嗎？從來沒違反過的規則，可能是在防一個不存在的問題。'],
            ['機制證據', '這件事已經有 Hook、CI 或 lint 在擋嗎？有的話，文字版就是重複的。'],
            ['時效證據', '規則綁的那個資料夾、指令、流程還在嗎？專案改過名字，規則常常沒跟著改。'],
          ].map(([n, d]) => (
            <div key={n} className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5">
              <div className="text-sky-400 font-bold text-xl mb-2">{n}</div>
              <p className="text-slate-400 text-lg leading-relaxed">{d}</p>
            </div>
          ))}
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
