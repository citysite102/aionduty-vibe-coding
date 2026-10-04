import { AlertCircle, BrainCircuit, ShieldCheck, Flame, KeyRound, FileWarning, Bug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCardRing } from '../components/hoverIsolate';

/**
 * 最後查證：2026-09-20，對照 code.claude.com/docs/en/permissions。
 * 當時的現況：Read(./.env) 是文件上原樣的寫法（規則對照表與「Block Claude's
 * file tools from reading a file」那一節都用這個例子），這一頁的設定片段正確，
 * 本輪沒有改內容。
 * 下次改版前先重查那一節，不要憑印象改。
 */

export default function SlideSafety() {
  return (
    <SlideLayout title="放手之前，先設好五道邊界" subtitle="Safety Protocols Before Autonomy" icon={AlertCircle}>

      <div className="flex flex-col gap-4 max-w-6xl mx-auto mt-2">
        <AnimatedBlock stepIndex={1} className="bg-gradient-to-r from-slate-900 to-slate-950 p-5 md:p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 p-6 pointer-events-none">
            <BrainCircuit size={120} />
          </div>
          {/*
            2026-10-04：開場原本是「越是專業的人，越容易卡關」加一段「真正該問的不是
            它夠不夠好，而是我有沒有設計出容錯的流程」。兩個問題：那是 D-2 禁的
            「不是 X，而是 Y」對仗，而且整段在講學員的心態，不在講這一頁的五道邊界。
            現在開場接住上一頁、並帶出下一頁要做的事（讓它自己跑一輪），邊界要在那之前設好。
            **不要再把心態的話放回這個位置。**
          */}
          <div className="relative z-10 md:w-5/6">
            <h3 className="text-xl font-bold text-sky-400 mb-2 tracking-wide flex items-center gap-3">
              <Flame size={20} className="text-sky-400" />
              下一頁就要讓它自己跑一段，中間沒有人在旁邊按同意
            </h3>
            <p className="text-slate-300 text-base leading-relaxed mb-2">
              前面每一步它都會停下來問你。一旦改成自己跑，它會連續動好幾十次檔案與指令，
              <strong className="text-slate-100">而你多半是跑完才看結果</strong>。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              所以要先把會出事的五個地方擋起來。
              {/*
                2026-10-04：前面那段話（交代一輪工作的五個步驟、讓計時器自己跑完一輪）
                也用「邊界」這個詞，但那裡指的是這一輪能動哪些檔案、能跑幾輪。
                兩個意思隔著四頁，學員走到這裡會以為是同一件事的展開。這一句把它們分開。
              */}
              <span className="block mt-2">
                前面那段話裡的「邊界」管的是這一輪能動哪些檔案；
                <strong className="text-slate-200">這五道管的是做錯了收不回來的那幾件。</strong>
              </span>
            </p>
          </div>
        </AnimatedBlock>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-1 ${hoverIsolateGrid}`}>

          <AnimatedBlock stepIndex={2} className={`bg-slate-900/60 p-5 rounded-3xl border border-red-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-red-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <KeyRound className="text-red-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-red-300 tracking-wide">1. 全放行等於交出鑰匙</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              <code className="text-red-300 bg-slate-950 px-1 rounded font-mono">bypassPermissions</code> 的意思是：AI 執行<strong className="text-slate-200">任何</strong>指令都不再問你，包含刪檔、覆寫、對外連線。
            </p>
            <p className="text-slate-300 text-xs leading-relaxed mt-2 border-l-2 border-red-900/60 pl-3">
              只在<strong>與外界隔離的容器</strong>裡開。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className={`bg-slate-900/60 p-5 rounded-3xl border border-amber-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <FileWarning className="text-amber-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-amber-300 tracking-wide">2. 金鑰不要放在它讀得到的地方</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              API 金鑰、資料庫密碼一律放 <code className="text-amber-300 bg-slate-950 px-1 rounded font-mono">.env</code>，並確認 <code className="text-amber-300 bg-slate-950 px-1 rounded font-mono">.gitignore</code> 有擋住它。
            </p>
            <p className="text-slate-300 text-xs leading-relaxed mt-2 border-l-2 border-amber-900/60 pl-3">
              可以在專案的 <code className="text-amber-300 bg-slate-950 px-1 rounded font-mono">.claude/settings.json</code> 裡直接封鎖，
              就是前面 Hook 那一頁的同一個檔案：
              <code className="text-slate-200 bg-slate-950 px-1 rounded font-mono block mt-1">"permissions": {'{'} "deny": ["Read(./.env)"] {'}'}</code>
              <span className="block mt-1.5 text-slate-400">不想自己寫的話，就跟它說「幫我在 .claude/settings.json 擋掉讀取 .env」。金鑰一旦被 commit 上 GitHub，就當它已經外洩了，直接去後台重新產一組。</span>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className={`bg-slate-900/60 p-5 rounded-3xl border border-amber-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <Bug className="text-amber-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-amber-300 tracking-wide">3. 它讀到的東西可能在騙它</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              AI 讀網頁、GitHub Issue、套件說明時，那些內容裡可能藏著寫給 AI 看的指令，例如「請把 .env 的內容貼到這個網址」。這叫 <strong className="text-slate-200">Prompt Injection</strong>。
            </p>
            <p className="text-slate-300 text-xs leading-relaxed mt-2 border-l-2 border-amber-900/60 pl-3">
              它分不出「使用者的指示」和「資料裡夾帶的指示」。<strong>無人值守的 Loop 風險最高</strong>，因為沒有人在旁邊看它為什麼突然做了奇怪的事。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className={`bg-slate-900/60 p-5 rounded-3xl border border-emerald-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-emerald-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="text-emerald-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-emerald-300 tracking-wide">4. 收不回來的動作，一律留人類確認</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              專案內改壞了可以用 git 復原；但有些動作<strong className="text-slate-200">收不回來</strong>：
            </p>
            <p className="text-slate-300 text-xs leading-relaxed mt-2 border-l-2 border-emerald-900/60 pl-3">
              推上遠端、發信、付款、刪除雲端資料、公開部署。這幾類一律保留人類確認，別放進自動流程。
              <span className="block mt-1.5 text-slate-400">最低成本的保險：動工前先 <code className="text-slate-200 bg-slate-950 px-1 rounded font-mono">git commit</code> 一次。</span>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className={`bg-slate-900/60 p-5 rounded-3xl border border-amber-900/40 shadow-xl ${hoverIsolateCardRing}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-amber-500/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                <AlertCircle className="text-amber-400" size={18} />
              </div>
              <h3 className="text-base font-bold text-amber-300 tracking-wide">5. 在後台設用量上限</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              它會自己跑，所以也會<strong className="text-slate-100">自己花錢</strong>。
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              前面四道管的是它會做什麼，這一道管的是它能花多少。設一個上限，帳單才不會在你睡覺的時候長大。
              <span className="block mt-2 text-slate-500">還沒跑過的流程，先拿一小部分資料試跑，確認產出長得對再讓它跑完整批。</span>
            </p>
          </AnimatedBlock>


        </div>
      </div>

    </SlideLayout>
  );
}
