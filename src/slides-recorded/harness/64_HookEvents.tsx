import { Clock } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { StageMap } from './_StageMap';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * **口白刻意超過 45 秒（67 秒），不要砍回去。** 理由同 62_HookHowTo：
 * 這一組要講得比原本細。原本四個時機各一句帶過，現在每一個都說明它適合掛什麼。
 * 「只有工具執行前擋得住」是這一頁唯一非記不可的一句，留在最後。
 */
/**
 * 最後查證：2026-09-20，對照 code.claude.com/docs/en/hooks 的事件清單。
 * 當時的現況：官方支援 33 個事件，所以口白的「三十幾種」成立。
 * 四格主事件（SessionStart、PreToolUse、PostToolUse、Stop）與底下六個
 * （UserPromptSubmit、PostToolUseFailure、PermissionRequest、SubagentStop、
 * PreCompact、SessionEnd）全部存在且拼法相符，本輪沒有改內容。
 * 下次改版前先重查那一節，不要憑印象改。
 */

/**
 * 第一層。官方支援三十幾種時機，全列出來只會讓人放棄，
 * 所以按階段分四格，每格記一個，其餘等真的需要再查。
 *
 * on 標的是最常掛的那兩個。學員需要知道哪幾個是真的會用到的，
 * 不然四格看起來一樣重要，看完還是不知道從哪裡開始。
 *
 * 措辭不要寫成「我們掛過這兩個」。這份簡報實際掛在版控裡的只有工具執行前那一條，
 * 收尾那一條是本機的設定。畫面上的話學員查得到，說大了就會被抓到。
 */
const STAGES = [
  { stage: '接到指令', code: 'SessionStart', note: '開新對話或接續' },
  { stage: '工具執行前', code: 'PreToolUse', note: '還沒動手', on: true },
  { stage: '工具執行後', code: 'PostToolUse', note: '已經寫進去了' },
  { stage: '收尾', code: 'Stop', note: '準備停下', on: true },
];

/**
 * 上面四個加這六個，湊成十個常用的。
 * 十個不是要人背下來，是讓學員知道「掛得起來的時機不只有寫檔案前後」，
 * 之後要找的時候有一份可以對的清單。要更完整的一律去官方文件，那份會改版。
 */
const MORE = [
  { code: 'UserPromptSubmit', when: '你送出一句話' },
  { code: 'PostToolUseFailure', when: '工具跑失敗' },
  { code: 'PermissionRequest', when: '它要跟你要權限' },
  { code: 'SubagentStop', when: '子代理做完' },
  { code: 'PreCompact', when: '對話要壓縮之前' },
  { code: 'SessionEnd', when: '這次對話結束' },
];

export const meta: RecordedMeta = {
  id: 'harness-64-hook-events',
  title: 'Hook 第一層：時機，每個階段記一個',
  script:
    '第一層是時機，也就是這段檢查要在什麼時候跑。官方支援三十幾種，你完全不用背，照一輪對話的四個階段各記一個就夠了。第一個，你剛開一個新對話，或者接續昨天那一段，這個時機叫 SessionStart，適合每次開工都要先講一次的東西。第二個，它準備要動手了但還沒動，叫 PreToolUse，這是四個裡面最重要的。第三個，它做完了，檔案已經寫進去，叫 PostToolUse，適合事後補一刀，例如自動排版。第四個，它覺得整件事做完要收工了，叫 Stop，適合在這裡驗收一次，沒過就叫它回去改。常用的還有六個，畫面下面列著，需要的時候再查就好。這裡有一個關鍵：這幾個裡面，只有工具執行前那一個擋得住，因為那時候它還沒動手。其他三個都是事情已經發生才觸發，你只能事後補救，不能阻止。',
  seconds: 67,
};

export default function RecHookEvents() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 1: Event" icon={Clock}>
      <RecPage className="space-y-5">
        <SeriesRail {...HOOK_RAIL} current={0} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            三十幾種，<Key>按階段各記一個</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <StageMap items={STAGES} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <div className="text-slate-500 text-base mb-3">常用的還有這六個</div>
          <div className="grid grid-cols-3 gap-3">
            {MORE.map((m) => (
              <div key={m.code} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                <div className="font-mono text-base font-bold text-orange-300">{m.code}</div>
                <div className="text-slate-500 text-base mt-0.5">{m.when}</div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 十個裡面只有工具執行前擋得住，那時候它還沒動手。其他都是事後才觸發。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
