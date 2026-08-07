import { Palette, FileText, CornerDownRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrowserFrame, GenericMock, DesignedMock } from '../components/SiteMock';

export default function Slide21a2SkillDemoResume() {
  return (
    <SlideLayout title="同一份履歷，裝與不裝 Skill" subtitle="With and Without a Skill" icon={Palette}>
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

        <Callout
          stepIndex={4}
          footnote={
            <>
              <code className="font-mono text-orange-300">frontend-design</code> 在 Anthropic 官方市集
              <code className="mx-1 font-mono text-slate-300">anthropics/claude-plugins-official</code>，
              用 <code className="font-mono text-orange-300">/plugin</code> 裝。
              社群另有 <code className="font-mono text-orange-300">ui-ux-pro-max</code>。
            </>
          }
        >
          差別不在它突然比較會寫程式，也不在你話講得比較長。
          <strong className="text-slate-100">Skill 是一份先寫好的設計判斷</strong>，
          逼它在動手前先選一個方向，而不是直接套一個最安全的版型。
        </Callout>

      </div>
    </SlideLayout>
  );
}
