import { Rocket, Home, Store, Globe, Database, TerminalSquare } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

export default function Slide10c3Deploy() {
  return (
    <SlideLayout title="從本機到上線：交給託管平台" subtitle="Deploy: From Localhost to the World" icon={Rocket}>
      <LiveDemo kind="browser" note="看 Vercel 的實際畫面" />
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">

        {/* 1. 心智模型：本機能跑 ≠ 別人看得到 */}
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left">
          <h3 className="text-lg font-bold text-slate-100 mb-4">先建立一個觀念：本機能跑 ≠ 別人看得到</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex gap-3 items-start">
              <Home className="text-slate-400 shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-200 block mb-1 text-sm">在你的電腦上跑（本機）</strong>
                <span className="text-slate-400 text-xs leading-relaxed">像在<strong className="text-slate-300">自家廚房</strong>做菜自己吃。只有你這台電腦看得到，關機就沒了。</span>
              </div>
            </div>
            <div className="bg-slate-950 border border-l-4 border-l-indigo-500 border-slate-800 rounded-xl p-4 flex gap-3 items-start">
              <Store className="text-indigo-400 shrink-0 mt-0.5" size={20} />
              <div>
                <strong className="text-slate-200 block mb-1 text-sm">上線託管（部署）</strong>
                <span className="text-slate-400 text-xs leading-relaxed">像<strong className="text-indigo-300">開店營業</strong>，要有一個店面地址（<strong className="text-indigo-300">網址</strong>），別人才找得到、24 小時都能用。</span>
              </div>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3">中間差的這一步，就叫「部署 (Deploy)」。好消息是：<strong className="text-slate-400">你不用自己架伺服器，交給託管平台就好。</strong></p>
          <div className="mt-3 bg-sky-950/20 border border-sky-900/40 rounded-lg px-3.5 py-2.5 text-[11px] text-slate-400 leading-relaxed">
            🔭 <strong className="text-sky-300">先記著這一頁。</strong>
            課程最後你會把自己做的任務計時器走完這一步，拿到一個可以傳給別人的網址。
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
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Frontend Hosting</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              <strong className="text-slate-100">Vercel 是什麼？</strong> 一個「把你的網頁放上網、發給它一個網址」的託管服務。連上 GitHub 之後，你每次更新程式碼，它就<strong className="text-sky-300">自動重新上線</strong>，你完全不用碰伺服器。
            </p>
            <div className="mt-auto text-[11px] text-slate-500 bg-slate-950 px-3 py-2 rounded border border-slate-800/60">
              適合：網頁前端、個人網站、作品集、小工具
              <span className="block text-slate-600 mt-1">同類的還有 <strong className="text-slate-500">Netlify</strong>、<strong className="text-slate-500">Cloudflare Pages</strong>、<strong className="text-slate-500">GitHub Pages</strong>。做法幾乎一樣，挑一個就好。</span>
            </div>
          </AnimatedBlock>

          {/* 資料庫託管：Supabase */}
          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Database size={20} /></div>
              <div>
                <h4 className="text-base font-extrabold text-emerald-400">要存資料 / 會員登入：Supabase</h4>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-mono">Managed Database</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              <strong className="text-slate-100">Supabase 是什麼？</strong> 一個「現成可用的雲端資料庫 ＋ 會員登入」服務。你<strong className="text-emerald-300">不用自己架資料庫伺服器、不用管備份與維運</strong>。這正是繞過「資料庫很複雜」的方法：別自己架，用託管的。
            </p>
            <div className="mt-auto text-[11px] text-slate-500 bg-slate-950 px-3 py-2 rounded border border-slate-800/60">
              適合：需要帳號登入、儲存貼文 / 訂單等長期資料的網站
              <span className="block text-slate-600 mt-1">（同類還有 Firebase，選一個熟悉即可）</span>
            </div>
          </AnimatedBlock>
        </div>

        {/* 3. 實際指令：讓 Claude Code 幫你部署 */}
        <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-left">
          <div className="flex items-center gap-2 mb-3">
            <TerminalSquare className="text-indigo-400" size={18} />
            <h4 className="text-sm font-bold text-slate-200">實際上怎麼做？一句話發包給 Claude Code</h4>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs md:text-sm text-emerald-300 whitespace-pre-wrap leading-relaxed shadow-inner">
            {`幫我把 mission-timer 部署到 Vercel：\n1. 先確認本機打開沒有錯誤\n2. 建立 Git repository 並推上 GitHub\n3. 連結 Vercel 完成部署，最後把上線網址給我`}
          </div>
          <p className="text-slate-500 text-[11px] mt-2">上線也是一種「發包」：你當指揮官下達目標，平台負責維運，Agent 負責執行步驟。</p>
          <p className="text-slate-500 text-[11px] mt-2 leading-relaxed border-t border-slate-800/60 pt-2">
            <strong className="text-slate-400">不是按一個鍵就好。</strong>
            Agent 能幫你跑完上面三步，但中間你要自己登入 GitHub 和 Vercel 授權，
            那是你的帳號，它沒有辦法代你點同意。真正省下來的是「不用學那些指令」，不是「完全不用動手」。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
