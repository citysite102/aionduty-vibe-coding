import { Milestone, MessageSquare, FileCode, Wrench, Settings, RefreshCw, GitMerge } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 播放順序上這一頁在 `27_M4_LoopEng`（什麼是 Loop Engineering？）之前，
 * 檔名的 27a 只是主題群組編號，不是頁碼（CLAUDE.md B-2b）。
 *
 * 這一頁為什麼存在：Loop Engineering 單獨講會像一個新名詞，學員會以為前面學的
 * 問法、CLAUDE.md、MCP 與 Skill、運作框架被換掉了。實際上每一層解的都是上一層
 * 留下來的卡點，所以先把這條線攤開，下一頁的 Loop 才有位置可以掛。
 *
 * **這六層是這門課的歸納，不是誰家的規格。** 沒有任何機構發布過一份
 * 「AI 開發方法的六個階段」清單。所以開場那句寫的是「回頭整理才看得出來的」，
 * 不要改成「業界公認的六個階段」那種斷言句，理由同 `19c_Harness_Architecture`
 * 檔頭記過的那一條。
 *
 * ── `when` 那一欄（C-1）────────────────────────────────────────────────
 * 最後查證：2026-10-05。它寫的是**這一層大約在哪一段時間變成大家的重心**，
 * 不是誰發明的日子，也不是那個名詞被叫開的日子。
 *
 * 2026-10-05 從「名詞被叫開的時間」改成現在這個寫法，理由有兩個：
 *   1. 照名詞的時間寫，Context Engineering 會變成 2025.06，但那只是它被定名的時間，
 *      做法 2023 年 RAG 那一波就有了。只給一個 2025.06 讀起來像是「這件事很新」，
 *      而學員自己 2023 就在用長上下文跟系統提示了，對不上。
 *   2. 照名詞的時間寫，MCP（2024.11 發布）會比 Context Engineering（2025.06 定名）還早，
 *      日期在表上倒著走，於是要在畫面上加一段但書解釋。改成時期之後日期自然遞增，
 *      那段但書就不需要了。名詞的定名時間改放逐字稿，講的時候補一句。
 *
 * 各列的依據：
 *   問法         2020～2022。GPT-3（2020-06）之後這個詞才通用（Gwern Branwen、Karpathy
 *                都被指為早期使用者，學術上常引 Reynolds & McDonell 2021），
 *                到 ChatGPT（2022-11）那一段，怎麼問還是最主要的功夫。
 *   背景資料     2023～2024。RAG 與長上下文那一波。名字晚很多：Tobi Lütke 2025-06-18
 *                在 X 上給出那個被當成定義的說法，Karpathy 約一週後背書，之後一個月內
 *                出現第一份把它當成一門學科處理的綜述。
 *   工具與做法   2024～2025。OpenAI 2023-06 的 function calling 開了頭，
 *                Anthropic 2024-11-25 公布 MCP，2025-10-16 發布 Agent Skills
 *                （2025-12-18 開成公開規格）。這兩個日期寫在 en 那一行，它們是產品，有確切日期。
 *   運作框架     2025。Claude Code 那一代工具出來之後，重心從「怎麼問」移到
 *                「這個 Agent 的工作環境怎麼配」。「Harness Engineering」這個說法
 *                也是在這之後、Loop Engineering 之前被叫開的。
 *   自己跑下一輪 2026。Loop Engineering 這個詞出自
 *                cobusgreyling.substack.com/p/loop-engineering，發表日 2026-06-09，
 *                開頭那句就是「remember when Context Engineering was new, then Harness
 *                Engineering…now we have Loop Engineering」。下一頁引用的也是這個來源。
 *   路線畫成一張圖 2026 下半。2026-07 這個詞才開始擴散，到查證日為止還沒有公認定義。
 *
 * 下次改版前先確認最後兩列還成立。Graph 那一列不成立就整列拿掉，不要硬留。
 */
const STAGES = [
  {
    icon: MessageSquare,
    name: '問法',
    en: 'Prompt Engineering',
    when: '2020～2022',
    unlock: '會照著指示做，不只是接句子',
    stuck: '它只看得到你打的那一句話，講不清楚它就自己猜一個。',
    move: '把需求寫完整：要什麼、不要什麼、不要用代稱，版面講不清楚就給它一張圖。',
  },
  {
    icon: FileCode,
    name: '背景資料',
    en: 'Context Engineering',
    when: '2023～2024',
    unlock: '一次讀得進整個專案的檔案',
    stuck: '話講清楚了，它還是不知道你的專案長什麼樣、哪些規則不能破。',
    move: (
      <>
        把規則、檔案與先前的決定放進它讀得到的範圍。
        <code className="font-mono text-orange-300">CLAUDE.md</code> 就是這一層。
      </>
    ),
  },
  {
    icon: Wrench,
    name: '工具與做法',
    en: 'MCP 2024.11、Skills 2025.10',
    when: '2024～2025',
    unlock: '會自己判斷該呼叫哪一個工具',
    stuck: '資料與系統在對話外面，它讀不到也動不了；做法每次都要重講一遍。',
    move: 'MCP 照同一套規範把外部服務接進來，Skill 把做法存成它每次照著走的步驟。',
  },
  {
    icon: Settings,
    name: '運作框架',
    en: 'Agentic Engineering / Harness',
    when: '2025',
    unlock: '能連續做十幾步而不走偏',
    stuck: '零件各自都有了，但沒人規定什麼時候載入、誰能動什麼、做壞了誰擋。',
    move: '把規則、工具、關卡、分工、沙箱與紀錄組成一套固定的工作環境。',
  },
  {
    icon: RefreshCw,
    name: '自己跑下一輪',
    en: 'Loop Engineering',
    when: '2026',
    unlock: '多花運算試錯與檢查，正確率會上去',
    stuck: '環境都備好了，每一輪還是要你回來打一句話。最慢的那一段變成你。',
    move: '寫下完成條件與邊界，剩下的每一輪由它自己發動：改一輪、驗一輪。',
    accent: true,
  },
  {
    icon: GitMerge,
    name: '路線畫成一張圖',
    en: 'Graph Engineering',
    when: '2026 下半',
    // 這一列的 unlock 刻意不寫「同時派好幾個子代理」：章節七已經教過分工與平行的
    // 子代理，寫成那樣學員會覺得這是舊東西換個名字。真正的差別是路線本身變成一份
    // 寫下來的東西，不是每次口頭交代，所以三欄都照那個差別重寫。
    unlock: '不是模型多了能力，是任務變複雜了',
    stuck: '你學過的那種分工是每次口頭交代；任務一複雜，交代本身就變成要管的事。',
    move: '哪幾段同時做、哪裡要等、失敗退回哪裡，一次寫定，不用每次重講。',
    tentative: true,
  },
];

const COLS =
  'grid-cols-1 md:grid-cols-[minmax(0,215px)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.25fr)]';

export default function SlideEngEvolution() {
  return (
    <SlideLayout
      title="從 Prompt 到 Loop：每個階段解掉的卡點"
      subtitle="Prompt → Context → Agentic → Loop"
      icon={Milestone}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3 pb-8">

        {/*
          2026-10-05 拿掉開場那兩段（「這條線是回頭整理才看得出來的」與日期的但書）。
          那兩段講的是怎麼讀這張表，不是表的內容，印在畫面上會先佔掉兩行又沒人會抄。
          它們沒有被刪掉，搬到逐字稿去講了（8-1 的 Slide 144，開場第二、三段），
          **改這一頁的日期或順序時要回去同步那兩段**，那裡是現在唯一寫著
          「日期是說法被叫開的時間」「順序不是發布順序」的地方。
        */}
        <div className="space-y-2">
          <AnimatedBlock
            stepIndex={1}
            className={`hidden md:grid ${COLS} gap-x-5 px-4 text-xs font-mono uppercase tracking-wider text-slate-600`}
          >
            <span>階段與大約的時間</span>
            <span>模型那時候多了什麼</span>
            <span>於是卡在哪</span>
            <span>這一層做的事</span>
          </AnimatedBlock>

          {STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedBlock
                key={s.en}
                stepIndex={i + 1}
                className={`grid ${COLS} gap-x-5 gap-y-2 rounded-2xl border px-4 py-3 ${
                  s.accent
                    ? 'border-sky-500/25 bg-sky-500/5 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]'
                    : s.tentative
                      ? 'border-dashed border-slate-800 bg-slate-950'
                      : 'border-slate-800 bg-slate-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      s.accent ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <div className={`text-base font-bold leading-snug ${s.accent ? 'text-sky-300' : 'text-slate-100'}`}>
                      {s.name}
                      {s.when && (
                        <span className={`ml-2 whitespace-nowrap font-mono text-xs font-normal ${s.accent ? 'text-sky-400/80' : 'text-slate-400'}`}>
                          {s.when}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-xs text-slate-500 break-words leading-tight mt-0.5">
                      {s.en}
                      {s.tentative && <span className="text-slate-600">（還在成形）</span>}
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{s.unlock}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{s.stuck}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{s.move}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          收尾刻意不收在「Loop 讓你不用每一輪都回來按一次」。
          這堂課會被放很久，學員看到的時候 Loop 可能已經是標配、也可能又換了新名詞，
          收在那句話上會連帶把整頁變成過期的東西。所以收在「怎麼讀下一個新名詞」，
          那件事不會過期，而且它就是這一頁真正教的方法。
        */}
        <Callout tone="focus" label="前面幾層並沒有消失" stepIndex={7}>
          你現在交代一輪工作，照樣要把需求講完整、照樣靠那份{' '}
          <code className="font-mono text-orange-300">CLAUDE.md</code>、照樣要先給它工具。
          再往後多幾層也一樣：新的那一層接手的是上一層解不掉的卡點，不會把你已經會的東西作廢。
          所以下次看到一個新名詞，<strong className="text-slate-100">先問它解掉的是哪一個卡點</strong>，
          答不出來的那個，多半不用急著學。
        </Callout>

      </div>
    </SlideLayout>
  );
}
