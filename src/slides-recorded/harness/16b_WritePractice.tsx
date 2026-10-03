import { PencilRuler } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 六個寫法講完之後原本沒有動手的頁面，整段就停在「看完」。
 * 前一頁（57_HandbookV4）是拿示範手冊改一條，這一頁是換成學員自己那份。
 *
 * **這一頁是單元 6-4 唯一一頁「換你自己做」**，整段其他十頁都是示範。要刪它之前先想清楚：
 * 刪掉之後這一支影片從頭到尾學員不用動手，而它的主題正好是「打開你自己那份手冊改一條」。
 */
/**
 * 2026-10-04：那段 Prompt 原本是「照白名單、理由、例子、例外、一次一件幫我改寫
 * （探索空間那一條看的是時機，不在這一輪）」。講師回饋「這個指令太抽象看不懂」，而且
 * 它犯的是 CLAUDE.md A-4 那條：**學員按複製只會拿到那個字串**，而那五個詞是這一段
 * 自己取的簡稱，Claude 收到只會各自解讀；括號裡那句又是寫給人看的註解，貼過去是雜訊。
 * 現在五條各寫成一句做得出來的指示，並且最後要它自己回答判斷標準那一題。
 * **不要再把它縮回五個詞。**
 */

/**
 * 2026-10-03 標題從「換你改一條規則」改成「怎麼改寫你手冊裡最模糊的那一條」。
 * 理由跟 Slide 98（原「換你掛一條 Hook」）同一個：「換你 X」只說輪到你了，
 * 沒說這一頁給什麼。這一頁給的是挑哪一條、判斷標準、一段可以直接貼的改寫指令。
 */
export const meta: RecordedMeta = {
  id: 'harness-16b-write-practice',
  title: '如何改寫模糊的規則？',
  script:
    '換你動手改一條。打開你自己那份手冊，挑最模糊的那一條，多半就是帶形容詞的那一句。判斷標準只有一個：只看做出來的東西，你能不能回答有做到或沒做到。畫面要好看，答不出來，因為每個人的好看不一樣。改成一頁最多兩種強調色，數一數就答得出來。把你那一條交給它。畫面上那段可以直接複製，我念一下它在要什麼：第一，把不要做什麼換成只能做什麼。第二，補一句為什麼要有這條規則。第三，附一個具體的例子。第四，有例外就寫出來。第五，一條只講一件事，塞了兩件就拆開。最後那一句最重要：要它自己回答，改完之後只看做出來的東西，答不答得出有做到或沒做到。六個技巧裡沒有放進去的是探索空間那一條，因為那一條看的是你現在確定到什麼程度，不是句子怎麼寫。改完先自己數一次，數得出來才算改好。',
  seconds: 73,
  // 那段 Prompt 是給學員停下來複製的，五條各寫成一句做得出來的指示（見上面那段註解），
  // 所以整頁超過 160 字是預期中的，標 reference 不套那條上限。
  kind: 'reference',
};

export default function RecWritePractice() {
  return (
    <SlideLayout title={meta.title} subtitle="Your Turn" icon={PencilRuler}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            挑你手冊裡<Key>最模糊的那一條</Key>
          </p>
          <p className="text-slate-500 text-lg leading-relaxed mt-2">多半是帶形容詞的那一句</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['挑一條', '貼下面那段給它', '看它改成什麼', '自己數一次']} />
        </AnimatedBlock>

        {/*
          2026-10-04 拿掉「改完要變成數得出來的」那一組對照（✕ 畫面要好看／✓ 一頁最多兩種強調色）。
          上一頁（57_HandbookV4）整頁就是在把「畫面要好看」改成數得出來的寫法，這裡再用同一條
          當對照等於把剛看過的示範再演一次。判斷標準那一題改成寫進 Prompt 的最後一行，
          由它回答、學員驗收，比印在畫面上有用。
        */}
        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-7 py-4">
          <div className="font-mono text-base text-sky-400 mb-2">Prompt</div>
          <p className="text-sky-100 text-xl leading-relaxed">
            這是我 <code className="font-mono text-orange-300">CLAUDE.md</code> 裡的一條規則：<span className="text-sky-400">（貼上你那一條）</span>
            <span className="block mt-2 text-base leading-relaxed">
              幫我照下面五件事改寫，改完把前後並排給我看：<br />
              1 把「不要做什麼」換成「只能做什麼」<br />
              2 補一句為什麼要有這條規則<br />
              3 附一個具體的例子<br />
              4 如果有例外，寫出來<br />
              5 一條只講一件事，塞了兩件就拆開<br />
              最後告訴我：改完之後，只看做出來的東西，答不答得出「有做到」或「沒做到」。
            </span>
          </p>
          <p className="text-slate-500 text-base leading-relaxed mt-3">
            六個技巧裡沒放進去的是「探索空間」那一條，它看的是你現在確定到什麼程度，不是句子怎麼寫。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
