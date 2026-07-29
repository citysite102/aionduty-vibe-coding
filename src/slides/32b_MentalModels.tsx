import { Brain, ToggleLeft, ArrowRightLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideMentalModels() {
  return (
    <SlideLayout title="怎麼把話講對：白名單與探索空間" subtitle="How to Phrase It" icon={Brain}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 max-w-6xl mx-auto items-start">
        
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-sky-400 mb-6 border-b border-slate-800 pb-3">
            <ToggleLeft size={24} />
            白名單 vs 黑名單 (Prompts)
          </h3>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            設定規範時，與其告訴它「不要做什麼」，不如精確告訴它「只能做什麼」。
          </p>
          <div className="space-y-4">
            <div className="bg-red-950/20 border border-red-500/20 p-4 rounded-xl">
              <div className="text-red-400 font-bold text-sm mb-1">✕ 黑名單 (容易出錯)</div>
              <div className="text-slate-400 text-sm">「不要用舊版的 React 寫法，不要用 var，不要改到我的 CSS。」</div>
              <div className="text-slate-500 text-xs mt-2 italic">它可能還是會用別的方式破壞。</div>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl">
              <div className="text-emerald-400 font-bold text-sm mb-1">✓ 白名單 (安全可控)</div>
              <div className="text-slate-300 text-sm">「一律使用 React Functional Components 與 Hooks，CSS 僅限修改 Tailwind classes。」</div>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg flex flex-col">
          <h3 className="text-xl font-bold flex items-center gap-3 text-indigo-400 mb-6 border-b border-slate-800 pb-3">
            <ArrowRightLeft size={24} />
            要給多少空間 (How Much Latitude)
          </h3>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            同一件事，講法可以差很多。<strong className="text-slate-100">還不確定該怎麼做的時候，把空間放開讓它去試；已經知道要什麼的時候，就把規格釘死。</strong>
          </p>
          
          <div className="flex-1 space-y-4">
            <div className="flex gap-4 items-start p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-1 rounded">實習生模式</div>
              <div>
                <p className="text-slate-300 text-sm font-medium mb-1">探索期、不確定怎麼做時</p>
                <p className="text-slate-500 text-xs">「你去幫我爬一下這個 API 看看會回傳什麼格式，寫個簡單的 script 印出來。」（給探索空間）</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="bg-indigo-900/50 text-indigo-300 text-xs font-bold px-2 py-1 rounded border border-indigo-500/30">資深工程師模式</div>
              <div>
                <p className="text-slate-300 text-sm font-medium mb-1">確定期、需要穩定產出時</p>
                <p className="text-slate-500 text-xs">「這是我寫好的介面與型別定義 (Interface)，請嚴格按照這個規格實作邏輯，不要改動現有架構。」（精確給定邊界）</p>
              </div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
