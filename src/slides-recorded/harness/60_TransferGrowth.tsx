import { TrendingUp } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 前一頁的結論是「五行就夠了」。那句話對，但單獨留著會把天花板釘住，
 * 學員帶走的印象會是「這東西只能寫五行」。
 *
 * 這一頁把同一份手冊往前推六個月，讓整段教的機器全部落在一個非程式的工作上。
 * 重點不是「以後會變複雜」，是「複雜的時候你已經知道每一塊該去哪」。
 */
const STAGES = [
  {
    when: '第一週',
    what: '五行，都在根目錄那份',
    tool: '',
  },
  {
    when: '第二個月',
    what: '寫提案的固定步驟包出去：先查客戶前三次的紀錄，再套五段結構',
    tool: 'Skill',
  },
  {
    when: '第四個月',
    what: '成本結構那條加上機制，檔案要寄出去之前先掃一次',
    tool: 'Hook',
  },
  {
    when: '第六個月',
    what: '客戶從三家變十二家，各自的格式分開放',
    tool: '子目錄',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-60-transfer-growth',
  title: '同一份手冊，六個月後',
  script:
    '五行就夠了，但那是起點不是終點。把同一件事往前推六個月看看。第二個月，你發現寫提案的前置步驟每次都一樣，先查客戶前三次的紀錄再套五段結構，那套步驟包成一個 Skill，用到才展開。第四個月，成本結構那條光靠文字還是有人會漏，所以加一道 Hook，檔案要寄出去之前先掃一次。第六個月，客戶從三家變十二家，各自的格式分到子目錄，用到誰才讀誰。你看，前面那一整段教的東西，全部落在一個跟程式無關的工作上。',
  seconds: 45,
  from: 75,
};

export default function RecTransferGrowth() {
  return (
    <SlideLayout title={meta.title} subtitle="It Grows With You" icon={TrendingUp}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            五行是起點，<Key>不是天花板</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          {STAGES.map((s) => (
            <div
              key={s.when}
              className="grid grid-cols-[auto_1fr_auto] items-baseline gap-5 px-6 py-4 border-b border-slate-800/70 last:border-0"
            >
              <span className="font-mono text-base text-slate-600 w-24">{s.when}</span>
              <span className="text-slate-300 text-lg leading-snug">{s.what}</span>
              {s.tool && (
                <span className="shrink-0 rounded-lg border border-sky-900/60 bg-sky-500/10 px-3 py-1 font-mono text-base font-bold text-sky-300">
                  {s.tool}
                </span>
              )}
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 複雜的時候你已經知道每一塊該去哪，不用重學。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
