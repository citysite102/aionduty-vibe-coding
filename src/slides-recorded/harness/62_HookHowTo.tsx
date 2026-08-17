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
    '第一題的答案是交給 Hook 或 CI，那 Hook 到底是什麼？手冊是請它記得，而它可能沒讀到，也可能讀到了還是漏掉。Hook 不一樣，你寫一段設定，擋的動作是工具自己做的。順序是你交代一件事，它動手之前先停下來，把接下來要做的事交給你的設定檢查一次，說可以才過得去。被擋的時候它會看到理由，自己換寫法重來。這份簡報就掛著一條：寫檔案之前先看有沒有破折號。什麼時候值得掛？違反了會出事的，還有每一次都要做的。',
  seconds: 45,
  from: 68,
};

export default function RecHookHowTo() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Hooks" icon={ShieldCheck}>
      <RecPage className="space-y-5">
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
            <p className="text-sky-100 text-lg leading-relaxed">你寫設定，工具自己執行</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-500 text-base mb-3">它每次動手之前會走這一段</div>
          <FlowRow steps={['你交代一件事', '它動手前停下來', '你的設定檢查一次', '放行或擋下來']} />
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
