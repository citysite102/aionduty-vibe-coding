import { Rocket, UserCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-5 第二頁。上一頁挑好題目，這一頁是第一次把它跑成一套流程。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * **六個階段的完整說明不在這一頁**（上一版在這裡橫排了六格加兩條回頭的線）。
 * 那份說明現在只在結語那一頁，這兩頁的職務是把它用到學員自己的工作上：
 * 上一頁選題，這一頁做第一次。四個步驟右邊標的階段名是索引，不是重新定義。
 *
 * ── 黃色那塊〈卡住的時候，三招〉整個拿掉了，不要加回來 ──────────────
 * 三個理由，講師指定：
 *   1. 它是特定工具的操作技巧（按 Esc、貼錯誤訊息、開新對話），
 *      跟這一頁在講的工作管理原則不是同一層級。
 *   2. 它會讓人以為 Esc 救得回已經發生的修改與外部副作用。**救不回來。**
 *   3. 它不是 Recover 的完整概念。真正的 Recover 是現在那一塊：
 *      停在哪裡、怎麼恢復、什麼時候交給人。
 * 要留那三招的話，放課後的操作指引或 FAQ，不要放回正式投影片。
 *
 * ── 文件分工那一塊 ────────────────────────────────────
 * 上一版只教「每次都要重講的那幾句寫進 `CLAUDE.md`」，學員會把規格、進度、做法全塞進去。
 * 現在分四種：`CLAUDE.md`（跨任務仍然有效的指引與規則）、規格文件（這一次做什麼）、
 * 進度文件（現在到哪）、Skill（真的會跨任務重用的做法）。
 * **只給最小示例**，完整的記憶分層是 Slide 207 的事，不要在這裡重講一遍。
 *
 * ── 收尾那一句 ───────────────────────────────────────
 * 「第一次跑成功，不代表流程已經建立」是講師指定的原句。底下那一行也不要刪：
 * **再跑一次不是要它輸出一模一樣的字**，是要結果仍然符合你寫的驗收條件。
 * 少了那一句，學員會拿「輸出不一樣」當成流程壞掉。
 *
 * 影響大的動作要先問過的那個虛線框保留（講師 2026-11-08 指定的三件之一），
 * 它跟 Slide 206 的行動邊界是同一條，**搬頁的時候兩邊一起看**。
 *
 * 標題砍過字：講師原句「第一次實作：把一件工作變成可重複執行的流程」量起來 46 寬，
 * 超過 D-5 的 40。現在這句 38 寬。
 *
 * 用色：sky（步驟編號與 Recover）一種。`CLAUDE.md`、`SKILL.md` 的 orange 是專有名詞，不計入。
 */

const STEPS = [
  {
    n: '01',
    k: '建立工作環境',
    stage: 'Define 之前',
    v: '開一個專案資料夾，準備一份安全的測試資料，確認這一輪會用到哪些工具、它有哪些權限。',
    code: ['$ mkdir my-project && cd my-project', '$ claude'],
  },
  {
    n: '02',
    k: '確認規格與執行計畫',
    stage: 'Define · Plan',
    v: '請它先整理出工作範圍、輸入、產出、限制與驗收條件，你核准之後才開始執行。',
    code: null,
  },
  {
    n: '03',
    k: '執行與驗收',
    stage: 'Execute · Verify',
    v: '從最小的那一塊開始，自己檢查實際成果，記下改了什麼、哪裡出錯、哪些還沒做完。',
    code: null,
  },
  {
    n: '04',
    k: '保存並重跑',
    stage: 'Reuse',
    v: '把跨次任務仍然有效的規則存進專案文件，換第二批測試資料再跑一次，確認不必把規則重講一遍。',
    code: null,
  },
];

/** 四種文件的分工。**只給最小示例**，完整的記憶分層是 Slide 207 的事。 */
const DOCS = [
  { k: 'CLAUDE.md', mono: true, v: '跨次任務仍然有效的專案指引與工作規則', eg: '一律用繁體中文回覆；改任何檔案前先說你要改什麼' },
  { k: '規格文件', v: '這一次要做什麼、不做什麼，以及驗收條件', eg: '' },
  { k: '進度文件', v: '現在做到哪、哪些還沒完成、哪些等你確認', eg: '' },
  { k: 'Skill', mono: true, v: '真的會跨任務重用的那套做法', eg: '' },
];

const RECOVER = [
  { n: '1', k: '停在哪裡', v: '已經完成了什麼？哪些操作已經生效，收不回來了？' },
  { n: '2', k: '怎麼恢復', v: '修正、重試、回退，或是確認狀態之後安全地繼續。' },
  { n: '3', k: '什麼時候交給人', v: '超過重試上限、狀態確認不了，或是需要一個重要決定。' },
];

export default function SlideFirstDay() {
  return (
    <SlideLayout
      title="把工作拆成可交辦、可驗收的流程"
      subtitle="Your First Agent Workflow"
      icon={Rocket}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          選一個範圍小、風險低的任務，
          <strong className="text-slate-100">把一次交辦、一次驗收，加上第二次執行走完。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_1fr] items-start">

          <AnimatedBlock stepIndex={2} className="space-y-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-sky-400">{s.n}</span>
                  <h3 className="text-base font-bold text-slate-100">{s.k}</h3>
                  <span className="ml-auto font-mono text-xs uppercase tracking-wider text-slate-600">
                    {s.stage}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.v}</p>
                {s.code && (
                  <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs leading-relaxed text-slate-400">
                    {s.code.join('\n')}
                  </pre>
                )}
              </div>
            ))}
          </AnimatedBlock>

          <div className="space-y-4">

            <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-base font-bold text-slate-100">哪一句話該寫進哪一份</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                不是全部都塞進 <code className="font-mono text-orange-300">CLAUDE.md</code>。四種各有職務：
              </p>
              <dl className="mt-2.5 space-y-2 border-t border-slate-800 pt-2.5 text-sm leading-relaxed">
                {DOCS.map((d) => (
                  <div key={d.k} className="flex gap-2.5">
                    <dt className={`w-24 shrink-0 ${d.mono ? 'font-mono text-orange-300' : 'font-medium text-slate-200'}`}>
                      {d.k}
                    </dt>
                    <dd className="min-w-0 text-slate-400">
                      {d.v}
                      {d.eg && <span className="mt-0.5 block text-slate-600">例：{d.eg}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
            </AnimatedBlock>

            <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
              <h3 className="text-base font-bold text-slate-100">失敗的時候，你要知道三件事</h3>
              <ol className="mt-2.5 space-y-2">
                {RECOVER.map((r) => (
                  <li key={r.n} className="flex gap-2.5 text-sm leading-relaxed">
                    <span className="font-mono text-sm font-bold text-sky-300">{r.n}</span>
                    <p className="min-w-0 text-slate-400">
                      <strong className="text-slate-200">{r.k}：</strong>
                      {r.v}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-sky-500/40 px-3.5 py-2.5">
                <UserCheck aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-sky-300" />
                <p className="text-sm leading-relaxed text-slate-300">
                  會寄出去、會付錢、會刪東西、會公開的那幾個動作，
                  <strong className="text-slate-100">在流程裡就寫明要先問過你</strong>，不要靠當下記得攔。
                </p>
              </div>
            </AnimatedBlock>

          </div>
        </div>

        <AnimatedBlock stepIndex={5} className="border-t border-slate-800 pt-4">
          <p className="text-base font-bold leading-relaxed text-slate-100">
            第一次跑成功，不代表流程已經建立。換一批資料還能照規格完成，才開始有重用的價值。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            再跑一次要確認的是：結果仍然符合你寫下來的驗收條件。輸出的文字可以不一樣。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
