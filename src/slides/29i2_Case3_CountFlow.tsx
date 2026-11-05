import { useState } from 'react';
import { GitCompareArrows, ChevronRight, Database, MonitorSmartphone, Unlock } from 'lucide-react';
import { SlideLayout, AnimatedBlock, useSlide } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 前一頁（〈兩把金鑰，兩層權限〉）講完「只回數量的函式」之後，學員知道該做什麼，
 * 但看不到**那三種拿法各自回來什麼**。這一頁把它走一次：同一張表、同一條規則，
 * 換三種身分與拿法，右邊印出前端真的收到的東西。
 *
 * 2026-11-01（講師：補上完整的互動視覺化流程）新增，影片裡沒有這一頁。
 *
 * 設計上的三個決定，改之前先讀：
 *
 * 1. **右邊那個回傳內容要印真的形狀**（`[]`、一列物件、一個數字）。
 *    這一頁的說服力全在「空陣列」與「一個數字」的差別上，換成白話描述就沒了。
 * 2. **三種情境裡有兩種是錯的、一種是對的**，所以 rose 與 emerald 是成對出現，
 *    照 A-1 合計算一種強調色；加上 sky（當下選中的那一格）剛好兩種。
 *    **不要再給第三個顏色**，也不要把 sky 拿去標別的東西。
 * 3. 小美那一格最容易被讀成「規則壞了」，所以它的註解第一句就寫規則是對的。
 *    拿不到總數不是權限出錯，是總數本來就不該由前端算。
 * 4. **左邊要先出現公開的那張 `sessions`**（講師 2026-11-01：「沒有登入應該要拿到的
 *    場次那張表？」）。只畫預約表的話，訪客那一格看起來像整頁都空白，而實際上
 *    場次是公開資料，他看得到日期與名額，看不到的只有別人的預約。
 *    **不要再把它拿掉**：這一頁要讓人分得出哪一張表該公開、哪一張要靠規則擋。
 *
 * `stepIndex` 故意跳號（1、2、5）：第 3 下與第 4 下不長出新東西，它們換的是
 * 上面那個情境（`AUTO_BY_STEP`），讓講者按下一步就能走完三種拿法。
 * **看到 3 與 4 沒有對應的 `AnimatedBlock` 不要去補號**，那不是缺號。
 */

/** 這一場的名額與表上已經有的筆數，畫面上「還剩 3 個」就是這兩個數字相減。 */
const CAPACITY = 8;

/** 公開可讀的那一張。三種拿法都一樣，所以不進情境判斷。 */
const SESSION = '{ "id": 3, "date": "10/26 14:00", "capacity": 8 }';

const ROWS = [
  { who: '小美', phone: '0912-***-456', mine: true },
  { who: '阿豪', phone: '0933-***-781', mine: false },
  { who: 'Linda', phone: '0921-***-330', mine: false },
  { who: '老吳', phone: '0988-***-104', mine: false },
  { who: '小胖', phone: '0955-***-269', mine: false },
];

type CaseKey = 'guest' | 'member' | 'rpc';

const CASES: {
  key: CaseKey;
  tab: string;
  who: string;
  flow: string[];
  payload: string;
  screen: string;
  ok: boolean;
  note: string;
}[] = [
  {
    key: 'guest',
    tab: '沒登入的訪客，直接查表',
    who: '還沒登入的人打開預約頁',
    flow: ['場次那張表是公開的，日期與名額讀得到', '預約那張表的規則要求「是你自己的預約」，五列都不符合', '預約那一邊回來一個空的清單'],
    payload: '[]',
    screen: '頁面出得來，時段也列得出來，只有「還剩幾個」印不出來',
    ok: false,
    note: '他手上的預約是零筆，不是五筆。從零筆推不出「已經被預約五個」。',
  },
  {
    key: 'member',
    tab: '登入的小美，直接查表',
    who: '小美登入之後打開同一頁',
    flow: ['場次照樣讀得到', '預約那張表放行她自己那一列，其餘四列濾掉', '回來一列，含姓名與聯絡方式'],
    payload: '[ { "id": 7, "who": "小美", "phone": "0912-***-456" } ]',
    screen: '前端數得出「1」，於是顯示還剩 7 個名額',
    ok: false,
    note: '規則是對的，它正確地只給了小美自己的資料。數字錯是因為總數本來就不該由前端算。',
  },
  {
    key: 'rpc',
    tab: '任何人呼叫只回數量的函式',
    who: '不管有沒有登入，呼叫那個函式',
    flow: ['場次照樣讀得到', '函式用建立者的權限執行，讀得到整張預約表，在裡面數完', '回來一個數字，明細不離開資料庫'],
    payload: '{ "taken": 5 }',
    screen: `頁面上顯示還剩 ${CAPACITY - ROWS.length} 個名額`,
    ok: true,
    note: '姓名與聯絡方式從頭到尾沒有離開資料庫。前端只知道一件事：已經被預約五個。',
  },
];

/**
 * 2026-11-01（講師：這一塊要補上更完整的教學）2026-11-01 先放在前一頁，同日搬來這裡（講師）。
 *
 * 前一頁那三行（卡在哪／怎麼做／代價）只到「請 Claude 做一個只回數量的函式」就停了，學員知道要做什麼，
 * 但**不知道那個東西叫什麼、怎麼開口、做完怎麼確認它沒有多給**，
 * 所以這一塊補的是這三件（D-6h：叫學員做一個操作，要給那個操作的名字）。
 *
 * 三件事不能拆開講：
 *   - 名字：資料庫函式，Supabase 後台的 Database Functions，前端那一行是 `rpc()`。
 *   - 關鍵設定：它要用建立者的權限執行（`security definer`），否則它一樣被 RLS 擋住，
 *     數到的還是「自己那幾筆」，等於沒做。
 *   - 代價：也因為它用建立者的權限跑，**從它回出去的東西不會再經過第二層的規則**，
 *     所以那個函式回什麼就等於開放什麼。少了最後這一句，學員會順手叫它多回一份名單。
 *
 * `COUNT_PROMPT` 是畫面上印的那一份，也是複製鈕拿到的那一份，不要各寫一次（A-4）。
 */
const COUNT_PROMPT =
  '這個預約網站的「還剩幾個名額」要顯示給所有人看，但 RLS 讓每個帳號只讀得到自己那幾筆，' +
  '前端加不出總數。請在資料庫裡做一個只回數量的函式：輸入是場次，輸出是那一場已經被預約的筆數，' +
  '用建立者的權限執行，不要回任何一列明細。做完告訴我前端要怎麼呼叫它，' +
  '以及我要怎麼自己確認它只回得出數字。';

/**
 * 收尾三條。2026-11-01（講師：這裡有點凌亂）從一塊三段粗體開頭的文字改成三張並排的卡：
 * 原本三段長短不一、每段都用粗體起頭，讀起來像三個標題黏在一起。
 * **每張卡的第一行是那一條的名字，第二行一句說明**，長度盡量接近，不要再長回段落。
 */
const TAKEAWAYS = [
  {
    k: '前端拿不到的，它就算不出來',
    v: '要一個它看不到的總數，只有兩條路：把整張表開放給它，或是讓資料庫算完只回答案。',
  },
  {
    k: '表跟表的開放程度不一樣',
    v: '場次這種本來就要給所有人看，公開讀；有姓名與聯絡方式的那一張，靠規則擋。分不清楚就問一句：這張表裡有沒有別人的個資。',
  },
  {
    k: '函式回什麼，就等於開放什麼',
    v: '它用建立者的權限跑，從它出去的東西不會再經過那條規則。每多回一個欄位，都是你自己決定要開放的。',
  },
];

/** 按下一步會自動走過三種拿法；講者點上面那三顆可以手動覆蓋（A-2）。 */
function autoByStep(step: number): CaseKey {
  if (step >= 4) return 'rpc';
  if (step >= 3) return 'member';
  return 'guest';
}

export default function SlideCase3CountFlow() {
  const { currentStep } = useSlide();
  const [picked, setPicked] = useState<CaseKey | null>(null);
  const active = picked ?? autoByStep(currentStep);
  const c = CASES.find((x) => x.key === active) ?? CASES[0];

  /** 那一列這一次看不看得到。函式那一格三種都算「進到數量裡」，所以另外判斷。 */
  const rowVisible = (mine: boolean) => (active === 'member' ? mine : false);

  return (
    <SlideLayout
      title="直接查表與呼叫函式：前端各拿得到什麼"
      subtitle="Case 03 · 還剩幾個名額，誰來算"
      icon={GitCompareArrows}
      updated={{ date: '2026/11/01', kind: '新增' }}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-400 text-base leading-relaxed">
          一個預約頁要用到兩張表：公開的場次，與規則擋著的預約。同一條規則，換三種拿法。
          <strong className="text-slate-200">右邊印的是前端真的收到的東西</strong>，
          拿它對一下你自己的專案：你的前端現在手上有幾列。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

          <div className="flex flex-wrap gap-2 mb-4">
            {CASES.map((x) => (
              <button
                key={x.key}
                type="button"
                onClick={() => setPicked(x.key)}
                aria-pressed={x.key === active}
                className={`rounded-lg border px-3 py-1.5 text-sm cursor-pointer transition-colors ${
                  x.key === active
                    ? 'border-sky-500/50 bg-sky-500/10 text-sky-100'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {x.tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* 左：公開的那一張，再來是要靠規則擋的那一張 */}
            <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-slate-500">
                <Unlock aria-hidden="true" size={13} className="shrink-0" />
                sessions（場次，公開可讀）
              </div>
              <code className="block rounded-lg border border-slate-900 bg-slate-950 px-3 py-1.5 font-mono text-sm text-slate-300 break-all">
                {SESSION}
              </code>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                時段與名額是公開資料，三種拿法都讀得到。
                <strong className="text-slate-400">沒登入的人打開頁面看得到時段</strong>，看不到的是底下那張表。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-slate-500">
                <Database aria-hidden="true" size={13} className="shrink-0" />
                reservations（預約，規則擋著）已有 {ROWS.length} 筆
              </div>
              <ul className="space-y-1">
                {ROWS.map((r) => {
                  const seen = rowVisible(r.mine);
                  return (
                    <li
                      key={r.who}
                      className={`flex flex-wrap items-baseline gap-x-3 rounded-lg border px-3 py-1.5 font-mono text-sm ${
                        seen
                          ? 'border-sky-500/40 bg-sky-500/10 text-sky-100'
                          : 'border-slate-900 bg-slate-950 text-slate-600'
                      }`}
                    >
                      <span className="w-12 shrink-0">{r.who}</span>
                      <span className="flex-1 min-w-0">{r.phone}</span>
                      <span className="shrink-0 text-xs">
                        {active === 'rpc' ? '數進去了' : seen ? '前端看得到' : '被規則濾掉'}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-slate-500 text-sm leading-relaxed mt-2">
                {active === 'rpc'
                  ? '五列都被數過一次，但數完就留在資料庫裡。'
                  : '這五列一直都在，差別只在這一次的請求拿得到哪幾列。'}
              </p>
            </div>
            </div>

            {/* 右：這一次的走法與回傳 */}
            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-slate-500">
                  <MonitorSmartphone aria-hidden="true" size={13} className="shrink-0" />
                  {c.who}
                </div>
                <ul className="space-y-1">
                  {c.flow.map((f, i) => (
                    <li key={f} className="flex items-baseline gap-2 text-sm leading-relaxed text-slate-300">
                      <ChevronRight aria-hidden="true" size={13} className="shrink-0 translate-y-0.5 text-slate-600" />
                      <span className="flex-1 min-w-0">{f}</span>
                      <span className="shrink-0 font-mono text-xs text-slate-600">{i + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`rounded-xl border p-3 ${
                  c.ok ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/30 bg-rose-500/5'
                }`}
              >
                <div
                  className={`mb-1.5 text-xs font-mono uppercase tracking-wider ${
                    c.ok ? 'text-emerald-300' : 'text-rose-300'
                  }`}
                >
                  回到前端的東西
                </div>
                <code className="block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-200 break-all">
                  {c.payload}
                </code>
                <p className="text-slate-300 text-sm leading-relaxed mt-2">{c.screen}</p>
                <p className="text-slate-400 text-sm leading-relaxed mt-1.5 border-t border-slate-800 pt-1.5">
                  {c.note}
                </p>
              </div>
            </div>

          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-base font-bold text-slate-100 mb-2">那個只回數量的函式，怎麼請 Claude 做</h3>
          <ul className="space-y-1.5 mb-3">
            <li className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
              <span className="w-20 shrink-0 font-bold text-slate-300">它叫什麼</span>
              <span className="flex-1 min-w-0 text-slate-400">
                資料庫函式。Supabase 後台的選單上是 Database Functions，前端呼叫它的那一行寫{' '}
                <code className="font-mono text-slate-300">rpc(&apos;函式名稱&apos;)</code>。
                知道名字你才搜得到，也才講得出口。
              </span>
            </li>
            <li className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
              <span className="w-20 shrink-0 font-bold text-slate-300">關鍵設定</span>
              <span className="flex-1 min-w-0 text-slate-400">
                它要設定成<strong className="text-slate-200">用建立者的權限執行</strong>
                （設定上的字是 <code className="font-mono text-slate-300">security definer</code>），
                這樣它才讀得到整張表。少了這一項，它一樣被第二層擋住，數到的還是你自己那幾筆。
              </span>
            </li>
            <li className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
              <span className="w-20 shrink-0 font-bold text-slate-300">怎麼驗</span>
              <span className="flex-1 min-w-0 text-slate-400">
                登出之後再打開那一頁，數字要跟你登入時看到的一樣，這表示它不是靠你的帳號算出來的。
                然後看它回來的內容，裡面只有一個數字，沒有姓名也沒有聯絡方式。
              </span>
            </li>
          </ul>
          <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 mb-3">
            <div className="mb-1.5 font-mono text-xs uppercase tracking-wider text-slate-500">
              Prompt　可以直接貼的那一段
            </div>
            <p className="text-sky-200 text-sm leading-relaxed">{COUNT_PROMPT}</p>
            <CopyAction text={COUNT_PROMPT} className="mt-2" />
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TAKEAWAYS.map((t) => (
            <div key={t.k} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-100 text-sm font-bold mb-1.5">{t.k}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{t.v}</p>
            </div>
          ))}
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
