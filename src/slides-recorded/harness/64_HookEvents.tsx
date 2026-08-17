import { Clock } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 第一層 Event。官方支援三十幾種，全列出來只會讓人放棄，
 * 所以按「什麼階段」分成四格，每格先記一個，其餘等真的需要再查。
 *
 * used 標的是這份簡報自己掛過的那兩個。學員需要知道哪幾個是真的會用到的，
 * 不然四個看起來一樣重要，記完還是不知道從哪裡開始。
 */
const STAGES = [
  { stage: '接到指令', ev: 'SessionStart', when: '開新對話或接續紀錄', used: false },
  { stage: '工具執行前', ev: 'PreToolUse', when: '準備用工具，還沒執行', used: true },
  { stage: '工具執行後', ev: 'PostToolUse', when: '工具跑完之後', used: false },
  { stage: '收尾', ev: 'Stop', when: '做完這一輪，準備停下', used: true },
];

export const meta: RecordedMeta = {
  id: 'harness-64-hook-events',
  title: '第一層 Event：每個階段先記一個',
  script:
    '第一層是時機。官方支援三十幾種，你不用背，按階段各記一個就夠開始。接到指令的時候是 SessionStart，開新對話或接續舊紀錄會觸發，適合每次都要先講一遍的事。工具執行前是 PreToolUse，它準備動手但還沒動，這是唯一擋得住的時機，前面那條破折號就掛在這裡。工具跑完之後是 PostToolUse，東西已經寫進去了，適合自動排版這種補動作。收尾是 Stop，它覺得做完了、準備停下來，適合在這裡驗一次，沒過就叫它回去改。這四個裡面，我們自己掛過的是 PreToolUse 跟 Stop。想找其他的直接問它有哪些時機，不要背。',
  seconds: 45,
};

export default function RecHookEvents() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 1: Event" icon={Clock}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            三十幾種，<Key>按階段各記一個就夠</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-4">
          {STAGES.map((s) => (
            <div
              key={s.ev}
              className={`rounded-2xl border p-5 ${
                s.used ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="text-slate-500 text-base mb-1.5">{s.stage}</div>
              <div className="font-mono text-xl font-bold text-orange-300">{s.ev}</div>
              <div className="text-slate-400 text-lg mt-1.5 leading-relaxed">{s.when}</div>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 亮起來這兩個是我們真的掛過的。擋得住的只有工具執行前那一個。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
