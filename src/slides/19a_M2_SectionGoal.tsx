import { Repeat } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const PAINS = [
  '開了新對話，它不記得你的配色',
  '你又要把那幾條規矩重貼一次',
  '一不注意，它又塞了一張外部圖片進來',
];

const GAINS = [
  '一份 CLAUDE.md，新對話自動讀，不用再重講',
  '它沒照做的時候，知道要先查哪裡',
  '知道自己一個月大概會花多少錢',
];

export default function SlideM2SectionGoal() {
  return (
    <SlideLayout title="每次開新對話，你都要重講一次規矩" subtitle="What This Module Fixes" icon={Repeat}>
      <div className="max-w-5xl mx-auto space-y-5 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-base leading-relaxed">
          上一段你做出了計時器。但它現在的樣子，是你一句一句盯出來的。
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-4">現在</div>
            <ul className="space-y-3">
              {PAINS.map((p) => (
                <li key={p} className="text-slate-300 text-sm leading-relaxed flex gap-3">
                  <span className="text-slate-600 shrink-0">·</span>
                  {p}
                </li>
              ))}
            </ul>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-4">這一段結束時</div>
            <ul className="space-y-3">
              {GAINS.map((g) => (
                <li key={g} className="text-slate-200 text-sm leading-relaxed flex gap-3">
                  <span className="text-sky-500 shrink-0">·</span>
                  {g}
                </li>
              ))}
            </ul>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            最後那一項先講個數字：找人外包寫一支自動抓資料的小腳本，報價大約一萬元、五個工作天。你自己指揮 AI 做，token 費用約四十元、一小時。<span className="text-slate-200">錢跟時間的差距都很大，所以值得花一點功夫，把環境準備好。</span>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
