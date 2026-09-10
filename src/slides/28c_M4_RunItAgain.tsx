import { Repeat, FolderOpen, FileText, PlayCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 章節八整章叫「循環」，但到這裡為止教的其實是「一輪」：你貼一段話，它自己
 * 改幾輪、驗幾輪，你驗收，結束。下個月同一件事再來，學員還是得把整段話重貼。
 *
 * 這一頁補的就是那個缺口：輸入從哪裡來、產物寫到哪裡、下次怎麼叫得動。
 * 三塊各自對應學員前面已經拿到的東西，右上角那行 from 就是在接回去，
 * 不要拿掉，那是這一頁唯一能讓人看出「我已經有一半了」的地方。
 *
 * 位置在「新專案的前三個動作」之後，不能插到它跟「回去之後，做哪一種題目」
 * 中間：前三個動作第 1 步開頭是「題目挑好之後」，那句話指的是前一頁（B-4）。
 *
 * 強調色只有 sky 一種，三塊是平等的環節，不要一塊一色（A-1）。
 */
const PARTS = [
  {
    icon: FolderOpen,
    tag: '輸入',
    title: '它自己去拿，不是你貼給它',
    body: (
      <>
        把這次要處理的東西固定放同一個資料夾，指令裡寫「讀{' '}
        <code className="font-mono text-slate-300">data/</code>{' '}
        底下這個月的檔案」，而不是把內容貼進對話。下次你只換資料夾裡的檔案，話不用重講。
      </>
    ),
    from: '對應題目那頁的第一種：每週報表',
  },
  {
    icon: FileText,
    tag: '產物',
    title: '固定寫到同一個檔名',
    body: (
      <>
        每一輪的結果寫成{' '}
        <code className="font-mono text-slate-300">reports/2026-09.md</code>{' '}
        這種固定格式的檔名。有檔名你才找得回來，也才比得出這次跟上次差在哪。寫在對話裡的東西，關掉視窗就沒了。
      </>
    ),
    from: '對應「做完你手上會有」那一行',
  },
  {
    icon: PlayCircle,
    tag: '再跑一次',
    title: '你只要說一句話',
    body: (
      <>
        前面兩件事做好之後，下次不用重寫指令。把它包成一份{' '}
        <code className="font-mono text-orange-300">SKILL.md</code>
        ，你說「用這個跑這個月的」它就展開。
      </>
    ),
    from: '對應 SKILL.md 那一種題目',
  },
];

export default function SlideRunItAgain() {
  return (
    <SlideLayout
      title="輸入放同一個資料夾，產物寫同一個檔名"
      subtitle="From One Run to a Standing Loop"
      icon={Repeat}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          前面那一輪跑完，東西在你手上了。但下個月同一件事再來一次，
          <strong className="text-slate-100">你還是得把整段話重貼一次。</strong>
          差別在三個地方。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PARTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedBlock
                key={p.tag}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon size={16} className="text-sky-400 shrink-0" />
                  <span className="font-mono text-sm font-bold text-sky-300">【{p.tag}】</span>
                </div>
                <div className="text-slate-100 text-base font-bold leading-snug mb-2">{p.title}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
                <p className="mt-3 border-t border-slate-800 pt-3 text-sm text-slate-600">{p.from}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="頭尾這三件才是新的" stepIndex={5}>
          中間那段做事與停下來問你，跟計時器那一輪一樣。頭尾這三件是這一輪才加進來的：
          <strong className="text-slate-100">自己拿輸入、留下具名產物、下次還叫得動。</strong>
          少了任何一個，它就只是幫你做完這一次。
        </Callout>

      </div>
    </SlideLayout>
  );
}
