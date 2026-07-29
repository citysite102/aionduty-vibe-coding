import React from 'react';
import { Users, FolderSync, FolderOpen, Code, MessageCircle, Waypoints } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideClaudeCowork() {
  return (
    <SlideLayout 
      title="Cowork 本機工作區"
      subtitle="Desktop App Context & Team Features" 
      icon={FolderSync}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        <div className="lg:col-span-5 space-y-5">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-full">
            <h3 className="text-emerald-400 font-bold text-lg mb-5 flex items-center gap-2">
              <Users size={20} />
              Claude Team 團隊方案
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-5">
              在了解 Cowork 之前，先釐清 <strong>Claude Team</strong> 的概念。它是專為企業或團隊設計的共用方案，核心價值在於「統一與共享」。
            </p>
            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none"></div>
                <div className="text-base font-bold text-emerald-300 mb-2">1. 共享 Projects 專案庫</div>
                <div className="text-sm text-slate-400 leading-relaxed">
                  資深工程師建立好帶有系統架構與標準規範的 Project 後，可以直接將專案設定分享給團隊所有成員。這能確保每個人呼叫 AI 時，出來的程式碼風格與品質都一致。
                </div>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="text-base font-bold text-slate-200 mb-2">2. 統一帳單與成員管理</div>
                <div className="text-sm text-slate-400 leading-relaxed">
                  方便企業集中管理帳號與操作權限，員工離職時由管理者統一停用，也不必讓每個人各自綁信用卡。
                </div>
              </div>
            </div>
          </AnimatedBlock>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-full flex flex-col justify-center">
            <h3 className="text-sky-400 font-bold text-lg mb-5 flex items-center gap-2">
              <FolderOpen size={20} />
              桌面版專屬功能：Cowork (本機協作)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              在 Mac/Windows 的 Claude 桌面版中，你會看到頂部有 <strong>Chat、Cowork、Code</strong> 三個頁籤切換。其中 <strong>Cowork</strong> 是一項新功能，允許你直接綁定電腦本機端的資料夾作為上下文。
            </p>
            
            <div className="mb-8 flex justify-center">
              <div className="bg-[#2d2d2d] rounded-lg p-1.5 flex items-center gap-1 border border-slate-700 shadow-xl w-fit">
                <div className="px-4 py-1.5 rounded-md text-slate-400 flex items-center gap-2 text-sm font-medium">
                  <MessageCircle size={16} /> Chat
                </div>
                <div className="px-4 py-1.5 rounded-md bg-[#404040] text-slate-100 flex items-center gap-2 text-sm font-medium shadow-sm border border-slate-600/50">
                  <Waypoints size={16} /> Cowork
                </div>
                <div className="px-4 py-1.5 rounded-md text-slate-400 flex items-center gap-2 text-sm font-medium">
                  <Code size={16} /> Code
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-sky-900/30 flex items-center justify-center text-sky-400 shrink-0 border border-sky-800 font-bold">1</div>
                <div>
                  <h4 className="text-base font-bold text-slate-200 mb-1">精準的目錄讀取</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">你可以手動選擇特定的資料夾讓 Claude 讀取（例如：只讀取 <code>/src/components</code>），非常適合針對局部模組進行調整或重構，不會像直接掃描整個大專案那樣失去焦點。</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-900/30 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-800 font-bold">2</div>
                <div>
                  <h4 className="text-base font-bold text-slate-200 mb-1">圖形化介面優勢</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">保有網頁版直覺的聊天體驗，又能直接存取本地檔案。對不熟悉純文字終端機（CLI）操作的設計師或企劃人員來說，門檻大幅降低。</p>
                </div>
              </div>
            </div>
          </AnimatedBlock>
        </div>

        {/* Cowork vs. ChatGPT: clarify the difference */}
        <AnimatedBlock stepIndex={3} className="lg:col-span-12 bg-slate-950 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-slate-200 font-bold text-base mb-1.5 flex items-center gap-2">
            🤔 「這跟 ChatGPT 最新的功能不是很像嗎？」關鍵差異在「誰動手改檔案」
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed mb-4">
            兩邊都能「讀到你電腦上的東西」，但方向不同。看懂這點，就知道各自適合做什麼。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <div className="text-sm font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <MessageCircle size={15} className="text-slate-400" /> ChatGPT 讀檔／連結 App
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                偏向<strong className="text-slate-300">「對話輔助」</strong>：把開啟中的檔案或內容抓進對話幫你問答、給建議，你再自己把結果<strong className="text-slate-300">複製貼回</strong>專案。動手改檔案的還是你。
              </p>
            </div>
            <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-xl p-4">
              <div className="text-sm font-bold text-emerald-300 mb-1.5 flex items-center gap-1.5">
                <Waypoints size={15} className="text-emerald-400" /> Claude Cowork 綁定工作區
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                偏向<strong className="text-emerald-300">「代理式動手做」</strong>：把一個本機資料夾綁成工作區，Claude 直接在裡面<strong className="text-emerald-300">新增、修改、執行檔案</strong>，改動直接寫進你的檔案，你負責驗收。
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-3">
            💡 兩家功能都更新得很快，重點不是比誰新，而是分清楚需求：只要「問答、找靈感」用對話輔助就夠；要「Agent 幫你把檔案改到好」，就選能直接動手的工作區模式。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
