import { ArrowRight } from 'lucide-react';
import { Panel, Note, Mono } from '../ui';

/**
 * 工具箱的門口。
 *
 * 沒有這一頁的時候，打開來看到的是七個名詞，學員不知道自己現在該碰哪一個。
 * 所以這一頁只回答兩個問題：我現在卡在哪、那要用哪一格。
 * 不介紹功能，功能點進去自己會說。
 */
const NOW = [
  {
    id: 'cheatsheet',
    q: '我想不起來那句話怎麼打',
    then: '課程裡出現過的指令都收在同一頁，照階段排。',
    get: '可以直接複製的那一句',
  },
  {
    id: 'claude-md',
    q: '我要開始一個新的專案',
    then: '先寫一份手冊，它每次開新對話都會先讀。',
    get: '一份 CLAUDE.md',
  },
  {
    id: 'router',
    q: '它沒照我說的做',
    then: '多半不是它不聽話，是那條規則放錯地方。',
    get: '這條規則該放哪一層的答案',
  },
  {
    id: 'prompt',
    q: '我要交代一件比較大的事',
    then: '把目標、什麼叫做完、怎麼驗、邊界四段一次講完。',
    get: '一段可以直接貼的指令',
  },
  {
    id: 'deploy',
    q: '我卡在推上去或部署',
    then: '對症狀找，每一條都附一句可以貼回對話框的話。',
    get: '下一步要做什麼',
  },
];

const BY_UNIT = [
  {
    unit: '階段一',
    title: '做出第一個作品',
    tools: [{ id: 'sandbox', label: '終端機沙盒' }],
    note: '走終端機那條路的話，先在這裡把 cd 跟 ls 按過一次。桌面版的人可以跳過，只當作認字。',
  },
  {
    unit: '階段二',
    title: '寫出會被讀到的手冊',
    tools: [
      { id: 'claude-md', label: 'CLAUDE.md 產生器' },
      { id: 'router', label: '規則分流器' },
    ],
    note: '先產一份手冊，之後每次想「這條要不要寫進去」的時候，用分流器問四題。',
  },
  {
    unit: '階段三',
    title: '讓角色替你把關',
    tools: [{ id: 'subagent', label: '子代理產生器' }],
    note: '產出那個會退回你的審查角色。退回條件那一格是重點，其他都是包裝。',
  },
  {
    unit: '階段四',
    title: '讓它自己跑一輪',
    tools: [
      { id: 'done-when', label: 'Done-when 檢查器' },
      { id: 'prompt', label: 'Prompt 組裝器' },
      { id: 'deploy', label: '部署卡關' },
    ],
    note: '先把完成條件改成驗得出來的句子，再組成四段指令。跑完要上線的時候看部署那一格。',
  },
];

export default function Start({ go = () => {} }: { go?: (id: string) => void }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Panel
        title="你現在卡在哪？"
        desc="這八格不用全部看過。挑跟你現在這一步有關的那一格就好，其他的等你需要再回來。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NOW.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              className={`group text-left rounded-xl border border-slate-800 bg-slate-950 p-5 transition-colors hover:border-sky-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
                NOW.length % 2 === 1 && i === NOW.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-start gap-3 mb-2">
                <span className="text-base font-bold text-slate-100 leading-snug">{n.q}</span>
                <ArrowRight
                  size={16}
                  className="ml-auto mt-1 shrink-0 text-slate-600 transition-colors group-hover:text-sky-400"
                />
              </div>
              <p className="text-sm leading-relaxed text-slate-400">{n.then}</p>
              <p className="text-sm leading-relaxed text-slate-500 mt-3 pt-3 border-t border-slate-800">
                做完你手上會有：<span className="text-slate-300">{n.get}</span>
              </p>
            </button>
          ))}
        </div>
      </Panel>

      <Panel title="照課程順序" desc="每一格都是課程裡某一段的延伸，上到那一段再打開就好。">
        <div className="divide-y divide-slate-800">
          {BY_UNIT.map((u) => (
            <div key={u.unit} className="grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-x-5 gap-y-2 py-4 first:pt-0 last:pb-0">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-slate-500">{u.unit}</div>
                <div className="text-sm text-slate-400 mt-1">{u.title}</div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {u.tools.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => go(t.id)}
                      className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-sm font-bold text-sky-300 transition-colors hover:bg-sky-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{u.note}</p>
              </div>
            </div>
          ))}
        </div>
        <Note>
          回去之後也用得到，尤其是分流器跟 Done-when 檢查器。那兩件事不會因為課程結束就不用判斷。
        </Note>
      </Panel>

      <Panel title="用之前先知道三件事" desc={undefined}>
        <ol className="space-y-3 text-base leading-relaxed text-slate-400 list-decimal pl-5">
          <li>
            這裡不會呼叫任何 AI。它幫你把話組好、把檔案排好，
            <span className="text-slate-200">真正動手的還是你那邊的 Claude Code</span>。
          </li>
          <li>
            產出來的東西按「複製」才帶得走。關掉分頁就沒了，這裡不存你的任何內容。
          </li>
          <li>
            檔案要放進你的專案資料夾，不是放在這裡。
            <Mono>CLAUDE.md</Mono> 放最外層，子代理放 <Mono>.claude/agents/</Mono> 底下。
          </li>
        </ol>
      </Panel>
    </div>
  );
}
