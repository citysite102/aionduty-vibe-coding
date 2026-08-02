import { AnimatedBlock } from '../../components/SlideLayout';

/**
 * 沿用現行版 32b 的正反對照設計：紅框放不好的寫法、綠框放改寫後的版本。
 * 字級放大成預錄規格，其餘配色與圓角維持一致。
 */
export function DontDo({
  bad,
  badNote,
  good,
  goodNote,
  stepFrom = 1,
}: {
  bad: string;
  badNote?: string;
  good: string;
  goodNote?: string;
  stepFrom?: number;
}) {
  return (
    <div className="space-y-4">
      <AnimatedBlock stepIndex={stepFrom} className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl">
        <div className="text-red-400 font-bold text-lg mb-2">✕ 這樣寫</div>
        <div className="text-slate-300 text-xl leading-relaxed">{bad}</div>
        {badNote && <div className="text-slate-500 text-base mt-3">{badNote}</div>}
      </AnimatedBlock>

      <AnimatedBlock stepIndex={stepFrom + 1} className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl">
        <div className="text-emerald-400 font-bold text-lg mb-2">✓ 改成</div>
        <div className="text-slate-200 text-xl leading-relaxed">{good}</div>
        {goodNote && <div className="text-slate-500 text-base mt-3">{goodNote}</div>}
      </AnimatedBlock>
    </div>
  );
}
