import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import keyVisual from '../../assets/cases/case-04-wishes-00-keyvisual.jpg';
import blockShot from '../../assets/cases/case-04-wishes-01-block.jpg';
import seaShot from '../../assets/cases/case-04-wishes-02-sea.jpg';
import finalShot from '../../assets/cases/case-04-wishes-hero.jpg';

/**
 * 案例四的第二頁：同一個專案的三個時間點，以及中間那十幾個階段在做什麼。
 * 2026-10-23 新增，資料來源 case-04-wishes.pdf 的階段 1（三張狀態圖）、階段 6
 * （接合處、四次被退的零件）、階段 2 與 8（逐像素比對、Node 測試）。
 *
 * 後三張圖是從那份 PDF 第 22、23 頁抽出來的，順序就是時間順序，不要重排。
 *
 * 第一張是插畫，2026-10-23 講師提供，**做完之後才畫的宣傳圖，不是開工前的草圖**。
 * 所以它的說明寫「這個作品想給人的感覺」，不給時間點：排在時間順序前面又標成階段幾，
 * 會讀成「先畫了草圖才開工」，那是假的。
 * 中間那條階段帶只寫「這一層加了什麼」，不寫階段編號以外的細節，
 * 細節在手冊裡，這一頁要讓人看出的是「精緻是疊出來的，不是一次下對指令」。
 *
 * 左下那塊是這一頁真正的重點（標 sky）：柱子的高度用屋頂算，木樁的位置用碼頭板算。
 * 2026-10-23 手冊把「相接的零件從同一組數字算出來」整組換成實際的物件與數字（它的規範 4c：
 * 不要用沒有指到東西的說法），這一頁跟著換，數字照抄手冊階段 6 判斷二那張表。
 *
 * 最後那個 Callout 2026-10-23 改過兩輪。原本只列三個肉眼看不出來的錯，學員會問
 * 「那我該怎麼辦」；第一版的答案寫成「把它列出來的問題讀完」，方向是錯的，
 * **這門課一半的學員不讀程式，也不該叫他去讀**。現在三個錯各配一個畫面上的症狀，
 * 做法寫成「把症狀講準，再跟它討論解法」。症狀與原因的對應取自手冊階段 2 那張表。
 * 四個被退的例子照手冊原文列，它們是同一個錯犯四次，不要縮成一個例子。
 */
/**
 * 2026-10-31（講師：投影片不要寫手冊裡的階段幾或步驟幾）拿掉每一層前面的「階段 N」。
 * 那個編號對沒打開手冊的人等於空白，而且手冊改版就會對不上。
 * **順序不要重排**，由左而右就是疊上去的先後，這一頁的論點靠的是順序不是編號。
 */
const LAYERS = [
  '水面與光線',
  '漣漪與船的浮力',
  '白天、黃昏、夜晚與燈籠',
  '把柱子、木樁、繪馬架接上',
  '風、花瓣、樹與燈火',
  '時段轉場與鏡頭',
  '三種船、雷雨與環境音',
  '背景音樂',
];

const SHOTS = [
  {
    src: keyVisual,
    alt: '海上許願神社的宣傳插畫：黃昏的海上一座神社，紅色鳥居立在水裡，櫻花樹與一艘屋形船，遠處是山與落日',
    cap: '這個作品想給人的感覺',
    sub: '做完之後才畫的插畫，程式畫不出這一張',
  },
  {
    src: blockShot,
    alt: '第一版的浮空石台：方形石台浮在米色背景上，屋頂、柱子、石頭都是單色，沒有海',
    cap: '一開始：一塊浮空的石台',
    sub: '單色、沒有海、沒有任何東西在動',
  },
  {
    src: seaShot,
    alt: '第一版海上神社：海鋪滿畫面，鳥居柱腳有白浪，三艘船長得一樣，樹只有一棵松',
    cap: '做完第一輪：神社落到海上',
    sub: '海是平的，三艘船長得一模一樣',
  },
  {
    src: finalShot,
    alt: '最後的成品：水面有浪的層次與陰影，三艘船各有船型，介面換成紙卡樣式',
    cap: '最後的版本：水面有層次了',
    sub: '浪分三道、船各有船型、介面重做過',
  },
];

/**
 * 這一塊的第三段換過兩次，兩次都記在這裡。
 * 原本是一句抽象的 Prompt（「請列出我在畫面上看不出來、但會出錯的地方」），
 * 講師問「什麼叫畫面上看不出來但會出錯」，所以改成寫死三類的版本。
 * 2026-10-31 講師再退一次：**「有需要每次都問這個嗎？太麻煩了，而且我不一定每次都有兩個零件，
 * 這是不是太刻意，或者這種狀況就應該加到 Hook？」** 他是對的，而且這門課自己就是這樣教的
 * （章節五：寫成文字每一次都要它重新判斷，寫成程式每一次都照同一段跑）。
 * 現在第三段講的是怎麼讓這件事不用每次用問的：盤點那一次列一遍、會重複驗的寫成測試、
 * 不能破的寫成 Hook。
 * **不要再放一句「每改完一段貼這個」的 Prompt。**
 */
/** 四處被退。左邊是畫面上看到的樣子，右邊是兩邊各寫的數字，兩個都要有：
 *  學員沒有要讀程式，他要能在自己的畫面上認出同一種毛病；而數字是這件事的證據。
 *  2026-10-23 跟著手冊階段 6 的判斷二那張表改，數字照抄，不要自己換算。 */
const JOINTS = [
  { part: '本殿後排柱', bad: '柱子頂端和屋頂之間有空隙', num: '柱子一樣高，屋頂底面是曲面，後排空出 0.25' },
  { part: '碼頭木樁', bad: '木樁站在板子外側', num: '木樁在 ±1.5，碼頭板只到 ±1.3' },
  { part: '繪馬架', bad: '轉 45° 之後穿出平台邊緣', num: '前柱在 z 5.55，砂利邊緣只到 ±5.4' },
  { part: '屋形船的篷', bad: '柱頂懸在篷裡面，沒頂到', num: '柱子在 z ±0.5，篷的半徑是 0.66' },
];

/** 改完之後拿什麼證明其他東西沒變。逐像素比對那一條有兩個細項，另外兩樣各一行。 */
const PROOFS: { k: string; v: string; more?: string[] }[] = [
  {
    k: '逐像素比對',
    v: '同樣的角度與時間各截一張，算出有幾個像素不一樣。',
    more: [
      '開始改之前，先用沒改過的版本截兩張互相比，確認它是 0%：畫面本來就截得出一模一樣的結果，之後的差異才算是你改出來的',
      '比對的腳本是它寫的，你只看那個百分比',
    ],
  },
  { k: '單元測試', v: '浮力、選曲這種純算數的部分各寫一支單元測試，用 Node 跑，不用開瀏覽器。' },
  { k: '接合處的特寫截圖', v: '左邊那四處被退的縫就是這樣看出來的。全景看不出 0.2 單位的差距，鏡頭要推到柱子和屋頂交界的地方才看得見。' },
];

export default function SlideCase4Layers() {
  return (
    <SlideLayout
      title="水面、浮力與接合處"
      subtitle="Case 04 · 從一塊浮空的石台到會呼吸的海"
      icon={Layers}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        {/* 2026-10-31（講師）四張從一排改成 2×2。一排四張時每一張只有約 270px 寬，
            水面的層次、船型、介面的差別全部看不出來，而這一頁的論點就是靠那些差別。 */}
        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SHOTS.map((s) => (
            <figure key={s.cap} className="space-y-2">
              <img
                src={s.src}
                alt={s.alt}
                className="aspect-video w-full rounded-xl border border-slate-800 object-cover"
              />
              <figcaption>
                <div className="text-slate-100 text-base font-bold">{s.cap}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{s.sub}</div>
              </figcaption>
            </figure>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">中間這幾層，每一層都是單獨一個階段</h3>
          <p className="text-sm text-slate-400 mb-4">
            一句「做得精緻一點」換不到最後那張的水面。每一層都先寫清楚要什麼、做完怎麼驗，下一層才疊上去。
          </p>
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
            {LAYERS.map((l, i) => (
              <li key={l} className="flex items-center gap-1">
                <span className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-slate-300 text-sm">
                  {l}
                </span>
                {i < LAYERS.length - 1 && (
                  <span aria-hidden="true" className="text-slate-700">›</span>
                )}
              </li>
            ))}
          </ol>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            {/*
              2026-10-31（講師：同學會困惑為什麼突然講到這個）補第一句。前面講的是
              「一層一層疊」，接著跳到座標數字，中間少了那個接點：每疊一層就要把新零件
              接到舊零件上，而接合處正是最常出錯、全景又看不出來的地方。
              **這一句不要刪**，少了它這張卡會變成一個孤立的 3D 技術問題。
            */}
            <h3 className="text-base font-bold text-sky-200 mb-1">每疊一層，就多一個接合處會出錯</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              疊上去的零件要跟底下那一層接在一起：柱子要頂到屋頂、木樁要站在碼頭板上。
              兩邊的位置如果是各寫各的數字，就會差一點點。木樁寫在 ±1.5，碼頭板只到 ±1.3，
              <strong className="text-slate-100">畫面上就是木樁站在板子外面，頂端沒碰到板子</strong>。
              同一種毛病在這個案例出現四處：
            </p>
            <ul className="space-y-1.5">
              {JOINTS.map((j) => (
                <li key={j.part} className="text-sm leading-relaxed">
                  <span className="text-slate-200">{j.part}</span>
                  <span className="text-slate-400">：{j.bad}</span>
                  <span className="block text-slate-500">{j.num}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1.5 border-t border-sky-500/20 pt-2.5">
              <li className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                <span className="w-14 shrink-0 font-bold text-slate-200">改法</span>
                <span className="flex-1 min-w-0 text-slate-300">
                  讓其中一邊用對方的數字去算，例如後排柱子的高度用屋頂的曲線算。之後把屋頂改高，柱子會自己跟著長。
                </span>
              </li>
              <li className="flex flex-wrap items-baseline gap-x-2 text-sm leading-relaxed">
                <span className="w-14 shrink-0 font-bold text-slate-200">寫進手冊</span>
                <span className="flex-1 min-w-0 text-slate-400">
                  到第四處（船篷）才把這條寫進{' '}
                  <code className="font-mono text-orange-300">CLAUDE.md</code>
                  。前三處都只修了那一處，木樁和繪馬架還是各寫各的數字。
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-base font-bold text-slate-100 mb-1">改完之後，拿什麼證明其他東西沒變</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              這個畫面每一秒重畫六十次，改壞了你看一眼看不出來，
              <strong className="text-slate-200">只能說「看起來沒壞」</strong>
              。所以要有三樣東西替你看：
            </p>
            {/* 2026-10-31 逐像素比對原本是一條六十多字的長句，把「怎麼做」「開工前要先校一次」
                「誰寫腳本」三件黏在一起。改成主句加兩條細項，另外兩樣維持一行。

                2026-11-01（講師：這句很抽象）開頭那一段重寫。原本是「底下三樣在開始改畫面之前
                就先建好，後面每一次修改各用一次。一樣都沒建的話⋯」，問題是它在**還沒說是哪三樣**
                之前就先講「三樣」「建好」「各用一次」，讀者沒有東西可以掛。
                現在第一句講那個撐不住的狀況（畫面每秒重畫六十次，看一眼看不出來），
                「什麼時候建、多久用一次」本來降到清單底下，2026-11-01 講師問「這是什麼意思」，
                整句刪掉：那件事清單裡已經有更具體的版本（逐像素比對那一條的第一個細項
                「開始改之前，先用沒改過的版本截兩張互相比」就是「先建好再開始改」）。
                **不要再補一句概括它。** */}
            <ul className="space-y-2">
              {PROOFS.map((p) => (
                <li key={p.k} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5">
                  <div className="text-slate-100 text-sm font-bold">{p.k}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{p.v}</div>
                  {p.more && (
                    <ul className="mt-1 space-y-0.5">
                      {p.more.map((m) => (
                        <li key={m} className="flex gap-2 text-slate-500 text-sm leading-relaxed">
                          <span className="shrink-0 text-slate-700">・</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedBlock>

        {/*
          2026-10-31（講師：教學邏輯很混亂，單點式的說明要清楚區隔開來並說明在強調什麼）
          整塊重排。原本三件事（症狀對照、分工、可貼的 Prompt）連在一起沒有分隔，
          讀者看不出哪一段在回答什麼。現在拆成三段，每一段上面給一行小標，
          而且開場先把這一塊要強調的那一句講出來（你不用讀程式碼也驗得動）。
          **三段的順序不要換**：先證明症狀看得見，才談得上分工，最後才是那句話怎麼講。
          2026-10-31（講師：「不合理開工前」）第一句改掉。原本寫「開工前先請 Claude
          把現有的程式讀一遍」，但開工前手上哪來的程式。**不要再寫成「開工前」。**
          2026-10-31（講師：起點並不是一個完整的專案）同一句再改一次。上一版寫成
          「這個案例的起點是一份已經做完的成品」，那也不對：手冊寫的起點是「一個空資料夾，
          以及你在階段 1 看過的成品」，而那一份成品是下載下來看目標用的，程式不是學員的。
          三個錯是 Claude 在**他自己做出來的第一版**裡找到的，時間點是盤點、寫規格那一步
          （手冊：「寫文件時，Claude 在程式裡找到三個畫面上看不太出來的錯」）。
          **不要再寫成「起點是一份做完的成品」。**
        */}
        <Callout tone="focus" label="不會讀程式碼，一樣驗得動" stepIndex={4}>
          你自己做出第一版之後，請 Claude 盤點現況、寫成規格。它逐行讀你這一份程式的時候，
          會順手列出有問題的地方，這一次列出三個（你的版本不會剛好一樣）。
          <strong className="text-slate-100">每一個你都讀不出來，但畫面上都有對應的症狀。</strong>

          <span className="mt-3 block border-t border-sky-500/20 pt-2.5">
            <span className="mb-1.5 block text-sm font-bold text-sky-300">
              一　程式裡的錯，在畫面上長什麼樣
            </span>
            <span className="block space-y-1">
              {[
                ['浪看久了像在跳針', '三道浪的速度都是同一個數的倍數，整片海每 62.8 秒完整重複一次'],
                ['浪把船頭抬起來時，船頭反而往下壓', '俯仰的正負號寫反了'],
                ['同一個畫面在別台電腦上快慢不一樣', '好幾段過渡寫成「每一幀乘固定比例」'],
              ].map(([sym, why]) => (
                <span key={sym} className="block">
                  <strong className="text-slate-100">{sym}</strong>
                  <span className="text-slate-400">　←　{why}</span>
                </span>
              ))}
            </span>
          </span>

          <span className="mt-3 block border-t border-sky-500/20 pt-2.5">
            <span className="mb-1.5 block text-sm font-bold text-sky-300">
              二　所以這件事的分工是
            </span>
            <span className="block space-y-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-20 shrink-0 font-bold text-slate-100">你做的</span>
                <span className="flex-1 min-w-0">把症狀講準：什麼時候出現、哪個角度、看起來怎麼不對。</span>
              </span>
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-20 shrink-0 font-bold text-slate-100">它做的</span>
                <span className="flex-1 min-w-0 text-slate-400">查原因、提幾個修法，你從裡面挑一個。</span>
              </span>
            </span>
          </span>

          <span className="mt-3 block border-t border-sky-500/20 pt-2.5">
            <span className="mb-1.5 block text-sm font-bold text-sky-300">
              三　這一類檢查不要每次用問的
            </span>
            <span className="block space-y-1">
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-24 shrink-0 font-bold text-slate-100">盤點那一次</span>
                <span className="flex-1 min-w-0">請它把看不出來的問題列一遍，這個案例的三個就是那時候抓到的。</span>
              </span>
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-24 shrink-0 font-bold text-slate-100">會重複驗的</span>
                <span className="flex-1 min-w-0 text-slate-400">浮力、選曲這種算得出對錯的，寫成測試，改完先跑它。</span>
              </span>
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="w-24 shrink-0 font-bold text-slate-100">不能破的</span>
                <span className="flex-1 min-w-0 text-slate-400">寫成 Hook，讓程式去擋。寫成一句話，每一次都要它重新判斷一遍。</span>
              </span>
            </span>
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
