import { Map, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

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
    lead: '先分辨是哪一種。三種的解法完全不同',
    items: ['手冊根本沒被載入', '載入了，但排在三百行後面', '寫得沒辦法檢查'],
    next: true,
  },
  {
    q: '這條規則到底該放哪裡',
    lead: '不是每一條都該進 CLAUDE.md',
    items: ['會出事的　Hook 或 CI', '只在某一區　子目錄', '有固定步驟　Skill', '以上皆非　根目錄'],
    arrow: true,
  },
  {
    q: '手冊越寫越長，這樣對嗎',
    lead: '長不是問題，每一條說不出理由才是',
    items: ['盤點現在有幾條', '刪掉沒有證據的', '留下的要說得出出過什麼事'],
  },
  {
    q: '那規則到底怎麼寫',
    lead: '六個寫法，先給範圍再給空間',
    chips: ['白名單', '探索空間', '為什麼', '例子', '例外', '一次一件'],
    items: ['判準只有一句：他能不能只看結果，回答「有」或「沒有」'],
    single: true,
  },
];

export default function SlideProblemMap() {
  return (
    <SlideLayout title="接下來要解決的四個問題" subtitle="What Goes Wrong, and Where We Answer It" icon={Map}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            等你自己動手寫一份手冊，<strong className="text-sky-300">多半會照這個順序撞上這四個問題</strong>。
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
