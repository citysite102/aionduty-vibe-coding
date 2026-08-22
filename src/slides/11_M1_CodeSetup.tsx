import { Play, AppWindow } from 'lucide-react';
import { OptionalTag } from '../components/OptionalTag';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { LiveDemo } from '../components/LiveDemo';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/**
 * 標題原本是「手把手操作」，副標「Live Demonstration」。兩個問題：它沒說這一頁在裝什麼，
 * 而課程改成預錄之後也沒有現場示範這回事。這一頁是單元 4-2 的第一格，
 * 也就是那支影片的第一個畫面，第一行字得說得出這一段要幹嘛。
 */
export default function SlideCodeSetup() {
  return (
    <SlideLayout title="裝好終端機版，確認它讀得到你的專案" subtitle={<><OptionalTag /> Install and Verify</>} icon={Play}>
      <LiveDemo kind="terminal" note="跟著裝一次" />

      <div className="max-w-6xl mx-auto mb-5">
        <Callout tone="focus" label="這一段是選修的" icon={AppWindow} stepIndex={1}>
          桌面版已經做得完前面所有事，<strong className="text-slate-100">終端機是同一個 Claude Code 的另一個介面</strong>，
          不是另一個工具。裝它的理由是：可以同時開好幾個在跑、可以用 <code className="font-mono text-orange-300">!</code> 直接下指令、
          以及之後想把它接進自動化流程的時候需要它。
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
            這三個要<strong className="text-slate-200">自己開瀏覽器下載安裝</strong>，不是打指令，也不是跟 AI 說。
            Git 在課前那份清單裡就有，前兩個是走終端機這條路才需要的：
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
            切到你的專案，確認它讀得到
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            用 <code className="text-sky-300">cd</code> 切到你前面做計時器的那個{' '}
            <code className="text-sky-300">mission-timer</code> 資料夾，輸入{' '}
            <code className="text-sky-300">claude</code>，然後問它一句：
          </p>
          <div className="bg-black/50 p-4 rounded-lg border border-slate-800">
            <div className="flex gap-2 text-sm">
              <span className="text-sky-400 font-bold shrink-0">You:</span>
              <span className="text-slate-300">請幫我看一下這個資料夾裡有哪些檔案，並說明這個專案在做什麼。</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 leading-relaxed">
            它應該要認得你的 <code className="text-slate-400">index.html</code>，也讀得到你寫過的規矩。
            
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl ${hoverIsolateCard}`}>
          <h3 className="text-xl font-bold text-slate-100 mb-2 flex items-start gap-2.5">
            <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-sky-500/20 font-mono text-xs text-sky-400">3</span>
            兩邊可以隨時換
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            同一個資料夾，你今天用終端機、明天用桌面版都可以，它讀的是同一份檔案。
            要離開終端機的對話，輸入 <code className="text-sky-300">/exit</code> 或按兩次{' '}
            <code className="text-sky-300">Ctrl + C</code>。
          </p>
          <p className="text-slate-500 text-xs leading-relaxed">
            裝到一半卡住也不影響你前面做的任何東西，回桌面版繼續就好。
          </p>
        </AnimatedBlock>

      </div>

    </SlideLayout>
  );
}
