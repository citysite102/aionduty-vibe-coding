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
 * `kind: 'reference'`：三題並排是給學員停下來對照自己想的答案，所以不套 160 字與 45 秒
 * （跟 `32_Cheat_Tools`、`11_WriteScope` 同一個理由）。錄的時候一題一題出
 * （`stepIndex` 1 到 3），不要一次展開。
 */
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
  title: '三題的答案：五條規則，各放哪一層',
  script:
    '三十秒到了，三題一起對。' +
    '第一題：哪些事情違反了會出事？答案是成本結構和利潤率不能出現在給客戶的檔案裡。這是手冊的第一條，但它不能只靠這一行。一次外洩的代價太高，而手冊是說服不是攔截，這一條還需要一道程式，在檔案寄出去之前擋下來。所以它的去處是 Hook。' +
    '第二題：哪些事情只有特定情況才適用？一個客戶要英文版、另一個不收 PDF，這種只跟某一個客戶有關的規則不要全塞進同一份，不然你有二十個客戶就有二十條，它會越寫越長。分到子目錄，手冊裡只留一行指過去，用到那個客戶的時候才讀。' +
    '第三題：哪些事情你每次都要重講一次？以提案來說，就是分哪幾段、公司簡介用哪一版、語氣要多正式。這三件事你想的時候會覺得太瑣碎、不值得寫，但正因為瑣碎，你每次都會重講一遍。一寫下來，手冊就補齊了。往後不用再講一次，它每一輪都讀得到；真的沒照做，你也有一條可以指。這三條留在根目錄那一份就好。' +
    '三題答完，畫面下面那份檔案也長好了，五條規則。' +
    '這裡要注意的是，三個問題問完，你拿到的不只是內容，每一條該放哪一層也一起決定了：會出事的那一條去 Hook，只跟某個客戶有關的去子目錄，每次都要重講的留在根目錄。這就是前面那四個問題的同一套判斷，只是這次換成一份完全不是程式的工作。' +
    '四個去處裡只有 Skill 那一層這個例子還用不到。等你連提案的產製步驟都固定了，第三題那三條就會變成一個 Skill。',
  seconds: 150,
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
            <span className="block mt-3 text-slate-500 text-lg">
              Skill 那一層這個例子還用不到。等你連提案的產製步驟都固定了，第三題那三條就會變成一個 Skill。
            </span>
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
