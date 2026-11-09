import { FolderOpen, UserCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元 8-5 第四頁。2026-11-09 從 `28b_M4_FirstDay` 拆出來（Codex 審查建議，講師同意）。
 *
 * 上一頁原本一頁裝著四個步驟、四種文件的分工與失敗三問，三套清單搶主角。
 * 現在上一頁只留「這一次怎麼跑完」，**這一頁處理「下一次還接不接得上」**。
 * **不要把文件分工搬回上一頁。**
 *
 * ── 這一頁比原本多的那一塊：開工時叫它覆述 ────────────────────
 * `28b0` 的檔頭與口白都說過「存成檔案，不等於它就會讀到、讀對、而且照著做」，
 * 但全片一直沒有給學員一個做得到的動作。中間那段可複製的開工指令就是那個動作：
 * 先讀指定的檔案，把範圍、驗收條件與未完成事項**覆述一遍**，等你確認再繼續。
 * **這一塊不要刪**，它是這一頁跟「把東西存起來就好」之間的差別。
 *
 * ── 四種文件 ───────────────────────────────────────
 * 只給最小示例，完整的脈絡分層是單元 8-7 第一頁（`28d_M4_ProjectMemory`）的事，
 * 兩邊的分工要一致：**跨次有效的規則進 `CLAUDE.md`，這一次的需求與驗收條件進規格文件，
 * 進度進進度文件，真的會重用的做法才整理成 Skill。** 改一邊就要回去看另一邊。
 * Codex 用的是 `AGENTS.md`，畫面上要一起寫，**不要只寫 Claude 那一個**。
 *
 * ── 2026-11-09 兩份文件補上檔名（講師）─────────────────────────
 * 病根：底下那段開工指令叫學員「先讀 docs/spec.md 與 docs/progress.md」，但那兩個路徑
 * **全片沒有任何一頁教過**。`progress.md` 更是只出現在那一段 Prompt 裡；`spec.md` 只在
 * 單元 8-1 的口白出現過一次（「交出去的是一個叫 spec.md 的檔案」），畫面上沒有。
 * 而這張表用的是中文類別名，一個檔名都沒給，所以學員讀到那段指令會不知道那兩個檔哪來的。
 * 這正是 A-4 那條驗收沒過：**把複製鈕吃的那個字串單獨讀一遍，它自己說得通嗎**。
 *
 * 現在規格文件與進度文件各掛一個檔名，那段指令才有來源。`docs/` 的寫法跟章節六
 * （`25d_M3_ProductTeam`、`26d_M3_QuoteSystemStandards`）同一套，學員見過。
 * **8-1 的口白講的是沒有資料夾的 `spec.md`**，改這裡要順手看一眼那一支對不對得上。
 *
 * 檔名**走灰階，不要上橘色**：A-1 的 orange 只標產品專有名詞，而 `docs/spec.md`
 * 是學員自己專案裡的檔案，不是 Claude 的東西（同一條擋掉 `git commit`、`.env`）。
 * 四列裡兩個橘（`CLAUDE.md`、Skill）兩個灰，剛好就是「誰家的東西」那個分野。
 *
 * 失敗三問與那個虛線框原樣搬過來。虛線框跟 8-6 最後一頁的行動邊界是同一條，
 * **搬頁的時候兩邊一起看**。
 *
 * 用色：sky（失敗三問的編號與虛線框）一種。`CLAUDE.md`、`AGENTS.md`、`SKILL.md`
 * 的 orange 是專有名詞，不計入（A-1）。
 */

const DOCS = [
  {
    k: 'CLAUDE.md',
    mono: true,
    v: '跨次任務仍然有效的專案指引與工作規則',
    eg: '一律用繁體中文回覆；改任何檔案前先說你要改什麼。Codex 那邊這份叫 AGENTS.md',
  },
  {
    k: '規格文件',
    file: 'docs/spec.md',
    v: '這一次要做什麼、不做什麼，以及驗收條件',
    eg: '只處理上個月的報表；合計要跟人工核對的答案一樣；缺日期的資料列出來，不要自己補',
  },
  {
    k: '進度文件',
    file: 'docs/progress.md',
    v: '現在做到哪、哪些還沒完成、哪些等你確認',
    eg: '十筆對完八筆；兩筆缺日期，等你回覆要不要排除',
  },
  {
    k: 'Skill',
    mono: true,
    v: '真的會跨任務重用的那套做法',
    eg: '每個月的報表都照同一套步驟跑，才值得整理成 Skill',
  },
];

const KICKOFF = [
  '開始之前，先讀 docs/spec.md 與 docs/progress.md。',
  '把這一輪的工作範圍、驗收條件，以及上一次還沒完成的事項各覆述一遍。',
  '有讀不到或對不起來的地方先說，等我確認之後再開始做。',
].join('\n');

const RECOVER = [
  { n: '1', k: '停在哪裡', v: '已經完成了什麼？哪些操作已經生效，收不回來了？' },
  { n: '2', k: '怎麼恢復', v: '修正、重試、回退，或是確認狀態之後安全地繼續。' },
  { n: '3', k: '什麼時候交給人', v: '超過你寫下來的重試次數、狀態確認不了，或是需要一個重要決定。' },
];

export default function SlideWorkDocs() {
  return (
    <SlideLayout
      title="保存工作文件，讓下次接得上"
      subtitle="Make It Reusable"
      icon={FolderOpen}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3.5 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          這一輪跑完了。四份文件分屬兩層脈絡：
          <strong className="text-slate-100">CLAUDE.md 每次開工自動讀進去，規格與進度文件要你叫它讀才會進來。</strong>
          <span className="mt-1 block text-sm text-slate-500">
            CLAUDE.md 是運作框架（Harness）裡的規則文件那一塊，另外兩份是這個專案的工作脈絡。
          </span>
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_1fr] items-start">

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <h3 className="text-base font-bold text-slate-100">哪一句話該寫進哪一份</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
              不是全部都塞進 <code className="font-mono text-orange-300">CLAUDE.md</code>。四種各有職務：
            </p>
            <dl className="mt-2 space-y-2 border-t border-slate-800 pt-2 text-sm leading-relaxed">
              {DOCS.map((d) => (
                <div key={d.k} className="flex gap-2.5">
                  <dt className={`w-20 shrink-0 ${d.mono ? 'font-mono text-orange-300' : 'font-medium text-slate-200'}`}>
                    {d.k}
                  </dt>
                  <dd className="min-w-0 text-slate-400">
                    {/* 檔名走灰階等寬，**不要上橘色**：`docs/spec.md` 是你自己專案的檔案，
                        不是 Claude 的東西（A-1 orange 只標產品專有名詞）。兩個橘的是 Claude 那邊的，
                        兩個灰的是你自己的，這個對比本身就有用。 */}
                    {d.file && <code className="mr-2 font-mono text-xs text-slate-300">{d.file}</code>}
                    {d.v}
                    <span className="mt-0.5 block text-slate-600">例：{d.eg}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
            <h3 className="text-base font-bold text-slate-100">失敗的時候，你要知道三件事</h3>
            <ol className="mt-2 space-y-2">
              {RECOVER.map((r) => (
                <li key={r.n} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="font-mono text-sm font-bold text-sky-300">{r.n}</span>
                  <p className="min-w-0 text-slate-400">
                    <strong className="text-slate-200">{r.k}：</strong>
                    {r.v}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-dashed border-sky-500/40 px-3.5 py-2.5">
              <UserCheck aria-hidden="true" size={15} className="mt-0.5 shrink-0 text-sky-300" />
              <p className="text-sm leading-relaxed text-slate-300">
                重試幾次就停，
                <strong className="text-slate-100">在開工之前就寫進規格文件</strong>，不要等它卡住才現場決定。
              </p>
            </div>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4}>
          <h3 className="mb-1.5 text-base font-bold text-slate-100">存起來，不等於它下次會讀到</h3>
          <CopyBlock label="下一輪的開工指令" note="貼在新的一輪最前面，確認它真的讀到了" text={KICKOFF} />
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
