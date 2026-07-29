import { ClipboardCheck, FileCheck2, Terminal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideNoCodeBridge() {
  return (
    <SlideLayout
      title="不寫程式，也能守住品質"
      subtitle="Linting & Type Checking for Non-Developers"
      icon={ClipboardCheck}
    >
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            前面說「要有客觀的完成標準，迴圈才知道自己做完了沒」。問題是，
            <strong className="text-slate-100">你不會看程式碼，那個標準要從哪裡來？</strong>
            答案是：不用你來看。有兩個工具會自動幫你把關，跑完會給你綠燈或紅字，AI 也看得到同一份結果，紅字就自己回頭修。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <ClipboardCheck size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">Linting</h4>
                <span className="text-xs text-amber-400">像文件的排版校對員</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              幫你挑出錯別字、贅字、段落沒對齊，不管你寫的內容對不對，先把格式整乾淨。
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              對應到程式：抓出宣告了卻沒用到的變數、漏掉的括號、排版凌亂。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <FileCheck2 size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">Type Checking</h4>
                <span className="text-xs text-indigo-400">像合約的條款審查員</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              合約開頭寫明「甲方是自然人」，後面卻把金額填進甲方欄位，審查員立刻退件。
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              對應到程式：手機號碼被定義成文字，AI 卻拿去做乘法，當場攔下來。
            </p>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
          <h4 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            那我的專案要怎麼跑這兩道關卡？
          </h4>
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            用 Vite、Next.js 這類工具建立的專案，多半已經內建了，只是沒人叫它跑。你要做的是這三件事：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">STEP 1　交代它裝好</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">在對話框跟它說：</p>
              <p className="text-sm text-sky-300 leading-relaxed">
                「請幫這個專案設定好 ESLint 與 TypeScript 型別檢查，並在 package.json 加一個 lint 指令。」
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">設定一次就好，之後不用再管。</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">STEP 2　自己驗一次</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">在終端機輸入：</p>
              <code className="text-sm text-emerald-300 font-mono bg-slate-900 px-2 py-1 rounded inline-block">npm run lint</code>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                沒有紅字就是綠燈。有紅字就整段複製，貼回對話框請它修。
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">STEP 3　讓它每次都跑</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">在 CLAUDE.md 裡加一行：</p>
              <p className="text-sm text-sky-300 leading-relaxed">
                「每次改完程式，都要跑一次 npm run lint，紅字沒清掉不算做完。」
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">這句話就是你給迴圈的完成標準。</p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-slate-200">為什麼這對你重要：</strong>
            這兩道關卡是自動跑的，不必你懂程式。它們就是迴圈能自己往下跑的最低標準：紅字沒清掉，就不算做完。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
