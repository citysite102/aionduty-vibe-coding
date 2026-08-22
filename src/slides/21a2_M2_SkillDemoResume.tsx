import { Palette, FileText, CornerDownRight, Eye } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrowserFrame, GenericMock, DesignedMock } from '../components/SiteMock';

/**
 * 參考站現場會直接點開，所以只放兩個，不做成一長串清單。
 * 兩個的分工不一樣：一個是「同類作品長什麼樣」，一個是「上限在哪」。
 */
const REFS = [
  {
    name: 'Bestfolios',
    href: 'https://www.bestfolios.com/',
    desc: '設計師的個人網站與作品集實例，跟你要做的東西同一類。',
  },
  {
    name: 'CSS Design Awards',
    href: 'https://www.cssdesignawards.com/',
    desc: '每天選一個得獎網站，看的是版面能被做到什麼程度。',
  },
];

export default function Slide21a2SkillDemoResume() {
  return (
    <SlideLayout title="同一個個人網站，裝與不裝 Skill" subtitle="With and Without a Skill" icon={Palette}>
      <div className="mx-auto min-h-full w-full max-w-6xl space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5">
              <FileText size={16} className="shrink-0 text-slate-500" />
              <span className="text-sm text-slate-300">履歷存成一個檔案，放進專案資料夾</span>
            </div>
            <CornerDownRight size={16} className="shrink-0 text-slate-600" />
            <span className="text-sm text-slate-400">兩邊用完全同一段話</span>
          </div>

          <div className="whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-sm leading-relaxed text-slate-300">
            {`用 @resume.md 這份履歷做一個單頁的個人網站。
1. 內容只用履歷裡寫的，沒有的不要自己補，也不要做成多頁
2. 只新增 index.html 與 style.css，資料夾裡其他檔案不要動
3. 做完先在本機開起來給我看，我確認版面之後你再繼續調`}
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
            指到檔名而不是「這份」，講明不要動什麼，說好做完先給我看。三件事都寫進去，它就不用猜。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

          <AnimatedBlock stepIndex={2} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <h3 className="text-base font-bold text-slate-300">沒裝 Skill</h3>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-500">示意圖</span>
            </div>
            <BrowserFrame>
              <GenericMock />
            </BrowserFrame>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
              什麼都置中、三張一樣的卡片、字級沒有落差。不難看，但你看過太多長這樣的。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="flex flex-col rounded-2xl border border-sky-900/50 bg-slate-900 p-4">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <h3 className="text-base font-bold text-sky-300">
                先叫 <code className="font-mono text-orange-300">frontend-design</code>
              </h3>
              <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-500">示意圖</span>
            </div>
            <BrowserFrame>
              <DesignedMock />
            </BrowserFrame>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-400">
              它先挑定一種調性（編輯感、極簡、工業風之類），再讓字級、留白、對齊照那個調性走。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex items-start gap-2.5">
            <Eye size={16} className="mt-0.5 shrink-0 text-sky-400" />
            <p className="text-sm leading-relaxed text-slate-300">
              你不會寫版面，但你要驗收版面。
              <strong className="text-slate-100">看過的好版面不夠多，你只講得出「怪怪的」，講不出哪裡該改。</strong>
              而且做出來的東西是要給別人看的，對方通常在讀完內容之前就先決定要不要讀。
              平常存幾個喜歡的網站，要改的時候直接把截圖貼給它，比形容十句有用。
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {REFS.map((r) => (
              <a
                key={r.href}
                href={r.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-800 bg-slate-950 p-3 transition-colors hover:border-sky-500/50"
              >
                <div className="mb-1 font-mono text-sm text-sky-300">{r.name}</div>
                <p className="text-sm leading-relaxed text-slate-400">{r.desc}</p>
              </a>
            ))}
          </div>
        </AnimatedBlock>

        <Callout
          stepIndex={5}
          footnote={
            <>
              <code className="font-mono text-orange-300">frontend-design</code> 在 Anthropic 官方市集
              <code className="mx-1 font-mono text-slate-300">anthropics/claude-plugins-official</code>，
              用 <code className="font-mono text-orange-300">/plugin</code> 裝。
              社群另有 <code className="font-mono text-orange-300">ui-ux-pro-max</code>。
            </>
          }
        >

          <strong className="text-slate-100">Skill 是一份先寫好的設計判斷</strong>，
          逼它在動手前先選一個方向，而不是直接套一個最安全的版型。
        </Callout>

      </div>
    </SlideLayout>
  );
}
