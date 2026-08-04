import { ClipboardList, Users, WalletCards, ListChecks, Ban } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const BRIEF = [
  {
    icon: Users,
    label: '使用者',
    text: '業務助理與業務主管。助理建立草稿，主管確認後才送出。',
  },
  {
    icon: WalletCards,
    label: '核心工作',
    text: '選客戶、加入品項、計算稅金與折扣、輸出一份可寄給客戶的報價單。',
  },
  {
    icon: ListChecks,
    label: '必填資訊',
    text: '客戶名稱、有效期限、幣別、品項、數量、單價、稅金、付款條件。',
  },
];

const NON_GOALS = ['不用串金流', '不用做庫存扣帳', '不用做完整 CRM', '不用登入權限系統'];

export default function SlideQuoteSystemRequirements() {
  return (
    <SlideLayout title="先把需求說成一頁" subtitle="Project Brief" icon={ClipboardList}>
      <div className="max-w-5xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-100 text-xl font-bold leading-snug mb-2">
            第一份材料不是技術文件，是一頁需求說明。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            這一頁讓 Agent 知道自己正在幫誰、哪一段流程最重要、哪些東西不要現在做。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BRIEF.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedBlock key={item.label} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <Icon aria-hidden="true" size={20} className="text-sky-400" />
                  <h3 className="text-slate-100 text-base font-bold">{item.label}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={5} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2.5 text-slate-300 font-bold text-sm mb-3">
            <Ban aria-hidden="true" size={18} className="text-sky-400" />
            這一輪先不做
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {NON_GOALS.map((goal) => (
              <div key={goal} className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-slate-500 text-sm">
                {goal}
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="rounded-lg border border-slate-800 border-l-4 border-l-sky-500 bg-slate-950 px-5 py-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            中型專案最常失控，不是因為 AI 不會寫，而是你一開始沒有說清楚「這一輪不處理什麼」。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
