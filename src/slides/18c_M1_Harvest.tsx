import { PackageCheck, FolderOpen, MonitorPlay, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 章節三的收成頁。
 *
 * 模擬授課跑出來的問題：整個章節三有四頁叫學員動手，沒有一頁給「成功長什麼樣」，
 * 所以講者到最後也不知道有多少人真的做出東西。這一頁就是那個判準。
 *
 * 清單同時兌現前面欠的兩張支票：存檔（版本控制那一頁說「第一件事就是存檔」，
 * 但沒教怎麼存）、上線網址（部署那一頁說「最後會走完這一步」，實際上在章節八）。
 *
 * 2026-09-21 補「存不起來的時候」。講師回報學員在這一步常卡在權限，查下去發現
 * 卡的不是 GitHub：**這一頁的指令只在本機建 repository 與 commit，完全沒碰到 GitHub**，
 * 真正會擋住第一次 commit 的是 git 還不知道你是誰。GitHub 的帳號授權要到章節八
 * 推上去那一頁才會遇到，所以這裡只先打一支預防針，不在這裡教授權。
 * 章節八的 27b8b_M4_PushToGithub 目前沒有任何一句講授權，那是另一個缺口。
 *
 * 這裡只列學員手上真的會有的檔案。CLAUDE.md 曾經列過，但到這一頁為止它只被
 * 產出來看過一眼，沒有講過那是什麼，列進驗收清單學員無從判斷自己有沒有做到。
 */
const HAVE = [
  {
    icon: FolderOpen,
    text: (
      <>
        一個 <code className="font-mono text-slate-200">mission-timer</code> 資料夾，
        裡面有一個 <code className="font-mono text-slate-200">index.html</code>，
        整個計時器就是這一個檔案
      </>
    ),
  },
  {
    icon: ShieldCheck,
    text: (
      <>
        倒數進到你設定的那個門檻，畫面會照你自己寫的規格變。
        按待機、按返航，行為也跟你寫的一樣
      </>
    ),
  },
  {
    icon: MonitorPlay,
    text: (
      <>
        對 <code className="font-mono text-slate-200">index.html</code> 按兩下，
        瀏覽器會打開，倒數會動，底下有一行日出與日落時間。
        那一行是它去外面的 API 拿回來的，不是你自己打上去的
      </>
    ),
  },
];

const PROMPT =
  '幫我把這個資料夾建立成 Git repository，做第一次 commit，訊息寫『第一個作品完成』。';

export default function SlideM1Harvest() {
  return (
    <SlideLayout title="目前為止的專案進度" subtitle="What You Should Have" icon={PackageCheck}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            這一章做完，下面兩件事應該都成立。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 divide-y divide-slate-800">
          {HAVE.map((h, i) => {
            const Icon = h.icon;
            return (
              <div key={i} className="flex items-start gap-4 px-6 py-4">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                  <Icon size={17} />
                </span>
                <p className="text-slate-300 text-base leading-relaxed">{h.text}</p>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="text-base font-bold text-slate-100 mb-2">現在做一件事：存檔</div>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            前面講過 Git 是可以回去的存檔點，但還沒實際存過。現在存第一次。
          </p>
          <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-4 py-3">
            <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">Prompt</div>
            <p className="text-sky-100 text-sm leading-relaxed">「{PROMPT}」</p>
            <CopyAction text={PROMPT} className="mt-2" />
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            存完之後，Claude 改壞了這個資料夾裡的東西，你都回得到這一次的狀態。
            存檔之後才新增的檔案不在裡面，那要再存一次才算。
          </p>
        </AnimatedBlock>

        <Callout tone="focus" label="有一條對不上的時候" stepIndex={4}>
          把那個檔案打開，連同你當初寫的那段 prompt 一起貼回 Claude Code：
          <strong className="text-slate-100">「我要的是這樣，現在是這樣，幫我看哪裡沒做到。」</strong>
          這門課從頭到尾就是在練這個動作。
        </Callout>

        <Callout tone="warn" label="存不起來的時候" stepIndex={5}>
          最常見的是它回一段紅字，說 git 不知道你是誰，要你設定名字與 email。
          <strong className="text-slate-100">那不是你做錯，是這台電腦第一次用 git。</strong>
          把整段紅字貼回去，跟它說「幫我設定好再重跑一次」就結束了。
          <span className="mt-2 block text-slate-400">
            另一種是它根本找不到 git。這時候跟它說「幫我確認這台電腦有沒有 git，沒有的話告訴我怎麼裝」，
            照它給的步驟走。Windows 比較常遇到。
          </span>
        </Callout>

        <Callout tone="muted" label="還沒拿到的" stepIndex={6}>
          <strong className="text-slate-200">可以傳給別人的上線網址，現在還沒有。</strong>
          剛才那一次存檔只存在你的電腦裡，沒有上傳到任何地方。
          它要先推上 GitHub，再接部署平台，那兩步在章節八。
          <span className="mt-2 block text-slate-400">
            推上去的時候會遇到這一頁沒有的一件事：GitHub 要確認是你本人。
            它會停下來要你到瀏覽器登入並按同意，跟前面講部署授權那一段是同一回事，
            那一下它代不了你。</span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
