import { ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

export default function SlideIntroAgentic() {
  return (
    <SlideLayout title="Vibe Coding、Agentic Engineering、Agent" subtitle="2026 Update" icon={ArrowRight}>
      <div className="max-w-5xl mx-auto mt-6 space-y-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3 text-sky-400 font-mono text-xs font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 bg-sky-400 rounded-full"></span>
            2026 Update: From Vibe to Agentic
          </div>
          {/*
            原本寫「Karpathy 於 2026 年 2 月宣告：Vibe Coding 已經過時」，三件事都不準：
            時間是 4 月底、形式是 fireside chat 不是有標題的演講，
            而他的結論是兩者互補，不是誰取代誰。查證出處：
            karpathy.bearblog.dev/sequoia-ascent-2026/（2026-04-30）。
            這是指名歸屬的引述，又擺在整堂課的定調位置，不能寫成他沒說過的話。

            2026-09-20 再修第二段。原本是「前者讓⋯後者處理的是⋯先用前者做出東西，
            再用後者⋯」，四個位置代稱（D-2 禁的那一類），而且「前者」離它指的那個
            Vibe coding 隔了一整句，讀者要回頭數。改用引言自己的詞（地板／天花板），
            指涉就不會飄。「講得更直白」也不準：「守住品質水準」比「把天花板往上推」
            更抽象，它是更具體地說出目的，不是更白話，所以改成「說得更具體」。
            結尾原本是「先用前者做出東西，再用後者把它變成敢交出去的東西」，
            那句封面（1-1 Slide 1）已經講過一次，這裡只留順序。
          */}
          <h3 className="text-2xl font-black text-slate-100 mb-4">
            Andrej Karpathy：這兩個不是誰取代誰，是各做各的事
          </h3>
          <p className="text-slate-500 text-xs mb-3">
            2026 年 4 月，Sequoia AI Ascent 的對談。
          </p>
          <p className="text-slate-300 text-lg leading-relaxed mb-3">
            他的原話是：<strong className="text-sky-400 font-bold">「Vibe coding 把地板墊高，Agentic engineering 是把天花板往上推。」</strong>
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            他另外一句說得更具體：Agentic engineering 是在守住專業軟體的品質水準。所以地板管的是做不做得出來，天花板管的是做出來之後怎麼確定它是對的。
            <strong className="text-slate-100">這門課兩層都會走到</strong>，而且順序是先有地板。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-base font-bold text-slate-100 mb-2">那 Agent 是什麼？</div>
          <p className="text-slate-300 text-base leading-relaxed">
            你現在用的對話框，是你問一句、它回一段字，真正要照著做的還是你自己。
            <strong className="text-slate-100">Agent 是你交代一件事，它自己去開檔案、跑指令、改東西，做完回報結果給你。</strong>
            差別只有一個：它有沒有手。這門課都會用到這個詞，指的都是這件事。
            <span className="block mt-2 text-slate-400">它開的是你電腦裡真正的檔案，但預設會在改檔案、跑指令之前停下來問你，只有讀取不打擾。要放寬到什麼程度是你決定的。</span>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatedBlock stepIndex={3} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
            <div className="text-lg font-bold text-sky-400 font-mono mb-2">「Agentic」</div>
            <p className="text-slate-300 text-base leading-relaxed">
              你多數時間不是自己在寫程式碼，是在指揮一群 Agent，決定誰做什麼、做完由你收。
            </p>
          </AnimatedBlock>
          <AnimatedBlock stepIndex={4} className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/60">
            <div className="text-lg font-bold text-indigo-400 font-mono mb-2">「Engineering」</div>
            <p className="text-slate-300 text-base leading-relaxed">
              這依然是一門要專業的工作，只是你的專業換到了定規格、切架構，還有守住邊界。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
