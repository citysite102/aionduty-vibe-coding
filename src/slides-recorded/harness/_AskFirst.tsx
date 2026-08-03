import { Hand } from 'lucide-react';

/**
 * 提問頁的停頓標記。
 *
 * 這幾頁本來就是題目，但原本題目跟答案掛在同一個 stepIndex，一起出現，
 * 現場等於「我問你，然後我自己答」，學員沒有出聲的機會。
 * 把答案往後挪一個 step，題目這一步掛這個標記，講者就知道要停在這裡。
 *
 * 刻意不做成按鈕。這一段同時要錄成影片，按鈕在錄影時會卡住，
 * 用 stepIndex 讓講者手動翻，影片版照樣線性錄得下去。
 */
export function AskFirst({ note = '先自己想，再往下' }: { note?: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sky-300">
      <Hand size={16} className="shrink-0" />
      <span className="text-base font-bold">{note}</span>
    </div>
  );
}
