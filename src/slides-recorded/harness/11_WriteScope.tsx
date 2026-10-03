import { ToggleLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { TipRows, type Tip } from './_TipRows';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-04：六個寫法技巧原本一個技巧一頁（`11_WriteWhitelist` 到 `16_WriteOneThing`），
 * 併成這一頁與 `12_WriteBasis` 兩頁。六組的 `bad`、`good` 與兩行說明**原文一字沒改**，
 * 只是從一頁一組變成一頁三組，理由寫在 `_TipRows.tsx` 的檔頭。
 *
 * 分組的依據是這三條管的都是**這一條規則管到哪裡**：
 *   - 只能做什麼：把範圍框出來，框以外它沒有選項可以挑
 *   - 探索還是確定：範圍要放多開，看你自己確定到哪裡
 *   - 一次只講一件：一條規則只框一件事，才分得出是哪一條沒做到
 * 另外三條（理由、例子、例外）管的是「它推不出來的時候靠什麼」，在下一頁。
 * **要加第七個技巧的時候先問它屬於哪一組**，不要又開第三頁。
 *
 * `kind: 'reference'`：三組並排是給學員停下來逐條對照自己手冊的，
 * 所以不套 160 字與 45 秒（跟 `32_Cheat_Tools`、`66b_HookHandlerCases` 同一個理由）。
 * 錄的時候一組一組出（`stepIndex` 2 到 4），不要一次展開。
 */
const TIPS: Tip[] = [
  {
    name: '一、講清楚只能做什麼',
    bad: '「不要用舊版的 React 寫法，不要用 var，不要改到我的 CSS。」',
    badNote: '你擋掉三種，它還有第四種方式可以出錯。',
    good: '「一律使用 React 函式元件，CSS 僅限修改 Tailwind classes。」',
    goodNote: '把範圍框起來，它就沒有第四種寫法可以選；真的偏掉，你也指得出違反了哪一條。',
  },
  {
    name: '二、還在摸索就放開，已經確定就釘死',
    bad: '不管什麼階段都寫「請嚴格按照規格實作，不要改動現有架構」。',
    badNote: '你自己都還不確定要什麼的時候，這樣寫等於逼它照著錯的方向做完。',
    good: '探索期：「幫我試幾種做法，各寫一個簡單版本讓我看。」　確定期：「照這份規格實作，不要改動現有架構。」',
    goodNote: '同一件事，講法要跟著你的確定程度換。',
  },
  {
    name: '三、一條規則只講一件事',
    bad: '「元件放 src/components/，嚴禁 inline style，並且一律使用 TypeScript。」',
    badNote: '它做到兩件、漏掉一件，你會以為整條都沒遵守。',
    good: '拆成三條，各自獨立一行。',
    goodNote: '能分開檢查，才知道是哪一條沒做到。',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-11-write-scope',
  title: '規則怎麼寫：管哪些、管多緊、管幾件',
  script:
    '規則該怎麼寫，有六個技巧，這一頁先講三個。這三個要處理的是同一種毛病：規則寫了，但它管哪些、管多緊、管幾件，你都沒講。' +
    '第一條，講清楚只能做什麼，不要列一串不能做什麼。禁止清單有個先天的問題，你能想到的壞寫法有限，擋掉三種，它還有第四種，而且第四種通常是你沒想過的那一種。改成白名單，你把可以用的東西框出來，框以外它就沒有選項可以挑。前面講權限模式的時候見過同一個道理：其餘一律擋下，只放行你寫好的那幾條。' +
    '第二條，還在摸索就放開，已經確定就釘死。很多人不管什麼階段都用同一種講法，一律嚴格限制，結果在自己都還不確定要什麼的時候，逼著它照錯的方向做完，然後整份重來。探索期你該說的是，幫我試幾種做法，各寫一個簡單版本讓我看。等你確定了，再把規格寫死。同一件事，講法要跟著你的確定程度換。' +
    '第三條，一條規則只講一件事。把三件事寫成一句，看起來很精簡，但它做到兩件漏掉一件的時候，你只會覺得這條規則沒用，然後整條刪掉。拆成三條各自獨立，你才分得出來是哪一條沒做到，也才知道要改哪一條。' +
    '這三條擺在一起就是：管哪些、管多緊、管幾件。下一頁那三條處理的是另一種毛病，你寫到的它照做了，寫不到的它就亂猜。',
  seconds: 109,
  kind: 'reference',
  from: 70,
};

export default function RecWriteScope() {
  return (
    <SlideLayout title={meta.title} subtitle="How to Phrase It ／ 框住範圍" icon={ToggleLeft}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            一條規則<Key>管哪些、管多緊、管幾件</Key>，三個都要講清楚
          </p>
        </AnimatedBlock>

        <TipRows tips={TIPS} stepFrom={2} />
      </RecPage>
    </SlideLayout>
  );
}
