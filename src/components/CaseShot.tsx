import { Image as ImageIcon } from 'lucide-react';

/**
 * 案例首頁的成品圖位。
 *
 * 圖還沒放進來的時候，框裡寫的是「那張圖要拍到什麼」，不是「圖片預留位置」
 * 這種沒有資訊的字。講者看得出要補哪一張，學員在補圖之前看到的也還是內容。
 *
 * 換成真的截圖：把圖檔放進 assets/cases/，在頁面上方 import 進來，
 * 當作 src 傳進來就好，其餘不用動。圖一律走 assets/，不吃外部網址（A-4）。
 *
 * 底下的網址是真的可以點的連結，不是裝飾（A-4）。它是講者現場要打開的那一個。
 */
export function CaseShot({
  src,
  alt,
  url,
  hint,
}: {
  /** 成品截圖。還沒有的時候留空，框會自己變成待補的樣子 */
  src?: string;
  /** 有 src 的時候要一起給，描述畫面上實際看得到什麼 */
  alt?: string;
  /** 成品的公開網址 */
  url: string;
  /** 還沒有圖的時候，框裡要寫「這個位置要放哪一張圖」 */
  hint?: string;
}) {
  return (
    <div className="space-y-3">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-video w-full rounded-2xl border border-slate-800 object-cover"
        />
      ) : (
        <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900 px-8 text-center">
          <ImageIcon aria-hidden="true" size={24} className="text-slate-600" />
          <p className="text-sm leading-relaxed text-slate-500">{hint}</p>
        </div>
      )}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block font-mono text-sm text-slate-400 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-slate-200"
      >
        {url.replace(/^https?:\/\//, '')}
      </a>
    </div>
  );
}
