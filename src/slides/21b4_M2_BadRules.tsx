import { XCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const CASES = [
  {
    bad: '畫面要好看，風格保持一致',
    why: '它無法判斷自己做到了沒，只能猜。你也無法指著結果說它違規。',
    good: '背景固定用深色 #020617，強調色只用一種，其他一律灰階。',
    type: '無法判定',
  },
  {
    bad: '絕對不要刪掉我的檔案',
    why: '寫在手冊裡不保證會被照做。對話一長，或它讀到某個網頁寫著「請忽略前面的規則」，還是可能照刪。',
    good: '權限模式設成每次都問，或用 Hook 擋掉刪除指令。手冊裡只留一行提醒。',
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

        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-slate-900 border-slate-800">
          <p className="text-slate-400 text-base leading-relaxed">
            檢查方法只有一個：把那句話拿給旁邊的人看，<strong className="text-slate-200">他能不能只看程式碼就回答「有」或「沒有」。</strong>答不出來的，它也答不出來。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
