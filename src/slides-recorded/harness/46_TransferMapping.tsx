import { CornerDownRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { TransferRail } from './_TransferRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const MAP = [
  ['前兩行', '第 1 題', '你每次都要重講的格式'],
  ['第三行', '第 2 題', '但它不該只寫在這裡，要再加一道機制'],
  ['第四行', '第 3 題', '對外的規矩分出去，手冊才不會變肥'],
];

export const meta: RecordedMeta = {
  id: 'harness-46-transfer-mapping',
  title: '這四行分別從哪一題來？',
  script:
    '前兩行來自第一題，是你每次都要重講的格式。第三行來自第二題，但要注意，它其實不該只寫在這裡，個資外洩的代價太高，光靠手冊擋不住，應該再加一道機制。第四行來自第三題，把對外版本的規矩分出去，這份手冊才不會越長越肥。所以三個問題不只幫你想內容，也順便決定了每一條規矩該用什麼方式擋。',
  seconds: 42,
  from: 75,
};

export default function RecTransferMapping() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={CornerDownRight}>
      <RecPage className="space-y-5">
        <TransferRail active={3} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">每一行都追得到一個問題</p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            而且順便決定了那條規矩該用什麼方式擋。
          </p>
        </AnimatedBlock>

        {MAP.map(([line, q, note], i) => (
          <AnimatedBlock
            key={line}
            stepIndex={i + 2}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5"
          >
            <div className="flex items-baseline gap-5 mb-2">
              <span className="text-slate-200 text-xl font-bold shrink-0 w-24">{line}</span>
              <span className="text-sky-400 text-lg font-bold font-mono">{q}</span>
            </div>
            <p className="text-slate-400 text-xl leading-relaxed">{note}</p>
          </AnimatedBlock>
        ))}
      </RecPage>
    </SlideLayout>
  );
}
