import { ArrowLeftRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一節的職務是轉移，所以 Hook 這一組也要收在「換一個工具還算不算數」。
 *
 * 數字只用來說明一件事：這套三層的想法兩邊一樣，差的是格子多寡。
 * 兩邊的數字都會改版，所以畫面上一定要留那句「掛之前查一次官方文件」，
 * 否則這一頁明年就是錯的，而且錯得很有自信。
 *
 * 成對對照，所以 Claude Code 用 sky、Codex 用 indigo（A-1）。
 */
const SIDES = [
  { name: 'Claude Code', events: '三十幾種', handlers: '五種', accent: true },
  { name: 'Codex', events: '十來種', handlers: '只有跑指令' },
];

export const meta: RecordedMeta = {
  id: 'harness-68-hook-codex',
  title: 'Hook 這套概念搬到 Codex',
  script:
    '最後一件事：換一個工具還算不算數。Codex 也有 Hook，三層的想法一模一樣，差別在格子多寡。時機的數量 Claude Code 開得比較多，三十幾種，Codex 目前是十來種。動作那一層差最多，Claude Code 有五種，Codex 只有跑指令這一種，所以那些交給模型判斷、派子代理去查的寫法搬不過去。但你前面掛的那兩條用的是工具執行前跟收尾，這兩個時機兩邊都有，動作也都是跑一段指令，所以搬得過去。這就是為什麼前面說不要背 Event 的名稱。你真正要練的是講清楚啟動時機：什麼時候、管哪一次、做什麼。名稱各家不一樣，查一次就好，兩邊的數字也都會改版。',
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

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-4">
          {SIDES.map((s) => (
            <div
              key={s.name}
              className={`rounded-2xl border p-6 ${
                s.accent ? 'border-sky-500/25 bg-sky-500/5' : 'border-indigo-500/25 bg-indigo-500/5'
              }`}
            >
              <div
                className={`text-xl font-bold mb-4 ${s.accent ? 'text-sky-300' : 'text-indigo-300'}`}
              >
                {s.name}
              </div>
              <div className="text-slate-500 text-base">時機</div>
              <div className="text-slate-200 text-xl mb-3">{s.events}</div>
              <div className="text-slate-500 text-base">動作</div>
              <div className="text-slate-200 text-xl">{s.handlers}</div>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            你掛的那兩條用工具執行前跟收尾，動作是跑指令，兩邊都有，搬得過去。
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
