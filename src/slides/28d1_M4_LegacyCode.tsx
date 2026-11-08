import { Wrench, Layers, Sparkles, ExternalLink } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 2026-11-09 新增（講師）。上一頁講的是「脈絡沒給到」，這一頁講的是另一種：
 * **既有的大型專案，程式碼本身的結構就讓它讀不懂。**
 * 下一頁才是索引與檢索，再下一頁才是要不要裝工具。順序是：
 *   先看懂問題 → 先整理程式碼本身 → 再給它找得到的方法 → 最後才評估外部工具。
 *
 * ── 「AI 看不懂人寫的爛 code」這句玩笑話要處理，不要照抄 ──────────────
 * 它好笑但不精確，而且會變成嘲諷前人。畫面上的說法是：命名不一致、同一件事有好幾種寫法、
 * 哪一塊負責什麼沒有寫下來的時候，它每一次都要重新猜。**這件事對接手的人一樣成立**，
 * 那句話要加這一句才公平，也才接得回上一頁的「跟你的程度無關」。
 *
 * ── 兩條路要對等呈現，不要暗示哪一條是正解 ────────────────────
 * 左邊階段性重構、右邊 AI Native 重寫，sky／indigo 成對（A-1 允許的唯一雙色用法）。
 * **重寫那一邊不要寫成反派。** 它的理由是真的：舊系統的限制多半來自當年的技術與人力條件。
 * 但風險也要寫滿：舊程式碼裡有沒人記得的業務規則，那些多半是多年累積的修補，
 * 重寫會把它們一起丟掉。這是軟體工程的老題目，不是 AI 時代才有的。
 * 出處：Joel Spolsky, "Things You Should Never Do, Part I"（2000）。
 * **最後查證：2026-11-09，連結回 200。**
 *
 * **重構要給定義**：這一頁有一半讀者不寫程式，「重構」對他們是空的。
 * 畫面上寫「不改功能，只把結構整理清楚」，那一句不要刪。
 *
 * 底下三個問題是這一頁真正要帶走的東西，**不要改成「建議你先重構」那種結論**。
 * 三題答得出來才輪得到重寫，有一題答不出來就先整理現況，理由寫在那一行裡。
 *
 * 用色：sky／indigo 成對，合計算一種（A-1）。`CLAUDE.md` 的 orange 是專有名詞，不計入。
 */

const REFACTOR = [
  '先讓它讀一遍，產出現況的結構說明，你自己看過一次再往下走。',
  '挑一塊開始，不要全面動。統一命名、把重複的收斂、補上測試。',
  '每一輪都要有東西可以驗：一支跑得動的檢查，或你自己點一次。',
  '整理出來的規則寫進 CLAUDE.md，下一輪它就照著走，不用你再講一次。',
];

const REWRITE = [
  '主張：舊系統的限制多半來自當年的技術與人力條件，現在從零寫，速度跟那時候不一樣。',
  '風險：舊程式碼裡有沒人記得的業務規則，那些多半是好幾年累積的修補。',
  '那些規則沒有寫在任何文件上，重寫的時候會跟著一起消失。',
];

const DECIDE = [
  { q: '業務規則說得清楚嗎？', v: '有文件、有人記得，還是舊程式碼本身就是唯一的規格？' },
  { q: '有沒有東西可以驗？', v: '有測試，或者至少拿得到舊系統的輸出可以比對嗎？' },
  { q: '能不能分段切換？', v: '一塊一塊換過去，還是只能挑一天全部換掉？' },
];

export default function SlideLegacyCode() {
  return (
    <SlideLayout
      title="接手舊專案：先重構，還是直接重寫"
      subtitle="Legacy Code"
      icon={Wrench}
    >
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          有人開玩笑說「AI 看不懂人寫的爛 code」。
          <strong className="text-slate-100">比較精確的說法是：命名不一致、同一件事有好幾種寫法、哪一塊負責什麼沒有寫下來，它每一次都要重新猜。</strong>
          這件事對接手的人一樣成立。所以在裝任何工具之前，先看程式碼本身要不要整理。
        </AnimatedBlock>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <AnimatedBlock stepIndex={2} className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-5">
            <div className="flex items-center gap-2">
              <Layers aria-hidden="true" size={17} className="shrink-0 text-sky-400" />
              <h3 className="text-base font-bold text-slate-100">一塊一塊重構</h3>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              重構是<strong className="text-slate-300">不改功能，只把程式碼的結構整理清楚</strong>。
              做法是分階段，讓它一輪比一輪讀得懂。
            </p>
            <ol className="mt-2.5 space-y-1.5 border-t border-sky-500/20 pt-2.5">
              {REFACTOR.map((r, i) => (
                <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                  <span className="font-mono text-xs text-slate-600 pt-0.5">0{i + 1}</span>
                  <span className="min-w-0">
                    {r.includes('CLAUDE.md') ? (
                      <>
                        整理出來的規則寫進 <code className="font-mono text-orange-300">CLAUDE.md</code>，
                        下一輪它就照著走，不用你再講一次。
                      </>
                    ) : (
                      r
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-5">
            <div className="flex items-center gap-2">
              <Sparkles aria-hidden="true" size={17} className="shrink-0 text-indigo-400" />
              <h3 className="text-base font-bold text-slate-100">直接用 AI 從零重寫</h3>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              另一派的主張是：與其整理，不如重寫一套。這幾年會被重新討論，是因為寫的速度變了。
            </p>
            <ul className="mt-2.5 space-y-1.5 border-t border-indigo-500/20 pt-2.5">
              {REWRITE.map((r) => (
                <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                  <span className="shrink-0 text-slate-600">・</span>
                  <span className="min-w-0">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              「重寫會丟掉沒人記得的規則」是軟體工程的老題目，不是 AI 時代才有的。
              <a
                href="https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/"
                target="_blank"
                rel="noreferrer"
                className="ml-1 inline-flex items-center gap-1 text-slate-500 hover:text-sky-400"
              >
                Joel Spolsky, 2000 <ExternalLink size={10} aria-hidden="true" />
              </a>
            </p>
          </AnimatedBlock>

        </div>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="text-base font-bold text-slate-100">要不要重寫，先答這三題</h3>
          <dl className="mt-2.5 grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-3">
            {DECIDE.map((d) => (
              <div key={d.q}>
                <dt className="text-sm font-bold text-slate-100">{d.q}</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-slate-400">{d.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 border-t border-slate-800 pt-3 text-sm leading-relaxed text-slate-400">
            三題都答得出來，重寫才是一個選項。
            <strong className="text-slate-200">有一題答不出來，先整理現況</strong>：
            那表示舊程式碼本身就是你僅有的規格，而重寫會把它扔掉。
            兩條路其實有同一個起點，都要先有一份說得清楚的現況。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
