import { Play, AppWindow } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { LiveDemo } from '../components/LiveDemo';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

export default function SlideCodeSetup() {
  return (
    <SlideLayout title="手把手操作" subtitle="Live Demonstration" icon={Play}>
      <LiveDemo kind="terminal" note="跟著裝一次" />

      <div className="max-w-6xl mx-auto mb-5">
        <Callout
          tone="focus"
          label="用桌面版的人看這裡"
          icon={AppWindow}
          stepIndex={1}
          footnote={
            <>
              下面的步驟 0 與步驟 1 是終端機版在裝的，跟你無關，直接跳到步驟 2。
              步驟 2 那一格有一行是寫給你的：你已經在對話裡了，不用輸入 <code className="font-mono text-orange-300">claude</code>，直接打那句中文。
            </>
          }
        >
          你只要做一件事：<strong className="text-slate-100">安裝 Git</strong>。到{' '}
          <code className="font-mono text-slate-200">git-scm.com/downloads</code>{' '}
          下載，一路按下一步就好。
          <strong className="text-slate-100">裝完不用驗證，也不用開終端機</strong>，
          後面把作品推上 GitHub 的時候才會用到它。
        </Callout>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto ${hoverIsolateGrid}`}>

        <AnimatedBlock stepIndex={2} className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl ${hoverIsolateCard}`}>
          <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-start gap-2.5">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800 font-mono text-xs text-slate-400">0</span>
            前置準備：開發環境設定
          </h3>
          {/*
            下載安裝與打指令要分開呈現。原本三個安裝項目跟三行驗證指令同在一個黑底
            等寬框裡，看起來像六行都要用打的，學員會卡在「這是要跟 AI 說的嗎」。
          */}
          <p className="text-slate-400 text-sm mb-2.5">
            這三個要<strong className="text-slate-200">自己開瀏覽器下載安裝</strong>，不是打指令，也不是跟 AI 說：
          </p>
          <div className="space-y-1.5 mb-3">
            <div className="flex items-baseline gap-2.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer" className="shrink-0 font-bold text-sky-400 hover:underline">VS Code</a>
              <span className="text-xs text-slate-500">最主流的程式碼編輯器</span>
            </div>
            <div className="flex items-baseline gap-2.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <a href="https://nodejs.org" target="_blank" rel="noreferrer" className="shrink-0 font-bold text-sky-400 hover:underline">Node.js</a>
              <span className="text-xs text-slate-500">選 LTS 版本，需 18 以上，會一起裝好 npm</span>
            </div>
            <div className="flex items-baseline gap-2.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer" className="shrink-0 font-bold text-sky-400 hover:underline">Git</a>
              <span className="text-xs text-slate-500">裝完就不用管它，之後的指令都讓 AI 代打</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-2">
            裝完開 VS Code 內建終端機，<strong className="text-slate-200">這三行才是用打的</strong>，印出版本號就成功：
          </p>
          <div className="bg-black/50 p-3 rounded-lg font-mono text-xs border border-slate-800 space-y-1">
            <div className="text-emerald-400">$ node -v</div>
            <div className="text-emerald-400">$ npm -v</div>
            <div className="text-emerald-400">$ git -v</div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            macOS 裝過 Xcode 命令列工具的話通常已經有 Git 了，Windows 預設沒有。
          </p>

          {/*
            這兩個帳號原本沒列，結果現場最花時間的兩件事就是它們：
            有人整段時間卡在 GitHub 建置，也有人到下午才發現沒有付費額度可以跑。
            兩個都要收驗證信，臨場申請一定會卡住，所以列進來並標明要先辦好。
          */}
          <p className="text-slate-400 text-sm mt-4 mb-2.5">
            另外<strong className="text-slate-200">兩個帳號要先辦好</strong>，兩個都要收驗證信，臨時申請會卡在那裡：
          </p>
          <div className="space-y-1.5">
            <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <a href="https://claude.ai" target="_blank" rel="noreferrer" className="font-bold text-sky-400 hover:underline">Claude 付費方案</a>
              <span className="text-xs text-slate-500 ml-2.5">Pro 以上，或到 Console 儲值走 API。沒有額度它跑不動</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="font-bold text-sky-400 hover:underline">GitHub</a>
              <span className="text-xs text-slate-500 ml-2.5">存檔跟上線都要用它，帳號本身免費</span>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl ${hoverIsolateCard}`}>
          <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-start gap-2.5">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-500/20 font-mono text-xs text-sky-400">1</span>
            安裝與啟動 Claude Code
          </h3>
          <p className="text-slate-400 text-sm mb-3">官方首選是原生安裝器；若你已有 Node.js 也可用 npm。首次啟動會自動引導登入。</p>
          <div className="bg-black/50 p-3 rounded-lg font-mono text-xs border border-slate-800 space-y-2">
            <div className="text-slate-500"># macOS / Linux（在終端機執行）</div>
            <div className="text-emerald-400">$ curl -fsSL https://claude.ai/install.sh | bash</div>
            <div className="text-slate-500 pt-1"># Windows（在 PowerShell 執行，不是 cmd）</div>
            <div className="text-emerald-400">&gt; irm https://claude.ai/install.ps1 | iex</div>
            <div className="text-slate-500 pt-1"># 兩個平台通用的備案：用 npm（需 Node 18 以上）</div>
            <div className="text-emerald-400">$ npm install -g @anthropic-ai/claude-code</div>
            <div className="text-emerald-400 pt-1">$ claude<span className="text-slate-500">  # 首次啟動會引導登入，或輸入 /login</span></div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl ${hoverIsolateCard}`}>
          <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-start gap-2.5">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-500/20 font-mono text-xs text-sky-400">2</span>
            試跑一次，確認環境真的通了
          </h3>
          <p className="text-slate-400 text-sm mb-1.5">
            <strong className="text-slate-300">終端機：</strong>先切到你想放作品的資料夾，輸入 <code className="text-sky-300">claude</code>，直接對話。
          </p>
          <p className="text-slate-400 text-sm mb-3">
            <strong className="text-slate-300">桌面版 Code 頁籤：</strong>你已經在對話裡了，不用輸入 <code className="text-sky-300">claude</code>，直接打下面這句。
          </p>
          <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
            <div className="flex gap-2 text-sm">
              <span className="text-sky-400 font-bold shrink-0">You:</span>
              <span className="text-slate-300">請建立一個 <code className="text-sky-300">mission-timer</code> 資料夾，裡面放一個計時器的 HTML 網頁。</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            這一步只是確認環境能跑通，不用管它做得好不好看。正式的作品在後面會重做一次，資料夾就沿用 <code className="text-slate-400">mission-timer</code> 這個名字，整堂課都會回頭改它。
            <span className="block mt-1.5">
              它會建在你剛才選的那個資料夾裡面（桌面版）或你切過去的那個位置（終端機）。<strong className="text-slate-400">記住它在哪。</strong>
            </span>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl ${hoverIsolateCard}`}>
          <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-start gap-2.5">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-500/20 font-mono text-xs text-emerald-400">3</span>
            收尾：先看一眼專案記憶 (CLAUDE.md)
          </h3>
          <p className="text-slate-400 text-sm mb-3">在會話最後，請它自己總結一份，先知道有這個東西就好。</p>
          <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
            <div className="flex gap-2 text-sm">
              <span className="text-emerald-400 font-bold shrink-0">You:</span>
              <span className="text-slate-300">請幫我把剛才的開發重點總結成一份 CLAUDE.md。</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            打開來看看它寫了什麼就好。第二單元會專門講 CLAUDE.md 該寫哪些東西、分幾層放，到時候我們再回來把這份改成真正能用的版本。
          </p>
        </AnimatedBlock>

      </div>

    </SlideLayout>
  );
}
