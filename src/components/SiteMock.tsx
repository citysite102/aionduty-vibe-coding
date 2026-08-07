import React from 'react';

/**
 * 個人網站產出的三種樣貌，給 Skill 示範那兩頁共用。
 *
 * 版面一律用色塊表示，不放真字。縮到投影片上的尺寸時真字會糊成一團，
 * 而且這裡要對比的是版型與節奏，不是文案內容。
 *
 * 三個一組要看得出遞進，所以差異刻意做在同幾個地方：
 * 對齊方式、字級的落差、欄寬是否對稱、有沒有一條主導的線。
 */

export function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      <div className="flex items-center gap-1.5 border-b border-slate-800 bg-slate-900 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-slate-700" />
        <span className="h-2 w-2 rounded-full bg-slate-700" />
        <span className="h-2 w-2 rounded-full bg-slate-700" />
        <span className="ml-2 h-2.5 flex-1 rounded bg-slate-800" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/** 沒裝 Skill：什麼都置中、三張一模一樣的卡片、字級沒有落差。 */
export function GenericMock() {
  return (
    <div className="space-y-3 py-1 text-center">
      <div className="mx-auto h-9 w-9 rounded-full bg-slate-800" />
      <div className="mx-auto h-3 w-28 rounded bg-slate-700" />
      <div className="mx-auto h-2 w-40 rounded bg-slate-800" />
      <div className="grid grid-cols-3 gap-2 pt-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-1.5 rounded-lg border border-slate-800 bg-slate-900 p-2.5">
            <div className="mx-auto h-4 w-4 rounded bg-slate-800" />
            <div className="mx-auto h-1.5 w-10 rounded bg-slate-800" />
            <div className="mx-auto h-1.5 w-12 rounded bg-slate-800/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** 裝了 Skill：靠左、字級拉開、欄寬不對稱、有一條分隔線。 */
export function DesignedMock() {
  return (
    <div className="space-y-3 py-1 text-left">
      <div className="h-6 w-32 rounded-sm bg-slate-200" />
      <div className="h-2 w-20 rounded bg-sky-500/70" />
      <div className="grid grid-cols-[1.6fr_1fr] gap-3 border-t border-slate-700 pt-3">
        <div className="space-y-1.5">
          <div className="h-1.5 w-full rounded bg-slate-700" />
          <div className="h-1.5 w-5/6 rounded bg-slate-800" />
          <div className="h-1.5 w-4/6 rounded bg-slate-800" />
          <div className="h-1.5 w-3/6 rounded bg-slate-800" />
        </div>
        <div className="space-y-1.5 border-l border-slate-800 pl-3">
          <div className="h-1.5 w-full rounded bg-slate-800" />
          <div className="h-1.5 w-3/4 rounded bg-slate-800" />
          <div className="mt-2 h-6 rounded border border-sky-500/25 bg-sky-500/10" />
        </div>
      </div>
    </div>
  );
}

/** 再加參考設計：照參考的那條粗線、編號式索引與指定的色塊走。 */
export function ReferencedMock() {
  return (
    <div className="space-y-2.5 py-1 text-left">
      <div className="flex items-baseline justify-between border-b-2 border-sky-500/60 pb-2">
        <div className="h-6 w-24 rounded-sm bg-slate-100" />
        <div className="h-2 w-10 rounded bg-sky-500/70" />
      </div>
      {/* 編號式索引：左邊一個編號色塊，右邊一條文字條，長度往下遞減 */}
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 pt-0.5">
        {['w-full', 'w-4/5', 'w-3/5'].map((w) => (
          <React.Fragment key={w}>
            <div className="h-1.5 w-4 rounded bg-sky-500/60" />
            <div className={`h-1.5 rounded bg-slate-700 ${w}`} />
          </React.Fragment>
        ))}
      </div>
      <div className="h-7 rounded border border-sky-500/25 bg-sky-500/10" />
    </div>
  );
}
