import { FileCode2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

const LINES = [
  '輸出固定四段：決議、待辦、負責人、期限',
  '待辦一定要有負責人，沒有就寫「未指定」',
  '不要寫進電話、地址這類個資',
  '對外版本的規矩另外放，見 external.md',
];

export const meta: RecordedMeta = {
  id: 'harness-45-transfer-answer',
  title: '一份可能的答案長什麼樣？',
  script:
    '照那三題問完，會議紀錄的手冊大概長這樣，只有四行。輸出固定四段：決議、待辦、負責人、期限。待辦一定要有負責人，沒有就寫「未指定」。不要寫進電話、地址這類個資。對外版本的規矩另外放，見 external.md。四行就夠了，不用寫成一份規章。下一頁看這四行分別是從哪一題來的。',
  seconds: 40,
  from: 75,
};

export default function RecTransferAnswer() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={FileCode2}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1} className="bg-slate-950 border border-slate-800 rounded-2xl px-7 py-6">
          <div className="text-slate-500 text-lg font-mono mb-4"># 會議紀錄整理規範</div>
          <div className="space-y-3">
            {LINES.map((l) => (
              <div key={l} className="text-slate-300 text-xl leading-relaxed">
                {l}
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">四行就夠了</p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
