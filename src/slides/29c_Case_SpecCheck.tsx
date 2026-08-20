import { ClipboardCheck, X, Check } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 課前作業的第二頁。七塊裡最容易寫壞的就是驗收條件，所以單獨一頁。
 * 正反對照，所以左欄 rose、右欄 emerald，這一頁只有這兩個色相。
 */
const TRANSLATIONS = [
  { vague: '要有高級感', testable: '圓角一律 2px；沒有卡片；沒有陰影' },
  { vague: '版面要乾淨', testable: '每個區塊最多一個強調元素；區塊間距至少 120px' },
  { vague: '顏色要有質感', testable: '只用四個顏色；強調色只出現在火與溫度相關的東西上' },
  { vague: '動畫要順', testable: '只有一種進場動畫：1.4 秒淡入加 14px 位移，沒有逐字動畫' },
  { vague: '要有品牌感', testable: '拿掉 logo 之後，仍能在一秒內認出這是陶藝工作室' },
  { vague: '手機上要好看', testable: '390 / 834 / 1280 / 1600 四個寬度都沒有橫向捲動，中文不被壓扁' },
];

const PROMPTS = [
  {
    when: '寫不出來的時候',
    title: '讓 AI 訪談你',
    lines: [
      '一次問我三個問題，問到我答不出來為止',
      '不要幫我想答案，也不要給我選項讓我勾',
      '我回答完之後，把我的話原樣整理，不要潤飾成行銷語言',
    ],
    why: '一給選項，你就會挑一個聽起來最順的。「開窯前沒有人知道結果」被潤飾成「每一次開窯都是驚喜的期待」之後，就再也不是真話了。',
  },
  {
    when: '交出去之前',
    title: '讓 AI 挑你的毛病',
    lines: [
      '哪幾條是形容詞而不是可驗收的規則？',
      '哪幾條換一個產業還完全成立？',
      '真實素材裡，有幾條是 AI 自己也寫得出來的？',
    ],
    why: '第三題最能檢驗規格夠不夠具體。「我們堅持職人精神」AI 寫得出來，「1280°C」寫不出來。',
  },
];

export default function SlideCaseSpecCheck() {
  return (
    <SlideLayout
      title="把形容詞翻成可以檢查的條件"
      subtitle="Spec Writing · 驗收條件"
      icon={ClipboardCheck}
    >
      <div className="max-w-6xl mx-auto space-y-5 pb-8">

        <AnimatedBlock stepIndex={1} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center gap-2 text-rose-300 text-sm font-bold">
              <X size={16} aria-hidden="true" />
              寫成這樣，做出來每次都不一樣
            </div>
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-bold">
              <Check size={16} aria-hidden="true" />
              寫成這樣，才驗得下去
            </div>
          </div>
          <ul className="space-y-2">
            {TRANSLATIONS.map((t) => (
              <li key={t.vague} className="grid grid-cols-2 gap-4">
                <span className="rounded-lg border border-rose-500/25 bg-rose-500/5 px-4 py-2 text-slate-300 text-sm">
                  {t.vague}
                </span>
                <span className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 px-4 py-2 text-slate-300 text-sm leading-relaxed">
                  {t.testable}
                </span>
              </li>
            ))}
          </ul>
        </AnimatedBlock>

        <Callout tone="good" label="判準" stepIndex={2}>
          每一條都要回答得出「怎麼證明它過了？」。機器檢查得了的算，
          <strong className="text-slate-100">人眼一秒判斷得了的也算</strong>，像「拿掉 logo 還認得出是陶藝工作室」那一條。
          寫「要有質感」的人，到了要裝自動檢查那一步會發現根本寫不出規則，那不是工具的問題，是規格的問題。
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMPTS.map((p, i) => (
            <AnimatedBlock
              key={p.title}
              stepIndex={i + 3}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-slate-500 mb-1">
                {p.when}
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-3">{p.title}</h3>
              <ul className="space-y-1.5 rounded-xl border border-slate-800 bg-slate-950 p-4">
                {p.lines.map((l) => (
                  <li key={l} className="text-slate-300 text-sm leading-relaxed">
                    {l}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">{p.why}</p>
            </AnimatedBlock>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
}
