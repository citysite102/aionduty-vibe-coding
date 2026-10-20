import type React from 'react';
import {
  Telescope,
  Gauge,
  Workflow,
  ClipboardCheck,
  Layers,
  PackageOpen,
  FileStack,
  Bot,
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { BrandLogo, brandColor, type Brand } from '../components/BrandLogos';
import { SourceFoot, SRC } from './_Source';

/**
 * 這一疊的收尾。2026-10-19 新增。
 *
 * **它要解掉的是一個情緒問題，但解法不是安撫。** 一年份的更新攤開來看，
 * 學員的第一反應通常是「跟不上」。D-2 禁止進度安撫（「別擔心，前面都講過了」那一類），
 * 所以這一頁不寫「不用焦慮」，而是把焦慮的來源拆掉：換得最勤的是名字，
 * 而名字底下的分層沒有動。三張卡都拿這一疊前面的日期當證據，不是感想。
 *
 * **2026-10-20 三張卡換成「這些更新對學員代表什麼」，原本那三條沒有丟掉：**
 *   原本是「名字換得比做法快」「一家先做另外兩家會跟上」「真正要改操作習慣的只有兩件」，
 *   講的是這一年的觀察；現在的三張講的是學員要跟著改什麼，後者才接得上這一疊的用途。
 *   「名字換得比做法快」搬到底下那個框（「模型改名不用追」本來就在那裡），
 *   「一家先做另外兩家跟上」變成第一與第三張卡的證據列，所以三條都還在畫面上。
 *
 * **第三張卡是推測，畫面上要標出來（D-2「未來預測寫成事實」）。** 一年份的資料撐得起
 * 「三家往同一個方向走」這種描述，撐不起「接下來誰會贏」。那張卡的欄底結論
 * 自己說了它是從前面那些日期推出來的判斷，不是官方說法，**不要把那半句刪掉**。
 *
 * **每一條都要能從前面那張時間軸上指出證據。** 想加第四條之前先回去翻表，
 * 指不出來就表示那是推測，不要寫進來（D-2 的「證明不了的斷言」）。
 * 一年份的資料也撐不起「趨勢」「定律」這種詞，所以標題寫的是「看得出來的三件事」。
 *
 * 最後查證：2026-10-19。這一頁沒有新的外部事實，數字與日期都來自同一疊的
 * `_timeline.ts`，改那份資料的時候要回來確認這三條還成立。
 * 跨家的間隔是從表上算的：
 *   存起來的指示  Claude 2025-10-16 → Gemini 2026-09-30，約 11 個月
 *   入口合併 ChatGPT 2026-07-09 → Claude 2026-09-16 → Gemini 2026-10-13，約 3 個月
 *   替你操作 Claude 2026-03-23、Gemini 2026-06-24、ChatGPT 的 Computer Use 在
 *            learn.chatgpt.com 2026-04-13 那一週，三家都落在 2026 上半年
 */
/**
 * 一行證據掛什麼記號，要看那一行在講誰。
 * 講「某一家做了什麼」掛品牌 Logo，講「哪一類的改動」掛類別 icon
 * （跟時間軸那一頁同一組）。混用會讓讀者以為那件事只有那一家做。
 */
type Proof = { brand: Brand; text: string } | { icon: React.ElementType; text: string };

const POINTS: {
  icon: React.ElementType;
  title: string;
  proofs: Proof[];
  soWhat: string;
}[] = [
  {
    icon: Workflow,
    title: '從回答問題，到做完一整段工作',
    proofs: [
      { icon: Layers, text: '入口併在一起：ChatGPT 2026-07、Claude 2026-09、Gemini 2026-10' },
      { icon: FileStack, text: '回答變成改得動的檔案與點得下去的面板' },
      { icon: Bot, text: '替你操作電腦：三家都落在 2026 上半年' },
    ],
    soWhat: '它拿得到脈絡、用得到工具，自己執行完再交出一份成果，不是只回你一段文字。',
  },
  {
    icon: ClipboardCheck,
    title: '交辦一段工作：給脈絡、設目標、驗收',
    proofs: [
      { icon: PackageOpen, text: '給脈絡：專案規則與做法寫成檔案存著，三家吃同一種 SKILL.md' },
      { icon: Gauge, text: '設目標：講清楚完成條件，再挑一層撐得住的模型' },
      { icon: Bot, text: '給權限、驗收它交回來的東西，不對就叫它改' },
    ],
    soWhat: '問一句話只要把問題講清楚；把一段工作交出去，上面這幾件事都得你自己給。',
  },
  {
    icon: Telescope,
    title: '接下來比的可能是整段流程（推測）',
    proofs: [
      { icon: PackageOpen, text: '三家的 Skill 是同一種檔案格式，換一家平台的成本比一年前低' },
      { icon: Layers, text: '入口三家都在收斂，剩下的差別在它連得到哪些服務' },
      { icon: Gauge, text: '模型的名字每隔幾週就換一次，而挑哪一層的方法沒變' },
    ],
    soWhat: '這一條是從前面那些日期推出來的判斷，不是官方說法：誰的模型最強會一直換人，一整段工作做不做得完比較難追上。',
  },
];

export default function SlideBonusOutlook() {
  return (
    <SlideLayout title="這些更新，對我們真正代表什麼？" subtitle="Outlook" icon={Telescope}>
      <div className="min-h-full max-w-6xl mx-auto flex flex-col gap-3">
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          一年份的更新攤在同一張表上，看起來像追不完。
          <strong className="text-slate-100">但三家改的是同一件事：AI 從回答問題的地方，變成你交辦得出去的地方</strong>。
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {POINTS.map((p, i) => (
            <AnimatedBlock
              key={p.title}
              stepIndex={i + 2}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="p-1.5 bg-slate-800 text-slate-400 rounded shrink-0">
                  <p.icon size={14} />
                </span>
                <h4 className="text-base font-bold text-slate-100 leading-snug">{p.title}</h4>
              </div>

              <ul className="space-y-1.5">
                {p.proofs.map((r) => (
                  <li key={r.text} className="flex items-start gap-2.5">
                    {'brand' in r ? (
                      <span
                        className="flex h-5 w-3.5 shrink-0 items-center justify-center"
                        style={{ color: brandColor(r.brand) }}
                      >
                        <BrandLogo brand={r.brand} size={13} />
                      </span>
                    ) : (
                      <span className="flex h-5 w-3.5 shrink-0 items-center justify-center">
                        <r.icon size={13} className="text-slate-600" aria-hidden="true" />
                      </span>
                    )}
                    <span className="text-sm text-slate-300 leading-snug">{r.text}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-800 pt-3 mt-auto">
                {p.soWhat}
              </p>
            </AnimatedBlock>
          ))}
        </div>

        <Callout tone="focus" label="接下來自己追的方法" stepIndex={5}>
          每一季打開三家的官方更新頁，看兩件事：
          <strong className="text-slate-100">開工的入口有沒有變、它交回來的東西有沒有變</strong>。
          模型改名不用追：那一欄的名字每隔幾週就會不一樣，而挑哪一層的方法一年沒有變過。
        </Callout>

        <SourceFoot links={[SRC.claudeNotes, SRC.openaiLearn, SRC.geminiNotes]} />
      </div>
    </SlideLayout>
  );
}
