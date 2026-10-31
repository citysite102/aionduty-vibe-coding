import { ScanSearch, Bot, Swords, ShieldAlert, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-10-20 新增（講師：要補滲透測試與弱點掃描是什麼）。
 *
 * 為什麼需要這一頁：在這之前，全片給學員的驗證方法只有一種，就是 `28c3` 那一頁
 * 叫 AI 逐條檢查的 Prompt。「滲透測試」與「弱點掃描」在全片是零次。
 * 學員交作品給公司或客戶的時候，對方講的就是這兩個詞，他要聽得懂差在哪、
 * 以及哪一種是他現在自己做得到的。
 *
 * **三欄的順序是照「他現在做得到的程度」排**：自己掃（今天就能做）、
 * 請 AI 看（`28c3` 已經給了 Prompt）、外部單位測試（要花錢，多數人暫時用不到）。
 * 不要照「嚴謹程度」排，那會變成在說他現在做的不夠。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-20。
 *   - GitHub 的方案差異：docs.github.com/en/code-security/getting-started/github-security-features。
 *     當時的現況：**Dependabot alerts 私人專案也免費**；secret scanning、push protection、
 *     code scanning 預設只對公開專案免費，私人專案要另外買 GitHub Secret Protection
 *     或 Code Security。畫面上那一行「公開的專案免費」跟 `27b8c_M4_GitignoreGuard`
 *     是同一個說法，兩頁要一起改。
 *   - OWASP Juice Shop：owasp.org/www-project-juice-shop/，flagship，MIT 授權，
 *     原話是「the most modern and sophisticated insecure web application for security
 *     trainings, awareness demos and CTFs」，也就是刻意做成有洞的練習靶場。
 *   - 法律那一句**刻意不寫法條編號**：台灣刑法有「妨害電腦使用罪」這一章，
 *     編號與構成要件不是這門課要教的，寫上去只會變成一個沒人驗證的數字。
 * ─────────────────────────────────────────────────────
 *
 * 強調色只有 sky，警告那一塊用 amber（A-1 的風險提示）。
 */

const WAYS = [
  {
    icon: ScanSearch,
    name: '自己掃',
    en: '弱點掃描 Vulnerability Scanning',
    what: '程式自動拿你的專案比對「已知有問題」的清單，幾分鐘跑完。',
    does: ['你用到的套件有沒有已知的問題', '金鑰有沒有不小心推上去'],
    doesnt: '已知清單以外的看不出來，例如誰能看誰的資料。',
    footLabel: '抓不到',
    accent: true,
  },
  {
    icon: Bot,
    name: '請 AI 看',
    en: 'OWASP 那一頁的 Prompt',
    what: '把清單交給它，逐條對照你的程式碼，一次涵蓋很廣。',
    does: ['哪幾條這個專案根本沒做', '每一條是從哪個檔案看出來的'],
    doesnt: '它不會真的去打你的網站，看漏了你也不會知道。',
    footLabel: '抓不到',
    accent: false,
  },
  {
    icon: Swords,
    name: '外部單位測試',
    en: '滲透測試 Penetration Test',
    what: '請人照真的攻擊者的做法試一遍，找出看程式碼看不出來的問題。收錢或存別人的個資時才需要。',
    does: ['好幾個小問題串起來才成立的那種', '流程上的漏洞，例如改個網址就跳過付款'],
    doesnt: '要花錢，而且要先談好範圍與授權。',
    footLabel: '代價',
    accent: false,
  },
];

const DO_NOW = [
  ['GitHub 的 Dependabot 警示', '套件有已知問題時它開一張通知給你，私人專案也免費'],
  ['公開專案的金鑰掃描', '推上去的那一刻就擋下來，公開的專案免費，私人的要另外買'],
  ['npm audit', '在專案資料夾裡執行，它會列出有問題的套件與修法'],
];

export default function SlideShipScan() {
  return (
    <SlideLayout
      title="三種檢查：自己掃、請 AI 看、外部單位測試"
      subtitle="Scan, Review, Pentest"
      icon={ScanSearch}
      updated={{ date: '2026/10/20', kind: '新增' }}
    >
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col pt-1 pb-3">
        {/*
          2026-10-31（講師：對方講什麼？誰講？）開場那一句重寫。原本是
          「而交作品給公司或客戶時，對方講的就是這幾個詞」，兩個空格：
          「對方」沒有指到人，「這幾個詞」要讀完三張卡才知道是哪三個。
          現在把人與詞都寫出來（公司的資訊或資安單位、客戶的技術窗口；
          弱點掃描與滲透測試是對方真的會講的那兩個）。
          **不要再寫「對方講的就是這幾個詞」。**
        */}
        <p className="text-slate-300 text-base leading-relaxed mb-2">
          作品交出去的時候，公司的資訊或資安單位、客戶的技術窗口會問你
          <strong className="text-slate-100">「做過弱點掃描了嗎」「有沒有做滲透測試」</strong>。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch mb-2">
          {WAYS.map((w, i) => (
            <AnimatedBlock
              key={w.name}
              stepIndex={i + 1}
              className={`rounded-2xl border p-4 flex flex-col ${
                w.accent ? 'bg-slate-900 border-sky-900/50' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-3">
                <span
                  className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
                    w.accent ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <w.icon size={18} aria-hidden="true" />
                </span>
                {w.name}
              </h3>
              <p className="text-slate-500 text-xs font-mono mb-3 pl-12">{w.en}</p>

              <p className="text-slate-300 text-base leading-relaxed mb-3">{w.what}</p>

              <ul className="space-y-1.5 mb-3">
                {w.does.map((d) => (
                  <li key={d} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                    <span className="text-slate-600 shrink-0">・</span>
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-auto pt-3 border-t border-slate-800 text-sm leading-relaxed text-slate-500">
                <span className="text-slate-400 font-medium">{w.footLabel}：</span>
                {w.doesnt}
              </p>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-2.5 mb-2">
          <div className="text-base font-bold text-slate-100 mb-1.5">今天就做得到的三件</div>
          <ul className="space-y-0.5">
            {DO_NOW.map(([t, d]) => (
              <li key={t} className="text-sm leading-relaxed flex gap-2">
                <span className="text-slate-600 shrink-0">・</span>
                <span>
                  <span className="text-slate-200 font-medium">{t}</span>
                  <span className="text-slate-500">　{d}</span>
                </span>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={5}
          className="rounded-2xl border border-amber-500/25 bg-amber-500/5 px-5 py-2.5 flex items-start gap-3"
        >
          <ShieldAlert size={18} aria-hidden="true" className="text-amber-300 shrink-0 mt-1" />
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-amber-300">只掃自己的東西。</strong>
            沒有授權就去掃別人的系統，在台灣可能牴觸刑法的「妨害電腦使用罪」。
            想練攻擊那一面，用刻意做成有洞的靶場，例如 OWASP 的{' '}
            <a
              href="https://owasp.org/www-project-juice-shop/"
              target="_blank"
              rel="noreferrer"
              className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1"
            >
              Juice Shop <ExternalLink size={11} />
            </a>
            。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
