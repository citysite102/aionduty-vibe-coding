import { FileText, Quote, Ban, Gem, Images, Ruler, CheckCheck, FolderOpen } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CaseHandbook } from '../components/CaseHandbook';

/**
 * 案例一到案例三共用同一份規格，所以這兩頁（七塊、驗收條件）掛在案例一的單元裡，
 * 但講的是那三個案例都要交的那份規格。案例四自己有一份盤點與規格，不走這七塊。2026-10-06 搬到案例一首頁的前面，
 * 因為手冊把它定位成課前作業，而案例一首頁的「起點」本來就寫著「只有你自己寫的規格」，
 * 擺在後面等於先講起點、再講起點是什麼。
 *
 * 第 3 塊標 sky，其餘七塊灰階：真實素材是唯一一塊 AI 補不出來的，
 * 它決定後面每一步拿得到什麼。平等的項目不要一項一色（A-1）。
 *
 * 2026-10-06 最上面補了 DELIVERABLE 那三格，來源是 case-01-spec-writing.pdf 的封面。
 * 原本整頁講了七塊怎麼寫，但沒有說要交出什麼、寫多久、檔名叫什麼，學員看完不知道算不算做完。
 * 手冊把它定位成「案例一之前的課前作業」，所以這兩頁 2026-10-06 從案例一後面搬到了前面。
 *
 * 2026-10-22 第一塊重寫：原本的標題「為什麼這份要你自己寫」沒說出那一塊在證明什麼，
 * 內文又夾著「三個案例共用」這種跟論點無關的交代（副標已經寫了）。現在整塊只做一件事：
 * 全部交給 AI 規劃會拿到什麼（左邊通用詞）對上只有你寫得出來的事（右邊四句真話）。
 * 原本 Callout 講的「你不寫不要什麼它就會加」併進第一塊，那是同一個論點的延伸。
 * 同一輪把七塊改成「參考用的元素，不是必填表格」，Callout 換成寫規格的過程本身
 * 就是在釐清產品，並指向前面裝過的 /grill-me（21a5_M2_PopularSkills）。
 */
/** 「沒給規格會拿到什麼」的視覺化。這些詞刻意是任何產業都能套的，
 *  跟右邊那四句只有這個產業的人知道的事成對照。**左邊一律灰階、右邊才上 sky**，
 *  那是對照的兩邊，不是兩個重點（A-1）。 */
const GENERIC = ['關於我們', '服務項目', '核心優勢', '立即聯絡我們', '三欄大數字', '圓角按鈕', '滿版主圖', '客戶見證'];

const BLOCKS = [
  {
    name: '一句話定義',
    icon: Quote,
    line: '給誰看、什麼東西、要他做什麼',
    pass: '句子裡沒有「優質」「專業」「一站式」這種任何產業都能用的詞',
  },
  {
    name: '不做什麼',
    icon: Ban,
    line: '別人都有、但你這次不要的東西',
    pass: '至少三條，而且你說得出為什麼不要。第一次寫不出三條，先做一版再回來補，案例一就是這樣長出來的',
  },
  {
    name: '真實素材',
    icon: Gem,
    line: '只有你知道的事實：數字、行話、一句真話、做不到的事',
    pass: '至少十條，其中三條帶數字，至少一條是負面的',
    key: true,
  },
  {
    name: '參考方向',
    icon: Images,
    line: '三到五張參考圖，每張回答兩件事',
    pass: '每張圖都寫了「喜歡什麼」和「不要它的哪一點」',
  },
  {
    name: '硬性限制',
    icon: Ruler,
    line: '技術、瀏覽器、速度、無障礙、語言',
    pass: '每一條都能用工具量。「要跑得快」不算',
  },
  {
    name: '驗收條件',
    icon: CheckCheck,
    line: '把形容詞翻成可以被檢查的句子',
    pass: '每一條都答得出「有做到」或「沒做到」',
  },
  {
    name: '素材清單',
    icon: FolderOpen,
    line: '有哪些照片與內容，以及沒有哪些',
    pass: '明確列出沒有的素材',
  },
];

export default function SlideCaseSpec() {
  return (
    <SlideLayout
      title="專案啟動之前：規格文件怎麼寫？"
      subtitle="Spec Writing · 案例一到案例三共用的同一份規格"
      icon={FileText}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-3">題材與內容都交給 AI 規劃，它只給得出通用版</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-slate-400 text-sm leading-relaxed mb-2.5">
                這不是它偷懶，是你沒有給它足夠的資訊，它只能用最常見的網站結構、文案與設計慣例補滿。
                同樣的道理，你沒寫「不要什麼」，它也會自動加上去。
              </p>
              <div className="flex flex-wrap gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-4">
                {GENERIC.map((g) => (
                  <span key={g} className="rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-500 text-sm">
                    {g}
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-2.5">
                <strong className="text-slate-200">它猜不到的那些事，只有你寫得出來</strong>，像右邊這四句。
              </p>
            </div>
            <ul className="space-y-2 rounded-xl border border-sky-500/30 bg-sky-500/10 p-4">
              {[
                '柴燒的最高溫是 1280°C',
                '開窯前沒有人知道結果',
                '2011 年開始做',
                '沒有窯場的照片，手上那一張拍的其實是金工工坊',
              ].map((s) => (
                <li key={s} className="text-slate-300 text-sm leading-relaxed">
                  {s}
                </li>
              ))}
              <li className="border-t border-sky-500/20 pt-2 text-slate-400 text-sm leading-relaxed">
                少了這四句，你會得到一個很乾淨的陶藝模板。
              </li>
            </ul>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="space-y-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-base font-bold text-slate-100">規格裡可以放哪些東西</h3>
            <p className="text-slate-500 text-sm">參考用的元素，不是必填表格。用得到的才寫，寫不出來的先空著</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BLOCKS.map((b, i) => (
            <div
              key={b.name}
              className={`rounded-xl border p-4 ${
                b.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-xs text-slate-500">{i + 1}</span>
                <b.icon aria-hidden="true" size={15} className={`shrink-0 self-center ${b.key ? 'text-sky-400' : 'text-slate-500'}`} />
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
          </div>
        </AnimatedBlock>

        <Callout tone="focus" label="寫這份的過程，本身就是在把產品想清楚" stepIndex={3}>
          哪一塊卡住，通常就是你自己還沒想清楚的地方。想不出來的時候，可以叫
          <code className="font-mono text-orange-300"> /grill-me </code>
          反過來一直問你，把腦袋裡還沒說出口的事問出來，再把答案整理回這份規格。
          整份一到兩頁就夠，超過三頁通常是在寫作文。
        </Callout>

        <AnimatedBlock stepIndex={4}>
          <CaseHandbook
            file="case-01-spec-writing.pdf"
            title="規格文件怎麼寫"
            hours="約 60 到 90 分鐘"
          />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
