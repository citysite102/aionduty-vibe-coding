import { ListChecks, Check, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 2026-10-10 新增，接在〈三萬個 AI 做的網站，99% 有資安問題〉後面。
 *
 * 這一頁換過兩次方向，兩次都記在這裡，免得有人再走一遍：
 *   第一版是「做好了分三級」，依據是三個案例最後各補的那幾步 → 講師退回，
 *     那樣學員檢查的是「我有沒有照課程做」。
 *   第二版是我自己列的八題檢查清單 → 講師再退回，重點應該是讓他累積，
 *     而清單跑完就忘了，不會長大。
 *   現在這一版指向外面那份公認的清單。八題整組搬到講義頁的〈上線前自查卡〉，
 *     **投影片負責判斷，卡片負責照著跑**，跟 routing-card、health-check、
 *     error-guide 是同一個分工。
 *
 * 為什麼是 OWASP 而不是我自己寫一份：
 *   1. 它是學員的 IT 與資安真的在講的話。能說出「我照 OWASP 過一遍了」，
 *      他在審查會議上被對待的方式會不一樣。這是這門課很實際的一個職場報酬。
 *   2. 它是一個塞得進 Prompt 的名字。他驗不動，但他打得出那個指令。
 *   3. **它幾乎不過期。** 2021 → 2025 大約四年一版，而上一頁那三個掃描數字
 *      幾個月就會鬆動。要讓這門課撐久，指向 OWASP 比我寫清單耐放。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-10，對照 owasp.org/www-project-top-ten/（原話
 * 「The most current released version is the OWASP Top 10 2025」）與 top10.owasp.org/2025。
 * 當時的現況：現行版是 2025，十條依序為 A01 Broken Access Control、
 * A02 Security Misconfiguration、A03 Software Supply Chain Failures、
 * A04 Cryptographic Failures、A05 Injection、A06 Insecure Design、
 * A07 Authentication Failures、A08 Software or Data Integrity Failures、
 * A09 Security Logging and Alerting Failures、A10 Mishandling of Exceptional Conditions。
 * 下次改版前先看 top10.owasp.org 有沒有出新版；出了就要重對這張表的五條，
 * **不要只改年份**，條目的編號與名稱每一版都會動。
 * ─────────────────────────────────────────────────────
 *
 * 只標五條是刻意的。十條全列會變成一頁要背的東西，而這一頁的效果來自
 * 「原來我做的那幾件事有名字，而且排第一名」。**不要為了完整把另外五條也展開。**
 *
 * 強調色只有 emerald（已經做過的那五條）。收尾的 focus 不計入（A-1）。
 */
const DONE = [
  {
    id: 'A01',
    en: 'Broken Access Control',
    zh: '該擋的沒擋住',
    mine: '兩層權限、有人繞過畫面直接送請求、上一頁那兩千個沒有登入的工具',
  },
  {
    id: 'A02',
    en: 'Security Misconfiguration',
    zh: '設定沒調好',
    mine: 'RLS 沒開、權限全放行、金鑰進了版控',
  },
  {
    id: 'A03',
    en: 'Software Supply Chain Failures',
    zh: '別人的東西拖累你',
    mine: '外部來源掛掉整個作品就不會啟動、裝第三方工具前問的那四題',
  },
  {
    id: 'A07',
    en: 'Authentication Failures',
    zh: '登入這一關做得不夠',
    mine: '密碼猜錯不會被鎖、把密碼本身存在瀏覽器裡',
  },
  {
    id: 'A09',
    en: 'Security Logging and Alerting Failures',
    zh: '出事了沒有紀錄',
    mine: '它壞掉的時候你查不查得到、後台那幾個分頁',
  },
];

const OWASP_PROMPT =
  '照 OWASP Top 10 2025 逐條檢查這個專案，不要改任何檔案。' +
  '每一條都說明這個專案有沒有這個問題、你是從哪個檔案的哪一段看出來的，' +
  '看不出來就寫「看不出來」，不要用推測的。最後照「被人利用之後收不收得回來」排出處理順序。';

export default function SlideShipOwasp() {
  return (
    <SlideLayout
      title="你已經做過 OWASP 十條裡的五條"
      subtitle="OWASP Top 10:2025"
      icon={ListChecks}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          上一頁那幾類問題，外面有一份公認的清單在收，叫 OWASP Top 10，
          <strong className="text-slate-100">你公司的 IT 與資安就是照它在看東西</strong>。
          現行是 2025 版，大約四年一版，所以它不太會過期。十條裡有五條你已經撞過了。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 divide-y divide-slate-800/70">
          {DONE.map((d) => (
            <div
              key={d.id}
              className="grid grid-cols-1 md:grid-cols-[auto_minmax(0,300px)_minmax(0,1fr)] gap-x-4 gap-y-1 px-5 py-3 items-baseline"
            >
              <div className="flex items-center gap-2 shrink-0">
                <Check aria-hidden="true" size={14} className="text-emerald-400 shrink-0" />
                <span className="font-mono text-sm text-emerald-300 font-bold">{d.id}</span>
              </div>
              <div className="min-w-0">
                <div className="text-slate-100 text-sm font-bold leading-snug">{d.zh}</div>
                <div className="font-mono text-xs text-slate-600 leading-tight">{d.en}</div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{d.mine}</p>
            </div>
          ))}
        </AnimatedBlock>

        {/*
          另外五條只給名字，不展開。學員現在用不到，而展開會把這一頁
          從「你已經做過一半」變成「你還差五樣」，那是相反的效果。
        */}
        <AnimatedBlock stepIndex={3} as="p" className="text-slate-500 text-sm leading-relaxed px-1">
          另外五條（A04 加密、A05 注入、A06 設計本身的問題、A08 完整性、A10 例外狀況沒處理好）
          現在交給它就好，你知道有這幾條存在。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4">
          <div className="flex items-center gap-2 mb-2 text-slate-500 font-mono text-xs uppercase tracking-wider">
            Prompt　十條一起交給它查
          </div>
          <p className="text-sky-200 text-sm leading-relaxed">{OWASP_PROMPT}</p>
          <CopyAction text={OWASP_PROMPT} className="mt-2" />
        </AnimatedBlock>

        <Callout tone="focus" label="要照著跑的那一份在講義頁" stepIndex={5}>
          八題不用讀程式碼的自查、十條的完整對照、還有金流與個資那幾個領域，
          做成了一張〈上線前自查卡〉。
          <strong className="text-slate-100">這一頁講的是為什麼，那張卡是你回去照著跑的。</strong>
          <span className="block mt-2 font-mono text-sm text-slate-400">
            citysite102.github.io/aionduty-vibe-coding/handouts/
          </span>
        </Callout>

        <p className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>2026-10-10 查證，現行版是 2025</span>
          <a
            href="https://top10.owasp.org/2025"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
          >
            OWASP Top 10:2025 官方清單 <ExternalLink size={11} />
          </a>
        </p>

      </div>
    </SlideLayout>
  );
}
