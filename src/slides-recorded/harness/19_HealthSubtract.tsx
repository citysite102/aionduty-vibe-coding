import { Minus } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23：講師回饋「可以說明甚至能讓 AI 協助你進行判斷與刪減，評估什麼樣的規則並沒有生效」。
 * 原本這一頁只講順序（先刪再搬），學員知道要刪卻不知道從哪幾條下手。
 * 多一塊可以直接貼的問句，讓它先框出候選，人再決定。判斷的依據在下一頁。
 */

export const meta: RecordedMeta = {
  id: 'harness-19-health-subtract',
  title: '手冊健檢：先刪再搬',
  script:
    '第二步是減法。這一步最容易被跳過，因為刪東西比加東西難決定，刪錯了好像還要負責。但順序一定是先刪再搬：如果先歸位再減法，你會把本來該刪掉的規則搬到子目錄，它在那裡繼續佔著空間，下次健檢還要再處理一次。那哪幾條該刪？不用全部自己想，可以把這一句貼給它：看我們最近幾次的對話，這份 CLAUDE.md 裡有哪幾條你其實沒用上，或是我一直要重講。它框出來的那幾條，就是你要優先看的。要不要真的刪掉還是你決定。',
  seconds: 45,
  from: 69,
};

export default function RecHealthSubtract() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={Minus}>
      <RecPage>
        <SeriesRail {...HEALTH_RAIL} current={1} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug"><Key>先刪再搬</Key>，順序不要反</p>
        </AnimatedBlock>

        {/* 口白說「這一步最容易被跳過，因為刪東西比加東西難決定」，畫面上原本沒有這句 */}
        <AnimatedBlock stepIndex={2} className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            這一步最容易被跳過，因為刪東西比加東西難決定。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-5 bg-amber-500/5 border border-amber-500/20 rounded-2xl px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            ⚠️ 如果先歸位再減法，你會把本來該刪的規則搬到子目錄，然後在那裡繼續佔著空間，下次健檢又要處理一次。
          </p>
        </AnimatedBlock>

        {/* 哪幾條該刪，讓它先框出候選。真的要不要刪由人決定，理由在下一頁 */}
        <AnimatedBlock stepIndex={4} className="mt-5 rounded-2xl border border-sky-900/50 bg-sky-950/20 px-6 py-4">
          <div className="text-base font-mono uppercase tracking-widest text-sky-500 mb-2.5">Prompt</div>
          <p className="text-sky-100 text-lg leading-relaxed">
            「看我們最近幾次的對話，這份 <code className="font-mono text-orange-300">CLAUDE.md</code>{' '}
            裡有哪幾條你其實沒用上，或是我一直要重講？」
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-sky-900/50">
            它框出來的是候選名單，不是判決。真的要不要刪還是你決定。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
