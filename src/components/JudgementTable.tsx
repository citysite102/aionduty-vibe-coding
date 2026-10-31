/**
 * 四個案例收尾頁共用的「判斷表」。
 *
 * 2026-10-31 新增（講師：案例三、案例四那兩頁的條列太 AI、也不適合教學）。
 * 原本四頁各自把同一份資料排成卡片清單，一條就是三段文字疊在一起
 * （標題／判斷依據：⋯／判斷錯的代價：⋯），五到八條疊起來像同一個模具印出來的。
 * 案例四那一頁更糟：為了塞下八條用了兩欄格線，讀的順序變成左右跳，
 * 而它的開場寫著「前面四條⋯後面四條⋯」，兩件事對不起來。
 *
 * 2026-10-31 欄名改回講師原本的用詞。中間那一輪寫成「怎麼判／判錯會怎樣」，
 * 講師明令禁用「判錯會怎樣」那種口語簡寫。**三個欄名就是這三個，不要再簡寫。**
 *
 * 2026-10-31（講師：「這一題」超怪的）第一欄的欄名改成「要決定的事」。
 * 「這一題」沒有講出那一欄裝的是什麼，而且它跟「判斷依據／判斷錯的代價」不同類
 * （後兩個是名詞，它是指示詞）。**另外兩欄的欄名是講師指定的，不要動。**
 *
 * 改成表之後，「判斷依據」「判斷錯的代價」這兩個標籤只在表頭出現一次，
 * 不必每一條重寫，而且三欄對齊，學員回頭翻講義時掃得動。
 *
 * **四頁一起用這一個元件**（案例一到案例四的收尾）。要改欄位名稱或配色，
 * 改這裡一個地方，不要回去改那四頁。
 *
 * `key` 標 sky 的那一條是每個案例的核心判斷，`keyNote` 是它旁邊那行小字
 * （「你剛才親手驗過的那一條」之類），兩個都是選填。
 * `group` 用在需要分段的頁面（案例四分成畫面與素材／登入與資料），
 * 同一個 `group` 連續出現時只印一次標題；不給就不會有分段列。
 */
export type Judgement = {
  q: string;
  by: string;
  cost: string;
  key?: boolean;
  keyNote?: string;
  group?: string;
};

export function JudgementTable({ items }: { items: Judgement[] }) {
  let lastGroup: string | undefined;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-950 text-slate-500">
            <th className="w-[30%] px-4 py-2 text-left font-normal">要決定的事</th>
            <th className="px-4 py-2 text-left font-normal">判斷依據</th>
            <th className="px-4 py-2 text-left font-normal">判斷錯的代價</th>
          </tr>
        </thead>
        <tbody>
          {items.map((j) => {
            const newGroup = j.group && j.group !== lastGroup ? j.group : null;
            lastGroup = j.group;
            return (
              <tr key={j.q} className={`border-t border-slate-800 ${j.key ? 'bg-sky-500/5' : ''}`}>
                <td className="px-4 py-2 align-top">
                  {newGroup && (
                    <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-slate-600">
                      {newGroup}
                    </span>
                  )}
                  <span className={`font-bold leading-snug ${j.key ? 'text-sky-200' : 'text-slate-100'}`}>
                    {j.q}
                  </span>
                  {j.key && j.keyNote && (
                    <span className="mt-0.5 block font-mono text-xs text-sky-400">{j.keyNote}</span>
                  )}
                </td>
                <td className="px-4 py-2 align-top text-slate-300 leading-relaxed">{j.by}</td>
                <td className="px-4 py-2 align-top text-slate-500 leading-relaxed">{j.cost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
