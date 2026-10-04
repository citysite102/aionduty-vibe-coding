import { Settings } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * `when` 那一欄答的是「現在有了嗎」，**不要寫成「下一頁」「第幾頁」這種頁面位置**
 *（2026-10-04 講師）。頁序會變，而且那一欄問的是狀態不是行程。要指路就講章節或
 * 不指定時間的說法（「後面會講」），不要指頁。
 *
 * 2026-10-04 新增。講師的回饋是：「專案架構等等，好像會沒有辦法和 Harness 運作框架
 * 做到很好連結的理解。」查下去這一段的斷點很明確：
 *
 *   這一段叫「換成你的工作」，但它只換了運作框架的**一個**零件。
 *   Slide 50（`19c_Harness_Architecture`）把運作框架拆成六塊，而 Slide 117、118 的
 *   三個問題只走到「規則文件」那一塊。Slide 76、77 示範過 Hook 與 MCP 的情境，
 *   但那是在**程式專案**上。所以學員看到的是：程式專案有六個零件，我的工作只有一份手冊。
 *
 * 這一頁補的就是那條線：同一份提案工作，六塊各自對應什麼、現在有了沒有。
 *
 * **六塊的名字一字不改地沿用 Slide 50**，不要在這裡自創分法。這門課已經有三組會互相
 * 混淆的清單（運作框架六塊、零件總表七個、規則歸位四個去處），再多一組學員就分不出來了。
 * **Skill 屬於「工具」那一塊**（2026-10-04 講師定位），不是第七個零件，也不要另開一列。
 * 它跟 MCP 一樣是叫到才進來的擴充，差別在 MCP 接的是外面的服務、Skill 包的是一套固定步驟。
 * `19c_Harness_Architecture` 的「工具」那一格同一輪也補上了 Skill，兩邊要一致。
 *
 * 最後兩列刻意是「用不到」。那不是湊數：**這一頁要教的一半就是「不是每個工作都需要六塊」**，
 * 兩列空著比六列都填滿更誠實，也讓學員敢在自己的工作上留白。
 */
const MAP = [
  {
    part: '規則文件',
    en: 'Rule Files',
    to: '剛才那五條，加上各客戶那一份',
    when: '這一段做完了',
    state: 'done',
  },
  {
    part: '工具',
    en: 'Tools',
    to: '客戶名單與報價在 Notion，接上去它自己查；提案的產製步驟包成一個 Skill，叫一次就展開',
    when: '還沒做',
    state: 'next',
  },
  {
    part: '自動關卡',
    en: 'Hook',
    to: '寫進 out/ 之前擋掉帶成本數字的檔案',
    when: '剛剛掛好了',
    state: 'done',
  },
  {
    part: '指揮分工',
    en: 'Orchestration',
    to: '寄出前派一個只讀不寫的角色，照那五條逐條挑錯',
    when: '章節七會動手做',
    state: 'later',
  },
  {
    part: '沙箱',
    en: 'Sandbox',
    to: '這個工作用不到：寫提案沒有會把東西弄壞的指令',
    when: '',
    state: 'skip',
  },
  {
    part: '事後查得到',
    en: 'Observability',
    to: '這個工作用不到：一次只做一份，你自己看得完',
    when: '',
    state: 'skip',
  },
];

const TONE: Record<string, { row: string; part: string; tag: string }> = {
  done: { row: 'bg-sky-950/20', part: 'text-sky-300', tag: 'text-sky-400' },
  next: { row: 'bg-sky-950/20', part: 'text-sky-300', tag: 'text-sky-400' },
  later: { row: '', part: 'text-slate-300', tag: 'text-slate-500' },
  skip: { row: '', part: 'text-slate-500', tag: 'text-slate-600' },
};

export const meta: RecordedMeta = {
  id: 'harness-45-transfer-harness',
  title: '這份提案工作，六個零件各對應什麼',
  script:
    '退一步看一下你剛才做完的是什麼。' +
    '前面講運作框架的時候，把它拆成六塊：規則文件、工具、自動關卡、指揮分工、沙箱、事後查得到。那六塊當時是用一個程式專案在講的，所以你可能會覺得那是工程師的事。這一頁把同樣六塊套在剛才那份提案工作上，你會看到它一樣成立。' +
    '第一塊，規則文件。就是剛才那五條，加上各客戶那一份。這一塊你已經做完了。' +
    '第二塊，工具。你的客戶名單跟歷史報價多半不在這台電腦上，可能在 Notion 或公司的系統裡。把它接上去，它就自己去查，你不用再複製貼上，這一塊還沒做，後面會講怎麼接，連同 Skill 怎麼寫。工具這一塊還有另一半：Skill。等你連提案怎麼產都固定了，那幾個步驟包成一個 Skill，叫一次就展開，它跟 MCP 一樣是叫到才進來的。' +
    '第三塊，自動關卡。就是你上一頁剛掛好的那一條：寫進 out 之前擋掉帶成本數字的檔案。' +
    '第四塊，指揮分工。寄出前派一個只讀不寫的角色，照那五條逐條挑錯。這一塊章節七會動手做，現在先知道它存在。' +
    '第五塊跟第六塊我要誠實講：這份工作用不到。沙箱是怕它跑壞東西，而寫提案沒有那種指令；事後查得到是怕量大到你看不完，而你一次只做一份。' +
    '最後那兩列空著是刻意的，它們是這一頁的另一半重點：不是每個工作都需要六塊都有。你換成自己的工作也一樣，先看哪幾塊真的用得到，用不到的就留白，不要為了把表填滿去做一個你不需要的東西。',
  seconds: 150,
  kind: 'reference',
};

export default function RecTransferHarness() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={Settings}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-2xl font-bold leading-snug">
            前面那六塊是用程式專案講的，<Key>換成提案工作一樣成立</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[9rem_1fr_7rem] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-500">
            <span>運作框架那六塊</span>
            <span>這份提案工作對應什麼</span>
            <span>現在有了嗎</span>
          </div>
          {MAP.map((m) => {
            const t = TONE[m.state];
            return (
              <div
                key={m.part}
                className={`grid grid-cols-[9rem_1fr_7rem] gap-4 items-baseline px-6 py-3.5 border-b border-slate-800/70 last:border-0 ${t.row}`}
              >
                <span>
                  <span className={`text-lg font-bold ${t.part}`}>{m.part}</span>
                  <span className="block font-mono text-sm text-slate-600">{m.en}</span>
                </span>
                <span className={`text-base leading-relaxed ${m.state === 'skip' ? 'text-slate-500' : 'text-slate-300'}`}>
                  {m.to}
                </span>
                <span className={`text-base ${t.tag}`}>{m.when || '不需要'}</span>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 最後兩列空著是刻意的：<Key>不是每個工作都需要六塊都有</Key>。
            換成你自己的工作也一樣，用不到的就留白，不要為了把表填滿去做一個你不需要的東西。
          </p>
          <p className="text-slate-500 text-base leading-relaxed mt-3">
            Skill 就在「工具」那一塊：跟 MCP 一樣是叫到才進來，差別在它包的是一套固定步驟。
            等你連提案怎麼產都固定了，第 3 題那三條就會變成一個 Skill。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
