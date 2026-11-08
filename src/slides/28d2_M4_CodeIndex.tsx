import { FileSearch } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import memoryGraph from '../../assets/tools/codebase-memory-graph.png';

/**
 * 2026-11-08 從 `28d_M4_ProjectMemory` 拆出來（講師：那一頁可以拆兩頁），
 * 同日由講師給了逐塊規格重寫，檔名也從 `28d2_M4_ToolCheck` 改成現在這個，
 * 因為這一頁講的是**程式碼索引與檢索**，不是「怎麼挑一個第三方工具」。
 *
 * 三頁的分工（改任何一頁之前先看這三行，B-6）：
 *   207 專案脈絡：重要的規則、決策與狀態沒有被保存或提供
 *   208 這一頁　：資料已經有了，幾百個檔案裡怎麼找到該改的那一段
 *   209 要不要裝：先看專案規模，需要的人才比兩個工具，重點是資料會不會離開這台機器
 *
 * **標題砍過字**。講師原句是「當檔案越來越多，Agent 怎麼找到需要的程式碼？」，
 * 量起來 44 寬，超過 D-5 的 40，會折行。現在這句 38 寬，意思不變。
 *
 * 這一輪拿掉的，**不要加回來**：
 *   1. 星數、Issues 數、支援語言數。它們會過期，而且把「有多少人用」當成品質證據，
 *      那不是這一頁要教的事。工具名字退到右下角一行小字。
 *   2. token 對照長條圖（約 412,000 對 3,400）。那是工具自己量的單一情境，
 *      放在這裡會變成「索引省很多錢」的業配，而這一頁的結論剛好相反：找得到不等於理解正確。
 *   3. 原本的四個評估問題（資料去向、權限、可逆、誠實）。它們搬去 Slide 209，
 *      跟那一頁的六列對照表併在一起，**那裡才是裝不裝的決定點**。
 *
 * `curl … | bash` 那一行留著，但從一個琥珀框降成左欄底下一句。
 * 這是整堂課唯一一次示範那行指令，學員之後會到處看到它，**不要整句刪掉**。
 *
 * 最後查證：2026-10-08，`gh api repos/DeusData/codebase-memory-mcp` 與它的 README。
 * 當時的現況：MIT、tree-sitter 解析 162 種語言、索引存成本機 SQLite、
 * 安裝是一行 `curl ... | bash`，會自動偵測並寫入多種客戶端的設定檔。README 原話：
 *   "All processing happens 100% locally; your code never leaves your machine."
 *   "A clean coverage result means only 'no recorded gap,' never proof of completeness"
 * **畫面上不要替它宣稱「所有東西都在本機」或「所有呼叫關係都解析得出來」**，
 * 那是它自己的說法與它自己的實作版本，寫成通則就是過度承諾（D-2）。
 *
 * 強調色兩種：sky（建立索引之後那一塊）與 amber（沒有索引時的三個代價）。
 */

const WITHOUT = [
  '花時間把專案結構探索一遍',
  '漏掉間接相關的程式碼',
  '改到已經不再使用的檔案',
];

const STEPS = [
  {
    n: '01',
    k: '掃描整個專案',
    v: '分析專案裡有哪些檔案、哪個功能寫在哪裡，以及誰呼叫了誰。',
  },
  {
    n: '02',
    k: '建立索引',
    v: '把分析結果整理成一份查得到的資料，放著給 Agent 用。',
  },
  {
    n: '03',
    k: '要用的時候再查',
    v: 'Agent 要理解某個功能時，先查出相關的那幾段，再打開原始檔案確認。',
  },
];

export default function SlideCodeIndex() {
  return (
    <SlideLayout title="檔案一多，Agent 怎麼找到需要的程式碼？" subtitle="Codebase Retrieval" icon={FileSearch}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            專案裡有幾百個檔案的時候，每次都從頭翻一遍既慢又容易漏掉相關的程式碼。
            <strong className="text-slate-100">索引工具的做法是先把檔案與它們之間的關係整理好，Agent 要用的時候再查。</strong>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-6 items-start">

          <AnimatedBlock stepIndex={2} className="space-y-3">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
              <h3 className="text-slate-100 text-base font-bold mb-1.5">沒有索引的時候</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                你說「幫我改一下登入功能」，Agent 要自己搜尋檔案、讀程式碼、
                確認相關的元件跟呼叫關係。
              </p>
              <ul className="mt-2 space-y-1">
                {WITHOUT.map((w) => (
                  <li key={w} className="flex gap-2 text-sm leading-relaxed text-slate-400">
                    <span className="text-slate-600 shrink-0">・</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4">
              <h3 className="text-slate-100 text-base font-bold mb-1.5">建立索引之後</h3>
              <p className="text-sm leading-relaxed text-slate-300">
                先分析一次整個專案，建立一份查得到的程式碼結構與關係。
                再叫它改登入功能時，它先查出相關的檔案與呼叫關係，再打開原始程式碼確認。
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-500">
              索引負責幫它<strong className="text-slate-300">找到</strong>相關的程式碼；
              讀懂、確認與驗證，還是要回到原始程式碼。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-3">一個實際的例子</h3>
            <img
              src={memoryGraph}
              alt="Codebase Memory 的圖形介面。左欄是篩選器，列出 Function 12908、Field 6441、Class 1061、File 937 等節點類型，以及 defines、usage、calls 等關係類型；中間是一張發亮的網狀圖，上方標著 23827 nodes / 51526 edges。"
              className="w-full max-w-full rounded-xl border border-slate-800"
            />
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              它掃完一個專案之後長這樣：點是檔案與裡面的功能，線是誰呼叫誰。
              你不用看懂這張圖，Agent 要找東西的時候查的就是它。
            </p>
            <ol className="mt-3 space-y-2 border-t border-slate-800 pt-3">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-2.5">
                  <span className="font-mono text-xs text-slate-600 shrink-0 pt-1">{s.n}</span>
                  <p className="text-sm leading-relaxed text-slate-400">
                    <strong className="text-slate-100">{s.k}</strong>
                    <span className="text-slate-600 mx-1.5">／</span>
                    {s.v}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-right font-mono text-xs text-slate-600">
              Open-source example · codebase-memory-mcp
            </p>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="border-t border-slate-800 pt-4">
          <p className="text-slate-100 text-lg font-bold leading-relaxed">
            索引讓 Agent 更容易找到相關的程式碼，但不保證它理解正確。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            找到相關檔案之後，仍然要確認版本、實際的邏輯、相依關係與測試結果。
            這一類工具很多是一行 <code className="font-mono text-amber-300">curl … | bash</code> 裝完，
            那一行會把網路上的一段程式直接在你的電腦上執行，先把網址打開看一遍再跑。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
