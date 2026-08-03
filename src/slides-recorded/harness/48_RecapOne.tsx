import { CheckCircle2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一段唯一的收尾頁。三件事橫排、產出與講義收在底下，一頁講完。
 * 三欄用等高卡片，序號放在標題左邊而不是上面，垂直節奏才不會被切斷。
 */
const DONE = [
  { n: '1', t: '一份會被讀到的手冊', d: '重點在後半句。你用 /context 親眼確認過它在載入清單裡。' },
  { n: '2', t: '沒照做時知道先查哪裡', d: '不是急著再加一條，是先分辨它屬於哪一種失敗。' },
  { n: '3', t: '知道規則該送去哪', d: '四題問完，它自己會落到 Hook、子目錄、Skill 或根目錄。' },
];

const HANDOUTS = ['CLAUDE.md 模板', '規則分流判斷卡', '五步健檢表', '錯誤訊息對照表'];

export const meta: RecordedMeta = {
  id: 'harness-48-recap',
  title: '這一段你完成了三件事',
  script:
    '這一段你完成了三件事。第一，你寫出一份會被讀到的手冊，重點在後半句，你不是寫完就算了，你用斜線 context 親眼確認過它在載入清單裡。第二，它沒照做的時候你知道要先查哪裡，不是急著再加一條，而是先分辨它屬於哪一種失敗。第三，你知道一條規則該送去哪，四題問完它自己會落到 Hook、子目錄、Skill 或根目錄。而這三件事最後都收在同一個地方：你的專案資料夾裡多了一個 CLAUDE.md，它跟著專案走，換一台電腦、隔三個月回來都還在。回去要用的四份講義在課程網站的 handouts 底下。',
  seconds: 45,
  from: 76,
};

export default function RecRecap() {
  return (
    <SlideLayout title={meta.title} subtitle="What You Walked Away With" icon={CheckCircle2}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="grid grid-cols-3 gap-4 items-stretch">
          {DONE.map((x) => (
            <div key={x.n} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 flex flex-col">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-mono text-lg font-bold text-sky-400">{x.n}</span>
                <h3 className="text-slate-100 text-xl font-bold leading-snug">{x.t}</h3>
              </div>
              <p className="text-slate-400 text-base leading-relaxed mt-auto pt-3 border-t border-slate-800">
                {x.d}
              </p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-2xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-950 px-7 py-5"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            三件事都收在同一個地方：你的專案資料夾裡多了一個{' '}
            <span className="font-mono text-slate-100">CLAUDE.md</span>。
            <Key>它跟著專案走</Key>，換一台電腦、隔三個月回來都還在。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="flex flex-wrap items-center gap-2.5 px-1">
          <span className="text-slate-500 text-base font-mono mr-2">講義在課程網站 handouts 底下</span>
          {HANDOUTS.map((h) => (
            <span key={h} className="rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-slate-400 text-base">
              {h}
            </span>
          ))}
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
