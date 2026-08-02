import { TerminalSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SurfaceRail } from './_SurfaceRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-36-surface-code',
  title: '這個地方能做什麼？',
  script:
    '第三個就是這堂課在用的 Claude Code，跑在終端機裡。它讀得到整個資料夾，能執行測試、操作版本控制，直接把檔案改出來，權限是三個裡面最大的。代價是它沒有圖形介面，畫面長什麼樣要你自己開瀏覽器看。這三個地方裡，只有它從頭到尾都會自動讀專案根目錄的 CLAUDE.md。',
  seconds: 38,
  from: 72,
};

export default function RecSurfaceCode() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={TerminalSquare}>
      <div className="max-w-4xl mx-auto pt-2">
        <SurfaceRail active={3} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">3 / 3　終端機</div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">整個資料夾都能讀，也能執行</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            執行測試、操作版本控制，直接把檔案改出來。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="mt-5 bg-slate-900 border border-slate-800 border-l-4 border-l-slate-600 rounded-xl px-6 py-4"
        >
          <p className="text-slate-400 text-xl leading-relaxed">
            沒有圖形介面，畫面長什麼樣要自己開瀏覽器看。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
