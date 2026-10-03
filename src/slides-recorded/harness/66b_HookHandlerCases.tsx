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
 *
 * 2026-10-03（第三輪）每個例子補上「結果」那一列。講師回饋：「我還是有點看不懂這個 Hook
 * 可以怎麼用？做到什麼樣的效果」，指的是 prompt 那一格。病灶是五個例子都只寫到「動作」，
 * 也就是設定檔長什麼樣，但學員要的是「掛上去之後我會看到什麼」。原本那個答案只有頁尾
 * 一句泛稱的「三種結果」，而泛稱接不回任何一個情境。現在每一格自己講完效果，
 * 頁尾那一塊改成「上面那五個結果只有三種形狀」，從宣告變成歸納。
 * **新增例子要連結果一起寫**，只給設定檔等於沒回答這一頁的問題。
 *
 * 同一輪也補了 `$ARGUMENTS` 的一句白話（CLAUDE.md D-2「只有工程師看得懂的字」）。
 * 它在畫面上出現兩次而且長得像變數名稱，學員會以為那是自己要替換掉的東西。
 * 註解掛在 prompt 那一格（它第一次出現的地方），並明說底下 agent 同理，不要兩格各寫一次。
 *
 * 2026-10-03（第四輪）修掉一個真的會壞的錯。prompt 與 agent 兩格原本的設定只有一個問句
 * （「這段文字的口氣會不會太兇？$ARGUMENTS」），**照抄上去不會有任何作用**：
 * 官方文件寫得很明白，「The model's response must be valid JSON matching the JSON output
 * schema for the event. If the model's response isn't valid JSON or doesn't match the schema,
 * Claude Code treats it as a non-blocking error and proceeds with the action.」
 * 也就是模型用一般句子回答，Claude Code 會當作沒結果直接放行，而且不報錯。
 * 所以兩格的 prompt 都補上回傳格式（PreToolUse 走 hookSpecificOutput.permissionDecision，
 * Stop 走 top-level decision: "block" 加 reason），口白也加了一段講為什麼非寫不可。
 * **這一頁的設定是給學員照抄的，少一個欄位就是給他一條不會動的 Hook。**
 * 講師是從結果那一列反推出來的：「可是我的動作裡面又沒有要求他要改寫？」
 *
 * 同一輪另外兩處：
 *   - 頁尾「三種形狀」原本只列三個名詞，講師回饋「這裡很抽象，想要有具體案例」。
 *     現在三種各掛一個這一頁真的出現過的例子（見 SHAPES 上面那段註解）。
 *   - 💡 原本寫「前兩種跑確定的規則，後兩種要判斷」，講師看不懂：五種動作要自己數到第幾個
 *     才知道「前兩種」是誰。改成直接點名 command、http、prompt、agent。
 *
 * 2026-10-03（第五輪）http 與 mcp_tool 兩格補 note，病灶跟 prompt 那一輪同一個：
 * **設定看起來填完了，但照抄上去不會動，而畫面沒說為什麼。**
 *   - http：講師問「單純 http 應該是無法呼叫 API 做到通知」。半對。它確實會送出一個
 *     POST（文件原文：「Claude Code sends the hook's JSON input as the POST request body
 *     with `Content-Type: application/json`」），所以機制是成立的；不成立的是原本那個
 *     說法給人的印象「填個網址就有通知」。**你沒有地方可以寫要送什麼內容**，送的是
 *     Claude Code 自己的事件 JSON，對面必須有一個收得到 POST 的服務去解讀它。
 *     直接貼 Slack／Line 的 webhook 不會動，它們要自己的 body 格式。
 *     設定也補上 headers 與 allowedEnvVars（文件：沒列進 allowedEnvVars 的變數會被換成空字串），
 *     因為真的要打公司的服務幾乎都要帶 token。
 *   - mcp_tool：講師問「server、tool 看不太懂」。原本畫面上是 security／scan 兩個編出來的名字，
 *     而學員會以為那是固定關鍵字。那兩個是**他接 MCP 的時候自己取的**，所以 note 直接
 *     接回章節五裝 Notion 那一行指令裡的 `notion`，那是他真的打過的字。
 * **這一頁的設定一律要講到「哪些字是固定的、哪些是你要換掉的」**，少講這一句，
 * 學員照抄完發現沒反應，只會以為自己哪裡打錯。
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
    result: '存完檔，格式自動排好，你不用再提醒它一次',
    lead: true,
  },
  {
    type: 'http',
    story: 'Claude 要動到上線那一區之前，通知公司自己架的那個服務',
    event: '"PreToolUse"',
    eventNote: '還沒動手',
    scope: '"matcher": "Write|Edit"　"if": "Edit(deploy/**)"',
    scopeNote: '再縮到這個資料夾',
    action: [
      '{ "type": "http",',
      '  "url": "https://你們公司的網址/hooks/claude",',
      '  "headers": { "Authorization": "Bearer $MY_TOKEN" },',
      '  "allowedEnvVars": ["MY_TOKEN"] }',
    ],
    note: '這一格送出去的是 POST，內容是 Claude Code 自己的事件資料（哪個工具、動到哪個檔案），不是你寫的一句話。所以網址那邊要有一個收得到 POST 的服務，由它把那包資料轉成你看得懂的通知。直接貼 Slack 或 Line 的網址不會動，那些服務要的是它們自己的格式。要帶密鑰就照上面寫 headers，再把那個環境變數的名字列進 allowedEnvVars，沒列的會被換成空字串。',
    result: '那個服務收到一包資料，Claude 照樣繼續動手，這一條不是用來擋的',
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
    note: 'server 跟 tool 這兩個名字不是固定的，是你接 MCP 的時候就決定的。server 是你接上的那一組工具叫什麼名字（章節五裝 Notion 那一行指令裡的 notion 就是它），tool 是那一組底下的其中一個功能。所以這裡的 security 跟 scan 是假名，照抄不會動，要換成你自己真的接上的那一組；打 /mcp 看得到你手上有哪些。input 是要丟給那個功能的東西，大括號錢字號那個寫法會被換成這次被寫的檔案路徑。',
    result: '掃出問題會回報給 Claude，它自己回頭改那個檔案',
  },
  {
    type: 'prompt',
    story: '文案寫進去之前，先讓模型讀一次：口氣會不會太兇',
    event: '"PreToolUse"',
    eventNote: '要擋就得在動手前',
    scope: '"matcher": "Write|Edit"　"if": "Edit(docs/**)"',
    scopeNote: '只管文件那一區',
    action: [
      '{ "type": "prompt",',
      '  "prompt": "這段文字的口氣會不會太兇？$ARGUMENTS',
      '    回一段 JSON：{ "hookSpecificOutput": { "hookEventName": "PreToolUse",',
      '    "permissionDecision": "allow" 或 "deny", "permissionDecisionReason": "理由" } }" }',
    ],
    note: '兩件事：$ARGUMENTS 是固定寫法、不是變數名稱，它會被換成這次事件的資料，這裡就是正要寫進去的那段文字；而你一定要在 prompt 裡交代它用什麼格式回答，只丟一個問句，它會用一般句子回你，Claude Code 看不懂就直接放行，而且不會報錯。底下 agent 那一格同理。',
    result: '模型回 deny 的時候這次寫檔就被擋下來，Claude 看到那句理由，改寫一次再存',
  },
  {
    type: 'agent',
    story: 'Claude 說做完了，派一個子代理去查有沒有漏改別的地方',
    event: '"Stop"',
    eventNote: '它要收工的時候',
    scope: '不用填',
    scopeNote: '這個時機沒有工具可挑',
    action: [
      '{ "type": "agent",',
      '  "prompt": "這次改動有沒有漏改其他引用到的地方？$ARGUMENTS',
      '    有漏就回 { "decision": "block", "reason": "哪裡漏了" }，沒漏回 { }" }',
    ],
    result: '子代理回 block 的時候它就收不了工，看著理由回去補完再說做完了',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-66b-hook-handler-cases',
  title: '五個完整的例子：時機、範圍、動作',
  script:
    '三層都講完了，接下來五個完整的例子，每一個都把三層填好，而且會講出你實際上會看到什麼效果，你可以直接照抄。' +
    '第一個，排版。情境是 Claude 寫完檔案之後自動跑一次排版。時機選工具執行後，因為要先有檔案才排得了。範圍只留動到檔案那幾次。動作是跑指令，指令就寫你平常在終端機打的那一句。效果是：它存完檔，格式自動就排好了，你不用每次都提醒它一句「記得排版」。' +
    '第二個，通知。情境是 Claude 要動到上線那一區之前，讓公司那邊知道有這件事。時機選工具執行前。範圍除了挑工具，還多寫了一個 if，再縮到那個資料夾。動作是打一個網址。這一格有一件事要先講清楚，不然你照抄會發現它好像沒反應：它送出去的是一個 POST，內容是 Claude Code 自己的事件資料，也就是它用了哪個工具、動到哪個檔案，不是你寫的一句話。你沒有地方可以寫「請通知我」這種句子。所以網址那邊要有一個收得到 POST 的服務，由它把那包資料轉成你看得懂的通知。很多人第一次會直接把 Slack 或 Line 的網址貼上去，那不會動，因為那些服務要的是它們自己的格式，不是這一包。要帶密鑰的話就像畫面上這樣寫 headers，然後把那個環境變數的名字列進 allowedEnvVars，沒列進去的會被換成空字串。效果是：那個服務收到一包資料，而 Claude 照樣繼續動手，這一條不是用來擋的。' +
    '第三個，掃描。情境是 Claude 寫完檔案之後，叫你接上的掃描工具掃這個檔案。時機一樣是工具執行後，檔案存在了才掃得到。動作要寫三個欄位。第一個 server，第二個 tool，這兩個名字不是固定的，是你接 MCP 的時候就決定的：server 是你接上的那一組工具叫什麼名字，章節五裝 Notion 的時候，那一行指令裡的 notion 就是它；tool 是那一組底下的其中一個功能。所以畫面上這個 security 跟 scan 是我編的假名，你照抄不會動，要換成你自己真的接上的那一組，打斜線 mcp 就看得到你手上有哪些。第三個欄位 input，是要丟給那個功能的東西，畫面上那個大括號錢字號的寫法，意思是把這次被寫的那個檔案路徑帶過去。效果是：掃出問題會回報給 Claude，它自己回頭改那個檔案，不用你先發現。' +
    '第四個，交給模型判斷。情境是文案寫進去之前，先讓模型讀一次看口氣會不會太兇，這種事你寫不成規則，因為「太兇」沒辦法寫成一個可以比對的字。時機是工具執行前，要擋就得在動手之前；範圍用 if 只管文件那一區。動作那一格要寫兩件事。第一件是你想問的那個問題，後面接一個錢字號加 ARGUMENTS 全大寫。那個東西不是變數名稱，是固定寫法，你照抄就好；它會被換成這次事件的資料，在這個例子裡就是 Claude 正要寫進去的那段文字。少了它，那個模型只收到你的問題，看不到要判斷的東西。第二件更容易漏掉：你要交代它用什麼格式回答。畫面上第三行、第四行就是在講這件事，要它回一段 JSON，裡面寫 allow 還是 deny，deny 的話再附一句理由。為什麼一定要寫？因為 Claude Code 只看得懂那個格式。你如果只丟一個問句過去，它會用一般句子回你「嗯，這句有點兇」，那不是 JSON，Claude Code 就當作這次檢查沒結果，直接放行，而且不會報錯，你會以為自己掛好了。那效果是什麼？Claude 要寫這個檔案的時候，會先有另一個模型把那段文字讀一遍，回 deny 的話這次寫檔就被擋下來；Claude 看到那句理由，自己改寫一次再存。整件事你不用在場，也不用自己先讀過。' +
    '第五個，派子代理。情境是 Claude 說做完了，派一個出去查有沒有漏改別的地方。時機是收尾，而收尾不是在用工具，所以沒有工具可以挑，範圍那一行不用填。回答格式跟上一個一樣要寫出來：有漏就回 block 加一句理由，沒漏就回一個空的大括號。效果是：子代理回 block 的時候它就收不了工，看著那句理由回去補完，才能再說一次做完了。' +
    '五個看完你會發現，時機跟範圍是照情境決定的，動作才是你真正在挑的那一個。' +
    '最後補 if 的三種寫法：只管某個資料夾底下的，寫 Edit 括號 src 斜線 api 斜線兩顆星；只管某種副檔名的，寫 Edit 括號星點 ts；不管它在哪一層、只要資料夾叫 secrets 就管，前面加兩顆星。' +
    '這裡有一個地雷：括號前面那個字一律寫 Edit。Edit 在這裡涵蓋所有會動到檔案的工具，Write 跟 MultiEdit 那幾次也算在裡面。你如果照直覺寫成 Write 括號，不會報錯，但那一行永遠不會被拿去比對，等於你以為限定了、其實沒有。' +
    '剛才那五個效果，形狀其實只有三種，拿上面的例子各看一個。第一種，放行：口氣那一條判定沒問題的時候，什麼都不會發生，檔案照樣寫進去，你根本感覺不到它跑過。第二種，擋下來並附一句理由：口氣那一條判定太兇，這次寫檔就沒成功，Claude 收到「哪裡太兇」，自己改寫一次再存。' +
    '第三種我多講兩句，因為它最容易被略過：不擋，但是把發現的事告訴它。掃描那一條就是這一種。檔案已經寫進去了，Hook 收不回來，所以擋這個選項不存在。那它還能做什麼？把掃描工具發現的事講給 Claude 聽。這件事有用，是因為 Claude 自己不知道。它寫完一個檔案就往下做下一件事了，不會自己回頭跑一次掃描，也看不到掃描工具的輸出。你把那句話塞到它眼前，它才會去改。舉個實際的樣子：它寫完一個設定檔，掃描工具發現裡面有一組金鑰，那句「第十二行有一組金鑰」就會跟著出現在它的對話裡，它看到就自己把那一行拿掉。你沒塞的話，那個掃描結果只會留在記錄檔裡，沒有人看。' +
    '所以同樣是發現問題，能不能擋看的是時機。口氣那一條掛在寫之前，所以那段文字根本沒進檔案；掃描那一條掛在寫之後，只能事後補救。' +
    '最後，command 跟 http 每次做的事都一樣，照你寫的跑；prompt 跟 agent 是請模型判斷，比較慢，也會有判斷錯的時候。所以從跑指令開始，真的寫不成規則了再往下換。',
  seconds: 492,
  // 速查性質：五段設定是給學員停下來照抄的，所以不套 160 字與 45 秒
  // （跟 32_Cheat_Tools 同一個理由）。錄的時候一段一段帶過去，不要一次展開。
  kind: 'reference',
};

/**
 * 三種形狀各掛一個上面真的出現過的例子。原本這一塊只列三個名詞
 * （放行／擋下來附理由／只補一段訊息），講師回饋「這裡很抽象，想要有具體案例」：
 * 三個名詞學員對不回剛才那五格，看完還是不知道自己掛的那條會落在哪一種。
 * **新增形狀或改掉例子的時候，`from` 一定要指到這一頁真的有的那一格**，
 * 指到別頁的例子等於又回到抽象。
 *
 * 第三種原本叫「不擋，只補一段訊息」，講師第二次回饋：「不擋，只補一段訊息是什麼意思？
 * 就是為什麼要補訊息？補訊息又可以幹嘛」。病灶是那個名字只講了動作（補訊息），
 * 沒講對象，也沒講為什麼要補。關鍵的那一句是**Claude 自己不知道**：
 * 它寫完檔案就往下做了，不會回頭跑掃描，也看不到掃描工具的輸出。
 * 所以名字改成「不擋，但把發現的事告訴它」，說明也從「貼給它當參考」
 * 改成講清楚它為什麼看不到。口白再多給一個具體畫面（第十二行有一組金鑰）。
 * **這一格不要縮回一句話**，三種形狀裡只有這一種學員沒有直覺。
 */
const SHAPES = [
  {
    name: '放行',
    from: '口氣那一條判定沒問題',
    what: '什麼都不會發生，檔案照樣寫進去，你感覺不到它跑過。',
  },
  {
    name: '擋下來，附一句理由',
    from: '口氣那一條判定太兇',
    what: '這次寫檔沒成功。Claude 收到「哪裡太兇」，自己改寫一次再存。',
  },
  {
    name: '不擋，但把發現的事告訴它',
    from: '掃描那一條',
    what:
      '檔案已經寫進去了，Hook 收不回來。但掃描工具發現的事 Claude 自己不知道，' +
      '它寫完就往下做了，不會回頭去掃一次。把那句話塞到它眼前，它才會去改那一行。',
  },
];

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
                {c.note && <div className="font-sans text-slate-500 mt-2 leading-relaxed">{c.note}</div>}
              </div>

              <span className="text-slate-500 text-base">結果</span>
              <span className="text-slate-300 text-base">{c.result}</span>
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
          <div className="text-slate-100 text-lg font-bold mb-3">上面那五個結果，只有三種形狀</div>
          <div className="space-y-3">
            {SHAPES.map((s) => (
              <div key={s.name}>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="text-slate-200 text-base font-bold">{s.name}</span>
                  <span className="text-slate-500 text-base">{s.from}</span>
                </div>
                <p className="text-slate-400 text-base leading-relaxed">{s.what}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-base leading-relaxed mt-3">
            同樣是發現問題，能不能擋看的是時機：口氣那一條掛在寫之前，所以那段文字根本沒進檔案；
            掃描那一條掛在寫之後，檔案已經在硬碟上，Hook 收不回來，只能把發現的事告訴 Claude，讓它回頭改。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={8} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 時機與範圍是情境決定的，動作才是你在挑的。
            <code className="font-mono text-orange-300">command</code> 跟{' '}
            <code className="font-mono text-orange-300">http</code> 每次做的事都一樣，
            <code className="font-mono text-orange-300">prompt</code> 跟{' '}
            <code className="font-mono text-orange-300">agent</code> 是請模型判斷，比較慢、也會判斷錯，所以先從跑指令開始。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
