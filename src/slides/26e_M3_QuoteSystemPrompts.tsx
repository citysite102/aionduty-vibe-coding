import { TerminalSquare, ArrowRight, AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/*
 * 每一步都要有「做完之後你要看什麼」，否則學員照貼完五段，
 * 不會知道自己已經被帶偏了。watch 寫的是這一步特有的失誤，
 * 跨步驟的通病留給下一頁的五個風險，兩邊不要重複。
 */

/**
 * 2026-10-04（講師要求逐條查缺口）補了五處：
 *
 *   1. 第 1 步的 Prompt 原本寫「內容照我們前面談的填」。學員按複製貼過去，
 *      新開的對話看不到「前面談的」是什麼，它只會自己編四份文件出來
 *      （CLAUDE.md A-4，這個坑課裡記載踩過兩次）。當時的修法是把四個檔名與各自的主題
 *      塞進字串，但**主題不是內容**，Claude 拿到四個標題一樣會整套編出來。
 *   2. 第 5 步要用 `quote-reviewer`，但五步裡沒有一步建它。
 *      〈審查子代理、一次實測、分工不是多開對話〉才講明它「沒有真的建」，
 *      而學員在這一頁讀到第 5 步會以為自己漏做了一步。補 `setup` 那一行。
 *   3. 第 3 步是最大的一步（四個資料結構＋兩個 API＋兩個畫面），原本沒要求先報計畫。
 *      〈交代一輪工作的五個步驟〉第五步與案例一第 2 步都用 plan 模式，這裡最該用。
 * 2026-10-04 第二輪（講師）：第 1 步真正的毛病是**把學員答得出來的跟答不出來的塞在同一步**。
 * 他答得出來的是需求（誰用、為了什麼、做到哪裡、哪些不做），答不出來的是資料表與 API 契約。
 * 所以第 1 步現在只做一份 `docs/brief.md`，而且 Prompt 的前半就是〈先寫一句 User Story，
 * 再決定要不要後端〉那一頁的四段，學員貼過去不需要自己生內容。
 * 技術文件那三份移到第 2 步，改成**由 Claude 從 brief 推導草稿、列出「我替你做了哪些決定」
 * 交給學員逐條核可**，順勢把舊的第 2 步（請它回頭檢查缺口）併進來，維持五步。
 * **第 1 步的 Prompt 要原封不動帶著那一頁的三句 User Story，改一邊就要改另一邊（B-4）。**
 * 2026-10-04 踩過一次：那一頁從一句 Story 改成三句（兩個角色）之後，這裡還停在一句，
 * 而且另外列了一份「這一輪要做」的功能清單，等於同一件事兩種講法。
 * 現在三句照抄，功能清單拿掉，因為那一頁已經把「要做的」定義成就是這三句。
 *
 * 同一輪另外兩處連動：第 3 步原本寫「建立客戶、品項、報價單、明細四個資料結構」，
 * 但第 2 步已經改成由 Claude 推導 `data-model.md`，這裡再寫死四個就等於不信那份文件，
 * 改成「照 data-model.md 建立裡面列的那幾個」。第 5 步的 `setup` 原本寫「跟你剛才那個
 * code-reviewer 一樣」，`剛才` 隔了八頁（D-6b），而且 code-reviewer 2026-10-04 已經改成
 * 名詞小標，所以改寫成逐段對應：判斷標準換什麼、檢查項目換什麼、退回條件照抄。
 *
 *   4、5. 五步跑完沒有任何一次「打開畫面看一眼」，也沒有存檔點。
 *      兩個都是跨步驟的習慣不是某一步的失誤，所以不塞進 watch，另開一塊。
 *
 * 2026-10-08（講師說文字量過多）五步拆成兩頁，後兩步與「每一步之間固定做兩件事」
 * 搬到 `26e2_M3_QuoteSystemPrompts2.tsx`。拆的理由是那五段 Prompt 是學員要複製去跑的範本，
 * A-4 規定畫面印的要跟複製鈕拿到的一字不差，**所以不能靠刪字瘦身，只能拆頁**。
 * 編號維持 1 到 5 跨兩頁，不要因為第二頁的第一張就改成 1。
 */
const STEPS = [
  {
    title: '把你知道的那幾句整理成一份需求',
    setup: '這一段的內容就是你在 User Story 那一頁填好的東西，不用另外想。',
    prompt:
      '我要做一個報價系統。這一輪要做的就是下面這三件事，多的不做。' +
      '身為業務助理，我要選客戶、加品項，建出一張報價單，為了當天就能回覆客戶。' +
      '身為業務助理，我要從上一張報價單複製一份，為了不用把常用品項重打一次。' +
      '身為業務主管，我要看到待確認的報價單並按下確認，為了放行之前先看一眼金額。' +
      '必填欄位：客戶名稱、有效期限、幣別、品項、數量、單價、稅金、付款條件。' +
      '這一輪不做：金流、庫存扣帳、完整 CRM、登入，也不做動畫與深色模式。' +
      '主管沒按確認就不能送出，這一條要擋在後端。' +
      '請把上面整理成 docs/quote-brief.md。我沒講到的不要自己補，列成問題問我。' +
      '這一步只寫這一份文件，不要寫程式、不要建資料庫、也不要產出其他文件。',
    watch: '它很容易順手把資料表跟 API 一起生出來。多出 docs/quote-brief.md 以外的檔案就停下來。',
  },
  {
    title: '請它推導技術文件，決定留給你核可',
    prompt:
      '照 docs/quote-brief.md 草擬三份文件：docs/data-model.md（有哪幾張表、各自哪些欄位）、docs/api-contract.md（路徑、送什麼、回什麼、錯誤格式）、docs/ui-guidelines.md（列表、表單、金額與狀態怎麼顯示）。每一份最後列出「我替你做了哪些決定」，那幾條我要逐條回你可以或不可以。quote-brief.md 沒寫到的不要自己定，標 TODO 問我。這一步還是不要寫程式。',
    watch: '它一條決定都列不出來，代表它在照抄 quote-brief.md 而不是推導。叫它重列，問它「哪些欄位是 quote-brief.md 沒講的」。',
  },
  {
    title: '建立資料、API 與畫面骨架',
    prompt:
      '照 data-model.md 建立裡面列的那幾個資料結構，照 api-contract.md 實作 GET /api/customers 與 POST /api/quotes，並建立報價列表與編輯頁的畫面骨架。金額一律用整數分儲存。先用假資料，這一步不要接真的資料庫。動手之前先把計畫列給我看，我說可以再開始。',
    watch: '金額用小數會在加總時差幾分錢，事後很難回頭改，所以要在這一步就講明。',
  },
];

export default function SlideQuoteSystemPrompts() {
  return (
    <SlideLayout title="五個指令的前三步：需求、技術文件、骨架" subtitle="Step by Step 1–3" icon={TerminalSquare}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-4">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 px-6 py-4">
          <p className="text-slate-300 text-base leading-relaxed">
            中型專案要分段下指令。每一步都讓 Agent 先產出可檢查的規格檔、畫面骨架或資料結構，再往下一步。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            <strong className="text-slate-200">前兩步你只做兩件事：把你知道的講出來，然後核可它推導的東西。</strong>
            資料表怎麼切、API 怎麼定，不用你寫。這一頁是前三步，下一頁是後兩步。
          </p>
        </AnimatedBlock>

        <div className="space-y-3">
          {STEPS.map((step, index) => (
            <AnimatedBlock key={step.title} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 md:items-center">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-slate-800 font-mono text-sm font-bold text-sky-400">
                    {index + 1}
                  </span>
                  <h3 className="text-slate-100 text-base font-bold">{step.title}</h3>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight aria-hidden="true" size={16} className="hidden md:block text-slate-700 shrink-0 mt-1" />
                  <div className="min-w-0">
                    {step.setup && (
                      <p className="mb-2 text-slate-300 text-xs leading-relaxed">※ {step.setup}</p>
                    )}
                    <p className="font-mono text-xs md:text-sm leading-relaxed text-slate-400 break-words">{step.prompt}</p>
                    <p className="mt-2 flex items-start gap-2 text-amber-200/70 text-xs leading-relaxed">
                      <AlertTriangle aria-hidden="true" size={13} className="text-amber-500 shrink-0 mt-0.5" />
                      {step.watch}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedBlock>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
