import { HelpCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-11-09 新增（講師）：把 207 到 209 三頁收成一題，讓學員自己選一次。
 * 原本的設計是現場口頭問，改成一頁的理由是這門課全片預錄，沒有講者可以當場追問，
 * 所以選項與講評都要印出來，學員才答得完。
 *
 * **三個分段是刻意的**：第一步只給情境與四個選項，第二步才揭曉，第三步講另外三個。
 * 口白要在第一步之後叫學員先暫停、自己選一個再往下看，不然這一頁就只是四行字。
 *
 * 正解是 C，而它接的是 Slide 209 的第一題（我究竟遇到什麼問題）：
 * 這個情境的症狀是「每次都要重講哪些檔案不能改」，那是**限制沒有寫下來**，
 * 不是找不到檔案，所以先補專案文件，不是先裝工具。
 * **不要把 B 寫成錯的。** 它是可能的第二步，只是順序不對：文件沒寫清楚之前就裝索引，
 * 索引只會幫它更快找到那些它本來就不該改的檔案。
 *
 * A 跟 D 各對應一個常見誤解，兩個都要留：
 *   A 把脈絡問題當成容量問題（Slide 207 的第一列：上下文視窗這一輪結束就沒了）
 *   D 把「全部讀一遍」當成解法（Slide 208：那正是沒有索引時最慢的那條路）
 *
 * 2026-11-09 最後一輪（講師）：解答那一塊掛上「解答」膠囊，而且跟選項之間拉開一段距離。
 * 分段揭露本來就有（`stepIndex` 1 選項、2 解答、3 另外三個），但簡報輸出成 PDF 或
 * 一次全展開的時候，三塊會同時出現，**視覺上要看得出來哪裡以下是答案**。
 *
 * 強調色兩種：emerald（正解）與 sky（接回前面三頁的那幾句）。
 * 這是 A-1 允許的：整頁只有一個正解框，其餘選項維持灰階，沒有做成紅框，
 * **不要為了對照把另外三個改成 red**，它們不是錯誤示範，是順序不對或理解不對。
 */

const OPTIONS = [
  { k: 'A', v: '換一個 Context Window 更大的模型' },
  { k: 'B', v: '立刻安裝 Codebase Memory MCP' },
  { k: 'C', v: '先把限制與架構關係寫進專案文件' },
  { k: 'D', v: '讓 Agent 每次重新閱讀整個專案' },
];

const WHY_NOT = [
  {
    k: 'A',
    v: '視窗大一點裝得下更多當下的東西，但開新對話還是得重講一次。「哪些檔案不能改」是跨次都要用的，那是要寫下來的東西。',
  },
  {
    k: 'B',
    v: '這一題缺的是還沒被寫下來的限制。先把限制補成文件、確認它讀得到；之後真的卡在找不到檔案，再評估索引工具。',
  },
  {
    k: 'D',
    v: '重新讀一遍也找不回只留在舊對話裡的限制，而且每一輪都要重新花時間探索一次。',
  },
];

export default function SlideMemoryQuiz() {
  return (
    <SlideLayout title="判斷題：維護三個月的網站，先做哪一件" subtitle="Your Call" icon={HelpCircle}>
      <div className="max-w-5xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-100 text-base font-bold leading-relaxed">
            你用 Claude Code 維護一個開發了三個月的網站。每次開新對話修改登入功能，
            都得重新告訴它哪些檔案不能改。你確認過，那幾條限制只講在舊的對話裡，
            專案裡沒有任何一份文件寫著它們。
          </p>
          <p className="mt-1 text-sm text-slate-500">你會優先採取哪個做法？先選一個，再往下看解答。</p>
          <ol className="mt-3 space-y-2">
            {OPTIONS.map((o) => (
              <li key={o.k} className="flex items-baseline gap-3 text-base leading-relaxed">
                <span className="font-mono text-sm text-slate-600">{o.k}</span>
                <span className="text-slate-300">{o.v}</span>
              </li>
            ))}
          </ol>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 mt-6 border-t-slate-800">
          <div className="flex items-baseline gap-3">
            <span className="rounded border border-emerald-500/40 px-1.5 font-mono text-xs text-emerald-300">解答</span>
            <span className="font-mono text-sm font-bold text-emerald-400">C</span>
            <h3 className="text-base font-bold text-slate-100">先把限制與架構關係寫進專案文件</h3>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            題目已經說了，那幾條限制只留在舊的對話裡，
            <strong className="text-slate-100">新的那一輪對話讀不到舊對話裡的東西</strong>，
            跟專案大不大沒有關係。哪些檔案不能改、它們跟誰相依，寫成專案文件之後，
            再開一輪新對話，請它指出文件位置並且把限制複述一次，確認它真的讀到了。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-base font-bold mb-3">另外三個為什麼不是第一步</h3>
          <ul className="space-y-2.5">
            {WHY_NOT.map((w) => (
              <li key={w.k} className="flex gap-3 text-sm leading-relaxed">
                <span className="font-mono text-sm text-slate-600 shrink-0">{w.k}</span>
                <span className="text-slate-400">{w.v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t border-slate-800 pt-3 text-sm leading-relaxed text-sky-200">
            寫完文件之後，如果它還是常漏掉相關的程式碼，那時候才輪到索引工具。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
