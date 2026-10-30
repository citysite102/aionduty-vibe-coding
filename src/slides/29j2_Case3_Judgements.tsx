import { ShieldQuestion } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { JudgementTable } from '../components/JudgementTable';

/**
 * 案例三的收尾。另外三塊在〈器 VESSEL 的十二步〉的下半、〈這件事該交給誰做〉與
 * 〈改完拿什麼證明沒壞〉。四頁的開頭互相引用，改一頁要改四頁。
 *
 * 2026-10-23 加了案例四之後，整條線的收尾搬去案例四那一頁（收尾只能有一個，
 * 而它現在才是最後一個案例）。這一頁的 Callout 改成只收案例三自己這五條。
 *
 * 資料來源 case-03-kiln.pdf 的〈五個判斷〉。階段編號同樣只標關鍵那一條，理由見案例二那一頁。
 *
 * 只有第 2 條標 sky：它在第 3 步被提出來，第 13 步由學員親手驗證，
 * 而第 13 步就是前一頁那個搶名額的實驗。兩頁指的是同一條，不要在這裡重講一次實驗怎麼做。
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
    keyNote: '你剛才親手驗過的那一條',
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
      title="這件事可以相信誰：案例三的五個判斷"
      subtitle="Case 03 · AI 幫不了你的那幾個決定"
      icon={ShieldQuestion}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { k: '案例一問的是', v: '這個東西該不該存在' },
            { k: '案例二問的是', v: '這件事該交給誰做' },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">{c.k}</div>
              <p className="text-slate-300 text-base leading-relaxed">{c.v}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
              這個案例問的是
            </div>
            <p className="text-slate-100 text-base font-bold leading-relaxed">這件事可以相信誰</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <JudgementTable items={JUDGEMENTS} />
        </AnimatedBlock>

        <Callout tone="focus" label="寫了不等於生效" stepIndex={3}>
          前四條問的是這一層擋不擋得住，最後一條問的是你驗過了沒有。
          <strong className="text-slate-100">沒有換一個身分實際測過，兩層權限你只知道有寫，不知道有沒有生效。</strong>
        </Callout>

      </div>
    </SlideLayout>
  );
}
