import { useSlide } from '../../components/SlideLayout';

/**
 * 兩組系列的定義放在這裡，不要散在各頁：標籤改一次就好，不必開四個檔案。
 * 底線開頭的檔案不列入 check:rec 的畫面字數，重複出現的導覽 chrome
 * 本來就不該在每一頁各算一次。
 */
export const ROUTE_RAIL = {
  label: '依序四題',
  items: ['Hook 或 CI', '子目錄', 'Skill', '根目錄'],
};

export const FAIL_RAIL = {
  label: '三種原因',
  items: ['沒被載入', '被埋在後面', '沒辦法檢查'],
};

/**
 * 手冊健檢的五步。六頁對五步不是一對一：減法佔了三頁（19 講順序、20 講證據、
 * 21 講證據不足），最後一頁一次講完第 3 到第 5 步。
 * 軌一次只亮一格，所以減法那三頁都亮在第 2 格，最後一頁亮在第 3 格。
 * 那不是精準的進度條，是讓人知道「我還在減法」還是「已經過去了」。
 */
export const HEALTH_RAIL = {
  label: '五步',
  items: ['盤點', '減法', '分流', '加法', '修剪'],
};

/** Hook 的三層，一層一頁。跟 ROUTE_RAIL 同一個作用：讓人知道自己在第幾層。 */
export const HOOK_RAIL = {
  label: '三層',
  items: ['時機', '範圍', '動作'],
};

/**
 * 系列頁共用的分支軌。
 *
 * 這一段有幾組頁面是「同一個問題的 N 個平行答案」，一頁一個，
 * 每頁都是一段文字。連著看時每頁長得一樣，學員不知道自己在第幾個、還有幾個，
 * 注意力就是在這種地方掉的。把整組選項固定放在頁面上方，當下那個亮起來。
 *
 * 已經講過的格子留著答案，形成累積感；還沒到的格子留空，不預告。
 * 給了 revealAt 的話，當下這一格要等到那一步才填上答案，
 * 免得比同頁的 AskFirst 早一步破梗。
 */
export function SeriesRail({
  items,
  current,
  revealAt,
  label,
}: {
  items: string[];
  /** 當下這一頁是第幾個，0 起算 */
  current: number;
  /** 到這一步才把當下這格的答案填上。省略就一開始就填 */
  revealAt?: number;
  label?: string;
}) {
  const { currentStep } = useSlide();
  const revealed = revealAt === undefined || currentStep >= revealAt;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {label && <span className="mr-1 font-mono text-sm text-slate-600">{label}</span>}
      {items.map((it, i) => {
        const done = i < current;
        const now = i === current;
        if (now) {
          return (
            <span
              key={it}
              className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3.5 py-1.5 text-base font-bold text-sky-300"
            >
              {revealed ? it : `第 ${i + 1} 題`}
            </span>
          );
        }
        return (
          <span
            key={it}
            className={`rounded-lg border px-3.5 py-1.5 text-base ${
              done ? 'border-slate-800 bg-slate-900 text-slate-400' : 'border-slate-800/60 text-slate-700'
            }`}
          >
            {done ? it : '—'}
          </span>
        );
      })}
    </div>
  );
}
