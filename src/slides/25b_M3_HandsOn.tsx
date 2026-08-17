import { Wrench, UserPlus, Play, Search } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyBlock } from '../components/CopyBlock';
import { LiveDemo } from '../components/LiveDemo';
import { Callout } from '../components/Callout';

/**
 * 這一頁標題寫「動手做」，但原本沒有 LiveDemo，也沒有「叫它出場」與「怎麼看它有沒有用」
 * 這兩步，所以整個 M3 十幾頁下來學員手上不會多出任何東西。
 *
 * 現在是三步：建檔、叫它、看它退回什麼。第三步是重點，因為子代理最常見的失敗
 * 不是不出場，是出場了只說「看起來可以」。那個對照要用學員自己的計時器看得出來，
 * 所以檢查標準挑「倒數分鐘數有沒有寫死」，那是 M2 的 CLAUDE.md 已經寫過的規則。
 *
 * 第二個案例（quote-reviewer）拿掉了，同一件事 25_M3_Quality 與報價系統那一段都講過。
 */
const FRONTMATTER = `---
name: code-reviewer
description: 專門負責挑錯的資深工程師
---
檢查我改完的檔案。倒數的分鐘數不准寫死在程式裡，CLAUDE.md 要求集中成設定。
逐條回覆，每條寫「通過」或「不通過」，不通過要指出檔案與第幾行。
有一條不通過就整份退回，不要自己動手改。`;

const STEPS = [
  {
    icon: UserPlus,
    label: 'STEP 1',
    title: '建一個只負責挑錯的角色',
    body: (
      <>
        在對話框說「幫我建一個 code-reviewer 子代理，內容照下面這段」，
        或是打 <code className="font-mono text-orange-300">/agents</code> 讓它帶你建。
        檔案會放在 <code className="font-mono text-slate-200">.claude/agents/code-reviewer.md</code>。
      </>
    ),
  },
  {
    icon: Play,
    label: 'STEP 2',
    title: '叫它出場',
    body: (
      <>
        它不會自己監聽，你要點名：
        <span className="mt-2 block rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-slate-200">
          「請 code-reviewer 檢查 index.html。」
        </span>
      </>
    ),
  },
  {
    icon: Search,
    label: 'STEP 3',
    title: '看它退回什麼',
    body: (
      <>
        這一步才是驗收。它應該指得出<strong className="text-slate-100">哪個檔案第幾行</strong>，
        而不是給你一段感想。指不出來就是它沒真的讀，把標準再寫死一點再叫一次。
      </>
    ),
  },
];

export default function SlideM3HandsOn() {
  return (
    <SlideLayout title="動手做一個審查子代理" subtitle="Hands-on Reviewer" icon={Wrench}>
      <LiveDemo kind="claude" note="跟著建一個，然後叫它檢查你的計時器" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedBlock
                key={s.label}
                stepIndex={i + 1}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon aria-hidden="true" size={17} className="text-slate-400 shrink-0" />
                  <span className="font-mono text-xs uppercase tracking-widest text-slate-400">{s.label}</span>
                  <span className="text-slate-100 text-base font-bold">{s.title}</span>
                </div>
                <div className="text-slate-400 text-sm leading-relaxed">{s.body}</div>

                {i === 0 && (
                  <>
                    {/* 這一段學員要一字不差地打進檔案（前後各一行 --- 缺一不可），
                        所以跟 Prompt 一樣掛上點一下複製 */}
                    <CopyBlock
                      label="子代理設定"
                      text={FRONTMATTER}
                      size="xs"
                      className="mt-3"
                    />
                    <p className="text-slate-500 text-sm leading-relaxed mt-2">
                      前後各一行 <code className="font-mono text-slate-400">---</code> 缺一不可，
                      Claude Code 靠中間那段認出它是子代理。
                    </p>
                  </>
                )}
              </AnimatedBlock>
            );
          })}
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-base font-bold text-slate-100 mb-4 pb-2 border-b border-slate-800">
              它退回來的那段話，長這兩種
            </h3>

            <div className="space-y-3">
              <div className="rounded-xl border px-4 py-3 bg-rose-500/5 border-rose-500/25">
                <div className="text-rose-300 text-sm font-bold mb-1.5">這樣就是沒在審</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  「整體結構清楚，沒有明顯問題，可以了。」
                </p>
              </div>

              <div className="rounded-xl border px-4 py-3 bg-emerald-500/5 border-emerald-500/25 shadow-[0_0_32px_-12px_rgba(16,185,129,0.45)]">
                <div className="text-emerald-300 text-sm font-bold mb-1.5">這樣才是審過了</div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  「不通過。index.html 第 42 行寫死 25，CLAUDE.md 要求集中成設定。退回。」
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mt-4 pt-3 border-t border-slate-800">
              差別不在它多聰明，在你有沒有給它一條「不通過就退回」的線。
              沒有那條線，它預設會找一個說得過去的說法讓你通過。
            </p>
          </AnimatedBlock>

          <Callout tone="muted" label="要它每次都出場" stepIndex={5}>
            子代理自己不會監聽事件。三種叫得動它的方式：對話裡直接點名；
            把 description 寫清楚讓主 Agent 自己判斷要不要派它；
            或在 <code className="font-mono text-orange-300">CLAUDE.md</code> 寫一條「每次改完 index.html，先請 code-reviewer 檢查再回報」。
            <span className="mt-2 block text-slate-400">
              要「一定會跑」而不是「通常會跑」，就得用前面講過的 Hook，
              那是在執行層攔下來，不是靠它記得。
            </span>
          </Callout>

          <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              換成你的工作也是同一個檔案，只有角色與標準要改：
              業務可以建 <strong className="text-slate-200">quote-reviewer</strong> 檢查報價缺哪個欄位，
              行銷可以建 <strong className="text-slate-200">brand-reviewer</strong> 檢查用字。
              退回條件寫得出來，這個角色就成立。
            </p>
          </AnimatedBlock>
        </div>

      </div>
    </SlideLayout>
  );
}
