import { NotebookPen, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 2026-10-05 檢查過一輪，修了三件事：
 *   1. 開場那個藍色膠囊是空的（只有 className，裡面沒有字），畫面上會出現一塊空色塊。
 *      改成寫出這一頁在做什麼。
 *   2. 這一頁要學員貼一段 prompt，但那段字原本是寫死在 JSX 裡的 <p>，沒有複製鈕，
 *      學員只能自己照著打。改用 CopyBlock，畫面印的與複製到的是同一份（A-4）。
 *   3. 補上 LiveDemo。這一頁是這個單元第二段值得實機錄的（逐字稿的錄製註記寫著），
 *      但頁面上沒有任何「現在開 Claude Code」的記號。
 *
 * DERIVED 四個與 PROMPT 裡要求顯示的三個刻意不一樣：那四個是「可以算出來的東西」的
 * 例子，PROMPT 只挑三個顯示在畫面上，免得一個小計時器的下方塞四行統計。
 * 中途返航率留在卡片上當例子，不要為了對齊而硬塞進 PROMPT。
 */

const FIELDS = [
  { name: 'startedAt', desc: '這趟什麼時候出發' },
  { name: 'minutes', desc: '飛了多久' },
  { name: 'completed', desc: '有沒有撐完，中途返航也要記' },
];

const LOG_PROMPT = `幫計時器加上航行日誌。每完成或中途返航一趟就記一筆，欄位是出發時間、飛行分鐘數、有沒有完成。
資料先存在瀏覽器的 localStorage 就好，不要接資料庫。
畫面下方顯示今天完成幾趟、總時數、連續出勤天數，這三個都要從紀錄算出來，不要另外存一份數字。`;

const DERIVED = [
  '今天完成幾趟',
  '總飛行時數',
  '連續出勤幾天',
  '中途返航率',
];

export default function SlideMissionLog() {
  return (
    <SlideLayout title="幫計時器加上航行日誌" subtitle="Mission Timer v2: Data" icon={NotebookPen}>
      <LiveDemo kind="claude" note="做完你的計時器會開始記得你做過幾趟" />

      <div className="max-w-6xl mx-auto text-left space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-950/40 border border-slate-800/80 rounded-2xl px-6 py-3.5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full text-xs font-mono shrink-0 self-start md:self-center font-bold">
            v2　加資料
          </div>
          {/*
            2026-10-05 補這一句。這個需求（我想知道自己今天完成幾趟任務）在章節五出現過兩次：
            `21_M2_Pillars` 把它拆成三件要決定的事（記哪些欄位、存在哪裡、畫面怎麼呈現），
            `21b_M2_HandsOn` 叫學員讓它反問，問出返航算不算一趟、今天算到幾點、
            關掉瀏覽器還在不在。**這一頁的三塊剛好就是那三件事的答案**，但原本一個字都沒提，
            所以讀起來像在重複。那兩頁刻意不給答案（21b 的檔頭寫著「不要把拆解的答案直接印出來」），
            payoff 落在這裡，講出來才看得到那個設計。
            **改那兩頁的提問，要回來改這一句。**
          */}
          <p className="text-slate-400 text-sm leading-relaxed">
            「我想知道自己今天完成幾趟任務」這個需求，你前面拆過一次，也叫它反問過你一次。
            <strong className="text-slate-300">這一頁是把那幾題的答案補上，順便動手做出來。</strong>
            先別急著架資料庫，這個題目用不到。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

          {/* 左：資料要記什麼 */}
          <div className="lg:col-span-5 space-y-5">
            <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
                一趟任務，記這三件事
              </h3>
              <div className="space-y-2">
                {FIELDS.map(f => (
                  <div key={f.name} className="flex gap-3 items-baseline bg-slate-950 border border-slate-800 rounded-lg px-3 py-2">
                    <code className="text-sky-300 text-xs font-mono shrink-0">{f.name}</code>
                    <span className="text-slate-400 text-xs leading-relaxed">{f.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                第三個欄位就是它當初反問你的那一題：按了返航、沒跑完的那次算不算一趟。
                <strong className="text-slate-300">答案是算，但要標記起來。</strong>
                失敗不記的話，你永遠不知道自己有多常放棄。
              </p>
            </AnimatedBlock>

            <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
                這些不要存，用算的
              </h3>
              <div className="flex flex-wrap gap-2">
                {DERIVED.map(d => (
                  <span key={d} className="px-2.5 py-1 bg-emerald-500/5 text-emerald-300/90 border border-emerald-900/40 rounded-lg text-xs font-bold">
                    {d}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">
                你沒講清楚的話，它多半會直接存一個「今天完成 3 趟」的數字。那個數字遲早會跟實際紀錄對不上。
                <strong className="text-slate-300">能算出來的就不要另外存一份。</strong>
              </p>
            </AnimatedBlock>
          </div>

          {/* 右：存哪裡 + prompt + 陷阱 */}
          <div className="lg:col-span-7 space-y-5">
            <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-3 border-b border-slate-800 pb-2">
                存在哪裡？先用瀏覽器自己記就好
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                這一塊回答的是「關掉瀏覽器再打開，紀錄還在嗎」。
                瀏覽器內建一塊叫 <code className="text-sky-300 font-mono">localStorage</code> 的小空間，網頁可以把東西寫在你這台電腦上。
                <strong className="text-slate-200">不用註冊、不用後端、不用付錢</strong>，一句話就有。
              </p>
              <CopyBlock text={LOG_PROMPT} size="xs" note="最後那句不要刪掉，它擋的是下面那個坑" />
            </AnimatedBlock>

            <AnimatedBlock stepIndex={4} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 flex gap-3 items-start">
              <TriangleAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-300 mb-1.5">你要負責檢查的那一題</h4>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">
                  「連續出勤天數」是這裡面唯一會寫錯、而且用眼睛看不出來的東西。跨過午夜怎麼算？昨天沒做，今天該不該歸零？
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">
                  你不用會寫這段程式。你要會問這句：
                  <span className="text-sky-300 font-bold">「我昨天沒做，今天打開，連續天數應該要歸零。你有處理嗎？寫個例子給我看。」</span>
                </p>
              </div>
            </AnimatedBlock>
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
