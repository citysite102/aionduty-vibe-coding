import { GitFork } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/** 這一頁把三個問題跟四個去處接起來，是整段唯一同時用到兩套判斷的地方。 */
const MAP = [
  { line: '前三行', q: '第 1 題', to: '根目錄手冊', why: '每次都要重講的格式', hard: false },
  { line: '第四行', q: '第 2 題', to: 'Hook', why: '外洩代價太高，文字擋不住', hard: true },
  { line: '第五行', q: '第 3 題', to: '子目錄', why: '只跟某個客戶有關', hard: false },
];

export const meta: RecordedMeta = {
  id: 'harness-46-transfer-mapping',
  title: '這五行，各自該用什麼方式擋',
  script:
    '前三行來自第一題，是你每次都要重講的格式，留在根目錄那份就好。第四行來自第二題，但它不該只寫在手冊裡，成本外洩的代價太高，光靠文字擋不住，要加一道 Hook，在檔案要寄出去之前擋下來。第五行來自第三題，各客戶的專屬格式分到子目錄，用到那個客戶的時候才讀，這份手冊才不會越長越肥。所以三個問題不只幫你想內容，也順便決定了每一條該用什麼方式擋。',
  seconds: 42,
  from: 75,
};

export default function RecTransferMapping() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={GitFork}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          {MAP.map((m) => (
            <div
              key={m.line}
              className={`grid grid-cols-[auto_auto_1fr] items-baseline gap-5 px-6 py-4 border-b border-slate-800/70 last:border-0 ${
                m.hard ? 'bg-amber-950/15' : ''
              }`}
            >
              <span className="font-mono text-lg text-slate-500 w-20">{m.line}</span>
              <span className="text-slate-600 text-base w-20">{m.q}</span>
              <div>
                <span className={`text-xl font-bold ${m.hard ? 'text-amber-300' : 'text-sky-300'}`}>{m.to}</span>
                <span className="text-slate-500 text-lg ml-4">{m.why}</span>
              </div>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="px-1">
          <p className="text-slate-300 text-2xl font-bold leading-snug">
            三個問題不只幫你想內容，也<Key>決定了每一條該用什麼方式擋</Key>
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
