import { ClipboardCheck, Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { calloutClass } from '../components/Callout';

/**
 * 單元 8-6 第六頁。2026-11-09 新增（講師給了逐塊的規格）。
 *
 * 這一頁交出一段**完整的 Application Security Review Prompt**，學員原封不動貼進
 * Claude Code 或 Codex 就跑得動。上一頁（`28c3d_M4_ShipChain`）列出四個階段有哪些工具，
 * 這一段把那些工具的盤點寫進 STEP 2，所以兩頁是接著的，**不要對調**。
 *
 * ── 它跟 `28c3_M4_ShipOwasp` 那段 Prompt 的分工（B-5，兩段都不要刪）────────
 *   `28c3`：只靠 Agent 讀程式碼的第一輪，照 OWASP 十條分類，沒有工具也跑得動。
 *   這一頁：工具盤點（STEP 2）、Threat Model（STEP 1）、八類高風險項目（STEP 3）、
 *           驗證狀態（STEP 4）與一份交得出去的報告結構（STEP 5）。
 * 兩段的用途不同，所以畫面左欄第一句就在講這件事，**那一句不要刪**，
 * 否則學員會問「剛才不是已經有一段了嗎」。
 *
 * ── 為什麼不是 `CopyBlock`，也不是左欄＋右欄（A-4）──────────────────
 * 這段 Prompt 五十幾行。單欄的 `CopyBlock` 在 16:9 上要捲兩屏；講師原本的規格是
 * 「左欄 32% 放步驟、右欄 68% 放 Prompt」，但那樣 Prompt 只剩約 390px 寬，
 * 中文行幾乎每行都折，右欄的 CONSTRAINTS 直接掉到畫面外。
 * 所以步驟與提醒改成**頂上一條橫列**，Prompt 吃滿整個寬度再分兩欄，
 * 這是在「版面照規格」與「Prompt 不刪節」之間選了後者（講師指定：不得刪節）。
 *
 * 規格本體宣告成 `SECTIONS` 陣列，**畫面用 `.map()` 印、複製鈕用 `promptText()` 接**，
 * 這就是 A-4 要的「印的跟複製到的是同一份」。
 * **不要為了版面把任何一行從 `SECTIONS` 刪掉**，要省空間就把句子寫短，不要少一條要求。
 * `col` 欄位決定它排在左欄還是右欄，**兩欄只能照順序切一刀**（左欄是前幾段、右欄是後幾段），
 * 否則讀者照畫面讀會跳段。目前切在 STEP 2 與 STEP 3 中間。
 *
 * 量過的高度（2026-11-09，視窗 1512×772）：這一頁 678px、`28c3d` 589px，
 * 內容區在那個視窗只有 528px，所以**視窗高度低於約 930px 會需要捲動**；
 * 全螢幕 1080p 放得下。隔壁的 `28c3` 同一個量法是 1383px，這兩頁已經比它短得多。
 * 改內容之後要再量一次：`document.querySelector('[data-slide-scroll]')` 的
 * `scrollHeight` 對上 `clientHeight`。
 *
 * ── CONSTRAINTS 一條都不要刪 ──────────────────────────────
 * 五條限制（不改程式碼與不自動部署、不讀不必要的正式環境 Secrets、不對正式環境做未經授權的
 * 攻擊、不虛構工具執行結果、先交報告等確認）加最後一行「先盤點再開始」。
 * **口白與講義都要講五條，不要說六條**（2026-11-09 Codex 審查抓到的數錯）。
 * 它們擋的是學員照抄之後 Agent 直接動手。
 *
 * 標題原本是「完整安全審查」，同日改成「進階」：STEP 3 只強制八類，
 * 說「完整」比這段 Prompt 實際要求的還滿（D-2 過度承諾）。**不要改回去。**
 * 同一輪 TASK 裡的「一輪完整的 Application Security Review」也改成「範圍依下面五個步驟」，
 * 標題收斂了內文沒收斂，學員會以為跑完這一段就涵蓋全部。
 *
 * ⚠ Prompt 本體是 `text-xs`，低於 A-4 的「投影片內文最低 text-sm」。這是刻意的取捨：
 * 升到 `text-sm` 就放不下整段，而講師指定 Prompt 不得刪節。要改回 `text-sm` 的話，
 * 得先決定畫面上只放步驟與一筆示例、完整原文只留在講義（`public/handouts/ship-check.md`）。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-11-09。STEP 2 寫進畫面的工具名稱與 `28c3d_M4_ShipChain` 同一組，
 * 出處與查證紀錄寫在那個檔案的檔頭，**要改名稱兩個檔案一起改**。
 * Claude Code 的指令是 `/security-review`；Codex 那邊的產品名是 Codex Security。
 * **不要寫成「Claude Security Plugin」**，官方文件上沒有這個東西（2026-11-09 查證）。
 *
 * 用色：sky（Prompt 的段落標題）＋ amber（第一次執行的提醒）兩種（A-1）。
 */

/**
 * Prompt 本體。`h` 是段落標題，`lines` 是那一段的內容，`col` 決定排在哪一欄。
 * 複製鈕吃的字串由這個陣列接出來，所以畫面上看到的就是複製到的那一份（A-4）。
 */
const SECTIONS = [
  {
    h: 'ROLE',
    col: 0,
    lines: [
      '你是一位 Application Security Engineer，負責審查這個專案的應用程式安全性。',
      '請以實際的程式碼與架構為依據，不要只給一般性的安全建議，也不要假設掃描工具都已經裝好。',
    ],
  },
  {
    h: 'TASK',
    col: 0,
    lines: [
      '請對這個專案執行一輪 Application Security Review，範圍依下面五個步驟。',
      '第一階段只做唯讀分析、靜態檢查與安全的本機測試，不修改程式碼、資料庫或部署環境。',
    ],
  },
  {
    h: 'STEP 1｜理解專案架構',
    col: 0,
    lines: [
      '- 辨識使用的 Framework、Languages、Dependencies。',
      '- 找出外部 API、資料庫、認證機制，以及使用者資料與敏感資訊的處理位置。',
      '- 描述主要資料流、信任邊界與可能的攻擊入口。',
      '- 依實際架構建立簡要的 Threat Model。',
    ],
  },
  {
    h: 'STEP 2｜執行安全掃描',
    col: 0,
    lines: [
      '先確認這個環境有哪些可用的掃描工具，例如：',
      '- Semgrep：靜態程式碼安全分析。',
      '- Snyk：相依套件、程式碼與設定的安全檢查。',
      '- GitHub Security：Dependabot、Code Scanning、Secret Scanning。',
      '- Codex Security 或 Claude Code 的 /security-review：深度程式碼分析。',
      '只執行實際可用、而且符合這個專案授權與環境限制的工具。',
      '沒有工具可用就明確說明限制，改由你直接讀程式碼做邏輯層級的審查，並列出仍然需要工具或人工才驗得了的項目，不要宣稱已經完成工具掃描。',
    ],
  },
  {
    // 八類刻意排成一行兩個：一行一個會多佔四行，右欄就擠不下 CONSTRAINTS（檔頭那條）。
    h: 'STEP 3｜檢查高風險項目',
    col: 1,
    lines: [
      '先核對第一輪 OWASP 十類的結果與待確認事項，再逐條檢查下面這八類：',
      '1. Authentication / Authorization　2. API Access Control',
      '3. Secrets / Environment Variables　4. Injection / XSS / CSRF',
      '5. Dependency Vulnerabilities　6. Database Access / Row Level Security',
      '7. Sensitive Data Exposure　　8. Security Misconfiguration',
      '不適用的項目要說明原因，不要為了填滿報告製造問題。',
    ],
  },
  {
    h: 'STEP 4｜驗證發現',
    col: 1,
    lines: [
      '每一項可能的漏洞都要：',
      '- 標出檔案位置與相關的程式碼。',
      '- 說明問題成立的條件與可能的影響。',
      '- 區分已驗證、待驗證與可能誤報。',
      '- 能安全驗證的，優先在隔離的測試環境做。',
      '- 不對正式環境執行未經授權的攻擊測試。',
    ],
  },
  {
    h: 'STEP 5｜輸出安全審查報告',
    col: 1,
    lines: [
      '1. Executive Summary：整體安全狀況與主要風險。',
      '2. Threat Model：系統架構、資產、信任邊界與攻擊面。',
      '3. Findings：依 Critical / High / Medium / Low 分級。',
      '4. Evidence：對應的檔案位置、分析依據與驗證狀態。',
      '5. Remediation Plan：修復方式、優先順序與預期影響。',
      '6. Verification：修復之後要怎麼重新測試。',
      '7. Coverage & Limitations：這次實際檢查的範圍與沒有涵蓋的項目。',
    ],
  },
  {
    h: 'CONSTRAINTS',
    col: 1,
    lines: [
      '- 不直接修改程式碼，也不自動部署。',
      '- 不讀取正式環境的機密值；報告只寫出變數名稱與檔案位置，不要輸出金鑰、Token 或密碼本身。',
      '- 不對第三方或正式環境執行未經授權的攻擊。',
      '- 不虛構工具的執行結果或漏洞的驗證結果。',
      '- 先提交報告與修復計畫，等我確認再動手。',
      '請先盤點專案架構與可用的掃描工具，再開始檢查。',
    ],
  },
];

/** 複製鈕吃的字串。畫面上印的就是這一份（A-4）。 */
function promptText() {
  return SECTIONS.map((s) => [s.h, ...s.lines].join('\n')).join('\n\n');
}

/** 四個操作步驟。排成一列而不是一欄，理由見檔頭「為什麼不是側欄」那一段。 */
const STEPS = [
  '打開要檢查的那個專案',
  '確認手上有哪些掃描工具，沒有也可以跑',
  '貼上底下這一段，只讀不改',
  '看完報告再決定要不要讓它動程式碼',
];

/** 複製整段 Prompt。行為與 `CopyBlock` 同一套，只是這一頁的版面是兩欄。 */
function CopyPrompt() {
  const [done, setDone] = useState(false);
  async function copy() {
    const text = promptText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 剪貼簿 API 在非 HTTPS 或權限被鎖的瀏覽器會丟例外，公司配的機器常見
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setDone(true);
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="複製這段 Prompt"
      className={`ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-xs cursor-pointer transition-colors ${
        done
          ? 'border-emerald-500/40 text-emerald-400'
          : 'border-slate-700 text-slate-500 hover:border-sky-500/40 hover:text-sky-300'
      }`}
    >
      {done ? <Check size={12} /> : <Copy size={12} />}
      {done ? '已複製' : '點一下複製整段'}
    </button>
  );
}

export default function SlideShipAudit() {
  return (
    <SlideLayout
      title="進階安全審查：盤點工具、威脅模型與報告"
      subtitle="Application Security Review"
      icon={ClipboardCheck}
    >
      <div className="max-w-6xl mx-auto w-full space-y-2 pb-3">

        <AnimatedBlock stepIndex={1} className="flex flex-col gap-2 md:flex-row md:items-center">
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-slate-400">
            比只讀程式碼的那一輪多了
            <strong className="text-slate-200">工具盤點、威脅模型，以及一份交得出去的報告</strong>。
          </p>
          <p className={`${calloutClass('warn')} shrink-0 px-4 py-2 text-sm leading-relaxed text-slate-300`}>
            第一次執行，先產出報告再決定修復。
            <strong className="text-amber-200">不要讓 Agent 直接改完就部署。</strong>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} as="ol" className="flex flex-wrap gap-x-5 gap-y-1 text-sm leading-relaxed text-slate-400">
          {STEPS.map((t, i) => (
            <li key={t} className="flex gap-1.5">
              <span className="font-mono text-xs text-slate-600">{`0${i + 1}`}</span>
              <span className="min-w-0">{t}</span>
            </li>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-4 py-2">
            <span className="font-mono text-xs uppercase tracking-widest text-sky-400 shrink-0">Prompt</span>
            <span className="min-w-0 truncate text-sm text-slate-500">在那個專案的資料夾裡貼</span>
            <CopyPrompt />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 px-4 py-2 md:grid-cols-2">
            {[0, 1].map((col) => (
              <div key={col} className="min-w-0 space-y-1.5">
                {SECTIONS.filter((s) => s.col === col).map((s) => (
                  <div key={s.h}>
                    <div className="font-mono text-xs font-bold tracking-wider text-sky-400">{s.h}</div>
                    <div className="mt-0.5 space-y-px">
                      {s.lines.map((l) => (
                        <p key={l} className="font-mono text-xs leading-tight text-slate-300">{l}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
