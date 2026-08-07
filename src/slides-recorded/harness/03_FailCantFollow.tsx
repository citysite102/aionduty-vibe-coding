import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, FAIL_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

const CASES = [
  {
    tag: '無法判定',
    title: '規則沒生效：沒辦法檢查',
    desc: '「程式碼要優雅」沒有客觀判準，它無法確認自己有沒有做到。',
  },
  {
    tag: '互相矛盾',
    title: '兩條規則同時滿足不了',
    desc: '「一頁最多兩種強調色」跟「錯誤用紅、正解用綠、警告用琥珀」，遇到三種情境就一定違反其中一條。',
  },
  {
    tag: '被覆蓋',
    title: '你在對話裡推翻了它',
    desc: '你說過「這次先不管樣式」，那句話比手冊晚出現，它照最近的指令走。',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-03-fail-cant-follow',
  title: '為什麼規則沒有生效？',
  script:
    '第三類情況，規則載入了、位置也對，但它還是做不到，有三種。第一種，規則沒有可以檢查的標準，像是程式碼要優雅，沒有客觀判準，它無法確認自己有沒有做到。第二種，兩條規則同時滿足不了。舉個真實的例子：一頁最多兩種強調色，跟錯誤用紅、正解用綠、警告用琥珀，這兩條放在一起，只要遇到三種情境就一定違反其中一條。第三種是你自己造成的，你在對話裡說過相反的話，那句話比手冊晚出現，它會照最近的指令走。',
  seconds: 45,
  from: 68,
};

export default function RecFailCantFollow() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={ShieldAlert}>
      <RecPage className="space-y-4" handbook={1}>
        <SeriesRail {...FAIL_RAIL} current={2} />
        <AnimatedBlock className="mb-6">
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            因為那條規則本身，<Key>沒辦法被照著做</Key>。
          </p>
        </AnimatedBlock>

        {CASES.map((c, i) => (
          <AnimatedBlock
            key={c.tag}
            stepIndex={i + 1}
            className="bg-slate-900 border border-slate-800 rounded-2xl px-7 py-5 flex gap-5 items-baseline"
          >
            <div className="w-28 shrink-0 text-sky-400 font-bold text-lg">{c.tag}</div>
            <div>
              <div className="text-slate-100 text-xl font-bold mb-1.5">{c.title}</div>
              <p className="text-slate-400 text-lg leading-relaxed">{c.desc}</p>
            </div>
          </AnimatedBlock>
        ))}
      </RecPage>
    </SlideLayout>
  );
}
