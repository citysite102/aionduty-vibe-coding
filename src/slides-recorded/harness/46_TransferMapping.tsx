import { GitFork } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/** 這一頁把三個問題跟四個去處接起來，是整段唯一同時用到兩套判斷的地方。 */
/*
 * 左欄原本寫「前三行、第四行、第五行」，但畫面上那份檔案連標題一共六行，
 * 所以第四行其實是第五列，數字對不上。行數也會隨內容變，B-3 講的就是這種寫法。
 * 改成用題號指，那個號碼在前三頁一直亮著，讀者接得回去。
 */
const MAP = [
  { line: '第 1 題', q: '那三條', to: '根目錄手冊', why: '每次都要重講的格式', hard: false },
  { line: '第 2 題', q: '那一條', to: 'Hook', why: '外洩代價太高，文字擋不住', hard: true },
  { line: '第 3 題', q: '那一條', to: '子目錄', why: '只跟某個客戶有關', hard: false },
];

export const meta: RecordedMeta = {
  id: 'harness-46-transfer-mapping',
  title: '這幾條，各自該用什麼方式擋',
  script:
    '第一題答出來那三條，是你每次都要重講的格式，留在根目錄那份就好。第二題那一條不該只寫在手冊裡，成本外洩的代價太高，光靠文字擋不住，要加一道 Hook，在檔案要寄出去之前擋下來。第三題那一條，各客戶的專屬格式分到子目錄，用到那個客戶的時候才讀，這份手冊才不會越長越肥。所以三個問題問完，內容有了，每一條該用什麼方式擋也一起決定了。',
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
