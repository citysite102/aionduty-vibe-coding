import { ListChecks, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元 8-6 第三頁。上一頁分出兩種風險來源，這一頁讓 Agent 跑第一輪網站安全檢查。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁的定位要先說清楚：**它產出的是一份有範圍、有證據的初步審查**，
 * 不是一張安全認證。整頁有三個地方在擋「跑完就安全了」這個誤讀，三個都不要刪：
 *   1. 每一條的第三行（還需要什麼證據）
 *   2. 四種結果狀態，其中「未發現明顯問題」明寫不等於證明安全
 *   3. 頁尾那一句：OWASP Top 10 是風險分類，不是完整的安全測試清單
 *
 * 2026-11-08 那一版的四欄表格拿掉了（條目／它在講什麼／可以這樣要求它／不能只靠它），
 * 它寬到要橫向捲動，而且「它能證明什麼」那個說法會被讀成 AI 給得出證明。
 * 現在五條各一張卡，固定三行：**問題／要它查什麼／還需要什麼證據**。
 *
 * ── 2026-11-09 結論那一塊改成四格（講師：太武斷，而且看不懂）─────────────
 * 病根是畫面跟它自己底下那段 Prompt 對不起來：**Prompt 寫的是「只能是這四種之一」**，
 * 畫面卻只排三格，第四種（不適用）躲在底下那行小字裡，所以小標的「這幾種」數不出來。
 * 現在四種各一格，小標也從「每一條的結論**只能是**這幾種」改成「**先規定**它只能用這四種結論」：
 * 那不是一個關於世界的斷言，是**你在 Prompt 裡給它的限制**，寫成前者就變武斷。
 * **不要改回三格**，也不要把「不適用」塞回頁尾那行小字。
 *
 * ⚠ **只列五條是刻意的**，十條全列會變成一頁要背的東西。另外五條在頁尾給名字，
 * 而且要寫明完整審查仍然要涵蓋它們，**不要暗示那五條不重要**。
 * 底下那段 Prompt 跑的是十條，不是五條。
 *
 * ── 那段 Prompt 的順序是講師指定的，不要調 ──────────────────
 *   1 先辨識專案架構與這次涵蓋的範圍　2 依十項分類逐條初步審查
 *   3 每項給證據、位置、限制與修正方向　4 列出目前無法確認的
 *   5 排優先順序，並把已確認的問題與待驗證的疑慮分開
 * 底下那串安全限制**一條都不要刪**：只讀不改、不裝工具、不部署、不送測試流量、
 * 不做未經授權的動態測試、不輸出機密值、不推測不存在的東西、需要額外工具先問過你。
 * A-4：複製鈕吃的字串單獨讀一遍要自己說得通。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-11-08，top10.owasp.org/2025。五條的官方英文名稱：
 *   A01 Broken Access Control／A02 Security Misconfiguration／
 *   A03 Software Supply Chain Failures／A07 Authentication Failures／
 *   A09 Security Logging and Alerting Failures。
 * 另外五條：A04 Cryptographic Failures、A05 Injection、A06 Insecure Design、
 * A08 Software or Data Integrity Failures、A10 Mishandling of Exceptional Conditions。
 * 改版時編號與名稱都會動，**整組要重查，不要只改一兩條**。
 *
 * 清單本體在講義頁的〈上線前自查卡〉（`public/handouts/ship-check.md`），
 * 投影片不再印一次網址。改這一頁要回去看那張卡一眼。
 *
 * 用色：sky（要它查什麼）＋ amber（發現疑慮那一個狀態）兩種（A-1）。
 */

const RISKS = [
  {
    id: 'A01',
    en: 'Broken Access Control',
    zh: '存取控制失效',
    problem: '網址上的編號改成別人的，就看得到別人的東西。',
    check: '列出每一個會讀寫資料的入口，各寫出誰可以用，並檢查後端有沒有同時確認身分、角色，以及這筆資料歸誰。',
    beyond: '誰該看到什麼是你的規則，要你自己確認；實際擋不擋得住要另外測一次。',
  },
  {
    id: 'A02',
    en: 'Security Misconfiguration',
    zh: '安全設定錯誤',
    problem: '東西本身沒做錯，但門沒關：權限全放行、金鑰進了版控。',
    check: '列出設定檔與環境變數的位置，標出哪些目前是全放行、哪些不該進版控。',
    beyond: '正式環境那一份設定在你手上，原始碼裡看不到。',
  },
  {
    id: 'A03',
    en: 'Software Supply Chain Failures',
    zh: '軟體供應鏈失效',
    problem: '你裝的套件本身有漏洞，或是更新的內容被動過手腳，問題就跟著進到你的作品裡。',
    check: '列出所有第三方套件與外部服務、各自的版本，標出有已知問題的那幾個。',
    beyond: '要不要換、換不換得起是成本問題；最新的漏洞公告要靠掃描工具查，查不到就標無法確認。',
  },
  {
    id: 'A07',
    en: 'Authentication Failures',
    zh: '身分驗證失效',
    problem: '鎖是裝了，但誰都可以一直試。',
    check: '列出登入、改密碼、忘記密碼三條路各自怎麼驗身分，哪一條沒有次數限制。',
    beyond: '要不要加第二道驗證是你的取捨；擋不擋得住連續嘗試要實際測。',
  },
  {
    id: 'A09',
    en: 'Security Logging and Alerting Failures',
    zh: '安全日誌與告警失效',
    problem: '東西被動過，你不知道，也查不出是誰。',
    check: '列出哪些動作有留下紀錄、紀錄裡有沒有時間與操作者，哪些重要動作完全沒記到。',
    beyond: '告警有沒有真的送到人手上，要在正式環境裡驗。',
  },
];

const STATES = [
  {
    k: '發現疑慮',
    v: '給出可疑的位置、可能的影響，以及為什麼還需要驗證。',
    hot: true,
  },
  {
    k: '未發現明顯問題',
    v: '說明實際檢查了哪些範圍。這不等於已經證明安全。',
  },
  {
    k: '無法確認',
    v: '列出缺少什麼：設定、測試環境，或其他證據。',
  },
  {
    k: '不適用',
    v: '這個專案真的用不到的項目，要寫出為什麼用不到。',
  },
];

const AUDIT_PROMPT = [
  '請依 OWASP Top 10:2025 對這個專案做第一輪安全審查。這一輪只讀不改。',
  '',
  '順序：',
  '1. 先看一遍專案結構，說明這是哪一種應用、用到哪些框架與外部服務，並列出這次審查涵蓋與不涵蓋的範圍。',
  '2. 依 OWASP Top 10:2025 十項分類逐條做初步審查。',
  '3. 每一條都要給：結論、證據（哪個檔案的哪幾行）、這個結論的限制、以及修正方向。',
  '4. 另外列出目前無法確認的風險，說明缺少什麼才判斷得了。',
  '5. 最後排出處理順序，並且把「已確認的問題」與「待驗證的疑慮」分開列。',
  '',
  '每一條的結論只能是這四種之一：發現疑慮／未發現明顯問題／無法確認／不適用（要寫理由）。',
  '「未發現明顯問題」要說明你實際檢查了什麼，不要寫成已經證明安全。',
  '',
  '這一輪的限制：',
  '- 只讀本機這個專案的原始碼與非機密設定。',
  '- 不修改程式碼、不安裝工具、不部署。',
  '- 不對外部系統送出任何測試流量，也不做未經授權的動態測試或滲透測試。',
  '- 不要輸出 API Key、Token、密碼這類機密值，看到只寫出它的位置。',
  '- 不要推測不存在的檔案、漏洞或測試結果。',
  '- 需要額外工具或動態測試才判斷得了的，先寫出需求與範圍讓我決定。',
].join('\n');

export default function SlideShipOwasp() {
  return (
    <SlideLayout
      title="讓 Agent 幫你做第一輪網站安全檢查"
      subtitle="OWASP Top 10:2025 · Security Review"
      icon={ListChecks}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          以 OWASP Top 10 當成風險的參考清單，
          <strong className="text-slate-100">讓 Agent 指出可能的問題、交出程式碼上的證據，並標示哪幾項還要用別的方式驗證。</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900">
          {RISKS.map((r) => (
            <div key={r.id} className="grid grid-cols-1 gap-x-5 gap-y-1 px-5 py-3 md:grid-cols-[11rem_minmax(0,1fr)]">
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-bold text-slate-300">{r.id}</span>
                  <span className="text-sm font-bold text-slate-100">{r.zh}</span>
                </div>
                <div className="font-mono text-xs leading-tight text-slate-600">{r.en}</div>
              </div>
              <dl className="min-w-0 space-y-0.5 text-sm leading-relaxed">
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-xs text-slate-600">問題</dt>
                  <dd className="min-w-0 text-slate-400">{r.problem}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-xs text-sky-400/80">要它查</dt>
                  <dd className="min-w-0 text-sky-200/90">{r.check}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-xs text-slate-600">還要別的證據</dt>
                  <dd className="min-w-0 text-slate-500">{r.beyond}</dd>
                </div>
              </dl>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <h3 className="mb-2 text-base font-bold text-slate-100">先規定它只能用這四種結論</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {STATES.map((s) => (
              <div
                key={s.k}
                className={`rounded-2xl border p-4 ${
                  s.hot ? 'border-amber-500/30 bg-amber-500/5' : 'border-slate-800 bg-slate-900/40'
                }`}
              >
                <div className={`text-base font-bold ${s.hot ? 'text-amber-300' : 'text-slate-100'}`}>{s.k}</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            <strong className="text-slate-400">沒有「通過」這個選項</strong>，它交出來的是一份待確認清單。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4}>
          <CopyBlock
            label="十條一起交給它查"
            note="在那個專案的資料夾裡貼，它只讀不改"
            text={AUDIT_PROMPT}
            size="xs"
          />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} as="p" className="px-1 text-sm leading-relaxed text-slate-500">
          上面只列了五條，另外五條是 A04 加密、A05 注入、A06 設計本身的問題、A08 完整性、
          A10 例外狀況沒處理好。
          <strong className="text-slate-400">完整的審查仍然要涵蓋這五條</strong>，上面那段可複製的 Prompt 要求的就是十條。
          <span className="mt-1.5 block">
            OWASP Top 10 是網頁應用程式的風險分類，
            <strong className="text-slate-400">不是一份完整的安全測試清單</strong>。
            正式環境、外部服務、權限設定、攻擊防護與告警，光讀原始碼都判斷不了。
          </span>
          <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
            <span>2026-11-08 查證，現行版是 2025</span>
            <a
              href="https://top10.owasp.org/2025"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
            >
              OWASP Top 10:2025 <ExternalLink size={11} />
            </a>
          </span>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
