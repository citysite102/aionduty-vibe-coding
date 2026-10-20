import { BookOpen, Users, RefreshCw, ExternalLink } from 'lucide-react';
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
 *   - AI 應用另有一份 Top 10 for LLM Applications（genai.owasp.org），2026-09 發布 2026 版；
 *     Agent 系統還有 Top 10 for Agentic Applications 與 Agent Control Standard。
 *     **那一份的十條內容這一頁不印**，genai 站上的清單頁當時仍停在 2025 版，
 *     而公告只確認了「Excessive Agency 排第三」。要印條目先回站上確認版本。
 * 下次改版前先看 top10.owasp.org 有沒有出新版。
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
    icon: BookOpen,
    title: 'Top 10 是什麼',
    body: '它最有名的那一份：把最常出問題的類型排成十條。講的是「類型」，不是你專案裡的具體問題。',
    foot: '所以它的用法是拿每一條回頭問自己的專案。',
  },
  {
    icon: RefreshCw,
    title: '多久換一次',
    body: '幾年一次，依據是真實世界蒐集到的資料。現行是 2025 版，上一版是 2021。',
    foot: '改版時條目的編號與名稱都會動，看的時候先確認版本。',
  },
];

export default function SlideShipOwaspIntro() {
  return (
    <SlideLayout
      title="OWASP 是什麼：一份免費公開的資安清單"
      subtitle="Open Worldwide Application Security Project"
      icon={BookOpen}
      updated={{ date: '2026/10/20', kind: '新增' }}
    >
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col pt-2 pb-4">
        <p className="text-slate-300 text-base leading-relaxed mb-4">
          那幾類資安問題不是只有你會遇到，外面早就有人把它們收成一份清單。
          <strong className="text-slate-100">先知道這份清單是誰出的、憑什麼算數</strong>，
          再拿它對照我們前面做過的事。
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
          <p>
            <strong className="text-slate-200">照完十條不等於安全。</strong>
            它收的是最常見的類型，不是全部。它的作用是讓你問對問題，不是發一張保證書。
          </p>
        </Callout>
      </div>
    </SlideLayout>
  );
}
