import { Package } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const PARTS = [
  {
    name: 'Skill',
    when: '平常只載名稱',
    what: '一套有步驟、用到才需要的 SOP 流程',
    where: '.claude/skills/名稱/SKILL.md',
    desc: '名稱先進來讓它知道有這個東西，真的要跑那套流程時才展開全文。2026 起 slash 指令也併進 Skill。',
  },
  {
    name: 'Subagent',
    when: '叫了才展開',
    what: '獨立做完一件事，只回報結論',
    where: '.claude/agents/名稱.md',
    desc: '它自己的那段對話不會塞進你這邊，你只會收到結果。適合要翻很多檔案的調查工作。',
  },
  {
    name: 'MCP / Plugin',
    when: '連上才有',
    what: 'MCP 連真實系統，Plugin 把設定打包',
    where: '不是自己寫檔案，是去接一個現成的服務',
    desc: 'MCP 讓它能讀 Notion、開 GitHub Issue 這類外部系統。Plugin 是把前面這些整組打包，讓團隊共用同一份設定。',
  },
];

export default function SlideM2LoadOnDemand() {
  return (
    <SlideLayout title="用到才展開，平常只佔一行" subtitle="Loaded on Demand" icon={Package}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          你可以準備很多個，不會把空間吃光。
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
            <p className="text-slate-500 text-sm leading-relaxed mb-2">{p.desc}</p>
            <div className="text-slate-500 text-sm border-t border-slate-800 pt-2">
              寫在哪：<span className="font-mono text-slate-400">{p.where}</span>
            </div>
          </AnimatedBlock>
        ))}

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="text-slate-200 text-sm font-bold mb-2">
            找不到 <code className="font-mono text-orange-300">.claude</code> 資料夾？它預設是隱藏的
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-2">
            開頭是一個點的資料夾，Finder 與檔案總管平常都不會顯示。它在，只是你看不到。
          </p>
          <div className="text-slate-400 text-sm leading-relaxed space-y-1">
            <div>Mac 的 Finder：進到專案資料夾，按 <code className="font-mono text-slate-300">Cmd + Shift + .</code> 切換顯示。</div>
            <div>Windows 檔案總管：上方「檢視」→ 勾選「隱藏的項目」。</div>
            <div>VS Code：側邊欄本來就看得到，不用另外設定。</div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-2 border-t border-slate-800 pt-2">
            懶得找就直接問它：「列出 .claude 底下有哪些檔案」，或請它幫你開起來。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
