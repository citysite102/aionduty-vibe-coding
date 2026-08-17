import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Database, FileText, Zap, BookOpen } from 'lucide-react';

export default function SlideHarnessContext() {
  return (
    <SlideLayout title="上下文工程" subtitle="Context Engineering" icon={BookOpen}>
      <div className="pt-6 max-w-6xl mx-auto min-h-full flex flex-col">
        {/*
          接縫改過兩次。第一次是把「餵對輸入＋驗證輸出」拿掉，因為整頁三張卡都在講輸入。
          第二次（現在這版）是把順序倒過來：原本先定義「上下文」再回頭接前一頁的零件，
          學員讀到的順序是「陌生名詞 → 細節主張 → 才知道為什麼講這個」，所以覺得跳題。
          現在第一句就從前一頁的零件接下去，名詞留到讀者已經知道在講什麼之後才給。
        */}
        <div className="bg-sky-950/30 border border-sky-900/50 rounded-2xl p-6 mb-6">
          <p className="text-slate-300 text-lg leading-relaxed mb-3">
            前一頁六個零件裡的第一個是<strong className="text-sky-200">規則文件</strong>。
            難的不只是寫什麼，還有<strong className="text-sky-200">什麼時候把它送進去</strong>：
            送太多它抓不到重點，送太少它就用猜的。
          </p>
          <h3 className="text-sky-300 font-bold mb-3 flex items-center gap-2 text-xl">
            <Zap size={24} />
            同一份東西，每次都給跟用到才給，差很多
          </h3>
          {/*
            模擬學員在這一頁問的第一個問題是「上下文到底是什麼？是對話紀錄嗎？會滿嗎？」
            整頁的標題就是這個詞，卻從來沒有人定義過它。先給一句白話再往下講。
          */}
          <p className="text-slate-300 text-lg leading-relaxed">
            送進去的那一整包東西叫<strong className="text-sky-200">上下文</strong>：
            你打的字、它讀過的檔案、前面來回過的對話，全部算在一起，就是它這一輪看得到的所有東西。
            它一次只裝得下這麼多，<strong className="text-slate-100">會滿</strong>，滿了就得丟掉一些。
            決定什麼時候送什麼進去，這件事叫上下文工程。
          </p>
        </div>

        <p className="text-slate-300 text-lg mb-8">
          給它什麼資料，就決定它做出什麼品質。下面三種是它拿到資料的三種時機。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-slate-800 rounded-xl text-slate-300">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-100">每次都給<br/><span className="text-sm text-slate-500 font-normal">Static Context</span></h3>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
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
            <p className="text-slate-300 text-base leading-relaxed mb-6">
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
              <h3 className="text-xl font-bold text-sky-300">Agent Skills<br/><span className="text-sm text-sky-600/80 font-normal">混合式設計</span></h3>
            </div>
            <p className="text-sky-100 text-base leading-relaxed mb-6">
              平常只讓它知道「有哪些 Skill 可以用」，各佔一行標題。真的用到那一個的時候，才把整份內容讀進來。
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
          className="mt-6 rounded-2xl border px-6 py-4 bg-amber-500/5 border-amber-500/25"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            <strong className="text-slate-100">你每次對話要把多少東西送進去，而那些東西是要付錢的。</strong>
            手冊該寫多長、哪些東西不該常駐，算的都是這筆帳。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
