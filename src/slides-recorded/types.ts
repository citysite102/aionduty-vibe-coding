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
  /** 預估秒數。加總就是影片長度，上限 45 秒（reference 頁除外，見 kind） */
  seconds: number;
  /** 這一頁是從現行版哪一頁拆出來的，方便回溯 */
  from?: number;
  /**
   * 這一頁是哪一種頁面。省略就是 split，也就是這一段的常態：
   * 一頁一件事、畫面 160 字以內、口白 45 秒以內。
   *
   * reference 是分節頁、地圖頁、速查表這種「一次看完整張」的頁面。
   * 它們本來就比較密，學員會停在上面對照，而不是跟著念完就翻頁，
   * 所以不套 160 字與 45 秒那兩條。但口白照樣要寫，否則錄影時這幾頁會變成無聲。
   */
  kind?: 'split' | 'reference';
}

export interface RecordedSlide {
  meta: RecordedMeta;
  Component: React.ComponentType;
}
