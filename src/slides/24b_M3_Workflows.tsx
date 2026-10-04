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
 * 題目沿用這一頁開場那三十份履歷，所以三塊是同一條線（問題 → 它怎麼解 → 長什麼樣）。
 * 它刻意不是學員跑得起來的指令（他手上沒有三十份履歷），真的要動手的那一句在下一頁的計時器。
 *
 * 2026-10-04 再補一張實機截圖（`assets/ui/workflow-desktop-run.png`，講師自己跑的，Claude 桌面版的
 * Background tasks 面板）。它正好是同一個題目的上游：產生那三十份測試用履歷，六個 writer 各五份。
 * 截圖裡看得到階段名稱（Write 0/6）、每個子代理分到的範圍（writer-1 是 01-05）、各自的 token 與時間，
 * 以及整支跑掉的 651.1k token 與 10 分 04 秒。
 *
 * 有這張之後，`PLAN` 的數字就照它改成「派 6 個，一份處理 5 份」，不要讓手寫的示意跟實機對不上。
 * **截圖裡的履歷是產生出來的假資料（畫面上自己標著「虛構」、信箱是 example.com），不是真人。**
 * 換圖的時候要確認這一點還成立。
 * 651.1k 這個數字下一頁（24c）講錢的時候會再用一次，改圖要兩邊一起看（B-4）。
 */

const SAMPLE_PROMPT =
  'ultracode：這個資料夾裡有三十份履歷，照 docs/徵才條件.md 一份一份篩，' +
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
            腳本寫好會先給你看過，你同意它才開始，接著交給一個執行環境在背景跑，
            你這邊的對話照常可以用。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            腳本只管流程，不管判斷。它自己不讀檔案、也不下結論，那些還是子代理在做。
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
            右邊那張清單就是「腳本」的樣子，你看到的是這個，不是程式碼。
            <strong className="text-slate-200">覺得派太多、或者階段不對，現在就可以叫它改</strong>，改完你同意它才開始跑。
          </p>

          <figure className="mt-4">
            <img
              src={workflowRun}
              alt="Claude 桌面版的 Background tasks 面板，顯示一支名為 gen-sales-resumes 的 workflow 正在跑，階段 Write 0/6，底下列出 writer-1 到 writer-6 各自負責的範圍、token 與時間"
              className="w-full max-w-full rounded-xl border border-slate-800"
            />
            <figcaption className="text-slate-500 text-sm leading-relaxed mt-2">
              跑起來實際長這樣（Claude 桌面版的 Background tasks）。
              這一支做的是上游那件事：產生三十份測試用履歷，六個子代理各五份。
              左邊看得到階段名稱與進度，右邊每一列是一個子代理分到的範圍、用掉多少 token、跑了多久。
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
