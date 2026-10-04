import { FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { AskFirst } from '../../components/AskFirst';
import { SeriesRail, ROUTE_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 例子裡的資料夾一定要有真的名字。原本寫「只有『對外文件』那個資料夾」，
 * 學員知道概念卻不知道實際上長什麼樣；這一系列講的就是「規則放在哪個位置」，
 * 位置是抽象的話，整頁的主張就落不了地。docs/public/ 是常見的放法，
 * 跟前面 .claude/rules/ 的 paths 寫法也對得起來。
 *
 * ⚠️ **這一頁要重錄。** 單元 6-1 在 2026-10-03 之前就錄完了，下面那一輪改動不在影片裡。
 * 同日決議不 revert（講師的話：「不用 Revert」），所以**畫面與口白以這個檔案為準**，
 * 重錄的時候照現在的 `meta.script` 唸。同一條選法也放在 Slide 100（單元 6-3，還沒錄），
 * 所以在重錄之前，學員仍然拿得到完整的說法，只是晚十一頁。
 * 單元 6-1 的逐字稿檔頭也記著同一件事。
 *
 * 2026-10-03 把答案從「放進那一區的子目錄」改成兩種寫法並列。講師回饋：學員會困惑
 * 什麼時候用 Rules、什麼時候用子目錄的 CLAUDE.md。病灶是這一題的答案本來就有兩種寫法，
 * 而全片三個地方各給一個名字：這一頁只說「放進那個資料夾」（沒說放什麼檔案）、
 * Slide 71 兩種都介紹但只比載入時機、Slide 100 的表叫它「子目錄 rules」。
 * 現在選的規則統一寫成一句：**範圍剛好等於一個資料夾就放子目錄的 CLAUDE.md，
 * 跨資料夾或挑副檔名才用 paths**。改這一句要同時看 Slide 71 與 Slide 100。
 *
 * 最後查證：2026-10-03，對照 code.claude.com/docs/en/memory。
 * 子目錄那一份：「Files in subdirectories load on demand when Claude reads files in those
 * directories.」paths 的 glob 能挑副檔名與跨資料夾（文件那張表列了四種樣式：任一層的 .ts、
 * src 底下全部、根目錄的 .md、某個資料夾裡的 .tsx），而且沒寫 paths 的規則文件是開場就全載的
 * （「Rules without a `paths` field are loaded unconditionally」），所以 paths 不能省。
 * 兩種的載入時機相同，差別只有範圍怎麼指定。下次改版前先重查那兩節。
 */
const ROUTES = [
  {
    file: '那一區資料夾裡的 CLAUDE.md',
    when: '放在哪裡就管哪裡，不用另外寫範圍',
    eg: '只有 docs/public/（對外文件）要用正式語氣',
  },
  {
    file: '.claude/rules/ 底下的 .md，開頭寫 paths',
    when: 'paths 挑得到副檔名，也跨得了好幾個資料夾',
    eg: 'paths: "**/*.test.ts"，測試檔不管在哪都要管',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-06-route-q2',
  title: '規則放哪：只在某一區，就綁在那一區',
  script:
    '第二個問題：這條規則只在某一區才適用嗎？如果是，就把它綁在那一區上，不要放進根目錄。這樣只有當它動到那一區的時候，這份規則才會被讀進來，平常不會佔掉對話的空間。綁的寫法有兩種，很多人卡在不知道該用哪一種，這裡講清楚。第一種，直接在那一區的資料夾裡放一份 CLAUDE.md。它的範圍就是這個資料夾，你不用另外寫範圍，放在哪裡就管哪裡。像是你只有在寫對外文件的時候才需要正式語氣，那些文件都放在 docs 斜線 public 這個資料夾，那就在那個資料夾裡放一份，寫上這一條。第二種，在 .claude 斜線 rules 底下開一個檔案，開頭用 paths 寫它管哪些檔案。這一種是給範圍沒辦法用一個資料夾講完的時候用的，因為 paths 可以挑副檔名，也可以一次寫好幾個資料夾。像是所有的測試檔都要先寫測試再寫功能，而測試檔散在各個資料夾裡，這種就在 paths 寫兩顆星斜線、星點 test 點 ts。所以選的方式只有一句話：範圍剛好等於一個資料夾，就放那個資料夾的 CLAUDE.md；要跨資料夾或只管某一種副檔名，才用 paths 寫。兩種的載入時機是一樣的，都是碰到那一區才進來。這一層最容易被跳過，因為寫進根目錄比較省事。而省事的代價是你每一輪都在為它付錢。',
  seconds: 108,
  from: 69,
};

export default function RecRouteQ2() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={FolderTree}>
      <RecPage>
        <SeriesRail {...ROUTE_RAIL} current={1} revealAt={2} />
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <AnimatedBlock stepIndex={1}>

            <p className="text-slate-300 text-2xl leading-snug mb-6">只在某一區檔案才適用？</p>

            <AskFirst />
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2} className="mt-7">
            <p className="text-sky-300 text-4xl font-bold mb-5 leading-snug">綁在那一區上，不要進根目錄</p>

            <p className="text-slate-400 text-xl leading-relaxed">
              只有當它動到那一區的時候，這份規則才會被讀進來，平常不會佔掉對話的空間。
            </p>
          </AnimatedBlock>
        </div>

        <AnimatedBlock stepIndex={3} className="mt-5 space-y-3">
          <div className="text-slate-500 text-base">兩種寫法</div>
          {ROUTES.map((r) => (
            <div key={r.file} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
              <div className="font-mono text-lg text-orange-300 mb-1">{r.file}</div>
              <p className="text-slate-300 text-lg leading-relaxed">{r.when}</p>
              <p className="text-slate-500 text-base leading-relaxed mt-1">例如 {r.eg}</p>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="mt-5 px-2">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 範圍剛好等於一個資料夾，就放{' '}
            <code className="font-mono text-slate-300">CLAUDE.md</code>；跨資料夾或挑副檔名，才用{' '}
            <code className="font-mono text-slate-300">paths</code>。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
