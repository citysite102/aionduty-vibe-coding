import { Repeat2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-42-transfer-q1',
  title: '想不出來的話，先問哪三題？',
  script:
    '想不出來的話，照這三個問題往下問。第一題：哪些事情你每次都要重講一次？這些就是手冊的第一批內容。以會議紀錄來說，就是輸出要分成哪幾段、待辦要不要寫負責人、收件人怎麼稱呼。這一題的來源是最前面那個問題，每次開新對話你都要重講一次規矩，把它寫下來就不用再講。',
  seconds: 38,
  from: 75,
};

export default function RecTransferQ1() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Repeat2}>
      <div className="max-w-4xl mx-auto pt-2">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">第 1 題，共 3 題</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-slate-300 text-2xl leading-snug">哪些事情你每次都要重講一次？</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">這些是手冊的第一批內容</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            寫下來就不用再講，這是手冊最原始的用途。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">輸出分成哪幾段、哪些欄位一定要有</span>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
