import { GraduationCap, ArrowRight, CornerDownLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 單元 7-4 第七頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 這一頁的職務 ────────────────────────────────────────────
 * 兩條回路的差別，加一個走完全程的例子。落點有哪幾種、怎麼改到流程本身，在下一頁。
 * **不要在這裡先列落點表**，那是下一頁的主體。
 *
 * 例子用計時器不用案例四的許願神社：神社排在章節八，學員在這裡還沒看過（B-4）。
 * 計時器是他自己做的，而且上一頁才剛幫它加完航行日誌。
 * 手機固定按鈕被底部擋住這個狀況跟專案無關，換主詞就成立。
 *
 * ⚠ 「規則要先驗證過再寫進去」那一句不要刪。少了它，學員會做出一個每次出錯就
 * 自動往 CLAUDE.md 加一條的東西，那正是章節五整章在收的爛攤子。
 *
 * 用色：修正路徑灰階（他已經會了），學習路徑 sky（這一頁的新東西），
 * `CLAUDE.md` 的 orange 標身分不佔額度，合計一種（A-1）。
 */

const CORRECTION = ['執行', '測試沒過', '修正'];
const LEARNING = ['做完的結果', '查出原因', '寫成規則'];

/** 走完全程的例子。兩個階段用同一個 bug，才看得出第二階段多做了什麼。 */
const STAGES = [
  {
    tag: '第一階段　修正路徑',
    tone: 'slate' as const,
    rows: ['測試在手機尺寸下點不到，Claude 讀錯誤紀錄、改掉手機版的版面、重測，過了'],
    foot: '到這裡那一輪就結束了，Loop 的工作做完。',
  },
  {
    tag: '第二階段　學習路徑',
    tone: 'sky' as const,
    rows: [
      '問一句為什麼會做錯：固定在畫面底部的按鈕，沒算到手機底部那條橫線佔掉的高度',
      '把它寫成下次就要帶上的規則，下一輪拆解就帶著它走',
      '同時補一個手機尺寸的測試，不要只靠它記得',
    ],
    foot: '下一次做任何固定在底部的東西，都從這一條開始。',
  },
];

const RULE_SNIPPET = [
  '## 手機版的互動元件',
  '',
  '- 固定在底部的按鈕要留出手機底部安全區的高度。',
  '- 不能跟底部操作列重疊。',
  '- 要有一個手機尺寸的測試，確認主要按鈕點得到。',
];

export default function SlideGraphFeedback() {
  return (
    <SlideLayout
      title="讓失敗成為規則：從錯誤回饋到下一輪執行"
      subtitle="Two Return Paths"
      icon={GraduationCap}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        {/* 兩條回路 */}
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4 space-y-4">
          {[
            { label: '修正路徑', note: '把這次做錯的修好', steps: CORRECTION, back: '回到原本那一塊重做', accent: false },
            { label: '學習路徑', note: '讓下次不要再錯一樣的', steps: LEARNING, back: '進到下一輪的拆解裡', accent: true },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline gap-2.5 mb-2.5">
                <span className={`text-base font-bold ${row.accent ? 'text-sky-300' : 'text-slate-100'}`}>{row.label}</span>
                <span className="text-slate-500 text-sm">{row.note}</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {row.steps.map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`rounded-xl border px-5 py-2.5 text-base font-bold ${
                      row.accent ? 'border-sky-500/30 bg-sky-500/5 text-sky-200' : 'border-slate-700 bg-slate-900 text-slate-100'
                    }`}>{s}</div>
                    {i < row.steps.length - 1 && <ArrowRight aria-hidden="true" size={15} className="text-slate-600" />}
                  </div>
                ))}
              </div>
              <div className={`mt-2 flex items-center gap-2.5 rounded-xl border border-dashed px-4 py-2 ${
                row.accent ? 'border-sky-500/30' : 'border-slate-700'
              }`}>
                <CornerDownLeft aria-hidden="true" size={15} className={`shrink-0 ${row.accent ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="text-slate-400 text-sm">{row.back}</span>
              </div>
            </div>
          ))}
          <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-800 pt-2.5">
            第二條靠的是你把驗證過的經驗變成它下次讀得到的東西，模型本身沒有重新訓練。
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            字幕那張 Graph 兩條都有：補一個漏掉的名詞、重跑那幾支，是修正路徑；
            <strong className="text-slate-400">下一批影片一開始就帶著那份更長的共用詞庫，是學習路徑</strong>。
          </p>
        </AnimatedBlock>

        {/* 同一個 bug 走兩個階段 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-1">同一個狀況，兩個階段各做了什麼</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            你叫 Claude 幫計時器加一顆固定在畫面底部的開始鈕，桌機上好好的，手機上點不到。
          </p>
          <div className="space-y-3">
            {STAGES.map((st) => (
              <div
                key={st.tag}
                className={`rounded-xl border px-5 py-4 ${
                  st.tone === 'sky' ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
                }`}
              >
                <div className={`text-sm font-bold mb-2 ${st.tone === 'sky' ? 'text-sky-300' : 'text-slate-400'}`}>{st.tag}</div>
                <ol className="space-y-1.5">
                  {st.rows.map((r, i) => (
                    <li key={r} className="text-slate-300 text-base leading-relaxed flex gap-2.5">
                      <span className="font-mono text-sm text-slate-600 shrink-0 mt-0.5">{i + 1}</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-slate-500 text-sm leading-relaxed mt-2.5">{st.foot}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        {/* 那條規則長什麼樣 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-baseline gap-2.5 mb-3">
            <span className="text-slate-100 text-base font-bold">寫進</span>
            <code className="font-mono text-orange-300 text-base">CLAUDE.md</code>
            <span className="text-slate-500 text-sm">的樣子</span>
          </div>
          <pre className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3 text-slate-300 text-sm leading-relaxed font-mono whitespace-pre-wrap">
            {RULE_SNIPPET.join('\n')}
          </pre>
          <p className="text-slate-400 text-base leading-relaxed mt-3">
            <strong className="text-slate-200">這一條要你看過才寫進去</strong>。
            做成「每次出錯就自動加一條」的話，手冊會被偶發狀況灌爆，那就是手冊健檢在收的爛攤子。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
