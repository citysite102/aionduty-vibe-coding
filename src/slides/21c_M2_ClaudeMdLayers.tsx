import { Layers, FileText, Globe, FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideClaudeMdLayers() {
  return (
    <SlideLayout title="CLAUDE.md 的分層" subtitle="Multiple Layers of Settings" icon={Layers}>
      <div className="mt-4 max-w-6xl mx-auto">

        {/* 先講價值：同一句話，有沒有手冊的差別 */}
        <AnimatedBlock stepIndex={1} className="mb-3">
          <p className="text-slate-300 text-base mb-4">
            先看它解決什麼問題，再談檔案放哪。<strong className="text-slate-100">同一句需求，分別丟給有手冊和沒有手冊的專案：</strong>
          </p>
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 mb-4 text-sky-300 text-sm font-medium">
            「幫我加一個 5 分鐘的休息模式。」
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-rose-900/40 rounded-xl p-4">
              <div className="text-rose-400 text-xs font-bold mb-2">沒有 CLAUDE.md</div>
              <ul className="text-slate-400 text-sm space-y-1.5 list-disc pl-4 marker:text-rose-900">
                <li>按鈕寫成「開始休息」，跟你的航太語彙對不上</li>
                <li>順手塞了一張外部圖片當背景</li>
                <li>分鐘數又寫死在程式碼裡</li>
              </ul>
              <p className="text-slate-500 text-xs mt-3">這三條規矩你上一輪都交代過了。開新對話之後它並不記得。</p>
            </div>
            <div className="bg-slate-900 border border-emerald-900/40 rounded-xl p-4">
              <div className="text-emerald-400 text-xs font-bold mb-2">有 CLAUDE.md</div>
              <ul className="text-slate-300 text-sm space-y-1.5 list-disc pl-4 marker:text-emerald-800">
                <li>按鈕自己叫「補給」</li>
                <li>沒有引用任何外部圖片</li>
                <li>分鐘數加在最上面的設定區</li>
              </ul>
              <p className="text-slate-400 text-xs mt-3">這一輪你一條都沒提，它自己去讀了手冊。</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm mt-4 leading-relaxed">
            CLAUDE.md 的作用就是這個：<strong className="text-slate-100">把你的要求從「這次對話」搬到「這個專案」。</strong>
            寫下來之後，每一次新對話都從同一個起點開始，你不必再重新交代。
          </p>
        </AnimatedBlock>

        {/* 這段原本沒包 AnimatedBlock，第 0 步就會帶著一條分隔線孤零零浮在空白畫面中間 */}
        <AnimatedBlock stepIndex={2} as="p" className="text-slate-300 text-base mb-4 border-t border-slate-800 pt-4">
          一份手冊可以用很久。等專案變大，或是你想把某些習慣跨專案共用，才會用到下面的分層。
          <span className="text-sky-400 font-medium">原則是：越靠近現場的越具體，也越優先。</span>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <Globe className="text-emerald-400" size={20} />
              全域 ~/.claude/CLAUDE.md
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              你個人跨所有專案的偏好，像你自己的工作習慣。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden border-l-4 border-l-sky-500">
            <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <FileText className="text-sky-400" size={20} />
              專案根目錄 ./CLAUDE.md
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-2">
              這個專案的規章，進 repo 跟團隊共用。
            </p>
            <div className="text-slate-500 text-xs bg-slate-950 p-2 rounded">
              session 一開始就載入、整場都在，compaction 後還會自動重讀，不會掉。
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <FolderTree className="text-sky-400" size={20} />
              子目錄 / feature 底下
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-2">
              某一塊專屬的規矩。
            </p>
            <div className="text-sky-400 text-xs bg-sky-950/30 p-2 rounded border border-sky-500/20">
              重點是它「碰到才載入」，只有當 Claude 動到那一區的檔案時才讀進來，平常不佔 context。
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
            <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
              <FileText className="text-amber-400" size={20} />
              CLAUDE.local.md
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              你個人的設定、不進 repo（放進 gitignore）。
            </p>
          </AnimatedBlock>
        </div>
        
        <AnimatedBlock stepIndex={7} className="mt-4 bg-sky-950/20 border border-sky-500/20 p-5 rounded-xl flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">💡</div>
          <div>
             <p className="text-slate-300 text-sm leading-relaxed">
               <strong>小提醒：</strong>一份別超過約 200 行，太長遵循度會掉；<code className="text-sky-300">/init</code> 可以幫你生第一版。<br/>
               跨工具的話 <strong>AGENTS.md</strong> 是共通標準，把 CLAUDE.md symlink 成 AGENTS.md，Codex、Cursor 都能讀同一份。
             </p>
             <p className="text-slate-500 text-xs mt-3">
               🔗 資料來源與更多用法請參考官方文件：<a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">Claude Code Documentation</a>
             </p>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
