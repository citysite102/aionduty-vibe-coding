import type React from 'react';

/**
 * 預錄頁的內容殼。
 *
 * 單頁只剩 80 字上下，內容照原本從頂端往下排，畫面底部會固定空掉三到四成，
 * 看起來像一份沒寫完的文件而不是一張投影片。這一層調整內容在內容區裡的位置。
 *
 * 上下用 1:9 的彈性空間分配剩餘空白：內容靠上，但上面留一成不貼齊標題。
 * 用彈性空間而不是 padding，是因為 CSS 的百分比 padding 是以「寬度」為基準，
 * 寫 pt-[10%] 得到的會是寬度的一成，跟這裡要的高度一成差很多。
 *
 * 內容超過一頁高度時，兩個彈性空間都會收成 0（basis-0 沒有剩餘空間可分），
 * 盒子照常往下長，不會發生「上緣被推出畫面且捲不到」。
 */
export function RecPage({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-full max-w-4xl mx-auto flex flex-col">
      <div className="grow shrink-0 basis-0" />
      <div className={`shrink-0 ${className}`}>{children}</div>
      <div className="grow-[9] shrink-0 basis-0" />
    </div>
  );
}
