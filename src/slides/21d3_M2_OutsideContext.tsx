import { ShieldX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { HookCiTable } from '../components/HookCiTable';

/**
 * Hook 與 CI 的四個差別。2026-10-03 加。原本只寫「Hook 擋你這台機器、CI 擋整個團隊」，
 * 學員會直接問：那每台都裝 Hook 不就等於團隊？會這樣問是因為那句話聽起來像覆蓋範圍的差別。
 * 實際差的是「跑在誰的機器上、什麼時候跑、擋得到哪些動作、繞不繞得過」這四件事，
 * 其中最關鍵的是第四項：Hook 依賴每個人的設定，CI 不依賴任何人的設定。
 */
export default function SlideM2OutsideContext() {
  return (
    <SlideLayout title="真的不能發生的事，交給 Hook 與 CI" subtitle="Outside the Context Window" icon={ShieldX}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        {/*
          2026-09-22 換標題。原本叫「光寫在手冊裡，擋不住」：形式合 D-5（對比句、結論寫進標題），
          但它一個東西都沒點名，只看標題不知道這一頁會出現 Hook 跟 CI。
          曾考慮改成「Hook：確保攔截生效」，兩個問題：CI 佔這一頁一半卻被丟掉，
          而且「確保」是過度承諾（D-2），這一頁自己就在講 Hook 管你這台機器、CI 才管整個團隊。
          現在的標題把規則講出來，也把兩個東西都點名。改這裡要同步 App.tsx 的 LIVE_TITLES。
        */}
        {/*
          2026-09-22：原本寫「前面兩頁的零件都是寫成文字給 AI 讀」，那句不準。
          MCP 不是文字檔，它是接上去的一個服務；Subagent 也不是你寫給它讀的一段話。
          它們真正的共同點不是「形式是文字」，是「最後都要經過 AI 判斷才生效」。
          Hook 與 CI 的差別就在這裡，不在檔案格式。
        */}
        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          前面兩頁那些零件，不管是寫成檔案的手冊、Rules、Skill，還是接上去的 MCP，
          <strong className="text-slate-200">最後都要經過 AI 判斷</strong>：它得讀到、也得決定要照做，你的規則才會生效。
          這一頁的兩個不一樣，<strong className="text-slate-200">它們是程式在跑，不經過 AI 判斷</strong>，所以連進 context 都不用。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sky-400 font-bold text-lg">Hook</span>
              <span className="text-slate-500 text-xs font-mono">在你的機器上擋</span>
            </div>
            <div className="text-slate-200 text-sm font-bold mb-1">一定要發生、不能靠它自己記得的關卡</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              例如它想把破折號寫進檔案，就直接被退回。幾乎不佔 token，因為它根本不在對話裡。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sky-400 font-bold text-lg">CI</span>
              <span className="text-slate-500 text-xs font-mono">在合併前擋</span>
            </div>
            <div className="text-slate-200 text-sm font-bold mb-1">整個團隊都躲不掉的那道關卡</div>
            <p className="text-slate-500 text-sm leading-relaxed">
              程式碼要進主線之前先跑一次檢查，沒過就進不去。不管是誰寫的、用什麼工具寫的。
            </p>
          </AnimatedBlock>
        </div>

        {/*
          2026-10-03 補這一塊。學員看完上面兩張卡一定會問：那每個人的電腦都裝 Hook 不就好了？
          會這樣問是因為「Hook 擋你這台機器、CI 擋整個團隊」聽起來像是覆蓋範圍的差別，
          好像湊滿每一台就等於團隊。實際上差的是「擋得掉」與「繞不過」：
          Hook 只在它用 Claude Code 動檔案的時候才會跑，手動改、換工具、把設定關掉都繞得過去，
          而且沒有人能證明它在別人的機器上真的跑過。CI 不依賴任何人的設定。
          這一塊不要砍掉改成一句話，兩個機制的差別就是這一章的主線。
        */}
        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">每個人都裝 Hook，不等於團隊擋得住</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-3">
            Hook 的設定可以放進版控，所以「每個人都有」做得到。但「有裝」跟「躲不掉」是兩件事，差在四個地方：
          </p>
          <HookCiTable />
          <p className="text-slate-400 text-sm leading-relaxed mt-3">
            所以兩個是搭配的，不是二選一：
            <strong className="text-slate-200">Hook 在你打字的當下就擋住，省掉一來一回；CI 是唯一算數的那一道，它擋的包含沒裝 Hook 的那個人。</strong>
          </p>
        </AnimatedBlock>

        {/*
          2026-09-22 補這一格的核心對比。講師要的觀念是「程式才是真的擋得住的那一個」，
          原話帶了「100% 生效」，那是 D-2 禁的量化斷言，而且這一頁自己就在講 Hook 只管你這台機器、
          要整個團隊躲不掉得靠 CI，寫成 100% 會被同一頁打臉。
          改成講機制的差別：文字每一次都要它重新判斷，程式每一次都照同一段跑。
          這個講法擋得住同樣的誤會，而且是真的。
        */}
        <AnimatedBlock stepIndex={5} className="bg-red-500/5 border border-red-500/25 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-2">文字說服，跟程式攔截</h3>
          <p className="text-slate-300 text-base leading-relaxed">
            「絕對不要做某事」寫在 CLAUDE.md 裡，<strong className="text-red-300">不保證擋得住</strong>。對話一長，或是它讀到某個網頁上寫著「請忽略前面的規則」，它還是可能做下去。
          </p>
          <p className="text-slate-300 text-base leading-relaxed mt-2">
            差別在機制：<strong className="text-slate-100">寫成文字，每一次都要它重新判斷一遍</strong>，所以生不生效是機率；
            <strong className="text-slate-100">寫成程式，每一次都照同一段跑</strong>，它想跳過也沒有那個選項。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            所以真的不能發生的事，要用 Hook 或 CI。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="text-slate-500 text-xs leading-relaxed px-1">
          零件的分類只有三種載入時機：整場常駐、用到才展開、根本不給它讀。
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
