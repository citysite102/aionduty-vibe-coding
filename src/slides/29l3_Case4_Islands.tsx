import { Split, Monitor, FileCode2, Zap, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例四的第四頁：Astro 跟 React 到底差在哪。
 * 2026-10-31 新增，來源是講師自己寫的那一段分析與他畫的群島架構示意圖。
 *
 * 為什麼要有這一頁：前一頁（Slide 185）只講「這個案例中途搬進 Astro」，
 * 學員接著一定會問的是**「我以為只要有 React 就可以用 Component 組成，那 Astro 的幫助是什麼？」**
 * 那一題用一兩句答不完，而且答錯方向很容易（第一版拿「重複用同一塊畫面」當賣點，
 * 那本來就是 React 在做的事）。所以切一頁專門回答它。
 *
 * **這一頁的論點是「預設不同」，不是「誰比較快」。** 講師原話：
 * 「最大的差別，不是誰比較新、誰比較快，而是它們對『網站應該如何運作』的預設思維不同。」
 * React 把網站當成會持續變動的應用程式，Astro 把網站當成一份要快速呈現的內容。
 * **不要把這一頁寫成效能比較**，那會變成一頁沒有來源的數字（D-2）。
 *
 * 中間那張圖是講師畫的示意圖重畫的。兩排各六塊，**兩排的區塊名稱要一樣**，
 * 差別只在底色：上排全部由 React 管，下排只有兩塊需要載入程式。
 * 圖底下那一行但書（這是跟典型 React SPA 比，React 配 Next.js 也做得到伺服器渲染）
 * **不要刪**，少了它這張圖就變成一個證明不了的斷言（D-2）。
 *
 * 那張表「什麼時候 React 反而比較好」同樣不要刪：這一頁如果只講 Astro 的好處，
 * 學員回去碰到儀表板那種題目會選錯。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-31。
 *   - docs.astro.build/en/concepts/islands/：island 是 "an enhanced UI component on an
 *     otherwise static page of HTML"；Astro 預設把每個元件算成 HTML 與 CSS 並
 *     "automatically" 拿掉所有 client-side JavaScript；要互動才加 `client:*` 指示，
 *     其中 `client:load` 立刻啟動、`client:idle` 等瀏覽器閒下來、
 *     `client:visible` 等它捲進畫面才載入、`client:media` 看螢幕條件、
 *     `client:only` 完全不在伺服器端算。
 *   - docs.astro.build/en/concepts/why-astro/：四個標題功能是 "Zero JS, by default"、
 *     "Server-first"、"Islands"，支援 "React, Preact, Svelte, Vue, Solid, HTMX,
 *     web components, and more"。
 * 畫面上只印了 `client:visible` 一個，因為它是學員想像得出來的那一個（捲到才載入）。
 * **要加別的指示之前先回那一頁重讀**，這幾個名字會隨版本調整。
 * ─────────────────────────────────────────────────────
 *
 * 2026-10-31（講師口述一段四層分工的文字，要求收進投影片）末尾多一塊〈這個案例最後怎麼分〉。
 * 原本 Callout 裡的「它們不是二選一」整條搬進那一塊的第一句（同一件事不要寫兩次，B-5），
 * 所以 Callout 現在只剩「不是只能做靜態網站」那一條，標籤跟著改成單數。
 * 標題也換了：這一頁不再只是框架比較，收尾是這個案例自己的分工。
 *
 * 強調色：sky（需要載入程式的那幾塊、Astro 那一欄）與 indigo（React 那一排），
 * 兩者是同一個對照的兩邊，合計算一種（A-1）。**拆掉一邊，剩下的要改回 sky。**
 */

/** 兩種預設思維。講師原文照搬，這是這一頁的本體。 */
const STANCE = [
  {
    icon: Monitor,
    tone: 'indigo' as const,
    name: 'React',
    body: '把網站當成一個會持續變動、互動的應用程式。整個畫面交給它管，所以瀏覽器要先下載那一包程式。',
  },
  {
    icon: FileCode2,
    tone: 'sky' as const,
    name: 'Astro',
    body: '把網站當成一份應該快速呈現的內容，只在真的需要互動的那幾塊才加程式。而且它可以直接用 React 寫那幾塊，兩個不是互斥的。',
  },
];

/** 示意圖的六塊。兩排用同一組名字，差別只在哪幾塊需要載入程式。 */
const BLOCKS = ['導覽列', '文章內容', '圖片區塊', '頁尾', '互動元件', '動態搜尋'];
const ISLAND_BLOCKS = new Set(['互動元件', '動態搜尋']);

/** 什麼時候哪一個比較好。沒有分數，只寫「適合／可以但未必划算」。 */
const FIT = [
  { what: '品牌官網、部落格、課程頁', astro: '很適合', react: '可以' },
  { what: '搜尋引擎要讀得到內容', astro: '預設就是', react: '要看搭配的框架' },
  { what: '儀表板、後台報表', astro: '可以，但未必划算', react: '很適合' },
  { what: '複雜表單與狀態', astro: '那一塊用 React 寫', react: '比較直接' },
  { what: '即時協作、拖曳操作', astro: '不適合當主架構', react: '很適合' },
];

/**
 * 這個案例實際上的四層分工。2026-10-31 講師口述，照他的話收進來。
 * 它放在〈什麼時候哪一個比較好〉後面，是因為前面講的是「一般來說怎麼選」，
 * 這一塊才是「這個案例最後怎麼分」。**好處與代價那兩行不要只留好處**：
 * 多一層工具就多一組要維護的規則，這一頁如果只講好處就變成在推薦一套技術堆疊。
 */
const LAYERS = [
  { k: 'Astro', v: '組成網站頁面，讓網址、文件與分享資訊（貼到社群時顯示的標題與圖）有一致的管理方式。' },
  { k: 'React', v: '負責互動介面，依照登入、選取、載入與錯誤等狀態呈現畫面。' },
  { k: 'Three.js', v: '專心處理 3D 場景、相機與場景動畫。' },
  { k: 'Supabase', v: '負責認證、資料與權限。' },
];

export default function SlideCase4Islands() {
  return (
    <SlideLayout
      title="Astro 與 React，以及這個案例的四層分工"
      subtitle="Case 04 · Islands Architecture"
      icon={Split}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          兩者最大的差別不是誰比較新、誰比較快，是
          <strong className="text-slate-100">它們對「網站應該怎麼運作」的預設不一樣</strong>。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STANCE.map((s) => (
            <div
              key={s.name}
              className={`rounded-2xl border p-4 ${
                s.tone === 'indigo'
                  ? 'border-indigo-500/30 bg-indigo-500/5'
                  : 'border-sky-500/30 bg-sky-500/5'
              }`}
            >
              <h3
                className={`mb-1.5 flex items-center gap-2 text-base font-bold ${
                  s.tone === 'indigo' ? 'text-indigo-200' : 'text-sky-200'
                }`}
              >
                <s.icon aria-hidden="true" size={17} className="shrink-0" />
                {s.name}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-base font-bold text-slate-100 mb-1">同一個網站，兩種做法</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Astro 的核心概念叫群島架構（Islands Architecture）：大部分的頁面不用把程式送到瀏覽器，
            只有真的需要互動的那幾塊才載入。
          </p>

          <div className="space-y-3">
            <div>
              <div className="text-indigo-200 text-sm font-bold mb-1.5">
                React SPA：整個頁面交給 React
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-1.5">
                {BLOCKS.map((b) => (
                  <span
                    key={b}
                    className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2 py-1.5 text-center text-xs text-indigo-100"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mt-1.5">
                頁面與互動都由它管，所以瀏覽器要下載的程式比較多。
              </p>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <div className="text-sky-200 text-sm font-bold mb-1.5">
                Astro：主要內容直接輸出 HTML，互動的才是島
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-1.5">
                {BLOCKS.map((b) => (
                  <span
                    key={b}
                    className={`rounded-lg border px-2 py-1.5 text-center text-xs ${
                      ISLAND_BLOCKS.has(b)
                        ? 'border-sky-500/40 bg-sky-500/10 font-bold text-sky-200'
                        : 'border-slate-700 bg-slate-950 text-slate-400'
                    }`}
                  >
                    {ISLAND_BLOCKS.has(b) && (
                      <Zap aria-hidden="true" size={10} className="mr-1 inline align-[-1px]" />
                    )}
                    {b}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mt-1.5">
                灰色那四塊是直接送出去的現成網頁，只有亮起來的兩塊要載入程式。
                那兩塊還可以指定什麼時候才載入，例如
                <code className="font-mono text-slate-400"> client:visible </code>
                是「等使用者捲到它才載入」。
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mt-3 border-t border-slate-800 pt-2.5">
            這張圖比的是 Astro 與典型的 React SPA。React 搭配 Next.js 這類框架也做得到伺服器渲染
            與預先產生 HTML，所以它不是「React 一定比較慢」。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-base font-bold text-slate-100 mb-2">什麼時候哪一個比較好</h3>
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,160px)_minmax(0,160px)] gap-x-4">
            <div className="text-slate-500 text-sm pb-2" />
            <div className="text-sky-400 text-sm font-bold pb-2">Astro</div>
            <div className="text-indigo-400 text-sm font-bold pb-2">React（配適當的框架）</div>
            {FIT.map((f) => (
              <div key={f.what} className="contents">
                <div className="border-t border-slate-800 py-2 text-sm font-bold text-slate-100">
                  {f.what}
                </div>
                <div className="border-t border-slate-800 py-2 text-sm leading-relaxed text-slate-400">
                  {f.astro}
                </div>
                <div className="border-t border-slate-800 py-2 text-sm leading-relaxed text-slate-400">
                  {f.react}
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-base font-bold text-slate-100 mb-1">這個案例最後怎麼分</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-2.5">
            它們不是二選一，這個網站四層一起用，
            <strong className="text-slate-200">一層負責一件事</strong>
            ：登入視窗、繪馬卡片是 React 寫的島，其餘的頁面是 Astro 直接輸出的網頁。
          </p>
          <ul className="space-y-1">
            {LAYERS.map((l) => (
              <li key={l.k} className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                <span className="w-20 shrink-0 font-bold text-slate-200">{l.k}</span>
                <span className="flex-1 min-w-0 text-slate-400">{l.v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2.5 border-t border-slate-800 pt-2.5 space-y-1">
            <p className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
              <span className="w-10 shrink-0 font-bold text-slate-200">好處</span>
              <span className="flex-1 min-w-0 text-slate-400">
                新增介面功能的時候比較容易控制影響範圍，也能分別測試各層。
              </span>
            </p>
            <p className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
              <span className="w-10 shrink-0 font-bold text-slate-200">代價</span>
              <span className="flex-1 min-w-0 text-slate-400">
                工具與整合規則變多。所以每一層都要有清楚的責任，
                <strong className="text-slate-300">避免同一份狀態有兩個地方在管</strong>。
              </span>
            </p>
          </div>
        </AnimatedBlock>

        <Callout
          tone="focus"
          label="還有一件容易誤會的事"
          stepIndex={6}
          footnote={
            <>
              群島架構的說明在{' '}
              <a
                href="https://docs.astro.build/en/concepts/islands/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
              >
                docs.astro.build <ExternalLink size={11} />
              </a>
              （2026-10-31 查）
            </>
          }
        >
          <p>
            <strong className="text-slate-200">Astro 也不是只能做靜態網站。</strong>
            它一樣做得到由伺服器即時產生頁面、對外開 API。只是當整個網站都要複雜互動的時候，
            它原本的優勢就比較用不上。
          </p>
        </Callout>

      </div>
    </SlideLayout>
  );
}
