import { AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/*
 * 每一條都要有「你會看到什麼」。只寫「子代理只會說看起來可以」，
 * 學員知道那是壞事，但認不出來自己現在就在裡面，也不知道該回它什麼。
 * sign 是現場真的會出現在畫面上的句子或狀況，fix 是當下就做得到的一句話。
 */
const RISKS = [
  {
    title: '需求一直長出新功能',
    sign: '講到一半又想到「順便加個匯出」，它真的去做了，原本說好的那版回不去了。',
    fix: '把「這一輪先不做」寫進需求那一頁。新想到的先記下來，排進下一輪。',
  },
  {
    title: '資料表被改到看不懂',
    sign: '它自己多開了一張表，或把欄位改了名字，你打開資料才發現對不起來。',
    fix: '改資料結構前先更新 docs/data-model.md，改完要它列出哪裡跟原本不一樣。',
  },
  {
    title: '金額計算前後不一致',
    sign: '列表顯示 1,000，明細加起來是 999.99，兩邊都說自己是對的。',
    fix: '先決定金額存到分、稅金與折扣誰先算，寫進規範再讓它動手。',
  },
  {
    title: '子代理只會說看起來可以',
    sign: '你叫它審查，它回「整體結構清楚，沒有明顯問題」，一個檔名、一個行號都沒指到。',
    fix: '要它逐條回：每一項寫通過或不通過，不通過要指到哪個檔案第幾行。有一項不通過就整份退回。',
  },
  {
    title: '畫面變成展示頁，不像工具',
    sign: '做出來滿滿的大標題、漸層跟行銷文案，真正要用的搜尋跟表格反而要找很久。',
    fix: '規範寫成列表、表單、狀態與操作這幾件事，不要寫「簡潔現代」這種形容詞。',
  },
];

export default function SlideQuoteSystemRisks() {
  return (
    <SlideLayout title="中型專案最常卡在這五件事" subtitle="Failure Modes" icon={AlertTriangle}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          
          <p className="text-slate-400 text-sm leading-relaxed">
            先知道它們會在哪裡發生，真的遇到的時候你認得出來，也知道該退回哪一步。
          </p>
        </AnimatedBlock>

        <div className={`grid grid-cols-1 md:grid-cols-5 gap-3 ${hoverIsolateGrid}`}>
          {RISKS.map((risk, index) => (
            <AnimatedBlock key={risk.title} stepIndex={index + 2} className={`rounded-lg border border-slate-800 bg-slate-950 p-4 flex flex-col ${hoverIsolateCard}`}>
              <div className="font-mono text-slate-600 text-xs mb-2">0{index + 1}</div>
              <h3 className="text-slate-100 text-base font-bold leading-snug mb-3">{risk.title}</h3>
              <div className="text-xs font-bold text-slate-500 mb-1.5">你會看到</div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{risk.sign}</p>
              <div className="text-xs font-bold text-slate-500 mb-1.5 border-t border-slate-800 pt-3 mt-auto">怎麼辦</div>
              <p className="text-slate-400 text-sm leading-relaxed">{risk.fix}</p>
            </AnimatedBlock>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
