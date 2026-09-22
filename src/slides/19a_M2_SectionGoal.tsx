import { Repeat, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-09-21 拿掉頁尾整塊 token 說明（計費單位、外包報價的對照錨點）。
 * 這一頁的職務是「這一段要處理什麼」，那一塊卻在解釋一個名詞。
 * token 的定義現在放在 Slide 51「Harness 對成本的影響」的開場，那裡才接得上。
 * 同一個名詞講兩遍，學員第二次聽到只會覺得跳過。要補回來的話請放 Slide 51，不要放這裡。
 * （原本寫「放章節五最後那個付費單元」，那三頁 2026-09-22 已整組移除。）
 *
 * 第四列原本是「不知道一個月要多少錢／算得出量級也知道怎麼壓」。這一頁的標題是
 * 「每次開新對話，你都要重講一次規矩」，前三列都在講規矩，第四列跳到錢，
 * 讀起來像硬塞進來的。錢確實是這一章的內容（Slide 51 整頁在講），但它要接得上這一頁的框。
 * 改成從規矩接到載入：規矩越多、每次帶進去的東西越多，那正是成本的來源，
 * 也是後面「載入時機與存放位置」那個單元在處理的事。
 *
 * 原本是左右兩張卡各列三點，兩欄之間沒有對應關係，
 * 讀的人得自己在腦裡配對，「差異」其實看不出來。
 *
 * 改成逐列對照：左邊那一條現在的麻煩，右邊就是它被處理掉之後的樣子。
 * 一列一組，視線只要橫著走，不用來回跳。
 */
const PAIRS = [
  {
    now: '開了新對話，它不記得你的配色',
    after: '一份 CLAUDE.md，新對話自動讀進去',
  },
  {
    now: '那幾條規矩，你已經重貼過很多次',
    after: '寫一次就好，之後每次都在',
  },
  {
    now: '它沒照做，你不知道問題出在哪',
    after: '知道先查哪一層，也知道怎麼確認它讀到了',
  },
  {
    now: '規矩越寫越多，但你不知道它每次讀進去多少',
    after: '看得出這次帶了哪些東西進去，也知道哪些可以不要一直帶著',
  },
];

export default function SlideM2SectionGoal() {
  return (
    <SlideLayout title="每次開新對話，你都要重講一次規矩" subtitle="What This Module Fixes" icon={Repeat}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-base leading-relaxed">
          你在章節三做出來的那個計時器，現在的樣子是你一次次下指令、看結果、再修回來的。
        </AnimatedBlock>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-6 py-3 border-b border-slate-800 bg-slate-950">
            <div className="text-sm font-bold tracking-wide text-slate-400">現在</div>
            <div className="w-4" />
            <div className="text-sm font-bold tracking-wide text-sky-400">這一段結束時</div>
          </div>

          {PAIRS.map((p, i) => (
            <AnimatedBlock
              key={p.now}
              stepIndex={i + 2}
              className={`grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-6 py-4 ${
                i > 0 ? 'border-t border-slate-800/70' : ''
              }`}
            >
              <p className="text-slate-400 text-base leading-relaxed">{p.now}</p>
              <ArrowRight size={17} className="text-slate-700 shrink-0" />
              <p className="text-slate-100 text-base font-medium leading-relaxed">{p.after}</p>
            </AnimatedBlock>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
