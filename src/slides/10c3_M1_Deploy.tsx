import { Rocket, Home, Store, Globe, Database, TerminalSquare, ExternalLink, KeyRound } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 金鑰那一塊（stepIndex 5）是 2026-09-21 補的。
 *
 * 補的理由：上面那段指令的第 2 步已經叫學員「把金鑰加進 .gitignore」，
 * 但整頁沒有一句話說那之後金鑰要去哪裡。擋住它不進版控只是第一步，
 * 上線之後程式還是要拿得到它，學員走到這裡一定會撞到這個缺口。
 *
 * 四段是一條路，不要拆成四個並列的提醒：本機的 .env、版控的 .gitignore、
 * 平台的環境變數、以及不讓 AI 讀到的 deny。前三段是同一把金鑰換了三個存放
 * 位置，第四段是另一個方向（擋的是 AI 不是擋人）。
 *
 * **最後那個但書不能拿掉。** 只講「放平台的環境變數就安全了」會教出錯的東西：
 * 純前端的專案，打包之後那串字會跟著送到瀏覽器，使用者打開開發者工具就看得到。
 * 真正的解法（可公開的金鑰靠服務端規則擋、不可外流的金鑰放後端）在案例三，
 * 這裡只負責把缺口指出來，不在章節三講完。
 *
 * 用 muted 不用 warn：這一頁已經有 sky 與 emerald 兩個強調色，A-1 上限是兩種。
 *
 * 2026-09-21 再補「你自己做／可以發包」的膠囊。缺口是：整頁在教怎麼發包，
 * 學員很容易連這四段一起叫 AI 做，然後把金鑰貼進對話裡，剛好是這一塊要防的事。
 * 界線是那串金鑰本人會不會經手，不是難不難：01 與 03 碰得到金鑰所以自己做，
 * 02 與 04 只是改設定檔。膠囊走灰階，理由同上，這一頁的兩個強調色額度滿了。
 */
const KEY_FLOW = [
  { where: '你的電腦', how: '.env 這個檔案', self: true, note: '檔案可以請 AI 建，但那串金鑰要自己填進去。' },
  { where: '推上 GitHub', how: '.gitignore 擋住它', self: false, note: '列進去之後，git 根本不會碰它，所以 repo 裡沒有金鑰。' },
  { where: '上線之後', how: '平台後台的環境變數', self: true, note: '在 Vercel 或 Supabase 的後台再填一次，執行的時候平台才餵給程式。那是你的帳號，AI 登不進去。' },
  { where: '對 AI', how: 'settings.json 的 deny', self: false, note: '擋掉讀取 .env，它連看都看不到，也就不會順手貼進對話裡。' },
];

export default function Slide10c3Deploy() {
  return (
    <SlideLayout title="從本機到上線：交給託管平台" subtitle="Deploy: From Localhost to the World" icon={Rocket}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">

        {/* 1. 心智模型：本機能跑 ≠ 別人看得到 */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left">
          <h3 className="text-lg font-bold text-slate-100 mb-4">先建立一個觀念：本機能跑 ≠ 別人看得到</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3 items-start">
              <Home className="text-slate-400 shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-200 block mb-1 text-sm">在你的電腦上跑（本機）</strong>
                <span className="text-slate-400 text-xs leading-relaxed">網址列那串 <code className="font-mono text-slate-300">localhost:5173</code>，<strong className="text-slate-300">localhost 的意思就是「這台電腦」</strong>。傳給別人，他的電腦會去找他自己那台，所以打不開。</span>
              </div>
            </div>
            <div className="border rounded-2xl p-4 flex gap-3 items-start bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
              <Store className="text-sky-400 shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-200 block mb-1 text-base">上線託管（部署）</strong>
                <span className="text-slate-400 text-sm leading-relaxed">放到一台一直開著的電腦上，給它一個<strong className="text-sky-300">網址</strong>，別人才找得到、隨時都打得開。</span>
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3">中間差的這一步，就叫「部署 (Deploy)」。好消息是：<strong className="text-slate-400">你不用自己架伺服器，交給託管平台就好。</strong></p>
          <div className="mt-3 bg-sky-950/20 border border-sky-900/40 rounded-lg px-3.5 py-2.5 text-xs text-slate-400 leading-relaxed">
            🔭 課程最後你會把自己做的任務計時器走完這一步，拿到一個可以傳給別人的網址。
          </div>
        </AnimatedBlock>

        {/* 2. 兩個主打平台，各給白話定義 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-left">

          {/* 前端託管：Vercel */}
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl"><Globe size={20} /></div>
              <div>
                <h4 className="text-base font-extrabold text-sky-400">放上網頁：Vercel</h4>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Frontend Hosting</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              <strong className="text-slate-100">Vercel 是什麼？</strong> 一個「把你的網頁放上網、發給它一個網址」的託管服務。連上 GitHub 之後，你每次更新程式碼，它就<strong className="text-sky-300">自動重新上線</strong>，你完全不用碰伺服器。
            </p>
            {/*
              網址這件事學員問過：部署完到底會拿到什麼、要不要花錢買。
              先講預設就有一個免費的，再講想換自己的要另外買，順序不要反過來，
              不然聽起來像是還要先花一筆錢才有網址。
            */}
            <div className="mb-3 rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-3">
              <div className="text-slate-200 text-sm font-bold mb-1.5">部署完，網址從哪來</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                它會直接給你一個{' '}
                <code className="font-mono text-sky-300">你的專案名.vercel.app</code>{' '}
                的網址，免費，馬上就能傳給別人。
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mt-1.5">
                想換成自己的名字，就去{' '}
                <a href="https://www.godaddy.com/" target="_blank" rel="noreferrer" className="text-slate-400 hover:underline">GoDaddy</a>
                、
                <a href="https://www.cloudflare.com/products/registrar/" target="_blank" rel="noreferrer" className="text-slate-400 hover:underline">Cloudflare</a>
                {' '}這類網域商買一個（一年幾百到一千多元），再回到 Vercel 設定裡指過去。
                <strong className="text-slate-400">先用免費那個也完全沒問題。</strong>
              </p>
            </div>
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
              className="mb-3 inline-flex items-center gap-1.5 font-mono text-sm text-sky-400 hover:underline"
            >
              vercel.com <ExternalLink size={12} />
            </a>
            <div className="mt-auto text-xs text-slate-500 bg-slate-950 px-3 py-2 rounded border border-slate-800/60">
              適合：網頁前端、個人網站、作品集、小工具
              <span className="block text-slate-600 mt-1">
                同類的還有{' '}
                <a
                  href="https://app.netlify.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-sky-400 hover:underline"
                >
                  Netlify
                </a>
                、<strong className="text-slate-500">Cloudflare Pages</strong>、<strong className="text-slate-500">GitHub Pages</strong>。做法幾乎一樣，挑一個就好。
              </span>
            </div>
          </AnimatedBlock>

          {/* 資料庫託管：Supabase */}
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Database size={20} /></div>
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">要存資料 / 會員登入：Supabase</h4>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-mono">Managed Database</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              <strong className="text-slate-100">Supabase 是什麼？</strong> 一個「現成可用的雲端資料庫 ＋ 會員登入」服務。你<strong className="text-emerald-300">不用自己架資料庫伺服器、不用管備份與維運</strong>。這正是繞過「資料庫很複雜」的方法：別自己架，用託管的。
            </p>
            <div className="mt-auto text-xs text-slate-500 bg-slate-950 px-3 py-2 rounded border border-slate-800/60">
              適合：需要帳號登入、儲存貼文 / 訂單等長期資料的網站
              <span className="block text-slate-600 mt-1">（同類還有 Firebase，選一個熟悉即可）</span>
            </div>
          </AnimatedBlock>
        </div>

        {/* 3. 實際指令：讓 Claude Code 幫你部署 */}
        <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 mb-3">
            <TerminalSquare className="text-sky-400" size={18} />
            <h4 className="text-sm font-bold text-slate-200">實際上怎麼做？一句話發包給 Claude Code</h4>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs md:text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed shadow-inner">
            {`幫我把這個資料夾部署到 Vercel：

1. 先在本機開一次，確認畫面正常、沒有錯誤訊息
2. 檢查資料夾裡有沒有不該公開的東西（金鑰、個人資料），有的話加進 .gitignore
3. 建立 Git repository，做第一次 commit，推上我的 GitHub
4. 連結 Vercel 完成部署

需要我登入 GitHub 或 Vercel 授權的時候，停下來告訴我要點哪裡。
完成後把上線網址給我，並確認那個網址真的打得開。
中間任何一步失敗，用白話說明卡在哪，先不要自己重試。`}
          </div>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            這段指令長，是因為它把<strong className="text-slate-400">要做什麼、做完給我什麼、什麼時候該停下來</strong>都講完了。
            指令寫得完整，來回就少。第 3 步那個 Git 是下一段的主題，這裡先知道它是「存一版並送上去」就好。
          </p>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed border-t border-slate-800/60 pt-2">
            <strong className="text-slate-400">不是按一個鍵就好。</strong>
            Agent 能幫你跑完上面四步，但中間你要自己登入 GitHub 和 Vercel 授權，
            那是你的帳號，它沒有辦法代你點同意。真正省下來的是「不用學那些指令」，不是「完全不用動手」。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 mb-1">
            <KeyRound className="text-slate-400" size={18} />
            <h4 className="text-sm font-bold text-slate-200">那第 2 步擋下來的金鑰，後來去哪了？</h4>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            擋住它不進版控只是第一步。上線之後程式還是要拿得到它，
            所以<strong className="text-slate-200">金鑰不跟著程式碼走，它自己有一條路</strong>。
            這四段也不是都能發包：<strong className="text-slate-200">那串金鑰本人會經手的兩段自己動手</strong>，
            把它貼進跟 AI 的對話，等於又送出去一次，而且留在對話紀錄裡。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {KEY_FLOW.map((k, i) => (
              <div key={k.where} className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs text-slate-600">0{i + 1}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    k.self
                      ? 'bg-slate-800 text-slate-200 font-bold'
                      : 'border border-slate-800 text-slate-500'
                  }`}>
                    {k.self ? '你自己做' : '可以發包'}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-200 leading-snug">{k.where}</div>
                <div className="mt-1 font-mono text-xs text-slate-400 break-all">{k.how}</div>
                <p className="mt-2 border-t border-slate-800 pt-2 text-xs leading-relaxed text-slate-500">
                  {k.note}
                </p>
              </div>
            ))}
          </div>

          <Callout tone="muted" label="但純前端的專案，金鑰藏不住" className="mt-4">
            程式碼被送到瀏覽器的那一刻，裡面的字串使用者打開開發者工具就看得到，
            放在平台的環境變數也一樣。所以需要金鑰的 API，要嘛用那種
            <strong className="text-slate-200">本來就設計成可以公開</strong>的金鑰，靠服務那一端的規則限制它能做什麼；
            要嘛就得有一層後端替你保管。案例三會實際走一次這個取捨。
          </Callout>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
