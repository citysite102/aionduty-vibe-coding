import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * Hook 在整份簡報被提到十幾次，但一直只有這一頁在講它。現在它是七頁一組的
 * 第一頁，職務收窄成三件事：為什麼需要它、它憑什麼一定會執行、什麼時候才值得掛。
 * 怎麼寫（三層）、有哪些時機（Event）、範圍（Matcher）、動作（Handler）
 * 各自往後獨立一頁，這一頁一個設定欄位都不列。
 *
 * 這一組排在分流四問之前。分流的第一題就是「會出事的交給 Hook」，
 * 學員得先知道 Hook 是什麼、擋得住什麼，才答得了那一題。
 *
 * 例子一律用這份簡報真的掛著的那一條，因為擋下來的訊息學員在畫面上看得到，
 * 不必相信講者。
 */
export const meta: RecordedMeta = {
  id: 'harness-62-hook-why',
  title: 'Hook 是程式在擋，不是它記得',
  script:
    '前面三頁講的是規則寫了卻沒照做，原因有三種。那如果有一條規矩絕對不能違反呢？寫在手冊裡就不夠了，因為手冊是請它記得，而它可能沒讀到、可能讀到了還是漏掉。Hook 不一樣，Hook 是程式在擋，不經過它判斷。原理是這樣：它在幾個固定的時機會停下來，把當下要做的事交給你的設定看一眼，你的設定回答放行、擋下來，或者補一句話回去。被擋下來的時候它會看到拒絕的理由，然後自己換寫法重來，不需要你在場。這份簡報就掛著一條：每次要寫檔案之前先看內容裡有沒有破折號，有就擋。什麼時候值得掛？違反了會出事的，還有每一次都要做的那種。只發生過一次的事不用掛，寫在手冊裡就好。',
  seconds: 45,
  from: 68,
};

export default function RecHookHowTo() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Hooks" icon={ShieldCheck}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            手冊是請它記得，<Key>Hook 是程式在擋</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="font-mono text-base text-orange-300 mb-2">CLAUDE.md</div>
            <p className="text-slate-400 text-lg leading-relaxed">可能沒讀到，讀到了也可能漏掉</p>
          </div>
          <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 p-6">
            <div className="font-mono text-base text-orange-300 mb-2">settings.json</div>
            <p className="text-sky-100 text-lg leading-relaxed">一定會執行，不經過它判斷</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-500 text-base mb-2">原理</div>
          <p className="text-slate-300 text-xl leading-relaxed">
            它在幾個固定的時機停下來，把當下要做的事交給你的設定。設定回答放行、擋下，或補一句話回去。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <div className="text-amber-300 text-base font-bold mb-2">被擋下來的時候它看到這句</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            偵測到中文破折號，請改用逗號、句號、冒號或括號。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 值得掛的只有兩種：違反了會出事，或每一次都要做。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
