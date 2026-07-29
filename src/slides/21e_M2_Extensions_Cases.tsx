import { Briefcase, Rocket } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2ExtensionsCases() {
  return (
    <SlideLayout title="這幾樣實際怎麼用？（一）規範與流程" subtitle="Real-world Scenarios for Extensions" icon={Briefcase}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch mt-6">
        
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-sky-400 mb-4 border-b border-slate-800 pb-3">
            <Briefcase size={20} />
            場景一：專案架構與防呆 (CLAUDE.md + Rules)
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            你希望整個專案有統一的風格，但在特定危險區域要有更嚴格的限制。
          </p>
          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sky-300 font-bold text-xs block mb-1">CLAUDE.md (全域規矩)</span>
              <span className="text-slate-400 text-sm">「全站使用 Tailwind CSS，一律使用 TypeScript 且禁用 any 型別。」</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-indigo-300 font-bold text-xs block mb-1">Rules (指定路徑 /api/*)</span>
              <span className="text-slate-400 text-sm">「只要動到 API 資料夾的檔案，必須確保每個端點都有檢查使用者驗證 (Auth)。」</span>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-emerald-400 mb-4 border-b border-slate-800 pb-3">
            <Rocket size={20} />
            場景二：例行公事標準化 (Skill)
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            準備發布新版本，這是一套有順序的 SOP，不希望每次都要重新交代。
          </p>
          <div className="bg-slate-950 p-4 rounded-lg border border-emerald-900/30">
            <span className="text-emerald-300 font-bold text-xs block mb-2">Skill (版本發布流程 SOP)</span>
            <ul className="text-slate-400 text-sm space-y-1 list-decimal pl-4">
              <li>執行 <code className="text-slate-300">npm run test</code> 確保測試全過</li>
              <li>更新 <code className="text-slate-300">package.json</code> 版本號</li>
              <li>使用 <code className="text-slate-300">git tag</code> 標記版號</li>
              <li>推送至遠端 <code className="text-slate-300">origin main</code></li>
            </ul>
            <div className="text-emerald-500/80 text-xs mt-3 italic">「Claude，幫我跑一下版本發布流程。」它就會去櫃子把這套 SOP 拿出來照做。</div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
