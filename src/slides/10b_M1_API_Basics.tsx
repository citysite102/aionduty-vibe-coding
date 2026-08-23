import { Database, FileJson, Globe, KeyRound, Receipt, Utensils } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';
import { Callout } from '../components/Callout';

export default function Slide10b() {
  return (
    <SlideLayout title="兩個程式要講話，得先講好格式" subtitle="API & JSON Fundamentals" icon={Database}>
      <LiveDemo kind="browser" note="打開真實 API 看回應" />
      <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full pb-8">
        
        {/* TOP METAPHOR BANNER */}
        <AnimatedBlock stepIndex={1} className="w-full">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-left">
            <h3 className="text-base font-bold text-sky-400 mb-2 flex items-center gap-2">
              <Utensils size={18} />
              <span>API 與 JSON 就是「餐廳的點單系統」</span>
            </h3>
            <p className="text-base text-slate-300 leading-relaxed">
              用餐廳吃飯的情境想像：你填「點單紙」（Request）送進廚房，廚房做好後端出「餐點＋明細單」（Response）。
            </p>
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Column 1: API Concept */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden h-full text-left flex flex-col justify-between">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <h3 className="text-xl font-bold text-sky-400 mb-3 flex items-center gap-2">
                <Globe size={22} className="text-sky-400" />
                什麼是 API？（服務生）
              </h3>
              <p className="text-slate-300 leading-relaxed text-base mb-4">
                API (應用程式介面) 就像是<strong>餐廳的服務生</strong>。
                你（在瀏覽器這邊）向服務生點餐（發送 Request），服務生去廚房（另一台電腦）傳遞指令，最後端著香噴噴的菜餚與帳單（Response 格式資料）回到你面前。
              </p>
              
              {/* Visual Request-Response Flow Diagram */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 mt-4">
                <div className="text-sm text-slate-500 font-mono flex justify-between items-center">
                  <span>Client (你/桌位)</span>
                  <span className="text-sky-400 flex items-center gap-1">Request (點單紙) <span>➔</span></span>
                  <span>Server (後端/廚房)</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-sky-500 to-sky-300" />
                </div>
                <div className="text-sm text-slate-500 font-mono flex justify-between items-center">
                  <span>獲得餐點、結帳單</span>
                  <span className="text-emerald-400">Response (200 OK) ➔</span>
                  <span>回傳 JSON 格式</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mt-5">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono mb-1">真實 API 連線網址 (點單地址)</div>
              <code className="text-sm text-sky-300 font-mono break-all">
                https://data.moenv.gov.tw/api/v2/aqx_p_432?api_key=your_key
              </code>
            </div>

            {/*
              同一行網址上有兩個要解釋的東西：開頭的 https 與結尾的 your_key。
              金鑰那條在頁尾的 Callout，這條在這裡，理由跟金鑰那條一樣：
              規則放在畫面上第一次看到它的地方。全片 https 第一次出現就是上面那行。

              後面「一次請求的完整流程：前端、後端與資料庫」那頁會講「解析來自前端的 HTTP 請求」，
              少了這一段，那句話裡的 HTTP 就是一個沒有定義過的詞。

              灰階，不吃強調色的額度：這一頁的 sky 與 emerald 已經被點單與出菜那組對照用掉了。
            */}
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mt-3">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono mb-1">開頭那個 https 是什麼</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                <code className="font-mono text-slate-300">http</code> 是兩台電腦講話的那套規矩：點單紙要寫哪些欄位、怎麼送過去、怎麼回話。
                <code className="font-mono text-slate-300">https</code> 是同一套規矩，多包了一層加密。
                走 http，中間經過的機器看得到你送了什麼；走 https，它們只看得到一堆亂碼。
                <strong className="text-slate-300">帶金鑰的請求一律走 https</strong>，網址列那個鎖頭講的就是這件事。
              </p>
            </div>
          </AnimatedBlock>

          {/* Column 2: JSON Concept */}
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden h-full text-left flex flex-col justify-between">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <FileJson size={22} />
                認識 JSON 格式（點單明細）
              </h3>
              <p className="text-slate-300 leading-relaxed text-base mb-4">
                JSON 是一種<strong>「格式規格標準化的點單明細」</strong>。
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Request Side JSON */}
                <div className="space-y-1.5">
                  <div className="text-xs text-sky-400 font-bold flex items-center gap-1 font-mono">
                    <Receipt size={13} /> <span>Request JSON (送出點單)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-sky-950/40 text-sm font-mono leading-relaxed text-sky-300">
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
                  <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 font-mono">
                    <Receipt size={13} /> <span>Response JSON (確認出菜)</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-emerald-950/40 text-sm font-mono leading-relaxed text-emerald-300">
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

            <div className="mt-5 text-sm text-slate-400 leading-relaxed">
              💡 <strong>大白話：</strong> <code>"欄位鍵" : "欄位值"</code> 只是把事情列得清清楚楚，這樣電腦就不用去猜人類模糊的對話了。
            </div>
          </AnimatedBlock>

        </div>

        {/*
          金鑰安全原本要到「放手之前，先設好四道邊界」那一頁才講，但畫面上第一次出現金鑰是這裡
          （上面那行 api_key=your_key），而學員回去自己申請 API 是這一頁之後就會發生的事。
          所以規則放在第一次看到它的地方。完整的擋法（.env、settings.json 的 deny）留在那一頁，
          這裡只講三十秒講得完的部分。

          用 muted 不用 warn，是因為這一頁已經有 sky 與 emerald 兩個強調色（點單與出菜是一組對照），
          再上一個 amber 就變三種了。A-1 的上限是兩種。
        */}
        <Callout tone="muted" label="網址裡的 your_key 是你的密碼" icon={KeyRound} stepIndex={4}>
          多數 API 要先申請一組金鑰，那串字等於帳號密碼，別人拿到就能用你的額度、動你的資料。
          <span className="mt-2 block text-slate-400">
            所以三件事：不要貼進聊天室或公開的頁面；不要跟著程式碼一起推上 GitHub；
            真的貼出去過就當它已經外洩，回後台重新產一組，舊的作廢。
          </span>
        </Callout>
      </div>
    </SlideLayout>
  );
}
