import { Wrench, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-11-09 新增（講師），同日照講師的規格與他口述的開場重排過兩次。
 *
 * 四頁的分工（改任何一頁之前先看，B-6）：
 *   208 脈絡：它有沒有拿到正確的規則、決策與現況
 *   209 這一頁：接手一個別人寫了好幾年的系統，要保留、局部改造，還是重新開發
 *   210 檢索：怎麼快速定位跟這次任務有關的程式碼
 *   211 工具：現在的瓶頸值不值得多裝一個東西
 * **這四種不是技術的演進階段**，是四種不同的問題，四頁共用一條主線：
 * 先診斷專案的問題，再選最小而且夠用的解法。
 *
 * ── 這一頁跟上一頁的接點，是整頁最重要的一句（講師口述）──────────────
 * 上一頁的解法是：把規則寫進 `CLAUDE.md`、把架構與決策整理成文件、再用搜尋取得。
 * **但接手一個三五年的舊系統，那套解法會卡在一個地方：連你自己都還不知道
 * 哪些東西需要被記住。** 沒有文件、沒有足夠的測試、原本的工程師離職了，
 * 業務規則只藏在程式碼裡。這一句是開場的第二段，**不要刪、也不要往後挪**，
 * 少了它這一頁會讀成「又一種工具選擇」。
 *
 * ── 頁面的順序是照講師口述的敘事排的，不要調 ──────────────────
 *   1 情境與那句接點
 *   2 **先弄清楚的三件事**（做了什麼／哪些必須保留／改完怎麼驗）
 *   3 三個名詞的定義（排在策略前面，因為策略 02 的名字裡就有「重構」）
 *   4 三種策略與判斷
 * 第 2 塊排在策略前面是刻意的：**這三件事清楚之前，根本沒有條件討論要選哪一種。**
 * 第一版把它放在最底下當「決策問題」，等於先給選項再給前提。
 *
 * ── 「AI 看不懂人寫的爛 code」這句玩笑話要接住但要修正 ────────────────
 * 它好笑但不精確，而且會變成嘲諷前人。畫面上的說法是：沒有文件、命名不一致的時候，
 * 它每一次都要重新猜，**而接手的人也一樣**。
 *
 * ── 三個名詞不要混 ──────────────────────────────────
 *   重構 = 不改行為，只整理結構
 *   功能改造 = 行為要變
 *   重新開發 = 另外寫一套來取代
 * 混著講會讓學員以為「重構」就是「重做」。
 *
 * 收尾只說一件事：**不了解既有行為、又缺少可驗證的依據，直接重新開發的風險通常比較高。**
 * **不要寫成「重寫是錯的」**，它在條件齊備的時候是合理的選擇。
 *
 * Joel Spolsky 2000 年那篇 "Things You Should Never Do, Part I" 講的就是重寫會丟掉
 * 沒人記得的業務規則。照講師指示放在逐字稿的講師備註，不上畫面，
 * 連結留在這裡備查（2026-11-09 查證回 200）：
 * https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/
 *
 * 用色：只有 sky 一種（A-1）。**不要給三種策略各一個顏色**（要分組用圖形不要用顏色）。
 */

/** 先弄清楚的三件事。**排在策略前面**，這三件沒答案的時候選不了策略。 */
const FIRST = [
  { n: '01', q: '這套系統現在做了什麼？', v: '讓 Agent 分段整理現況，每一條標出它是從哪個檔案看出來的，以及哪些還沒確認。再用實際操作一次，和熟悉這套流程的人對一遍。' },
  { n: '02', q: '哪些行為一定要保留？', v: '有文件、有人記得，還是舊程式碼本身就是唯一的規格？' },
  { n: '03', q: '改完之後怎麼驗？', v: '有測試，或者至少能把改前改後的輸出拿來比對嗎？' },
];

const TERMS = [
  ['重構', '不改行為，只把結構整理清楚'],
  ['功能改造', '行為本身要變，使用者會看到差別'],
  ['重新開發', '另外寫一套來取代，風險在把資料與使用者搬過去的那一步'],
];

const STRATEGIES = [
  {
    n: '01',
    icon: ShieldCheck,
    k: '保留並修補',
    when: '系統跑得穩，要改的範圍有限。',
    how: '只動要改的那幾個地方，其餘不碰。先補上測試，再動手。',
  },
  {
    n: '02',
    icon: Layers,
    k: '漸進式重構與替換',
    when: '行為要留著，但結構撐不住後續的開發。',
    how: '一塊一塊來：統一命名、把重複的程式整理成共用的一份、補測試，必要時把某一塊功能整個換掉，舊的先留著對照。',
  },
  {
    n: '03',
    icon: Sparkles,
    k: '重新開發',
    when: '現有架構已經滿足不了需求，而且你掌握得了資料搬移、驗證與切換的風險。',
    how: '新舊並行一段時間：在隔離的環境用同一批資料兩邊各跑一次，輸出對得起來才把那一塊切過去。會寄信、會寫資料的那些動作要先關掉，否則兩邊各做一次。',
  },
];

export default function SlideLegacyCode() {
  return (
    <SlideLayout
      title="接手舊專案：保留、局部改造或重新開發"
      subtitle="Legacy Modernization"
      icon={Wrench}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            換一個情況：這次你接手的是一個別人已經寫了三五年的系統。
            沒有完整的文件、沒有足夠的測試，當初的工程師也離職了。很多業務規則（退款期限怎麼算、折扣怎麼疊、什麼情況算例外）只藏在程式碼裡。
          </p>
          <p className="mt-2 text-base leading-relaxed text-slate-300">
            <strong className="text-slate-100">這時候幫 Agent 增加記憶解決不了問題，因為連你自己都還不知道哪些東西需要被記住。</strong>
            有人開玩笑說「AI 看不懂人寫的爛 code」，更精確的說法是：沒有文件、命名不一致的時候，
            它每一次都要重新猜，而接手的人也一樣。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
          <h3 className="text-base font-bold text-slate-100">
            重寫之前，先讓它幫你弄清楚這三件
          </h3>
          <dl className="mt-2.5 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-3">
            {FIRST.map((f) => (
              <div key={f.n}>
                <dt className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-600">{f.n}</span>
                  <span className="text-sm font-bold text-slate-100">{f.q}</span>
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-slate-400">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 border-t border-sky-500/20 pt-3 text-sm leading-relaxed text-sky-200/90">
            這三件比較清楚了，才有條件比較下面三種策略。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} as="dl" className="flex flex-wrap gap-x-6 gap-y-1 px-1 text-sm leading-relaxed">
          {TERMS.map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="shrink-0 font-bold text-slate-200">{k}</dt>
              <dd className="text-slate-500">{v}</dd>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {STRATEGIES.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-600">{s.n}</span>
                  <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                    <s.icon aria-hidden="true" size={16} className="shrink-0 text-sky-400" />
                    {s.k}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-sky-200/90">{s.when}</p>
                <p className="mt-1.5 border-t border-slate-800 pt-1.5 text-sm leading-relaxed text-slate-400">
                  {s.how}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-200">不了解既有行為、又缺少可驗證的依據，直接重新開發的風險通常比較高</strong>：
            舊程式碼裡有一批沒人記得的規則，那些多半是好幾年累積的修補，沒有寫在任何文件上。
            上面那三件答得出來，才有條件去比三種策略各自的成本與切換風險。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
