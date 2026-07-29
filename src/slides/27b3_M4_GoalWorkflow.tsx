import { Compass, Target, CheckSquare, ShieldCheck, DollarSign, Eye, UserCheck, Briefcase } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { useState } from 'react';
import { motion } from 'motion/react';

const ROLE_EXAMPLES = [
  {
    role: "HR 招募",
    task: "「這 50 份履歷都是應徵同一個職缺的。請照職缺說明上的四項條件初篩，整理成一張表交給用人主管。」",
    doneWhen: "50 份每份都佔一列，填上：姓名、四項條件各自符合或不符合、一句判斷理由、結論寫「通過」或「淘汰」。整張表不能有空格，也不能出現「待確認」。",
    gate: "只差一項條件、或年資算法有爭議的，結論欄寫「待人工判斷」並附理由，不要自己決定淘汰。"
  },
  {
    role: "業務 / BD",
    task: "「這是本季 30 場客戶會議的逐字稿。請整理成一份跟進清單，讓我下週一的業務會議可以直接照著討論。」",
    doneWhen: "每一筆都有：客戶名稱、要做什麼、負責人、期限日期（寫成 2026-08-15 這種格式）、出自第幾場會議。少了負責人或日期就不算完成。",
    gate: "牽涉報價金額、合約期限、折扣條件的，一律留白並標記，不要自己填數字。"
  },
  {
    role: "行銷 / Growth",
    task: "「這是四個社群管道上個月的成效匯出檔。請做成一頁週報，給沒有在看後台的主管看。」",
    doneWhen: "四個管道每個都有：本期數字、上期數字、增減百分比，最後附一行看得懂的觀察。四個管道一個都不能少。",
    gate: "同一個數字在不同來源對不上時，兩個都列出來並標記異常，不要自己選一個填。"
  }
];

export default function SlideGoalWorkflow() {
  const [selectedRole, setSelectedRole] = useState(0);

  return (
    <SlideLayout title="Goal 五步驟操作" subtitle="5-Step Action Guide for Non-Coders" icon={Compass}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto mt-1 items-stretch">
        
        {/* Left Side: 5-step Workflow */}
        <div className="lg:col-span-7 space-y-4">
          <AnimatedBlock stepIndex={1} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">1</div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-100">挑重複、繁瑣，但「完成標準」很明確的事</h4>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
❌「把這份報告寫好」<br/>
                ✅「把 30 場逐字稿整理成清單，每筆填入客戶名、議題、期限」
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">2</div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-100 flex items-center gap-1.5">
                寫出客觀、可以被檢驗的停止條件（Done-when）
                <Target size={12} className="text-amber-400" />
              </h4>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
只用查得到的事實，不用形容詞。<br/>
                ✅「每筆都有 X、Y、Z 三個欄位，沒有空白或『待確認』」
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">3</div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-100">限制它能跑幾輪、能動哪些東西</h4>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
✅「最多跑 8 輪」「只動這個資料夾」「超過就停下來回報」
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={4} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">4</div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-100">講清楚遇到什麼要停下來問你（Human Gate）</h4>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
✅「遇到合約、金額、客訴情緒，一律留白標記，等我確認」
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex gap-3.5 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-sm shrink-0">5</div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-100">先讓它報一次計畫，你同意了再開跑</h4>
              <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
先讓它說「我打算怎麼做」，你點頭再開跑。跑完親自抽查幾筆。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        {/* Right Side: Role Examples */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <AnimatedBlock stepIndex={6} className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-bl-full pointer-events-none"></div>
            
            <div>
              <h3 className="text-base font-bold text-sky-400 mb-4 flex items-center gap-2">
                <Briefcase size={18} /> 三大非工程角色應用實務
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                只要這件事有<strong>「可以驗證的完成狀態」</strong>，就能用同一套方法交給 AI 去跑，跟你寫不寫程式無關。
              </p>

              {/* Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 mb-5">
                {ROLE_EXAMPLES.map((ex, idx) => (
                  <button
                    key={ex.role}
                    onClick={() => setSelectedRole(idx)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedRole === idx 
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ex.role}
                  </button>
                ))}
              </div>

              {/* Selected Role Content */}
              <motion.div 
                key={selectedRole}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-1">任務描述</div>
                  <div className="text-xs text-slate-200 font-bold">{ROLE_EXAMPLES[selectedRole].task}</div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <CheckSquare size={12} /> 停止條件 (Done-when)
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed font-medium">{ROLE_EXAMPLES[selectedRole].doneWhen}</div>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <ShieldCheck size={12} /> 人類閘門 (Human Gate)
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">{ROLE_EXAMPLES[selectedRole].gate}</div>
                </div>
              </motion.div>
            </div>

            <div className="mt-4 border-t border-slate-900 pt-3 text-xs text-slate-400">
              共同點：任務無聊、完成標準明確、灰色地帶有人把關。
            </div>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
