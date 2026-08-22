import { Copy } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-58-handbook-v5',
  title: '換個地方，一個字都不用改',
  script:
    '這份檔案到這裡定型了。從十四行變成十一行，少的那三行搬去了 Hook 與全域手冊。換到網頁版把它整份貼進指令欄，換到桌面版綁上同一個資料夾，內容一個字都不用改。',
  seconds: 28,
  from: 71,
};

export default function RecHandbookV5() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={Copy}>
      <RecPage className="space-y-4">
        <HandbookState stepIndex={1} version={5} />

        {/* 順序照 stepIndex 排。原本 3 寫在 2 上面，翻到第 3 步時內容會插進已經看過的那行上方，版面會跳。 */}
        <AnimatedBlock stepIndex={2} className="px-1">
          <p className="text-slate-400 text-lg leading-relaxed">
            從十四行變成十一行。少的那三行搬去了 Hook 與全域手冊。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            換到網頁版，整份貼進指令欄；換到桌面版，綁上同一個資料夾。
            <Key>內容一個字都不用改</Key>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-sky-400 text-base font-bold mb-2">💡 回去驗一次</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            把這份貼進 Claude Projects 的指令欄，丟同一句需求，看它會不會照著同樣的規矩回答。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
