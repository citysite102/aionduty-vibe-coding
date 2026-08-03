import { HelpCircle, Settings, MessagesSquare, Sliders } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁的主張是「指令很多，但只有四種用途」。
 *
 * 原本用分頁做，一次只看得到四分之一，主張反而看不出來。
 * 改成 2x2 一次攤開，四類並排，那句話才成立。
 *
 * 分類本身沒有語意差別，所以四張卡一律灰階，
 * 只有底下那句「先記兩個」提到的 /help 與 /clear 用 sky 標出來。
 */
const GROUPS = [
  {
    icon: HelpCircle,
    title: '查現況',
    when: '搞不清楚狀況時',
    items: [
      { cmd: '/help', desc: '列出所有可用指令', key: true },
      { cmd: '/status', desc: '目前登入的帳號與模型' },
      { cmd: '/context', desc: '對話還剩多少空間' },
    ],
  },
  {
    icon: Settings,
    title: '設定與權限',
    when: '決定它能動到哪裡',
    items: [
      { cmd: '/permissions', desc: '設定允許與禁止的規則' },
      { cmd: '/model', desc: '換模型，控制花費最直接的手段' },
      { cmd: 'Shift + Tab', desc: '循環切換權限模式' },
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
    ],
  },
  {
    icon: Sliders,
    title: '自訂指令',
    when: '同一段話講第三次時',
    items: [
      { cmd: '.claude/commands/', desc: '一個 .md 檔就是一個自訂指令' },
      { cmd: '/agents', desc: '建立專責的子代理' },
      { cmd: '跟著進版控', desc: '團隊 clone 下來就能共用' },
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
                          it.key ? 'text-sky-300' : 'text-slate-300'
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
          className="rounded-2xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-950 px-6 py-4"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            真的只需要先記兩個：
            <code className="font-mono font-bold text-sky-300 mx-1">/help</code>
            忘記指令時查，
            <code className="font-mono font-bold text-sky-300 mx-1">/clear</code>
            想重來時用。其他等遇到再說。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
