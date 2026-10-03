import { XCircle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * **全片那句判斷標準的正本在這一頁。** 一字不差的版本是：
 *
 *   只看做出來的東西，你能不能回答「有做到」或「沒做到」。
 *
 * 2026-10-03 統一過一次。在那之前它長出三種措辭在互相競爭，而學員會以為是三條不同的規則：
 *   - 「只看做出來的東西，你能不能回答有做到或沒做到」（本頁、Slide 79、116、117、128）
 *   - 「只用查得到的事實，不用形容詞」（Slide 146）
 *   - 「怎麼證明它過了」「指著畫面說這題過了」「能不能被機器檢查或人眼一秒判斷」
 *     （Slide 154、162、163、164，以及 `src/tools/` 的 DoneWhenChecker 與 Cheatsheet）
 * 全部換成上面那一句。**要改這句話就得十一個地方一起改**，掃法是
 * `grep -rn "有做到" src 逐字稿 public`，不要只改撞到的那一頁（CLAUDE.md B-6）。
 *
 * 兩個刻意保留的變體，它們是延伸不是另一種說法：
 *   - Slide 163、164 後面接「機器檢查得了的算，人眼一秒判斷得了的也算」，
 *     因為案例一有「拿掉 logo 還認得出是陶藝工作室」這種機器驗不了、人眼一秒驗得了的條件。
 *   - Slide 148、151 用的是例子（「要能正常使用」「順暢、好看這種字」），不是在陳述規則，不用改。
 *
 * 同一輪也把**反例**分配開，免得後面幾次聽起來像第一次沒聽懂：
 *   - 「畫面要好看」留給手冊那一段（Slide 109 修剪 → 116 改寫成 v4 → 117 換你改一條）。
 *     那三頁是同一條線上的三步，不是重複，不要拆散。
 *   - 「操作要順暢」留給循環那一段，而且只出現在 Slide 154 的 `SPEC_VS_WISH`。
 *     Slide 148 原本也用它，2026-10-03 換成「要能正常使用」。
 *   - 案例那一段用「要有高級感」「版面要乾淨」（Slide 163）。
 */

const CASES = [
  {
    bad: '回覆要專業一點',
    why: '專業是你心裡的標準，它沒有辦法對照。做完了它自己也不知道算不算達成。',
    good: '不要用驚嘆號，不要用「輕鬆搞定」這類說法，專有名詞第一次出現時附上英文原文。',
    type: '無法判定',
  },
  {
    bad: '不要直接把東西推上 main 分支',
    why: '寫在手冊裡不保證會被照做。對話一長它就把這條當成背景，而這種事錯一次就收不回來。',
    good: '在 Hook 或 GitHub 的分支保護裡擋掉，讓程式攔。手冊裡那一條就刪掉，不要重複寫。',
    type: '該用機制',
  },
  {
    bad: '照之前的做法，維持原本的風格',
    why: '「之前」是哪一次？它不知道。你心裡想的那一版，它沒有辦法回頭找。',
    good: '直接把那個做法寫出來，或指名檔案：以後新增按鈕一律照 src/components/Button.tsx 改。',
    type: '指涉不明',
  },
];

export default function SlideM2BadRules() {
  return (
    <SlideLayout title="常見的三種錯誤規則寫法" subtitle="Rules That Do Nothing" icon={XCircle}>
      <div className="max-w-6xl mx-auto space-y-3 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          這三種的共通點是：<strong className="text-slate-200">看起來很像規則，但沒有任何一句能被驗證。</strong>
        </AnimatedBlock>

        {CASES.map((c, i) => (
          <AnimatedBlock
            key={c.bad}
            stepIndex={i + 2}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
          >
            {/*
              分隔線要落在正中間，所以兩邊的內縮各自寫在自己那一欄，grid 本身不留 gap。
              原本是 gap-5 再加右欄的 pl-5：間距看起來對稱，但右欄的文字寬度少了那 20px，
              分隔線也跟著偏右 10px，兩欄的字就對不齊。橫排時（非 lg）維持原本的上下間距。
            */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr] lg:gap-0">
              <div className="lg:pr-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-red-400 font-mono text-xs">✕</span>
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-widest">{c.type}</span>
                </div>
                <div className="text-red-300 text-sm font-bold mb-2">「{c.bad}」</div>
                <p className="text-slate-500 text-xs leading-relaxed">{c.why}</p>
              </div>
              <div className="lg:border-l lg:border-slate-800 lg:pl-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-mono text-xs">✓</span>
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-widest">改成</span>
                </div>
                <div className="text-emerald-300 text-sm leading-relaxed">{c.good}</div>
              </div>
            </div>
          </AnimatedBlock>
        ))}

        {/*
          原本是「把那句話拿給旁邊的人看」。自學的人沒有旁邊的人，
          但那句的功能是「不需要別人幫忙的可驗證性測試」，所以替代的也要自己執行得了：
          先自己答一次，答不出來就把句子貼回去問它怎麼判斷，兩步都當場驗得出來。
        */}
        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-slate-900 border-slate-800 space-y-1.5">
          <p className="text-slate-400 text-base leading-relaxed">
            檢查方法分兩步。第一步自己答一次：<strong className="text-slate-200">只看做出來的東西，你能不能回答「有做到」或「沒做到」。</strong>「回覆要專業一點」答不出來，「不要用驚嘆號」數一下就答得出來。
          </p>
          <p className="text-slate-400 text-base leading-relaxed">
            第二步，還是不確定就把那句話貼給它，問「照這句話，你要怎麼判斷自己做到了沒」。
            它只能回答「我會注意」，這條就是寫了等於沒寫。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
