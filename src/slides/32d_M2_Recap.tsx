import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const DONE = [
  {
    title: '寫出一份會被讀到的手冊',
    desc: '而且你用 /context 確認過它真的在載入清單裡，不是寫完就算了。',
  },
  {
    title: '知道它沒照做時要先查哪裡',
    desc: '先看有沒有被載入，再看規則寫得能不能判定。不要一發現沒照做就急著再加一條。',
  },
  {
    title: '知道一條規則該放哪一層',
    desc: '會出事的交給 Hook 或 CI，只在某一區適用的分出去，剩下的才寫進根目錄。',
  },
];

export default function SlideM2Recap() {
  return (
    <SlideLayout title="這一段你完成了三件事" subtitle="Module 2 Recap" icon={ListChecks}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 max-w-6xl mx-auto items-start pb-4">

        <div className="space-y-3">
          {DONE.map((d, i) => (
            <AnimatedBlock
              key={d.title}
              stepIndex={i + 1}
              className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex gap-4 items-start"
            >
              <div className="w-7 h-7 shrink-0 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-sky-400 font-bold font-mono text-sm">
                {i + 1}
              </div>
              <div>
                <div className="text-slate-200 text-[15px] font-bold mb-1">{d.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{d.desc}</div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
            <div className="text-sm font-mono uppercase tracking-widest text-sky-400 mb-3">你的專案裡多了什麼</div>
            <div className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 leading-relaxed">
              <div>mission-timer/</div>
              <div className="text-slate-500">├ index.html</div>
              <div className="text-slate-500">├ src/</div>
              <div className="text-sky-300">└ CLAUDE.md　←　這一段的產出</div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              這個檔案跟著專案走。之後不管你隔多久回來、換哪一台電腦，它都在。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">下一段要解決什麼</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              手冊管得到「怎麼做」，管不到「什麼時候算做完」。到目前為止，每一輪都要你按下開始、你來看結果。<span className="text-slate-200">下一段講的是怎麼設一個目標，讓它自己跑完一輪再回來找你。</span>
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-2">講義下載</div>
            <div className="text-sky-300 font-mono text-sm break-all mb-2">
              citysite102.github.io/aionduty-vibe-coding/handouts/
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              CLAUDE.md 模板、規則分流判斷卡、五步健檢檢查表，另有可直接列印的 A4 版本。
              回去之後把模板複製到你手上真正在跑的專案，填完跑一次 <code className="text-sky-300 font-mono">/context</code> 確認它在。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
