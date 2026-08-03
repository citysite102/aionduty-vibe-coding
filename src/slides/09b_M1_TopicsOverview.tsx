import { Map, TerminalSquare, Globe, LayoutTemplate, Database, GitCommit, Bot } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide09b() {
  // hands 標出哪幾站會離開簡報、實際開畫面操作，讓學員先知道要準備電腦。
  const topics = [
    { id: 1, name: "終端機", icon: TerminalSquare, hands: "終端機" },
    { id: 2, name: "API 與資料格式", icon: Globe, hands: "瀏覽器" },
    { id: 3, name: "前端與後端", icon: LayoutTemplate, hands: null },
    { id: 4, name: "資料庫", icon: Database, hands: null },
    { id: 5, name: "Git 版控", icon: GitCommit, hands: null },
    { id: 6, name: "Claude Code", icon: Bot, hands: "先桌面版，再終端機" },
  ];

  return (
    <SlideLayout title="前置基礎觀念導覽" subtitle="Learning Roadmap" icon={Map}>
      <AnimatedBlock stepIndex={1} className="max-w-4xl mx-auto mb-8 text-center">
        <h2 className="text-2xl text-slate-100 font-bold mb-4">掌握 Agent 所需的基礎地圖</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto mb-4">
          在正式讓 Claude Code 接管專案之前，要先認識 Agent 的工作環境與溝通語言。接下來這幾站會走過現代網頁開發的核心元素。
        </p>
        <p className="text-slate-200 text-sm leading-relaxed max-w-2xl mx-auto bg-sky-950/20 border border-sky-900/40 rounded-xl px-4 py-3">
          <strong className="text-sky-300">這一段不是聽講，是動手。</strong>
          底下標了「終端機」和「瀏覽器」的那幾站，我們會離開簡報實際做一次。
          <strong className="text-slate-100">現在可以把電腦打開了。</strong>
          最後一站的 Claude Code 會先用桌面版，不需要終端機，現在裝不起來也不影響。
        </p>
      </AnimatedBlock>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {topics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <AnimatedBlock
              key={topic.id}
              stepIndex={idx + 2}
              className={`rounded-2xl p-6 flex flex-col items-center justify-center text-center border transition-colors ${
                topic.hands
                  ? 'bg-slate-900 border-sky-900/50'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              <div
                className={`p-4 rounded-full bg-slate-950 mb-4 border border-slate-800 ${
                  topic.hands ? 'text-sky-400' : 'text-slate-500'
                }`}
              >
                <Icon size={32} />
              </div>
              <h3 className={`text-lg font-bold ${topic.hands ? 'text-slate-100' : 'text-slate-400'}`}>
                {topic.name}
              </h3>
              <span className={`text-[11px] mt-1.5 font-bold ${topic.hands ? 'text-sky-400' : 'text-slate-600'}`}>
                {topic.hands ? `動手 · ${topic.hands}` : '概念說明'}
              </span>
            </AnimatedBlock>
          );
        })}
      </div>
    </SlideLayout>
  );
}
