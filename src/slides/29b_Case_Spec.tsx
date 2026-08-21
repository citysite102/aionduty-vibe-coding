import { FileText } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 三個案例共用同一份課前作業，所以這兩頁（七塊、驗收條件）掛在案例一的單元裡，
 * 但講的是三個案例都要交的那份規格。
 *
 * 第 3 塊標 sky，其餘七塊灰階：真實素材是唯一一塊 AI 補不出來的，
 * 它決定後面每一步拿得到什麼。平等的項目不要一項一色（A-1）。
 */
const BLOCKS = [
  {
    name: '一句話定義',
    line: '給誰看、什麼東西、要他做什麼',
    pass: '句子裡沒有「優質」「專業」「一站式」這種任何產業都能用的詞',
  },
  {
    name: '不做什麼',
    line: '別人都有、但你這次不要的東西',
    pass: '至少三條，而且你說得出為什麼不要',
  },
  {
    name: '真實素材',
    line: '只有你知道的事實：數字、行話、一句真話、做不到的事',
    pass: '至少十條，其中三條帶數字，至少一條是負面的',
    key: true,
  },
  {
    name: '參考方向',
    line: '三到五張參考圖，每張回答兩件事',
    pass: '每張圖都寫了「喜歡什麼」和「不要它的哪一點」',
  },
  {
    name: '硬性限制',
    line: '技術、瀏覽器、速度、無障礙、語言',
    pass: '每一條都能用工具量。「要跑得快」不算',
  },
  {
    name: '驗收條件',
    line: '把形容詞翻成可以被檢查的句子',
    pass: '每一條都能回答「怎麼證明它過了？」',
  },
  {
    name: '素材清單',
    line: '有哪些照片與內容，以及沒有哪些',
    pass: '明確列出沒有的素材',
  },
];

export default function SlideCaseSpec() {
  return (
    <SlideLayout
      title="一份能用的規格，有七塊"
      subtitle="Spec Writing · 三個案例共用的課前作業"
      icon={FileText}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-3">為什麼這份要你自己寫</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                題材交給 AI 想，你會拿到「關於我們／服務項目／核心優勢／立即聯絡我們」、三欄大數字、圓角按鈕。
                這不是它偷懶，是你沒有給它足夠的資訊，它只能用最常見的網站結構、文案與設計慣例。
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                規格要裝的，是<strong className="text-slate-200">它猜不到的那些事</strong>。
              </p>
            </div>
            <ul className="space-y-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
              {[
                '柴燒的最高溫是 1280°C',
                '開窯前沒有人知道結果',
                '2011 年開始做',
                '手上唯一一張窯場照片，其實是金工工坊',
              ].map((s) => (
                <li key={s} className="text-slate-300 text-sm leading-relaxed">
                  {s}
                </li>
              ))}
              <li className="border-t border-slate-800 pt-2 text-slate-500 text-sm leading-relaxed">
                少了這四句，你會得到一個很乾淨的陶藝模板。
              </li>
            </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BLOCKS.map((b, i) => (
            <div
              key={b.name}
              className={`rounded-xl border p-4 ${
                b.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-xs text-slate-500">{i + 1}</span>
                <h3 className={`text-base font-bold ${b.key ? 'text-sky-200' : 'text-slate-100'}`}>
                  {b.name}
                </h3>
                {b.key && <span className="text-xs text-sky-400">只有這一塊 AI 補不出來</span>}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{b.line}</p>
              <p className="mt-2 border-t border-slate-800 pt-2 text-slate-500 text-sm leading-relaxed">
                及格線：{b.pass}
              </p>
            </div>
          ))}
        </AnimatedBlock>

        <Callout tone="focus" label="七塊裡最花時間的是第 2 塊" stepIndex={3}>
          AI 傾向把它會做的東西都加上去，
          <strong className="text-slate-100">你不寫「不要什麼」，它就會加上去</strong>，所以這一塊比「要做什麼」更該花時間。
          整份一到兩頁就夠，超過三頁通常是在寫作文。
        </Callout>

      </div>
    </SlideLayout>
  );
}
