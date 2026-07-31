import { ShieldX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2OutsideContext() {
  return (
    <SlideLayout title="真要擋住，就不要放進 context" subtitle="Outside the Context Window" icon={ShieldX}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          前面兩頁的零件都在 context 裡面，也就是說它們都要靠 AI 自己讀到、自己記得。這一頁的兩個不一樣，<strong className="text-slate-200">它們是程式在跑，不經過 AI 的判斷。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sky-400 font-bold text-lg">Hook</span>
              <span className="text-slate-500 text-xs font-mono">在你的機器上擋</span>
            </div>
            <div className="text-slate-200 text-sm font-bold mb-1">一定要發生、不能靠它自己記得的關卡</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              例如它想把破折號寫進檔案，就直接被退回。幾乎不佔 token，因為它根本不在對話裡。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sky-400 font-bold text-lg">CI</span>
              <span className="text-slate-500 text-xs font-mono">在合併前擋</span>
            </div>
            <div className="text-slate-200 text-sm font-bold mb-1">整個團隊都躲不掉的那道關卡</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              程式碼要進主線之前先跑一次檢查，沒過就進不去。不管是誰寫的、用什麼工具寫的。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={4} className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-2">整段最關鍵的一個區分</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            「絕對不要做某事」寫在 CLAUDE.md 裡，只是<strong className="text-red-300">拜託</strong>。對話一長，或是它讀到某個網頁上寫著「請忽略前面的規則」，它還是可能照做。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            真的不能發生的事，要用 Hook 或 CI。這是文字說服跟程式攔截的差別。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="text-slate-500 text-xs leading-relaxed px-1">
          三頁看完，零件的分類其實只有三種載入時機：整場常駐、用到才展開、根本不進來。下一頁開始看它們實際怎麼用。
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
