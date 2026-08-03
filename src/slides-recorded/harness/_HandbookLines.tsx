import type { Line } from './_handbookVersions';

const MARK = { added: '+', removed: '-', moved: '→' } as const;

/** 手冊內容的純呈現。成長軸頁與隨時呼叫的面板共用，字級由外面決定。 */
export function HandbookLines({ lines, size = 'base' }: { lines: Line[]; size?: 'sm' | 'base' }) {
  const text = size === 'base' ? 'text-base' : 'text-sm';
  return (
    <div className={`font-mono leading-relaxed ${text}`}>
      {lines.map((l, i) => {
        const s = l.state;
        if (l.kind === 'note' && !l.text) return <div key={i} className="h-3" />;
        return (
          <div key={i} className="flex gap-3">
            <span
              className={`w-3 shrink-0 ${
                s === 'added'
                  ? 'text-sky-400'
                  : s === 'removed'
                    ? 'text-slate-700'
                    : s === 'moved'
                      ? 'text-amber-400'
                      : 'text-transparent'
              }`}
            >
              {s ? MARK[s] : ''}
            </span>
            <span
              className={
                l.kind === 'heading'
                  ? 'text-slate-200 font-bold'
                  : l.kind === 'note'
                    ? 'text-slate-600'
                    : s === 'added'
                      ? 'text-sky-300'
                      : s === 'removed'
                        ? 'text-slate-700 line-through'
                        : s === 'moved'
                          ? 'text-slate-700 line-through'
                          : 'text-slate-400'
              }
            >
              {l.text}
            </span>
            {l.to && (
              <span className="text-amber-400 text-xs shrink-0 self-center rounded border border-amber-900/50 bg-amber-950/30 px-1.5 py-0.5">
                {l.to}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
