import { Terminal, MessageSquare, Code2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁論證的是「為什麼要一個能動手的 AI」，不是「為什麼要終端機」。
 * 終端機只是它的其中一個介面，桌面版的 Code 頁籤同樣成立。
 */
export default function SlideCodeIntro() {
  return (
    <SlideLayout
      title="為什麼要一個能動手的 AI？"
      subtitle="Advisor or Executor"
      icon={Code2}
    >
      <div className="max-w-6xl mx-auto mt-2 text-left space-y-6">
        
        <AnimatedBlock stepIndex={1} className="text-center">
          <p className="text-slate-300 text-base leading-relaxed">
            同一個 AI，放在<strong className="text-slate-100">對話框</strong>裡和放在<strong className="text-sky-300">你的電腦</strong>裡，是兩種完全不同的東西。
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
          <AnimatedBlock stepIndex={3} className="bg-gradient-to-b from-sky-950/20 to-slate-950/10 border-2 border-sky-500/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.10)]">
            <div className="absolute top-0 right-0 p-4 text-sky-400/10">
              <Code2 size={100} />
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Terminal size={16} />
                </div>
                <h3 className="text-base font-bold text-sky-300">裝在你電腦裡 (Claude Code)：「執行者」</h3>
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

            <div className="mt-6 pt-3 border-t border-slate-900 text-xs text-sky-300/80 font-medium">
              ★ 有腦，也有手。
            </div>
          </AnimatedBlock>

        </div>

        {/*
          原本開頭是「那 Connector 跟 MCP 呢？」。
          Connector 全片只出現過這一次，MCP 要到第二單元才正式介紹，
          在這裡等於用兩個沒教過的名詞去回答一個學員還沒問的問題。
          實質保留（接得到線上服務、打不開你電腦裡的檔案），名詞拿掉。
        */}
        <AnimatedBlock stepIndex={4} className="border rounded-2xl px-5 py-3.5 bg-slate-900 border-slate-800">
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-300">網頁版不是也能接東西嗎？</strong>可以，它接得上一些線上服務，
            讀某個雲端資料庫、查某個平台上的資料。但那些東西都在網路上，
            它還是<strong className="text-slate-200">打不開你電腦裡的檔案</strong>，也不能在你的資料夾裡新增或修改任何東西。
            要做到那件事，工具得裝在你自己這台電腦上。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
