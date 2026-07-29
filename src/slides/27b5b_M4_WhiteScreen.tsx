import { LifeBuoy, Camera, Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideWhiteScreen() {
  return (
    <SlideLayout
      title="畫面一片空白，終端機又沒報錯"
      subtitle="Two Ways to Tell the Agent What You're Seeing"
      icon={LifeBuoy}
    >
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-6">

        <AnimatedBlock stepIndex={1} className="text-center">
          <p className="text-slate-300 text-base leading-relaxed">
            你的計時器昨天還好好的，今天打開只剩一片黑，星球不見了，按「發射」也沒反應。
            終端機卻什麼都沒說。<strong className="text-slate-100">你有兩招，都不需要看懂程式碼。</strong>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl">
                <Camera size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-100">一、直接給它看</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              別花力氣描述「星球不見了、按鈕點了沒反應」。<strong className="text-slate-100">截圖，貼給它。</strong>
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 mt-auto">
              <span className="text-sky-300 text-sm font-medium">「這是我現在看到的畫面，星球本來應該在下面，請幫我修正。」</span>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Search size={20} />
              </div>
              <h4 className="text-base font-bold text-slate-100">二、去撈瀏覽器的紅字</h4>
            </div>
            <div className="text-sm text-slate-300 leading-relaxed mb-4 space-y-1.5">
              <div>1. 按 <code className="text-slate-100 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs">F12</code>（Mac 按 <code className="text-slate-100 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-xs">Cmd+Opt+I</code>）</div>
              <div>2. 點最上面的 <strong className="text-slate-100">Console</strong> 分頁</div>
              <div>3. 看到紅字，整段複製</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 mt-auto">
              <span className="text-emerald-300 text-sm font-medium">「這是瀏覽器 Console 的紅字錯誤，請幫我修復。」</span>
            </div>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-slate-200">不用看懂那段紅字。</strong>
            你的工作只是把它從瀏覽器搬到對話框，多數情況下，這樣就足夠讓 AI 找到原因。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
