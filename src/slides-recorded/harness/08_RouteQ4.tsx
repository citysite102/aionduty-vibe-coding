import { FileText } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { AskFirst } from '../../components/AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-08-route-q4',
  title: '規則放哪：以上皆非，才進根目錄',
  script:
    '第四個問題：如果前面三個都答不是，而且這件事每一輪都要記得，這時候才寫進根目錄。根目錄的 CLAUDE.md 是最後一站，不是預設選項。很多人一拿到規則就往這裡塞，檔案才會越寫越肥。像是按鈕文案的用字習慣、檔案怎麼命名，這種才適合放這裡。',
  seconds: 38,
  from: 69,
};

export default function RecRouteQ4() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={FileText}>
      <RecPage>
        <SeriesRail {...ROUTE_RAIL} current={3} revealAt={2} />
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>

            <p className="text-slate-300 text-2xl leading-snug mb-6">以上皆非，而且每一輪都要記得？</p>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">這時候才寫進根目錄</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              根目錄的 CLAUDE.md 是最後一站，不是預設選項。前面三個問題都答不是，才輪到它。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">按鈕文案的用字習慣、檔案怎麼命名</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
