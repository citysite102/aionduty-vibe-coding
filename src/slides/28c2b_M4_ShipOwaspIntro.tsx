import { ShieldQuestion, Globe, Bot, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-5 第四頁。上一頁把驗收拆成功能、品質、安全三個面向，
 * 這一頁回答其中安全那一面要參考哪些風險分類，下一頁才動手做第一輪審查。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁只要讓學員理解三件事：
 *   1. 網站自身的漏洞，與替你開發的 Agent 被不可信內容誤導，是兩種不同的風險
 *   2. OWASP 提供可以參考的風險分類與資源
 *   3. Top 10 是認識風險的起點，不是完整的安全測試，也不是認證
 * **不要在這一頁教 OWASP 的歷史與研究方法。**
 *
 * ── 整塊拿掉的，不要加回來 ──────────────────────────────
 *   1. 〈這份清單的來歷〉三欄（誰出的、十條怎麼排出來的、多久換一次），
 *      連同 2001 年、13 家公司、280 萬個應用、589 種弱點那幾個數字。
 *      那是組織沿革與研究方法，佔掉整頁一半，而學員在這一頁用不到；
 *      而且那幾個數字沒有重查就不該再印（C-1）。
 *   2. 〈三件不要誤會的事〉整塊。它要擋的誤讀改由頁尾那一句承擔。
 *   3. MITRE CWE Top 25 與 OWASP ASVS。它們是同類清單，放在這裡會讓學員
 *      以為這一頁在比較清單。要的話放延伸閱讀。
 * 版本與名稱會改這件事，壓成頁尾一行輔助文字。
 *
 * 兩個對照案例保留，但說法改精準了：
 *   左邊是**網站本身的安全缺陷**（功能正常，但沒有保護好使用者的資料與功能）
 *   右邊是 **LLM／Agent 系統處理不可信內容與執行權限時的風險**
 * **不要寫成「兩份 Top 10 涵蓋了所有 Agent 安全問題」**，它們沒有。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-11-08。top10.owasp.org/2025 現行版是 2025；
 * genai.owasp.org/llm-top-10/ 當天列的也是 2025 版，提示注入與過度授權都在裡面。
 * **畫面上只寫清單名稱與涵蓋哪幾類風險，不寫條目編號**，改版編號會動。
 *
 * 四頁的分工（改任何一頁之前先看，B-6）：
 *   203 這一頁：要參考哪些安全風險分類
 *   204 怎麼把網站那一邊變成 Agent 跑得了的第一輪審查
 *   205 除了 AI Review 還有哪些驗證方式
 *   206 Agent 自己能讀、能判斷、能執行到什麼程度
 * **這一頁不要先把後面三頁的內容講掉。**
 *
 * 用色：只有 sky 一種（A-1）。這一頁是在認識框架，**不要用警告色框**。
 */

const CASES = [
  {
    icon: Globe,
    side: '網站本身的安全',
    k: '會員資料被越權存取',
    scene: '網站功能都正常，但把網址裡的會員編號改成別人的，就可能看到別人的資料。',
    q: '這個應用程式有沒有保護好使用者的資料與功能？',
    list: 'OWASP Top 10 for Web Applications',
  },
  {
    icon: Bot,
    side: 'AI Agent 的安全',
    k: '外部文件裡的指令被執行',
    scene: 'Agent 正在整理一批外部文件，其中一份要求它忽略原本的規則，把資料寄到另一個信箱。',
    q: '不可信的資訊會不會改變 Agent 的行為，造成越權的操作？',
    list: 'OWASP Top 10 for LLM Applications',
  },
];

const LISTS = [
  {
    k: 'Web Application Top 10 · 2025',
    v: '涵蓋存取控制、安全設定、身分驗證、供應鏈等網站本身的安全風險。',
    href: 'https://top10.owasp.org/2025/',
  },
  {
    k: 'LLM Applications Top 10 · 2025',
    v: '涵蓋提示注入、敏感資訊揭露、過度授權等 LLM 應用的風險。',
    href: 'https://genai.owasp.org/llm-top-10/',
  },
];

export default function SlideShipOwaspIntro() {
  return (
    <SlideLayout
      title="網站與 Agent，各有什麼安全風險？"
      subtitle="OWASP · Security References"
      icon={ShieldQuestion}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          網站本身可能有安全漏洞，
          <strong className="text-slate-100">替你開發網站的 Agent 也可能被不可信的內容誤導</strong>。
          這是兩種不同的風險，要用不同的方式檢查。
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CASES.map((c, i) => (
            <AnimatedBlock
              key={c.list}
              stepIndex={i + 2}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center gap-2">
                <c.icon aria-hidden="true" size={16} className="shrink-0 text-sky-400" />
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500">{c.side}</span>
              </div>
              <h3 className="mt-1.5 text-base font-bold text-slate-100">{c.k}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{c.scene}</p>
              <p className="mt-2.5 border-t border-slate-800 pt-2.5 text-sm leading-relaxed text-sky-200/90">
                {c.q}
              </p>
              <div className="mt-1.5 font-mono text-xs leading-relaxed text-slate-500">{c.list}</div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-slate-100">OWASP</strong> 是一個推動軟體安全的非營利組織，
            提供開放的安全知識、風險分類與實務參考資料。上面那兩種風險，各自有一份清單。
          </p>
          <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-slate-800 pt-3 md:grid-cols-2">
            {LISTS.map((l) => (
              <div key={l.k}>
                <dt>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-bold text-sky-400 hover:text-sky-300"
                  >
                    {l.k} <ExternalLink size={11} aria-hidden="true" />
                  </a>
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-slate-400">{l.v}</dd>
              </div>
            ))}
          </dl>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="border-t border-slate-800 pt-4">
          <p className="text-base font-bold leading-relaxed text-slate-100">
            Top 10 幫你知道該注意哪些風險，但它代替不了完整的安全驗證。
          </p>
          <p className="mt-1 text-sm leading-relaxed text-slate-400">
            OWASP 的資源不只這兩份，這兩份也沒有涵蓋 Agent 的所有安全問題。
            <span className="text-slate-500">版本與條目的名稱會更新，看的時候先確認你讀的是哪一版。</span>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
