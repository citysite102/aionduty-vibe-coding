import { BookOpen, Plug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { CopyBlock } from '../../components/CopyBlock';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-09-23。
 * 當時的現況：
 *   - Notion MCP 的伺服器網址仍是 https://mcp.notion.com/mcp，Claude Code 的安裝指令
 *     一字不差就是 `claude mcp add --transport http notion https://mcp.notion.com/mcp`，
 *     裝完跑 `/mcp` 走 OAuth。出處：developers.notion.com/guides/mcp/get-started-with-mcp
 *     （同一頁另外列了 Codex、Cursor、VS Code Copilot 等九種客戶端的設定方式）。
 *   - 但那一頁是寫給「自己設定 MCP 客戶端」的人看的。claude.ai 與桌面版另有一份
 *     現成的連接器目錄，Notion 是裡面的第一方連接器，按一下授權就好，不用碰終端機。
 *     出處：claude.com/connectors/notion，加入的入口是 claude.ai/customize/connectors。
 *     介面路徑以實機為準（C-3）：官方說明文件寫的是 Customize > Connectors，
 *     不是 Settings > Connectors，本輪沒有開實機確認中文字樣。
 *
 * 2026-09-23 這一頁因此改成兩條路：先給不用終端機的那一條，終端機那一條留給
 * 要在 Claude Code 裡用的人。原本只給終端機那一條，而多數學員在這個位置
 * 用的是網頁版或桌面版，等於把最簡單的做法藏起來了。
 *
 * 下次改版前重查上面三個網址，特別是那一行指令的旗標與參數。
 *
 * 口白 59 秒，超過 45 秒是刻意的（A-4）：兩條路各要講完才有用，砍掉任何一條
 * 就回到「只給終端機」或「只給連接器」的舊問題。要砍的時候該問的是
 * 「這一頁要不要拆成兩支影片」，而這一頁明說可以跳過，拆開反而更難跳。
 * ─────────────────────────────────────────────────────
 */

/**
 * MCP 在前面只出現過一次就消失了。這一頁把它接回來，
 * 而且要接得夠具體：學員最常問的是「那我怎麼串我的 Notion」，
 * 所以直接把做法寫出來，不要停在「接上 MCP 就好」。
 */
const PATHS = [
  {
    tag: '網頁版與桌面版',
    lead: '連接器目錄裡就有，不用終端機',
    steps: [
      '開 claude.ai/customize/connectors',
      '在目錄裡找 Notion，按下加入',
      '跟著跳出來的 Notion 授權頁按同意',
    ],
    easy: true,
  },
  {
    tag: '要在 Claude Code 裡用',
    lead: '這一條才需要打指令',
    steps: [
      'claude mcp add --transport http notion https://mcp.notion.com/mcp',
      '回到 Claude Code 跑 /mcp 完成同一套 OAuth 授權',
      '用 /context 看它佔掉多少 token',
    ],
  },
];

const DOCS = [
  { t: 'Notion 連接器（Claude）', u: 'claude.com/connectors/notion' },
  { t: 'Notion MCP（自己設定客戶端）', u: 'developers.notion.com/guides/mcp/get-started-with-mcp' },
];

/**
 * 2026-10-04：這一頁原本是孤兒，開場寫「規則解決完了，還有一件事很實際⋯」、
 * 結尾寫「沒有要接外部資料的話，這一頁可以先跳過」，跟整段的主線沒有接點。
 * 但 MCP 正是運作框架六塊裡的「工具」那一塊，而且是「換成你的工作」最有感的一塊
 * （你的資料在 Notion、雲端硬碟、公司系統）。新增的 45_TransferHarness 把六塊對回
 * 這份提案工作，這一頁就是那張表的第二列。開場與結尾都改成指回那張表。
 * **改 45_TransferHarness 的第二列時要回來看這一頁。**
 *
 * 2026-10-04（第三輪）這一頁從整段最後一頁往前搬到〈換成你自己的工作，怎麼開始〉之前。
 * 原本擺最後是當加分題（它要開終端機，難度比整段高一階），但那樣六塊對照表上
 * 「工具」那一格要等到收尾之後才補，而且收尾講完「換成你自己的」又跳回提案這個例子。
 * 現在順序是：六塊對照 → 把工具補完 → 才換成你自己的。**轉場三句互相指著，不要單獨搬。**
 *
 * 2026-10-04（第二輪）：工具那一塊有兩半，這一頁原本只做了接外部資料那一半。
 * 講師定位 Skill 屬於工具，所以另一半（把固定步驟包起來）也要在這裡落地，
 * 而且要給這份提案工作真的用得上的 `SKILL.md`，不是再講一次語法
 * （語法在〈Skill 的三種來源，怎麼確認它裝好了〉教過：一個資料夾一份 SKILL.md、
 * 開頭寫 name 與 description、name 要跟資料夾名一致）。
 * 標題跟著改成兩半都講得到。整頁因此超過 160 字，標 `reference`，
 * 理由同 17_HealthOverview：那段 `SKILL.md` 是給學員停下來抄的。
 */

/**
 * 這份提案工作真的會用到的 Skill。四個步驟都接回這一段前面建立過的東西：
 * 各客戶那一份規則（子目錄的 CLAUDE.md，路徑要跟 42_TransferAnswers 那棵樹一致）、
 * 提案大綱與公司簡介（每次都要重講的那三件）、
 * 以及成本不能外洩（第 1 題的答案，Hook 擋的那一條）。
 * **換例子的時候要從這一段已經出現過的材料挑**，不要自己發明新的步驟。
 */
const SKILL = `---
name: client-proposal
description: 要寫客戶提案時用。使用者說「寫提案」或報出客戶名字就叫它。
---
1. 先問是哪一個客戶，讀 clients/<客戶>/CLAUDE.md 的格式要求。
2. 段落順序照提案大綱走，不要自己加減段。
3. 公司簡介用最新那一版，不要重寫。
4. 成本與利潤率一律不要寫進去。
5. 寫完先列出你用了哪幾份檔案，我確認再輸出。`;
export const meta: RecordedMeta = {
  id: 'harness-61-transfer-integrate',
  title: '接上 Notion，再包一個提案 Skill',
  script:
    '這一頁做的是那張表的第二列，工具那一塊。它有兩半：資料在外面的，接上來；步驟每次都一樣的，包起來。先講第一半。你的資料多半不在這台電腦上，它在 Notion、雲端硬碟或公司的系統裡。這時候要做的不是把資料搬過來，是用 MCP 把那個工具接上來，資料留在原地，它需要的時候自己去查。所以你要找的是這一句：這個工具有沒有支援 MCP。有的話就接得上。以 Notion 為例，有兩條路。用網頁版或桌面版的話最簡單，Claude 有一個現成的連接器目錄，Notion 就在裡面，找到它按加入，再到跳出來的 Notion 頁面按同意就好，完全不用碰終端機。要在 Claude Code 裡用才需要打指令：畫面上那一行加入連線，回來跑斜線 mcp 走同一套授權，再用斜線 context 看它佔掉多少 token。這幾行會改版，跑之前先對一次下面那兩份文件。串好之後你不用再複製貼上，它自己去查。第二半是 Skill。寫提案這件事每次的步驟都一樣：先看是哪個客戶、去讀那個客戶子資料夾底下的 CLAUDE.md、照大綱排、公司簡介用最新那一版、成本不准寫進去、最後列出用了哪幾份檔案。這幾步每次重講一遍很煩，所以把它們存成一個檔案，就是畫面上那一份。位置與寫法前面裝 Skill 那一段講過：一個資料夾放一份 SKILL.md，開頭寫 name 跟 description，名字要跟資料夾一樣。之後你說「寫提案」，它自己就展開這五步。兩半都不是每個工作都要有。確定不需要接外部資料、步驟也還沒固定下來，那張表的第二列就留白，這一頁知道有這回事即可。',
  seconds: 130,
  kind: 'reference',
  from: 75,
};

export default function RecTransferIntegrate() {
  return (
    <SlideLayout title={meta.title} subtitle="Plug It In" icon={Plug}>
      <RecPage className="space-y-4">
        {/*
          原本第一句就跳到 Notion，但前一頁收在「五行規則各自該怎麼擋」，
          讀者不知道為什麼突然講起串工具。標題的「那我怎麼串⋯」也在回應一個
          前面沒有被提出的問題。先講清楚這裡換了一個維度：前面處理規則，這裡處理資料。
        */}
        {/*
          這一段講的是「不是程式的工作也用得上」，而這一頁要學員去終端機加連線、跑 OAuth，
          難度比整段高一階。不給一個明確的出口，卡在這裡的人會以為後面都跟不上了。
          2026-09-23 補上不用終端機的那一條路之後，這個落差小了一半，那句出口照樣留著。
        */}
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-2">
            工具那一塊有兩半：<strong className="text-slate-300">資料在外面的，接上來；步驟每次都一樣的，包起來。</strong>
            先講第一半。你的資料多半不在這台電腦上，用 MCP 把那個工具接上來，資料留在原地。以 Notion 為例：
          </p>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            串好之後<Key>它自己去查，你不用再複製貼上</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-4">
          {PATHS.map((p) => (
            <div
              key={p.tag}
              className={`rounded-2xl border px-6 py-5 ${
                p.easy ? 'border-sky-500/25 bg-sky-500/5' : 'border-slate-800 bg-slate-950'
              }`}
            >
              <div className={`text-lg font-bold ${p.easy ? 'text-sky-300' : 'text-slate-200'}`}>{p.tag}</div>
              <div className="text-slate-500 text-base mt-0.5 mb-3">{p.lead}</div>
              <ol className="space-y-2">
                {p.steps.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-xs font-bold text-slate-400">
                      {i + 1}
                    </span>
                    <span className="font-mono text-sm text-slate-300 leading-relaxed break-all">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </AnimatedBlock>

        {/* 工具的第二半。語法前面教過，這裡只給這份工作真的用得上的那一份 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <h3 className="text-slate-100 text-lg font-bold mb-1">第二半：步驟每次都一樣的，包成一個 Skill</h3>
          <p className="text-slate-400 text-base leading-relaxed mb-3">
            寫提案每次都是同一套步驟。存成一個檔案，之後你說「寫提案」，它自己展開這五步。
            放在 <code className="font-mono text-orange-300">.claude/skills/client-proposal/SKILL.md</code>。
          </p>
          <CopyBlock label="SKILL.md" text={SKILL} size="xs" />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4">
            <div className="flex items-center gap-2 text-slate-300 text-base font-bold mb-2">
              <BookOpen size={18} className="text-sky-400" />
              官方文件（2026-09-23 查證）
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {DOCS.map((doc) => (
                <div key={doc.u} className="font-mono text-sm text-slate-500">
                  <span className="text-slate-300">{doc.t}</span>
                  <span className="block text-slate-600 break-all">{doc.u}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
