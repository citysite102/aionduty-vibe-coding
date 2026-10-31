import { BookOpen, Users, RefreshCw, BarChart3, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-20 新增（講師：OWASP 本身也要教）。
 *
 * 位置是刻意的：排在風險數字（`28c2`）與五條對照（`28c3`）中間。
 * `28c3` 的職務是「我做過的那幾件事有名字」，它需要讀者已經知道 OWASP 是什麼；
 * 原本那一頁只用一句話帶過（「外面有一份公認的清單在收」），
 * 不寫程式的學員聽完還是不知道那是誰出的、憑什麼算數。
 *
 * **這一頁只講清單本身，不要把十條搬過來。** 十條全列會變成一頁要背的東西，
 * 而對照那五條是下一頁的工作（`28c3` 的檔頭有寫為什麼只標五條）。
 *
 * 跟下一頁的分工要守住（B-5）：下一頁的口白**已經錄過**「公司的 IT 跟資安照它在看東西」
 * 與「能說我照 OWASP 過一遍，被對待的方式會不一樣」這兩句，所以這一頁不要再講一次。
 * 這一頁負責的是影片裡沒有的那幾件：誰出的、免費公開、它講的是類型不是你的 bug 清單、
 * 不是法律也不是證照、AI 應用另有一份。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-20，對照 owasp.org/about/ 與 owasp.org/www-project-top-ten/。
 * 當時的現況：
 *   - owasp.org/about：「a 501(c)(3) nonprofit foundation that works to improve the
 *     security of software」、「All of our projects, tools, documents, forums, and
 *     chapters are free and open to anyone interested in improving application security」。
 *     2001-12-01 啟動，2004-04-21 正式立案。
 *   - Top 10 現行版是 2025（上一版 2021，所以畫面上寫「幾年一次」不寫固定年數）。
 *   - 2026-10-31 補查資料基礎（講師：這些敘述不夠有公信力），來源 top10.owasp.org/2025
 *     的 Introduction：13 家機構提供資料（Accenture、Bugcrowd、Contrast Security、
 *     CryptoNet Labs、Intuitor SoftTech、Orca Security、Probely、Semgrep、Sonar、usd AG、
 *     Veracode、Wallarm 加匿名捐贈者），資料涵蓋 "over 2.8 millions applications"，
 *     分析 589 個 CWE、十類裡收了 248 個，十條中八條來自資料、兩條來自社群問卷。
 *     **畫面上那幾個數字要跟這一段對得上**，改版就要整組重查。
 *   - 同類清單：MITRE 的 CWE Top 25（列個別弱點）、OWASP 自己的 ASVS（逐項查核）。
 *     NIST SP 800-218（SSDF）是流程面的，不是查核清單，所以畫面上不列。
 *   - AI 應用另有一份 Top 10 for LLM Applications（genai.owasp.org），2026-09 發布 2026 版；
 *     Agent 系統還有 Top 10 for Agentic Applications 與 Agent Control Standard。
 *     **那一份的十條內容這一頁不印**，genai 站上的清單頁當時仍停在 2025 版，
 *     而公告只確認了「Excessive Agency 排第三」。要印條目先回站上確認版本。
 * 下次改版前先看 top10.owasp.org 有沒有出新版，新版出來這三張卡的數字全部要重查。
 * ─────────────────────────────────────────────────────
 *
 * 強調色只有 sky。收尾的 focus 不計入（A-1）。
 */

const FACTS = [
  {
    icon: Users,
    title: '誰出的',
    body: '一個非營利基金會，2001 年開始運作。它不賣產品，做的是把軟體資安的知識整理成文件與工具。',
    foot: '所有東西免費公開，不用註冊也不用付錢。',
  },
  {
    icon: BarChart3,
    title: '十條怎麼排出來的',
    body: '2025 版用 13 家資安公司（Veracode、Sonar、Contrast、Accenture 等）提供的資料，涵蓋超過 280 萬個應用的實測結果，從 589 種弱點類型歸成十類。',
    foot: '十條裡八條是從這份資料排出來的，另外兩條來自公開問卷。',
  },
  {
    icon: RefreshCw,
    title: '怎麼用、多久換一次',
    body: '它給的是「類型」，不是你專案裡的具體問題，所以用法是拿每一條回頭問自己的專案。幾年一版，現行是 2025，上一版是 2021。',
    foot: '改版時條目的編號與名稱都會動，看的時候先確認版本。',
  },
];

export default function SlideShipOwaspIntro() {
  return (
    <SlideLayout
      title="OWASP 是什麼：一份免費公開的資安清單"
      subtitle="Open Worldwide Application Security Project"
      icon={BookOpen}
      updated={{ date: '2026/11/01', kind: '新增' }}
    >
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col pt-2 pb-4">
        {/*
          2026-10-31（講師：談到資安，我們就必須要了解 OWASP）開場改寫。原本是
          「那幾類資安問題不是只有你會遇到，外面早就有人把它們收成一份清單⋯」，
          兩個問題：前半是鋪陳（刪掉讀者不少知道什麼），後半把「誰出的／多久換一次／
          憑什麼算數」三件事寫成一個長句，而那正是底下三張卡的標題。
          現在第一句直接下定義（講資安就會碰到的那份清單叫 OWASP Top 10），
          第二句才講為什麼要先認識它。**不要再把三張卡的標題先列一次（D-5 區塊小標那一節）。**
        */}
        <p className="text-slate-300 text-base leading-relaxed mb-4">
          講到資安，不管是公司的 IT、資安廠商還是外面的文章，指的幾乎都是同一份清單：
          <strong className="text-slate-100">OWASP Top 10</strong>。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch mb-4">
          {FACTS.map((f, i) => (
            <AnimatedBlock
              key={f.title}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col"
            >
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-3 mb-3">
                <span className="w-9 h-9 shrink-0 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <f.icon size={18} aria-hidden="true" />
                </span>
                {f.title}
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-3">{f.body}</p>
              <p className="mt-auto pt-3 border-t border-slate-800 text-sm leading-relaxed text-slate-500">
                {f.foot}
              </p>
            </AnimatedBlock>
          ))}
        </div>

        <Callout
          tone="focus"
          label="兩件不要誤會的事"
          stepIndex={4}
          footnote={
            <>
              網站應用看 Top 10；作品有接 AI 的話，另外有一份 Top 10 for LLM Applications，
              後面會講到。清單本體在{' '}
              <a
                href="https://owasp.org/www-project-top-ten/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
              >
                owasp.org <ExternalLink size={11} />
              </a>
            </>
          }
        >
          <p className="mb-2">
            <strong className="text-slate-200">它不是法律，也不是證照。</strong>
            沒有人會來查你有沒有照做，它的份量來自業界都在用它當共同的講法。
          </p>
          <p className="mb-2">
            <strong className="text-slate-200">讓 AI 照著十條讀完，也不等於安全。</strong>
            它收的是最常見的那幾類，十條之外還是會有問題，只是不會是這十類裡的。
          </p>
          <p>
            <strong className="text-slate-200">同類的清單不只這一份。</strong>
            MITRE 的 CWE Top 25 列的是一個一個的弱點，比十類細；
            OWASP 自己另有一份 ASVS，是要逐項查核時用的版本。
            你現在用 Top 10 就夠，知道對方提到別的名字時不是在講不一樣的事。
          </p>
        </Callout>
      </div>
    </SlideLayout>
  );
}
