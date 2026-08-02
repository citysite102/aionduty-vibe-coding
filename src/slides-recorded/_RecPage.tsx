import type React from 'react';

/**
 * 預錄頁的內容殼。
 *
 * 單頁只剩 80 字上下，內容照原本從頂端往下排，畫面底部會固定空掉三到四成，
 * 看起來像一份沒寫完的文件而不是一張投影片。這一層讓內容在內容區裡垂直置中。
 *
 * 用 min-h-full 而不是 h-full：內容超過一頁高度時盒子會照常往下長，
 * justify-center 只分配剩下的空白，不會發生「置中之後上緣被切掉且捲不到」。
 */
export function RecPage({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-h-full max-w-4xl mx-auto flex flex-col justify-center ${className}`}>
      {children}
    </div>
  );
}
