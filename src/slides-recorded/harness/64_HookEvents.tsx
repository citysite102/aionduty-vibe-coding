import { Clock } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { StageMap } from './_StageMap';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

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
  title: '第一層：每個階段先記一個',
  script:
    '第一層是時機。官方支援三十幾種，你不用背，按階段各記一個就夠。接到指令是 SessionStart，開新對話或接續舊紀錄的時候。工具執行前是 PreToolUse，它準備動手但還沒動。工具跑完是 PostToolUse，東西已經寫進去了，適合自動排版這種補動作。收尾是 Stop，它覺得做完了，適合在這裡驗一次，沒過就叫它回去改。下面六個也常用，需要的時候再看。加起來十個，重點是只有工具執行前擋得住，因為那時候它還沒動手，其他都是事情發生完才觸發，只能事後補做。',
  seconds: 45,
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
