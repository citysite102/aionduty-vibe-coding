import { ArrowRightLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { HandbookState } from './_HandbookState';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-03 兩處改動（講師回饋）：
 *   1. 原本「搬去 Hook，手冊裡留一行提醒就好」，而手冊成長軸裡也真的留了一行
 *      「檔案刪除由 Hook 擋（見 .claude/settings.json）」。那一行跟這一章自己教的兩條規則打架：
 *      09_RoutePrinciples 說同一條規則不要放兩個地方，20_HealthEvidence 說已經有程式在擋的可以直接刪。
 *      現在搬走就是刪掉，`_handbookVersions.ts` 的 HOOK_REMINDER 也一併移除。
 *   2. 補上那條 Hook 的樣子。原本只說「搬去 Hook」，學員看不到它長什麼樣，
 *      而前面三頁剛教完三層，這裡正好用同一條示範一次。
 *      `21b4_M2_BadRules`（Slide 64）那一格的「手冊裡只留一行提醒」也跟著改掉了。
 */
export const meta: RecordedMeta = {
  id: 'harness-55-handbook-v2',
  title: '手冊 v2：有一條搬去 Hook 了',
  script:
    '四個問題問完，不要做那一區的第一條先被篩掉了。絕對不要刪掉我的檔案，違反了會出事，這種不能只靠手冊，因為它讀到了也可能份量不夠，而且這種事錯一次就收不回來。搬去 Hook，讓程式擋。然後手冊裡那一條就刪掉，不要留。因為它已經由程式在擋了，手冊再寫一次是重複的，而手冊每一輪都要被讀一次，重複的東西你每一輪都在付錢。這也是後面健檢會教的第一種可以直接刪：已經有程式在擋的，刪掉照樣不會發生。那它搬去哪了？畫面下面那段就是。時機是它動手之前，範圍只管它要下指令那幾次，動作是跑一支檢查，那支檢查只做一件事：看這次的指令裡有沒有刪檔案，有就回一個不准。',
  seconds: 61,
  from: 68,
};

export default function RecHandbookV2() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Handbook So Far" icon={ArrowRightLeft}>
      <RecPage className="space-y-4" handbook={2}>
        <HandbookState stepIndex={1} version={2} />

        <AnimatedBlock stepIndex={2} className="px-1 space-y-2.5">
          <p className="text-slate-300 text-xl leading-relaxed">
            「絕對不要刪掉我的檔案」這種，<Key>它讀到了，份量也可能不夠</Key>。
          </p>
          <p className="text-slate-400 text-lg leading-relaxed">
            違反了會出事的，搬去 Hook 讓程式擋。手冊裡那一條就刪掉，<strong className="text-slate-200">同一條規則不要放兩個地方</strong>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="border-b border-slate-800 bg-slate-900 px-6 py-2.5 font-mono text-base text-slate-500">
            它搬去哪了：.claude/settings.json
          </div>
          <div className="px-6 py-4 font-mono text-base leading-relaxed text-slate-400">
            <div className="flex gap-3">
              <span className="text-orange-300">&quot;PreToolUse&quot;</span>
              <span>: [ {'{'}</span>
              <span className="font-sans text-slate-600">← 它動手之前</span>
            </div>
            <div className="flex gap-3 pl-6">
              <span className="text-orange-300">&quot;matcher&quot;: &quot;Bash&quot;</span>
              <span className="font-sans text-slate-600">← 只管它要下指令那幾次</span>
            </div>
            <div className="flex gap-3 pl-6">
              <span className="text-orange-300">&quot;command&quot;: &quot;node .claude/no-delete.mjs&quot;</span>
              <span className="font-sans text-slate-600">← 跑這支檢查</span>
            </div>
          </div>
          <div className="border-t border-slate-800 px-6 py-3">
            <p className="text-slate-500 text-base leading-relaxed">
              那支檢查只做一件事：看這次的指令裡有沒有刪檔案，有就回一個「不准」。這支一樣請 Claude 幫你寫。
            </p>
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
