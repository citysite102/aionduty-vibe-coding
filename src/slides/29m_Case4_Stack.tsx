import { KeyRound, Database, Plug, Music, Mail, ArrowRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import { SlideLayout, AnimatedBlock, useSlide } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例四的第三頁：這個案例在 3D 之外接上的五樣東西。
 * 2026-10-23 新增，資料來源 case-04-wishes.pdf 的階段 13（背景音樂）、14（登入介面）、
 * 15（Supabase 信箱連結登入）、16（資料表與權限、API 文件頁）、17（對外 API v1）、
 * 20-9（接上 Resend 寄登入信）。
 *
 * 五格的順序照它們實際被做出來的順序：音樂 → 登入 → 資料庫 → 對外 API → 寄信。
 *
 * **2026-10-31（講師）整頁改成「每一格先說為什麼用到」。** 原本每一格只有一串做法，
 * 學員讀得到「做了什麼」但看不出「為什麼需要它」，而這一頁的職務正是後者：
 * 它是一張「要接一樣東西之前先問自己什麼」的清單。所以每一格固定三段：
 *   why     為什麼會用到它。寫情境，不寫功能介紹。
 *   points  設計與指令的重點。這一格做的時候真正要交代清楚的那幾件。
 *   check   做完要檢查什麼。要寫成一個當場答得出有或沒有的動作。
 * **三段都要有，寫不出 check 的那一格就代表它還沒做完。**
 *
 * 同一輪補上第五格 Resend（講師要求）。手冊 20-9 是選做，但它回答的是學員一定會撞到的
 * 一題：為什麼只有我收得到登入信。Supabase 內建的寄信每小時約 2 封而且只寄給專案成員，
 * 一般訪客根本收不到（手冊階段 15、20-9）。
 *
 * 2026-10-31（講師：這句不需要）開場那一段整個刪掉。它講的兩件事畫面上都已經有了：
 * 「號碼是先後」靠每一格標題列前面的序號，「登入先接假後端」是登入那一格的條目。
 * 刪掉之後同頁的 `stepIndex` 重編過（A-2：缺號會讓講者按了沒反應）。
 * **不要加回來。**
 *
 * 登入那一格標 sky，因為它帶的是這個案例的第二條核心判斷（「需要登入」不等於權限控管），
 * 而且它跟案例三的兩層權限是同一條線，學員在那裡已經驗過一次。
 *
 * 等功率淡化的 0.707 是 1/√2，手冊階段 13 的驗收題就是這個數字，照抄不要改寫成 0.7。
 *
 * 2026-10-23 照實機的聲音面板改過一次：五首 Suno 生成的曲子，三首綁時段（白天 Floating
 * Shrine・昼、黃昏 Glass Wind Chimes、夜晚 Floating Shrine・夜）、兩首手動選，音量三條
 * （總音量、音樂、海浪與雨）。手冊同日重建，階段 13 的曲目表已經是同一份五首。
 * 之後曲目再變，要對的是那個網址的「聲音」面板，不是手冊截圖。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-31，來源是 case-04-wishes.pdf 的 20-9（手冊自己標了 2026-10-23 實測）。
 * 當時的現況：Resend 免費方案每月約 3,000 封、每天約 100 封、1 個網域；
 * 網域掛在 Vercel 的話 Resend 的 DNS 可以自動設定；Supabase 官方有接 Resend 的教學。
 * **額度那三個數字會變**，下次改版前回 resend.com 的 pricing 看一次，不確定就整組拿掉，
 * 只留「接一個自己的寄信服務」照樣成立。
 * ─────────────────────────────────────────────────────
 */
/**
 * 2026-10-31（講師：這段同學看不懂，可以用動畫呈現一種是前端攔截、一種是後端攔截）
 * 右下角那個 warn Callout 從三行字改成兩條走得通的路線。
 * 文字版的問題是「別人不開你的網頁直接送請求」這件事，沒寫程式的人想像不出畫面；
 * 兩條路線並排之後，看得到的是**登入視窗只擋得到第一條**，而兩條都會撞到資料庫那一層。
 *
 * 2026-10-31（講師：這裡應該要加上呼叫 API）兩條路線中間各補一格「呼叫 API」。
 * 少了它，第二條看起來像「別人的程式直接碰到資料庫」，而實際上**兩條走的是同一支 API**，
 * 差別只在第一條先經過登入視窗。這一格就是下一頁〈系統架構〉三個入口匯流的那個點。
 * 光點都是常駐迴圈（A-2：沒有切換畫面內容，不影響翻頁），
 * 第二條的光點刻意從「登入視窗」那一格上面飄過去，那就是「繞過」本身。
 * **不要只留文字。** 這一塊跟下一頁〈系統架構〉是同一個論點的兩種畫法：
 * 這裡畫的是兩條路線各被誰擋，下一頁畫的是三個入口匯到同一道規則。
 */
const ROUTES = [
  {
    lane: '使用者從你的網站進來',
    actor: '使用者',
    throughUi: true,
    result: '擋兩次：登入視窗先問一次，資料庫的規則再檢查一次。',
  },
  {
    lane: '別人的程式，根本沒開你的網頁',
    actor: '別人的程式',
    throughUi: false,
    result: '呼叫的是同一支 API，但登入視窗完全沒碰到。只剩資料庫那一層在擋，它沒設好就寫得進去。',
  },
];

const PARTS = [
  {
    icon: Music,
    name: '背景音樂',
    why: '一個會動的 3D 場景沒有聲音就少一半。現成的曲子多半不能放進公開的網站，所以五首都自己用 Suno 生成。',
    points: [
      '三首綁時段（白天、黃昏、夜晚各一首），另外兩首可以自己指定',
      '面板上三條音量：總音量、音樂、海浪與雨。想只留海浪聲，分得開',
      '兩首交叉時各自是 0.707 不是 0.5，合起來聽到的響度才不會凹下去',
    ],
    check: [
      '連續切時段，不會有兩首疊在一起（選曲與淡化寫成測試）',
      '放上公開網站之前，先看那個生成工具的條款：免費方案常常只能個人使用',
    ],
  },
  {
    icon: KeyRound,
    name: '會員登入',
    why: '繪馬要記得是誰掛的，網站就得先知道來的人是誰。沒有這一層，「我的參拜紀錄」做不出來。',
    points: [
      '介面只呼叫六個函式，後端是真是假它不知道',
      '先做假後端：不寄信，登入碼一律 123456，把流程跑通',
      '再換成 Supabase 的信箱連結登入，網站的介面一行都不用改',
    ],
    check: [
      '在哪個瀏覽器點信，就在那個瀏覽器登入',
      '正式站的登入視窗要寫「寄登入連結」，不能還留著開發用的密碼登入',
    ],
    key: true,
  },
  {
    icon: Database,
    name: '資料庫與權限',
    why: '繪馬要留得住，而且別人改不動你的那幾塊。這一層不做，網站看起來是對的，資料誰都動得了。',
    points: [
      '繪馬是公開的，「誰掛了哪一塊」另外一張表，不併進公開那一張',
      '每個帳號 10 分鐘最多掛 5 塊，這個限制由資料庫擋，不是由網頁擋',
      '前端那把金鑰本來就會被看到，擋住別人的是資料庫的規則',
    ],
    check: ['用第二個帳號登入，看得到別人的繪馬，但改不動也刪不掉'],
  },
  {
    icon: Plug,
    name: '對外 API',
    why: '別人想把繪馬牆放進自己的網站或程式，就需要一個不經過你的網頁也呼叫得到的入口。',
    points: [
      '讀繪馬牆不用登入，寫入要帶登入權杖（登入之後拿到的那串通行碼），權限一樣交給資料庫',
      '文件頁寫：網址開頭、權杖怎麼帶、端點表、錯誤代碼、還沒開放的項目',
    ],
    check: [
      '不帶權杖呼叫要回 401',
      '文件頁上按「不帶權杖呼叫」與「帶我的權杖呼叫」，看回傳差在哪',
    ],
  },
  {
    icon: Mail,
    name: '寄信服務（Resend）',
    why: 'Supabase 內建的寄信每小時約 2 封，而且只寄得到專案成員的信箱，所以一般訪客根本收不到登入信。要讓別人登入得進來，就得接一個自己的。',
    points: [
      '接法是把自訂 SMTP 填進 Supabase，網站的程式一行都不用改',
      'Resend 免費方案每月約 3,000 封、每天約 100 封、1 個網域（2026-10 查）',
      'API 金鑰的權限只給寄信，而且只貼到 Supabase，不進程式碼',
    ],
    check: [
      'Resend 後台那個網域的狀態要變成 Verified',
      '用一個不是專案成員的信箱登入，收得到信、點連結回得到網站',
    ],
  },
];

/** 兩段之間那個會跑的箭頭。`skip` 的那一段畫成虛線，光點從上面飄過去，就是「繞過」。 */
function FlowDot({ skip, delay }: { skip: boolean; delay: number }) {
  return (
    <span className="relative inline-flex h-4 w-6 shrink-0 items-center justify-center" aria-hidden="true">
      <ArrowRight size={13} className={skip ? 'text-slate-700' : 'text-amber-500/70'} />
      <motion.span
        className={`absolute h-1.5 w-1.5 rounded-full ${
          skip ? 'bg-slate-500' : 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]'
        }`}
        style={{ top: skip ? -3 : 5 }}
        animate={{ left: [0, 18], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1, delay, ease: 'linear' }}
      />
    </span>
  );
}

export default function SlideCase4Stack() {
  const { currentStep } = useSlide();

  return (
    <SlideLayout
      title="背景音樂、登入、資料庫、對外 API 與寄信"
      subtitle="Case 04 · 3D 畫面之外接上的五樣東西"
      icon={Plug}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        {/* 2026-10-31（講師：這種應該逐格出現，不用四個項目一起出現）
            每一格自己一個 stepIndex，講者按一下講一格，右下角那個 Callout 是第 6 下。

            2026-10-31（講師：文字量很龐大，是否有機會搭配動畫增加易讀性）兩件事：
            一是把原本塞在最上面的 Astro 那一塊整個搬去 Slide 185（它現在自成一頁），
            這一頁少掉約 270px；二是**正在講的那一格留著，其餘五格淡下去**。
            這一頁一格就有三段（為什麼用到／重點／檢查），五格同時全亮時，
            讀者不知道視線該落在哪。五格都出現之後（第 6 下）全部恢復，
            那時候它是一張可以整頁對照的表。
            A-2：它讀的是 `currentStep`，沒有用 `setTimeout` 切換內容。 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PARTS.map((p, i) => (
            <AnimatedBlock
              key={p.name}
              stepIndex={i + 1}
              className={`rounded-2xl border p-4 transition-opacity duration-500 ${
                p.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              } ${currentStep <= PARTS.length && currentStep !== i + 1 ? 'opacity-40' : 'opacity-100'}`}
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
              </div>

              <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-2 mt-2">
                <span className={`mr-2 font-bold ${p.key ? 'text-sky-300' : 'text-slate-300'}`}>為什麼用到</span>
                {p.why}
              </p>

              <div className="mt-2.5">
                <div className="text-slate-300 text-sm font-bold mb-1">設計與指令的重點</div>
                <ul className="space-y-1">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="shrink-0 text-slate-600">・</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2.5 border-t border-slate-800 pt-2">
                <div className="text-slate-300 text-sm font-bold mb-1">做完檢查這個</div>
                <ul className="space-y-1">
                  {p.check.map((c) => (
                    <li key={c} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="shrink-0 text-slate-600">・</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedBlock>
          ))}

          {/*
            2026-10-31（講師：這直接放到 5 旁邊那一格）這個 Callout 原本在格子外面另起一塊。
            五格排兩欄之後右下角剛好空一格，放進去版面才收得乾淨。
            它排在五格後面，是這一段的最後一下（第 6 下）。
            同一輪拿掉「階段 14」「階段 16」（講師：投影片不要寫手冊裡的階段幾），
            改成講那兩件事本身：登入介面做完的時候／後來那三張表的權限規則。
            2026-10-31（講師：這裡太抽象，同學不知道什麼叫略過介面）「任何人略過介面
            直接送請求」換成那個動作本身：在終端機打一行指令，直接把一筆繪馬送進資料庫。
            **不要改回「略過介面」。** 下一頁〈從瀏覽器到資料庫〉右邊那一欄講的是同一件事
            （別人的程式直接呼叫 API 網址），兩邊要對得起來。
          */}
          <Callout tone="warn" label="做到這裡最容易誤會的一件事" stepIndex={6} className="self-start">
            登入介面做完的時候，網站看起來已經「要登入才寫得了繪馬」。
            <strong className="text-slate-100">但那是兩條路線裡的其中一條。</strong>
            <span className="mt-2.5 block space-y-2">
              {ROUTES.map((r) => (
                <span key={r.lane} className="block rounded-xl border border-slate-800 bg-slate-950 p-2.5">
                  <span className="block text-sm font-bold text-slate-200 mb-1.5">{r.lane}</span>
                  <span className="flex flex-wrap items-center gap-1">
                    <span className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">
                      {r.actor}
                    </span>
                    <FlowDot skip={!r.throughUi} delay={0} />
                    <span
                      className={`relative rounded-lg border px-2 py-1 text-xs ${
                        r.throughUi
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-dashed border-slate-800 bg-slate-900/40 text-slate-600'
                      }`}
                    >
                      登入視窗
                      {!r.throughUi && (
                        <X
                          aria-hidden="true"
                          size={13}
                          className="absolute -right-1 -top-1 rounded-full bg-slate-950 text-slate-500"
                        />
                      )}
                    </span>
                    <FlowDot skip={false} delay={0.5} />
                    <span className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300">
                      呼叫 API
                    </span>
                    <FlowDot skip={false} delay={1} />
                    <span className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-200">
                      資料庫的權限規則
                    </span>
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-slate-400">{r.result}</span>
                </span>
              ))}
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-slate-400">
              所以真正把人分開的是那三張表的權限規則，不是介面。案例三的兩層權限講的是同一件事。
            </span>
          </Callout>
        </div>

      </div>
    </SlideLayout>
  );
}
