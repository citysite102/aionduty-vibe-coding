import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * Hook 這一組的第一頁，職務只有三件事：為什麼需要它、它憑什麼一定會執行、
 * 什麼時候才值得掛。怎麼寫、有哪些時機、範圍、動作各自往後一頁，這一頁不列設定欄位。
 *
 * 原理原本寫成一段話（「它在幾個固定的時機停下來，把當下要做的事交給你的設定⋯」），
 * 讀者要自己在腦裡把先後順序排出來。改成一排四步，順序由版面講，句子省下來。
 *
 * 例子一律用這份簡報真的掛著的那一條，擋下來的訊息學員在畫面上看得到，
 * 不必相信講者。
 */
export const meta: RecordedMeta = {
  id: 'harness-62-hook-why',
  title: 'Hook 是程式在擋，不是它記得',
  script:
    '剛剛那三種原因，都是它讀了卻沒做到。那如果有一條規矩絕對不能違反呢？寫在手冊裡就不夠了，因為手冊是請它記得，而它可能沒讀到、可能讀到了還是漏掉。Hook 不一樣，Hook 是程式在擋，不經過它判斷。順序是這樣：你交代一件事，它動手之前會先停下來，把當下要做的事交給你的設定看一眼，設定說放行才過得去，說不行就擋下來。被擋的時候它會看到拒絕的理由，然後自己換寫法重來，不需要你在場。這份簡報就掛著一條：每次要寫檔案之前先看內容裡有沒有破折號，有就擋。什麼時候值得掛？違反了會出事的，還有每一次都要做的那種。只發生過一次的事不用掛，寫在手冊裡就好。',
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
          <div className="text-slate-500 text-base mb-3">它每次動手之前會走這一段</div>
          <FlowRow steps={['你交代一件事', '動手前停下來', '設定看一眼', '放行或擋下']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <div className="text-amber-300 text-base font-bold mb-2">被擋的時候它看到這句</div>
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
