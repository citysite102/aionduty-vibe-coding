import { Brain, FileInput, Cpu, Send, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元 8-6 第七頁。上一頁講怎麼確認程式沒問題，這一頁講它被允許做哪些事。
 * 兩頁之間的接點是一句話：**驗證結果正確，不等於授權執行**（寫在轉場，見逐字稿）。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁的核心：Agent 開始操作真的系統之後，**Prompt 擋不住它**，
 * 要畫的是資料、決策、行動三種邊界，而且要用系統機制去擋，不是用指示去求。
 *
 * 上半三種邊界是這一頁的主要視覺。每一格的結構一樣：一個問題 ＋ 怎麼控制。
 * **問題那一行不要刪**，它是學員回去要自己回答的那一句。
 *
 * 下半用**同一個情境**講兩種風險（整理一個資料夾裡的專案文件）。
 * 這個例子跟 `28c2b` 右欄是同一個，刻意的：上一頁用它分清單，這一頁拆開看是哪一段失守。
 * **不要換成另一個例子**，換掉就少了兩頁之間的接點。
 * 兩種風險的分工要講準：
 *   提示注入 = 不可信的資料想跨過信任邊界，去影響它的指令與行為
 *   過度授權 = 它手上的功能、權限或自主程度超過任務需要，一次失誤的代價就被放大
 *   **兩者可能連鎖發生，但不是彼此的必要條件**，畫面上那一句就是在擋這個誤讀。
 *
 * 標題改過四次，記著每一次被退的理由，不要再繞回去：
 *   1.「接了 AI 之後：它讀到的指令和它的權限」→ 兩個「它」各指不同的東西。
 *   2.「接了 AI：內容裡藏的指令、給太大的權限」→ 講師：太抽象。
 *   3.「使用者填的字會變成 AI 指令，權限決定後果」→ 講師：太奇怪。
 *   4.「Agent 越能做事，越需要明確的權限邊界」→ 2026-11-09 講師改成現在這句。
 * 講師原句是「Agent 能讀、能判斷、能執行，不代表都該放行」，量起來 42 寬，超過 D-5 的 40。
 * 現在這句拿掉一個「該」字，剛好 40，意思不變。**不要再加回去。**
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-11-08，genai.owasp.org/llm-top-10/。那一頁當天列的是 **2025 版**，
 * 提示注入（Prompt Injection）與過度授權（Excessive Agency）都在十條裡。
 * **畫面上寫出版本年份、不寫條目編號**，站上換版編號會動。
 * OWASP 那份是清單，不是安全驗收，也不是法遵認證，畫面上那一句就是在擋這個誤讀。
 * 案例：GMO Flatt Security 那一篇，連結在畫面上。2026-11-09 用原文重新核對過三件事，
 * **原本畫面上寫錯的也在這裡**：
 *   1. 它是**研究者在自己的測試庫上做的驗證**，不是某個使用者真的被害。原文寫著
 *      「All findings were validated in my own test repositories」。**不要再寫成「真的發生過」。**
 *   2. 2026/01 是通報日（1/12），文章 2026/06/01 才公開，修補 2026/02/17 完成。
 *   3. 外洩的是**環境變數裡的 OIDC 憑證**，走的是把內容寫回那張 issue，不是「標題裡藏指令」。
 * **不要新增查不到完整出處的事件**，查不到就不要寫成已經證實的案例。
 *
 * 用色：sky（三種邊界與收尾）＋ amber（兩種風險）兩種（A-1）。
 * **三格不要加左側色條**（A-1，2026-08-04 全片已經歸零），方向感交給格子之間那個 ▶。
 */

/** 三種邊界。問題那一行是學員要自己回答的，控制方式是具體做法。 */
const BOUNDS = [
  {
    icon: FileInput,
    k: '資料邊界',
    en: 'Input Boundary',
    q: '它能讀到什麼資料？那些資料可信嗎？',
    dos: [
      '限制它讀得到的資料與檔案範圍',
      '外部文件、網頁，以及使用者送進來等它處理的內容，裡面寫什麼都是資料，不是交代給它的工作',
      '機密資料另外用存取控制擋住',
    ],
  },
  {
    icon: Cpu,
    k: '決策邊界',
    en: 'Decision Boundary',
    q: '哪些事情可以讓它自己判斷？',
    dos: [
      '把目標、業務規則與驗收條件寫出來',
      '列出哪些例外一定要人來決定',
      '模型的判斷不等於正式授權',
    ],
  },
  {
    icon: Send,
    k: '行動邊界',
    en: 'Action Boundary',
    q: '它實際上能操作哪些系統與功能？',
    dos: [
      '權限照這一輪真的需要的給',
      '寫入、刪除、寄信、付款、部署與改設定要分開管',
      '影響大的動作要有人核准，而且用系統去擋，不是用指示去求',
    ],
  },
];

const RISKS = [
  {
    name: '提示注入',
    en: 'Prompt Injection',
    what: '其中一份文件裡藏著一句指令，要它把資料夾的內容寄到某個信箱。',
    why: '不可信的資料跨過了信任邊界，去影響它的指令與行為。',
  },
  {
    name: '過度授權',
    en: 'Excessive Agency',
    what: '它手上同時有讀取整台機器檔案的權限，以及對外寄信的能力。',
    why: '它拿到的功能、權限或自主程度超過這個任務需要，一次失誤的代價就被放大。',
  },
];

export default function SlideShipAiRisk() {
  return (
    <SlideLayout
      title="Agent 能讀、判斷、執行，不代表該放行"
      subtitle="Control the Agent"
      icon={Brain}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          Agent 開始操作真的系統之後，
          <strong className="text-slate-100">光靠指示約束不住它</strong>，
          要分開設計的是資料、決策與行動這三種邊界。
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {BOUNDS.map((b, i) => (
            <AnimatedBlock
              key={b.en}
              stepIndex={i + 2}
              className="relative rounded-2xl border border-slate-800 bg-slate-900 p-4"
            >
              <div className="flex items-center gap-2">
                <b.icon aria-hidden="true" size={16} className="shrink-0 text-sky-400" />
                <h3 className="text-base font-bold text-slate-100">{b.k}</h3>
                <span className="font-mono text-xs text-slate-600">{b.en}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-sky-200/90">{b.q}</p>
              <ul className="mt-2 space-y-1 border-t border-slate-800 pt-2">
                {b.dos.map((d) => (
                  <li key={d} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                    <span className="shrink-0 text-slate-600">・</span>
                    {d}
                  </li>
                ))}
              </ul>
              {i < BOUNDS.length - 1 && (
                <span className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 font-mono text-xs text-slate-600 md:block">
                  ▶
                </span>
              )}
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-slate-100">同一個情境，兩種風險：</strong>
            你叫 Agent 整理某個資料夾裡的專案文件。
          </p>
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {RISKS.map((r) => (
              <div key={r.en}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-base font-bold text-amber-300">{r.name}</h3>
                  <span className="font-mono text-xs text-slate-500">{r.en}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{r.what}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{r.why}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-amber-500/20 pt-3 text-sm leading-relaxed text-slate-400">
            這兩種可能接連發生，但它們不是彼此的必要條件：沒有被注入指令，權限給太大一樣會出事。
            <span className="ml-1 text-slate-500">
              研究者驗證過：Claude Code 的 GitHub 自動化，待辦單的內容裡藏一句指令，環境變數裡的憑證就被寫回那張待辦單。2026/01 通報、2026/02 修補完成。
            </span>
            <a
              href="https://flatt.tech/research/posts/poisoning-claude-code-one-github-issue-to-break-the-supply-chain/"
              target="_blank"
              rel="noreferrer"
              className="ml-2 whitespace-nowrap text-xs text-slate-600 hover:text-slate-300"
            >
              GMO Flatt Security <ExternalLink size={10} className="inline" aria-hidden="true" />
            </a>
          </p>
        </AnimatedBlock>

        <Callout
          tone="focus"
          stepIndex={6}
          footnote={
            <>
              接了 AI 的部分，OWASP 另外出了一份
              <a
                href="https://genai.owasp.org/llm-top-10/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
              >
                {' '}
                OWASP Top 10 for LLM Applications（2025 版） <ExternalLink size={11} />
              </a>
              ，上面這兩種都在那一份裡。它是一份檢查清單，不是安全驗收，也不是法遵認證。
            </>
          }
        >
          限制資料來源、降低系統權限、影響大的動作要人核准，而且留得下執行紀錄。
          <span className="mt-2 block text-slate-400">
            三件事要分清楚：指示不是權限管理機制；AI Review 沒有回報明顯問題，不等於拿到正式的執行授權；
            不可信的文件裡寫的東西，不該被當成系統或使用者的指令。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
