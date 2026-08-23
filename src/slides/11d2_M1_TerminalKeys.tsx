import { Keyboard, ClipboardCheck, Terminal, Undo2 } from 'lucide-react';
import { OptionalTag } from '../components/OptionalTag';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 從「Claude Code 核心按鍵與技巧」拆出來的三個。
 *
 * 那一頁原本五個混在一起，其中三個是終端機的按鍵綁定，桌面版按了沒有反應，
 * 所以它得掛一段「用桌面版的人：! 是終端機版才有的」的但書。
 * 終端機自成一段之後，那三個搬到這裡，主線那頁就不必再分兩種讀者。
 *
 * 按鍵一律 orange，那是 Claude Code 定義的操作，屬於 A-1 的專有名詞用法。
 */
const KEYS = [
  {
    icon: ClipboardCheck,
    name: '執行模式切換器',
    key: 'Shift + Tab',
    body: '在「每次都問」與「自動接受編輯」之間切換，輸入框下方會顯示目前模式（default ➔ acceptEdits ➔ plan 循環），你隨時可以收放它對專案的修改權限。',
    note: '其中的 plan 模式做的就是「先講怎麼做，不動手」。',
  },
  {
    icon: Terminal,
    name: '直通終端機',
    key: '按 ! 鍵',
    body: '跟它講到一半想自己下一行指令（看目錄、測網路、跑編譯），在行首打一個 ! 接你的指令，例如 !git status，就直接執行，不用退出 Claude。',
    note: null,
  },
  {
    icon: Undo2,
    name: '喊停',
    key: 'Esc ／ Esc Esc',
    body: '覺得方向不對，按一次 Esc 中斷它手上的動作，做到一半的東西會留著。輸入框空著時連按兩次 Esc，會跳出這次對話送出過的每一句話，選一個時間點退回去。',
    note: '連按兩次 Esc 做的事，跟輸入 /rewind 一樣。那個指令兩邊都能用。',
  },
];

export default function SlideTerminalKeys() {
  return (
    <SlideLayout
      title="選修：終端機才有的三種操作：模式切換、直通指令、喊停"
      subtitle={<><OptionalTag /> Terminal-only Moves</>}
      icon={Keyboard}
    >
      <div className="max-w-5xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          這三種都是按鍵操作，<strong className="text-slate-100">不是指令</strong>，所以打 <span className="font-mono text-slate-200">/</span> 找不到它們，
          而且只有在終端機裡按才有反應。
        </AnimatedBlock>

        {KEYS.map((k, i) => {
          const Icon = k.icon;
          return (
            <AnimatedBlock
              key={k.key}
              stepIndex={i + 2}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 flex gap-4 items-start"
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h3 className="text-base font-bold text-slate-100">{k.name}</h3>
                  <code className="font-mono text-sm font-bold text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded">
                    {k.key}
                  </code>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{k.body}</p>
                {k.note && (
                  <p className="text-slate-500 text-sm leading-relaxed mt-1.5">{k.note}</p>
                )}
              </div>
            </AnimatedBlock>
          );
        })}

        <Callout tone="muted" stepIndex={5}>
          <code className="font-mono text-orange-300">Esc</code> 的退回只管得到 Claude 自己改的檔案。
          用指令刪掉、搬走的東西救不回來，所以動工前先存一次檔還是最保險。
        </Callout>

      </div>
    </SlideLayout>
  );
}
