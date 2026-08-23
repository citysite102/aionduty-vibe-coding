import { Map, TerminalSquare, Globe, LayoutTemplate, Database, GitCommit, Bot, AlertTriangle, Rocket } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function Slide09b() {
  // 順序必須跟實際播放順序一致，否則學員會拿這張圖對不上進度。
  // 前端與後端排在資料庫前面：資料庫那一頁會講到「後端伺服器」，先講完分工才接得上。
  // hands 標出哪幾站會離開簡報、實際開畫面操作，讓學員先知道要準備電腦。
  // stuck 是這一站要解掉的卡點。名詞留著是為了後面對得上進度，但先讀到的
  // 應該是「不學這個會卡在哪」，否則連著看會像一段要撐過去的電腦概論。
  // 終端機那一站已經抽成選修的獨立段落，不在這條主線上，所以不列進來。
  const topics = [
    { id: 1, name: "看懂紅字", stuck: "紅字一出現就不敢動", icon: AlertTriangle, hands: null },
    { id: 2, name: "API 與資料格式", stuck: "想接外面的資料，看不懂文件", icon: Globe, hands: "瀏覽器" },
    { id: 3, name: "前端與後端", stuck: "壞了不知道要去哪一層找", icon: LayoutTemplate, hands: null },
    { id: 4, name: "資料庫", stuck: "關掉瀏覽器，剛存的就不見了", icon: Database, hands: null },
    { id: 5, name: "上線部署", stuck: "只有自己電腦打得開，傳不出去", icon: Rocket, hands: null },
    { id: 6, name: "Git 版控", stuck: "改壞了回不去上一版", icon: GitCommit, hands: null },
    { id: 7, name: "Claude Code", stuck: "還在複製貼上，沒讓它自己動手", icon: Bot, hands: "桌面版" },
  ];

  return (
    <SlideLayout title="Vibe Coding 需要的軟體基礎知識" subtitle="Learning Roadmap" icon={Map}>
      <AnimatedBlock stepIndex={1} className="max-w-4xl mx-auto mb-8 text-center">
        <p className="text-slate-200 text-base leading-relaxed max-w-2xl mx-auto bg-sky-950/20 border border-sky-900/40 rounded-xl px-4 py-3">
          前面那四步跑得動，靠的是下面這幾樣。不知道它們在做什麼，出事的時候就不知道要去哪一層找。
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
              <p className="mt-2 text-sm leading-snug text-slate-400">{topic.stuck}</p>
              <span className={`text-xs mt-2.5 font-bold leading-tight ${topic.hands ? 'text-sky-400' : 'text-slate-600'}`}>
                {topic.hands ? `動手 · ${topic.hands}` : '概念說明'}
              </span>
            </AnimatedBlock>
          );
        })}
      </div>
    </SlideLayout>
  );
}
