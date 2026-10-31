import { Network, Monitor, Server, Globe, ShieldCheck, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例四的第四頁：把前兩頁做出來的東西放回同一張圖上。
 * 2026-10-23 新增，來源是講師提供的《海上許願神社 系統架構》圖，
 * 對應 case-04-wishes.pdf 的階段 15 到 20。
 *
 * **原圖沒有上投影片，這一頁是重畫的簡化版，不要改回貼原圖。** 原圖是 A3 的參考表，
 * 米白底、約六十個標籤（含每個檔案的路徑、每個端點的網址、DNS 的三筆記錄），
 * 投影出來讀不到，而且跟全片的深色不一致。原圖留著當講義附件，學員自己放大看。
 *
 * **這一頁只回答一個問題：同一份資料有三個入口，擋住人的是哪一層。**
 * 那正是前一頁（`29m_Case4_Stack`）底下那個 warn Callout 用文字講的事，
 * 而它用圖講比較快：網站、別人的 curl、文件頁上的試呼叫，三條路最後都走到同一個資料庫，
 * 所以把關的只可能是資料庫自己的規則。要再往圖上加東西之前先問：
 * 它幫得上這個問題嗎？幫不上就留在手冊裡。
 *
 * 2026-10-31（講師：可以更精準的圖像化）改掉兩件事：
 *   1. **三塊之間那兩個向右的箭頭拿掉了。** 它們畫成「瀏覽器 → Supabase → 外部」，
 *      但「外部」裡的「別人的程式」不是 Supabase 的下游，它跟瀏覽器一樣是**入口**。
 *      箭頭把一張位置圖畫成了流程圖，而且方向是錯的。現在那三塊只回答「東西放在哪」。
 *   2. **補一條入口匯流列**：三個入口並排、三個向下的箭頭，底下就是那道權限規則。
 *      那才是這一頁要講的事（見上面那段），原本只靠文字講在最後的 Callout 裡。
 *      **不要把向右的箭頭加回來。**
 *
 * 顏色只有一個 sky，標的是「要帶權杖的那條線」與它最後撞上的那道規則，
 * 兩者是同一件事的頭尾（A-1）。灰線是不用登入也走得通的那條。
 *
 * 2026-10-31（講師：「終端機一行指令就能呼叫」看不懂、Edge Functions 可以說得更清楚）
 * 改兩格。「終端機一行指令」是工程師的視角，學員不知道誰會去打那一行、為什麼要打；
 * 現在寫成他想像得到的情境（別人要把繪馬牆放進自己的網站）。
 * Edge Functions 原本寫「放在 Supabase 上的小程式，對外開成 API」，
 * 「對外開成 API」是結果不是動作，改成講這個案例真的拿它做了什麼（開了五個網址）。
 * **不要改回「終端機一行指令」那種寫法。**
 *
 * 2026-11-01 手冊改版對過一次。入口那一列的「別人的程式」補上第二條路：
 * 手冊的〈系統架構〉原文是「別人的程式可以呼叫對外 API，**也可以拿網頁裡的公開金鑰，
 * 直接讀寫資料表**。真正擋住他們的，是資料庫裡的 RLS 規則」。
 * 補這一條是因為它讓這一頁的論點更硬：連金鑰都公開了，擋人的還是只有那一層。
 *
 * 名詞一律當場解釋：這門課一半的學員不寫程式，而這一頁最容易變成只有工程師讀得懂的那一頁。
 * 權杖在前一頁已經解釋過一次（登入之後拿到的那串通行碼），這裡再給一次最短的。
 */
const ZONES = [
  {
    icon: Monitor,
    name: '使用者的瀏覽器',
    sub: '網站本身是一包靜態檔案，放在 Vercel 上',
    rows: [
      ['3D 引擎', '海、船、天氣、鏡頭都在這裡算'],
      ['介面外殼', '繪馬卡片、登入視窗、照片先縮圖再上傳'],
      ['公開金鑰', '寫在網頁裡，任何人都看得到'],
    ],
  },
  {
    icon: Server,
    name: 'Supabase（後端）',
    sub: '沒有自己的伺服器：登入、資料庫、檔案、API 都在這裡',
    rows: [
      ['Auth 會員', '信箱連結登入，成功就發一張權杖（一小時）'],
      ['Postgres 資料庫', '繪馬、誰掛的、誰祈願過，各一張表'],
      ['Storage', '繪馬的照片，公開看得到但不能列出全部'],
      ['Edge Functions', '你寫的一小段程式，放在 Supabase 上跑。這個案例用它對外開了五個網址，別人打那幾個網址就拿得到繪馬資料'],
    ],
  },
  {
    icon: Globe,
    name: '外部服務',
    sub: '幫你寄信的那一家，以及從外面呼叫 API 的人',
    rows: [
      ['Resend', '把登入連結寄到你的信箱'],
      ['別人的程式', '別人想把繪馬牆放進自己的網站，他的程式直接呼叫 Edge Functions 對外開放的那幾個 API 網址，不會經過你的網頁'],
    ],
  },
];

/** 三個入口。它們的共同點是最後都走到同一個資料庫，所以把關的只可能是資料庫自己 */
const ENTRIES = [
  { k: '你的網站', v: '使用者在瀏覽器上按按鈕' },
  { k: '別人的程式', v: '直接打 API 網址，或拿網頁裡的公開金鑰讀寫資料表' },
  { k: 'API 文件頁', v: '文件頁上的試呼叫按鈕' },
];

/** 四條路線。走得通不代表擋不住，差別在最後那一欄 */
const FLOWS: { what: string; who: string; auth: boolean }[] = [
  { what: '讀繪馬牆', who: '任何人，從網站或從外面呼叫都可以', auth: false },
  { what: '掛繪馬、祈願', who: '要帶權杖，而且每人每塊只能祈願一次', auth: true },
  { what: '上傳照片', who: '要帶權杖，只能放進自己的資料夾', auth: true },
  { what: '我的參拜紀錄', who: '要帶權杖，只讀得到自己的那幾筆', auth: true },
];

export default function SlideCase4Arch() {
  return (
    <SlideLayout
      title="系統架構：三個入口，權限都在資料庫"
      subtitle="Case 04 · 一頁看完它接了什麼"
      icon={Network}
    >
      <div className="max-w-6xl mx-auto space-y-2 pb-2">

        {/*
          2026-10-31（講師：這句話的必要性？或者只要強調關鍵的權杖即可）開場砍到只剩權杖。
          原本前半是讀表說明（「上面三塊是東西放在哪，底下三個入口都走到同一個資料庫」），
          那是圖自己就看得出來的事，而且結論跟收尾的 Callout 重複。
          權杖那一句要留：它是底下每一條路線都會用到的詞，學員第一次在這一頁看到完整定義。
          **不要再把讀表說明加回來。**
        */}
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-400 text-sm leading-relaxed">
          <strong className="text-slate-200">權杖是登入成功之後拿到的那串通行碼</strong>
          ，一小時有效。底下每一條路線都會寫明要不要帶它。
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_0.9fr] gap-3 items-stretch">
          {ZONES.map((z, i) => (
              <AnimatedBlock
                key={z.name}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-3 text-left"
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <z.icon aria-hidden="true" size={15} className="shrink-0 text-slate-500" />
                  <h3 className="text-base font-bold text-slate-100">{z.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{z.sub}</p>
                <ul className="space-y-1.5 border-t border-slate-800 pt-2.5">
                  {z.rows.map(([k, v]) => (
                    <li key={k} className="text-sm leading-relaxed text-slate-400">
                      <span className="font-bold text-slate-200">{k}</span>
                      <span className="ml-2">{v}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedBlock>
          ))}
        </div>

        {/*
          入口匯流列：三個入口 → 同一道規則。這是整頁的論點，不要拆開。

          2026-10-31（講師：這段用動畫呈現方便教學／檢視教學結構與版面）
          入口底下改成**真的匯流**：三條短豎線接到一條橫線，再由中間一支箭頭往下進規則那一塊。
          三顆光點先各自走到橫線，中間那一顆再把它們帶下去。
          原本是三支各自往下的箭頭，那是三條平行線不是匯流，
          而這一頁的論點就是「三條路走到同一個地方」，平行箭頭講不出來。
          A-2：它不是用 `setTimeout` 切換畫面內容，只是常駐的視覺迴圈，不影響翻頁。
          **全頁只有這一組在動**，再加別的動畫之前先想它幫不幫得上這一頁要回答的問題。

          匯流線跟規則那一塊**同一下出現**（第 6 下）：箭頭先出現的話，
          光點會落進一塊還沒出現的空白。
        */}
        {/*
          2026-10-31（講師：可以優化排版和動畫效果）入口列與規則那一塊包進同一個外框。
          原本它們是兩個各自獨立的區塊，中間還有 `space-y-2` 的空隙，
          所以「三條路最後走到同一個地方」只靠三個箭頭在撐，版面上讀起來還是兩件事。
          現在外框一圈淡 sky，三個入口在框內、規則在框底，匯流是看得出來的。
          **不要把它們拆回兩個區塊。**
          外框本身就是第 5 下的 `AnimatedBlock`（講師：底下不應該直接跑出來）：
          外框如果是普通的 `div`，進到這一頁的第一下就會先畫出一個空的大框，
          框裡什麼都沒有。**外框與它第一批內容要同一個 `stepIndex`。**
        */}
        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ENTRIES.map((e) => (
            <div key={e.k} className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-1.5 text-center">
              <span className="block text-sm font-bold text-slate-200">{e.k}</span>
              <span className="block text-sm leading-snug text-slate-500">{e.v}</span>
            </div>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="relative h-9" aria-hidden="true">
          {[1, 3, 5].map((n, i) => (
            <span
              key={n}
              className="absolute top-0 h-4 w-px bg-sky-500/40"
              style={{ left: `${(n / 6) * 100}%` }}
            >
              <motion.span
                className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
                animate={{ top: [-2, 14], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 1.6, delay: i * 0.25, ease: 'linear' }}
              />
            </span>
          ))}
          <span className="absolute top-4 h-px bg-sky-500/40" style={{ left: '16.666%', right: '16.666%' }} />
          <span className="absolute left-1/2 top-4 h-4 w-px -translate-x-1/2 bg-sky-500/40">
            <motion.span
              className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.9)]"
              animate={{ top: [-2, 14], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatDelay: 1.8, delay: 0.95, ease: 'linear' }}
            />
          </span>
          <ArrowDown size={14} className="absolute left-1/2 top-[26px] -translate-x-1/2 text-sky-500/60" />
        </AnimatedBlock>

        {/* 這一塊是整頁的樞紐：上面三區都往它走。
            2026-10-31 外框改成實心深底，壓在淡 sky 的匯流框裡面，三個箭頭落點就是它的上緣。
            盾牌那個 icon 跟著光點的節拍慢慢亮一下，讓視線在落點停住。 */}
        <AnimatedBlock
          stepIndex={6}
          className="rounded-xl border border-sky-500/35 bg-slate-950/70 p-3 text-left"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <motion.span
              aria-hidden="true"
              className="inline-flex shrink-0 text-sky-400"
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ShieldCheck size={16} />
            </motion.span>
            <h3 className="text-base font-bold text-sky-200">
              資料庫自己的權限規則：每一次查詢都重新檢查一遍
            </h3>
          </div>
          {/*
            2026-10-31（講師：調整成左右橫式比較方便閱讀）四條從 2×2 改成四列，
            左邊是動作、右邊是誰做得到，欄位對齊。這樣「要帶權杖」那三條會垂直對在一起，
            一眼看得出只有第一條不用登入，那正是這一塊要講的事。
            **不要改回兩欄**，兩欄時那個對比要自己找。
          */}
          <div className="space-y-1 border-t border-sky-500/20 pt-3">
            {FLOWS.map((f) => (
              <p key={f.what} className="flex flex-wrap items-baseline gap-x-3 text-sm leading-relaxed">
                <span
                  className={`w-28 shrink-0 whitespace-nowrap font-bold ${
                    f.auth ? 'text-sky-200' : 'text-slate-300'
                  }`}
                >
                  {f.what}
                </span>
                <span className="flex-1 min-w-0 text-slate-400">{f.who}</span>
              </p>
            ))}
          </div>
        </AnimatedBlock>
        </AnimatedBlock>

        <Callout tone="focus" stepIndex={7}>
          你的網站、別人寫的程式、API 文件頁上的試呼叫，
          <strong className="text-slate-100">三個入口走的是同一個資料庫</strong>。
          後面兩個根本不會經過你的網頁，所以介面上的登入視窗擋不住他們，
          真正把人分開的是上面那條規則。
        </Callout>

      </div>
    </SlideLayout>
  );
}
