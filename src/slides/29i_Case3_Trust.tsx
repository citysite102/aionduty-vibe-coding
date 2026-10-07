import { KeyRound } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 兩層權限是成對對照（sky／indigo 合計一種），加上「不能外流的金鑰」那個 rose，
 * 這一頁剛好兩種強調色。
 *
 * 標題是描述式的（兩把金鑰，兩層權限），所以「擋人的是資料庫不是前端」這個結論
 * 要由內文講完，不要指望標題替它講。判斷寫在副標與最後那一塊。
 */
const LAYERS = [
  {
    name: '第一層：你能不能碰這張表',
    tone: 'sky',
    msg: 'permission denied for table reservations',
    note: '整張表都不給你，連問都不用問。去後台看那張表的存取設定。',
  },
  {
    name: '第二層：你能碰這張表的哪幾列',
    tone: 'indigo',
    msg: 'new row violates row-level security policy',
    note: '表可以碰，但這一列不是你的。回去看那條政策放行的條件對不對。',
  },
];

export default function SlideCase3Trust() {
  return (
    <SlideLayout
      title="兩把金鑰，兩層權限"
      subtitle="Case 03 · 前端擋不住的那些事"
      icon={KeyRound}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        {/*
          2026-10-05 補這一句。章節八的〈把紀錄搬上 Supabase〉已經讓學員自己接過一次，
          那一頁只說「打開 RLS，寫一條規則」就把細節推給這裡（它的卡片上就寫著
          「案例三會整段講這個取捨」）。這一頁不講一聲的話，學員會覺得又在講一次金鑰。
          **改那一頁的推托句，要回來改這一句。**
        */}
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-400 text-base leading-relaxed">
          計時器搬上 Supabase 那一步出現過同一組金鑰，那時候只說了「把 RLS 打開」。
          <strong className="text-slate-300">這一頁講的是打開之後那條規則要怎麼寫，以及寫錯的時候你會看到哪兩種錯誤訊息。</strong>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
              可以公開的那一把
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它本來就會被看到</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              這把金鑰會被打包進網頁，使用者在瀏覽器裡翻一下就看得到。這是設計上就這樣，不是疏失。
              <strong className="text-slate-100">它拿得到什麼，完全由資料庫的規則決定。</strong>
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-rose-400 mb-2">
              不能外流的那一把
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它無視所有規則</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              讀走、改掉、刪光都做得到。
              <strong className="text-slate-100">絕對不能出現在前端</strong>，也不能進版本控制。
              貼上去之前先看清楚你複製的是哪一把。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-2">擋人的規則有兩層，錯誤訊息不一樣</h3>
          {/*
            2026-10-04：這一頁是全片對不寫程式的人最陡的一頁。前一次碰資料庫是
            〈資料庫設計〉的「一張表就是一個 Excel 分頁」，下一次就是這兩段英文原文。
            中間補一階白話，兩層各給一個櫃子的說法；原文保留，因為那是學員唯一能分辨
            卡在哪一層的線索，但要明說不用背。**不要把這兩段原文換成翻譯。**
          */}
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            第一層問的是「你能不能開這個櫃子」，第二層問的是「櫃子裡哪幾份是你的」。
            底下那兩段英文是它實際會回你的訊息，<strong className="text-slate-300">不用背，認得出是哪一層就夠了</strong>。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LAYERS.map((l) => (
              <div
                key={l.name}
                className={`rounded-xl border p-4 ${
                  l.tone === 'sky'
                    ? 'border-sky-500/30 bg-sky-500/5'
                    : 'border-indigo-500/30 bg-indigo-500/5'
                }`}
              >
                <div
                  className={`text-sm font-bold mb-2 ${
                    l.tone === 'sky' ? 'text-sky-300' : 'text-indigo-300'
                  }`}
                >
                  {l.name}
                </div>
                <code className="block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-400 break-all">
                  {l.msg}
                </code>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{l.note}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            第二層底下的每一條規則，資料庫那邊叫它「政策」。
          </p>
          <p className="text-slate-300 text-sm leading-relaxed mt-4">
            第二層打開之後<strong className="text-slate-100">預設是全部拒絕</strong>，
            所以第二層底下每寫一條規則，都是在放行某一批資料，不是在多擋一道。
            方向搞反的話，你會寫出一堆自以為在防守、實際上什麼都沒擋到的東西。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" label="那個前端算不出來的數字" stepIndex={3}>
          你看不到別人的預約，第二層擋住了。但畫面上要顯示「還剩幾個位子」，
          <strong className="text-slate-300">而前端手上根本沒有那些資料</strong>。
          解法是請資料庫自己去數：它讀得到整張表，但只回你一個數字，別人的預約你還是看不到。
          判斷錯的代價是為了算一個數字，把不該給的資料全部給出去。
        </Callout>

      </div>
    </SlideLayout>
  );
}
