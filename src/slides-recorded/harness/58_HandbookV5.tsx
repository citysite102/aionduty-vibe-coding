import { Copy } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-58-handbook-v5',
  title: '手冊定稿：十三行，換個介面照用',
  script:
    '這份檔案到這裡定型了。從十四行變成十三行，少掉的那一行是併回全域手冊的那一條。搬去 Hook 的那一條沒有消失，它換成一行指向 .claude/settings.json 的提醒。這一份只有十三行，是因為那個計時器就這麼大。你自己的專案跑一陣子會比它長，但不會一直長下去：長出來、整理掉、再長出來，前面那五步做的就是整理那一半。換到網頁版或桌面版，這份內容一個字都不用改。',
  seconds: 36,
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
            從十四行變成十三行。少掉的那一行併回了全域手冊；搬去 Hook 的那一條沒有消失，換成一行指向設定檔的提醒。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            換到網頁版，整份貼進指令欄；換到桌面版，綁上同一個資料夾。
            <Key>內容一個字都不用改</Key>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-sky-400 text-base font-bold mb-2">💡 自己驗一次</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            把這份貼進 Claude Projects 的指令欄，丟同一句需求，看它會不會照著同樣的規則回答。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
