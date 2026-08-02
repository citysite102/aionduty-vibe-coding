import { Users, Bot, Code2, ShieldCheck, Zap } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { motion } from 'motion/react';

// 三個方塊講的是「職能」，不是三套要各自安裝的工具。
// 指揮者是主 session 自己，另外兩個是它派出去的 subagent，所以只有指揮者給主色。
const roles = [
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
    impl: '再派一個，換一雙眼睛',
    lead: false,
  },
];

export default function SlideMultiAgent() {
  return (
    <SlideLayout title="讓團隊為你工作" subtitle="Multi-Agent Orchestration" icon={Users}>
      {/* min-h-full 不是 h-full：內容超過一頁時要往下長，h-full 會讓它上下同時溢出，上緣捲不到 */}
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-full text-center py-1">
        <AnimatedBlock className="w-full">
          <div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-7 mb-4">
            {roles.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.en}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 + i * 0.25 }}
                  className={`relative w-[230px] p-5 rounded-2xl flex flex-col items-center gap-2 border ${
                    r.lead
                      ? 'bg-sky-950/30 border-sky-500/40'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  {i > 0 && (
                    <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 text-slate-700">
                      <Zap size={18} />
                    </div>
                  )}
                  <div className={`p-3 rounded-full ${r.lead ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon size={r.lead ? 36 : 28} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-100 text-base leading-tight">{r.name}</div>
                    <div className="text-slate-600 text-[11px] font-mono">{r.en}</div>
                  </div>
                  <p className={`text-xs leading-snug ${r.lead ? 'text-sky-300' : 'text-slate-400'}`}>{r.duty}</p>
                  <p className="text-slate-600 text-[11px] leading-snug mt-auto pt-2 border-t border-slate-800 w-full">
                    {r.impl}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="text-slate-500 text-xs mb-4 max-w-2xl mx-auto leading-relaxed">
            這三個角色都在 Claude Code 裡面，不用另外裝東西。審查者也可以換成別家的模型，用不同的眼睛看同一份程式碼，但那是進階選項，不是必要條件。
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4 leading-snug">
            任務一大，一個 Agent 從頭做到尾就容易出錯。<br/>
            這時候要的是<span className="text-sky-400">分工</span>：有人拆解、有人動手、有人挑錯。
          </h2>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl w-full">
          理解多角色協作，你只需要先決定一件事：<br/>
          <strong className="text-sky-400 text-xl md:text-2xl mt-4 block tracking-wide">
            「是由你親自分配任務，還是讓一個 Agent 當指揮者，幫你把工作發包下去？」
          </strong>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
