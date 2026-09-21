import { Globe2, MousePointerClick, Table2, ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 上一頁的腳本只動你自己電腦裡的檔案，這一頁的腳本會出去連別人的網站，
 * 所以多了一組上一頁沒有的問題：可不可以抓、抓多快、抓到之後怎麼用。
 * **底下那個邊界 Callout 不能拿掉**，沒有它這一頁就是在教人去爬別人的網站。
 *
 * 挑 Playwright 而不是「抓網頁原始碼」是有理由的，而且那個理由要講：
 * 現在多數網站的內容是打開之後才由程式算出來的，直接抓原始碼會拿到空殼；
 * 而且這一頁示範的「按載入更多」本來就不是抓得到的東西，要真的有人去按。
 *
 * prompt 的最後一行（headless: false）不要拿掉。學員第一次看到瀏覽器自己動起來，
 * 是這一頁唯一不能用講的東西，也是它跟上一頁最大的差別。
 *
 * 目標網址刻意留成「換成你要追的那一頁」，不寫死一個真的站：
 * 寫死的話它會過期（C 章），而且等於指定全班去打同一個網站。
 *
 * 「先找出口」那一塊不要拿掉，它排在 prompt 前面是刻意的。
 * 最後查證：2026-09-21。Hacker News 的官方 API 在 hacker-news.firebaseio.com/v0/
 * （文件 github.com/HackerNews/API，當時寫著沒有速率限制）；arXiv 的在
 * export.arxiv.org/api/query，回傳 Atom，另有每日 RSS，官方建議的速率是
 * 每秒 4 次、每一批之間停 1 秒，並要求先讀它的 Terms of Use。
 * 這兩個舉例會過期，下次改版前重查 info.arxiv.org/help/api 與那份 GitHub 文件。
 */
const PROMPT_LINES: { t: string; hi?: boolean }[] = [
  { t: '幫我寫一個 Playwright 腳本，放在 news-watch 資料夾。' },
  { t: '' },
  { t: '目標頁面：https://（換成你要追的那一頁）' },
  { t: '' },
  { t: '1. 打開那一頁，等清單真的出現再往下做' },
  { t: '2. 有「載入更多」的話最多按 5 次，每次等它載完再按下一次' },
  { t: '3. 抓每一則的標題、日期、連結' },
  { t: '4. 存成 news.csv，欄位是 date,title,url，用 UTF-8 with BOM，Excel 打開不要變亂碼' },
  { t: '5. 跑完印出「共 N 則」' },
  { t: '' },
  { t: '邊界：' },
  { t: '- 只動這一個公開頁面，不要登入，不要跳到別的網域', hi: true },
  { t: '- 每個動作之間停 1 秒', hi: true },
  { t: '- 某一欄抓不到就留空，不要讓整支腳本掛掉' },
  { t: '' },
  { t: '第一次用 headless: false 跑，我要看到瀏覽器真的在動。', hi: true },
];

const PROMPT_TEXT = PROMPT_LINES.map((l) => l.t).join('\n');

/** 右欄：抓之前的網頁清單，與抓完的 CSV。 */
const BEFORE = ['9/18  秋季新品發表會開放報名', '9/12  門市營業時間調整公告', '9/05  與 XX 品牌聯名系列上市'];
const AFTER = [
  'date,title,url',
  '2026-09-18,秋季新品發表會開放報名,https://…',
  '2026-09-12,門市營業時間調整公告,https://…',
  '2026-09-05,與 XX 品牌聯名系列上市,https://…',
];

export default function SlideExample3() {
  return (
    <SlideLayout
      title="爬蟲：讓腳本自己開瀏覽器，抓成一張表"
      subtitle="Example 3: Browser Automation with Playwright"
      icon={Globe2}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch min-h-full pb-8">

        <div className="flex flex-col justify-start space-y-5">
          <AnimatedBlock stepIndex={1}>
            <div className="inline-block mb-3 px-2.5 py-1 rounded-full bg-slate-800/70 border border-slate-700 text-xs font-bold text-slate-400">
              補充範例
            </div>
            <h3 className="text-2xl font-bold text-sky-400 mb-3 flex items-center gap-3">
              <MousePointerClick size={24} className="text-sky-400" />
              情境：每週手動整理同一批網頁
            </h3>
            <p className="text-slate-300 text-base leading-relaxed">
              每週把同一個頁面上的清單複製到 Excel，一則一則貼標題、日期、連結。
              <strong className="text-slate-100">這件事每次都一樣，所以它可以變成一支腳本。</strong>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-base font-bold text-slate-100 mb-2">為什麼要開一個真的瀏覽器</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              現在多數網站的內容是<strong className="text-slate-300">你打開之後才由程式算出來的</strong>，
              直接去抓網頁原始碼只會拿到一個空殼。Playwright 是真的開一個瀏覽器、等畫面長出來再抓，
              而且它能點、能填、能捲。上面那個「載入更多」按鈕，就是非得有人去按才看得到後面的資料。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-base font-bold text-slate-100 mb-2">但動手之前，先找有沒有不用爬的路</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              問一句：這個網站有沒有 RSS 或 API？<strong className="text-slate-300">有的話就不要爬。</strong>
              官方出口給的是整理好的資料，網站改版也不會壞；爬蟲是人家一改版就要重修。
            </p>
            <ul className="mt-2.5 space-y-1.5 text-slate-400 text-sm leading-relaxed list-disc pl-4 marker:text-slate-600">
              <li>多數新聞與部落格都有 RSS，網址後面接 <code className="font-mono text-slate-300">/feed</code> 或 <code className="font-mono text-slate-300">/rss</code> 試一次。</li>
              <li>
                技術社群多半有官方 API。想追 AI 趨勢的話，Hacker News 與 arXiv 都有，
                而且都附文件與建議的呼叫頻率，不用自己猜。
              </li>
            </ul>
            <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
              兩邊都沒有的時候，才輪到下面這支腳本。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-700 p-5 rounded-2xl">
            <div className="text-slate-500 text-xs font-bold mb-2.5">Prompt</div>
            <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-slate-300">
              {PROMPT_LINES.map((l, i) => (
                <span key={i} className={l.hi ? 'text-sky-300 font-bold' : undefined}>
                  {l.t}
                  {'\n'}
                </span>
              ))}
            </pre>
            <CopyAction text={PROMPT_TEXT} className="mt-3" />
            <p className="text-slate-500 text-xs leading-relaxed mt-3 pt-3 border-t border-slate-800">
              Playwright 要另外裝，連同它自己那份瀏覽器。
              <strong className="text-slate-400">你不用先裝，跟它說「缺什麼就幫我裝」它會處理。</strong>
            </p>
          </AnimatedBlock>

          <Callout tone="warn" icon={ShieldAlert} label="出去連別人的網站，有三條線要守" stepIndex={5}>
            <ul className="space-y-1.5 list-disc pl-4 marker:text-amber-500/60">
              <li>
                <strong className="text-slate-100">只抓不用登入就看得到的東西。</strong>
                要登入才看得到的，那是別人給你的帳號權限，不是公開資料。
              </li>
              <li>
                <strong className="text-slate-100">抓之前先問它「這個網站的 robots.txt 跟服務條款怎麼寫」。</strong>
                多數網站會寫明哪些路徑不給抓，它讀得懂，你不用自己找。
              </li>
              <li>
                <strong className="text-slate-100">停一秒不是客氣。</strong>
                連續打人家的伺服器，輕則被擋 IP，重則是另一回事。
              </li>
            </ul>
          </Callout>
        </div>

        <div className="flex justify-center items-start h-full pt-6 lg:pt-0">
          <AnimatedBlock stepIndex={4} className="w-full space-y-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
                網頁上看到的
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                {BEFORE.map((b) => (
                  <div key={b} className="border-b border-slate-800 pb-2">
                    {b}
                  </div>
                ))}
              </div>
              <div className="mt-3 inline-block rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-400">
                載入更多 ▾
              </div>
              <p className="text-slate-600 text-xs mt-2.5">要按下去，後面那幾十則才會出現</p>
            </div>

            <div className="flex justify-center text-sky-500 text-sm">↓ 腳本自己開瀏覽器、自己按 ↓</div>

            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/80 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Table2 size={14} className="text-sky-400" />
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">news.csv</span>
              </div>
              <div className="font-mono text-xs text-slate-300 space-y-1.5">
                {AFTER.map((row, i) => (
                  <div key={row} className={i === 0 ? 'text-slate-500' : undefined}>
                    {row}
                  </div>
                ))}
                <div className="text-slate-600">…</div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mt-3 pt-3 border-t border-slate-800">
                下一週再跑一次就好，不用重講一遍。這就是上一頁說的
                <strong className="text-slate-400">「產出一個能重複用的工具」</strong>。
              </p>
            </div>

          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
