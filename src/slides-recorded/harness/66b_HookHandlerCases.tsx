import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { SeriesRail, HOOK_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/hooks 的 handler 欄位。
 * 五種的必填欄位逐條核對過：
 *   - command：`command`（另有 args、shell、async）
 *   - http：`url`（另有 headers、allowedEnvVars）
 *   - mcp_tool：`server`、`tool`，`input` 支援 `${tool_input.file_path}` 這種代入
 *   - prompt：`prompt`，可選 `model`，`$ARGUMENTS` 是這次事件的 JSON
 *   - agent：`prompt`，可選 `model`
 * 畫面上的片段是照這些欄位寫的，**不要憑印象改欄位名**，改版前重查那一節。
 *
 * 這一頁 2026-10-03 新增，接在 Slide 96（三層的動作）後面。
 * 講師回饋：五種動作列出來了，但學員不知道什麼情況會用哪一種，也不知道設定怎麼寫。
 * 所以每一種給一個白話情境，再貼一段真的能用的設定。
 *
 * 排版刻意不寫完整的巢狀 JSON：外面那層（時機、範圍）前一頁已經看過兩次，
 * 這一頁只秀 hooks 陣列裡的那一個物件，不然五段疊起來整頁都是括號。
 */
const CASES = [
  {
    type: 'command',
    when: 'Claude 寫完檔案之後',
    what: '自動跑一次排版，不用每次再提醒它',
    code: ['{ "type": "command",', '  "command": "npx prettier --write ." }'],
    lead: true,
  },
  {
    type: 'http',
    when: 'Claude 要動到正式環境那幾個檔案之前',
    what: '送一則通知到公司自己的系統，讓人知道有這件事',
    code: ['{ "type": "http",', '  "url": "https://example.com/hooks/claude" }'],
  },
  {
    type: 'mcp_tool',
    when: 'Claude 寫完檔案之後',
    what: '叫你接上的掃描工具掃一次這個檔案',
    code: [
      '{ "type": "mcp_tool", "server": "security",',
      '  "tool": "scan",',
      '  "input": { "file_path": "${tool_input.file_path}" } }',
    ],
  },
  {
    type: 'prompt',
    when: 'Claude 要把文案寫進檔案之前',
    what: '這種事寫不成規則，交給模型讀一次再決定',
    code: ['{ "type": "prompt",', '  "prompt": "這段文字的口氣會不會太兇？$ARGUMENTS" }'],
  },
  {
    type: 'agent',
    when: 'Claude 說做完了的時候',
    what: '要翻很多檔案才查得出來的事，派一個子代理去查',
    code: ['{ "type": "agent",', '  "prompt": "這次改動有沒有漏改其他引用到的地方？$ARGUMENTS" }'],
  },
];

export const meta: RecordedMeta = {
  id: 'harness-66b-hook-handler-cases',
  title: '五種動作各一個例子，設定怎麼寫',
  script:
    '五種動作聽完，你大概還是不知道什麼情況用哪一種，所以一個一個給例子，而且設定直接寫在旁邊，' +
    '你可以照抄。這幾段都是接在前一頁那個外層裡面的，時機跟範圍照你自己的情況填。' +
    '第一種，跑指令。情境是 Claude 寫完檔案之後自動跑一次排版，設定就一行，type 寫 command，command 寫你平常在終端機打的那一句。' +
    '第二種，呼叫一個網址。情境是 Claude 要動到正式環境那幾個檔案之前，送一則通知到公司自己的系統，讓人知道有這件事。type 寫 http，url 填你的網址。' +
    '第三種，呼叫你接上的工具。情境是 Claude 寫完檔案之後，叫你接上的掃描工具掃一次這個檔案。這一種要寫三個欄位：哪一台伺服器、哪一個工具，還有要把什麼丟過去，' +
    '畫面上那個大括號錢字號寫法，意思是把這次被寫的那個檔案路徑帶過去。' +
    '第四種，交給模型判斷。情境是這段文字的口氣會不會太兇，這種事你寫不成規則，所以讓模型讀一次再決定。prompt 裡那個 ARGUMENTS 會被換成這次事件的資料。' +
    '第五種，派子代理。情境是這次改動有沒有漏改其他引用到的地方，那要翻很多檔案才查得出來，所以派一個出去查，它只回報結論。' +
    '這五種裡面，前兩種是確定的規則，後兩種是要判斷的事情，而判斷就有判斷錯的時候，也比較慢。所以從第一種開始，真的寫不成規則了再往下換。',
  seconds: 95,
  // 速查性質：五段設定是給學員停下來照抄的，所以不套 160 字與 45 秒
  // （跟 32_Cheat_Tools 同一個理由）。錄的時候一段一段帶過去，不要一次展開。
  kind: 'reference',
};

export default function RecHookHandlerCases() {
  return (
    <SlideLayout title={meta.title} subtitle="Layer 3 in Practice" icon={ListChecks}>
      <RecPage className="space-y-4">
        <SeriesRail {...HOOK_RAIL} current={2} />

        <AnimatedBlock stepIndex={1} className="text-slate-500 text-lg leading-relaxed px-1">
          下面這幾段是填在前一頁那個外層裡面的，時機與範圍照你自己的情況填。
        </AnimatedBlock>

        {CASES.map((c, i) => (
          <AnimatedBlock
            key={c.type}
            stepIndex={i + 2}
            className={`rounded-2xl border px-6 py-4 ${
              c.lead ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
              <span className="font-mono text-lg font-bold text-orange-300">{c.type}</span>
              <span className="text-slate-500 text-base">{c.when}</span>
              <span className="text-slate-300 text-base">{c.what}</span>
            </div>
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-4 py-2.5 font-mono text-sm leading-relaxed text-slate-400">
              {c.code.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </AnimatedBlock>
        ))}

        <AnimatedBlock stepIndex={7} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 前兩種跑的是確定的規則，後兩種要判斷，而判斷就有判斷錯的時候，也比較慢。從跑指令開始。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
