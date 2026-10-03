import { Wrench } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 最後查證：2026-09-20，對照 code.claude.com/docs/en/hooks 的 handler 清單。
 * 當時的現況：正好五種，設定值是 command、http、mcp_tool、prompt、agent，
 * 與這一頁的五格逐項相符，本輪沒有改內容。
 * 下次改版前先重查那一節，不要憑印象改。
 */

/**
 * 第三層。五種攤開來是為了讓學員知道天花板在哪，但重點是第一種：
 * command 每個時機都支援，而且自己在終端機就測得出來。
 *
 * 排法跟 _StageMap 一致，白話在前、設定裡的名稱在後，讀的順序才不會一頁一個方向。
 *
 * 「不是每個時機都支援五種」一定要講，否則學員把 prompt 那種寫法掛到不支援的
 * 時機上，會安靜地不動作，然後以為自己設定檔寫錯。
 */
const HANDLERS = [
  { does: '跑一段指令', name: 'command', start: true },
  { does: '呼叫一個 API', name: 'http' },
  { does: '呼叫接上的工具', name: 'mcp_tool' },
  { does: '交給模型判斷', name: 'prompt' },
  { does: '派子代理去查', name: 'agent' },
];

export const meta: RecordedMeta = {
  id: 'harness-66-hook-handler',
  title: 'Hook 第三層：動作，條件過了要做什麼',
  script:
    '第三層是動作：時機到了、範圍也符合，接下來要做什麼？五種可以選。第一種，跑一行指令，就是你平常在終端機會打的那種，最常用。第二種，打一個網址，把這次發生的事情送到你指定的地方，公司有自己的系統就用這一種。第三種，呼叫你前面接上的那些工具，也就是 MCP 那一類。第四種，交給模型讀一次再決定，適合那種寫不成規則的事，像是這段文字的口氣對不對。第五種，派一個子代理去查，它能做的事最多，但也最慢。有一件事要先知道：不是每個時機都支援這五種，而且你寫了不支援的，不會報錯，只會安靜地什麼都不做。所以從第一種開始，跑指令每個時機都支援，而且你自己在終端機先打一次就知道它會不會動。',
  seconds: 63,
};

export default function RecHookHandler() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 3: Handler" icon={Wrench}>
      <RecPage className="space-y-5">
        <SeriesRail {...HOOK_RAIL} current={2} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            五種動作，<Key>從跑一段指令開始</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['時機到了', '範圍也符合', '執行這個動作']} />
        </AnimatedBlock>

        {/* 五個排成一直行會超出畫面，底下那塊警告會被切掉。排成兩欄，最後一個獨佔一行 */}
        <AnimatedBlock stepIndex={3} className="grid grid-cols-2 gap-2.5">
          {HANDLERS.map((h) => (
            <div
              key={h.name}
              className={`grid grid-cols-[1fr_auto] gap-4 items-baseline rounded-xl border px-6 py-3 ${
                h.start ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <span className="text-slate-300 text-lg">{h.does}</span>
              <span className="font-mono text-lg font-bold text-orange-300">{h.name}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            不是每個時機都支援五種。寫了不支援的不會報錯，只會安靜地什麼都不做。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
