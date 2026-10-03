import { Briefcase, Rocket } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 情境二的 Skill 最後查證：2026-10-03，對照 code.claude.com/docs/en/skills 的 frontmatter 一覽。
 * 當時的現況：
 *   - `description` 是「Claude uses this to decide when to apply the skill」，也就是它自動判斷
 *     要不要用的唯一依據，官方把它標成 Recommended，並建議「Put the key use case first」、
 *     用使用者真的會講的字（「Be specific: include keywords users naturally say」）。
 *   - `name` 是「Command name shown in the / menu. Defaults to the directory name.」
 *     所以資料夾叫 copy-review，斜線指令就是 /copy-review。
 *
 * 2026-10-03 這一格的例子從「版本發布流程」（npm run test、package.json、git tag、origin main）
 * 換成文案 Review。原因是左邊那一格已經是 API 與登入檢查，兩格都在講程式，
 * 不寫程式的學員整頁沒有一個進得去的入口；而 Skill 的概念跟寫不寫程式無關。
 * 這一頁的 Skill 例子要維持非工程的，不要改回去。
 *
 * 2026-10-03 補上 frontmatter。原本這一格只列四個步驟，看不出 Skill 跟「一段寫下來的 SOP」
 * 差在哪：差別就在 description，它是被自動叫出來的開關。少了那一行，
 * 學員照著做會寫出一個永遠要自己點名才會動的 Skill，而頁尾那句「它會去找對得上的 Skill」
 * 也會變得沒有根據。
 */

export default function SlideM2ExtensionsCases() {
  return (
    <SlideLayout title="零件實際怎麼用（一）：規範與流程" subtitle="Real-world Scenarios for Extensions" icon={Briefcase}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto items-stretch mt-6">
        
        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-sky-400 mb-4 border-b border-slate-800 pb-3">
            <Briefcase size={20} />
            情境一：整個專案一套規則，某一區再加嚴
          </h3>
          <p className="text-slate-300 text-sm mb-3">
            你希望整個專案有統一的風格，但有一個資料夾特別容易出事，要更嚴的限制。
            <strong className="text-slate-100">做法是放兩份檔案，位置決定了誰會讀到它。</strong>
          </p>

          {/*
            縮排一定要用 padding，不要用全形空白排。原本靠 `　　` 排版，
            JSX 會把那一行開頭的空白吃掉，畫面上 api.md 跟 .claude/ 貼齊，
            看起來像兩個同層的東西，而這一格要講的正是「它在 rules 底下」。
          */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs mb-3 leading-relaxed">
            <div className="text-slate-300">你的專案/</div>
            <div className="text-slate-400">
              ├ CLAUDE.md<span className="text-slate-600 font-sans"> 整個專案都會讀</span>
            </div>
            <div className="text-slate-400">└ .claude/</div>
            <div className="text-slate-400 pl-4">└ rules/</div>
            <div className="text-slate-400 pl-8">
              └ api.md<span className="text-slate-600 font-sans"> 只有改到 src/api 底下的檔案才會讀</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sky-300 font-bold text-xs block mb-1 font-mono">CLAUDE.md</span>
              <span className="text-slate-400 text-sm">「畫面上的文字一律用繁體中文，不要引用外部圖片或字型。」</span>
              <span className="block text-slate-600 text-xs mt-1.5">不管你今天改哪一個檔案，這一條都算數。</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-sky-300 font-bold text-xs block mb-1 font-mono">.claude/rules/api.md</span>
              <div className="text-slate-600 text-xs font-mono leading-relaxed mb-1.5">
                ---<br/>
                paths:<br/>
                　- &quot;src/api/**&quot;<br/>
                ---
              </div>
              <span className="text-slate-400 text-sm">「你在這個資料夾寫的每一個 API，第一件事都要先檢查使用者登入了沒。沒登入就直接回錯誤，不要往下做。」</span>
              <span className="block text-slate-600 text-xs mt-1.5">
                怎麼確認它真的在：叫它在那個資料夾加一個新的 API，看它有沒有自己先寫登入檢查。沒寫，就是這條沒被讀進去。
              </span>
            </div>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            兩條橫線夾起來的那一段叫 <strong className="text-slate-200">front matter</strong>，寫的是這條規則管哪些檔案，
            右邊那個 Skill 的開頭也是同一種寫法。檔名你自己取，內容是純文字，不用寫成程式。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold flex items-center gap-3 text-emerald-400 mb-4 border-b border-slate-800 pb-3">
            <Rocket size={20} />
            情境二：例行公事標準化 (Skill)
          </h3>
          <p className="text-slate-300 text-sm mb-4">
            文稿發出去之前那一輪檢查，每次做的事都一樣，你不會想每次都重講一遍。
          </p>
          <div className="bg-slate-950 p-4 rounded-lg border border-emerald-900/30">
            <span className="font-mono text-orange-300 text-xs block mb-2">.claude/skills/copy-review/SKILL.md</span>
            <div className="text-slate-500 text-xs font-mono leading-relaxed mb-3">
              ---<br />
              name: copy-review<br />
              description: <span className="text-slate-300">文稿要發出去之前用。檢查用詞、長度與禁用說法，列出要改哪裡。</span><br />
              ---
            </div>
            <ul className="text-slate-400 text-sm space-y-1 list-decimal pl-4">
              <li>對照品牌用語表，標出不一致的詞</li>
              <li>標題超過二十個字的，列出來</li>
              <li>找出「保證」「絕對」「業界第一」這類不能寫的說法</li>
              <li>把要改的地方列成一張清單，每一條附一個建議改法</li>
            </ul>
          </div>

          <p className="text-slate-500 text-xs leading-relaxed mt-3">
            <strong className="text-slate-300">description 那一行是它自己決定要不要用這個 Skill 的依據</strong>，
            所以要寫「什麼情況會用到」，而且用你平常真的會講的字，不是只寫它做了什麼。
            你說「這份文案幫我檢查一下再出」，它比對的就是那一句。
            <span className="block mt-1.5">
              資料夾名稱就是它的名字，所以這一個也可以直接點名：
              <code className="font-mono text-orange-300">/copy-review</code>。
            </span>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
