import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * Hook 在整份簡報被提到十幾次，但從來沒有被展示過一次。
 * 學員一定會問兩件事：怎麼寫，以及它真的會自己觸發嗎。
 *
 * 用這份簡報自己的那一條當例子，因為它是真的在跑的，
 * 而且擋下來的訊息學員在畫面上看得到，不必相信講者。
 */
const HOOKS = [
  { on: 'PreToolUse', do: 'block writes containing API keys', why: '寫進去之前先擋' },
  { on: 'PostToolUse', do: 'run prettier on edited files', why: '改完自動排版' },
  { on: 'Stop', do: 'run npm test', why: '說做完之前先驗' },
];

export const meta: RecordedMeta = {
  id: 'harness-62-hook-howto',
  title: 'Hook 怎麼寫，真的會自己觸發嗎',
  script:
    '會出事的交給 Hook，那 Hook 到底怎麼寫？它是一段設定，不是程式。你告訴它三件事：什麼時候檢查、檢查什麼、不通過要怎麼辦。前面那個破折號的例子，擋它的就是 Hook，這份簡報真的掛著一條：每次它要寫檔案之前先看一眼，有破折號就擋。它會自己觸發，不需要你在場，被擋下來之後它會看到拒絕的理由，然後自己換寫法重來。實際的專案通常掛好幾條，各自管一件事：寫檔案之前擋金鑰、改完自動排版、它說做完之前先跑一次測試。時機不同，管的事情也不同。',
  seconds: 45,
  from: 68,
};

export default function RecHookHowTo() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={ShieldCheck}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            它是一段設定，<Key>不是程式</Key>
          </p>
          <p className="text-slate-500 text-xl leading-relaxed mt-2">
            你只要講三件事：何時檢查、檢查什麼、不通過怎麼辦。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 font-mono text-base text-slate-500">
            .claude/settings.json
          </div>
          <div className="px-6 py-4 font-mono text-lg leading-relaxed space-y-1">
            <div>
              <span className="text-slate-600">什麼時候　</span>
              <span className="text-sky-300">每次要寫檔案之前</span>
            </div>
            <div>
              <span className="text-slate-600">檢查什麼　</span>
              <span className="text-sky-300">內容裡有沒有破折號</span>
            </div>
            <div>
              <span className="text-slate-600">不通過　　</span>
              <span className="text-amber-300">擋下來，附一句理由</span>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-7 py-5">
          <div className="text-amber-300 text-base font-bold mb-2">它被擋下來的時候會看到這句</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            偵測到中文破折號，請改用逗號、句號、冒號或括號取代。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 text-base text-slate-500">
            實際專案通常掛好幾條
          </div>
          <div className="divide-y divide-slate-800/70">
            {HOOKS.map((h) => (
              <div key={h.on} className="grid grid-cols-[auto_1fr] gap-5 px-6 py-3 items-baseline">
                <span className="font-mono text-base text-orange-300 w-32 shrink-0">{h.on}</span>
                <div>
                  <div className="font-mono text-base text-slate-300">{h.do}</div>
                  <div className="text-slate-600 text-base mt-0.5">{h.why}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 它會自己觸發，不用你在場。被擋之後它自己換寫法重來。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
