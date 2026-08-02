import { Signpost } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const ROUTES = [
  ['會出事的', '交給 Hook 或 CI'],
  ['只在某一區適用的', '分到子目錄'],
  ['有固定步驟的', '寫成 Skill 或指令'],
  ['剩下的', '才寫進根目錄那份'],
];

export const meta: RecordedMeta = {
  id: 'harness-50-recap-three',
  title: '這一段你完成了哪三件事？',
  script:
    '第三件，你知道一條規則該送到哪裡。會出事的交給 Hook 或 CI，用程式擋，不經過 AI 的判斷；只在某一區適用的分到子目錄，碰到才載入；有固定步驟的寫成 Skill 或指令；剩下的才寫進根目錄那一份。這四個去處合起來的效果是，根目錄那份會一直維持在你唸得完的長度。',
  seconds: 38,
  from: 76,
};

export default function RecRecapThree() {
  return (
    <SlideLayout title={meta.title} subtitle="Module 2 Recap" icon={Signpost}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <div className="text-slate-500 text-base font-mono mb-3">第 3 件，共 3 件</div>
          <p className="text-slate-100 text-4xl font-bold leading-snug">知道一條規則該送到哪裡</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-3">
          {ROUTES.map(([cond, dest]) => (
            <div key={cond} className="flex items-baseline gap-5">
              <span className="text-slate-400 text-xl shrink-0 w-44">{cond}</span>
              <span className="text-sky-300 text-xl font-bold">{dest}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            合起來的效果是，根目錄那份會維持在你唸得完的長度。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
