/**
 * 操作列那顆按鈕與計時器之間的傳話管道。
 *
 * 它單獨一個檔案，不是寫在 CountdownOverlay.tsx 裡，原因是 Vite 的 Fast Refresh
 * 只吃「整個模組都是元件」的檔案。元件旁邊放一個普通的函式匯出，整包就失效，
 * 開發時每改一次那個檔案都會整頁重載。
 *
 * 用事件而不是把計時器的狀態拉到 App.tsx，是為了不讓那些狀態外流；
 * App.tsx 只需要知道「現在有沒有東西蓋在投影片上」，那個走 onActiveChange。
 */

const OPEN_EVENT = 'countdown:open';

/** 叫出倒數計時器的設定面板 */
export function openCountdown() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

/** 給 CountdownOverlay 訂閱用，回傳解除訂閱的函式 */
export function onOpenCountdown(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
