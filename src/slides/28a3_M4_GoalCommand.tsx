import { Flag, Terminal, Scale, Fence } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 8-1 與 8-2 整段教的是手寫那四段話（目標、什麼叫做完、怎麼驗、邊界），
 * 而 Claude Code 已經有 /goal 直接吃「什麼叫做完」那一段。學員一打 /help
 * 就會看到它，整章不提會顯得停在去年。
 *
 * 但這一頁不是要取代前面那套。條件本身還是學員要寫，/goal 省掉的只有
 * 「每一輪催它」。開場第一段就把這件事講死，不要讓學員以為手寫那段可以跳過。
 *
 * 排在「你在旁邊看什麼」後面：先自己盯過三輪，才知道 /goal 幫你省掉的是哪一段。
 * 範例條件沿用計時器那五題與「最多 5 輪」，跟前面兩頁對得起來，不要換題目。
 *
 * 收尾那段是這一頁真正的重點：判定的模型只讀得到對話裡秀出來的東西，
 * 所以它跟「它有可能用講的宣稱驗過了」是同一個風險，不要刪掉。
 *
 * /loop 的正名放在這裡而不是「與其自己一直下提示」那一頁：名稱撞的是那一頁沒錯，
 * 但那頁右欄的內容區已經溢出（量過，可捲高度比可視高度多兩百多），再加一塊會捲到看不見。
 * 放這裡對比反而更利落，讀者眼前就是 /goal。tone 用 muted 是為了不跟上面那個 focus 搶。
 */
const BLOCKS = [
  {
    icon: Terminal,
    tag: '怎麼用',
    title: '打完就開跑，不用再送一句話',
    body: '後面接你的條件，按下去它就開始做。想看現在跑到哪，打 /goal 不帶東西；想收手，打 /goal clear。一個對話一次只能有一個目標。',
  },
  {
    icon: Scale,
    tag: '誰在判',
    title: '判的人不是做事的那個',
    body: '每一輪結束，它把你的條件跟這段對話送給另一個比較小的模型，回三種答案之一：還沒到（繼續，並把理由當成下一輪的方向）、達成（結束）、做不到（也結束）。做事的跟驗收的分開，它就不能自己說了算。',
  },
  {
    icon: Fence,
    tag: '它不管什麼',
    title: '權限沒有變鬆，輪數要自己寫進條件',
    body: '它不會幫你放寬權限，該問你的動作照樣會問。也沒有內建的輪數上限，要限制就把「或跑滿 5 輪就停」直接寫進條件裡。',
  },
];

const GOAL_LINE = `/goal 五題全部通過，而且瀏覽器 Console 沒有紅字。
或跑滿 5 輪就停下來，告訴我卡在第幾題`;

export default function SlideGoalCommand() {
  return (
    <SlideLayout
      title="/goal：條件寫一次，它自己跑到達成"
      subtitle="The Built-in Version"
      icon={Flag}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          剛才那段話裡最花力氣的是【什麼叫做完】那五題。Claude Code 有一個內建指令直接吃那一段：
          你把條件寫成一句話，它自己跑到條件成立為止。
          <strong className="text-slate-100">省掉的是每一輪催它，不是想清楚什麼叫做完。</strong>
          那五題還是你要寫。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <CopyBlock text={GOAL_LINE} note="條件就是你剛才寫過的那五題，換一種送法" size="xs" />
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BLOCKS.map((b, i) => {
            const Icon = b.icon;
            return (
              <AnimatedBlock
                key={b.tag}
                stepIndex={i + 3}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon size={16} className="text-sky-400 shrink-0" />
                  <span className="font-mono text-sm font-bold text-sky-300">【{b.tag}】</span>
                </div>
                <div className="text-slate-100 text-base font-bold leading-snug mb-2">{b.title}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{b.body}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="它幫不了你的那一件" stepIndex={6}>
          判定的那個模型不會自己去跑指令，也不會自己開檔案來看，
          <strong className="text-slate-100">它只讀得到 Claude 在對話裡秀出來的東西。</strong>
          所以【怎麼驗】那一段不能省，條件也要寫成它的輸出能證明的樣子。
          它說達成的時候，你還是要自己點一次。
        </Callout>

        <Callout tone="muted" label="別跟 /loop 搞混" stepIndex={7}>
          打 <span className="font-mono text-slate-100">/</span> 的時候你會看到一個
          <code className="font-mono text-orange-300 mx-1">/loop</code>，它做的是另一件事：
          照時間間隔重複跑同一句話，例如每五分鐘看一次部署好了沒，用來盯一個還在跑的東西。
          要它自己改一輪、驗一輪跑到條件成立的，是 <code className="font-mono text-orange-300">/goal</code>。
        </Callout>

      </div>
    </SlideLayout>
  );
}
