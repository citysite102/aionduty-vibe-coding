import { Blocks, FileCode, Layers3, ExternalLink } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogos';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例四的第三頁：這個案例做到一半，專案從一個 HTML 檔搬進 Astro。
 * 2026-10-31 新增（講師：應該要補充一個詳細介紹 Astro 的區間，說明為什麼我們使用它）。
 *
 * 為什麼自成一頁：Astro 原本只有 Slide 179（案例三的對照表）與 Slide 183（技術那一條）
 * 各一句，而這個案例的過程那一列寫著「中間搬進 Astro」，學員讀到會卡住。
 * 同一天先把它塞進 Slide 186（五樣東西那一頁）的最上面，實機量到那一頁 1483px、
 * 可視區約 836px，塞不下，所以切出來。**不要再併回那一頁。**
 *
 * 這一頁要回答的是四個學員真的會問的問題，順序不要換：
 *   1. 它解決什麼（導覽列只寫一次）
 *   2. 跟 React 差在哪（2026-10-31 講師問的，不是二選一，這個網站兩個都用）
 *   3. 為什麼不是一開始就用（問過兩次，答案隨後端出現才變）
 *   4. 跟 3D 有什麼關係（沒有關係，3D 一行都沒改）
 *
 * 左右兩塊的標題**不要寫手冊的階段編號**（講師：投影片不要放步驟），
 * 寫「導入 Astro 之前／之後」。
 * 收尾才是「搬完怎麼確認沒壞」，它接的是前一頁那三樣證據。
 *
 * 資料來源 case-04-wishes.pdf：階段 1（階段 1–7 不裝任何東西、importmap）、
 * 階段 8（8-1 到 8-4、M0 到 M3、不改 R3F 的三個理由、three 鎖 0.185.1、
 * 開發伺服器 4324、M0 結果逐像素 0% 且 draw call 都是 582）、階段 15（PUBLIC_ 環境變數）。
 *
 * 搬之前／搬之後用 sky 與 indigo 成對對照，那是 A-1 允許的唯一一種雙色用法，合計算一種。
 * **拆掉任何一邊，剩下的那一個要改回 sky。**
 *
 * 「建置」「環境變數」這兩個詞當場解釋，這門課一半的學員不寫程式（D-2）。
 *
 * 2026-10-31（講師）開場那一行掛 Astro 的 Logo 與官網連結。Logo 走 `BrandLogos`
 * 的 `astro`（simple-icons，CC0，路徑內嵌在那個檔案裡，不抓外部網址，A-4）。
 * 品牌色是 inline 的 hex，不佔這一頁的兩色額度（A-1）。
 */

const BEFORE_AFTER = [
  {
    icon: FileCode,
    tone: 'sky' as const,
    when: '導入 Astro 之前',
    rows: [
      ['整個網站', '一個 HTML 檔，加上 src/ 裡拆出來的幾個檔案'],
      ['套件怎麼來', '直接從網路上載，電腦裡什麼都不用裝'],
      ['怎麼打開', 'Claude 給你一個本機網址，貼進瀏覽器就看得到'],
    ],
  },
  {
    icon: Blocks,
    tone: 'indigo' as const,
    when: '導入 Astro 之後',
    rows: [
      ['整個網站', '好幾頁：神社、登入、上傳、我的參拜紀錄'],
      ['套件怎麼來', '用 npm 裝進專案，版本寫死，之後不會自己變'],
      ['怎麼打開', '多一個建置步驟：把你寫的整理成瀏覽器直接能用的檔案'],
    ],
  },
];

const WHY = [
  {
    q: '它解決的是什麼',
    a: '每一頁都要有同一個導覽列、同一套樣式。導覽列你只寫一次，Astro 在建置的時候幫每一頁各放一份，之後改一次全站都跟著改。案例三用的也是它。',
  },
  {
    q: '那它跟 React 差在哪',
    a: '不是二選一，這個網站兩個一起用。Astro 管的是整個網站有哪幾頁、每一頁共用什麼版型；React 管的是一塊畫面被點了之後要怎麼變，像登入視窗、繪馬卡片。案例三也是這個組合。',
  },
  {
    q: '為什麼不是一開始就用',
    a: '這件事問過 Claude 兩次。3D 還在做的時候問第一次，它說不用：畫面只有一個，狀態十幾個變數，拆成資料夾之後邊界已經夠清楚。要接資料庫與登入了才問第二次，答案才變成要。有表單、有好幾頁的介面，才是它省事的地方。',
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
      subtitle="Case 04 · 一個 HTML 檔裝不下的時候"
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
            這個案例做到一半，整個專案換了一次底。
            <strong className="text-slate-100">畫面上看不出任何差別</strong>，
            但從這一步之後，網站才放得下登入、上傳與「我的參拜紀錄」那幾頁。
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

        <Callout tone="focus" label="搬完怎麼確認沒壞" stepIndex={7}>
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
