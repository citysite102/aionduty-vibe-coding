import { Terminal, MessageSquare, Code2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideCodeIntro() {
  return (
    <SlideLayout 
      title="為什麼選擇終端機與 Claude Code？" 
      subtitle="The Power of Local Agents & Claude Code Introduction" 
      icon={Terminal}
    >
      <div className="max-w-6xl mx-auto mt-2 text-left space-y-6">
        
        <AnimatedBlock stepIndex={1} className="text-center">
          <p className="text-slate-300 text-base leading-relaxed">
            同一個 AI，放在<strong className="text-slate-100">對話框</strong>裡和放在<strong className="text-indigo-300">你的電腦</strong>裡，是兩種完全不同的東西。
          </p>
        </AnimatedBlock>

        {/* The Ultimate Comparison (Advisor vs Executor) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Web Chat Block */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-slate-800 transition-colors">
            <div className="absolute top-0 right-0 p-4 text-slate-500/10 group-hover:text-slate-500/15 transition-colors">
              <MessageSquare size={100} />
            </div>
            
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-slate-950 text-slate-400 border border-slate-800">
                  <MessageSquare size={16} />
                </div>
                <h3 className="text-base font-bold text-slate-100">網頁對話模式：「顧問」</h3>
              </div>
              
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                像<strong>打電話請教一位很強的朋友</strong>。
              </p>

              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2.5 items-start">
                  <span className="text-slate-500 font-mono mt-0.5">✕</span>
                  <span>看不到你的專案，只讀得到你貼進去的那幾行</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-slate-500 font-mono mt-0.5">✕</span>
                  <span>它只能口述做法，開檔、貼上、執行都得你自己來</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-slate-500 font-mono mt-0.5">✕</span>
                  <span>報錯了，你得再複製一次錯誤訊息回去問</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-950 text-xs text-slate-500 font-medium">
              ★ 它有腦，但沒有手。
            </div>
          </AnimatedBlock>

          {/* Claude Code Block */}
          <AnimatedBlock stepIndex={3} className="bg-gradient-to-b from-indigo-950/20 to-slate-950/10 border-2 border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.08)]">
            <div className="absolute top-0 right-0 p-4 text-indigo-400/10">
              <Code2 size={100} />
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Terminal size={16} />
                </div>
                <h3 className="text-base font-bold text-indigo-300">本機終端機模式 (Claude Code)：「執行者」</h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-5">
                像<strong>那位朋友直接坐到你電腦前，邊做邊跟你討論</strong>。
              </p>

              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>直接讀你電腦裡的真實檔案，不必傳來傳去</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>自己下指令、自己看報錯、自己修、自己重跑</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>你從動手的人，變成決定方向和驗收的人</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-900 text-xs text-indigo-300/80 font-medium">
              ★ 有腦，也有手。
            </div>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-950/60 border border-slate-800 border-l-4 border-l-slate-600 rounded-xl px-5 py-3.5">
          <p className="text-slate-400 text-xs leading-relaxed">
            <strong className="text-slate-300">那 Connector／MCP 呢？</strong>網頁版確實能透過它們連到部分工具，但多半是連向<strong className="text-slate-300">雲端服務</strong>（讀某個 API、查某個線上資料庫）；它仍碰不到你電腦裡的<strong className="text-slate-200">真實檔案與終端機</strong>。真正能長在你專案裡動手的，還是本機 Agent。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
