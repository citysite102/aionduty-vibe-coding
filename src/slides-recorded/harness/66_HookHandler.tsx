import { Wrench } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 第三層 Handler。五種攤開來給學員知道天花板在哪，但重點是最後那句：
 * 從 command 開始。command 是唯一每個時機都支援、而且自己在終端機就測得出來的。
 *
 * 「不是每個 Event 都支援五種」一定要講，否則學員照著抄一個 prompt handler
 * 掛到不支援的時機上，會安靜地不動作，然後以為自己寫錯設定檔。
 */
const HANDLERS = [
  { name: 'command', does: '跑一段指令', start: true },
  { name: 'http', does: '打一個網址' },
  { name: 'mcp_tool', does: '呼叫接上的工具' },
  { name: 'prompt', does: '交給模型判斷一次' },
  { name: 'agent', does: '派一個子代理去查' },
];

export const meta: RecordedMeta = {
  id: 'harness-66-hook-handler',
  title: '第三層 Handler：條件過了做什麼',
  script:
    '第三層是動作。條件都過了，它到底要做什麼？有五種。command 是跑一段指令，這是最常用的一種。http 是打一個網址出去。mcp_tool 是呼叫你接上的工具。prompt 是把這件事交給模型判斷一次，適合沒辦法用規則寫死的情況。agent 是派一個子代理去查，它可以自己讀檔案、自己跑工具，最強也最慢。有一件事要先知道：不是每個時機都支援這五種，有些時機只吃前三種，實際支援哪幾種要看官方文件，寫了不支援的它不會報錯，只會安靜地什麼都不做。所以從 command 開始，它每個時機都支援，而且你自己在終端機就測得出來。',
  seconds: 45,
};

export default function RecHookHandler() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 3: Handler" icon={Wrench}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            五種動作，<Key>從跑一段指令開始</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-2.5">
          {HANDLERS.map((h) => (
            <div
              key={h.name}
              className={`grid grid-cols-[10rem_1fr] gap-4 items-baseline rounded-xl border px-6 py-3 ${
                h.start ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <span className="font-mono text-lg font-bold text-orange-300">{h.name}</span>
              <span className="text-slate-300 text-lg">{h.does}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            不是每個時機都支援五種。寫了不支援的不會報錯，只會安靜地什麼都不做。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
