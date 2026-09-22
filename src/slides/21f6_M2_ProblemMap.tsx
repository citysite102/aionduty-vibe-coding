import { Map, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';
import type { RecordedMeta } from '../slides-recorded/types';

/**
 * 這一頁是後面 45 頁唯一的座標系，學員會停在上面對照，所以它比拆頁密，
 * kind 標 reference，不套 160 字與 45 秒。但口白一定要有：
 * 少了它，錄影時這一段的入口是無聲的四格三百字。
 */
export const meta: RecordedMeta = {
  id: 'live-83-problem-map',
  title: '手冊最常出的四個問題',
  script:
    '等你自己動手寫一份手冊，這四個問題會陸續碰到，不一定照這個順序。第一個，規則明明寫了它卻沒照做。你已經會用斜線 context 查它在不在了，這一題處理的是查完之後怎麼分辨，因為三種的解法完全不同。第二個，這條規則到底該放哪裡，不是每一條都該進 CLAUDE.md。第三個，手冊越寫越長，長不是問題，每一條說不出理由才是。第四個，那規則到底怎麼寫，六個寫法，判斷標準只有一句：只看做出來的東西，你能不能回答有做到或沒做到。四題問的都是同一份檔案，第二題之後每一塊講完，會回頭看那份檔案變成什麼樣子。',
  seconds: 52,
  kind: 'reference',
};

/**
 * 這一段接下來連續幾十頁在回答四個問題，但原本沒有任何一頁先說有哪四個。
 * 學員看到「原因 1 / 3」「第 2 題 / 共 4 題」這種局部進度，
 * 不知道那是整段的一成還是七成，很容易失焦。
 *
 * 四格不是平等的：第一格是接下來馬上要講的，所以只有它給主色。
 * 四格都上色就等於都沒上色，那是 A-1 說的「顏色當編號用」。
 */
const PROBLEMS: {
  q: string;
  lead: string;
  items: string[];
  chips?: string[];
  next?: boolean;
  arrow?: boolean;
  single?: boolean;
}[] = [
  {
    q: '規則明明寫了，它卻沒照做',
    lead: '`/context` 查得出它在不在，這一題是查完之後怎麼分辨',
    items: ['手冊根本沒被載入', '載入了，但排在三百行後面', '寫得沒辦法檢查'],
    next: true,
  },
  {
    q: '這條規則到底該放哪裡',
    lead: '不是每一條都該進 CLAUDE.md',
    // 這四題的答案（哪個條件對到哪一層）刻意不列在這裡：
    // `slides-recorded/harness/04b_RouteIntro` 的檔頭寫明「只列問題，不列答案⋯
    // 先在這裡全部揭曉，後面四頁的『先自己想』就沒有意義了」，
    // 而這一頁在它前面六頁。2026-09-22 把對應關係拿掉，只留問題與代價。
    items: ['每一條都往根目錄堆，它會越來越不準', '四個問題問下來，每一條都有它自己的去處'],
  },
  {
    q: '手冊越寫越長，這樣對嗎',
    lead: '長不是問題，每一條說不出理由才是',
    items: ['盤點現在有幾條', '刪掉沒有證據的', '留下的要說得出出過什麼事'],
  },
  /*
   * 這一格原本只列六個標籤（白名單、探索空間、為什麼⋯），那是六頁的頁名，
   * 不是六件事的意思。沒讀過那六頁的人看不出「探索空間」「為什麼」在講什麼，
   * 而地圖的職務就是給還沒讀過的人看。所以標籤換成六個寫法各自的動作。
   *
   * 判斷標準那句原本寫「他能不能只看結果，回答有或沒有」，那個「他」是誰沒有交代，
   * 讀起來像在講 AI。2026-09-22 統一成 Slide 64（`21b4_M2_BadRules`）的人稱：驗收的人就是你，
   * 自學的人沒有旁邊的人可以拿去問，那一頁的註解記著同一個理由。
   *
   * lead 改成指回第一題。第一題列的三個原因裡，「寫得沒辦法檢查」的解法就在這一格，
   * 中間隔了兩題，不指一下沒有人接得起來。
   */
  {
    q: '那規則到底怎麼寫',
    lead: '第一題那個「寫得沒辦法檢查」，解法在這一格',
    chips: ['只准用這幾個', '還在摸索就別寫死', '寫出為什麼', '給一個例子', '講清楚例外', '一次只講一件'],
    items: ['判斷標準：只看做出來的東西，你能不能回答「有做到」或「沒做到」'],
    single: true,
  },
];

export default function SlideProblemMap() {
  return (
    <SlideLayout title="手冊最常出的四個問題" subtitle="What Goes Wrong, and Where We Answer It" icon={Map}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            等你自己動手寫一份手冊，<strong className="text-sky-300">這四個問題會陸續碰到</strong>，不一定照這個順序。
          </p>
        </AnimatedBlock>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${hoverIsolateGrid}`}>
          {PROBLEMS.map((p, i) => (
            <AnimatedBlock
              key={p.q}
              stepIndex={i + 2}
              className={`rounded-2xl border p-5 flex flex-col ${hoverIsolateCard} ${
                p.next ? 'border-sky-500/40 bg-sky-950/20' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex items-baseline gap-3 mb-1.5">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                    p.next ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-100 leading-snug">{p.q}</h3>
                {p.next && (
                  <span className="ml-auto shrink-0 rounded-full bg-sky-500/15 px-2.5 py-0.5 text-xs font-bold text-sky-300">
                    下一頁開始
                  </span>
                )}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-3 pl-9">{p.lead}</p>

              {p.chips && (
                <div className="flex flex-wrap gap-1.5 mb-3 pl-9">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-bold text-slate-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-auto space-y-2 pl-9">
                {p.items.map((it) => {
                  const [left, right] = p.arrow ? it.split('　') : [it, ''];
                  return (
                    <li key={it} className="flex items-baseline gap-2 text-sm leading-snug">
                      {p.arrow ? (
                        <>
                          <span className="text-slate-400">{left}</span>
                          <ArrowRight size={12} className="text-slate-700 shrink-0 translate-y-0.5" />
                          <span className="font-mono font-bold text-slate-200">{right}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-slate-700 shrink-0">·</span>
                          <span className={p.single ? 'text-slate-200 font-bold' : 'text-slate-300'}>{it}</span>
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </AnimatedBlock>
          ))}
        </div>

        {/*
          原本寫「四題都⋯每一塊講完會回頭看那份檔案」，但那不是實際的頁序：
          第 2、3、4 題各自收在一頁手冊成長軸（HandbookV2 到 V4），第 1 題沒有，
          它收在診斷那一頁。畫面上寫成四題都有，學員看完第一題會等一個不會出現的東西。
        */}
        <AnimatedBlock stepIndex={6} className="px-1">
          <p className="text-slate-400 text-sm leading-relaxed">
            四題問的都是同一份檔案。第二題之後每一塊講完，會回頭看那份檔案變成什麼樣子。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
