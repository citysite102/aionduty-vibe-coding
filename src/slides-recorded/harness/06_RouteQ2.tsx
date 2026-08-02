import { FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { RouteRail } from './_RouteRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-06-route-q2',
  title: '這條規則該放哪？',
  script:
    '第二個問題：這條規則只在某一區才適用嗎？如果是，就把它放進那一區的資料夾裡。這樣只有當它動到那一區的時候，這份規則才會被讀進來，平常不會佔掉對話的空間。舉個例子，你可能只有在寫對外文件的時候才需要正式語氣，那條規則就沒必要每一輪都跟著，放進那個資料夾就好。',
  seconds: 34,
  from: 69,
};

export default function RecRouteQ2() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={FolderTree}>
      <RecPage>
        <RouteRail active={2} />

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="text-slate-500 text-base font-mono mb-3">依序要問的第 2 題，共 4 題</div>

          <div className="border-l-2 border-slate-700 pl-5 mb-7">
            <p className="text-slate-300 text-2xl leading-snug">只在某一區檔案才適用？</p>
          </div>

          <p className="text-slate-100 text-4xl font-bold mb-5 leading-snug">放進那一區的子目錄</p>

          <p className="text-slate-400 text-xl leading-relaxed">
            只有當它動到那一區的時候，這份規則才會被讀進來，平常不會佔掉對話的空間。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">只有「對外文件」那個資料夾才要用正式語氣</span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
