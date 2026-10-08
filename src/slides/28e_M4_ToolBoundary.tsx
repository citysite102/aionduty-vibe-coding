import { GitCompare, Cloud, HardDrive, MessageSquareWarning } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import graftDemo from '../../assets/tools/graft-site-act-demo.gif';
import memoryGraph from '../../assets/tools/codebase-memory-graph.png';

/**
 * 2026-10-08 新增（講師要求）：上一頁給了四個問題，這一頁拿同一類的第二個工具套一次，
 * 四題裡有一題的答案完全相反，那張表才看得出有用。這一頁的本體是那條對照線，
 * 不是 graft 這個專案本身。
 *
 * 最後查證：2026-10-08，`gh api repos/trailhq/graft` 與它的 README。
 * 當時的現況：MIT、9.7 千顆星、安裝是 `npm install -g @nanonets/graft` 加 `graft init`。
 * 兩階段：第一階段用 tree-sitter 在本機建結構圖（README 原話 "On your machine, no key,
 * no network"），第二階段用模型產摘要，要你自己的供應商與金鑰（`GRAFT_PROVIDER`、
 * `GRAFT_API_KEY`、`GRAFT_MODEL`）。產出是 `graft/` 底下的 markdown，它自己說那是
 * "a local, regenerable cache, like node_modules"，而且會加進 `.gitignore`。
 * 有匿名用量回報，`graft telemetry disable` 可以關。
 *
 * 兩個工具用 sky／indigo 成對對照，那是 A-1 允許的唯一一種雙色用法，合計算一種。
 * **拆掉任何一邊，剩下的那一個就要改回 sky**，不要留一個孤單的 indigo。
 *
 * 最後那一塊（MCP 回傳的內容會進到上下文）是這兩頁真正要留給學員的一句話，
 * 它接的是章節八「放手前的五道邊界」裡 Prompt Injection 那一道。
 * **搬頁的時候兩邊一起看**，這一頁是把那個風險落到「裝第三方工具」這個具體動作上。
 *
 * 四個問題的文字要跟上一頁一字不差，改一邊就要改另一邊（B-6）。
  *
 * **右欄那張 graft 的圖是會動的 GIF，這是 CLAUDE.md A-3「禁止常駐無限動畫」的例外，不是漏看。**
 * A-3 的例外條件有三個，這裡三個都成立：
 *   1. 它表達的是「系統正在運轉」本身：畫面上一個一個檔案被線連起來，那就是 graft 第一步在做的事，
 *      不是裝飾。換成靜態圖，這一欄就只剩一個品牌 logo（原本放的是官網黑洞首圖，沒有資訊）。
 *   2. 慢速、低對比：10.8 秒一輪，深黑底配灰白小點。
 *   3. 全頁只有這一組在動。**要再加任何動態之前，先把這一組拿掉。**
 * 代價知道一下：這一頁講約五分鐘，它會重播二十幾次；錄成影片之後也一直在動。
 * 真的覺得干擾，備案是抽一格存成 PNG 換掉，不要改成放慢或淡化，那會變成看不出在動什麼。
 *
 * 左欄的索引圖是靜態的，兩邊不對等是可以接受的：那張圖本身是密集發亮的網狀，視覺重量夠，
 * 不會因為右邊會動就讓這一頁讀起來像在推薦 graft（這一頁的立場是兩個都有人用）。
*/

const COMPARE = [
  {
    q: '什麼東西離開這台機器？',
    a: '什麼都不出去，也不用金鑰',
    b: '第二階段要把檔案內容送給你指定的模型',
    diff: true,
  },
  {
    q: '它要碰到什麼？',
    a: '讀整個專案，改工具的設定檔',
    b: '同上，另外要你的 API 金鑰',
  },
  {
    q: '拿掉它，專案還在嗎？',
    a: '在，索引刪掉重建就有',
    b: '在，那個資料夾是算得回來的快取',
  },
  {
    q: '它怎麼講自己的限制？',
    a: '寫明查不到不等於沒問題',
    b: '寫明有匿名用量回報，也寫了怎麼關',
  },
];

export default function SlideToolBoundary() {
  return (
    <SlideLayout title="同樣的命題，不同的解決策略" subtitle="Where the Code Goes" icon={GitCompare}>
      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            同樣是「先把專案讀懂、之後不用每次重讀」，graft 走的是另一條路：
            第一步在你的電腦上把程式碼的結構畫出來，不用金鑰也不連網路；
            <strong className="text-slate-100">第二步用一個模型把每個檔案寫成摘要</strong>，
            所以它需要你自己的 API 金鑰，也需要你同意把檔案內容送出去。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
            <span className="flex items-center gap-2 text-slate-100 text-base font-bold mb-1">
              <HardDrive aria-hidden="true" size={17} className="text-sky-400 shrink-0" />
              codebase-memory-mcp
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">
              全程在本機算，不需要金鑰。代價是它只看得懂程式碼的結構，
              沒辦法告訴你「這個資料夾在業務上是做什麼的」。
            </p>
            <img
              src={memoryGraph}
              alt="codebase-memory-mcp 的圖形介面局部，一張由函式與檔案構成的網狀圖。"
              className="w-full max-w-full rounded-lg border border-slate-800 mt-3"
            />
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              它建出來的就是這張圖，整份存在你自己的硬碟上。
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5">
            <span className="flex items-center gap-2 text-slate-100 text-base font-bold mb-1">
              <Cloud aria-hidden="true" size={17} className="text-indigo-400 shrink-0" />
              graft
            </span>
            <p className="text-slate-300 text-sm leading-relaxed">
              多一層模型寫的摘要，讀起來更像一份說明文件。代價是那一層要花錢，
              而且檔案內容會送到你設定的那一家。
            </p>
            <img
              src={graftDemo}
              alt="graft 官網的示意動畫，深黑底上散落的灰白小點慢慢被細線一條一條連起來，連成幾叢。"
              className="w-full max-w-full rounded-lg border border-slate-800 mt-3"
            />
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              它官網上的示意：一個一個檔案被連成一張圖。這一步跟左邊那個一樣在本機做，
              要花錢的是後面那層摘要。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-base font-bold mb-3">同一張表，兩個答案</h3>
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.2fr)] gap-x-4">
            <div className="text-slate-500 text-sm pb-2" />
            <div className="text-sky-400 text-sm font-bold pb-2">本機那一個</div>
            <div className="text-indigo-400 text-sm font-bold pb-2">要送出去那一個</div>
            {COMPARE.map((c) => (
              <div key={c.q} className="contents">
                <div className="text-slate-100 text-sm font-bold border-t border-slate-800 py-2.5">
                  {c.q}
                  {c.diff && <span className="block text-slate-500 text-xs font-normal mt-0.5">只有這一題答案不一樣</span>}
                </div>
                <div className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 py-2.5">{c.a}</div>
                <div className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 py-2.5">{c.b}</div>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            <strong className="text-slate-200">能不能把公司的程式碼送給外部的模型，這題我們自己答不了</strong>，
            去問資訊或法務單位。問之前先把事情講成一句話：我想裝的這個工具，會把專案的檔案內容送到外部的模型。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-slate-100 text-base font-bold mb-2.5">那假設公司說可以送，就一定選那個嗎？</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            <strong className="text-slate-200">多那一層換到的</strong>：模型寫的摘要講得出「這個資料夾在業務上是做什麼的」，
            結構索引答不出這一題。新人接手一個舊專案的時候差最多。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-1.5">
            <strong className="text-slate-200">代價</strong>：要花錢、要等它跑完，而且摘要是模型寫的，
            寫錯了我們不一定看得出來（結構是算出來的，沒這個問題）。程式改了摘要也不會自己更新。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-1.5 pt-2.5 border-t border-slate-800">
            所以判斷標準不是「能不能送」，是<strong className="text-slate-200">需不需要那一層業務語意</strong>。
            只是要讓它在大專案裡找得到東西，本機那一個就夠。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" label="裝第三方工具，等於多開一個能對它說話的管道" stepIndex={5}>
          <span className="flex items-start gap-2.5">
            <MessageSquareWarning aria-hidden="true" size={17} className="text-amber-400 shrink-0 mt-0.5" />
            <span>
              放手前的那五道邊界裡有一道是「別人塞進來的文字，會被它當成你的指令」。
              第三方工具就是這條風險的具體樣貌：它回傳的東西會進到 Claude 的上下文，
              而那段內容是別人寫的。所以裝工具的標準跟裝瀏覽器外掛一樣，
              <strong className="text-slate-100">看誰在維護、看它要什麼權限、看它有多少人在用</strong>，
              不要因為某篇文章推薦就裝。
            </span>
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
