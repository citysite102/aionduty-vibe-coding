import { ClipboardList, HelpCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-10-04 整頁重寫（講師）。原本這一頁印的是報價系統需求說明的「答案」
 * （使用者／核心工作／必填資訊三格＋不做四格），學員讀完知道那個題目長什麼樣，
 * 但學不到怎麼生出自己那一份。三個具體的毛病：
 *
 *   一、那三格沒有名字。「核心工作」「一條主要動線」是這份簡報自己造的詞，
 *      學員回去複製不了。改用 **User Story**，它是外面真的在用、查得到、學得起來的東西。
 *      同一輪稍晚講師再修一次：**不是只寫一句**。先定出有哪些角色，再由每個角色展開他要完成的事，
 *      一件一句。那幾句加起來就是這一輪的功能範圍，所以 `SCOPE` 第一格直接指回上面那幾句，
 *      不要再另外列一份功能清單。**改 `STORIES` 就要回頭看 `SCOPE` 與 26e 第一步的 Prompt。**
 *   二、章節三教過前端、後端、API 與資料庫，章節七一個都沒回收。現在第二塊那三題
 *      就是在回收它們：從一句 User Story 判斷這個題目要幾層。
 *   三、動畫、深色模式那一類「要不要做」的問題原本沒有位置，現在歸在範圍那一塊。
 *
 * **第一題的答案停在「需要一個地方存起來」，不要往下講存在哪裡。**
 * `10d0_M1_DatabaseWhat.tsx` 的檔頭記著同一條：寫死在程式碼／瀏覽器／資料庫這三個層次
 * 是 Slide 158〈手機打開，紀錄卻是空的〉要讓學員自己撞到的，章節七排在它前面，講了那一頁就廢掉。
 *
 * 下一頁（26c2）的五層與那張逐句對的表，輸入就是這一頁的 User Story 與功能範圍；
 * 26e 第一步的 Prompt 也是照這一頁的四段寫的。改這一頁要連那兩頁一起看（B-4）。
 */

/**
 * 先角色、再 Story。兩個角色各一到兩句，刻意不給更多：這一頁要學員看出來的是
 * 「一個角色展開成幾句」這個動作，不是把報價系統寫完整。
 * 主管那一句是第三題（不能繞過的規則）的來源，刪掉三題就少一個例子。
 */
const STORIES = [
  {
    role: '業務助理',
    items: [
      '身為業務助理，我要選客戶、加品項，建出一張報價單，為了當天就能回覆客戶。',
      '身為業務助理，我要從上一張報價單複製一份，為了不用把常用品項重打一次。',
    ],
  },
  {
    role: '業務主管',
    items: [
      '身為業務主管，我要看到待確認的報價單並按下確認，為了放行之前先看一眼金額。',
    ],
  },
];

/** 從這幾句 User Story 往下問的三題。答完就知道這個題目要幾層。 */
const QUESTIONS = [
  {
    q: '關掉網頁之後，這筆東西還要在嗎？',
    yes: '報價單要。那就需要一個地方把它存起來。',
    no: '一次性的計算機不用，算完就算了。',
  },
  {
    q: '別人要看得到你存的東西嗎？',
    yes: '主管要看到助理建的那一張。那就需要後端。',
    no: '只有自己看的話，留在這台裝置就夠。',
  },
  {
    q: '有沒有一條規則，不能讓使用者自己繞過？',
    yes: '主管沒按確認就不能送出。這種規則只有後端擋得住。',
    no: '沒有的話，這一題可以跳過。',
  },
];

const SCOPE = [
  { t: '這一輪要做', v: '上面那三句 Story，就這三句。多出來的一律算下一輪。' },
  { t: '一定要填的欄位', v: '客戶名稱、有效期限、幣別、品項、數量、單價、稅金、付款條件。' },
  { t: '這一輪不做', v: '金流、庫存扣帳、完整 CRM、登入（角色先用切換的模擬）。' },
  { t: '也不做', v: '動畫、深色模式、拖拉排序。它們不會改變這個產品成不成立，但會讓第一輪跑不完。' },
];

export default function SlideQuoteSystemRequirements() {
  return (
    <SlideLayout title="由 User Story 開始" subtitle="Project Brief" icon={ClipboardList}>
      <div className="max-w-5xl mx-auto w-full pb-8 space-y-4">

        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-lg font-bold mb-2">第一份材料不是技術文件，是「誰會用這個東西」</h3>
          <p className="text-slate-400 text-base leading-relaxed mb-3">
            先列出角色，再由每個角色講出他要完成的事，一件一句。那一句叫{' '}
            <strong className="text-slate-200">User Story（使用者故事）</strong>，格式固定三段：
            身為<span className="text-slate-500">（誰）</span>，我要<span className="text-slate-500">（做什麼）</span>，
            為了<span className="text-slate-500">（什麼）</span>。
          </p>
          <div className="space-y-2.5">
            {STORIES.map((r) => (
              <div key={r.role} className="rounded-lg border border-sky-500/25 bg-sky-950/20 px-4 py-3">
                <div className="text-sky-300 text-sm font-bold mb-1.5">{r.role}</div>
                <ul className="space-y-1">
                  {r.items.map((it) => (
                    <li key={it} className="text-sky-100 text-base leading-relaxed">・{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-3">
            三段都要有。<strong className="text-slate-200">少了「為了什麼」，後面沒有任何東西可以拿來砍功能</strong>，
            因為每一個功能看起來都必要。
            <strong className="text-slate-200">這幾句加起來就是這一輪要做的範圍</strong>，不用再另外想一份功能清單。
          </p>
          <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">換成你的題目</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-1.5">
              先寫角色：<span className="text-slate-600">＿＿＿＿</span>、<span className="text-slate-600">＿＿＿＿</span>
            </p>
            <p className="text-slate-300 text-base leading-relaxed">
              一個角色寫一到三句：身為 <span className="text-slate-600">＿＿＿＿</span>，
              我要 <span className="text-slate-600">＿＿＿＿＿＿＿＿</span>，
              為了 <span className="text-slate-600">＿＿＿＿＿＿</span>。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-lg font-bold mb-1">這一句往下問三題，答完就知道要幾層</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            前端、後端、API 與資料庫前面都講過了。這裡不是重新學它們，是拿它們來判斷你這個題目要不要。
            三題的答案都從上面那幾句 Story 看得出來。
          </p>
          <div className="space-y-2.5">
            {QUESTIONS.map((item, i) => (
              <div key={item.q} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-baseline gap-2.5 mb-2">
                  <HelpCircle aria-hidden="true" size={15} className="text-sky-400 shrink-0 translate-y-0.5" />
                  <span className="font-mono text-sm text-slate-600 shrink-0">0{i + 1}</span>
                  <span className="text-slate-100 text-base font-bold leading-snug">{item.q}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1 pl-7">
                  <p className="text-slate-300 text-sm leading-relaxed">是：{item.yes}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">否：{item.no}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            報價系統三題都是「是」，<strong className="text-slate-100">所以它要前端、後端、資料庫三層都有</strong>。
            存在哪裡、用哪一種，之後才要決定，現在先知道它需要。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-lg font-bold mb-3">再把這一輪的範圍劃出來</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SCOPE.map((s) => (
              <div key={s.t} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="text-slate-200 text-sm font-bold mb-1">{s.t}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{s.v}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            中型專案最常失控的原因是，一開始沒有說清楚「這一輪不處理什麼」。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
