import { PackageCheck, FileCode, KeyRound, ListChecks, CircleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 8-7 倒數第二頁。2026-11-09 新增。
 *
 * 來源：同日的 Codex 審查，三輪都指到同一個缺口。整門課最後問的是
 * 「能交辦嗎、能驗收嗎、能再做一次嗎」（`33_Outro`），但那三題裡的「交辦」
 * 從頭到尾指的是**交給 Agent**；換一個人接手要什麼，全片沒有一頁講。
 * `28d_M4_ProjectMemory` 的「由誰維護」講的是文件，`28e_M4_WhenToAdd` 的
 * 「還有沒有人在維護」講的是工具，兩個都不是這件事。
 *
 * ── 2026-11-09 同日重寫口吻（講師：整頁很 AI）──────────────────
 * 被指名換掉的，不要寫回來：
 *   「這套流程現在跑得動，是因為你在。」→ 證明不了的斷言，而且太戲劇。
 *   「沒有人認領的那一題，答案就是你。」→ 收尾金句（D-2）。責任沒有分配，不會自己成立。
 *   「他卡住的那幾個地方，就是文件還缺的那幾塊。」→ 卡住也可能是權限沒開或程式有問題，
 *     不能全部歸到文件上。
 *   四格的小標「東西本身／進得去的東西／怎麼知道它是好的／已知的坑」→ 空心的詞（D-2），
 *     讀者光看小標認不出那一格在列什麼。
 *
 * ── 這一頁刻意不做的事 ──────────────────────────────────
 * **不要擴成正式環境的維運課。**（`33_Outro` 已經有一句「維運那邊還有另一套要求」，
 * 那一句留著。）這一頁只收三樣：交出去的東西、交出去之後誰負責、怎麼驗交接成功。
 * **不要列部署或監控工具。**
 *
 * ── 第三塊是這一頁的驗收方式，不要刪 ──────────────────────
 * 「請接手的人照文件自己跑一次，你不在旁邊解釋」來自講義〈上線前自查卡〉第 3 題
 * （`public/handouts/ship-check.md`），那一題原本只驗「別人用不用得起來」，
 * 這一頁把它延伸到「別人維護得下去」。兩邊要一起改。
 *
 * 用色：sky（三塊的小標與圖示）一種（A-1）。
 */

const PACK = [
  { icon: FileCode, k: '程式與怎麼跑起來', v: '程式碼放在哪、現在用的是哪一版、怎麼啟動、怎麼更新正在跑的那一版。' },
  { icon: KeyRound, k: '帳號與權限', v: '要哪些帳號與權限、找誰開。文件只寫這個帳號做什麼，密碼另外用你們約好的方式給。' },
  { icon: ListChecks, k: '驗收條件與測試資料', v: '驗收條件、上一次驗收的紀錄，以及一批可以重跑的測試資料。' },
  { icon: CircleAlert, k: '已知的問題與限制', v: '已經發現的問題、還沒做完的功能，以及目前不支援的用法。' },
];

const OWNER = [
  '壞掉的時候誰處理，怎麼聯絡他',
  '文件與套件誰更新，多久檢查一次',
  '外部服務的錢誰付，用量誰檢查',
  '之後要改功能，誰確認需求、誰動手',
];

export default function SlideHandover() {
  return (
    <SlideLayout
      title="交給別人之後，誰接手、誰維護"
      subtitle="Handover"
      icon={PackageCheck}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          交出去之後，接手的人要能自己啟動、自己檢查結果，
          <strong className="text-slate-100">出錯的時候知道找誰。</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <h3 className="mb-2 text-base font-bold text-slate-100">一、要交出去的東西</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {PACK.map((p) => (
              <div key={p.k} className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-100">
                  <p.icon aria-hidden="true" size={16} className="shrink-0 text-sky-400" />
                  {p.k}
                </h4>
                <p className="mt-0.5 text-sm leading-relaxed text-slate-400">{p.v}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatedBlock stepIndex={3}>
            <h3 className="mb-1.5 text-base font-bold text-slate-100">二、交出去之後，誰負責</h3>
            <ul className="space-y-1 text-sm leading-relaxed text-slate-400">
              {OWNER.map((o) => (
                <li key={o} className="flex gap-2">
                  <span className="text-slate-600">·</span>
                  <span className="min-w-0">{o}</span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              每一題寫上人名與聯絡方式，而且讓那個人自己確認過。
              <strong className="text-slate-400">還沒有人接的，標成待協調，約一個時間再決定。</strong>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4}>
            <h3 className="mb-1.5 text-base font-bold text-slate-100">三、怎麼知道交接成功了</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              請接手的人照你那份文件，自己跑一次完整的流程：啟動、換一批測試資料、照驗收條件對一遍，
              <strong className="text-slate-200">而你不在旁邊解釋</strong>。
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              他卡住的地方記下來，再確認是文件少寫了一步、權限還沒開，還是程式本身有問題。
              處理完請他重試那一步。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
