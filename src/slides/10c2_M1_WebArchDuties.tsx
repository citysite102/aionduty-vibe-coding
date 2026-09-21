import React, { useState } from 'react';
import { 
  LayoutTemplate, 
  MonitorSmartphone, 
  Server, 
  ArrowRightLeft, 
  Lock, 
  ShoppingCart, 
  Search, 
  CheckCircle2, 
  Cpu, 
  Database,
  Check
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

interface ScenarioData {
  id: 'login' | 'cart' | 'search';
  title: string;
  icon: any;
  desc: string;
  reqLabel: string;
  reqDetail: string;
  respLabel: string;
  respDetail: string;
  frontendDuties: string[];
  backendDuties: string[];
  dbDuties: string[];
}

const scenarios: Record<'login' | 'cart' | 'search', ScenarioData> = {
  login: {
    id: 'login',
    title: '登入驗證',
    icon: Lock,
    desc: '當使用者在網頁上輸入帳號密碼並點擊「登入」時...',
    reqLabel: 'POST /api/login',
    reqDetail: '{"email":"samuel@hahow.in", "pw":"***"}',
    respLabel: 'Success (200 OK)',
    respDetail: '{"token": "eyJhbGci...", "user": "Samuel"}',
    frontendDuties: [
      '先擋掉格式不對的 Email，再讓你輸入密碼。',
      '按下登入之後按鈕轉圈圈，不讓你連按三次。',
      '把後端發的通行證收好，然後把你帶到儀表板。'
    ],
    backendDuties: [
      '收下前端送過來的帳號與密碼。',
      '把你打的密碼算過一次，看跟資料庫存的那一組對不對得上。',
      '對得上就發一張有期限的通行證給你。'
    ],
    dbDuties: [
      '密碼存的是算過的結果，不存你打的那串字。',
      '查出你是誰，順便記下這次登入的時間、來源與裝置。'
    ]
  },
  cart: {
    id: 'cart',
    title: '購物結帳',
    icon: ShoppingCart,
    desc: '當使用者在購物車點擊「確認結帳」時...',
    reqLabel: 'POST /api/checkout',
    reqDetail: '{"items":[{"id":101, "qty":2}], "coupon":"AI50"}',
    respLabel: 'Order Created (201)',
    respDetail: '{"orderId": "ORD-2026-90", "payUrl": "https://..."}',
    frontendDuties: [
      '顯示購物車清單、數量增減、折扣券與金額加總。',
      '刷卡或 Apple Pay 的輸入畫面，由金流服務提供。',
      '按下去就鎖住並顯示進度，免得你重複扣款。'
    ],
    backendDuties: [
      '查詢即時庫存，確認商品是否足夠。',
      '算出最後金額，交給金流平台扣款。',
      '扣款成功後建立訂單，並更新商品庫存。'
    ],
    dbDuties: [
      '在訂單表新增一筆，給它一個訂單編號。',
      '商品表的庫存數字，減掉這次買走的數量。'
    ]
  },
  search: {
    id: 'search',
    title: '搜尋篩選',
    icon: Search,
    desc: '當使用者在搜尋框輸入「AI 學習書籍」時...',
    reqLabel: 'GET /api/search?q=AI',
    reqDetail: '{"q": "AI", "category": "Books", "page": 1}',
    respLabel: 'Results (200 OK)',
    respDetail: '{"total": 42, "results": [{"id":4, "title":"AI學習..."}]}',
    frontendDuties: [
      '搜尋框，還有你打到一半就跳出來的關鍵字建議。',
      '提供分類切換、價格區間篩選與星等排序。',
      '把結果排成一格一格的卡片，手機跟電腦都排得好看。'
    ],
    backendDuties: [
      '去資料庫裡把書名或標籤符合的都撈出來。',
      '照熱門程度、相關程度、有沒有特價排順序。',
      '常被查的結果先存一份，並且分頁，下次比較快。'
    ],
    dbDuties: [
      '先在書名跟標籤那兩欄建好目錄，找字才會快。',
      '記下最常被搜尋的字，之後要做推薦會用到。'
    ]
  }
};

export default function SlideWebArchDuties() {
  const [activeScenario, setActiveScenario] = useState<'login' | 'cart' | 'search'>('login');
  const activeData = scenarios[activeScenario];

  return (
    <SlideLayout title="前端、API 與後端各自負責什麼" subtitle="Web Architecture & Duties Split" icon={LayoutTemplate}>
      <div className="flex flex-col items-stretch gap-5 max-w-6xl mx-auto w-full pb-8">
        
        {/* TOP SCENARIO SELECTOR */}
        <AnimatedBlock stepIndex={1} className="w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-left">
            <div>
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <ArrowRightLeft className="text-sky-400 w-5 h-5" />
                <span>請點選切換不同商業情境，觀察前後端的分工：</span>
              </h3>
            </div>
            
            {/* Tab Selectors */}
            <div className="flex bg-slate-950 border border-slate-800 p-1.5 rounded-xl shrink-0 self-start md:self-auto">
              {(Object.keys(scenarios) as Array<'login' | 'cart' | 'search'>).map((key) => {
                const item = scenarios[key];
                const Icon = item.icon;
                const isActive = activeScenario === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveScenario(key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-sky-500 text-slate-950 shadow-md scale-105' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon size={13} />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedBlock>

        {/* THREE COLUMNS DUTIES - Larger font, extremely clean layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch text-left">
          
          {/* FRONTEND RESPONSIBILITY COLUMN */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 hover:border-sky-500/20 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800/60">
                <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl">
                  <MonitorSmartphone size={20} />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-sky-400 uppercase tracking-wide">前端負責 (UX & 介面)</h4>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Client Side / UI</span>
                </div>
              </div>
              
              <ul className="space-y-4 flex-1">
                {activeData.frontendDuties.map((duty, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                    <CheckCircle2 size={16} className="text-sky-400 shrink-0 mt-0.5" />
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-sky-300/80 font-medium">
              🎯 目標：讓使用者操作起來順手、不卡
            </div>
          </AnimatedBlock>

          {/* API BRIDGE COLUMN */}
          <AnimatedBlock stepIndex={3} className="bg-slate-950 border border-slate-900 rounded-2xl p-6 hover:border-emerald-500/20 transition-all flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/40">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <ArrowRightLeft size={20} />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-emerald-400 uppercase tracking-wide">API 來回傳什麼</h4>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Payload Contract</span>
                </div>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {activeData.desc}
              </p>

              <div className="space-y-4 pt-1">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Request (瀏覽器傳出)</span>
                    <span className="text-sky-400 text-xs font-bold px-1.5 py-0.5 bg-sky-950/85 rounded border border-sky-900/50">📋 顧客點單紙</span>
                  </div>
                  <div className="text-xs font-mono text-sky-400 font-bold mb-1">{activeData.reqLabel}</div>
                  <div className="text-xs font-mono text-slate-300 bg-slate-950 p-2 rounded overflow-x-auto select-all border border-slate-900">
                    {activeData.reqDetail}
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Response (伺服器傳回)</span>
                    <span className="text-emerald-400 text-xs font-bold px-1.5 py-0.5 bg-emerald-950/85 rounded border border-emerald-900/50">🍜 出菜 ＋ 出菜明細</span>
                  </div>
                  <div className="text-xs font-mono text-emerald-400 font-bold mb-1">{activeData.respLabel}</div>
                  <div className="text-xs font-mono text-slate-300 bg-slate-950 p-2 rounded overflow-x-auto select-all border border-slate-900">
                    {activeData.respDetail}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900 text-xs text-emerald-400/80 font-medium">
              🎯 目標：事先講好欄位規格，兩邊才接得起來
            </div>
          </AnimatedBlock>

          {/* BACKEND & DATABASE COLUMN */}
          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 hover:border-indigo-500/20 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-slate-800/60">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <Server size={20} />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-indigo-400 uppercase tracking-wide">後端與資料庫 (邏輯)</h4>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Server Side / SQL</span>
                </div>
              </div>

              <div className="mb-5">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <Cpu size={11} className="text-indigo-400" /> 
                  <span>伺服器運算邏輯</span>
                </div>
                <ul className="space-y-3.5">
                  {activeData.backendDuties.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed">
                       <Check size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                       <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/50">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                  <Database size={11} className="text-indigo-400" /> 
                  <span>資料庫存取</span>
                </div>
                <ul className="space-y-2.5">
                  {activeData.dbDuties.map((duty, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                      <span>{duty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-indigo-300/80 font-medium">
              🎯 目標：扛安全、扛重的運算、保護不能外流的資料
            </div>
          </AnimatedBlock>

        </div>

        {/* BOTTOM: AI Mindset Shift Block */}
        <AnimatedBlock stepIndex={5} className="bg-slate-950 border border-slate-900 rounded-2xl p-5 text-center mt-2 shadow-lg">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 你不用自己去寫這三層，但你要知道<span className="text-sky-300 font-bold">一件事會牽動到哪幾層</span>，才發得出完整的指令，也才驗收得了。
            所以可以一次講完：<span className="text-indigo-300 font-mono ml-1 font-bold">「幫我實作 {activeData.title} 情境的前端介面，並開好對應的 API 與資料庫欄位」</span>，
            而不是分三次講、每次都要自己想辦法接回去。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
