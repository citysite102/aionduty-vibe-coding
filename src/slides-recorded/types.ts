import type React from 'react';

/**
 * 預錄版每一頁都要匯出一個 meta。
 * 口白跟頁面放在一起，才不會改了頁面忘了改口白。
 */
export interface RecordedMeta {
  /** 唯一識別，命名為 <區塊>-<序號>-<主題> */
  id: string;
  /** 頁面標題，會顯示在下拉選單 */
  title: string;
  /** 口白稿，同時是字幕來源 */
  script: string;
  /** 預估秒數。加總就是影片長度，上限 45 秒 */
  seconds: number;
  /** 這一頁是從現行版哪一頁拆出來的，方便回溯 */
  from?: number;
}

export interface RecordedSlide {
  meta: RecordedMeta;
  Component: React.ComponentType;
}
