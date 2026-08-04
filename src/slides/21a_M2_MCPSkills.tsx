import { Layers, ExternalLink, Workflow, Server } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide21a() {
  return (
    <SlideLayout title="讓 AI 有手可用：MCP 與 Skills" subtitle="Empowering AI: MCP & Skills" icon={Layers}>
      <div className="flex flex-col gap-4 pt-2 px-4 h-full">
        <p className="text-slate-300 font-medium text-base max-w-4xl">
          要讓 AI 從「只會聊天」變成「能真的做事」，它得先有辦法讀取環境、執行動作。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          
          {/* MCP */}
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5 relative overflow-hidden group hover:border-sky-500/50 transition-colors shadow-lg flex flex-col">
            <h3 className="text-xl font-bold text-sky-400 flex items-center gap-3 mb-3">
              <Server size={28} />
              Model Context Protocol (MCP)
            </h3>
            <div className="text-sky-200/70 text-sm mb-6 font-mono">標準化環境擴充 (Infrastructure)</div>
            
            <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
              一個開放標準協議，讓 AI 模型能安全地連線到本機或外部資料源。有了它，AI 才碰得到你的資料庫、雲端硬碟、專案管理工具。
            </p>

            <div className="bg-slate-950 p-5 rounded-xl border border-sky-900/30 mb-6 relative">
              <div className="text-center font-bold text-slate-300 mb-3 border-b border-slate-800 pb-2">架構原理</div>
              <div className="flex items-center justify-between text-sm">
                <div className="bg-slate-800 px-3 py-2 rounded text-sky-300 text-center flex-1">AI 模型<br/><span className="text-[11px] text-slate-500">Claude/Gemini</span></div>
                <div className="w-16 border-t-2 border-dashed border-sky-600/50 mx-2 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] text-sky-500 bg-slate-950 px-1">MCP</span>
                </div>
                <div className="bg-slate-800 px-3 py-2 rounded text-sky-300 text-center flex-1">伺服器<br/><span className="text-[11px] text-slate-500">GitHub, DB</span></div>
              </div>
            </div>

            <div className="text-sm text-slate-400 mt-auto">
              <strong>應用情境：</strong> 授權 AI 讀取你的 Google Drive, 操作 GitHub, 或是查詢資料庫。
            </div>
          </AnimatedBlock>

          {/* Skills */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-700/60 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/50 transition-colors shadow-lg flex flex-col">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-3 mb-3">
              <Workflow size={28} />
              專屬技能 (Skills)
            </h3>
            <div className="text-emerald-200/70 text-sm mb-6 font-mono">工作流程封裝 (SOP)</div>

            <p className="text-slate-300 mb-6 leading-relaxed flex-grow">
              把特定的「工作 SOP」寫成技能包（SKILL.md）。平常 AI 只載入它的名稱，需要時才展開完整步驟供 AI 依循，就像給新進員工的任務執行手冊。
            </p>

            <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/30 mb-6 relative">
              <div className="text-center font-bold text-slate-300 mb-3 border-b border-slate-800 pb-2">架構原理</div>
              <div className="flex items-center justify-between text-sm">
                <div className="bg-slate-800 px-3 py-2 rounded text-emerald-300 text-center flex-1">AI Agent<br/><span className="text-[11px] text-slate-500">規劃與決策</span></div>
                <div className="w-16 border-t-2 border-dashed border-emerald-600/50 mx-2 relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] text-emerald-500 bg-slate-950 px-1">載入</span>
                </div>
                <div className="bg-slate-800 px-3 py-2 rounded text-emerald-300 text-center flex-1">技能包 (SKILL.md)<br/><span className="text-[11px] text-slate-500">步驟說明</span></div>
              </div>
            </div>

            <div className="text-sm text-slate-400 mt-auto">
              <strong>應用情境：</strong> 把一整套上線 SOP 寫成 <code className="text-slate-300 bg-slate-800 px-1 rounded">deploy</code> 技能包，需要時 AI 自動載入並照步驟執行。
            </div>
          </AnimatedBlock>
        </div>
        
        {/* 底層機制與常見狀況 */}
        <AnimatedBlock stepIndex={3} className="mt-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left">
          <h4 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
            底層其實是同一件事：工具呼叫 (Tool Calling)
          </h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            不管是 MCP 還是 Skills，模型本身都不會直接連網或動你的檔案。它做的事只有一件：
            <strong className="text-slate-200">輸出一段「我要用這個工具、參數長這樣」的請求</strong>，
            再由外面的程式實際去執行，把結果送回來給它看。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-rose-400 text-xs font-bold mb-1.5">它說它做了，其實沒做</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                模型有可能「用講的」描述一個工具呼叫，而不是真的發出請求。看到它宣稱完成時，去看實際結果，不要只信它的回報。
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-amber-400 text-xs font-bold mb-1.5">工具太多反而變笨</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                每接一個 MCP，它的工具清單就變長，選錯的機率也跟著上升。只裝你這個專案真的會用到的。
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5">
              <div className="text-sky-400 text-xs font-bold mb-1.5">工具回傳的內容不可盡信</div>
              <p className="text-slate-400 text-xs leading-relaxed">
                它從網頁或外部系統讀回來的文字，可能包含惡意指示。那些內容是資料，不是命令，這也是為什麼要設權限邊界。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        {/* Resource Link */}
        <AnimatedBlock stepIndex={4} className="mt-2 flex justify-center">
          <a href="https://www.youtube.com/watch?v=185XGEMefgc" target="_blank" rel="noopener noreferrer" 
             className="inline-flex items-center gap-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-500 transition-all px-6 py-3 rounded-full text-slate-200 text-sm">
             <ExternalLink size={16} className="text-red-400" />
             <span>延伸解析：<strong className="text-white">Google 開發者介紹 MCP 與 API 的差異與影響</strong></span>
          </a>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
