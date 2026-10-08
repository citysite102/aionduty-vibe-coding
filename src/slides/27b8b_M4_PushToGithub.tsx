import { CloudUpload, HardDrive, Laptop2, Send, Terminal, KeyRound } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { Callout } from '../components/Callout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 出貨前的 GitHub 動機頁。
 *
 * GitHub 在這份簡報前面出現過三次（部署、版本控制、出貨的 prompt），
 * 但都沒有被定義。這一頁補上定義，下一頁補上判斷。
 *
 * 2026-09-21 補授權那一塊。原本整頁只寫「你不用打任何 git 指令」，
 * 但第一次推上去一定會停在授權，而學員在這之前看到的每一步都是它自己做完的，
 * 所以停下來的時候他會以為壞掉了。這一頁是全片第一次真的要他去瀏覽器登入別人的服務。
 *
 * 三條刻意不寫成操作步驟（不列指令、不列按鈕位置）：GitHub 的登入流程與
 * Claude Code 用哪一種方式認證都會改，寫死就會過期（C 章）。寫的是
 * 「會發生什麼、那一下為什麼要你自己來」，這三件不會變。
 */
const LOSSES = [
  { icon: HardDrive, t: '硬碟壞了', d: '整個專案跟著沒了，沒有第二份。' },
  { icon: Laptop2, t: '換一台電腦', d: '要自己複製資料夾，還常常漏東西。' },
  { icon: Send, t: '想傳給別人看', d: '總不能把整個資料夾壓縮寄過去。' },
];

/**
 * 2026-10-08（講師）這段指令從一句話擴成一次到位的版本。原本那句只交代「推上去」，
 * 學員照著跑完手上是一個沒有說明、別人點進去不知道在幹嘛的專案，而且還要再問一輪
 * private 還是 public。現在直接指定 public（練習專案就是要給人看），
 * 把 README 與金鑰檢查一起寫進同一段，跑完就是完整的。
 *
 * **public 這個決定不要拿掉，但也不要在這裡解釋它。** 什麼時候該選 private 是下一頁的事，
 * 這一頁只留一句「下一頁會講」的提示（畫面上那行小字），順序不要對調。
 *
 * 金鑰那一條寫成「找到先告訴我，不要自己改」，是刻意的：學員這時候還分不出
 * 哪些字串是金鑰，讓它直接動手改會把真的設定值也一起清掉。
 *
 * **畫面上印的字與複製鈕拿到的字共用這一個常數**（A-4），不要為了版面另外寫一份短的。
 */
const PROMPT = `幫我把這個專案推到 GitHub，設成 public。

推之前先做三件事：
1. 檢查 .gitignore 有沒有擋掉 .env 跟 node_modules，再掃一次專案裡有沒有寫死的密碼或 API 金鑰。有的話先告訴我，不要自己改。
2. 幫我寫一份 README.md：這個專案是什麼、畫面上有哪些功能、怎麼在本機跑起來、用到哪些外部服務。
3. 告訴我 repository 要叫什麼名字，描述寫一句話就好。

確認完再建立 repository 並推上去，最後把網址給我。
中間如果需要我去瀏覽器授權，停下來告訴我要按哪裡。`;

export default function SlidePushToGithub() {
  return (
    <SlideLayout
      title="把專案推上 GitHub，它才不只在這台電腦"
      subtitle="Push It to GitHub"
      icon={CloudUpload}
    >
      <LiveDemo kind="claude" note="推完你會拿到一個 GitHub 網址" />
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOSSES.map((l) => {
            const Icon = l.icon;
            return (
              <div key={l.t} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <Icon size={20} className="text-slate-500 mb-3" />
                <div className="text-slate-100 text-base font-bold mb-1.5">{l.t}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{l.d}</p>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-slate-100 text-xl font-bold mb-3">GitHub 就是專案的線上存放處</h3>
          <p className="text-slate-400 text-base leading-relaxed mb-4">
            前面做的存檔點都還在你的電腦裡。推上 GitHub 之後，那些存檔點會有一份在雲端。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-300 text-sm font-bold mb-1.5">給你自己用</div>
              <p className="text-slate-500 text-sm leading-relaxed">換電腦、找回舊版本、給別人看，都從這裡。</p>
            </div>
            <div className="rounded-xl border border-sky-500/30 bg-slate-950 p-4">
              <div className="text-sky-300 text-sm font-bold mb-1.5">給部署平台用</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Vercel 不是讀你的電腦，是讀 GitHub。沒有推上去，後面部署就接不上。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-500 font-mono text-xs uppercase tracking-wider">
            <Terminal size={12} className="text-sky-400" /> Prompt
          </div>
          <p className="text-sky-300 text-base leading-relaxed whitespace-pre-line">{PROMPT}</p>
          <CopyAction text={PROMPT} className="mt-3" />
          <p className="text-slate-500 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            這裡直接寫 public，因為練習專案本來就是要給人看的。
            什麼情況該改成 private，下一頁講。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-base leading-relaxed">
            你不用打任何 git 指令。它會自己建好、推上去，然後把網址給你。桌面版的 Code 頁籤右下角也有按鈕可以按。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" icon={KeyRound} label="它會停在這裡等你，那不是壞掉" stepIndex={5}>
          前面每一步都是它自己做完的，所以第一次推的時候它停下來，多數人以為出錯了。
          <strong className="text-slate-100">沒有出錯，是 GitHub 要確認你是本人。</strong>
          三件事只有你做得到：
          <ul className="mt-2.5 space-y-1.5 list-disc pl-4 marker:text-amber-500/60">
            <li>
              <strong className="text-slate-100">要先有一個 GitHub 帳號。</strong>
              還沒有的話現在去 <span className="font-mono text-slate-300">github.com</span> 註冊一個，免費。
            </li>
            <li>
              <strong className="text-slate-100">第一次要在瀏覽器登入並按同意。</strong>
              它會給你一段文字或一個連結，照著做完再回到對話框跟它說好了。
              這一步跟部署那一段講的授權是同一回事，你的帳號它代不了。
            </li>
            <li>
              <strong className="text-slate-100">private 還是 public 要你決定。</strong>
              上面那句 prompt 已經叫它先問你。裡面有客戶資料或還沒公開的東西就選 private，
              之後隨時改得回來。
            </li>
          </ul>
          <span className="mt-3 block text-slate-400">
            卡住的時候把它給你的那段訊息整段貼回去，跟它說「我看不懂，告訴我現在要點哪裡」。
          </span>
        </Callout>
      </div>
    </SlideLayout>
  );
}
