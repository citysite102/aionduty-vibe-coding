import { Boxes, ClipboardList, Palette, Layout, Server, CheckCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 2026-10-04 新增（講師要求）：〈用講師、學生、觀察員跑一次教學模擬〉那一組不看程式碼，
 * 接著給一組看得到程式的，而且每個角色各綁一份規範。
 *
 * 這一頁跟 26d_M3_QuoteSystemStandards 的分野要守住，否則就是同一批內容開兩頁（B-5）：
 *   26d 講的是「一個專案該有哪幾份規範，各寫什麼」，在報價系統那個案例裡面。
 *   這一頁講的是「哪個角色只准讀哪一份」，重點在那條綁定關係與它的第一句話。
 * 所以這一頁刻意不展開任何一份檔案的內容，26d 也不要加角色欄。
 *
 * 角色與檔名是示範用的常見組合，不是官方規定的名字，所以畫面上寫「換成你團隊在用的名字」。
 * 檔名維持灰階不上橘：它們不是 Claude 的專有名詞（A-1）。
 *
 * **這一頁有兩組 `.md`，每一列都要同時印出來，不要只印右邊那一組。**
 * 2026-10-04 講師看版面時問「我以為 PM 就是會有一份 pm.md，而不是 PRD.md？」——他是對的，
 * `pm.md` 確實存在。當時每一列只印 `PRD.md` 而且沒有欄位名，所以它被讀成「PM 這個角色的檔案」。
 * 兩組的分工是：
 *   `.claude/agents/pm.md`  ＝ 角色本身，寫它是誰、不准做什麼（跟 code-reviewer 同一個骨架）
 *   `docs/PRD.md`           ＝ 它只准照著做的那份規範
 * 現在每一列印成 `agents/pm.md → docs/PRD-template.md`，上面再加一行欄位名。**不要為了版面把箭頭左邊拿掉。**
 *
 * **箭頭右邊一律是那個角色的「輸入」，不是它的產出。** 2026-10-04 講師再抓到一處：
 * PM 原本指向 `docs/PRD.md`，但那是 PM 寫出來的東西，它是唯一一個箭頭指向自己產出的角色。
 * 正確的輸入是一份固定的模板 `docs/PRD-template.md`（一份需求文件該有哪幾段），
 * PM 照它的格式寫出 `docs/PRD.md`。
 *
 * **模板不要寫進 `agents/pm.md`。** 理由是章節六那條「同一條規則不要放兩個地方」
 * （`21f4_M2_RuleRouting` 與 harness/09）：模板會改，角色不會改，寫在一起的話模板一改就得去動角色檔，
 * 而且別的人、別的工具也讀不到那份模板。這一條寫在 `SOURCES` 底下那一段，**不要簡化掉**。
 *
 * 最後一塊刻意把「誰可以同時跑、誰要等誰」接回 workflow（24c_M3_WorkflowUse），
 * 那正是腳本裡的階段。搬頁的時候兩邊一起看（B-4）。
 *
 * 2026-10-04（講師）補兩塊：
 *
 * 一、原本右欄只印設計師那一份的「第一句」，學員看不出整個檔案長什麼樣。改成完整的
 *    `DESIGNER_AGENT`，骨架跟 25b 的 code-reviewer、25c 的 student 一模一樣
 *    （frontmatter 四行＋一句身分＋幾個 `##` 小標），三頁放在一起就看得出那是同一個模子。
 *    **五個角色只印一份**，印五份會變成要背的範本。
 *
 * 二、「`PRD.md` 哪裡來？」是講師實測會被問的第一個問題。`SOURCES` 那一塊就是答案：
 *    一份是流程第一步的產出、一份是你一次寫好之後一直用的、一份是開工前先定的約定。
 *    **不要把它們寫成「專案本來就會有的東西」**，學員手上沒有，那樣寫這一頁就落不了地。
 */

const DESIGNER_AGENT = `---
name: designer
description: 介面設計師。畫面要怎麼排、用哪個顏色與字級，問它。
tools: Read
---
你是這個產品的介面設計師。

## 你只准照 docs/Design.md 做
色票、字級、按鈕與表單的樣式，全部以 docs/Design.md 為準。
docs/Design.md 沒寫到的，回來問我，不要自己決定。

## 你要補的是規格沒講到的狀態
空的時候顯示什麼、載入中顯示什麼、出錯顯示什麼。這三個規格通常不會寫。

## 怎麼交出來
一頁一段，寫出每一塊放哪、用 docs/Design.md 裡的哪一條。
用到 docs/Design.md 沒有的東西，標成「待確認」，不要當作已經決定。`;

/** 「這幾份規範哪裡來」。指的是箭頭右邊那一組，不是 agents 底下那五份。
 *  學員手上沒有這些檔案，不先回答這題，整頁落不了地。 */
const SOURCES = [
  {
    f: 'docs/PRD-template.md',
    d: '一份需求文件該有哪幾段。寫一次之後每個專案都用它，所以它是前提，不是產出。',
  },
  {
    f: 'docs/PRD.md',
    d: '流程第一步的產出。你把需求講一遍，PM 照模板整理成規格，你改過確認才往下走。',
  },
  {
    f: 'docs/Design.md',
    d: '你一次寫好、之後一直用的。沒有現成的就請 Claude 把你的決定（用哪個色、字級分幾階）整理成一份。',
  },
  {
    f: 'docs/API.md',
    d: '後端開工前先定下來的約定，前端照它接。它也是產出，不是前提。',
  },
];
const ROLES = [
  {
    icon: ClipboardList,
    name: 'PM（需求）',
    agent: 'agents/pm.md',
    job: '把一句需求拆成一條一條做得出來的規格，每一條都要寫完成條件。',
    spec: 'docs/PRD-template.md',
    specNote: '模板：一份需求文件該有哪幾段。它照這個格式寫出 docs/PRD.md',
  },
  {
    icon: Palette,
    name: '設計師',
    agent: 'agents/designer.md',
    job: '決定畫面怎麼排、用哪個顏色與字級，規格裡沒提到的狀態也要補上。',
    spec: 'docs/Design.md',
    specNote: '色票、字級、按鈕與表單長什麼樣',
  },
  {
    icon: Layout,
    name: '前端工程師',
    agent: 'agents/frontend.md',
    job: '把畫面做出來，接後端送過來的資料。',
    spec: 'docs/Design.md ＋ docs/API.md',
    specNote: '兩份都要讀，所以它最晚開工',
  },
  {
    icon: Server,
    name: '後端工程師',
    agent: 'agents/backend.md',
    job: '決定資料怎麼存，把每一支介面開出來。',
    spec: 'docs/API.md',
    specNote: '每一支介面的網址、參數、回傳與錯誤格式',
  },
  {
    icon: CheckCheck,
    name: 'QE（測試）',
    agent: 'agents/qe.md',
    job: '照規格逐條驗，有一條沒過就整份退回，不自己動手補。',
    spec: 'docs/PRD.md 的完成條件',
    specNote: '驗的是規格，不是「看起來還行」',
  },
];

const ORDER = [
  { n: '1', t: 'PM 照模板出規格', d: '產出 docs/PRD.md。其他四個都要等這一份，它是所有人的標準來源。' },
  { n: '2', t: '設計師與後端同時跑', d: '兩邊都只看規格，互相不需要對方的產出。' },
  { n: '3', t: '前端等上面兩份到齊', d: '畫面要照設計、資料要照介面，少一份它只能自己猜。' },
  { n: '4', t: 'QE 最後逐條驗', d: '有一條沒過就整份退回，列出沒過的那幾條。' },
];

export default function SlideProductTeam() {
  return (
    <SlideLayout title="一個產品團隊的角色，各自讀哪一份規範" subtitle="Roles and Their Specs" icon={Boxes}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              講師、學生、觀察員那一組不看程式碼。換成一個產品團隊，角色就換一批，做法完全一樣，
              <strong className="text-slate-100">只是每一個角色多綁一份規範</strong>：它只准照那一份做。
            </p>
            <p className="text-slate-400 text-base leading-relaxed mt-2">
              所以每個角色牽涉<strong className="text-slate-200">兩個檔案</strong>：
              <code className="font-mono text-slate-200">.claude/agents/</code> 底下那一份寫它是誰、不准做什麼，
              跟你剛才那個 code-reviewer 同一個骨架；<code className="font-mono text-slate-200">docs/</code>{' '}
              底下那一份是它的標準。下面每一列的箭頭，左邊是角色、右邊是它的標準。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-2.5">
            <div className="flex items-baseline justify-between gap-3 px-4 pb-0.5">
              <span className="text-slate-500 text-xs">角色（它是誰）</span>
              <span className="text-slate-500 text-xs">→　它只准照這一份做</span>
            </div>
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="flex items-center gap-2.5 text-slate-100 text-base font-bold">
                      <Icon aria-hidden="true" size={17} className="text-slate-400 shrink-0" />
                      {r.name}
                    </span>
                  </div>
                  <div className="font-mono text-sm mb-1.5 break-words">
                    <span className="text-slate-400">{r.agent}</span>
                    <span className="text-slate-600">　→　</span>
                    <span className="text-slate-200">{r.spec}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-x-4 gap-y-1">
                    <p className="text-slate-400 text-sm leading-relaxed">{r.job}</p>
                    <p className="text-slate-500 text-sm leading-relaxed">{r.specNote}</p>
                  </div>
                </div>
              );
            })}
            <p className="text-slate-500 text-sm leading-relaxed pt-1">
              角色與檔名換成你團隊在用的那一套就好，沒有規定的名字。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-3">箭頭右邊那幾份規範，哪裡來</h3>
            <div className="space-y-2">
              {SOURCES.map((s2) => (
                <div key={s2.f} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5">
                  <code className="font-mono text-sm text-slate-200">{s2.f}</code>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">{s2.d}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
              這三份裝的是<strong className="text-slate-200">這個產品填好的內容，不是空模板</strong>。
              模板自己要一份檔案：<code className="font-mono text-slate-300">docs/PRD-template.md</code>{' '}
              寫一份需求文件該有哪幾段，<code className="font-mono text-slate-300">agents/pm.md</code>{' '}
              裡只寫一句「照那份模板的格式寫」。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              <strong className="text-slate-200">模板不要直接寫進角色裡</strong>，
              理由就是前面那條「同一條規則不要放兩個地方」：模板會改，角色不會改，
              寫在一起的話模板改一次你要去動角色檔，而且別人跟別的工具讀不到它。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mt-2">
              沒有一份是憑空出現的，而且每一份都要你看過才算數。
              規範沒人確認過，後面五個角色會一起照著錯的做。
            </p>
          </AnimatedBlock>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-3">箭頭左邊那五個檔案，長這樣</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              <code className="font-mono text-slate-200">.claude/agents/</code> 底下五份，
              寫法跟你前面那個 code-reviewer 一樣：做什麼、對照哪一份、什麼情況要退回。
              差別只在每一份都綁死了它的標準來源。下面印的是
              <code className="font-mono text-slate-200">agents/designer.md</code>。
            </p>
            <CopyBlock label="agents/designer.md" text={DESIGNER_AGENT} size="xs" className="mt-3" />
            <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
看清楚它自己是 <code className="font-mono text-slate-300">designer</code>，
              它照的是 <code className="font-mono text-slate-300">Design.md</code>，兩個不是同一份。
              少了「只准照某一份做」那一段，五個角色會各自發明一套：前端自己挑了一個藍、後端自己定了一個欄位名。
              等接起來才發現對不上，而那時候五份東西都已經做完了。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-3">跑一輪的順序</h3>
            <div className="space-y-2">
              {ORDER.map((o) => (
                <div key={o.n} className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-sm text-slate-600 shrink-0">0{o.n}</span>
                    <span className="text-slate-100 text-sm font-bold">{o.t}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1 pl-7">{o.d}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-3 pt-3 border-t border-slate-800">
              「哪幾個可以同時跑、誰要等誰」就是前面 workflow 腳本裡寫的階段。
              角色固定、順序固定的工作，才值得寫成腳本。
            </p>
          </AnimatedBlock>

          <Callout tone="muted" label="不用五個都開" stepIndex={6}>
            一個人做的小專案，PM 跟 QE 你自己兼就好。但那份規格一定要先存在，
            不然後面每一個角色都在猜，而它們猜得都很有自信。
          </Callout>
        </div>

      </div>
    </SlideLayout>
  );
}
