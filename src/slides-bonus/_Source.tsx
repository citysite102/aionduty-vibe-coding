/**
 * 出處列。這一疊補充單元的每一頁都掛一條。
 *
 * 為什麼每一頁都要：這整個單元講的都是別人家產品這一年改了什麼（C 章），
 * 而那些事實一個月後就可能不成立。學員看到畫面跟自己的螢幕不一樣時，
 * 需要當場知道該去哪一頁重查，不是回頭翻簡報最後一頁。
 *
 * `secondhand` 標的是「這一條不是從官方文件抄來的」。
 * 2026-10-19 查的時候，help.openai.com 與 openai.com 對自動抓取回 403，
 * 所以 ChatGPT 那幾頁的日期有一部分來自維基百科與新聞。C-2 說以官方文件為準，
 * 既然當時拿不到官方原文，就要在畫面上標出來，不要讓它看起來跟官方同級。
 */
export function SourceFoot({
  links,
  checked = '2026-10-19',
  secondhand,
}: {
  links: { label: string; url: string }[];
  checked?: string;
  secondhand?: string;
}) {
  return (
    <div className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span className="font-mono">查證 {checked}</span>
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        出處：
        {links.map((l) => (
          <a
            key={l.url}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:underline font-mono"
          >
            {l.label}
          </a>
        ))}
      </span>
      {secondhand && <span className="text-slate-600">二手來源：{secondhand}</span>}
    </div>
  );
}

/** 三家的官方更新頁。各頁的 SourceFoot 從這裡取，不要各自手打網址。 */
export const SRC = {
  claudeNotes: {
    label: 'support.claude.com release notes',
    url: 'https://support.claude.com/en/articles/12138966-release-notes',
  },
  claudeNews: { label: 'anthropic.com/news', url: 'https://www.anthropic.com/news' },
  claudeDash: {
    label: 'claude.com dashboards-and-motion',
    url: 'https://claude.com/resources/articles/dashboards-and-motion',
  },
  claudeSkills: { label: 'anthropic.com/news/skills', url: 'https://www.anthropic.com/news/skills' },
  claudeCode: { label: 'code.claude.com changelog', url: 'https://code.claude.com/docs/en/changelog' },
  cowork: { label: 'claude.com/docs/cowork changelog', url: 'https://claude.com/docs/cowork/changelog' },
  openaiLearn: {
    label: 'learn.chatgpt.com whats-new',
    url: 'https://learn.chatgpt.com/docs/whats-new',
  },
  openaiIntelligentUI: {
    label: 'help.openai.com intelligent-ui-in-chatgpt',
    url: 'https://help.openai.com/en/articles/20001598-intelligent-ui-in-chatgpt',
  },
  openaiDots: {
    label: 'learn.chatgpt.com dots',
    url: 'https://learn.chatgpt.com/docs/dots',
  },
  claudeM365: {
    label: 'claude.com blog：Claude for M365',
    url: 'https://claude.com/blog/collaborate-with-claude-across-excel-powerpoint-word-and-outlook',
  },
  claudeCredits: {
    label: 'support.claude.com：每月 API 額度',
    url: 'https://support.claude.com/en/articles/17154008-monthly-api-credits-for-max-and-team-plans',
  },
  openaiRecord: {
    label: 'learn.chatgpt.com record-and-replay',
    url: 'https://learn.chatgpt.com/docs/extend/record-and-replay',
  },
  claudeSkillHow: {
    label: 'support.claude.com 建立自訂 Skill',
    url: 'https://support.claude.com/en/articles/12512198-how-to-create-custom-skills',
  },
  openaiAds: {
    label: 'help.openai.com ads-in-chatgpt',
    url: 'https://help.openai.com/en/articles/20001047-ads-in-chatgpt',
  },
  openaiSkills: {
    label: 'learn.chatgpt.com build-skills',
    url: 'https://learn.chatgpt.com/docs/build-skills',
  },
  openaiSafety: {
    label: 'deploymentsafety.openai.com gpt-6-october',
    url: 'https://deploymentsafety.openai.com/gpt-6-october',
  },
  claudeOpus48: {
    label: 'anthropic.com/news/claude-opus-4-8',
    url: 'https://www.anthropic.com/news/claude-opus-4-8',
  },
  openaiNotes: {
    label: 'help.openai.com release notes',
    url: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  },
  openaiGpt6: { label: 'openai.com/index/gpt-6-for-everyone', url: 'https://openai.com/index/gpt-6-for-everyone/' },
  geminiNotes: { label: 'gemini.google/release-notes', url: 'https://gemini.google/release-notes/' },
  antigravity: {
    label: 'antigravity.google/download',
    url: 'https://antigravity.google/download',
  },
  geminiSkills: {
    label: 'Google Workspace Help：Gems 轉 skills',
    url: 'https://knowledge.workspace.google.com/admin/generative-ai/gemini-app/about-the-transition-to-skills',
  },
  geminiSpark: {
    label: 'blog.google gemini-spark-ai',
    url: 'https://blog.google/intl/zh-tw/products/devices-services/gemini-spark-ai/',
  },
  geminiApi: {
    label: 'ai.google.dev gemini-api changelog',
    url: 'https://ai.google.dev/gemini-api/docs/changelog',
  },
} as const;
