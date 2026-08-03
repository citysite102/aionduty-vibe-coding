import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Database, FileText, Zap, BookOpen } from 'lucide-react';

export default function SlideHarnessContext() {
  return (
    <SlideLayout title="上下文工程" subtitle="Context Engineering" icon={BookOpen}>
      <div className="pt-6 max-w-6xl mx-auto min-h-full flex flex-col">
        <div className="bg-sky-950/30 border border-sky-900/50 rounded-2xl p-6 mb-6">
          <h3 className="text-sky-300 font-bold mb-3 flex items-center gap-2 text-xl">
            <Zap size={24} />
            把 AI 開發變成工程，靠兩件事：餵對輸入 ＋ 驗證輸出
          </h3>
          <p className="text-slate-300 text-lg leading-relaxed">
            一邊是<strong className="text-sky-200">上下文工程</strong>（餵對輸入），一邊是<strong className="text-sky-200">驗證 (Verification)</strong>（檢查輸出）。少了驗證，也就是沒有<strong>測試（把關確定性的部分）</strong>與<strong>評估（把關非確定性的部分，如路徑、工具選擇與品質）</strong>，無論 Prompt 寫得多漂亮，本質上都還是 Vibe Coding。
          </p>
        </div>

        <p className="text-slate-300 text-lg mb-8">
          驗證負責「把關輸出」；而要讓輸出一開始就夠好，得先把「輸入」餵對，這就是本頁的主角：<strong>上下文工程</strong>。它像為新員工做「入職簡報」，你給 AI 什麼上下文，就決定它寫出的程式碼品質。要把 AI 開發用在真正上線的專案上，這是第一件該投資的事。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">靜態上下文<br/><span className="text-sm text-slate-500 font-normal">Static Context</span></h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              每次對話都會完整載入的系統指令或 Markdown 規範檔。就像必讀的<strong>員工手冊</strong>。
            </p>
            <div className="space-y-3 mt-auto">
              <div className="text-sm text-emerald-400 bg-emerald-950/30 px-4 py-3 rounded-lg border border-emerald-900/50">
                <strong>好處：</strong>極度可靠，不會遺漏
              </div>
              <div className="text-sm text-amber-400 bg-amber-950/30 px-4 py-3 rounded-lg border border-amber-900/50">
                <strong>壞處：</strong>每次都要消耗大量 Token 成本
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">動態上下文<br/><span className="text-sm text-slate-500 font-normal">Dynamic Context</span></h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              按需載入的資料（如經由 RAG 撈回的文件、工具執行結果）。就像<strong>隨問隨查的資料庫</strong>。
            </p>
            <div className="space-y-3 mt-auto">
              <div className="text-sm text-emerald-400 bg-emerald-950/30 px-4 py-3 rounded-lg border border-emerald-900/50">
                <strong>好處：</strong>便宜，用到才載入
              </div>
              <div className="text-sm text-amber-400 bg-amber-950/30 px-4 py-3 rounded-lg border border-amber-900/50">
                <strong>風險：</strong>Agent 該抓的時候可能漏抓
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-sky-950/20 border border-sky-900/50 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-sky-600/20 text-sky-300 text-xs font-bold px-3 py-1.5 rounded-bl-xl border-b border-l border-sky-600/30">
              推薦模式
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-sky-900/50 rounded-xl text-sky-300">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-sky-300">Agent Skills<br/><span className="text-sm text-sky-600/80 font-normal">混合式設計</span></h3>
            </div>
            <p className="text-sky-100 text-base leading-relaxed mb-6">
              平常只讓它知道「有哪些 Skill 可以用」，各佔一行標題。真的用到那一個的時候，才把整份內容讀進來。
            </p>
            <div className="mt-auto bg-sky-950/50 p-4 rounded-xl border border-sky-900/50">
              <p className="text-sm text-sky-200">
                這叫<strong>漸進式揭露 (Progressive Disclosure)</strong>：準確度顧到了，Token 成本也不會一直花在用不到的資料上。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        <AnimatedBlock
          stepIndex={4}
          className="mt-6 rounded-2xl border border-slate-800 border-l-4 border-l-amber-500 bg-slate-950 px-6 py-4"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            三張卡的差別，最後都落在同一件事上：
            <strong className="text-slate-100">你每次對話要把多少東西送進去，而那些東西是要付錢的。</strong>
            所以下一頁先把帳算清楚，你才知道手冊該寫多長、哪些東西不該常駐。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
