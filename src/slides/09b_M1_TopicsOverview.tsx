import { Map, TerminalSquare, Globe, LayoutTemplate, Database, GitCommit, Bot, AlertTriangle, Rocket } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide09b() {
  // 順序必須跟實際播放順序一致，否則學員會拿這張圖對不上進度。
  // hands 標出哪幾站會離開簡報、實際開畫面操作，讓學員先知道要準備電腦。
  const topics = [
    { id: 1, name: "看懂紅字", icon: AlertTriangle, hands: null },
    { id: 2, name: "終端機", icon: TerminalSquare, hands: "終端機" },
    { id: 3, name: "API 與資料格式", icon: Globe, hands: "瀏覽器" },
    { id: 4, name: "資料庫", icon: Database, hands: null },
    { id: 5, name: "前端與後端", icon: LayoutTemplate, hands: null },
    { id: 6, name: "上線部署", icon: Rocket, hands: null },
    { id: 7, name: "Git 版控", icon: GitCommit, hands: null },
    { id: 8, name: "Claude Code", icon: Bot, hands: "先桌面版，再終端機" },
  ];

  return (
    <SlideLayout title="前置基礎觀念導覽" subtitle="Learning Roadmap" icon={Map}>
      <AnimatedBlock stepIndex={1} className="max-w-4xl mx-auto mb-8 text-center">
        <p className="text-slate-200 text-sm leading-relaxed max-w-2xl mx-auto bg-sky-950/20 border border-sky-900/40 rounded-xl px-4 py-3">
          最後一站的 Claude Code 會先用桌面版，不需要終端機，現在裝不起來也不影響。
        </p>
      </AnimatedBlock>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pb-8">
        {topics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <AnimatedBlock
              key={topic.id}
              stepIndex={idx + 2}
              className={`rounded-2xl p-5 flex flex-col items-center justify-start text-center border transition-colors ${
                topic.hands
                  ? 'bg-slate-900 border-sky-900/50'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div
                className={`p-3 rounded-full bg-slate-950 mb-3 border border-slate-800 ${
                  topic.hands ? 'text-sky-400' : 'text-slate-500'
                }`}
              >
                <Icon size={26} />
              </div>
              <h3 className={`text-base font-bold leading-snug ${topic.hands ? 'text-slate-100' : 'text-slate-400'}`}>
                {topic.name}
              </h3>
              <span className={`text-[11px] mt-1.5 font-bold leading-tight ${topic.hands ? 'text-sky-400' : 'text-slate-600'}`}>
                {topic.hands ? `動手 · ${topic.hands}` : '概念說明'}
              </span>
            </AnimatedBlock>
          );
        })}
      </div>
    </SlideLayout>
  );
}
