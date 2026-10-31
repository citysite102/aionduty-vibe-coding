import { Blocks, FileCode, Layers3, ExternalLink } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogos';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例四的第三頁：這個案例做到一半，網站從一個 HTML 檔變成一個 Astro 專案。
 * 2026-10-31 新增（講師：應該要補充一個詳細介紹 Astro 的區間，說明為什麼我們使用它）。
 *
 * 為什麼自成一頁：Astro 原本只有 Slide 179（案例三的對照表）與 Slide 183（技術那一條）
 * 各一句，而這個案例的過程那一列寫著「中間搬進 Astro」，學員讀到會卡住。
 * 同一天先把它塞進 Slide 186（五樣東西那一頁）的最上面，實機量到那一頁 1483px、
 * 可視區約 836px，塞不下，所以切出來。**不要再併回那一頁。**
 *
 * ── 這一頁改過一輪，記著為什麼 ──────────────────────────
 * 第一版寫「Astro 把好幾頁拼成同一個網站，導覽列你只寫一次」，
 * 講師看完的問題是：**「我以為只要有 React 就可以用 Component 組成，那 Astro 的幫助到底是什麼？」**
 * 那一版確實答不了這一題，因為「把畫面切成一塊一塊重複用」本來就是 React 在做的事，
 * 拿它當 Astro 的賣點，會寫程式的人覺得不對，不會寫的人聽不出差別。
 *
 * **不要再用「拼成一個網站」「共用版型」當賣點**，那一題 React 自己就答得出來。
 * 真正的分界線寫在下一頁（`29l3_Case4_Islands`）。
 *
 * 「為什麼不是一開始就用」那一條原本寫「這件事問過 Claude 兩次」，
 * 講師指出同學不知道那兩次是什麼。現在把兩次各問了什麼、什麼時候問的寫出來。
 * ─────────────────────────────────────────────────────
 *
 * 2026-10-31（講師補了一整段 Astro 與 React 的分析與一張群島架構示意圖）
 * 「React 管一塊畫面，Astro 管整個網站」與「同類的還有哪些」兩塊搬去**下一頁**
 * （`29l3_Case4_Islands`）重寫。這一頁留的是這個案例自己的敘事：
 * 什麼時候搬、搬之前搬之後差在哪、為什麼不是一開始就搬、3D 有沒有被動到。
 * **概念的部分不要搬回來**，兩頁併起來會超過一頁的高度（這一頁本來就是因為塞不下才切出來的）。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-31，docs.astro.build/en/concepts/why-astro/。
 * 當時的現況：Astro 自稱 "the web framework for building content-driven websites"，
 * 四個標題功能是 "Zero JS, by default"、"Server-first"、"Islands"，
 * 以及支援 "React, Preact, Svelte, Vue, Solid, HTMX, web components, and more"。
 * 文件自己也寫了它不適合什麼：多數現代框架是為 web applications 設計的，
 * Astro 把內容擺在互動複雜度前面。
 * 這一頁現在只用到「它是做網站的工具」這個層級，細節在下一頁，那一頁有自己的 C-1。
 * ─────────────────────────────────────────────────────
 *
 * 導入前／導入後用 sky 與 indigo 成對對照，那是 A-1 允許的唯一一種雙色用法，合計算一種。
 * **拆掉任何一邊，剩下的那一個要改回 sky。**
 *
 * 2026-11-01 手冊改版對過一次。改了三處：
 *   - 左右兩塊的那一列從「網站有幾頁」改成「網頁有幾個」，而且數字是錯的：
 *     **這個網站只有兩個網頁**（首頁與 `/api` 文件頁），登入、上傳、我的參拜紀錄
 *     都是首頁裡的面板，不是各自的網址。原本寫「四個網址」是我推的，手冊沒有這樣說。
 *   - 開場補上「同一步裡介面也改成用 React 寫」，手冊階段 8 的標題就是這樣寫的。
 *   - 「不搬也做得出」那一句 2026-11-01 稍晚整句刪掉（講師：教學投影片不用寫這個）。
 *     它原本是為了擋「Astro 是必要條件」那個斷言而加的，但現在開場只講先後不講因果，
 *     那個斷言本來就不存在了；而且下一頁 Astro 的代價欄已經有同一句
 *     （「不用它也做得出這個網站」），兩頁講同一件事（B-5）。
 *     **不要加回來，但也不要把必要性的語氣寫回去。**
 * **下次改版先翻階段 8 的〈🧭 這一步在做什麼〉那張四個工具的表。**
 *
 * 2026-10-31（講師：不會說「才」放得下，而且理論上沒有 Astro 也可以）開場那一句改掉。
 * 原本寫「從這裡之後，網站才放得下登入、上傳與我的參拜紀錄那幾頁」，那是把 Astro
 * 寫成必要條件，但那幾頁不用 Astro 也做得出來（D-2 的證明不了的斷言）。
 * 現在只陳述先後（都是搬完之後才加上去的），並補一句「不搬也做得出那幾頁，
 * 差別在有多少事情要自己接」。副標的「裝不下」是同一個毛病，一起換掉。
 * **不要把必要性的語氣寫回來。**
 *
 * 「建置」「環境變數」這兩個詞當場解釋，這門課一半的學員不寫程式（D-2）。
 * 左右兩塊的標題**不要寫手冊的階段編號**（講師：投影片不要放步驟）。
 *
 * 開場那一行掛 Astro 的 Logo 與官網連結（講師要求）。Logo 走 `BrandLogos` 的 `astro`
 * （simple-icons，CC0，路徑內嵌在那個檔案裡，不抓外部網址，A-4）。
 * 品牌色是 inline 的 hex，不佔這一頁的兩色額度（A-1）。
 */

const BEFORE_AFTER = [
  {
    icon: FileCode,
    tone: 'sky' as const,
    when: '導入 Astro 之前',
    rows: [
      ['網頁有幾個', '一個。整個網站就是一個 HTML 檔'],
      ['套件怎麼來', '直接從網路上載，電腦裡什麼都不用裝'],
      ['怎麼打開', 'Claude 給你一個本機網址，貼進瀏覽器就看得到'],
    ],
  },
  {
    icon: Blocks,
    tone: 'indigo' as const,
    when: '導入 Astro 之後',
    rows: [
      ['網頁有幾個', '兩個：首頁與 API 文件頁（文件頁是後面才加的）'],
      ['套件怎麼來', '用 npm 裝進專案，版本寫死，之後不會自己變'],
      ['怎麼打開', '多一個建置步驟：把你寫的整理成瀏覽器直接能用的檔案'],
    ],
  },
];

const WHY = [
  {
    q: '為什麼不是一開始就用',
    a: '做 3D 那一段的時候，先問過 Claude「要不要改成 React 那種架構」，它的回答是現在不用：畫面只有一個，狀態十幾個變數，拆成資料夾之後邊界已經夠清楚。後來要接資料庫與登入、網站真的變成好幾頁，同一個問題再問一次，答案才變成要。',
  },
  {
    q: '跟 3D 有什麼關係',
    a: '沒有關係，3D 場景的程式一行都沒改，它是被掛進其中一頁裡的一塊。場景也沒有改寫成 React Three Fiber：重寫畫面上不會多任何東西，卻會打掉已經用測試與逐像素比對驗過的水面、浮力與燈光。',
  },
];

export default function SlideCase4Astro() {
  return (
    <SlideLayout
      title="中途為什麼要把專案搬進 Astro"
      subtitle="Case 04 · 從一個 HTML 檔到一個專案"
      icon={Layers3}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-2" style={{ color: '#BC52EE' }}>
              <BrandLogo brand="astro" size={20} />
              <span className="text-base font-bold">Astro</span>
            </span>
            <a
              href="https://astro.build/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-sm text-slate-500 hover:text-sky-400"
            >
              astro.build <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
          <p className="text-slate-300 text-base leading-relaxed">
            這個案例做到一半，網站從一個 HTML 檔變成一個 Astro 專案，
            同一步裡介面也改成用 React 寫。
            <strong className="text-slate-100">那一步做完，畫面上看不出任何差別</strong>，
            後面的登入、上傳、我的參拜紀錄與那支對外 API，都是搬完之後才接上去的。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BEFORE_AFTER.map((b) => (
            <div
              key={b.when}
              className={`rounded-2xl border p-5 ${
                b.tone === 'sky'
                  ? 'border-sky-500/30 bg-sky-500/5'
                  : 'border-indigo-500/30 bg-indigo-500/5'
              }`}
            >
              <h3
                className={`mb-3 flex items-center gap-2 text-base font-bold ${
                  b.tone === 'sky' ? 'text-sky-200' : 'text-indigo-200'
                }`}
              >
                <b.icon aria-hidden="true" size={17} className="shrink-0" />
                {b.when}
              </h3>
              <ul className="space-y-1.5 border-t border-slate-800 pt-3">
                {b.rows.map(([k, v]) => (
                  <li key={k} className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                    <span className="w-20 shrink-0 font-bold text-slate-200">{k}</span>
                    <span className="flex-1 min-w-0 text-slate-400">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AnimatedBlock>

        {WHY.map((w, i) => (
          <AnimatedBlock
            key={w.q}
            stepIndex={i + 3}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
          >
            <h3 className="text-base font-bold text-slate-100 mb-1">{w.q}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{w.a}</p>
          </AnimatedBlock>
        ))}

        <Callout tone="focus" label="搬完怎麼確認沒壞" stepIndex={5}>
          搬家這種事最怕的是「我也不知道哪裡變了」。所以搬之前先把舊版凍結起來，
          搬完跟它同角度、同時間各截一張，
          <strong className="text-slate-100">逐像素比對要 0%，畫面一個點都不能變</strong>。
          <span className="mt-2 block text-sm leading-relaxed text-slate-400">
            另外一件在後面才用得到：登入要用的那兩把金鑰寫在一個叫
            <code className="font-mono text-slate-300"> .env </code>
            的檔案裡。建置的時候 Astro 才決定哪一把寫進網頁、哪一把留在後台，
            接 Supabase 那一步會用到這件事。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
