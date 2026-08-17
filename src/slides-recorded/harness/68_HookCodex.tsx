import { ArrowLeftRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一節的職務是轉移，所以 Hook 這一組也要收在「換一個工具還算不算數」。
 *
 * 版面刻意沿用前面三頁的三層詞彙（時機、範圍、動作）當左欄，
 * 學員看到的不是一張新的比較表，是同一條線再走一次，只是換成別家的格子。
 *
 * 數字只用來說明一件事：三層的想法兩邊一樣，差的是格子多寡。
 * 兩邊都會改版，所以畫面上一定要留那句「掛之前查一次文件」，
 * 否則這一頁明年就是錯的，而且錯得很有自信。
 *
 * 成對對照，所以 Claude Code 用 sky、Codex 用 indigo（A-1）。
 */
const ROWS = [
  { layer: '時機', cc: '三十幾種', codex: '十來種' },
  { layer: '動作', cc: '五種', codex: '只有跑指令' },
];

export const meta: RecordedMeta = {
  id: 'harness-68-hook-codex',
  title: 'Hook 這套概念搬到 Codex',
  script:
    '最後一件事：換一個工具還算不算數。Codex 也有 Hook，三層的想法一模一樣，差別在格子多寡。時機的數量 Claude Code 開得比較多，三十幾種，Codex 目前是十來種。動作那一層差最多，Claude Code 有五種，Codex 只有跑指令這一種，所以那些交給模型判斷、派子代理去查的寫法搬不過去。但你剛剛掛的那一條用的是工具執行前，動作是跑一段指令，這個時機跟這個動作兩邊都有，所以搬得過去。這就是為什麼前面說不要背名稱。你真正要練的是講清楚啟動時機：什麼時候、管哪一次、做什麼。名稱各家不一樣，查一次就好，而且兩邊的數字都還會改版。',
  seconds: 45,
};

export default function RecHookCodex() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Idea, Fewer Slots" icon={ArrowLeftRight}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            三層一模一樣，<Key>差的是格子多寡</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[6rem_1fr_1fr] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3">
            <span />
            <span className="text-sky-300 text-lg font-bold">Claude Code</span>
            <span className="text-indigo-300 text-lg font-bold">Codex</span>
          </div>
          {ROWS.map((r) => (
            <div
              key={r.layer}
              className="grid grid-cols-[6rem_1fr_1fr] gap-4 px-6 py-4 border-b border-slate-800/70 last:border-0"
            >
              <span className="text-slate-500 text-lg">{r.layer}</span>
              <span className="text-slate-200 text-xl">{r.cc}</span>
              <span className="text-slate-200 text-xl">{r.codex}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            你剛掛的那一條用工具執行前，動作是跑指令，兩邊都有，搬得過去。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 別背名稱，練講清楚啟動時機。數字會改版，掛之前查一次文件。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
