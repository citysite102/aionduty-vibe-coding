import { ClipboardCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { PairTable } from './_PairTable';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-04 三處改動，都是講師回饋：
 *   1. 標題從「手冊健檢：五步，順序不能換」換成「手冊（CLAUDE.md）健檢五步驟」。
 *      改的時候 `courseUnits.ts` 的 anchor 要一起改（這一頁是單元 6-4 的起點）。
 *   2. 「建議每三個月跑一次」拿掉。三個月沒有出處，是編出來的數字（CLAUDE.md D-2
 *      禁編造的量化數據）。換成兩個學員自己看得到的訊號：手冊超過兩百行（這個數字有出處，
 *      官方文件給的目標值，Slide 68 講過），或者同一件事你又跟它講了第二次。
 *   3. Prompt 原本寫「照上面五步整理」，**但學員按複製貼過去，Claude 看不到「上面」是什麼**
 *      （CLAUDE.md A-4：複製鈕拿到的字要自己說得通）。現在五步的名稱與各自要回答什麼
 *      全部寫進那段字串裡。**不要再把它縮回去。**
 */
export const meta: RecordedMeta = {
  id: 'harness-17-health-overview',
  title: '手冊（CLAUDE.md）健檢五步驟',
  script:
    '手冊越寫越長是正常的，不是你沒紀律，因為每加一條的當下都有理由。所以它需要的不是克制，是一套固定的整理流程。' +
    '什麼時候跑？不用排時間，看到兩個訊號就跑：手冊超過兩百行，或者同一件事你又跟它講了第二次。' +
    '五步：盤點、減法、歸位、加法、修剪。順序不能換，減法一定要排在歸位前面，講到減法的時候會說為什麼。' +
    '下面這段可以直接貼給它。注意它把五步各自要回答什麼都寫進去了，因為你貼過去的時候，它看不到畫面上這張表。最後那句也別刪：先不要動檔案，列給我看。',
  seconds: 48,
  // 那段 Prompt 是給學員停下來複製的，五步各自要回答什麼都得寫在字串裡（見上面第 3 點），
  // 所以整頁超過 160 字是預期中的，標 reference 不套那條上限
  // （跟 32_Cheat_Tools、66b_HookHandlerCases 同一個理由）。
  kind: 'reference',
  from: 69,
};

const STEPS: [string, string][] = [
  ['1　盤點', '每條規則當初為了什麼而加'],
  ['2　減法', '刪掉已經不需要的'],
  ['3　歸位', '把留下來的送到該去的地方'],
  ['4　加法', '這時候才補新規則'],
  ['5　修剪', '把句子改成可以檢查的'],
];

export default function RecHealthOverview() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={ClipboardCheck}>
      <RecPage>
        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">五個步驟，<Key>順序不能換</Key><span className="block mt-2 text-slate-500 text-base">兩個訊號就該跑一次：手冊超過兩百行，或同一件事你又講了第二次</span></p>
        </AnimatedBlock>

        {/* 上方流程軌已經列出五個步驟，這裡不再加表頭，只補分隔線把配對框起來 */}
        <PairTable
          stepIndex={2}
          ratio="narrow"
          density="compact"
          rows={STEPS.map(([n, d]) => [
            <span className="font-mono font-bold text-sky-400">{n}</span>,
            d,
          ])}
        />

        {/*
          這裡原本有一塊 callout 寫「先刪再搬，順序反了就會把該刪的搬到別處，繼續佔著空間」。
          那句話就是第二步那一頁（19_HealthSubtract）整頁的主張，預告先把結論講完，
          走到那一頁時只剩重複。這一頁的職務是列出五步並給一句可以貼的指令，
          為什麼不能換順序留給第二步自己講。
        */}

        {/* 五步是給人看的流程，這一段是給人貼的。少了它，學員回去只會記得「有五步」但不知道怎麼開始。 */}
        <AnimatedBlock stepIndex={3} className="mt-5 rounded-2xl border border-sky-900/50 bg-sky-950/20 px-6 py-4">
          <div className="text-base font-mono uppercase tracking-widest text-sky-500 mb-2.5">Prompt</div>
          <p className="text-sky-100 text-base leading-relaxed">
            「讀一遍我的 <code className="font-mono text-orange-300">CLAUDE.md</code>，照這五步整理，
            <strong className="font-bold">先不要改檔案，列給我看</strong>：
            一、盤點，每一條在管什麼；二、減法，哪幾條已經有程式在擋、或它管的東西不在了；
            三、歸位，哪幾條只跟某一區檔案有關；四、加法，照現在的程式碼看有沒有該寫而沒寫的；
            五、修剪，哪幾句我做完也答不出有沒有做到。」
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
