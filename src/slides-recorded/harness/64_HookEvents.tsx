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

export const meta: RecordedMeta = {
  id: 'harness-64-hook-events',
  title: '第一層：每個階段先記一個',
  script:
    '第一層是時機。官方支援三十幾種，你不用背，按階段各記一個就夠開始。接到指令的時候是 SessionStart，開新對話或接續舊紀錄會觸發，適合每次都要先講一遍的事。工具執行前是 PreToolUse，它準備動手但還沒動，這是唯一擋得住的時機，前面那條破折號就掛在這裡。工具跑完之後是 PostToolUse，東西已經寫進去了，適合自動排版這種補動作。收尾是 Stop，它覺得做完了、準備停下來，適合在這裡驗一次，沒過就叫它回去改。這四個裡面最常掛的是 PreToolUse 跟 Stop，畫面上亮起來那兩格。想找其他的直接問它有哪些時機就好。',
  seconds: 45,
};

export default function RecHookEvents() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 1: Event" icon={Clock}>
      <RecPage className="space-y-5" handbook={1}>
        <SeriesRail {...HOOK_RAIL} current={0} />

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            三十幾種，<Key>按階段各記一個</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <StageMap items={STAGES} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 亮起來的是最常掛的兩個。擋得住的只有工具執行前那一格。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
