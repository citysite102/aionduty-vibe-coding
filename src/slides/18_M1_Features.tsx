import { PackageOpen, Sliders } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM1Features() {
  return (
    <SlideLayout title="Claude Code 新手友善內建功能" subtitle="Built-in Commands" icon={PackageOpen}>
      <div className="pt-8 max-w-6xl mx-auto h-full flex flex-col">
        <p className="text-slate-400 text-lg mb-8 text-center">
          在對話框中輸入斜線 <code className="text-sky-400 font-bold bg-sky-950 px-2 py-1 rounded">/</code> 就會跳出指令清單。這幾個是最常用的。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-sky-500/50 transition-colors">
            <h3 className="text-xl font-bold text-sky-400 font-mono mb-2">/help</h3>
            <div className="text-slate-100 font-bold mb-4">呼叫使用手冊</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              不知道有哪些指令可以用？隨時輸入 /help，它會列出所有可用的內建指令與說明。
            </p>
            <div className="text-slate-500 text-xs bg-slate-950 p-3 rounded font-mono">輸入：/help</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors">
            <h3 className="text-xl font-bold text-emerald-400 font-mono mb-2">/usage</h3>
            <div className="text-slate-100 font-bold mb-4">掌握花費與額度</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              顯示這次對話的花費、方案用量與額度何時重置。訂閱制看的是「還剩多少額度」，不是金額。
            </p>
            <div className="text-slate-500 text-xs bg-slate-950 p-3 rounded font-mono">輸入：/usage（舊名 /cost 仍可用）</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors">
            <h3 className="text-xl font-bold text-amber-400 font-mono mb-2">/compact</h3>
            <div className="text-slate-100 font-bold mb-4">壓縮對話記憶</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              當對話變得很長時，每次對話都會消耗大量 Token。用這個指令幫你「總結並瘦身」，省錢又提速。<strong>（⚠️ 注意：壓縮是有損的，重要約定請寫進 CLAUDE.md 而不是依賴對話記憶，這正是後面單元的主題）</strong>
            </p>
            <div className="text-slate-500 text-xs bg-slate-950 p-3 rounded font-mono">輸入：/compact</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-rose-500/50 transition-colors">
            <h3 className="text-xl font-bold text-rose-400 font-mono mb-2">/clear</h3>
            <div className="text-slate-100 font-bold mb-4">重新開始</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              清除目前的對話紀錄，等同於開一個新的聊天視窗。
            </p>
            <div className="text-slate-500 text-xs bg-slate-950 p-3 rounded font-mono">輸入：/clear</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-sky-500/50 transition-colors">
            <h3 className="text-xl font-bold text-sky-400 font-mono mb-2">/init</h3>
            <div className="text-slate-100 font-bold mb-4">產生基礎專案說明書</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              自動掃描專案，幫你產生第一版 CLAUDE.md 設定檔（後面章節會教），讓你不用從零開始寫。
            </p>
            <div className="text-slate-500 text-xs bg-slate-950 p-3 rounded font-mono">輸入：/init</div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
               <Sliders size={24} />
             </div>
             <p className="text-slate-300 font-bold">先記這五個<br/>就夠你用很久了</p>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
