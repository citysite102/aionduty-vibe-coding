import { Fragment } from 'react';
import { Workflow } from 'lucide-react';
import { CopyAction } from '../components/CopyBlock';
import workflowRun from '../../assets/ui/workflow-desktop-run.png';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/workflows（Orchestrate subagents at
 * scale with dynamic workflows）。當時的現況，逐條對應畫面上寫的：
 *   - 定義：「A dynamic workflow is a JavaScript script that orchestrates many subagents at once.
 *     Claude writes the script for the task you describe, and a runtime executes it in the
 *     background while your session stays responsive.」
 *   - 跟子代理的差別（文件那張表的兩列）：Who decides what runs next → Claude, turn by turn ／
 *     The script；Where intermediate results live → Claude's context window ／ Script variables。
 *   - 腳本本身沒有檔案系統與 Node.js API，工具在子代理身上（所以「腳本只管流程不管判斷」
 *     這一句是文件寫的，不是比喻）。
 *   - 它是 JavaScript，而且流程是寫死的：「The script holds the loop, the branching, and the
 *     intermediate results itself」。畫面上寫成「派誰、派幾個、什麼時候停都寫在程式裡，
 *     不是它一邊跑一邊看著辦」，刻意不用「迴圈」「條件判斷」這兩個詞（D-2，一半學員不寫程式）。
 *     `JavaScript` 全片只在 `21f2_M2_ThisDeck` 出現過一次，所以這裡要加一句「一支真的程式」當註腳，
 *     不能假設學員認得。
 *
 * **不要把執行環境改稱「harness」或「運作框架」。** 原文是 harness，但章節五已經把
 * 「運作框架（Harness）」指給 Agent 的六個零件（D-4 的譯名表也是），同一個詞在這裡再用一次，
 * 學員會以為是同一個東西。維持「執行環境」。
 *
 * **這一頁要自己說得出「怎麼啟動」。** 2026-10-04 講師：學員讀到「Claude 先寫一支腳本」會問
 * 「那我要怎麼讓它寫」，而答案本來全在下一頁。現在第二塊最後一句就給出啟動方式，
 * 下一頁再展開三種來源。**不要把那一句搬走，也不要改成「下一頁會講」那種指路句（D-2）。**
 *
 * **那一句給的是「用你自己的話說」，不是 `ultracode`，這是刻意的。** 官方文件的
 * 「Where the keyword works」只列了 interactive prompt、IDE extension panel、Remote Control client
 * 與 Agent SDK，**桌面版不在名單上**；而這門課主推桌面版（`10f_M1_DesktopFirst`），
 * 拿關鍵字當唯一寫法對多數學員會當場失敗。用自己的話講是一般的指令，哪個介面都成立。
 * 關鍵字留在下一頁，而且標明它是終端機／IDE 的寫法。
 * **最後查證：2026-10-04，code.claude.com/docs/en/workflows 的 Where the keyword works。
 * 文件沒有正面寫桌面版支不支援關鍵字，下次改版前請在桌面版實機打一次確認（C-3）。**
 *
 * 2026-10-04 拆頁。原本一頁要講「它是什麼、什麼時候用、怎麼叫、多少錢」四件事，塞不下，
 * 而講師回報的問題正是「看不懂它跟 /deep-research、ultracode 的關聯」。現在分兩頁：
 *   這一頁（24b）＝遇到什麼問題、解法是什麼、跟自己派子代理差在哪。
 *   下一頁（24c_M3_WorkflowUse）＝什麼時候用得上、兩種叫法、實測、花多少錢。
 * 上一頁 24_M3_Roles 第四格有一行指過來。三頁一起搬（B-4）。
 *
 * 不要寫進投影片的：腳本的 agent()/pipeline()/parallel() 寫法，以及 resume 的快取規則。
 * 學員這兩頁的任務是知道有這個東西、知道什麼時候輪得到它、叫得出來、知道它很貴。
 *
 * 2026-10-04（講師）：「你描述任務、Claude 寫腳本、分幾個階段、誰覆核誰」這三句話光用講的太抽象，
 * 補了一組範例（`SAMPLE_PROMPT` ＋ `PLAN`）。
 *
 * **範例印的是「它送回來給你看的那張階段清單」，不是 JavaScript。** 理由有兩個：
 * 那張清單才是學員實際會看到、而且要按同意的東西；而腳本本身對不寫程式的人是空白（D-2）。
 * `PLAN` 三列刻意一一對上第二塊那三句話：幾個階段、每階段派幾個、誰的產出交給誰覆核。
 * **改那三句話就要改這三列。**
 *
 * **「每次都會先問你同意」是錯的，不要寫回去。** 2026-10-04 講師實測：他跑的那一次根本沒問他。
 * 文件的步驟說明寫「Claude Code asks whether to allow the workflow」，但底下那張表的 Auto 那一列
 * 寫的是「**First launch only.** Any Yes records consent in your user settings, and later launches
 * start without prompting. Skipped entirely when ultracode is on」。Manual 與 accept edits 才是每次都問。
 * 而這門課推薦的 Pro 方案起始模式就是 auto（C-3 那一條記過），所以多數學員只會被問第一次。
 * 這是 C-3 的典型：只讀前言那一句會寫錯，要讀完那一列的前提。
 * 最後查證：2026-10-04，code.claude.com/docs/en/workflows 的 Approve the plan before it runs。
 *
 * 2026-10-04（講師）底下那兩句重寫過，原本寫「右邊那張清單就是『腳本』的樣子，你看到的是這個，
 * 不是程式碼」。兩個毛病：清單是**摘要**不是腳本，跟上一塊的「Claude 先寫一支腳本」自相矛盾；
 * 而且「不是程式碼」是錯的，文件寫核准畫面有 **View raw script**，`Ctrl+G` 還能在編輯器打開，
 * 所以程式碼看得到，只是不用看。現在寫「不用去讀程式碼」。
 *
 * 「怎麼改」也補上了，而且刻意只寫「選不要，講一遍再送一次」這種哪個介面都成立的做法。
 * 終端機版在核准畫面還能按 `Tab` 直接改那段指令，但**桌面版的核准卡只有 Once／Always／Deny**
 * （文件：「In the Desktop app, an approval card shows the workflow name, the phase list, and a
 * token-usage caution, with Once, Always, and Deny actions」），寫上去桌面版的學員會找不到。
 * 最後查證：2026-10-04，code.claude.com/docs/en/workflows 的 Approve the plan before it runs。
 *
 * **範例開頭用的是「用 workflow 跑這件事」，不是 `ultracode`。** 原本寫關鍵字，但第二塊教的啟動方式
 * 是用自己的話講（理由見上面那條：桌面版不在關鍵字的適用範圍內），兩邊不一致學員會不知道該信哪一個。
 * 下一頁那個可以按複製的 Prompt 同一輪一起改。**改一邊就要改另一邊（B-4）。**
 *
 * 題目沿用這一頁開場那三十份履歷，所以三塊是同一條線（問題 → 它怎麼解 → 長什麼樣）。
 * 它刻意不是學員跑得起來的指令（他手上沒有三十份履歷），真的要動手的那一句在下一頁的計時器。
 *
 * 2026-10-04 再補一張實機截圖（`assets/ui/workflow-desktop-run.png`，講師自己跑的 Claude 桌面版畫面）。
 * 它正好是同一個題目的上游：產生那三十份測試用履歷，六個 writer 各五份。
 * 截圖裡看得到的東西，說明文字逐項對過：左半對話裡的 `ultracode`、右半 Background tasks 的總覽
 * （6 agents、10m 04s、651.1k tokens）、Phases 底下的 Write 階段，以及展開後 writer-1 到 writer-6
 * 各自的編號範圍、模型、token 與時間。
 *
 * **說明文字寫「左半／右半／底下」之前，先回去看一次圖（D-6k）。** 第一版寫成「左邊是階段、右邊是
 * 每個子代理」，但階段跟子代理其實在同一個面板由上往下排，左邊是對話。那一版還配錯了圖（貼成分節頁），
 * 兩個錯都是沒有回去對畫面。
 *
 * 有這張之後，`PLAN` 的數字就照它改成「派 6 個，一份處理 5 份」，不要讓手寫的示意跟實機對不上。
 * **截圖裡的履歷是產生出來的假資料（畫面上自己標著「虛構」、信箱是 example.com），不是真人。**
 * 換圖的時候要確認這一點還成立。
 * 651.1k 這個數字下一頁（24c）講錢的時候會再用一次，改圖要兩邊一起看（B-4）。
 */

const SAMPLE_PROMPT =
  '用 workflow 跑這件事：這個資料夾裡有三十份履歷，照 docs/徵才條件.md 一份一份篩，' +
  '每一份給我通過或不通過，加一句理由。判成不通過的，再派人反過來找「這個人不該被刷掉」的理由，' +
  '推翻得掉的改回待議。最後給我一份名單。';

/** 它送回來、等你按同意的那張清單。三列各對應上面那三句話，不要只改一邊。 */
const PLAN = [
  { n: '階段 1', t: '分批篩選', who: '同時派 6 個', d: '一個處理 5 份，六個拿到的是同一段條件' },
  { n: '階段 2', t: '覆核不通過的', who: '一份派 1 個', d: '專門找「不該刷掉」的理由，推翻得掉就改回待議' },
  { n: '階段 3', t: '彙整名單', who: '1 個', d: '收前兩個階段的結果，合成一份交給你' },
];

/** 自己派 vs 交給 workflow。三列都取自官方文件那張對照表，不要自己加第四列。 */
const DIFF = [
  {
    q: '下一步派誰',
    mine: 'Claude 每一個回合現場決定。',
    wf: '寫在腳本裡，照腳本跑。',
  },
  {
    q: '中間結果放哪',
    mine: '每一份都回到你這段對話裡。',
    wf: '留在腳本的變數裡，只有最後的結論回到對話。',
  },
  {
    q: '一次派得動幾個',
    mine: '幾件還可以，數量一多對話就滿了。',
    wf: '幾十個，而你的對話不會被塞爆。',
  },
];

export default function SlideM3Workflows() {
  return (
    <SlideLayout title="workflow：Claude 寫腳本，一次派出幾十個" subtitle="Dynamic Workflows" icon={Workflow}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="text-slate-200 text-sm font-bold mb-2">先講問題</div>
          <p className="text-slate-300 text-base leading-relaxed">
            假設你要篩三十份履歷，每一份都用同一套標準。
            你現在會的做法是一份一份派：派出去、收回來、再派下一份。
          </p>
          <ul className="mt-3 space-y-1.5 text-slate-400 text-base leading-relaxed">
            <li>你要重複交代三十次。</li>
            <li>三十份報告全堆進同一段對話，塞滿之後它會開始漏掉你前面講過的事。</li>
            <li>你很難確定第三十份用的，還是第一份那套標準。</li>
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="text-slate-200 text-sm font-bold mb-2">workflow 就是為了這件事做的</div>
          <p className="text-slate-300 text-base leading-relaxed">
            上一頁第四種分工叫「流程腳本」，Claude Code 已經把它做成內建功能，名字就是{' '}
            <strong className="text-slate-100">workflow</strong>。
            你描述任務，<strong className="text-slate-100">Claude 先寫一支腳本</strong>，
            腳本寫的是流程：分成哪幾個階段、每個階段同時派幾個子代理、誰的產出要交給誰覆核。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            <strong className="text-slate-200">第一次</strong>它會把腳本的階段清單給你看過、你同意才開始；
            <strong className="text-slate-200">同意過一次之後就不再問，直接開跑</strong>。
            跑的時候交給一個執行環境在背景做，你這邊的對話照常可以用。
          </p>
          <p className="text-slate-300 text-base leading-relaxed mt-2">
            那怎麼叫它寫這一支腳本？
            <strong className="text-slate-100">在你那句話裡多講一句「用 workflow 跑這件事」</strong>。
            不講的話，它就照平常一步一步自己做完。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            那支腳本是<strong className="text-slate-200">一支真的程式</strong>（用 JavaScript 寫的），
            Claude 寫好之後交給執行環境跑。所以派誰、派幾個、什麼時候停，都是寫在程式裡的，
            <strong className="text-slate-200">不是它一邊跑一邊看著辦</strong>。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            但腳本只管流程，不管判斷。它自己不讀檔案、也不下結論，那些還是子代理在做。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">上面那三句話，長出來是這樣</div>
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-4">
            <div className="rounded-xl border border-sky-900/50 bg-sky-950/20 px-4 py-3">
              <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">你打的那句話</div>
              <p className="text-sky-100 text-sm leading-relaxed">「{SAMPLE_PROMPT}」</p>
              <CopyAction text={SAMPLE_PROMPT} className="mt-2" />
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">
                它送回來、等你按同意的計畫
              </div>
              <div className="space-y-1.5">
                {PLAN.map((s2) => (
                  <div key={s2.n} className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-slate-500 shrink-0">{s2.n}</span>
                      <span className="text-slate-100 text-sm font-bold">{s2.t}</span>
                      <span className="text-slate-400 text-sm">{s2.who}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mt-0.5">{s2.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-3">
            右邊那張清單是<strong className="text-slate-200">那支腳本的摘要</strong>，不是腳本本身。
            你要看的就是這些：分幾個階段、每個階段派幾個，不用去讀程式碼。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            還在問你的時候覺得它派太多個、或者少了一個覆核的階段，就選不要，把你想改的地方講一遍再送一次。
            <strong className="text-slate-200">已經直接開跑的話，到它的進度畫面停掉</strong>：
            終端機打 <code className="font-mono text-orange-300">/workflows</code>，
            桌面版在下圖右邊那個 Background tasks。
          </p>

          <figure className="mt-4">
            <img
              src={workflowRun}
              alt="Claude 桌面版畫面。左半是對話，指令裡寫著 ultracode；右半的 Background tasks 面板顯示一支名為 gen-sales-resumes 的 workflow 正在跑，6 agents、10m 04s、651.1k tokens，Phases 底下的 Write 階段展開成 writer-1 到 writer-6 六列，各自標著負責的編號範圍、模型、token 與時間"
              className="w-full max-w-full rounded-xl border border-slate-800"
            />
            <figcaption className="text-slate-500 text-sm leading-relaxed mt-2">
              跑起來實際長這樣（Claude 桌面版）。這一支做的是上游那件事：產生三十份測試用履歷。
              左半是對話，那句指令裡就寫著要它用 workflow 跑；
              右半的 Background tasks 面板上半是總覽，底下 Phases 是階段，
              <code className="font-mono text-slate-400">Write</code> 展開就是六個子代理，
              每一列標著它分到第幾到第幾份、用掉多少 token、跑了多久。
              <strong className="text-slate-400">整支 10 分 04 秒、651.1k token</strong>，那是它開在背景、你這邊照常對話的十分鐘。
            </figcaption>
          </figure>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">跟你自己派子代理，差在三件事</div>
          <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-2.5 items-start">
            <div />
            <div className="text-sky-300 text-sm font-bold px-3">你自己派子代理</div>
            <div className="text-indigo-300 text-sm font-bold px-3">交給 workflow</div>
            {DIFF.map((d) => (
              <Fragment key={d.q}>
                <div className="text-slate-400 text-sm leading-relaxed py-2.5 whitespace-nowrap">{d.q}</div>
                <div className="rounded-lg border border-sky-500/25 bg-sky-950/20 px-3 py-2.5 text-slate-300 text-sm leading-relaxed">
                  {d.mine}
                </div>
                <div className="rounded-lg border border-indigo-500/25 bg-indigo-950/20 px-3 py-2.5 text-slate-300 text-sm leading-relaxed">
                  {d.wf}
                </div>
              </Fragment>
            ))}
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
