import { Bot, Cpu, PanelsTopLeft, Brain } from 'lucide-react';
import { SlideLayout } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { SourceFoot, SRC } from './_Source';
import { YearGroups, type YearGroup } from './_YearGroups';

/**
 * Claude 這一年。分成三組：模型、介面、產出物與記憶。
 * 不照時間順序排，因為學員要的不是編年史，而是「我現在打開它會差在哪」。
 *
 * 最後查證：2026-10-19。出處：
 *   模型      anthropic.com/news，2026-10-19 逐頁對過原文：
 *              Opus 5.5（2026-09-22）：表現「與 Fable 5.1 相當」（Terminal-Bench 4.0 66.4% 對 55.8%），
 *                價格 $4／$20，**比 Opus 5 的 $5／$25 便宜 40%**。
 *                **原本畫面上寫「跟 Fable 5.1 差不多但便宜四成」是錯的**，那是把兩個比較對象混在一起：
 *                便宜 40% 的對象是 Opus 5，不是 Fable 5.1。錯誤來源是一則新聞摘要寫
 *                「Performs comparably to Claude Fable 5.1 while costing 40% less」，
 *                兩個子句的比較對象不同，摘要把它們接成了一句。
 *              Sonnet 5.5（2026-09-28）：原文「generates outputs 30%+ faster than Sonnet 5」，
 *                價格 $2／$10 與 Sonnet 5 相同。
 *              Haiku 5.5（2026-10-07）：$0.10／$0.50（超過 100K 的提示是 $0.50／$2.50）。
 *                1M 脈絡長度那一句**不在這一頁上**，在 code.claude.com 的 changelog v2.1.293。
 *            support.claude.com release notes：Fable 5.1 與 Mythos 5.1（2026-09-01）、
 *            Opus 5（2026-07-24）。code.claude.com/docs/en/changelog：
 *            Haiku 5.5 為 1M context、每百萬 token 進 $0.10 出 $0.50（v2.1.293，2026-10-07）。
 *   介面      support.claude.com release notes（2026-09-16 Cowork 併進對話、
 *            2026-09-17 Customize 整頁改版）、claude.com/docs/cowork/changelog
 *            （2026-09-15 Unified Claude beta、2026-10-13 模型選單加上 effort 控制）。
 *   記憶      support.claude.com release notes（2026-07-10 改成分類條目、
 *            2026-08-25 跨 chat 與 Cowork、Settings > Memory 的 Topics 可以自己改）。
 *   Projects  support.claude.com release notes 2026-03-20。
 *
 * **2026-10-19 逐條覆核過一次，三張卡都改過，不要改回去：**
 *   support.claude.com 的 release notes 回溯得到 2025-10，第一次只抓到 2026-07 之後，
 *   所以這一頁原本的上半年全是二手摘要。覆核後改掉的：
 *     模型卡  漏了 Opus 4.6（02-05）、Sonnet 4.6（02-17）、Opus 4.7（04-16）、Sonnet 5（06-30），
 *             而 Opus 4.8 寫成「6 月」，官方與 anthropic.com/news/claude-opus-4-8 都寫 2026-05-28。
 *             卡片列得下七條，所以 Fable 5.1（09-01）與 Sonnet 5.5（09-28）沒進去，標題也就不報數字（D-5）。
 *     介面卡  「正式版加上操作電腦的能力」是把兩件事併在一起：操作電腦是 2026-03-23 的研究預覽
 *             （Cowork 與 Claude Code 一起開到 Pro 與 Max），正式版是 2026-04-09。
 *     記憶卡  原本第一條「2026-03-20 Projects」**查無此事**，官方 3 月的條目裡沒有，
 *             來源是二手文章，而且 Projects 本來就不是這一年才有的東西，整條刪掉。
 *             改成記憶自己的三個節點，起點是 2025-10-23（先給 Max）。
 *   effort control 的官方說法是「控制 Claude 回應時投入多少努力」，在 claude.ai 與 Cowork 上，
 *   高的想得久、低的回得快而且少吃用量，所以畫面上寫「調它要想多久」。
 *
 * 單價刻意不印在畫面上，理由跟 `19d2_M2_ModelTiers` 同一條：單價會過期，層級關係比數字穩。
 * 檔頭留著是給下一個來改的人對照用的。
 *
 * **2026-10-20 一欄的節點砍到最多五個，不要把版本號補回去。** 模型欄原本七條，
 * 其中 Opus 4.6、4.7、Sonnet 5 三條只是版號前進，沒有改到分層或定位，
 * 讀者數完七個日期還是答不出「那我該挑哪一層」。留下的五條每一條都改到一件事：
 * 可以調思考時間、多一層 Fable、Opus 追上 Fable、Sonnet 變快、Haiku 吃得下一百萬 token。
 * 介面欄同理砍掉 2026-03-23（操作電腦研究預覽）與 2026-07-07（上網頁與手機）。
 * 完整的日期在 `_timeline.ts` 與附錄，這一頁不是清單。
 *
 * **底下原本那個「打開之後第一個要調的」框 2026-10-20 併進模型欄的結論句。**
 * 這一疊現在一頁只留一個 sky 框，那一個留給整頁結論，而且放在最上面（先結論再細節）。
 * 「預設給你最貴那一層」本來就是模型欄要講的事，放在它的欄底結論裡不會比較難找到。
 */
const GROUPS: YearGroup[] = [
  {
    icon: Cpu,
    title: '模型：四層分工沒變，名字換了',
    rows: [
      ['2026-05-28', 'Opus 4.8，開始可以調它要想多久'],
      ['2026-06-09', 'Fable 5 上線，排在 Opus 之上，成為最貴的一層'],
      ['2026-09-22', 'Opus 5.5，表現跟 Fable 5.1 差不多，比 Opus 5 便宜四成'],
      ['2026-09-28', 'Sonnet 5.5，產出比 Sonnet 5 快三成'],
      ['2026-10-07', 'Haiku 5.5，一次讀得進一百萬個 token（計算長度與費用的單位）'],
    ],
    note: '四層的分工沒變：Haiku（便宜又快）做機械性的整理、Sonnet（日常）寫一般的功能、Opus 留給難的那幾次、Fable 在最上面。桌面版預設給你 Opus 5.5，機械性的工作往下換成 Sonnet 或 Haiku 就省用量。',
  },
  {
    icon: PanelsTopLeft,
    title: '入口：Cowork 併進對話',
    rows: [
      ['2026-01-12', 'Cowork（交辦任務的工作模式）研究預覽，先給 Max'],
      ['2026-04-09', 'Cowork 正式版上 macOS 與 Windows'],
      ['2026-09-16', '併進所有對話，開工前不必先決定要聊天還是要它辦事'],
      ['2026-09-17', 'Customize（自訂與設定）變成完整一頁，Skills、Plugins、Connectors 各自有自己的頁'],
      ['2026-10-13', '模型選單上多一個控制它要想多久的開關'],
    ],
    note: '以前開工要先選模式，現在問問題與交辦任務都打在同一個輸入框裡。',
  },
  {
    icon: Brain,
    title: '記憶：從偷偷記得變成改得動',
    rows: [
      ['2025-10-23', 'Memory（跨對話記憶）開始推送，先給 Max'],
      ['2026-03-02', '開到所有方案，含免費'],
      ['2026-07-10', '改成一條一條分類好的條目'],
      ['2026-08-25', '跨對話與 Cowork，而且每一條都可以自己改或刪'],
    ],
    note: '記憶不再只是它偷偷記得：Settings 的 Memory 裡列著它記下的每一個主題，不想讓它記的當場刪掉就好。',
  },
];

export default function SlideBonusClaudeYear() {
  return (
    <SlideLayout title="Claude 2026 年的變化" subtitle="Claude 2025-10 → 2026-10" icon={Bot}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3">
        <Callout tone="focus" stepIndex={1}>
          我們給 Claude 的設定沒有變：<code className="font-mono text-orange-300">CLAUDE.md</code> 的寫法、
          Skill 的寫法、權限的觀念都一樣。
          <strong className="text-slate-100">改掉的是外面那一層：開工的入口、它交出來的檔案，還有模型的名字</strong>。
        </Callout>

        <YearGroups groups={GROUPS} />

        <SourceFoot links={[SRC.claudeNotes, SRC.claudeOpus48, SRC.cowork, SRC.claudeCode]} />
      </div>
    </SlideLayout>
  );
}
