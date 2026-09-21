import { HelpCircle, Settings, MessagesSquare, Sliders, FileTerminal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的主張是「指令很多，但只有四種用途」。
 *
 * 原本用分頁做，一次只看得到四分之一，主張反而看不出來。
 * 改成 2x2 一次攤開，四類並排，那句話才成立。
 *
 * 收尾那一塊不要寫成「只需要記兩個」加「只有一件事現在就要知道」。
 * 那兩句並排讀起來就是三件事，而且後面那句直接打臉前面的「其他等遇到再說」。
 * 現在的分法是「要打的」與「要知道的」：前者是指令，後者是 /compact 的行為，
 * 它不是要你去打，是要你知道它會掉東西。改這一塊的時候不要把數字加回來。
 *
 * 分類本身沒有語意差別，所以四張卡一律灰階。
 * 指令 token 一律用 orange，那是 A-1 的「Claude 專有名詞」色，標的是身分不是重點；
 * 「先記兩個」靠底下那句話本身講，不要再用顏色去強調，否則橘色就變成第三種強調色了。
 *
 * 這一頁是全片唯一的斜線指令清單。原本前面還有「新手友善內建功能」與
 * 「對話與會話控制命令」兩頁，三頁講的是同一批指令，已經併進這裡。
 * 之後要補指令就加進對應的那一格，不要再另開一頁。
 *
 * 最後查證：2026-09-21，逐條對照 code.claude.com/docs/en/commands。
 * 十二個指令全部存在，官方文件沒有任何一個標示桌面版不可用。
 * 當時的現況有兩件要記著：
 *   1. `/agents` 不會列出子代理，它只印一段提示叫你去建（v2.1.198 起）。
 *      2026-09-20 那一輪把它改成「列出目前有哪些子代理」，那個說法一樣是錯的。
 *   2. 官方文件已把自訂指令併進 Skills，但 `.claude/commands/` 的 .md 檔明文
 *      「keep working」。這門課繼續教 .md 檔，因為它一個檔案就成立，
 *      不用開資料夾也不用 frontmatter，Skill 留到章節五。
 * 下次改版前先重查那一頁，不要憑印象改。
 *
 * 只放打得出來的斜線指令。原本「設定與權限」那格有一個 Shift + Tab，
 * 那是按鍵不是指令，打 / 找不到它，而且只有終端機按了有反應，
 * 已經搬去終端機那一段的按鍵頁。這一格不要再放按鍵進來。
 */
const GROUPS = [
  {
    icon: HelpCircle,
    title: '查現況',
    when: '搞不清楚狀況時',
    items: [
      { cmd: '/help', desc: '列出所有可用指令', key: true },
      { cmd: '/context', desc: '對話還剩多少空間、它這一輪讀進了哪些檔案' },
      { cmd: '/usage', desc: '這次花了多少、額度何時重置' },
    ],
  },
  {
    icon: Settings,
    title: '設定與權限',
    when: '決定它能動到哪裡',
    items: [
      { cmd: '/permissions', desc: '設定允許與禁止的規則' },
      { cmd: '/model', desc: '換模型，控制花費最直接的手段' },
    ],
  },
  {
    icon: MessagesSquare,
    title: '會話控制',
    when: '對話變長、變貴時',
    items: [
      { cmd: '/clear', desc: '開一段全新對話', key: true },
      { cmd: '/compact', desc: '壓縮成摘要繼續，有損，細節會掉' },
      { cmd: '/resume', desc: '把先前的對話接回來' },
      { cmd: '/btw', desc: '問題外話，這一來一往不進上下文' },
    ],
  },
  {
    icon: Sliders,
    title: '自訂與擴充',
    when: '同一段話講第三次時',
    items: [
      { cmd: '/init', desc: '掃過專案，產出第一版 CLAUDE.md' },
      { cmd: '/你自己取的名字', desc: '在 .claude/commands/ 放一個 .md 檔，檔名就是指令名，範例在下面' },
      { cmd: '/agents', desc: '打下去會告訴你怎麼建子代理，章節七才會用到' },
    ],
  },
];

export default function SlideClaudeMenuTabs() {
  return (
    <SlideLayout
      title="Claude Code 指令的四種類型"
      subtitle="Slash Commands, Grouped by What You Need"
      icon={Sliders}
    >
      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            打 <span className="font-mono text-slate-100">/</span> 會跳出一長串指令，不用背。
            照「你現在想幹嘛」分成四類，需要時再回來查就好。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GROUPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <AnimatedBlock
                key={g.title}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-baseline gap-2.5 mb-4 pb-3 border-b border-slate-800">
                  <Icon size={16} className="text-slate-500 shrink-0 translate-y-0.5" />
                  <h3 className="text-base font-bold text-slate-100">{g.title}</h3>
                  <span className="text-xs text-slate-500">{g.when}</span>
                </div>

                <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2.5 items-baseline">
                  {g.items.map((it) => (
                    <div key={it.cmd} className="contents">
                      <code
                        className={`font-mono text-sm font-bold whitespace-nowrap ${
                          it.key ? 'text-orange-300' : 'text-orange-400/80'
                        }`}
                      >
                        {it.cmd}
                      </code>
                      <p className="text-sm text-slate-400 leading-snug">{it.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          自訂指令的範例。四格裡那一行只說得出「放一個 .md 檔」，學員問的是
          「什麼時候會用到」與「裡面要寫什麼」，那兩件事要看到一個真的檔案才回答得了。
          例子刻意選驗收清單：它是學員真的會重複講的那段話，用到的檢查（Console 紅字、
          金鑰）前面都教過，而且下一頁講的就是驗證。
        */}
        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left">
          <div className="flex items-baseline gap-2.5 mb-2">
            <FileTerminal size={16} className="text-slate-500 shrink-0 translate-y-0.5" />
            <h3 className="text-base font-bold text-slate-100">自訂指令長什麼樣</h3>
            <span className="text-xs text-slate-500">同一段話講到第三次的時候</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            每次做完都要它跑同一輪檢查，第三次你就會懶得再打一遍。把那段話存成檔案，
            之後打一個斜線就好。<strong className="text-slate-300">檔名就是指令名</strong>，
            所以這個檔存成 <code className="font-mono text-slate-300">check.md</code>，
            指令就是 <code className="font-mono text-orange-300">/check</code>。
          </p>
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed">
            <div className="text-slate-500 mb-2.5 pb-2.5 border-b border-slate-800">
              .claude/commands/check.md
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap">{`依序做這四件事，每一項做完回報結果，有問題就停下來：

1. 在本機開起來，確認畫面正常、Console 沒有紅字
2. 用手機尺寸看一次，文字有沒有被切掉
3. 檢查有沒有不該公開的東西，例如金鑰
4. 四項都過了再告訴我可以存檔`}</pre>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-3">
            裡面就是你平常會打的那段話，沒有特殊語法。
            打 <code className="font-mono text-orange-300">/check</code> 等於把這四句重講一次。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={7}
          className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            要打的先有兩個就夠：
            <code className="font-mono font-bold text-orange-300 mx-1">/help</code>
            忘記指令時查，
            <code className="font-mono font-bold text-orange-300 mx-1">/clear</code>
            想重來時用。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            <code className="font-mono text-orange-300">/compact</code>
            會把前面的對話壓成一段摘要再繼續。壓縮會掉東西，
            <strong className="text-slate-200">你跟它講好的規矩可能就在那一次不見了，畫面上不會有提示</strong>。
            所以規矩要寫成檔案，不要靠它記。
            那個檔案叫 <code className="font-mono text-orange-300">CLAUDE.md</code>，後面有一整段講它。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
