import { FileX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const MISSES = [
  '按鈕寫成「開始休息」，跟你的語彙對不上',
  '順手塞了一張外部圖片當背景',
  '分鐘數又寫死在程式碼裡',
];

export const meta: RecordedMeta = {
  id: 'harness-23-why-no-handbook',
  title: '有手冊跟沒手冊，差在哪？',
  script:
    '先看它解決什麼問題，再談檔案要放哪。同一句需求，分別丟給有手冊和沒有手冊的專案。先看沒有手冊的那邊：你說「幫我加一個 5 分鐘的休息模式」，這三條規矩你上一輪都交代過了，但開新對話之後它一條都不記得。做出來是這樣：按鈕寫成「開始休息」，跟你專案裡的航太語彙對不上；順手塞了一張外部圖片當背景；分鐘數又寫死在程式碼裡。',
  seconds: 42,
  from: 55,
};

export default function RecWhyNoHandbook() {
  return (
    <SlideLayout title={meta.title} subtitle="Why a Handbook" icon={FileX}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-500 text-base font-mono mb-3">對照 1 / 3</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-5">
            <p className="text-sky-300 text-2xl leading-snug">幫我加一個 5 分鐘的休息模式。</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-4 leading-snug">沒有手冊，它一條都不記得</p>

          <p className="text-slate-400 text-xl leading-relaxed">這三條規矩，你上一輪都交代過了。</p>
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
