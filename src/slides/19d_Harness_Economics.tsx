import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { DollarSign, TrendingDown, TrendingUp, AlertCircle, Factory } from 'lucide-react';

export default function SlideHarnessEconomics() {
  return (
    <SlideLayout title="兩種花錢的方式：邊做邊花，還是先花再省" subtitle="Token Economics: Capex vs Opex" icon={DollarSign}>
      {/*
        token 的定義本來在 Slide 48 的頁尾，2026-09-21 從那裡移除（那一頁的職務是
        「這一段要解掉什麼」，不是解釋名詞），改放在這裡，也就是整個單元的第一頁。
        **不要再把它搬回去。** 移走之後這一頁的開場一度變成「先把計價講完整」，
        接不到任何東西，學員手上沒有這個詞的定義就讀不下去。
      */}
      <div className="pt-8 max-w-6xl mx-auto h-full flex flex-col">
        {/*
          前一頁收在「送進去的東西是要付錢的」，這一頁原本直接開兩張卡，
          那筆錢是怎麼算的沒有人接。先用一句把帳單接起來再展開。
        */}
        <p className="text-slate-300 text-lg leading-relaxed mb-3">
          計價的單位叫 <strong className="text-slate-100">token</strong>，你可以粗略當成「字」，
          中文一個字大約一到兩個 token。
          <strong className="text-slate-100">你送進去的字與它吐回來的字，兩邊都計價</strong>，
          它讀你專案讀進去的也算。
        </p>
        <p className="text-slate-400 text-base leading-relaxed mb-6">
          所以這不是按時間算的。開著視窗發呆一小時不會花錢，它讀完你三十個檔案才會。
          同樣一件事，花費會落在下面兩種形狀的其中一種。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-amber-950/30 rounded-xl text-amber-400 border border-amber-900/50">
                <TrendingDown size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Vibe Coding</h3>
                <p className="text-amber-400/80 text-base font-medium">邊做邊花（類似營運成本 Opex）</p>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              一開始不用準備什麼，隨時能開工。但有三筆帳<strong className="text-amber-400 font-bold">當下不痛，會拖到後面才一次還</strong>：
            </p>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">額度燒得快：</strong>沒有規矩也沒有檢查，它做錯了你要一輪一輪叫它重做，每一輪都在花錢。</span>
              </li>
              <li className="flex items-start gap-4">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">之後改不動：</strong>半年後回來看，是一堆沒有結構、連你自己都看不懂的程式碼。</span>
              </li>
              <li className="flex items-start gap-4">
                <AlertCircle size={20} className="text-amber-500 shrink-0 mt-1" />
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">安全性要重補：</strong>金鑰寫死在程式裡、誰都讀得到的資料，這些前期沒管，後期要拆開重來。</span>
              </li>
            </ul>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-sky-900/50 rounded-2xl p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-sky-950/30 rounded-xl text-sky-400 border border-sky-900/50">
                <TrendingUp size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-100">Agentic Engineering</h3>
                <p className="text-sky-400/80 text-base font-medium">先花再省（類似資本支出 Capex）</p>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              一開始要先花時間：想清楚東西怎麼組起來、寫下規矩、加上會自己跑的檢查。這一段是純付出，還看不到成果。
            </p>
            
            <div className="bg-sky-950/20 p-6 rounded-xl border border-sky-900/40 flex items-start gap-5">
              <Factory size={28} className="text-sky-400 shrink-0 mt-1" />
              <p className="text-sky-100 text-base leading-relaxed">
                但架好之後，每次生成新功能的成本會降下來。因為架構、測試與規則都在，<strong className="text-sky-300 font-bold">它比較常一次就寫對，來回修改的次數變少</strong>。
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </SlideLayout>
  );
}
