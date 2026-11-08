import { ScanSearch, Bot, Swords } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-5 第六頁。上一頁把安全要求寫成可以交代的句子，這一頁講誰來驗。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁現在只回答一題：**Agent 寫完程式，怎麼確認沒有留下問題。**
 * 下一頁才回答「就算程式沒問題，它有沒有權限去操作真的系統」。
 * 兩頁之間的接點是一句話：**驗證結果正確，不等於授權執行**（寫在轉場，見逐字稿）。
 *
 * **三種檢查是互補的，不是必須依序完成的三道關卡。** 原本寫成「第 1 道、第 2 道、第 3 道」
 * 加上一欄「什麼時候做」，那個編號一直被讀成強弱排名，收尾還得花兩句去辯護。
 * 現在三格結構一樣（時機／方法／能發現／限制），**不要再編成「第幾道」**。
 *
 * 四欄的順序固定：先講什麼時候做，再講怎麼做，再講找得到什麼，最後一定要有限制。
 * **限制那一欄不能省**，它是這一頁的論點：沒有任何一種檢查能保證安全。
 *
 * 這一輪拿掉的，**不要加回來**：
 *   1. 開場那段「對方會問弱點掃描與滲透測試」與每一格的 `asked`。那是在教怎麼回答別人，
 *      不是在教怎麼確認自己的東西，而且它把三種檢查綁在對方的提問上。
 *   2. 〈今天就做得到的三件〉那一塊的免費額度敘述（私人專案也免費、公開專案免費）。
 *      那是會變的商業條款，而且查證成本高。現在只留工具名稱與它查什麼。
 *   3. 掃描授權那個琥珀框。法律那一條沒有刪，併進第三種的限制欄；
 *      Juice Shop 的連結跟著拿掉了，**要加回來的話加在那一欄的後面，不要另開一塊**。
 *
 * 2026-11-08 那一輪釐清過的分界留著，不要再弄錯（講師問：弱點掃描不是掃我的原始碼嗎）：
 *   自動檢查含兩種，比對套件版本（不看程式碼）與照固定規則掃原始碼（靜態掃描、金鑰掃描）。
 *   **分界是「照既有名單或規則比對」對上「理解你的規格」**，不是讀不讀原始碼。
 *
 * 用色：sky（欄位標題）一種。三格不分輕重，所以不再有一格染底色。
 */

const CHECKS = [
  {
    n: '01',
    icon: ScanSearch,
    k: '自動化檢查',
    en: 'Automated Checks',
    when: '每次改完、提交之前，以及 CI 流程裡',
    how: '單元測試、Lint、靜態分析，加上相依套件與金鑰的掃描。共同點是照既有的名單或規則比對，每次結果一樣。',
    find: '測試沒過、已經被登記的漏洞，以及規則認得出來的寫法問題。',
    limit: '不在檢查範圍裡的商業邏輯缺陷與還沒有人登記的漏洞，它看不到。',
  },
  {
    n: '02',
    icon: Bot,
    k: 'AI 輔助審查',
    en: 'AI-assisted Review',
    when: '重要功能做完或改完之後',
    how: '開另一輪沒有參與實作的 AI，拿你的規格、這次的程式碼變更與安全清單逐條去對。',
    find: '可能的邏輯問題、漏掉的情況，以及看起來可疑的寫法。',
    limit: '它可能誤判，也可能跟著原本的錯誤一起走。它指出來的每一條都要有證據，而且要再驗一次。',
  },
  {
    n: '03',
    icon: Swords,
    k: '專業安全驗證',
    en: 'Professional Security Validation',
    when: '看專案的風險、法遵或客戶要求',
    how: '專業的程式碼審查與安全測試，必要時做經過授權的滲透測試。',
    find: '在談好的測試範圍裡，真的可以被利用的弱點，以及權限與流程上的漏洞。',
    limit: '它只對談好的範圍與測試當下那個時間點提供證據，不能保證沒有別的漏洞。而且要由有資格、拿到授權的人來做：沒有授權就去測別人的系統，在台灣可能觸法。',
  },
];

const STARTERS = [
  ['Dependabot', '相依套件的已知漏洞'],
  ['GitHub Secret Scanning', '被寫進程式碼的金鑰與密碼'],
  ['npm audit', 'npm 專案的相依套件'],
];

export default function SlideShipScan() {
  return (
    <SlideLayout
      title="Agent 寫完程式，怎麼確認沒有留下問題？"
      subtitle="Verify the Output"
      icon={ScanSearch}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          三種檢查方式找得到的問題不一樣，
          <strong className="text-slate-100">它們是互相補的，不是做完一個才做下一個。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CHECKS.map((c, i) => (
            <AnimatedBlock
              key={c.en}
              stepIndex={i + 2}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-slate-600">{c.n}</span>
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-100">
                  <c.icon aria-hidden="true" size={17} className="shrink-0 text-sky-400" />
                  {c.k}
                </h3>
              </div>
              <div className="font-mono text-xs leading-tight text-slate-600">{c.en}</div>
              <dl className="mt-3 space-y-2 text-sm leading-relaxed">
                {[
                  ['時機', c.when, 'text-slate-400'],
                  ['方法', c.how, 'text-slate-400'],
                  ['能發現', c.find, 'text-slate-300'],
                  ['限制', c.limit, 'text-slate-500'],
                ].map(([label, text, tone]) => (
                  <div key={label as string}>
                    <dt className="text-xs font-medium text-sky-400/80">{label}</dt>
                    <dd className={`${tone} mt-0.5`}>{text}</dd>
                  </div>
                ))}
              </dl>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3.5">
          <p className="text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-200">起步工具：</strong>
            {STARTERS.map(([t, d], i) => (
              <span key={t}>
                {i > 0 && '、'}
                <span className="font-medium text-slate-200">{t}</span>
                <span className="text-slate-500">（{d}）</span>
              </span>
            ))}
            。
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            這些工具各有自己的檢查範圍，跑完不等於做過一次完整的網站安全測試。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} as="p" className="border-t border-slate-800 pt-3 text-base leading-relaxed text-slate-100 font-bold">
          沒有任何一種檢查能保證程式是安全的。少掉其中一種，那一類問題就沒有人看得到。
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
