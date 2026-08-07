import React from 'react';
import { Keyboard, FolderOpen, Terminal, ClipboardCheck, Undo2, Image as ImageIcon } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

export default function SlideClaudeShortcuts() {
  return (
    <SlideLayout 
      title="Claude Code 核心按鍵與技巧" 
      subtitle="Keyboard Shortcuts & Tips"
      icon={Keyboard}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mt-2 items-stretch text-left pb-6">
        
        {/* Left Side: Concept */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full flex flex-col justify-between relative overflow-hidden">

            <div>
              <h3 className="text-xl font-bold text-slate-100 mb-3 leading-snug">
                這五個按鍵，<br/>
                一般的聊天對話框都沒有
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                它們各自解掉一件事：不用打完整路徑、可以收放它的修改權限、不用退出去下指令、
                做壞了可以退回去、有話直接貼圖給它看。
              </p>
              <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-800 pt-3">
                用<strong className="text-slate-300">桌面版 Code 頁籤</strong>的人：
                <code className="text-orange-300 font-bold">!</code> 這個直通終端機的用法是終端機版才有的。
                其餘幾個在 Code 頁籤裡也找得到，但提示的位置不一樣，找不到就打{' '}
                <code className="text-orange-300 font-mono">/help</code> 看一次。
              </p>
            </div>

          </AnimatedBlock>
        </div>

        {/* Right Side: The Key Modifiers */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          <div className={`grid grid-cols-1 gap-4 h-full ${hoverIsolateGrid}`}>
            
            {/* Shortcut 1: @ for File Paths */}
            <AnimatedBlock stepIndex={2} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 ${hoverIsolateCard}`}>
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
                <FolderOpen size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-100">檔案自動補全</h4>
                  <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded">按 @ 鍵</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>快速載入：</strong>不必輸入完整路徑如 <code className="text-slate-300">src/components/Button.tsx</code>。只要打上 <code className="text-orange-300 font-bold">@</code> 加上檔名，就會跳出自動完成選單讓你挑。
                </p>
              </div>
            </AnimatedBlock>

            {/* Shortcut 2: Shift + Tab */}
            <AnimatedBlock stepIndex={3} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 ${hoverIsolateCard}`}>
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
                <ClipboardCheck size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-100">執行模式切換器</h4>
                  <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded">Shift + Tab</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>權限管制：</strong>在「每次都問」與「自動接受編輯」之間切換，輸入框下方會顯示目前模式（default ➔ acceptEdits ➔ plan 循環），你隨時可以收放 AI 對本機專案的修改權限。
                  <span className="block mt-1.5 text-slate-500">💡 其中的 <strong className="text-slate-400">plan</strong> 模式，做的就是工作循環第 2 步「計畫」那件事：先講怎麼做，不動手。</span>
                </p>
              </div>
            </AnimatedBlock>

            {/* Shortcut 3: ! for Shell Command */}
            <AnimatedBlock stepIndex={4} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 ${hoverIsolateCard}`}>
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
                <Terminal size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-100">直通終端機模式</h4>
                  <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded">按 ! 鍵</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>不必離開對話：</strong>跟 AI 講到一半想自己下指令（例如編譯、測網路、看目錄）？只需在行首打上 <code className="text-orange-300 font-bold">!</code> 後接你的指令（如 <code className="text-orange-300 font-mono">!git status</code>），就能直接執行，不用退出 Claude。
                </p>
              </div>
            </AnimatedBlock>

            {/* Shortcut 4: Esc / rewind */}
            <AnimatedBlock stepIndex={5} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 ${hoverIsolateCard}`}>
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
                <Undo2 size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-100">喊停與時光機</h4>
                  <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded">Esc ／ Esc Esc</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>做壞了可以退回去：</strong>覺得方向不對，按一次 <code className="text-orange-300 font-bold">Esc</code> 就中斷它手上的動作，做到一半的東西會留著。輸入框空著時連按兩次 <code className="text-orange-300 font-bold">Esc</code>（或輸入 <code className="text-orange-300 font-mono">/rewind</code>），會跳出一張清單，列出你這次對話送出過的每一句話，選一個時間點就能把程式碼、對話、或兩者一起退回去。
                  <span className="block mt-1.5 text-slate-500">💡 但它只管得到 Claude 自己改的檔案。用指令刪掉、搬走的東西救不回來，所以動工前先 <code className="text-slate-400 font-mono">git commit</code> 一次還是最保險。</span>
                </p>
              </div>
            </AnimatedBlock>

            {/* Shortcut 5: Ctrl + V 貼圖 */}
            <AnimatedBlock stepIndex={6} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 ${hoverIsolateCard}`}>
              <div className="p-3 bg-orange-500/10 text-orange-400 rounded-2xl shrink-0">
                <ImageIcon size={24} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-100">直接把畫面貼給它看</h4>
                  <span className="text-[11px] font-mono text-orange-400 font-bold bg-orange-500/10 px-1.5 py-0.5 rounded">Ctrl + V</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>不用形容，直接給看：</strong>把壞掉的畫面或設計稿截圖起來，在輸入框按 <code className="text-orange-300 font-bold">Ctrl+V</code> 貼上，它會照著圖改。
                </p>
              </div>
            </AnimatedBlock>

          </div>

        </div>

      </div>
    </SlideLayout>
  );
}
