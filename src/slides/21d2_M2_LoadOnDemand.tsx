import { Package } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const PARTS = [
  {
    name: 'Skill',
    when: '平常只載名稱',
    what: '一套有步驟、用到才需要的 SOP 流程',
    desc: '名稱先進來讓它知道有這個東西，真的要跑那套流程時才展開全文。2026 起 slash 指令也併進 Skill。',
  },
  {
    name: 'Subagent',
    when: '叫了才展開',
    what: '獨立做完一件事，只回報結論',
    desc: '它自己的那段對話不會塞進你這邊，你只會收到結果。適合要翻很多檔案的調查工作。',
  },
  {
    name: 'MCP / Plugin',
    when: '連上才有',
    what: 'MCP 連真實系統，Plugin 把設定打包',
    desc: 'MCP 讓它能讀 Notion、開 GitHub Issue 這類外部系統。Plugin 是把前面這些整組打包，讓團隊共用同一份設定。',
  },
];

export default function SlideM2LoadOnDemand() {
  return (
    <SlideLayout title="用到才展開，平常只佔一行" subtitle="Loaded on Demand" icon={Package}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          這三個都不是一開始就整包載入。<strong className="text-slate-200">它先知道有這個東西，等你真的用到，才把內容讀進來。</strong>所以你可以準備很多個，不會把空間吃光。
        </AnimatedBlock>

        {PARTS.map((p, i) => (
          <AnimatedBlock
            key={p.name}
            stepIndex={i + 2}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-sky-400 font-bold text-lg">{p.name}</span>
              <span className="text-slate-500 text-xs font-mono">{p.when}</span>
            </div>
            <div className="text-slate-200 text-sm font-bold mb-1">{p.what}</div>
            <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
          </AnimatedBlock>
        ))}

      </div>
    </SlideLayout>
  );
}
