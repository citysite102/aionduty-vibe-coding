import { TerminalSquare, Globe, AppWindow, Bot } from 'lucide-react';

/**
 * 實機示範標記。掛在需要切離簡報、實際動手操作的頁面上。
 *
 * 目的有三個：讓學員知道何時該把手放到鍵盤上、讓講者不必靠記憶想起哪幾頁要切畫面、
 * 也讓之後回看這份簡報的人看得出哪些段落原本是實作。
 *
 * kind 有四種：
 *   claude    開 Claude Code。終端機版與桌面版 Code 頁籤都可以，這是多數動手頁的情況
 *   terminal  非終端機不可的頁面。只有三種：教終端機指令、介紹終端機軟體、終端機版安裝
 *   browser   開瀏覽器
 *   desktop   指定要開桌面版 App
 *
 * 預設是 claude 不是 terminal。走桌面版那條路的學員占比不低，
 * 標成「切終端機」會讓他們以為這一頁不是寫給自己的，然後整頁跳過。
 *
 * 用法：<LiveDemo kind="claude" note="跟著加一次" />
 */
export function LiveDemo({
  kind = 'claude',
  note,
}: {
  kind?: 'claude' | 'terminal' | 'browser' | 'desktop';
  note?: string;
}) {
  const Icon = { claude: Bot, terminal: TerminalSquare, browser: Globe, desktop: AppWindow }[kind];
  const label = {
    claude: '現在開 Claude Code',
    terminal: '現在切終端機',
    browser: '現在開瀏覽器',
    desktop: '現在開桌面版',
  }[kind];

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
