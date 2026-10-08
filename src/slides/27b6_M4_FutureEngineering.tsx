import { Compass, FileText, Flag, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 排在「你在旁邊看什麼」後面，不是前面：先做過一次，再給那件事名字。
 *
 * 原本這一頁是純術語（SDD、TDD 2.0、Agentic TDD）加一份三點路線圖，
 * 路線圖跟收尾那頁重複，術語也沒有掛回學員做過的任何東西，所以整頁沒有落點。
 * 現在每個名詞都指回他剛貼過的那段指令的某一段，最後那組對照是這一頁真正的作業。
 *
 * 2026-10-04（講師：標題與內文用詞過於 AI）改掉四處，都是同一類毛病：
 *   - 標題「你寫的是規格，還是願望」是一句二選一的標語，既不說這一頁有什麼，
 *     「願望」也是這一頁自己造的對比詞。換成兩個名詞加一句定位。
 *   - 兩張卡的一句話原本是「先想清楚，再動手做」「先定終點，再讓它自己走過去」，
 *     同一個「先 X 再 Y」模具印兩次（D-2 對仗、D-5 句型模具），換成講得出事實的句子。
 *   - 收尾「難的不是這兩個詞，是分辨⋯」是 D-2 禁的「不是 X，是 Y」。
 *   - SDD 的「為什麼有效」原本斷言「寫程式不再是最花時間的部分」，那是預測寫成事實，
 *     改成條件句。
 * ✕／✓ 兩欄的標籤也換掉了，順便跟〈把形容詞翻成可以檢查的條件〉那一頁的標籤區隔開。
 */
const TERMS = [
  {
    icon: FileText,
    en: 'SDD',
    full: 'Specification-Driven',
    zh: '規格驅動開發',
    line: '動手之前，先把要什麼寫下來。',
    did: '你寫的【目標】跟【什麼叫做完】就是規格。你在報價系統那個演練裡寫的那一頁需求說明，也是同一件事。',
    why: '它寫得比你快之後，花時間的地方就換到前面：把「要什麼」講到沒有第二種解讀。',
  },
  {
    icon: Flag,
    en: 'TDD 2.0',
    full: 'Agentic TDD',
    zh: '測試驅動開發',
    line: '寫出什麼叫做完，它才知道要修到什麼時候。',
    did: '你寫的【怎麼驗】那一段。它自己跑掉的那兩輪，做的就是這件事。',
    why: '驗收條件是它唯一能自己判斷「還沒做完」的依據。沒有這一段，它改完就停下來等你看。',
  },
];

/**
 * 2026-10-05 換掉這三組的例子。
 *
 * 原本是三組跟計時器無關的題目（好看的報表頁、操作要順暢、測試都要過）。
 * 問題不是那三組寫得不好，是這個教學動作（把模糊的話翻成驗得動的條件）
 * 在這一章出現三次、而且都用同一種兩欄對照的版型：
 * 〈交代一輪工作的五個步驟〉的第 1、2 步、這一頁、以及案例一的
 * 〈把形容詞翻成可以檢查的條件〉。中間那一次最弱，因為它跟第一次隔八頁、
 * 動作一樣，而且它用的是新題目，等於再練一次。
 *
 * 現在右欄**逐字照抄 `28a_M4_LoopPractice` 的 PROMPT 那五題**，左欄才是新的
 * （多數人第一次會寫的版本）。這樣它從「再練一次」變成「回收你剛寫過的東西」，
 * 也才接得上這一頁的標題「你剛做的那兩件事」。
 * **改那一頁的五題，要回來改這裡的 spec 欄。**
 */
const SPEC_VS_WISH = [
  { wish: '按鈕要能用', spec: '三顆按鈕都點得到，點下去大字分別變成 15:00 / 25:00 / 50:00' },
  { wish: '切換的時候不要怪怪的', spec: '倒數進行中點另一顆，先停下來換成新時間，不會自己開始跑' },
  { wish: '返航鍵要正確', spec: '按「返航」之後回到目前選的那個時間，不是固定回 25:00' },
  { wish: '不要有 bug', spec: '瀏覽器 Console 沒有紅字' },
  { wish: '樣式照手冊走', spec: '沒有引用任何外部圖片' },
];

export default function SlideFutureEngineering() {
  return (
    <SlideLayout
      title="規格驅動與測試驅動"
      subtitle="Spec First, Tests as the Finish Line"
      icon={Compass}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {TERMS.map((t, i) => {
            const Icon = t.icon;
            return (
              <AnimatedBlock
                key={t.en}
                stepIndex={i + 1}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon aria-hidden="true" size={18} className="text-slate-400 shrink-0" />
                  <span className="font-mono text-sm font-bold text-slate-200">{t.en}</span>
                  <span className="text-base font-bold text-slate-100">{t.zh}</span>
                  <span className="ml-auto shrink-0 font-mono text-xs text-slate-600">{t.full}</span>
                </div>

                <p className="text-slate-100 text-base font-bold leading-relaxed mb-3">{t.line}</p>

                <div className="text-sm leading-relaxed text-slate-400 space-y-2">
                  <p>
                    <strong className="text-slate-300">你已經做過：</strong>
                    {t.did}
                  </p>
                  <p className="border-t border-slate-800 pt-2">
                    <strong className="text-slate-300">為什麼有效：</strong>
                    {t.why}
                  </p>
                </div>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">
            右邊這五題，就是你剛才貼下去的那一段原文
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            左邊是多數人第一次會寫的版本。兩邊的差別只有一個：
            <strong className="text-slate-200">只看做出來的東西，你能不能回答「有做到」或「沒做到」。</strong>
          </p>

          <div className="hidden md:grid grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-x-4 px-4 pb-1.5 text-sm font-bold">
            <span className="text-rose-300">✕ 多數人第一次會寫的</span>
            <span className="text-emerald-300">✓ 你實際寫下去的</span>
          </div>
          <div className="space-y-2">
            {SPEC_VS_WISH.map((s) => (
              <div
                key={s.wish}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-2 md:gap-4"
              >
                <div className="rounded-xl border px-4 py-2.5 bg-rose-500/5 border-rose-500/25">
                  <span className="text-slate-400 text-sm leading-relaxed">{s.wish}</span>
                </div>
                <div className="rounded-xl border px-4 py-2.5 bg-emerald-500/5 border-emerald-500/25">
                  <span className="text-slate-300 text-sm leading-relaxed">{s.spec}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-4 border-t border-slate-800 pt-3">
            換成你自己的題目，右邊那一欄還是得你自己寫。
            前面那些工具替你做的是每一輪自動再跑一次，左邊翻成右邊沒有人代得了。
          </p>
        </AnimatedBlock>

        {/*
          2026-10-08（講師）補一個延伸閱讀。這兩個詞學員回去一定會再搜到，
          與其在這一頁展開（會把一頁變成兩頁），不如給一篇寫得完整的中文文章。
          **這是選讀，不要寫成作業**，所以放在最後、用灰階、文案寫「有興趣再看」。
          最後查證：2026-10-08，文章標題與日期取自講師提供的搜尋結果畫面
          （Cash Wu，〈SDD — 從 TDD 到規格驅動開發：AI 時代的延伸〉，2026-02-15）。
          外部連結會掛掉，下次改版順手點一次；掛了就把整塊拿掉，不要留一個死連結。
        */}
        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            這兩個詞背後各自有一套完整的做法，這門課只用到它們的核心動作。
            有興趣想知道它們原本長什麼樣、以及 SDD 是怎麼從 TDD 延伸出來的，這一篇寫得很完整：
          </p>
          <a
            href="https://blog.cashwu.com/blog/2026/sdd-from-tdd-to-spec-driven-development"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sky-400 text-sm hover:underline"
          >
            <ExternalLink aria-hidden="true" size={14} className="shrink-0" />
            <span>SDD — 從 TDD 到規格驅動開發：AI 時代的延伸（Cash Wu）</span>
          </a>
          <p className="text-slate-500 text-sm leading-relaxed mt-1.5">
            blog.cashwu.com　選讀，不看也不影響後面任何一步。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
