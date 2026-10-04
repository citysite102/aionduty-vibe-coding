import { CheckCircle2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 這一段唯一的收尾頁，所以它要收的是這一章最開始列的四個問題，一題一格。
 *
 * 2026-09-23：口白開頭原本寫「入口那張地圖列了四個問題」。那張地圖是章節六的分節頁，
 * 學員聽到「入口」「地圖」不會知道指的是哪一頁，改成「最開始列的那四個問題」。
 * 同一輪把全片的「肥」換掉（見下方那一格）。
 *
 * 原本只有三格，而且對到的是前兩題（診斷與歸位）。第三題（健檢）與第四題（六個寫法）
 * 各講了六七頁，收尾卻沒有提，學員會覺得那兩段沒有結論。
 *
 * 接 M3 的那一句原本寫在 32d_M2_Recap，但那一頁被這一組頂替，不會播，
 * 所以那個橋等於掉了。搬到這裡來。
 *
 * 「講義在課程網站 handouts 底下」拿掉了：那是課務交代（D-2），
 * 而且畫面上也給不出實際網址，學員回頭翻講義的時候用不到。
 *
 * 2026-10-04 兩處（講師）：
 *   1. 標題的「四個成果」是空心的詞（D-2），讀者答不出那四個成果具體是什麼。
 *      這一頁收的是這一章最開始列的四個問題，標題就把那四題的關鍵詞列出來。
 *      中途試過「四個問題的答案，都在同一個 CLAUDE.md」，講師指出文不對題：
 *      第三題「越寫越長怎麼整理」的答案是一套流程，不是手冊裡的一條。
 *      **列舉式的標題要回去數頁面上真的有幾個、對不對得上**（D-5）。
 *      標題改了，`courseUnits.ts` 的 anchor 要一起確認。
 *   2.「它跟著專案走」沒說怎麼跟。實際的機制是它就在專案資料夾裡，跟程式一起進版控，
 *      推上 GitHub 之後才真的換台電腦也在。Git 與 GitHub 在章節三已經看過。
 */
const DONE = [
  { n: '1', t: '沒照做時先查哪裡', d: '三種：沒被載入、被埋在後面、沒辦法檢查。' },
  { n: '2', t: '規則該送去哪', d: '會出事→Hook、某一區→子目錄、有步驟→Skill、其餘→根目錄。' },
  { n: '3', t: '越寫越長怎麼整理', d: '五步：盤點、減法、歸位、加法、修剪。先刪再搬。' },
  { n: '4', t: '每一條怎麼寫', d: '白名單、探索空間、理由、例子、例外、一次一件。' },
];

export const meta: RecordedMeta = {
  id: 'harness-48-recap',
  title: '診斷、歸位、健檢、寫法：四個答案',
  script:
    '這一章最開始列的那四個問題，現在四個都有答案了。它沒照做的時候，你知道先查哪裡，而不是急著再加一條。拿到一條規則，你知道該送去哪。手冊變得越來越長的時候，你有五步可以整理，而且記得先刪再搬。每一條該怎麼寫，你有六個寫法，還有一句判斷標準：只看做出來的東西，你能不能回答有做到或沒做到。這一章從頭到尾動的都是同一個檔案，你的專案資料夾裡多了一個 CLAUDE.md。健檢那五步是流程，寫法那六條是技巧，但它們改的都是這一份。它就是專案裡的一個檔案，跟程式一起進版控，推上 GitHub 之後，你換一台電腦把專案拉下來，或者交給別人接手，這些規則都還在。但手冊只規範做法，沒有人檢查做出來的東西。',
  seconds: 56,
  from: 76,
};

export default function RecRecap() {
  return (
    <SlideLayout title={meta.title} subtitle="What You Walked Away With" icon={CheckCircle2}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="grid grid-cols-2 gap-4 items-stretch">
          {DONE.map((x) => (
            <div key={x.n} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5 flex flex-col">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-lg font-bold text-sky-400">{x.n}</span>
                <h3 className="text-slate-100 text-xl font-bold leading-snug">{x.t}</h3>
              </div>
              <p className="text-slate-400 text-base leading-relaxed mt-auto">{x.d}</p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-2xl border px-7 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            這一章動的都是同一個檔案：專案資料夾裡那份{' '}
            <code className="font-mono text-orange-300">CLAUDE.md</code>，跟程式一起進版控。
            <Key>推上 GitHub 之後換台電腦、換人接手都還在</Key>。
          </p>
        </AnimatedBlock>

        {/* 接 M3 的橋。原本在被頂替的那一頁裡，不搬過來就斷了 */}
        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            手冊只規範做法，沒有第二個人檢查做出來的東西。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
