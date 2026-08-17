import type { ReactNode } from 'react';

/**
 * 決策樹的分叉連接線。
 *
 * 一開始只在問題卡下面畫一小段豎線，然後把兩個答案並排放在下面，
 * 結果看起來是三個上下堆疊的區塊，不是一棵樹：看不出那兩塊是同一個問題分出來的。
 *
 * 真正讓人讀成樹的是那根橫桿。三層畫出來：
 *
 *   1. 主幹　　問題卡正下方一小段豎線
 *   2. 橫桿　　左右各留 25%，剛好從左欄中心連到右欄中心（兩等欄的中心就在 25% 與 75%）
 *   3. 支線　　兩欄各自從橫桿垂一小段下來，接到自己的答案卡
 *
 * 全部用 div 加邊框畫，不引用外部圖片、不裝套件（A-4）。
 */
export function Fork() {
  return (
    <div aria-hidden="true">
      <div className="mx-auto h-4 w-px bg-slate-700" />
      <div className="mx-[25%] h-px bg-slate-700" />
      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <div className="h-4 w-px bg-slate-700" />
        </div>
        <div className="flex justify-center">
          <div className="h-4 w-px bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

/**
 * 樹上的一個葉子（就地結案）或一個中繼點（往下問）。
 *
 * end 那一邊要看得出「查到這裡為止」，所以給它一個結束標記並且壓低對比；
 * 繼續的那一邊維持亮度，讀者的視線才會自然往下走。
 */
export function Branch({
  label,
  children,
  end = false,
}: {
  label: string;
  children: ReactNode;
  end?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-5 py-3 ${
        end ? 'border-slate-800 bg-slate-950' : 'border-sky-500/25 bg-sky-500/5'
      }`}
    >
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-slate-500 text-base">{label}</span>
        {end && <span className="font-mono text-sm text-slate-600">到此結束</span>}
      </div>
      <div className={`text-lg leading-snug ${end ? 'text-slate-300' : 'text-sky-200'}`}>{children}</div>
    </div>
  );
}
