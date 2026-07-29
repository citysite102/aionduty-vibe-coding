import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Settings, FileCode, Wrench, Shield, GitMerge, Link, Activity } from 'lucide-react';

// 六大元件只有前兩塊是這堂課會動手的，指揮分工留到第三單元，其餘三個屬於團隊級配套。
// 用 scope 控制視覺層級：本課主色、後續單元灰、僅供認識最淡。
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
    desc: '供 Agent 呼叫的函式 (Functions) 或 MCP 伺服器。',
    scope: 'core' as const,
    tag: '本課會動手',
  },
  {
    icon: GitMerge,
    name: '指揮分工',
    en: 'Orchestration',
    desc: '決定多個子代理誰做什麼、先後順序的分工規則。',
    scope: 'later' as const,
    tag: '第三單元',
  },
  {
    icon: Shield,
    name: '沙箱',
    en: 'Sandbox',
    desc: '安全執行與測試程式碼的隔離環境。',
    scope: 'aware' as const,
    tag: '先認識就好',
  },
  {
    icon: Link,
    name: '生命週期掛鉤',
    en: 'Hooks',
    desc: '在固定生命週期執行的確定性程式碼 (例如：提交前阻擋密碼寫入)。',
    scope: 'aware' as const,
    tag: '先認識就好',
  },
  {
    icon: Activity,
    name: '可觀測性',
    en: 'Observability',
    desc: '監控系統日誌 (Logs)、執行追蹤 (Traces) 與成本的機制。',
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

        <div className="max-w-4xl mx-auto text-center mb-6 space-y-2">
          <p className="text-slate-300 text-base">
            前面那條軌道，拆開來就是這六個零件。這是<strong className="text-slate-100">業界完整版</strong>，先看全景，不用記。
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            這堂課實際會動手的是<strong className="text-sky-400">規則文件</strong>與<strong className="text-sky-400">工具</strong>這兩塊，指揮分工留到第三單元。
            其餘三個是團隊規模才需要的工程配套，知道有這回事就好，等你的專案長大再回來看。
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
                  <span className={`ml-auto shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.tag}`}>
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
