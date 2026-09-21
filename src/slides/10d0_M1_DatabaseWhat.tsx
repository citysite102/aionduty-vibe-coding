import { Database, Table, FileJson, ShieldCheck, Link2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 「資料庫是什麼」2026-09-21 從下一頁拆出來獨立成一頁。
 *
 * 拆的理由不是原本那頁太長，是原本那頁的尾巴有兩塊跟它的主線（資料怎麼擺）
 * 關係很弱：「你不用會寫 SQL」與 SQL／NoSQL 的分類。那兩塊講的是資料庫這個
 * 東西本身，被塞在一頁講表格設計的頁尾，原本的檔頭註解自己就寫著
 * 「SQL / NoSQL 降成最後一小塊」，那是找不到地方放的處理，不是設計。
 * 拆開之後它們有家了，下一頁也變成純粹的判斷力訓練。
 *
 * 這個詞從 Slide 19 的七項基礎就開始出現，Slide 24 的模擬器標著 Postgres，
 * 但全片沒有定義過它，Slide 24 的口白甚至只說「Postgres 是資料庫」。
 *
 * Excel 的類比要跟後面那一頁四張表（中型專案演練）的說法一致，改一邊就要改兩邊。
 *
 * **不要拿「資料存在哪裡的三個層次」（寫死在程式碼／瀏覽器／資料庫）來加厚這一頁。**
 * 那會劇透章節八刻意安排的撞牆：學員用手機打開自己部署好的作品、發現紀錄是空的，
 * 那一頁的教學價值就是讓他自己撞到。
 */
const DIFFS = [
  {
    icon: ShieldCheck,
    title: '它會擋掉填錯的資料',
    body: 'Excel 的電話欄位你打中文它不會攔你。資料庫會，因為你事先說過那一欄只能放電話。',
  },
  {
    icon: Link2,
    title: '兩張表可以互相對應',
    body: 'Excel 的兩個分頁基本上各自獨立。資料庫的訂單表可以指到客戶表的某一筆，下一頁整頁在做這件事。',
  },
];

export default function SlideDatabaseWhat() {
  return (
    <SlideLayout title="什麼是資料庫？" subtitle="What a Database Is" icon={Database}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-base leading-relaxed">
            網頁一關掉，剛才輸入的東西就沒了。要留住，就得寫進資料庫。
          </p>
          <p className="mt-2.5 text-slate-300 text-base leading-relaxed">
            <strong className="text-slate-100">資料庫就是一個專門用來長期放資料的地方。</strong>
            你先把它想成 Excel，那個想像有八成是對的：一張表，最上面那列是欄位名稱，底下每一列是一筆資料。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-3">
          <div className="text-slate-400 text-sm font-bold">剩下那兩成，就是它跟 Excel 不一樣的地方</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIFFS.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon aria-hidden="true" size={18} className="shrink-0 text-sky-400" />
                    <span className="text-base font-bold text-slate-100">{d.title}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{d.body}</p>
                </div>
              );
            })}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <div className="text-slate-400 text-sm font-bold mb-3">兩種資料庫，先認得名字就好</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Table aria-hidden="true" size={20} className="shrink-0 mt-0.5 text-slate-500" />
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-slate-100">關聯式（SQL）</strong>：PostgreSQL、MySQL。
                每張表有哪些欄位要先講好，之後想改比較麻煩。好處是它會幫你擋掉對不起來的資料。
                訂單、金流這種不能錯的東西用它。
              </p>
            </div>
            <div className="flex items-start gap-3">
              <FileJson aria-hidden="true" size={20} className="shrink-0 mt-0.5 text-slate-500" />
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-slate-100">非關聯式（NoSQL）</strong>：MongoDB、Firestore。
                每一筆想放什麼就放什麼，開發的時候很快。代價是沒有人幫你把關，
                而且要把好幾張表湊在一起查的時候會很吃力。
              </p>
            </div>
          </div>
          <p className="mt-4 border-t border-slate-800 pt-3 text-slate-400 text-sm leading-relaxed">
            沒有特別理由就選 SQL。這兩個名字你現在不用挑，知道它們指的是同一類東西的兩種做法就好。
          </p>
        </AnimatedBlock>

        <Callout tone="focus" label="你不用會寫 SQL，但它給你的表你要看得懂" stepIndex={4}>
          你不會自己去建資料表，那件事 AI 會做。問題是
          <strong className="text-slate-100">它不會主動問你要哪一種擺法</strong>，
          你只說「幫我做一個訂單系統」，它就自己挑一個給你。挑得好不好，下一頁就看得出來。
        </Callout>

      </div>
    </SlideLayout>
  );
}
