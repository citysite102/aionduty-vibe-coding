import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/workflows。畫面上這幾句的出處：
 *   - 叫出來的方式：`/deep-research` 是唯一的內建 workflow；自己的任務在 prompt 裡加
 *     `ultracode`，或「Asking in your own words, for example "use a workflow"」也算同一種 opt-in。
 *   - 方案與開關：「available on all paid plans… On Pro, turn them on from the Dynamic workflows
 *     row in /config」。免費方案沒有，Pro 要自己打開，這一句不要漏。
 *   - 代價：「a single run can use meaningfully more tokens… Runs count toward your plan's usage
 *     and rate limits」。
 *   - 看進度與中止：`/workflows` 清單裡選一個按 `x` 停掉。
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
  'ultracode：把計時器的每一個功能列出來，一個一個檢查在手機上會不會壞掉，' +
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
          <div className="text-slate-200 text-sm font-bold mb-3">腳本從哪裡來，兩種</div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  <code className="font-mono font-bold text-sm text-orange-300">ultracode</code>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">
                    把這個字寫進你自己那句話裡。Claude 看到它就不照平常一步一步做，
                    而是先針對你這件事寫一支腳本。
                  </p>
                </div>
                <div>
                  {/* 這一格不是 Claude 的專有名詞，不上橘（A-1） */}
                  <code className="font-mono font-bold text-sm text-slate-300">用你自己的話</code>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">
                    直接說「用 workflow 跑這件事」也算，官方文件把它當成同一種開關。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            所以 <code className="font-mono text-orange-300">/deep-research</code> 跟{' '}
            <code className="font-mono text-orange-300">ultracode</code> 不是兩個不同的功能，
            它們叫出來的是同一種東西。
            <strong className="text-slate-200">
              差別在腳本是現成的，還是等你開口才寫。
            </strong>
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
            送出之後它會先給你一張要跑哪幾個階段的清單，你按同意它才開始。
            跑的時候打 <code className="font-mono text-orange-300">/workflows</code>{' '}
            看每個階段派了幾個、花了多少 token，想停就在清單上按{' '}
            <code className="font-mono text-slate-300">x</code>。
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
