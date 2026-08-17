import { Boxes } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { StageMap } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 前一頁講完為什麼要 Hook，這一頁給骨架，後面三頁各展開一層。
 * 先給骨架再展開，是因為 Event、Matcher、Handler 三個詞單獨出現都沒有意義，
 * 學員要先知道它們是同一段設定的三個位置。
 *
 * 上排是白話的問題，下排是設定裡的名稱，note 填這份簡報真的掛著的那一條的答案。
 * 下面再貼一次那個檔案長什麼樣，是為了讓「三個名詞」跟「三行設定」對得起來，
 * 學員之後打開自己的檔案才認得出哪一行是哪一層。
 *
 * 沒有 from：這一頁不是從現行版拆出來的，是新寫的。
 */
const LAYERS = [
  { stage: '什麼時候檢查', code: 'Event', note: '要寫檔案之前' },
  { stage: '這次要不要管', code: 'Matcher', note: '只管寫檔案那幾個' },
  { stage: '到底做什麼', code: 'Handler', note: '擋下來，附理由' },
];

export const meta: RecordedMeta = {
  id: 'harness-63-hook-three-layers',
  title: '一條 Hook 拆開只有三層',
  script:
    '知道要掛 Hook 之後，接下來是它長什麼樣。它是一段設定，不是程式，而且拆開只有三層。第一層問什麼時候檢查，設定裡叫 Event。第二層問這一次要不要管，叫 Matcher。第三層問到底做什麼，叫 Handler。用這份簡報掛的那一條對回去你就知道它在講什麼：時機是要寫檔案之前，範圍是只管寫檔案那幾個工具，動作是擋下來加一句理由。下面那塊就是它在檔案裡的樣子，三個名詞對三個位置。三層都要寫齊。少了時機它不知道什麼時候要檢查，少了範圍它每一次都插手，少了動作就是檢查完什麼都不做。接下來一層一層看。',
  seconds: 45,
};

export default function RecHookThreeLayers() {
  return (
    <SlideLayout title={meta.title} subtitle="Anatomy of a Hook" icon={Boxes}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            它是一段設定，<Key>不是程式</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <StageMap items={LAYERS} />
        </AnimatedBlock>

        {/* 三個名詞對三個位置。縮排照真實檔案，學員打開自己那份才認得出來 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 font-mono text-base text-slate-500">
            .claude/settings.json
          </div>
          <div className="px-6 py-4 font-mono text-lg leading-relaxed">
            <div className="flex gap-4">
              <span className="text-orange-300">PreToolUse</span>
              <span className="text-slate-600">時機</span>
            </div>
            <div className="flex gap-4 pl-6">
              <span className="text-orange-300">matcher: Write|Edit</span>
              <span className="text-slate-600">範圍</span>
            </div>
            <div className="flex gap-4 pl-6">
              <span className="text-orange-300">command: ...</span>
              <span className="text-slate-600">動作</span>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 三層要寫齊。少了範圍那一層，它每一次都會插手。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
