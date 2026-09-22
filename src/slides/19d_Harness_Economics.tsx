import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { DollarSign, TrendingDown, TrendingUp, AlertCircle, Factory } from 'lucide-react';

/*
 * 最後查證：2026-09-22，對照 platform.claude.com/docs/en/about-claude/models/overview 的價目表。
 * 當時的現況：輸出的每 token 單價一律是輸入的 5 倍，整條產品線都一致
 * （Opus $5／$25、Sonnet $3／$15、Haiku $1／$5，單位都是每百萬 token）。
 * 所以寫倍率不寫絕對金額，換代也不容易過期。
 * **只查了 Anthropic 一家，所以句子裡要留著「Claude 的」那三個字。** 別家不是五倍，
 * 寫成「各家的牌價」就超出查證範圍了，而這門課在前一頁才點名過 Codex 與 Gemini。
 * 下次改版前先重查那張表，倍率變了才動這一句，不要憑印象改。
 */
export default function SlideHarnessEconomics() {
  return (
    <SlideLayout title="Harness 對成本的影響" subtitle="Token Economics: Capex vs Opex" icon={DollarSign}>
      {/*
        token 的定義本來在 Slide 48 的頁尾，2026-09-21 從那裡移除（那一頁的職務是
        「這一段要解掉什麼」，不是解釋名詞），改放在這裡，也就是整個單元的第一頁。
        **不要再把它搬回去。** 移走之後這一頁的開場一度變成「先把計價講完整」，
        接不到任何東西，學員手上沒有這個詞的定義就讀不下去。
      */}
      <div className="pt-4 max-w-6xl mx-auto min-h-full flex flex-col">
        {/*
          前一頁是六個零件，這一頁接著問那些零件怎麼影響你的帳單。
          2026-09-21 從原本的「Token 計費與付費模式」單元搬到這裡：零件講完就接成本，
          不要把整段計價插在 Harness 開頭。付費模式與外包比較那兩頁是採購決策，
          跟運作框架沒有關係，2026-09-22 連同「怎麼少花一點」整組移除了。
          所以 token 的定義只剩這一頁在講，不要再假設後面還有一段會補。
        */}
        {/*
          2026-09-22 補上開場那半句。原本一上來就定義 token，標題卻是「Harness 對成本的影響」，
          兩邊接不起來：讀者不知道為什麼講框架的段落要先教計價單位。
          補的那句給的是因果（框架決定讀多少、來回幾次，那就是帳單），token 才變成它的單位。
        */}
        <p className="text-slate-300 text-lg leading-relaxed mb-3">
          <strong className="text-slate-100">運作框架怎麼架，決定它每次要讀多少東西、來回改幾次</strong>，
          讀得多、改得多，花的就多。計價的單位叫 token，你可以粗略當成「字」，中文一個字大約一到兩個 token；
          你送進去的字與它吐回來的字兩邊都計價，它讀你專案讀進去的也算。
        </p>
        <p className="text-slate-400 text-base leading-relaxed mb-4">
          兩邊的單價不一樣，<strong className="text-slate-200">Claude 的輸出是輸入的五倍</strong>；
          但量體相反，讀專案讀進去的那一批通常最大，所以兩邊都要顧。
          它也不是按使用時間算錢，是按它讀進去與寫出來的量算。
          下面兩欄，是做出同一個東西的兩種花法。
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
                <span className="text-slate-400 text-base leading-relaxed"><strong className="text-slate-200">額度燒得快：</strong>沒有規則也沒有檢查，它做錯了你要一輪一輪叫它重做，每一輪都在花錢。</span>
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
              一開始要先花時間：想清楚東西怎麼組起來、寫下規則、加上會自己跑的檢查。這一段是純付出，還看不到成果。
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
