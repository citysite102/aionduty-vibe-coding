import { Repeat, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 原本是左右兩張卡各列三點，兩欄之間沒有對應關係，
 * 讀的人得自己在腦裡配對，「差異」其實看不出來。
 *
 * 改成逐列對照：左邊那一條現在的麻煩，右邊就是它被解掉之後的樣子。
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
    now: '不知道這樣用下去一個月要多少錢',
    after: '算得出大概的量級，也知道怎麼壓下來',
  },
];

export default function SlideM2SectionGoal() {
  return (
    <SlideLayout title="每次開新對話，你都要重講一次規矩" subtitle="What This Module Fixes" icon={Repeat}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-base leading-relaxed">
          上一段你做出了計時器。但它現在的樣子，是你一句一句盯出來的。
        </AnimatedBlock>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-6 py-3 border-b border-slate-800 bg-slate-950">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500">現在</div>
            <div className="w-4" />
            <div className="text-xs font-mono uppercase tracking-widest text-sky-400">這一段結束時</div>
          </div>

          {PAIRS.map((p, i) => (
            <AnimatedBlock
              key={p.now}
              stepIndex={i + 2}
              className={`grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 px-6 py-4 ${
                i > 0 ? 'border-t border-slate-800/70' : ''
              }`}
            >
              <p className="text-slate-500 text-sm leading-relaxed">{p.now}</p>
              <ArrowRight size={15} className="text-slate-700 shrink-0" />
              <p className="text-slate-100 text-sm font-medium leading-relaxed">{p.after}</p>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4 space-y-2">
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-300">先說一個接下來三頁都會用到的字。</strong>
            token 是計費的單位，可以粗略當成「字」：你打進去的、它吐出來的、它讀你專案讀進去的，都要算。
            中文一個字大約一到兩個 token。所以下面講的費用不是按時間算，是按這一次來回總共經過多少字算。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            最後那一項最難有體感，先給一個對照的錨點：找人外包寫一支自動抓資料的小腳本，
            報價大約一萬元、五個工作天；你自己指揮 AI 做，做完這一支的 token 費用大約七十元，一小時做完。
            <span className="text-slate-500">兩個數字都會因為需求規模差很多，這裡只拿來對照量級。</span>
          </p>
          <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-2.5">
            這一段不會教你精算帳單，但會讓你知道<strong className="text-slate-100">自己大概落在哪個量級</strong>，
            以及<strong className="text-slate-100">哪些做法會讓它暴增</strong>。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
