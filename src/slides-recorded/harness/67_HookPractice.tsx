import { Hammer } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 練習用金鑰而不是別的題目，因為分流四問的第一題就拿金鑰當「會出事」的例子，
 * 這裡是把那個例子做出來，不是另開一個新情境。
 *
 * 流程那一排把「掛」跟「測」放在同一條線上，因為 Hook 最常見的失敗不是寫錯，
 * 是掛上去之後從來沒被觸發過，而你以為它在守著。所以測試不是附註，是步驟之一。
 */
const CHECKS = ['那個假金鑰真的被擋下來了嗎', '被擋的時候，有沒有一句話講清楚哪裡不行'];

export const meta: RecordedMeta = {
  id: 'harness-67-hook-practice',
  title: '換你掛一條 Hook',
  script:
    '換你掛一條。回到第一題那個例子：金鑰絕對不能寫進程式碼。你不用自己編設定檔，把這句話交給它：每次你要寫檔案之前，先檢查內容裡有沒有 API 金鑰，有就擋下來，掛完故意寫一個假的測一次給我看。三層它會自己填，你要盯的是最後那一步。最常見的失敗不是寫錯，是掛上去之後從來沒被觸發過。驗收兩件事：假金鑰真的被擋下來了嗎，被擋的時候有沒有講清楚哪裡不行。那句理由是寫給它看的，它會照著改。',
  seconds: 45,
};

export default function RecHookPractice() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Turn" icon={Hammer}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            不用自己編設定檔，<Key>把這句交給它</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['貼這句給它', '它去寫設定', '寫一個假金鑰', '看它擋不擋']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-7 py-5">
          <div className="font-mono text-base text-sky-400 mb-2">Prompt</div>
          <p className="text-sky-100 text-xl leading-relaxed">
            每次你要寫檔案之前，先檢查內容裡有沒有 API 金鑰，有就擋下來。掛完故意寫一個假的測一次給我看。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-500 text-base mb-3">驗收只有兩件事</div>
          <div className="space-y-2">
            {CHECKS.map((c) => (
              <p key={c} className="text-slate-300 text-xl leading-relaxed">
                {c}
              </p>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 測不出它擋下來，就是還沒掛好。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
