import { HelpCircle, TerminalSquare, MessageSquare, Briefcase } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide18b() {
  return (
    <SlideLayout title="該用什麼工具？" subtitle="Scenario Quiz" icon={HelpCircle}>
      <div className="max-w-5xl mx-auto h-full flex flex-col justify-center">
        <p className="text-slate-400 text-lg mb-6 text-center">
          在進入下一個單元前，我們先來思考這 5 個常見的職場情境。<br/>
          <span className="text-sky-300">你覺得該用「純對話 (Chat)」、「無程式碼工具 (No-Code)」還是「Agent (Claude Code)」？</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-slate-800 p-2 rounded-lg text-slate-300 shrink-0 mt-1"><Briefcase size={16} /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-bold mb-1 text-sm">情境一：每週一從系統匯出報表寄給主管</h4>
              <p className="text-slate-400 text-xs mb-2">不需要寫完整網頁，只需自動化邏輯。</p>
              <div className="text-emerald-400 text-xs bg-emerald-950/30 px-2 py-1.5 rounded-lg border border-emerald-900/50 leading-relaxed">
                💡 <strong>建議做法：</strong> 使用 Chat 請它寫一段 Google Apps Script 貼到表單執行。
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-slate-800 p-2 rounded-lg text-slate-300 shrink-0 mt-1"><Briefcase size={16} /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-bold mb-1 text-sm">情境二：短期活動網頁，下週上線</h4>
              <p className="text-slate-400 text-xs mb-2">只收集與顯示資訊，不需要複雜功能。</p>
              <div className="text-sky-400 text-xs bg-sky-950/30 px-2 py-1.5 rounded-lg border border-sky-900/50 leading-relaxed">
                💡 <strong>建議做法：</strong> 用 AI App Builder (如 v0) 生成部署，或 Typeform。
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-slate-800 p-2 rounded-lg text-slate-300 shrink-0 mt-1"><Briefcase size={16} /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-bold mb-1 text-sm">情境三：舊有系統新增「忘記密碼」</h4>
              <p className="text-slate-400 text-xs mb-2">需讀取舊資料庫結構、整合目前的信件 API。</p>
              <div className="text-indigo-400 text-xs bg-indigo-950/30 px-2 py-1.5 rounded-lg border border-indigo-900/50 leading-relaxed">
                💡 <strong>建議做法：</strong> 用 Claude Code 讀取現有專案，理解架構直接串接。
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-start gap-3">
            <div className="bg-slate-800 p-2 rounded-lg text-slate-300 shrink-0 mt-1"><Briefcase size={16} /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-bold mb-1 text-sm">情境四：高度客製化的個人記帳工具</h4>
              <p className="text-slate-400 text-xs mb-2">想自己掌控所有的畫面細節與資料存放方式。</p>
              <div className="text-indigo-400 text-xs bg-indigo-950/30 px-2 py-1.5 rounded-lg border border-indigo-900/50 leading-relaxed">
                💡 <strong>建議做法：</strong> 先用 Google AI Studio 打草稿，下載後用 Agent 開發。
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-start gap-3 md:col-span-2 md:w-3/4 md:mx-auto">
            <div className="bg-slate-800 p-2 rounded-lg text-slate-300 shrink-0 mt-1"><Briefcase size={16} /></div>
            <div className="flex-1">
              <h4 className="text-slate-200 font-bold mb-1 text-sm">情境五：PM 想了解目前實作的爬蟲邏輯</h4>
              <p className="text-slate-400 text-xs mb-2">不需要修改程式碼，只要了解架構並規劃下一步。</p>
              <div className="text-emerald-400 text-xs bg-emerald-950/30 px-2 py-1.5 rounded-lg border border-emerald-900/50 leading-relaxed">
                💡 <strong>建議做法：</strong> 用 Claude Code 在專案裡來回討論，請它「用白話文解釋程式碼」並協助梳理邏輯。
              </div>
            </div>
          </AnimatedBlock>

        </div>
      </div>
    </SlideLayout>
  );
}
