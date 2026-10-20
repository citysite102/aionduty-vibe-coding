import type React from 'react';
import { AnimatedBlock } from '../components/SlideLayout';

/**
 * 「這一年」那三頁（Claude、ChatGPT、Gemini）共用的三欄卡片。
 *
 * **為什麼要有這個元件：** 三頁的版面本來一字不差地各寫一次，
 * 改一個間距要改三個檔案，而那三頁一定會一起改（它們是同一個比較的三邊）。
 *
 * **為什麼卡片裡是一條時間軸而不是條列：** 這三頁的內容是按時間排的，
 * 但條列讀起來每一條都一樣重，讀者得自己找出哪一條是現況。
 * 加一條軸之後，最後一個點是亮的，那就是「你現在打開會看到的版本」，
 * 前面幾個點是它怎麼走到這裡。日期本來就在，不必多寫一句話說明。
 *
 * 所以 `rows` 一定要**照時間由舊到新**排，最後一筆就是現況。
 * 要插一筆更早的就插在前面，不要圖方便加在尾巴，那會讓亮的點指錯東西。
 */
export type YearGroup = {
  icon: React.ElementType;
  title: string;
  /** [日期, 那一天改了什麼]，由舊到新 */
  rows: [string, string][];
  /** 這一組的現況。一句話，不要重複上面任何一條 */
  note: string;
};

export function YearGroups({ groups, startStep = 2 }: { groups: YearGroup[]; startStep?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {groups.map((g, i) => (
        <AnimatedBlock
          key={g.title}
          stepIndex={i + startStep}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="p-1.5 bg-slate-800 text-slate-400 rounded shrink-0">
              <g.icon size={14} />
            </span>
            <h4 className="text-base font-bold text-slate-100 leading-snug">{g.title}</h4>
          </div>

          <ol className="relative ml-1 space-y-2 border-l border-slate-800 pl-4">
            {g.rows.map(([date, what], k) => {
              const now = k === g.rows.length - 1;
              return (
                // 日期內嵌，不給它固定一欄：這三頁是三欄版面，欄寬本來就窄，
                // 多一個 4.5rem 的欄會把每一句都擠成兩三行。
                <li key={date + what} className="relative leading-snug">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[21px] top-[5px] h-2 w-2 rounded-full ${
                      now ? 'bg-sky-400' : 'bg-slate-700'
                    }`}
                  />
                  <span className={`font-mono text-xs mr-2 ${now ? 'text-sky-300' : 'text-slate-500'}`}>
                    {date}
                  </span>
                  <span className={`text-sm ${now ? 'text-slate-100' : 'text-slate-300'}`}>{what}</span>
                </li>
              );
            })}
          </ol>

          <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-3 mt-auto">
            {g.note}
          </p>
        </AnimatedBlock>
      ))}
    </div>
  );
}
