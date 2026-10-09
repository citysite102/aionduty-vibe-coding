import { ShieldAlert, EyeOff, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-10 新增（講師：有些學員覺得有成品就是做好了）。
 *
 * 第一版寫錯了方向：當時拿三個案例最後各自補的那幾步，收成一把「三級」的尺。
 * 問題是那樣學員檢查的是「我有沒有照課程做」，不是「這東西在真實世界裡會不會出事」，
 * 而課程教過的東西他本來就會。講師退回來重寫，改成拿外部的實測資料當依據。
 *
 * ── 三組數字的出處（C-1）────────────────────────────────────────────
 * 最後查證：2026-10-10。三組都是**二手轉述**，畫面上的連結指的是轉述的那一篇，
 * 不是原始報告，所以文案一律寫「某某掃描」而不是「研究顯示」。
 *
 *   Reeve 掃描         2026-08-12 至 14 掃了 30,998 個線上 vibe-coded 網站，
 *                      99% 至少有一個資安問題。
 *                      轉述出處：aiqkangber.com/blog/security-vulnerabilities-in-vibe-coding
 *   Symbiotic Security 2026-08-27 比對 1,967 個 GitHub 專案，AI 協助寫的平均 42.3 個漏洞，
 *                      純人寫的 9.6 個。轉述出處同上。
 *   Red Access         在多個主流 AI 開發平臺上找到約 5,000 個可公開存取、看似企業用途的
 *                      AI 生成應用；其中約 40%（2,000 個）含企業營運、個人或敏感資料，
 *                      卻未設置基本身分驗證與存取控管，「有些應用甚至預設讓任何能開啟
 *                      這些頁面的人獲得管理者權限」。
 *                      出處：ithome.com.tw/news/176269（2026-06-01）
 *
 * 還有一篇沒有把數字放上畫面，但它是這兩頁的立場來源：
 *   data-di.com/blog/ai-lab-vibe-coding-2026-q1（2026-03-16 發布、2026-10-05 更新），
 *   標題就是「Vibe Coding 做完 Demo 就卡關？」，重點是卡關不在生成能力，在治理能力。
 *
 * **下次改版前三個網址都點一次。** 連結掛掉或數字對不上就整塊拿掉，不要只改數字，
 * 也不要憑印象寫成「研究顯示大部分⋯」。沒有來源的百分比是 D-2 直接禁的。
 * ─────────────────────────────────────────────────────────────────
 *
 * **語氣是這一頁最容易長歪的地方。** 它要做的是讓學員知道這幾類存在，
 * 不是證明 AI 寫的程式很爛。42.3 對 9.6 那一組特別容易被念成後者，
 * 所以那一格的文案收在「多一道檢查」，而不是「所以不要用 AI 寫」。
 *
 * 強調色只有 amber 一種（風險提示）。三個數字不要一個一色。
 */
const STATS = [
  {
    n: '99%',
    of: '的 vibe-coded 網站',
    body: '2026 年 8 月掃過 30,998 個線上的 vibe-coded 網站，至少有一個資安問題的佔 99%。',
    src: 'Reeve 掃描',
  },
  {
    n: '42.3',
    of: '對 9.6',
    body: '比對 1,967 個 GitHub 專案，AI 協助寫的平均 42.3 個漏洞，純人寫的 9.6 個。這個差距要你多做一道檢查。',
    src: 'Symbiotic Security',
  },
  {
    n: '2,000',
    of: '個企業用途的工具',
    body: '公開在網路上、看起來是給公司用的 AI 應用，約四成裝著營運或個人資料，卻沒有任何登入。',
    src: 'Red Access',
  },
];

export default function SlideShipRisk() {
  return (
    <SlideLayout
      title="三萬個 AI 做的網站，99% 有資安問題"
      subtitle="What Actually Goes Wrong"
      icon={ShieldAlert}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          東西做出來、會動了，多數人到這裡就當它做完了。
          <strong className="text-slate-100">底下三個數字是別人實際掃出來的</strong>，
          放在這裡是因為這幾類問題你不知道它存在，就不會去問。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.src} className="rounded-2xl border border-amber-900/40 bg-slate-900/60 p-5">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-amber-300 text-3xl font-bold font-mono">{s.n}</span>
                <span className="text-slate-400 text-sm">{s.of}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              <p className="text-slate-600 text-sm mt-3 pt-2.5 border-t border-slate-800">{s.src}</p>
            </div>
          ))}
        </AnimatedBlock>

        {/*
          「為什麼會這樣」不能省：少了它，上面三個數字會被讀成「AI 寫的程式不能用」，
          而這門課整堂都在教怎麼用它。真正的原因是需求裡沒有這一項，所以它不會做。
        */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-base font-bold text-slate-100 mb-2">為什麼會這樣，而且跟你的程度無關</h3>
          <p className="text-slate-300 text-base leading-relaxed">
            你說「做一個可以登記報名的頁面」，它就做了一個可以登記報名的頁面，而且做得很好。
            <strong className="text-slate-100">沒有人要求它擋住不該進來的人，所以那件事不會出現。</strong>
            它不是寫壞了，是你沒有要求，而你沒有要求是因為你不知道有這一項。
            所以你要補的那一項叫「知道該問哪幾題」。
          </p>
        </AnimatedBlock>

        {/*
          Red Access 那一條要單獨講，因為它就是這門課學員回去最可能做出來的東西，
          而且它影響的是學員的工作，不只是那個作品，所以用 warn。

          2026-10-10（講師說這一段太 AI）整段重寫。原本是「那 2,000 個沒有被攻破，
          它們根本沒有門。形狀幾乎一樣：某個部門自己做了⋯」。四個毛病：
            1. 「沒有被攻破／根本沒有門」是為了節奏做的反轉，資訊只有「沒設登入」。
            2. 「形狀」是自己造的抽象詞（D-2 空心的詞），這兩頁還用了兩次。
            3. 四段頓號排比，而且主詞是泛稱的「某個部門」，不是學員自己。
            4. 「它麻煩的地方在於」是宣告自己接下來要講什麼（D-2）。
          現在的寫法：主詞換成「你」，場景用他真的會做的那一件（部門每個月彙整的表），
          並且先說「做到這裡沒有錯」再指出少掉的那一項，歸因到事情本身不是歸因到他。
          **不要改回有反轉的版本。**
        */}
        <Callout tone="warn" icon={EyeOff} label="你回去做的第一個內部工具，很可能就是這一種" stepIndex={4}>
          那 2,000 個從頭到尾就沒設登入，不是被誰攻破的。過程通常很單純：
          你把部門每個月要彙整的那份表做成一個網頁，資料貼進去，網址丟到群組請同事用。
          <strong className="text-slate-100">做到這裡沒有錯，少掉的只是「誰可以打開」這一項。</strong>
          有些連管理者權限都是打開那一頁就有。
          <span className="block mt-2 text-slate-400">
            員工自己建、沒有經過 IT 的 AI 工具，現在叫影子 AI。
            資料是公司的，網址是你開的，出事的時候這兩件會被放在一起看。
          </span>
        </Callout>

        <p className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>出處（2026-10-10 查證，數字是當時的）</span>
          <a
            href="https://aiqkangber.com/blog/security-vulnerabilities-in-vibe-coding"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
          >
            Reeve 與 Symbiotic 的數字 <ExternalLink size={11} />
          </a>
          <a
            href="https://www.ithome.com.tw/news/176269"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
          >
            iThome：Red Access 的影子 AI 調查 <ExternalLink size={11} />
          </a>
          <a
            href="https://www.data-di.com/blog/ai-lab-vibe-coding-2026-q1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
          >
            做完 Demo 就卡關 <ExternalLink size={11} />
          </a>
        </p>

      </div>
    </SlideLayout>
  );
}
