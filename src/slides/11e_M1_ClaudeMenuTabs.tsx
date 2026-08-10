import { HelpCircle, Settings, MessagesSquare, Sliders } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的主張是「指令很多，但只有四種用途」。
 *
 * 原本用分頁做，一次只看得到四分之一，主張反而看不出來。
 * 改成 2x2 一次攤開，四類並排，那句話才成立。
 *
 * 分類本身沒有語意差別，所以四張卡一律灰階。
 * 指令 token 一律用 orange，那是 A-1 的「Claude 專有名詞」色，標的是身分不是重點；
 * 「先記兩個」靠底下那句話本身講，不要再用顏色去強調，否則橘色就變成第三種強調色了。
 *
 * 這一頁是全片唯一的斜線指令清單。原本前面還有「新手友善內建功能」與
 * 「對話與會話控制命令」兩頁，三頁講的是同一批指令，已經併進這裡。
 * 之後要補指令就加進對應的那一格，不要再另開一頁。
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
      { cmd: '/context', desc: '對話還剩多少空間、手冊有沒有被讀到' },
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
      { cmd: '/rewind', desc: '退回這次對話的某個時間點' },
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
      { cmd: '.claude/commands/', desc: '一個 .md 檔就是一個自訂指令' },
      { cmd: '/agents', desc: '建立專責的子代理' },
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

        <AnimatedBlock
          stepIndex={6}
          className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            真的只需要先記兩個：
            <code className="font-mono font-bold text-orange-300 mx-1">/help</code>
            忘記指令時查，
            <code className="font-mono font-bold text-orange-300 mx-1">/clear</code>
            想重來時用。其他等遇到再說。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-slate-800">
            只有一件事現在就要知道：
            <code className="font-mono text-orange-300">/compact</code>
            的壓縮是有損的，細節會掉。所以重要的約定不要靠對話記憶撐著，要寫進檔案裡。
            那個檔案叫 <code className="font-mono text-orange-300">CLAUDE.md</code>，是下一個單元整段的主題。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
