import { ClipboardCheck, FileCheck2, Terminal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';

/**
 * ⚠️ 待查證。這一頁指名安裝 webapp-testing 這個 Skill，但畫面上沒有寫它從哪裡來。
 * 學員裝不起來的時候，來源是唯一的線索。
 *
 * 本輪（2026-09-20）沒有重查。下次改版前要確認：
 *   - webapp-testing 是官方市集、社群市集，還是要自己寫
 *   - 確認後把來源補到畫面上（比照 Slide 57 寫 anthropics/claude-plugins-official 的格式）
 * 查完把這段註解換成 C-1 的三行格式。
 */

const SKILL_PROMPT =
  '幫我安裝 webapp-testing 這個 Skill，裝完重開一次對話，然後告訴我怎麼叫它。';

export default function SlideNoCodeBridge() {
  return (
    <SlideLayout
      title="三種把關：Lint、型別、開瀏覽器點一次"
      subtitle="Automated Checks for Non-Developers"
      icon={ClipboardCheck}
    >
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            <strong className="text-slate-100">完成標準不必你自己驗。</strong>
            Lint、型別檢查與瀏覽器實測會替你跑，跑完是綠燈或紅字；AI 看得到同一份結果，紅字就自己回頭修。
            <span className="block mt-2 text-slate-400">
              把關分兩種：<strong className="text-slate-300">讀程式碼挑錯</strong>（下面兩個），或<strong className="text-slate-300">實際打開畫面點一次</strong>。
              你的計時器沒有前兩種跑得起來的結構，所以要動手做的是第三種。
            </span>
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
              <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl">
                <FileCheck2 size={20} />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-100">Type Checking</h4>
                <span className="text-xs text-sky-400">像合約的條款審查員</span>
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
            那我的專案要怎麼跑前面那兩道自動關卡？
          </h4>
          {/*
            這三步原本是 ESLint + npm run lint。問題有兩個：
            主線學員沒有 npm（Node.js 在選修的終端機那一段才裝），而且他的計時器是
            單一個 index.html，沒有 package.json，lint 根本跑不起來。
            28a_M4_LoopPractice 的檔案註解自己就寫著那會變成一個假例子。
            改成他手上那個 index.html 真的驗得動的：叫它自己開瀏覽器點一次。
          */}
          <p className="text-sm text-slate-400 leading-relaxed mb-5">
            你的計時器是一個 <code className="font-mono text-slate-300">index.html</code>，
            它能不能用，看的是「打開之後點下去有沒有反應」。這件事也可以交給它自己驗：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">STEP 1　裝一個會點畫面的 Skill</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">在對話框跟它說：</p>
              <p className="text-sm text-sky-300 leading-relaxed">「{SKILL_PROMPT}」</p>
              <CopyAction text={SKILL_PROMPT} className="mt-2" />
              <p className="text-xs text-slate-500 leading-relaxed mt-2">裝一次就好。它會自己開瀏覽器點你的網頁。</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">STEP 2　先講清楚什麼叫做完</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">寫成看得出有沒有的事實：</p>
              <p className="text-sm text-sky-300 leading-relaxed">
                「三顆按鈕都點得到、點下去大字會變、瀏覽器 Console 沒有紅字。」
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">
                不要寫「操作要順暢」，那種它驗不動。
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
              <div className="text-xs font-mono text-sky-400 font-bold mb-2">STEP 3　讓它每次都驗</div>
              <p className="text-sm text-slate-300 leading-relaxed mb-2">在 CLAUDE.md 裡加一行：</p>
              <p className="text-sm text-sky-300 leading-relaxed">
                「每次改完，用 webapp-testing 把上面那幾題點過一次，沒全過不算做完。」
              </p>
              <p className="text-xs text-slate-500 leading-relaxed mt-2">這句話就是你給迴圈的完成標準。</p>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mt-4 border-t border-slate-800 pt-3">
            專案長大到用 Vite、Next.js 這類工具建起來之後，還會多一種自動關卡叫 lint，
            那是靠讀程式碼挑錯，跟這裡點畫面的驗法互補。跟它說「幫我設定好 lint 並加進完成標準」它會處理，你一樣不用看程式碼。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            
            Lint 與型別這兩道是自動跑的，不必你懂程式。它們就是迴圈能自己往下跑的最低標準：紅字沒清掉，就不算做完。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
