import { FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { AskFirst } from '../../components/AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 例子裡的資料夾一定要有真的名字。原本寫「只有『對外文件』那個資料夾」，
 * 學員知道概念卻不知道實際上長什麼樣；這一系列講的就是「規則放在哪個位置」，
 * 位置是抽象的話，整頁的主張就落不了地。docs/public/ 是常見的放法，
 * 跟前面 .claude/rules/ 的 paths 寫法也對得起來。
 */
export const meta: RecordedMeta = {
  id: 'harness-06-route-q2',
  title: '規則放哪：只在某一區，放子目錄',
  script:
    '第二個問題：這條規則只在某一區才適用嗎？如果是，就把它放進那一區的資料夾裡。這樣只有當它動到那一區的時候，這份規則才會被讀進來，平常不會佔掉對話的空間。舉個例子，你可能只有在寫對外文件的時候才需要正式語氣。假設那些文件都放在 docs 斜線 public 這個資料夾，那條規則就放進那個資料夾裡，沒必要每一輪都跟著。這一層最容易被跳過，因為寫進根目錄比較省事。而省事的代價是你每一輪都在為它付錢。',
  seconds: 38,
  from: 69,
};

export default function RecRouteQ2() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={FolderTree}>
      <RecPage>
        <SeriesRail {...ROUTE_RAIL} current={1} revealAt={2} />
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>

            <p className="text-slate-300 text-2xl leading-snug mb-6">只在某一區檔案才適用？</p>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">放進那一區的子目錄</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              只有當它動到那一區的時候，這份規則才會被讀進來，平常不會佔掉對話的空間。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 flex items-baseline gap-4 px-2">
          <span className="text-slate-500 text-base shrink-0">例如</span>
          <span className="text-slate-300 text-xl">
            只有 <code className="font-mono text-slate-200">docs/public/</code> 這個資料夾（對外文件）才要用正式語氣
          </span>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
