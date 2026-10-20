import type React from 'react';
import {
  ArrowLeftRight,
  Code2,
  Bot,
  Network,
  PackageOpen,
  FileStack,
  Brain,
  Gauge,
  Video,
  MousePointerClick,
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo, brandColor } from '../components/BrandLogos';
import { SourceFoot, SRC } from './_Source';

/**
 * 同一件事三家各自叫什麼。這一頁的用途是讓學員在別家工具裡找得到對應的東西，
 * 不是比優劣，所以每一格只寫它在那家的名字與位置，不寫評價。
 *
 * 左欄的 icon 跟「四個共同點」那一頁用同一組：兩頁講的是同一批東西，
 * 一頁是「它們一起變成什麼」，一頁是「在各家叫什麼」，同一個 icon 讓讀者把兩頁接起來。
 *
 * **2026-10-20 加了「代替你點畫面、操作網站」那一列。** 原因是階段圖（`02_Stages`）的
 * 「使用工具」那一欄原本只有 Gemini 掛 Computer Use，另外兩家掛的是工具連接，
 * 讀起來像只有 Gemini 做得到。那一格改成工具連接之後，Computer Use 就只剩附錄有，
 * 而三家都有這個東西，學員會問，所以在這裡給它一列。出處：
 *   Claude   2026-03-23 操作電腦的研究預覽擴到 Pro 與 Max（support.claude.com release notes）；
 *            網站上的操作配 Claude in Chrome（claude.com/docs/cowork/overview 寫
 *            「Pair Claude in Chrome with Cowork to automate your tasks on any website」）
 *   ChatGPT  Computer Use 在 learn.chatgpt.com 的週表 2026-04 那幾週，**確切日期沒有抓到**，
 *            所以那一格寫「2026-04 那幾週」不寫單一天；Atlas 2026-08-09 關站後，
 *            瀏覽與代替你點網站的能力移進 ChatGPT 與 Codex
 *   Gemini   2026-06-24 Computer Use 工具公開預覽（ai.google.dev changelog）
 *
 * **2026-10-19 更正：「把做法存成檔案重複用」那一列原本寫 ChatGPT「沒有找到同名的東西」，那是錯的。**
 * ChatGPT 有 Skills，照的也是同一個 Agent Skills 開放標準，見 learn.chatgpt.com/docs/build-skills。
 *
 * 同一天加了「錄一次就變成一個 Skill」那一列，出處是兩家的官方說明：
 *   ChatGPT  learn.chatgpt.com/docs/extend/record-and-replay，原文
 *            「Show ChatGPT or Codex a workflow once and turn it into a reusable skill」，
 *            路徑是桌面版 → Work 或 Codex → Plugins → + → Record a skill；只有 macOS，
 *            而且要開啟 Computer Use（組織可用 requirements.toml 的 computer_use = false 關掉）。
 *   Claude   support.claude.com/en/articles/12512198-how-to-create-custom-skills，原文
 *            「you can record yourself doing a task and let Claude build the skill from what
 *            it observes」；在 Claude for Mac 的 Cowork 裡，Pro、Max、Team 可用，
 *            聊天介面、Windows、Free 與 Enterprise 不行，錄影上限約十分鐘。
 *            Claude for Chrome 也能錄流程，但存成的是 shortcut 不是 Skill，所以沒有寫進那一格。
 *   **記憶那一列的 Gemini 格 2026-10-19 更正過**：原本填「自訂可連 40 個以上的應用或服務」，
 *   那是連接外部服務，不是記憶。Gemini 的記憶在 support.google.com/gemini/answer/16598469：
 *   設定裡的 Personal Intelligence 底下有 Memory 開關，要滿 18 歲、個人 Google 帳號、
 *   而且活動記錄要開著。
 *
 *   Gemini   support.google.com/gemini/answer/17094296 列的建立方式有四種
 *            （跟 Gemini 對話生成、套範本、手動、上傳檔案），沒有錄影那一種。
 *            **那一格寫的是查證結果，補上去之前要先有出處**（D-2）。
 *
 * 最後查證：2026-10-19。
 *   Claude 欄   support.claude.com release notes（2026-09-16、2026-09-17、2026-08-25）、
 *              claude.com/resources/articles/dashboards-and-motion（2026-10-08）
 *   Gemini 欄   gemini.google/release-notes（2026.09.30、2026.10.13、2026.06.30）、
 *              ai.google.dev changelog（2026-05-19 Antigravity Agent）
 *   ChatGPT 欄  桌面版三入口與 Intelligent UI 取自維基百科與改版報導（openai.com 當天 403）。
 *              memory 那一格是 ChatGPT 長期就有的設定項，不屬於這一年的變動。
 */
const COLS = [
  { brand: 'claude' as const, name: 'Claude' },
  { brand: 'openai' as const, name: 'ChatGPT' },
  { brand: 'gemini' as const, name: 'Gemini' },
];

type CrossRow = { icon: React.ElementType; label: string; cells: [string, string, string]; missing?: 0 | 1 | 2 };

const ROWS: CrossRow[] = [
  {
    icon: Code2,
    label: '寫程式的入口',
    cells: ['Code 頁籤（Claude Code）', 'Codex 入口', 'Antigravity'],
  },
  {
    icon: Bot,
    label: '替你動手辦事的功能',
    cells: [
      'Cowork，可排程定時跑，2026-09-16 起併進每一個對話',
      'Work 入口；dots 是常駐代理（Pro 以上，Slack 與 Teams 也叫得到）',
      'Spark 代理（AI Pro 方案）與 Antigravity Agent',
    ],
  },
  {
    icon: Network,
    label: '同時指派多個代理',
    cells: [
      'Dynamic Workflows，一次上百個子代理（Max 以上）',
      'Codex 入口裡的 subagents，並行跑完收回一份結果',
      'Antigravity 2.0 的桌面應用，並行與排程都在那裡',
    ],
  },
  {
    icon: PackageOpen,
    label: '把做法存成檔案重複用',
    cells: [
      'Skills，2025-10 先做並開放規格',
      'Skills，2026-03 起（免費與 Go 用不到）',
      'Skills，2026-09-30 取代 Gems',
    ],
  },
  {
    icon: Video,
    label: '錄一次就變成一個 Skill',
    cells: [
      'Cowork 裡錄影，Claude 提案一份 Skill（Mac，Pro 以上，十分鐘內）',
      'Record & Replay（Mac，要先開啟 Computer Use）',
      '2026-10-19 查證時沒有找到這個做法',
    ],
    missing: 2,
  },
  {
    icon: MousePointerClick,
    label: '代替你點畫面、操作網站',
    cells: [
      'Cowork 的操作電腦（2026-03-23 研究預覽，Pro 與 Max），網站上的操作配 Claude in Chrome',
      'Computer Use（2026-04 那幾週），Atlas 關站後瀏覽能力移進 ChatGPT 與 Codex',
      'Computer Use 工具公開預覽（2026-06-24）',
    ],
  },
  {
    icon: FileStack,
    label: '改得動的產出物',
    cells: ['Docs、Slides、Design、Dashboards、Motion', 'Canvas 與回答裡可以點的小面板', 'Canvas'],
  },
  {
    icon: Brain,
    label: '記得你上次講過的話',
    cells: ['Settings › Memory，條目可以自己改',
      'memory，設定裡開關',
      'Personal Intelligence 裡的 Memory'],
  },
  {
    icon: Gauge,
    label: '這一年模型換了幾代',
    cells: ['Opus、Sonnet、Haiku 到 5.5，Fable 在 5.1', 'GPT-5.1 走到 GPT-6', 'Gemini 3 走到 4 Argon'],
  },
];

export default function SlideBonusCrosswalk() {
  return (
    <SlideLayout title="Claude、ChatGPT、Gemini 名詞對照表" subtitle="Crosswalk" icon={ArrowLeftRight}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3">
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          換工具的時候最花時間的不是學新東西，是
          <strong className="text-slate-100">找出同一個東西在這一家叫什麼</strong>。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="pb-3 pr-3 text-xs font-normal text-slate-500 align-bottom w-[22%]">
                  你要找的東西
                </th>
                {COLS.map((c) => (
                  <th key={c.name} className="pb-3 pr-3 align-bottom">
                    <span className="flex items-center gap-2">
                      <span style={{ color: brandColor(c.brand) }}>
                        <BrandLogo brand={c.brand} size={14} />
                      </span>
                      <span className="text-sm font-bold text-slate-200">{c.name}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-t border-slate-800 align-top">
                  <td className="py-3 pr-3">
                    <span className="flex items-start gap-2 text-sm text-slate-300 leading-snug">
                      <span className="flex h-5 w-4 shrink-0 items-center justify-center">
                        <row.icon size={14} className="text-slate-500" aria-hidden="true" />
                      </span>
                      {row.label}
                    </span>
                  </td>
                  {row.cells.map((cell, k) => (
                    <td
                      key={cell}
                      className={`py-3 pr-3 text-sm leading-snug ${
                        row.missing === k ? 'text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </AnimatedBlock>

        <Callout tone="warn" label="用這張表之前" stepIndex={3}>
          名稱以你螢幕上的介面為準，三家都還在改版。
          <strong className="text-slate-100">Skills 那一列三家同名不是巧合</strong>：
          它們用的是同一個開放規格，檔案格式都是 SKILL.md。
        </Callout>

        <SourceFoot
          links={[SRC.claudeSkillHow, SRC.openaiRecord, SRC.claudeDash, SRC.geminiNotes]}
          secondhand="最後一列的模型版本取自維基百科，其餘各格都有官方依據"
        />
      </div>
    </SlideLayout>
  );
}
