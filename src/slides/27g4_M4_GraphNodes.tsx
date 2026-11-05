import { Boxes, Code2, Undo2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元 7-4 第五頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 這一頁的職務 ────────────────────────────────────────────
 * 兩件跑的時候才會遇到的事：節點有四種（其中一種不用模型），以及退回要退哪一塊。
 *
 * 「程式節點」那一塊跟 Slide 94 一帶講 Hook 的那句「寫成文字每一次都要它重新判斷一遍，
 * 寫成程式每一次都照同一段跑」是同一個道理的延伸，**改其中一邊要回來看另一邊（B-6）**。
 * 這裡不要再寫一次「程式才是真的 100% 攔得住」那種話，那條在 Slide 73 被否決過。
 *
 * 退回那一段接的是 `25_M3_Quality`（設一道會退回的品質防線）。
 * 那一頁講的是怎麼讓它會退回，這一頁只補「退回的時候要退多少」。
 * **不要在這裡重教審查子代理怎麼建（B-5）。**
 *
 * 退回單是 CopyBlock，畫面上印的就是複製到的那一份（A-4）。
 * 右邊那張對照表解釋的是每一行在幹嘛，不是把同一份字再寫一次，
 * **改 RETURN_SLIP 的欄位就要回來改 SLIP_GLOSS。**
 *
 * 用色：程式節點那一塊 sky，退回那一塊 rose 配通過的 emerald（成對算一種），合計兩種（A-1）。
 */

const NODE_KINDS = [
  { name: '拆解', duty: '把一件大事切成幾塊，決定誰等誰', who: '模型加上你定的規則' },
  { name: '執行', duty: '做完其中一塊，自己測、自己修', who: '一個 Agent，或一個現成的服務' },
  { name: '程式節點', duty: '合併、排序、去重、比對前後差異', who: '一段程式，不用模型', highlight: true },
  { name: '閘門', duty: '看證據決定退回、要你點頭，還是直接放行', who: '程式檢查，必要時加人看' },
];

/** 畫面上印的就是複製到的那一份（A-4）。改這裡要同步改下面的 SLIP_GLOSS。 */
/**
 * 2026-11-04 改掉技術版。原本 evidence 寫 `auth/login.ts 第 88 行`、scope 寫檔名，
 * **但學員手上沒有那兩樣東西**，課程到這裡也沒教他去找行號（D-2：叫學員做的動作，
 * 先確認他現在手上有）。他有的是畫面跟紅字，而紅字怎麼讀在 Slide 154 教過。
 * 現在每一欄都是他照著看得到的東西就填得出來的。**不要改回檔名行號版。**
 */
const RETURN_SLIP = [
  'unit: 會員登入',
  'verdict: 沒過',
  'reason: 登入成功之後沒有跳頁',
  'expected: 跳到會員首頁',
  'actual: 還停在登入頁',
  'evidence: 我按下登入，畫面沒有變。紅字寫 redirect is not defined',
  'scope: 只改登入這一塊，不要動商品、購物車、搜尋',
  'max_attempts: 3',
].join('\n');

const SLIP_GLOSS = [
  { k: 'unit', v: '指名要退回的是哪一塊' },
  { k: 'verdict', v: '判定結果，沒過就是沒過' },
  { k: 'reason', v: '哪裡沒過' },
  { k: 'expected / actual', v: '應該是什麼，實際是什麼' },
  { k: 'evidence', v: '你看到什麼：畫面、紅字、測試的輸出' },
  { k: 'scope', v: '只准動哪一塊，少了這一行它會順手改別的' },
  { k: 'max_attempts', v: '最多重試幾次，到了就停' },
];

export default function SlideGraphNodes() {
  return (
    <SlideLayout
      title="Graph 由哪四種節點組成，壞了怎麼退"
      subtitle="Node Kinds and the Return Slip"
      icon={Boxes}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        {/* 一、四種節點 */}
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-3">圖上每一格，都是這四種的其中一種</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[7rem_1.6fr_1.2fr] gap-4 pb-2 border-b border-slate-800 font-mono text-xs text-slate-500">
                <span>節點</span>
                <span>負責什麼</span>
                <span>誰來做</span>
              </div>
              {NODE_KINDS.map((n) => (
                <div
                  key={n.name}
                  className="grid grid-cols-[7rem_1.6fr_1.2fr] gap-4 py-3 border-b border-slate-800/70 last:border-0 items-baseline"
                >
                  <span className={`text-base font-bold ${n.highlight ? 'text-sky-300' : 'text-slate-100'}`}>
                    {n.name}
                  </span>
                  <span className="text-slate-300 text-sm leading-relaxed">{n.duty}</span>
                  <span className={`text-sm leading-relaxed ${n.highlight ? 'text-sky-300/90' : 'text-slate-400'}`}>
                    {n.who}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            <strong className="text-slate-200">沒有第五種「判斷節點」。</strong>
            圖上會分岔的地方只有兩個：拆解決定切成幾塊、誰走哪一條，
            閘門決定這一塊過不過、過了要不要先問你。
            一塊自己內部怎麼判斷怎麼做，那是它的事，不會畫在圖上。
          </p>
        </AnimatedBlock>

        {/* 二、程式節點 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Code2 aria-hidden="true" size={18} className="text-sky-300 shrink-0" />
            <h3 className="text-sky-300 text-base font-bold">程式節點：不用模型的那一種</h3>
          </div>
          <p className="text-slate-300 text-base leading-relaxed">
            三個節點各交回一份資料，要把它們合起來、把重複的拿掉、照分數排好。
            這件事只有一個正確答案，規則你也說得出來，
            <strong className="text-slate-100">那就寫成一段程式，不要再叫第四個 Agent 來想</strong>。
            交給模型等於多花一次錢、多等一次，而且每次跑出來還不一定一樣。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2.5">
            判斷方式：描述這件事用不到「判斷」「決定」「評估」「摘要」這四個詞，就是程式的事。
          </p>
        </AnimatedBlock>

        {/* 三、只退回失敗那一塊 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Undo2 aria-hidden="true" size={18} className="text-slate-400 shrink-0" />
            <h3 className="text-slate-100 text-base font-bold">退回那一塊，不要把整批丟回去</h3>
          </div>

          <div className="grid grid-cols-4 gap-2.5 mb-3">
            {[
              { n: '商品列表', ok: true },
              { n: '會員登入', ok: false },
              { n: '購物車', ok: true },
              { n: '搜尋', ok: true },
            ].map((t) => (
              <div
                key={t.n}
                className={`rounded-xl border px-3 py-2.5 text-center ${
                  t.ok ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-rose-500/40 bg-rose-500/5'
                }`}
              >
                <div className="text-slate-100 text-sm font-bold">{t.n}</div>
                <div className={`text-xs mt-1 ${t.ok ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {t.ok ? '通過' : '沒過'}
                </div>
              </div>
            ))}
          </div>

          <p className="text-slate-400 text-base leading-relaxed">
            把四塊一起丟回去，那三塊原本是對的也會被重寫一次，而你還得把四塊重驗一遍，
            其中任何一塊都可能這次換別的地方壞掉。
            <strong className="text-slate-200">一次失敗就這樣變成四個不確定的結果。</strong>
          </p>
        </AnimatedBlock>

        {/* 四、退回單 */}
        <AnimatedBlock stepIndex={4}>
          <p className="text-slate-400 text-base leading-relaxed mb-1.5">
            退回要帶著證據。這張單子是閘門判定沒過的時候寫的，收件人是做那一塊的節點。
            <strong className="text-slate-200">你一個人用 Claude Code 的時候，閘門就是你</strong>，
            一次改四個檔案壞了一個，回頭貼給它的就是這段話。
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-3">
            格式沒有規定。欄位名稱你要用中文也可以，寫成一段話也可以，
            <strong className="text-slate-400">要齊的是那五樣：哪一塊、過沒過、為什麼、你看到什麼、只准動哪一塊。</strong>
            少哪一樣，它就自己補一個。
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4 items-start">
            <CopyBlock label="退回單" note="貼回去給做那一塊的 Agent" text={RETURN_SLIP} size="sm" />
            <div className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 space-y-2">
              <p className="text-slate-400 text-sm leading-relaxed pb-2 border-b border-slate-800">
                <strong className="text-slate-200">檔名跟第幾行不用你找</strong>，那是它的工作。
                你給的是你看得到的：畫面怎麼了、紅字寫什麼。
              </p>
              {SLIP_GLOSS.map((g) => (
                <div key={g.k} className="flex gap-3 items-baseline">
                  <span className="font-mono text-xs text-slate-500 w-32 shrink-0">{g.k}</span>
                  <span className="text-slate-300 text-sm leading-relaxed">{g.v}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={5} label="會員登入退了三次還是沒過，然後呢" icon={Undo2}>
          <span className="block">
            「最多重試幾次」不是 Graph 才有的，我們在計時器那一輪寫過「最多 5 輪」。
            用 Loop 的時候，次數到了它就停下來等你看。
          </span>
          <span className="block mt-2">
            Graph 多一個去處：把這一塊送回給負責拆解的那個節點，請它換個切法。
            例如把「會員登入」分成「登入表單」跟「登入後跳到哪一頁」兩塊，各做各的。
            <strong className="text-slate-300">同一塊改三次都改不好，通常代表它一開始就被切得太大。</strong>
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
