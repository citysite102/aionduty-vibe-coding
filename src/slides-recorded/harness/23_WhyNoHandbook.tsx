import { GitCompareArrows } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 原本拆成兩頁，一頁沒手冊、一頁有手冊。但這是一組對照，
 * 前後翻頁看等於要靠記憶去比，比不出來。左右並排才看得到差別。
 *
 * 兩欄同時出現（共用 stepIndex 2），因為它們是同一個語意單元。
 */
const MISSES = ['按鈕寫成「開始休息」', '塞了一張外部圖片當背景', '分鐘數又寫死在程式碼裡'];
const HITS = ['按鈕自己叫「補給」', '沒有引用任何外部圖片', '分鐘數加在最上面的設定區'];

export const meta: RecordedMeta = {
  id: 'harness-23-why-handbook',
  title: '同一句話，有沒有手冊差在哪',
  script:
    '把前面那次驗收攤開來，兩邊對照著看。同一句話「幫我加一個 5 分鐘的休息模式」，兩次都沒有提任何規矩。左邊是手冊還沒寫的時候：按鈕寫成開始休息，不是那套航太語彙；順手塞了一張外部圖片當背景；分鐘數又寫死在程式碼裡，三條全沒中。右邊是同一個專案，只多了一份 CLAUDE.md：按鈕自己叫補給，沒有引用外部圖片，分鐘數也加在最上面的設定區。三條全中。',
  seconds: 44,
  from: 55,
};

export default function RecWhyHandbook() {
  return (
    <SlideLayout title={meta.title} subtitle="Why a Handbook" icon={GitCompareArrows}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-500 text-base font-mono mb-3">兩次都丟同一句，都沒提任何規矩</div>
          <p className="text-sky-300 text-2xl leading-snug border-l-2 border-sky-500/50 pl-5">
            幫我加一個 5 分鐘的休息模式。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-5 items-stretch">
          <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-6 flex flex-col">
            <div className="text-slate-500 text-base mb-1">專案裡沒有 CLAUDE.md</div>
            <div className="text-red-300 text-2xl font-bold mb-5">三條一條都沒中</div>
            <ul className="space-y-3 mt-auto">
              {MISSES.map((m) => (
                <li key={m} className="text-slate-400 text-lg leading-snug flex gap-3">
                  <span className="text-red-500/70 shrink-0">✕</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/20 p-6 flex flex-col">
            <div className="text-slate-500 text-base mb-1">同一個專案，多了 CLAUDE.md</div>
            <div className="text-emerald-300 text-2xl font-bold mb-5">三條全中</div>
            <ul className="space-y-3 mt-auto">
              {HITS.map((h) => (
                <li key={h} className="text-slate-200 text-lg leading-snug flex gap-3">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-300 text-2xl font-bold leading-snug">
            不是它變聰明，是<Key>那三條換了存放的位置</Key>。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
