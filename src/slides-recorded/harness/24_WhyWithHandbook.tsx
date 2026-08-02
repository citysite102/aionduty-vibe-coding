import { FileCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const HITS = [
  '按鈕自己取名「補給」，照著航太語彙',
  '沒有引用任何外部圖片',
  '分鐘數加在最上面的設定區',
];

export const meta: RecordedMeta = {
  id: 'harness-24-why-with-handbook',
  title: '有手冊跟沒手冊，差在哪？',
  script:
    '同一句話，換成已經寫好 CLAUDE.md 的 mission-timer。這一輪你一樣什麼都沒提，但三條全部照做了：按鈕自己取名「補給」，照著你手冊裡那套航太語彙，沒有寫成「開始休息」；沒有引用任何外部圖片；分鐘數也加在檔案最上面的設定區。這就是你前面驗收那一步應該看到的結果。',
  seconds: 36,
  from: 55,
};

export default function RecWhyWithHandbook() {
  return (
    <SlideLayout title={meta.title} subtitle="Why a Handbook" icon={FileCheck}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-500 text-base font-mono mb-3">對照 2 / 3　mission-timer</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-5">
            <p className="text-sky-300 text-2xl leading-snug">幫我加一個 5 分鐘的休息模式。</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-4 leading-snug">你一條都沒提，三條它全做到了</p>

          <p className="text-slate-400 text-xl leading-relaxed">一模一樣的一句話，差別只有專案裡多了 CLAUDE.md。</p>
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
