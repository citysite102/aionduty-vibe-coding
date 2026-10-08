import { AlertTriangle, Eye, Wrench, ListPlus, Table2, Calculator, ThumbsUp, LayoutTemplate } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/*
 * 每一條都要有「你會看到什麼」。只寫「子代理只會說看起來可以」，
 * 學員知道那是壞事，但認不出來自己現在就在裡面，也不知道該回它什麼。
 * sign 是現場真的會出現在畫面上的句子或狀況，fix 是當下就做得到的一句話。
 *
 * 2026-10-04（講師）：「資料表那一條，學員會想說關我什麼事。」他是對的，而且不只那一條,
 * 第 2、3 條都綁在有資料庫的專案上，這門課有一半的學員不會做那種專案。
 *
 * 刪掉不是解法，那兩條是真的。病根是**五條的共同形狀沒有寫出來**：
 * 每一條都是「你沒先寫下來的事，它就自己決定了」。
 * 開場那一塊把這件事講明，第 2、3 條就從資料庫知識變成那個形狀的兩個例子；
 * 收尾再把它們翻成不寫程式的版本。**那兩塊不要刪，刪了那兩條就又變成只有工程師看得懂。**
 *
 * 第 4 條的 fix 同一輪縮短了。原本整段重講一次「逐條回、指到第幾行、整份退回」，
 * 但那已經是〈設一道會退回的品質防線〉與〈動手做一個審查子代理〉兩頁的主線，
 * 這裡是症狀索引，指回去就好，不要第三次教。
 */
const RISKS = [
  {
    title: '需求一直長出新功能',
    icon: ListPlus,
    sign: '講到一半又想到「順便加個匯出」，它真的去做了，原本說好的那版回不去了。',
    fix: '把「這一輪先不做」寫進需求那一頁。新想到的先記下來，排進下一輪。',
  },
  {
    title: '資料表被改到看不懂',
    icon: Table2,
    sign: '它自己多開了一張表，或把欄位改了名字，你打開資料才發現對不起來。',
    fix: '改資料結構前先更新 docs/data-model.md，改完要它列出哪裡跟原本不一樣。',
  },
  {
    title: '金額計算前後不一致',
    icon: Calculator,
    sign: '列表顯示 1,000，明細加起來是 999.99，兩邊都說自己是對的。',
    fix: '先決定金額存到分、稅金與折扣誰先算，寫進規範再讓它動手。',
  },
  {
    title: '子代理只會說看起來可以',
    icon: ThumbsUp,
    sign: '你叫它審查，它回「整體結構清楚，沒有明顯問題」，一個檔名、一個行號都沒指到。',
    fix: '退回條件沒寫清楚。照前面那份 code-reviewer 的三段補：判斷標準、檢查項目、退回條件。',
  },
  {
    title: '畫面變成展示頁，不像工具',
    icon: LayoutTemplate,
    sign: '做出來滿滿的大標題、漸層跟行銷文案，真正要用的搜尋跟表格反而要找很久。',
    fix: '規範寫成列表、表單、狀態與操作這幾件事，不要寫「簡潔現代」這種形容詞。',
  },
];

export default function SlideQuoteSystemRisks() {
  return (
    <SlideLayout title="中型專案的常見卡點" subtitle="Failure Modes" icon={AlertTriangle}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-base leading-relaxed">
            五條的形狀是同一個：
            <strong className="text-slate-100">你沒先寫下來的事，它就自己決定了</strong>。
            而它決定出來的東西通常很合理，所以你當下不會發現，要到接起來的時候才看到對不上。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            所以五條的「怎麼辦」也是同一招：先寫下來，再讓它動手。
          </p>
        </AnimatedBlock>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-3 text-slate-500 text-sm">
            <span className="flex items-center gap-1.5"><Eye aria-hidden="true" size={13} /> 你會看到</span>
            <span className="flex items-center gap-1.5"><Wrench aria-hidden="true" size={13} className="text-sky-400" /> 怎麼辦</span>
          </div>
<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ${hoverIsolateGrid}`}>
          {RISKS.map((risk, index) => (
            <AnimatedBlock key={risk.title} stepIndex={index + 2} className={`rounded-lg border border-slate-800 bg-slate-950 p-4 flex flex-col ${hoverIsolateCard}`}>
              <div className="flex items-start gap-2.5 mb-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-amber-400">
                  <risk.icon aria-hidden="true" size={17} />
                </span>
                <div className="min-w-0">
                  <div className="font-mono text-slate-600 text-xs">0{index + 1}</div>
                  <h3 className="text-slate-100 text-base font-bold leading-snug">{risk.title}</h3>
                </div>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <Eye aria-hidden="true" size={14} className="text-slate-500 shrink-0 mt-1" />
                <p className="text-slate-300 text-sm leading-relaxed">{risk.sign}</p>
              </div>
              <div className="flex items-start gap-2 border-t border-slate-800 pt-3 mt-auto">
                <Wrench aria-hidden="true" size={14} className="text-sky-400 shrink-0 mt-1" />
                <p className="text-slate-400 text-sm leading-relaxed">{risk.fix}</p>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-base leading-relaxed">
            第 2、3 條看起來只跟有資料庫的專案有關，其實不是。
            <strong className="text-slate-100">只要有一份資料要跨好幾個地方用，這兩條就成立。</strong>
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            換成不寫程式的工作：第 2 條是它把你表格的欄位名稱改了，別份文件還照舊的名字在對；
            第 3 條是同一筆金額，報價單上跟請款單上算出來不一樣。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
