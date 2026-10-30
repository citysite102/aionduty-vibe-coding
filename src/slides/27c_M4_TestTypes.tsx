import { motion } from 'motion/react';
import { FlaskConical, Boxes, Plug, MousePointerClick, Check, ChevronRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元「撰寫測試」的第一頁。2026-10-27 新增，講師盤點時發現的缺口：
 * 全片教得到「完成條件要寫得可驗」與「叫它自己開瀏覽器點一次」，
 * 但**測試的種類一次都沒有出現過**（單元、整合、E2E，掃全片命中都是 0）。
 *
 * 2026-10-27 同日從章節七的 Loop 實作後面搬到章節三，接在〈Git 版本控制〉後面：
 * 它跟紅字、API、資料庫一樣是軟體基礎，而且學員從這裡開始就會一直改東西，改了就需要知道怎麼確認沒壞。
 * 排在 Git 後面是同一天講師定的順序：Git 管的是「上一版還在不在」，測試管的是「這一版有沒有壞」。
 * **搬過來之後例子全部換過**：原本用案例三的名額與案例四的船吃水，那是章節七才出現的東西。
 * 現在三個例子都只用章節三已經講過的：計時器的秒數、前端送到資料庫、使用者在瀏覽器上的一連串動作。
 * 要再加例子，先確認那件事在章節三之前就講過。
 *
 * 2026-10-27 補了一句「挑哪一種」的判斷（講師指出學員看完三張卡仍然不知道手上這件事該寫哪一種）。
 * 三個例子刻意跟底下三張卡的 example 同一件事，不要各寫一套，否則學員要自己對兩次。
 *
 * **只講這三種，不要補效能、資安、煙霧、回歸那些。** 這三種是「驗的範圍」的三個級距，
 * 其餘那幾類分的是目的，兩套分類混在同一頁，學員會以為有六七種要學。
 *
 * 2026-10-30 標題換成〈單元測試、整合測試與 E2E 測試〉（講師：原本那個太 AI）。
 * 原本是〈測試從關鍵路徑開始：單元、整合、E2E〉，毛病是 D-5 那條「把承諾寫進標題」：
 * 「從哪裡開始」是這一頁要證明的事，不是它有什麼。現在的標題直接列出頁面上真的有的三張卡。
 * **關鍵路徑沒有被降級**，它還是第一個區塊、還是三種類型掛上去的那條線（見下一段），
 * 只是它屬於內文不屬於標題。改標題要同時改四個地方：這裡、`App.tsx` 的 `LIVE_TITLES`、
 * `courseUnits.ts` 的 `anchor`（這一頁是單元 3-6 的起點）、逐字稿的 `## Slide 32｜` 小標。
 *
 * **這一頁的內容重點是關鍵路徑（Critical Path），三種類型是它底下的工具。** 2026-10-27 改過一次：
 * 原本開場是「改到第五個、第十個，前面那九件你不會每次都重點一遍」那段動機，
 * 講的是學員的經歷不是這一頁的內容（D-2），整段退回口白。畫面上換成關鍵路徑那一塊：
 * 先給關鍵路徑的定義與計時器那條實際的路，三種類型再掛到那條路的每一步上。
 * 2026-10-30（講師）**順序翻過來了**：現在是先三張卡、再關鍵路徑。
 * 原本的理由是「先講三種再講挑哪條路，學員會以為三種是要三選一」，那條已經由小標接手：
 * 「三種測試的分工」本身就說了它們是分工不是三選一。翻過來換到兩個好處：
 * 關鍵路徑緊接著底下那個講 E2E 的 Callout（E2E 只寫關鍵路徑那幾步），
 * 兩塊講同一件事就不會被三張卡隔開。**不要再翻回去**，翻回去那個 Callout 就會指到上面兩塊之外。
 *
 * `CRITICAL_PATH` 那五步跟計時器專案實作那一支做出來的東西是同一個，換主例要兩邊一起換。
 *
 * **這一頁是滿的**（1483×812 的視窗剛好塞下，實機量過）。要再加東西之前先砍掉等量的字，
 * 不然 Callout 會掉到捲動範圍外面，而講者不會注意到。能砍的順序：三張卡的 `cost`、
 * `example`，最後才是示意動畫（動畫是裝飾，說明文字自己站得住）。
 *
 * 2026-10-27 卡片上面那一行本來是「哪一步寫哪一種」的對照（只算一個數字→單元⋯），
 * 講師指出它在重複三張卡自己就寫著的事，換成一行小標。同日再改一次：小標原本講
 * 「範圍一層比一層大」，但學員卡住的是「為什麼需要單元測試」，範圍回答不了那一題。
 * 現在三個詞對著三張卡的順序（算錯＝單元、接不起來＝整合、走不完＝端對端），
 * **改卡片順序要一起改這三個詞**。為什麼算錯最難發現，講在口白裡。
 *
 * 2026-10-30（講師：太 AI）兩個區塊小標再換一次，照 D-5 新增的那一節：
 *   「先測主要流程，不是全部都測」     → 「測試路徑如何選擇？」
 *   「三種測試各抓一種壞：算錯、接不起來、走不完」→ 「三種測試的分工」
 * 前者是 D-2 的對仗（「X，不是 Y」），後者把底下三張卡的內容先講了一遍。
 * 那三個詞原本只寫在小標裡，所以同一輪把它們移到三張卡自己的標題列上（`catches` 欄，
 * 印成「抓算錯」「抓接不起來」「抓走不完」）。**那是它們本來就該在的位置**：
 * 一張卡自己說得出它抓什麼，就不必先在上面列一遍。上面那一段「改卡片順序要一起改
 * 這三個詞」改成：改卡片順序時 `catches` 跟著那張卡走，不會再對錯。
 *
 * 同一輪 Callout 的 label 從「三種一起用，但端對端只寫關鍵路徑」改成「E2E 的路徑選擇」。
 * 原本的前半句是對仗，而且「三種一起用」底下那一段沒有講。
 *
 * 關鍵路徑那一段的定義也在同一輪換成講師的版本：先給名詞（產品流程的核心步驟），
 * 再講它斷掉長什麼樣（流程打不通、啟動不了、資料存不進去），最後用「舉例來說：」
 * 帶到計時器那一列膠囊。**原本的「使用者走不通就等於這個東西沒用的那條路」是把定義
 * 寫成條件句，而「不是顏色不對」是對仗**；結尾那句「這五步斷掉任何一步，計時器
 * 就不是計時器了」退回口白，它在畫面上重複了膠囊自己就看得到的事。
 *
 * 三張卡各有一段會一直跑的示意動畫，它們是這一頁的主要說明方式：
 *   單元＝一進一出、整合＝兩塊之間的往返、E2E＝游標照順序點過去。
 * 動畫是裝飾不是內容，說明文字自己要站得住（關掉動畫也讀得懂）。
 */

/** 單元測試：一顆點進盒子，出來變成打勾。輸入 → 一個算式 → 預期的結果 */
function UnitAnim() {
  return (
    <div className="relative h-12 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between px-3">
      <span className="font-mono text-xs text-slate-500">輸入</span>
      <div className="h-7 w-16 rounded-md border border-slate-700 bg-slate-900" />
      <span className="font-mono text-xs text-slate-500">結果</span>
      <motion.div
        className="absolute left-10 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-slate-400"
        animate={{ x: [0, 46, 92], opacity: [1, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', times: [0, 0.55, 1] }}
      />
      <motion.div
        className="absolute right-12 top-1/2 -translate-y-1/2 text-emerald-400"
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.6, 0.72, 0.92, 1] }}
      >
        <Check aria-hidden="true" size={14} />
      </motion.div>
    </div>
  );
}

/** 整合測試：前端送一筆出去，資料庫那一格的數字真的少一個 */
function IntegrationAnim() {
  return (
    <div className="relative h-12 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between px-3">
      <span className="rounded border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-xs text-slate-400">
        前端
      </span>
      <motion.div
        className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-sky-400"
        animate={{ x: [-44, 44, 44, -44], opacity: [1, 1, 0.3, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.6, 1] }}
      />
      <span className="relative rounded border border-sky-500/40 bg-sky-500/10 px-2 py-1 font-mono text-xs text-sky-300">
        資料庫
        <motion.span
          className="absolute -top-4 right-0 font-mono text-xs text-sky-300"
          animate={{ opacity: [0, 0, 1, 0], y: [2, 2, -4, -8] }}
          transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.42, 0.6, 1] }}
        >
          -1
        </motion.span>
      </span>
    </div>
  );
}

/** 端對端：游標照使用者的順序點過三個地方，最後整頁打勾 */
function E2EAnim() {
  return (
    <div className="relative h-12 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
      <div className="flex gap-1.5 mb-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
      </div>
      <div className="flex items-center gap-2">
        {['填', '送', '看'].map((t) => (
          <span
            key={t}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-0.5 font-mono text-xs text-slate-500"
          >
            {t}
          </span>
        ))}
      </div>
      <motion.div
        className="absolute left-4 top-7 text-slate-300"
        animate={{ x: [0, 34, 68, 68], y: [0, 0, 0, 0], opacity: [1, 1, 1, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.6, 1] }}
      >
        <MousePointerClick aria-hidden="true" size={14} />
      </motion.div>
    </div>
  );
}

const CRITICAL_PATH = ['選一個任務', '按開始', '倒數到 0', '存成一筆紀錄', '重開還看得到'];

const KINDS = [
  {
    icon: Boxes,
    name: '單元測試',
    catches: '算錯',
    en: 'Unit',
    anim: UnitAnim,
    what: '一個算式、一條規則，單獨拿出來就驗得完',
    example: '倒數剩 0 秒不會變成負數；折扣算出來的金額對不對',
    cost: '最快。一秒幾十條，不碰瀏覽器與資料庫',
  },
  {
    icon: Plug,
    name: '整合測試',
    catches: '接不起來',
    en: 'Integration',
    anim: IntegrationAnim,
    what: '兩塊接起來之後，資料有沒有真的動',
    example: '前端按下送出，資料庫真的多一筆；名額真的少一個',
    cost: '中等。資料要先準備好，跑完還要清掉',
    key: true,
  },
  {
    icon: MousePointerClick,
    name: '端對端（E2E）',
    catches: '走不完',
    en: 'End-to-End',
    anim: E2EAnim,
    what: '真的開一個瀏覽器，照使用者的步驟走一次',
    example: '填表單、按送出、看到成功畫面，重新整理資料還在',
    cost: '最慢。一條幾秒到幾十秒',
  },
];

export default function SlideTestTypes() {
  return (
    <SlideLayout
      title="單元測試、整合測試與 E2E 測試"
      subtitle="Unit, Integration, End-to-End"
      icon={FlaskConical}
    >
      <div className="max-w-6xl mx-auto space-y-2 pb-0">

        <AnimatedBlock stepIndex={1} className="space-y-2">
          <h3 className="text-base font-bold text-slate-100">三種測試的分工</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KINDS.map((k) => (
              <div
                key={k.name}
                className={`rounded-2xl border p-4 ${
                  k.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
                }`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <k.icon
                    aria-hidden="true"
                    size={16}
                    className={`shrink-0 self-center ${k.key ? 'text-sky-400' : 'text-slate-500'}`}
                  />
                  <h3 className={`text-base font-bold ${k.key ? 'text-sky-200' : 'text-slate-100'}`}>
                    {k.name}
                  </h3>
                  <span className="shrink-0 text-sm text-slate-500">抓{k.catches}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-slate-600">{k.en}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">{k.what}</p>
                <k.anim />
                <p className="mt-3 border-t border-slate-800 pt-2 text-slate-400 text-sm leading-relaxed">
                  例：{k.example}
                </p>
                <p className="mt-1.5 text-slate-500 text-sm leading-relaxed">{k.cost}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-base font-bold text-slate-100 mb-1">測試路徑如何選擇？</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            產品流程的核心步驟叫
            <strong className="text-slate-100">關鍵路徑（Critical Path）</strong>，
            它斷掉的樣子是流程打不通、啟動不了、資料存不進去。舉例來說：
          </p>
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
            <span className="mr-2 text-slate-500 text-sm">計時器的關鍵路徑</span>
            {CRITICAL_PATH.map((step, i) => (
              <div key={step} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
                )}
                <span className="rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-1 text-sky-100 text-sm">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <Callout tone="focus" label="E2E 的路徑選擇" stepIndex={3}>
          E2E 一條跑幾秒到幾十秒，寫滿二十條，每次改完都要等好幾分鐘。
          <span className="block mt-1.5">
            <strong className="text-slate-100">Flaky Test</strong>
            ：程式碼一個字都沒改，這次過、下次不過。E2E 最容易出這個，原因幾乎都是等待沒寫對。
          </span>
          <span className="block mt-1.5 text-slate-400">
            兩個做法：不要寫「等三秒」，要等那個東西真的出現；每一條自己準備資料，跑完自己清掉。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
