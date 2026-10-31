import { ShieldQuestion } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { JudgementTable } from '../components/JudgementTable';

/**
 * 案例三的收尾。另外三塊在〈器 VESSEL 的十二步〉的下半、〈案例二的六個判斷〉與
 * 〈案例四的八個判斷〉。
 *
 * 2026-10-23 加了案例四之後，整條線的收尾搬去案例四那一頁（收尾只能有一個，
 * 而它現在才是最後一個案例）。這一頁的 Callout 改成只收案例三自己這五條。
 *
 * 資料來源 case-03-kiln.pdf 的〈五個判斷〉。階段編號同樣只標關鍵那一條，理由見案例二那一頁。
 *
 * 只有第 2 條標 sky：它在第 3 步被提出來，第 13 步由學員親手驗證，
 * 而第 13 步就是前一頁那個搶名額的實驗。兩頁指的是同一條，不要在這裡重講一次實驗怎麼做。
 *
 * 2026-10-31 整排「案例 N 問的是」拿掉了（講師：「這四個案例這種配置都有點為湊而湊，
 * 我不覺得案例三是在講可以相信誰」）。逐頁核對過各自的判斷清單，四個標籤只有案例一
 * 勉強對得上其中一條：案例二六條全是「自己寫還是用現成的」、案例三五條全是「放在哪
 * 一層」、案例四八條沒有共同主題。那一排是事後補出來的敘事軸，不是這四個案例本來的
 * 樣子。頁標題的前綴也一起拿掉了。**不要再補一個統一的敘事軸上去**，四個案例各自的
 * 判斷清單自己站得住；真的要串，串的是「這些題目 AI 都幫不了你」那一句（收尾已經有）。
 */
const JUDGEMENTS = [
  {
    q: '這個需求需不需要資料庫',
    by: '把資料寫死在程式碼裡，什麼會壞掉',
    cost: '多一個要備份、要付錢、會掛掉的東西',
  },
  {
    q: '這個檢查放前端還是資料庫',
    by: '有人繞過網頁直接送請求，還擋得住嗎',
    cost: '資料外洩，而且畫面上完全看不出來',
    key: true,
    keyNote: '我們驗過的項目',
  },
  {
    q: '這個數字前端算不算得出來',
    by: '前端手上有沒有那些資料',
    cost: '為了算一個數字，把不該給的資料全給出去',
  },
  {
    q: '這個規則有沒有真的生效',
    by: '有沒有換一個身分實際測過',
    cost: '你以為兩層都在守，其實只有一層',
  },
  {
    q: '這個版本可不可以對外',
    by: '已知的問題修掉了嗎、驗過了嗎',
    cost: '上線一個你知道會出錯的東西',
  },
];

export default function SlideCase3Judgements() {
  return (
    <SlideLayout
      title="AI 無法幫你決定的事情"
      subtitle="Case 03 · 判斷依據與判斷錯的代價"
      icon={ShieldQuestion}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        <AnimatedBlock stepIndex={1}>
          <JudgementTable items={JUDGEMENTS} />
        </AnimatedBlock>

        {/*
          2026-10-31（講師：太 AI）重寫。原本是「前四條問的是⋯最後一條問的是⋯」
          加上「你只知道有寫，不知道有沒有生效」，前半在描述這張表自己的結構，
          後半是對仗。現在直接給那個動作：換一個帳號登入，去讀別人的那幾筆。
        */}
        <Callout tone="focus" label="寫了不等於生效" stepIndex={2}>
          規則寫完之後，用第二個測試帳號登入，去讀另一個人的預約。
          <strong className="text-slate-100">讀得到，就是那條規則沒有擋住。</strong>
        </Callout>

      </div>
    </SlideLayout>
  );
}
