import { Database, FileJson, Globe, Receipt, Utensils } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

export default function Slide10b() {
  return (
    <SlideLayout title="兩個程式要講話，得先講好格式" subtitle="API & JSON Fundamentals" icon={Database}>
      <LiveDemo kind="browser" note="打開真實 API 看回應" />
      <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-8">
        
        {/* TOP METAPHOR BANNER */}
        <AnimatedBlock stepIndex={1} className="w-full">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-left">
            <h3 className="text-sm font-bold text-sky-400 mb-2 flex items-center gap-2">
              <Utensils size={16} />
              <span>API 與 JSON 就是「餐廳的點單系統」</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              遇到複雜的 <code>{"{ }"}</code> 大括號和引號別怕！用餐廳吃飯的情境想像：你填「點單紙」（Request）送進廚房，廚房做好後端出「餐點＋明細單」（Response）。下面兩張卡會拆解這一來一回。
            </p>
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Column 1: API Concept */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden h-full text-left flex flex-col justify-between">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <h3 className="text-lg font-bold text-sky-400 mb-3 flex items-center gap-2">
                <Globe size={20} className="text-sky-400" />
                什麼是 API？（服務生）
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs md:text-sm mb-4">
                API (應用程式介面) 就像是<strong>餐廳的服務生</strong>。
                你（瀏覽器前端）向服務生點餐（發送 Request），服務生去廚房（後端伺服器）傳遞指令，最後端著香噴噴的菜餚與帳單（Response 格式資料）回到你面前。
              </p>
              
              {/* Visual Request-Response Flow Diagram */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 mt-4">
                <div className="text-xs text-slate-500 font-mono flex justify-between items-center">
                  <span>Client (你/桌位)</span>
                  <span className="text-sky-400 flex items-center gap-1">Request (點單紙) <span>➔</span></span>
                  <span>Server (後端/廚房)</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-sky-500 to-sky-300" />
                </div>
                <div className="text-xs text-slate-500 font-mono flex justify-between items-center">
                  <span>獲得餐點、結帳單</span>
                  <span className="text-emerald-400">Response (200 OK) ➔</span>
                  <span>回傳 JSON 格式</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mt-5">
              <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider font-mono mb-1">真實 API 連線網址 (點單地址)</div>
              <code className="text-sky-300 text-xs font-mono break-all">
                https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=your_key
              </code>
            </div>
          </AnimatedBlock>

          {/* Column 2: JSON Concept */}
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden h-full text-left flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <FileJson size={20} />
                認識 JSON 格式（點單明細）
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs md:text-sm mb-4">
                JSON 是一種<strong>「格式規格標準化的點單明細」</strong>。
                為了不讓大腦發熱，我們可以直接看下方牛肉麵點單的真實程式碼翻譯：
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Request Side JSON */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-sky-400 font-bold flex items-center gap-1 font-mono">
                    <Receipt size={11} /> <span>Request JSON (送出點單)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-sky-950/40 text-[11px] font-mono leading-relaxed text-sky-300">
                    <pre>{`{
  "item": "牛肉麵",
  "size": "大碗",
  "no_scallions": true,
  "table_number": 12
}`}</pre>
                  </div>
                </div>

                {/* Response Side JSON */}
                <div className="space-y-1.5">
                  <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 font-mono">
                    <Receipt size={11} /> <span>Response JSON (確認出菜)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-emerald-950/40 text-[11px] font-mono leading-relaxed text-emerald-300">
                    <pre>{`{
  "status": "已出菜",
  "chef_id": "AI_Agent",
  "price": 220,
  "ready_time": "01:05"
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>大白話：</strong> 其實不難對吧！<code>"欄位鍵" : "欄位值"</code> 只是把事情列得清清楚楚，這樣電腦就不用去猜人類模糊的對話了。
            </div>
          </AnimatedBlock>
          
        </div>
      </div>
    </SlideLayout>
  );
}
