import { FlaskConical, ArrowRight } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元 8-5 第二頁。2026-11-09 新增，同日整頁重寫（講師）。
 *
 * ── 這一頁的立場（2026-11-09 第二版，不要改回去）────────────────
 * 第一版叫〈公司資料交給 AI 之前，先確認什麼〉，開場是「動手之前還有一題」，
 * 底下才是假資料。講師退掉，兩個理由：
 *   1. **聽起來像萬年老梗**（「資料安全很重要、要先問過公司」每堂課都講，聽完沒有動作）。
 *   2. **它變成在勸退**。整門課都在教怎麼用，這一頁卻像先擋一道。
 * 現在的立場是：**你今天就可以開工，而且不必等答案**。第一輪用假資料跑是更快的路，
 * 講法 2026-11-09 校過一次（講師）：**「欄位用一樣的設計，但不要用真實資料」**，
 * 不要寫成「欄位照真的留著」——「照真的」會被讀成照抄真實資料的內容。
 * 問的那一段同時進行；這一頁真正要給的是「怎麼問得到一個可以」。
 * **假資料那一塊要排在問句前面**，順序本身就是這一頁的主張。
 *
 * ── 三個檢查項目是刻意的 ──────────────────────────────
 * 欄位讀對了嗎／算出來對不對／缺資料的時候它怎麼辦。第三項最重要：那是學員最容易
 * 以為「它會自己處理」的地方，而且跟下一頁步驟 03 的報表例子、再下一頁的失敗三問同一條線。
 *
 * ── 問句做成填空是刻意的 ────────────────────────────
 * 多數人卡住不是不想問，是不知道要問什麼、問誰、怎麼開口。填空讓他把三件事講清楚：
 * 中間那個小標 2026-11-09 改過：原本是「要問到一個『可以』，先講得出這條線」，
 * 講師退掉（「要問到一個可以」是硬湊出來的說法）。現在寫「問之前，先把資料的去向講清楚」。
 *
 * ── 2026-11-09 第三版（講師最後一輪精修）──────────────────
 * 第二版的開場是「第一輪不用等任何人回覆就能開始」，讀起來像**所有專案的第一輪
 * 都得先用假資料**。現在改成條件句：正式資料還沒到手、要等權限，或裡面有客戶與
 * 個人資料的時候才適用；手上本來就有可用的測試資料就直接用。
 * 用詞統一成**模擬資料**（原本寫「假資料」），跟標題一致。
 * 另外補兩件原本沒講的：模擬資料要跟正式那一份同一套欄位與格式、而且要放代表性的
 * 異常（缺欄位、日期格式不一樣、金額是零或負數）；以及收尾要分清楚
 * **「流程站得住」與「可以上線」是兩件事**。
 *
 * 哪一份資料、去哪個平台、產出放哪裡。**不要寫成法律建議，也不要列法規**：
 * 公司規定、客戶合約與行業要求各自不同，這一頁要他去找那個答得了的人。
 *
 * 收尾那一句接下一頁：答案回來之後，可以用的欄位與平台要寫進規格文件。
 *
 * 用色：sky（三個檢查與去向）一種（A-1）。
 */

/** 第一輪要檢查的三件事。第三項是跟後面兩頁接起來的那一條。 */
const CHECKS = [
  { k: '欄位讀對了嗎', v: '它認得哪一欄是日期、哪一欄是金額嗎？' },
  { k: '算出來對不對', v: '合計跟你人工核對的答案一樣嗎？' },
  { k: '缺資料怎麼辦', v: '少一筆日期的時候，它會停下來問，還是自己補一個？' },
];

const FLOW = ['哪一份資料', '去哪個平台', '產出放哪裡'];

const ASK = [
  '我想用【哪個工具】做【哪一件工作】，已經用模擬資料跑過一輪流程。',
  '正式的那一份會用到【哪些欄位】，資料會送到【哪個平台】，產出存在【哪裡】、給【誰】看。',
  '請問這樣可以嗎？如果不行，哪些欄位要先去掉或換掉？',
  '這件事如果要別人決定，可以告訴我找誰嗎？',
].join('\n');

export default function SlideDataCheck() {
  return (
    <SlideLayout
      title="正式資料還沒到手，先用模擬資料驗證流程"
      subtitle="Validate With Mock Data"
      icon={FlaskConical}
    >
      <div className="max-w-6xl mx-auto w-full space-y-3.5 pb-4">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          正式資料還沒到手、要等權限，或是裡面有客戶與個人資料的時候，
          <strong className="text-slate-100">先用模擬資料把流程驗一輪</strong>：
          欄位用一樣的設計，值自己編。正式資料能不能用，同一時間去問。
          <span className="mt-1 block text-sm text-slate-500">
            手上本來就有一份可以用的測試資料，那就直接用那一份，這一段跳過。
          </span>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-3.5">
          <h3 className="text-base font-bold text-slate-100">模擬資料跑得出這三件事，流程就算站得住</h3>
          <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1.5 md:grid-cols-3">
            {CHECKS.map((c) => (
              <div key={c.k} className="min-w-0">
                <div className="text-sm font-bold text-sky-400">{c.k}</div>
                <p className="text-sm leading-relaxed text-slate-400">{c.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            模擬資料要跟正式那一份同一套欄位與格式，而且要放幾筆真的會遇到的狀況：
            缺欄位、日期格式不一樣、金額是零或負數。
            <strong className="text-slate-400">每一筆都正常的資料驗不出什麼</strong>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <h3 className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-base font-bold text-slate-100">
            問之前，先把資料的去向講清楚
            <span className="flex items-center gap-1.5 font-normal text-sm text-sky-400">
              {FLOW.map((f, i) => (
                <span key={f} className="flex items-center gap-1.5">
                  {i > 0 && <ArrowRight aria-hidden="true" size={13} className="text-slate-600" />}
                  {f}
                </span>
              ))}
            </span>
          </h3>
          <CopyBlock
            label="問句"
            note="問你的主管、資訊單位，或是簽約的那個窗口"
            text={ASK}
          />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} as="p" className="text-sm leading-relaxed text-slate-500">
          回覆通常不是「可以」或「不行」兩種，多半是「哪些欄位可以、要用哪個帳號、存在哪裡」。
          那幾條回來之後寫進規格文件，下一輪照著跑。
          <span className="mt-1 block">
            <strong className="text-slate-400">模擬資料跑得過，代表流程站得住，不代表可以上線</strong>：
            正式資料的欄位、量體與權限都要再驗一次。
          </span>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
