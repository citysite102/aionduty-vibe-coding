import React from 'react';
import { Briefcase, Database, MessageSquareCode, FileText } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideClaudeProjects() {
  return (
    <SlideLayout 
      title="專屬知識庫與分身" 
      subtitle="Knowledge Base & Custom Instructions" 
      icon={Briefcase}
    >
      {/* 這裡是段落轉場：從終端機切到網頁端工具。用主動的問句開場，
          不要寫成「這頁講的不是終端機」那種道歉式的免責聲明。 */}
      <AnimatedBlock stepIndex={1} className="mb-3 bg-sky-950/20 border border-sky-900/40 rounded-2xl px-5 py-3.5 flex flex-col md:flex-row md:items-center gap-3">
        <div className="px-3 py-1 bg-sky-500/10 text-sky-300 border border-sky-500/25 rounded-full text-xs font-bold shrink-0 self-start md:self-center">
          不開終端機的時候呢？
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          你不會每天都開終端機。<strong className="text-slate-100">同一套心法換個載體也成立</strong>：在 claude.ai 網頁版叫 Projects，在桌面版叫 Cowork。
          規範放的位置不同，道理一樣，終端機那邊叫 CLAUDE.md，這邊叫專案知識庫與自訂指示。接下來四頁講這個。
        </p>
      </AnimatedBlock>

      {/* 介面示意：用程式碼畫，跟簡報其他頁一致 */}
      <AnimatedBlock stepIndex={1} className="mb-3 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden max-w-3xl">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-800 bg-slate-900/60">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          <span className="text-[11px] font-mono text-slate-500 ml-2">claude.ai / Projects</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[150px_1fr]">
          <div className="border-r border-slate-800 p-3 space-y-1.5 bg-slate-900/30">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Projects</div>
            <div className="px-2 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/25 text-sky-300 text-[11px] font-bold">📁 任務計時器</div>
            <div className="px-2 py-1.5 rounded-lg text-slate-500 text-[11px]">📁 課程備課</div>
            <div className="px-2 py-1.5 rounded-lg text-slate-500 text-[11px]">📁 客戶提案</div>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] font-bold text-emerald-400 mb-1.5">專案知識庫 (Project knowledge)</div>
              <div className="space-y-1 text-[11px] text-slate-400">
                <div>📄 品牌語氣規範.md</div>
                <div>📄 產品規格書.pdf</div>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
              <div className="text-[11px] font-bold text-indigo-400 mb-1.5">自訂指令 (Custom instructions)</div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                「你是這個專案的資深工程師。回答一律用繁體中文，先講結論再講理由。」
              </div>
            </div>
          </div>
        </div>
      </AnimatedBlock>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
              <Database size={18} />
              什麼是 Claude Projects？
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              Claude Projects 是 Claude.ai 上用來組織工作空間的功能，讓你為不同的任務或專案建立<strong>獨立的工作區</strong>。每個專案都有自己專屬的知識庫與自訂指令，讓 Claude 在這個專案裡預設就像為該領域的專家。
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 mb-2">三大核心機制：</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 marker:text-slate-600">
                <li><strong className="text-slate-300">專案知識庫：</strong>上傳文件、程式碼或指南，Claude 會在每次對話中自動參考。</li>
                <li><strong className="text-slate-300">自訂指令：</strong>設定 Claude 在這個專案中的角色、語氣與回答格式。</li>
                <li><strong className="text-slate-300">對話歷史留存：</strong>同一專案下的多個對話集中管理，隨時回頭接續。</li>
              </ul>
            </div>
          </AnimatedBlock>
        </div>

        <div className="space-y-3">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl h-full flex flex-col justify-center">
            <h3 className="text-sky-400 font-bold text-xl mb-3 flex items-center gap-2">
              <MessageSquareCode size={24} />
              為什麼不直接開新對話就好？
            </h3>
            
            <div className="space-y-3">
              <div className="bg-slate-950/50 p-4 rounded-xl border-l-4 border-rose-500">
                <div className="text-base font-bold text-rose-400 mb-2">一般對話的痛點</div>
                <p className="text-base text-slate-300 leading-relaxed">每次都要重新貼上 API 規格、重新解釋品牌語氣（Tone）、重新要求「請不要寫註解」。對話一長，前面交代的設定容易被後面的內容洗掉。</p>
              </div>
              
              <div className="bg-slate-950/50 p-4 rounded-xl border-l-4 border-emerald-500">
                <div className="text-base font-bold text-emerald-400 mb-2">Projects 的優勢</div>
                <p className="text-base text-slate-300 leading-relaxed">知識庫與自訂指令會作為<strong>底層設定</strong>穩定存在，無論開多少個新對話，Claude 都會牢記這些上下文，保持穩定高品質的輸出。</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-slate-400 bg-slate-950/30 px-5 py-4 rounded-xl border border-slate-900 leading-relaxed">
              💡 <strong>白話譬喻：</strong> 一般對話像是「找計時人員」，每次都要重新交代流程；Projects 像是「建立專屬部門」，有專屬辦公室和 SOP 手冊，以後只要直接交代任務即可。
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
