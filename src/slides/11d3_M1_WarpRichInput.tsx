import { PencilRuler, AtSign, Mic, SlashSquare, Keyboard } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { OptionalTag } from '../components/OptionalTag';
import { Callout } from '../components/Callout';

/**
 * 章節九最後一頁，2026-11-08 新增，影片裡沒有這一段（所以掛 `kind: '新增'`，A-5）。
 *
 * ── 為什麼擺這裡（B-5／B-5b）────────────────────────────────
 * 它要兩個前提：裝了 Warp（Slide 212）、而且 Claude Code 是在 Warp 裡面跑的（Slide 213）。
 * 擺在終端機這一章的最後，兩個前提剛好都成立。
 * **不要併進 Slide 212。** 那一頁的標題寫著「三個特點」而且已經錄過影，
 * 加第四個就得改標題，D-5 說錄過影的頁面標題不能動。
 * 也不要併進 Slide 214，那三個是 Claude Code 自己的按鍵，這一個是 Warp 給的。
 *
 * ── 出處（C-1）────────────────────────────────────────────
 * 最後查證：2026-11-08，對照 docs.warp.dev/agents/cli-agents/rich-input
 * 與 docs.warp.dev/agents/cli-agents/claude-code。當時的現況：
 *   - 「Press `Ctrl-G` (configurable) while a supported agent is running」，
 *     也可以點 agent utility bar 上的 Rich Input 按鈕。
 *   - 功能四項：IDE-style editing（滑鼠、多行、復原，另支援 Vim 鍵）、
 *     rich context with @mentions（檔案、資料夾、程式碼符號，圖片可以拖進去）、
 *     voice input、slash commands and skills（`/prompts`、`/skills` 與 Warp Drive；
 *     列出來的是當下那個 agent 的，跑 Claude Code 就是 Claude 的 Skill）。
 *   - 設定在 Settings > Agents > Third party CLI agents，快捷鍵可以改。
 * 文件沒有寫這個功能要不要付費，所以畫面上不要寫「免費」。
 * 下次改版前先重查那兩頁，不要憑印象改。
 *
 * 用色：只有 sky 一種（A-1）。`Ctrl-G`、`@`、`/skills` 都是 Warp 的東西不是 Claude 的，
 * **所以維持灰階等寬，不要上 orange**（A-1 的 orange 只標 Claude 專有名詞）。
 */

const FEATURES = [
  {
    icon: PencilRuler,
    name: '像編輯器一樣改字',
    body: '滑鼠點到哪裡就改哪裡，複製、貼上、復原、換行都照一般編輯器的習慣。習慣 Vim 的人它也接受 Vim 的按鍵。',
  },
  {
    icon: AtSign,
    name: '打 @ 把檔案帶進來',
    body: '引用一個檔案、一整個資料夾，或程式碼裡的某一個名字；圖片直接拖進去當參考。',
  },
  {
    icon: Mic,
    name: '用講的',
    body: '不想打字就口述，它轉成文字放進輸入框，送出前還看得到、改得動。',
  },
  {
    icon: SlashSquare,
    name: '打 / 叫出存好的',
    body: '存過的 prompt 與 Skill 列在這裡。列出來的是當下在跑的那個 agent 的，所以跑 Claude Code 看到的就是 Claude 的 Skill。',
  },
];

export default function SlideWarpRichInput() {
  return (
    <SlideLayout
      title="選修：Rich Input，在 Warp 裡寫長指示"
      subtitle={<><OptionalTag /> Rich Input Editor</>}
      icon={Keyboard}
      updated={{ date: '2026/11/01', kind: '新增' }}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-base leading-relaxed">
            終端機的那一行輸入框，打長一點就很難改：游標要用方向鍵移、貼進去的多行會直接送出。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            在 Warp 裡跑 Claude Code 的時候，按{' '}
            <code className="font-mono text-slate-200 bg-slate-950 border border-slate-800 rounded px-1.5 py-0.5">Ctrl-G</code>{' '}
            會開一個獨立的輸入視窗，長一點的指示在那裡面寫完再送出。
            Warp 那一列工具列上也有一顆 Rich Input 按鈕，點它一樣會開。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <AnimatedBlock
              key={f.name}
              stepIndex={i + 2}
              className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <f.icon aria-hidden="true" size={17} className="text-sky-400 shrink-0" />
                <h3 className="text-slate-100 text-base font-bold">{f.name}</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
            </AnimatedBlock>
          ))}
        </div>

        <Callout stepIndex={6} tone="muted" label="要用它，兩件事要先成立">
          <ul className="space-y-1">
            <li>裝了 Warp，而且 Claude Code 是在 Warp 的分頁裡跑的。用內建終端機沒有這個東西。</li>
            <li>
              快捷鍵想換、或想讓它一開場就打開，在 Warp 的{' '}
              <code className="font-mono text-slate-300">Settings → Agents → Third party CLI agents</code> 裡改。
            </li>
          </ul>
        </Callout>

      </div>
    </SlideLayout>
  );
}
