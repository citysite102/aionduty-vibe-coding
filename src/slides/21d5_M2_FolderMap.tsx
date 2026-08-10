import { FolderTree } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 前一頁那張總表講的是「誰叫它、什麼時候進來」，這一頁講「放在哪一層」。
 * 兩件事分開講：一個是時間軸，一個是位置。
 *
 * CLAUDE.md 的四個層級在預錄那一段講過（一份不夠用的時候還能放哪），
 * 這裡不重複那四層，補的是那一頁沒有的東西：同樣兩個位置底下，
 * 除了 CLAUDE.md 還放得下 skills、agents、rules，而且兩邊的取捨不一樣。
 *
 * 樹狀圖用純文字排，不畫線框：學員打開 Finder 看到的就是這個樣子，
 * 畫成方塊圖反而對不上。
 */
const TREE = [
  { indent: 0, path: '~/.claude/', note: '家目錄，跨所有專案都帶著', head: 'global' as const },
  { indent: 1, path: 'CLAUDE.md', note: '你個人的偏好，例如一律用繁體中文回答' },
  { indent: 1, path: 'skills/', note: '你自己每個專案都會用到的流程' },
  { indent: 1, path: 'agents/', note: '你慣用的子代理' },
  { indent: 0, path: '', note: '', spacer: true },
  { indent: 0, path: 'mission-timer/', note: '你的專案資料夾', head: 'project' as const },
  { indent: 1, path: 'index.html', note: '作品本身' },
  { indent: 1, path: 'CLAUDE.md', note: '這個專案的規矩，進版控，團隊共用' },
  { indent: 1, path: '.claude/', note: '這個專案專屬的配件' },
  { indent: 2, path: 'skills/', note: '只有這個專案要跑的流程' },
  { indent: 2, path: 'agents/', note: '只有這個專案要用的子代理' },
  { indent: 2, path: 'rules/', note: '只管某一區檔案的規矩' },
  { indent: 2, path: 'settings.json', note: '自動關卡（Hook）寫在這裡' },
];

const HEAD_STYLE = {
  global: 'text-indigo-300',
  project: 'text-sky-300',
} as const;

export default function SlideFolderMap() {
  return (
    <SlideLayout title="這些東西實際上放在哪兩個地方" subtitle="Where Things Live" icon={FolderTree}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          位置只有兩個：<strong className="text-indigo-300">你的家目錄</strong>，跟
          <strong className="text-sky-300">你的專案資料夾</strong>。
          兩邊的結構長得一樣，差別在<strong className="text-slate-100">誰會看到、什麼時候載入</strong>。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="space-y-0.5">
            {TREE.map((t, i) =>
              t.spacer ? (
                <div key={`s${i}`} className="h-3" />
              ) : (
                <div
                  key={t.path + i}
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,290px)_minmax(0,1fr)] gap-x-5 items-baseline py-0.5"
                  style={{ paddingLeft: `${t.indent * 22}px` }}
                >
                  <span
                    className={`font-mono text-sm ${
                      t.head ? `font-bold ${HEAD_STYLE[t.head]}` : 'text-slate-300'
                    }`}
                  >
                    {t.indent > 0 && <span className="text-slate-700">└ </span>}
                    {t.path}
                  </span>
                  <span className="text-slate-500 text-sm leading-relaxed">{t.note}</span>
                </div>
              )
            )}
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedBlock stepIndex={3} className="rounded-2xl border border-indigo-900/50 bg-slate-900 p-5">
            <div className="text-base font-bold text-indigo-300 mb-2">什麼該放家目錄</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              換到任何一個專案都成立的事。你的語言偏好、你自己的工作習慣、你每個案子都會跑的那套流程。
              <strong className="text-slate-300"> 別人不會看到這一份</strong>，它不進版本控制。
            </p>
          </AnimatedBlock>
          <AnimatedBlock stepIndex={4} className="rounded-2xl border border-sky-900/50 bg-slate-900 p-5">
            <div className="text-base font-bold text-sky-300 mb-2">什麼該放專案</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              換一個專案就不成立的事。這個案子的命名慣例、配色、不准做什麼。
              <strong className="text-slate-300"> 它跟著專案走</strong>，別人 clone 下來就有同一份規矩。
            </p>
          </AnimatedBlock>
        </div>

        <Callout tone="focus" label="不要什麼都往家目錄的 CLAUDE.md 塞" stepIndex={5}>
          那一份是<strong className="text-slate-100">每個專案、每一次對話都會被讀進去</strong>的，
          寫得越長，它每次開工都先揹著一堆跟這個案子無關的東西，還每次都在花錢。
          <span className="block mt-2 text-slate-400">
            判斷方式：這條規矩換一個專案還成立嗎？不成立就往專案那邊放。
            只有某一區檔案要遵守嗎？那連專案的 CLAUDE.md 都不該進，寫成{' '}
            <code className="font-mono text-orange-300">.claude/rules/</code> 底下的一個檔案，動到那一區才載入。
          </span>
        </Callout>

      </div>
    </SlideLayout>
  );
}
