import { Wrench, Lightbulb, UserPlus } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM3HandsOn() {
  return (
    <SlideLayout title="養一個小幫手" subtitle="Hands-on Reviewer" icon={Wrench}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto items-stretch h-full">
        
        <div className="flex flex-col justify-center space-y-4">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative group">
            <h3 className="text-lg font-bold flex items-center gap-3 text-sky-400 mb-3 border-b border-slate-800 pb-2">
              <UserPlus size={18} />
              案例一：嚴格的 Code Reviewer
            </h3>
            <p className="text-slate-300 text-xs mb-3">
              在 <code className="text-sky-300">.claude/agents/</code> 放一個 <code className="text-sky-300">code-reviewer.md</code>。
            </p>
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs border border-slate-800 text-slate-400 leading-relaxed overflow-x-auto">
              <span className="text-slate-600">---</span><br/>
              name: code-reviewer<br/>
              description: 專門負責挑錯的資深工程師<br/>
              <span className="text-slate-600">---</span><br/>
              當我改完程式碼後，請你幫我挑錯。特別注意倒數的分鐘數有沒有被寫死 (hardcode) 在程式裡，規範要求它必須集中成設定。發現就退回。
            </div>
            <p className="text-slate-500 text-[11px] mt-2 leading-relaxed">
              前後各一行 <code className="text-slate-400">---</code> 缺一不可，中間那段叫 frontmatter，Claude Code 靠它認出這是一個 subagent。
            </p>
            
            <div className="mt-3 bg-sky-950/30 p-3 rounded-lg border border-sky-900/50">
              <h4 className="text-sky-400 font-bold text-xs mb-1">🤔 這會全自動觸發嗎？</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                subagent 自己<strong className="text-slate-300">不會</strong>監聽事件，要它出場有三種方式：直接在對話裡指名「請 code-reviewer 幫我看一下」；主 Agent 依 description 判斷後自動委派；或在 <code className="text-slate-300">CLAUDE.md</code> 裡規定「每次完成任務前都要先請 code-reviewer 檢查」。若真的要「一定會跑」，得改用 <code className="text-slate-300">hooks</code>（見後面的擴充機制）。
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-lg font-bold flex items-center gap-3 text-pink-400 mb-3 border-b border-slate-800 pb-2">
              <UserPlus size={18} />
              案例二：文案與品牌規範警察
            </h3>
            <p className="text-slate-300 text-xs mb-3">
              建立一個 <code className="text-pink-300">copywriter.md</code>，專門盯著你計時器上的文案。
            </p>
            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs border border-slate-800 text-slate-400 leading-relaxed overflow-x-auto">
              <span className="text-slate-600">---</span><br/>
              name: brand-copywriter<br/>
              description: 確保介面文案符合任務計時器的調性<br/>
              <span className="text-slate-600">---</span><br/>
              請檢查畫面上的文字有沒有跑掉。按鈕一律用航太語彙：發射、待機、返航，不要出現「開始」「暫停」「重置」。所有錯誤訊息要溫和且具體。
            </div>
          </AnimatedBlock>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <AnimatedBlock stepIndex={3} className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-8 h-full flex flex-col justify-center relative overflow-hidden shadow-lg group hover:border-amber-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <Lightbulb size={64} className="text-amber-400" />
            </div>
            <h3 className="text-xl font-bold flex items-center gap-3 text-amber-400 mb-4 border-b border-amber-500/20 pb-3">
              冷知識：檔案不變，角色百變
            </h3>
            <p className="text-slate-300 text-base leading-relaxed mb-4">
              同一份 <code className="text-amber-300">code-reviewer.md</code> 檔案：
            </p>
            <ul className="text-slate-400 text-sm space-y-3 list-disc pl-5">
              <li>
                可以當作<strong className="text-slate-200">一次性小幫手</strong>，你在聊天時叫它出來幫忙看一下，看完就結束。
              </li>
              <li>
                也可以寫進 <strong className="text-slate-200">CLAUDE.md 的固定流程</strong>，讓它每次交付前都被叫出來檢查一輪。
              </li>
            </ul>
            <p className="text-slate-500 text-sm italic mt-6 border-t border-amber-500/20 pt-4">
              差別不在檔案寫了什麼，而在你什麼時候叫它、以及有沒有規定一定要叫它。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
