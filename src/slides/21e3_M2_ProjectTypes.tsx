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
 * 三個判準是這一頁真正要帶走的東西，四個案例只是套用結果。
 * 原本判準只寫在頂端一行內文，視覺上比四張案例卡輕得多，
 * 學員記住的會是「有四種專案」而不是「怎麼判斷一件事能不能變成專案」。
 * 每個判準都附反面，那才是實際拿來檢查用的。
 */
const TESTS = [
  { q: '會重複做嗎？', no: '只做一次的事，當場交代就好，不用寫手冊' },
  { q: '你有自己的規矩嗎？', no: '沒有偏好的話，它怎麼做都行' },
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
    kind: '知識庫',
    subject: '散在各處的 SOP 與規格',
    rules: ['新文件放哪一層', '檔名怎麼取', '每份開頭要有摘要'],
    output: '一個問得動的資料夾，而且它會告訴你哪兩份文件互相矛盾',
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
    <SlideLayout title="「專案」不是只有寫程式" subtitle="What Counts as a Project" icon={FolderTree}>
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
                手冊寫什麼
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
            <strong className="text-slate-100">知識庫那一格交不出東西</strong>，它是其他三格的材料。
            同一批材料可以做成課程簡報，也可以做成策略報告，但那是兩個專案，規矩與產出格式都不同。
            材料集中放一份，專案照產出切開。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={7} className="px-1">
          <p className="text-slate-400 text-sm leading-relaxed">
            四種的寫法一樣，難的是「第一條該寫什麼」。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
