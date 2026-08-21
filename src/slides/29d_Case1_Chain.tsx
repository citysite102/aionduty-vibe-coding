import { ListChecks } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本畫的是七格「壓縮過的流程」，還說手冊有十二步，兩個數字對不上，
 * 而且底下兩段都靠「這一條線」在指它，畫面上根本沒有那條線。
 * 現在照手冊的十二步列，每一步寫做完之後手上多了什麼東西，
 * 學員看得出專案是一步一步長出來的，後面兩段也可以直接指第幾步。
 *
 * 只有第 8 步標 sky：前七步都是在準備規則，第 8 步之後規則才會被執行。
 * 其餘十一步灰階（A-1：平等的項目不要一項一色）。
 */
const STEPS = [
  { out: '一份「AI 感」清單' },
  { out: '一份還沒動到任何檔案的計畫' },
  { out: '一個空的專案結構' },
  { out: '一組顏色，加一份首頁大綱' },
  { out: '寫進 CLAUDE.md 的設計規範', code: true },
  { out: '一份集中管理顏色與尺寸的設定' },
  { out: '首頁的第一個畫面' },
  { out: '一個會擋下違規改動的自動檢查', key: true },
  { out: '完整的首頁' },
  { out: '四個尺寸的實測數字' },
  { out: '一份分成三類的問題清單' },
  { out: '一個可以傳給別人的網址' },
];

/** 規格的四塊各自在第幾步被用掉。數字對得上上面那張表，不要寫成「後面」「前面」 */
const USES = [
  { from: '真實素材', at: '第 4、9 步', to: '網站上的內容、數字與專有名詞' },
  { from: '不做什麼', at: '第 5 步', to: '設計規範裡的禁用清單' },
  { from: '硬性限制', at: '第 6、10 步', to: '顏色與尺寸的設定，以及要量到的速度' },
  { from: '驗收條件', at: '第 8 步', to: '自動檢查的規則' },
  { from: '沒有的素材', at: '第 9 步', to: '哪一段要留白的依據' },
];

const JUDGEMENTS = [
  { q: '參考圖裡哪些是這個設計的本質，哪些只是流行公式', at: '第 1、4 步', by: '拿掉它之後，還像不像這個風格' },
  { q: '這個區塊該不該存在', at: '第 4 步', by: '換一個產業還完全成立嗎' },
  { q: '這條規則寫得夠不夠具體', at: '第 5 步', by: '能不能被機器檢查，或者被人眼一秒判斷' },
  { q: '這張照片該不該放', at: '第 9 步', by: '一秒內認得出這是什麼行業嗎' },
  { q: 'AI 的這條建議該不該收', at: '第 11 步', by: '它跟你的設計規範衝不衝突' },
];

export default function SlideCase1Chain() {
  return (
    <SlideLayout
      title="十二步，每一步做完手上多了什麼"
      subtitle="Case 01 · 從一份規格到一個公開網址"
      icon={ListChecks}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {STEPS.map((s, i) => (
              <li
                key={s.out}
                className={`flex gap-3 rounded-xl border px-4 py-2.5 ${
                  s.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
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
            ))}
          </ol>
          <p className="text-slate-400 text-sm leading-relaxed mt-4">
            前七步都在把規則寫下來，做出來的畫面只有一個。
            <strong className="text-slate-200">
              第 8 步之後規則才會被執行，剩下的區塊都是在它的保護下產出的。
            </strong>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-base font-bold text-slate-100 mb-1">課前作業寫的那份規格，被拆成五塊分別用掉</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            驗收條件那一塊寫得夠具體，第 8 步才翻得成檢查規則。寫「要有質感」的人到那裡會卡住。
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
          <ul className="space-y-2">
            {JUDGEMENTS.map((j) => (
              <li key={j.q} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-slate-100 text-sm font-bold">{j.q}</span>
                  <span className="font-mono text-xs text-slate-600 shrink-0">{j.at}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-0.5">判斷依據：{j.by}</p>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="focus" label="換成你自己的專案，最少要留哪幾步" stepIndex={4}>
          課前作業那份規格、第 5 步的設計規範、第 8 步的自動檢查。
          <strong className="text-slate-100">少了第 8 步，前面寫的規則全部只是請它照做。</strong>
          其餘九步是這個網站的做法，換一個題目就會不一樣。
        </Callout>

      </div>
    </SlideLayout>
  );
}
