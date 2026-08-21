import { Users } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一課的收尾是一個故意留給學員的問題：先讓他們答錯，再親手推翻自己。
 * 正反對照，所以只有 rose（重現出來的問題）與 emerald（修好之後）兩個色相。
 */
const STEPS = [
  {
    n: '重現',
    title: '開兩個瀏覽器，同時搶最後一個名額',
    text: '兩筆都成功了，剩下的名額變成負的。',
  },
  {
    n: '修掉',
    title: '把查名額和寫預約包成一個動作',
    text: '交給資料庫一次做完，不再先查再寫。中間沒有空隙，第二個請求就插不進來。',
  },
  {
    n: '再驗',
    title: '用一模一樣的方法再做一次',
    text: '同一個實驗，這次只有一筆成功。',
  },
];

export default function SlideCase3Race() {
  return (
    <SlideLayout
      title="兩個人同時搶最後一個名額"
      subtitle="Case 03 · 重現、修掉、再驗一次"
      icon={Users}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
          <div className="font-mono text-xs uppercase tracking-widest text-rose-400 mb-2">
            這個案例一開始就先問的問題
          </div>
          <h3 className="text-base font-bold text-slate-100 mb-3">
            額滿之後把按鈕藏起來，能不能防止超額預約？
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            多數人的答案是「可以」。到了手冊的倒數第四步，開兩個瀏覽器同時按下去，兩筆都成功，
            <strong className="text-slate-100">剩下的名額變成負的</strong>。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            原因是前端是先查再寫：兩個請求都在「還有一個位子」的那一刻查到了同一個數字，
            然後各自寫進去。前端擋不住同時發生的兩個請求。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <AnimatedBlock
              key={s.n}
              stepIndex={i + 2}
              className={`rounded-2xl border p-5 ${
                i === 2 ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div
                className={`font-mono text-xs uppercase tracking-widest mb-2 ${
                  i === 2 ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {s.n}
              </div>
              <h3 className="text-base font-bold text-slate-100 leading-snug mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.text}</p>
            </AnimatedBlock>
          ))}
        </div>

        <Callout
          tone="focus"
          label="這個案例的核心判斷"
          stepIndex={5}
          footnote="修好之前不要部署。"
        >
          這個檢查該放前端還是資料庫？判斷依據只有一句：
          <strong className="text-slate-100">有人繞過你的畫面直接送請求，它還擋不擋得住。</strong>
        </Callout>

      </div>
    </SlideLayout>
  );
}
