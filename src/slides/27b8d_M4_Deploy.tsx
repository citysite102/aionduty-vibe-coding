import { Rocket, Globe, Github, TriangleAlert } from 'lucide-react';
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
 * 兩條路都給，因為公司電腦裝不了東西的人一樣走得完 GitHub Pages 那條。
 * 但這兩條不是平行的：免費帳號的 GitHub Pages 只掛得起 public 的 repo，
 * 而前一頁才剛叫他們「不確定就選 private」。兩頁都要寫出這個限制，
 * 否則選了 private 的人會走到這裡才發現沒有那個選項，而且看不出是自己哪裡做錯。
 *
 * 「卡住的五件事」那一塊不是補充，是主體的一半：現場真正花掉時間的是這些，
 * 不是那句 prompt。第五條（改完要再推一次）是最多人以為壞掉的地方。
 */
const ROUTES = [
  {
    icon: Globe,
    name: 'Vercel',
    url: '你的專案名.vercel.app',
    how: '到 vercel.com 用 GitHub 帳號登入，選你剛推上去的那個 repo，按 Deploy。',
    good: '之後每次 push，它會自己重新上線，你什麼都不用做。repo 設成 private 也可以。',
    accent: true,
  },
  {
    icon: Github,
    name: 'GitHub Pages',
    url: '你的帳號.github.io/專案名',
    how: '在 repo 的 Settings → Pages，Source 選你的分支，存檔。',
    good: '不用再開一個平台的帳號，東西全部留在 GitHub。但免費帳號的 repo 要設成 public 才掛得上去。',
    accent: false,
  },
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
    a: 'repo 設成 private 的話，要在 Vercel 授權時勾選那個 repo。或是直接把 repo 改成 public。',
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
    <SlideLayout title="真的把它變成一個網址" subtitle="Ship It, For Real" icon={Rocket}>
      <LiveDemo kind="claude" note="這一步做完你就有網址了" />

      <div className="max-w-6xl mx-auto space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-500 font-mono text-xs uppercase tracking-wider">
            Prompt
          </div>
          <p className="text-sky-100 text-base leading-relaxed">
            「幫我把這個資料夾部署上線。先確認本機打開沒問題，推上 GitHub，再接部署平台完成部署。
            需要我去瀏覽器授權的時候停下來告訴我要點哪裡。完成後把網址給我，並且確認那個網址真的打得開。」
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            這段話長，是因為它把<strong className="text-slate-400">要做什麼、什麼時候該停下來問你、做完給你什麼</strong>都講完了。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROUTES.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedBlock
                key={r.name}
                stepIndex={i + 2}
                className={`rounded-2xl border p-5 ${
                  r.accent
                    ? 'bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      r.accent ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-bold text-slate-100">{r.name}</div>
                    <div className="font-mono text-sm text-slate-500 break-all">{r.url}</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-2">{r.how}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{r.good}</p>
              </AnimatedBlock>
            );
          })}
        </div>

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
