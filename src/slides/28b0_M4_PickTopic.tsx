import { Target, FileSpreadsheet, Globe, MessageSquareQuote, BookMarked } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 課後回饋裡「回去之後有什麼會擋住你」的第一名是「不知道從哪個題目開始」。
 * 下一頁講的是怎麼開工，沒有講做什麼，所以那一票沒有被接住。
 *
 * 四個題目都挑不需要寫程式背景就評得出成果的：自己看得出做對做錯，才驗得下去。
 * 平等的四項一律灰階，Prompt 框統一同一種處理，不要一項一色。
 */
const TOPICS = [
  {
    icon: FileSpreadsheet,
    title: '每週都要交的那份報表',
    who: '手上有固定要彙整的數字或資料',
    prompt:
      '這是我上週的原始資料和交出去的報表。幫我寫一支腳本，下次我把新資料放進同一個資料夾就能產出同樣格式。',
    get: '一支下次還能再跑一次的腳本',
  },
  {
    icon: Globe,
    title: '一頁式網站，換成你自己的內容',
    who: '想要一個能傳給別人的網址',
    prompt:
      '幫我做一個單頁網站，內容是這些。做完幫我推上 GitHub 並部署，給我可以傳給別人的網址。',
    get: '一組公開網址，對方不用裝任何東西',
  },
  {
    icon: MessageSquareQuote,
    title: '你每個月都要重寫一次的那種回覆',
    who: '客服回信、面試邀約、貼文格式',
    prompt:
      '我貼三則我以前寫過的回覆。幫我整理成一份 SKILL.md，寫清楚步驟和語氣，之後我說「用這個回」你就照著跑。',
    get: '一份 SKILL.md，之後叫一次就展開',
  },
  {
    icon: BookMarked,
    title: '你部門的用詞與格式規範',
    who: '有一套大家嘴巴上說、但沒寫下來的規矩',
    prompt:
      '我貼一份我們的用詞規範。幫我整理成 CLAUDE.md，然後用它檢查這篇文章，列出哪幾句不符合。',
    get: '一份手冊，以後每次對話它都會先讀',
  },
];

export default function SlidePickTopic() {
  return (
    <SlideLayout title="回去之後，做哪一種題目" subtitle="Pick Your First Real Task" icon={Target}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          挑題目只有一個判準：<strong className="text-slate-100">選一件你這個月會做第二次的事。</strong>
          做第二次的時候，你才驗得出來它到底有沒有幫到你。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOPICS.map((t, i) => {
            const Icon = t.icon;
            return (
              <AnimatedBlock
                key={t.title}
                stepIndex={i + 2}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-1">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-100 leading-snug">{t.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{t.who}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-lg border border-sky-900/50 bg-sky-950/20 px-4 py-3">
                  <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">
                    第一句這樣講
                  </div>
                  <p className="text-sky-100 text-sm leading-relaxed">{t.prompt}</p>
                </div>

                <p className="text-sm text-slate-400 leading-relaxed mt-3 pt-3 border-t border-slate-800">
                  做完你手上會有：<span className="text-slate-300">{t.get}</span>
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="warn" label="題目太大的徵兆" stepIndex={6}>
          交代下去之後，它一次改了七、八個檔案，你看不完也說不出哪裡不對。
          這時候不是把它換掉，是<strong className="text-slate-100">把題目切小</strong>：
          跟它說「先停，這一輪只做某某一件事」，做完你看得懂了再往下。
        </Callout>

      </div>
    </SlideLayout>
  );
}
