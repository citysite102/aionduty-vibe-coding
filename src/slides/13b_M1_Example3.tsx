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
 * 這一頁的例子是兩段式的，不要拆開或簡化成一段：清單走官方 API，內文才用 Playwright。
 * 兩段合起來才證明得了「先找出口」不是一句原則，它就是同一支腳本的前半段。
 *
 * 最後查證：2026-09-21。
 *   - news.ycombinator.com/robots.txt 當時寫著 Crawl-delay: 30，首頁本身沒有被 Disallow，
 *     但每 30 秒抓一次等於抓 20 篇要等 10 分鐘。這是「為什麼用 API」最好的實證，
 *     而且學員自己打得開那個檔案驗證。
 *   - 官方 API 在 hacker-news.firebaseio.com/v0/（文件 github.com/HackerNews/API），
 *     當時文件寫著沒有速率限制。
 *   - 連出去的那些文章各是各的網站，沒有共通的 API，那一段才輪到瀏覽器。
 * 下次改版前重抓那份 robots.txt，Crawl-delay 的數字會變。
 *
 * 「先找出口」那一塊不要拿掉，它排在 prompt 前面是刻意的。
 * 最後查證：2026-09-21。Hacker News 的官方 API 在 hacker-news.firebaseio.com/v0/
 * （文件 github.com/HackerNews/API，當時寫著沒有速率限制）；arXiv 的在
 * export.arxiv.org/api/query，回傳 Atom，另有每日 RSS，官方建議的速率是
 * 每秒 4 次、每一批之間停 1 秒，並要求先讀它的 Terms of Use。
 * 這兩個舉例會過期，下次改版前重查 info.arxiv.org/help/api 與那份 GitHub 文件。
 */
const PROMPT_LINES: { t: string; hi?: boolean }[] = [
  { t: '幫我寫一個腳本放在 hn-digest 資料夾，分兩段做。' },
  { t: '' },
  { t: '第一段，拿清單。用官方 API，不要爬網頁：', hi: true },
  { t: '打 hacker-news.firebaseio.com/v0/topstories.json 取前 20 個 id，' },
  { t: '再逐個打 /v0/item/<id>.json，取 title、url、score。' },
  { t: '' },
  { t: '第二段，抓內文。這一段才用 Playwright：' },
  { t: '1. 逐篇打開第一段拿到的 url，等內文出現' },
  { t: '2. 抓正文的純文字，去掉導覽列、留言與廣告' },
  { t: '3. 一篇存成一個 articles/<id>.txt' },
  { t: '4. 每一篇之間停 2 秒', hi: true },
  { t: '5. 沒有外連網址的（Ask HN 那種）或打不開的就跳過，不要讓整支掛掉' },
  { t: '' },
  { t: '最後把 score、title、url 存成 digest.csv，用 UTF-8 with BOM。' },
  { t: '' },
  { t: '第一次用 headless: false 跑，我要看到瀏覽器真的在動。', hi: true },
];

const PROMPT_TEXT = PROMPT_LINES.map((l) => l.t).join('\n');

/** 右欄：清單長什麼樣，與跑完之後資料夾裡有什麼。 */
const BEFORE = [
  { score: 412, t: 'What Sun got wrong', host: 'bcantrill.dtrace.org' },
  { score: 287, t: 'Show HN: 我做了一個⋯', host: 'github.com' },
  { score: 153, t: 'Ask HN: 你們怎麼⋯', host: '（沒有外連網址）' },
];
const AFTER = [
  'digest.csv',
  'articles/44921038.txt',
  'articles/44920117.txt',
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
              而且它能點、能填、能捲。Hacker News 連出去的那些文章什麼寫法都有，靠猜不如直接開一個瀏覽器把畫面上的字拿下來。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="text-base font-bold text-slate-100 mb-2">先找有沒有不用爬的路</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Hacker News 自己就寫了答案。打開{' '}
              <code className="font-mono text-slate-300">news.ycombinator.com/robots.txt</code>，
              第一行是 <code className="font-mono text-slate-300">Crawl-delay: 30</code>，
              <strong className="text-slate-300">意思是每 30 秒才准抓一次，抓 20 篇要等 10 分鐘。</strong>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mt-2.5">
              但它有官方 API，沒有這個限制。所以清單走 API。
              至於那 20 篇連出去的文章，各是各的網站、沒有共通的出口，
              <strong className="text-slate-300">那一段才輪到瀏覽器。</strong>
            </p>
            <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
              換成別的網站也是同一個順序：先看 RSS（網址後面接 <code className="font-mono text-slate-400">/feed</code>），
              再看有沒有 API，都沒有才爬。這件事你不用自己查，問它就好。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-700 p-5 rounded-2xl">
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
              <br />
              跑完回到對話框說「把 <code className="font-mono text-slate-400">articles</code> 裡那幾篇各用中文講三句給我」。
              腳本負責把東西搬回來，讀懂是對話的事，兩邊不要混在一起。
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
          <AnimatedBlock stepIndex={2} className="w-full space-y-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">
                網頁上看到的
              </div>
              <div className="space-y-2.5 text-sm text-slate-300">
                {BEFORE.map((b) => (
                  <div key={b.t} className="flex items-baseline gap-2.5 border-b border-slate-800 pb-2.5">
                    <span className="font-mono text-xs text-slate-500 shrink-0 w-8 text-right">{b.score}</span>
                    <span className="min-w-0">
                      {b.t}
                      <span className="block font-mono text-xs text-slate-600">{b.host}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 text-xs mt-2.5">第三則沒有外連網址，腳本會跳過</p>
            </div>

            <div className="flex justify-center text-sky-500 text-sm">↓ API 拿清單，再逐篇開瀏覽器抓內文 ↓</div>

            <div className="rounded-2xl border border-sky-500/30 bg-slate-900/80 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Table2 size={14} className="text-sky-400" />
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider">hn-digest/</span>
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
            明天再跑一次就好，不用重講一遍。這就是上一頁說的
                <strong className="text-slate-400">「產出一個能重複用的工具」</strong>。
              </p>
            </div>

          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
