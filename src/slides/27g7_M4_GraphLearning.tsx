import { Archive, ArrowRight, Plus } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元 7-4 第八頁，也是最後一頁。2026-11 新增，影片裡還沒有這一段。
 * 出處與不引用的理由寫在 `27g_M4_GraphLayer` 檔頭（C-1／C-2）。
 *
 * ── 這一頁的職務 ────────────────────────────────────────────
 * 上一頁講學習路徑是什麼、走一次長什麼樣，這一頁講它可以落在哪，
 * 以及最有價值的那一種落點：改掉流程本身，而不只是改規則。
 *
 * ⚠ 三件不要刪的：
 *   1. **落點前四種全部是學員已經有的東西**（手冊、Skill、測試、記錄下來的經驗）。
 *      不要新增第五種「知識庫」之外的名目，也不要把同一條規則同時放兩個地方，
 *      那會跟 Slide 100、106 打架（B-6）。
 *   2. **「Claude Code 沒有原生這一套」那一塊**。學員很容易以為學習路徑是某個可以裝的功能，
 *      然後去找指令。它是工作圖的設計概念，要自己用手冊、Skill、Hook、測試拼出來。
 *      這一條也是 C-2：不要把概念講成產品功能。
 *   3. **五個步驟裡的第三步（先驗證再寫進去）**。少了它就是自動把偶發狀況寫成永久規則。
 *
 * 用色：流程那一段新加的閘門 sky，其餘灰階；`CLAUDE.md`／`Skill` 的 orange 標身分不佔額度。
 * 但書用 muted 不用 warn，amber 在這門課是風險提示（A-1）。
 */

const PLACES = [
  { where: 'CLAUDE.md', mono: true, use: '讓之後每一輪都讀得到', fit: '這個專案的開發慣例' },
  { where: 'Skill', mono: true, use: '讓某一類工作照同一套流程走', fit: '做畫面、做字幕、審程式碼' },
  { where: '自動化測試', use: '把出過的問題變成每次都會跑的檢查', fit: '邊界狀況、修好之後不要再壞' },
  { where: '記下來的經驗', use: '留著給人看，不一定要機器讀', fit: '常踩的坑、當初為什麼這樣決定' },
  { where: 'Graph 本身', use: '改掉之後每一輪的走法都不一樣', fit: '多加一個閘門、調依賴、改重試次數', key: true },
];

const STEPS = [
  { n: '收', body: '把失敗原因、測試結果、怎麼修好的收在一起' },
  { n: '萃', body: '看看裡面有沒有下次還會遇到的東西' },
  { n: '驗', body: '確認它真的成立，而且不只適用這一次', key: true },
  { n: '寫', body: '寫進手冊、測試、Skill 或 Graph' },
  { n: '用', body: '下次真的套上去，再看有沒有變好' },
];

export default function SlideGraphLearning() {
  return (
    <SlideLayout
      title="經驗的五個落點，最後一個是流程本身"
      subtitle="Where the Lesson Lands"
      icon={Archive}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        {/* 落點 */}
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <div className="overflow-x-auto">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[8.5rem_1.4fr_1.3fr] gap-4 pb-2 border-b border-slate-800 font-mono text-xs text-slate-500">
                <span>寫到哪</span>
                <span>它在那裡做什麼</span>
                <span>適合放什麼</span>
              </div>
              {PLACES.map((p) => (
                <div
                  key={p.where}
                  className="grid grid-cols-[8.5rem_1.4fr_1.3fr] gap-4 py-2.5 border-b border-slate-800/70 last:border-0 items-baseline"
                >
                  <span className={`text-base font-bold ${p.key ? 'text-sky-300' : 'text-slate-100'} ${p.mono ? 'font-mono text-orange-300' : ''}`}>
                    {p.where}
                  </span>
                  <span className="text-slate-300 text-sm leading-relaxed">{p.use}</span>
                  <span className="text-slate-400 text-sm leading-relaxed">{p.fit}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedBlock>

        {/* 最後一種：改流程本身 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-6 py-4">
          <h3 className="text-sky-300 text-base font-bold mb-2">在流程裡多插一個節點</h3>
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            假設你發現做畫面的那幾輪，十次有六次卡在最後的整合測試，而且原因都是手機版。
            與其每次寫一條規則提醒它，不如讓流程自己擋。
          </p>

          <div className="space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500 w-14 shrink-0">原本</span>
              {['做畫面', '整合測試', '交付'].map((s, i, arr) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-1.5 text-slate-200 text-sm">{s}</div>
                  {i < arr.length - 1 && <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs uppercase tracking-widest text-sky-400 w-14 shrink-0">改成</span>
              <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-1.5 text-slate-200 text-sm">做畫面</div>
              <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />
              <div className="rounded-lg border border-sky-500/40 bg-sky-500/10 px-4 py-1.5 text-sky-200 text-sm flex items-center gap-1.5">
                <Plus aria-hidden="true" size={13} className="shrink-0" />
                手機上點一次
              </div>
              <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />
              <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-1.5 text-slate-200 text-sm">整合測試</div>
              <ArrowRight aria-hidden="true" size={14} className="text-slate-600" />
              <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-1.5 text-slate-200 text-sm">交付</div>
            </div>
          </div>

          <p className="text-slate-400 text-base leading-relaxed mt-4">
            之後每一輪做畫面的工作都會先過這一關，不會再等到最後才發現。
            <strong className="text-slate-200">改掉的是這一類工作的走法。</strong>
          </p>
        </AnimatedBlock>

        {/* 五個步驟 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <h3 className="text-slate-100 text-base font-bold mb-3">一條經驗從出錯走到下次用上，中間五步</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className={`rounded-xl border px-4 py-3 ${s.key ? 'border-sky-500/30 bg-sky-500/5' : 'border-slate-800 bg-slate-950'}`}
              >
                <div className={`text-base font-bold mb-1.5 ${s.key ? 'text-sky-300' : 'text-slate-100'}`}>{s.n}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-3">
            中間那一步最容易被跳過。跳過它，偶然發生過一次的事就會變成永久規則，
            手冊越長越肥，而且開始自己跟自己打架。
          </p>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={4}>
          <strong className="text-slate-300">Claude Code 沒有一個指令叫做這個。</strong>
          這一整套是 Graph 的設計，沒有對應的指令，也沒有要裝的東西。它給你的是材料：
          <code className="font-mono text-orange-300">CLAUDE.md</code>、
          <code className="font-mono text-orange-300">Skill</code>、Hook、測試，還有你自己寫的那段流程。
          從「每次做完問一句為什麼會錯，然後手動加一條規則」開始就成立。
          <span className="block mt-2">
            <strong className="text-slate-300">人不只站在最後一步。</strong>
            規格一開始就寫錯的話，每個節點都會通過測試，交出來的東西照樣不是你要的。
            所以至少留兩個要你點頭的地方：一開始的目標與驗收條件，以及高風險的東西交出去之前。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
