import { ShieldX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { AskFirst } from '../../components/AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-05-route-q1',
  title: '規則放哪：會出事的，交給 Hook',
  script:
    '第一個問題：違反了會出事，絕對不能發生嗎？如果是，交給 Hook 或 CI，就是前面看過的那兩道關卡。它們都不在對話裡，是程式在擋，不經過 AI 判斷，所以它忘不掉也繞不過。Hook 擋你這台機器，CI 擋整個團隊。像是不能把密碼或金鑰寫進程式碼裡，這種就屬於這一層。',
  seconds: 42,
  from: 69,
};

export default function RecRouteQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ShieldX}>
      <RecPage>
        <SeriesRail {...ROUTE_RAIL} current={0} revealAt={2} />

        {/* 方法（照順序問四題、第一個答是的就是答案）已經獨立成前一頁，這裡直接開題目 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-2xl leading-snug mb-6">違反了會出事，絕對不能發生？</p>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">交給 Hook 或 CI</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              這兩道關卡都不在對話裡，是程式在擋，不經過 AI 判斷，所以它忘不掉也繞不過。Hook 擋你這台機器，CI 擋整個團隊。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">不能把密碼或金鑰寫進程式碼裡</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
