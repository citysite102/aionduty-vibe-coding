import { KeyRound, Table2, Rows3, ChevronRight } from 'lucide-react';
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
    icon: Table2,
    tone: 'sky',
    msg: 'permission denied for table reservations',
    note: '整張表都不給你，連問都不用問。去後台看那張表的存取設定。',
  },
  {
    name: '第二層：你能碰這張表的哪幾列',
    icon: Rows3,
    tone: 'indigo',
    msg: 'new row violates row-level security policy',
    note: '表可以碰，但這一列不是你的。回去看那條政策放行的條件對不對。',
  },
];

const COUNT_STEPS = [
  { k: '卡在哪', v: '第二層擋住了別人的預約，前端手上沒有那些資料，所以算不出來還剩幾個。' },
  { k: '怎麼做', v: '請資料庫自己去數。它讀得到整張表，但只回你一個數字。' },
  { k: '代價', v: '改成讓前端自己算，就要把整張表開放，等於把別人的預約全部給出去。' },
];

export default function SlideCase3Trust() {
  return (
    <SlideLayout
      title="兩把金鑰，兩層權限"
      subtitle="Case 03 · 前端擋不住的那些事"
      icon={KeyRound}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        {/*
          2026-10-05 補這一句。章節七的〈把紀錄搬上 Supabase〉已經讓學員自己接過一次，
          那一頁只說「打開 RLS，寫一條規則」就把細節推給這裡（它的卡片上就寫著
          「案例三會整段講這個取捨」）。這一頁不講一聲的話，學員會覺得又在講一次金鑰。
          **改那一頁的推托句，要回來改這一句。**
        */}
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-400 text-base leading-relaxed">
          擋住別人看你資料的那道門在資料庫上，不在前端。
          <strong className="text-slate-300">計時器搬上 Supabase 那一步打開的 RLS，就是這道門</strong>，
          當時只按了開關，這裡才真的用到它。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
              可以公開的那一把
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它本來就會被看到</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              這把金鑰會被打包進網頁，使用者在瀏覽器裡翻一下就看得到。這是設計上就這樣，不是疏失。
              <strong className="text-slate-100">它拿得到什麼，完全由資料庫的規則決定。</strong>
            </p>
          </div>
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
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

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-base font-bold text-slate-100 mb-2">資料庫擋人的兩層</h3>
          {/*
            2026-10-04：這一頁是全片對不寫程式的人最陡的一頁。前一次碰資料庫是
            〈資料庫設計〉的「一張表就是一個 Excel 分頁」，下一次就是這兩段英文原文。
            中間補一階白話，兩層各給一個櫃子的說法；原文保留，因為那是學員唯一能分辨
            卡在哪一層的線索，但要明說不用背。**不要把這兩段原文換成翻譯。**
          */}
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            第一層問的是「你能不能開這個櫃子」，第二層問的是「櫃子裡哪幾份是你的」。
            一個請求要連過兩道，任何一道沒過就回一段錯誤訊息，兩段長得不一樣。
          </p>
          {/*
            2026-10-30 補這條流程（講師：這一段適合圖像化）。它要做的事只有一件：
            讓學員看到兩層是**串著的**，不是兩種選項。兩個關卡的顏色跟底下兩張卡一致，
            **改其中一邊的顏色就要兩邊一起改**。膠囊與箭頭的寫法跟 Slide 32、33 同一套。
          */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2 mb-4">
            <span className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-slate-300 text-sm">
              前端送出請求
            </span>
            <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
            <span className="rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-1 text-sky-100 text-sm">
              第一層：這張表你碰不碰得到
            </span>
            <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
            <span className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-3 py-1 text-indigo-100 text-sm">
              第二層：這張表的哪幾列是你的
            </span>
            <ChevronRight aria-hidden="true" size={14} className="shrink-0 text-slate-600" />
            <span className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-slate-300 text-sm">
              資料回到前端
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-3">
            底下兩段英文是它實際會回你的訊息，認得出是哪一層就夠了，不用背。
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
                  <l.icon aria-hidden="true" size={15} className="inline-block mr-1.5 -mt-0.5" />
                  {l.name}
                </div>
                <code className="block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-400 break-all">
                  {l.msg}
                </code>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{l.note}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mt-3">
            第二層打開之後<strong className="text-slate-100">預設是全部拒絕</strong>，
            底下每寫一條規則（資料庫那邊叫它「政策」）都是在放行某一批資料。
            方向搞反的話，你會寫出一堆什麼都沒擋到的規則。
          </p>
        </AnimatedBlock>

        {/*
          2026-10-30 從一段散文改成三行（講師：太 AI）。原本四句話把「卡在哪」「怎麼做」
          「做錯會怎樣」黏在一起，而這三件事是三個不同的東西，學員要自己拆。
          **三行的標籤不要換成「問題／解法／結論」那種泛稱**，第三行講的是代價不是結論。
        */}
        <Callout tone="muted" label="還剩幾個位子，這個數字誰來算" stepIndex={3}>
          <span className="block space-y-1.5">
            {COUNT_STEPS.map((c) => (
              <span key={c.k} className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-14 shrink-0 text-slate-300 text-sm font-bold">{c.k}</span>
                <span className="flex-1 min-w-0 text-sm leading-relaxed">{c.v}</span>
              </span>
            ))}
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
