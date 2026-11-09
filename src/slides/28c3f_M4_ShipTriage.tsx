import { FileSearch, Wrench, FlaskConical, UserCheck } from 'lucide-react';
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
 * 用色：amber（那筆發現）＋ sky（四個核對動作）兩種（A-1）。
 */

/** 示意用的一筆發現。欄位對應 `28c3e` 的 Findings 與 Evidence。 */
const FINDING = [
  ['等級', 'High（待驗證）'],
  ['證據', 'src/app/api/signups/route.ts:42，查詢只用網址上的 id，沒有比對登入者'],
  ['成立條件', '登入之後，把網址上的 id 換成別人的'],
  ['驗證狀態', '待驗證：只讀了程式碼，沒有實際打過那支 API'],
];

const CHECKS = [
  {
    k: '位置對得上嗎',
    v: '打開它指的那個檔案、那幾行，看那段程式碼真的在做它說的事。指不出位置的，先當成還沒成立。',
  },
  {
    k: '工具真的跑過嗎',
    v: '報告要寫出跑了哪個工具、掃了哪些路徑。只有結論、沒有執行紀錄的，先當成工具還沒跑過，請它補上紀錄。',
  },
  {
    k: '結論有沒有超出證據',
    v: '「未發現問題」要能說出它實際檢查了什麼。讀原始碼讀不出來的事，不能寫成已經確認。',
  },
  {
    k: '哪些沒被涵蓋',
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
  },
  {
    icon: UserCheck,
    k: '自己判斷不了，又碰到敏感資料',
    v: '交給有資格的人看，並且先把影響範圍限縮住。',
  },
];

export default function SlideShipTriage() {
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

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-amber-500/30 bg-amber-500/5 px-5 py-3.5">
          <div className="flex items-baseline gap-2">
            <span className="rounded border border-amber-500/40 px-1.5 font-mono text-xs text-amber-300">示意</span>
            <h3 className="text-base font-bold text-slate-100">一般會員可能讀到其他人的報名資料</h3>
          </div>
          <dl className="mt-2 grid grid-cols-1 gap-x-8 gap-y-1 text-sm leading-relaxed md:grid-cols-2">
            {FINDING.map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="w-16 shrink-0 text-xs text-amber-300/80">{k}</dt>
                <dd className="min-w-0 text-slate-300">{v}</dd>
              </div>
            ))}
          </dl>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <h3 className="mb-1.5 text-base font-bold text-slate-100">這四件事，你要自己對一遍</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
            {CHECKS.map((c) => (
              <div key={c.k} className="min-w-0">
                <div className="text-sm font-bold text-sky-400">{c.k}</div>
                <p className="text-sm leading-relaxed text-slate-400">{c.v}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {ACTIONS.map((a) => (
            <div key={a.k} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <h4 className="flex items-start gap-2 text-sm font-bold text-slate-100">
                <a.icon aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-sky-400" />
                {a.k}
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{a.v}</p>
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
