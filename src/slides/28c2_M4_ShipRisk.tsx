import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-5 第三頁。上一頁交出一套跑得動的流程，這一頁問它交不交得出去。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁現在只做一件事：**把「交得出去」拆成功能、品質、安全三個面向**，
 * 再用同一個登入功能示範同一件事可以有三種驗收要求。下一頁接 OWASP。
 *
 * ── 被指名刪掉的敘述，不要寫回來 ─────────────────────────
 *   「其中兩層它不會主動告訴你。」
 *   「它不會主動說，要拿規格一條一條對。」
 *   「它不會主動說，而且畫面上完全看不出來。」
 * 理由：那是把「AI 會不會主動檢查」寫成一種固定的能力限制，而它其實取決於
 * **你有沒有事先定義標準、有沒有給它檢查的工具、有沒有要求它交出核對得了的證據**。
 * 現在那個位置寫的是「驗的方式」，而不是「它會不會說」。
 *
 * 「需求裡沒有寫的它不會做」那一句留著（壓成一行），它是上面那件事的因：
 * 你說「做一個可以登記報名的頁面」，它就做了一個可以登記報名的頁面，
 * 而「擋住不該進來的人」沒有人說過，所以那件事不會出現。
 *
 * ── 2026-11-09 從這一頁移出去的四塊（暫時沒有新家，講師要決定）──────
 *   1. 三個數字（99% 的受測網站至少一個資安問題／42.3 對 9.6／約 2,000 個沒有登入的工具）
 *   2. 台灣 2026/08 What'Sub 的案例與 INSIDE 專訪
 *   3. 影子 AI 那個琥珀框
 *   4. 「為什麼會這樣，而且跟你的程度無關」的完整三行版本
 * 出處先留在這裡，要用的時候不必重查（**數字都是 2026-10-10 查到的二手轉述，
 * 要再用一定要重查，連結點不開或對不上的時候整塊拿掉比改數字安全**）：
 *   Reeve 與 Symbiotic 的數字 https://aiqkangber.com/blog/security-vulnerabilities-in-vibe-coding
 *   Red Access 的影子 AI 調查 https://www.ithome.com.tw/news/176269
 *   What'Sub 專訪 https://www.inside.com.tw/article/42420-lean-ai-vibe-coding-whatsub-subtitle-tool
 *
 * **底下那一句「功能正常，不代表符合需求；符合需求，也不代表沒有安全風險。」
 * 是講師指定的原句。** 形狀上接近頂真，但它就是這一頁的論點，不要在掃對仗時改掉。
 *
 * 三個面向是**這門課用的教學框架**，不是嚴格互斥的軟體品質標準，畫面上那一句要留著：
 * 同一件事可能同時算品質也算安全，重點是三種都要有人看。
 *
 * 用色：只有 sky 一種（A-1）。
 */

const ASPECTS = [
  {
    n: '01',
    k: '功能正確性',
    en: 'Functionality',
    q: '該做的功能，有沒有正常運作？',
    what: '登入、表單送出、資料存得進去，以及主要的使用流程走不走得完。',
    how: '功能測試、端對端測試，加上自己實際操作一次。',
  },
  {
    n: '02',
    k: '品質與需求符合性',
    en: 'Quality',
    q: '做出來的成果，符不符合原本的要求？',
    what: '規格裡每一條有沒有做到、手機版面、錯誤處理、速度、好不好用與無障礙。',
    how: '拿規格逐條驗收、品質檢查、效能測試。',
  },
  {
    n: '03',
    k: '安全與權限',
    en: 'Security',
    q: '功能都正常的時候，還有沒有安全風險？',
    what: '存取控制、身分驗證、機密資料、系統設定，以及那些影響大的操作。',
    how: '權限測試、設定審查、漏洞掃描，必要時找專業的安全驗證。',
  },
];

/** 同一個功能，三種驗收要求。**不要換成別的例子**，登入是學員都做過的。 */
const LOGIN = [
  { k: '功能', v: '帳號密碼正確，可以成功登入。' },
  { k: '品質', v: '帳密打錯有清楚的提示，手機上也操作得順。' },
  { k: '安全', v: '登入之後看不到別的會員的私人資料。' },
];

export default function SlideShipRisk() {
  return (
    <SlideLayout
      title="AI 說完成了，我們該怎麼驗收？"
      subtitle="Functionality / Quality / Security"
      icon={ShieldAlert}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          網站打得開、功能點得動，只代表一部分的檢查通過。
          <strong className="text-slate-100">真正交出去之前，還要確認需求有沒有滿足，以及資料與權限有沒有被保護住。</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="divide-y divide-slate-800 rounded-2xl border border-slate-800 bg-slate-900">
          {ASPECTS.map((a) => (
            <div key={a.en} className="grid grid-cols-1 gap-x-5 gap-y-1 px-5 py-3.5 md:grid-cols-[13rem_minmax(0,1fr)]">
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-slate-600">{a.n}</span>
                  <span className="text-base font-bold text-slate-100">{a.k}</span>
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-slate-600">{a.en}</div>
                <p className="mt-1 text-sm leading-relaxed text-sky-200/90">{a.q}</p>
              </div>
              <dl className="min-w-0 space-y-0.5 text-sm leading-relaxed">
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-xs text-slate-600">檢查什麼</dt>
                  <dd className="min-w-0 text-slate-300">{a.what}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-xs text-slate-600">怎麼驗</dt>
                  <dd className="min-w-0 text-slate-400">{a.how}</dd>
                </div>
              </dl>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <h3 className="text-base font-bold text-slate-100">同一個會員登入功能，三種驗收要求</h3>
          <dl className="mt-2.5 space-y-1 text-sm leading-relaxed">
            {LOGIN.map((l) => (
              <div key={l.k} className="flex gap-3">
                <dt className="w-10 shrink-0 font-bold text-sky-300">{l.k}</dt>
                <dd className="min-w-0 text-slate-300">{l.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2.5 border-t border-slate-800 pt-2.5 text-sm leading-relaxed text-slate-500">
            同一個功能可能通過了功能測試，品質或安全那兩層還是有問題。
            而它們之所以沒被做出來，多半是
            <strong className="text-slate-400">需求裡沒有寫</strong>：
            你說「做一個可以登記報名的頁面」，它就做了一個可以登記報名的頁面；
            沒有人交代「誰能讀、誰能改這些報名資料」，做出來的功能就可能少掉那道檢查。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="border-t border-slate-800 pt-4">
          <p className="text-base font-bold leading-relaxed text-slate-100">
            功能正常，不代表符合需求；符合需求，也不代表沒有安全風險。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            這三個面向是這門課用來分工的框架，不是嚴格互斥的標準，同一件事可能同時算品質也算安全。
            要的是三種都有人看，而每一種都要事先定義標準、給得出檢查的方式，並且要求核對得了的證據。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
