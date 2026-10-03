import { Briefcase, FileWarning, Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-10-03 兩個情境都改寫成不寫程式的人也讀得懂的版本，理由跟 Slide 76 同一個：
 * 這一段在講零件怎麼用，不是在講程式。原本情境三舉 `rm -rf /` 與 `DROP TABLE`、
 * 情境四舉 GitHub Issue 與 Sentry 的 log，非工程背景的學員整頁沒有入口。
 *
 * 做法是「主例換成誰都懂的，工程版本留一行小字」，這樣兩種讀者都接得住，
 * 而且概念本身沒有被稀釋：Hook 擋的是它動手之前，子代理回報的只有結論。
 * 要再改的時候維持這個結構，不要把主例換回工程例子。
 *
 * 配色：原本 red（情境三）＋ amber 與 sky（情境四）三個強調色，違反 A-1。
 * 現在 red 只留給情境三的紅線，情境四整格走 sky，標籤用灰階。
 */

export default function SlideM2ExtensionsCases2() {
  return (
    <SlideLayout title="零件實際怎麼用（二）：防線與調查" subtitle="Real-world Scenarios for Extensions" icon={Briefcase}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch mt-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-red-400 mb-4 border-b border-slate-800 pb-3">
            <FileWarning size={20} />
            情境三：絕對不能跨越的紅線 (Hook)
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            有些事做了就回不來：刪掉檔案、蓋掉正式版、把客戶名單送到外面去。
          </p>
          <div className="bg-red-950/20 p-4 rounded-lg border border-red-500/20">
            <span className="text-red-400 font-bold text-xs block mb-2">Hook：它動手之前先攔一次</span>
            <p className="text-slate-300 text-sm">
              它要刪檔案、或是要改到你標成正式版的那一份之前，先跑一段檢查。不符合就直接擋下來，
              <strong className="text-slate-100">它連做的機會都沒有</strong>，而不是做完才跟你說一聲。
            </p>
            <div className="text-slate-500 text-xs mt-3 space-y-1.5">
              <p>
                同一條寫進 <code className="font-mono text-orange-300">CLAUDE.md</code> 不夠：那是它每次自己判斷要不要遵守，
                對話一長會被埋掉，你貼進去的網頁內容也可能把它說服過去。Hook 不經過它判斷，所以它想跳過也跳不掉。
              </p>
              <p>工程上最常擋的是會一次刪掉整個資料夾、或是直接清空資料庫的那幾個指令。</p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-sky-400 mb-4 border-b border-slate-800 pb-3">
            <Search size={20} />
            情境四：線索散在好幾個地方（MCP ＋ 子代理）
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            客戶回報一個問題，而線索分散在不同系統裡，你不想自己一個一個打開翻。
          </p>
          <div className="space-y-3">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-300 font-bold text-xs block mb-1">MCP：連到外面的系統</span>
              <span className="text-slate-400 text-sm">連上你們記客訴的那個工具，把那一張單的內容讀進來，你不用複製貼上。</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-300 font-bold text-xs block mb-1">子代理（Subagent）：派出去查</span>
              <span className="text-slate-400 text-sm">
                派它去翻這三個月的出貨紀錄，只把「哪一批出問題、建議怎麼處理」回報給你。
                <strong className="text-slate-200">它翻過的那幾百筆不會進到你的對話裡。</strong>
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            工程上是同一件事，只是換了系統名字：MCP 連上 GitHub 讀那則錯誤回報，子代理去翻伺服器的紀錄檔，回報一句根因與修法。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
