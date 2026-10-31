import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { JudgementTable } from '../components/JudgementTable';

/**
 * 這一頁原本畫的是七格「壓縮過的流程」，還說手冊有十二步，兩個數字對不上，
 * 而且底下兩段都靠「這一條線」在指它，畫面上根本沒有那條線。
 * 現在照手冊的十二步列，每一步寫做完之後手上多了什麼東西，
 * 學員看得出專案是一步一步長出來的，後面兩段也可以直接指第幾步。
 *
 * 只有掛自動檢查那一步標 sky：在它之前都是在準備規則，在它之後規則才會被執行。
 * 其餘十一步灰階（A-1：平等的項目不要一項一色）。
 *
 * 2026-10-06 那一步補上「就是前面裝過的 Hook」。模擬學員反映這一步被講成整個案例最重的一步，
 * 但他完全沒有畫面，也不知道它跟章節五裝過的 Hook 是不是同一件事。手冊自己寫著
 * 「hook 是『自動檢查』的正式名稱」，投影片卻一次都沒把兩個名字接起來。
 */
/** 2026-10-08（講師）：十二步原本是一張平的清單加一段文字說明「前七步在寫規則、
 *  第 8 步之後規則才被執行」。那段文字是這一頁的骨架，但它藏在清單底下，要讀完才看得到。
 *  改成三段分組，骨架直接畫出來，那段說明文字就不用再寫一次（刪掉了，不要加回來）。
 *  分界是硬的：Hook 掛上去的那一步，前面只有規則、後面才有保護。 */
/**
 * 2026-10-31（講師：投影片不要寫手冊裡的階段幾或步驟幾）三段的標籤拿掉了步數。
 * 清單本身還是有序號（它是這一頁自己的 `<ol>`，每一格的名字就在旁邊，
 * 不是一個要回手冊才查得到的編號），但**文字裡不要再出現「第 N 步」**。
 */
const PHASES = [
  { label: '前半：把規則寫下來', note: '這一段做出來的畫面只有一個', from: 0, to: 7 },
  { label: '轉折：規則開始被執行', note: '掛上自動檢查，也就是前面裝過的 Hook', from: 7, to: 8 },
  { label: '後半：在保護下產出', note: '之後每一塊改動都會先過那道檢查', from: 8, to: 12 },
];

const STEPS = [
  { out: '一份「AI 感」清單' },
  { out: '一份還沒動到任何檔案的計畫' },
  { out: '一個空的專案結構' },
  { out: '一組顏色，加一份首頁大綱' },
  { out: '寫進 CLAUDE.md 的設計規範', code: true },
  { out: '一份集中管理顏色與尺寸的設定' },
  { out: '首頁的第一個畫面' },
  { out: '一個會擋下違規改動的自動檢查，就是前面裝過的 Hook', key: true },
  { out: '完整的首頁' },
  { out: '四個尺寸的實測數字' },
  { out: '一份問題清單，分成要修、可以不修、不是問題三類' },
  { out: '一個可以傳給別人的網址' },
];

/**
 * 規格的五塊各自在哪一步被用掉。`at` 原本寫「第 4、9 步」這種編號（講師 2026-10-31 要求拿掉），
 * 現在寫那一步在做什麼，讀者在上面那張清單裡找得到同樣的字。
 * **不要寫成「後面」「前面」**，那樣就指不到任何一格了。
 */
const USES = [
  { from: '真實素材', at: '寫大綱、做完整首頁', to: '網站上的內容、數字與專有名詞' },
  { from: '不做什麼', at: '寫設計規範', to: '設計規範裡的禁用清單' },
  { from: '硬性限制', at: '做設定、實測尺寸', to: '顏色與尺寸的設定，以及要量到的速度' },
  { from: '驗收條件', at: '掛自動檢查', to: '自動檢查的規則' },
  { from: '沒有的素材', at: '做完整首頁', to: '哪一段要留白的依據' },
];

/**
 * cost 那一欄是 2026-10-06 從 case-01-vessel.pdf 的〈五個判斷〉補的，手冊有這一欄、這一頁原本沒有。
 * 2026-10-31 每一條的 `at`（第 N 步）整組刪掉：`JudgementTable` 根本沒有吃那個欄位，
 * 它從頭到尾沒有印在畫面上，留著只會讓下一個人以為表上有步數。
 * 補它的理由是前三欄只說得出「這個判斷很重要」，判斷錯的代價才說得出為什麼重要。
 */
const JUDGEMENTS = [
  {
    q: '參考圖裡哪些是這個設計的本質，哪些只是流行公式',
    by: '拿掉它之後，還像不像這個風格',
    cost: '把流行公式一起抄走，成品出現「AI 感」',
  },
  {
    q: '這個區塊該不該存在',
    by: '換一個產業還完全成立嗎',
    cost: '做出一個換掉 logo 就是別人的網站',
  },
  {
    q: '這條規則寫得夠不夠具體',
    by: '答不答得出有做到或沒做到，機器驗或人眼一秒都算',
    cost: '翻不成自動檢查的規則，AI 照樣會偏離',
  },
  {
    q: '這張照片該不該放',
    by: '一秒內認得出這是什麼行業嗎',
    cost: '放了一張「看起來差不多」的照片，整個網站跟著變假',
  },
  {
    q: 'AI 的這條建議該不該收',
    by: '它跟你的設計規範衝不衝突',
    cost: '刻意的設計決策被「標準做法」抹平',
  },
];

export default function SlideCase1Chain() {
  return (
    <SlideLayout
      title="器 VESSEL 的十二步，每一步的產出"
      subtitle="Case 01 · 從一份規格到一個公開網址"
      icon={ListChecks}
    >
      <div className="max-w-6xl mx-auto space-y-3 pb-2">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="space-y-3">
            {PHASES.map((ph) => (
              <div key={ph.label}>
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="text-slate-200 text-sm font-bold">{ph.label}</span>
                  <span className="text-slate-500 text-sm">{ph.note}</span>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {STEPS.slice(ph.from, ph.to).map((s, k) => {
                    const i = ph.from + k;
                    return (
                      <li
                        key={s.out}
                        className={`flex gap-3 rounded-xl border px-4 py-2.5 ${
                          s.key ? 'border-sky-500/30 bg-sky-500/5 md:col-span-2' : 'border-slate-800 bg-slate-950'
                        }`}
                      >
                        <span className="font-mono text-sm text-slate-600 pt-0.5 w-5 shrink-0">{i + 1}</span>
                        <span className={`text-sm leading-relaxed ${s.key ? 'text-sky-200 font-bold' : 'text-slate-200'}`}>
                          {s.code ? (
                            <>
                              寫進 <code className="font-mono text-orange-300">CLAUDE.md</code> 的設計規範
                            </>
                          ) : (
                            s.out
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">前面那份規格，被拆成五塊分別用掉</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            驗收條件那一塊寫得夠具體，才翻得成自動檢查的規則。寫「要有質感」的人到那裡會卡住。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {USES.map((u) => (
              <div key={u.from} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-300 text-sm font-bold">{u.from}</span>
                  <span className="font-mono text-xs text-slate-600">{u.at}</span>
                </div>
                <div className="text-slate-400 text-sm leading-relaxed mt-0.5">{u.to}</div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">這五個判斷，AI 幫不了你</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            因為它們要的是你對這個品牌與這批內容的理解。
          </p>
          <JudgementTable items={JUDGEMENTS} />
        </AnimatedBlock>

        <Callout tone="focus" label="換成你自己的專案，最少要留哪幾步" stepIndex={4}>
          前面那份規格、設計規範，以及自動檢查。
          <strong className="text-slate-100">少了自動檢查，前面寫的規則全部只是請它照做。</strong>
          其餘九步是這個網站的做法，換一個題目就會不一樣。
        </Callout>

      </div>
    </SlideLayout>
  );
}
