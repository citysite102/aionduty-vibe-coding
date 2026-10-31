import { Split } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 這一頁是成對對照：交給套件（sky）與自己算（indigo）是同一個判斷的兩邊，
 * 所以合計算一種強調色，加上下面那個 warn 剛好兩種（A-1）。
 *
 * 「離散／連續」是案例二手冊的用語，但它是第一次出現的抽象名詞，
 * 拿它當標題或當卡片的第一行，沒學過的人第一眼就卡住。
 * 所以第一眼一律給動作（交給套件／自己算），名詞降級成卡片最後一行的註記。
 *
 * 2026-10-06 的教學模擬：兩位沒有程式背景的模擬學員都在這一頁掉下去，兩個都指向同一個字,
 * 「套件」。它在單元 2-1 用一句話解釋過（別人寫好、拿來就能用的現成零件），但那是六章以前，
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
 * 真正的分界是有沒有終點，所以兩欄的第一句是「它自己會停」與「它不會自己停」。
 * 「幀」與「離散／連續」降級成註記。**不要再把「每一幀都在變」拉回第一句。**
 *
 * 2026-10-08 到 2026-10-24 最上面有一塊暖身的例子（先是電梯按鈕與音量旋鈕，後來換成
 * 手機上的兩個動作）。講師兩次都說太抽象、讀起來像 AI 寫的，**整塊拿掉了**。
 * 規則本身縮成對照那一塊上面的一句話，練習交給底下那五個效果，它們每一條都印出判定過程。
 * **不要再加暖身的比喻。** 要補強的話，加的是這個作品裡真的看得到的第六個效果，不是另一個日常物件。
 */
/**
 * 這個案例當時真的貼出去的那一則（手冊階段 2-1）。2026-10-24（講師要求）補上投影片，
 * 原本整個單元看得到結論、看不到指令。**照抄手冊原文，只把作品描述縮成一行並加 ⟨⟩**，
 * 手冊自己也寫「只改第一段的作品描述，四個問題與最後那句照貼」。
 *
 * 四個問題正好是這一頁的四個重點：哪些非得用 3D、連續的值誰來算、
 * 只能留一個套件會怎樣、有沒有哪一項其實不需要。改這一頁要回頭看這段還對不對。
 */
const CASE_PROMPT = `我要做一個捲動穿越的 3D 照片藝廊：⟨十張照片沿著深度排開，捲動時鏡頭穿過它們，背景顏色跟著目前的照片改變，點擊照片會展開成全螢幕的資訊面板⟩。

先不要寫任何程式碼。請回答四個問題：

1. 這個需求裡，哪些部分非用 WebGL 不可？哪些部分用 CSS 就夠了？請逐項說明，不要用一句「用 Three.js 比較好」帶過。
2. 捲動的阻尼與速度，應該用動畫套件的補間動畫，還是自己在每一幀的迴圈裡算？兩種做法各自會在什麼情況下出問題？
3. 如果只能引入一個套件，你會選哪一個？捨棄另一個之後，哪一部分的品質會下降、下降多少？
4. 這個需求裡有沒有哪一項，其實不是這個題材需要的？

第 4 點請誠實回答。不要為了讓我開心而說它們都有必要。`;

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

        <AnimatedBlock stepIndex={1} className="space-y-3">
          <p className="text-slate-300 text-base leading-relaxed">
            分邊只問一句：<strong className="text-slate-100">手指放開之後，它會不會自己走完。</strong>
            會，交給現成的套件；不會，使用者動多少它就變多少，自己算。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              套件是別人寫好、拿來就能用的現成零件。這一邊叫做「離散」
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
              這一邊叫做「連續」
            </p>
          </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
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

        <AnimatedBlock stepIndex={3} className="space-y-2">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-base font-bold text-slate-100">這張表是這一則訊息問出來的</h3>
            <p className="text-slate-500 text-sm">把模式切到 Plan，只改 ⟨⟩ 裡的作品描述</p>
          </div>
          <CopyBlock text={CASE_PROMPT} size="xs" note="當時真的貼出去的那一則" />
          <p className="text-slate-400 text-sm leading-relaxed">
            四個問題裡最值錢的是第 4 題。
            <strong className="text-slate-200">你不問，它不會主動說「這一項你其實不需要」</strong>。
          </p>
        </AnimatedBlock>

        <Callout tone="warn" label="分錯邊的代價" stepIndex={4}>
          這種不會自己停的值交給套件去補，那些補出來的動畫會互相疊加、互相覆寫，畫面既延遲又會抖，
          <strong className="text-slate-100">而且不會有任何錯誤訊息</strong>，你只知道「怪怪的」。
          這個判斷要在開始做效果之前就定下來，後面每做一個都會再用一次。
        </Callout>

      </div>
    </SlideLayout>
  );
}
