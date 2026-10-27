import { Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元「撰寫測試」的第二頁：值不值得寫，以及怎麼叫它寫。2026-10-27 新增，同日從章節七搬到章節三。
 *
 * **Happy Test 那一條是講師特別要求的。** AI 補測試最常見的產出就是只測成功路徑、
 * 而且永遠會過。Prompt 裡有兩條在擋它：清單裡至少一半是失敗情境，
 * 以及寫完先把功能改壞一次、確認測試真的變紅。**這兩條不要刪，也不要縮寫。**
 *
 * 值得／不值得走 emerald 與 rose，那是同一個判斷的兩邊，合計算一種強調色（A-1）。
 */
const WORTH = [
  '每次改完你都會手動確認的那一件事',
  '有數字或規則的地方：金額、日期、權限、名額',
  '壞過一次的地方。修好的同一輪補一條，它才不會再壞第二次',
  '要給別人接的 API：回傳的格式與錯誤代碼',
];

const NOT_WORTH = [
  '只跑一次的腳本，跑完就丟',
  '純樣式與文案：顏色、間距、改一個字',
  '還在換方向的原型，介面每天都不一樣',
  '為了湊數量而寫的，例如「這個函式有沒有被呼叫過」',
];

const TEST_PROMPT = `幫我替 ⟨這個功能⟩ 補測試。先不要動功能的程式。

1. 先列出你打算測哪幾條，每一條寫「給什麼輸入、預期什麼結果」，讓我確認之後再寫。清單裡至少要有一半是失敗的情境：空的、超過上限、沒有權限、重複送出、順序顛倒。

2. 我確認之後再寫，照這幾個要求：
   - 一個測試只驗一件事，測試的名字就寫那件事，例如「剩 0 秒時不會變成負數」
   - 測看得到的結果，不要測內部怎麼實作（函式叫什麼、被呼叫幾次）
   - 每一條都要能單獨跑，不依賴現在幾點、亂數或網路

3. 寫完先證明它會失敗：把功能故意改壞一次，確認對應的測試真的變紅，再改回來。

4. 最後給我一行可以直接跑的指令，以及每一條測試在驗什麼的白話清單。`;

export default function SlideTestWorth() {
  return (
    <SlideLayout
      title="哪些值得寫，以及怎麼叫它寫"
      subtitle="What to Test, and How to Ask for It"
      icon={Scale}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">值不值得寫，先問這一句</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            <strong className="text-slate-100">你會不會每次改完都手動確認同一件事？</strong>
            會，就把那件事寫成測試。測試有成本，寫了要維護，所以不是每一塊都要有。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ul className="space-y-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
              <li className="text-emerald-200 text-sm font-bold mb-1">值得寫</li>
              {WORTH.map((w) => (
                <li key={w} className="text-slate-300 text-sm leading-relaxed">{w}</li>
              ))}
            </ul>
            <ul className="space-y-1.5 rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
              <li className="text-rose-200 text-sm font-bold mb-1">不值得寫</li>
              {NOT_WORTH.map((w) => (
                <li key={w} className="text-slate-300 text-sm leading-relaxed">{w}</li>
              ))}
            </ul>
          </div>
        </AnimatedBlock>

        <Callout tone="warn" label="它補出來的測試，多半只測成功的那條路" stepIndex={2}>
          不講清楚的話，它給的清單會是輸入正確、權限正確、網路正常，全部一次就綠。
          那種測試的問題是你改壞了它也不會紅。
          <strong className="text-slate-100">所以清單裡一定要有失敗的情境，而且寫完要把功能改壞一次，確認對應的那條真的變紅。</strong>
        </Callout>

        <AnimatedBlock stepIndex={3} className="space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-base font-bold text-slate-100">怎麼叫它寫</h3>
            <p className="text-slate-500 text-sm">只改 ⟨⟩ 裡的功能名稱，其餘整段照貼</p>
          </div>
          <CopyBlock text={TEST_PROMPT} size="xs" note="先列清單、再寫、寫完證明它會失敗" />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
