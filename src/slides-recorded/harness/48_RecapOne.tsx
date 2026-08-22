import { CheckCircle2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一段唯一的收尾頁，所以它要收的是入口那張地圖列的四個問題，一題一格。
 *
 * 原本只有三格，而且對到的是前兩題（診斷與分流）。第三題（健檢）與第四題（六個寫法）
 * 各講了六七頁，收尾卻沒有提，學員會覺得那兩段沒有結論。
 *
 * 接 M3 的那一句原本寫在 32d_M2_Recap，但那一頁被這一組頂替，不會播，
 * 所以那個橋等於掉了。搬到這裡來。
 *
 * 「講義在課程網站 handouts 底下」拿掉了：那是課務交代（D-2），
 * 而且畫面上也給不出實際網址，學員回頭翻講義的時候用不到。
 */
const DONE = [
  { n: '1', t: '沒照做時先查哪裡', d: '先分辨是哪一種，不是再加一條。' },
  { n: '2', t: '規則該送去哪', d: '四題問完，它自己會落位。' },
  { n: '3', t: '太肥了怎麼整理', d: '五步，先刪再搬。' },
  { n: '4', t: '每一條怎麼寫', d: '六個寫法，寫成看得出做到沒有。' },
];

export const meta: RecordedMeta = {
  id: 'harness-48-recap',
  title: '你完成了哪四件事',
  script:
    '入口那張地圖列了四個問題，現在四個都有答案了。它沒照做的時候，你知道先查哪裡，而不是急著再加一條。拿到一條規則，你知道該送去哪。手冊變肥的時候，你有五步可以整理，而且記得先刪再搬。每一條該怎麼寫，你有六個寫法，還有一句判準：另一個人只看結果，能不能回答有做到或沒做到。這四件事都收在同一個地方，你的專案資料夾裡多了一個 CLAUDE.md，它跟著專案走。但手冊只規範做法，沒有人檢查做出來的東西。',
  seconds: 45,
  from: 76,
};

export default function RecRecap() {
  return (
    <SlideLayout title={meta.title} subtitle="What You Walked Away With" icon={CheckCircle2}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="grid grid-cols-2 gap-4 items-stretch">
          {DONE.map((x) => (
            <div key={x.n} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5 flex flex-col">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-lg font-bold text-sky-400">{x.n}</span>
                <h3 className="text-slate-100 text-xl font-bold leading-snug">{x.t}</h3>
              </div>
              <p className="text-slate-400 text-base leading-relaxed mt-auto">{x.d}</p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-2xl border px-7 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            四件事都收在同一個地方：你的資料夾裡多了一個{' '}
            <span className="font-mono text-slate-100">CLAUDE.md</span>。<Key>它跟著專案走</Key>。
          </p>
        </AnimatedBlock>

        {/* 接 M3 的橋。原本在被頂替的那一頁裡，不搬過來就斷了 */}
        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            手冊只規範做法，不會有第二個人來檢查做出來的東西。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
