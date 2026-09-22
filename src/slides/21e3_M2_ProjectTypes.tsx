import { FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/**
 * 前面四個擴充情境全部是軟體工程的場面（rm -rf、DROP TABLE、GitHub Issue、Sentry），
 * 不寫程式的人看到那裡很容易認定這一段跟自己無關，撐不到後面的轉移演練。
 * 這一頁的職務只有一個：把「專案」的定義打開。
 *
 * 手冊實際怎麼寫，後面的預錄段落有完整演練（社群文案、會議紀錄），這裡不要重複。
 * 專案該怎麼切也不要在這裡講，那是「一個專案該放多少東西？」那一頁的事，
 * 學員在這個位置還沒看過 Claude Projects。
 *
 * 2026-09-22：知識庫那一格換成簡報。理由是它是四格裡唯一交不出產出的一格，
 * 所以底下還得再加一個框替它解釋「它是其他三格的材料」，而那句講的是「專案怎麼切」，
 * 正好是這一頁自己上面那條註解說「不要在這裡講」的東西。換成簡報之後四格結構一致，
 * 那個框可以拿掉，而且直接接得上「這份簡報自己的規則與製作流程」那一頁。
 *
 * 三個判斷標準是這一頁真正要帶走的東西，四個案例只是套用結果。
 * 原本判斷標準只寫在頂端一行內文，視覺上比四張案例卡輕得多，
 * 學員記住的會是「有四種專案」而不是「怎麼判斷一件事能不能變成專案」。
 * 每個判斷標準都附反面，那才是實際拿來檢查用的。
 */
const TESTS = [
  { q: '會重複做嗎？', no: '只做一次的事，當場交代就好，不用寫手冊' },
  { q: '你有自己的規則嗎？', no: '沒有偏好的話，它怎麼做都行' },
  { q: '產出要一致嗎？', no: '每次長得不一樣也沒差的，不需要固定下來' },
];

const CASES = [
  {
    kind: '寫程式',
    subject: '你手上這個計時器',
    rules: ['配色只給要強調的元素', '禁止引用外部圖片', '按鈕文案用航太語彙：發射、待機、返航'],
    output: 'index.html',
    mine: true,
  },
  {
    kind: '簡報',
    subject: '每個月要講的那份投影片',
    rules: ['一頁只講一件事', '顏色只用主色加灰階', '標題要看得出這頁在講什麼'],
    output: '一份不用重排版就能上台的投影片',
  },
  {
    kind: '文件審閱',
    subject: '對方寄來的合約或報價單',
    rules: ['我們的標準條款', '哪幾條不能接受', '要標出來的風險字眼'],
    output: '一張差異對照表，標出這次要談的地方',
  },
  {
    kind: '每月報表',
    subject: '幾份 CSV 合成一份',
    rules: ['每個欄位是什麼意思', '計算口徑', '遇到異常值怎麼處理'],
    output: '每個月都長得一樣的那份報表',
  },
];

export default function SlideProjectTypes() {
  return (
    <SlideLayout title="三題判斷這件工作要不要寫手冊" subtitle="What Counts as a Project" icon={FolderTree}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="space-y-3">
          <p className="text-slate-300 text-base leading-relaxed">
            拿一件你手上的事問這三題。三題都答「是」，它就能變成專案，
            <strong className="text-slate-100">寫法跟你的計時器一樣</strong>。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TESTS.map((t) => (
              <div key={t.q} className="rounded-xl border border-sky-900/50 bg-sky-950/20 px-3.5 py-2.5">
                <div className="text-sky-300 text-base font-bold leading-snug">{t.q}</div>
                <div className="text-slate-400 text-sm leading-snug mt-1">{t.no}</div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${hoverIsolateGrid}`}>
          {CASES.map((c, i) => (
            <AnimatedBlock
              key={c.kind}
              stepIndex={i + 2}
              className={`rounded-2xl border bg-slate-900 p-4 flex flex-col ${hoverIsolateCard} ${
                c.mine ? 'border-sky-900/60' : 'border-slate-800'
              }`}
            >
              <div className="flex items-baseline gap-2.5 mb-1 pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-slate-100">{c.kind}</h3>
                <span className="text-xs text-slate-500">{c.subject}</span>
                {c.mine && (
                  <span className="ml-auto shrink-0 rounded-full border border-sky-900/60 bg-sky-500/10 px-2 py-0.5 text-xs font-bold text-sky-400">
                    你手上這個
                  </span>
                )}
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-slate-600 mt-3 mb-2">
                手冊要定下來的是
              </div>
              <ul className="space-y-1 mb-4">
                {c.rules.map((r) => (
                  <li key={r} className="text-slate-400 text-sm leading-snug flex gap-2.5">
                    <span className="text-slate-700 shrink-0">·</span>
                    {r}
                  </li>
                ))}
              </ul>

              <div className="mt-auto rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5">
                <div className="text-xs font-mono uppercase tracking-widest text-sky-600 mb-1">產出</div>
                <p className="text-slate-200 text-sm leading-snug">{c.output}</p>
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock
          stepIndex={6}
          className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            四格的欄位一模一樣：<strong className="text-slate-100">手冊定規則，專案交出一個固定格式的產出。</strong>
            差別只在產出是一個網頁、一份投影片、一張對照表，還是一份報表。
            <span className="block text-slate-400 text-sm mt-2">所以四種專案的手冊用的是同一套寫法。真正卡住人的是下一個問題：第一條規則，你要從哪裡生出來。</span>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
