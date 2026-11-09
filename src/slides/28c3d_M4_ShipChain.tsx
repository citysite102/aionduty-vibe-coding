import { Workflow, ArrowDown } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-6 第五頁。2026-11-09 新增（講師給了逐塊的規格）。
 *
 * 位置是刻意的：上一頁（`28c3b_M4_ShipScan`）講的是**有哪幾種檢查、各自找得到什麼**，
 * 這一頁講**實際接起來的順序，以及每一關手上有哪些工具**。下一頁（`28c3e_M4_ShipAudit`）
 * 才給一段把工具盤點、威脅模型與報告結構一起交代完的 Prompt。
 * **不要把這一頁搬到 `28c3b` 前面**：沒有先分清楚三種檢查，四個階段會被讀成四種工具都要裝。
 *
 * ⚠ **四關不是前一頁那三種檢查的對照表**，第一關是開發，而專業安全驗證沒有自己的一關
 * （它依風險加進第四關）。開場那一句與逐字稿的轉場 2026-11-09 都改過，**不要再寫成
 * 「那三種檢查接起來就是這四關」**，那會讓學員以為三種檢查有固定順序。
 *
 * ── 這一頁與 `28c3b` 的分工（B-5，改任何一頁之前先看）──────────────
 *   `28c3b`：誰能驗（自動化／AI 輔助／專業驗證），每一種的時機、方法、能發現與限制。
 *   這一頁：那幾種接成一條線之後的順序，以及每一關實際叫得出名字的工具。
 * 兩頁互換位置讀起來會有差別，所以是兩頁；但**工具清單只留在這一頁**。
 * `28c3b` 原本頁尾那一塊〈起步工具〉（Dependabot、GitHub Secret Scanning、npm audit）
 * 同日搬進這一頁底下的「基礎掃描」那一欄，**不要在 `28c3b` 長回來**。
 *
 * ── 四個階段的規格（講師指定，不要調順序）────────────────────
 *   1 主要開發 Agent　2 規則式安全掃描　3 AI 深度安全分析　4 部署前的安全驗收
 * 四個階段**不分顏色**，只有第四關的底色亮一階，因為它是最後決定要不要部署的那一關。
 * 箭頭用 `ArrowDown`，**不要發光也不要動**。
 *
 * ⚠ **這一頁最容易被誤讀成「四種工具都要買、都要裝」**，三個地方在擋，不要刪：
 *   1. 第二、三關的工具都寫成「挑一個」
 *   2. 底下兩欄是可選方案的清單，不是安裝清單
 *   3. 頁尾那一句：方案與使用權限會調整，掃描結果也不等於完整的安全保證
 *
 * ── 2026-11-09 最後一輪（講師）──────────────────────────
 * 四關定位成**建議的順序**，不是每個專案都要照著跑完的固定流程；開場那一句不要改回去。
 * 第二關補了「不必等到開發結束，改完就可以跑，也可以掛進 CI」——原本的四關排法
 * 會讓人以為規則式掃描要等開發結束才開始。
 * 每一關的 `role` 從「主要開發 Agent／規則式安全掃描／AI 深度安全分析」改成
 * **工具的角色**（開發工具／規則式掃描工具／AI 安全審查工具），四格才對得起來。
 * 頁尾補「範圍會互相重疊，但沒有一個工具涵蓋得了全部」與「有些要另外申請或開通」。
 *
 * ── 2026-11-09 Codex 審查之後改掉的四處，不要改回去 ─────────────
 *   1.「挑一個手上能用的就夠了」→ 先確認它涵蓋哪些檢查。品牌擇一不等於三類都查到：
 *      `npm audit` 只看相依套件，金鑰與程式碼要另外的工具。
 *   2. 第四關原本寫「確認沒有帶出新的漏洞」，那比頁尾「不等於完整的安全保證」還滿，
 *      改成針對修好的地方重測、記下還無法確認的風險。
 *   3. Codex Security 漏了 SDK，四種介面是 Cloud、plugin、CLI、SDK。
 *   4. GitHub Action 補「設定好之後」：它要 API key 與 workflow，有訂閱不等於有這條流程。
 * 另外頁尾補了一句**各工具的預設範圍不同**：Claude Code 的 `/security-review` 預設看的是
 * 這個分支的變更，跟 `28c3` 那一輪的全專案十類盤點不是同一件事，**不要寫成等價**。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-11-09。
 *   Claude Code 的 `/security-review` 與 GitHub Action（`anthropics/claude-code-security-review`）
 *   開放給 Pro／Max／Ultra 付費方案與 API Console 帳號：
 *   https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code
 *   Codex Security 有 Cloud、plugin、CLI、SDK 四種介面，**Cloud 當天仍標示研究預覽**，
 *   2026-03 起依序開放給 ChatGPT Pro／Business／Enterprise／Edu：
 *   https://learn.chatgpt.com/codex/security
 * **這兩個都還在動**（方案、預覽狀態、介面名稱），改到這一頁就整組重查，
 * 而且畫面上只寫「要看方案與授權」，**不要印價格與免費額度**（A-5、C-3）。
 * Semgrep 與 Snyk 只寫它們查什麼，不寫方案。
 *
 * 用色：sky（每一關的副標與底下兩欄的欄標）一種（A-1）。
 */

/** 四個階段。`tone` 只分第四關與前三關的底色明度，不分色相。 */
const STAGES = [
  {
    n: '01',
    k: 'Claude Code／Codex',
    role: '開發工具',
    v: '開發功能、修改程式碼、執行測試。它寫出來的東西就是後面三關要檢查的對象。',
  },
  {
    n: '02',
    k: 'Semgrep／Snyk（挑一個）',
    role: '規則式掃描工具',
    v: '照既有的規則與漏洞名單比對：常見的不安全寫法、第三方套件的已知漏洞、被寫進程式碼的金鑰。這一關不必等到開發結束，改完就可以跑，也可以掛進 CI 每次提交自動跑。',
  },
  {
    n: '03',
    k: 'Codex Security／Claude Code 的 /security-review（挑一個）',
    role: 'AI 安全審查工具',
    v: '跨檔案讀程式邏輯、整理威脅模型，並協助驗證可疑的地方。用 OWASP 十條跑的那一輪就落在這一關。它給的是待確認清單，不是結論。',
  },
  {
    n: '04',
    k: '人工 Review → 修復 → 重新掃描',
    role: '部署前的安全驗收',
    v: '針對修好的地方重測，確認相關功能沒有退步，記下還無法確認的風險，再決定要不要部署。',
    last: true,
  },
];

const TOOLS = [
  {
    k: '基礎掃描',
    en: 'Rule-based',
    items: [
      ['Semgrep', '靜態程式碼安全分析'],
      ['Snyk', '相依套件、程式碼與設定'],
      ['GitHub Security', 'Dependabot、Code Scanning、Secret Scanning'],
      ['npm audit', 'npm 專案的相依套件'],
    ],
  },
  {
    k: '深度分析',
    en: 'AI-assisted',
    items: [
      ['Codex Security', 'Cloud、plugin、CLI 與 SDK 四種介面，Cloud 仍是研究預覽'],
      ['Claude Code /security-review', '終端機裡隨時跑一輪'],
      ['claude-code-security-review', 'GitHub Action，設定好之後每個 Pull Request 自動審一次'],
    ],
  },
];

export default function SlideShipChain() {
  return (
    <SlideLayout
      title="安全檢查的四個階段，各自用什麼工具"
      subtitle="Security Pipeline"
      icon={Workflow}
    >
      <div className="max-w-6xl mx-auto w-full space-y-2.5 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          把開發、檢查、修復到放行接成一條線，大致是這四關。
          <strong className="text-slate-100">這是一條建議的順序，不是每個專案都要照著跑完一遍。</strong>
          第二關與第三關各挑一個能用的，挑之前先確認它涵蓋哪些檢查。
        </AnimatedBlock>

        <div>
          {STAGES.map((s, i) => (
            <AnimatedBlock key={s.n} stepIndex={i + 2}>
              <div
                className={`rounded-2xl border px-5 py-2 text-center ${
                  s.last ? 'border-slate-700 bg-slate-900' : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                {/* 編號、工具名與那一關的職務同一行：四張卡各省一行，整頁才放得進 16:9 */}
                <div className="flex flex-wrap items-baseline justify-center gap-x-2.5">
                  <span className="font-mono text-xs text-slate-600">{s.n}</span>
                  <h3 className="text-base font-bold text-slate-100">{s.k}</h3>
                  <span className="text-sm font-medium text-sky-400/80">{s.role}</span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-400">{s.v}</p>
              </div>
              {i < STAGES.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown aria-hidden="true" size={16} className="text-slate-600" />
                </div>
              )}
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3 md:grid-cols-2">
          {TOOLS.map((g) => (
            <div key={g.en}>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-sky-400">{g.k}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-slate-600">{g.en}</span>
              </div>
              <dl className="mt-1 space-y-0.5 text-sm leading-relaxed">
                {g.items.map(([t, d]) => (
                  <div key={t} className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-slate-200">{t}</dt>
                    <dd className="min-w-0 text-slate-500">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={7} as="p" className="px-1 text-sm leading-snug text-slate-500">
          同一關有好幾個選擇，
          <strong className="text-slate-400">先確認你挑的那一個涵蓋哪些檢查</strong>，沒涵蓋到的另外補。
          例如 npm audit 只看相依套件，金鑰與程式碼要另外的工具。四個階段不是四筆要先付的錢。
          <span className="mt-1 block">
            各工具的預設範圍也不同，有的掃整個專案，有的只看這次的變更；
            <strong className="text-slate-400">範圍會互相重疊，但沒有一個工具涵蓋得了全部</strong>。
            第四關那個人才是決定要不要部署的人。工具名稱、方案與使用權限會隨版本調整，
            有些還要另外申請或開通，不是裝了就能用。
            <span className="ml-2 font-mono text-xs text-slate-600">2026-11-09 查證</span>
          </span>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
