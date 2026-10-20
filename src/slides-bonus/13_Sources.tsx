import { BookMarked } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo, brandColor } from '../components/BrandLogos';

/**
 * 三家的官方更新頁，加上這一疊自己的查證狀況。
 *
 * 這一頁存在的理由：整個補充單元講的都是別人家產品這一年改了什麼，
 * 而那些事實一個月後就可能不成立（C 章）。所以最後要留的不是結論，
 * 是讓學員自己重查的三個網址，以及哪幾條當初沒拿到官方原文。
 *
 * 2026-10-19 的查證狀況，照實寫在畫面上：
 *   Claude   support.claude.com 的 release notes 回溯得到 2025-10。
 *            2026-10-19 第一次抓只拿到 2026-07 之後，於是上半年全寫成了二手摘要，
 *            覆核時整段重寫。抓這一頁要指定年月，不要只問「列出全部」。
 *   ChatGPT  help.openai.com 與 openai.com 都回 403，但 learn.chatgpt.com/docs/whats-new
 *            與 deploymentsafety.openai.com 抓得到，桌面版與 GPT-6 那幾條改成以它們為準。
 *            模型的確切日期與廣告時程仍然是維基百科與新聞報導。
 *            help.openai.com 的單篇條目（例如 Intelligent UI 那一篇）直接開是 403，
 *            但限定網域搜尋讀得到內文，查不到東西的時候可以用這一招。
 *   Gemini   gemini.google/release-notes 與 ai.google.dev/gemini-api/docs/changelog
 *            兩份都抓得到，而且每一條都有日期。
 */
const DESKS = [
  {
    brand: 'claude' as const,
    name: 'Claude',
    links: [
      ['產品更新', 'support.claude.com/en/articles/12138966-release-notes'],
      ['公告', 'www.anthropic.com/news'],
      ['Claude Code', 'code.claude.com/docs/en/changelog'],
    ],
    state: '回溯得到 2025-10，抓的時候要指定年月',
  },
  {
    brand: 'openai' as const,
    name: 'ChatGPT',
    links: [
      ['更新清單', 'learn.chatgpt.com/docs/whats-new'],
      ['產品更新', 'help.openai.com/en/articles/6825453-chatgpt-release-notes'],
    ],
    state: '第一個抓得到，但只到週；第二個擋自動抓取，要自己開',
  },
  {
    brand: 'gemini' as const,
    name: 'Gemini',
    links: [
      ['應用更新', 'gemini.google/release-notes'],
      ['模型與 API', 'ai.google.dev/gemini-api/docs/changelog'],
    ],
    state: '每一條都有日期，往回讀得到 2025 年',
  },
];

export default function SlideBonusSources() {
  return (
    <SlideLayout title="三家官方更新頁與查證狀況" subtitle="Sources" icon={BookMarked}>
      <div className="min-h-full max-w-5xl mx-auto flex flex-col gap-4">
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          這一段每一條事實的查證日期是 <span className="font-mono text-slate-100">2026-10-19</span>。
          <strong className="text-slate-100">要知道今天的現況，開這三個網址，從最上面往下讀到你上次看過的日期</strong>。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {DESKS.map((d, i) => (
            <AnimatedBlock
              key={d.name}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 text-left"
            >
              <div className="flex items-center gap-2">
                <span style={{ color: brandColor(d.brand) }}>
                  <BrandLogo brand={d.brand} size={16} />
                </span>
                <span className="text-slate-100 font-bold text-base">{d.name}</span>
              </div>

              <ul className="space-y-2">
                {d.links.map(([label, url]) => (
                  <li key={url} className="flex flex-col">
                    <span className="text-xs text-slate-500">{label}</span>
                    <a
                      href={`https://${url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm text-sky-400 hover:underline break-all"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-3 mt-auto">
                {d.state}
              </p>
            </AnimatedBlock>
          ))}
        </div>

        <Callout tone="warn" label="哪幾頁是二手來源" stepIndex={5}>
          ChatGPT 的模型日期與整組廣告時程來自維基百科與新聞報導，因為 OpenAI 的公告頁擋自動抓取。
          <strong className="text-slate-100">新聞會把「有條件支援」寫成「支援」</strong>，
          要拿這些日期對外使用之前，自己開官方頁核對一次。
        </Callout>
      </div>
    </SlideLayout>
  );
}
