import { Library } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SurfaceRail } from './_SurfaceRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-34-surface-projects',
  title: '這個地方能做什麼？',
  script:
    '第一個，Claude Projects，在網頁版裡面。它讓你把團隊長期共用的規格與規範放在同一個地方，每次開新對話都自動帶著，不用再貼一次。回到那兩個問題：它碰得到的是你上傳的那些檔案，不是你電腦裡的資料夾；它不會在你的電腦裡建立檔案，也不會執行任何指令。所以它適合累積知識，不適合交付動手的工作。',
  seconds: 42,
  from: 72,
};

export default function RecSurfaceProjects() {
  return (
    <SlideLayout title={meta.title} subtitle="Same Rules, Different Surface" icon={Library}>
      <RecPage>
        <SurfaceRail active={1} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">1 / 3　網頁版</div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">團隊長期共用的規範放同一處</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            每次開新對話都自動帶著，不用再貼一次。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="mt-5 bg-slate-900 border border-slate-800 border-l-4 border-l-slate-600 rounded-xl px-6 py-4"
        >
          <p className="text-slate-400 text-xl leading-relaxed">
            不會在你的電腦裡建立檔案，也不會執行指令。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
