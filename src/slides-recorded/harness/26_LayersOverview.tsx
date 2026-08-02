import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { LayerRail } from './_LayerRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-26-layers-overview',
  title: '一份不夠用的時候，還能放哪？',
  script:
    '一份放在專案根目錄的手冊可以用很久，多數人一直到專案變大都不需要動它。會用到下面這四個位置，通常是兩種情況：專案大到某一區有自己的規矩，或是你想把某些個人習慣帶到所有專案去。四個位置的原則只有一句：越靠近現場的越具體，也越優先。同一件事講法不同的時候，子目錄蓋過專案根目錄，專案根目錄蓋過全域。接下來四頁，一頁講一個位置。',
  seconds: 44,
  from: 55,
};

export default function RecLayersOverview() {
  return (
    <SlideLayout title={meta.title} subtitle="Multiple Layers of Settings" icon={Layers}>
      <RecPage>
        <LayerRail active={0} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-2xl leading-snug">一份可以用很久，專案變大才會用到分層</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="mb-6">
          <p className="text-slate-100 text-4xl font-bold leading-snug">越靠近現場的越具體，也越優先</p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={3}
          className="bg-slate-900 border border-slate-800 border-l-4 border-l-sky-500 rounded-xl px-6 py-4"
        >
          <p className="text-slate-300 text-xl leading-relaxed">
            同一件事講法不同時，子目錄蓋過專案根目錄，專案根目錄蓋過全域。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
