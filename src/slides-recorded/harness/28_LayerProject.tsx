import { FileText } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { LayerRail } from './_LayerRail';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-28-layer-project',
  title: '這一層要放什麼？',
  script:
    '第二層，專案根目錄。這一份是整堂課的主力，前面你寫的那一份就是它。它放的是這個專案的規章，會跟著進版本控制，團隊每個人拿到的都是同一份。它的載入方式也跟其他層不一樣：對話一開始就載入，整場都在，就算中途觸發了 compaction 也會自動重讀，不會掉。所以最重要、每一輪都要遵守的規矩放這裡。',
  seconds: 41,
  from: 55,
};

export default function RecLayerProject() {
  return (
    <SlideLayout title={meta.title} subtitle="Multiple Layers of Settings" icon={FileText}>
      <div className="max-w-4xl mx-auto pt-2">
        <LayerRail active={2} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">第 2 層，共 4 層</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-sky-300 text-2xl font-mono leading-snug">./CLAUDE.md</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">這個專案的規章，團隊共用</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            跟著進版本控制，每個人拿到的都是同一份。前面你寫的那一份就是它。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="mt-5 bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-4"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            對話一開始就載入，整場都在，compaction 之後會自動重讀。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
