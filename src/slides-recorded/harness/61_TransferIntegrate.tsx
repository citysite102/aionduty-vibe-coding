import { BookOpen, Plug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
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

export const meta: RecordedMeta = {
  id: 'harness-61-transfer-integrate',
  title: '規則寫完了，但你的資料不在這台電腦上',
  script:
    '規則解決完了，還有一件事很實際：你的資料多半不在這台電腦上，它在 Notion、雲端硬碟或公司的系統裡。不用搬家，接上去就好。以 Notion 為例，有兩條路。用網頁版或桌面版的話最簡單，Claude 有一個現成的連接器目錄，Notion 就在裡面，找到它按加入，再到跳出來的 Notion 頁面按同意就好，完全不用碰終端機。要在 Claude Code 裡用才需要打指令：畫面上那一行加入連線，回來跑斜線 mcp 走同一套授權，再用斜線 context 看它佔掉多少 token。這幾行會改版，跑之前先對一次下面那兩份文件。串好之後你不用再複製貼上，它自己去查。沒有要接外部資料的話，這一頁可以先跳過，後面不會再用到它。',
  seconds: 59,
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
            規則解決完了，還有一件事：你的資料多半不在這台電腦上。
            不用搬家，接上去就好，以 Notion 為例：
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

        <AnimatedBlock stepIndex={3} className="px-1">
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
