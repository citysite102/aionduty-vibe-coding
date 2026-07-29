import { ShieldAlert, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideLoopCaveats() {
  return (
    <SlideLayout 
      title="自動化 Loop 的局限與風險" 
      subtitle="What Goes Wrong, and How to Stop It"
      icon={ShieldAlert}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mt-2 items-stretch text-left pb-6">
        
        {/* Left Side: Three Major Caveats */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none" />

            <div>
              <h3 className="text-sm font-bold text-red-400 mb-5 flex items-center gap-2">
                <AlertTriangle size={18} />
                放手之後，最常出事的三件事
              </h3>
              
              <ul className="space-y-5 text-sm text-slate-300 leading-relaxed font-medium">
                <li className="flex gap-3 items-start">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-slate-100 block text-sm">1. 它一直重試，帳單也一直長</strong>
                    迴圈遇到異常會一直重試。沒有人在旁邊看的話，帳單可能在幾小時內累積到你不想看的數字。
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-slate-100 block text-sm">2. 驗收這件事，還是你的責任</strong>
                    自動化會把一個錯誤複製成一百個。「編譯有過」不等於「做對了」。
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <span className="text-red-500 font-bold shrink-0 mt-0.5">⚠️</span>
                  <div>
                    <strong className="text-slate-100 block text-sm">3. 你會慢慢看不懂自己的專案</strong>
                    AI 改了一百個檔案，你一個都沒看。幾天後，這個專案你已經不熟了（前面說的理解債）。
                  </div>
                </li>
              </ul>
            </div>

            {/* Addy Osmani Quote */}
            <div className="mt-8 pt-5 border-t border-slate-800 relative">
              <div className="text-slate-400 italic text-[11px] leading-relaxed">
                「我們當然應該開始去建立自動化的 Loop 迴圈，但必須是以<strong>『依然打算繼續當一名工程師與思考者』</strong>的姿態去建，而不是只當那個按下啟動按鈕的人。」
              </div>
              <div className="text-right text-[11px] text-slate-500 font-bold mt-2.5">
                — Addy Osmani (Google Chrome 傑出工程師)
              </div>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Side: Defensive Systems (Circuit Breakers) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatedBlock stepIndex={2} className="bg-gradient-to-b from-slate-900 to-emerald-950/20 border border-slate-800 rounded-3xl p-6 shadow-xl h-full flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-emerald-400 mb-5 flex items-center gap-2">
                <ShieldCheck size={18} />
                放手之前，先裝好這三道煞車
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                都是設定一次就會一直生效的東西：
              </p>

              <div className="space-y-4 text-[11px] text-slate-300">
                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">❶ 限制它最多重試幾次</span>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    設 5 到 10 次，超過就停下來通知你，不要讓它無限重來。
                  </p>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">❷ 設定花費上限</span>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    沒有「花多少就停」的內建開關。用 API Console 設用量上限，或自己寫腳本盯著。
                  </p>
                </div>

                <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">❸ 先拿一小部分資料試跑</span>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    先跑 1% 的資料，確認產出長得對，再全面放行。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-500 italic flex items-center gap-1">
              <Heart size={10} className="text-emerald-500 shrink-0" />
              <span>跑得快之前，先確定煞車是好的。</span>
            </div>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
