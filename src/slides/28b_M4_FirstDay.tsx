import { Rocket, UserCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-5 第二頁。上一頁挑好題目，這一頁是第一次把它跑成一套流程。
 *
 * 開場那一句就是兩個動作：**交辦之前把範圍、產出與驗收條件寫下來，做完之後真的去對一遍。**
 * 它前面不要加任何一句交代（2026-11-09 講師退掉兩版）：
 *   「Agentic Engineering 的重點在交辦與驗收：」← 定義下得太滿，理由見下一段。
 *   「這一輪要練的動作：」← 後設導覽（D-2），講的是這一頁的職務，不是內容。
 * **直接從動作那一句開始**，標題已經說過這一頁在做什麼了。
 *
 * 退掉第一版的理由：
 * 這門課自己的定義在 Slide 8，軸線有兩條（需求寫到多細、做完有沒有人檢查），
 * 而 Agentic Engineering 還包含它自己跑迴圈、用工具、失敗接得回來。
 * 把它壓成「交辦與驗收」是拿其中一面當全部。這一句只講這一輪要練的動作就好。
 *
 * 2026-11-09 這一句改過兩次。先補成「把題目變成第三種做法的樣子，靠的就是這四步」，
 * 當天講師退掉：**單次／重複／系統化那一塊在上一頁的畫面上，這一頁沒有**，
 * 「第三種」在這裡是位置代稱，讀者要翻回去才知道指什麼（D-2 空心的詞）。
 * **不要再用「第三種」「上面那一種」去指上一頁的東西**，要指就把那件事講出來。
 *
 * ── 2026-11-09 拆頁（Codex 審查建議，講師同意）────────────────────
 * 這一頁原本同時裝著四個步驟、四種文件的分工、失敗三問與人工確認框，三套清單搶主角，
 * 而且四個步驟全部包在同一個 `stepIndex` 裡，一次全出現。
 * 現在**只留四個步驟**，文件分工與失敗恢復整組搬到下一頁 `28b2_M4_WorkDocs`。
 * **不要把它們搬回來**；那一頁還多了一句開工時叫 Agent 覆述文件內容的指令，
 * 補的是 `28b0` 檔頭那句「存成檔案，不等於它就會讀到」。
 *
 * 四個步驟改成各自一個 `stepIndex`（2 到 5），講者可以一步一步帶。
 *
 * 步驟 02 原本結在「回去看案例一那份規格的七塊」。那七塊是網站題目的模板
 * （三到五張參考圖、有哪些照片與內容），選報表或知識庫的學員套不上，而且它把這一頁
 * 綁在另一支影片上。**不要加回來**，現在那一句改成「缺的資料先列成待確認問題」。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * **六個階段的完整說明不在這一頁**（上一版在這裡橫排了六格加兩條回頭的線）。
 * 那份說明現在只在結語那一頁，這兩頁的職務是把它用到學員自己的工作上：
 * 上一頁選題，這一頁做第一次。四個步驟右邊標的階段名是索引，不是重新定義。
 *
 * ── 黃色那塊〈卡住的時候，三招〉整個拿掉了，不要加回來 ──────────────
 * 三個理由，講師指定：
 *   1. 它是特定工具的操作技巧（按 Esc、貼錯誤訊息、開新對話），
 *      跟這一頁在講的工作管理原則不是同一層級。
 *   2. 它會讓人以為 Esc 救得回已經發生的修改與外部副作用。**救不回來。**
 *   3. 它不是 Recover 的完整概念。真正的 Recover 是現在那一塊：
 *      停在哪裡、怎麼恢復、什麼時候交給人。
 * 要留那三招的話，放課後的操作指引或 FAQ，不要放回正式投影片。
 *
 * ── 文件分工那一塊 ────────────────────────────────────
 * 上一版只教「每次都要重講的那幾句寫進 `CLAUDE.md`」，學員會把規格、進度、做法全塞進去。
 * 現在分四種：`CLAUDE.md`（跨任務仍然有效的指引與規則）、規格文件（這一次做什麼）、
 * 進度文件（現在到哪）、Skill（真的會跨任務重用的做法）。
 * **只給最小示例**，完整的記憶分層是 Slide 207 的事，不要在這裡重講一遍。
 *
 * ── 收尾那一句 ───────────────────────────────────────
 * 「第一次跑成功，不代表流程已經建立」是講師指定的原句。底下那一行也不要刪：
 * **再跑一次不是要它輸出一模一樣的字**，是要結果仍然符合你寫的驗收條件。
 * 少了那一句，學員會拿「輸出不一樣」當成流程壞掉。
 *
 * 影響大的動作要先問過的那個虛線框保留（講師 2026-11-08 指定的三件之一），
 * 它跟 Slide 206 的行動邊界是同一條，**搬頁的時候兩邊一起看**。
 *
 * 2026-11-09（講師：這段有點冗）開場第二句砍掉後半：
 * 原本是「選一個範圍小、風險低的任務，**把一次交辦、一次驗收，加上第二次執行走完**。」
 * 粗體那半句講的就是底下步驟 02、03、04，等於同一件事在同一屏講兩次。
 * **不要補回來**，要交代順序就看那四張卡。
 *
 * 標題砍過字：講師原句「第一次實作：把一件工作變成可重複執行的流程」量起來 46 寬，
 * 超過 D-5 的 40。現在這句 38 寬。
 *
 * 用色：sky（步驟編號與 Recover）一種。`CLAUDE.md`、`SKILL.md` 的 orange 是專有名詞，不計入。
 */

const STEPS = [
  {
    n: '01',
    k: '建立工作環境',
    stage: 'Define 之前',
    v: '開一個專案資料夾，準備一份安全的測試資料，確認這一輪會用到哪些工具、它有哪些權限。',
    code: ['$ mkdir my-project && cd my-project', '$ claude'],
  },
  {
    n: '02',
    k: '確認規格與執行計畫',
    stage: 'Define · Plan',
    v: '請它先整理出工作範圍、輸入、產出、限制與驗收條件，缺的資料列成待確認問題，先不要動手。你核准之後才開始執行。',
    code: null,
  },
  {
    n: '03',
    k: '執行與驗收',
    stage: 'Execute · Verify',
    v: '從最小的那一塊開始，自己檢查實際成果，記下改了什麼、哪裡出錯、哪些還沒做完。例：十筆測試資料的合計要跟你人工核對的答案一樣，缺日期的那幾筆要列出來，不要自己補。',
    code: null,
  },
  {
    n: '04',
    k: '保存並重跑',
    stage: 'Reuse',
    v: '把跨次任務仍然有效的規則存進專案文件，換第二批測試資料再跑一次，確認不必把規則重講一遍。',
    code: null,
  },
];

export default function SlideFirstDay() {
  return (
    <SlideLayout
      title="把工作拆成可交辦、可驗收的流程"
      subtitle="Your First Agent Workflow"
      icon={Rocket}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          <strong className="text-slate-100">交辦之前把範圍、產出與驗收條件寫下來，做完之後真的去對一遍。</strong>
          選一個範圍小、風險低的任務。
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <AnimatedBlock key={s.n} stepIndex={i + 2} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-sky-400">{s.n}</span>
                <h3 className="text-base font-bold text-slate-100">{s.k}</h3>
                <span className="ml-auto font-mono text-xs uppercase tracking-wider text-slate-600">
                  {s.stage}
                </span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{s.v}</p>
              {s.code && (
                <pre className="mt-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-xs leading-relaxed text-slate-400">
                  {s.code.join('\n')}
                </pre>
              )}
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="flex items-start gap-2 rounded-xl border border-dashed border-sky-500/40 px-4 py-2.5">
          <UserCheck aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-sky-300" />
          <p className="text-sm leading-relaxed text-slate-300">
            會寄出去、會付錢、會刪東西、會公開的那幾個動作，
            <strong className="text-slate-100">在流程裡就寫明要先問過你</strong>，不要靠當下記得攔。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={7} className="border-t border-slate-800 pt-4">
          <p className="text-base font-bold leading-relaxed text-slate-100">
            第一次跑成功，不代表流程已經建立。換一批資料還能照規格完成，才開始有重用的價值。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            再跑一次要確認的是：結果仍然符合你寫下來的驗收條件。輸出的文字可以不一樣。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
