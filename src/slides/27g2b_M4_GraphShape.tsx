import { Network, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元 7-4 第三頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * 這一頁跟上一頁原本是同一頁，2026-11-04 量過之後拆開（溢出 1049px，要捲兩次）。
 * 上一頁擺問題，這一頁給答案：同一個題目畫成圖長什麼樣，以及值不值得畫。
 *
 * ⚠ 這一頁最不能刪的是「不需要 40 個 Agent」那一塊。
 * 前面整個章節六在講多 Agent 分工，學員很容易把工作圖讀成「開四十個分身」。
 * 這個例子真正需要的是一個轉錄服務、一個校稿的模型、一段驗格式的程式。
 * 同一塊也點名 n8n 與 Make，因為學員手上可能已經在用，那就是工作圖。
 *
 * 用色：閘門與四個判斷問題 sky，其餘灰階，合計一種（A-1）。
 * **不要給每支影片不同顏色**（A-1：要分組用圖形不要用顏色）。
 * 圖裡那幾行小字走 `text-xs`，那是圖表註記不是內文，A-4 允許。
 */

const PER_VIDEO = ['語音轉錄', '專有名詞修正', '品質檢查'];

/**
 * 詞庫漏詞怎麼補。2026-11-04 從三段文字改成三步流程圖（講師要求），
 * 因為它本來就是一條線：發現在下游、補在上游、重跑只補受影響的那幾支。
 * 中間那一格標成 sky，那是整段的重點：**不是改第 17 支**。
 */
const FIXFLOW = [
  { t: '第 17 支檢查出一個詞', n: '詞庫裡沒有它' },
  { t: '補進共用詞庫', n: '補的是上游那份表，不是第 17 支', key: true },
  { t: '重跑用到那個詞的那幾支', n: '轉錄稿搜一下就知道是哪幾支' },
];

/** 上一頁那五題，各由圖上哪一塊回答。順序跟上一頁那五題一致，改那一頁要回來改這裡（B-6）。 */
const ANSWERS = [
  { q: '第 23 支失敗了，從哪裡接回去', a: '進度表上記著每一支跑到哪，重跑那一支就好' },
  { q: '能不能同時跑，會不會打爆限額', a: '同時最多幾支是你設的上限，進度表排出接下來輪到誰' },
  { q: '品質不合格要不要整支重轉', a: '閘門判定，沒過的那一支退回去重跑' },
  { q: '中斷之後哪幾支已經好了', a: '狀態寫在進度表這個檔案裡，對話關掉也還在' },
  { q: '每一支是不是同一把尺', a: '同一個閘門跑 40 次，標準只有一套' },
];

/**
 * 四個情境，從「不用」排到「正好是」。
 * 2026-11-04 講師要求把原本四個抽象的判斷問題換掉：那四題讀者答得出是／不是，
 * 但答完還是不知道自己手上那件事算哪一種。情境看得出來。
 *
 * 第一個情境用計時器，**不要換成案例四的許願神社**：神社排在章節八，
 * 學員在這裡還沒看過（B-4）。計時器是他自己做的，上一頁才剛加完航行日誌。
 */
const SCENARIOS = [
  {
    title: '幫計時器加一個新功能',
    verdict: '不用',
    why: 'Claude Code 一輪就把規劃、實作、測試、修正做完了。它中間自己派幾個子代理，也不等於你要畫一張圖。',
  },
  {
    title: '同時開發電商的會員、商品、購物車',
    verdict: '可能用得上',
    why: '三塊各有自己的測試與驗收條件。你說得出哪幾塊同時做、哪一塊非等不可，整合失敗也知道退回哪一個。',
  },
  {
    title: '每天跑一次的競品整理',
    verdict: '很適合',
    why: '幾個來源同時收，但要全部收完才合併去重；合併完才分得出價格、活動、商品三個角度，那三個又可以同時跑；最後併成一份報告。有要等的、有能同時做的，而且明天還要再跑一次。',
  },
  {
    title: '40 支影片轉字幕',
    verdict: '就是這種',
    why: '40 支彼此獨立，每一支裡面是同一串固定的節點，某一支壞掉只重跑那一支。依賴只有一條，但那一條擋住全部：共用詞庫沒出來，40 支都不能開始。',
  },
];

const VERDICT_TONE = {
  '不用': 'text-slate-400 border-slate-700',
  '可能用得上': 'text-slate-300 border-slate-600',
  '很適合': 'text-sky-300 border-sky-500/40',
  '就是這種': 'text-sky-300 border-sky-500/40',
};

export default function SlideGraphShape() {
  return (
    <SlideLayout
      title="從一條直線到一張圖：什麼情況值得畫"
      subtitle="The Same Job, Drawn"
      icon={Network}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex flex-col items-center">
            <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 px-6 py-2 text-center">
              <div className="text-sky-300 text-base font-bold">先轉三支，整理出一份共用詞庫</div>
              <div className="text-slate-400 text-xs mt-0.5">40 支都要等它做完才能開始</div>
            </div>

            <div className="w-px h-3 bg-slate-700" />

            <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-2 text-center">
              <div className="text-slate-100 text-base font-bold">40 支影片排成一張進度表</div>
              <div className="text-slate-500 text-xs mt-0.5">每一支記著現在跑到哪、過了沒有</div>
            </div>

            <div className="w-px h-3 bg-slate-700" />
            <div className="w-full border-t border-slate-700" />

            <div className="w-full grid grid-cols-3 gap-3">
              {['影片 01', '影片 02', '影片 N'].map((v) => (
                <div key={v} className="flex flex-col items-center">
                  <div className="w-px h-3 bg-slate-700" />
                  <div className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2">
                    <div className="text-slate-100 text-sm font-bold text-center">{v}</div>
                    <div className="text-slate-400 text-xs text-center mt-1 leading-relaxed">
                      {PER_VIDEO.join('　→　')}
                    </div>
                    <div className="mt-1.5 pt-1.5 border-t border-dashed border-slate-700 text-slate-500 text-xs text-center">
                      壞掉只重跑這一支
                    </div>
                  </div>
                  <div className="w-px h-3 bg-slate-700" />
                </div>
              ))}
            </div>

            <div className="w-full border-t border-slate-700" />
            <div className="w-px h-3 bg-slate-700" />

            <div className="rounded-xl border border-sky-500/30 bg-sky-500/5 px-6 py-2 text-center">
              <div className="text-sky-300 text-base font-bold">統一的驗收閘門</div>
              <div className="text-slate-400 text-xs mt-0.5">檔案格式、時間軸、有沒有漏段、錯誤清單</div>
            </div>

            <div className="w-px h-3 bg-slate-700" />

            <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-2 text-center">
              <div className="text-slate-100 text-base font-bold">40 份 SRT，外加一張待人工複核的清單</div>
            </div>
          </div>
        </AnimatedBlock>

        {/* 上一頁那五題，圖上各由哪一塊回答 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-3">那五題，各由圖上哪一塊回答</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {ANSWERS.map((r) => (
                <div
                  key={r.q}
                  className="grid grid-cols-[1.1fr_1.3fr] gap-5 py-1.5 border-b border-slate-800/70 last:border-0 items-baseline"
                >
                  <span className="text-slate-400 text-sm leading-relaxed">{r.q}</span>
                  <span className="text-slate-200 text-sm leading-relaxed">{r.a}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-2.5">
            三題靠那張進度表，兩題靠閘門。
            <strong className="text-slate-200">進度表是一個檔案，不在模型的腦子裡</strong>，
            對話關掉它還在。
          </p>
        </AnimatedBlock>

        {/* 詞庫漏詞怎麼補：上游改一次，下游只補受影響的那幾支 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-3">詞庫漏了一個詞，補哪裡</h3>
          <div className="flex items-stretch gap-2 flex-wrap">
            {FIXFLOW.map((step, i) => (
              <div key={step.t} className="flex items-stretch gap-2">
                <div
                  className={`rounded-xl border px-4 py-2.5 w-52 ${
                    step.key ? 'border-sky-500/40 bg-sky-500/5' : 'border-slate-700 bg-slate-950'
                  }`}
                >
                  <div className={`text-sm font-bold ${step.key ? 'text-sky-300' : 'text-slate-100'}`}>
                    {step.t}
                  </div>
                  <div className="text-slate-500 text-xs mt-1 leading-relaxed">{step.n}</div>
                </div>
                {i < FIXFLOW.length - 1 && (
                  <ArrowRight aria-hidden="true" size={15} className="text-slate-600 self-center shrink-0" />
                )}
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-3">
            整批不用重來，但也不能只改那一支。
            <strong className="text-slate-200">改上游的那一次，下游全部要跟著對一遍</strong>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-1.5">這張圖不需要 40 個 Agent</h3>
          <p className="text-slate-400 text-base leading-relaxed">
            只要一個轉錄服務、一個校正專有名詞的模型，加一段驗檔案格式的程式。
            <strong className="text-slate-200">Graph 講的是流程怎麼排、狀態記在哪、壞掉怎麼接回去</strong>，
            跟你派幾個 Agent 是兩件事。你如果已經在用 n8n、Make，或一段每天自己跑的腳本，
            <strong className="text-slate-200">那就是一張 Graph，只是沒有人用這個名字講它</strong>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-6 py-4">
          <h3 className="text-sky-300 text-base font-bold mb-3">四種情境，哪幾種才需要畫</h3>
          <div className="space-y-2">
            {SCENARIOS.map((sc) => (
              <div key={sc.title} className="border-b border-sky-500/15 last:border-0 pb-2 last:pb-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-slate-100 text-base font-bold">{sc.title}</span>
                  <span className={`rounded-md border px-2 py-0.5 text-sm font-bold ${VERDICT_TONE[sc.verdict as keyof typeof VERDICT_TONE]}`}>
                    {sc.verdict}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mt-0.5">{sc.why}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={6}>
          落在第一種情境就讓它跑一輪就好。一件小事拆成好幾塊，光是切開、傳來傳去、再接回來，
          花的時間跟錢就比直接做完還多。差別在量、在會不會重複做、在壞掉能不能只補一塊。
        </Callout>

      </div>
    </SlideLayout>
  );
}
