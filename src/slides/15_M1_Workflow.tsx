import { RefreshCcw, Search, FileEdit, PlaySquare, CheckCircle2, ShieldQuestion } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { motion } from 'motion/react';

export default function SlideWorkflow() {
  return (
    <SlideLayout title="探索、計畫、執行、驗證" subtitle="A Healthy Workflow" icon={RefreshCcw}>
      <div className="w-full max-w-5xl mx-auto mt-4">
        
        <AnimatedBlock stepIndex={1} className="text-center mb-10">
          <p className="text-slate-300 text-lg">
            許多初學者會犯的錯誤：<strong className="text-rose-400">一開口就要求馬上產出最終結果。</strong>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="w-full max-w-5xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">1. 探索</h3>
              <p className="text-slate-400 text-xs leading-relaxed">釐清現況、讀取檔案、確認需求</p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mb-4">
                <FileEdit size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">2. 計畫</h3>
              <p className="text-slate-400 text-xs leading-relaxed">提出做法與步驟，<strong className="text-slate-300">並且現在就寫下「做完長什麼樣」</strong></p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mb-4">
                <PlaySquare size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">3. 執行</h3>
              <p className="text-slate-400 text-xs leading-relaxed">撰寫程式碼、安裝所需套件</p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center text-center relative z-10 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/10 text-sky-400 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">4. 驗證</h3>
              <p className="text-slate-400 text-xs leading-relaxed">拿第 2 步那張單子逐條對，不對就回頭修</p>
            </div>
            
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-slate-800 -translate-y-1/2 z-0 border-t border-dashed border-slate-600"></div>
          </div>
          
          <div className="flex justify-center mt-4">
             <div className="bg-slate-800/50 px-4 py-2 rounded-full text-slate-400 text-xs flex items-center gap-2 border border-slate-700/50">
               <RefreshCcw size={14} />
               <span>遇到錯誤或新需求，回到第一步重新探索</span>
             </div>
          </div>
        </AnimatedBlock>

        {/*
          這一塊不要再放一次「探索 → 計畫 → 執行 → 驗證」的箭頭，上面四格就是它。
          也不要寫「以此循環不斷迭代」，膠囊已經說了會轉回去。

          **完成條件屬於第 2 步，不是第 4 步。** 原本這裡寫「驗證是你的：先寫下什麼情況該
          出現什麼結果，再照著跑一次」，順序講對了，但位置沒講，讀起來像是驗的時候才動筆。
          寫在動工之後就不叫標準了，你會照著已經做出來的東西回頭寫單子。
          四格裡第 2 步與第 4 步的說明現在互相指涉，改一邊要改兩邊。
          完成條件怎麼寫得夠具體，是章節八 8-1 的職務，這裡只負責把它放對位置。
        */}
        <AnimatedBlock stepIndex={3} className="text-slate-300 max-w-3xl mx-auto bg-slate-900/50 py-6 px-8 rounded-xl border border-slate-800">
          <p className="text-lg leading-relaxed">
            四步裡只有執行是它一個人做。探索跟計畫你要在場，驗證整個是你的。
          </p>
          <p className="text-lg leading-relaxed mt-3">
            <strong className="text-sky-400">而驗收的標準要在動工之前就寫下來。</strong>
            在計畫那一步把「做完長什麼樣」一條一條列出來，
            這份清單叫<strong className="text-slate-100">完成條件</strong>，
            執行完再拿它逐條核對。
          </p>
          <p className="text-base leading-relaxed mt-3 text-slate-400">
            順序反過來的話，你會照著它做出來的東西回頭寫標準，那就不是驗收了。
            完成條件怎麼寫得夠具體，章節八有一整段專門處理。
          </p>
        </AnimatedBlock>

        {/*
          這一頁是學員第一次真的讓它動自己的檔案（下一頁就開始做第一個作品）之前的最後一頁。

          最後查證：2026-09-21，對照 code.claude.com/docs/en/permission-modes。
          **這一塊原本寫「執行這一步，它會先問你」，那是錯的。** 官方文件當時的原文是
          「On Pro, Max, and Team plans, the built-in starting permission mode is auto mode」，
          而這門課 Slide 18 推薦的就是 Claude Pro，所以學員打開來預設就不會每一步問他。
          每一步都問的是 Manual（設定值仍叫 default）。auto mode 底下仍會停下來問的，
          文件列在 Actions no mode auto-approves，包含明確的 ask 規則、要使用者回答的工具、
          以及刪到關鍵路徑的 rm。
          權限模式的名稱與行為是 CLAUDE.md C-3 點名最會過期的一類，下次改版前先重查那一頁。

          這裡只給他當下用得到的：預設多半不問、停下來的時候長什麼樣、想每一步都看怎麼切。
          模式的完整比較留給後面那兩頁，不在這裡展開。
        */}
        <Callout
          tone="muted"
          stepIndex={4}
          icon={ShieldQuestion}
          label="它不一定每一步都問你"
          className="mt-6"
        >
          Claude Pro 開起來預設是<strong className="text-slate-100">自動模式</strong>，多數動作它自己做完，
          背後由另一個模型檢查這個動作跟你要求的對不對得上。想要每一步都自己看過再放行，
          切到<strong className="text-slate-100">手動模式</strong>：桌面版在輸入框旁邊的模式選單，
          終端機按 <code className="font-mono text-slate-300">Shift + Tab</code> 輪流切。
          <span className="mt-3 block rounded-lg border border-slate-800 bg-slate-950 p-3.5 font-mono text-sm leading-relaxed">
            <span className="block text-slate-400">Edit file</span>
            <span className="block text-slate-300">mission-timer/index.html</span>
            <span className="mt-2 block text-slate-500">Do you want to make this edit?</span>
            <span className="mt-1.5 block text-slate-300">&#10095; 1. Yes</span>
            <span className="block text-slate-500">&nbsp;&nbsp;2. Yes, and don't ask again</span>
            <span className="block text-slate-500">&nbsp;&nbsp;3. No, tell Claude what to do differently</span>
          </span>
          <span className="mt-3 block text-slate-400">
            停下來的時候長這樣（示意）。
            <strong className="text-slate-200">按之前先看第二行，那是它要動的檔案</strong>，
            對不上就選 3，把你想改的講清楚再讓它跑一次。
          </span>
        </Callout>
      </div>
    </SlideLayout>
  );
}
