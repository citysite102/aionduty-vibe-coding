import { Target, Ban } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { CopyAction } from '../components/CopyBlock';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 上一頁是照著抄，這一頁是自己寫。
 *
 * 題目刻意只給「要達成的效果」，不給規格。學員一定會先寫出模糊版，
 * 拿到不是自己要的結果，這一步是必要的，不要幫他們跳過。
 *
 * 四題都埋了陷阱，不是通用的寫作建議：
 *   1 是邊界（門檻大於總長時該怎麼辦）
 *   2 是需求衝突（新需求直接違反上一頁 prompt 裡定下的規則）
 *   3、4 是狀態交互（暫停與重置時，這個新狀態該怎麼變）
 * 這四種都是模糊 prompt 一定會漏、而且漏了就會看出來的地方。
 *
 * 這一頁不提供正確的 prompt，提供的是「哪些地方沒講就會出事」。
 */
const TRAPS = [
  {
    q: '什麼時候算「最後一段」？',
    hint: '剩 60 秒還是剩一成？先想清楚再往下：如果有人把整場設成 30 秒，一開始就該是警示狀態嗎？',
  },
  {
    q: '要變的那一塊，會不會撞到舊規則？',
    hint: '上一頁的 prompt 你寫了「只有發射是實心主色，其他保持灰階」。現在要某個東西變顯眼，這兩條直接衝突。你要它讓哪一邊？',
  },
  {
    q: '按下待機的時候呢？',
    hint: '暫停在剩 30 秒，警示要留著還是解除？停一下再按發射，是接續還是重新觸發一次？',
  },
  {
    q: '按下返航的時候呢？',
    hint: '歸零之後畫面要回到原樣，還是停在警示狀態？沒講的話，它多半只處理倒數那一條路。',
  },
];


/**
 * 驗收用的三條。順序刻意對齊上面 TRAPS 的四題（第 1 題是門檻、第 2 題是規則衝突，
 * 兩題都在倒數那一條路上，所以併成第 1 條），學員才知道這裡是在回收剛剛寫的東西，
 * 不是另一件新的事。
 *
 * 這一段原本開頭寫「接下來這件事有一個名字，叫測試」。兩個問題：
 * 一是它憑空冒出一個名詞，學員不知道為什麼突然要學術語；
 * 二是它跟這門課自己的立場打架 —— 02a_CoreAssets 的註解已經寫明
 * 「整堂課沒有人寫過一個測試，那是驗證不是測試」。這裡按按看就是驗證。
 * 所以名詞拿掉，改成直接給動作：一句可以複製的指令，加三條照著按的清單。
 */
const VERIFY_PROMPT = '先把倒數改成從 65 秒開始跑，我要驗收。驗完再改回原本的分鐘數。';

const CHECKS = [
  '倒數跑到第 5 秒，畫面有沒有照你寫的那樣變？',
  '在警示狀態下按待機，再按發射：警示要留著還是解除，跟你寫的一樣嗎？',
  '按返航歸零：畫面有沒有回到你寫的那個樣子？',
];

export default function SlideChallenge() {
  return (
    <SlideLayout title="換你寫一次" subtitle="Your Turn: Say It Precisely" icon={Target}>
      <LiveDemo kind="claude" note="先自己寫一版，對完下面四題再送出" />

      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-sky-400 text-sm font-bold mb-2">題目</div>
          <p className="text-slate-100 text-xl font-bold leading-snug mb-2">
            讓計時器在最後一段時間，一眼就看得出「快來不及了」。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            題目只講到這裡。要什麼效果、怎麼做到，是你要寫進 prompt 的部分。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            如果你只打「<span className="text-slate-300">時間快到的時候提醒我一下</span>」，
            大概會拿到這幾種其中一種：跳一個 alert 擋住整個畫面、整頁變紅、加一個閃爍動畫，
            或是它認為進度條已經夠明顯了，什麼都沒改。
            <strong className="text-slate-200">這四種都不算它做錯，是你沒講。</strong>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3}>
          <div className="text-slate-300 text-sm font-bold mb-3">
            這四題你沒寫進去，它就會自己選一個答案
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TRAPS.map((d, i) => (
              <div key={d.q} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-baseline gap-2.5 mb-1.5">
                  <span className="font-mono text-xs text-slate-600">{i + 1}</span>
                  <h3 className="text-base font-bold text-slate-100 leading-snug">{d.q}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{d.hint}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-amber-900/40 bg-amber-950/20 px-6 py-4">
          <div className="flex items-baseline gap-2.5">
            <Ban size={15} className="text-amber-400 shrink-0 translate-y-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-amber-300">加一句不要做什麼。</strong>
              例如「不要跳 alert」「不要用閃爍」。不寫的話它會自己挑一個，
              而閃爍實際跑起來會比你想的刺眼很多。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border px-6 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <div className="text-sky-400 text-base font-bold mb-2">怎麼知道它真的照做了</div>
          <p className="text-slate-300 text-base leading-relaxed mb-3">
            <strong className="text-slate-100">上面那四題，你寫進去幾條就按幾條。</strong>
            不是看它「有沒有變好看」，是一條一條對你自己寫的規格。
          </p>

          <p className="text-slate-400 text-sm leading-relaxed mb-1.5">
            25 分鐘等一次太慢，先叫它把時間改短，驗完再改回來：
          </p>
          <div className="rounded-lg border border-sky-900/50 bg-slate-950 px-3.5 py-2.5 mb-3">
            <p className="text-sky-100 text-sm leading-relaxed">「{VERIFY_PROMPT}」</p>
            <CopyAction text={VERIFY_PROMPT} className="mt-2" />
          </div>

          <ol className="space-y-1.5 text-slate-300 text-base leading-relaxed list-decimal list-inside mb-3">
            {CHECKS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>

          <p className="text-slate-400 text-base leading-relaxed border-t border-sky-500/20 pt-3">
            <strong className="text-slate-200">壞掉通常是壞在後面兩下，不是壞在倒數。</strong>
            倒數是它一定會做的部分，狀態怎麼互相影響才是沒講就會漏的地方。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
