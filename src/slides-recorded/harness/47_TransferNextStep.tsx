import { PencilRuler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

const STEPS = [
  '挑一件你這個月重複做過三次以上的事',
  '照三個問題各寫一句，先不要求完整',
  '下次做同一件事時把它貼上去，缺什麼再補',
];

export const meta: RecordedMeta = {
  id: 'harness-47-transfer-next-step',
  title: '換成你自己的工作，怎麼開始？',
  script:
    '這三個問題跟你用哪個工具無關，換成別的 AI、換成完全不同的工作，要問的還是這三題。所以回去之後可以這樣開始：挑一件你這個月重複做過三次以上的事，照三個問題各寫一句，先不要求完整。下次再做同一件事的時候把它貼上去，缺什麼再補。第一份手冊三行就可以上場，不用等它寫完整。',
  seconds: 40,
  from: 75,
};

export default function RecTransferNextStep() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={PencilRuler}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl leading-snug">
            換別的 AI、換完全不同的工作，要問的還是這三題。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-baseline gap-5">
              <span className="text-sky-400 font-bold text-xl font-mono shrink-0">{i + 1}</span>
              <span className="text-slate-300 text-xl leading-relaxed">{s}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">第一份三行就可以上場</p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
