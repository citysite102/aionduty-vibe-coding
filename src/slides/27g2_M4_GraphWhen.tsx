import { ClipboardList, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 7-4 第二頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 這一頁為什麼存在 ────────────────────────────────────────────
 * 原本這個單元排四頁，沒有一頁回答「我什麼時候需要它」，那就踩到 B-5b：
 * 一個技巧在課裡找不到使用現場，學員當下練不到，真的需要的時候也想不起來。
 * 所以這一頁排在「兩層是什麼」後面、「怎麼做」前面，先給一個會痛的題目。
 *
 * 標題 2026-11-04 從「為什麼第 23 支才發現失敗？」改掉。那個問法有兩個問題：
 * 這一頁問的是「怎麼接回去」不是「為什麼才發現」，而且轉錄失敗當下就知道了，
 * 「才發現」在這個案例裡不成立。現在的標題對焦在這一頁真的在回答的那一題。
 * **這是改過的，要退回去請連同這段註解一起處理。**
 *
 * 字幕那個例子是講師 2026-11 手上真的在做的事，**不要換成別的題目**：
 * 它同時長出四個條件（量大、彼此獨立、有限額、會中斷），而且不用寫程式的人也看得懂。
 * 40 支是舉例，**不要寫成課程附的素材**。
 *
 * 這一頁跟下一頁原本是同一頁，2026-11-04 拆開，理由是量過：合在一起在 1512x772
 * 溢出 1049px，等於要捲兩次。拆開之後這一頁幾乎不用捲。
 * **分工：這一頁只擺問題，答案（Graph長什麼樣、值不值得畫）在下一頁，不要在這裡先畫圖。**
 *
 * 用色：五個答不出來的問題 amber（風險提示），其餘灰階，合計一種（A-1）。
 */

/** 一句話交代得動，但答不出來的五件事 */
const BLIND_SPOTS = [
  '第 23 支轉到一半失敗了，要從哪裡接回去？',
  '40 支能不能同時跑，會不會打爆 API 的用量限額？',
  '轉出來了但字幕品質不合格，要不要整支重轉？',
  '中途斷掉之後，哪幾支已經好了？',
  '每一支是不是都用同一把尺驗過？',
];

export default function SlideGraphWhen() {
  return (
    <SlideLayout
      title="40 支影片轉字幕，一句話為什麼不夠？"
      subtitle="Where One Prompt Runs Out"
      icon={ClipboardList}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <h3 className="text-slate-100 text-base font-bold mb-2">題目：40 支影片，全部轉成字幕檔</h3>
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-3.5 mb-3">
            <p className="text-slate-200 text-base leading-relaxed">
              「幫我把這 40 支影片轉成字幕，專有名詞要改對，時間軸要對得上，最後輸出 SRT 檔。」
            </p>
          </div>
          <p className="text-slate-400 text-base leading-relaxed">
            這句話 Claude Code 接得住，它會自己排一排然後開始做。
            <strong className="text-slate-200">但這五件事它沒有地方可以記，也回答不了</strong>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-amber-500/25 bg-amber-500/5 px-6 py-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle aria-hidden="true" size={18} className="text-amber-300 shrink-0" />
            <span className="text-amber-300 text-base font-bold">跑到一半你會遇到的</span>
          </div>
          <ul className="space-y-1.5">
            {BLIND_SPOTS.map((s) => (
              <li key={s} className="text-slate-300 text-base leading-relaxed flex gap-2.5">
                <span className="text-slate-600 shrink-0">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-amber-500/20">
            這五題<strong className="text-slate-200">沒有一題是把指令寫得更好就解得掉的</strong>。
            它們問的是這批工作怎麼排、狀態記在哪、壞掉從哪裡接回去。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
