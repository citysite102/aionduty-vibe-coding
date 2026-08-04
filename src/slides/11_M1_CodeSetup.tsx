import { Play, Terminal, FileText, Blocks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

export default function SlideCodeSetup() {
  return (
    <SlideLayout title="手把手操作" subtitle="Live Demonstration" icon={Play}>
      <LiveDemo kind="terminal" note="跟著裝一次" />
      <p className="max-w-6xl mx-auto mb-4 text-sm text-slate-400 leading-relaxed">
        這一頁是終端機版的安裝。用桌面版的人，
        <strong className="text-slate-200">步驟 0 只要裝 Git，VS Code 與 Node.js 可以跳過，步驟 1 整個跳過</strong>。
        步驟 2 和 3 照做，只是改成在 Code 頁籤裡輸入。
      </p>
<div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 max-w-6xl mx-auto items-stretch min-h-[55vh]">
        
        {/* Left Side: Step by step */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 content-center">
          
          <AnimatedBlock stepIndex={1} className="flex gap-4 items-start bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-lg shrink-0 mt-1">0</div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">前置準備：開發環境設定</h3>
              <p className="text-slate-400 text-sm mb-3">如果你的電腦是一台白紙，請先安裝編輯器與執行環境：</p>
              <div className="bg-black/50 p-3 rounded-lg font-mono text-xs border border-slate-800 space-y-2 break-all">
                <div className="text-slate-300">1. 安裝 <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">VS Code</a> (最主流的程式碼編輯器)</div>
                <div className="text-slate-300">2. 安裝 <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">Node.js</a> (下載 LTS 版本，需 18 以上，它會自動包含 npm)</div>
                <div className="text-slate-300">3. 安裝 <a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">Git</a> (裝好就不用管它，指令都讓 AI 代打)</div>
                <div className="text-slate-500 pt-1 border-t border-slate-800/50">開啟 VS Code 內建終端機，輸入以下指令確認安裝成功：</div>
                <div className="text-emerald-400">$ node -v</div>
                <div className="text-emerald-400">$ npm -v</div>
                <div className="text-emerald-400">$ git -v</div>
              </div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                Git 是<strong className="text-slate-400">桌面版的人也要裝</strong>的那一個。
                後面把作品推上 GitHub、以及部署平台從 GitHub 拿程式，都會用到它。
                macOS 裝過 Xcode 命令列工具的話通常已經有了，Windows 預設沒有。
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="flex gap-4 items-start bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg shrink-0 mt-1">1</div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">安裝與啟動 Claude Code</h3>
              <p className="text-slate-400 text-sm mb-3">官方首選是原生安裝器；若你已有 Node.js 也可用 npm。首次啟動會自動引導登入。</p>
              <div className="bg-black/50 p-3 rounded-lg font-mono text-xs border border-slate-800 space-y-2 break-all">
                <div className="text-slate-500"># macOS / Linux（在終端機執行）</div>
                <div className="text-emerald-400">$ curl -fsSL https://claude.ai/install.sh | bash</div>
                <div className="text-slate-500 pt-1"># Windows（在 PowerShell 執行，不是 cmd）</div>
                <div className="text-emerald-400">&gt; irm https://claude.ai/install.ps1 | iex</div>
                <div className="text-slate-500 pt-1"># 兩個平台通用的備案：用 npm（需 Node 18 以上）</div>
                <div className="text-emerald-400">$ npm install -g @anthropic-ai/claude-code</div>
                <div className="text-emerald-400 pt-1">$ claude<span className="text-slate-500">  # 首次啟動會引導登入，或輸入 /login</span></div>
              </div>
            </div>
          </AnimatedBlock>
          
          <AnimatedBlock stepIndex={3} className="flex gap-4 items-start bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg shrink-0 mt-1">2</div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">試跑一次，確認環境真的通了</h3>
              <p className="text-slate-400 text-sm mb-3">在你想放作品的地方輸入 <code className="text-sky-300">claude</code>，直接對話。</p>
              <div className="bg-black/50 p-4 rounded-lg border border-slate-800 space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="text-sky-400 font-bold shrink-0">You:</span>
                  <span className="text-slate-300">請建立一個 <code className="text-sky-300">mission-timer</code> 資料夾，裡面放一個計時器的 HTML 網頁。</span>
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                這一步只是確認環境能跑通，不用管它做得好不好看。正式的作品在後面會重做一次，資料夾就沿用 <code className="text-slate-400">mission-timer</code> 這個名字，整堂課都會回頭改它。
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="flex gap-4 items-start bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg shrink-0 mt-1">3</div>
            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">收尾：先看一眼專案記憶 (CLAUDE.md)</h3>
              <p className="text-slate-400 text-sm mb-3">在會話最後，請它自己總結一份，先知道有這個東西就好。</p>
              <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
                 <div className="flex gap-2 text-sm">
                  <span className="text-emerald-400 font-bold shrink-0">You:</span>
                  <span className="text-slate-300">請幫我把剛才的開發重點總結成一份 CLAUDE.md。</span>
                </div>
              </div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                打開來看看它寫了什麼就好，這頁不用背。第二單元會專門講 CLAUDE.md 該寫哪些東西、分幾層放，到時候我們再回來把這份改成真正能用的版本。
              </p>
            </div>
          </AnimatedBlock>
          
        </div>

        {/* Right Side: Instructor Action */}
        <AnimatedBlock stepIndex={4} className="bg-gradient-to-b from-sky-900/30 to-slate-950/40 border border-sky-900/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.14)_1px,transparent_0)] bg-[size:6px_6px] opacity-40"></div>
          
          <div className="relative z-10 space-y-4 w-full">
            <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-sky-400 border border-sky-500/30">
              <Terminal size={40} />
            </div>
            
            <h3 className="text-3xl font-black text-slate-100 tracking-tight leading-tight">Live<br/>Demonstration</h3>
            
            <div className="w-16 h-1 bg-sky-500/50 rounded-full mx-auto"></div>
          </div>
        </AnimatedBlock>
      </div>

    </SlideLayout>
  );
}
