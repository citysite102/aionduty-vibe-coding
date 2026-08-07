import { Compass, CornerDownRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { GenericMock, DesignedMock, ReferencedMock } from '../components/SiteMock';

/** 三格進程。前兩格維持灰階，只有當下要講的第三格亮起來。 */
const STEPS = [
  { label: '沒裝 Skill', Mock: GenericMock, live: false },
  { label: '裝了 Skill', Mock: DesignedMock, live: false },
  { label: '再加參考設計', Mock: ReferencedMock, live: true },
];

/**
 * 一頁網站由上往下的常見區塊。名字用元件庫的通用叫法，
 * 學員回頭翻 Ant Design 或 Bootstrap 的清單時對得上。
 */
const PARTS = [
  { en: 'Navigation Bar', zh: '最上面那條，放 logo 與選單', h: 'h-7' },
  { en: 'Hero', zh: '一進來第一眼看到的大標區', h: 'h-12' },
  { en: 'Card', zh: '一塊一塊並排的內容方塊', h: 'h-9' },
  { en: 'Footer', zh: '最下面那條，放聯絡方式與版權', h: 'h-7' },
];

export default function Slide21a3SkillDemoReference() {
  return (
    <SlideLayout title="給它看，還要叫得出每一塊的名字" subtitle="Reference and Vocabulary" icon={Compass}>
      <div className="mx-auto min-h-full w-full max-w-6xl space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
              <span className="flex gap-1">
                <span className="h-4 w-3 rounded-sm bg-slate-100" />
                <span className="h-4 w-3 rounded-sm bg-sky-500/70" />
                <span className="h-4 w-3 rounded-sm bg-slate-700" />
              </span>
              <span className="text-sm text-slate-300">一張截圖、一個網址，或一份配色與字體的說明</span>
            </div>
            <CornerDownRight size={16} className="shrink-0 text-slate-600" />
            <span className="text-sm text-slate-400">接在上一版之後繼續講</span>
          </div>

          <div className="whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-300">
            {`@reference.png 這張是我要的風格，沿用現在這一版的內容，只改外觀。
1. 配色、標題與內文的字級差距、分隔線粗細，照這張走
2. 文字內容與區塊順序不要動
3. 改完把前後兩版並排開給我看，我沒說可以之前不要蓋掉舊版`}
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
            配色和字級的差距用文字描述很費力，給一張圖準得多。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s) => {
            const Mock = s.Mock;
            return (
              <div
                key={s.label}
                className={`rounded-2xl border p-3 ${
                  s.live ? 'border-sky-900/50 bg-slate-900' : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                <div className={`mb-1.5 text-sm font-bold ${s.live ? 'text-sky-300' : 'text-slate-500'}`}>
                  {s.label}
                </div>
                <div className={`rounded-lg border border-slate-800 bg-slate-950 p-2.5 ${s.live ? '' : 'opacity-50'}`}>
                  <Mock />
                </div>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="grid grid-cols-1 gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-1.5">
            {PARTS.map((p) => (
              <div
                key={p.en}
                className={`flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950 px-3 ${p.h}`}
              >
                <span className="font-mono text-sm text-slate-200">{p.en}</span>
                <span className="truncate text-xs text-slate-500">{p.zh}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-3">
            <p className="text-sm leading-relaxed text-slate-300">
              網頁是一塊一塊拼起來的，每一塊都有通用的名字。
              <strong className="text-slate-100">會叫名字，指令才指得準</strong>：
              「Navigation Bar 改成捲動時固定在最上面」，比「上面那一條讓它黏著」少猜很多。
            </p>
            <p className="text-sm leading-relaxed text-slate-400">
              <a
                href="https://ant.design/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-sky-400 hover:underline"
              >
                Ant Design
              </a>
              {' 與 '}
              <a
                href="https://getbootstrap.com/"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-sky-400 hover:underline"
              >
                Bootstrap
              </a>
              {' '}這類元件庫，是別人做好的一整套零件，每個都有名字也有現成樣式。你不一定要用它們，
              但翻一次它們的元件清單，畫面上每一塊該怎麼稱呼就有基本概念了。
            </p>
          </div>
        </AnimatedBlock>

        <Callout stepIndex={4}>
          <strong className="text-slate-100">Skill 決定它做得好不好，參考設計決定它做得像不像你要的那一種。</strong>
          名字則決定你改不改得動：知道那塊叫什麼，才講得出要調哪裡。
        </Callout>

      </div>
    </SlideLayout>
  );
}
