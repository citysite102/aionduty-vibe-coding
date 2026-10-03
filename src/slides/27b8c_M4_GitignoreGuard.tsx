import { ShieldAlert, Eye, Lock } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * GitHub 單元的第二頁：兩個判斷。
 *
 * .gitignore 是學員親手設的第一道「機制」，不是寫給 AI 看的規則，
 * 所以這一頁刻意回扣規則歸位的第一格。
 *
 * 2026-10-03 補「它怎麼知道那是金鑰」那一塊。來源是學員在章節六會問的同一題：
 * 「不能把密碼或金鑰寫進程式碼裡」這種規則，程式真的判斷得出來嗎？
 * 最後查證 2026-10-03，對照 docs.github.com 的 About secret scanning 與 About push protection：
 *   - 「scans your entire Git history on all branches of your repository for hardcoded
 *     credentials, including API keys, passwords, tokens, and other known secret types」
 *   - partner patterns（各家服務的固定長相，掃到會通知供應商撤銷）＋ custom patterns（自訂正規式）
 *   - 公開 repo「Secret scanning runs automatically for free」
 *   - push protection：「When push protection detects a potential secret during a push attempt,
 *     it will block the push and provide a detailed message explaining the reason for the block.」
 * 限制那一句是這一塊的重點，不要砍：它認得的是「長得像金鑰的字串」，
 * 自己取的人類密碼要靠變數名稱那類關鍵字規則去猜，會漏。所以根本解是不要寫進程式碼。
 */
const NEVER_PUSH = ['.env（放金鑰的那個檔案）', 'API 金鑰、資料庫密碼', '客戶名單、個資、還沒公開的合約'];

export default function SlideGitignoreGuard() {
  return (
    <SlideLayout title="金鑰和客戶資料不能跟著推上去" subtitle="What Not to Push" icon={ShieldAlert}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <Eye size={18} className="text-slate-400" />
              <h3 className="text-base font-bold text-slate-100">判斷一：公開還是不公開</h3>
            </div>
            <div className="space-y-2 text-sm leading-relaxed">
              <p className="text-slate-400">
                <span className="font-mono text-slate-300">public</span>　想當作品集給人看、想讓人試用。
                <span className="block text-slate-500">免費帳號要用 GitHub 自己掛網頁，只能選這個。</span>
              </p>
              <p className="text-slate-400">
                <span className="font-mono text-slate-300">private</span>　跟工作有關、裡面有客戶的東西。
                <span className="block text-slate-500">這種要上線就接 Vercel，它吃 private。</span>
              </p>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              不確定就選 private，之後隨時可以改成公開，反過來很麻煩。
              這一格選什麼，會決定你上線能走哪一條路。
            </p>
          </div>

          <div className="rounded-2xl border p-5 bg-rose-500/5 border-rose-500/25">
            <div className="flex items-center gap-2.5 mb-3">
              <Lock size={18} className="text-rose-400" />
              <h3 className="text-base font-bold text-slate-100">判斷二：哪些檔案不跟著走</h3>
            </div>
            <ul className="space-y-2">
              {NEVER_PUSH.map((n) => (
                <li key={n} className="flex gap-3 text-slate-300 text-base leading-relaxed">
                  <span className="text-rose-400 shrink-0">✕</span>
                  {n}
                </li>
              ))}
            </ul>
            <p className="text-slate-500 text-base leading-relaxed mt-3">
              推上 public 之後才發現，刪掉也來不及，紀錄裡還留著。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-2xl border px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <div className="text-sky-400 font-bold text-base mb-2">這是你自己設的第一道機制</div>
          <p className="text-slate-300 text-base leading-relaxed">
            擋住這些檔案的東西叫 <code className="font-mono text-sky-300">.gitignore</code>。
            列在裡面的檔案，git 根本不會碰。這份清單是你自己列的，
            跟它說「<span className="text-slate-200">幫我建一份 .gitignore，把金鑰、環境設定與客戶資料擋掉</span>」它就幫你建好。
            這就是前面規則歸位的第一格：<strong className="text-slate-100">會出事的交給機制，不要只寫進手冊</strong>。
            差別在於這次是程式在擋，不經過 AI 的判斷。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="text-slate-100 font-bold text-base mb-2">它怎麼知道那串字是金鑰？</div>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            這種檢查不是看得懂你的密碼，是比對長相。三種做法疊在一起：
          </p>
          <ul className="space-y-2 text-slate-400 text-sm leading-relaxed">
            <li className="flex gap-2.5">
              <span className="text-slate-600 shrink-0">1</span>
              <span>
                <strong className="text-slate-300">固定格式</strong>：各家服務的金鑰有自己的開頭與長度，有的還帶檢查碼，
                所以一看就認得出是哪一家的。GitHub 認得的這一組叫 partner patterns，掃到還會通知那家服務把它作廢。
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-slate-600 shrink-0">2</span>
              <span>
                <strong className="text-slate-300">旁邊的名字</strong>：那串字前面寫著 password、api_key、token 這類字眼。
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-slate-600 shrink-0">3</span>
              <span>
                <strong className="text-slate-300">像不像亂碼</strong>：一長串沒有規律、唸不出來的英數字，本來就不像人會寫的文字。
              </span>
            </li>
          </ul>
          <p className="text-slate-400 text-sm leading-relaxed mt-3">
            跑的位置有兩個：掛在你機器上的檢查可以在推出去之前就擋下來；GitHub 那邊也會自己掃，
            公開的專案免費，而且掃的是整段歷史紀錄，不是只看這一次。偵測到的時候它會直接把那一次推送擋掉，並告訴你擋在哪一行。
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mt-2">
            但它認得的是「長得像金鑰的字串」。你自己取的那種好記的密碼，它只能靠第 2 點去猜，猜不到就漏了。
            <strong className="text-slate-300">所以真正的解法是一開始就不要寫進程式碼</strong>，放進{' '}
            <code className="font-mono text-slate-300">.env</code> 再用{' '}
            <code className="font-mono text-sky-300">.gitignore</code> 擋住，掃描只是最後一道。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            推上去之後，Vercel 綁一次 GitHub 就好。之後你只要說「幫我更新上線」，它推完，網站自己跟著換新版。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
