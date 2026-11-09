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
 * ── 收尾那一塊 ──────────────────────────────────────
 * 接的是 `28c3` 的「沒有通過這個選項」：前面講 Agent 不能給「通過」，這裡講人也不要替它給。
 * 2026-11-09 改寫過（講師：原本那句「你能交出去的只有：這一次查了哪些、剩下哪些還沒查」
 * 太抽象）。**現在直接把那句話的樣子寫出來**——十類查了八類、兩類驗不了、三條發現裡
 * 兩條修好一條待驗證、正式環境沒查。學員要帶走的是這個句型，不是一句原則。
 * 底下那一行留著，它點名「報告說沒問題」為什麼不算答案。
 *
 * ── 2026-11-09 四個核對動作掛回上面那張卡 ─────────────────────
 * 病根：四件事與那張卡是上下兩塊，**核對哪一欄要學員自己對**，而這一頁教的就是核對本身。
 * 現在四個動作可以點，點下去那張卡只留它問的那一欄，其餘四行降成灰階。
 * 對應寫在 `CHECKS` 的 `fields`，值就是 `FINDING` 的欄名，**改欄名兩邊一起改**。
 * 第三條〈結論有沒有超出證據〉掛兩欄（等級與成立條件）：等級是結論，成立條件是撐住它的東西，
 * 核對的時候要一起看，分開看就只剩一個級別標籤。
 *
 * ── 2026-11-09 四個核對動作移到示意卡上面（講師）────────────────────
 * 原本是示意卡在上、四個核對在下。**可以點的是四個核對，會變的是那張卡**，
 * 控制項在下、被控制的在上，眼睛要往回看。現在四個核對排在前面，點完往下看那張卡，
 * 順序跟閱讀方向一致。`stepIndex` 跟著位置換成 2（核對）與 3（示意卡），
 * **DOM 順序與 stepIndex 必須一致**（A-2），不要只換其中一邊。
 * 換完之後那張卡剛好貼著底下的三格分流，中間那格的 `tie` 指的就是它，連動更近。
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
  /** 正在核對的那一條（`CHECKS` 的 index）。`null` 是預設，也就是四行全亮的原樣。 */
  const [pick, setPick] = useState<number | null>(null);
  const picked = pick === null ? null : CHECKS[pick];
  /** 這一欄現在要不要保持原本的對比。沒在核對就全亮；`fields` 是空的那一條則全部降灰。 */
  const lit = (field: string) => picked === null || picked.fields.includes(field);

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

        <AnimatedBlock stepIndex={2}>
          <h3 className="mb-1.5 text-base font-bold text-slate-100">這四件事，你要自己對一遍</h3>
          <div className="grid grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
            {CHECKS.map((c, i) => (
              <button
                key={c.k}
                type="button"
                aria-pressed={pick === i}
                onClick={() => setPick(pick === i ? null : i)}
                className={`min-w-0 cursor-pointer rounded-xl border px-3 py-1.5 text-left transition-colors ${
                  pick === i ? 'border-sky-500/40 bg-sky-500/5' : 'border-transparent hover:border-sky-500/30'
                }`}
              >
                <div className="text-sm font-bold text-sky-400">{c.k}</div>
                <p className="text-sm leading-relaxed text-slate-400">{c.v}</p>
              </button>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-3.5">
          <div className="flex items-baseline gap-2">
            <span className="rounded border border-amber-500/40 px-1.5 font-mono text-xs text-amber-300">示意</span>
            <h3 className="text-base font-bold text-slate-100">一般會員可能讀到其他人的報名資料</h3>
          </div>
          <dl className="mt-2 grid grid-cols-1 gap-x-8 gap-y-1 text-sm leading-relaxed md:grid-cols-2">
            {FINDING.map(([k, v]) => (
              <div key={k} className="flex gap-2 transition-colors">
                <dt className={`w-16 shrink-0 text-xs ${lit(k) ? 'text-amber-300/80' : 'text-slate-600'}`}>{k}</dt>
                <dd className={`min-w-0 ${lit(k) ? 'text-slate-300' : 'text-slate-600'}`}>{v}</dd>
              </div>
            ))}
          </dl>
          {/* 第四條核對不到任何一欄，那個「對不到」就是它的教學點（檔頭）。 */}
          {picked && picked.fields.length === 0 && (
            <p className="mt-2.5 rounded-xl border border-dashed border-slate-700 px-3.5 py-2 text-sm leading-relaxed text-slate-400">
              {'單獨一條發現回答不了這一題。'}
              <strong className="text-slate-200">這次實際查了哪些、哪些沒查，要看報告最後那一段</strong>
              {'（報告裡叫 Coverage & Limitations）。'}
            </p>
          )}
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

        <AnimatedBlock stepIndex={5} className="border-t border-slate-800 pt-2.5">
          <p className="text-base font-bold leading-relaxed text-slate-100">
            有人問「這樣可以上線嗎」，你交得出去的是這種句子：
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            「十類查了八類，另外兩類沒有工具、驗不了；查出來三條，兩條已經驗過也修好，
            一條還在待驗證；正式環境的設定與外部服務這一次沒有查。」
            <span className="mt-1 block text-slate-500">
              「報告說沒問題」不是這種句子，它沒有說出查了什麼。
            </span>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
