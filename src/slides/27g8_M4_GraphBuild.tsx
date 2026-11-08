import { MessageSquare, Search, PlayCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 單元 7-4 第九頁，也是最後一頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 這一頁為什麼存在（2026-11-04 講師指出）──────────────────────
 * 前面八頁教完「是什麼、什麼時候要、怎麼設計」，但**學員從頭到尾沒有一句話可以拿去打**。
 * 整個單元唯一能複製的只有退回單，而那是出事之後才用得到的東西。
 * 踩到 B-5b：一個技巧在課裡找不到可以照做的起點，學員當下動不了手。
 *
 * 2026-11-04 講師拿掉開場那兩段文字，只留一個問句當小標。那兩段講的是「第一句話先別派工作」
 * 與「開頭兩行是目標跟完成的樣子」，兩件都是口白該講的事，印在畫面上只是重述底下那段 Prompt。
 * **口白裡還留著，不要因為畫面上沒有就把逐字稿也砍掉。**
 *
 * ⚠ 兩段 Prompt 是這一頁的本體，**不要把它們改成摘要**（A-4：複製鈕吃的那個字串
 * 單獨讀一遍要自己說得通）。第一段的七條直接對應前面八頁教過的東西：
 *  1 拆成哪幾塊   → 166 拆解節點
 *  2、3 誰等誰   → 165 「然後」不是依賴
 *  4 做完的條件   → 165 驗收條件
 *  5 合併之後再驗  → 165 那一類要全部做完才驗得到的
 *  6 退回帶什麼   → 166 退回單與重試上限
 *  7 進度記在哪   → 164 那張進度表是一個檔案
 * **改前面任何一條，要回來看這七條還對不對得上（B-6）。**
 *
 * 三種跑法的第二種接的是 `24c_M3_WorkflowUse`（章節六教過 `/workflows` 與
 * 「用 workflow 跑這件事」那句開關）。**不要在這裡重教 workflow 怎麼用**，
 * 那一頁已經有完整的四格（B-5）。
 *
 * ── 2026-11-04 精準度複查，改了八處，每一處都有外部依賴 ──────────
 * 1. **存起來那一段是補的。** 原本整頁沒提 `/workflows` 按 `s`，但上一頁的第一個判斷題
 *  就是「這件事會長期重複做嗎」，答是的話省時間的正是這一步。**那一段的用法照抄
 *  `24c_M3_WorkflowUse` 第三格，改那一格要回來改這裡。**
 * 2. **第二段 Prompt 的五種危險動作照抄 `28s_M4_SafetyStop` 的 `IRREVERSIBLE`**
 *  （推上遠端、發信給別人、付款、刪除雲端資料、公開部署）。原本只寫四個而且用詞不同，
 *  學員兩邊會讀到兩份清單（B-6）。**改那一頁要回來改這裡。**
 * 3. 進度表那一條原本寫「對話一關就沒了」，**那是錯的**：Claude Code 接得回上一個對話。
 *  真正的問題是換一個對話、換一台電腦就接不回去。
 * 4. workflow 那一段原本寫「自己派出去跑」，跟上一頁的「流程本身並不需要 40 個 Agent」打架，
 *  改成照 `24c` 的講法「現場寫一支腳本」。
 * 5. Prompt 第 4 條原本寫「用指令或測試判定」，比 `27g3` 的「用程式判定或我看一眼就能確認」
 *  更窄也更工程，改回一致的講法。
 * 6. 小標原本是「由鬆到緊」，鬆緊指什麼讀不出來（D-2 空心的詞），改成「從你盯著到它自己跑」。
 * 7. 收尾原本寫「排錯的成本比做錯高」，那是證明不了的比較級（D-2），改成講機制。
 * 8. 「這一招你在分工那一段看過」是斷言學員看過（D-2 進度安撫），改成「分工那一段講過這個」。
 *
 * ── 2026-11-08 又改了三處（講師逐句看過）──────────────────────
 * 1. 第三種跑法原本寫「接到 n8n、Make 這類工具上」。**Claude Code 自己就排得了**，
 *  不必先把學員推去另一個工具。最後查證：2026-11-08，對照
 *  code.claude.com/docs/en/routines：「Create and manage them at claude.ai/code/routines,
 *  or from the CLI with `/schedule`」、「Scheduled tasks execute on Anthropic-managed cloud
 *  infrastructure ... so they keep working when your laptop is closed」、
 *  「available on Pro, Max, Ultra, Team, and Enterprise plans」、
 *  「Scheduled tasks are in research preview」（畫面上寫成「還在測試階段」）。
 *  比每小時更密的 cron 會被擋，課程用不到所以畫面不寫。下次改版前重查那一頁。
 * 2. 第二種跑法補一句 workflow 是什麼。原本直接寫「它會照你那張 Graph 寫腳本」，
 *  但 workflow 與 Graph 的關係沒有人講過，Graph 是突然冒出來的（講師回報）。
 * 3. 最後那個 Callout 的「拆解那一步寫錯，底下每一塊都會照著錯的走」刪掉，
 *  同一件事 `27g7` 的「人不只站在最後一步」已經講過一次（B-5）。
 * 4. 最後那個 Callout 整塊換掉（2026-11-08 講師指定內容）。原本寫「第一次不要排到十個節點」，
 *  那是操作建議，收在整個單元的最後一塊太小。現在收在「這就是在排一個團隊的工作流程」，
 *  並用產品團隊那一串（需求蒐集到測試）當例子，因為多數學員在公司看到的就是那條直線。
 *  **例子不要換成工程味更重的**，這一段的作用正是把 Graph 接回他已經有的經驗。
 *
 * 用色：兩段 Prompt 的 CopyBlock 自帶 sky，檢查那三件事也是 sky；
 * `workflow` 與 `/workflows` 的 orange 標身分不佔額度，合計一種（A-1）。
 */

/**
 * 第一段：先排圖，不要動手。七條對應前面八頁，改哪一條都要回去對。
 *
 * 2026-11-04 講師要求兩件事：開頭的欄位名從「我要做的事」改成「目標」並補上
 * 「完成的樣子」（7-2 教的就是這兩樣，這張 Prompt 自己原本沒做到）；
 * 七條每一條都要講得出輸出長什麼樣，不要只說「說出⋯」。
 * **不要改回省略版**，學員照抄的就是這一份。
 */
const PROMPT_PLAN = [
  '目標：把我手上這 40 支影片，全部轉成對應的 SRT 字幕檔。',
  '完成的樣子：40 個檔案都產出來，而且每一個都通過底下第 4 條的條件。',
  '',
  '先不要動手。請先把這件事排成一張工作流程給我看，照這七條回答：',
  '',
  '1. 拆成哪幾塊。每一塊給一個名字，寫出它的輸入與產出',
  '2. 哪幾塊可以同時做。每一組說明它們為什麼互不相干',
  '3. 哪幾塊必須排前後。每一條指名是哪一個產出傳給下一塊',
  '4. 每一塊各寫一條完成條件，要能用程式判定，或我看一眼就能確認。寫不出來的標成「要人看」',
  '5. 每一塊都做完、合併起來之後還要驗什麼，另外列一組條件',
  '6. 退回規則：沒過的時候要回報哪些欄位、最多重試幾次、超過之後怎麼辦',
  '7. 這件事如果會跑很久或分成好幾次做，說明進度表記在哪一個檔案、每一塊記下哪些狀態、中斷之後怎麼接回去。一次就跑得完的話，直接說不需要',
  '',
  '用清單或表格回答，不要寫成一段文章。先給我這份，我看過再開工。',
].join('\n');

/** 第二段：照圖開工。三條是前面那幾頁最容易被它忽略的。 */
const PROMPT_RUN = [
  '就照你剛才排的那張流程開始做，從可以同時做的那幾塊先跑。',
  '',
  '過程中這三件事要遵守：',
  '',
  '一、一塊沒過就只退那一塊，不要連旁邊做對的一起重做。',
  '二、每做完一塊回報現在到哪一塊了，有進度表的話一併寫回去。',
  '三、推上遠端、發信給別人、付款、刪除雲端資料、公開部署，這五種先停下來問我。',
  '',
  '開工前先把這張流程寫成專案裡的一個檔案，下次同一件事直接叫你照那份做。',
].join('\n');

/** 它交出那份之後，你要自己看的三件事 */
const REVIEW = [
  {
    q: '排成前後的那幾塊，真的有東西要傳嗎',
    a: '每一條箭頭問一次：下一步讀得到上一步的什麼？說不出是哪個東西傳過去，那只是先後，叫它拆開同時做。',
  },
  {
    q: '驗收條件是不是「看起來如何」',
    a: '「品質良好」「格式正確」這種要退回去重寫，換成數得出來或看一眼就知道的。',
  },
  {
    q: '會跑很久的那種，有沒有說進度表記在哪一個檔案',
    a: '40 支影片這種規模才需要。沒寫的話狀態留在對話裡，換一個對話、換一台電腦就接不回去。一次做得完的小事不用。',
  },
];

export default function SlideGraphBuild() {
  return (
    <SlideLayout
      title="兩段 Prompt：先排 Graph，再照著開工"
      subtitle="Two Prompts and Three Ways to Run It"
      icon={MessageSquare}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1}>
          <h3 className="text-slate-100 text-lg font-bold mb-3">如何和 Claude 討論工作流程？</h3>
          <CopyBlock
            label="第一段　先排 Graph"
            note="貼完先停，不要讓它直接開工。題目換成你自己的，七條照抄"
            text={PROMPT_PLAN}
            size="xs"
          />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-6 py-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Search aria-hidden="true" size={17} className="text-sky-300 shrink-0" />
            <h3 className="text-sky-300 text-base font-bold">它交出來之後，你自己看這三件事</h3>
          </div>
          <div className="space-y-2">
            {REVIEW.map((r, i) => (
              <div key={r.q} className="flex gap-3 items-start">
                <span className="font-mono text-sm text-slate-500 shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="text-slate-100 text-base leading-relaxed font-bold">{r.q}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{r.a}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <CopyBlock label="第二段　照 Graph 開工" note="改完上面那三件事再貼" text={PROMPT_RUN} size="xs" />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-2 mb-2.5">
            <PlayCircle aria-hidden="true" size={17} className="text-slate-400 shrink-0" />
            <h3 className="text-slate-100 text-base font-bold">跑起來有三種做法，從你盯著到它自己跑</h3>
          </div>
          <div className="space-y-2.5">
            <div className="flex gap-3 items-baseline">
              <span className="text-slate-100 text-base font-bold w-28 shrink-0">你自己當閘門</span>
              <span className="text-slate-400 text-sm leading-relaxed">
                一塊一塊交代，每一塊做完你自己看，沒過就照那張退回單退回去。
                慢，但你每一步都知道發生什麼事，<strong className="text-slate-300">第一次從這裡開始</strong>。
              </span>
            </div>
            <div className="flex gap-3 items-baseline">
              <span className="text-slate-100 text-base font-bold w-28 shrink-0">叫它自己跑</span>
              <span className="text-slate-400 text-sm leading-relaxed">
                <code className="font-mono text-orange-300">workflow</code> 是 Claude Code
                把一套流程寫成腳本的功能，分工那一段用過。在那句話裡多加一句「用 workflow 跑這件事」，
                它就會照你排的這張 Graph 現場寫一支腳本，然後自己跑完。
              </span>
            </div>
            <div className="flex gap-3 items-baseline">
              <span className="text-slate-100 text-base font-bold w-28 shrink-0">讓它定時自己跑</span>
              <span className="text-slate-400 text-sm leading-relaxed">
                每天要跑一次的那種，打 <code className="font-mono text-orange-300">/schedule</code>{' '}
                講好時間就行，不用另外接排程工具。它跑在雲端，筆電闔上也照跑
                （Pro 以上的方案，這個功能還在測試階段）。
              </span>
            </div>
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            <strong className="text-slate-200">跑順了就存起來。</strong>
            打 <code className="font-mono text-orange-300">/workflows</code> 選那一次按{' '}
            <code className="font-mono text-slate-300">s</code>，它會存進這個專案，
            以後打那個名字就重跑同一張 Graph，同一件事再做一次不用重排。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={5} label="說到底，就是在排一個團隊的工作流程">
          一個產品要走過需求蒐集、PRD、Wireframe、設計稿、前後端開發、測試。
          這幾關通常被排成一條直線，每一關等前一關整個做完才開始。
          <span className="block mt-2">
            但裡面有不少其實不用等。
            <strong className="text-slate-300">Wireframe 一出來，後端就可以開始規劃資料結構</strong>；
            設計稿還在調顏色的時候，API 要回哪些欄位已經定得下來。
          </span>
          <span className="block mt-2">
            這只是其中一個例子。
            <strong className="text-slate-300">每一關 AI 自己做得愈完整，留給你的就愈集中在這一層</strong>：
            哪幾關可以同時走、誰非等誰不可、每一關怎樣算做完。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
