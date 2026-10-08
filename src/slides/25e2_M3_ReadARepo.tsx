import { BookOpenCheck, Star, Scale, RefreshCw } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 2026-10-08 新增（講師要求）：前一頁第一次把學員送去一個 GitHub 專案頁，而這門課有一半的人
 * 不寫程式。他打開那個網址會看到滿畫面英文、badge 跟程式碼，然後關掉。
 * 這一頁要解的就是那一秒：看哪五個地方、哪些可以直接跳過、看不懂怎麼辦。
 *
 * 所以這一頁的位置是硬的：**一定要在第一個 GitHub 連結出現之後、第二個出現之前**。
 * 後面的 OpenMontage、codebase-memory-mcp、graft 都是叫學員自己去看那一頁，
 * 沒有先教讀法，那三頁就只是三個名字。搬頁之前先確認這件事（B-4）。
 *
 * **主體是左邊那張仿真圖，不是文字。** 2026-10-08 第一版整頁都是五張說明卡，講師指出字太多。
 * 現在改成畫一個 GitHub 專案頁的樣子，把 01 到 05 的記號標在它真正的位置上，右邊只留一行說明。
 * 仿真的理由跟 `11b_M1_ClaudeCodeUI` 同一條：學員要拿畫面去對照他自己螢幕上的那一個，
 * **所以版面位置要對**（描述在倉庫名底下、授權與星數在右欄、Issues 在分頁列），不要為了好看重排。
 * 那張圖裡的內容刻意用 agency-agents 的真實資料，跟前一頁是同一個專案。
 *
 * 五個地方的順序是設計過的，不要重排：先確認它是什麼（描述），再確認它還活著（更新時間），
 * 再確認公司能不能用（授權），最後才看裝法與別人的災情。順序顛倒的話，
 * 學員會先去讀安裝指令，然後卡在一個根本不該裝的東西上。
 *
 * **「可以跳過的」那一塊不要刪。** 對不寫程式的人來說，知道哪些可以不看，
 * 比知道哪些要看更能解除恐慌。這一條是講師的要求。
 *
 * 底下那段 Prompt 是這一頁真正會被用到的東西，寫成 `CopyAction` 讓它可以複製。
 * **畫面上印的字與複製拿到的字必須是同一份**（A-4），所以兩邊共用 `ASK_CLAUDE` 這個常數，
 * 不要改成一邊寫 JSX 一邊寫字串。
 *
 * 語氣跟前一頁一致走「我們」，不要改回「你」（講師 2026-10-08 的要求）。
 *
 * 強調色兩種：sky（五個記號與那段 Prompt）與 amber（看到 curl 要停一下）。
 */

const ASK_CLAUDE = `這是一個 GitHub 專案的說明頁，我不寫程式。
請用三句話告訴我：
1. 它解決什麼問題，給誰用的
2. 裝它之前我要先有什麼
3. 裝了之後它會動到我電腦上的哪些東西，資料會不會送出去
不要講技術細節，用我看得懂的話。`;

const SPOTS = [
  { n: '01', t: '最上面那段描述', d: '它是什麼、給誰用的。看不懂就整段複製下來問 Claude。' },
  { n: '02', t: '星星數與最後更新', d: '多少人覺得它有用、還有沒有人在維護。半年沒動過的先不要裝。' },
  { n: '03', t: 'License（授權）', d: 'MIT、Apache 公司通常可以用。看到 AGPL 先問法務，不要自己決定。' },
  { n: '04', t: 'Installation', d: '裝法在這一段。開頭是 curl 後面接 bash 的，先停一下。' },
  { n: '05', t: 'Issues 分頁', d: '別人撞到的問題。整排都是「裝不起來」就先別裝。' },
];

const SKIP = ['程式碼本身', 'Pull requests', 'Actions', 'Insights', '上面那排彩色標籤', '效能數據比較'];

/** 記號圓點。位置要跟真的 GitHub 版面對得上，改版型的時候連記號一起搬。 */
function Mark({ n, className = '' }: { n: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/50 font-mono text-xs text-sky-300 ${className}`}
    >
      {n}
    </span>
  );
}

export default function SlideReadARepo() {
  return (
    <SlideLayout title="如何使用一個 GitHub 第三方工具？" subtitle="How to Read a Repo" icon={BookOpenCheck}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              GitHub 的專案頁通常是滿滿的英文，還有一堆看不懂的按鈕跟一大片程式碼。
              <strong className="text-slate-100">不用擔心，這種頁面的版型是固定的</strong>，
              全世界的開源專案長得都一樣。知道東西放在哪，五分鐘就能決定要不要再花時間。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-sm text-slate-200">msitarzewski / <strong className="text-slate-100">agency-agents</strong></p>
                <span className="flex items-center gap-1.5 shrink-0">
                  <Mark n="02" />
                  <span className="flex items-center gap-1 rounded-md border border-slate-700 px-2 py-0.5 text-slate-300 text-xs">
                    <Star aria-hidden="true" size={12} /> 158k
                  </span>
                </span>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <Mark n="01" className="mt-0.5" />
                <p className="text-slate-400 text-sm leading-snug">
                  A complete AI agency at your fingertips. Each agent is a specialized expert with
                  personality, processes, and proven deliverables.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 px-4 pt-2 border-b border-slate-800 text-sm">
              <span className="text-slate-200 pb-2" style={{ borderBottom: '2px solid #fd8c73' }}>
                Code
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 pb-2">
                <Mark n="05" />
                Issues <span className="text-slate-500">60</span>
              </span>
              <span className="text-slate-600 pb-2">Pull requests</span>
              <span className="text-slate-600 pb-2">Actions</span>
              <span className="text-slate-600 pb-2">Insights</span>
            </div>

            <div className="grid grid-cols-[1.45fr_1fr] divide-x divide-slate-800">
              <div className="px-4 py-3 space-y-2.5">
                <p className="text-slate-500 text-xs font-mono">README.md</p>
                <div className="space-y-1">
                  <div className="h-1.5 rounded bg-slate-800 w-11/12" />
                  <div className="h-1.5 rounded bg-slate-800 w-9/12" />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Mark n="04" />
                  <p className="text-slate-200 text-sm font-bold">Installation</p>
                </div>
                <p className="font-mono text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5">
                  ./scripts/install.sh
                </p>
                <div className="space-y-1 pt-1">
                  <div className="h-1.5 rounded bg-slate-800 w-10/12" />
                  <div className="h-1.5 rounded bg-slate-800 w-7/12" />
                </div>
              </div>

              <div className="px-4 py-3 space-y-2.5">
                <p className="text-slate-300 text-sm font-bold">About</p>
                <div className="space-y-1">
                  <div className="h-1.5 rounded bg-slate-800 w-11/12" />
                  <div className="h-1.5 rounded bg-slate-800 w-8/12" />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Mark n="03" />
                  <span className="flex items-center gap-1.5 text-slate-200 text-sm">
                    <Scale aria-hidden="true" size={13} className="text-slate-400" /> MIT license
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <Star aria-hidden="true" size={13} className="text-slate-500" /> 158k stars
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 text-sm">
                  <RefreshCw aria-hidden="true" size={13} className="text-slate-500" /> Updated 2 days ago
                </span>
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="text-slate-100 text-base font-bold mb-2">這幾塊可以直接跳過</h3>
            <div className="flex flex-wrap gap-2">
              {SKIP.map((s) => (
                <span key={s} className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-400 text-sm">
                  {s}
                </span>
              ))}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-2.5">
              這幾塊是寫給維護這個專案的人看的，不是寫給要用它的人。
            </p>
          </AnimatedBlock>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2">
            {SPOTS.map((s) => (
              <div key={s.n} className="flex items-start gap-2.5">
                <Mark n={s.n} />
                <p className="text-slate-400 text-sm leading-relaxed">
                  <strong className="text-slate-100">{s.t}</strong>
                  <span className="text-slate-600 mx-1.5">／</span>
                  {s.d}
                </p>
              </div>
            ))}
            <p className="text-slate-500 text-sm leading-relaxed pt-2 border-t border-slate-800">
              順序有意義：先確認它是什麼、再確認它還活著、再確認公司能不能用，最後才看怎麼裝。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-1.5">看不懂就把整頁交給 Claude</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              把網址貼給它，後面接這段話。要的不是翻譯，是把那一頁換成做得了決定的三件事。
            </p>
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 mt-3">
              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-mono">{ASK_CLAUDE}</p>
            </div>
            <CopyAction text={ASK_CLAUDE} className="mt-2" />
          </AnimatedBlock>

          <Callout tone="warn" label="它叫我們裝東西的時候" stepIndex={6}>
            先確認那行指令要在哪裡打，以及它會不會動到我們正在做的那個資料夾。
            不確定就直接問它：這行指令會改到我電腦上的哪些檔案？另外，想試新工具就開一個空資料夾裝裝看，
            不要直接裝在手上那個專案裡。
          </Callout>
        </div>

      </div>
    </SlideLayout>
  );
}
