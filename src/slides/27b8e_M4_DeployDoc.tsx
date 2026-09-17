import { FileSearch, ServerCog, Database, Clock, KeyRound } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';
import { CopyText } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 這一頁接在「把它變成一個網址」與「手機打開，紀錄卻是空的」後面。
 *
 * 為什麼要有它：前面兩頁走的是計時器這一個題目，路線是寫死的（純前端、推上去、
 * 選 Vercel 或 GitHub Pages）。但學員接下來要做的是自己的題目，那個題目可能有
 * 資料庫、可能要排程、可能要長時間跑一段運算，那三種在同一條路線上都會撞牆。
 *
 * 不用教六家平台的差別，理由有兩個：一是那是《工具與選擇策略》那堂課的方法論，
 * 這堂走的是「主要只用一個，把它用到底」；二是各家的免費額度與方案幾乎每季在動，
 * 寫進投影片就是每季要回來改一次。
 *
 * 所以這一頁教的是同一套已經教過的東西換個場合用：叫 Agent 讀完現況產出一份文件，
 * 你負責驗收它寫的對不對。跟第五章的 CLAUDE.md、第六章的健檢是同一個模式。
 */

/** DEPLOY.md 該回答的四件事。順序照「先擋路的排前面」。 */
const SECTIONS = [
  {
    icon: ServerCog,
    title: '這個專案要幾個服務',
    body: '純前端只要一個地方掛靜態檔案。一旦有登入、有後端 API，那就是兩個要各自上線、各自付錢的東西。',
  },
  {
    icon: Database,
    title: '資料存在哪裡',
    body: '存在瀏覽器裡的資料換一台裝置就不見了，前一頁那個空日誌就是這麼來的。要跨裝置就得有一個真的資料庫。',
  },
  {
    icon: Clock,
    title: '有沒有東西要一直醒著',
    body: '每天定時寄一封信、每小時抓一次資料，這種不能靠「有人打開網頁才跑」。它要一個不會睡著的地方。',
  },
  {
    icon: KeyRound,
    title: '哪些設定不能寫進程式碼',
    body: '金鑰與密碼要放平台的環境變數，不是放在檔案裡跟著推上去。這一條你前面已經用 .gitignore 擋過一次。',
  },
];

const PROMPT = `讀完這個專案，幫我寫一份 DEPLOY.md，回答四件事：
1. 這個專案要開幾個服務才跑得起來，各是什麼
2. 資料存在哪裡，換一台裝置還在不在
3. 有沒有東西需要一直醒著（定時、背景工作）
4. 哪些設定是金鑰或密碼，不能寫進程式碼
每一條都要指出你是看了哪個檔案下的判斷。
最後列出「照現在這樣直接部署會先撞到的三件事」，從最早撞到的開始排。
先不要改任何檔案。`;

export default function SlideDeployDoc() {
  return (
    <SlideLayout title="部署前，叫它寫一份 DEPLOY.md" subtitle="Deployment Diagnosis" icon={FileSearch}>
      <LiveDemo kind="claude" note="做完你會有一份 DEPLOY.md，列著會先撞牆的三件事" />

      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          計時器是純前端，所以前面那條路線走得完。
          <strong className="text-slate-100">你下一個題目不一定。</strong>
          有資料庫、要定時跑、要長時間算的專案，走同一條路會在不同的地方卡住，
          而卡住的時候畫面上通常只有一句看不懂的紅字。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <CopyText text={PROMPT} />
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedBlock
                key={s.title}
                stepIndex={i + 3}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2.5 mb-2">
                  <Icon aria-hidden="true" size={18} className="shrink-0 text-sky-400" />
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="它寫完之後，你要核的是這一句" stepIndex={7}>
          每一條都要指得出是看了哪個檔案下的判斷。
          <strong className="text-slate-100">指不出來的那幾條，是它照一般專案的樣子猜的，不是讀你的專案讀出來的。</strong>
          把那幾條退回去再問一次。
        </Callout>

      </div>
    </SlideLayout>
  );
}
