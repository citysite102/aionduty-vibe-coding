import { AnimatedBlock } from '../../components/SlideLayout';

/**
 * 客戶提案手冊在轉移演練裡的四個階段。
 *
 * 三題問完，檔案就寫好了。原本三題各講各的、最後才把答案一次攤出來，
 * 學員看不出「答那一題」跟「多那一行」是同一件事。
 * 讓檔案跟著問題長，三頁就有了共同的視覺主軸，也不必再多一頁揭曉。
 */
const LINES = [
  { t: '# 客戶提案規範', head: true, at: 1 },
  { t: '- 提案固定五段：現況、問題、做法、時程、報價', at: 1 },
  { t: '- 公司簡介用短版，不要貼完整沿革', at: 1 },
  { t: '- 語氣正式但不用敬語', at: 1 },
  { t: '- 成本結構與利潤率不得出現在對外檔案', at: 2 },
  { t: '- 各客戶的專屬格式見 clients/ 底下那一份', at: 3 },
];

export function ProposalDraft({ stage, stepIndex = 1 }: { stage: number; stepIndex?: number }) {
  const shown = LINES.filter((l) => l.at <= stage);
  return (
    <AnimatedBlock
      stepIndex={stepIndex}
      className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden"
    >
      <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-6 py-2.5">
        <span className="font-mono text-base text-slate-400">CLAUDE.md</span>
        <span className="text-sm text-slate-600">答完第 {stage} 題</span>
      </div>
      <div className="px-6 py-4 font-mono text-lg leading-relaxed">
        {shown.map((l) => {
          const fresh = l.at === stage;
          return (
            <div key={l.t} className="flex gap-3">
              <span className={`w-3 shrink-0 ${fresh ? 'text-sky-400' : 'text-transparent'}`}>{fresh ? '+' : ''}</span>
              <span
                className={
                  l.head
                    ? fresh
                      ? 'text-sky-200 font-bold'
                      : 'text-slate-300 font-bold'
                    : fresh
                      ? 'text-sky-300'
                      : 'text-slate-500'
                }
              >
                {l.t}
              </span>
            </div>
          );
        })}
      </div>
    </AnimatedBlock>
  );
}
