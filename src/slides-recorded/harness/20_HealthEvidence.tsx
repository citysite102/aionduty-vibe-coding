import { Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 原本三張純文字卡，一張一種證據。但這一頁真正要教的是一個判斷動作：
 * 三格裡湊得出兩格才動手刪。卡片排下來看不出那個「兩格」，
 * 所以改成三個帶方框的格子，每格是一個要回答的問題，下面掛那條門檻。
 *
 * 方框不做成可點的（A-4：不要留不可點的裝飾性按鈕，也不要在預錄頁放互動），
 * 它是印在紙上那種待勾的格子，學員自己拿自己的手冊對。
 */
const EVIDENCE = [
  { n: '現場', ask: '最近的對話裡，它真的違反過這條嗎？', note: '從來沒違反過，可能是在防一個不存在的問題' },
  { n: '機制', ask: '這件事已經有 Hook 或 lint 在擋嗎？', note: '有的話，文字版是重複的' },
  { n: '時效', ask: '規則綁的那個資料夾、流程還在嗎？', note: '專案改過名字，規則常常沒跟著改' },
];

export const meta: RecordedMeta = {
  id: 'harness-20-health-evidence',
  title: '手冊健檢：湊得出兩種證據才刪',
  script:
    '憑印象刪會刪錯，所以要有證據。三種。第一種現場證據：最近的對話裡，它真的違反過這條嗎？從來沒違反過的規則，可能是在防一個不存在的問題。第二種機制證據：這件事是不是已經有 Hook 或 lint 在擋？有的話文字版就是重複的。第三種時效證據：規則綁的那個資料夾、流程還在嗎？專案改過名字，規則常常沒跟著改。三格裡至少要湊得出兩格，才動手刪。',
  seconds: 42,
  from: 69,
};

export default function RecHealthEvidence() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Scale}>
      <RecPage className="space-y-5">
        <SeriesRail {...HEALTH_RAIL} current={1} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            憑印象刪會刪錯，<Key>三格裡要湊得出兩格</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-3 gap-4">
          {EVIDENCE.map((e) => (
            <div key={e.n} className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 flex flex-col">
              <div className="flex items-center gap-2.5 mb-2.5">
                {/* 待勾的格子。印在紙上那種，不是按鈕 */}
                <span className="h-5 w-5 shrink-0 rounded border border-slate-600" />
                <span className="text-slate-200 text-lg font-bold">{e.n}</span>
              </div>
              <p className="text-slate-300 text-base leading-relaxed">{e.ask}</p>
              <p className="text-slate-500 text-base leading-relaxed mt-2 pt-2 border-t border-slate-800">
                {e.note}
              </p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={3}
          className="rounded-2xl border px-7 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            勾到兩格才動手刪。只勾到一格的，先不要刪。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
