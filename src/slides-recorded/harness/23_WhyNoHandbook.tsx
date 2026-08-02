import { FileX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const MISSES = [
  '按鈕寫成「開始休息」，不是你的航太語彙',
  '順手塞了一張外部圖片當背景',
  '分鐘數又寫死在程式碼裡',
];

export const meta: RecordedMeta = {
  id: 'harness-23-why-no-handbook',
  title: '有手冊跟沒手冊，差在哪？',
  script:
    '前面你在 mission-timer 的 CLAUDE.md 裡寫下四條規矩，然後跑了一次驗收。這裡把那個驗收攤開來，兩邊對照著看。先看手冊還沒寫的那一邊：你說「幫我加一個 5 分鐘的休息模式」，這次刻意不提任何規矩。它做出來是這樣：按鈕寫成「開始休息」，不是那套航太語彙；順手塞了一張外部圖片當背景；分鐘數又寫死在程式碼裡。你上一輪交代過的三條，它一條都沒做到。',
  seconds: 44,
  from: 55,
};

export default function RecWhyNoHandbook() {
  return (
    <SlideLayout title={meta.title} subtitle="Why a Handbook" icon={FileX}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-500 text-base font-mono mb-3">對照 1 / 3　mission-timer</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-5">
            <p className="text-sky-300 text-2xl leading-snug">幫我加一個 5 分鐘的休息模式。</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-4 leading-snug">上一輪交代的三條，它一條都沒做到</p>

          <p className="text-slate-400 text-xl leading-relaxed">這次刻意不提規矩，手冊裡也還沒有那四條。</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6">
          <div className="text-red-400 font-bold text-lg mb-3">✕ 它做出來的東西</div>
          <ul className="space-y-2.5">
            {MISSES.map((m) => (
              <li key={m} className="text-slate-300 text-xl leading-relaxed flex gap-4">
                <span className="text-slate-600 shrink-0">·</span>
                {m}
              </li>
            ))}
          </ul>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
