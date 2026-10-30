import { KeyRound, Database, Plug, Music } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例四的第三頁：這個案例在 3D 之外接上的四樣東西。
 * 2026-10-23 新增，資料來源 case-04-wishes.pdf 的階段 13（背景音樂）、14（登入介面）、
 * 15（Supabase 信箱連結登入）、16（資料表與權限、API 文件頁）、17（對外 API v1）。
 *
 * 四格的順序照它們實際被做出來的順序：音樂 → 登入 → 資料庫 → 對外 API。
 * **2026-10-31（講師：呈現不適合教學）排版改過**：那個順序原本只寫在開場那句話裡，
 * 畫面上看不出來，所以每一格的標題列前面補了一個序號。同一輪把 `line` 從獨立一行
 * 移到標題列後面（它只是一句定位，不值得佔一整行），條目補上「・」的符號，
 * 原本四行無記號的文字黏成一塊。背景音樂那一格從五條併成四條：
 * 原本的 `line` 跟第二條講同一件事（三首綁時段、兩首手動選），而 0.707 與測試那兩條
 * 講的是同一個做法。**不要再把 `line` 拉回獨立一行。**
 * 登入那一格標 sky，因為它帶的是這個案例的第二條核心判斷（「需要登入」不等於權限控管），
 * 而且它跟案例三的兩層權限是同一條線，學員在那裡已經驗過一次。
 *
 * 等功率淡化的 0.707 是 1/√2，手冊階段 13 的驗收題就是這個數字，照抄不要改寫成 0.7。
 *
 * 2026-10-23 照實機的聲音面板改過一次：五首 Suno 生成的曲子，三首綁時段（白天 Floating
 * Shrine・昼、黃昏 Glass Wind Chimes、夜晚 Floating Shrine・夜）、兩首手動選，音量三條
 * （總音量、音樂、海浪與雨）。手冊同日重建，階段 13 的曲目表已經是同一份五首。
 * 之後曲目再變，要對的是那個網址的「聲音」面板，不是手冊截圖。
 */
const PARTS = [
  {
    icon: Music,
    name: '背景音樂',
    line: '五首自己用 Suno 生成的曲子',
    points: [
      '生成之前先看那個工具的條款：免費方案常常只能個人使用，公開的網站不算',
      '預設隨時段換（白天、黃昏、夜晚各一首），另外兩首可以自己指定',
      '面板上三條音量：總音量、音樂、海浪與雨。想只留海浪聲，分得開',
      '兩首交叉時各自是 0.707 不是 0.5，合起來聽到的響度才不會凹下去；選曲與淡化寫成測試，連續切時段不會兩首疊在一起',
    ],
  },
  {
    icon: KeyRound,
    name: '會員登入',
    line: '介面先接假的後端，確定流程對了再換成真的',
    points: [
      '介面只呼叫六個函式，後端是真是假它不知道',
      '先做假後端：不寄信，登入碼一律 123456',
      '再換成 Supabase 的信箱連結登入，在哪個瀏覽器點信，就在那個瀏覽器登入',
    ],
    key: true,
  },
  {
    icon: Database,
    name: '資料庫與權限',
    line: '三張表，權限寫在資料庫裡，不寫在網頁裡',
    points: [
      '繪馬是公開的，「誰掛了哪一塊」另外一張表，不併進公開那一張',
      '每個帳號 10 分鐘最多掛 5 塊，這個限制由資料庫擋',
      '前端那把金鑰本來就會被看到，擋住別人的是資料庫的規則',
    ],
  },
  {
    icon: Plug,
    name: '對外 API',
    line: '一支函式五個端點，附一頁可以當場試的文件',
    points: [
      '讀繪馬牆不用登入，寫入要帶登入權杖（登入之後拿到的那串通行碼），權限一樣交給資料庫',
      '文件頁寫：網址開頭、權杖怎麼帶、端點表、錯誤代碼、還沒開放的項目',
      '頁面上就能按「不帶權杖呼叫」與「帶我的權杖呼叫」，看回傳差在哪',
    ],
  },
];

export default function SlideCase4Stack() {
  return (
    <SlideLayout
      title="會員登入、資料庫、對外 API 與背景音樂"
      subtitle="Case 04 · 3D 畫面之外接上的四樣東西"
      icon={Plug}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-400 text-sm leading-relaxed">
            這四樣都不是 3D 的事。<strong className="text-slate-200">格子上的號碼是它們被做出來的先後</strong>，
            登入那一樣先用假的後端跑過一次，確定流程對了，才接上真的 Supabase。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARTS.map((p, i) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-4 ${
                p.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={`font-mono text-xs shrink-0 self-center ${
                    p.key ? 'text-sky-400' : 'text-slate-600'
                  }`}
                >
                  {i + 1}
                </span>
                <p.icon
                  aria-hidden="true"
                  size={16}
                  className={`shrink-0 self-center ${p.key ? 'text-sky-400' : 'text-slate-500'}`}
                />
                <h3 className={`text-base font-bold shrink-0 ${p.key ? 'text-sky-200' : 'text-slate-100'}`}>
                  {p.name}
                </h3>
                <span className="text-slate-500 text-sm">{p.line}</span>
              </div>
              <ul className="space-y-1 border-t border-slate-800 pt-2 mt-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
                    <span className="shrink-0 text-slate-600">・</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AnimatedBlock>

        <Callout tone="warn" label="做到這裡最容易誤會的一件事" stepIndex={3}>
          階段 14 做完，網站看起來已經「要登入才寫得了繪馬」，但那只是介面流程。
          <strong className="text-slate-100">任何人略過介面直接送請求，照樣寫得進去</strong>，
          真正擋住他的是階段 16 那三張表的權限規則。案例三的兩層權限講的是同一件事。
        </Callout>

      </div>
    </SlideLayout>
  );
}
