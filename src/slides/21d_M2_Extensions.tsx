import { Blocks, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideM2Extensions() {
  return (
    <SlideLayout title="除了手冊還能給什麼？" subtitle="The Harness Extension Map" icon={Blocks}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 max-w-6xl mx-auto h-full items-stretch pt-0">
        
        <div className="flex flex-col justify-center gap-3 h-full">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center shadow-md">
            <div className="w-28 shrink-0 text-sky-400 font-bold text-lg">CLAUDE.md</div>
            <div>
              <div className="text-slate-200 text-base font-bold mb-1">永遠都要記得的事實與規矩</div>
              <div className="text-slate-500 text-sm">session 開始就載、整場都在</div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center shadow-md">
            <div className="w-28 shrink-0 text-indigo-400 font-bold text-lg">Rules</div>
            <div>
              <div className="text-slate-200 text-base font-bold mb-1">只在某一區檔案才適用的限制</div>
              <div className="text-slate-500 text-sm">用 paths: 綁定那一區，碰到才載，省 context</div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center shadow-md">
            <div className="w-28 shrink-0 text-emerald-400 font-bold text-lg">Skill</div>
            <div>
              <div className="text-slate-200 text-base font-bold mb-1">一套有步驟、用到才需要的 SOP 流程</div>
              <div className="text-slate-500 text-sm">平常只載名稱，用到才展開 (2026 起 slash 指令也併進 Skill)</div>
            </div>
          </AnimatedBlock>
          
          <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex gap-5 items-center border-l-4 border-l-red-500 shadow-md">
            <div className="w-28 shrink-0 text-red-400 font-bold text-lg">Hook</div>
            <div>
              <div className="text-slate-200 text-base font-bold mb-1">一定要發生、不能靠它自己記得的自動關卡</div>
              <div className="text-slate-500 text-sm">在 context 外面跑，最確定、幾乎不佔 token (例如: 危險指令自動擋)</div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center shadow-md">
            <div className="w-28 shrink-0 text-amber-400 font-bold text-lg">Subagent</div>
            <div>
              <div className="text-slate-200 text-base font-bold mb-1">子代理 (Subagent)：獨立做完、只回報結論</div>
              <div className="text-slate-500 text-sm">名稱先載，整段內容用到才叫</div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center shadow-md">
            <div className="w-28 shrink-0 text-purple-400 font-bold text-lg">MCP / Plugin</div>
            <div>
              <div className="text-slate-200 text-base font-bold mb-1">MCP 連真實系統；Plugin 將以上打包</div>
              <div className="text-slate-500 text-sm">MCP 連上才有，Plugin 則讓團隊共用設定</div>
            </div>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={7} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 h-full flex flex-col justify-center">
           <AlertTriangle size={32} className="text-red-400 mb-4" />
           <h3 className="text-lg font-bold text-slate-100 mb-3">最關鍵的區分</h3>
           <p className="text-slate-300 text-sm leading-relaxed">
             「絕對不要做某事」寫在 CLAUDE.md 只是<strong className="text-sky-400">「拜託」</strong>，長 session 或遇到 prompt injection 時它還是可能犯。<br/><br/>
             真要擋死，請用 <strong className="text-red-400">Hook</strong>。
           </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
