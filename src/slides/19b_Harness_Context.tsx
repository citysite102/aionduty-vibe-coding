import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Database, FileText, Zap, BookOpen } from 'lucide-react';

export default function SlideHarnessContext() {
  return (
    <SlideLayout title="為什麼需要規則文件？" subtitle="Context Engineering" icon={BookOpen}>
      <div className="pt-6 max-w-6xl mx-auto min-h-full flex flex-col">
        {/*
          這一頁改過三次。前兩次都在調「上下文」這個名詞什麼時候給。
          2026-09-21 這一版把問題換掉了：標題從「上下文工程」改成「為什麼需要規則文件？」。
          理由是學員在這個位置還沒寫過任何一份規則文件，先問他要怎麼配置上下文，
          等於在回答一個他還沒有的問題。現在的順序是：為什麼要有這份文件 →
          它裝不下全部 → 所以有三種載入時機 → 而決定時機這件事本身就寫在這份文件裡。

          第三格講的是「先給目錄、用到才展開」這個做法本身，不要縮回去只講 Agent Skills。
          走這條路的至少有五種（子資料夾的 CLAUDE.md、Rules、Skill、Subagent、MCP），
          而 Slide 71、72 與 74 就是照這個分的。只寫 Skill 的話，學員到那幾頁會以為是新東西。

          **最後那一塊（規則文件自己指路）不要拿掉。** 沒有它，三種時機只是一張分類表，
          學員不知道那跟他等一下要寫的 CLAUDE.md 有什麼關係。這份簡報自己的 CLAUDE.md
          就是這樣寫的（主檔指到 src/remotion/CLAUDE.md），Slide 80 節錄的就是那份檔案。
        */}
        <div className="bg-sky-950/30 border border-sky-900/50 rounded-2xl p-6 mb-6">
          <p className="text-slate-300 text-base leading-relaxed mb-3">
            你每開一次新對話，就得重講一次規矩。
            <strong className="text-sky-200">規則文件就是把那些話寫成一個檔案</strong>，
            它自己會被讀進去，你不用再講。
          </p>
          <h3 className="text-sky-300 font-bold mb-3 flex items-center gap-2 text-lg">
            <Zap size={24} />
            但它裝不下全部，所以要挑什麼時候送什麼進去
          </h3>
          <p className="text-slate-300 text-base leading-relaxed">
            送進去的那一整包東西叫<strong className="text-sky-200">上下文</strong>：
            你打的字、它讀過的檔案、前面來回過的對話，全部算在一起，就是它這一輪看得到的所有東西。
            它一次只裝得下這麼多，<strong className="text-slate-100">會滿</strong>，滿了就得丟掉一些。
            所以規則文件不是寫越多越好，<strong className="text-slate-100">寫進去的每一個字，每次對話都會被送一次</strong>。
          </p>
        </div>

        <p className="text-slate-300 text-base mb-6">
          東西進到上下文裡有三種時機。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">每次都給<br/><span className="text-sm text-slate-500 font-normal">Static Context</span></h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              每次開對話都整份讀進去的規範檔，例如 CLAUDE.md。就像必讀的<strong>員工手冊</strong>。
            </p>
            <div className="space-y-3 mt-auto">
              <div className="text-sm text-emerald-400 bg-emerald-950/30 px-4 py-3 rounded-lg border border-emerald-900/50">
                <strong>好處：</strong>極度可靠，不會遺漏
              </div>
              <div className="text-sm text-amber-400 bg-amber-950/30 px-4 py-3 rounded-lg border border-amber-900/50">
                <strong>壞處：</strong>從頭到尾都佔著空間，也一直在花額度
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">用到才給<br/><span className="text-sm text-slate-500 font-normal">Dynamic Context</span></h3>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              當下才撈進來的資料，例如它自己去查回來的文件、跑完一個指令拿到的結果。
            </p>
            <div className="space-y-3 mt-auto">
              <div className="text-sm text-emerald-400 bg-emerald-950/30 px-4 py-3 rounded-lg border border-emerald-900/50">
                <strong>好處：</strong>便宜，用到才載入
              </div>
              <div className="text-sm text-amber-400 bg-amber-950/30 px-4 py-3 rounded-lg border border-amber-900/50">
                <strong>風險：</strong>Agent 該抓的時候可能漏抓
              </div>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="bg-sky-950/20 border border-sky-900/50 rounded-2xl p-6 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-sky-600/20 text-sky-300 text-xs font-bold px-3 py-1.5 rounded-bl-xl border-b border-l border-sky-600/30">
              推薦模式
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-sky-900/50 rounded-xl text-sky-300">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-sky-300">先給目錄，用到才展開<br/><span className="text-sm text-sky-600/80 font-normal">混合式設計</span></h3>
            </div>
            <p className="text-sky-100 text-sm leading-relaxed mb-4">
              平常只讓它知道「有哪些東西可以叫」，各佔一行標題。真的用到那一個的時候，才把整份內容讀進來。
            </p>
            <p className="text-sky-100/80 text-sm leading-relaxed mb-5">
              走這條路的不只一種：子資料夾裡的 <code className="font-mono">CLAUDE.md</code>、
              碰到特定檔案才載的 Rules、Skill、Subagent、MCP，都是「先掛著名字，叫到才進來」。
              <span className="text-sky-200/70">哪一個什麼時候進來，後面有一整頁在分。</span>
            </p>
            <div className="mt-auto bg-sky-950/50 p-4 rounded-xl border border-sky-900/50">
              <p className="text-sm text-sky-200">
                <strong>用到才展開</strong>，所以該知道的它知道，額度也不會一直花在用不到的資料上。
                這個做法叫漸進式揭露（Progressive Disclosure）。
              </p>
            </div>
          </AnimatedBlock>
        </div>

        <AnimatedBlock
          stepIndex={4}
          className="mt-6 rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            回到第一個問題：規則文件為什麼重要？因為
            <strong className="text-slate-100">決定「什麼時候讀哪一份」的那幾句話，本身就寫在它裡面。</strong>
            它可以只留常態規矩，再寫一行「改到某一塊的時候，去讀另一份」，
            那一份平常就不佔位置。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800">
            所以它是整個運作框架的入口，也是你唯一每次都會被讀到的地方。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
