import { ListChecks, ArrowRight, Split, Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元 7-4 第四頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 2026-11-04 重寫，原因有兩個，不要改回去 ──────────────────────
 * 一、**前半跟 Loop 重複**。原本這一頁用一張四列的表講「驗收條件要寫成程式判定得了的」，
 *  但那件事學員已經看過三次：`27b3`（五個步驟的「什麼叫做完」）、
 *  `28a_M4_LoopPractice`（計時器那五題）、`29c_Case_SpecCheck`（把形容詞翻成條件）。
 *  照 B-5，這裡降成一句回指，版面讓給Graph才有的那三件事。
 *
 * 二、**跟 `28a3_M4_GoalCommand` 打架**。那一頁寫著「因為驗收的不是同一個模型，
 *  做事的那一個就不能用一句做好了把自己放行」，而這一頁原本寫「兩個模型都覺得可以，
 *  只代表它們漏掉的是同一件事」。兩句學員都讀得到，他會相信比較輕鬆的那一個（B-6）。
 *  現在改成接著講：換一個模型只擋掉自我放行，判的條件如果還是「看起來如何」，兩個都會過。
 *  **改 `28a3` 那一頁要回來看這一段。**
 *
 * ⚠ 兩個不要刪的但書：不是每一種品質都判定得了（視覺、策略、體驗）；
 * 能並行不等於該無限並行（共用檔案、介面格式、測試環境會打架）。
 *
 * 用色：Loop 那一欄灰階、Graph 那一欄 sky，成對算一種；依賴那一段也是 sky，合計一種（A-1）。
 */

/** 同一件事叫驗收，在兩層的差別。Loop 那一欄灰階，Graph 那一欄 sky，成對算一種（A-1）。 */
const DIFF = [
  { q: '驗幾個', loop: '一個單元，一套條件', graph: '很多單元，同一套條件要套很多次' },
  { q: '誰在驗', loop: '驗的是自己剛做完的那一塊', graph: '一個只判定不做事的節點，驗的是別人的產出' },
  { q: '驗完往哪去', loop: '一個去處：沒過就重做', graph: '三個去處：退回那一塊、要你點頭、直接放行' },
];

/** 四個工作，按輸入排出來的真實依賴。 */
/**
 * 2026-11-04 複查時加了 A。原本只有四件事，而且把「介面設計」與「API 開發」
 * 標成誰的都不用讀，**那踩到這一頁自己的但書**（還沒講好資料格式就各做各的，
 * 接起來要重做的比省下來的多）。真實依賴是先講好格式，前後端才並行得起來。
 * 加了之後這個例子更強：寫成一串的五步，其實只有三層。
 */
const TASKS = [
  { id: 'A', name: '講好 API 回傳什麼', needs: null },
  { id: 'B', name: '介面設計', needs: 'A 講好的格式' },
  { id: 'C', name: 'API 開發', needs: 'A 講好的格式' },
  { id: 'D', name: '前後端接起來', needs: 'B 與 C 的產出' },
  { id: 'E', name: '整合測試', needs: 'D 的產出' },
];

export default function SlideGraphDeps() {
  return (
    <SlideLayout
      title="先定義成功與失敗，再排出真正的依賴"
      subtitle="Checks First, Then Real Dependencies"
      icon={ListChecks}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        {/* 一、驗收在兩層的差別 */}
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <p className="text-slate-400 text-base leading-relaxed mb-3">
            驗收條件要寫成程式判定得了的，計時器那五題做過一次。
            <code className="font-mono text-orange-300">/goal</code>
            則是把判定交給另一個模型，做事的那一個就不能自己放行。
            <strong className="text-slate-200">換一個模型來判，只擋掉「自己說自己做好了」這件事</strong>。
            你給它的條件如果是「頁面要好看」，它一樣只能憑印象回答，換誰來判都會過。
          </p>
          <div className="overflow-x-auto">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[6rem_1.1fr_1.4fr] gap-4 pb-2 border-b border-slate-800 font-mono text-xs">
                <span className="text-slate-500"></span>
                <span className="text-slate-400">在一個節點裡（Loop）</span>
                <span className="text-sky-400">在節點之間（Graph）</span>
              </div>
              {DIFF.map((d) => (
                <div
                  key={d.q}
                  className="grid grid-cols-[6rem_1.1fr_1.4fr] gap-4 py-2.5 border-b border-slate-800/70 last:border-0 items-baseline"
                >
                  <span className="text-slate-100 text-base font-bold">{d.q}</span>
                  <span className="text-slate-400 text-sm leading-relaxed">{d.loop}</span>
                  <span className="text-sky-200 text-sm leading-relaxed">{d.graph}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedBlock>

        {/* 二、合併之後才驗得到的那一類 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers aria-hidden="true" size={17} className="text-slate-400 shrink-0" />
            <h3 className="text-slate-100 text-base font-bold">有一類條件，要全部做完才驗得到</h3>
          </div>
          <p className="text-slate-400 text-base leading-relaxed">
            40 份字幕的檔案格式是不是同一套？三塊畫面接起來之後還跑不跑得動？
            同一個名詞在 40 支裡面有沒有翻成 40 種？
            <strong className="text-slate-200">這幾題在任何單一節點裡面都看不到</strong>，
            因為每一塊自己都是對的。所以合併之後還要再驗一次，條件要另外寫。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={3}>
          不是每一種品質都判定得了。視覺上好不好看、這個功能該不該做、使用者用起來順不順，
          這幾類沒有一條布林條件框得住，還是要人看過。能寫成條件的先寫成條件，
          <strong className="text-slate-300">剩下的留給你自己看，不要硬寫成條件丟給它</strong>。
        </Callout>

        {/* 三、「然後」不是依賴 */}
        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-1">哪幾步其實不用等</h3>
          <p className="text-slate-400 text-base leading-relaxed mb-3">
            你把五件事寫成一串，多半是因為你是照那個順序想出來的。
            真正該問的是：<strong className="text-slate-200">下一步真的讀得到上一步的產出嗎？</strong>
            說不出是哪個東西傳過去，那兩件事就沒有先後關係。
          </p>

          <div className="overflow-x-auto">
            <div className="min-w-[560px] space-y-1.5">
              <div className="grid grid-cols-[2.4rem_1fr_1.4fr] gap-3 pb-1.5 border-b border-slate-800 font-mono text-xs text-slate-500">
                <span></span>
                <span>工作</span>
                <span>它要讀誰的產出</span>
              </div>
              {TASKS.map((t) => (
                <div key={t.id} className="grid grid-cols-[2.4rem_1fr_1.4fr] gap-3 items-center">
                  <span className="font-mono text-sm text-slate-500">{t.id}</span>
                  <span className="text-slate-100 text-base font-bold">{t.name}</span>
                  <span className={`text-sm ${t.needs ? 'text-slate-300' : 'text-sky-300'}`}>
                    {t.needs ?? '誰的都不用讀'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5 rounded-xl border border-sky-500/25 bg-sky-500/5 px-4 py-2.5">
            <Split aria-hidden="true" size={16} className="text-sky-400 shrink-0" />
            <span className="text-slate-300 text-sm">先做 A</span>
            <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />
            <span className="text-slate-300 text-sm">B 跟 C 同時做</span>
            <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />
            <span className="text-slate-300 text-sm">兩邊好了才做 D</span>
            <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />
            <span className="text-slate-300 text-sm">最後 E</span>
          </div>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={5}>
          能同時做，不代表開越多越好。兩個節點改到同一個檔案、用同一個測試環境、
          或是還沒講好資料格式就各做各的，接起來的時候要重做的比省下來的多。
          先確認它們碰的東西不重疊，再讓它們一起跑。
        </Callout>

      </div>
    </SlideLayout>
  );
}
