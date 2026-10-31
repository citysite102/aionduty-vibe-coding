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
 *
 * 2026-10-30 補台灣的那一件（講師要求）。查證來源：
 *   INSIDE 專訪 inside.com.tw/article/42420-lean-ai-vibe-coding-whatsub-subtitle-tool
 *   當事人是壹加壹的潘令傑（Lean），十年剪片經驗、非工程背景，2026-08 推出字幕工具
 *   What'Sub，兩天破萬註冊。專訪裡的事實：早期有一批 email 外洩；多位白帽與個人開發者
 *   主動測站並把問題寄給他；他把回報整理給 Claude 與 Codex 判斷哪些成立、逐項修，
 *   還用 Codex 跑過一次紅藍對抗。他自己的話是「我沒有想到這麼多」。
 *   **只寫專訪裡有的，不要加判斷。** 社群上流傳的「你不知道你不知道」是某則留言，
 *   經第三方帳號轉述，查不到原始出處，不要寫進畫面（D-2 沒有來源的引述）。
 *   也不要寫成「被駭」：外洩的是 email，不是有人攻進去。
 *   這一筆掛在「為什麼會這樣」那一塊裡面，不另開區塊，理由見下面那段註解。
 * ─────────────────────────────────────────────────────────────────
 *
 * 2026-10-31 標題又換了一次（上一版是〈三組掃描數字，以及為什麼跟你的程度無關〉），
 * 理由寫在畫面那一段的註解裡。底下 10-31 稍早那一段記的是更前一版，留著當歷史。
 *
 * 2026-10-31 換標題（講師：「我怕這個標題是不是就直接說，那是不是不該做了」）。
 * 原本是〈三萬個 AI 做的網站，99% 有資安問題〉，一個沒有主詞的數字擺在最大的字級上，
 * 讀起來像在對 AI 寫的程式下結論，而這門課整堂都在教怎麼用它。
 * 現在的標題講這一頁有什麼（三組掃描數字＋一段解釋），後半直接把那個誤讀擋掉。
 * **99% 沒有消失**，它還是底下第一格那個最大的琥珀色數字，視覺上的衝擊沒有變。
 * 要改回有數字的版本，數字前面一定要留「AI 做的網站」那個限定語：
 * 那三萬個掃的是 vibe-coded 網站，不是全部的網站，少掉限定語就是假的。
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
    body: '比對 1,967 個 GitHub 專案，AI 協助寫的平均 42.3 個漏洞，純人寫的 9.6 個。所以多做一道檢查。',
    src: 'Symbiotic Security',
  },
  {
    n: '2,000',
    of: '個企業用途的工具',
    body: '公開在網路上、看起來是給公司用的 AI 應用，約四成裝著營運或個人資料，卻沒有任何登入。',
    src: 'Red Access',
  },
];

/** 三層原因，原本黏在一個句子裡。順序是「你說的 → 它做的 → 沒有人說的」。 */
const CAUSE = [
  { k: '你說的', v: '「做一個可以登記報名的頁面」。' },
  { k: '它做的', v: '一個可以登記報名的頁面，而且做得很好。' },
  { k: '沒有人說的', v: '擋住不該進來的人。需求裡沒有這一項，所以那件事不會出現。' },
];

export default function SlideShipRisk() {
  return (
    <SlideLayout
      title="會動了不等於做完：三組掃描數字"
      subtitle="What Actually Goes Wrong"
      icon={ShieldAlert}
    >
      <div className="max-w-6xl mx-auto w-full space-y-2 pb-0">

        {/*
          2026-10-31（講師：標題到內容有點混亂、邏輯不連貫；底下應該強調東西做完了還要注意什麼）
          標題與開場一起改。原標題〈三組掃描數字，以及為什麼跟你的程度無關〉把這一頁的兩塊
          並列著念出來，但沒有說它們為什麼在同一頁；開場的「多數人到這裡就當它做完了」
          接下去就直接跳到數字，中間少了「少掉的那一類問題長什麼樣」。
          現在標題下一個結論（會動了不等於做完），開場補上那一類問題的特徵：
          它不會讓東西壞掉，所以你不會發現。那一句同時接得住底下的三個數字與〈為什麼會這樣〉。
          **標題裡的「三組掃描數字」不要拿掉**，少了它只看標題不知道這一頁有什麼（D-5）。
        */}
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          東西做出來、會動了，多數人到這裡就收工。
          <strong className="text-slate-100">還有什麼我們需要特別注意的嗎？</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATS.map((s) => (
            <div key={s.src} className="rounded-2xl border border-amber-900/40 bg-slate-900/60 p-4">
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-amber-300 text-3xl font-bold font-mono">{s.n}</span>
                <span className="text-slate-400 text-sm">{s.of}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              <p className="text-slate-600 text-sm mt-2 pt-2 border-t border-slate-800">{s.src}</p>
            </div>
          ))}
        </AnimatedBlock>

        {/*
          「為什麼會這樣」不能省：少了它，上面三個數字會被讀成「AI 寫的程式不能用」，
          而這門課整堂都在教怎麼用它。真正的原因是需求裡沒有這一項，所以它不會做。
        */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-base font-bold text-slate-100 mb-1.5">為什麼會這樣，而且跟你的程度無關</h3>
          {/*
            2026-10-31 從一段四句的散文改成三條加一句結論。原本「它不是寫壞了，是你沒有
            要求，而你沒有要求是因為你不知道有這一項」把三層原因串在一個句子裡，學員要自己拆。
            三條現在各指一件事：你說了什麼、它做了什麼、沒有人說的是什麼。
            **語氣不要改**：歸因到「需求裡沒有這一項」，不是歸因到學員（見檔頭）。
          */}
          <ul className="space-y-0">
            {CAUSE.map((c) => (
              <li key={c.k} className="flex flex-wrap items-baseline gap-x-2 text-base leading-relaxed">
                <span className="w-24 shrink-0 whitespace-nowrap font-bold text-slate-200">{c.k}</span>
                <span className="flex-1 min-w-0 text-slate-300">{c.v}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-300 text-base leading-relaxed mt-1.5">
            <strong className="text-slate-100">所以你要補的那一項叫「知道該問哪幾題」。</strong>
          </p>
          {/*
            台灣這一件接在上面那段後面、不另開區塊，因為它證明的就是那一段：
            這跟程度無關。**不要搬成獨立的一頁或一張卡**，那會把它變成在講這個人，
            而這一頁要講的是那件事會發生在誰身上（包括台下的人）。
            後半的「他怎麼處理」不要刪：少了它，這一段讀起來像在指責一個真實的人，
            而且那三步正好就是後面〈三種檢查〉那一頁要教的。
          */}
          {/*
            2026-10-31（講師：格式有點混亂）這一塊補回自己的小標與分隔線。
            上面三條是「你說的／它做的／沒有人說的」加一句結論，台灣這一件接在後面
            如果沒有標題，讀起來會像是那句結論的延伸。小標 2026-10-31 稍早為了省高度
            折進第一條裡，那一版省下約 30px 但讀不出分段。**不要再折回去。**
          */}
          <div className="mt-2.5 border-t border-slate-800 pt-2">
            <p className="text-slate-200 text-sm font-bold mb-1">台灣 2026 年 8 月的案例</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              壹加壹的字幕工具 What&rsquo;Sub 兩天破萬註冊，接著一批使用者的 email 外洩。
              開發者是剪片出身、不寫程式，他的說法是「我沒有想到這麼多」。白帽把問題寄給他之後，
              他逐條交給 AI 判斷、修完。
            </p>
            <a
              href="https://www.inside.com.tw/article/42420-lean-ai-vibe-coding-whatsub-subtitle-tool"
              target="_blank"
              rel="noreferrer"
              className="mt-1 text-sm text-slate-600 hover:text-sky-400 inline-flex items-center gap-1"
            >
              INSIDE 專訪 <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
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
