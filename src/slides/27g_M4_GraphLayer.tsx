import { Workflow, ArrowRight, CornerDownLeft, RefreshCw, Network } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 單元 7-4「理解 Graph Engineering」的第一頁，整個單元九頁都是 2026-11 新增。
 *
 * **這一支還沒錄，所以九頁都不掛 `updated` 的日期記號**（2026-11-04 講師決定）。
 * A-5 那個記號的用途是告訴學員「這一頁比你手上的影片新」，而這一整支根本沒有影片，
 * 每頁都掛等於每頁都有一個沒有意義的徽章。錄完之後畫面與影片本來就會對上。
 * **錄完之前不要補掛，錄完之後也不用。**
 *
 * ── 出處（C-1／C-2）────────────────────────────────────────────
 * 這四頁的概念來自一篇講 Loop 與 Graph 分層的文章，但**那個出處不能寫進畫面，
 * 也不要在口白裡提**：同一個帳號用同一套內容掛過 Google、Andrew Ng、Karpathy
 * 與「Anthropic 工程師」四種名字，文末導流到自己的付費課與 Telegram。
 * 概念本身站得住，掛名一個都站不住，所以這四頁只講機制，不引用任何人。
 * 最後查證：2026-11-04。
 *
 * 要對照第一手說法的話，去讀 Claude Code 的 Workflow 工具文件：
 * 它的 `pipeline()` 與 `parallel()` 差的正是這一頁在講的「要不要等」，
 * 而 `24b_M3_Workflows` 已經教過怎麼叫它出來。**改這一頁先看那一頁還說了什麼（B-5）。**
 *
 * ── 這一頁的職務 ────────────────────────────────────────────
 * 只負責把兩層切開：迴圈在一個節點裡面，Graph在節點之間。
 * 什麼時候才需要它在第二、三頁，驗收條件與依賴在第四頁，四種節點與退回單在第五頁，
 * 全景圖與兩條回饋路徑在第六頁。**不要在這裡先演一次拆解或退回。**
 *
 * 用色：Loop 那一塊 sky、Graph 那一塊 indigo，成對算一種（A-1）；
 * 「完成」與「整合與驗收」用 emerald，那是第二種。
 * **退回那條虛線不要染 amber**，amber 在這門課是風險提示，失敗重跑不是風險，
 * 而且染了就變三種色。
 */

/** 一個節點裡面那一圈。最後一格是終點，所以單獨標色。 */
const LOOP_STEPS = ['執行', '測試', '修正'];

const COMPARE = [
  {
    layer: 'Loop',
    scope: '一個節點裡面',
    question: '商品加入購物車這個功能，測試過了沒有？沒過的話它自己改得回來嗎？',
    tone: 'sky' as const,
  },
  {
    layer: 'Graph',
    scope: '節點與節點之間',
    question: '商品列表、會員登入、購物車，哪幾塊可以同時做？哪一塊非等共用的 API 做完不可？最後怎麼接起來、誰說可以交？',
    tone: 'indigo' as const,
  },
];

const TONE_CLASS = {
  sky: { text: 'text-sky-300', border: 'border-sky-500/25', bg: 'bg-sky-500/5' },
  indigo: { text: 'text-indigo-300', border: 'border-indigo-500/25', bg: 'bg-indigo-500/5' },
};

export default function SlideGraphLayer() {
  return (
    <SlideLayout
      title="什麼是 Graph Engineering？"
      subtitle="Loop inside a Node, Graph between Nodes"
      icon={Workflow}
    >
      <div className="max-w-5xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <p className="text-slate-300 text-base leading-relaxed">
            <strong className="text-slate-100">工作節點（Node）</strong>：
            有一個講清楚的目標、有一套做完的標準、做完會交出一個東西。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            前面那一套（寫清楚目標、寫出什麼叫做完、讓它自己驗、沒過就改）跑的就是這樣一件事。
          </p>
          <p className="text-slate-400 text-base leading-relaxed mt-2">
            Loop 在一個節點裡面跑，Graph 排的是節點跟節點之間的事。
            兩個不在同一層，所以不用選一個。
          </p>
        </AnimatedBlock>

        {/* Loop：一個節點裡面那一圈 */}
        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw aria-hidden="true" size={16} className="text-sky-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-sky-400">Loop</span>
            <span className="text-slate-500 text-sm">一個工作節點自己修到好</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {LOOP_STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-slate-100 text-base font-bold">
                  {s}
                </div>
                {i < LOOP_STEPS.length - 1 && <ArrowRight aria-hidden="true" size={16} className="text-slate-600" />}
              </div>
            ))}
            <ArrowRight aria-hidden="true" size={16} className="text-slate-600" />
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-6 py-3 text-emerald-300 text-base font-bold">
              完成
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-2.5">
            <CornerDownLeft aria-hidden="true" size={16} className="text-slate-500 shrink-0" />
            <p className="text-slate-400 text-sm leading-relaxed">
              沒過就自己回到「執行」，<strong className="text-slate-300">這一圈不用你推</strong>。
            </p>
          </div>
        </AnimatedBlock>

        {/* Graph：節點之間 */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-5">
          <div className="flex items-center gap-2 mb-4">
            <Network aria-hidden="true" size={16} className="text-indigo-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-400">Graph</span>
            <span className="text-slate-500 text-sm">安排好幾個工作節點</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="rounded-xl border border-indigo-500/40 bg-indigo-500/5 px-6 py-2.5 text-indigo-200 text-base font-bold">
              拆解任務
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="w-full max-w-xl border-t border-slate-700" />
            <div className="w-full max-w-xl grid grid-cols-3 gap-4">
              {['商品列表', '會員登入', '購物車'].map((n) => (
                <div key={n} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-700" />
                  <div className="w-full rounded-xl border border-slate-700 bg-slate-900 px-2 py-3 text-center text-slate-100 text-base font-bold">
                    {n}
                  </div>
                  <div className="w-px h-4 bg-slate-700" />
                </div>
              ))}
            </div>
            <div className="w-full max-w-xl border-t border-slate-700" />
            <div className="w-px h-4 bg-slate-700" />
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 px-6 py-2.5 text-emerald-300 text-base font-bold">
              整合與驗收
            </div>
            <p className="text-slate-500 text-sm mt-3">三塊各自驗各自的，不用等別人做完</p>
          </div>
        </AnimatedBlock>

        {/* 同一個題目，兩層各在回答什麼 */}
        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">
          <h3 className="text-slate-100 text-base font-bold mb-1">同一個題目：交代 Claude Code 做一個電商網站</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COMPARE.map((c) => {
              const t = TONE_CLASS[c.tone];
              return (
                <div key={c.layer} className={`rounded-xl border ${t.border} ${t.bg} px-5 py-4`}>
                  <div className="flex items-baseline gap-2.5 mb-2">
                    <span className={`font-mono text-sm font-bold ${t.text}`}>{c.layer}</span>
                    <span className="text-slate-500 text-sm">{c.scope}</span>
                  </div>
                  <p className="text-slate-300 text-base leading-relaxed">{c.question}</p>
                </div>
              );
            })}
          </div>
        </AnimatedBlock>

        <Callout tone="muted" stepIndex={5} label="同一個電商網站，缺哪一層會怎樣">
          <span className="block">
            <strong className="text-slate-300">只有 Graph，節點裡面沒跑那一圈。</strong>
            三塊同時開工，三塊都回報做完了，接起來才發現購物車根本加不進商品。
            三份沒人驗過的東西一起交回來，比一塊一塊慢慢做還難收拾。
          </span>
          <span className="block mt-2">
            <strong className="text-slate-300">只有 Loop，外面沒有 Graph。</strong>
            購物車做得很乾淨，每一條測試都過，但它排在會員介面後面等了三天，
            而這兩塊其實誰都不用讀誰的東西。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
