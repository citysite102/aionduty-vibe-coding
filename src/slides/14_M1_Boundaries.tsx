import { Compass, ShieldAlert, Cpu } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideBoundaries() {
  return (
    <SlideLayout title="哪些事它做得好，哪些你得自己來" subtitle="Capabilities & Boundaries" icon={Compass}>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto h-full pt-8">
        
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-colors shadow-lg">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-colors"></div>
          
          <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-3 mb-6">
            <Cpu size={24} />
            這是它的強項 (可以做)
          </h3>
          
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <div>
                <strong className="text-slate-100 block mb-1">小工具與腳本生成</strong>
                <p className="text-slate-400 text-sm">計時器、轉換器、爬蟲、批次改檔名等清晰明確的單一任務。</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <div>
                <strong className="text-slate-100 block mb-1">針對特定報錯進行除錯</strong>
                <p className="text-slate-400 text-sm">提供一段紅色的報錯訊息，讓它自動去爬整個資料夾尋找原因。</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-500 font-bold mt-0.5">✓</span>
              <div>
                <strong className="text-slate-100 block mb-1">架構探索與知識提取</strong>
                <p className="text-slate-400 text-sm">請它閱讀別人的專案，並向你解釋這個程式庫是怎麼跑起來的。</p>
              </div>
            </li>
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden group hover:border-red-500/30 transition-colors shadow-lg">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-colors"></div>
          
          <h3 className="text-2xl font-bold text-red-400 flex items-center gap-3 mb-6">
            <ShieldAlert size={24} />
            它目前還做不到 (無法做)
          </h3>
          
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <div>
                <strong className="text-slate-100 block mb-1">「幫我做一個 Facebook」</strong>
                <p className="text-slate-400 text-sm">一句話建構超級龐大的系統架構與產品方向。缺乏邊界，它很快會迷失在程式碼裡。</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <div>
                <strong className="text-slate-100 block mb-1">預設不會操作瀏覽器介面與外部授權</strong>
                <p className="text-slate-400 text-sm">預設情境下它專注於「終端機與檔案系統」，不會主動幫你在畫面上點按鈕或登入 Google 帳號（要操作瀏覽器需額外掛上 Chrome 擴充或 computer use 等工具）。</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-red-500 font-bold mt-0.5">✕</span>
              <div>
                <strong className="text-slate-100 block mb-1">猜測你隱晦的品味</strong>
                <p className="text-slate-400 text-sm">如果你的設計要求是「再大器一點」，它很可能會把所有字體放大兩倍。需要給它明確的指示 (例如: 套用 Tailwind 的黑白極簡風格)。</p>
              </div>
            </li>
          </ul>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
