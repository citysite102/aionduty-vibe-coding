import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Settings, FileCode, Wrench, Shield, GitMerge, Link, Activity } from 'lucide-react';

// **這六塊是這門課的拆法，不是誰家的規格。** Anthropic 講的是 Agent = Model + Harness
// 以及上下文工程，沒有發布過一份「Harness 的六大元件」清單。所以開頭那句話寫的是
// 「這裡把它拆成六塊來看」，不要改成「Harness 由六個元件組成」那種斷言句，
// 那會把一個教學用的分法講成業界定義。要增減零件是可以的，改的時候連同那句話一起看。
//
// D-4 防呆：這一頁「沙箱」與「運作框架」並排，Harness 一律譯「運作框架」，不要寫成「安全沙箱」。
// 2026-09-21 拿掉每一格的「本課會動手／後面會回來講／先認識就好」標籤與對應的
// 視覺分級（scope 與三組 styles）。六塊現在一律平等。
// 拿掉的理由：這一頁的職務是「Harness 由哪些東西組成」，標籤講的是課程安排，
// 兩件事混在同一張卡上，學員第一眼讀到的是「哪些可以跳過」而不是「這塊在管什麼」。
// 哪些會動手，讓講者在口白裡說，不要印在卡片上。要加回來之前先想清楚它解決什麼問題。
//
// 2026-09-22 調順序：規則文件、工具、自動關卡排前三，因為口白收尾給的動手順序就是
// 「先寫規則文件，再給它工具，撞到擋不住的規則再做自動關卡」。三欄的 grid 剛好讓
// 上排＝這門課會親手做的三個、下排＝先認識就好的三個。**改順序要同步改 5-1 逐字稿的
// 第一到第六個**，那裡是照卡片順序一格一格念的。
const parts = [
  {
    icon: FileCode,
    name: '規則文件',
    en: 'Rule Files',
    desc: '這個專案的規矩與慣例，寫成一份 CLAUDE.md，每次開對話都會被讀進去。',
  },
  {
    icon: Wrench,
    name: '工具',
    en: 'Tools',
    desc: '它能動的東西：讀寫檔案、跑指令，或照 MCP 這套規範接上外面的服務。沒給工具，它就只能跟你講話。',
  },
  {
    icon: Link,
    name: '自動關卡',
    en: 'Hook',
    desc: '在固定時機自動跑的一段檢查，不經過 AI 判斷，所以它想跳過也跳不掉（例如存檔前擋下密碼）。',
  },
  {
    icon: GitMerge,
    name: '指揮分工',
    en: 'Orchestration',
    desc: '同時有好幾個子代理在跑的時候，誰做哪一塊、誰要等誰做完。',
  },
  {
    icon: Shield,
    name: '沙箱',
    en: 'Sandbox',
    desc: '把它關在一個隔起來的地方跑，就算做壞了也弄不到你其他的東西。多半是公司或雲端平台幫你準備好的，你不用自己架。',
  },
  {
    icon: Activity,
    name: '事後查得到',
    en: 'Observability',
    desc: '事後查得到它做過什麼、走過哪些步驟、花掉多少額度。',
  },
];

const cardStyle = 'bg-slate-900 border-slate-800';

export default function SlideHarnessArchitecture() {
  return (
    <SlideLayout title="完整的運作框架有哪些零件" subtitle="Anatomy of a Harness" icon={Settings}>
      <div className="pt-2 max-w-6xl mx-auto h-full flex flex-col">
        <div className="text-center mb-6">
          <p className="text-slate-300 text-lg mb-4">
            AI 的表現不是只看底層模型有多聰明：
          </p>
          <div className="inline-block bg-slate-900 border border-slate-700 rounded-2xl px-12 py-6 shadow-xl">
            <span className="text-4xl font-mono font-bold text-slate-200">
              Agent <span className="text-slate-500">=</span> Model <span className="text-slate-500">+</span> <span className="text-sky-400">Harness</span>
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-6">
          <p className="text-slate-300 text-base">
            Harness 不是一個東西，是一組配套。
            <strong className="text-slate-100">這裡把它拆成六塊來看</strong>，每一塊管一件事。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
          {parts.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedBlock
                key={p.en}
                stepIndex={i + 1}
                className={`border rounded-xl p-6 flex flex-col ${cardStyle}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg shrink-0 bg-slate-800 text-slate-400">
                    <Icon size={24} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-lg leading-tight text-slate-100">{p.name}</h4>
                    <p className="text-slate-500 text-sm font-mono">{p.en}</p>
                  </div>
                </div>
                <p className="text-slate-400 text-base leading-relaxed">{p.desc}</p>
              </AnimatedBlock>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
