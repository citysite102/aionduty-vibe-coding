import { ClipboardCheck, FileCheck2, Terminal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';

/**
 * ⚠️ 待查證。這一頁指名安裝 webapp-testing 這個 Skill，但畫面上沒有寫它從哪裡來。
 * 學員裝不起來的時候，來源是唯一的線索。
 *
 * 本輪（2026-09-20）沒有重查。下次改版前要確認：
 *   - webapp-testing 是官方市集、社群市集，還是要自己寫
 *   - 確認後把來源補到畫面上（比照 Slide 58 寫 anthropics/claude-plugins-official 的格式）
 * 查完把這段註解換成 C-1 的三行格式。
 */

/**
 * 2026-10-04 重排。原本的順序是：開場 → Linting → Type Checking → 三步實作 → 收尾，
 * 標題也是「三種把關：Lint、型別、開瀏覽器點一次」。
 *
 * 問題是**前兩種學員現在用不到**（他的計時器是一個 index.html，兩個工具都跑不起來，
 * 這一頁自己就寫著這句），卻佔了三分之二的篇幅跟標題的前兩個位置。
 * 不寫程式的學員讀到一半的結論會是「這一頁跟我沒關係」，然後跳過他唯一要裝的那個 Skill。
 *
 * 現在的順序是：他要做的那一種先講完（三步），再補一句定位、把 Lint 與型別降成「先讓你認得」。
 * 內容一條都沒刪。**不要再把那兩張卡搬回前面。**
 */
const SKILL_PROMPT =
  '幫我安裝 webapp-testing 這個 Skill，裝完重開一次對話，然後告訴我怎麼叫它。';

const STEPS = [
  {
    label: 'STEP 1　裝一個會點畫面的 Skill',
    lead: '在對話框跟它說：',
    body: `「${SKILL_PROMPT}」`,
    copy: SKILL_PROMPT,
    note: '裝一次就好。它會自己開瀏覽器點你的網頁。',
  },
  {
    label: 'STEP 2　先講清楚什麼叫做完',
    lead: '寫成看得出有沒有的事實：',
    body: '「三顆按鈕都點得到、點下去大字會變、瀏覽器 Console 沒有紅字。」',
    note: '不要寫「要能正常使用」，那種它驗不動。',
  },
  {
    label: 'STEP 3　讓它每次都驗',
    lead: '在 CLAUDE.md 裡加一行：',
    body: '「每次改完，用 webapp-testing 把上面那幾題點過一次，沒全過不算做完。」',
    note: '這句話就是你給迴圈的完成標準。',
  },
];

export default function SlideNoCodeBridge() {
  return (
    <SlideLayout
      title="讓它自己驗：開瀏覽器點一次"
      subtitle="Automated Checks for Non-Developers"
      icon={ClipboardCheck}
    >
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-5">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            <strong className="text-slate-100">完成標準不必你自己驗。</strong>
            有東西會替你跑，跑完是綠燈或紅字；AI 看得到同一份結果，紅字就自己回頭修。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            你的計時器是一個 <code className="font-mono text-slate-300">index.html</code>，
            它能不能用，看的是「打開之後點下去有沒有反應」。這件事交給它自己驗，三步。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h4 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Terminal size={18} className="text-sky-400" />
            叫它自己開瀏覽器點一次
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STEPS.map((s) => (
              <div key={s.label} className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                <div className="text-xs font-mono text-sky-400 font-bold mb-2">{s.label}</div>
                <p className="text-sm text-slate-300 leading-relaxed mb-2">{s.lead}</p>
                <p className="text-sm text-sky-300 leading-relaxed">{s.body}</p>
                {s.copy && <CopyAction text={s.copy} className="mt-2" />}
                <p className="text-xs text-slate-500 leading-relaxed mt-2">{s.note}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        {/*
          另外兩種降到這裡。學員現在跑不起來，但那兩個詞在網路上到處都是，
          而且專案一長大就會遇到，所以留著當「認得就好」的一塊。
        */}
        <AnimatedBlock stepIndex={3} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            還有兩種把關是<strong className="text-slate-100">讀程式碼</strong>挑錯的。
            你的計時器沒有它們跑得起來的結構，現在用不到，但那兩個詞到處都是，先讓你認得。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
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

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
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

        <AnimatedBlock stepIndex={6} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            專案長大到用 Vite、Next.js 這類工具建起來之後，這兩道就跑得起來了。
            跟它說「幫我設定好 lint 並加進完成標準」它會處理，你一樣不用看程式碼。
            <span className="block mt-2 text-slate-300">
              三種都一樣：紅字沒清掉，就不算做完。
            </span>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
