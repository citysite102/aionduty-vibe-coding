import { Package } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/** 正反對照，所以 emerald 與 rose 各佔一邊，這一頁只有這兩個色相 */
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
    why: '補出來的動畫會互相疊加、互相覆寫，而且每一幀都要重算一次',
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
    <SlideLayout title="選什麼套件，以及為什麼還是要看得懂" subtitle="Case 02 · 它替你寫掉的與沒替你解決的" icon={Package}>
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-4">
            這張表換一個專案還是用得到
          </h3>
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

        <Callout tone="good" label="還有一列不在表上" stepIndex={2}>
          一個效果不用任何套件也做得到的時候，多引入一個套件的代價是：使用者要多載一次，你要多維護一個版本號。
          <strong className="text-slate-100">案例一整個網站沒有用任何套件</strong>，品質並不比這個案例低。
        </Callout>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">「反正 AI 會寫，我還需要懂嗎」</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            這個作品裡有八個地方，不懂就會卡住，而且卡住的時候你連問題該怎麼描述都不知道。四個例子：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {SYMPTOMS.map((s) => (
              <div key={s.what} className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <div className="text-slate-100 text-sm font-bold leading-snug">{s.what}</div>
                <p className="text-slate-300 text-sm leading-relaxed mt-1.5">真正的原因：{s.cause}</p>
                <p className="text-slate-500 text-sm leading-relaxed mt-1">不懂的話會這樣處理：{s.guess}</p>
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
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
