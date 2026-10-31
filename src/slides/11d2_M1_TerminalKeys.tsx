import { Keyboard, ClipboardCheck, Terminal, Undo2 } from 'lucide-react';
import { OptionalTag } from '../components/OptionalTag';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 最後查證：2026-09-21，逐條對照 code.claude.com/docs/en/permission-modes。
 * 當時的現況：六個模式的設定值是 default（介面叫 Manual）、acceptEdits、plan、
 * auto、dontAsk、bypassPermissions。Pro、Max 與 Team 在終端機與 VS Code 開機在 auto
 * （桌面版記的是上次在那個資料夾選的，不一定是 auto），按第一下進 default，
 * 之後 default → acceptEdits → plan → 回 default，選用模式插在 plan 後面。
 * 循環順序吻合。這一輪改了三處內文：原本寫「Pro 與 Max」漏了 Team；
 * 原本把 manual 說成「每一步都問你」，但官方寫的是那個模式下 Reads only 不必核准，
 * 所以讀檔不會問；acceptEdits 補上官方一併列出的 mkdir、mv、cp 這類檔案系統指令。
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
/**
 * 2026-10-31 三條的說明改成條列（講師：敘述太長）。模式切換那一條原本是一句
 * 一百二十字的長句，把四個模式與它們的循環順序塞在同一個句子裡的括號裡面，
 * 學員要自己拆才知道按幾下會到哪一個。現在 `cycle` 一個模式一行，按的順序從上往下。
 * **四個模式的名稱與行為跟 30_Cheat_Perms.tsx 同步，改一邊要改兩邊。**
 */
const KEYS: {
  icon: typeof ClipboardCheck;
  name: string;
  key: string;
  body: string[];
  cycle?: { k: string; v: string }[];
  note?: string;
}[] = [
  {
    icon: ClipboardCheck,
    name: '執行模式切換器',
    key: 'Shift + Tab',
    body: [
      '按一下換一個模式，狀態列會顯示目前是哪一個',
      'Pro、Max 與 Team 方案在終端機開起來是 auto，按的順序就是下面這一排',
    ],
    cycle: [
      { k: 'auto', v: '多數動作不問你，背後有另一個模型在檢查' },
      { k: 'manual', v: '讀檔不問，動手前都問你' },
      { k: 'acceptEdits', v: '檔案編輯與 mkdir、mv、cp 這類指令免問' },
      { k: 'plan', v: '只讀不改，先講怎麼做，不動手' },
    ],
    note: '按完 plan 再按一下回到 manual，auto 只在開場出現一次。',
  },
  {
    icon: Terminal,
    name: 'Shell 模式',
    key: '行首打 !',
    body: [
      '跟它講到一半想自己下一行指令（看目錄、測網路、跑編譯），在行首打一個 ! 接你的指令',
      '例如 !git status，就直接執行，不用退出 Claude',
    ],
    note: '重點不只是省一次切換：那行指令的輸出會留在這場對話裡，它看得到，所以你可以接著說「照這個結果處理」。'
  },
  {
    icon: Undo2,
    name: '終止執行',
    key: 'Esc ／ Esc Esc',
    body: [
      '按一次 Esc 中斷它手上的動作，做到一半的東西會留著',
      '輸入框空著時連按兩次 Esc，會跳出這次對話送出過的每一句話，選一個時間點退回去',
    ],
    note: '連按兩次 Esc 做的事，跟輸入 /rewind 一樣。那個指令兩邊都能用。',
  },
];

export default function SlideTerminalKeys() {
  return (
    <SlideLayout
      title="選修：模式切換、Shell 模式、終止執行"
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
                <ul className="space-y-0.5">
                  {k.body.map((b) => (
                    <li key={b} className="flex gap-2 text-slate-400 text-sm leading-relaxed">
                      <span className="shrink-0 text-slate-600">・</span>
                      {b}
                    </li>
                  ))}
                </ul>
                {k.cycle && (
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-1">
                    {k.cycle.map((c) => (
                      <li key={c.k} className="text-sm leading-relaxed">
                        <code className="font-mono font-bold text-orange-300">{c.k}</code>
                        <span className="ml-2 text-slate-400">{c.v}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
