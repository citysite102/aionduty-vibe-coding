import { PackageCheck, FolderOpen, MonitorPlay } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 第一單元的收成頁。
 *
 * 模擬授課跑出來的問題：整個第一單元有四頁叫學員動手，沒有一頁給「成功長什麼樣」，
 * 所以講者到最後也不知道有多少人真的做出東西。這一頁就是那個判準。
 *
 * 清單同時兌現前面欠的兩張支票：存檔（版本控制那一頁說「第一件事就是存檔」，
 * 但沒教怎麼存）、上線網址（部署那一頁說「最後會走完這一步」，實際上在第四單元）。
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

export default function SlideM1Harvest() {
  return (
    <SlideLayout title="先確認你手上有什麼" subtitle="What You Should Have" icon={PackageCheck}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            這一單元做完，下面兩件事應該都成立。
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
            <p className="text-sky-100 text-sm leading-relaxed">
              「幫我在 mission-timer 這個資料夾建立 Git repository，做第一次 commit，訊息寫『第一單元完成』。」
            </p>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            存完之後，Claude 改壞了這個資料夾裡的東西，你都回得到這一次的狀態。
            存檔之後才新增的檔案不在裡面，那要再存一次才算。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" label="還沒拿到的" stepIndex={4}>
          <strong className="text-slate-200">可以傳給別人的上線網址，現在還沒有。</strong>
          它要先推上 GitHub，再接部署平台，那兩步在第四單元。
          你現在這個只有自己這台電腦看得到。
        </Callout>

      </div>
    </SlideLayout>
  );
}
