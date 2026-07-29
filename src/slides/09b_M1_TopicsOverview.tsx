import { Map, TerminalSquare, Globe, LayoutTemplate, Database, GitCommit, Bot } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide09b() {
  const topics = [
    { id: 1, name: "終端機", icon: TerminalSquare, color: "text-sky-400" },
    { id: 2, name: "API 與資料格式", icon: Globe, color: "text-emerald-400" },
    { id: 3, name: "前端與後端", icon: LayoutTemplate, color: "text-indigo-400" },
    { id: 4, name: "資料庫", icon: Database, color: "text-amber-400" },
    { id: 5, name: "Git 版控", icon: GitCommit, color: "text-rose-400" },
    { id: 6, name: "Claude Code", icon: Bot, color: "text-fuchsia-400" },
  ];

  return (
    <SlideLayout title="前置基礎觀念導覽" subtitle="Learning Roadmap" icon={Map}>
      <AnimatedBlock stepIndex={1} className="max-w-4xl mx-auto mb-10 text-center">
        <h2 className="text-2xl text-slate-100 font-bold mb-4">掌握 Agent 所需的基礎地圖</h2>
        <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
          在正式讓 Claude Code 接管專案之前，我們需要先了解 Agent 的工作環境與溝通語言。接下來這幾個單元，會以最簡單的方式，帶你理解現代網頁開發的核心元素：
        </p>
      </AnimatedBlock>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {topics.map((topic, idx) => {
          const Icon = topic.icon;
          return (
            <AnimatedBlock 
              key={topic.id} 
              stepIndex={idx + 2} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-slate-700 transition-colors"
            >
              <div className={`p-4 rounded-full bg-slate-950 mb-4 border border-slate-800 ${topic.color}`}>
                <Icon size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-200">{topic.name}</h3>
            </AnimatedBlock>
          );
        })}
      </div>
    </SlideLayout>
  );
}
