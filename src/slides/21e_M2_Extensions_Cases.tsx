import { Briefcase, Rocket } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2ExtensionsCases() {
  return (
    <SlideLayout title="這幾樣實際怎麼用？（一）規範與流程" subtitle="Real-world Scenarios for Extensions" icon={Briefcase}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch mt-6">
        
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-sky-400 mb-4 border-b border-slate-800 pb-3">
            <Briefcase size={20} />
            情境一：整個專案一套規矩，某一區再加嚴
          </h3>
          <p className="text-slate-300 text-sm mb-3">
            你希望整個專案有統一的風格，但有一個資料夾特別容易出事，要更嚴的限制。
            <strong className="text-slate-100">做法是放兩份檔案，位置決定了誰會讀到它。</strong>
          </p>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs mb-3">
            <div className="text-slate-300">你的專案/</div>
            <div className="text-slate-400">
              ├ CLAUDE.md<span className="text-slate-600 font-sans">　整個專案都會讀</span>
            </div>
            <div className="text-slate-400">└ src/api/</div>
            <div className="text-slate-400">
              　　└ CLAUDE.md<span className="text-slate-600 font-sans">　只有動到這個資料夾才會讀</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sky-300 font-bold text-xs block mb-1 font-mono">CLAUDE.md</span>
              <span className="text-slate-400 text-sm">「全站使用 Tailwind CSS，一律使用 TypeScript。」</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sky-300 font-bold text-xs block mb-1 font-mono">src/api/CLAUDE.md</span>
              <span className="text-slate-400 text-sm">「這個資料夾裡的每一支程式，都要先確認使用者已經登入才能繼續。」</span>
            </div>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            規則就是純文字，跟你交代同事的講法一樣，不用寫成程式。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-emerald-400 mb-4 border-b border-slate-800 pb-3">
            <Rocket size={20} />
            情境二：例行公事標準化 (Skill)
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
