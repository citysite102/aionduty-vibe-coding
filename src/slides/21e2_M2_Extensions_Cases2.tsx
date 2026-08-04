import { Briefcase, FileWarning, Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2ExtensionsCases2() {
  return (
    <SlideLayout title="這幾樣實際怎麼用？（二）防線與調查" subtitle="Real-world Scenarios for Extensions" icon={Briefcase}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch mt-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-red-400 mb-4 border-b border-slate-800 pb-3">
            <FileWarning size={20} />
            情境三：絕對不能跨越的紅線 (Hook)
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            保護正式環境資料庫，或是攔截可能會破壞系統的危險指令。
          </p>
          <div className="bg-red-950/20 p-4 rounded-lg border border-red-500/20">
            <span className="text-red-400 font-bold text-xs block mb-2">Hook (指令執行前攔截)</span>
            <p className="text-slate-300 text-sm">
              系統底層設定：如果 Claude 試圖執行 <code className="text-red-300 bg-red-900/30 px-1 rounded">rm -rf /</code> 或 <code className="text-red-300 bg-red-900/30 px-1 rounded">DROP TABLE</code> 等危險指令，強制阻擋並報錯。
            </p>
            <div className="text-slate-500 text-xs mt-3">
              * 寫在 CLAUDE.md 說「不要刪除資料庫」它可能還是會被 Prompt Injection 騙過，Hook 則是在執行層徹底卡死。
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-amber-400 mb-4 border-b border-slate-800 pb-3">
            <Search size={20} />
            情境四：跨系統除錯調查 (MCP + Subagent)
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            收到一個線上報錯，需要查明原因並提出修復方案。
          </p>
          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sky-400 font-bold text-xs block mb-1">MCP (外部連接)</span>
              <span className="text-slate-400 text-sm">連線到 GitHub 讀取 Issue #123 的錯誤回報。</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-amber-400 font-bold text-xs block mb-1">子代理 (Subagent)</span>
              <span className="text-slate-400 text-sm">將 Issue 內容丟給「Log 分析員 (Subagent)」，讓它去翻找 Sentry 的日誌，最後只把「根因與修復建議」回報給你。</span>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
