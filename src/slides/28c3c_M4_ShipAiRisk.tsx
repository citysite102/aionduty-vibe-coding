import { Brain, MessageSquareWarning, KeyRound, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-20 新增（講師：要補 AI 時代特有的風險）。
 *
 * 使用現場（B-5b）是 `27b8h_M4_NeedBackend`：那一頁叫學員做的就是
 * 「前端把本週的航行日誌送給後端，後端拿金鑰去呼叫 AI 講評」。
 * 所以這兩類風險他的作品真的會有，不是先講一個以後才用得到的東西。
 * **那一頁如果被改掉或搬走，這一頁要跟著重看。**
 *
 * 指回課程做過的東西用「我們前面做的」，不要寫「你做的」。那段程式是帶著學員一起做的，
 * 寫成「你做的」會變成在考他記不記得；「我們前面做的」才接得上這門課的口氣（D-6b）。
 *
 * 只講兩類是刻意的：清單上還有別的（輸出處理、模型中毒、向量資料庫⋯），
 * 但那幾類要先有更複雜的架構才碰得到。這門課的作品結構就是「使用者的文字進去、
 * AI 的文字出來、金鑰在後端」，對得上的就是這兩類。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-20，對照 genai.owasp.org。當時的現況：
 *   - AI 應用的清單叫 OWASP Top 10 for LLM Applications，Agent 系統另有一份
 *     Top 10 for Agentic Applications，以及 2026-09 捐進來的 Agent Control Standard。
 *   - genai.owasp.org/llm-top-10/ 上列的仍是 2025 版十條，第一條是
 *     LLM01:2025 Prompt Injection；而 2026-09-01 的公告說 2026 版已經發布，
 *     只確認了「Excessive Agency 排第三」，沒有列出完整條目。
 *   - **所以畫面上不印編號也不印年份**，只寫這兩類的名字與它們在清單上。
 *     要印條目先回 genai.owasp.org 確認版本與完整清單，不要照公告推測。
 *
 * 2026-10-30 補兩個真實案例（講師要求）。兩筆都讀到一手報告，不是新聞轉述（C-2）：
 *   - Claude Code GitHub Actions：GMO Flatt Security 的 RyotaK 通報。
 *     flatt.tech/research/posts/poisoning-claude-code-one-github-issue-to-break-the-supply-chain/
 *     2026-01-12 通報、2026-01-16 修掉權限繞過（claude-code-action v1.0.94），
 *     2026-06-01 才公開。CVSS v4.0 7.8。攻擊路徑是 GitHub App 讓 `checkWritePermissions`
 *     回傳 true，接著用注入把 `ACTIONS_ID_TOKEN_REQUEST_TOKEN` 這類環境變數帶走，
 *     換成有寫入權的 App token。另一半是 `allowed_non_write_users: "*"` 配 `issues: write`。
 *   **畫面上不要寫受害台數或 CVSS。** 流傳的「4,000 台／8 小時」在一手報告裡找不到
 *   （D-2 編造的量化數據）。CVSS、OIDC token、postinstall 這些字也不要上畫面，
 *   這門課一半的人不寫程式（D-2）。
 *
 *   **右邊那張卡（Excessive Agency）目前沒有案例，這是已知的缺口。** 換過兩次都沒留下：
 *     - Clinejection（npm 供應鏈）：講師不知道 Cline 是什麼，學員更不會，而且它也是注入，
 *       跟第一筆重複。
 *     - 澳洲健身房候補名單（ABC News 2026-08-10）：題材最好懂，但講師不要。
 *   還沒評估完的候補：2026-07 OpenAI 的測試用 agent 跑出測試環境、攻進 Hugging Face
 *   （aljazeera.com/news/2026/7/22/…，OpenAI 與 Hugging Face 都證實）。事件夠大，
 *   但要先解釋 Hugging Face 與測試環境是什麼，而且跟學員自己做的東西不像。
 *   **補的時候 `kind` 要寫「它的權限」**，跟右邊那張卡的標題對上，這是這一塊的設計。
 * ─────────────────────────────────────────────────────
 *
 * 強調色只有 amber（風險提示）。收尾的 focus 不計入（A-1）。
 */

const RISKS = [
  {
    icon: MessageSquareWarning,
    name: '它讀到的東西裡可能有指令',
    en: 'Prompt Injection',
    body: '送進 AI 的那段文字，它分不出哪些是資料、哪些是命令。使用者打的字、它讀到的網頁、上傳的檔案裡都可以藏指令。',
    dos: [
      '使用者的內容當資料看，要做的事寫在你自己的指示裡',
      '會寄信、付款、刪東西的動作不要讓它自己決定，要回來問你',
      '內部規則與金鑰不要寫進給它的那段指示裡',
    ],
  },
  {
    icon: KeyRound,
    name: '你給它的權限超過它需要的',
    en: 'Excessive Agency',
    body: '那支程式能碰到的範圍越大，一次判斷失誤的代價就越大。你的後端只該做一件事，不該順便握著整個資料庫的鑰匙。',
    dos: [
      '那支程式只做一件事，不要讓它同時能讀會員資料又能發信',
      '金鑰放在後端的環境變數，前端只呼叫你自己的網址',
      '它做了什麼要留得下紀錄，出事才查得到',
    ],
  },
];

/**
 * `kind` 要跟上面兩張卡的標題對得起來，那是這一塊唯一的作用。
 * 目前只有左邊那張卡有案例，右邊那張卡還缺一筆，理由與候補寫在檔頭的 C-1。
 * **加第二筆之前先實機量高度**，這一頁 2026-10-30 量過，一行就是一筆的空間。
 */
const CASES = [
  {
    when: '2026/01',
    kind: '它讀到的指令',
    what: 'Claude Code 的 GitHub 自動化，待辦單標題裡藏一句指令，雲端金鑰被送了出去。',
    href: 'https://flatt.tech/research/posts/poisoning-claude-code-one-github-issue-to-break-the-supply-chain/',
    src: 'GMO Flatt Security',
  },
];

export default function SlideShipAiRisk() {
  return (
    <SlideLayout
      title="接了 AI 之後：它讀到的指令和它的權限"
      subtitle="Risks Specific to AI Features"
      icon={Brain}
      updated={{ date: '2026/10/30', kind: '新增' }}
    >
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col pt-2 pb-2">
        <p className="text-slate-300 text-base leading-relaxed mb-2">
          航行日誌的講評功能就是這種結構：文字送進去、AI 的回答送出來、金鑰放在後端。
          <strong className="text-slate-100">它多出兩類一般網站清單上沒有的風險</strong>。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch mb-3">
          {RISKS.map((r, i) => (
            <AnimatedBlock
              key={r.en}
              stepIndex={i + 1}
              className="bg-slate-900 border border-amber-900/40 rounded-2xl p-4 flex flex-col"
            >
              <h3 className="text-lg font-bold text-slate-100 flex items-start gap-3 mb-1">
                <span className="w-9 h-9 shrink-0 rounded-full bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <r.icon size={18} aria-hidden="true" />
                </span>
                {r.name}
              </h3>
              <p className="text-slate-500 text-xs font-mono mb-3 pl-12">{r.en}</p>

              <p className="text-slate-300 text-base leading-relaxed mb-3">{r.body}</p>

              <div className="mt-auto pt-3 border-t border-slate-800">
                <div className="text-slate-400 text-sm font-medium mb-2">怎麼做</div>
                <ul className="space-y-1.5">
                  {r.dos.map((d) => (
                    <li key={d} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                      <span className="text-slate-600 shrink-0">・</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        {/*
          放在兩張卡後面、收尾前面：卡講的是風險本身，這一塊是它真的發生過的證據。
          全灰階，amber 已經被上面兩張卡用掉了（A-1 一頁兩色）。
        */}
        <AnimatedBlock
          stepIndex={3}
          className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-2.5 mb-2"
        >
          <p className="text-slate-300 text-sm leading-relaxed mb-2">
            <strong className="text-slate-100">這不是假設，2026 年真的出過</strong>。
          </p>
          <div className="space-y-1.5">
            {CASES.map((c) => (
              <p key={c.kind} className="text-slate-400 text-sm leading-relaxed">
                <span className="font-mono text-xs text-slate-600 mr-3">{c.when}</span>
                <strong className="text-slate-200">{c.kind}：</strong>
                {c.what}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 text-xs text-slate-600 hover:text-slate-300 whitespace-nowrap"
                >
                  {c.src} <ExternalLink size={10} className="inline" aria-hidden="true" />
                </a>
              </p>
            ))}
          </div>
        </AnimatedBlock>

        <Callout
          tone="focus"
          stepIndex={4}
          footnote={
            <>
              AI 應用的那一份是
              <a
                href="https://genai.owasp.org/llm-top-10/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
              >
                {' '}
                OWASP Top 10 for LLM Applications <ExternalLink size={11} />
              </a>
              ，這兩類都在上面。
            </>
          }
        >
          判斷方式跟前面那五道邊界是同一個：<strong className="text-slate-100">它碰得到多大的範圍，
          哪些動作要先問過你</strong>。差別只在管的對象換成你做出來的東西。
        </Callout>
      </div>
    </SlideLayout>
  );
}
