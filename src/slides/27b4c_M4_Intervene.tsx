import {
  Hand, CircleStop, PencilLine, Wrench, Scissors,
  CircleCheck, RefreshCw, Crosshair, CirclePause,
} from 'lucide-react';

/**
 * 2026-10-05 這一頁補了頭尾兩塊，原本只有中間那四張卡。
 *
 * 補的理由是前一頁（27b3 的五個步驟）到這一頁接不起來：上一頁剛講完「五樣寫齊它就
 * 跑得完一輪」，下一頁突然在教怎麼把它停下來，中間少了一句「那它實際上會長什麼樣」。
 * 所以開頭先攤開四種結果（含順利的那一種），四個動作才有掛的地方。
 *
 * 結尾那塊是另一半：四個動作都是「當下」的，做完這一輪就沒了。真正要帶走的是
 * 同一件事下一輪在指令裡多寫哪一句，而那幾句就是上一頁那五步的第 2、3、4 步。
 * **這一塊不要搬去 Slide 150（28_M4_Safety）**，那一頁講的是放手前的五道邊界
 * （權限、金鑰、注入、不可逆動作、用量上限），跟這裡「同一個狀況下一輪怎麼寫」
 * 不是同一件事；混在一起會變成第六道邊界，而它根本不是邊界。
 */

/** 放手之後的四種結果。第一個是順利的那一種，刻意放第一個，不然整頁讀起來像在嚇人。 */
const OUTCOMES = [
  {
    icon: CircleCheck,
    t: '照著跑完',
    d: '幾輪之後完成條件都過了，你只要驗收。',
    good: true,
  },
  { icon: RefreshCw, t: '原地打轉', d: '連續幾輪都在解同一件事，而每一輪都比上一輪貴。' },
  { icon: Crosshair, t: '做偏了', d: '完成條件都過了，做出來的卻不是你要的。' },
  { icon: CirclePause, t: '停在中間', d: '撞到要你決定的事，或撞到要授權、裝不起來這類問題。' },
];

/** 下一輪怎麼寫。右邊那幾句對應的就是前一頁五個步驟的第 2、3、4 步。 */
const NEXT_ROUND = [
  { hit: '它連續幾輪在解同一件事', fix: '指令裡寫上限：「最多跑 8 輪，超過就停下來回報」。', from: '第 3 步' },
  { hit: '條件都過了，但不是你要的', fix: '把它漏掉的那件事，補成一題看得出有做到沒做到的完成條件。', from: '第 2 步' },
  { hit: '它停在中間等你決定', fix: '寫成人類閘門：那幾筆標記起來，其他照做完，不要停在第三筆。', from: '第 4 步' },
  { hit: '同一個錯一直犯', fix: '寫進 CLAUDE.md，不要每一輪重講一次。', from: '上面第 2 招' },
];
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const MOVES = [
  {
    icon: CircleStop,
    title: '1. 直接把它停下來',
    body: '發現它連續四、五次都在解同一個問題，或畫面一直是空白的，不用再等。按 Esc 就會中斷它正在做的事，你可以接著補一句話重新指路。',
    note: 'Esc 只是打斷手上的動作，不會把 Claude Code 關掉；真的要整個離開，連按兩次 Ctrl + C。'
  },
  {
    icon: PencilLine,
    title: '2. 把規則寫進 CLAUDE.md',
    body: '把它剛才做錯的地方，用白話中文寫進 CLAUDE.md。下次啟動就會讀到，同樣的錯比較不會再犯。',
    note: '這是把一次性的糾正，變成之後每一輪都生效的規則。'
  },
  {
    icon: Wrench,
    title: '3. 自己動手改一下',
    body: '如果它大部分都做對了，只卡在一個打錯的字或少了一個標點，直接打開檔案改掉會比繼續下提示詞快。',
    note: '不是每件事都得靠提示詞解決，你也還在這個循環裡。'
  },
  {
    icon: Scissors,
    title: '4. 把範圍縮小',
    body: '會卡住，通常是因為一次交代的範圍太大。跟它說：先停，這輪我們只把登入按鈕做出來，其他的等一下再說。',
    note: '範圍越小，完成標準越明確，它就越不容易繞路。'
  }
];

export default function SlideIntervene() {
  return (
    <SlideLayout
      title="Agent 卡住：當下四個動作，下一輪怎麼寫"
      subtitle="Manual Intervention When the Loop Gets Stuck"
      icon={Hand}
    >
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-6 pb-6">

        <AnimatedBlock stepIndex={1} className="space-y-3">
          <p className="text-base text-slate-300 leading-relaxed">
            條件寫齊之後放手，結果不會只有一種。
            <strong className="text-slate-100">下面四種你都會遇到</strong>，第一種是順利的那一種。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {OUTCOMES.map((o) => {
              const Icon = o.icon;
              return (
                <div
                  key={o.t}
                  className={`rounded-2xl border p-4 ${
                    o.good
                      ? 'border-emerald-500/25 bg-emerald-500/5'
                      : 'border-slate-800 bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon size={16} className={o.good ? 'text-emerald-400' : 'text-slate-500'} />
                    <span className={`text-sm font-bold ${o.good ? 'text-emerald-300' : 'text-slate-100'}`}>
                      {o.t}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{o.d}</p>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            後面三種不是壞掉，是這套做法本來就會有的樣子。
            <strong className="text-slate-300">你人還在現場的時候</strong>，可以動手做下面這四件事。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOVES.map((move, idx) => {
            const Icon = move.icon;
            return (
              <AnimatedBlock
                key={move.title}
                stepIndex={idx < 2 ? 2 : 3}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-slate-100">{move.title}</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {move.body}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mt-auto border-t border-slate-800 pt-3">
                  {move.note}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 space-y-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-slate-200">這四招都不需要你看懂程式碼。</strong>
            判斷的標準只有一個：它有沒有在往前走。原地打轉超過幾輪，就停下來換一種方式，不要放著讓它繼續跑。
          </p>

          <div className="border-t border-slate-800 pt-4">
            <h4 className="text-base font-bold text-slate-100 mb-1">
              但這四招都只救得了這一輪
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              同一個狀況下次還會再來，除非你把它寫進下一輪的指令裡。右邊標的是那五個步驟的第幾步。
            </p>
            <div className="divide-y divide-slate-800/70">
              {NEXT_ROUND.map((n) => (
                <div
                  key={n.hit}
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,230px)_minmax(0,1fr)_auto] gap-x-5 gap-y-1 py-2.5"
                >
                  <div className="text-sm font-bold text-slate-200 leading-relaxed">{n.hit}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{n.fix}</div>
                  <div className="font-mono text-xs text-slate-600 md:text-right whitespace-nowrap">{n.from}</div>
                </div>
              ))}
            </div>
          </div>
          {/*
            2026-10-03 刪掉「人不在旁邊的時候」那一塊（在後台設用量上限、先拿一小部分資料試跑）。
            它跟 Slide 150（28_M4_Safety）第五道邊界一字不差，而且同屬單元 8-2、中間只隔兩頁。
            病根是上面那行註解自己寫的：原本「自動化 Loop 的局限與風險」那一頁併進來的時候，
            沒有回頭看 Slide 150 已經有同一條。正位在 Slide 150，因為那一頁的結構就是五道邊界，
            而「它能花多少」是第五道。**不要再把它搬回來**，這一頁的職務是「你人還在現場」的四個動作。
          */}
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
