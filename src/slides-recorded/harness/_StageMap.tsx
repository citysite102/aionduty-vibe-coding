/**
 * 上排白話、下排實際名稱的對照圖。
 *
 * Hook 這一組每一頁都在做同一件事：把一個口語的說法對回設定檔裡真正要填的字。
 * 那個對照關係如果寫成句子（「工具執行前叫做 PreToolUse」），讀者要自己在腦裡配對；
 * 排成上下兩排再用一條線連起來，配對這件事就由版面完成，句子可以省下來。
 *
 * 顏色分工照 A-1：
 *   下排的名稱是 Claude Code 定義的東西，走 orange，標的是身分不是重點。
 *   on 那幾格用 sky 的框，標的才是「這一格現在要看」。
 * 所以同一格可以同時有橘字與藍框，兩個講的不是同一件事。
 *
 * 底線開頭的檔案不列入 check:rec 的畫面字數，但呼叫端傳進來的字會算，
 * 這是對的：那些字真的印在那一頁上。
 */
export type Stage = {
  /** 上排：用學員自己會說的話描述這個階段 */
  stage: string;
  /** 下排：設定檔裡真正要填的那個字 */
  code: string;
  /** 下排的補一句，說明它什麼時候會發生 */
  note?: string;
  /** 這一格現在要看 */
  on?: boolean;
};

/** 只開放實際用到的欄數，避免寫出 Tailwind 掃不到的動態 class。 */
const COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export function StageMap({ items }: { items: Stage[] }) {
  return (
    <div className={`grid gap-3 ${COLS[items.length] ?? 'grid-cols-4'}`}>
      {items.map((it) => (
        <div key={it.code} className="flex flex-col">
          <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-center">
            <span className="text-slate-300 text-lg font-bold leading-snug">{it.stage}</span>
          </div>

          {/* 連接線。上下兩排是同一件事的兩種說法，不是兩層流程，所以只用一條細線 */}
          <div className="mx-auto h-4 w-px bg-slate-700" />

          <div
            className={`grow rounded-xl border px-4 py-3 text-center ${
              it.on ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
            }`}
          >
            <div className="font-mono text-lg font-bold text-orange-300">{it.code}</div>
            {it.note && <div className="text-slate-500 text-base leading-snug mt-1">{it.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 一條橫向的步驟流程。
 *
 * 講「它在固定的時機停下來問你的設定」這種機制的時候，句子講三遍不如把順序畫出來。
 * 箭頭是靜態的，沒有跑馬燈，A-3 那條「禁止常駐無限動畫」在這裡照樣適用。
 */
export function FlowRow({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          {i > 0 && <span className="text-slate-600 text-xl">→</span>}
          <span className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-slate-300 text-lg">
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}
