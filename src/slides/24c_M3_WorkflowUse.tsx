import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 最後查證：2026-10-04，對照 code.claude.com/docs/en/workflows。畫面上這幾句的出處：
 *   - 叫出來的方式：`/deep-research` 是唯一的內建 workflow；自己的任務在 prompt 裡加
 *     `ultracode`，或「Asking in your own words, for example "use a workflow"」也算同一種 opt-in。
 *   - **`DEMO` 開頭用「用 workflow 跑這件事」，不要換回 `ultracode`。** 這一串是學員真的會按複製、
 *     貼進自己對話框的字（A-4）。桌面版不在關鍵字的適用範圍內，貼過去沒反應就等於這一頁白教。
 *     上一頁的 `SAMPLE_PROMPT` 同一輪一起改過，兩邊要一致。
 *   - **`ultracode` 的適用範圍不含桌面版。** 文件的 Where the keyword works 只列了
 *     interactive prompt、IDE extension panel、Remote Control client 與 Agent SDK。
 *     這門課主推桌面版，所以第二格把「用你自己的話」排在前面當主要寫法，關鍵字降成補充並標明介面。
 *     **文件沒有正面否定桌面版，下次改版前在桌面版實機打一次確認（C-3）。**
 *   - **`ultracode` 不是一支 workflow，是開關，而且有兩種用法。** 關鍵字版只管這一次
 *     （「The keyword only chooses how Claude structures the work」）；設定版是
 *     「Ultracode is a Claude Code setting that turns on automatic workflow orchestration for the
 *     session… Claude plans a workflow for each substantive task instead of waiting for you to ask」，
 *     用 `/effort ultracode` 打開，而且文件自己標了代價（「each request uses more tokens and takes
 *     longer」「reaches a session or weekly limit sooner」）。學員問過「ultracode 是 workflow 嗎」，
 *     **這一條不要省。**
 *   - **腳本不是學員自己寫。** 文件的範例那一節寫死了：「Each one asks Claude to write and run a
 *     workflow for that task; you don't write the script yourself.」但跑過一次可以存起來重複用：
 *     `/workflows` 選那一次按 `s`，存到專案的 `.claude/workflows/` 或家目錄的 `~/.claude/workflows/`，
 *     之後「The workflow runs as `/<name>` in future sessions」。
 *     存完要改的話，文件要求先跑內建 skill `/workflow-authoring`（需 v2.1.248 以上），
 *     改完同一個 session 要 `/reload-skills`。**改腳本是進階的，投影片只講到「存起來」為止。**
 *   - 方案與開關：「available on all paid plans… On Pro, turn them on from the Dynamic workflows
 *     row in /config」。免費方案沒有，Pro 要自己打開，這一句不要漏。
 *   - 代價：「a single run can use meaningfully more tokens… Runs count toward your plan's usage
 *     and rate limits」。
 *   - 看進度與中止：`/workflows` 清單裡選一個按 `x` 停掉；桌面版是 Background tasks 側欄。
 *   - **不要寫「每次都會先問你同意」。** Auto 模式只問第一次（文件：「First launch only… later
 *     launches start without prompting」），而這門課推薦的 Pro 起始模式就是 auto。
 *     講師實測那一次就沒有被問。理由與出處寫在 24b 的檔頭，兩頁一起看（B-4）。
 *
 * 2026-10-04 新增，從 24b_M3_Workflows 拆出來。講師回報兩件事：
 *
 * 一、原本三格例子裡的第一格寫「170 頁，一頁派一個」。那不是真的會有人用的做法
 *    （而且跟第三格「步驟固定要重複跑」是同一件事講兩次）。現在三格換成實際會用的三種形狀：
 *    分批、不同面向各派一個、後一輪覆核前一輪。這三種正好也是官方文件列的三種結構。
 *    **不要再寫回「一頁派一個」。**
 *
 * 二、原本 `/deep-research`、`ultracode`、用自己的話三個並排成「三種叫得出來的方式」，
 *    讀起來像三個平行的功能。實際的關係是兩層：`/deep-research` 是別人已經寫好的一支，
 *    另外兩個是「這件事改用 workflow 跑」的同一個開關，腳本現場才生出來。
 *    **這一層關係是這一頁的重點，不要再攤平成三格。**
 *
 * 三格的 `real` 一律取自這份簡報自己做過的工作，數字查得到：九章（`npm run units` 印的分章，
 * 八個分節＋結語）。寫法上只說「這件事真的發生過」，沒有說「我們真的用 workflow 跑完它」，
 * 因為後者沒有證據（D-2：證明不了的斷言）。改這三格的時候守住這個分寸。
 *
 * 教學模擬（講師／學生／觀察員）刻意不放進來：那是〈用講師、學生、觀察員跑一次教學模擬〉
 * 整頁的主角，不要在這裡先講掉。
 */
const SHAPES = [
  {
    t: '同一件事，分批同時做',
    real: '這份簡報分成九章，每一頁都要挑出「不寫程式的人會卡住的句子」。做法不是一頁派一個，是一章一份、九份同時跑，九份拿到的是同一段指示。',
    yours: '三十份履歷分成五批；八十份會議紀錄一批十份。',
  },
  {
    t: '同一份東西，各查一個面向',
    real: '同一頁要查的不只一件：用字有沒有踩到禁用詞、顏色有沒有超出規範、口白跟畫面對不對得上。三個面向各派一個，各看各的。',
    yours: '同一份合約，一個看金額、一個看期限、一個看違約條款。',
  },
  {
    t: '後一輪，專門挑前一輪的錯',
    real: '第一輪挑出來的問題，交給第二輪一條一條去反駁，推翻得掉的丟掉，剩下的才送到我面前。自己派要來回兩趟，寫進腳本一次跑完。',
    yours: '履歷初篩完，再派一輪專門找「這個人不該被刷掉」的理由。',
  },
];

const DEMO =
  '用 workflow 跑這件事：把計時器的每一個功能列出來，一個一個檢查在手機上會不會壞掉，' +
  '每一條結論都要另一個子代理覆核過再回報給我。';

export default function SlideM3WorkflowUse() {
  return (
    <SlideLayout title="什麼時候用 workflow，怎麼叫它出來" subtitle="When and How" icon={ListChecks}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">三種輪得到它的情況</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SHAPES.map((s) => (
              <div key={s.t} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="text-slate-200 text-sm font-bold leading-snug mb-2">{s.t}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{s.real}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-2 pt-2 border-t border-slate-800">
                  {s.yours}
                </p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            三種的共同點是同一套指示要用在很多份東西上。只做一兩件事就不用它，
            直接派一個子代理比較快，也比較便宜。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">腳本從哪裡來，三種</div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-200 text-sm font-bold mb-2">一、別人寫好的那一支</div>
              <code className="font-mono font-bold text-sm text-orange-300">/deep-research</code>
              <p className="text-slate-400 text-sm leading-relaxed mt-2">
                Claude Code 內建、目前唯一一支寫好的 workflow。後面接一個問題，
                它分頭去查、互相對照，最後給你一份附出處的報告。
                流程已經在裡面了，你不用描述。想先看看 workflow 長什麼樣，從這一支開始。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-200 text-sm font-bold mb-2">二、讓 Claude 現場寫一支</div>
              <div className="space-y-2.5">
                <div>
                  {/* 這一格不是 Claude 的專有名詞，不上橘（A-1） */}
                  <code className="font-mono font-bold text-sm text-slate-300">用你自己的話</code>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">
                    在你那句話裡多講一句「用 workflow 跑這件事」。官方文件把它當成正式的開關，
                    而且哪個介面都成立，桌面版也是。<strong className="text-slate-300">先記這一個就夠用。</strong>
                  </p>
                </div>
                <div>
                  <code className="font-mono font-bold text-sm text-orange-300">ultracode</code>
                  <span className="text-slate-500 text-xs ml-2">終端機與 IDE</span>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">
                    同一件事的關鍵字寫法，打起來比較短。官方文件列的適用範圍裡沒有桌面版，
                    你在桌面版打了沒反應，就改用上面那一句。
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-200 text-sm font-bold mb-2">三、你自己存的那一支</div>
              <code className="font-mono font-bold text-sm text-orange-300">/workflows</code>
              <span className="text-slate-500 text-sm"> 按 </span>
              <code className="font-mono font-bold text-sm text-slate-300">s</code>
              <p className="text-slate-400 text-sm leading-relaxed mt-2">
                跑過一次覺得好用，打 <code className="font-mono text-orange-300">/workflows</code>{' '}
                選那一次按 <code className="font-mono text-slate-300">s</code>，
                它會存進專案的 <code className="font-mono text-slate-300">.claude/workflows/</code>，
                以後打 <code className="font-mono text-slate-300">/那個名字</code> 就重跑同一套流程。
                腳本還是 Claude 寫的，你只是把它留下來。
              </p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            三格叫出來的是同一種東西，
            <strong className="text-slate-200">差別只在腳本是現成的、現場寫的，還是你存下來的</strong>。
            所以「我要自己寫腳本嗎」的答案是不用，你要做的只是描述任務。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            另外，<code className="font-mono text-orange-300">ultracode</code>{' '}
            <strong className="text-slate-200">本身不是一支 workflow，它是開關</strong>，而且有兩種用法：
            寫進你那句話裡，只有這一次用 workflow 跑；或者在終端機打{' '}
            <code className="font-mono text-orange-300">/effort ultracode</code>，
            整個對話每一件像樣的任務它都會自己規劃成 workflow。後者很貴，不要預設開著。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">拿你的計時器試一次</div>
          <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-3.5 py-2.5">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">Prompt</div>
            <p className="text-sky-100 text-sm leading-relaxed">「{DEMO}」</p>
            <CopyAction text={DEMO} className="mt-2" />
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            第一次送出它會先給你一張要跑哪幾個階段的清單，你按同意它才開始；
            <strong className="text-slate-400">同意過一次之後就不再問，送出就直接跑</strong>。
            跑的時候打 <code className="font-mono text-orange-300">/workflows</code>{' '}
            看每個階段派了幾個、花了多少 token，想停就在清單上按{' '}
            <code className="font-mono text-slate-300">x</code>（桌面版在 Background tasks 那一塊）。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" stepIndex={4}>
          它很貴。上一頁那張截圖裡的那一支，十分鐘跑掉 651.1k token，而它只是產生三十份測試檔案。
          一次跑掉的 token 比你在對話裡做同一件事多很多，而且一樣算進你方案的用量，
          所以先拿一個小範圍試（一個資料夾、一個窄一點的問題），不要第一次就整個專案丟下去。
          免費方案沒有這個功能；Pro 方案有，但要自己到{' '}
          <code className="font-mono text-orange-300">/config</code> 把 Dynamic workflows 打開。
        </Callout>

      </div>
    </SlideLayout>
  );
}
