import { ShieldX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RouteRail } from './_RouteRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-05-route-q1',
  title: '這條規則該放哪？',
  script:
    '拿到一條規則，照順序問四個問題，第一個答是的，就是它該去的地方。第一個問題：違反了會出事，絕對不能發生嗎？如果是，交給 Hook 或 CI。它們在 context 外面跑，是程式在擋，不經過 AI 的判斷。Hook 擋你這台機器，CI 擋整個團隊。像是不能把密碼或金鑰寫進程式碼裡，這種就屬於這一層。',
  seconds: 38,
  from: 69,
};

export default function RecRouteQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ShieldX}>
      <RecPage>
        <RouteRail active={1} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">依序要問的第 1 題，共 4 題</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-slate-300 text-2xl leading-snug">違反了會出事，絕對不能發生？</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">交給 Hook 或 CI</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            它們在 context 外面跑，是程式在擋，不經過 AI 的判斷。Hook 擋你這台機器，CI 擋整個團隊。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">不能把密碼或金鑰寫進程式碼裡</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
