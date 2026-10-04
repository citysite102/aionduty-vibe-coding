import { ShieldAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { FlowRow } from './_StageMap';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-10-04 新增（講師：「我還想要增加 Hooks 的案例在這個專案裡面」）。
 *
 * 位置是〈三題的答案，與每一條該放哪一層〉之後：那一頁第 1 題只答到「這一條要用程式擋」，
 * 但從來沒有真的擋出來。這一頁把它掛上去，所以〈這份提案工作，六個零件各對應什麼〉
 * 的「自動關卡」那一列才從「第 1 題的答案」變成「剛剛掛好了」。**三頁要一起看。**
 *
 * **做法照〈如何掛上你的第一條 Hook〉那一頁的形狀**：不要學員自己編 JSON，
 * 給一句可貼的話讓 Claude 去寫設定，學員負責測。這一段的受眾多數不寫程式，
 * 課裡掛第一條 Hook 的時候就是這樣做的，這裡換一個情境再跑一次同一套。
 * **不要在這一頁貼 settings.json 的原文**，那會變成另一種教法，而且跟前面不一致。
 *
 * 這一頁真正新增的教學點是**範圍**（Hook 三層的第二層）：擋的不是「寫成本」，
 * 是「寫進會寄出去的那個資料夾」。草稿要算成本很正常，全部擋掉你自己也不能工作。
 * 所以資料夾樹上多了一個 `out/`，那不是裝飾，它就是這條 Hook 的範圍。
 * 改這一頁要回去看 42_TransferAnswers 那棵樹，兩邊的 `out/` 是同一個東西。
 *
 * 第四件驗收（在 out/ 以外寫成本要放得過）是這一題特有的，
 * 〈如何掛上你的第一條 Hook〉那三件沒有。少了它，學員驗不出範圍有沒有設對。
 */
const LAYERS = [
  { n: '時機', body: '它要寫檔案之前。寫完才擋就來不及了，東西已經在檔案裡。' },
  { n: '範圍', body: '只管寫進 out/ 的那幾次。out/ 是你要寄出去的那個資料夾。' },
  { n: '動作', body: '內容出現成本、利潤率、毛利就擋下來，並且告訴你是哪一行。' },
];

const PROMPT =
  '在這個專案的 .claude/settings.json 掛一條 Hook：我要寫檔案之前，如果路徑在 out/ 底下，' +
  '就檢查內容有沒有出現成本、利潤率、毛利這幾個詞，有就擋下來，並且告訴我是哪一行。' +
  '掛完故意在 out/ 寫一份帶成本的草稿測一次給我看。';

const CHECKS = [
  '那份帶成本的草稿，真的被擋下來了嗎',
  '被擋的時候，有沒有講清楚是哪一行',
  '在 out/ 以外的地方寫成本，它要放得過（這一題在測範圍有沒有設對）',
  '它寫進哪一個檔案了（該進這個專案的 .claude/settings.json，不是家目錄那一份）',
];

export const meta: RecordedMeta = {
  id: 'harness-43-transfer-hook',
  title: '用一條 Hook 擋住要寄出去的成本數字',
  script:
    '第 1 題答的是「這一條要用程式擋」，但到剛才為止它只是一個決定，還沒有任何東西在擋。這一頁把它掛上去。' +
    '做法跟你前面掛第一條 Hook 的時候一樣：設定檔不用你自己編，把畫面上那句話交給它，三層它會自己填。' +
    '三層這次填什麼？時機是它要寫檔案之前，寫完才擋就來不及了，東西已經在檔案裡。' +
    '範圍這一層是這一條最重要的地方：只管寫進 out 這個資料夾的那幾次。out 是你要寄出去的那一份放的地方。' +
    '為什麼不是全部擋掉？因為你自己算成本、寫內部的試算，那都很正常。全部擋掉你連工作都不能做。要擋的是會出去的那一份。' +
    '動作是內容出現成本、利潤率、毛利這幾個詞就擋下來，而且要告訴你是哪一行，不然你只會看到它莫名其妙地失敗。' +
    '掛完一定要測，而且這一題要測四件。第一，那份帶成本的草稿真的被擋下來了嗎。第二，被擋的時候有沒有講是哪一行。' +
    '第三件是這一題特有的：在 out 以外的地方寫成本，它要放得過。這一件在測範圍有沒有設對，少了它你不會發現自己把整個專案都擋住了。' +
    '第四，它寫進哪一個檔案了。這一題該進這個專案的 settings.json，寫到家目錄那一份去的話，你每一個專案都會被這條規則檢查。',
  seconds: 112,
  // 那段 Prompt 是給學員停下來複製的，加上三層與四件驗收，整頁超過 160 字是預期中的，
  // 標 reference 不套那條上限（同 67_HookPractice 那一組的理由）。
  kind: 'reference',
  from: 75,
};

export default function RecTransferHook() {
  return (
    <SlideLayout title={meta.title} subtitle="Transfer It" icon={ShieldAlert}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-2">
            第 1 題答的是「這一條要用程式擋」，但到現在它還只是一個決定，沒有東西在擋。
          </p>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            設定檔不用你自己編，<Key>把這句交給它</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <FlowRow steps={['貼這句給它', '它去寫設定', '在 out/ 寫一份帶成本的', '看它擋不擋']} />
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-sky-500/25 bg-sky-500/5 px-7 py-5">
          <div className="font-mono text-base text-sky-400 mb-2">Prompt</div>
          <p className="text-sky-100 text-lg leading-relaxed">{PROMPT}</p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-900 px-7 py-5">
          <div className="text-slate-500 text-base mb-3">三層這次填的是</div>
          <div className="space-y-2.5">
            {LAYERS.map((l) => (
              <div key={l.n} className="flex items-baseline gap-4">
                <span className="w-16 shrink-0 font-mono text-base font-bold text-sky-300">{l.n}</span>
                <span className="text-slate-300 text-lg leading-relaxed">{l.body}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-400 text-base leading-relaxed mt-4 pt-3 border-t border-slate-800">
            為什麼範圍只到 <code className="font-mono text-slate-300">out/</code>？
            你自己算成本、寫內部試算都很正常，全部擋掉你連工作都做不了。
            <strong className="text-slate-200">要擋的是會出去的那一份。</strong>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="rounded-2xl border border-slate-800 bg-slate-950 px-7 py-5">
          <div className="text-slate-500 text-base mb-3">掛完測四件</div>
          <div className="space-y-2">
            {CHECKS.map((c) => (
              <p key={c} className="text-slate-300 text-lg leading-relaxed">
                {c}
              </p>
            ))}
          </div>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
