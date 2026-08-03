import { AnimatedBlock } from '../../components/SlideLayout';
import { HandbookLines } from './_HandbookLines';
import { VERSIONS } from './_handbookVersions';

/**
 * 手冊成長軸的畫面。內容來自 _handbookVersions，跟隨時呼叫的面板是同一份。
 *
 * 刻意包含刪除與搬走：這一段教的不只是加規則，也在教哪些不該留。
 */
export function HandbookState({ version, stepIndex = 1 }: { version: number; stepIndex?: number }) {
  const v = VERSIONS[version - 1];
  return (
    <AnimatedBlock
      stepIndex={stepIndex}
      className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden"
    >
      <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-6 py-3">
        <span className="font-mono text-base text-slate-400">CLAUDE.md</span>
        <span className="text-sm text-slate-600">{v.label}</span>
      </div>
      <div className="px-6 py-4">
        <HandbookLines lines={v.lines} size="sm" />
      </div>
    </AnimatedBlock>
  );
}
