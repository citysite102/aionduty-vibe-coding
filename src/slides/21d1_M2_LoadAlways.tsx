import { PinIcon } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2LoadAlways() {
  return (
    <SlideLayout title="常駐的東西越少，它越專心" subtitle="Always-On vs Path-Bound" icon={PinIcon}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          分類的方式是<strong className="text-slate-200">它什麼時候被載進來</strong>，因為那決定了它佔多少空間。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sky-400 font-bold text-lg">CLAUDE.md</span>
            <span className="text-slate-500 text-xs font-mono">整場都在</span>
          </div>
          <div className="text-slate-200 text-sm font-bold mb-1">永遠都要記得的事實與規矩</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            session 一開始就載入，壓縮對話之後還會自動重讀，不會掉。代價是它從頭到尾都佔著空間。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sky-400 font-bold text-lg">Rules</span>
            <span className="text-slate-500 text-xs font-mono">碰到那一區才載</span>
          </div>
          <div className="text-slate-200 text-sm font-bold mb-1">只在某一區檔案才適用的限制</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            寫成一個檔案放進 <code className="font-mono text-slate-400">.claude/rules/</code>，在檔案開頭指定它管哪一區。
            只有動到那一區的時候才會被讀進來，平常不會佔掉對話的空間。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-400 text-base leading-relaxed">
            兩者的差別只有一個：<strong className="text-slate-200">要不要一直在。</strong>能綁定範圍的就綁定，不要全部往根目錄堆。這也是為什麼一份 CLAUDE.md 建議別超過約 200 行。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
