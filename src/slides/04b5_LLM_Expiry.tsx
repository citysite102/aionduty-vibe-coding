import { CalendarClock } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-04 新增。講師要求：提醒學員隨著模型更新，核心原則不變，但有些技巧會一直換，
 * 不用焦慮，而是去看官方文件開始嘗試，「這堂課學到的東西並非靜止不動的」。
 *
 * 放在章節二最後一頁（〈換你改這兩句模糊的需求描述〉之後）而不是結語，
 * 理由是這句話要先講，學員才不會把後面每一條具體操作都當成永恆的規定。
 *
 * 這一頁刻意**不出現任何指令或設定**（`/effort`、medium、high 都沒有）：
 * 學員到這裡還沒裝 Claude Code（安裝在章節三），講了沒有地方用（CLAUDE.md B-5b）。
 * 現在的官方建議那一張表在章節三〈官方指南怎麼查，現在寫了什麼〉，
 * 那一頁才是會過期的那一頁，C-1 的查證紀錄寫在那裡。**兩頁要一起看。**
 *
 * 2026-10-04（第二輪）「不會過期的」原本是三條抽象的原則
 * （把話講清楚、說得出什麼叫做完、不要什麼要點名），講師說太水。兩個病根：
 *   一、三條都是口號式的概括，沒有任何可以指的東西；
 *   二、第二、三條講的是學員還沒學到的內容（完成條件在章節八、排除法在案例那一段），
 *       對他來說是空的。
 * 改成**拿上一頁那個改寫版本來拆**：三個句段都是上一頁口白念出來的範例答案原文，
 * 學員一分鐘前才聽過，所以「不會過期」這件事是指得出來的，不是我宣稱的。
 * 注意上一頁的**畫面上沒有範例答案**（只有留白的「改寫：」欄），答案在口白裡，
 * 所以這裡的小標寫「上一頁那個改寫版本」而不是「你剛才寫的那一句」。
 * **換例子的時候要從上一頁口白的範例答案挑，不要自己另外編一句。**
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-04，對照 platform.claude.com/docs/en/build-with-claude/prompt-engineering/
 * prompting-claude-opus-5-5 的 Thinking instructions in chat system prompts 一節。
 * 當時的現況，原文：「In chat applications, if your system prompt contains instructions that
 * tell Claude to think carefully before answering, consider removing them... In Anthropic's
 * testing in a chat product, removing such a line made replies start sooner, with no clear
 * decline in the quality of the reply.」
 * 畫面上那個例子照這一段寫，**沒有說「一律不要寫」**，文件的用字是 consider removing。
 * 下次改版前先重查那一節，不要憑印象改。
 * ─────────────────────────────────────────────────────
 */

/** 三句都取自上一頁範例答案的原文。改這一頁之前先去那一頁對一次 */
const KEEPERS = [
  {
    quote: '「三顆按鈕：儲存草稿、送出、取消」',
    why: '叫得出名字，它才知道你在講哪一顆',
  },
  {
    quote: '「三顆按鈕上的文字不要改，表單其他地方不要動」',
    why: '邊界講出來，它才不會順手改別的',
  },
  {
    quote: '「另外附一張我喜歡的簡報樣板」',
    why: '你講不清楚的東西，給它看比較快',
  },
];

export default function SlideExpiry() {
  return (
    <SlideLayout title="哪些會過期，哪些不會" subtitle="What Expires, What Doesn't" icon={CalendarClock}>
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            接下來這堂課會教很多很具體的東西：打哪一個指令、哪個檔案放在哪裡、哪一句話要怎麼寫。
            <strong className="text-slate-100">其中有一部分，過半年就不一樣了。</strong>
            我先把會變的那一塊圈出來，你之後看到別人講得跟我不一樣，才不會以為自己學錯了。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-6 py-5">
          <h3 className="text-sky-300 text-base font-bold mb-4">上一頁那個改寫版本，這三樣不會過期</h3>
          <div className="space-y-2.5">
            {KEEPERS.map((k) => (
              <div key={k.quote} className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-x-5 gap-y-1">
                <p className="text-slate-200 text-sm leading-relaxed">{k.quote}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{k.why}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mt-4 pt-3 border-t border-sky-500/20">
            這三樣跟你用哪一家的工具、哪一個版本沒有關係。它們講的是你怎麼把事情交代清楚。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-amber-500/25 bg-amber-500/5 px-6 py-5">
          <h3 className="text-amber-200/90 text-base font-bold mb-2">會過期的長這樣：「請一步一步思考」</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            前幾年幾乎每一篇教學都叫你在句尾加這一句，因為當時的模型不講就不會多想。
            現在官方建議你考慮把它拿掉，因為它本來就會想。他們自己測過，拿掉之後回答開始得比較快，答案也沒有變差。
            想要它想深一點，是去調另一個設定，不用多寫這一句。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-amber-500/20">
            同一類的還有：指令叫什麼名字、設定藏在哪一層選單、哪個選項預設是開著的。
            這些不用背，知道它會變、知道去哪裡查就好。
          </p>
        </AnimatedBlock>

        <Callout tone="focus" stepIndex={4}>
          所以不用追影片跟貼文。官方自己有一份怎麼下指令的指南，它出新版本就會改一次，
          <strong className="text-slate-100">半年打開看一次，比每天刷十篇有用</strong>。
          後面會給你一張現在的版本，不過我希望你帶走的是那個網址。
        </Callout>

      </div>
    </SlideLayout>
  );
}
