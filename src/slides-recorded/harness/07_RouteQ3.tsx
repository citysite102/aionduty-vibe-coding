import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { AskFirst } from './_AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-07-route-q3',
  title: '規則放哪：有固定步驟，寫成 Skill',
  script:
    '第三個問題：這條規則有固定步驟，而且只有做某件事的時候才用到嗎？如果是，寫成一個 Skill。平常只載名稱，讓它知道有這個東西，真的要跑那套流程的時候才展開全文。像是每週報表的固定產製步驟，這種有頭有尾、但不是每次都用到的流程，就屬於這一層。',
  seconds: 32,
  from: 69,
};

export default function RecRouteQ3() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ListChecks}>
      <RecPage handbook={1}>
        <SeriesRail {...ROUTE_RAIL} current={2} revealAt={2} />
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>

            <div className="border-l-2 border-slate-700 pl-5 mb-6">
              <p className="text-slate-300 text-2xl leading-snug">有固定步驟，用到才需要？</p>
            </div>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">寫成一個 Skill</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              平常只載名稱，讓它知道有這個東西。真的要跑那套流程時，才展開全文。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">每週報表的固定產製步驟</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
