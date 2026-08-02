import { Download } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import type { RecordedMeta } from '../types';

const FILES = ['CLAUDE.md 模板', '規則分流判斷卡', '五步健檢檢查表', '錯誤訊息判讀對照表'];

export const meta: RecordedMeta = {
  id: 'harness-52-recap-handouts',
  title: '這一段的講義在哪裡下載？',
  script:
    '這一段用到的四份講義都放在課程網站的 handouts 目錄底下：CLAUDE.md 模板、規則分流判斷卡、五步健檢檢查表，還有錯誤訊息判讀對照表，另外有可以直接列印的 A4 版本。回去之後請做一件事：把模板複製到你手上真正在跑的專案，填完之後跑一次斜線 context，確認它出現在載入清單裡。填了沒載入，等於沒填。',
  seconds: 43,
  from: 76,
};

export default function RecRecapHandouts() {
  return (
    <SlideLayout title={meta.title} subtitle="Module 2 Recap" icon={Download}>
      <div className="max-w-4xl mx-auto pt-2 space-y-6">
        <AnimatedBlock stepIndex={1} className="bg-slate-950 border border-slate-800 rounded-2xl px-7 py-5">
          <div className="text-sky-300 font-mono text-xl break-all">
            citysite102.github.io/aionduty-vibe-coding/handouts/
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="flex flex-wrap gap-3">
          {FILES.map((f) => (
            <span
              key={f}
              className="rounded-full border border-slate-800 bg-slate-900 px-5 py-2 text-slate-400 text-lg"
            >
              {f}
            </span>
          ))}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={3}
          className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-5"
        >
          <p className="text-slate-100 text-4xl font-bold leading-snug mb-4">回去先做這件事</p>
          <p className="text-slate-300 text-xl leading-relaxed">
            把模板複製到你真正在跑的專案，填完跑一次{' '}
            <code className="text-sky-300 font-mono">/context</code> 確認它在。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
