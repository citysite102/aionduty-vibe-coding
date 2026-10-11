import { Network, Smartphone, Database, ServerOff, UserCheck, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 2026-10-10（講師）新增。接在〈哪一種金鑰可以寫進程式碼〉後面。
 *
 * 缺口是：前一頁為了解釋金鑰，丟出了「你沒有後端」這件事，但學員不知道
 * 「沒有後端」到底長什麼樣、少了它會怎樣、以及要補的時候補什麼。
 * 這一頁把現況畫出來，並把他最可能想加的那個功能（登入）走一次。
 * 「什麼時候才真的需要後端、要做的話是哪三步」2026-10-10 拆去下一頁
 * （`27b8h_M4_NeedBackend`）：四塊裝在同一頁會溢出，而且那是兩個主題，
 * 這一頁講現在就做得到的，那一頁講之後才用得到的。**不要合回來。**
 *
 * **最重要的一件事：加登入不需要自己寫後端。** 學員（與多數教學文章）會以為
 * 會員系統一定要自己做後端，於是卡在那裡不敢做。真正要改的是 RLS 規則，
 * 改成用 auth.uid() 比對。這一頁要把這件事講清楚，不然前一頁那句「沒有後端」
 * 會變成一道假的牆。
 *
 * 2026-10-10（講師）措辭修正：**不要寫「登入不用後端」**。Supabase Auth（GoTrue）
 * 本身就是跑在伺服器上的後端，只是它是別人寫好的。這一頁的分界從頭到尾都是
 * 「現成的後端」對上「你自己寫的後端」，中間那一格的名字也是「你自己的後端」，
 * 講成「不用後端」會把這條線弄模糊，下一頁整頁就是建立在這條線上。
 *
 * 最後查證：2026-10-10。
 *   - Supabase Auth 支援 email 加密碼、Magic Link、社群登入，
 *     文件寫「When using Supabase SDKs, your data requests are automatically sent
 *     with the user's Auth Token」，前端直接用。（supabase.com/docs/guides/auth）
 *   - 只看得到自己那幾筆的標準寫法是 RLS policy 裡 `(select auth.uid()) = user_id`，
 *     而且它是在資料庫那一端執行的，不是在網頁裡。
 *     （supabase.com/docs/guides/database/postgres/row-level-security）
 *   - 要後端的時候：Supabase Edge Functions 是 server-side，secrets 存在專案的
 *     secrets 裡不會進瀏覽器（supabase.com/docs/guides/functions）；
 *     Vercel Functions 是在同一個專案加一個 `api/hello.js`，跑在伺服器端
 *     （vercel.com/docs/functions）。
 *   下次改版前三個都重查，免費額度與介面名稱是 C-3 最會動的那一類。
 *
 * 中間那一格刻意用虛線灰框而不是紅框：「沒有後端」不是錯誤，是這個題目的現況，
 * 標成紅的會讓學員以為自己做錯了。**不要改成紅色。**
 *
 * 2026-10-10（講師）兩處修正：
 *   1. 原本寫「很多上線的產品就是這樣跑的」，那是證明不了的斷言（D-2），而且沒有來源。
 *      改成講這類服務的設計意圖，那是文件上查得到的。
 *   2. 第三格原本叫「資料庫（Supabase）」，學員會以為 Supabase 就只是一個資料庫。
 *      它其實是一包：Postgres、GoTrue（登入）、PostgREST（自動把資料表變成 API）、
 *      Storage、Realtime、Edge Functions。**第三格與中間那一格要一起讀**：
 *      中間那一格不是「Supabase 做不到」，是「你還沒寫自己的那一段」，
 *      而要寫的時候，位置就在 Supabase 自己的 Edge Functions 裡。
 *      來源 supabase.com/docs/guides/getting-started/architecture，最後查證 2026-10-10。
 */
const PIECES = [
  {
    icon: Smartphone,
    tag: '有',
    name: '前端',
    body: '你的 index.html。它被下載到訪客的手機或電腦上，在那裡執行。',
    have: true,
  },
  {
    icon: ServerOff,
    tag: '沒有',
    name: '你自己的後端',
    body: '一段跑在伺服器上、由你決定邏輯的程式。Supabase 的 Edge Functions 就是放這個的地方，你還沒寫任何一段。不是做錯，是這個題目還沒需要。',
    have: false,
  },
  {
    icon: Database,
    tag: '有',
    name: 'Supabase',
    body: '不只是資料庫。你用到的是資料表，加上它自動把資料表變成的那組 API；同一個後台還有登入、檔案儲存與 Edge Functions。',
    have: true,
  },
];

const PROMPT = `幫我在計時器加上登入，用 Supabase Auth 的 email 加密碼。

1. 先列出你要做哪幾步，等我說可以再動檔案
2. 沒登入的人只看得到登入畫面，看不到任何人的紀錄
3. 表加一欄記下是誰留的，RLS 規則改成每個人只動得了自己那幾筆
4. 金鑰沿用現在這一把，不要新增任何需要我保密的設定
5. 做完告訴我怎麼確認：我要能用兩個帳號登入，各自只看到自己的紀錄`;

/**
 * 登入之後多出來的那幾步。最後查證：2026-10-10。
 *   - 登入成功會拿到 access token（JWT）與 refresh token，access token 文件寫
 *     「designed to be short lived, usually between 5 minutes and 1 hour」，
 *     建議值是 1 小時；refresh token 用一次換一組新的。
 *     （supabase.com/docs/guides/auth/sessions）
 *   - 送法是 `Authorization: Bearer <jwt>`，而且**公開金鑰照樣要送**，
 *     文件的 curl 範例同時帶 `apikey` 與 `Authorization` 兩個標頭。
 *     （supabase.com/docs/guides/auth/jwts）
 *   - token 存在瀏覽器（計時器這個專案是自己用 fetch 打 /auth/v1，
 *     所以存在 localStorage 是自己寫的，不是套件預設）。
 *
 * **第 2 格那句「它不是另一把金鑰」不能拿掉。** 學員看到「登入後拿到一串字存在瀏覽器」
 * 第一個反應就是「那不是又回到同一個問題嗎」。差別是公開金鑰代表「任何人」，
 * 通行證代表「這一個人」，而且會過期，這一句是整段的重點。
 */
const AUTH_FLOW = [
  {
    n: '1',
    t: '使用者在你的網頁上登入',
    d: '輸入 email 跟密碼，或是收一封登入信點進來。這一段 Supabase 幫你做。',
  },
  {
    n: '2',
    t: 'Supabase 回一張通行證',
    d: '瀏覽器把它存起來。它不是另一把金鑰，是「你是誰」的證明，而且會過期。',
  },
  {
    n: '3',
    t: '之後每次讀寫多帶一張',
    d: '原本那把公開金鑰照送，通行證一起送。兩個都在，缺一個都不行。',
  },
  {
    n: '4',
    t: '規則改成比對身分',
    d: '從「誰都讀得到」變成「只動得了自己那幾筆」，比的就是通行證上的身分。',
  },
];

export default function SlideArchGap() {
  return (
    <SlideLayout
      title="前端、資料庫、沒有後端：要加登入怎麼做"
      subtitle="What You Have, What You Don't"
      icon={Network}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3.5 pb-4">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PIECES.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`rounded-2xl p-4 ${
                  p.have
                    ? 'border border-emerald-500/25 bg-emerald-500/5'
                    : 'border border-dashed border-slate-700 bg-slate-950'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`flex items-center gap-2 font-bold text-base ${p.have ? 'text-emerald-300' : 'text-slate-400'}`}>
                    <Icon aria-hidden="true" size={18} className="shrink-0" />
                    {p.name}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${p.have ? 'bg-emerald-500/15 text-emerald-300' : 'border border-slate-700 text-slate-500'}`}>
                    {p.tag}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} as="p" className="text-slate-400 text-sm leading-relaxed">
          所以每一次讀或寫，都是<strong className="text-slate-200">前端直接打 Supabase 的 API</strong>，中間沒有你的程式。
          這不是陽春版，Supabase 這類服務本來就設計成讓前端直接連，安全靠 RLS 擋而不是靠藏金鑰，
          代價是那一道寫錯就沒有第二層。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2.5 mb-1.5">
            <UserCheck size={18} className="text-sky-400 shrink-0" />
            <h4 className="text-base font-bold text-slate-100">想讓每個人只看到自己的紀錄，要先自己寫後端嗎</h4>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            不用。<strong className="text-slate-200">登入那一段 Supabase 已經幫你寫好了</strong>，
            你的網頁直接用它，那一把公開金鑰就夠。上一頁那個風險，收起來就是靠這一步。流程是這樣：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
            {AUTH_FLOW.map((f, i) => (
              <div key={f.n} className="relative rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-mono text-xs text-slate-600">{f.n}</span>
                  <span className="text-sm font-bold text-slate-200 leading-snug">{f.t}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{f.d}</p>
                {i < AUTH_FLOW.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    size={14}
                    className="hidden md:block absolute top-1/2 -right-[13px] -translate-y-1/2 text-slate-700"
                  />
                )}
              </div>
            ))}
          </div>

          <p className="text-slate-500 text-sm leading-relaxed mb-3">
            通行證一樣看得到，但
            <strong className="text-slate-300">公開金鑰代表「任何人」，它代表「這一個人」</strong>，
            規則比對的是後者。
          </p>

          <CopyBlock text={PROMPT} size="xs" note="第 1 點跟第 4 點不要刪，那兩句是煞車" />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
