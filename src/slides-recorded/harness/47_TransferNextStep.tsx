import { Footprints } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const STEPS = [
  '挑一件你這個月重複做過三次以上的事',
  '照三個問題各寫一句，先不要求完整',
  '下次做同一件事時把它貼上去，缺什麼再補',
];

export const meta: RecordedMeta = {
  id: 'harness-47-transfer-next-step',
  title: '換成你自己的工作，怎麼開始',
  script:
    '這三個問題跟你用哪個工具無關，換成別的 AI、換成完全不同的工作，要問的還是這三題。回去之後可以這樣開始：挑一件你這個月重複做過三次以上的事，照三個問題各寫一句，先不要求完整。下次再做同一件事的時候把它貼上去，缺什麼再補。第一份三行就可以上場，不用等它寫完整。至於什麼時候該加 Skill、什麼時候該加 Hook，等你真的被同一件事絆到第二次再說，那時候你自然會知道它屬於哪一種。',
  seconds: 42,
  from: 75,
};

export default function RecTransferNextStep() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Footprints}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-3">
            換別的 AI、換完全不同的工作，要問的還是這三題。
          </p>
          <p className="text-slate-300 text-4xl font-bold leading-snug">
            第一份<Key>三行就可以上場</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-6">
          <ul className="space-y-4">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-5 text-slate-300 text-xl leading-relaxed">
                <span className="font-mono text-slate-600 shrink-0">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 什麼時候該加 Skill 或 Hook？等你被同一件事絆到第二次再說。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
