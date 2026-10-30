import { Rocket, FolderPlus, FileText, ListChecks, ScrollText, LifeBuoy, Repeat } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const STEPS: {
  icon: typeof FolderPlus;
  title: string;
  body: string;
  codeLabel?: string;
  code: string[] | null;
}[] = [
  {
    icon: FolderPlus,
    title: '1. 開一個資料夾，把它叫起來',
    body: '題目挑好之後，先開一個空資料夾放它。桌面版：開 Code 頁籤，選那個資料夾。終端機：cd 進去，輸入 claude。兩邊是同一個 Claude Code，挑你順手的那個。',
    codeLabel: '走終端機的話：',
    code: ['$ mkdir my-project && cd my-project', '$ claude']
  },
  {
    icon: FileText,
    title: '2. 寫清楚你要什麼',
    body: '先寫一份規格再開工，三到五行就夠：要做什麼、不做什麼、做完要長什麼樣。案例一那七塊是完整版，第一次寫不出來就先寫這三行。',
    codeLabel: '貼給它之前，自己先答得出這三行：',
    code: ['- 要做什麼：給誰用、解決哪一件事', '- 不做什麼：這一輪先不碰的東西', '- 完成條件：做完我會去點哪裡、看到什麼才算過']
  },
  {
    icon: ListChecks,
    title: '3. 讓它做出第一版，你自己點一次',
    body: '規格給它，請它做一個跑得起來的第一版，一次只交代一件事。做完先看它改了哪幾行（問它，或打開 VS Code 左側的原始檔控制），然後自己點過一次再交代下一件。',
    code: null
  },
  {
    icon: ScrollText,
    title: '4. 每次都要重講的那幾句，才寫進 CLAUDE.md',
    body: '第一版做完，你會發現有幾句話每一輪都在講。把那幾句寫成 CLAUDE.md，之後每次進來它都會先讀。三行就可以上場，不用等它寫完整。',
    code: ['- 一律用繁體中文回覆（這條之後可以搬去家目錄那一份，每個專案就不用再寫）', '- 改任何檔案前先說你要改什麼', '- 每次改完，把功能自己點過一次再回報']
  }
];

/**
 * 2026-10-24（講師）：第 2 步原本是「第一件事不是寫功能，是寫規則」，叫學員一開工就建
 * CLAUDE.md。講師說順序不對：**先有規格，試著產出，再搭配 CLAUDE.md**。
 * 這也跟課程自己的案例一致：案例一的課前作業是寫規格，案例四是階段 1 先做出第一版、
 * 階段 2 才盤點並建立 CLAUDE.md。三個動作因此變成四個，標題跟著改。
 * **不要把 CLAUDE.md 搬回第 2 步。** 手冊還沒有東西可以對照的時候，那幾條規則是憑空想的。
 *
 * 2026-10-09：程式碼區塊的字色從 emerald 改成 slate。那個 emerald 沒有語意，
 * 只是「程式碼看起來該是綠的」的慣例，但它讓這一頁變成 sky ＋ amber ＋ emerald 三種強調色
 * （A-1 上限兩種，orange 的 /usage 不計）。**不要改回綠色。**
 */

/**
 * 2026-10-03 換掉第三條。原本是「一直卡同一個問題：不是它笨，是範圍太大。
 * 跟它說『先停，這輪只做某某一件事』」，跟前一頁（Slide 171）的 warn 一字不差，
 * 而且是相鄰兩頁、同一個單元。換成「它說做完了」那一條：
 * 那是全片最強調的驗收動作（Slide 152、153 各講過一次），但回去之後的速查清單裡沒有。
 * 三條現在各對一種失敗：跑歪了、出錯了、它說做完了但沒真的驗。
 */
const STUCK = [
  { k: '它跑歪了', v: '按 Esc 停下來。想退回更早的狀態，輸入框空著時連按兩次 Esc。' },
  { k: '出現紅字', v: '整段複製貼回去，加一句「用白話解釋這在說什麼，我不看程式碼」。' },
  { k: '它說做完了', v: '自己再點一次。它有可能用講的宣稱驗過了，卻沒有真的跑。' }
];

/** 從「一輪」變成「循環」差的頭尾三件。原本是獨立的一頁（`28c_M4_RunItAgain`），
 *  2026-10-10 那一頁刪掉，內容壓成三格搬到這裡。要再加東西就該考慮拆回去。 */
const LOOPING = [
  {
    tag: '輸入',
    body: (
      <>
        要處理的東西固定放同一個資料夾，指令裡寫「讀{' '}
        <code className="font-mono text-slate-300">data/</code>{' '}
        底下這個月的檔案」，不要把內容貼進對話。
      </>
    ),
  },
  {
    tag: '產物',
    body: (
      <>
        結果固定寫成{' '}
        <code className="font-mono text-slate-300">reports/2026-09.md</code>{' '}
        這種檔名。寫在對話裡的東西，關掉視窗就沒了。
      </>
    ),
  },
  {
    tag: '再跑一次',
    body: (
      <>
        請它把這一輪的做法整理成一份{' '}
        <code className="font-mono text-orange-300">SKILL.md</code>
        ，下次你說「用這個跑這個月的」它就展開。
      </>
    ),
  },
];

export default function SlideFirstDay() {
  return (
    <SlideLayout
      title="新專案的前四個動作"
      subtitle="Your First Day After This Course"
      icon={Rocket}
    >
      <div className="max-w-6xl mx-auto text-left">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">

          <div className="grid grid-cols-1 gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <AnimatedBlock
                  key={step.title}
                  stepIndex={idx + 1}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-100 mb-1.5">{step.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
                    {step.codeLabel && (
                      <div className="text-xs text-slate-500 mt-3">{step.codeLabel}</div>
                    )}
                    {step.code && (
                      <div className={`bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-sm text-slate-200 space-y-1 break-all ${step.codeLabel ? 'mt-1.5' : 'mt-3'}`}>
                        {step.code.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>

          <AnimatedBlock stepIndex={4} className="bg-gradient-to-b from-slate-900 to-amber-950/20 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-base font-bold text-amber-400 mb-4 flex items-center gap-2">
              <LifeBuoy size={18} />
              卡住的時候，三招
            </h4>
            <div className="space-y-3.5">
              {STUCK.map((s) => (
                <div key={s.k}>
                  <div className="text-sm font-bold text-slate-200 mb-0.5">{s.k}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
              <div className="text-sm font-bold text-slate-200">額度好像快用完了</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                輸入 <code className="text-orange-300 font-mono">/usage</code> 看還剩多少。
                快見底就先把手上這一輪收掉，不要在剩最後一點的時候開新的大工程。
              </p>
            </div>
          </AnimatedBlock>

        </div>

        {/*
          2026-10-10：〈輸入放同一個資料夾，產物寫同一個檔名〉整頁刪掉之後，
          「一輪變循環」那三件事全片就只剩兩個零散的落點（題目那頁的 SKILL.md、
          結語的「把重複的事寫成流程」），而那是章節七叫「循環」卻只教到「一輪」的缺口。
          壓成一塊接在這裡。

          **刻意不編進「前四個動作」。** 那四個是第一天，這一塊是第一次做完之後，
          不同階段；編成第 4 步會讓標題與內容對不上（D-5 列舉式標題要回去數）。
        */}
        <AnimatedBlock stepIndex={5} className="mt-5 rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2.5 mb-2">
            <Repeat aria-hidden="true" size={17} className="text-sky-400 shrink-0" />
            <h4 className="text-base font-bold text-slate-100">做完第一次之後，讓它下次還叫得動</h4>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            下個月同一件事再來，多數人會把整段話重貼一遍。
            <strong className="text-slate-200">那樣你學會的是一輪，不是循環。</strong>
            差別在這三件：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {LOOPING.map((l) => (
              <div key={l.tag} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="font-mono text-sm font-bold text-sky-300 mb-1.5">【{l.tag}】</div>
                <p className="text-sm text-slate-400 leading-relaxed">{l.body}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
