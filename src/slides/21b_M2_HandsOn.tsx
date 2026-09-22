import { PenTool } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyAction } from '../components/CopyBlock';
import { LiveDemo } from '../components/LiveDemo';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/**
 * 最後查證：2026-09-21，對照 code.claude.com/docs/en/memory 與 /context-window。
 * 當時的現況：
 *   - auto memory「is on by default」，所以第 4 格的「預設就開著」成立。
 *   - 它存的四類是 user、feedback、project、reference，而官方明講
 *     「Claude skips anything it can derive from the codebase, such as architecture,
 *     file paths, or debugging fixes」。原本舉的例子「這個專案怎麼跑測試」正好是
 *     它會跳過的那一類（package.json 裡就有），已換成它真的會記的。
 *   - `/memory` 可以瀏覽與編輯那些檔案，而且是純 markdown，跟這一格寫的一致。
 *   - 2026-09-22 補查兩條：官方寫「Both are loaded at the start of every conversation」，
 *     所以「一樣每次都載入」成立；存放位置是 `~/.claude/projects/<project>/memory/`，
 *     在專案資料夾外面、也不進版控，所以「換一台電腦、換一個人接手就沒有了」成立。
 *     這兩句被質疑過，查過是對的，不要憑感覺改掉。
 *   - **`/context` 的欄位名稱查不到「Free space」**。官方只說它給
 *     「a live breakdown by category with optimization suggestions」，
 *     所以第 2 格不再指名那個標籤，改成講要比的是什麼。介面字串最容易過期，
 *     下次改版前自己打一次 /context 對照，不要照抄舊截圖。
 *
 * 這一頁是動手頁，所以每一格都要有可以直接貼的東西，不是描述「你應該做什麼」。
 *
 * 第三格特別注意：不要把拆解的答案直接印出來。
 * 學員要看到的是「它反問了什麼」，那些問題必須是這個計時器真的會卡住的地方
 * （返航算不算一趟、今天怎麼算、關掉瀏覽器還在不在），
 * 換成通用的「要記哪些欄位、存在哪裡」就沒有教學效果了。
 */
/**
 * 改吃純文字而不是 children，這樣同一份字串既拿去顯示也拿去複製，
 * 不會出現「畫面上讀到的跟複製到的不一樣」。外層的「」是排版用的，複製不帶。
 */
function Prompt({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-3.5 py-2.5">
      <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">Prompt</div>
      <p className="text-sky-100 text-sm leading-relaxed">「{text}」</p>
      <CopyAction text={text} className="mt-2" />
    </div>
  );
}

export default function SlideM2HandsOn() {
  return (
    <SlideLayout title="動手搭建運作框架" subtitle="Hands-on Harness" icon={PenTool}>
      <LiveDemo kind="claude" note="四格做完會得到一份改過的 CLAUDE.md，下一頁接著用它" />

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-6xl mx-auto items-stretch pb-8 ${hoverIsolateGrid}`}>

        <AnimatedBlock stepIndex={1} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col ${hoverIsolateCard}`}>
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">1</span>
            為你的計時器生成手冊
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            把你做計時器時一句一句盯出來的東西，變成它每次都會讀到的檔案。
          </p>
          <Prompt text="讀一遍這個專案，幫我寫一份 CLAUDE.md。先不要存檔，貼出來給我看。" />
          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            它寫完你一定要改。它只看得到程式碼，看不到你腦裡的規則，那幾條它猜不到。
          </p>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            先把草稿存成 <code className="font-mono text-orange-300">CLAUDE.md</code>。
            後面三格都是在改這同一份檔案。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col ${hoverIsolateCard}`}>
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">2</span>
            親眼看 context 被吃掉
          </h3>
          {/*
            2026-09-22：原本第一句就叫學員打 /context。Slide 57（`21a4_M2_SkillInstall`）雖然
            提過一次「也可以輸入 /context，載進來的東西會列在裡面」，但那裡沒說它是什麼、
            為什麼要打。先用一句話說清楚它做什麼，再給動作。
          */}
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            <code className="font-mono text-orange-300">/context</code>{' '}
            會列出這次對話目前帶了哪些東西、各佔多少。
            <span className="text-slate-300">讀檔案前後各打一次，那個差額就是這次讀進去的量。</span>
          </p>
          <div className="space-y-2 text-sm">
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="font-mono text-orange-300 font-bold">/context</span>
              <span className="text-slate-400"> 先打一次，記下它列出來的用量。</span>
            </div>
            <Prompt text="把 index.html 整份讀一遍，告訴我它有幾行。" />
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="font-mono text-orange-300 font-bold">/context</span>
              <span className="text-slate-400"> 再打一次，比一下多吃掉多少。</span>
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

        <AnimatedBlock stepIndex={3} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col ${hoverIsolateCard}`}>
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">3</span>
            讓它先問，不要讓它先寫
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            拿一個你自己也還沒想清楚的需求。
          </p>
          {/*
            需求本體一定要留在複製字串裡。它原本只寫在上面那行 <span> 裡，
            學員按複製貼過去，Claude 收到的是「這個需求我還沒想清楚」而沒有需求本身，
            它只會反問你在講哪一個。這是 CLAUDE.md A-4 記載過的同一種錯（12_M1_Example1）。
          */}
          <Prompt text="我想知道自己今天完成幾趟任務。這個需求我還沒想清楚，先不要寫程式，把你需要我決定的事情列出來問我。" />
          <p className="text-slate-500 text-xs leading-relaxed mt-3 mb-2">
            它應該要問回這種等級的問題：答案只有你決定得了，它讀程式碼讀不出來。
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
            這三題你不回答，它就會自己選，而且不一定會告訴你它選了什麼。
          </p>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            你剛剛做的那三個決定，就是三條新規則。補進手冊，下次它不用再問一遍。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col ${hoverIsolateCard}`}>
          <h3 className="text-lg font-bold text-slate-100 mb-3 pb-3 border-b border-slate-800 flex items-baseline gap-2.5">
            <span className="font-mono text-xs text-slate-600">4</span>
            它自己也在記，去看它記了什麼
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            除了你寫的 CLAUDE.md，Claude Code 還會自己存筆記，預設就開著，而且一樣每次都載入。兩者分工不同：
          </p>
          <div className="space-y-2 text-sm mb-3">
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="text-orange-300 font-bold">CLAUDE.md</span>
              <span className="text-slate-400">：你寫的規則。「一律用繁體中文」這種。</span>
            </div>
            <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5">
              <span className="text-orange-300 font-bold">auto memory</span>
              <span className="text-slate-400">：它自己學到的。你糾正過它的事、你偏好的做法、這個專案做過的決定。</span>
            </div>
          </div>
          <div className="rounded-lg bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm">
            <span className="font-mono text-orange-300 font-bold">/memory</span>
            <span className="text-slate-400"> ，看它到底記了什麼。那些是純文字檔，可以直接改或刪。</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed mt-3 pt-2.5 border-t border-slate-800">
            <strong className="text-slate-300">做完這格：</strong>
            它記的東西裡，如果有你希望每個人都遵守的，搬進手冊。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={5}>
          手上沒有計時器的話，開一個空資料夾，四格這樣換：第 1 格跟它說「幫我起一份空白的 CLAUDE.md」，
          規則寫你自己工作上真的有的那幾條；第 2 格改讀手邊任何一個長一點的檔案；
          第 3 格換成你工作上真的還沒想清楚的一個需求；第 4 格照走。
        </Callout>

      </div>
    </SlideLayout>
  );
}
