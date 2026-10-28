import { Fragment } from 'react';
import { Network, Monitor, Server, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
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
 * 顏色只有一個 sky，標的是「要帶權杖的那條線」與它最後撞上的那道規則，
 * 兩者是同一件事的頭尾（A-1）。灰線是不用登入也走得通的那條。
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
      ['Edge Functions', '放在 Supabase 上的小程式，對外開成 API'],
    ],
  },
  {
    icon: Globe,
    name: '外部',
    sub: '寄信服務，以及從外面呼叫 API 的人',
    rows: [
      ['Resend', '把登入連結寄到你的信箱'],
      ['別人的程式', '終端機一行指令就能呼叫，不必經過這個網站'],
    ],
  },
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
      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-400 text-sm leading-relaxed">
          這個網站實際接了哪些東西，三塊放在同一張圖上。
          <strong className="text-slate-200">灰線是不用登入也走得通的路，亮起來那幾條要帶權杖</strong>
          （登入之後拿到的那串通行碼）。
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.15fr_auto_0.9fr] gap-3 items-stretch">
          {ZONES.map((z, i) => (
            <Fragment key={z.name}>
              <AnimatedBlock
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-left"
              >
                <div className="flex items-center gap-2.5 mb-1">
                  <z.icon aria-hidden="true" size={15} className="shrink-0 text-slate-500" />
                  <h3 className="text-base font-bold text-slate-100">{z.name}</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{z.sub}</p>
                <ul className="space-y-2 border-t border-slate-800 pt-3">
                  {z.rows.map(([k, v]) => (
                    <li key={k}>
                      <span className="text-sm font-bold text-slate-200">{k}</span>
                      <span className="block text-sm leading-snug text-slate-400">{v}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedBlock>

              {/* 箭頭畫在欄與欄之間，窄螢幕收起來，免得變成一排孤零零的符號 */}
              {i < ZONES.length - 1 && (
                <AnimatedBlock
                  stepIndex={i + 3}
                  className="hidden lg:flex items-center justify-center"
                >
                  <ArrowRight aria-hidden="true" size={18} className="text-slate-700" />
                </AnimatedBlock>
              )}
            </Fragment>
          ))}
        </div>

        {/* 這一塊是整頁的樞紐：上面三區都往它走 */}
        <AnimatedBlock
          stepIndex={5}
          className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4 text-left"
        >
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck aria-hidden="true" size={16} className="shrink-0 text-sky-400" />
            <h3 className="text-base font-bold text-sky-200">
              資料庫自己的權限規則：每一次查詢都重新檢查一遍
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 border-t border-sky-500/20 pt-3">
            {FLOWS.map((f) => (
              <p key={f.what} className="text-sm leading-relaxed">
                <span className={f.auth ? 'font-bold text-sky-200' : 'font-bold text-slate-300'}>
                  {f.what}
                </span>
                <span className="text-slate-400">：{f.who}</span>
              </p>
            ))}
          </div>
        </AnimatedBlock>

        <Callout tone="focus" stepIndex={6}>
          你的網站、別人終端機裡的一行指令、API 文件頁上的試呼叫，
          <strong className="text-slate-100">三個入口走的是同一個資料庫</strong>。
          介面上的登入視窗擋不住中間那兩個，真正把人分開的是上面那條規則。
        </Callout>

      </div>
    </SlideLayout>
  );
}
