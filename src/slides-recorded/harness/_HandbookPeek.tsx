import { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { HandbookLines } from './_HandbookLines';
import { VERSIONS } from './_handbookVersions';

/**
 * 隨時把手冊叫出來看的面板。
 *
 * 這一段連續幾十頁在講手冊的各種問題，但學員手上那份檔案只在成長軸那幾頁才看得到。
 * 講到一半有人問「所以現在那份長怎樣」，講者得往回翻。這個按鈕讓它隨時叫得出來。
 *
 * 只有點了才展開，不點就只是右下角一顆小按鈕，不影響版面也不影響錄影。
 * 面板裡可以左右切版本，因為現場最常問的是「跟剛才差在哪」。
 */
export function HandbookPeek({ version }: { version: number }) {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(version);
  const cur = VERSIONS[v - 1];

  if (!open) {
    return (
      <button
        onClick={() => {
          setV(version);
          setOpen(true);
        }}
        className="fixed bottom-24 right-8 z-40 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2.5 text-slate-400 backdrop-blur-sm transition-colors hover:border-sky-500/50 hover:text-sky-300"
      >
        <FileText size={15} className="shrink-0" />
        <span className="font-mono text-sm font-bold">CLAUDE.md</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-8">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-6 py-3.5">
          <span className="font-mono text-base text-slate-300">CLAUDE.md</span>
          <span className="text-sm text-slate-500">{cur.label}</span>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <HandbookLines lines={cur.lines} size="base" />
          <p className="mt-5 border-t border-slate-800 pt-4 text-sm leading-relaxed text-slate-500">{cur.note}</p>
        </div>

        <div className="flex gap-2 border-t border-slate-800 bg-slate-900 px-6 py-3">
          {VERSIONS.map((x, i) => {
            const n = i + 1;
            const reached = n <= version;
            return (
              <button
                key={x.label}
                disabled={!reached}
                onClick={() => setV(n)}
                className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                  n === v
                    ? 'bg-sky-500/15 text-sky-300'
                    : reached
                      ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      : 'text-slate-700'
                }`}
              >
                {x.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
