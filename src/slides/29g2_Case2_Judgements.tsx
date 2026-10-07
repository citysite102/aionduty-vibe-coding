import { Scale } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 案例二的收尾。三個案例各有一塊「AI 幫不了你的判斷」，這是第二塊，
 * 案例一那塊在〈器 VESSEL 的十二步〉的下半，案例三那塊在它自己的最後一頁。
 *
 * 三頁要一起看才有意義，因為手冊自己把三個案例的判斷排成一條線：
 *   案例一　這個東西該不該存在
 *   案例二　這件事該交給誰做
 *   案例三　這件事可以相信誰
 * 所以這一頁的開頭一定要先把上一個案例的那句話講出來，單看這一頁會變成六條沒有關聯的條目。
 * **改這三頁任何一頁的那句話，另外兩頁要跟著改。**
 *
 * 資料來源 case-02-tokyo-loop.pdf 的〈六個判斷〉，三欄照抄（判斷、判斷依據、判斷錯的代價）。
 * 階段編號沒有照抄：投影片一向把手冊的「階段」講成「第 N 步」，只有關鍵的那一條標出來，
 * 六條全標會變成一張要對照手冊才讀得懂的表。
 *
 * 只有第 2 條標 sky：手冊寫得很明白，它在第 2 步建立，之後每一步都會用到一次，分錯後面全錯。
 * 其餘五條灰階（A-1：平等的項目不要一項一色）。
 */
const JUDGEMENTS = [
  {
    q: '這個效果需不需要 3D 繪圖',
    by: '要不要共用同一台相機，或者要不要逐個像素算',
    cost: '為了一個淡入淡出，多載約 750KB',
  },
  {
    q: '這個效果會不會自己停',
    by: '跑完就結束，還是使用者動多少它就變多少',
    cost: '畫面延遲又抖動，而且不會有任何錯誤訊息',
    key: true,
  },
  {
    q: '顏色要用挑的還是算的',
    by: '這個值有沒有辦法從素材本身推出來',
    cost: '配色跟照片沒有關係，貼到任何照片上都一樣',
  },
  {
    q: '這個轉場要自己寫還是用套件',
    by: '起點和終點在不在同一套座標系統',
    cost: '花三天寫一個已經有人寫好的東西',
  },
  {
    q: '這項優化值不值得做',
    by: '量過了嗎',
    cost: '讓程式碼變難讀，但完全沒有變快',
  },
  {
    q: '這個外部服務可不可以留到正式環境',
    by: '它掛掉的時候，你的畫面剩下什麼',
    cost: '別人的服務掛掉，你的網站跟著掛',
  },
];

export default function SlideCase2Judgements() {
  return (
    <SlideLayout
      title="這件事該交給誰做：案例二的六個判斷"
      subtitle="Case 02 · AI 幫不了你的那幾個決定"
      icon={Scale}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-2">
              案例一問的是
            </div>
            <p className="text-slate-300 text-base leading-relaxed">這個東西該不該存在</p>
          </div>
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
              這個案例問的是
            </div>
            <p className="text-slate-100 text-base font-bold leading-relaxed">這件事該交給誰做</p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            技術操作 AI 會幫你做。下面這六個它幫不了你，因為它們要的是你對這個作品的理解。
          </p>
          <ul className="space-y-2">
            {JUDGEMENTS.map((j) => (
              <li
                key={j.q}
                className={`rounded-xl border px-4 py-3 ${
                  j.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <span className={`text-sm font-bold ${j.key ? 'text-sky-200' : 'text-slate-100'}`}>
                    {j.q}
                  </span>
                  {j.key && <span className="font-mono text-xs text-sky-400 shrink-0">後面每一步都會再用一次</span>}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-0.5">判斷依據：{j.by}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-1 border-t border-slate-800 pt-1.5">
                  判斷錯的代價：{j.cost}
                </p>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="focus" label="六條裡先記住第二條" stepIndex={3}>
          它在第 2 步就要定下來，之後每做一個效果都會再用一次。
          <strong className="text-slate-100">這裡分錯，後面每一步都會跟著錯，而且畫面不會報錯給你看。</strong>
        </Callout>

      </div>
    </SlideLayout>
  );
}
