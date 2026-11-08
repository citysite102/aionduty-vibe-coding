import { Target } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 單元 8-5 第一頁，也是整門課的畢業題。
 *
 * ── 2026-11-09 重構（講師給了逐塊的規格）──────────────────────
 * 這一頁只做一件事：**幫學員挑出自己的畢業題目。** 下一頁才是第一次實作。
 *
 * 2026-11-08 那一版的四張流程圖（fan-in、迴圈、例外分支、人審）整組拿掉了，
 * 連同四個 Agent 類型標籤與每格的驗收／恢復／重用三行。**不要加回來**，三個理由：
 *   1. 那四張圖在展示四種 Agent 類型，而這一頁要學員比較的是**工作性質**，
 *      也就是「哪一件值得交出去」。看完四種類型他還是不知道自己該挑哪一件。
 *   2. 驗收、恢復、重用在這一頁與下一頁各列一次，是重複。
 *   3. 箭頭與格子多，密度高，而這一頁的產出只是一個題目。
 *
 * 四個案例現在固定三欄：**原本的工作問題／Agent 適合負責的部分／人要保留的判斷**。
 * 第三欄是這一頁真正的教學點，**不要刪**：它擋的是「所有工作都該交給 Agent」這個誤解。
 *
 * ── Prompt 改成分兩輪交辦（講師指定）────────────────────────
 * 舊版直接要 Agent 一次交出五階段的設計。問題是學員連「這件事適不適合」都還沒確認，
 * 拿到的設計只能照單全收。現在第一輪只問四件事：拆步驟、判斷該用哪一種做法、
 * 找出資料與權限與驗收與風險、建議最小的試行範圍，而且明寫**先不要執行、不要安裝工具**。
 * 確認之後才進到六階段的流程設計（那是下一頁的事）。
 * A-4：複製鈕吃的字串單獨讀一遍要自己說得通，所以第一行就寫清楚要它做什麼、不要做什麼。
 *
 * ⚠ 「不用你寫程式」那一句是 2026-11-08 補的（講師問：這種會需要讓 AI 寫程式嗎），
 * 這一頁的讀者有一半不寫程式。**不要刪掉。**
 *
 * 挑題目的唯一標準是「真的會再發生一次」，理由寫在最後一行：只做一次的事，
 * 把它系統化的成本收不回來。**不要改成「挑你最想做的」**，那會讓學員選到一次性的作品。
 *
 * 用色：只有 sky 一種（A-1）。**不要給四個案例各一個顏色**（要分組用圖形不要用顏色）。
 */

const CASES = [
  {
    title: '每週的主題情報整理',
    pain: '要固定追同一批主題，資料散在各處，每週都重做一次，而且怕漏掉。',
    agent: '固定去同幾個來源收資料、去掉重複的、照同一個格式整理成一份。',
    human: '哪幾條值得放進來、來源可不可信、最後的結論怎麼下。',
  },
  {
    title: '網站的品質檢查',
    pain: '改完一個地方，不確定有沒有弄壞別的，每次都要自己點一遍。',
    agent: '照規格把檢查跑一遍，列出哪幾條沒過、是在哪個檔案。',
    human: '要不要照它說的改，以及重要的變更要不要上線。',
  },
  {
    title: '每個月的營運報表',
    pain: '每個月彙整同一批資料，步驟固定但很花時間，錯一個欄位整份就錯。',
    agent: '讀檔案、核對格式與筆數、跟上個月比、產出同一種報表。',
    human: '資料本身有問題的時候怎麼處理，以及數字背後要怎麼解讀。',
  },
  {
    title: '一直在更新的知識庫',
    pain: '文件散在各處、版本對不起來，新的進來不知道跟舊的哪裡衝突。',
    agent: '比對新舊文件，標出重複、衝突與過期的段落，產出更新草稿。',
    human: '兩份打架的時候哪一份算數，以及什麼可以併進正式版。',
  },
];

const PROMPT = [
  '我想把一件工作交給 Agent。先不要動手，也不要安裝任何工具。',
  '',
  '這件工作是：（一句話寫清楚）',
  '我要的產出是：（做完我手上會拿到什麼）',
  '目前最花時間、或最容易出錯的一步是：（哪一步）',
  '',
  '請先回答這四件事：',
  '1. 把這件工作拆成步驟，標出哪幾步是固定的、哪幾步需要人判斷。',
  '2. 這件事比較適合哪一種：傳統自動化、AI 助手、Workflow，還是 Agent？說明你的理由。',
  '3. 會用到哪些資料、需要哪些權限、每一步怎麼驗收、有哪些風險。',
  '4. 如果只先試一小塊，你建議從哪裡開始？',
  '',
  '用清單回答，先不要寫程式。我確認過這份再一起把流程設計出來。',
].join('\n');

export default function SlidePickTopic() {
  return (
    <SlideLayout title="從自己的工作中，找出值得交給 Agent 的事" subtitle="Your Graduation Task" icon={Target}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          從真實、而且會反覆發生的工作開始。
          <strong className="text-slate-100">先確認它值得自動化，再設計怎麼交辦、怎麼驗收、例外怎麼處理。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {CASES.map((c, i) => (
            <AnimatedBlock
              key={c.title}
              stepIndex={i + 2}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
            >
              <h3 className="text-base font-bold text-slate-100">{c.title}</h3>
              <dl className="mt-2 space-y-1.5 text-sm leading-relaxed">
                {[
                  ['現在的問題', c.pain, 'text-slate-400'],
                  ['適合交給它', c.agent, 'text-slate-300'],
                  ['你要留著的判斷', c.human, 'text-sky-200/90'],
                ].map(([k, v, tone]) => (
                  <div key={k as string} className="flex gap-2.5">
                    <dt className="w-24 shrink-0 text-xs text-slate-600">{k}</dt>
                    <dd className={`min-w-0 ${tone}`}>{v}</dd>
                  </div>
                ))}
              </dl>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6}>
          <CopyBlock
            label="挑好之後，第一句話貼這個"
            note="第一輪只要它分析，不要它動手"
            text={PROMPT}
            size="xs"
          />
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            <strong className="text-slate-200">挑一件你工作裡真的會再發生一次的事。</strong>
            只做一次的事，排流程花的時間比省下來的多。四種也不用都做，而且都不用你自己寫程式：
            要它每週穩定重跑的時候，它會自己寫一支小腳本，你負責的是驗收那一行。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
