import { CalendarClock } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandTile } from '../components/BrandLogos';
import { SourceFoot, SRC } from './_Source';

/**
 * 補充單元的封面。這一疊不在主簡報的八個章節裡，用 `?deck=bonus` 單獨播，
 * 理由與用法寫在 `src/slides-bonus/index.ts` 的檔頭。
 *
 * 最後查證：2026-10-20（Antigravity 那一條；其餘是 2026-10-19）。
 * 三家各自這一年的代表性改動，出處：
 *   Claude    support.claude.com/en/articles/12138966-release-notes（2026-09-16、2026-10-07 兩條）
 *             與 claude.com/resources/articles/dashboards-and-motion（2026-10-08）
 *   ChatGPT   en.wikipedia.org/wiki/ChatGPT_Atlas（2026-08-09 關站）、
 *             en.wikipedia.org/wiki/GPT-6（2026-10-07、10-08）。
 *             help.openai.com 與 openai.com 當天對自動抓取回 403，所以這兩條是二手來源，
 *             畫面上照 `SourceFoot` 的 `secondhand` 標出來。
 *   Gemini    gemini.google/release-notes（2026.10.13、2026.09.30）
 *
 * 封面是 D-5 的四種例外之一，標題只開一個名字，不套「說得出這一頁有什麼」那條。
 */
const HEADLINES = [
  {
    brand: 'claude' as const,
    name: 'Claude',
    one: 'Cowork 併進對話，Docs 與 Slides 免費就能用',
    detail: '2026-09-16 起交辦任務不必先選模式；2026-10-08 起 Docs、Slides、Design 每個方案都能用，另外多了做看板的 Dashboards 與做動畫的 Motion。',
  },
  {
    brand: 'openai' as const,
    name: 'ChatGPT',
    one: 'Codex 併進 ChatGPT、Atlas 關站，換上 GPT-6',
    detail: '2026-07-09 Chat、Work、Codex 合進同一個 App；2026-08-09 Atlas 瀏覽器關站；2026-10-07 起換 GPT-6。',
  },
  {
    brand: 'gemini' as const,
    name: 'Gemini',
    one: 'Gems 換成 Skills，Mac 的 Gemini 應用多一個 Antigravity（限英文）',
    detail: '2026-09-30 Skills 取代 Gems 並自動搬移；2026-10-13 Gemini 4 Argon 上線，Mac 的 Gemini 應用頂端多一個 Antigravity，點下去就在對話裡寫程式、做網頁原型（目前只有英文）。',
  },
];

export default function SlideBonusCover() {
  return (
    <SlideLayout
      title="主流 AI 工具的變化"
      subtitle="Year in review"
      icon={CalendarClock}
    >
      <div className="min-h-full max-w-5xl mx-auto flex flex-col gap-4">
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          Claude、ChatGPT、Gemini 這一年
          <strong className="text-slate-100">都往同一個方向走</strong>：開工的入口、它交回來的東西，還有模型分成幾層。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {HEADLINES.map((h, i) => (
            <AnimatedBlock
              key={h.name}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2 text-left"
            >
              <div className="flex items-center gap-3">
                <BrandTile brand={h.brand} size={18} />
                <span className="text-slate-100 font-bold text-base">{h.name}</span>
              </div>
              <p className="text-slate-200 text-sm font-bold leading-relaxed">{h.one}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{h.detail}</p>
            </AnimatedBlock>
          ))}
        </div>

        <Callout tone="warn" label="這些資訊會過期" stepIndex={5}>
          畫面上每一條事實的查證日期是 <span className="font-mono text-slate-200">2026-10-20</span>。
          三家都還在改，<strong className="text-slate-100">你看到的跟簡報上寫的不一樣時，以官方更新頁為準</strong>。
        </Callout>

        <SourceFoot
          links={[SRC.claudeNotes, SRC.claudeDash, SRC.geminiNotes]}
          checked="2026-10-20"
          secondhand="en.wikipedia.org/wiki/GPT-6、ChatGPT_Atlas"
        />
      </div>
    </SlideLayout>
  );
}
