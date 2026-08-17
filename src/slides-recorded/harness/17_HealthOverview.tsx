import { ClipboardCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { PairTable } from './_PairTable';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-17-health-overview',
  title: '手冊健檢：五個步驟',
  script:
    '手冊越寫越長是正常的，每加一條當下都有理由，所以需要一套固定的整理流程，建議每三個月跑一次。五步：盤點、減法、分流、加法、修剪。順序不能換，減法一定要排在分流前面。下面這段可以直接貼給它，注意最後那句要它先不要動檔案。',
  seconds: 42,
  from: 69,
};

const STEPS: [string, string][] = [
  ['1　盤點', '每條規則當初為了什麼而加'],
  ['2　減法', '刪掉已經不需要的'],
  ['3　分流', '把留下來的送到該去的地方'],
  ['4　加法', '這時候才補新規則'],
  ['5　修剪', '把句子改成可以檢查的'],
];

export default function RecHealthOverview() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ClipboardCheck}>
      <RecPage>
        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">五個步驟，<Key>順序不能換</Key></p>
        </AnimatedBlock>

        {/* 上方流程軌已經列出五個步驟，這裡不再加表頭，只補分隔線把配對框起來 */}
        <PairTable
          stepIndex={2}
          ratio="narrow"
          density="compact"
          rows={STEPS.map(([n, d]) => [
            <span className="font-mono font-bold text-sky-400">{n}</span>,
            d,
          ])}
        />

        {/*
          這裡原本有一塊 callout 寫「先刪再搬，順序反了就會把該刪的搬到別處，繼續佔著空間」。
          那句話就是第二步那一頁（19_HealthSubtract）整頁的主張，預告先把結論講完，
          走到那一頁時只剩重複。這一頁的職務是列出五步並給一句可以貼的指令，
          為什麼不能換順序留給第二步自己講。
        */}

        {/* 五步是給人看的流程，這一段是給人貼的。少了它，學員回去只會記得「有五步」但不知道怎麼開始。 */}
        <AnimatedBlock stepIndex={3} className="mt-5 rounded-2xl border border-sky-900/50 bg-sky-950/20 px-6 py-4">
          <div className="text-base font-mono uppercase tracking-widest text-sky-500 mb-2.5">Prompt</div>
          <p className="text-sky-100 text-lg leading-relaxed">
            「讀一遍我的 <code className="font-mono text-orange-300">CLAUDE.md</code>，照上面五步整理：
            每條在管什麼、哪幾條說不出理由、哪幾條該搬走、要不要補、哪些句子沒辦法檢查。
            <strong className="font-bold">先不要改檔案，列給我看。</strong>」
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
