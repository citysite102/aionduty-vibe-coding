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
const LAYERS = [
  { n: '3', t: '水面與光線' },
  { n: '4', t: '漣漪與船的浮力' },
  { n: '5', t: '白天、黃昏、夜晚與燈籠' },
  { n: '6', t: '把柱子、木樁、繪馬架接上' },
  { n: '9', t: '風、花瓣、樹與燈火' },
  { n: '10', t: '時段轉場與鏡頭' },
  { n: '12', t: '三種船、雷雨與環境音' },
  { n: '13', t: '背景音樂' },
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
    cap: '階段 1 做完：神社落到海上',
    sub: '海是平的，三艘船長得一模一樣',
  },
  {
    src: finalShot,
    alt: '階段 16 的成品：水面有浪的層次與陰影，三艘船各有船型，介面換成紙卡樣式',
    cap: '階段 16：水面有層次了',
    sub: '浪分三道、船各有船型、介面重做過',
  },
];

/** 四處被退。左邊是畫面上看到的樣子，右邊是兩邊各寫的數字，兩個都要有：
 *  學員沒有要讀程式，他要能在自己的畫面上認出同一種毛病；而數字是這件事的證據。
 *  2026-10-23 跟著手冊階段 6 的判斷二那張表改，數字照抄，不要自己換算。 */
const JOINTS = [
  { part: '本殿後排柱', bad: '柱子頂端和屋頂之間有空隙', num: '柱子一樣高，屋頂底面是曲面，後排空出 0.25' },
  { part: '碼頭木樁', bad: '木樁站在板子外側', num: '木樁在 ±1.5，碼頭板只到 ±1.3' },
  { part: '繪馬架', bad: '轉 45° 之後穿出平台邊緣', num: '前柱在 z 5.55，砂利邊緣只到 ±5.4' },
  { part: '屋形船的篷', bad: '柱頂懸在篷裡面，沒頂到', num: '柱子在 z ±0.5，篷的半徑是 0.66' },
];

export default function SlideCase4Layers() {
  return (
    <SlideLayout
      title="一層一層疊上去：水面、浮力與接合處"
      subtitle="Case 04 · 從一塊浮空的石台到會呼吸的海"
      icon={Layers}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {SHOTS.map((s) => (
            <figure key={s.cap} className="space-y-2">
              <img
                src={s.src}
                alt={s.alt}
                className="aspect-video w-full rounded-xl border border-slate-800 object-cover"
              />
              <figcaption>
                <div className="text-slate-100 text-sm font-bold">{s.cap}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{s.sub}</div>
              </figcaption>
            </figure>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">中間這幾層，每一層都是單獨一個階段</h3>
          <p className="text-sm text-slate-400 mb-4">
            一句「做得精緻一點」換不到最後那張的水面。每一層都先寫清楚要什麼、做完怎麼驗，下一層才疊上去。
          </p>
          <ol className="flex flex-wrap gap-2">
            {LAYERS.map((l) => (
              <li
                key={l.n}
                className="flex items-baseline gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5"
              >
                <span className="font-mono text-xs text-slate-500">階段 {l.n}</span>
                <span className="text-slate-300 text-sm">{l.t}</span>
              </li>
            ))}
          </ol>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            <h3 className="text-base font-bold text-sky-200 mb-1">柱子的高度用屋頂算，木樁的位置用碼頭板算</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              木樁寫在 ±1.5，碼頭板只到 ±1.3。兩個數字是分開寫上去的，看起來差不多，
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
            <p className="text-slate-300 text-sm leading-relaxed mt-3 border-t border-sky-500/20 pt-2.5">
              改法每次都一樣：讓其中一邊用對方的數字去算，例如後排柱子的高度用屋頂的曲線算。
              之後把屋頂改高，柱子會自己跟著長。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              到第四處（船篷）才把這條寫進 <code className="font-mono text-orange-300">CLAUDE.md</code>。
              前三處都只修了那一處，木樁和繪馬架還是各寫各的數字。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-base font-bold text-slate-100 mb-1">改完之後，拿什麼證明其他東西沒變</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">
              這三樣在第二個階段就先建好，後面每一次修改各用一次。沒有它們，你只能說「看起來沒壞」。
            </p>
            <ul className="space-y-2">
              {[
                [
                  '逐像素比對',
                  '同樣的角度與時間各截一張，算出有幾個像素不一樣。開始改之前，先用沒改過的版本截兩張互相比，確認它是 0%：畫面本來就截得出一模一樣的結果，之後的差異才算是你改出來的。比對的腳本是它寫的，你只看那個百分比',
                ],
                ['Node 測試', '浮力、選曲這種純算數的部分寫成測試，不用開瀏覽器就跑得完'],
                ['接合處的特寫截圖', '全景看不出 0.2 單位的縫，要把鏡頭推到柱子和屋頂交界的地方'],
              ].map(([k, v]) => (
                <li key={k} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5">
                  <div className="text-slate-100 text-sm font-bold">{k}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{v}</div>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedBlock>

        <Callout tone="focus" label="你講得出症狀就夠了，數字交給它去查" stepIndex={4}>
          盤點那一步，Claude 在程式裡找到三個錯。程式你讀不出來，但每一個在畫面上都有對應的症狀：
          <span className="mt-2 block space-y-1">
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
          <span className="mt-2 block">
            所以你的工作是把症狀講準：什麼時候出現、哪個角度、看起來怎麼不對，
            再跟它討論可以怎麼修。原因和解法由它查、它提，你從它給的方案裡挑一個。
            每做完一段，這一句可以直接貼過去：
            <span className="mt-1.5 block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-300">
              請列出這次改動裡，我在畫面上看不出來、但會出錯的地方，以及我要怎麼試。
            </span>
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
