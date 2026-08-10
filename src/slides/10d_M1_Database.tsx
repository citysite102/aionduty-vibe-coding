import type { ReactNode } from 'react';
import { Database, Table, FileJson, AlertTriangle, Check } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 資料庫這一頁的重點不是 SQL 與 NoSQL 的差別，是「同一批資料，擺法不同差在哪」。
 *
 * 理由：學員不會自己寫資料表，但 AI 會給他一張。他要判斷的是那張表能不能用，
 * 而 SQL / NoSQL 的分類幫不上這個忙。所以主體換成一張爛表跟拆好的表的對照，
 * SQL / NoSQL 降成最後一小塊，讓他聽到名字的時候對得上。
 */

/**
 * 一張仿試算表的表格。rows 吃 ReactNode 是為了在儲存格裡標出重複與錯字。
 *
 * widths 要給：這兩張表擠在半個版面裡，平均分欄會把電話號碼切掉，
 * 而「有沒有那兩個橫線」正是這一頁要比的東西。
 */
function Sheet({
  name,
  cols,
  widths,
  rows,
}: {
  name: string;
  cols: string[];
  widths: string;
  rows: ReactNode[][];
}) {
  const grid = { gridTemplateColumns: widths };
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
      <div className="px-2.5 py-1.5 bg-slate-900 border-b border-slate-800 font-mono text-xs text-slate-400">
        {name}
      </div>
      <div className="grid text-sm font-mono text-slate-500 border-b border-slate-800" style={grid}>
        {cols.map((c) => (
          <div key={c} className="px-2.5 py-1.5 truncate">
            {c}
          </div>
        ))}
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid text-sm font-mono text-slate-200 ${i > 0 ? 'border-t border-slate-900' : ''}`}
          style={grid}
        >
          {row.map((cell, j) => (
            <div key={j} className="px-2.5 py-1.5 truncate">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const BAD_ROWS: ReactNode[][] = [
  ['王小明', '0912-345-678', <span className="text-rose-300">牛肉麵,滷蛋</span>],
  ['王小明', '0912-345-678', '牛肉麵'],
  [<span className="text-rose-300">王小名</span>, <span className="text-rose-300">0912345678</span>, '排骨飯'],
];

const BAD_POINTS = [
  '同一個客戶重複寫在每一列。他換電話，你要一列一列改，漏掉一列就有兩個電話並存。',
  '少打一橫、名字打錯一個字，系統就當成另一個人，這個人的消費紀錄從此對不起來。',
  '「牛肉麵,滷蛋」擠在同一格。要算滷蛋賣了幾份，只能一格一格用眼睛看。',
];

const GOOD_POINTS = [
  '電話只存在客戶表那一格，改一次，所有訂單看到的都是新的。',
  '訂單記的是客戶 id，不是名字。名字打錯不會多生出一個客戶。',
  '一份餐點一列，要算滷蛋賣幾份、哪一項最好賣，直接數就有。',
];

export default function Slide10d() {
  return (
    <SlideLayout title="同一批資料，兩種擺法" subtitle="Database & Schema Design" icon={Database}>
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            網頁一關掉，剛才輸入的東西就沒了。要留住，就得寫進資料庫。
            <strong className="text-slate-100">但寫進去只是第一步，同一批資料擺法不一樣，三個月後差很多。</strong>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* 沒有設計 */}
          <AnimatedBlock
            stepIndex={2}
            className="rounded-2xl border px-6 py-5 bg-rose-500/5 border-rose-500/25 space-y-4"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-rose-300">
              <AlertTriangle aria-hidden="true" size={18} className="shrink-0" />
              沒有設計：什麼都塞在同一張表
            </div>

            <Sheet
              name="orders.xlsx"
              cols={['客戶', '電話', '品項']}
              widths="0.8fr 1.3fr 1fr"
              rows={BAD_ROWS}
            />

            <ul className="space-y-2.5">
              {BAD_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </AnimatedBlock>

          {/* 有設計 */}
          <AnimatedBlock
            stepIndex={3}
            className="rounded-2xl border px-6 py-5 bg-emerald-500/5 border-emerald-500/25 space-y-4"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
              <Check aria-hidden="true" size={18} className="shrink-0" />
              有設計：一件事只存一個地方，其他人用 id 指過去
            </div>

            <div className="space-y-2.5">
              <Sheet
                name="customers"
                cols={['id', '姓名', '電話']}
                widths="0.5fr 0.9fr 1.3fr"
                rows={[[<span className="text-emerald-300">1</span>, '王小明', '0912-345-678']]}
              />
              <Sheet
                name="orders"
                cols={['id', 'customer_id', '日期']}
                widths="0.5fr 1.2fr 1fr"
                rows={[
                  [<span className="text-emerald-300">101</span>, <span className="text-emerald-300">1</span>, '08/09'],
                  [<span className="text-emerald-300">102</span>, <span className="text-emerald-300">1</span>, '08/12'],
                ]}
              />
              <Sheet
                name="order_items"
                cols={['order_id', '品項', '數量']}
                widths="1fr 1fr 0.6fr"
                rows={[
                  [<span className="text-emerald-300">101</span>, '牛肉麵', '1'],
                  [<span className="text-emerald-300">101</span>, '滷蛋', '1'],
                ]}
              />
            </div>

            <ul className="space-y-2.5">
              {GOOD_POINTS.map((p) => (
                <li key={p} className="flex items-start gap-2 text-slate-300 text-sm leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </AnimatedBlock>
        </div>

        <Callout
          stepIndex={4}
          tone="good"
          label="所以你要看得懂的是這個"
          footnote={
            <>
              可以這樣講：「客戶資料不要重複寫在每一筆訂單裡，拆成一張客戶表，訂單用 id 指過去。
              客戶被刪掉的時候，他的訂單要一起刪嗎，你有處理嗎？」
            </>
          }
        >
          你不用會寫 SQL。但 AI 不會主動問你要哪一種，你只說「幫我做一個訂單系統」，
          它給你的很可能就是那張什麼都塞在一起的表。
          <strong className="text-slate-100">看得懂它給的表，你才擋得下來</strong>。
          等到資料存了三個月才發現，表要重拆，已經寫進去的每一筆也要跟著搬。
        </Callout>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="text-slate-400 text-sm font-bold mb-3">兩種資料庫，先認得名字就好</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Table aria-hidden="true" size={20} className="shrink-0 mt-0.5 text-slate-500" />
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-slate-100">關聯式（SQL）</strong>：PostgreSQL、MySQL。
                每張表有哪些欄位要先講好，之後想改比較麻煩。好處是它會幫你擋掉對不起來的資料。
                上面那種拆表就是它的做法，訂單、金流這種不能錯的東西用它。
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FileJson aria-hidden="true" size={20} className="shrink-0 mt-0.5 text-slate-500" />
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-slate-100">非關聯式（NoSQL）</strong>：MongoDB、Firebase。
                每一筆想放什麼就放什麼，開發的時候很快。代價是沒有人幫你把關，
                而且要把好幾張表湊在一起查的時候會很吃力。
              </p>
            </div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            沒有特別理由就選 SQL。會不會出事，看的是上面那件事，不是你選了哪一種。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
