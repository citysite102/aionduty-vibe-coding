import { TerminalSquare, Globe, AppWindow } from 'lucide-react';

/**
 * 實機示範標記。掛在需要切離簡報、實際開終端機或瀏覽器操作的頁面上。
 *
 * 目的有三個：讓學員知道何時該把手放到鍵盤上、讓講者不必靠記憶想起哪幾頁要切畫面、
 * 也讓之後回看這份簡報的人看得出哪些段落原本是實作。
 *
 * kind 有三種：terminal（切終端機）、browser（開瀏覽器）、desktop（開桌面版 App）。
 * desktop 是給桌面版 Claude Code 的 Code 頁籤用的，那一段不需要終端機。
 *
 * 用法：<LiveDemo kind="terminal" note="跟著打一次" />
 */
export function LiveDemo({
  kind = 'terminal',
  note,
}: {
  kind?: 'terminal' | 'browser' | 'desktop';
  note?: string;
}) {
  const Icon = { terminal: TerminalSquare, browser: Globe, desktop: AppWindow }[kind];
  const label = { terminal: '現在切終端機', browser: '現在開瀏覽器', desktop: '現在開桌面版' }[kind];

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-3 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300">
      <Icon size={14} className="shrink-0" />
      <span className="text-xs font-bold">{label}</span>
      {note && (
        <>
          <span className="text-sky-500/40">·</span>
          <span className="text-xs text-sky-400/80 font-medium">{note}</span>
        </>
      )}
    </div>
  );
}
