/**
 * Hook 與 CI 的四欄對照。兩頁共用，所以放在這裡：
 *   - Slide 73（`21d3_M2_OutsideContext`）第一次介紹這兩個零件的時候。
 *   - Slide 88（`slides-recorded/harness/05_RouteQ1`）規則歸位第一題，學員要在這裡選哪一個。
 *
 * 2026-10-03 抽成共用元件。原本只寫「Hook 擋你這台機器、CI 擋整個團隊」，
 * 聽起來像覆蓋範圍的差別，所以學員會問「那每個人的電腦都裝 Hook 不就等於團隊」。
 * 真正的差別是最後一欄：Hook 依賴每個人的設定，CI 不依賴任何人的設定。
 * **四欄是一組，不要只留其中一兩欄**，少了前三欄最後一欄會變成沒有根據的斷言。
 *
 * 兩頁共用同一份資料，改這裡兩邊一起改；不要在任何一頁另外抄一份（B-5）。
 */
export const HOOK_CI_AXES = [
  { k: '跑在哪', hook: '你這台機器', ci: '共用的那一台伺服器' },
  { k: '什麼時候', hook: '它動手之前，寫檔案或跑指令的那一刻', ci: '程式碼要進主線之前' },
  { k: '擋得到誰', hook: '只有經過 Claude Code 的動作', ci: '所有人的所有改動，不管用什麼工具寫的' },
  { k: '繞得過嗎', hook: '換個編輯器手動改、或把設定關掉就繞過了', ci: '設成合併前的必要檢查，就繞不過' },
];

/** `size="rec"` 給預錄拆頁用，字級跟著那一批放大。 */
export function HookCiTable({ size = 'live' }: { size?: 'live' | 'rec' }) {
  const body = size === 'rec' ? 'text-lg' : 'text-sm';
  const head = size === 'rec' ? 'text-base' : 'text-xs';
  const pad = size === 'rec' ? 'py-2.5' : 'py-2';

  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse ${body}`}>
        <thead>
          <tr className={head}>
            <th className="w-28 py-1.5 pr-3 text-left font-normal text-slate-600" />
            <th className="py-1.5 pr-3 text-left font-bold text-slate-200">Hook</th>
            <th className="py-1.5 text-left font-bold text-slate-200">CI</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {HOOK_CI_AXES.map((a) => (
            <tr key={a.k} className="border-t border-slate-800">
              <td className={`${pad} pr-3 text-slate-500`}>{a.k}</td>
              <td className={`${pad} pr-3 text-slate-400 leading-relaxed`}>{a.hook}</td>
              <td className={`${pad} text-slate-400 leading-relaxed`}>{a.ci}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
