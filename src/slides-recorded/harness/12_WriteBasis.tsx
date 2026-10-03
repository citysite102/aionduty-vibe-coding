import { Lightbulb } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { TipRows, type Tip } from './_TipRows';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

// check-words-ignore-file：第二組的正解就是在示範「一鍵改成⋯、上手改成⋯」那張對照表，
// 命中的那幾個詞是教材本身，不是違規。原本掛在 `14_WriteExample.tsx`，隨那一組搬過來。

/**
 * 2026-10-04：六個寫法技巧併成兩頁，這是後半。前半是 `11_WriteScope`（範圍、階段、一次一件），
 * 六組的原文一字沒改，理由寫在 `_TipRows.tsx` 的檔頭。
 *
 * 這三條管的都是**它推不出來的時候靠什麼**：
 *   - 寫出為什麼：清單列不到的情況，理由還推得出來
 *   - 給一個例子：風格與語氣的標準很難用文字描述，給樣本它就不用猜
 *   - 寫清楚例外：告訴它哪些情況不算違規，它才不會硬套
 * **要加第七個技巧的時候先問它屬於哪一組**，不要又開第三頁。
 *
 * `kind: 'reference'` 的理由同前半頁。錄的時候一組一組出（`stepIndex` 2 到 4）。
 */
const TIPS: Tip[] = [
  {
    name: '四、寫下理由，不要只寫規則',
    bad: '「按鈕文案使用航太語彙：發射、待機、返航、補給。」',
    badNote: '出現清單以外的按鈕時，它不知道該叫什麼。',
    good: '「按鈕文案使用航太語彙，因為這是太空任務主題的計時器。例如發射、待機、返航。」',
    goodNote: '知道理由，它遇到新按鈕就能自己延伸。',
  },
  {
    name: '五、給一個範例，勝過三行描述',
    bad: '「中文寫作請避免使用中國大陸的慣用詞。」',
    badNote: '它跟你對「哪些算」的認知不一樣。',
    good: '附一張對照表：一鍵改成依實際操作描述、上手改成熟悉、技術棧改成技術堆疊。',
    goodNote: '有具體樣本可以比對，它就不用猜你的標準。',
  },
  {
    name: '六、把例外一起寫進去',
    bad: '「禁止使用常駐的無限動畫。」',
    badNote: '它會連該有的載入指示也一起拿掉，然後你得回頭解釋。',
    good: '「禁止常駐的無限動畫。例外：真的要表達系統正在運轉時，全頁最多留一組，且必須慢速、低對比。」',
    goodNote: '把例外一起寫進去，它才知道哪些情況不算違規。',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-12-write-basis',
  title: '規則怎麼寫：理由、例子、例外',
  script:
    '後面這三條處理的是另一種毛病：你寫到的它照做了，沒寫到的它就會自己猜測。' +
    '第四條，寫下理由，不要只寫規則。規則永遠寫不完，一定會有你沒想到的情況。拿你手冊裡那一條當例子：按鈕文案要用航太語彙，後面列了發射、待機、返航、補給。那出現清單以外的按鈕呢？它就不知道該叫什麼了。但如果你加一句因為這是太空任務主題的計時器，它就有依據可以自己延伸。理由比清單耐用，因為清單列不到的情況，理由還推得出來。' +
    '第五條，給一個範例，勝過三行描述。你寫中文請避免中國大陸慣用詞，聽起來很清楚，問題是哪些字算慣用詞，它的認定跟你不一樣，而你不會知道它認的是哪一套。改成附一張對照表，一鍵改成依實際操作描述、上手改成熟悉、技術棧改成技術堆疊，它就有具體樣本可以比對。風格類、語氣類的規則尤其需要範例，因為那種標準本來就很難用文字描述。' +
    '第六條，把例外一起寫進去。規則寫得越絕對，它套得越死，而且會套到你沒預期的地方。你寫禁止使用常駐的無限動畫，它可能連該有的載入指示也一起拿掉，然後你要回頭一條一條解釋。改成：禁止常駐的無限動畫，例外是真的要表達系統正在運轉的時候，全頁最多留一組，而且必須慢速、低對比。寫了例外，它才知道哪些情況不算違規。' +
    '六條講完了。最後補一句：這六條不是只能用在 CLAUDE.md 上。舉一個你手上已經有的東西，那個 code-reviewer 子代理。你寫給它的標準如果是「幫我看一下有沒有問題」，那就是第一條沒做到：你只說了要它看，沒說只能看哪幾件。照第一條改寫成「只檢查這三件：倒數的分鐘數有沒有寫死在程式裡、有沒有引用外部圖片、瀏覽器 Console 有沒有紅字」，它回給你的東西會完全不一樣。所以凡是你寫給它看的規則，都適用這六條。',
  seconds: 142,
  kind: 'reference',
  from: 70,
};

export default function RecWriteBasis() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It ／ 給它依據" icon={Lightbulb}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            你寫到的它照做，<Key>沒寫到的它就會自己猜測</Key>
          </p>
        </AnimatedBlock>

        <TipRows tips={TIPS} stepFrom={2} />

        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 凡是你寫給它看的規則都適用。拿你那個 code-reviewer 來說：
            「幫我看一下有沒有問題」就是第一條沒做到，改成「只檢查這三件：倒數的分鐘數有沒有寫死、有沒有引用外部圖片、Console 有沒有紅字」，它回你的東西會完全不一樣。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
