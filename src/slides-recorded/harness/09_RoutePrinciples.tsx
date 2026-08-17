import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-09-route-principles',
  title: '保證越高的，改起來越麻煩',
  script:
    '這四個去處有一個共同的取捨：擋得越死的，改起來越麻煩。Hook 是程式在擋，一定會執行，但你要去動設定檔；如果是 CI，還要開一次 PR 讓整個團隊一起改。相對的，寫在 CLAUDE.md 裡的規則就是一行文字，隨時能改，代價是它不保證會被照做。所以不是越硬越好，是看那條規矩值不值得付那個改動成本。還有第二個原則：同一條規則不要放兩個地方。已經有 Hook 在擋的事，文字版就是重複的，那是你之後健檢時最容易刪掉的一批。',
  seconds: 38,
  from: 69,
};

const LAYERS = [
  { name: 'Hook / CI', sure: '一定會執行', cost: '動設定檔，CI 還要團隊一起改', strong: true },
  { name: '子目錄 rules', sure: '碰到那一區才載入', cost: '改一行文字' },
  { name: 'Skill', sure: '用到才展開', cost: '改一個檔案' },
  { name: '根目錄 CLAUDE.md', sure: '不保證照做', cost: '改一行文字' },
];

export default function RecRoutePrinciples() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={Layers}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[1.1fr_1fr_1.3fr] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-500">
            <span />
            <span>保證程度</span>
            <span>要改的時候</span>
          </div>
          {LAYERS.map((l) => (
            <div
              key={l.name}
              className={`grid grid-cols-[1.1fr_1fr_1.3fr] gap-4 px-6 py-4 border-b border-slate-800/70 last:border-0 ${
                l.strong ? 'bg-sky-950/20' : ''
              }`}
            >
              <span className={`text-lg font-bold ${l.strong ? 'text-sky-300' : 'text-slate-300'}`}>{l.name}</span>
              <span className="text-slate-400 text-lg">{l.sure}</span>
              <span className={`text-lg ${l.strong ? 'text-amber-200/80' : 'text-slate-500'}`}>{l.cost}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="border rounded-2xl px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 不是越硬越好，是<Key>那條規矩值不值得付那個改動成本</Key>。同一條也不要放兩個地方。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
