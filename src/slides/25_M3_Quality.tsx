import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-04 整頁重寫，兩個問題：
 *
 * 一、接不上。前一頁（workflow）剛講完一次派幾十個子代理，這一頁直接跳到「設一道品質防線」，
 *    中間少了那個「所以」。缺的那一句是：派得越多，你越看不完，而它的預設是找一個說得過去的
 *    說法讓你通過。開場現在就講這件事。**改前一頁或這一頁的時候兩邊要一起看（B-4）。**
 *
 * 二、文案與配色。原本左右兩欄的小標是「簡單的 Review」對「有標準的 Reviewer」，
 *    中英混用而且分不出差別；右欄三條是「先讀範例／依循準則／明確退回」這種四字對仗（D-2）。
 *    底色用了 `bg-[#0f111a]` 與 `bg-[#050b14]` 兩個硬寫的 hex（A-1 只准用 slate 階）。
 *    收尾那一塊是置中的大標語，改成一般段落。
 *
 * 2026-10-04（講師）：開場原本只丟出「整體結構清楚，沒有明顯問題」這句回覆，但沒有人知道
 * 當時問了什麼、它在看什麼，所以那句憑什麼算「沒在審」讀不出來（D-2：空心的詞）。
 * 現在改成一組「你問／它回」，而且題目用學員手上真的有的那個計時器，
 * 再接一句點破它漏掉什麼（倒數分鐘數寫死，那條規則是他自己寫進 CLAUDE.md 的）。
 *
 * **這一塊只寫事實，不要替 AI 講話，也不要描述讀者的感受。** 同一輪清掉四句：
 * 「你大概已經撞過這一輪」（對學員狀態的斷言）、「這句話讀起來很專業」（描述讀者感受）、
 * 「它不是在唬你」（替 AI 辯護，擬人化）、「『可以』永遠是比較安全的回答」（「永遠」證明不了）。
 * 留下來的是：它沒講什麼、實際漏了什麼、沒標準就沒得比對。
 * **那條規則要跟 25b_M3_HandsOn 的 FRONTMATTER 對得起來，改一邊要改另一邊（B-4）。**
 * 同一句回覆在下一頁還會出現一次，那是刻意的對照（這裡是病徵，下一頁是治好之後長什麼樣），不是重複。
 *
 * 分工：這一頁只講「為什麼要設」與「設得起來的條件是什麼」，
 * 實際怎麼建、它退回來的話長什麼樣，在下一頁（動手做一個審查子代理）。**不要在這裡先演一次。**
 *
 * 2026-10-04（講師）：這一頁跟下一頁讀起來像各講各的，因為下一頁的設定檔裡三件事都在，
 * 但沒有標出來。現在 25b_M3_HandsOn 的 STEP 1 底下有一張 `MAPPING` 表把三件事各指到設定裡的哪一句，
 * **那張表的三個標題直接抄自下面的 `PARTS`。改 `PARTS` 的標題就要同時改那一張表（B-6）。**
 */

/** 一道防線設不設得起來，看這三件事寫不寫得出來 */
const PARTS = [
  {
    t: '它拿什麼當標準',
    bad: '「幫我看一下有沒有問題」',
    good: '指名一份東西讓它對照：合格的報價單長這樣、這個專案的 CLAUDE.md 寫了什麼。',
  },
  {
    t: '它要逐條檢查哪幾項',
    bad: '「整體品質顧一下」',
    good: '把項目列出來：欄位有沒有缺、金額規則對不對、用字有沒有踩到禁用詞。',
  },
  {
    t: '什麼情況要退回',
    bad: '沒寫，所以它都說可以',
    good: '「只要有一項沒過就整份退回，列出缺的那幾項，不要自己補。」',
  },
];

export default function SlideQuality() {
  return (
    <SlideLayout title="設一道會退回的品質防線" subtitle="Quality Defense" icon={ShieldCheck}>
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-base leading-relaxed mb-3">
            一次派一個你還看得完，一次派三十個就看不完了。那就叫它自己看。
          </p>

          <div className="space-y-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">你問</div>
              <p className="text-slate-200 text-base leading-relaxed">「幫我看一下這個計時器有沒有問題。」</p>
            </div>
            <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 px-4 py-3">
              <div className="text-xs font-mono uppercase tracking-widest text-rose-300/80 mb-1">它回</div>
              <p className="text-slate-200 text-base leading-relaxed">「整體結構清楚，沒有明顯問題，可以了。」</p>
            </div>
          </div>

          <p className="text-slate-400 text-base leading-relaxed mt-3">
            它沒有講哪個檔案、哪一行、拿什麼當標準。
            <strong className="text-slate-200">而那支計時器的倒數分鐘數寫死在程式裡</strong>，
            那一條就在你的 <code className="font-mono text-orange-300">CLAUDE.md</code> 裡。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            <strong className="text-slate-200">沒給標準，它就沒有東西可以比對</strong>，剩下的只有印象。
            所以派出去的同時要多派一個角色：一個只負責挑錯、而且挑到就把整份退回來的審查子代理。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <h3 className="text-slate-100 text-lg font-bold mb-4">審查子代理要寫三件事，少一件它就會放行</h3>

          <div className="space-y-3">
            {PARTS.map((p, i) => (
              <div key={p.t} className="rounded-xl border border-slate-800 bg-slate-950 px-5 py-4">
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="font-mono text-sm text-slate-600 shrink-0">0{i + 1}</span>
                  <span className="text-slate-100 text-base font-bold">{p.t}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-x-5 gap-y-2">
                  <p className="text-rose-300/90 text-sm leading-relaxed">✕ {p.bad}</p>
                  <p className="text-slate-300 text-sm leading-relaxed">✓ {p.good}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <Callout tone="focus" stepIndex={3}>
          這三件事寫得出來的工作，都設得起同一個角色：報價單審查、客服回覆審查、教材審查、品牌文案審查。
          Code Reviewer 只是最容易拿來講的那一個。寫不出「什麼情況要退回」，這個角色就還不成立。
        </Callout>

      </div>
    </SlideLayout>
  );
}
