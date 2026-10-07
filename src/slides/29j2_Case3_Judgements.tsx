import { ShieldQuestion } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例三的收尾，也是三個案例那條線的最後一塊。另外兩塊在
 * 〈器 VESSEL 的十二步〉的下半與〈這件事該交給誰做〉。三頁的開頭互相引用，改一頁要改三頁。
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
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { k: '案例一問的是', v: '這個東西該不該存在' },
            { k: '案例二問的是', v: '這件事該交給誰做' },
          ].map((c) => (
            <div key={c.k} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">{c.k}</div>
              <p className="text-slate-300 text-base leading-relaxed">{c.v}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
              這個案例問的是
            </div>
            <p className="text-slate-100 text-base font-bold leading-relaxed">這件事可以相信誰</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            三個案例的判斷加起來十六條。這五條是最後一組，問的都是同一件事：這一層靠不靠得住。
          </p>
          <ul className="space-y-2">
            {JUDGEMENTS.map((j) => (
              <li
                key={j.q}
                className={`rounded-xl border px-4 py-3 ${
                  j.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm font-bold ${j.key ? 'text-sky-200' : 'text-slate-100'}`}>
                    {j.q}
                  </span>
                  {j.key && (
                    <span className="font-mono text-xs text-sky-400 shrink-0">你剛才親手驗過的那一條</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-0.5">判斷依據：{j.by}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-1 border-t border-slate-800 pt-1.5">
                  判斷錯的代價：{j.cost}
                </p>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="focus" label="三個案例，十六條判斷，同一件事" stepIndex={3}>
          每一條都有一個共通點：
          <strong className="text-slate-100">它們問的都是你對這件事的理解，不是語法怎麼寫。</strong>
          語法那一半 AI 已經做得比你好，所以你剩下的工作就是這十六條這種題目。
        </Callout>

      </div>
    </SlideLayout>
  );
}
