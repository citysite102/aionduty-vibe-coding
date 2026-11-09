import { FileSearch, Wrench, FlaskConical, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-6 第七頁。2026-11-09 新增。
 *
 * 來源：同日三輪 Codex 審查都把這一頁排在「一定要補」的第一位。理由是前面兩頁
 * （`28c3`、`28c3e`）教的都是**怎麼要一份報告**，而學員真正會卡住的是**報告回來之後**：
 * 它交出一份分級清楚、欄位齊全的東西，但沒有人教他怎麼判斷那一條是不是真的。
 * 「人工 Review」在 `28c3d` 的第四關只是一個方塊，這一頁把那個方塊攤開。
 *
 * ── 這一頁與前後三頁的分界（B-5，改之前先看）────────────────────
 *   `28c3`   第一輪只讀不改的審查，教它**要交出什麼**（結論只有四種、要給證據）
 *   `28c3e`  進階審查，教**報告要有哪些欄位**（Findings、Evidence、Coverage⋯）
 *   這一頁   拿到報告之後，**人要核對什麼、怎麼分流**
 *   `28c3c`  它被允許做哪些事（權限邊界）
 * **這一頁不要再列工具，也不要再給第三段 Prompt。** 它唯一的新東西是「人做的那一步」。
 *
 * ── 那筆發現是示意的，畫面上要標 ────────────────────────────
 * 卡片左上角寫著「示意」，**不要拿掉**：它是為了教欄位怎麼讀而寫的，不是真的掃出來的結果。
 * 四行的順序（等級／證據／成立條件／驗證狀態）對應 `28c3e` STEP 5 的 Findings 與 Evidence，
 * 兩邊要一起改。刻意挑一條「High 但還沒驗證」的，因為那正是最容易被當成已確認的那一種。
 *
 * ── 收尾那一塊 2026-11-09 整個移除（講師），不要加回來 ────────────────
 * 被移掉的是〈有人問「這樣可以上線嗎」，你交得出去的是這種句子〉那一段示範句
 * （十類查了八類、三條發現兩條修好一條待驗證、正式環境沒查），以及底下那行
 * 「『報告說沒問題』不是這種句子」。
 * 它原本接的是 `28c3` 的「沒有通過這個選項」，**那一句還在 `28c3` 的頁尾**，
 * 這條線沒有斷，只是不在這一頁收第二次。
 * 這一頁現在收在三格分流上，職務單純：拿到報告之後人要核對什麼、怎麼分流。
 *
 * ── 2026-11-09 四個核對動作掛回上面那張卡 ─────────────────────
 * 病根：四件事與那張卡是上下兩塊，**核對哪一欄要學員自己對**，而這一頁教的就是核對本身。
 * 現在四個動作可以點，點下去那張卡只留它問的那一欄，其餘四行降成灰階。
 * 對應寫在 `CHECKS` 的 `fields`，值就是 `FINDING` 的欄名，**改欄名兩邊一起改**。
 * 第三條〈結論有沒有超出證據〉掛兩欄（等級與成立條件）：等級是結論，成立條件是撐住它的東西，
 * 核對的時候要一起看，分開看就只剩一個級別標籤。
 *
 * ── 2026-11-09 互動方向整個翻過來：卡片才是控制項（講師）──────────────
 * 這一塊同日改過兩版，**第二版才是現在這個，不要退回第一版**：
 *   第一版：卡片在上、四條核對在下，**點的是核對、變的是卡片**。
 *           控制項在下、被控制的在上，眼睛要往回看。
 *   第一版半：把四條核對搬到卡片上面。互動方向修好了，**但教學方向反了**——
 *           「位置對得上嗎」在還沒看到任何一筆發現之前就要先讀，那四條是空的。
 *   現在：   卡片回到上面，而且**卡片的四行變成可以點的**；四條核對在下面跟著亮。
 *           對象在上、方法在下，互動方向與閱讀方向同時成立。
 *
 * 另外兩件同時解掉的：
 *   1. 兩塊曾經分在 `stepIndex` 2 與 3，講者按到第一步時畫面上有可以點的東西、
 *      但被它控制的那一塊還沒出現，那一拍是空的。現在控制項自己就是先出現的那一塊。
 *   2. 舊版同一個手勢做兩件事（點前三條是某一欄亮起來，點第四條是整張卡暗掉＋跳虛線框），
 *      第四次點下去會以為壞了。現在第四條的說明是**常駐**的 `note`，沒有驚喜狀態。
 *
 * `CHECKS` 的 `fields` 現在是反過來用的：點了卡片上的某一欄，`fields` 包含它的那一條才亮。
 * `fields` 是空的那一條（哪些沒被涵蓋）因此**點任何一欄都不會亮**，那正是它的教學點：
 * 一筆發現回答不了「這次沒查什麼」。常駐的 `note` 就是在講這件事，**不要刪**。
 *
 * ── 2026-11-09 中間那格分流掛回那張示意卡（`tie`）─────────────────
 * 病根：那張卡**刻意挑一條「High 但還沒驗證」的**（見上面那一段），所以它的正確分流
 * 就是〈還在待驗證〉那一格；但畫面上示意卡、四個核對、三格分流、底下那句示範句
 * 是四塊各自獨立的東西，學員看完不知道剛才那一筆該走哪一格，整條線斷在這裡。
 * 現在中間那格多一句，把它接回去，底下示範句裡的「一條還在待驗證」也才對得上。
 * 只有中間那格有 `tie`，**另外兩格不要硬加**，它們在這張卡上沒有對象。
 *
 * ⚠ 第四條〈哪些沒被涵蓋〉的 `fields` 是空的，**不要為了四條都有對象去硬湊一欄**。
 * 它在單獨一筆發現上本來就沒有對象，那是 `28c3e` STEP 5 第 7 項 Coverage & Limitations
 * 的事。點它的時候四行一起降灰、底下出現一條虛線說明，**那個「對不到」就是這一條的教學點**：
 * 一張欄位齊全的發現卡，回答不了「這次沒查什麼」。
 *
 * 預設（`pick` 是 `null`）四行全亮，就是沒有互動時的樣子，PDF 與講義不受影響。
 * A-2：預設不需要推，所以沒有用 `currentStep` 算；純靠點的先例見 `30_Cheat_Perms`。
 * 畫面上**不要寫「點一下看對應欄位」**（D-2 課務與操作交代），可點靠 hover 的 sky 邊框表示。
 *
 * 用色：amber（那筆發現）＋ sky（四個核對動作）兩種（A-1）。降灰用 slate，不新增色相。
 */

/** 示意用的一筆發現。欄位對應 `28c3e` 的 Findings 與 Evidence。
 *  欄名同時是 `CHECKS` 的 `fields` 指向的目標，**改這裡要回去改那裡**。 */
const FINDING = [
  ['等級', 'High（待驗證）'],
  ['證據', 'src/app/api/signups/route.ts:42，查詢只用網址上的 id，沒有比對登入者'],
  ['成立條件', '登入之後，把網址上的 id 換成別人的'],
  ['驗證狀態', '待驗證：只讀了程式碼，沒有實際打過那支 API'],
];

/** `fields` 是這一條要核對 `FINDING` 的哪幾欄。空陣列代表單獨一筆發現上沒有對象，見檔頭。 */
const CHECKS = [
  {
    k: '位置對得上嗎',
    fields: ['證據'],
    v: '打開它指的那個檔案、那幾行，看那段程式碼真的在做它說的事。指不出位置的，先當成還沒成立。',
  },
  {
    k: '工具真的跑過嗎',
    fields: ['驗證狀態'],
    v: '報告要寫出跑了哪個工具、掃了哪些路徑。只有結論、沒有執行紀錄的，先當成工具還沒跑過，請它補上紀錄。',
  },
  {
    k: '結論有沒有超出證據',
    fields: ['等級', '成立條件'],
    v: '「未發現問題」要能說出它實際檢查了什麼。讀原始碼讀不出來的事，不能寫成已經確認。',
  },
  {
    k: '哪些沒被涵蓋',
    fields: [],
    v: '正式環境的設定、外部服務、實際的權限與告警，都要另外看。這一欄沒寫，就是這份報告還缺一塊。',
    note: '這一條在單獨一筆發現上找不到對象：這次查了哪些、哪些沒查，要看報告最後那一段（報告裡叫 Coverage & Limitations）。',
  },
];

const ACTIONS = [
  {
    icon: Wrench,
    k: '已驗證，而且影響大',
    v: '先修這一條，修完針對它重測一次，並記下重測的方式。',
  },
  {
    icon: FlaskConical,
    k: '還在待驗證',
    v: '在隔離的測試環境用測試資料驗一次，確認成立再排修復。',
    /** 上面那筆示意發現走的就是這一格，**不要刪**，理由見檔頭。
     *  刻意不寫「上面那一筆」：那是位置代稱（D-2），直接講它的驗證狀態，
     *  學員才知道是憑哪一欄判斷的。 */
    tie: '只讀了程式碼、沒有實際打過那支 API 的那一條，就走這一格。',
  },
  {
    icon: UserCheck,
    k: '自己判斷不了，又碰到敏感資料',
    v: '交給有資格的人看，並且先把影響範圍限縮住。',
  },
];

export default function SlideShipTriage() {
  /** 卡片上被點的那一欄（欄名）。`null` 是預設，也就是四條核對全亮的原樣。 */
  const [pick, setPick] = useState<string | null>(null);
  /** 這一條核對現在要不要保持原本的對比。沒點就全亮；點了就只留對得上的那一條。 */
  const lit = (c: (typeof CHECKS)[number]) => pick === null || c.fields.includes(pick);

  return (
    <SlideLayout
      title="怎麼讀 Agent 交回來的安全報告"
      subtitle="Triage the Findings"
      icon={FileSearch}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          報告的格式完整，不代表裡面那一條成立。
          <strong className="text-slate-100">先核對證據，再決定要動哪一條。</strong>
        </AnimatedBlock>

        {/* 卡片是控制項：讀一筆真的發現，點它的某一欄，底下那四條就告訴你這一欄怎麼核對。 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-3.5">
          <div className="flex items-baseline gap-2">
            <span className="rounded border border-amber-500/40 px-1.5 font-mono text-xs text-amber-300">示意</span>
            <h3 className="text-base font-bold text-slate-100">一般會員可能讀到其他人的報名資料</h3>
          </div>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-0.5 md:grid-cols-2">
            {FINDING.map(([k, v]) => {
              const on = pick === k;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPick(on ? null : k)}
                  className={`flex cursor-pointer gap-2 rounded-lg border px-2 py-1 text-left text-sm leading-relaxed transition-colors ${
                    on ? 'border-amber-500/40 bg-amber-500/10' : 'border-transparent hover:border-amber-500/30'
                  }`}
                >
                  <span className="w-16 shrink-0 pt-0.5 text-xs text-amber-300/80">{k}</span>
                  <span className="min-w-0 text-slate-300">{v}</span>
                </button>
              );
            })}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <h3 className="mb-1.5 text-base font-bold text-slate-100">這四件事，你要自己對一遍</h3>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
            {CHECKS.map((c, i) => (
              <li key={c.k} className="flex min-w-0 gap-2.5 text-sm leading-relaxed transition-colors">
                <span className={`font-mono font-bold ${lit(c) ? 'text-sky-400' : 'text-slate-600'}`}>{i + 1}</span>
                <p className={`min-w-0 ${lit(c) ? 'text-slate-400' : 'text-slate-600'}`}>
                  <strong className={lit(c) ? 'text-sky-300' : 'text-slate-600'}>{c.k}：</strong>
                  {c.v}
                  {/* 第四條永遠掛著這一句：它在單獨一筆發現上本來就沒有對象（檔頭）。 */}
                  {c.note && <span className="mt-0.5 block text-slate-500">{c.note}</span>}
                </p>
              </li>
            ))}
          </ol>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {ACTIONS.map((a) => (
            <div key={a.k} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <h4 className="flex items-start gap-2 text-sm font-bold text-slate-100">
                <a.icon aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-sky-400" />
                {a.k}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{a.v}</p>
              {/* 把上面那張示意卡接到它該走的那一格。整頁的線靠這一句才通，不要刪。 */}
              {a.tie && <p className="mt-1.5 text-sm leading-relaxed text-sky-200/90">{a.tie}</p>}
            </div>
          ))}
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
