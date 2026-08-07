import type { ReactNode } from 'react';
import { PenTool } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 這一頁是動手頁，所以每一格都要有可以直接貼的東西，不是描述「你應該做什麼」。
 *
 * 第三格特別注意：不要把拆解的答案直接印出來。
 * 學員要看到的是「它反問了什麼」，那些問題必須是這個計時器真的會卡住的地方
 * （返航算不算一趟、今天怎麼算、關掉瀏覽器還在不在），
 * 換成通用的「要記哪些欄位、存在哪裡」就沒有教學效果了。
 */
function Prompt({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-3.5 py-2.5">
      <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">Prompt</div>
      <p className="text-sky-100 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

export default function SlideM2HandsOn() {
  return (
    <SlideLayout title="動手搭建運作框架" subtitle="Hands-on Harness" icon={PenTool}>
      <LiveDemo kind="claude" note="四格都做完，產出留著後面還會用" />

      {/*
        滑到哪一格，那一格亮邊框、其餘變暗，講者現場好指。
        暗化用 brightness 不用 opacity：AnimatedBlock 的進場動畫是 motion 直接寫 inline 的
        opacity，class 蓋不過去；就算用 ! 蓋過去，還沒輪到的那幾格會被強制顯示出來。
        filter 沒有人在動，所以 opacity 0 的格子乘上任何 brightness 還是看不見。
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto items-stretch pb-8 [&:hover>*]:brightness-[0.4] [&>*:hover]:brightness-100">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">1</span>
            為你的計時器生成手冊
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            把第一單元你一句一句盯出來的東西，變成它每次都會讀到的檔案。
          </p>
          <Prompt>
            「讀一遍這個專案，幫我寫一份 CLAUDE.md。先不要存檔，貼出來給我看。」
          </Prompt>
          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            它寫完你一定要改。它只看得到程式碼，看不到你腦裡的規矩，那幾條它猜不到。
          </p>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            先把草稿存成 <code className="font-mono text-orange-300">CLAUDE.md</code>。
            要補哪幾條、怎麼確認它真的照做，下一頁一步一步帶。下面三格都是在改這同一份檔案。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">2</span>
            親眼看 context 被吃掉
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            不要用聽的。做一次前後對照，數字自己會講話。
          </p>
          <div className="space-y-2 text-sm">
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="font-mono text-orange-300 font-bold">/context</span>
              <span className="text-slate-400"> ，記下 Free space 那個百分比。</span>
            </div>
            <Prompt>「把 index.html 整份讀一遍，告訴我它有幾行。」</Prompt>
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="font-mono text-orange-300 font-bold">/context</span>
              <span className="text-slate-400"> 再打一次，看少了多少。</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            讀一個檔案就吃掉這麼多，你就知道為什麼手冊不能什麼都寫。
            想清掉重來是 <code className="text-orange-300">/clear</code>，想留著摘要繼續是{' '}
            <code className="text-orange-300">/compact</code>。
          </p>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            回頭看你剛存的手冊，有沒有哪幾條它光讀程式碼就知道？那幾條刪掉。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">3</span>
            讓它先問，不要讓它先寫
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            拿一個你自己也還沒想清楚的需求：
            <span className="text-slate-200">「我想知道自己今天完成幾趟任務」</span>。
          </p>
          <Prompt>
            「這個需求我還沒想清楚。先不要寫程式，把你需要我決定的事情列出來問我。」
          </Prompt>
          <p className="text-slate-500 text-xs leading-relaxed mt-3 mb-2">
            它應該要問回這種等級的問題。你回答之前，自己也答不出來：
          </p>
          <ul className="space-y-1.5 text-sm text-slate-300">
            <li className="flex gap-2.5">
              <span className="text-slate-600 shrink-0">·</span>按了返航、沒跑完的那次，算不算一趟？
            </li>
            <li className="flex gap-2.5">
              <span className="text-slate-600 shrink-0">·</span>「今天」是算到午夜，還是從你這次打開頁面起算？
            </li>
            <li className="flex gap-2.5">
              <span className="text-slate-600 shrink-0">·</span>關掉瀏覽器再打開，前面的紀錄要還在嗎？
            </li>
          </ul>
          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            這三題你不回答，它就會自己選，而且不會告訴你它選了什麼。
          </p>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            你剛剛做的那三個決定，就是三條新規矩。補進手冊，下次它不用再問一遍。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col transition-[filter,border-color] duration-200 hover:border-sky-500/60">
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">4</span>
            它自己也在記，去看它記了什麼
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            除了你寫的 CLAUDE.md，Claude Code 還會自己存筆記，預設就開著。兩者分工不同：
          </p>
          <div className="space-y-2 text-sm mb-3">
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="text-orange-300 font-bold">CLAUDE.md</span>
              <span className="text-slate-400">：你寫的規矩。「一律用繁體中文」這種。</span>
            </div>
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="text-orange-300 font-bold">auto memory</span>
              <span className="text-slate-400">：它自己學到的。你糾正過它的事、這個專案怎麼跑測試。</span>
            </div>
          </div>
          <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm">
            <span className="font-mono text-orange-300 font-bold">/memory</span>
            <span className="text-slate-400"> ，看它到底記了什麼。那些是純文字檔，可以直接改或刪。</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            它記的東西裡，如果有你希望每個人都遵守的，搬進手冊。
            先照這個粗略的分界走就好，一條規則到底該放哪，這一段後面會給你一套完整的判斷方式。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
