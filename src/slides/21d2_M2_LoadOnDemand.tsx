/**
 * 最後查證：2026-09-22，對照 code.claude.com/docs/en/slash-commands。
 * 原文：「Custom commands have been merged into skills. A file at
 * `.claude/commands/deploy.md` and a skill at `.claude/skills/deploy/SKILL.md`
 * both create `/deploy` and work the same way. Your existing `.claude/commands/`
 * files keep working.」所以「併進 Skill」成立，而舊路徑仍然可用，不要寫成「已經廢止」。
 * 原本寫「2026 起」，文件沒有給年份，那是推測，已拿掉。
 * 2026-10-03 重查同一節，整段文字一字未變，仍然成立。
 * 同一輪把這件事從 Skill 那一格的一句話（「自訂的斜線指令已經併進 Skill」）
 * 攤成一個獨立的小框，兩條路徑並排。原因是逐字稿念得出新舊兩個位置，
 * 畫面上只有結論，學員聽到路徑卻看不到，手上有 `.claude/commands/` 的人也不知道自己要不要改。
 * 下次改版前先重查那一節。
 */
import { Package } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const PARTS: {
  name: string;
  when: string;
  what: string;
  where: string;
  desc: string;
  /** 只有 Skill 要帶這一塊：自訂斜線指令併進 Skill 之後，新舊兩種放法的對照 */
  slash?: boolean;
}[] = [
  {
    name: 'Skill',
    when: '平常只載名稱',
    what: '一套有步驟、用到才需要的 SOP 流程',
    where: '.claude/skills/名稱/SKILL.md',
    desc: '名稱先進來讓它知道有這個東西，真的要跑那套流程時才展開全文。要不要展開是 Claude 自己判斷的，你也可以直接點名。',
    slash: true,
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
    what: 'MCP 是接真實系統的規範，Plugin 把設定打包',
    where: '不是自己寫檔案，是去接一個現成的服務',
    desc: '照 MCP 接上 Notion、GitHub 那些現成的伺服器之後，它才讀得到、動得了那些系統。你不用自己寫一個。Plugin 是把前面這些整組打包，讓團隊共用同一份設定。',
  },
];

export default function SlideM2LoadOnDemand() {
  return (
    <SlideLayout title="Skill、Subagent、MCP：叫到才進來" subtitle="Loaded on Demand" icon={Package}>
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
              放在哪：<span className="font-mono text-slate-400">{p.where}</span>
            </div>
            {p.slash && (
              <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-3">
                <p className="text-slate-400 text-sm leading-relaxed mb-2">
                  把自己常用的一段話存成斜線指令，打{' '}
                  <code className="font-mono text-orange-300">/deploy</code>{' '}
                  就跑一套部署流程，這個功能現在併進 Skill 了。
                </p>
                <div className="font-mono text-xs leading-relaxed space-y-1">
                  <div className="text-slate-500">舊的放法　<span className="text-slate-400">.claude/commands/deploy.md</span></div>
                  <div className="text-slate-500">新的放法　<span className="text-slate-400">.claude/skills/deploy/SKILL.md</span></div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-2">
                  兩種都打得出 <code className="font-mono text-orange-300">/deploy</code>，跑起來一樣。
                  手上已經有 <code className="font-mono text-orange-300">.claude/commands/</code> 的檔案不用改。
                </p>
              </div>
            )}
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
