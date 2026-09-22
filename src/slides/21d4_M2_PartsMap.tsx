import { Network } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 零件總表。前三頁（21d1 常駐、21d2 用到才展開、21d3 不進對話）各講一種載入時機，
 * 這一頁把七個零件放回同一張表，補上那三頁都沒有的一欄：誰叫它出來。
 *
 * 學員的兩個實際卡點就是這一欄沒講清楚造成的：
 *   「不知道哪些屬於 md 哪些屬於 hook」→ 差別在觸發的是 Claude 還是系統。
 *   「不同 CLAUDE.md 裡面如何提取 skill」→ Skill 不是被手冊提取的，是 Claude 自己判斷要用。
 *
 * 最後那個 Callout 的三題，在 harness/04b_RouteIntro 到 08_RouteQ4 展開成四題，
 * 而且順序相反：那裡照「擋得住的程度」排（先問會不會出事），這裡照「要不要常駐」排。
 * 多出來的那一題是「只在某一區嗎」，這裡塞在第一題的括號裡。
 * 兩組互相呼應，改一邊要回頭看另一邊（B-4，check:slides 掃不到）。
 *
 * 零件名一律 sky，檔案路徑裡屬於 Claude 的才上 orange，.github/ 不是 Claude 的，維持灰階。
 *
 * Rules 出現兩次是對的，不是重複：同樣放在 .claude/rules/ 底下，
 * 開頭沒有寫適用範圍的跟 CLAUDE.md 一起載入，寫了範圍的才是碰到那一區才讀。
 * 原本只列一條放在「整場都在」那一帶，卻寫「動到那一區才讀」，自己跟自己打架。
 *
 * 2026-09-22 兩列改成對稱標籤（沒寫範圍／有寫範圍）。原本上面那列叫 Rules、
 * 說明寫「開頭沒有指定範圍的那種」，讀者在表上第一次碰到「指定範圍」這個詞是在
 * 一個否定句裡，而正面的定義要往下四列才出現。兩邊都把條件寫進名字就不用倒著讀。
 */
const BANDS = [
  {
    when: '整場都在',
    note: '不用你叫，代價是從頭到尾都佔著空間。',
    rows: [
      {
        name: 'CLAUDE.md',
        job: '這個專案的規矩與慣例',
        who: '自動，開場就讀',
        where: 'CLAUDE.md',
        claudeOwned: true,
      },
      {
        name: 'Rules（沒寫範圍）',
        job: '從手冊拆出去的規矩，整個專案都適用',
        who: '自動，跟 CLAUDE.md 一起讀進來',
        where: '.claude/rules/名稱.md',
        claudeOwned: true,
      },
    ],
  },
  {
    when: '用到才展開',
    note: '平常只佔一行，真的要用才把全文讀進來。',
    rows: [
      {
        name: 'Skill',
        job: '一套有步驟、偶爾才跑的流程',
        who: 'Claude 自己判斷要用，你也可以直接點名',
        where: '.claude/skills/名稱/SKILL.md',
        claudeOwned: true,
      },
      {
        name: 'Subagent',
        job: '獨立做完一件事，只回報結論',
        who: 'Claude 派它出去，你也可以指定派誰',
        where: '.claude/agents/名稱.md',
        claudeOwned: true,
      },
      {
        name: 'Rules（有寫範圍）',
        job: '同一個資料夾，但檔案開頭寫了它只管哪一區',
        who: '動到那一區的檔案才讀進來',
        where: '.claude/rules/名稱.md',
        claudeOwned: true,
      },
      {
        name: 'MCP',
        job: '去讀寫外面的系統，例如 Notion、GitHub',
        who: 'Claude 需要動那個系統的時候',
        where: '接一個現成的服務，不是自己寫檔案',
        claudeOwned: false,
      },
    ],
  },
  {
    when: '不進對話',
    note: '程式在跑，不經過 AI 判斷，它想跳過也跳不掉。',
    rows: [
      {
        name: 'Hook',
        job: '固定時機一定要跑的那道檢查',
        who: '不是 Claude，是系統自己觸發',
        where: '.claude/settings.json',
        claudeOwned: true,
      },
      {
        name: 'CI',
        job: '進主線之前的最後一道檢查',
        who: '你推上去之後，GitHub 自己跑',
        where: '.github/workflows/',
        claudeOwned: false,
      },
    ],
  },
];

/*
 * 最後一欄放的是檔案路徑，最長那一條混了中文（.claude/skills/名稱/SKILL.md），
 * 等寬字量不到中文的寬度，欄寬寫死會被它推出畫面外。所以四欄都用 minmax(0, …)
 * 讓它縮得下去，路徑那格再加 break-all 換行。
 */
const COLS =
  'grid grid-cols-1 md:grid-cols-[minmax(0,120px)_minmax(0,1fr)_minmax(0,190px)_minmax(0,230px)] gap-x-5 gap-y-1';

export default function SlideM2PartsMap() {
  return (
    <SlideLayout
      title="手冊、Rules、Skill、Hook 的載入時機"
      subtitle="The Parts at a Glance"
      icon={Network}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          差別在<strong className="text-slate-100">誰叫它出來、什麼時候進來</strong>。
          什麼時候進來，決定了它佔掉多少空間。有些根本不進對話，那種它想跳過也跳不掉。
        </AnimatedBlock>

        {/* 欄位標題要跟第一段表格同時出現（stepIndex 2）。
            它原本沒掛 AnimatedBlock，所以按第一下之前就浮在頁標題底下，
            下面一整片是空的。 */}
        <AnimatedBlock stepIndex={2} className={`${COLS} px-5 text-xs uppercase tracking-widest text-slate-500`}>
          <div>零件</div>
          <div>它負責什麼</div>
          <div>誰叫它出來</div>
          <div>放在哪</div>
        </AnimatedBlock>

        {BANDS.map((band, i) => (
          <AnimatedBlock
            key={band.when}
            stepIndex={i + 2}
            className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"
          >
            <div className="px-5 py-2.5 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-baseline gap-x-3">
              <div className="text-base font-bold text-slate-100">{band.when}</div>
              <p className="text-sm text-slate-500 leading-relaxed">{band.note}</p>
            </div>

            <div className="divide-y divide-slate-800/70">
              {band.rows.map((r) => (
                <div key={r.name} className={`${COLS} px-5 py-2.5 items-baseline`}>
                  <div className="font-bold text-sky-400 text-base">{r.name}</div>
                  <div className="text-slate-300 text-sm leading-relaxed">{r.job}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{r.who}</div>
                  <div
                    className={`text-sm leading-relaxed break-all ${
                      r.claudeOwned ? 'font-mono text-orange-300' : 'text-slate-500'
                    }`}
                  >
                    {r.where}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedBlock>
        ))}

        <Callout tone="focus" label="多一樣東西要放，先問這三題" stepIndex={5}>
          <ul className="space-y-1.5">
            <li>
              <strong className="text-slate-100">每次都要記得的嗎？</strong>
              是的話寫進 <code className="font-mono text-orange-300">CLAUDE.md</code>；
              只有某一區要記得，就放 Rules。
            </li>
            <li>
              <strong className="text-slate-100">偶爾才跑，但每次步驟都一樣？</strong>
              做成 Skill。平常只載它的名字，真的要跑才展開全文。
            </li>
            <li>
              <strong className="text-slate-100">絕對不能發生的嗎？</strong>
              交給 Hook 或 CI。這種事寫在手冊裡是擋不住的。
            </li>
          </ul>
        </Callout>

      </div>
    </SlideLayout>
  );
}
