import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23：第三欄原本是「要改的時候」（動設定檔 vs 改一行文字），整頁的軸是
 * 「保證程度 vs 改動成本」。講師回饋：這一頁其實沒有在講改動成本，而那個軸對
 * 入門學員也用不上，他真正要的是「我這條規則該往哪放」。
 * 所以第三欄換成「什麼樣的規則適合」，挑選的依據改成「違反了會怎樣」。
 * 「同一條不要放兩個地方」那個原則留著，健檢的減法會回來用它。
 */

/**
 * 2026-10-03：第二個去處原本叫「子目錄的 rules」，跟章節五教的對不上。
 * rules 檔案是放在 `.claude/rules/` 底下，範圍是靠檔案開頭的 `paths` 指定，
 * 不是靠「放在子目錄」。那一頁（Slide 71）與 Slide 89 都是這樣講的，
 * 這裡改成「有寫範圍的 rules」，三頁的說法才一致。
 *
 * 2026-10-03（第二輪）再改一次，因為上面那一輪只改了口白，表格那一列還留著「子目錄 rules」。
 * 講師回饋：這一列不是只有 rules，子目錄的 CLAUDE.md 也在這一層，而學員會困惑什麼時候用哪一種。
 * 現在這一列叫「子目錄 CLAUDE.md／rules」，兩種都點名。
 * 第一欄因為名字變長，從 1.1fr 加寬到 1.5fr，否則會折行。
 *
 * 2026-10-03（第三輪）把「怎麼選」那一句也放進這一頁（step 2）。
 * 上一輪的判斷是「規則只寫一個地方，這一頁是速查表，指回 Slide 89 就好」，但**單元 6-1 已經錄完**，
 * Slide 89 補的那兩張卡不會出現在已經產出的影片裡，學員走到這一頁還是拿不到選法。
 * 這不違反「同一條規則不要放兩個地方」：那一條擋的是規則文件裡的重複，
 * 而投影片是線性播放的，這兩頁隔了十一頁、分屬兩支影片，學員不會同時看到。
 * **三個地方的那一句要一字不差**：這一頁、06_RouteQ2.tsx（Slide 89）、21d1_M2_LoadAlways.tsx（Slide 71）。
 */
export const meta: RecordedMeta = {
  id: 'harness-09-route-principles',
  title: '規則的四個去處，各自適合放什麼',
  script:
    '規則可以去的地方有四個：Hook 或 CI、綁在某一區上的那一種（子目錄的 CLAUDE.md 或有寫範圍的 rules）、Skill、根目錄的 CLAUDE.md。差別在保證程度。Hook 在你設的範圍裡一定會執行，根目錄的 CLAUDE.md 它讀得到，但不保證每一次都照做。所以挑的方式是看那條規則違反了會怎樣：會出事的那幾條才值得用程式擋，其他多數留在手冊裡就夠了。第二列那一格有兩種寫法，這裡再講一次怎麼選：範圍剛好等於一個資料夾，就在那個資料夾裡放一份 CLAUDE.md，它放在哪裡就管哪裡；要跨好幾個資料夾、或者只管某一種副檔名，才用 .claude 斜線 rules 底下的檔案，在開頭的 paths 把範圍寫出來。兩種的載入時機是一樣的，都是碰到那一區才進來。還有一個原則：同一條規則不要放兩個地方。已經有 Hook 在擋的事，手冊裡的文字版就是重複的，健檢的時候最容易刪掉的就是那一批。',
  seconds: 76,
  from: 69,
};

const LAYERS = [
  { name: 'Hook / CI', sure: '範圍內一定會執行', fit: '違反了會出事的那幾條', strong: true },
  { name: '子目錄 CLAUDE.md／rules', sure: '碰到那一區才載入', fit: '只跟某一區檔案有關的' },
  { name: 'Skill', sure: '用到才展開', fit: '有固定步驟、偶爾才用的做法' },
  { name: '根目錄 CLAUDE.md', sure: '不保證每次照做', fit: '整個專案都適用的慣例' },
];

export default function RecRoutePrinciples() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={Layers}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1fr_1.2fr] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-500">
            <span>歸位那四題的四個去處</span>
            <span>保證程度</span>
            <span>什麼樣的規則適合</span>
          </div>
          {LAYERS.map((l) => (
            <div
              key={l.name}
              className={`grid grid-cols-[1.5fr_1fr_1.2fr] gap-4 px-6 py-4 border-b border-slate-800/70 last:border-0 ${
                l.strong ? 'bg-sky-950/20' : ''
              }`}
            >
              <span className={`text-lg font-bold ${l.strong ? 'text-sky-300' : 'text-slate-300'}`}>{l.name}</span>
              <span className="text-slate-400 text-lg">{l.sure}</span>
              <span className={`text-lg ${l.strong ? 'text-sky-200/80' : 'text-slate-500'}`}>{l.fit}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          <div className="text-slate-500 text-base mb-1.5">第二列</div>
          <p className="text-slate-300 text-lg leading-relaxed">
            範圍就是一個資料夾，放那一份{' '}
            <code className="font-mono text-orange-300">CLAUDE.md</code>；跨資料夾或挑副檔名，用{' '}
            <code className="font-mono text-orange-300">.claude/rules/</code> 的{' '}
            <code className="font-mono text-orange-300">paths</code>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="border rounded-2xl px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 挑的依據是<Key>那條規則違反了會怎樣</Key>，不是每一條都往上搬。同一條不要放兩個地方。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
