import { CalendarCheck, Check, X } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import { CaseHandbook } from '../components/CaseHandbook';
import kilnShot from '../../assets/cases/case-03-kiln.jpg';

const ROUTE = [
  { label: '起點', text: '一個空資料夾、一個新開的練習用資料庫專案、兩個測試用的信箱' },
  { label: '過程', text: '先判斷需不需要資料庫，再設計兩張表與兩層權限。用測試證明規則擋得住，才接畫面、登入與預約。最後親手重現一個漏洞並修掉' },
  { label: '產出', text: '一個可以登入、預約、取消的網站，以及一份在正式環境驗過的權限規則' },
];

/**
 * 2026-10-31 對照手冊 case-03-kiln.pdf（講師要求）校正兩處：
 *   - 路線圖的「過程」漏了手冊寫的最後一句「最後親手重現一個漏洞並修掉」，
 *     而那正是 Slide 181 整頁在講的事。
 *   - 「用什麼做」原本寫「網站框架加上一個託管的資料庫」，手冊寫的是
 *     案例一「參考成品是單一 HTML 檔；你自己做的版本是 Astro 專案」、
 *     這個案例「Astro + Supabase」。兩個案例用的是同一套框架，泛稱會把這件事蓋掉。
 *     Astro 是什麼寫在 Slide 183 的技術那一條（案例四的手冊也是在那裡第一次解釋它）。
 *
 * 2026-10-30 把這一段從三句話改成條列（講師：太模糊）。原本是「它會動到真的資料庫：
 * 反覆建表⋯只能用新開的練習專案、假資料、你自己的測試信箱。公司正式資料、客戶資料，
 * 以及任何正在服務真實使用者的環境都不行」。問題是「只能用」與「都不行」兩串都塞在
 * 散文裡，學員要自己拆，而這是一段**照著做會出事**的警告，不是說明。
 * 兩欄用 Check／X 的圖形區分，不另外上色（A-1：分組用圖形不用顏色，而且這一頁
 * 已經有 amber）。**要加項目就加進陣列，不要寫回句子。**
 *
 * 2026-10-30 右欄換掉（講師：「這個案例本來就不會用我公司的資料」）。原本寫的是
 * 「公司的正式資料／客戶資料／任何正在服務真實使用者的環境」，前兩條是制式的免責語氣，
 * 而這個案例做的是開窯預約的練習站，學員根本不會把公司資料灌進去。
 * **真正會發生的是拿既有的專案來練**：課程前面〈把紀錄搬上 Supabase〉已經讓他建過一個，
 * 而這個案例會反覆建表、改權限、灌示範資料。所以右欄現在指名那一個專案。
 * 寄信那一條也從抽象的「客戶資料」改成「別人的 email」，因為流程真的會寄出去。
 */
const DATA_OK = [
  '新開一個練習用的資料庫專案',
  '自己編的假資料（窯次、名額、報名的人）',
  '你自己的測試信箱，收得到信的那個',
];

const DATA_NO = [
  '計時器那個 Supabase 專案（這裡要新開一個）',
  '任何已經有人在用的網站或資料庫',
  '別人的 email，包括同事與朋友',
];

/**
 * 2026-10-31 設計規範那一段從散文改成條列。原本三句話把「搬過來的是什麼」與
 * 「多出來的是什麼」黏在一起，而這兩件事是學員回去真的要做的動作。
 */
const SPEC_REUSE = [
  { k: '沿用', v: '同一組顏色、同一組字體、同樣的 2px 圓角、同一份禁用清單' },
  { k: '新增', v: '案例一沒有表單，這裡有，所以多了五種狀態（輸入框、載入中、錯誤、成功、額滿）' },
];

const SAME_BRAND = [
  { row: '是什麼', one: '品牌首頁，一頁式', three: '開窯預約' },
  { row: '用什麼做', one: '參考成品是單一個 HTML 檔，你自己做的是 Astro 專案', three: 'Astro 加上 Supabase' },
  {
    row: '為什麼不同',
    one: '沒有資料處理和互動機制，不需要第三方工具',
    three: '帳號管理、資料管理和多人同時寫入',
  },
];

export default function SlideCase3Kiln() {
  return (
    <SlideLayout
      title="案例三：開窯預約"
      subtitle="Case 03 · 可以登入與預約的開窯網站"
      icon={CalendarCheck}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          <div className="md:col-span-3">
            <CaseShot
              src={kilnShot}
              alt="開窯預約的畫面：大標題「開窯」與一段說明，往下是近期窯次，導覽列有開窯場次與我的預約兩項"
              url="https://case-03-kiln.samioo.chatgpt.site/"
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-5 py-4">
              <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
                這個案例要回答的問題
              </div>
              {/*
                2026-10-31（講師：略微抽象）重寫。原本是「哪些事情，不能只相信前端？」，
                「哪些事情」沒有指到東西，學員要讀完整個案例才知道是哪幾件。
                現在直接寫這個案例真的處理的那兩件（別人的資料、額滿的名額），
                句型跟案例四那一頁一致：先給情境，再問一題。
                **改這一句要回頭看它涵蓋的是不是真的那兩件**，案例三的五個判斷裡
                前三條講權限與資料、第五條講版本，搶名額那一條在 Slide 181。
              */}
              <p className="text-slate-100 text-base font-bold leading-relaxed">
                同一個網站上放著每個人的預約。怎麼確定別人看不到你的那幾筆，
                也搶不走已經額滿的名額？
              </p>
            </div>

            <dl className="space-y-3">
              {ROUTE.map((r) => (
                <div key={r.label} className="flex gap-3">
                  <dt className="w-10 shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500 pt-1">
                    {r.label}
                  </dt>
                  <dd className="text-slate-300 text-sm leading-relaxed">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">它和案例一是同一個品牌的兩個部分</h3>
          <p className="text-sm text-slate-400 mb-4">判斷標準：有帳號、有資料、有多人同時寫入，三個中一個就需要資料庫。</p>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-950 text-slate-500">
                  <th className="w-24 px-4 py-2 text-left font-normal" />
                  <th className="px-4 py-2 text-left font-normal">案例一做的</th>
                  <th className="px-4 py-2 text-left font-normal">這個案例做的</th>
                </tr>
              </thead>
              <tbody>
                {SAME_BRAND.map((r) => (
                  <tr key={r.row} className="border-t border-slate-800">
                    <td className="whitespace-nowrap px-4 py-2.5 text-slate-500">{r.row}</td>
                    <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{r.one}</td>
                    <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{r.three}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-100 text-sm font-bold leading-relaxed mt-4">
            案例一那份設計規範搬過來不用重寫
          </p>
          <ul className="mt-1.5 space-y-1">
            {SPEC_REUSE.map((s) => (
              <li key={s.k} className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                <span className="shrink-0 text-slate-600">・</span>
                <span className="shrink-0 font-bold text-slate-200">{s.k}</span>
                <span className="flex-1 min-w-0 text-slate-400">{s.v}</span>
              </li>
            ))}
          </ul>

        </AnimatedBlock>

        <Callout tone="warn" label="這個案例只能用練習用的資料" stepIndex={3}>
          它會動到真的資料庫：反覆建表、改權限、灌示範資料，還會把某一窯的名額直接改到只剩一個。
          <span className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <span className="block">
              <span className="mb-1 block text-slate-100 text-sm font-bold">可以使用</span>
              {DATA_OK.map((d) => (
                <span key={d} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                  <Check aria-hidden="true" size={14} className="mt-1 shrink-0 text-slate-500" />
                  {d}
                </span>
              ))}
            </span>
            <span className="block">
              <span className="mb-1 block text-slate-100 text-sm font-bold">避免使用</span>
              {DATA_NO.map((d) => (
                <span key={d} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                  <X aria-hidden="true" size={14} className="mt-1 shrink-0 text-slate-500" />
                  {d}
                </span>
              ))}
            </span>
          </span>
        </Callout>

        <AnimatedBlock stepIndex={4}>
          <CaseHandbook
            file="case-03-kiln.pdf"
            title="開窯預約：有帳號與資料的網站"
            hours="約 7.8 小時"
          />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
