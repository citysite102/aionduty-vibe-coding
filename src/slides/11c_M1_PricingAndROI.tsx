import React from 'react';
import { CreditCard, DollarSign, Cpu, CheckCircle, Shield } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlidePricingAndROI() {
  return (
    <SlideLayout title="兩大類 AI 程式工具付費與登入模式" subtitle="Accounts, Subscriptions & API Pricing Guide" icon={CreditCard}>
      <div className="max-w-6xl mx-auto mt-2 text-left space-y-6 pb-6">
        
        <AnimatedBlock stepIndex={1}>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-1">
            <DollarSign className="text-sky-400" size={20} />
            「我有 Claude Pro 了，還需要另外付費嗎？」
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
            其實，現在主流的 AI 軟體大多支援<strong>「官方網頁 Pro 訂閱直接登入」</strong>與<strong>「API 計量付費」</strong>這兩種模式！
            搞懂這兩者的差異，你才知道自己的用量該走哪一種。<span className="text-[11px] text-slate-500 block mt-1">（* 費用皆為 2026 年中資訊。各家計價變動頻繁，尤其 Cursor 已多次改版，請務必以官方頁面為準）</span>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Claude Code (Anthropic API Console) */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-lg text-xs font-mono font-bold">
                  官方終端機工具
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Claude Code</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Claude Code (Anthropic 官方)</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                首次啟動 <code>claude</code>（或在對話中輸入 <code>/login</code>）登入時，系統提供兩種計費來源：
              </p>
              
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-xs font-mono text-slate-300 space-y-4">
                <div>
                  <span className="text-sky-400 font-bold block mb-1">❶ 訂閱制（Pro $20 / Max 5x $100 / Max 20x $200 每月）</span>
                  <span className="text-slate-400 leading-relaxed block">
                    有網頁版訂閱就直接登入個人帳號，額度共用、不必另外付費。
                    <span className="text-amber-300/90 block mt-1.5">⚠️ 但 Pro 的額度拿來跑 Claude Code 會很快用完（有 5 小時滾動視窗與每週上限）。每天重度使用的話，得升級 Max 或改走 API。</span>
                    <span className="text-sky-300/90 block mt-1.5">💡 想知道自己用到哪了，在對話裡輸入 <span className="text-sky-200 font-bold">/usage</span>：訂閱方案會看到額度用掉多少的長條圖，按 d 或 w 可以切換看最近一天或一週。</span>
                  </span>
                </div>
                <div className="border-t border-slate-900 pt-3">
                  <span className="text-sky-400 font-bold block mb-1">❷ Anthropic API 流量扣款 (計量付費)</span>
                  <span className="text-slate-400 leading-relaxed block">
                    免訂閱月租，註冊 Console 並儲值（最低 $5 美金即可開通），按實際 Token 消耗量精確計量。
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span className="text-amber-500">💡 怎麼選：</span>
              <span>偶爾用 → API 儲值，用多少算多少；每天都用 → 訂閱制通常便宜得多。先從便宜的開始，撞到上限再升級。</span>
            </div>
          </AnimatedBlock>

          {/* Cursor & Copilot */}
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-xs font-mono font-bold">
                  AI 輔助編輯器
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Cursor & Copilot</span>
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-2">Cursor / GitHub Copilot</h4>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                作為整合型編輯器，同樣提供彈性的付費選擇，適合不同強度的開發需求：
              </p>
              
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 text-xs font-mono text-slate-300 space-y-4">
                <div>
                  <span className="text-indigo-400 font-bold block mb-1">❶ 月租訂閱制（約 $20/月起）</span>
                  <span className="text-slate-400 leading-relaxed block">
                    訂閱 Cursor Pro 等方案，享有高速的進階模型專屬配額與流暢的 UI 互動體驗，適合重度開發者。
                  </span>
                </div>
                <div className="border-t border-slate-900 pt-3">
                  <span className="text-indigo-400 font-bold block mb-1">❷ 自備金鑰模式 (Bring Your Own Key)</span>
                  <span className="text-slate-400 leading-relaxed block">
                    在軟體內填入你個人的 OpenRouter, Anthropic 或 OpenAI API 金鑰，免月租，完全依照與 AI 的互動流量扣款。
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
              <span className="text-indigo-400">🚀 實務建議：</span>
              <span>自備 API Key 能讓你免繳月租，且能在同一個介面依用量靈活切換多款主流模型（不同廠牌的模型都可切換）。</span>
            </div>
          </AnimatedBlock>

        </div>
      </div>
    </SlideLayout>
  );
}
