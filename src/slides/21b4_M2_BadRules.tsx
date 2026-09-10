import { XCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const CASES = [
  {
    bad: '回覆要專業一點',
    why: '專業是你心裡的標準，它沒有辦法對照。做完了它自己也不知道算不算達成。',
    good: '不要用驚嘆號，不要用「輕鬆搞定」這類說法，專有名詞第一次出現時附上英文原文。',
    type: '無法判定',
  },
  {
    bad: '不要直接把東西推上 main 分支',
    why: '寫在手冊裡不保證會被照做。對話一長它就把這條當成背景，而這種事錯一次就收不回來。',
    good: '在 Hook 或 GitHub 的分支保護裡擋掉，讓程式攔。手冊裡只留一行提醒。',
    type: '該用機制',
  },
  {
    bad: '照之前的做法，維持原本的風格',
    why: '「之前」是哪一次？它不知道。你心裡想的那一版，它沒有辦法回頭找。',
    good: '直接把那個做法寫出來，或指名檔案：按鈕樣式參考 src/components/Button.tsx。',
    type: '指涉不明',
  },
];

export default function SlideM2BadRules() {
  return (
    <SlideLayout title="這三種寫法，寫了等於沒寫" subtitle="Rules That Do Nothing" icon={XCircle}>
      <div className="max-w-6xl mx-auto space-y-3 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          這三種的共通點是：<strong className="text-slate-200">看起來很像規矩，但沒有任何一句能被驗證。</strong>
        </AnimatedBlock>

        {CASES.map((c, i) => (
          <AnimatedBlock
            key={c.bad}
            stepIndex={i + 2}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-400 font-mono text-xs">✕</span>
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-widest">{c.type}</span>
                </div>
                <div className="text-red-300 text-sm font-bold mb-2">「{c.bad}」</div>
                <p className="text-slate-500 text-xs leading-relaxed">{c.why}</p>
              </div>
              <div className="lg:border-l lg:border-slate-800 lg:pl-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-mono text-xs">✓</span>
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-widest">改成</span>
                </div>
                <div className="text-emerald-300 text-sm leading-relaxed">{c.good}</div>
              </div>
            </div>
          </AnimatedBlock>
        ))}

        {/*
          原本是「把那句話拿給旁邊的人看」。自學的人沒有旁邊的人，
          但那句的功能是「不需要別人幫忙的可驗證性測試」，所以替代的也要自己執行得了：
          先自己答一次，答不出來就把句子貼回去問它怎麼判斷，兩步都當場驗得出來。
        */}
        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-slate-900 border-slate-800 space-y-1.5">
          <p className="text-slate-400 text-base leading-relaxed">
            檢查方法只有一個：<strong className="text-slate-200">只看程式碼，你能不能回答「有」或「沒有」。</strong>你自己答不出來的，它也答不出來。
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            還是不確定，就把那句話貼給它，問「照這句話，你要怎麼判斷自己做到了沒」。
            它只能回答「我會注意」，這條就是寫了等於沒寫。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
