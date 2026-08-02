import { FileCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const HITS = [
  '按鈕自己叫「補給」',
  '沒有引用任何外部圖片',
  '分鐘數加在最上面的設定區',
];

export const meta: RecordedMeta = {
  id: 'harness-24-why-with-handbook',
  title: '有手冊跟沒手冊，差在哪？',
  script:
    '同一句話，換成寫過 CLAUDE.md 的專案。這一輪你一條規矩都沒提，它自己去讀了手冊。做出來是這樣：按鈕自己叫「補給」，用的是你在手冊裡定義的語彙；沒有引用任何外部圖片；分鐘數也加在檔案最上面的設定區，不是寫死在中間。三件事都對上了，而你這一輪什麼都沒交代。',
  seconds: 32,
  from: 55,
};

export default function RecWhyWithHandbook() {
  return (
    <SlideLayout title={meta.title} subtitle="Why a Handbook" icon={FileCheck}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-500 text-base font-mono mb-3">對照 2 / 3</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-5">
            <p className="text-sky-300 text-2xl leading-snug">幫我加一個 5 分鐘的休息模式。</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-4 leading-snug">有手冊，它自己去讀了</p>

          <p className="text-slate-400 text-xl leading-relaxed">這一輪你一條規矩都沒提。</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-6">
          <div className="text-emerald-400 font-bold text-lg mb-3">✓ 它做出來的東西</div>
          <ul className="space-y-2.5">
            {HITS.map((h) => (
              <li key={h} className="text-slate-200 text-xl leading-relaxed flex gap-4">
                <span className="text-slate-600 shrink-0">·</span>
                {h}
              </li>
            ))}
          </ul>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
