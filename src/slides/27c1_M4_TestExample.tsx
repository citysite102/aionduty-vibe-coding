import { ClipboardList } from 'lucide-react';
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

const PROJECT = '線上活動報名：填表單送出、名額 20 人、報名成功寄一封確認信。';

const LAYERS = [
  {
    name: '單元測試',
    items: [
      '算剩餘名額：扣到 0 就停住，不會算出 -1',
      '檢查信箱格式：沒有 @ 的擋下來',
      '整理電話：0912345678 排成 0912-345-678，少一碼擋下來',
    ],
  },
  {
    name: '整合測試',
    items: [
      '按下送出，資料庫真的多一筆，名額真的少 1',
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

export default function SlideTestExample() {
  return (
    <SlideLayout
      title="一個報名表單，哪幾件事各寫哪一種測試"
      subtitle="One Project, Three Layers"
      icon={ClipboardList}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            <span className="text-slate-500">這個專案：</span>
            {PROJECT}
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LAYERS.map((l) => (
            <div key={l.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="text-base font-bold text-slate-100 mb-3">{l.name}</h3>
              <ul className="space-y-2">
                {l.items.map((t) => (
                  <li
                    key={t}
                    className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-300 text-sm leading-relaxed"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </AnimatedBlock>

        <Callout tone="focus" label="換成你的東西要怎麼分，問兩題" stepIndex={3}>
          第一題，不用真的開一個瀏覽器、也不用真的連資料庫就驗得出來嗎？是，就是單元測試。
          不是的話問第二題：要碰到資料庫或另一個服務才知道，整合測試；
          <strong className="text-slate-100">要照使用者的順序走完一整遍才看得出來</strong>，端對端。
        </Callout>

      </div>
    </SlideLayout>
  );
}
