import { RefreshCw, Target, ListChecks, PlayCircle, Fence } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * M4 到這裡為止都在講循環的概念、零件與邊界，但學員從頭到尾沒看過一段
 * 「真的會自己跑下一輪」的指令長什麼樣子，下一頁就跳回收作品了。
 *
 * 這一頁的職務只有一個：把前面散落的四件事（目標、Done-when、驗證方式、邊界）
 * 合成一段可以照抄的話，題目沿用整堂課的任務計時器。
 *
 * 驗收條件刻意全部挑「用眼睛看得出來有沒有」的事實：
 *   1 是外觀，4 是瀏覽器 Console，5 是 CLAUDE.md 已經寫過的規則，
 *   2、3 是狀態交互，那是 AI 最常漏、學員最容易看出來的地方。
 * 不要換成「操作要順暢」這種形容詞，換掉這一頁就沒有教學效果了。
 *
 * 驗證用 webapp-testing，不用 npm run lint。第一單元的計時器是單一個
 * index.html，沒有 package.json，寫 lint 會變成一個跑不起來的假例子。
 */
const BLOCKS = [
  {
    icon: Target,
    tag: '目標',
    title: '一句話講清楚要什麼',
    body: '這一輪要它做的事。範圍只有一個功能，不是「把計時器做好」。',
    from: '對應 Goal 五步驟的第 1 步',
  },
  {
    icon: ListChecks,
    tag: '什麼叫做完',
    title: '五題都是用眼睛看得出來的事實',
    body: '沒有「順暢」「好看」這種字。每一題你都能指著畫面回答有或沒有，它才驗得動。',
    from: '對應第 2 步：Done-when',
  },
  {
    icon: PlayCircle,
    tag: '怎麼驗',
    title: '這一段才是讓它跑下一輪的引擎',
    body: '少了它，它改完就停在那裡等你。有了它，沒過的題目它會自己回頭修再驗一次。webapp-testing 就是前面那頁介紹的 Skill。',
    from: '對應「熱門 Skills 精選」那一頁',
  },
  {
    icon: Fence,
    tag: '邊界',
    title: '最多幾輪、能動哪些檔案、什麼時候停下來問你',
    body: '沒有這一段，它卡住的時候會一直重試，帳單跟著長。五輪是為了讓你在課堂上看得完，不是通則。',
    from: '對應第 3、4 步與前一頁的四道邊界',
  },
];

const PROMPT = `【目標】
幫計時器加上三個預設時間：15、25、50 分鐘，各一顆按鈕。

【什麼叫做完】五題全部通過才算完成
1. 三顆按鈕都點得到，點下去大字分別變成 15:00 / 25:00 / 50:00
2. 倒數進行中點另一顆，先停下來換成新時間，不會自己開始跑
3. 按「返航」之後回到目前選的那個時間，不是固定回 25:00
4. 瀏覽器 Console 沒有紅字
5. 沒有引用任何外部圖片

【怎麼驗】
每改完一輪，用 webapp-testing 自己開瀏覽器把上面五題點過一次，
逐題列出通過或失敗給我看。沒有全過就自己修，修完再驗一次。

【邊界】
只能改 index.html，樣式照 CLAUDE.md。
最多跑 5 輪，還沒全過就停下來，告訴我卡在第幾題。
需要改到別的檔案或安裝新套件，先問我。`;

export default function SlideLoopPractice() {
  return (
    <SlideLayout
      title="讓計時器自己跑完一輪"
      subtitle="Loop Engineering, Applied"
      icon={RefreshCw}
    >
      <LiveDemo kind="terminal" note="貼上這段，然後放著看它跑" />

      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            前面講完了循環是什麼、需要哪些零件、放手之前要設哪些邊界。
            <strong className="text-slate-100">這一頁把那些東西合成一段話</strong>，
            題目還是你手上那個計時器。左邊整段可以直接照抄，右邊是它為什麼要這樣寫。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-5 items-start">
          <AnimatedBlock
            stepIndex={2}
            className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden"
          >
            <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-5 py-2.5">
              <span className="font-mono text-xs uppercase tracking-widest text-sky-400">Prompt</span>
              <span className="text-xs text-slate-500">一次貼完，不要拆成四句慢慢講</span>
            </div>
            <pre className="px-5 py-4 font-mono text-xs md:text-sm leading-relaxed text-slate-300 whitespace-pre-wrap">
              {PROMPT}
            </pre>
          </AnimatedBlock>

          <div className="space-y-3">
            {BLOCKS.map((b, i) => {
              const Icon = b.icon;
              return (
                <AnimatedBlock
                  key={b.tag}
                  stepIndex={i + 3}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon size={16} className="text-sky-400 shrink-0" />
                    <span className="font-mono text-sm font-bold text-sky-300">【{b.tag}】</span>
                    <span className="ml-auto shrink-0 text-[10px] text-slate-600">{b.from}</span>
                  </div>
                  <div className="text-slate-100 text-sm font-bold leading-snug mb-1.5">{b.title}</div>
                  <p className="text-slate-400 text-sm leading-relaxed">{b.body}</p>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>

        <AnimatedBlock
          stepIndex={7}
          className="rounded-2xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-900 px-6 py-4"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            五題裡真正該花力氣的是第 2、3 題。
            <strong className="text-slate-100">那兩題講的是「按下去之後會怎樣」</strong>，
            也就是第一單元你被絆住的同一種地方。第 1 題它一定會過，第 2、3 題不寫進去它就會自己選一個答案。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
