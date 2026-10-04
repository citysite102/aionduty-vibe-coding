import { ListTodo } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { PairTable } from './_PairTable';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23：原本這一頁叫學員「把手冊裡每一條規則抄下來」。講師回饋兩件事：
 * 一、沒有人會真的一條一條抄，而總覽頁（17_HealthOverview）給的那段指令本來就包含盤點，
 *     所以這一步的實際動作是「貼指令，它列給你看」，學員只負責圈出想不起來的。
 * 二、更重要的是，那些理由如果回頭寫進 CLAUDE.md，手冊會越健檢越長，
 *     正好跟這一整段要解決的問題相反。所以多一塊 amber 明說理由留在對話裡。
 */

/**
 * 2026-10-03 收窄「理由不要寫回手冊」這一句。原本的講法會跟 Slide 111
 * 「規則怎麼寫：寫出為什麼」正面衝突，學員兩頁都聽得到，會不知道要聽哪一個。
 * 分界是長度與用途：**一句能讓它推出下一步的理由要留；那件事的經過不要留。**
 * 改這一頁或「寫出為什麼」那一組的時候兩邊要一起看（併頁後在 12_WriteBasis）。
 */

/**
 * 2026-10-04（第二輪）講師再追一刀：「上一頁那段指令應該無法達到這個效果？」
 * **對的，而且錯得比表面嚴重。** 原本這張表的右欄是「為了解決哪一次的問題」，
 * 但那是一段歷史，Claude 沒看過，它只讀得到現在的程式碼。上一頁那段指令要不到這一欄；
 * 就算你硬要它填，它也只會**猜一個聽起來很合理的理由**，而你會相信那個理由，
 * 然後拿它去決定要不要刪規則。這跟 CLAUDE.md D-2 記著的那個坑是同一個
 * （問它「我們最近幾次對話你漏掉哪幾條」，它會編一份名單出來）。
 *
 * 所以這一頁改成三欄，把「它答得出來的」跟「只有你答得出來的」分開：
 *   規則（它列） / 它從現在的程式碼看得出什麼（它答） / 你還記得當初為什麼加嗎（你答）
 * 上一頁那段指令的第一步也跟著補上「不要猜我當初為什麼寫」。**兩頁要一起改。**
 * 這一刀其實讓這一段更有力：盤點那一欄只有你本人答得出來，這就是健檢非你自己跑不可的理由。
 */

/**
 * 2026-10-04：講師兩個問題，病根是同一個：這一頁沒說清楚誰做哪一半。
 *   「這一步讓它列給你看，你只圈出想不起來的」看不懂，是透過 Prompt 要求它整理嗎？
 *   「想不起來的先打問號」是 AI 自己打問號？
 * 答案是：**表是它列的，問號是你打的**。原本大字只寫「讓它列給你看」，沒有接回上一頁那段指令；
 * 「想不起來」的主詞也沒寫出來（是你想不起來，不是它）。現在三處都寫明動作歸誰：
 * 大字、step 3 那一句、以及口白。**不要再把主詞省掉。**
 */
/**
 * 2026-10-04（第三輪）講師：「同學會困惑這個是不是要自己填寫，然後要填寫在哪裡？」
 * 病根是這一頁只說了誰答，沒說**在哪裡答**。學員看到一張畫好格線的表，
 * 預設它是一份發下來要填的表單，於是卡在「我要去哪裡開這個檔案」。
 * 三處補上：表頭每一欄掛「Claude 列／Claude 答／你答」的標籤、
 * step 3 明說這張表是印在對話視窗裡的、口白補一句直接接著在對話裡回它。
 * **不要把「在對話裡回」這一句省掉**，它是這一頁唯一說明操作位置的地方。
 */
export const meta: RecordedMeta = {
  id: 'harness-18-health-inventory',
  title: '手冊健檢：盤點交給它列，你只圈問號',
  script:
    '第一步是盤點。先把上一頁那段指令貼進去，它會把你手冊裡每一條規則列成一張表，然後在中間那一欄寫上它從現在的程式碼看得出什麼。' +
    '這裡要說清楚它答得出什麼、答不出什麼。中間那一欄它答得出來，因為它讀得到你的檔案：禁用 inline style 這一條，它可以去翻一遍，回你「我在 src 底下沒找到任何 inline style，這一條有在生效」。' +
    '右邊那一欄它答不出來。當初為什麼加這一條，是一段只有你在場的歷史，它沒看過。所以上一頁那段指令裡有半句「不要猜我當初為什麼寫」，那一句是故意加的。你不擋它，它會給你一個聽起來非常合理的理由，而你會相信，然後拿那個理由去決定要不要刪掉這一條。' +
    '所以右邊那一欄要你自己答。畫面上那段可以直接貼過去，它會照那張表一條一條問你。倒數分鐘數集中成設定這一條，你想起來是因為每次改都要翻半天，那就回一句上去。按鈕文案那一條你想不起來，那就回一個問號。你不用另外開檔案或開試算表，整件事就在對話裡完成。為什麼非得你答？因為下一步要決定刪哪幾條，而答得出理由的那幾條先留著，標了問號的那幾條才是要處理的對象。畫面上那個問號是你打的，不是 Claude 打的。' +
    '打了問號不代表要刪，先標著就好，那幾條就是下一步要處理的對象。這裡有一件事要注意：盤點列出來的是來龍去脈，像是哪一次出事、當時誰說的，這些留在對話裡給你看就好，不要整段貼回 CLAUDE.md。健檢是要讓手冊變短，每一條後面再掛一段歷史，下一輪只會更長。那跟後面會講的「規則要寫出為什麼」會不會衝突？不會，差別在長度跟用途：寫進手冊的是一句它推得出下一步的理由，例如因為這是太空任務主題；不用寫進去的是那件事的經過。',
  seconds: 140,
  // 多了一段給學員複製的追問指令（見上面第四輪那段註解），壓不回 160 字，
  // 理由同 17_HealthOverview：那段字串要自己說得通，縮短就失去它的用處。
  kind: 'reference',
  from: 69,
};

/**
 * 中間那一欄是它答得出來的（它讀得到現在的程式碼），右欄是只有你答得出來的。
 * 右欄留空的那一列，畫面上會顯示成問號標記。
 *
 * **兩條規則都取自學員自己那份手冊**（`_handbookVersions.ts` 的 v1）。
 * 2026-10-04 換掉的原因有兩個：原本用「禁用 inline style」對「src/ 底下沒找到，有在生效」，
 * 一、那一格沒說「沒找到」的是什麼，讀起來接不起來（講師：「為什麼禁用 inline style
 * 和這個相關？」）；二、inline style 與 src/ 都是只有工程師看得懂的字（CLAUDE.md D-2），
 * 而這一段的學員手上就有兩條白話的規則可以用。中間那一欄現在也寫出它翻了哪個檔案，
 * 「它答得出來」才有依據。**換例子的時候一樣要從學員手上那份手冊挑。**
 */
const ROWS: [string, string, string][] = [
  ['倒數分鐘數集中成設定', '翻過 index.html，寫在最上面，有照做', '記得，不然每次改都要翻半天'],
  ['按鈕文案：發射、待機、返航', '按鈕文字就是這幾個，有照做', ''],
];

export default function RecHealthInventory() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ListTodo}>
      <RecPage>
        <SeriesRail {...HEALTH_RAIL} current={0} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">它列得出規則，<Key>列不出你當初為什麼加</Key></p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="grid grid-cols-[1fr_1.4fr_1.2fr] border-b border-slate-800 bg-slate-950/60 text-base text-slate-500">
            {([['Claude 列', '規則'], ['Claude 答', '它從程式碼看得出什麼'], ['你答', '你還記得當初為什麼加嗎']] as [string, string][]).map(
              ([who, label], i) => (
                <div key={label} className={`px-6 py-3 ${i ? 'border-l border-slate-800' : ''}`}>
                  <span
                    className={`mr-2 rounded px-1.5 py-0.5 text-sm ${
                      who === '你答' ? 'bg-sky-500/15 text-sky-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {who}
                  </span>
                  <span className="font-mono">{label}</span>
                </div>
              ),
            )}
          </div>
          {ROWS.map(([rule, found, why], i) => (
            <div key={rule} className={`grid grid-cols-[1fr_1.4fr_1.2fr] ${i ? 'border-t border-slate-800' : ''}`}>
              <div className="px-6 py-4 text-lg text-slate-200">{rule}</div>
              <div className="border-l border-slate-800 px-6 py-4 text-lg text-slate-400">{found}</div>
              <div className="border-l border-slate-800 px-6 py-4 text-lg text-slate-400">
                {why || (
                  <span className="inline-flex items-center rounded-md border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 font-mono font-bold text-sky-300">
                    ？
                  </span>
                )}
              </div>
            </div>
          ))}
        </AnimatedBlock>

        {/*
          2026-10-04（第四輪）講師兩句：「這句話太 AI」「我也不懂為什麼一定要我答，
          而且要我答勢必就要有 Prompt 給 AI 才對」。兩個都對：
          原本那句只交代了位置，沒說答了要幹嘛；而學員手上沒有任何一句可以讓它開始問。
          現在換成一段可以直接貼的追問指令，加一句講清楚問號的用途。
          **這段 Prompt 是接在上一頁那張表後面用的**，字串裡要自己說得通（A-4）。
        */}
        <AnimatedBlock stepIndex={3} className="mt-5 rounded-2xl border border-sky-900/50 bg-sky-950/20 px-6 py-4">
          <div className="text-base font-mono uppercase tracking-widest text-sky-500 mb-2.5">Prompt</div>
          <p className="text-sky-100 text-lg leading-relaxed">
            「照你剛才列的那張表，一條一條問我當初為什麼加這一條。
            我答得出來就記下來，答不出來的標一個問號，不要替我補理由。」
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-3 pt-3 border-t border-sky-900/50">
            答得出來的那幾條先留著；標了問號的，就是下一步減法要先看的。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-5">
          <p className="text-slate-300 text-xl leading-relaxed">
            ⚠️ 這張清單留在對話裡，不要回頭寫進 <code className="font-mono text-orange-300">CLAUDE.md</code>，
            否則手冊只會越整理越長。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
