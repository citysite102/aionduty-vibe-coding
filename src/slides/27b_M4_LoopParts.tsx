import { Box, GitBranch, Settings, Users, Database, Command } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const STAGES = [
  {
    stage: '第一步：先讓核心跑起來',
    hint: '沒有這兩塊，迴圈根本轉不起來',
    accent: 'text-sky-400',
    iconBg: 'bg-slate-800 text-slate-400',
    items: [
      {
        icon: Settings,
        title: '1. 自動化 / 排程',
        desc: '就像手機鬧鐘：時間到了它自己響。讓迴圈每天早上九點、或每次你推上程式碼時自己啟動，不必等你想起來。',
        map: '手機鬧鐘、行事曆的重複提醒、cron 排程'
      },
      {
        icon: Box,
        title: '2. 技能手冊 (Skills)',
        desc: '把成功的步驟和慣例寫成規則，讓它每次遇到同樣的事都查得到。',
        map: 'SKILL.md、CLAUDE.md、SOP 指引'
      }
    ]
  },
  {
    stage: '第二步：再加上防線',
    hint: '開始放手之後才需要，但別拖太久',
    accent: 'text-sky-400',
    iconBg: 'bg-slate-800 text-slate-400',
    items: [
      {
        icon: GitBranch,
        title: '3. 獨立工作區 (Worktrees)',
        desc: '讓多個任務在各自乾淨的資料夾裡跑，不會改到彼此的東西。',
        map: 'git worktree、沙箱資料夾'
      },
      {
        icon: Users,
        title: '4. 子代理分工 (Sub-agents)',
        desc: '「寫程式的人」和「批改的人」分開，自己不能改自己的考卷。',
        map: '執行代理 (Maker) + 驗證代理 (Checker)'
      }
    ]
  },
  {
    stage: '第三步：最後補上手腳與記憶',
    hint: '想讓它跨天、跨專案接力時才會用到',
    accent: 'text-sky-400',
    iconBg: 'bg-slate-800 text-slate-400',
    items: [
      {
        icon: Command,
        title: '5. 外部連接器 (Plugins)',
        desc: '充當 AI 的雙手，讓它真的能發訊息、讀寫資料庫、推上 GitHub。',
        map: 'MCP、API 串接、Webhook'
      },
      {
        icon: Database,
        title: '6. 記憶與狀態 (Memory / State)',
        desc: '跨越單次對話的紀錄，記住目前做到哪、下一步要做什麼。',
        map: 'STATE.md、進度看板、JSON 紀錄'
      }
    ]
  }
];

export default function SlideLoopParts() {
  return (
    <SlideLayout title="讓它自己跑，需要哪幾個零件" subtitle="Key Components" icon={Box}>
      <div className="flex flex-col gap-5 mt-2 max-w-6xl mx-auto pb-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            這六塊不是新的清單。前面講的 <strong className="text-slate-100">運作框架 (Harness) 是「你替 AI 準備的工作環境」</strong>：能用哪些工具、看得到哪些資料、權限開到哪。
            這裡要補的是<strong className="text-slate-100">「讓那個環境自己跑起來」</strong>還缺的零件。不需要一次全部學會，照下面三步慢慢疊上去就好。
          </p>
        </AnimatedBlock>

        {STAGES.map((stage, idx) => (
          <AnimatedBlock key={stage.stage} stepIndex={idx + 2} className="space-y-2.5">
            <div className="flex items-baseline gap-3">
              <h3 className={`text-sm font-bold ${stage.accent}`}>{stage.stage}</h3>
              <span className="text-xs text-slate-500">{stage.hint}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stage.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-3.5">
                    <div className={`p-2.5 rounded-xl h-fit shrink-0 ${stage.iconBg}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-100 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-800">
                        熟悉的概念對應：<span className="text-slate-400 font-mono">{item.map}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedBlock>
        ))}

      </div>
    </SlideLayout>
  );
}
