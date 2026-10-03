import { ArrowLeftRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 最後查證：2026-10-03，兩欄都重查過。
 *   - Claude Code（code.claude.com/docs/en/hooks）：事件 33 個、handler 5 種。
 *   - Codex（learn.chatgpt.com/docs/hooks，原網址 developers.openai.com/codex/hooks 會轉過去）：
 *     事件 12 個；handler 原文寫「"command" and "mcp_tool" handlers are supported.
 *     `prompt` and `agent` handlers are parsed but skipped.」；matcher 原文寫
 *     「The `matcher` field is a regex string that filters when hooks fire.」，
 *     PreToolUse／PostToolUse 依工具名過濾。
 *
 * 2026-10-03 修掉兩個過期的說法：Codex 不是「只有跑指令」（mcp_tool 也支援），
 * 而且它有 matcher，所以原本缺的「範圍」那一列補上了，檔頭那段「沒重查所以不補」的警告移除。
 * C-3 仍然把這一頁列為最容易過期，下次改版兩欄都要再查一次。
 */

/**
 * 這一節的職務是轉移，所以 Hook 這一組也要收在「換一個工具還算不算數」。
 *
 * 版面刻意沿用前面三頁的三層詞彙（時機、範圍、動作）當左欄，
 * 學員看到的不是一張新的比較表，是同一條線再走一次，只是換成別家的格子。
 *
 * 三列就是三層，2026-10-03 補齊（之前缺「範圍」那一列，因為當時沒查 Codex 的 matcher）。
 *
 * 數字只用來說明一件事：三層的想法兩邊一樣，差的是格子多寡。
 * 兩邊都會改版，所以畫面上一定要留那句「掛之前查一次文件」，
 * 否則這一頁明年就是錯的，而且錯得很有自信。
 *
 * 成對對照，所以 Claude Code 用 sky、Codex 用 indigo（A-1）。
 */
const ROWS = [
  { layer: '時機', cc: '三十三種', codex: '十二種' },
  { layer: '範圍', cc: '比對工具名稱', codex: '一樣比對工具名稱' },
  { layer: '動作', cc: '五種', codex: '兩種：跑指令、呼叫 MCP 工具' },
];

export const meta: RecordedMeta = {
  id: 'harness-68-hook-codex',
  title: '同一條 Hook 搬到 Codex',
  script:
    '換一個工具還算不算數？Codex 也有 Hook，也是這三層，連欄位的名字都一樣，差別在每一層可以挑的選項比較少。時機，Claude Code 三十三種，Codex 十二種。範圍兩邊一樣，都是比對工具的名稱。動作差最多：Claude Code 五種，Codex 支援跑指令跟呼叫 MCP 工具這兩種，交給模型判斷、派子代理去查那兩種會被略過。但你剛掛的那一條用工具執行前，動作是跑指令，兩邊都有，搬得過去。兩邊都還在改版，掛之前查一次文件。所以不用背名稱，要練的是講清楚：什麼時候檢查、管哪一次、做什麼。',
  seconds: 48,
};

export default function RecHookCodex() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Three Layers" icon={ArrowLeftRight}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            Codex 也是這三層，<Key>每一層可以挑的選項比較少</Key>
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
          {/* 這一句是檔頭要求要留在畫面上的，不要只寫在口白裡：兩邊都會改版 */}
          <p className="text-slate-400 text-lg leading-relaxed mt-2">
            兩邊都還在改版，<span className="text-slate-200">掛之前查一次文件</span>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 不用背名稱。要練的是講清楚：什麼時候檢查、管哪一次、做什麼。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
