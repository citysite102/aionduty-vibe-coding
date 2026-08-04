import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const RISKS = [
  { title: '需求一直長出新功能', fix: '把「這一輪先不做」寫進 brief，新增需求先進下一輪。' },
  { title: '資料表被改到看不懂', fix: '每次改資料結構前，先更新 docs/data-model.md。' },
  { title: '金額計算前後不一致', fix: '先決定整數分、稅金、折扣順序，再讓它實作。' },
  { title: '子代理只會說看起來可以', fix: '給它明確退回條件：缺欄位就列出缺口，不准腦補。' },
  { title: '畫面變成展示頁，不像工具', fix: '規範寫成列表、表單、狀態與操作，不寫抽象風格詞。' },
];

export default function SlideQuoteSystemRisks() {
  return (
    <SlideLayout title="中型專案最常卡在這五件事" subtitle="Failure Modes" icon={AlertTriangle}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-100 text-xl font-bold leading-snug mb-2">
            這些問題不是意外，是中型專案一定會遇到的摩擦。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            先知道它們會在哪裡發生，真的遇到的時候你認得出來，也知道該退回哪一步。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {RISKS.map((risk, index) => (
            <AnimatedBlock key={risk.title} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="font-mono text-slate-600 text-xs mb-2">0{index + 1}</div>
              <h3 className="text-slate-100 text-base font-bold leading-snug mb-3">{risk.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-800 pt-3">{risk.fix}</p>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <div className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" size={20} className="text-sky-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-base leading-relaxed">
              下一段把它接進循環：讓它自己跑、自己驗、自己修，但仍然受你設的邊界控制。
            </p>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
