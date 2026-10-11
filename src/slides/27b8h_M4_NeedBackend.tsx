import { ServerCog, KeyRound, Clock, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 2026-10-10（講師）從 `27b8g_M4_ArchGap` 拆出來。那一頁原本把「現況＋加登入」
 * 與「什麼時候需要後端＋怎麼做」四塊都裝在同一頁，實機看會溢出，而且是兩個主題。
 * **不要合回去。** 前一頁講的是現在就做得到的事，這一頁講的是之後才會用到的。
 *
 * 2026-10-10（講師）標題與開場從「真的需要後端」改成「要自己寫後端」。
 * 原本的講法不準：Supabase Auth 本身就是跑在伺服器上的後端，只是別人幫你寫好了。
 * **這一頁的分界是「現成的後端」對上「你自己寫的後端」，不是「有沒有後端」。**
 * 三種情況的共同點也跟著補上後半句：不只是不能在瀏覽器裡做，還要沒有現成的服務可用，
 * 不然答案會是「去找一個服務」而不是「自己寫一段」。
 *
 * 這一頁的重點不是教人寫後端，是把「後端」從一個嚇人的詞變成三個看得懂的情況，
 * 加一段可以直接貼的 Prompt。
 *
 * Prompt 的題目換過兩次：先是留空給學員自己填（講師要求給一個真的功能），
 * 再來是「本週摘要」（講師說太無聊）。現在是「艦長講評」。
 * 挑題目的三個條件，**換的時候要重新檢查**：
 *   1. 接得上既有的航行日誌，學員不用先做別的東西。
 *   2. 唯一的祕密就是那把 AI 金鑰，剛好是這一頁第一格講的那一類。
 *   3. 它得真的需要 AI。「最常中斷的時段」前端自己算得出來，但「用艦長的口氣講評」
 *      加「下一句指令」不行，所以那兩個要一起留著，少一個學員就會問
 *      「這前端自己做不就好了」。
 * 口氣設定成艦長是接整門課的任務敘事（mission-timer、航行日誌）。
 * **不要用「指揮官」**，那個詞在章節七是 Orchestrator 的譯名（D-4），會撞。
 *
 * 第 5 點是刻意的驗收：它接回〈哪一種金鑰可以寫進程式碼〉那一頁叫學員按右鍵
 * 看原始碼的那個動作，**同一招再用一次**，這次看的是請求裡沒有金鑰。
 *
 * 第一格 2026-10-10 改過：原本寫「要用不能外流的金鑰」，講師反映太抽象。
 * 「不能外流」是結論不是感受，改成講後果（按用量計費、別人拿去打、帳單寄給你），
 * 學員才知道為什麼非擋不可。**不要改回「不能外流」那種講法。**
 *
 * **最後那一句（後端不會自動幫你擋人）不能拿掉。** 加一層後端很容易被誤會成
 * 「這樣就只有我能寫了」，但那支網址一樣公開，誰都打得到。要限定是誰，
 * 還是得先有登入。少了這一句，這一頁會把學員推去做一件解不掉他問題的事。
 *
 * 2026-10-10（同日）原本三步是獨立一塊卡片，加上 Prompt 之後整頁溢出。
 * 那三步跟 Prompt 講的是同一件事（Prompt 第 3、4 點就是第 2、3 步），
 * 所以把三步收進 Prompt，底下只留兩行說明。**不要把三步加回來。**
 *
 * **環境變數那一句不能拿掉。** 那一欄從章節三講到現在都還沒用上，
 * 前面兩頁才剛說「你的計時器用不到它」，這裡是它第一次真的派上用場，
 * 少了這一句那條線就斷在半空中。
 *
 * 走 Vercel 不是因為 Supabase 不行（Edge Functions 一樣是後端），
 * 是因為這條路最短：加一個資料夾、金鑰填進同一個後台，不用裝 CLI 也不用多一個部署步驟。
 * **Supabase 那條要留著並列**，學員上一頁才剛知道 Supabase 不只是資料庫，
 * 只寫 Vercel 會讓他以為非換平台不可。
 *
 * 最後查證：2026-10-10。Supabase Edge Functions 是 server-side，secrets 存在專案的
 * secrets 裡不會進瀏覽器（supabase.com/docs/guides/functions）；Vercel Functions 是在
 * 同一個專案加一個 `api/hello.js`，跑在伺服器端，讀得到後台設定的環境變數
 * （vercel.com/docs/functions）。免費額度與介面名稱是 C-3 最會動的那一類，改版前重查。
 */
const WHEN = [
  {
    icon: KeyRound,
    t: '要用會被拿去花你錢的金鑰',
    d: '最常見的是叫 AI 幫使用者寫東西。那把 API 金鑰按用量計費，放進網頁就等於公開，別人拿去打，帳單寄給你。寄信、收款的也一樣。',
  },
  {
    icon: Clock,
    t: '要定時做事',
    d: '每天早上八點寄一封報表。沒有人打開網頁的時候也要跑，就不能靠訪客觸發。',
  },
  {
    icon: ShieldCheck,
    t: '要做繞不過的檢查',
    d: '例如名額只剩一個、兩個人同時按。這種判斷放在前端會被繞過，案例三整段在講。',
  },
];

const PROMPT = `幫我在計時器加一個「艦長講評」，用一支放在 Vercel 的後端程式。

1. 先列出你要做哪幾步，等我說可以再動檔案
2. 要做的事：前端把本週的航行日誌送給它，它呼叫 AI 用任務艦長的口氣講評這一週，要指出我最常中斷的是哪個時段，最後下一句下週的指令
3. 這支程式放在 api/ 資料夾。AI 金鑰我自己填進 Vercel 後台的環境變數，你只要告訴我變數叫什麼名字，程式碼裡不要出現金鑰
4. 前端只呼叫這支程式的網址，不要在前端碰那把 AI 金鑰
5. 做完告訴我怎麼確認：我要能在開發者工具看到請求送去的是我自己的網址，而且裡面沒有金鑰`;

export default function SlideNeedBackend() {
  return (
    <SlideLayout
      title="什麼時候要自己寫後端，以及怎麼做"
      subtitle="When You Need a Backend"
      icon={ServerCog}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3.5 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          登入那一段 Supabase 幫你寫好了。那什麼情況沒有現成的可以用？
          <strong className="text-slate-100">三種，共同點是不能在訪客的瀏覽器裡做，而且只有你的專案知道規則。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {WHEN.map((w, i) => {
            const Icon = w.icon;
            return (
              <AnimatedBlock key={w.t} stepIndex={i + 2} className="rounded-2xl border border-slate-800 bg-slate-900 p-3.5">
                <div className="flex items-center gap-2 text-base font-bold text-slate-100 mb-2">
                  <Icon aria-hidden="true" size={18} className="text-sky-400 shrink-0" />
                  {w.t}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{w.d}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={5}>
          <CopyBlock
            text={PROMPT}
            size="xs"
            note="真的要做的時候照這段講，換成你自己要的功能。部署不用另外做，推上去就好"
          />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} as="p" className="text-slate-400 text-sm leading-relaxed">
          <strong className="text-slate-200"><code className="font-mono text-slate-300">api/</code> 是 Vercel 的規定</strong>
          ：放這裡的檔案不送去瀏覽器，改成在它的電腦上執行，自動配一個網址；
          <strong className="text-slate-200">金鑰那一欄</strong>到這裡才真的用上。
          Supabase 的 Edge Functions 是同一套。但後端不會幫你擋人，
          那支網址一樣公開，要限定是誰還是得先有登入。
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
