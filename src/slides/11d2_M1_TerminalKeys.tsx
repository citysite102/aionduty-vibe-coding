import { Keyboard, ClipboardCheck, Terminal, Undo2 } from 'lucide-react';
import { OptionalTag } from '../components/OptionalTag';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 最後查證：2026-09-20，對照 code.claude.com/docs/en/permission-modes。
 * 當時的現況：六個模式的設定值是 default（介面叫 Manual）、acceptEdits、plan、
 * auto、dontAsk、bypassPermissions。Pro／Max／Team 開機在 auto，按第一下進 default，
 * 之後 default → acceptEdits → plan → 回 default，選用模式插在 plan 後面。
 * 這一頁寫的循環順序與預設值逐項吻合，本輪沒有改內容。
 * 下次改版前先重查那一節，不要憑印象改。
 *
 * 這一組數值與 30_Cheat_Perms.tsx 同步，改一邊要改兩邊。
 */

/**
 * 從「Claude Code 核心按鍵與技巧」拆出來的三個。
 *
 * 那一頁原本五個混在一起，其中三個是終端機的按鍵綁定，桌面版按了沒有反應，
 * 所以它得掛一段「用桌面版的人：! 是終端機版才有的」的但書。
 * 終端機自成一段之後，那三個搬到這裡，主線那頁就不必再分兩種讀者。
 *
 * 按鍵一律 orange，那是 Claude Code 定義的操作，屬於 A-1 的專有名詞用法。
 *
 * 2026-09-21：`!` 那一個原本叫「直通終端機／直通指令」，那是這份簡報自己造的詞。
 * 官方名稱是 Shell mode（code.claude.com/docs/en/interactive-mode 的 Input modes 表：
 * 「`!` at start ／ Shell mode ／ Run a command directly, add its output to the session,
 * and have Claude respond to it」）。順便補上原本漏掉的後半段：輸出會進到對話裡，
 * 那才是它跟「另開一個終端機視窗自己打」的差別。
 */
const KEYS = [
  {
    icon: ClipboardCheck,
    name: '執行模式切換器',
    key: 'Shift + Tab',
    body: '按一下換一個模式，狀態列會顯示目前是哪一個。Pro 與 Max 方案開起來預設在 auto（全自動），按第一下切到 manual（每一步都問你），之後依序是 acceptEdits（自動接受檔案修改）與 plan（只讀不改），再按回到 manual。',
    note: '其中的 plan 模式做的就是「先講怎麼做，不動手」。',
  },
  {
    icon: Terminal,
    name: 'Shell 模式',
    key: '行首打 !',
    body: '跟它講到一半想自己下一行指令（看目錄、測網路、跑編譯），在行首打一個 ! 接你的指令，例如 !git status，就直接執行，不用退出 Claude。',
    note: '重點不只是省一次切換：那行指令的輸出會留在這場對話裡，它看得到，所以你可以接著說「照這個結果處理」。'
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
      title="選修：模式切換、Shell 模式、喊停"
      subtitle={<><OptionalTag /> Terminal-only Moves</>}
      icon={Keyboard}
    >
      <div className="max-w-5xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          這三種在終端機裡都是按鍵。<strong className="text-slate-100">換模式桌面版也做得到</strong>，只是改用介面上的選單，不叫 <span className="font-mono text-slate-200">Shift + Tab</span>；Shell 模式那個是終端機獨有的。
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
