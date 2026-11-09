import { Gauge } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-11-09 整頁重寫（講師給了逐塊的規格）。檔名從 `28e_M4_ToolBoundary` 改成現在這個，
 * 因為這一頁現在是**要不要加工具的決策收斂**，不是「工具的邊界」。
 *
 * 三頁的分工（改任何一頁之前先看這三行，B-6）：
 *   207 專案脈絡　：重要的規則、決策與狀態沒有被保存或提供
 *   208 程式碼檢索：資料已經有了，幾百個檔案裡怎麼找到該改的那一段
 *   209 這一頁　　：什麼情況才值得加索引或外部記憶
 *   210 判斷題　　：把這三頁收成一題，學員自己選一次
 *
 * **標題刻意不是問句。** 講師原句「什麼時候值得替 Agent 加上記憶或索引工具？」是 41 寬
 * （超過 D-5 的 40），而且 207、208 已經連兩頁是問句，第三頁再問一次就是同一個句型骨架
 * 連三次（D-5 那一節講的模具）。現在這句 32 寬，而且把這一頁的判斷順序直接寫出來。
 *
 * 2026-11-09（講師）上半從「專案規模三格」換成「三種工作瓶頸」。
 * 規模不是判斷標準，**撞到哪一種瓶頸才是**；原本第三格寫「大到一定程度才值得評估」，
 * 會被讀成「專案越大就一定要裝」。三格各自的「先做」是不用裝工具的那一步，
 * **那一行不能刪**，它是這一頁的論點。四題也跟著換成選工具的四題，第一題問的是
 * 「現有的做法究竟解決不了什麼」，直接接住上面那三個「先做」。
 *
 * 這一輪拿掉的，**不要加回來**：
 *   1. 原本那張六列的兩工具逐題對照表。它把兩個工具排成「一個本機安全、一個會送出去」，
 *      但 Trail Code 的結構索引與 learnings 都在本機跑，只有 `trail build --deep` 那一層
 *      才牽涉外部模型。**那個二分法是錯的**，所以改成「兩個工具解決的問題不一樣」。
 *   2. 原本收尾那個琥珀色的提示注入框。那一條沒有刪掉，併進第二題裡（它回傳的內容會進到
 *      上下文，而那段文字是別人寫的），它接的還是章節七「放手前的五道邊界」。
 *   3. 「公司准了之後要不要那層業務語意」那一塊，它的判斷併進第一題與第四題。
 *
 * 四個問題是這一頁的最終判斷框架，**順序不要調**：先確認問題是什麼（很多問題工具解不掉），
 * 再問它碰得到什麼，再問什麼東西離開本機，最後問長期要付什麼。
 * 前一版的四題是「問一個工具」的四題，這一版是「做一個決定」的四題。
 *
 * 記憶的生命週期（建立、更新、查找、失效）寫在情境 02 與第四題裡，不另開區塊：
 * 舊決策跟新規格打架的時候，沒有人負責更新的文件比沒有文件更糟。
 *
 * 最後查證：2026-11-08。`gh api repos/trailhq/Trail-Code`（graft 已改名 Trail Code，
 * 套件 `@trailhq/trail-code`，舊的 `graft` 指令還能用）與 `DeusData/codebase-memory-mcp`。
 * **星數、Issues 數、支援語言數一律不要寫回畫面**，它們會過期，而且跟適不適合無關。
 * 兩個工具的功能描述以它們自己的文件為準，畫面上留了那一句提醒。
 *
 * 強調色一種：sky（四個問題的編號與第三種情境）。其餘灰階。
 */

/** 上半：三種工作瓶頸。**不要改回專案規模的分類**，規模不是判斷標準，撞到哪一種瓶頸才是。
 *  每一格的「先做」都是不用裝工具的那一步，**那一行不能刪**，它是這一頁的論點。 */
const BOTTLENECKS = [
  {
    n: '01',
    k: '常忘記規格與決策',
    sign: '同一件事每一輪都要重講，昨天談好的做法今天又跑掉。',
    first: '先改善專案文件與決策紀錄，指定誰負責更新，並且確認它每一輪真的讀得到。',
    then: '確認它讀到的是正確的版本之後還是接不上，才輪到外部記憶。',
  },
  {
    n: '02',
    k: '常找錯程式碼',
    sign: '它翻了十幾個檔案才回答，或者改到已經不再使用的那一份。',
    first: '先改善內建搜尋的用法與專案本身的結構（命名、資料夾、職責）。',
    then: '這兩件做過還是常漏掉，再比較一次：繼續整理結構，跟裝一套索引，哪一個比較省。',
  },
  {
    n: '03',
    k: '中斷之後接不回去',
    sign: '上一輪做到哪、哪幾步還沒完成、失敗停在哪裡，沒有人說得出來。',
    first: '先把完成了哪幾步、產物放在哪、失敗停在哪寫成一份進度紀錄。',
    then: '進度有在寫之後還是接不回去，才評估那些狀態要存在哪裡、由誰更新。',
  },
];

/** 中段：兩個工具解決的問題不一樣。**不要寫成「一個本機、一個會送出去」**，理由見檔頭。 */
const TOOLS = [
  {
    k: 'codebase-memory-mcp',
    use: '在本機把程式碼建成索引：哪個功能寫在哪個檔案、誰呼叫了誰。',
    fit: 'Agent 常常要把一個大的程式碼庫重新搜尋一遍。',
    check: '索引建得完不完整、怎麼更新、跟你在用的工具整不整合、安裝要什麼權限。',
  },
  {
    k: 'Trail Code',
    use: '程式碼的關係圖，加上把跨次工作的決策與做法存成專案裡的檔案。',
    fit: '同一批人反覆維護同一個專案，先前的決定需要留得下來。',
    check: '存下來的範圍、怎麼更新、資料往哪裡去、長期誰在維護。結構索引與那些決策檔在本機；要送出去的有好幾個地方，不是只有一個開關：模型摘要那一層、初始化時讀進去的歷史紀錄、接上團隊空間之後的同步，還有使用回報。每一項各自確認啟用條件、送出什麼、送給誰。',
  },
];

/** 下半：選工具的四題。**順序不要調**：先確認現有的做法到底解決不了什麼，再問它要什麼，
 *  再問什麼離開本機，最後才問值不值得養。 */
const DECIDE = [
  {
    n: '01',
    q: '現有的做法究竟解決不了什麼？',
    v: '那一格的「先做」做過了嗎？做過之後還留著哪些錯誤與花掉的時間，先記下來，再看工具處不處理得了。',
  },
  {
    n: '02',
    q: '新工具要讀哪些資料與權限？',
    v: '會掃到哪些檔案，裡面有沒有金鑰、環境變數或個人資料？它能讀、能改、還是能執行？還有：它回傳的內容會進到 Agent 的上下文，而那段文字是別人寫的，裡面要是藏了一句指令，它可能就照做了。',
  },
  {
    n: '03',
    q: '哪些資料可能離開這台機器？',
    v: '分清楚本機索引、外部模型摘要、雲端同步與使用回報，不要只看它有沒有標榜 Local。',
  },
  {
    n: '04',
    q: '多出來的效益值得這份維護成本嗎？',
    v: '第一次建索引要多久、之後更新快不快、要不要付 API 的錢、版本相不相容、還有沒有人在維護，以及不用了之後那些資料怎麼辦。',
  },
];

export default function SlideWhenToAdd() {
  return (
    <SlideLayout title="加記憶或索引工具之前，先確認瓶頸" subtitle="When to Add Memory Tools" icon={Gauge}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed mb-3">
            先看你現在卡在哪一種瓶頸。
            <strong className="text-slate-100">每一種都有一件不用裝工具就能做的事，那件事做完還是卡住，才輪到工具。</strong>
          </p>
          <ol className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {BOTTLENECKS.map((b) => (
              <li key={b.n} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-600">{b.n}</span>
                  <h3 className="text-base font-bold text-slate-100">{b.k}</h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{b.sign}</p>
                <p className="mt-2 border-t border-slate-800 pt-2 text-sm leading-relaxed text-sky-200/90">
                  先做：{b.first}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{b.then}</p>
              </li>
            ))}
          </ol>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-base font-bold mb-3">不同工具，解決的問題也不完全一樣</h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {TOOLS.map((t) => (
              <div key={t.k}>
                <div className="font-mono text-sm font-bold text-slate-100">{t.k}</div>
                <dl className="mt-1.5 space-y-1">
                  {[['做什麼', t.use], ['適合', t.fit], ['評估', t.check]].map(([label, text]) => (
                    <div key={label} className="flex gap-2 text-sm leading-relaxed">
                      <dt className="w-10 shrink-0 text-slate-600">{label}</dt>
                      <dd className="min-w-0 text-slate-400">{text}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-slate-800 pt-3 text-sm leading-relaxed text-slate-500">
            這兩個都還在改版，功能與資料處理方式以它們自己的文件為準，不要照著這一頁去跟公司報告。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-base font-bold mb-3">決定裝不裝之前，先問這四題</h3>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {DECIDE.map((d) => (
              <li key={d.n}>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-sky-400">{d.n}</span>
                  <h4 className="text-sm font-bold text-slate-100">{d.q}</h4>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{d.v}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 border-t border-slate-800 pt-3 text-sm leading-relaxed text-slate-500">
            第三題你自己答不了的那部分，去問資訊或法務單位。問之前先把事情講成一句話：
            我想裝的這個工具，打開某個功能之後，會把專案的檔案內容送到外面的模型。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="border-t border-slate-800 pt-4">
          <p className="text-slate-100 text-lg font-bold leading-relaxed">
            工具裝得多不會比較好，每一個都要對得上一個說得出來的瓶頸。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            加索引或記憶機制，是為了少做重複的探索、把正確的脈絡找回來、讓維護更可靠，
            目的不是讓 Agent 記住所有事情。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
