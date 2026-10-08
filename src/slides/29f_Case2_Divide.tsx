import { Split } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁是成對對照：交給套件（sky）與自己算（indigo）是同一個判斷的兩邊，
 * 所以合計算一種強調色，加上下面那個 warn 剛好兩種（A-1）。
 *
 * 「離散／連續」是案例二手冊的用語，但它是第一次出現的抽象名詞，
 * 拿它當標題或當卡片的第一行，沒學過的人第一眼就卡住。
 * 所以第一眼一律給動作（交給套件／自己算），名詞降級成卡片最後一行的註記。
 *
 * 2026-10-06 的教學模擬：兩位沒有程式背景的模擬學員都在這一頁掉下去，兩個都指向同一個字,
 * 「套件」。它在單元 2-2 用一句話解釋過（別人寫好、拿來就能用的現成零件），但那是六章以前，
 * 而這一整頁的題目架在它上面。所以左欄那一行補回那句定義。
 * **這一句不要再刪掉**，刪了這一頁對沒有背景的人就只剩兩個不知道在比什麼的欄位。
 *
 * 2026-10-06 第二輪模擬之後整頁重新架過。兩輪、兩位學員，這一頁都是唯一或共同的「沒懂」，
 * 而且兩位的說法一樣：「規則我唸得出來，但換一個新效果我分不出邊」。那就是觀念沒進去。
 *
 * 病根不是名詞不夠，是**軸標錯了**。原本左欄寫「有明確的開始和結束」、右欄寫「每一幀都在變」，
 * 學員立刻反問「一個轉場也是一直在變啊，為什麼互斥」,她是對的。轉場確實一直在變，
 * 所以「在不在變」根本分不出兩邊，而右欄把它當第一句，等於主動把人推進那個誤解。
 *
 * 真正的分界是有沒有終點，所以兩欄的第一句改成「它自己會停」與「它不會自己停」，
 * 並且在最上面先用電梯按鈕與音量旋鈕示範一次,那兩個不用懂網頁也驗得了，學員才有辦法自己練。
 * 「幀」與「離散／連續」降級成註記。**不要再把「每一幀都在變」拉回第一句。**
 */
/**
 * 不用懂網頁也驗得了的錨點。模擬學員兩輪都說「規則我唸得出來，但換一個新效果我分不出邊」,
 * 那是觀念沒進去的定義。病根是原本的軸寫成「有沒有在變」，而學員立刻反問
 * 「一個轉場也是一直在變啊」,她是對的，轉場確實一直在變。
 * 真正的分界是**有沒有終點**，所以軸改成「它會不會自己停」，並且先用兩個日常物件示範一次。
 */
const ANCHORS = [
  {
    thing: '電梯按鈕',
    why: '按一下，門自己關、自己開，中間你不用管。',
    side: '它自己會停',
  },
  {
    thing: '音量旋鈕',
    why: '你轉到哪就是多大聲，沒有「轉完」這件事。',
    side: '它不會自己停',
  },
];

/** 五個效果。2026-10-08（講師）第三輪：講師看完說「看不懂現在的案例和說明」，
 *  病根跟前兩輪不同，不是軸錯了，是**清單裡有東西套不進那個軸**。
 *
 *  原本第一條是「三種裝置的滾動單位換算成同一個數字」。那不是一個看得見的效果，
 *  所以「它會不會自己停」這一題根本問不下去，而它偏偏排在第一個，
 *  等於上面才剛教完的規則，第一個例子就用不了。它現在移到清單外面，自成一句註記。
 *  原本第五條的 who 寫「自己算，交給顯示卡」，那是第三個分類，把兩邊的模型打破了，
 *  現在顯示卡降級成那一條的註記。
 *
 *  **每一條都要能被「它會不會自己停」判定，而且要是學員在畫面上看得到的東西。**
 *  新增效果之前先把這兩件事問一次，問不過就不要放進這個清單。
 *  `stop` 欄是把判定過程印出來，不要只印結論，學員要看到規則被套用五次才學得起來。 */
const JOBS = [
  {
    task: '點一張照片，它飛到面板上',
    stop: '飛完就停在那裡',
    side: '離散',
    who: '交給套件',
    why: '有起點也有終點，中間怎麼走套件替你算。',
  },
  {
    task: '開場：背景先壓暗，文字再一句一句進來',
    stop: '跑完就結束',
    side: '離散',
    who: '交給套件',
    why: '先後順序與各自的長度是固定的，自己寫等於再做一條時間軸出來。',
  },
  {
    task: '手放開之後，捲動慢慢減速停下來',
    stop: '停在哪裡由使用者滑多快決定',
    side: '連續',
    who: '自己算',
    why: '沒有一個固定的終點可以給套件，它只能自己補，補出來會互相打架。',
  },
  {
    task: '滑得越快，照片彎得越明顯',
    stop: '手不動它就不變，沒有「彎完」',
    side: '連續',
    who: '自己算',
    why: '使用者動多少就變多少，一行公式算得出來。',
  },
  {
    task: '背景顏色隨著捲動一路混過去',
    stop: '捲到哪就是哪個顏色，沒有終點',
    side: '連續',
    who: '自己算',
    why: '畫面上每一個點各自算一次，這件事交給顯示卡做，它本來就在做這個。',
  },
];

export default function SlideCase2Divide() {
  return (
    <SlideLayout title="哪些效果交給套件，哪些自己算" subtitle="Case 02 · 進階的動畫效果怎麼做出來" icon={Split}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">先用兩個跟網頁無關的東西分一次</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            這一頁的判斷不用懂程式也做得了。問題只有一句：
            <span className="text-slate-200">按下去之後，它會不會自己停。</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ANCHORS.map((a) => (
              <div key={a.thing} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="text-slate-100 text-sm font-bold mb-1">{a.thing}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{a.why}</p>
                <p className="mt-2 border-t border-slate-800 pt-2 text-slate-300 text-sm">{a.side}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-sky-400 mb-2">
              交給現成的套件
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它自己會停</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              一按下去就開始跑，跑完就結束，你不用管中間。
              點一下展開、跑一段轉場、開場那幾樣東西的先後順序。
              這種效果別人已經寫好了，而且替你把不同裝置的差異都處理完了。
            </p>
            <p className="mt-3 border-t border-sky-500/20 pt-3 text-slate-500 text-sm">
              套件是別人寫好、拿來就能用的現成零件。手冊裡把這一邊叫做「離散」
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5">
            <div className="font-mono text-xs uppercase tracking-widest text-indigo-400 mb-2">
              自己算
            </div>
            <p className="text-slate-100 text-base font-bold mb-2">它不會自己停</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              沒有「跑完」這回事，使用者動多少它就變多少。
              手放開之後捲動慢慢減速、滑得越快照片彎得越明顯、遠近兩層跑的速度不一樣。
              這種值一行公式就算得出來，交給套件反而會打架。
            </p>
            <p className="mt-3 border-t border-indigo-500/20 pt-3 text-slate-500 text-sm">
              手冊裡把這一邊叫做「連續」
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">這個作品裡的五個效果，各自是怎麼做出來的</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            每一個都先問同一句：它會不會自己停。
          </p>
          <ul className="space-y-2">
            {JOBS.map((j) => {
              const isDiscrete = j.side === '離散';
              return (
                <li
                  key={j.task}
                  className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-4 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-slate-100 text-sm font-bold">{j.task}</div>
                    <p className="mt-1 text-sm">
                      <span className="text-slate-500">會自己停嗎？　</span>
                      <span className={isDiscrete ? 'text-sky-300' : 'text-indigo-300'}>
                        {isDiscrete ? '會，' : '不會，'}{j.stop}
                      </span>
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed mt-0.5">{j.why}</p>
                  </div>
                  <div
                    className={`shrink-0 self-start rounded-lg border px-3 py-1.5 text-xs font-mono ${
                      isDiscrete
                        ? 'border-sky-500/30 bg-sky-500/10 text-sky-300'
                        : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                    }`}
                  >
                    {j.who}
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            還有一件事也交給套件，但它不是效果，所以上面那一題問不下去：
            <strong className="text-slate-200">滑鼠滾一格、觸控板推一下、手指滑一段，要換算成同一個數字</strong>。
            三種裝置送出來的單位差太多，自己寫測不完。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" label="分錯邊的代價" stepIndex={4}>
          這種不會自己停的值交給套件去補，那些補出來的動畫會互相疊加、互相覆寫，畫面既延遲又會抖，
          <strong className="text-slate-100">而且不會有任何錯誤訊息</strong>，你只知道「怪怪的」。
          這個判斷在手冊的第二步就要定下來，後面每做一個效果都會再用一次。
        </Callout>

      </div>
    </SlideLayout>
  );
}
