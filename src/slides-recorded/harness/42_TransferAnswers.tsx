import { GitFork } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { ProposalDraft } from './_ProposalDraft';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-04：這一頁是四頁併出來的（`43_TransferQ2`、`44_TransferQ3`、`42_TransferQ1`，
 * 加上原本單獨一頁的對照表 `46_TransferMapping`）。四頁的文字一字沒改，只是重排。
 *
 * 併的理由有兩個：
 *   1. 前三頁的結構完全一樣（題目框加 `AskFirst` 加答案大字加 `ProposalDraft`），
 *      而學員三十頁前才看過同一個形狀的「規則該放哪」四問（Slide 87-91）。
 *      連著看會覺得在重看同一支影片。先例是 `33_SurfaceIntro` 的檔頭：
 *      「三頁分開講，學員反而看不出它們的差別在哪，因為沒有並排。」
 *   2. `46_TransferMapping` 的職務是把三題的答案對到四個去處，而那三行分開放在
 *      三頁的時候，學員要自己記著前兩題的答案才對得起來。現在去處直接寫在
 *      各題答案的下面，那張表就不必另外開一頁。
 *
 * **`AskFirst` 不要搬進來。** 它在上一頁（`41_TransferCase`）已經出現過，
 * 那一頁列出三個問題並要學員先想三十秒；這一頁的職務是公布答案，再問一次等於
 * 把同一個停頓做兩次。
 *
 * 口白加上那棵樹之後推算 199 秒（三分多鐘），是這一段最長的一頁，刻意的：
 * 它同時是三題的答案與整個專案架構的全局圖，拆成兩頁會讓樹離開它的依據。
 *
 * `kind: 'reference'`：三題並排是給學員停下來對照自己想的答案，所以不套 160 字與 45 秒
 * （跟 `32_Cheat_Tools`、`11_WriteScope` 同一個理由）。錄的時候一題一題出
 * （`stepIndex` 1 到 3），不要一次展開。
 */
/**
 * 2026-10-04（講師）：「最下面我預期要有一個完整的資料夾結構⋯我想要用一個全局的觀念
 * 讓同學先掌握專案架構。」所以這一頁的收尾從一句話換成一棵樹。
 *
 * 設計上守住三件事：
 *   1. **前三列是這三題剛答出來的**（根目錄手冊＝第 3 題、客戶子目錄＝第 2 題、
 *      settings.json 的 Hook＝第 1 題），所以樹不是憑空出現的，每一行都指得回去。
 *   2. **後兩列標「後面會補」**，它們在這一頁還沒教（Skill 在這一段最後、
 *      reviewer 在章節七）。標出來才是全局圖，不標就變成沒頭沒腦的檔案清單。
 *   3. `proposal-reviewer.md` 跟 `quote-reviewer` 一樣**是情境裡的名字，沒有真的建**
 *      （比照 26g_M3_Harvest 的那一句）。它在這裡的作用是先讓學員知道位置。
 *
 * **`.claude/rules/` 刻意不放進樹裡。** 這份工作的範圍剛好是一個客戶一個資料夾，
 * 答案就是子目錄的 CLAUDE.md（第 2 題），放 rules/ 會跟自己的答案打架。
 * 它改成樹底下那一行但書，接回〈規則該放哪一層〉教的那個分界。
 *
 * 路徑要跟別頁對得上：`SKILL.md` 的位置與 61_TransferIntegrate 一致，
 * 客戶子目錄的寫法與那一份 Skill 的第 1 步一致。**動其中一邊就要回來看另一邊。**
 */
const TREE: { line: string; note: string; tag?: string; later?: boolean }[] = [
  { line: '提案/', note: '' },
  { line: '├─ CLAUDE.md', note: '提案固定五段、公司簡介用短版、語氣正式', tag: '第 3 題' },
  { line: '├─ clients/', note: '' },
  { line: '│　├─ A/CLAUDE.md', note: '要英文版', tag: '第 2 題' },
  { line: '│　├─ B/CLAUDE.md', note: '只收 Word，不收 PDF' },
  { line: '│　└─ D/CLAUDE.md', note: '成本絕對不能出現' },
  { line: '├─ out/', note: '要寄出去的檔案放這裡。下一頁那條 Hook 只管這一層' },
  { line: '└─ .claude/', note: '' },
  { line: '　　├─ settings.json', note: '寫進 out/ 之前擋掉帶成本數字的', tag: '第 1 題' },
  { line: '　　├─ skills/client-proposal/SKILL.md', note: '提案怎麼產，五個步驟', tag: '後面會補', later: true },
  { line: '　　└─ agents/proposal-reviewer.md', note: '寄出前逐條挑錯，只讀不寫', tag: '章節七會做', later: true },
];

const ANSWERS = [
  {
    no: '第 1 題',
    q: '哪些事情違反了會出事？',
    a: '成本結構與利潤率不得出現在對外檔案',
    to: 'Hook',
    why: '這一條不要只寫進手冊。一次外洩的代價太高，而手冊是說服不是攔截，要有一道程式在檔案寄出去之前擋下來。',
    hard: true,
  },
  {
    no: '第 2 題',
    q: '哪些事情只有特定情況才適用？',
    a: '各客戶的專屬格式：A 客戶要英文版、B 客戶不收 PDF',
    to: '子目錄',
    why: '全塞進同一份，你有二十個客戶就有二十條。分到子目錄，手冊裡留一行指過去，用到那個客戶的時候才讀。',
  },
  {
    no: '第 3 題',
    q: '哪些事情你每次都要重講一次？',
    a: '提案固定五段、公司簡介用短版、語氣正式但不用敬語',
    to: '根目錄手冊',
    why: '這三件你想的時候會覺得太瑣碎、不值得寫，但正因為瑣碎，你每次都會重講一遍。寫下來它每一輪都讀得到，真的沒照做你也有一條可以指。',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-42-transfer-answers',
  title: '三題的答案，與每一條該放哪一層',
  script:
    '三十秒到了，三題一起對。' +
    '第一題：哪些事情違反了會出事？答案是成本結構和利潤率不能出現在給客戶的檔案裡。這是手冊的第一條，但它不能只靠這一行。一次外洩的代價太高，而手冊是說服不是攔截，這一條還需要一道程式，在檔案寄出去之前擋下來。所以它的去處是 Hook。' +
    '第二題：哪些事情只有特定情況才適用？一個客戶要英文版、另一個不收 PDF，這種只跟某一個客戶有關的規則不要全塞進同一份，不然你有二十個客戶就有二十條，它會越寫越長。分到子目錄，手冊裡只留一行指過去，用到那個客戶的時候才讀。' +
    '第三題：哪些事情你每次都要重講一次？以提案來說，就是分哪幾段、公司簡介用哪一版、語氣要多正式。這三件事你想的時候會覺得太瑣碎、不值得寫，但正因為瑣碎，你每次都會重講一遍。一寫下來，手冊就補齊了。往後不用再講一次，它每一輪都讀得到；真的沒照做，你也有一條可以指。這三條留在根目錄那一份就好。' +
    '三題答完，畫面下面那份檔案也長好了。三題問出來的東西剛好五條，不是什麼固定的數量，是這個例子剛好有這麼多。' +
    '這裡要注意的是，三個問題問完，你拿到的不只是內容，每一條該放哪一層也一起決定了：會出事的那一條去 Hook，只跟某個客戶有關的去子目錄，每次都要重講的留在根目錄。這就是前面那四個問題的同一套判斷，只是這次換成一份完全不是程式的工作。' +
    '最後看一下整個資料夾長什麼樣，先有個全局的印象，後面每一頁都是在填其中一格。' +
    '最外面是根目錄那份 CLAUDE.md，放第三題那三條。底下一個 clients 資料夾，一個客戶一個子資料夾，各自一份 CLAUDE.md，那是第二題的答案：A 客戶要英文版、B 客戶只收 Word、D 客戶成本絕對不能出現。' +
    '再來有一個 out 資料夾，要寄出去的檔案放這裡，它等一下那條 Hook 只管這一層。' +
    '最後是 .claude 這個資料夾，裡面三個東西。settings.json 放第一題那道 Hook，寫進 out 之前擋掉帶成本數字的。' +
    'skills 底下那一份是提案怎麼產的五個步驟，這一段最後會給你。agents 底下那一份是寄出前逐條挑錯的角色，只讀不寫，章節七會動手做。後面這兩個現在還沒有，先知道它們會住在哪裡。' +
    '有人會問那 .claude 斜線 rules 呢？這份工作用不到，因為客戶的範圍剛好等於一個資料夾，一個資料夾放一份手冊就夠了。要跨好幾個資料夾、或者只管某一種檔案，那時候才換成 rules。',
  seconds: 199,
  kind: 'reference',
  from: 75,
};

export default function RecTransferAnswers() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={GitFork}>
      <RecPage className="space-y-4">
        {ANSWERS.map((x, i) => (
          <AnimatedBlock
            key={x.no}
            stepIndex={i + 1}
            className={`rounded-2xl border px-6 py-4 ${
              x.hard ? 'border-amber-900/40 bg-amber-950/15' : 'border-slate-800 bg-slate-900'
            }`}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 mb-2">
              <span className="font-mono text-base text-slate-500">{x.no}</span>
              <span className="text-slate-300 text-base">{x.q}</span>
            </div>
            <p className="text-slate-100 text-xl font-bold leading-snug mb-2">{x.a}</p>
            <div className="flex flex-wrap items-baseline gap-x-4">
              <span className={`text-lg font-bold ${x.hard ? 'text-amber-300' : 'text-sky-300'}`}>→ {x.to}</span>
              <span className="text-slate-500 text-base leading-relaxed flex-1">{x.why}</span>
            </div>
          </AnimatedBlock>
        ))}

        <ProposalDraft stage={3} stepIndex={4} />

        <AnimatedBlock stepIndex={5} className="px-1">
          <p className="text-slate-300 text-2xl font-bold leading-snug">
            三個問題問完，內容有了，<Key>每一條該放哪一層也一起決定了</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-5">
          <h3 className="text-slate-100 text-xl font-bold mb-1">整個資料夾長這樣</h3>
          <p className="text-slate-500 text-base leading-relaxed mb-4">
            不是一份 <code className="font-mono text-orange-300">CLAUDE.md</code> 而已。
            上面三列是你剛才那三題答出來的，底下兩列是後面會補上的。
          </p>
          <div className="space-y-1">
            {TREE.map((t) => (
              <div key={t.line} className="grid grid-cols-[1.25fr_1fr] gap-4 items-baseline">
                <span className={`font-mono text-base whitespace-pre ${t.later ? 'text-slate-500' : 'text-slate-200'}`}>
                  {t.line}
                </span>
                <span className="flex items-baseline gap-2">
                  <span className={`text-base leading-snug ${t.later ? 'text-slate-600' : 'text-slate-400'}`}>
                    {t.note}
                  </span>
                  {t.tag && (
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-sm ${
                        t.later ? 'bg-slate-800 text-slate-500' : 'bg-sky-500/15 text-sky-300'
                      }`}
                    >
                      {t.tag}
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-base leading-relaxed mt-4 pt-3 border-t border-slate-800">
            客戶那一層之所以是資料夾各放一份手冊，是因為範圍剛好等於一個資料夾。
            要跨好幾個資料夾、或只管某一種檔案，才改用{' '}
            <code className="font-mono text-orange-300">.claude/rules/</code>。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
