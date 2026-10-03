import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/hooks 與 /permissions。
 * 逐條核對過：
 *   - handler 欄位：command 的 `command`；http 的 `url`；mcp_tool 的 `server`、`tool`、`input`
 *     （`input` 支援 `${tool_input.file_path}` 這種代入）；prompt 與 agent 的 `prompt`
 *     （`$ARGUMENTS` 會被換成這次事件的 JSON），兩者可選 `model`。
 *   - `if` 用 permission rule 語法，文件原文舉的例子是「`"Edit(*.ts)"` runs only for
 *     TypeScript files」。路徑規則只比對 `Edit(...)` 與 `Read(...)`：寫成 `Write(...)`
 *     會被接受但永遠不會被拿去比對（文件原文：Claude Code accepts the rule but never consults it）。
 *   - `matcher` 只在工具事件上比對工具名稱。`Stop` 不是工具事件，沒有東西可挑。
 * **不要憑印象改欄位名**，改版前重查那兩節。
 *
 * 這一頁 2026-10-03 新增，接在 Slide 96（三層的動作）後面，兩輪講師回饋長出來的：
 *   第一輪：五種動作列出來了，但學員不知道什麼情況用哪一種、設定怎麼寫。
 *   第二輪：不能只給動作，時機與範圍也要有例子。
 * 所以每一個例子都是完整的三層，而且五個的時機與範圍刻意各不相同，
 * 學員才看得出那兩層是跟著情境變的。**不要為了版面把三層縮回一層。**
 *
 * 版面用三行小表而不是巢狀 JSON：完整的巢狀長相 Slide 93 已經看過一次，
 * 這一頁要比的是「同一個位置在五種情況下各填什麼」，五段巢狀疊起來只會看到括號。
 *
 * `if` 的三種寫法與 Edit 那個地雷原本在 Slide 95，2026-10-03 搬到這一頁的頁尾，
 * 因為那一頁超過畫面字數上限，而這裡本來就在示範 `if`。
 */
const CASES = [
  {
    type: 'command',
    story: 'Claude 寫完檔案之後，自動跑一次排版',
    event: '"PostToolUse"',
    eventNote: '它已經寫進去了',
    scope: '"matcher": "Write|Edit"',
    scopeNote: '只有動到檔案那幾次',
    action: ['{ "type": "command",', '  "command": "npx prettier --write ." }'],
    lead: true,
  },
  {
    type: 'http',
    story: 'Claude 要動到上線那一區之前，送一則通知到公司的系統',
    event: '"PreToolUse"',
    eventNote: '還沒動手',
    scope: '"matcher": "Write|Edit"　"if": "Edit(deploy/**)"',
    scopeNote: '再縮到這個資料夾',
    action: ['{ "type": "http",', '  "url": "https://example.com/hooks/claude" }'],
  },
  {
    type: 'mcp_tool',
    story: 'Claude 寫完檔案之後，叫你接上的掃描工具掃這個檔案',
    event: '"PostToolUse"',
    eventNote: '檔案存在了才掃得到',
    scope: '"matcher": "Write|Edit"',
    scopeNote: '只有動到檔案那幾次',
    action: [
      '{ "type": "mcp_tool", "server": "security", "tool": "scan",',
      '  "input": { "file_path": "${tool_input.file_path}" } }',
    ],
  },
  {
    type: 'prompt',
    story: '文案寫進去之前，先讓模型讀一次：口氣會不會太兇',
    event: '"PreToolUse"',
    eventNote: '要擋就得在動手前',
    scope: '"matcher": "Write|Edit"　"if": "Edit(docs/**)"',
    scopeNote: '只管文件那一區',
    action: ['{ "type": "prompt",', '  "prompt": "這段文字的口氣會不會太兇？$ARGUMENTS" }'],
  },
  {
    type: 'agent',
    story: 'Claude 說做完了，派一個子代理去查有沒有漏改別的地方',
    event: '"Stop"',
    eventNote: '它要收工的時候',
    scope: '不用填',
    scopeNote: '這個時機沒有工具可挑',
    action: ['{ "type": "agent",', '  "prompt": "這次改動有沒有漏改其他引用到的地方？$ARGUMENTS" }'],
  },
];

export const meta: RecordedMeta = {
  id: 'harness-66b-hook-handler-cases',
  title: '五個完整的例子：時機、範圍、動作',
  script:
    '三層都講完了，接下來五個完整的例子，每一個都把三層填好，你可以直接照抄。' +
    '第一個，排版。情境是 Claude 寫完檔案之後自動跑一次排版。時機選工具執行後，因為要先有檔案才排得了。範圍只留動到檔案那幾次。動作是跑指令，指令就寫你平常在終端機打的那一句。' +
    '第二個，通知。情境是 Claude 要動到上線那一區之前，送一則通知到公司的系統，讓人知道有這件事。時機選工具執行前。範圍除了挑工具，還多寫了一個 if，再縮到那個資料夾。動作是呼叫一個網址，把網址填進去就好。' +
    '第三個，掃描。情境是 Claude 寫完檔案之後，叫你接上的掃描工具掃這個檔案。時機一樣是工具執行後，檔案存在了才掃得到。動作要寫三個欄位：哪一台伺服器、哪一個工具、要把什麼丟過去。畫面上那個大括號錢字號的寫法，意思是把這次被寫的那個檔案路徑帶過去。' +
    '第四個，交給模型判斷。情境是文案寫進去之前，先讓模型讀一次看口氣會不會太兇，這種事你寫不成規則。要擋就得在動手之前，所以時機是工具執行前，範圍用 if 只管文件那一區。prompt 裡那個 ARGUMENTS 會被換成這次事件的資料。' +
    '第五個，派子代理。情境是 Claude 說做完了，派一個出去查有沒有漏改別的地方。時機是收尾，而收尾不是在用工具，所以沒有工具可以挑，範圍那一行不用填。' +
    '五個看完你會發現，時機跟範圍是照情境決定的，動作才是你真正在挑的那一個。' +
    '最後補 if 的三種寫法：只管某個資料夾底下的，寫 Edit 括號 src 斜線 api 斜線兩顆星；只管某種副檔名的，寫 Edit 括號星點 ts；不管它在哪一層、只要資料夾叫 secrets 就管，前面加兩顆星。' +
    '這裡有一個地雷：括號前面那個字一律寫 Edit。Edit 在這裡涵蓋所有會動到檔案的工具，Write 跟 MultiEdit 那幾次也算在裡面。你如果照直覺寫成 Write 括號，不會報錯，但那一行永遠不會被拿去比對，等於你以為限定了、其實沒有。' +
    '那它查完之後呢？五種的回報方式是一樣的，只有三種結果：放行；擋下來並附一句理由，Claude 會看到那句理由，換個做法再來一次；或是不擋，只補一段訊息給它參考。而擋得住與否看的是時機那一層，不是動作那一層：動手之前擋得住，動手之後就只能補救。最後，前兩種動作跑的是確定的規則，後兩種要判斷，判斷就有判斷錯的時候，也比較慢。所以從跑指令開始，真的寫不成規則了再往下換。',
  seconds: 150,
  // 速查性質：五段設定是給學員停下來照抄的，所以不套 160 字與 45 秒
  // （跟 32_Cheat_Tools 同一個理由）。錄的時候一段一段帶過去，不要一次展開。
  kind: 'reference',
};

const IF_FORMS = [
  { code: 'Edit(src/api/**)', note: '只管這個資料夾底下' },
  { code: 'Edit(*.ts)', note: '只管這種副檔名' },
  { code: 'Edit(**/secrets/**)', note: '不管在哪一層，只要資料夾叫 secrets' },
];

export default function RecHookHandlerCases() {
  return (
    <SlideLayout title={meta.title} subtitle="Three Layers in Practice" icon={ListChecks}>
      <RecPage className="space-y-3.5">
        <SeriesRail {...HOOK_RAIL} current={2} />

        {CASES.map((c, i) => (
          <AnimatedBlock
            key={c.type}
            stepIndex={i + 1}
            className={`rounded-2xl border px-6 py-4 ${
              c.lead ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2.5">
              <span className="font-mono text-lg font-bold text-orange-300">{c.type}</span>
              <span className="text-slate-300 text-base">{c.story}</span>
            </div>

            <div className="grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1.5 items-baseline">
              <span className="text-slate-500 text-base">時機</span>
              <span className="flex flex-wrap items-baseline gap-x-3">
                <code className="font-mono text-base text-slate-300">{c.event}</code>
                <span className="text-slate-600 text-base">{c.eventNote}</span>
              </span>

              <span className="text-slate-500 text-base">範圍</span>
              <span className="flex flex-wrap items-baseline gap-x-3">
                <code className="font-mono text-base text-slate-300">{c.scope}</code>
                <span className="text-slate-600 text-base">{c.scopeNote}</span>
              </span>

              <span className="text-slate-500 text-base">動作</span>
              <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2 font-mono text-sm leading-relaxed text-slate-400">
                {c.action.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </AnimatedBlock>
        ))}

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="text-slate-100 text-lg font-bold mb-2">
            <code className="font-mono text-orange-300">if</code> 的三種寫法
          </div>
          <div className="space-y-1.5">
            {IF_FORMS.map((f) => (
              <div key={f.code} className="flex flex-wrap items-baseline gap-x-4">
                <code className="font-mono text-base text-slate-300">{f.code}</code>
                <span className="text-slate-600 text-base">{f.note}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-base leading-relaxed mt-3">
            括號前面那個字一律寫 <code className="font-mono text-slate-300">Edit</code>，它涵蓋所有會動到檔案的工具，
            Write 跟 MultiEdit 那幾次也算在裡面。照直覺寫成{' '}
            <code className="font-mono text-slate-300">Write(...)</code> 不會報錯，
            但那一行永遠不會被拿去比對，等於你以為限定了、其實沒有。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={7} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <div className="text-slate-100 text-lg font-bold mb-2">那它查完之後呢？</div>
          <p className="text-slate-400 text-base leading-relaxed">
            五種的回報方式是一樣的，只有三種結果：<strong className="text-slate-200">放行</strong>；
            <strong className="text-slate-200">擋下來並附一句理由</strong>，Claude 會看到那句理由，換個做法再來一次；
            或是<strong className="text-slate-200">不擋，只補一段訊息</strong>給它參考。
          </p>
          <p className="text-slate-500 text-base leading-relaxed mt-2">
            擋得住與否看的是時機那一層，不是動作那一層：動手之前擋得住，動手之後就只能補救。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={8} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 時機與範圍是情境決定的，動作才是你在挑的。前兩種跑確定的規則，後兩種要判斷，所以從跑指令開始。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
