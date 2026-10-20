import { Sparkles, Cpu, PanelsTopLeft, Bot } from 'lucide-react';
import { SlideLayout } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { SourceFoot, SRC } from './_Source';
import { YearGroups, type YearGroup } from './_YearGroups';

/**
 * ChatGPT 這一年。三組：模型、介面、商業模式。
 *
 * **2026-10-19 覆核過一次，這一頁從「整頁二手」升級成一半有官方依據。**
 * help.openai.com 與 openai.com 對自動抓取都回 403（兩次都試過），但另外兩個官方來源抓得到：
 *   learn.chatgpt.com/docs/whats-new   OpenAI 自己的更新清單，週為單位
 *     2026-07-06 那一週：Codex app 併進 ChatGPT 桌面版（macOS 與 Windows），原文
 *       「Codex keeps its dedicated coding experience alongside ChatGPT's Chat and Work」，全方案
 *     2026-08-31 那一週：GPT-6 Astra，開給 Pro 與符合資格的 Enterprise、Edu
 *     2026-09-21 那一週：GPT-6 Sol 與 Luna 開始推送
 *   deploymentsafety.openai.com/gpt-6-october
 *     原文「We're launching GPT-6 to everyone in ChatGPT, across free and paid plans globally」
 *
 * 覆核改掉的：GPT-6 Astra 原本寫 2026-09-03（維基百科），官方是 08-31 那一週；
 * 原本的「10-07 Instant 上付費、10-08 開到免費」兩條，官方只說 10 月全面換上，所以併成一條。
 * Intelligent UI 另外有官方的 help center 條目
 * （help.openai.com/en/articles/20001598-intelligent-ui-in-chatgpt，2026-10-19 補查到），
 * 細節寫在 `08_ChatGPT_UI.tsx` 的檔頭。那一頁直接開是 403，內文是從搜尋結果讀到的。
 * 廣告那一組 2026-10-19 補查到官方的 help.openai.com/en/articles/20001047-ads-in-chatgpt：
 *   「Ads may appear for users on the Free and Go plans. Plus, Pro, Business, Enterprise,
 *   and Edu accounts will not have ads.」**Go 是付費方案而且會有廣告**，
 *   原本畫面上寫「付費方案的回答裡沒有這一塊」是錯的，已改。
 *   廣告出現的位置官方寫的是 at the bottom of answers（回答下方），不是旁邊。
 *   測試自 2026-02-09 在美國開始。廣告後台那兩條（05-05、07-22）官方頁沒有，仍是新聞報導。
 *
 * **2026-10-20 第三欄從「商業模式：廣告」換成「代理」，廣告降級成頁尾的一行。**
 * 原本三欄是模型、介面、廣告，等於把一個收費方式跟兩個產品方向並排成同一個層級，
 * 而這一疊比較的是三家「工作方式」怎麼走，廣告在那個比較裡沒有對應的另外兩欄。
 * **廣告沒有刪掉**：這門課多數學員用的是免費方案，而免費與 Go 方案的回答下方
 * 從 2026-02-09 起會出現標示為贊助的內容，他要分得出來，所以它留在底下那個框的 footnote 裡。
 * 後台那兩條（05-05、07-22）本來就是新聞報導，跟著降級，完整清單在附錄。
 *
 * dots 原本掛在介面那一欄的最後一條，現在跟 Skills、Record & Replay、Codex 管多個代理
 * 排成一欄，因為那四條是同一件事的四步：指示存得下來 → 錄一次就變成指示 →
 * 一個視窗管多個代理 → 代理自己在背景跑一段時間。
 *
 * 一欄最多五個節點，所以模型欄砍掉 5.1、5.4、5.5、5.6 四個純版號，
 * 留下 5.2（分層的起點）、5.3-Codex（分出寫程式的版本）與 GPT-6 的三步。
 */
const GROUPS: YearGroup[] = [
  {
    icon: Cpu,
    title: '模型：一代底下分成四種',
    rows: [
      ['2025-12-11', 'GPT-5.2，分回得快、想得久、最強三種'],
      ['2026-02-05', 'GPT-5.3-Codex，專門給寫程式用的版本'],
      ['2026-08-31', 'GPT-6 Astra 先上 Pro 與 Enterprise'],
      ['2026-09-22', 'GPT-6 Sol 與 Luna 開始推送'],
      ['2026-10-07', 'GPT-6 換上 ChatGPT，免費與付費方案都有'],
    ],
    note: 'GPT-6 底下分 Astra、Sol、Luna、Instant 四種，差的是任務多深、要回得多快，不是名字變多。',
  },
  {
    icon: PanelsTopLeft,
    title: '入口：三個 App 併成一個視窗',
    rows: [
      ['2025-10-21', 'Atlas（ChatGPT 自己的瀏覽器）上線，只有 macOS'],
      ['2026-03-19', '內部備忘錄外流，宣布三個 App 要併成一個'],
      ['2026-07-09', '桌面版改版：Chat、Work、Codex（寫程式的入口）在同一個視窗，全方案含免費'],
      ['2026-08-09', 'Atlas 關站，瀏覽能力移進 ChatGPT 與 Codex'],
    ],
    note: '原本要分別打開三個程式才做得到的事，現在在同一個視窗裡換入口，其中一個產品直接收掉。',
  },
  {
    icon: Bot,
    title: '代理：dots 在背景做一段時間',
    rows: [
      ['2026-03-23', 'Skills（把做法存成檔案重複用）上線，跟 Claude 同一種檔案格式'],
      ['2026-06-15', 'Record & Replay：錄一次操作就產生一個 Skill（限 macOS）'],
      ['2026-07-09', 'Codex 可以同時管好幾個代理'],
      ['2026-09-29', 'DevDay 推出 dots（常駐代理），在 Slack 與 Teams 也叫得到'],
    ],
    note: 'dots 跟一般對話不同：你給它一個長期任務，它在雲端自己跑，隔幾天回來問進度它還記得。',
  },
];

export default function SlideBonusChatGptYear() {
  return (
    <SlideLayout title="ChatGPT 2026 年的變化" subtitle="ChatGPT 2025-10 → 2026-10" icon={Sparkles}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3">
        <Callout tone="focus" stepIndex={1}>
          <strong className="text-slate-100">原本分成三個 App 的功能，現在在同一個視窗裡</strong>，
          而其中一個已經關掉了。同一年它也開始讓代理在背景替你做一段時間的事。
        </Callout>

        <YearGroups groups={GROUPS} />

        <Callout
          tone="warn"
          label="哪幾條有官方依據"
          stepIndex={5}
          footnote={
            <>
              廣告：官方寫明
              <strong className="text-slate-100">免費與 Go 方案的回答下方會出現標示為贊助的內容</strong>
              （2026-02-09 美國先開），Plus 以上沒有。
            </>
          }
        >
          入口那一組與 GPT-6 的日期對得上官方的 learn.chatgpt.com 與部署安全頁；
          <strong className="text-slate-100">GPT-5.2 與 5.3 的日期仍然來自維基百科</strong>，因為官方公告頁擋自動抓取。
        </Callout>

        <SourceFoot
          links={[SRC.openaiLearn, SRC.openaiDots, SRC.openaiAds]}
          secondhand="GPT-5.2 與 5.3 的日期取自維基百科"
        />
      </div>
    </SlideLayout>
  );
}
