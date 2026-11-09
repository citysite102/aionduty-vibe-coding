import { AlertTriangle, EyeOff, ExternalLink, MessageSquare, Bot, MessageSquareOff, MapPin } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元 8-6 第一頁，也就是資安那一支的第一個畫面（2026-11-09 切出來，講師）。
 * 它要自己說得出這一段在做什麼，而且**開場不要重複前一支最後那句轉場**
 * （`逐字稿/README.md` 開場白那一條）。
 *
 * 2026-11-09 新增（講師）。這四塊內容原本在 Slide 202 的下半，
 * 那一頁同日改成「驗收的三個面向」之後塞不下，整組搬到這一頁來。
 *
 * 位置是刻意的：上一頁結在「符合需求，也不代表沒有安全風險」，
 * 這一頁給那句話的證據，下一頁才開始講要照哪些清單檢查。
 * **不要搬到 OWASP 那幾頁後面**，證據放在方法後面就只是補充。
 *
 * ── 這一頁的語氣（2026-11-08 講師指定，整組搬過來的時候一起帶）──────
 * 它要解的是「有成品就是做好了」這個誤解，**但不能講成「你做的還不夠」**。
 * 「為什麼會這樣，而且跟你的程度無關」那一塊要把「跟程度無關」講滿；
 * 念成督促，這一頁就白做了。
 *
 * ── 數字怎麼呈現 ────────────────────────────────────
 * 每一個數字都要標出**樣本、出處、這個數字在量什麼**，少了那三欄它就只是一個
 * 聽起來很嚇人的百分比。底下那一行但書不能刪：**三份研究的樣本與測量方式不同，
 * 不要互相加總，也不要推到所有 AI 寫的程式上。** 我們讀到的是轉述不是原始報告（C-2）。
 * **不要把三個數字合併成一句結論**，那就是把三份不同樣本的研究推成一個通則。
 *
 * ── 2026-11-09 用原始來源複查過兩塊（Codex 審查指出，複查後確認）──────────
 *   1. Reeve 那個 99%：原文是「99% ⋯ had at least one finding」，而且自己寫著
 *      「Most of those were moderate, and nearly all of them are missing browser
 *      security headers」。**少了這個限定，99% 會被讀成九成九都有可被利用的嚴重漏洞。**
 *      https://reeve.page/research/vibe-coded-app-security-2026
 *   2. What'Sub 那一段原本有三處在 INSIDE 原文裡查不到，已經換掉，**不要加回來**：
 *      「2026 年 8 月」（原文沒給外洩的月份，專訪是 2026/09/19 刊出）、
 *      「兩天破萬註冊」（原文寫的是用量達原先設想的十倍以上）、
 *      以及「我沒有想到這麼多」——**那句話在原文裡講的是第一個月十萬元的 API 帳單，不是資安**。
 *      「開發者不寫程式」原文也沒有這樣寫，一併拿掉。
 *      現在畫面上那段的每一句都在專訪裡找得到，包含最後那句 Codex 紅藍對抗的沙盒測試。
 *
 * ⚠ 三個數字仍是 2026-10-10 查到的二手轉述（Reeve 那一條 2026-11-09 已改引原始報告）。
 * **連結點不開或數字對不上的時候，整塊拿掉比改數字安全。** 2026-11-09 複查：Reeve／Symbiotic 那篇與 iThome
 * 兩個連結都回 200；INSIDE 那一篇 curl 回 403，那是擋自動抓取、不代表文章不在（C-4），
 * **要引用之前自己用瀏覽器開一次**。
 *
 * 「為什麼會這樣」不能省：少了它，三個數字會被讀成「AI 寫的程式不能用」，
 * 而這門課整堂都在教怎麼用它。真正的原因是需求裡沒有這一項，所以它不會做。
 * 三條（你說的／它做的／沒有人說的）**不要改回散文**。
 *
 * 台灣那一件接在同一塊裡、不另開區塊，因為它證明的就是那一段：這跟程度無關。
 * **不要搬成獨立的一頁或一張卡**，那會把它變成在講這個人。
 * 後半的「他怎麼處理」不要刪：少了它，這一段讀起來像在指責一個真實的人，
 * 而且那三步正好就是後面〈怎麼確認沒有留下問題〉那一頁要教的。
 *
 * 影子 AI 那一條單獨用 warn：它是這門課學員回去最可能做出來的東西，
 * 而且影響的是學員的工作，不只是那個作品。
 * **底下內文的主詞是「你」，那是 2026-10-10 刻意決定的，不要改成第三人稱。**
 *
 * 用色：amber（數字與影子 AI）一種。其餘灰階。
 */

const STATS = [
  {
    n: '99%',
    unit: '的受測網站',
    what: '至少有一項掃描發現。多數是中度，而且幾乎都是少了瀏覽器的安全標頭',
    sample: '30,998 個線上的 vibe-coded 網站',
    when: '2026 年 8 月，Reeve 掃描',
  },
  {
    n: '42.3',
    unit: '對 9.6',
    what: '平均每個專案掃出的漏洞數：AI 協助寫的對上純人寫的',
    sample: '1,967 個 GitHub 專案',
    when: 'Symbiotic Security',
  },
  {
    n: '約 2,000',
    unit: '個工具',
    what: '裝著營運或個人資料，而且沒有任何登入',
    sample: '約 5,000 個公開、看起來給公司用的 AI 應用',
    when: 'Red Access',
  },
];

const CAUSE = [
  { icon: MessageSquare, k: '你說的', v: '「做一個可以登記報名的頁面」。' },
  { icon: Bot, k: '它做的', v: '一個可以登記報名的頁面，而且做得很好。' },
  { icon: MessageSquareOff, k: '沒有人說的', v: '擋住不該進來的人。需求沒有交代誰能讀寫資料的時候，做出來的功能就可能少掉那道檢查。' },
];

export default function SlideShipEvidence() {
  return (
    <SlideLayout
      title="安全問題有多常見：三份調查與一個案例"
      subtitle="What Actually Goes Wrong"
      icon={AlertTriangle}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          安全那一層最容易被跳過，因為畫面上看不出來。
          <strong className="text-slate-100">底下三個數字各自在量不同的事，先看它們量了什麼。</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.when} className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-amber-300">{s.n}</span>
                  <span className="text-sm text-slate-400">{s.unit}</span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{s.what}</p>
                <dl className="mt-2.5 space-y-0.5 border-t border-amber-500/20 pt-2.5 text-xs leading-relaxed text-slate-500">
                  <div className="flex gap-2">
                    <dt className="w-10 shrink-0">樣本</dt>
                    <dd className="min-w-0">{s.sample}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-10 shrink-0">出處</dt>
                    <dd className="min-w-0">{s.when}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
            三份研究的樣本與測量方式各自不同，
            <strong className="text-slate-300">不要互相加總，也不要推成「所有 AI 寫的程式都這樣」</strong>。
            我讀到的是轉述，不是原始報告，底下三個連結可以自己點開看一眼。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-base font-bold text-slate-100 mb-2">為什麼會這樣，而且跟你的程度無關</h3>
          <ul className="space-y-0.5">
            {CAUSE.map((c) => (
              <li key={c.k} className="flex flex-wrap items-baseline gap-x-2 text-base leading-relaxed">
                <span className="flex w-28 shrink-0 items-center gap-2 whitespace-nowrap font-bold text-slate-200">
                  <c.icon aria-hidden="true" size={15} className="shrink-0 self-center text-slate-500" />
                  {c.k}
                </span>
                <span className="flex-1 min-w-0 text-slate-300">{c.v}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-base leading-relaxed text-slate-300">
            <strong className="text-slate-100">所以你要補的那一項叫「知道該問哪幾題」。</strong>
          </p>

          <div className="mt-3 border-t border-slate-800 pt-3">
            <p className="mb-1 flex items-center gap-2 text-sm font-bold text-slate-200">
              <MapPin aria-hidden="true" size={14} className="shrink-0 text-slate-500" />
              台灣的案例（INSIDE 專訪，2026/09）
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              壹加壹的字幕工具 What&rsquo;Sub 上線之後用量超出原本設想十倍以上，早期曾有一批使用者的
              email 外洩。白帽與其他開發者主動測試、把問題寄給他，他把這些回報整理給 AI 判斷哪些成立、
              怎麼處理，再逐項修改，最後自己審核、決定要不要送出更新。
              他也用 Codex 做過一次紅藍對抗，複製一份專案在跟正式服務隔離的沙盒裡跑。
            </p>
            <a
              href="https://www.inside.com.tw/article/42420-lean-ai-vibe-coding-whatsub-subtitle-tool"
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-sky-400"
            >
              INSIDE 專訪 <ExternalLink size={11} aria-hidden="true" />
            </a>
          </div>
        </AnimatedBlock>

        <Callout tone="warn" icon={EyeOff} label="部門自己做的小工具，網址丟群組就上線" stepIndex={4}>
          那 2,000 個研究說它們沒有設基本的身分驗證與存取控制，不用登入就碰得到裡面的資料。過程通常很單純：
          你把部門每個月要彙整的那份表做成一個網頁，資料貼進去，網址丟到群組請同事用。
          <strong className="text-slate-100">做到這裡沒有錯，接下來要確認的是：這份資料能不能放上這個平台，以及誰可以讀、誰可以改。</strong>
          有些連管理者權限都是打開那一頁就有。
          <span className="block mt-2 text-slate-400">
            員工自己建、沒有經過 IT 的 AI 工具，現在叫影子 AI。
            資料是公司的，網址是你開的，出事的時候這兩件會被放在一起看。
          </span>
        </Callout>

        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
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
        </p>

      </div>
    </SlideLayout>
  );
}
