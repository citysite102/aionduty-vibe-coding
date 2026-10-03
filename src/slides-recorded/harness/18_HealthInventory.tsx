import { ListTodo } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { PairTable } from './_PairTable';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23：原本這一頁叫學員「把手冊裡每一條規則抄下來」。講師回饋兩件事：
 * 一、沒有人會真的一條一條抄，而總覽頁（17_HealthOverview）給的那段指令本來就包含盤點，
 *     所以這一步的實際動作是「貼指令，它列給你看」，學員只負責圈出想不起來的。
 * 二、更重要的是，那些理由如果回頭寫進 CLAUDE.md，手冊會越健檢越長，
 *     正好跟這一整段要解決的問題相反。所以多一塊 amber 明說理由留在對話裡。
 */

/**
 * 2026-10-03 收窄「理由不要寫回手冊」這一句。原本的講法會跟 Slide 111
 * 「規則怎麼寫：寫出為什麼」正面衝突，學員兩頁都聽得到，會不知道要聽哪一個。
 * 分界是長度與用途：**一句能讓它推出下一步的理由要留；那件事的經過不要留。**
 * 改這一頁或 Slide 111 的時候兩邊要一起看。
 */
export const meta: RecordedMeta = {
  id: 'harness-18-health-inventory',
  title: '手冊健檢：盤點交給它列，你只圈問號',
  script:
    '第一步是盤點：手冊裡每一條規則列出來，後面標上它當初是為了解決哪一次的問題。這一步不用你自己一條一條抄，健檢那段指令貼進去，它就會照著列。像是禁用 inline style，是因為上次改版時樣式打架。有些條你會想不起來，那很正常，先打一個問號，不要現在就決定去留，這些就是下一步要處理的對象。這裡有一件事要注意：盤點列出來的是來龍去脈，像是哪一次出事、當時誰說的，這些留在對話裡給你看就好，不要整段貼回 CLAUDE.md。健檢是要讓手冊變短，每一條後面再掛一段歷史，下一輪只會更長。那跟後面會講的「規則要寫出為什麼」會不會衝突？不會，差別在長度跟用途：寫進手冊的是一句它推得出下一步的理由，例如因為這是太空任務主題；不用寫進去的是那件事的經過。',
  seconds: 69,
  from: 69,
};

/** 右欄留空的那一列，畫面上會顯示成問號標記 */
const ROWS: [string, string][] = [
  ['禁用 inline style', '上次改版時樣式打架'],
  ['按鈕用航太語彙', ''],
];

export default function RecHealthInventory() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ListTodo}>
      <RecPage>
        <SeriesRail {...HEALTH_RAIL} current={0} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">這一步<Key>讓它列給你看</Key>，你只圈出想不起來的</p>
        </AnimatedBlock>

        <PairTable
          stepIndex={2}
          headers={['規則', '為了解決哪一次的問題']}
          rows={ROWS.map(([rule, why]) => [
            rule,
            why || (
              <span className="inline-flex items-center rounded-md border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 font-mono font-bold text-sky-300">
                ？
              </span>
            ),
          ])}
        />

        <AnimatedBlock stepIndex={3} className="mt-5 text-slate-400 text-xl leading-relaxed px-1">
          想不起來的先打問號。這些就是下一步要處理的對象。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            ⚠️ 這張清單留在對話裡，不要回頭寫進 <code className="font-mono text-orange-300">CLAUDE.md</code>。
            健檢是要讓手冊變短，每一條再加一段來由，下一輪只會更長。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
