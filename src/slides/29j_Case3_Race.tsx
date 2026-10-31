import { Users } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一課的收尾是一個故意留給學員的問題：先讓他們答錯，再親手推翻自己。
 * 正反對照，所以只有 rose（重現出來的問題）與 emerald（修好之後）兩個色相。
 *
 * 2026-10-06 對照 case-03-kiln.pdf 改過兩處：
 *   - 原本寫「倒數第四步」，但手冊是 17 個階段、重現是第 13 步，倒數第四是第 14 步。改成直接寫第 13 步，
 *     不要用倒數，手冊加一步就會錯而且沒有人會發現。
 *   - 補上兩個終點。手冊自己把這個漏洞標成等級的分界（第 12 步結束是有已知漏洞的版本），
 *     那是這一頁最有說服力的一句，原本整頁沒有提到。
 */
const STEPS = [
  {
    n: '重現',
    title: '開兩個瀏覽器、各自用一個測試帳號登入，同時搶最後一個名額',
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

/** 2026-10-31 開場從兩段散文改成三條。原本「多數人的答案是可以⋯」與「原因是前端是
 *  先查再寫⋯」兩段，把答案、實測結果與原因黏成一塊，而這三件是學員要分開記的。 */
const RACE = [
  { k: '多數人的答案', v: '可以。按鈕藏起來，就按不到了。' },
  { k: '實際做一次', v: '手冊裡有一步就是叫你開兩個瀏覽器同時按下去。兩筆都成功，剩下的名額變成負的。' },
  { k: '原因', v: '前端是先查再寫。兩個請求都在「還有一個位子」的那一刻查到同一個數字，然後各自寫進去。' },
];

/** 這一頁的兩個漏洞並排。第三條是它們的共同原因，也是下一頁那張判斷表的第一欄。 */
const SAME_ROOT = [
  { k: '同時按下去', v: '兩個人都在「還有一個位子」的那一刻查到同一個數字。就是剛才那個實驗撞到的。' },
  { k: '不經過網頁', v: '有人寫一小段程式直接送一筆預約，從頭到尾沒看過你的按鈕。這是另一條路，手冊後面會堵掉。' },
  { k: '共同原因', v: '檢查寫在前端。前端只管得到「用你的網頁、而且一次只有一個人」的情況。' },
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
          <h3 className="text-base font-bold text-slate-100 mb-3">
            額滿之後把按鈕藏起來，能不能防止超額預約？
          </h3>
          <ul className="space-y-1.5">
            {RACE.map((r) => (
              <li key={r.k} className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                <span className="w-24 shrink-0 whitespace-nowrap font-bold text-slate-200">{r.k}</span>
                <span className="flex-1 min-w-0 text-slate-400">{r.v}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-300 text-sm leading-relaxed mt-3 border-t border-rose-500/20 pt-2.5">
            <strong className="text-slate-100">前端擋不住同時發生的兩個請求。</strong>
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

        <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">手冊裡面有說明這個漏洞</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            網站第一次會動的時候，看得到場次、登入得了、預約得了、也取消得了。
            漏洞那時候已經在裡面，只是還沒有人去撞它。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
              <div className="text-xs text-slate-500 mb-1">網站第一次會動</div>
              <div className="text-slate-200 text-sm font-bold">有已知漏洞，不能對外</div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-4 py-3">
              <div className="text-xs text-emerald-400 mb-1">兩條路都堵掉之後</div>
              <div className="text-emerald-200 text-sm font-bold">可以給人試用</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-4">
            中間差的是重現、修掉、再驗那三步，再加一步：把繞過網頁直接送請求的那條路也堵掉。
            <strong className="text-slate-200">畫面上的按鈕只是其中一條路，不是唯一一條。</strong>
          </p>
        </AnimatedBlock>

        {/*
          2026-10-31（講師：看不懂怎麼教，也看不出跟前面的連貫性）第三次重寫。
          前一版只講「有人繞過網頁送請求」，那是第 16 步的事，跟這一頁主線（第 13 步的
          搶名額）像是兩個題目。現在把這一頁出現過的兩個漏洞並排，指出它們的共同原因，
          判斷那一句接在後面當結論。
          2026-10-31（講師：投影片不要寫手冊裡的階段幾或步驟幾）整頁的步驟編號都拿掉了。
          兩條改成指那兩件事本身（剛才那個實驗／另一條路），上面那兩格也從
          「第 12 步結束／第 16 步結束」改成「網站第一次會動／兩條路都堵掉之後」。
          **不要把編號加回來**，手冊改版就會對不上，而且沒打開手冊的人看不懂。
          **也不要再用「判斷依據只有一句」開頭**，那是宣告不是內容。
        */}
        <Callout
          tone="focus"
          label="這一頁出現的兩個漏洞，原因是同一個"
          stepIndex={6}
          footnote="修好之前不要部署。"
        >
          <span className="block space-y-1">
            {SAME_ROOT.map((s) => (
              <span key={s.k} className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-28 shrink-0 whitespace-nowrap font-bold text-slate-100">{s.k}</span>
                <span className="flex-1 min-w-0">{s.v}</span>
              </span>
            ))}
          </span>
          <span className="block mt-2.5 border-t border-sky-500/20 pt-2.5">
            <strong className="text-slate-100">所以每做一個檢查就問一次：有人直接對資料庫送請求，它還擋不擋得住。</strong>
            擋得住就放對地方了，擋不住就要搬到資料庫那一層。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
