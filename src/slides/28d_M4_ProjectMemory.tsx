import { Database, Search, HardDrive, ShieldQuestion } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import memoryGraph from '../../assets/tools/codebase-memory-graph.png';

/**
 * 2026-10-08 新增（講師要求）：前面那幾頁都假設專案只有幾個檔案。學員回去接手公司既有的專案
 * 之後第一個撞到的是「它每次都要重讀一遍」，這一頁補那一段，並且把第三方工具的評估方式
 * 定在這裡，下一頁拿另一個工具對照同一張表。
 *
 * 最後查證：2026-10-08，`gh api repos/DeusData/codebase-memory-mcp` 與它的 README。
 * 當時的現況：MIT、4.6 萬顆星、tree-sitter 解析 162 種語言、索引存成本機 SQLite、
 * 快取放 `~/.cache/codebase-memory-mcp/`，安裝是一行 `curl ... | bash`，
 * 會自動偵測並寫入 45 種客戶端的設定檔。README 原話：
 *   "All processing happens 100% locally; your code never leaves your machine."
 *   "A clean coverage result means only 'no recorded gap,' never proof of completeness"
 * 省 token 的那個數字（約 99.2%）是它自己量的單一情境，畫面上一律標明是它自己量的，
 * **不要把它寫成這堂課的保證**（D-2 的編造量化數據那一條，照抄別人的數字也要標來源）。
 *
 * 右欄那四個問題是這一頁真正的產出，下一頁（graft）會再用同一張表一次，
 * 兩頁的答案不一樣才看得出那張表有用。**改這四個問題就要同時改下一頁**，
 * 否則對照會對不起來。
 *
 * 安裝那一行是 `curl | bash`，畫面上一定要留那句「先下載下來看一遍再跑」。
 * 這是整堂課唯一一次示範那一行指令，學員之後會到處看到它。
 *
 * 強調色兩種：sky（四個問題）與 amber（那個數字與 curl 的提醒）。
 */

/** 開場的情境圖：兩邊的檔案數量差多少，用看的比用講的快。
 *  左邊是課程裡那幾個案例的實際檔名，右邊用灰格子堆出「數不完」的感覺，
 *  **不要把右邊也寫成真的檔名**，那會讓人去讀它，而這裡要的是「一眼看出多很多」。 */
const SMALL_FILES = ['index.html', 'style.css', 'app.js', 'CLAUDE.md'];

const SYMPTOMS = [
  '問一個「這個功能在哪裡做的」，它翻了十幾個檔案才回答，而且答得不完整。',
  '同一個專案，昨天解釋過的結構今天要再講一遍。',
  '它開始改到不該改的檔案，因為它沒看到另一個地方也在用。',
];

const ASK = [
  {
    icon: HardDrive,
    q: '什麼東西離開這台機器？',
    a: '完全不出去。它自己寫著：全部在本機處理，不需要任何金鑰。',
  },
  {
    icon: Search,
    q: '它要碰到什麼？',
    a: '讀整個專案，改十幾種工具的設定檔。索引放在家目錄的快取資料夾。',
  },
  {
    icon: Database,
    q: '拿掉它，專案還在嗎？',
    a: '在。索引刪掉重建就有，沒有碰程式碼本身，試錯成本最低。',
  },
  {
    icon: ShieldQuestion,
    q: '它怎麼講自己的限制？',
    a: '寫明查不到缺口不等於沒問題。肯寫限制的，比只列優點的可信。',
  },
];

/** 它自己量的對照。數字照抄 README（約 412,000 對 3,400），**畫面上一定要標明是它自己量的**，
 *  不要寫成這堂課的保證（D-2）。長條用相對比例畫，小的那一條差兩個數量級，
 *  給一個最小寬度才看得見，那個「幾乎看不到」本身就是這張圖要講的事。 */
const COST = [
  { t: '一個一個檔案翻', n: '約 412,000', w: 100, hot: true },
  { t: '先查索引再問', n: '約 3,400', w: 0.8, hot: false },
];

export default function SlideProjectMemory() {
  return (
    <SlideLayout title="專案規模增加的 Agent 成本" subtitle="Project Memory" icon={Database}>
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              課程裡做的那幾個案例，檔案都不多，Claude 翻一遍就知道哪裡是哪裡。
              但如果是公司那個已經跑了三年的專案呢？情況會變成這樣：
              <strong className="text-slate-100">光是找到相關的那幾個檔案，就吃掉大半個上下文</strong>，
              真正要做的事反而沒空間了。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="grid grid-cols-[0.8fr_1.2fr] gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-400 text-sm mb-2">課程裡的案例</p>
              <div className="flex flex-wrap gap-1.5">
                {SMALL_FILES.map((f) => (
                  <span key={f} className="rounded border border-slate-700 bg-slate-950 px-2 py-1 font-mono text-xs text-slate-300">
                    {f}
                  </span>
                ))}
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mt-2.5">翻一遍就知道哪裡是哪裡</p>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-slate-300 text-sm mb-2">公司那個跑了三年的專案</p>
              <div className="flex flex-wrap gap-1" aria-hidden="true">
                {Array.from({ length: 72 }).map((_, i) => (
                  <span key={i} className="h-2.5 w-6 rounded-sm bg-slate-700/70" />
                ))}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-2.5">
                幾百個檔案，而且沒有人說得清楚哪一塊是做什麼的
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-2.5">三個症狀，出現就是撞到這件事了</h3>
            <ul className="space-y-2">
              {SYMPTOMS.map((s) => (
                <li key={s} className="flex gap-2.5 text-slate-400 text-sm leading-relaxed">
                  <span className="text-slate-600 shrink-0">・</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-2">一種解法：先建一份索引</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              codebase-memory-mcp 這類工具先把整個專案掃一遍，記下哪個功能寫在哪個檔案、誰呼叫了誰，
              存成一份本機的資料庫。之後 Claude 是去查索引，不是一個一個檔案翻。
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2.5 text-slate-500 text-sm">
              <span>MIT 授權</span>
              <span>4.6 萬顆星（2026 年 10 月查）</span>
              <span>最近一次更新在幾天內</span>
              <span>Issues 六百多則，有人在用也有人在回報</span>
              <span>支援 162 種語言</span>
              <span>裝好之後是一個 MCP 工具</span>
            </div>
            <figure className="mt-3">
              <img
                src={memoryGraph}
                alt="Codebase Memory 的圖形介面。左欄是篩選器，列出 Function 12908、Field 6441、Class 1061、File 937 等節點類型，以及 defines、usage、calls 等關係類型；中間是一張發亮的網狀圖，上方標著 23827 nodes / 51526 edges。"
                className="w-full max-w-full rounded-xl border border-slate-800"
              />
              <figcaption className="text-slate-500 text-sm leading-relaxed mt-2">
                它掃完一個專案之後長這樣：兩萬多個點是函式、類別與檔案，五萬多條線是誰呼叫誰。
                你不用看懂這張圖，Claude 要找東西的時候查的就是它。
              </figcaption>
            </figure>
          </AnimatedBlock>

          <Callout tone="warn" label="它的安裝指令長這樣" stepIndex={5}>
            這一類工具很多是一行{' '}
            <code className="font-mono text-amber-200">curl … | bash</code>{' '}
            裝完。那一行在做的是：把網路上的一段程式抓下來，直接在我的電腦上執行。
            公司的機器要裝之前，先把那個網址在瀏覽器打開看一遍。看不懂就貼給 Claude 請它逐行講。
          </Callout>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={6} className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-1">要不要裝一個第三方工具，問這四題</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              專案越做越大，你會陸續接到各種「裝了會變快」的工具。
              這四題的順序是固定的：先問資料，再問權限，再問可逆，最後看它誠不誠實。
              答案都寫在那個專案的 GitHub 說明頁上：最上面那段描述、星星數與最後更新、
              License、Installation 那一段、Issues 分頁，照這個順序看就找得到。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={7} className="rounded-2xl border border-slate-800 bg-slate-900 p-4 space-y-2.5">
            {ASK.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={a.q} className="flex items-start gap-2.5">
                  <span className="font-mono text-sm text-slate-600 shrink-0 pt-0.5">0{i + 1}</span>
                  <Icon aria-hidden="true" size={16} className="text-slate-400 shrink-0 mt-1" />
                  <p className="text-slate-400 text-sm leading-relaxed">
                    <strong className="text-slate-100">{a.q}</strong>
                    <span className="text-slate-600 mx-1.5">／</span>
                    {a.a}
                  </p>
                </div>
              );
            })}
          </AnimatedBlock>

          <AnimatedBlock stepIndex={8} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-3">同一組問題，找答案花掉的 token</h3>
            <div className="space-y-3">
              {COST.map((c) => (
                <div key={c.t}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-slate-300 text-sm">{c.t}</span>
                    <span className={`font-mono text-sm ${c.hot ? 'text-amber-300' : 'text-sky-300'}`}>{c.n}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${c.hot ? 'bg-amber-500/70' : 'bg-sky-500/80'}`}
                      style={{ width: `max(${c.w}%, 6px)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
              這是它自己在一個專案上量的，不是通則。當成「方向是對的」就好，
              真的要知道自己差多少，裝完用 <code className="font-mono text-slate-400">/context</code> 前後比一次。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
