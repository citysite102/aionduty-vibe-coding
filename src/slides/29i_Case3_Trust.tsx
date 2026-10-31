import { KeyRound, Table2, Rows3, ChevronRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 兩層權限是成對對照（sky／indigo 合計一種），加上「不能外流的金鑰」那個 rose，
 * 這一頁剛好兩種強調色。
 *
 * 標題是描述式的（兩把金鑰，兩層權限），所以「擋人的是資料庫不是前端」這個結論
 * 要由內文講完，不要指望標題替它講。判斷寫在副標與最後那一塊。
 */
const LAYERS = [
  {
    name: '第一層：你能不能碰這張表',
    icon: Table2,
    tone: 'sky',
    msg: 'permission denied for table reservations',
    note: '整張表都不給你，連問都不用問。去後台看那張表的存取設定。',
  },
  {
    name: '第二層：你能碰這張表的哪幾列',
    icon: Rows3,
    tone: 'indigo',
    msg: 'new row violates row-level security policy',
    note: '表可以碰，但這一列不是你的。回去看那條政策放行的條件對不對。',
  },
];

/**
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-31，對照 supabase.com/docs/guides/api/api-keys。
 * 當時的現況：兩把金鑰的現行名稱是 **Publishable key**（`sb_publishable_…`）與
 * **Secret key**（`sb_secret_…`），舊名 `anon` 與 `service_role` 文件標為 legacy。
 * Publishable 那一把的原話是「Safe to expose online: web page, mobile or desktop app,
 * GitHub actions, CLIs, source code」，理由就是它只拿得到 RLS 允許的東西。
 * 2026-10-31（講師）這一頁的兩張卡從「可以公開的那一把／不能外流的那一把」
 * 換成後台上真正的名字，兩邊同一種格式，學員要拿它去對 Supabase 的介面。
 * **兩個舊名要留著**：既有專案的後台仍然顯示 anon 與 service_role。
 * 下次改版前重查那一頁，金鑰名稱 2025 年才剛改過一輪，屬於 C-3 最會動的那一類。
 * `27b8f_M4_KeyKinds` 還寫著「前端用的那一把／後台用的那一把」，那一頁的逐字稿
 * 已經錄過，所以沒有跟著改，要動的話照 A-5 掛 UpdateNote。
 * ─────────────────────────────────────────────────────
 *
 * 2026-10-31（講師）開場那一句的「本來就設計成讓前端直接連」改成「預設的接法」：
 * Supabase 也接得上你自己的後端（service role 那條路），說成「設計成」是把預設寫成唯一解。
 * **改這一句要連 `27b8g_M4_ArchGap` 一起看**，那一頁有同樣的說法，但它的逐字稿已經錄過。
 *
 * 2026-10-31（講師：太 AI 且不清晰）開場那一段改成三條。原本是「擋住別人看你資料的
 * 那道門在資料庫上，不在前端。計時器搬上 Supabase 那一步打開的 RLS，就是這道門，
 * 當時只按了開關，這裡才真的用到它」。三個毛病：「，不在前端」是 D-2 的對仗、
 * 「那道門」是自創比喻而且整段靠它撐、「只按了開關」還說錯了（那一步也寫了一條規則）。
 * 現在三條各講一件可以指出來的事：前端手上有什麼、資料庫做什麼、課程裡哪一步做過。
 * **不要再用「那道門」把三件事串成一句。**
 */
const GATE = [
  { k: '前端有什麼', v: '網頁的程式碼、那把公開金鑰。使用者翻一下就看得到，也改得動。' },
  { k: '資料庫做什麼', v: '每一次查詢進來，先拿規則檢查一遍，不符合就回一段錯誤。' },
  { k: '這些規則叫什麼', v: 'RLS（Row Level Security）。計時器搬上 Supabase 的第四步，就是在開它並寫第一條。' },
];

/**
 * 2026-10-31（講師：看不懂在說什麼，也不知道怎麼教）三條重寫。原本第一條是
 * 「第二層擋住了別人的預約」，「擋住」沒有主詞，讀起來像資料庫把預約擋掉了，
 * 而實際上是每個帳號只讀得到自己那幾筆。label 也補上畫面上真的要顯示的那個數字，
 * 原本只說「還剩幾個位子」，學員不知道那是畫面上的哪一個東西。
 * **三行的標籤不要換成「問題／解法／結論」那種泛稱**，第三行講的是代價不是結論。
 *
 * 2026-10-31（講師：這個代價會有什麼問題嗎，有沒有辦法不要把別人的預約給出去）
 * 第二、三行再改一次。第三行原本讀起來像第二行那個做法的代價，但它其實是
 * **另一條路**（前端自己算）的代價，所以開頭補上「不交給資料庫、硬要前端自己算的話」。
 * 同一輪把外洩的東西寫具體（姓名與聯絡方式），原本只寫「別人的預約」看不出嚴重性；
 * 第二行補上要跟 Claude 說的那句話，不然學員知道該做什麼卻不知道怎麼開口。
 */
const COUNT_STEPS = [
  { k: '卡在哪', v: '權限第二層讓每個帳號只讀得到自己那幾筆，別人的預約前端看不到，所以加不出總數。' },
  { k: '怎麼做', v: '請 Claude 在資料庫裡做一個只回數量的函式，前端呼叫它。它讀得到整張表，但只回一個數字，不回明細。' },
  { k: '代價', v: '不交給資料庫、硬要前端自己算的話，就得把整張表開放給它讀，等於連別人的姓名與聯絡方式一起送到每個訪客的瀏覽器裡。' },
];

export default function SlideCase3Trust() {
  return (
    <SlideLayout
      title="兩把金鑰，兩層權限"
      subtitle="Case 03 · 前端擋不住的那些事"
      icon={KeyRound}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        {/*
          2026-10-05 補這一句。章節七的〈把紀錄搬上 Supabase〉已經讓學員自己接過一次，
          那一頁只說「打開 RLS，寫一條規則」就把細節推給這裡（它的卡片上就寫著
          「案例三會整段講這個取捨」）。這一頁不講一聲的話，學員會覺得又在講一次金鑰。
          **改那一頁的推托句，要回來改這一句。**
        */}
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-400 text-base leading-relaxed">
            這個案例走的是 Supabase 預設的接法：前端直接連資料庫，中間沒有你自己的後端。
            <strong className="text-slate-300">所以擋人的規則只能寫在資料庫那一邊。</strong>
          </p>
          <ul className="mt-2 space-y-1">
            {GATE.map((g) => (
              <li key={g.k} className="flex flex-wrap items-baseline gap-x-2 text-base leading-relaxed">
                <span className="shrink-0 text-slate-600">・</span>
                <span className="shrink-0 font-bold text-slate-200">{g.k}</span>
                <span className="flex-1 min-w-0 text-slate-400">{g.v}</span>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-2 text-xs text-slate-500">
              <span className="font-mono tracking-wide text-slate-400">Publishable key</span>
              <span className="ml-2">舊的專案寫 anon</span>
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它本來就會被看到</p>
            <ul className="space-y-1 text-slate-300 text-sm leading-relaxed">
              <li className="flex gap-2"><span className="shrink-0 text-slate-600">・</span>它被打包進網頁，使用者在瀏覽器裡翻一下就看得到</li>
              <li className="flex gap-2"><span className="shrink-0 text-slate-600">・</span>這是設計上就這樣，藏它沒有意義</li>
              <li className="flex gap-2"><span className="shrink-0 text-slate-600">・</span><strong className="text-slate-100">它拿得到什麼，完全由資料庫的規則決定</strong></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="mb-2 text-xs text-slate-500">
              <span className="font-mono tracking-wide text-rose-300">Secret key</span>
              <span className="ml-2">舊的專案寫 service_role</span>
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它無視所有規則</p>
            <ul className="space-y-1 text-slate-300 text-sm leading-relaxed">
              <li className="flex gap-2"><span className="shrink-0 text-rose-500/70">・</span>拿到它的人讀得走、改得掉、刪得光</li>
              <li className="flex gap-2"><span className="shrink-0 text-rose-500/70">・</span><span><strong className="text-slate-100">絕對不能出現在前端</strong>，也不能進版本控制</span></li>
              <li className="flex gap-2"><span className="shrink-0 text-rose-500/70">・</span>貼上去之前先看清楚你複製的是哪一把</li>
            </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-base font-bold text-slate-100 mb-2">資料庫攔截的兩層機制</h3>
          {/*
            2026-10-04：這一頁是全片對不寫程式的人最陡的一頁。前一次碰資料庫是
            〈資料庫設計〉的「一張表就是一個 Excel 分頁」，下一次就是這兩段英文原文。
            中間補一階白話，兩層各給一個櫃子的說法；原文保留，因為那是學員唯一能分辨
            卡在哪一層的線索。**不要把這兩段原文換成翻譯。**
            2026-10-31 引言改成「底下有兩種可能會看到的錯誤訊息」（講師給的字），
            原本是「⋯認得出是哪一層就夠了，不用背」。
          */}
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            第一層問的是「你能不能開這個櫃子」，第二層問的是「櫃子裡哪幾份是你的」。
            一個請求要連過兩道，任何一道沒過就回一段錯誤訊息，兩段長得不一樣。
          </p>
          {/*
            2026-10-30 補這條流程（講師：這一段適合圖像化）。它要做的事只有一件：
            讓學員看到兩層是**串著的**，不是兩種選項。兩個關卡的顏色跟底下兩張卡一致，
            **改其中一邊的顏色就要兩邊一起改**。膠囊與箭頭的寫法跟 Slide 32、33 同一套。
          */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-4">
            <span className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-slate-300 text-sm">
              前端送出請求
            </span>
            <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
            <span className="rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-1 text-sky-100 text-sm">
              第一層：這張表你碰不碰得到
            </span>
            <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
            <span className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-3 py-1 text-indigo-100 text-sm">
              第二層：這張表的哪幾列是你的
            </span>
            <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
            <span className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-slate-300 text-sm">
              資料回到前端
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-3">
            底下有兩種可能會看到的錯誤訊息。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LAYERS.map((l) => (
              <div
                key={l.name}
                className={`rounded-xl border p-4 ${
                  l.tone === 'sky'
                    ? 'border-sky-500/30 bg-sky-500/5'
                    : 'border-indigo-500/30 bg-indigo-500/5'
                }`}
              >
                <div
                  className={`text-sm font-bold mb-2 ${
                    l.tone === 'sky' ? 'text-sky-300' : 'text-indigo-300'
                  }`}
                >
                  <l.icon aria-hidden="true" size={15} className="inline-block mr-1.5 -mt-0.5" />
                  {l.name}
                </div>
                <code className="block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-400 break-all">
                  {l.msg}
                </code>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{l.note}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">
            第二層打開之後<strong className="text-slate-100">預設是全部拒絕</strong>，
            底下每寫一條規則（資料庫那邊叫它「政策」）都是在放行某一批資料。
            方向搞反的話，你會寫出一堆什麼都沒擋到的規則。
          </p>
        </AnimatedBlock>

        {/*
          2026-10-30 從一段散文改成三行（講師：太 AI）。原本四句話把「卡在哪」「怎麼做」
          「做錯會怎樣」黏在一起，而這三件事是三個不同的東西，學員要自己拆。
          **三行的標籤不要換成「問題／解法／結論」那種泛稱**，第三行講的是代價不是結論。
        */}
        <Callout tone="muted" label="畫面上那個「還剩 3 個名額」，誰來算" stepIndex={3}>
          <span className="block space-y-1.5">
            {COUNT_STEPS.map((c) => (
              <span key={c.k} className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-14 shrink-0 text-slate-300 text-sm font-bold">{c.k}</span>
                <span className="flex-1 min-w-0 text-sm leading-relaxed">{c.v}</span>
              </span>
            ))}
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
