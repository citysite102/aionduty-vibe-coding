/**
 * 選修標記。掛在 SlideLayout 的 subtitle 前面。
 *
 * 用途：這一頁的內容不是後面段落的前提，跳過也不影響。
 * 現場趕時間可以快速帶過，完整版留在講義。
 *
 * subtitle 那一行是 uppercase + tracking-widest，中文標籤要自己抵銷掉，
 * 否則字距會被撐開。
 */
export function OptionalTag() {
  return (
    <span className="rounded border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-xs font-bold normal-case tracking-normal text-slate-400">
      選修
    </span>
  );
}
