import { PinIcon } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';

/**
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/memory 的 Organize rules with `.claude/rules/`。
 * 當時的現況：規則文件是放在 `.claude/rules/` 底下的 `.md`，檔名自取、可以放子資料夾；
 * `paths` 寫在 YAML frontmatter 裡，文件原文「Path-scoped rules trigger when Claude uses the
 * Read, Write, or Edit tool on a file matching the pattern, not on every tool use」。
 * 要注意的是**沒寫 `paths` 的規則文件是開場就載入的**（「Rules without a `paths` field are loaded
 * unconditionally」），所以標題那句「Rules 碰到才載」只對有寫範圍的那種成立。
 *
 * 標題的「根目錄」不是贅字，拿掉會變錯的：同一份文件寫「CLAUDE.md and CLAUDE.local.md files
 * in the directory hierarchy above the working directory are loaded at launch. Files in
 * subdirectories load on demand when Claude reads files in those directories.」
 * 子目錄裡的那一份跟 Rules 同一種行為，所以卡片內文也要帶著這個限定，不要寫成
 * 「CLAUDE.md 整場都在」。Slide 67 的四層位置表是這一句的出處。
 * Slide 74 的總表把兩種分開列，改這一頁的時候回頭看那一張，不要讓兩邊打架。
 *
 * 2026-10-03 補一句「哪一種用在什麼時候」。這一頁是全片第一次兩種同時出現，
 * 而它原本只比載入時機（兩者相同），所以學員讀完會問「那我該用哪一個」。
 * 判斷標準只有一條：**範圍剛好等於一個資料夾，就放那個資料夾的 CLAUDE.md；
 * 要跨資料夾或只管某一種副檔名，才用 Rules 的 `paths`。** 同一條也寫在 Slide 89
 * （那一頁展開成兩張卡，是學員真的在做決定的地方），改一邊要改兩邊。
 *
 * 2026-10-03 補開場。原本第一句直接講「分類的方式是它什麼時候被載進來」，
 * 但讀者在這一頁才第一次看到 Rules 這個名字，下一頁又冒出 Skill、子代理與 MCP，
 * 不知道這些是哪來的、要去哪裡。開場改成先點名剩下要講的幾樣，再給三個載入時機的膠囊，
 * 當下這一種亮起來（這是 D-2 說的「進度交給視覺元件」，不要寫成「接下來三頁講這個」）。
 * 膠囊的字跟 Slide 72、73 的標題一致，讀者翻過去對得起來。
 */
const MAKE_RULE =
  '幫我在 .claude/rules/ 底下建一條規則，檔名 timer-ui.md。' +
  '開頭的 paths 照我現在的資料夾結構填，只在改到計時器畫面那個檔案的時候才生效。' +
  '規則內容：這一區的畫面一律自己用 canvas 畫，不要引用外部圖片或字型。' +
  '先不要存檔，貼出來給我看。';

const TRY_RULE = '幫計時器加一個星空背景。';

function RulePrompt({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border border-sky-900/50 bg-sky-950/20 px-3.5 py-2.5">
      <div className="text-xs font-mono uppercase tracking-widest text-sky-500 mb-1.5">{label}</div>
      <p className="text-sky-100 text-sm leading-relaxed">「{text}」</p>
      <CopyAction text={text} className="mt-2" />
    </div>
  );
}

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
            放在專案根目錄的那一份，session 一開始就載入，壓縮對話之後還會自動重讀，不會掉。代價是它從頭到尾都佔著空間。
            <span className="block mt-2">
              子目錄裡的那一份不是，它跟底下的 Rules 一樣，動到那一區才讀進來。
              那一份管的範圍就是它所在的資料夾，不用另外寫；要跨資料夾或只管某一種副檔名，才用底下 Rules 的{' '}
              <code className="font-mono text-slate-400">paths</code>。
            </span>
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

        <AnimatedBlock stepIndex={4} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="text-slate-200 text-sm font-bold mb-3">在你的計時器專案上試一次</div>
          <div className="space-y-3">
            <RulePrompt label="Prompt 1：建規則" text={MAKE_RULE} />
            <p className="text-slate-500 text-sm leading-relaxed">
              <code className="font-mono text-slate-400">paths</code> 那一行讓它自己填，它看得到你的資料夾結構。存檔之前先確認它寫的範圍是你要的那一區。
            </p>
            <RulePrompt label="Prompt 2：看效果" text={TRY_RULE} />
            <p className="text-slate-500 text-sm leading-relaxed">
              這一句你一個字都沒提規則，但它動到的是計時器那個檔案，規則這時候才被讀進來，
              所以背景會是它自己畫的，不會去外面抓一張圖。想看反面，就把 <code className="font-mono text-slate-400">paths</code> 改成別的資料夾再問一次同一句。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-400 text-base leading-relaxed">
            兩者的差別只有一個：<strong className="text-slate-200">要不要一直在。</strong>能綁定範圍的就綁定，不要全部往根目錄堆。這也是為什麼官方建議一份 CLAUDE.md 控制在 200 行以內。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
