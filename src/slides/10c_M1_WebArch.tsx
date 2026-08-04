import React, { useState, useEffect } from 'react';
import { 
  LayoutTemplate, 
  MonitorSmartphone, 
  Server, 
  ArrowRightLeft, 
  Play, 
  RotateCcw, 
  Lock, 
  ShoppingCart, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Database,
  Activity,
  Check
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion, AnimatePresence } from 'motion/react';

type AnimState = 'idle' | 'requesting' | 'processing' | 'responding' | 'success';

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
  feLog: Record<AnimState, string>;
  beLog: Record<AnimState, string>;
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
      '呈現密碼輸入欄位，並驗證 Email 格式是否正確。',
      '使用者點擊「登入」時，立即觸發按鈕 Loading 狀態，防止重複發送。',
      '收到後端傳來的 Token 後存起來（這裡用 localStorage 示意；正式產品建議改用 HttpOnly Cookie 較安全）。',
      '將頁面導向至「學習儀表板」，並彈出登入成功通知。'
    ],
    backendDuties: [
      '安全接收並解析來自前端的 HTTP 登入請求封包。',
      '在資料庫中比對該 Email 的密碼雜湊值 (Hash) 是否正確。',
      '比對吻合後，簽發一個具有時效性的安全 JWT 憑證。',
      '處理防刷機制 (Rate Limiting)，阻擋惡意帳密暴力破解。'
    ],
    dbDuties: [
      '儲存經雜湊加密後的密碼安全欄位，絕不儲存明文。',
      '查詢使用者資料，並記錄本次登入成功的時間、IP 與裝置。'
    ],
    feLog: {
      idle: '⏳ 等待使用者點擊登入按鈕...',
      requesting: '📤 發送請求：POST /api/login (攜帶帳號/密碼)...',
      processing: '📡 請求已送達後端，正在等待處理結果...',
      responding: '📥 收到回應封包，正在解析 JSON 資料...',
      success: '🎉 登入成功！Token 儲存完畢，導向 Dashboard 畫面。'
    },
    beLog: {
      idle: '🟢 API Server 啟動中，監聽連接埠 3000...',
      requesting: '🔔 收到新請求！準備解析 POST 請求主體...',
      processing: '⚙️ 處理中：正在比對密碼雜湊值，並檢索使用者資料庫...',
      responding: '🚀 驗證成功！產生安全 JWT Token，準備傳回前端...',
      success: '🟢 狀態碼 200 OK 發送完成。伺服器回復閒置狀態。'
    }
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
      '顯示精美的購物車清單、數量增減、折扣券套用與金額加總。',
      '提供第三方金流 (如信用卡、Apple Pay) 的安全輸入介面。',
      '按下結帳時，鎖定點擊並顯示刷卡進度條，避免使用者重複扣款。',
      '成功後播放拉炮動畫，並將畫面上的購物車商品數歸零。'
    ],
    backendDuties: [
      '從資料庫查詢即時庫存，確認商品庫存是否足夠。',
      '計算最終金額，與 Stripe 或其他金流平台進行 API 串接扣款。',
      '扣款成功後，在資料庫建立訂單，並更新商品主表的庫存。',
      '同步發送電子郵件或通知信，並通知倉儲系統準備出貨。'
    ],
    dbDuties: [
      '在 orders 資料庫中建立一筆全新的訂單與交易編號。',
      '將商品表中 items 的 stock 庫存數減去購買量。'
    ],
    feLog: {
      idle: '⏳ 等待使用者點擊確認結帳...',
      requesting: '📤 發送請求：POST /api/checkout (攜帶購物車商品與折扣券)...',
      processing: '📡 後端處理金流中，請勿關閉網頁或重複點擊...',
      responding: '📥 金流成功！正在接收並解析訂單編號與交易紀錄...',
      success: '🎉 購買成功！購物車清單已清空，顯示結帳確認畫面。'
    },
    beLog: {
      idle: '🟢 API Server 啟動中，監聽連接埠 3000...',
      requesting: '🔔 收到結帳請求！確認品項與折價碼金額...',
      processing: '⚙️ 處理中：確認資料庫庫存，正與 Stripe 金流 API 進行扣款扣減...',
      responding: '🚀 扣款成功！資料庫訂單建立成功，回傳訂單編號與物流網址...',
      success: '🟢 狀態碼 201 Created 發送完成。伺服器回復閒置狀態。'
    }
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
      '提供搜尋框與智慧下拉關鍵字推薦 (Debounced Autocomplete)。',
      '提供分類切換、價格區間篩選與星等排序按鈕。',
      '將後端回傳的陣列，以流暢的卡片網格 RWD 樣式渲染出來。',
      '在頁面底部呈現精美分頁按鈕，或實作無限滾動載入。'
    ],
    backendDuties: [
      '對資料庫進行 Full-text 全文檢索或 SQL 模糊搜尋查詢。',
      '根據熱門程度、關聯權重、特價狀態進行排序計算。',
      '實作 Cache 機制 (如 Redis)，避免熱門關鍵字重複轟炸資料庫。',
      '執行分頁 (Pagination) 切割，限制一次只傳回 20 筆加速載入。'
    ],
    dbDuties: [
      '在 books 表的 title 和 tag 欄位建立索引 (Index) 加速文字搜尋。',
      '記錄高頻搜尋關鍵字，供後續智慧關聯推薦之機器學習訓練。'
    ],
    feLog: {
      idle: '⏳ 等待使用者輸入關鍵字並點擊搜尋...',
      requesting: '📤 發送請求：GET /api/search?q=AI...',
      processing: '📡 資料檢索中，顯示骨架螢幕 (Skeleton Loading) 預覽...',
      responding: '📥 收到資料！包含 42 筆符合結果與分頁資訊...',
      success: '🎉 渲染完成！顯示 42 個搜尋結果卡片。'
    },
    beLog: {
      idle: '🟢 API Server 啟動中，監聽連接埠 3000...',
      requesting: '🔔 收到搜尋請求！參數 q=AI, category=Books...',
      processing: '⚙️ 處理中：利用快取和資料庫全文索引檢索符合的商品...',
      responding: '🚀 檢索完畢！整理分頁格式為 JSON 封包，準備回傳...',
      success: '🟢 狀態碼 200 OK 發送完成。伺服器回復閒置狀態。'
    }
  }
};

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export default function Slide10c() {
  const [activeScenario, setActiveScenario] = useState<'login' | 'cart' | 'search'>('login');
  const [animState, setAnimState] = useState<AnimState>('idle');
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const activeData = scenarios[activeScenario];

  // Animation timeline coordinator
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (animState === 'requesting') {
      timer = setTimeout(() => setAnimState('processing'), 1400);
    } else if (animState === 'processing') {
      timer = setTimeout(() => setAnimState('responding'), 1500);
    } else if (animState === 'responding') {
      timer = setTimeout(() => setAnimState('success'), 1400);
    } else if (animState === 'success') {
      timer = setTimeout(() => {
        setAnimState('idle');
      }, 2000);
    } else if (animState === 'idle' && isAutoPlaying) {
      timer = setTimeout(() => {
        setAnimState('requesting');
      }, 2500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [animState, isAutoPlaying]);

  const triggerSimulation = () => {
    setIsAutoPlaying(false);
    setAnimState('requesting');
  };

  const handleScenarioChange = (id: 'login' | 'cart' | 'search') => {
    setActiveScenario(id);
    setAnimState('idle'); // reset animation
  };

  return (
    <SlideLayout title="你按下按鈕之後，發生了什麼事" subtitle="Web Architecture & API Request" icon={LayoutTemplate}>
      <div className="flex flex-col items-stretch gap-3 max-w-5xl mx-auto w-full pb-0">
        
        {/* Intro */}
        <AnimatedBlock stepIndex={1} className="w-full">
          <p className="text-slate-300 text-sm md:text-base bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <span>網頁是由 <strong className="text-sky-400 font-bold">前端 (Client)</strong> 透過 <strong className="text-emerald-400 font-bold">API 請求與回應</strong> 驅動 <strong className="text-indigo-400 font-bold">後端 (Server)</strong> 與資料庫協作運作的。</span>
            <span className="text-xs bg-slate-800 text-slate-400 font-mono px-2 py-1 rounded border border-slate-700 hidden sm:inline-block">RWD Layout</span>
          </p>
        </AnimatedBlock>

        {/* TOP SCENARIO SWITCHER (Moved to top as requested!) */}
        <AnimatedBlock stepIndex={2} className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80 text-left">
            <div>
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <ArrowRightLeft className="text-sky-400 w-5 h-5" />
                <span>請選擇要模擬的商業情境（即時切換）：</span>
              </h3>
            </div>
            
            {/* Tab Selectors */}
            <div className="flex bg-slate-950 border border-slate-800 p-1.5 rounded-xl shrink-0 self-start sm:self-auto">
              {(Object.keys(scenarios) as Array<'login' | 'cart' | 'search'>).map((key) => {
                const item = scenarios[key];
                const Icon = item.icon;
                const isActive = activeScenario === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => handleScenarioChange(key)}
                    aria-pressed={isActive}
                    aria-label={`切換到${item.title}情境`}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-colors duration-150 ${focusRing} ${
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

        {/* SECTION: Interactive Pipeline Simulator */}
        <AnimatedBlock stepIndex={3} className="relative bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 shadow-2xl">
          
          {/* Simulator Controls */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
              <h3 className="text-xs md:text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
                API Live Connection Simulator
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Playback Mode Switch */}
              <button 
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-pressed={isAutoPlaying}
                aria-label={isAutoPlaying ? '切換為手動模式' : '切換為自動循環'}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-colors duration-150 flex items-center gap-1.5 ${focusRing} ${
                  isAutoPlaying 
                    ? 'bg-indigo-950/40 text-indigo-400 border-indigo-900/60' 
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                <Activity size={12} className={isAutoPlaying ? 'animate-pulse' : ''} />
                <span>{isAutoPlaying ? '自動循環中' : '手動模式'}</span>
              </button>

              {/* Trigger Button */}
              <button
                type="button"
                onClick={triggerSimulation}
                disabled={animState !== 'idle'}
                aria-label={animState === 'idle' ? '手動發送 API 請求' : 'API 請求正在發送中'}
                className={`text-xs px-4 py-1.5 rounded-lg font-bold border flex items-center gap-1.5 transition-colors duration-150 ${focusRing} ${
                  animState === 'idle'
                    ? 'bg-sky-500 text-slate-950 border-sky-400 hover:bg-sky-400 hover:scale-[1.03] shadow-[0_0_12px_rgba(14,165,233,0.3)]'
                    : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed opacity-70'
                }`}
              >
                {animState === 'idle' ? <Play size={12} fill="currentColor" /> : <RotateCcw size={12} className="animate-spin" />}
                <span>{animState === 'idle' ? '手動發送 API 請求' : '發送中...'}</span>
              </button>
            </div>
          </div>

          {/* SIMULATOR CONTAINER */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 md:gap-0 relative py-4">
            
            {/* FRONTEND CARD */}
            <div className={`flex-1 bg-slate-900/90 border rounded-2xl p-5 text-center flex flex-col justify-between transition-all duration-300 ${
              animState === 'success' 
                ? 'border-emerald-500/60 shadow-[0_0_25px_rgba(16,185,129,0.15)] bg-emerald-950/10' 
                : animState === 'requesting'
                ? 'border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.1)]'
                : 'border-slate-800/80 hover:border-slate-700'
            }`}>
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                  animState === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-sky-500/20 text-sky-400'
                }`}>
                  <MonitorSmartphone size={24} />
                </div>
                <h4 className="text-lg font-bold text-sky-400 mb-1">前端 (Client/店面)</h4>
                <p className="text-slate-400 text-xs mb-3">負責畫面呈現、點擊事件與使用者互動</p>
                
                {/* Tech Tags */}
                <div className="flex justify-center gap-1.5 mb-4">
                  <span className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-xs font-mono border border-slate-800/80">React 18</span>
                  <span className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-xs font-mono border border-slate-800/80">Tailwind</span>
                  <span className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-xs font-mono border border-slate-800/80">Browser</span>
                </div>
              </div>

              {/* Front Logger Console */}
              <div className="bg-slate-950 rounded-lg p-3 text-left border border-slate-900 font-mono h-20 flex flex-col justify-between overflow-hidden">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Browser Console:</span>
                <p className={`text-xs mt-1 leading-snug transition-all ${
                  animState === 'success' ? 'text-emerald-400 font-bold' : 'text-sky-300'
                }`}>
                  {activeData.feLog[animState]}
                </p>
              </div>
            </div>

            {/* PIPELINE CONNECTOR (Middle) */}
            <div className="w-full md:w-44 flex-shrink-0 flex flex-col items-center justify-center relative min-h-[100px] md:min-h-0">
              
              {/* DESKTOP PIPELINE (Horizontal) */}
              <div className="hidden md:block w-full relative h-12">
                {/* Dashed background track line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-slate-800 -translate-y-1/2 z-0"></div>
                
                {/* Request Packet moving Left -> Right */}
                <AnimatePresence>
                  {animState === 'requesting' && (
                    <motion.div
                      initial={{ left: '0%', x: '-50%', opacity: 0, scale: 0.8 }}
                      animate={{ left: '100%', x: '-50%', opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: 'easeInOut' }}
                      className="absolute top-1/2 -translate-y-1/2 z-10 px-2.5 py-1 bg-sky-500 text-slate-950 font-bold font-mono rounded-full text-xs shadow-[0_0_15px_rgba(14,165,233,0.6)] whitespace-nowrap flex items-center gap-1 border border-sky-300"
                    >
                      <span className="animate-pulse">Req:</span>
                      <span>{activeData.reqLabel}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Response Packet moving Right -> Left */}
                <AnimatePresence>
                  {animState === 'responding' && (
                    <motion.div
                      initial={{ left: '100%', x: '-50%', opacity: 0, scale: 0.8 }}
                      animate={{ left: '0%', x: '-50%', opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: 'easeInOut' }}
                      className="absolute top-1/2 -translate-y-1/2 z-10 px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold font-mono rounded-full text-xs shadow-[0_0_15px_rgba(16,185,129,0.6)] whitespace-nowrap flex items-center gap-1 border border-emerald-300"
                    >
                      <span className="animate-pulse">Resp:</span>
                      <span>{activeData.respLabel}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* MOBILE PIPELINE (Vertical) */}
              <div className="block md:hidden h-24 w-12 relative">
                {/* Dashed background track line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-slate-800 -translate-x-1/2 z-0"></div>

                {/* Request Packet moving Top -> Bottom */}
                <AnimatePresence>
                  {animState === 'requesting' && (
                    <motion.div
                      initial={{ top: '0%', y: '-50%', opacity: 0, scale: 0.8 }}
                      animate={{ top: '100%', y: '-50%', opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: 'easeInOut' }}
                      className="absolute left-1/2 -translate-x-1/2 z-10 px-2 py-0.5 bg-sky-500 text-slate-950 font-bold font-mono rounded-full text-xs shadow-[0_0_10px_rgba(14,165,233,0.6)] whitespace-nowrap flex items-center gap-0.5 border border-sky-300"
                    >
                      <span>Req</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Response Packet moving Bottom -> Top */}
                <AnimatePresence>
                  {animState === 'responding' && (
                    <motion.div
                      initial={{ top: '100%', y: '-50%', opacity: 0, scale: 0.8 }}
                      animate={{ top: '0%', y: '-50%', opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: 'easeInOut' }}
                      className="absolute left-1/2 -translate-x-1/2 z-10 px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold font-mono rounded-full text-xs shadow-[0_0_10px_rgba(16,185,129,0.6)] whitespace-nowrap flex items-center gap-0.5 border border-emerald-300"
                    >
                      <span>Resp</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Bridge Text */}
              <div className="text-center md:-mt-2 relative z-10">
                <div className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all ${
                  animState === 'requesting' 
                    ? 'bg-sky-950/90 text-sky-400 border-sky-900/50 scale-105'
                    : animState === 'responding'
                    ? 'bg-emerald-950/90 text-emerald-400 border-emerald-900/50 scale-105'
                    : animState === 'processing'
                    ? 'bg-indigo-950/90 text-indigo-400 border-indigo-900/50 animate-pulse'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}>
                  {animState === 'idle' && 'API Network'}
                  {animState === 'requesting' && '📥 傳送請求中...'}
                  {animState === 'processing' && '⚡ 伺服器運算中...'}
                  {animState === 'responding' && '📤 傳送回應中...'}
                  {animState === 'success' && '✅ 傳輸完畢'}
                </div>
              </div>
            </div>

            {/* BACKEND CARD */}
            <div className={`flex-1 bg-slate-900/90 border rounded-2xl p-5 text-center flex flex-col justify-between transition-all duration-300 ${
              animState === 'processing' 
                ? 'border-indigo-500/60 shadow-[0_0_25px_rgba(99,102,241,0.15)] bg-indigo-950/10 scale-[1.01]' 
                : 'border-slate-800/80 hover:border-slate-700'
            }`}>
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors ${
                  animState === 'processing' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-500/10 text-indigo-400'
                }`}>
                  {animState === 'processing' ? <Cpu className="w-6 h-6 animate-spin text-indigo-400" style={{ animationDuration: '4s' }} /> : <Server size={24} />}
                </div>
                <h4 className="text-lg font-bold text-indigo-400 mb-1">後端 (Server/廚房)</h4>
                <p className="text-slate-400 text-xs mb-3">負責安全防護、資料運算與檢索資料庫</p>
                
                {/* Tech Tags */}
                <div className="flex justify-center gap-1.5 mb-4">
                  <span className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-xs font-mono border border-slate-800/80">Node.js</span>
                  <span className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-xs font-mono border border-slate-800/80">Express</span>
                  <span className="px-1.5 py-0.5 bg-slate-950 text-slate-400 rounded text-xs font-mono border border-slate-800/80">Postgres</span>
                </div>
              </div>

              {/* Back Logger Console */}
              <div className="bg-slate-950 rounded-lg p-3 text-left border border-slate-900 font-mono h-20 flex flex-col justify-between overflow-hidden">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Server Log:</span>
                <p className={`text-xs mt-1 leading-snug transition-all ${
                  animState === 'processing' ? 'text-indigo-400 font-bold' : 'text-slate-400'
                }`}>
                  {activeData.beLog[animState]}
                </p>
              </div>
            </div>

          </div>

          {/* Active Data Packet Details */}
          <div className="mt-3 bg-slate-900/40 rounded-xl p-3 border border-slate-800/60 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-xs font-mono">Payload 預覽</span>
              <span className="text-slate-400">目前示範的情境：<strong className="text-sky-400 font-bold">{activeData.title}</strong></span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs font-mono">
              <div className="text-sky-300 bg-sky-950/20 px-2 py-1 rounded border border-sky-900/30">
                <span className="text-slate-500 font-sans font-semibold">📋 Request (點單紙):</span> <code className="ml-1">{activeData.reqDetail}</code>
              </div>
              <div className="text-emerald-400 bg-emerald-950/20 px-2 py-1 rounded border border-emerald-900/30">
                <span className="text-slate-500 font-sans font-semibold">🍜 Response (出菜):</span> <code className="ml-1">{activeData.respDetail}</code>
              </div>
            </div>
          </div>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
