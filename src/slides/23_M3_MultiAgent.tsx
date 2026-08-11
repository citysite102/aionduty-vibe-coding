import { Users, Bot, Code2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 原本的順序是反的：三張角色卡（答案）先出現，中間夾一段註解，最後才講為什麼需要分工。
 * 而且卡片用 motion 自己排 delay，講者控不了節奏。
 *
 * 改成 問題 → 三個角色 → 這些都內建 → 你要決定的那一件事。
 * 三個方塊講的是「職能」，不是三套要各自安裝的工具。
 * 指揮者是主 session 自己，另外兩個是它派出去的 subagent，所以只有指揮者給主色。
 */
const ROLES = [
  {
    icon: Bot,
    name: '指揮者',
    en: 'Orchestrator',
    duty: '拆解任務、決定誰做什麼',
    impl: '就是 Claude Code 的主 session',
    lead: true,
  },
  {
    icon: Code2,
    name: '執行者',
    en: 'Subagent',
    duty: '照著規格動手改程式碼',
    impl: '主 session 派出去的',
    lead: false,
  },
  {
    icon: ShieldCheck,
    name: '審查者',
    en: 'Subagent',
    duty: '只讀不寫，專門挑錯',
    impl: '再派一個，只給它讀的權限',
    lead: false,
  },
];

export default function SlideMultiAgent() {
  return (
    <SlideLayout title="讓團隊為你工作" subtitle="Multi-Agent Orchestration" icon={Users}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-100 text-2xl font-bold leading-snug mb-2">
            任務一大，一個 Agent 從頭做到尾就容易出錯。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mb-3">
            它得同時記著整份規格、正在改的那個檔案、還有哪幾項沒驗。
            東西一多，最先掉的通常是最後那項。所以把它拆成三個角色。
          </p>
          {/*
            「子代理」在這一頁之前已經出現過十幾次，但沒有一頁正面定義它。
            模擬學員的原話：「子代理跟我直接開一個新對話問它，有什麼不一樣？」
            那正是要回答的問題，答案是它的對話不會回到你這邊，只回結論。
          */}
          <p className="text-slate-400 text-base leading-relaxed">
            下面那兩個標著 <span className="font-mono text-slate-300">Subagent</span> 的，中文叫
            <strong className="text-slate-200">子代理</strong>：
            你派它出去做一件事，<strong className="text-slate-200">它自己那一段來回不會回到你的對話裡，只把結論交回來</strong>。
            跟你自己另外開一個對話問的差別就在這：那邊的東西你得自己搬回來，子代理是主 session 直接派、直接收。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedBlock
                key={r.en}
                stepIndex={i + 2}
                className={`relative rounded-2xl border p-5 flex flex-col ${
                  r.lead ? 'bg-sky-950/30 border-sky-500/40' : 'bg-slate-900 border-slate-800'
                }`}
              >
                {i > 0 && (
                  <ArrowRight
                    size={16}
                    className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 text-slate-700"
                  />
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      r.lead ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-100 text-base leading-tight">{r.name}</div>
                    <div className="text-slate-600 text-[11px] font-mono">{r.en}</div>
                  </div>
                </div>

                <p className={`text-sm leading-snug mb-4 ${r.lead ? 'text-sky-300' : 'text-slate-300'}`}>
                  {r.duty}
                </p>

                {/*
                  分隔線靠 mt-auto 推到卡片底部，但三張卡的 duty 都只有一行，
                  沒有多餘高度可以分配，mt-auto 就等於 0，線會貼在 duty 底下。
                  所以上下的間距要自己給，不能只靠 mt-auto。
                */}
                <p className="text-slate-500 text-xs leading-snug mt-auto pt-4 border-t border-slate-800">
                  {r.impl}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            這三個角色都在 Claude Code 裡面，不用另外裝東西。
            審查者也可以指定別家的模型，這樣它不會沿用執行者的思路，但那是進階選項。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={6}
          className="rounded-2xl border px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-400 text-base leading-relaxed mb-2">
            實際要決定的只有一件事：
          </p>
          <p className="text-slate-100 text-xl font-bold leading-snug">
            每一件子任務由你親自派，還是讓主 session 自己決定派給誰？
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
