import { Package, Eye, Wrench, CircleX } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 正反對照，所以 emerald 與 rose 各佔一邊，合計算一種強調色（A-1）。
 * 2026-10-08（講師說文字量過多）症狀那四格改成 icon 標示三個角色：你看到的（灰）、
 * 真正的原因（sky）、不懂的話會這樣處理（灰）。標籤從每一格裡抽出來，在清單上面只講一次，
 * 原本「真正的原因：」「不懂的話會這樣處理：」各重複四次。
 * 所以這一頁現在是 emerald／rose 一組加 sky，剛好兩種，**不要再加第三種**。
 *
 * 2026-10-06 上下半對調。原本第一塊是那張五列選型表，但教學模擬裡兩位沒有程式背景的
 * 模擬學員都整張放棄（「連『想做什麼』那一欄都讀不懂」），而兩位都說底下那半段
 * （不懂也用得上的那句問法）是整頁最大的收穫。所以先給做得到的動作，再把表當佐證。
 * **不要再對調回去**，表放前面的時候，沒有背景的人在第一塊就下車了。
 */
const PICKS = [
  {
    want: '元素移動、縮放、淡入淡出',
    yes: '瀏覽器原生的樣式',
    no: '為了這個載入動畫或 3D 套件',
    why: '瀏覽器本來就在做這件事，不必為它多載一個套件',
  },
  {
    want: '幾個元素有先後順序的編排',
    yes: '動畫套件的時間軸',
    no: '自己寫計時器',
    why: '暫停、倒轉、跳到某一秒，自己寫等於把它重做一遍',
  },
  {
    want: '版面 A 變成版面 B 的轉場',
    yes: '專門做這件事的套件',
    no: '自己算位置，一格一格把它挪過去',
    why: '終點由樣式決定，動畫開始之前你不知道那個數字是多少',
  },
  {
    want: '阻尼、視差、速度這種每一幀都在變的值',
    yes: '自己寫一行公式',
    no: '交給套件去補中間的過程',
    why: '上一頁那條：補出來的動畫會互相打架',
  },
  {
    want: '多個物件共用同一台相機，或是一個一個點去算的效果',
    yes: '3D 套件與顯示卡',
    no: '用一般網頁元素硬做',
    why: '網頁的透視是各算各的，物件一多，記憶體也吃不消',
  },
];

const SYMPTOMS = [
  {
    what: '觸控板很順，換成滑鼠一格跳三張',
    cause: '滾輪事件的單位在不同裝置上不一致',
    guess: '「在我電腦上是好的」',
  },
  {
    what: '手機上滑一下就彈出面板',
    cause: '滑動的過程也會觸發「按下」',
    guess: '桌機測一百次都測不出來',
  },
  {
    what: '照片交錯的地方出現方形破洞',
    cause: '半透明的東西寫了深度',
    guess: '以為是圖檔壞了，換一張再試',
  },
  {
    what: '手機發燙、畫面掉格',
    cause: '解析度沒有設上限、圖片沒有壓過',
    guess: '「這種效果本來就很吃效能」',
  },
];

export default function SlideCase2Cost() {
  return (
    <SlideLayout title="為什麼還是要看得懂，以及選什麼套件" subtitle="Case 02 · 它替你寫掉的與沒替你解決的" icon={Package}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">「反正 AI 會寫，我還需要懂嗎」</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            這個作品裡有好幾個地方，不懂就會卡住，而且卡住的時候你連問題該怎麼描述都不知道。四個例子：
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mb-2.5 text-slate-500 text-sm">
              <span className="flex items-center gap-1.5"><Eye aria-hidden="true" size={13} /> 你看到的</span>
              <span className="flex items-center gap-1.5"><Wrench aria-hidden="true" size={13} className="text-sky-400" /> 真正的原因</span>
              <span className="flex items-center gap-1.5"><CircleX aria-hidden="true" size={13} /> 不懂的話會這樣處理</span>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {SYMPTOMS.map((s) => (
              <div key={s.what} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1.5">
                <div className="flex items-start gap-2">
                  <Eye aria-hidden="true" size={14} className="text-slate-500 shrink-0 mt-1" />
                  <span className="text-slate-100 text-sm font-bold leading-snug">{s.what}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Wrench aria-hidden="true" size={14} className="text-sky-400 shrink-0 mt-1" />
                  <span className="text-slate-300 text-sm leading-relaxed">{s.cause}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CircleX aria-hidden="true" size={14} className="text-slate-600 shrink-0 mt-1" />
                  <span className="text-slate-500 text-sm leading-relaxed">{s.guess}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            共通點是：這幾項都不是它寫錯了。
            <strong className="text-slate-100">
              每一行單獨看都是對的，組合起來之後，在某個你沒有指定的條件下才出問題。
            </strong>
            而你要指定得出那個條件，前提是你知道它存在。
          </p>
          {/*
            2026-10-04：原本這一頁的結論是對的，但學員拿不走：它說「你要知道有哪些條件存在」，
            卻沒給一個不懂的人取得那份清單的方法。補一句做得到的。
          */}
          <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
            不懂也用得上的做法：動手之前先問它
            <span className="text-slate-200">「這個效果在哪些裝置、哪些操作方式下可能會出問題？列出來，先不要改」</span>。
            它列得出來，那份清單就是你要指定的條件。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-4">
            知道有哪些條件之後，這張表換一個專案還是用得到
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            這張表不用記，也不用看懂每一列在講什麼技術。
            <span className="text-slate-200">它的用途是你跟 AI 討論的時候拿來對一次</span>
            ，問它「這件事你打算用哪一種做法」，答案不在表上就追問為什麼。
          </p>
          <ul className="space-y-3">
            {PICKS.map((p) => (
              <li key={p.want} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="text-slate-100 text-sm font-bold mb-2">{p.want}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <span className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-3 py-1.5 text-emerald-200 text-sm">
                    用：{p.yes}
                  </span>
                  <span className="rounded-lg border border-rose-500/25 bg-rose-500/5 px-3 py-1.5 text-rose-200 text-sm">
                    不要：{p.no}
                  </span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{p.why}</p>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="good" label="還有一列不在表上" stepIndex={3}>
          一個效果不用任何套件也做得到的時候，多引入一個套件的代價是：使用者要多載一次，你要多維護一個版本號。
          <strong className="text-slate-100">案例一整個網站沒有用任何套件</strong>，品質並不比這個案例低。
        </Callout>

      </div>
    </SlideLayout>
  );
}
