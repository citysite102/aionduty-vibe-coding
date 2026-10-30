import { ClipboardList, ChevronRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元「撰寫測試」的第二頁：拿一個專案把三種測試各舉幾個實例。2026-10-27 新增。
 *
 * 加這一頁的理由：前一頁講完三種類型與各自抓的壞法，學員還是分不出手上這件事該寫哪一種
 * （講師回饋）。定義聽得懂，對到自己的東西上就停住，所以這裡補一組對得上的實例。
 *
 * **主例刻意不用計時器。** 計時器在這個時間點還沒有資料庫也沒有登入，整合與端對端那兩欄
 * 會舉不出像樣的例子（硬舉就變成「按開始、看秒數變了」那種一看就不需要測試的東西）。
 * 報名表單是辦公室的人都看過的東西，而且三層剛好各有真的會出事的地方：
 * 名額算錯、資料沒進去、流程走不完。
 *
 * 三欄一律灰階（A-1：平等的項目不給顏色），sky 只出現在最後那個 Callout。
 * 欄名旁邊曾經標著「抓算錯／抓接不起來／抓走不完」，前一頁的小標已經講過同一組詞，
 * 2026-10-28 拿掉。
 *
 * **「名額」這件事刻意在三欄各出現一次**，那是這一頁最主要的教學點：
 * 算出來的數字是單元（扣到 0 就停住）、真的寫進資料庫是整合（名額真的少 1）、
 * 按鈕按不下去是端對端（滿了之後送不出去）。同一個概念切在三層，界線才指得出來。
 * 第一條原本寫「名額剩 0 的時候，再報一個不會變成 -1」，講師指出「再報一個」是整個
 * 報名動作、要碰資料庫，那是整合不是單元。**改這三條之前先確認它真的不碰資料庫。**
 *
 * 這一欄三條都寫成「動詞＋對象：那個最容易錯的邊界」，形狀一致才看得出它們的共同點：
 * 給一個輸入、算出一個結果，不碰別的東西。原本寫成「3/31 當天報名算 8 折」那種業務規則的
 * 語氣，讀起來像規格不像檢查。
 *
 * **早鳥折扣那一條 2026-10-28 整條拿掉**：講師問「折扣應該有連 API 吧」，而那正是問題所在。
 * 折扣規則寫死在前端就是單元測試，從 API 或資料庫拿就是整合，而學員從這一句看不出是哪一種。
 * 例子自己說不清楚自己在哪一層，它就教不了分層。**挑例子的標準：讀的人要一眼看得出它不碰外面。**
 * 專案描述裡的「早鳥價到 3/31」同日一起拿掉，沒有任何一條用到它。
 *
 * 2026-10-28 把「算剩餘名額：扣到 0 就停住，不會算出 -1」從單元那一欄拿掉，改成底下那個
 * amber 的反例。講師問「這算單元測試嗎」，查下去不算，而且錯得比折扣那條嚴重：
 * 名額的真正答案在資料庫裡，同一秒兩個人送出、各自拿自己看到的數字去減就會算出 -1。
 * 替一個 clamp 函式寫單元測試會全綠，線上照樣超賣，那正是案例三〈兩個人同時搶最後一個
 * 名額〉教的事。把它留在單元那一欄等於教學員用錯誤的方式安心。
 *
 * 所以這一欄現在三條都是「送出之前，畫面自己就知道」的事（必填、格式、整理），
 * 那是這一欄真正的身分。**要往這一欄加東西，先問它需不需要問別人。**
 *
 * 2026-10-28 第三條再換一次。曾經寫「組確認信的內容：姓名有填進去⋯」，想做第二組跨層
 * 對照（內容組得對不對是單元、真的寄得出去是整合），但講師反映「組⋯的內容」太抽象：
 * 動作本身看不到東西。改成整理電話號碼，輸入與輸出都印在那一行上。
 * 跨層對照留「名額」那一組就夠，一頁示範一次。
 *
 * Callout 第一題的「不用**真的**開一個瀏覽器」那兩個字不要拿掉：前端也有單元測試，
 * 它把畫面渲染在記憶體裡的假 DOM 上，不會開視窗。少了「真的」，寫過前端測試的人會覺得這條是錯的。
 *
 * 每一欄的條數刻意是 3／3／2：端對端比較少本來就是這一段要教的事，不要為了對齊補到三條。
 */

const PROJECT = '線上活動報名：填表單送出、名額 20 人搶完為止、報名成功寄一封確認信。';

/**
 * 超賣那一格的兩條路。兩列一模一樣是刻意的：**錯不在某一邊算錯**，
 * 兩邊各自都算對了，錯在它們讀到的是同一個還沒被更新的數字。
 * 文字版講過兩次都講不清楚（講師 2026-10-30 回報），所以改成並排的兩條路，
 * 一眼看得到「兩列的第一格一樣」。膠囊一律灰階，紅色留給底下那一行結果。
 */
const RACE = [
  { who: '使用者 A', steps: ['讀到「剩 1 個」', '算 1 − 1 = 0', '寫回 0'] },
  { who: '使用者 B', steps: ['讀到「剩 1 個」', '算 1 − 1 = 0', '寫回 0'] },
];

const LAYERS = [
  {
    name: '單元測試',
    items: [
      '檢查必填：姓名留空就擋下來',
      '檢查信箱格式：沒有 @ 的擋下來',
      '整理電話：0912345678 排成 0912-345-678',
    ],
  },
  {
    name: '整合測試',
    items: [
      '按下送出，資料庫多一筆，名額少 1',
      '同一個信箱報第二次，被擋下來',
      '寄信的服務掛掉時，報名不會跟著不見',
    ],
  },
  {
    name: '端對端（E2E）',
    items: [
      '填完送出、看到成功畫面，重新整理資料還在',
      '名額滿了之後，送出鈕真的按不下去',
    ],
  },
];

/**
 * 由上往下問，答得出「是」就停在那一層。第一條的「真的」兩個字不要拿掉，理由見檔頭。
 */
const ASK = [
  { q: '不用真的開一個瀏覽器、也不用真的連資料庫就驗得出來', answer: '單元測試' },
  { q: '要碰到資料庫或另一個服務才知道', answer: '整合測試' },
  { q: '要照使用者的順序走完一整遍才看得出來', answer: '端對端（E2E）' },
];

export default function SlideTestExample() {
  return (
    <SlideLayout
      title="範例：報名表單的三種測試"
      subtitle="One Project, Three Layers"
      icon={ClipboardList}
    >
      <div className="max-w-6xl mx-auto space-y-1.5 pb-0">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-sm leading-relaxed px-1">
          {PROJECT}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAYERS.map((l) => (
            <div key={l.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-2.5">
              <h3 className="text-base font-bold text-slate-100 mb-2">{l.name}</h3>
              <ul className="space-y-1">
                {l.items.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300 text-sm leading-relaxed"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AnimatedBlock>

        {/*
          Mock 掛在三欄底下、而不是前一頁的整合測試卡上，因為右邊那一欄的
          「寄信的服務掛掉時」這一條，不給替身就寫不出來，學員的疑問正好在這裡冒出來。
          **不要搬到 Slide 32**：那一頁沒有具體的外部服務可以指，而且它已經沒有高度了。
          寫法比照覆蓋率與迴歸測試：粗體名詞加括號英文、一句定義、一句它用來驗什麼。
        */}
        <AnimatedBlock stepIndex={3} as="p" className="text-slate-400 text-sm leading-relaxed px-1">
          整合測試碰到別人的服務（寄信、付款）時不會真的送出去，改用一個
          <strong className="text-slate-200">假的替身（Mock）</strong>，只驗有沒有被呼叫、內容對不對。
        </AnimatedBlock>

        <Callout tone="warn" label="名額為什麼不在單元測試那一欄" stepIndex={4}>
          剩 1 個位子的時候，同一秒兩個人都按下送出：
          <span className="mt-1 mb-1 block space-y-1">
            {RACE.map((r) => (
              <span key={r.who} className="flex flex-wrap items-center gap-x-1 gap-y-1">
                <span className="w-20 shrink-0 text-slate-500 text-sm">{r.who}</span>
                {r.steps.map((s, i) => (
                  <span key={s} className="flex items-center gap-1">
                    {i > 0 && (
                      <ChevronRight aria-hidden="true" size={13} className="shrink-0 text-slate-600" />
                    )}
                    <span className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-0.5 text-slate-300 text-sm">
                      {s}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </span>
          <strong className="text-slate-100">兩邊都算對了，兩個人也都報名成功，名額卻只扣掉 1。</strong>
          「剩幾個」要問資料庫才知道，這種事都是整合測試。
        </Callout>

        <Callout tone="focus" label="我們可以如何區別？" stepIndex={5}>
          <span className="block">
            {ASK.map((q) => (
              <span key={q.answer} className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-slate-300">{q.q}</span>
                <ChevronRight aria-hidden="true" size={13} className="shrink-0 self-center text-slate-600" />
                <strong className="text-slate-100">{q.answer}</strong>
              </span>
            ))}
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
