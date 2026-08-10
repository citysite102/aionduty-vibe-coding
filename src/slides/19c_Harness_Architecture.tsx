import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Settings, FileCode, Wrench, Shield, GitMerge, Link, Activity } from 'lucide-react';

// 六大元件只有前兩塊是這堂課會動手的，指揮分工留到第三單元，其餘屬於團隊級配套。
// 用 scope 控制視覺層級：本課主色、後續會回來講的灰、僅供認識最淡。
//
// Hooks 是 later 不是 aware：這一段接下來有八頁把它當成建議做法在用
// （P56 擋刪除指令、P60 真的不能發生的事、P68 規則分流的第一個去處），
// 而且分流那一組裡就有一頁在示範怎麼寫。標成「先認識就好」跟後面對不上。
const parts = [
  {
    icon: FileCode,
    name: '規則文件',
    en: 'Rule Files',
    desc: '定義 Agent 的角色定位與運作邊界。',
    scope: 'core' as const,
    tag: '本課會動手',
  },
  {
    icon: Wrench,
    name: '工具',
    en: 'Tools',
    desc: '它能動的東西：讀寫檔案、跑指令，或接上外面的系統。沒給工具，它就只能跟你講話。',
    scope: 'core' as const,
    tag: '本課會動手',
  },
  {
    icon: GitMerge,
    name: '指揮分工',
    en: 'Orchestration',
    desc: '同時有好幾個子代理在跑的時候，誰做哪一塊、誰要等誰做完。',
    scope: 'later' as const,
    tag: '第三單元',
  },
  {
    icon: Shield,
    name: '沙箱',
    en: 'Sandbox',
    desc: '把它關在一個隔起來的地方跑，就算做壞了也弄不到你其他的東西。',
    scope: 'aware' as const,
    tag: '先認識就好',
  },
  {
    icon: Link,
    name: '自動關卡',
    en: 'Hooks',
    desc: '在固定時機自動跑的一段檢查，不經過 AI 判斷，所以它想跳過也跳不掉（例如存檔前擋下密碼）。',
    scope: 'later' as const,
    tag: '本段稍後示範',
  },
  {
    icon: Activity,
    name: '事後查得到',
    en: 'Observability',
    desc: '事後查得到它做過什麼、走過哪些步驟、花掉多少額度。',
    scope: 'aware' as const,
    tag: '先認識就好',
  },
];

const styles = {
  core: {
    card: 'bg-slate-900 border-sky-900/50',
    iconBox: 'bg-sky-500/10 text-sky-400',
    name: 'text-slate-100',
    desc: 'text-slate-400',
    tag: 'bg-sky-500/10 text-sky-400 border-sky-900/50',
  },
  later: {
    card: 'bg-slate-900 border-slate-800',
    iconBox: 'bg-slate-800 text-slate-400',
    name: 'text-slate-200',
    desc: 'text-slate-500',
    tag: 'bg-slate-800 text-slate-400 border-slate-700',
  },
  aware: {
    card: 'bg-slate-900/40 border-slate-800/60',
    iconBox: 'bg-slate-800/50 text-slate-600',
    name: 'text-slate-400',
    desc: 'text-slate-600',
    tag: 'bg-slate-800/50 text-slate-600 border-slate-800',
  },
};

export default function SlideHarnessArchitecture() {
  return (
    <SlideLayout title="完整的運作框架有哪些零件" subtitle="Anatomy of a Harness" icon={Settings}>
      <div className="pt-2 max-w-6xl mx-auto h-full flex flex-col">
        <div className="text-center mb-6">
          <p className="text-slate-300 text-lg mb-4">
            很多人誤以為「AI 的表現完全取決於底層模型有多聰明」，但事實上：
          </p>
          <div className="inline-block bg-slate-900 border border-slate-700 rounded-2xl px-12 py-6 shadow-xl">
            <span className="text-4xl font-mono font-bold text-slate-200">
              Agent <span className="text-slate-500">=</span> Model <span className="text-slate-500">+</span> <span className="text-sky-400">Harness</span>
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-6">
          <p className="text-slate-300 text-base">
            這是<strong className="text-slate-100">業界完整版</strong>的六個零件。
            知道每一個負責什麼，出問題的時候才知道要往哪一塊找。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
          {parts.map((p, i) => {
            const Icon = p.icon;
            const s = styles[p.scope];
            return (
              <AnimatedBlock
                key={p.en}
                stepIndex={i + 1}
                className={`border rounded-xl p-6 flex flex-col transition-colors ${s.card}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg shrink-0 ${s.iconBox}`}>
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className={`font-bold text-lg leading-tight ${s.name}`}>{p.name}</h4>
                    <p className="text-slate-600 text-sm font-mono">{p.en}</p>
                  </div>
                  <span className={`ml-auto shrink-0 text-xs font-bold px-2 py-0.5 rounded-full border ${s.tag}`}>
                    {p.tag}
                  </span>
                </div>
                <p className={`text-base leading-relaxed ${s.desc}`}>{p.desc}</p>
              </AnimatedBlock>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
