import { Map } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlidePhilosophy() {
  return (
    <SlideLayout title="內容大綱" subtitle="Unit Overview" icon={Map}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 max-w-6xl mx-auto h-full items-start">
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-sky-400 mb-4">這堂課程在教什麼？</h3>
          
          <div className="space-y-3">
            <div className="text-slate-200 text-xs font-semibold flex items-center gap-1.5 bg-sky-950/30 border border-sky-900/30 px-3 py-2 rounded-xl">
              <span className="text-sm">🎯</span>
              <span>核心目標：能自己做出工具與網頁，而不只是會挑工具</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              本課程將帶你跳脫「只在對話框來回複製貼上」的限制，讓你能主導整個 <strong className="text-white">AI 開發流程</strong>。你將學會調度 AI 寫出真正能跑的網頁、自動修復錯誤，把日常的點子親手指揮成好用的小工具與網站。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-sky-400 mb-6">四大核心單元</h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-mono shrink-0 border border-slate-700">1</div>
              <div>
                <strong className="text-slate-200 block text-lg mb-0.5">解構 Vibe Coding：跳脫對話框的開發新典範</strong>
                <span className="text-slate-400 text-sm leading-relaxed">跳脫對話框，理解從輔助生成到 Agent 自動化的本質差異。</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-mono shrink-0 border border-slate-700">2</div>
              <div>
                <strong className="text-slate-200 block text-lg mb-0.5">Agent 的心智模型與 Claude Code 終端機實作</strong>
                <span className="text-slate-400 text-sm leading-relaxed">建立發包思維，從對話框走向終端機，掌握 Claude Code 安全邊界。</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-mono shrink-0 border border-slate-700">3</div>
              <div>
                <strong className="text-slate-200 block text-lg mb-0.5">CLAUDE.md 設計邏輯與運作框架</strong>
                <span className="text-slate-400 text-sm leading-relaxed">把專案的規矩與慣例寫下來，讓 AI 每次進來都照同一套標準做事。</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-mono shrink-0 border border-slate-700">4</div>
              <div>
                <strong className="text-slate-200 block text-lg mb-0.5">Agent 團隊與開發循環架構</strong>
                <span className="text-slate-400 text-sm leading-relaxed">建構多角色協作網路，與自動化開發循環，獨立交付軟體。</span>
              </div>
            </li>
          </ul>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
