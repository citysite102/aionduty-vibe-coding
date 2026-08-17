import { Sprout } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const SIGNALS = [
  '某條規則明顯只跟某一區有關，其他地方用不到',
  '同一件事重複出錯，光是寫進手冊已經擋不住',
  '檔案長到你自己都要找一下某條規則在哪裡',
];

export const meta: RecordedMeta = {
  id: 'harness-10-start-simple',
  title: '那要一開始就分好層嗎？',
  script:
    '講到這裡要補一句實話。前面那四個問題排出來很像一張架構圖，但你不需要在開專案的第一天就把它設計好。實際情況是，幾乎所有專案都是從一份 CLAUDE.md 開始的，規則也是遇到問題才一條一條加上去。分層是後來才長出來的。什麼時候該分？有三個訊號：某條規則明顯只跟某一區有關；同一件事重複出錯、光是寫進手冊已經擋不住；或是檔案長到你自己都要找一下某條規則在哪裡。看到這些訊號，再回頭用那四個問題把它們送出去就好。',
  seconds: 44,
  from: 69,
};

export default function RecStartSimple() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={Sprout}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-4xl font-bold leading-snug">不用。<Key>從一份開始就好</Key>。</p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            幾乎所有專案都是從一份 CLAUDE.md 開始的，規則也是遇到問題才一條一條加上去。分層是後來才長出來的。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
          <div className="text-sky-400 text-lg font-bold mb-4">看到這三個訊號，再回頭分流</div>
          <ul className="space-y-3">
            {SIGNALS.map((s) => (
              <li key={s} className="text-slate-300 text-xl leading-relaxed flex gap-4">
                <span className="text-slate-600 shrink-0">·</span>
                {s}
              </li>
            ))}
          </ul>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
