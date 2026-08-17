import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * 可以點一下複製的文字塊。給 Prompt 這種「學員要原封不動貼進 Claude Code」的內容用。
 *
 * 為什麼整塊都是 <button> 而不是右上角放一顆小按鈕：學員在投影片上第一個反應是點內容
 * 本身，而且課程改成預錄自學之後沒有講者可以口頭說「右上角有複製鈕」，
 * 打擊面大一點比較不會漏。
 *
 * **一定要是真的 <button> 元素。** App.tsx 的 handleContainerClick 靠
 * `closest('button, a')` 決定要不要翻頁，用 div 加 onClick 的話點一下複製會順便跳頁。
 *
 * 剪貼簿 API 在非 HTTPS 或權限被鎖的瀏覽器會丟例外（公司配的機器常見），
 * 所以留了 textarea + execCommand 的退路，跟 src/tools/ui.tsx 的 CopyButton 同一套。
 */
/** 複製本身的行為。兩個版本共用，包含沒有剪貼簿權限時的退路。 */
function useCopy(text: string) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 離開這一頁時把計時器收掉，否則 React 會警告在已卸載的元件上 setState
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 剪貼簿 API 在非 HTTPS 或權限被鎖的瀏覽器會丟例外，公司配的機器常見
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setDone(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  }

  return { done, copy };
}

/**
 * 最小版：只有一顆「點一下複製」的小按鈕，不動既有版面。
 * 給那種已經排得很好、但內容散在標題與清單裡的區塊用
 * （例如 21b2 的指令後面接一個 ol，換成 pre 會破壞版面）。
 */
export function CopyAction({ text, className = '' }: { text: string; className?: string }) {
  const { done, copy } = useCopy(text);
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="複製這段 Prompt"
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs cursor-pointer transition-colors ${
        done
          ? 'border-emerald-500/40 text-emerald-400'
          : 'border-slate-700 text-slate-500 hover:border-sky-500/40 hover:text-sky-300'
      } ${className}`}
    >
      {done ? <Check size={12} /> : <Copy size={12} />}
      {done ? '已複製' : '點一下複製'}
    </button>
  );
}

/**
 * 輕量版：只有文字本身可以點，沒有標題列。
 * 一頁上有好幾段 prompt 並排的時候用（例如報價系統那五個指令），
 * 每段都套完整的卡片框會變成卡片裡再疊五張卡片。
 */
export function CopyText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const { done, copy } = useCopy(text);
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="複製這段 Prompt"
      className={`group block w-full text-left rounded-lg -mx-2 px-2 py-1 cursor-pointer transition-colors hover:bg-sky-500/5 ${className}`}
    >
      <span className="font-mono text-xs md:text-sm leading-relaxed text-slate-400 break-words group-hover:text-slate-300">
        {text}
      </span>
      <span
        className={`mt-1 flex items-center gap-1.5 text-xs transition-colors ${
          done ? 'text-emerald-400' : 'text-slate-600 group-hover:text-sky-300'
        }`}
      >
        {done ? <Check size={12} /> : <Copy size={12} />}
        {done ? '已複製' : '點一下複製'}
      </span>
    </button>
  );
}

export function CopyBlock({
  label = 'Prompt',
  note,
  text,
  size = 'sm',
  className = '',
}: {
  /** 左上角的標籤，預設 Prompt */
  label?: string;
  /** 標籤右邊的補充說明 */
  note?: string;
  /** 要複製的原文。畫面上印的就是這一份，不會有「看到的跟複製到的不一樣」 */
  text: string;
  /** 內文字級。長 prompt 用 xs，其餘用 sm */
  size?: 'xs' | 'sm';
  className?: string;
}) {
  const { done, copy } = useCopy(text);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`複製這段${label}`}
      className={`group block w-full text-left rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden cursor-pointer transition-colors hover:border-sky-500/40 ${className}`}
    >
      <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-5 py-2.5">
        <span className="font-mono text-xs uppercase tracking-widest text-sky-400 shrink-0">
          {label}
        </span>
        {note && <span className="text-sm text-slate-500 min-w-0 truncate">{note}</span>}
        <span
          className={`ml-auto flex items-center gap-1.5 text-xs shrink-0 transition-colors ${
            done ? 'text-emerald-400' : 'text-slate-500 group-hover:text-sky-300'
          }`}
        >
          {done ? <Check size={13} /> : <Copy size={13} />}
          {done ? '已複製' : '點一下複製'}
        </span>
      </div>
      <pre
        className={`px-5 py-4 font-mono ${
          size === 'xs' ? 'text-xs md:text-sm' : 'text-sm'
        } leading-relaxed text-slate-300 whitespace-pre-wrap break-words`}
      >
        {text}
      </pre>
    </button>
  );
}
