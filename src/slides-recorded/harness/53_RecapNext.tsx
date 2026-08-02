import { ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-53-recap-next',
  title: '下一段要解決什麼？',
  script:
    '手冊管得到「怎麼做」，管不到「什麼時候算做完」。到目前為止，每一輪都還是你按下開始、你來看結果、你決定要不要再跑一次。下一段換一個角度：怎麼設定一個目標，讓它自己跑完一輪、自己檢查、跑不過再修，修好了再回來找你。也就是把驗收這件事的一部分，交出去。',
  seconds: 38,
  from: 76,
};

export default function RecRecapNext() {
  return (
    <SlideLayout title={meta.title} subtitle="What Comes Next" icon={ArrowRight}>
      <RecPage className="space-y-6">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-100 text-4xl font-bold leading-snug">
            下一段：設一個目標，讓它自己跑完一輪
          </p>
          <p className="text-slate-400 text-xl leading-relaxed mt-4">
            到目前為止，每一輪都還是你按開始、你看結果、你決定要不要再跑。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-7 space-y-4">
          <div className="flex items-baseline gap-5">
            <span className="text-sky-400 text-lg font-bold shrink-0 w-32">手冊管得到</span>
            <span className="text-slate-300 text-xl">怎麼做</span>
          </div>
          <div className="flex items-baseline gap-5">
            <span className="text-slate-500 text-lg shrink-0 w-32">管不到</span>
            <span className="text-slate-400 text-xl">什麼時候算做完</span>
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
