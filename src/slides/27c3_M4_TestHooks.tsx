import { ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元「撰寫測試」的第三頁：寫好之後怎麼讓它每次都跑。2026-10-27 新增。
 *
 * **標題不要寫 Hook。** 這一支在章節三，Hook 要到章節五才教，標題拿它當主詞等於
 * 用一個學員還沒看過的詞開場。Hook 這個字只出現在第一列的工具欄與註腳，
 * 那裡有一句解釋加一次指路，夠了。
 *
 * 2026-10-27 從章節七搬到章節三。代價是 Hook（章節五）與完成條件（章節七）都還沒教，
 * 所以這一頁只講「要在三個時機跑」，三個時機各指一次路，**不重講那兩個東西怎麼做**。
 * 指路是允許的（D-6b：往前指某一段要報章節），重講會讓這一頁變成兩章的摘要。
 *
 * 「不准改測試讓它過」那一條是這一頁的重點：它是 AI 最常走的捷徑，
 * 而且學員從畫面上看不出來（測試全綠，功能還是壞的）。
 *
 * 2026-10-27 砍掉頁尾那個「這一圈不需要你在旁邊看」的收尾 Callout：它重講了三列
 * 自己就寫著的東西（Hook 那一列＝改一個地方、跑一次、沒過回去修），而且指路也已經
 * 掛在後兩列的註腳上。這一頁塞不下第三塊，要再加東西先確認 CopyBlock 還看得到。
 */
const WHERE = [
  {
    when: '它說做完之前',
    tool: 'Hook',
    does: '先跑一次測試，沒過就把這一輪擋下來，讓它回去修',
    note: '寫成文字它每次都要重新判斷，寫成 Hook 每一次都照同一段跑。怎麼掛，章節五會整章講',
    key: true,
  },
  {
    when: '推上 GitHub 之後',
    tool: 'CI',
    does: '在別人的機器上再跑一次，確認不是只有你這台過',
    note: 'Hook 管你這台機器，CI 管整個專案。兩個不是二選一',
  },
  {
    when: '每一輪開始之前',
    tool: '交辦的時候',
    does: '把「哪幾條測試要綠」直接寫進這一輪的完成標準',
    note: '它才有辦法自己判斷還沒做完，而不是改完就停下來等你。章節七會把這件事變成一個循環',
  },
];

const RULE = `測試沒過的時候，修功能，不要改測試讓它通過。
測試本身要改，先跟我說是哪一條、為什麼那條原本的預期是錯的。`;

export default function SlideTestHooks() {
  return (
    <SlideLayout
      title="測試寫好之後，讓它在三個時機自己跑"
      subtitle="Running Tests Automatically"
      icon={ShieldCheck}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">三個時機，各自擋不同的東西</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            寫完之後最容易發生的事，是你忘記跑它。
            <strong className="text-slate-200">測試是檢查的內容，Hook 與 CI 是讓它自己跑起來的開關</strong>，
            兩個接起來才不用靠你記得。
          </p>
          <ul className="space-y-1.5">
            {WHERE.map((w) => (
              <li
                key={w.when}
                className={`rounded-xl border px-4 py-2.5 ${
                  w.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
                }`}
              >
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className={`text-sm font-bold ${w.key ? 'text-sky-200' : 'text-slate-100'}`}>
                    {w.when}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{w.tool}</span>
                  <span className="text-slate-300 text-sm leading-relaxed">{w.does}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mt-0.5">{w.note}</p>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-base font-bold text-slate-100">交代測試的時候補這兩句，擋住它最常走的捷徑</h3>
            <p className="text-slate-500 text-sm">之後寫 <code className="font-mono text-orange-300">CLAUDE.md</code> 的時候，這兩句直接搬進去</p>
          </div>
          <CopyBlock text={RULE} note="測試沒過時，它可能會改測試而不是改功能" />
          <p className="text-slate-400 text-sm leading-relaxed">
            那條捷徑是<strong className="text-slate-200">改測試，不是改功能</strong>。
            兩種做法跑完都是一片綠，你看不出差別。
            它不是在騙你，你給的目標是「讓測試過」，改測試就是最短的路。
          </p>
        </AnimatedBlock>


      </div>
    </SlideLayout>
  );
}
