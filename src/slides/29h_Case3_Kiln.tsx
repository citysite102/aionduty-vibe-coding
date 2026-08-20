import { CalendarCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseShot } from '../components/CaseShot';
import kilnShot from '../../assets/cases/case-03-kiln.jpg';

const ROUTE = [
  { label: '起點', text: '一個空資料夾、一個新開的練習用資料庫專案、兩個測試用的信箱' },
  { label: '過程', text: '先判斷需不需要資料庫，再設計兩張表與兩層權限。規則測過擋得住，才接畫面、登入與預約' },
  { label: '產出', text: '一個可以登入、預約、取消的網站，以及一份在正式環境驗過的權限規則' },
];

const SAME_BRAND = [
  { row: '是什麼', one: '品牌首頁，一頁式', three: '開窯預約' },
  { row: '用什麼做', one: '單一個 HTML 檔案', three: '網站框架加上一個託管的資料庫' },
  {
    row: '為什麼不同',
    one: '沒有資料、沒有互動，所以不需要任何工具',
    three: '有帳號、有資料、有多人同時寫入，所以需要',
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
              <p className="text-slate-100 text-base font-bold leading-relaxed">
                哪些事情，不能只相信前端？
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
          <h3 className="text-base font-bold text-slate-100 mb-4">它和案例一是同一個品牌的兩半</h3>
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
                    <td className="px-4 py-2.5 text-slate-500">{r.row}</td>
                    <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{r.one}</td>
                    <td className="px-4 py-2.5 text-slate-300 leading-relaxed">{r.three}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mt-4">
            <strong className="text-slate-100">案例一那份設計規範搬過來不用重寫。</strong>
            同一組顏色、同一組字體、同樣的 2px 圓角、同一份禁用清單。
            差別只有一處：案例一沒有表單，這裡有，所以規範多了五種狀態（輸入框、載入中、錯誤、成功、額滿）。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            同一個品牌的兩個網站看起來不像同一家，那不是風格不同，是規範沒有生效。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" label="這個案例只能用練習用的資料" stepIndex={3}>
          它會動到真的資料庫：反覆建表、改權限、灌示範資料，還會把某一窯的名額直接改到只剩一個。
          <strong className="text-slate-100">只能用新開的練習專案、假資料、你自己的測試信箱。</strong>
          公司正式資料、客戶資料，以及任何正在服務真實使用者的環境都不行。
        </Callout>

      </div>
    </SlideLayout>
  );
}
