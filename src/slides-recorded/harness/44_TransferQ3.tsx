import { GitBranch } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Callout } from './_Callout';
import { TransferRail } from './_TransferRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-44-transfer-q3',
  title: '想不出來的話，先問哪三題？',
  script:
    '第三題：哪些事情只有特定情況才適用？以會議紀錄來說，對外要寄給客戶的版本，跟內部留存的版本規矩不一樣，措辭要更保守、有些內部討論不能寫進去。這種只在某些時候才成立的規矩要分出去，另外開一個檔案，用到的時候才讀。塞進同一份，就是手冊越寫越肥的開始，而且平常那八成的情況都在替它付空間。',
  seconds: 42,
  from: 75,
};

export default function RecTransferQ3() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={GitBranch}>
      <RecPage>
        <TransferRail active={2} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <div className="text-slate-500 text-base font-mono mb-3">第 3 題，共 3 題</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-5">
            <p className="text-slate-300 text-2xl leading-snug">哪些事情只有特定情況才適用？</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold leading-snug">這些分出去，用到的時候才讀</p>
        </AnimatedBlock>

        <Callout stepIndex={2} label="例如">
          只有對外版本才需要的措辭規矩
        </Callout>

        <AnimatedBlock stepIndex={3} className="mt-5 px-1">
          <p className="text-slate-400 text-xl leading-relaxed">塞進同一份，就是手冊越寫越肥的開始。</p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
