import type React from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * 錄影之後才改掉的外部事實，用這個標在投影片上。
 *
 * 影片錄好就定型了，但投影片是學員回頭翻的那一份，所以兩邊會慢慢分岔。
 * 處理方式不是把頁面改成新的（那樣口白會對不上畫面，學員會以為自己聽錯），
 * 而是**原本那段留著，旁邊加一條說明現在變成怎樣**。
 *
 * 寫法（日期不寫在這裡，寫在 `SlideLayout` 的 `updated`，一頁一個日期就夠）：
 *   <SlideLayout title="⋯" updated={{ date: '2026/10/19' }}>
 *     <UpdateNote>Cowork 已經併進 Claude⋯</UpdateNote>
 *
 * 三個要求：
 * 1. **只寫現況與影響，不要寫「影片裡講的是舊的」**。學員要的是現在該怎麼做。
 * 2. **連同出處與查證日期寫進那個檔案的檔頭**（C-1），這一條只是畫面上的摘要。
 * 3. **預錄頁不要同時改 `meta.script`。** 口白是影片裡已經念出去的那一份，改了
 *    `check:transcripts` 會跟逐字稿對不上，而且也追不回已經錄好的影片。
 *
 * 顏色走 amber（A-1 的「警告／注意」），一頁最多兩個強調色的額度要自己留意。
 */
export function UpdateNote({
  size = 'slide',
  className = '',
  children,
}: {
  /** 預錄拆頁字級大一階，傳 `rec`。 */
  size?: 'slide' | 'rec';
  className?: string;
  children: React.ReactNode;
}) {
  const body = size === 'rec' ? 'text-lg' : 'text-sm';
  return (
    <div className={`rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3 ${className}`}>
      <div className="flex items-start gap-3">
        <RefreshCw size={16} aria-hidden="true" className="text-amber-300 shrink-0 mt-1" />
        <p className={`${body} leading-relaxed text-slate-300`}>{children}</p>
      </div>
    </div>
  );
}
