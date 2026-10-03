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
 * 改這一頁或「寫出為什麼」那一組的時候兩邊要一起看（併頁後在 12_WriteBasis）。
 */

/**
 * 2026-10-04：講師兩個問題，病根是同一個 —— 這一頁沒說清楚誰做哪一半。
 *   「這一步讓它列給你看，你只圈出想不起來的」看不懂，是透過 Prompt 要求它整理嗎？
 *   「想不起來的先打問號」是 AI 自己打問號？
 * 答案是：**表是它列的，問號是你打的**。原本大字只寫「讓它列給你看」，沒有接回上一頁那段指令；
 * 「想不起來」的主詞也沒寫出來（是你想不起來，不是它）。現在三處都寫明動作歸誰：
 * 大字、step 3 那一句、以及口白。**不要再把主詞省掉。**
 */
export const meta: RecordedMeta = {
  id: 'harness-18-health-inventory',
  title: '手冊健檢：盤點交給它列，你只圈問號',
  script:
    '第一步是盤點。這一步不用你動手，動作只有一個：把上一頁那段指令貼進去，它會把你手冊裡每一條規則列成一張表，右邊那欄填上它推測這一條當初是為了解決什麼問題。像是禁用 inline style，它可能寫上次改版時樣式打架。你要做的是逐條看那一欄：對得上的就跳過；它寫不出來、或者它寫的跟你記得的不一樣，你就在那一條旁邊打一個問號。畫面上按鈕用航太語彙那一條就是這種，問號是你打的，不是它打的。打了問號不代表要刪，先標著，那幾條就是下一步要處理的對象。這裡有一件事要注意：盤點列出來的是來龍去脈，像是哪一次出事、當時誰說的，這些留在對話裡給你看就好，不要整段貼回 CLAUDE.md。健檢是要讓手冊變短，每一條後面再掛一段歷史，下一輪只會更長。那跟後面會講的「規則要寫出為什麼」會不會衝突？不會，差別在長度跟用途：寫進手冊的是一句它推得出下一步的理由，例如因為這是太空任務主題；不用寫進去的是那件事的經過。',
  seconds: 87,
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
          <p className="text-slate-300 text-4xl font-bold leading-snug">貼上一頁那段指令，<Key>表它列，問號你打</Key></p>
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
          它寫不出理由、或寫的跟你記得的不一樣，<strong className="text-slate-200">你就在那一條旁邊打一個問號</strong>。
          打了問號不代表要刪，那幾條是下一步要處理的對象。
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
