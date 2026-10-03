import type React from 'react';
import { Presentation, Terminal, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 節錄標的是章節編號（A-1、A-3、A-4）不是行號。原本寫死了 34／58／121 三個行號，
 * 2026-09-20 核對時三個全錯（實際是 39／147／156）。CLAUDE.md 天天在改，
 * 前面插一段行號就全位移，而且沒有任何檢查抓得到。章節編號穩得多，讀者也看得出
 * 那是一份有結構的檔案。
 *
 * 這一頁的價值在於它是真的。節錄一律照抄專案根目錄那份 CLAUDE.md，
 * 不要為了好看改寫，改寫過就跟其他頁的示範沒有差別了。
 *
 * 版面刻意做成檔案檢視的樣子（行號、等寬字、深底），
 * 因為這一頁的主張就是「這是一個真的檔案」，做成一般的卡片列表會失去那個意思。
 *
 * 每一條拆成三段：規則原文、句子裡真正的重點（sky）、這條的由來（amber）。
 * 學員最缺的不是規則範例，是「規則從哪裡來」，答案都一樣：出過一次事。
 *
 * 2026-10-03 逐條對回專案根目錄的 CLAUDE.md（這一頁的節錄必須跟那份一字不差）：
 *   - A-1 第 39 行：「**同一頁最多兩種強調色**（`orange` 與成對的 `red`／`emerald` 不計入⋯）。
 *     沒有語意的地方就用灰階，顏色越少越乾淨。」括號裡的豁免是後來補的，畫面上放不下，
 *     節錄只取主句與後半句，**不要改寫**。
 *   - A-4 第 156 行：原文現在舉兩個例子（`slate-850`、`sky-350`），節錄跟著補上第二個。
 *   - A-3 第 147 行：一字未變。
 *   - 破折號那條（D-1 第 452 行）的 Hook 現在有實測證據，寫在 D 章第 492 行：
 *     「D-1 的破折號有 hook 擋著，從來沒被違反過；沒有檢查的那幾類一直在長回來。」
 *     左欄頁尾那一句就是照這一段寫的，它同時是章節六 Hook 那一段的伏筆。
 *   - 2026-10-03 第三條從 A-3 的「.map() 裡的條件式 class」換成 B-3 的「不要寫絕對頁碼」。
 *     原因是前者要先懂 .map() 跟 class 才讀得懂，這一頁的讀者多數不寫程式，
 *     而這一頁要證明的是「規則從哪裡來」，不是秀規則有多技術。B-3 不用背景知識，
 *     由來也同樣具體（「這一段共 14 頁」真的寫過，插頁之後全錯，而且沒有檢查抓得到）。
 *   - 同一輪把 Hook 從頁尾一句話攤成一整塊，程式照抄現況：
 *     `.claude/settings.json` 的 matcher 是 `Write|Edit|MultiEdit`，command 指向
 *     `scripts/slide-guard.mjs`；右邊那段被擋的訊息照抄那支腳本 permissionDecisionReason
 *     的輸出格式。那支腳本現在擋七類（破折號、色階、間距、animate class、色相、左側色條⋯），
 *     畫面上只舉破折號那一條，因為它是這一頁唯一講過的。
 *     **改那支腳本的時候要回頭看這一頁**，它是照抄的。
 *   - 開場補了子目錄手冊：`src/remotion/CLAUDE.md` 真的存在，而且前面幾頁才教過分層，
 *     這一頁拿自己當證據最省事。那個檔案如果哪天被刪掉，這一句要跟著拿掉。
 */
const RULES = [
  {
    line: 'A-1',
    before: '同一頁最多兩種強調色。',
    key: '沒有語意的地方就用灰階，',
    after: '顏色越少越乾淨。',
    why: '一開始每頁配色都不一樣，翻起來像十個人各做各的。',
  },
  {
    line: 'A-4',
    before: '只用內建色階。slate-850、sky-350 這類不存在的色階',
    key: '不會報錯，typecheck 也會過，',
    after: '但邊框會直接不渲染。',
    why: '手冊把它跟 py-0.2、animate-spin-slow 歸成同一種病：拼錯不會壞，只會安靜地什麼都不做。',
  },
  {
    line: 'B-3',
    before: '投影片內文不要寫絕對頁碼或頁數。插頁之後全部會失效，而且畫面右下角一直顯示著正確的編號，',
    key: '兩邊對不上比沒寫更糟。',
    after: '',
    why: '「這一段共 14 頁」這種句子真的寫過，插了幾頁之後全錯，而且沒有任何檢查抓得到。',
  },
];

const INIT_STEPS: { n: string; t: React.ReactNode; d: string }[] = [
  { n: '1', t: <>打 <code className="font-mono text-orange-300">/init</code></>, d: '它會把整個專案讀過一遍。' },
  { n: '2', t: '它產出第一版', d: '寫的是它從檔案裡看得出來的：用什麼框架、資料夾怎麼分。' },
  { n: '3', t: '你刪掉猜的', d: '補上它看不到的。通常會刪掉一半，這一步才是重點。' },
];

export default function SlideThisDeck() {
  return (
    <SlideLayout title="這份簡報自己的規則與製作流程" subtitle="How This Deck Was Built" icon={Presentation}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-8">

        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            你現在看到的這一整份<strong className="text-sky-300">是一個網頁專案</strong>，
            不是簡報軟體做的。下面這三條是從它的 <code className="font-mono text-orange-300">CLAUDE.md</code> 直接複製出來的。
            <span className="block mt-2 text-slate-400 text-sm">
              它不只一份：做動畫那一區的資料夾底下還有一份，動到那一區才會載入，就是前面講的分層。
            </span>
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4 items-start">

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
            <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-5 py-2.5">
              <span className="font-mono text-sm text-slate-300">CLAUDE.md</span>
              <span className="text-xs text-slate-600">節錄三條</span>
            </div>

            <div className="divide-y divide-slate-800/70">
              {RULES.map((r) => (
                <div key={r.line} className="px-5 py-4">
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-slate-600 shrink-0 pt-1">{r.line}</span>
                    <p className="font-mono text-sm leading-relaxed text-slate-400">
                      {r.before}
                      <strong className="text-sky-300 font-bold">{r.key}</strong>
                      {r.after}
                    </p>
                  </div>

                  <div className="flex gap-2.5 mt-2.5 pl-10">
                    <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-amber-200/70 text-xs leading-relaxed">{r.why}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 bg-slate-900/60 px-5 py-3.5">
              <p className="text-slate-400 text-xs leading-relaxed">
                這三條都是寫成文字、每次請它自己遵守的。
                <strong className="text-slate-200">還有一類不這樣做</strong>，底下那一塊就是。
              </p>
            </div>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="space-y-3">
            <div className="rounded-2xl border border-sky-500/40 bg-sky-950/25 px-5 py-4">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Terminal size={15} className="text-sky-400 shrink-0" />
                <span className="font-mono text-lg font-bold text-orange-300">/init</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                換你試。不用從空白開始，你已經有的專案就是素材。
              </p>
            </div>

            {INIT_STEPS.map((s) => (
              <div key={s.n} className="flex gap-3.5">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 font-mono text-xs font-bold text-slate-400">
                  {s.n}
                </span>
                <div>
                  <h4 className="text-slate-100 font-bold text-sm mb-0.5">{s.t}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="flex items-baseline gap-3 border-b border-slate-800 bg-slate-900 px-5 py-2.5">
            <span className="font-mono text-sm text-slate-300">Hook</span>
            <span className="text-xs text-slate-600">中文不要用破折號，這一條不寫在手冊裡</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 py-4">
            <div>
              <p className="text-slate-400 text-sm leading-relaxed mb-2.5">
                規則寫成程式，掛在「要寫檔案之前」這個時機上。
              </p>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-3 font-mono text-xs leading-relaxed text-slate-400">
                <div className="text-orange-300">.claude/settings.json</div>
                <div className="mt-1">&quot;matcher&quot;: &quot;Write|Edit|MultiEdit&quot;</div>
                <div>&quot;command&quot;: &quot;node scripts/slide-guard.mjs&quot;</div>
                <div className="mt-2.5 text-slate-500">slide-guard.mjs 裡那一條長這樣：</div>
                <div className="mt-1">{'{'} clause: &apos;D-1&apos;, label: &apos;中文破折號&apos;,</div>
                <div>&nbsp;&nbsp;fix: &apos;改用「，」「。」「：」或（）括號&apos; {'}'}</div>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mt-2.5">
                <code className="font-mono text-slate-400">.mjs</code> 跟{' '}
                <code className="font-mono text-slate-400">.js</code> 一樣是 JavaScript 檔案。
                這支不用你自己寫，叫它寫就好，章節六會動手掛一條。
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm leading-relaxed mb-2.5">
                它要是寫了，檔案根本存不進去，收到的是這段：
              </p>
              <div className="rounded-lg bg-slate-900 border border-slate-800 px-3.5 py-3 font-mono text-xs leading-relaxed text-slate-400">
                <div>這次寫入違反 CLAUDE.md⋯</div>
                <div className="mt-1 text-slate-300">・D-1 中文破折號：改用「，」「。」「：」或（）括號</div>
                <div className="mt-1">改掉再寫一次。</div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                <strong className="text-slate-200">差別是看得出來的</strong>：
                有 Hook 擋的這一條到今天沒有被違反過，只靠文字寫在手冊裡的那幾條，一直在長回來。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={5}
          className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <p className="text-slate-300 text-base leading-relaxed">
            <strong className="text-slate-100">
              <code className="font-mono text-orange-300">/init</code> 產出的是它從檔案裡推得出來的東西。
            </strong>
            你腦裡那些「為什麼要這樣」「什麼絕對不能做」，它一個都看不到。
            上面那三條各自附了一行「這條為什麼會存在」，那就是它猜不到、只有你寫得出來的部分。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
