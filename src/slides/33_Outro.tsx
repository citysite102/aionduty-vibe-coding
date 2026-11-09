import { Network, Check } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

/**
 * 整門課的最後一頁。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 病根是六個階段與六條驗收清單在講同一件事，讀者會把兩張六條對起來然後對不上。
 * 現在六階段留著當主視覺（說明壓到一句），**清單收成三個問題**。
 *
 * 三個問題是這一頁要讓學員帶走的東西：能交辦嗎、能驗收嗎、能再做一次嗎。
 * **不要再把它們擴回六條**，那正是這一輪要解的重複。
 *
 * 2026-11-09 複查整堂課的收尾（講師要求）補了兩件：
 *   1. **六個階段各掛一樣這門課裡做過的東西**（sky 那一行）。原本六段只有抽象的定義，
 *      學員走完兩百多頁，最後一頁看不見自己走過的路。現在定義掛三行規格、規劃掛任務拆解
 *      與依賴並行、執行掛 Claude Code 與權限模式與 Git、驗收掛測試與 Hooks 與審查子代理、
 *      恢復掛停止條件與重試上限、重用掛 `CLAUDE.md` 與 Skill。
 *      **那一行不是裝飾，是這一頁唯一在收整堂課的東西，不要刪。**
 *      掛的是東西的名字，不是章節編號，也不寫「你學過了」（D-2 的進度安撫）。
 *   2. 「復原」統一成「恢復」，跟 Slide 201 與 Slide 211 的講法一致。
 *
 * **六階段不是線性流程。** 畫面上那三條回頭的線是刻意的，不要為了版面整齊拿掉：
 *   驗收沒過 → 回到規劃或執行
 *   執行出事 → 走恢復
 *   重用的時候 → 規格可能要更新、要重新驗一次
 * 恢復**不是**每次成功執行都要經過的固定站，所以它的線是虛線、而且從執行岔出去。
 *
 * ⚠ 2026-11-09 之前這三條**只存在於這段註解與底下那句文字裡，畫面上沒有線**。
 * 現在六格底下真的畫出來了（`LOOPS`），線寬與色跟每一格上緣那條
 * `border-t-2 border-sky-500/30` 同一組，讀起來才是同一個系統。
 * 量過的高度（2026-11-09，視窗 1920×873）：內容區 `scrollHeight` 819px
 * 加上頁面自己的 244px，**視窗低於約 1063px 會需要捲動**，全螢幕 1080p 放得下。
 *
 * 六個階段的名字與順序跟 Slide 201 綁著（定義／規劃／執行／驗收／恢復／重用），
 * **改一邊就要改另一邊**。講師規格曾經寫 RECOVER｜復原，2026-11-09 統一成「恢復」，
 * 全片只留這一個說法，不要再混用。
 *
 * 知識正確性，這幾句都是講師指定要守住的，不要在縮字的時候改掉語氣：
 *   重用不等於完全不用改
 *   可以重複執行不等於每次輸出都一樣
 *   恢復包含停止、重試、修正、接管，必要時回退
 *   驗收不能只靠 Agent 自己說它做完了
 *   流程能重用，不代表已經符合正式生產環境的維運要求
 *   這六個階段不是業界唯一標準
 * 它們寫在六階段底下那一行與三個問題的補充句裡，**不要整段刪掉換成金句**。
 *
 * 2026-11-08 被指名刪掉的，**不要加回來**：
 *   「寫得下來的，它才做得出來。」「Vibe Coding 讓你第一次就做得出來⋯」
 *   「這六條你答得出『有』，這門課就帶得走」「還沒走到部署那一步也沒關係⋯」
 *   最後那一句「未來真正重要的，不只是⋯而是⋯」
 * 理由同一條：押節奏、對仗、口語化，讀起來像金句但沒有增加資訊量（D-2）。
 *
 * **底部那一句「一次成功是作品；能夠反覆交付，才是工作系統。」是講師指定的原句。**
 * 它形狀上接近收尾金句，但它是這一頁的論點本身，而且周圍刻意留白、不堆別的話。
 * **不要在掃對仗的時候把它改掉，也不要在它旁邊加東西。**
 *
 * 標題砍過字：講師原句「從做出作品，到建立能反覆交付的工作系統」量起來 38 寬，
 * 在一千像素左右的視窗會折行（實測容量約 38，含英數更吃虧）。現在這句 34 寬。
 *
 * 版面：背景那兩圈慢速虛線環與光暈保留（最後一頁要跟內容頁有區別）。
 * 用色：sky（階段與三個問題）一種。
 */

/** 六個階段。名稱與順序跟 Slide 201 綁著，說明各一句，不要再長回兩行。 */
const STAGES = [
  { k: '定義', en: 'Define', v: '說清楚工作目標、限制與完成條件。', from: '三行規格、完成條件' },
  { k: '規劃', en: 'Plan', v: '拆解步驟、角色、工具與相依關係。', from: '任務拆解、依賴與並行' },
  { k: '執行', en: 'Execute', v: '執行任務，留下進度、狀態與操作紀錄。', from: 'Claude Code、權限模式、Git' },
  { k: '驗收', en: 'Verify', v: '用明確、檢查得了的標準確認成果。', from: '測試、Hooks、審查子代理' },
  { k: '恢復', en: 'Recover', v: '失敗時能停止、重試、修正，或交給人接管。', from: '停止條件與重試上限' },
  { k: '重用', en: 'Reuse', v: '保存已經驗證過的規則與流程，下次接得上。', from: 'CLAUDE.md 與 Skill' },
];

/**
 * 三條回頭的線。`from`／`to` 是 `STAGES` 的 index，`depth` 決定它走第幾層：
 * **跨得寬的走外層**，不然前兩條會疊在一起（驗收→規劃 蓋住 執行→恢復）。
 *
 * 2026-11-09 之前這三條只存在於底下那句文字裡，檔頭卻寫著「畫面上那三條回頭的線是刻意的」，
 * 兩邊對不起來。現在真的畫出來了，**那一句文字沒有刪**：六欄排不下的視窗（`lg` 以下）
 * 不畫線，那時候只剩那一句；而且它後半那兩句（恢復是岔路、這不是業界唯一標準）本來就要留。
 *
 * 線上**不掛文字**。三條的深度只差 12px，掛了一定會疊；順序與說法照底下那一句讀就夠了。
 * 恢復那條是虛線而且從執行岔出去（檔頭：它不是每次都會走到的固定站）。
 *
 * ⚠ 每一條是 `border-b-2 border-l-2 border-r-2` 的 ⊔，**那個 `border-l` 不是 A-1 禁止的
 * 左側色條**。A-1 擋的是拿色條去強調一塊文字（那種要用 `Callout` 的整框染色），
 * 這裡的三條邊是畫出來的線本身，拿掉就沒有圖了。掃 `border-l-[0-9]` 的時候不要順手清掉。
 */
const LOOPS = [
  { key: 'recover', from: 2, to: 4, depth: 0, dashed: true },
  { key: 'verify', from: 3, to: 1, depth: 1, dashed: false },
  { key: 'reuse', from: 5, to: 0, depth: 2, dashed: false },
];

/** 第 i 格的水平中心，用百分比。六欄等寬等距，所以中心就是 (i + 0.5) / 6。 */
const cx = (i: number) => ((i + 0.5) / STAGES.length) * 100;

/** 三個自我檢查。這是學員要帶回工作用的框架，**不要再擴回六條**。 */
const ASK = [
  {
    n: '1',
    q: '能交辦嗎？',
    v: '換一輪對話、換一個 Agent，或是換一個接手的人，都讀得懂任務目標、工作範圍與重要限制嗎？',
  },
  {
    n: '2',
    q: '能驗收嗎？',
    v: '不靠 Agent 自己說它做完了，你也能照明確的標準確認成果合不合格嗎？',
  },
  {
    n: '3',
    q: '能再做一次嗎？',
    v: '流程失敗的時候接得回來，而且下次執行不必把規則與步驟重建一遍嗎？',
  },
];

export default function SlideOutro() {
  return (
    <SlideLayout title="從做出作品，到建立能反覆交付的工作系統" subtitle="From One-off to Repeatable" icon={Network}>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col px-4 pb-8 pt-2">

        {/* 背景：兩圈慢速虛線環與一團光暈。最後一頁刻意跟內容頁有區別。 */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[800px] w-[800px] rounded-full border border-dashed border-sky-500/10 opacity-40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
            className="absolute h-[600px] w-[600px] rounded-full border border-dashed border-sky-500/10 opacity-40"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[14%] h-[340px] w-[340px] rounded-full bg-sky-500/20 blur-[90px]"
          />
        </div>

        <AnimatedBlock stepIndex={1} className="relative z-10 max-w-4xl">
          <p className="text-lg leading-relaxed text-slate-300">
            做出來只是第一步。
            <strong className="text-slate-100">真正要建立的，是下次仍然能照規格完成、檢查得了結果，而且處理得了失敗的能力。</strong>
          </p>
        </AnimatedBlock>

        {/* 六個階段。三條回頭的線是這一塊的重點，不要為了整齊拿掉。 */}
        <AnimatedBlock stepIndex={2} className="relative z-10 mt-6 w-full">
          <ol className="grid grid-cols-2 gap-x-5 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
            {STAGES.map((s, i) => (
              <li key={s.en} className="border-t-2 border-sky-500/30 pt-2.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                  <span className="text-base font-bold text-slate-100">{s.k}</span>
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-sky-500">{s.en}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.v}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-sky-200/90">{s.from}</p>
              </li>
            ))}
          </ol>

          {/*
            三條回頭的線。每一條是一個 ⊔：兩端的直線往上接回它連的那兩格，底下一條橫線。
            `▲` 標的是終點那一端。只在六欄並排（`lg`）時畫得準，窄視窗就只留底下那一句。
          */}
          <div className="relative mt-1.5 hidden h-10 lg:block" aria-hidden="true">
            {LOOPS.map((l) => {
              const a = cx(l.from);
              const b = cx(l.to);
              const back = b < a;
              return (
                <div
                  key={l.key}
                  className={`absolute top-0 border-b-2 border-l-2 border-r-2 border-sky-500/30 ${
                    l.dashed ? 'border-dashed' : ''
                  }`}
                  style={{
                    left: `${Math.min(a, b)}%`,
                    width: `${Math.abs(b - a)}%`,
                    height: 12 + l.depth * 12,
                  }}
                >
                  <span
                    className={`absolute top-0 font-mono text-xs leading-none text-sky-500/60 ${
                      back ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
                    }`}
                  >
                    ▲
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
            <span className="font-mono text-slate-600">↻</span>{' '}
            驗收沒過，回到規劃或執行；執行出事，走恢復；重用的時候，規格可能要更新、也要再驗一次。
            <span className="mt-1 block text-slate-500">
              恢復不是每次都會走到的站，它是出事時的那一條岔路。這六段是這門課整理出來的順序，不是業界唯一的標準。
            </span>
          </p>
        </AnimatedBlock>

        {/* 三個自我檢查。清單從六條收成三題，不要再擴回去。 */}
        <AnimatedBlock stepIndex={3} className="relative z-10 mt-6 w-full">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-slate-100">帶回去用的三個問題</h3>
            <ol className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-3">
              {ASK.map((a) => (
                <li key={a.n}>
                  <div className="flex items-baseline gap-2">
                    <Check aria-hidden="true" size={15} className="shrink-0 translate-y-0.5 text-sky-400" />
                    <h4 className="text-base font-bold text-slate-100">{a.q}</h4>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{a.v}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-slate-800 pt-3 text-sm leading-relaxed text-slate-500">
              重用不等於完全不用改，可以重複執行也不等於每次輸出都一樣。
              三題都答得出來，代表這套流程接得下去；要上正式環境，維運那邊還有另一套要求。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="relative z-10 mt-auto pt-10">
          <p className="text-2xl font-bold leading-relaxed text-slate-100 md:text-3xl">
            一次成功是作品；能夠反覆交付，才是工作系統。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
