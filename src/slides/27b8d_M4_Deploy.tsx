import { Rocket, Globe, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本不存在，而整堂課第一頁賣的核心資產就是「一個有網址的作品」。
 *
 * 原本的狀況：推上 GitHub（前一頁）跟部署（下一頁開頭一段）都沒有 LiveDemo，
 * 兩頁都是用講的，但最後一頁卻寫「你做出來的那個計時器已經在線上」。
 * 開頭承認沒有、結尾宣稱有、中間沒有任何一頁做出它。
 *
 * 所以這一頁的職務只有一個：真的把網址生出來。
 *
 * 2026-10-04 從「兩條路並排」改成只教 Vercel 一條，GitHub Pages 降成一段但書。
 * 原本給兩條的理由是「公司電腦裝不了東西的人走得完 GitHub Pages 那條」，
 * 但 Vercel 同樣不用裝任何東西（瀏覽器登入、選 repo、按 Deploy），那個理由不成立。
 * 真正要處理的是反過來的事：免費帳號的 GitHub Pages 只掛得起 public 的 repo，
 * 而前一頁才剛叫他們「不確定就選 private」，所以兩條並排會讓一半的人走到這裡
 * 才發現沒有那個選項。章節三的部署頁與前一頁都已經把 Vercel 寫成主線
 * （前一頁那句「這種要上線就接 Vercel，它吃 private」），這一頁跟著收斂。
 * 但書還是要留，因為學員會在別的教學裡看到 GitHub Pages，要知道它的限制在哪。
 *
 * Vercel 那張卡刻意不上 sky：它是這一頁唯一一條路，沒有對照對象。
 * 這一頁的兩個強調色額度給了 amber（卡住的五件事）與 emerald（做完你手上會有）。
 *
 * ⚠️ 待查證。這一頁寫死了 Vercel 的登入與 Deploy 流程，以及 GitHub Pages 的
 * Settings → Pages → Source 選分支。平台介面改版比 API 還頻繁，屬於 C-3 那一類。
 * 2026-09-20 與 2026-10-04 兩輪都沒有重查，這一類要實際開一次後台看畫面。
 * 下次改版前連同 27b9_M4_ShipIt.tsx 的四個後台分頁名稱一起走一遍，查完換成 C-1 的三行格式。
 *
 * 「卡住的五件事」那一塊不是補充，是主體的一半：現場真正花掉時間的是這些，
 * 不是那句 prompt。第五條（改完要再推一次）是最多人以為壞掉的地方。
 */
/** Vercel 那四步。再多一步就會變成照抄後台的操作手冊，介面一改版就過期（C-3）。 */
const VERCEL_STEPS = [
  { n: '01', t: '用 GitHub 帳號登入 vercel.com', d: '不用另外註冊，也不用在電腦上裝任何東西。' },
  { n: '02', t: '選你剛推上去的那個 repo', d: 'repo 設成 private 也選得到，授權的時候把它勾進去就好。' },
  { n: '03', t: '按 Deploy，等它跑完', d: '它自己判斷要怎麼打包，計時器這種純前端的專案不用改設定。' },
  { n: '04', t: '拿到網址', d: '長得像「你的專案名.vercel.app」，免費，馬上就能傳給別人。' },
];

const STUCK = [
  {
    q: '它停下來叫我去瀏覽器點同意',
    a: '正常的。第一次推上去要授權 GitHub，它沒辦法幫你點。點完回來跟它說「好了，繼續」。',
  },
  {
    q: '推不上去，說認證失敗',
    a: 'GitHub 現在不收密碼。跟它說「幫我改用瀏覽器授權登入 GitHub」，它會帶你走一次。',
  },
  {
    q: '推上去了，但 Vercel 找不到我的 repo',
    a: 'private 的 repo 要在 Vercel 授權那一步勾進去。回到授權頁面重選一次，把那個 repo 加進可存取的清單。',
  },
  {
    q: '部署成功，但打開是一片空白',
    a: '多半是 index.html 不在 repo 最外層，或程式裡寫死了你電腦上的路徑。把網址跟畫面截圖一起貼給它。',
  },
  {
    q: '我改了東西，但網址上還是舊的',
    a: '改完要再 commit 一次、再 push 一次，平台才會知道要重新上線。這是最多人以為壞掉的地方。',
  },
];

export default function SlideDeploy() {
  return (
    <SlideLayout title="部署上線：把 GitHub 上的專案接上 Vercel" subtitle="Ship It, For Real" icon={Rocket}>
      <LiveDemo kind="claude" note="這一步做完你就有網址了" />

      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-500 font-mono text-xs uppercase tracking-wider">
            Prompt
          </div>
          <p className="text-sky-100 text-base leading-relaxed">
            「幫我把這個資料夾部署到 Vercel。先確認本機打開沒問題，推上 GitHub，再接 Vercel 完成部署。
            需要我去瀏覽器授權的時候停下來告訴我要點哪裡。完成後把網址給我，並且確認那個網址真的打得開。」
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            這段話長，是因為它把<strong className="text-slate-400">要做什麼、什麼時候該停下來問你、做完給你什麼</strong>都講完了。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
              <Globe size={18} />
            </span>
            <div className="min-w-0">
              <div className="text-base font-bold text-slate-100">Vercel 這一條，四步</div>
              <p className="text-slate-500 text-sm">
                前兩步要你自己在瀏覽器點，那是你的帳號，它代不了你同意。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {VERCEL_STEPS.map((v) => (
              <div key={v.n} className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                <span className="font-mono text-xs text-slate-600">{v.n}</span>
                <div className="mt-1 text-sm font-bold text-slate-200 leading-snug">{v.t}</div>
                <p className="mt-2 border-t border-slate-800 pt-2 text-sm leading-relaxed text-slate-500">
                  {v.d}
                </p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-4 border-t border-slate-800 pt-3">
            接上之後，<strong className="text-slate-200">你每推一次，它就自己重新上線一次</strong>，
            網址不會變。這也是為什麼前面要先把專案推上 GitHub：Vercel 看的是那個 repo，不是你的電腦。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" label="另一條你會在別的教學裡看到的路：GitHub Pages" stepIndex={3}>
          在 repo 的 Settings 找到 Pages，Source 選你的分支，存檔，就會拿到
          <span className="font-mono text-slate-300">你的帳號.github.io/專案名</span>，
          好處是不用再開一個平台的帳號。
          <strong className="text-slate-200">但免費帳號的 repo 要設成 public 才掛得上去</strong>，
          而上一頁的建議是不確定就選 private。計時器這種純前端的東西兩邊都跑得起來，
          之後要接資料庫或排程的題目就只有 Vercel 這條走得完，所以這門課一路用它。
        </Callout>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
          <div className="flex items-center gap-2 mb-3 text-base font-bold text-amber-300">
            <TriangleAlert size={18} className="shrink-0" />
            卡住的話，通常是這五件事
          </div>
          <div className="divide-y divide-slate-800/70">
            {STUCK.map((s) => (
              <div key={s.q} className="grid grid-cols-1 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] gap-x-5 py-2.5">
                <div className="text-slate-200 text-sm font-bold leading-relaxed">{s.q}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{s.a}</div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <Callout tone="good" label="做完你手上會有" stepIndex={5}>
          一組<strong className="text-slate-100">別人打得開的網址</strong>，對方不用裝任何東西，手機也開得起來。
          用手機開一次那個網址，不要用你部署的那台電腦，也不要連同一個 wifi。
          手機開得起來，才代表它真的在線上，不是只有你這台打得開。
        </Callout>

      </div>
    </SlideLayout>
  );
}
