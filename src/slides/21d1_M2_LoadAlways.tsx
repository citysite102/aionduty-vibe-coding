import { PinIcon } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/memory 的 Organize rules with `.claude/rules/`。
 * 當時的現況：規則檔是放在 `.claude/rules/` 底下的 `.md`，檔名自取、可以放子資料夾；
 * `paths` 寫在 YAML frontmatter 裡，文件原文「Path-scoped rules trigger when Claude uses the
 * Read, Write, or Edit tool on a file matching the pattern, not on every tool use」。
 * 要注意的是**沒寫 `paths` 的規則檔是開場就載入的**（「Rules without a `paths` field are loaded
 * unconditionally」），所以標題那句「Rules 碰到才載」只對有寫範圍的那種成立。
 * Slide 74 的總表把兩種分開列，改這一頁的時候回頭看那一張，不要讓兩邊打架。
 *
 * 2026-10-03 補開場。原本第一句直接講「分類的方式是它什麼時候被載進來」，
 * 但讀者在這一頁才第一次看到 Rules 這個名字，下一頁又冒出 Skill、子代理與 MCP，
 * 不知道這些是哪來的、要去哪裡。開場改成先點名剩下要講的幾樣，再給三個載入時機的膠囊，
 * 當下這一種亮起來（這是 D-2 說的「進度交給視覺元件」，不要寫成「接下來三頁講這個」）。
 * 膠囊的字跟 Slide 72、73 的標題一致，讀者翻過去對得起來。
 */
export default function SlideM2LoadAlways() {
  return (
    <SlideLayout title="根目錄的手冊整場都在，Rules 碰到才載" subtitle="Always-On vs Path-Bound" icon={PinIcon}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-400 text-sm leading-relaxed">
            <code className="font-mono text-orange-300">CLAUDE.md</code> 與 Skill 之外，還有 Rules、子代理、MCP 與 Hook。
            名字一多就會亂，分的方式是<strong className="text-slate-200">它什麼時候被載進來</strong>，因為那決定了它佔多少空間。
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono mt-3">
            <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-sky-300">整場都在</span>
            <span className="rounded-full border border-slate-800 px-3 py-1 text-slate-500">叫到才進來</span>
            <span className="rounded-full border border-slate-800 px-3 py-1 text-slate-500">不進對話</span>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sky-400 font-bold text-lg">CLAUDE.md</span>
            <span className="text-slate-500 text-xs font-mono">整場都在</span>
          </div>
          <div className="text-slate-200 text-sm font-bold mb-1">永遠都要記得的事實與規則</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            session 一開始就載入，壓縮對話之後還會自動重讀，不會掉。代價是它從頭到尾都佔著空間。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-sky-400 font-bold text-lg">Rules</span>
            <span className="text-slate-500 text-xs font-mono">碰到那一區才載</span>
          </div>
          <div className="text-slate-200 text-sm font-bold mb-1">只在某一區檔案才適用的限制</div>
          <p className="text-slate-500 text-sm leading-relaxed">
            在 <code className="font-mono text-slate-400">.claude/rules/</code> 底下開一個 <code className="font-mono text-slate-400">.md</code>，
            檔名自己取，開頭用 <code className="font-mono text-slate-400">paths</code> 寫它管哪一區。
            <span className="block mt-2 font-mono text-xs text-slate-500 leading-relaxed">
              <span className="text-slate-400">.claude/rules/components.md</span><br />
              ---<br />paths:<br />&nbsp;&nbsp;- &quot;src/components/**&quot;<br />---<br />
              <span className="text-slate-400">這一區的元件一律用 canvas 畫，不要用圖片</span>
            </span>
            只有動到那一區的時候才會被讀進來，平常不會佔掉對話的空間。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-400 text-base leading-relaxed">
            兩者的差別只有一個：<strong className="text-slate-200">要不要一直在。</strong>能綁定範圍的就綁定，不要全部往根目錄堆。這也是為什麼官方建議一份 CLAUDE.md 控制在 200 行以內。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
