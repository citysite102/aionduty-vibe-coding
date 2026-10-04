import { Users, Presentation, GraduationCap, ClipboardCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import { CopyBlock } from '../components/CopyBlock';

/**
 * 接在「動手做一個審查子代理」後面：同一件事放大成三個角色。
 *
 * 每張卡真正的重點是 ban 那一行，不是 job。三個角色的失敗模式都一樣，
 * 就是「幫忙把洞圓過去」，所以反向規則才是這個設計會不會有用的關鍵。
 * 這一頁如果只講「我開了三個 Agent」，就跟前一頁重複了。
 *
 * 下一頁（25d_M3_ProductTeam）是同一個做法換一組看得到程式碼的角色，而且每個角色各綁一份規範。
 * 這一頁刻意不提那幾份規範，它們是下一頁的主角。兩頁一起搬（B-4）。
 *
 * 2026-10-04（講師）：三張角色卡只有文字描述，學員看不出「所以我到底要寫什麼進檔案」。
 * 右欄補了學生那一份的完整設定（`STUDENT_AGENT`），挑學生是因為它的「不准」最難寫、也最能看出設計。
 * **那一份要跟左欄學生卡的 `job` 與 `ban` 對得起來，改一邊要改另一邊。**
 * 另外兩個角色刻意不印，三份排在一起會看成要背的範本，而這一頁要學員看的是骨架。
 */

const STUDENT_AGENT = `---
name: student
description: 沒有工程背景的職場學員，逐頁回報自己聽懂多少
tools: Read
---
你是一位沒有工程背景的職場工作者，來上這門課。
逐頁讀過去，每一頁寫下你聽懂多少。

## 不准假裝聽懂
複述不出來就直接寫「我從哪一句開始斷線」，並把那一句抄下來。

## 不准去查資料
你只能用這份簡報給你的東西。查到的背景知識會讓你看不出這一頁缺什麼。

## 怎麼回報
每一頁三行：我以為它在講什麼、我卡在哪一句、我現在會不會動手做。`;
const ROLES = [
  {
    icon: Presentation,
    name: '講師',
    job: '只拿著簡報，把每一頁講成逐字稿。',
    ban: '簡報沒寫的鋪陳不准自己補，缺什麼就標記出來繼續講。',
  },
  {
    icon: GraduationCap,
    name: '學生',
    job: '設定成沒有工程背景的職場工作者，逐頁說自己聽懂多少。',
    ban: '不准假裝聽懂。複述不出來就要寫「我從哪一句開始斷線」。',
  },
  {
    icon: ClipboardCheck,
    name: '觀察員',
    job: '只讀前兩份產出，診斷卡在哪、建議怎麼改。',
    ban: '只能根據前兩份的實際文字下判斷，沒有證據的問題不准寫。',
  },
];

export default function SlideTeachingSim() {
  return (
    <SlideLayout title="用講師、學生、觀察員跑一次教學模擬" subtitle="A Real Case" icon={Users}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              這份簡報改版前跑過一次模擬授課。三個角色都是你前面做的那種子代理，
              指揮者是你：<strong className="text-slate-100">你決定誰先跑、把誰的產出交給誰</strong>。
            </p>
          </AnimatedBlock>

          {ROLES.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedBlock
                key={r.name}
                stepIndex={i + 2}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
              >
                <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400">
                    <Icon size={17} />
                  </span>
                  {r.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-2.5">{r.job}</p>
                <p className="text-slate-300 text-sm leading-relaxed border-t border-slate-800 pt-2.5">
                  <strong className="text-sky-300">不准：</strong>
                  {r.ban}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={5} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-base font-bold text-slate-100 mb-3">學生那一份的檔案長這樣</h3>
            <CopyBlock label="子代理設定" text={STUDENT_AGENT} size="xs" />
            <p className="text-slate-400 text-sm leading-relaxed mt-3">
              跟你剛才那個 code-reviewer 是同一個骨架：
              <code className="font-mono text-slate-300">tools</code> 只給讀取、
              小標寫「不准」什麼、最後寫怎麼回報。
              另外兩個角色換掉內容就好。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">跑出來的其中一條</div>

            <div className="space-y-3">
              <div className="rounded-lg bg-slate-950 border border-slate-800 px-4 py-3">
                <div className="text-xs font-bold text-slate-500 mb-1.5">學生說</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  「概念上我沒卡，我卡在我打不開它。今天你給了我全黑畫面，沒給我步驟。」
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 border border-slate-800 px-4 py-3">
                <div className="text-xs font-bold text-slate-500 mb-1.5">觀察員說</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  兩種背景差很多的學員，在這一頁都完全卡住，而且卡的理由一模一樣。
                </p>
              </div>

              <div className="rounded-lg bg-slate-950 border border-slate-800 px-4 py-3">
                <div className="text-xs font-bold text-slate-500 mb-1.5">回去查證</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  整份簡報從頭到尾沒有一句在講怎麼打開終端機，
                  而後面有三頁都要學員在終端機裡動手。
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mt-3.5 pt-3 border-t border-slate-800">
              這個洞自己看是看不出來的，因為寫簡報的人早就會開終端機了。
            </p>
          </AnimatedBlock>

          <Callout tone="warn" label="但產出要驗過才能用" stepIndex={7}>
            這次三個角色各出過一次錯：講師編了一句簡報上沒有的保證，
            學生說某頁「沒有下載連結」但其實有，觀察員第一段的結論下得太早。
            <strong className="text-slate-100">所以每一條指到具體位置的說法，都要回原檔查過才算數。</strong>
            <span className="block mt-3 text-slate-400">
              換成你的工作也是同一組：作者、讀者、觀察員。提案、教材、說明文件都跑得起來，
              只有「讀者」那一個要設定成你真正的對象。
            </span>
          </Callout>
        </div>

      </div>
    </SlideLayout>
  );
}
