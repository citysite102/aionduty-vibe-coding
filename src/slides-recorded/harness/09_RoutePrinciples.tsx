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

export const meta: RecordedMeta = {
  id: 'harness-09-route-principles',
  title: '規則的四個去處，各自適合放什麼',
  script:
    '規則可以去的地方有四個：Hook 或 CI、子目錄的 rules、Skill、根目錄的 CLAUDE.md。差別在保證程度。Hook 在你設的範圍裡一定會執行，根目錄的 CLAUDE.md 它讀得到，但不保證每一次都照做。所以挑的方式是看那條規則違反了會怎樣：會出事的那幾條才值得用程式擋，其他多數留在手冊裡就夠了。還有一個原則：同一條規則不要放兩個地方。已經有 Hook 在擋的事，手冊裡的文字版就是重複的，健檢的時候最容易刪掉的就是那一批。',
  seconds: 45,
  from: 69,
};

const LAYERS = [
  { name: 'Hook / CI', sure: '範圍內一定會執行', fit: '違反了會出事的那幾條', strong: true },
  { name: '子目錄 rules', sure: '碰到那一區才載入', fit: '只跟某一個資料夾有關的' },
  { name: 'Skill', sure: '用到才展開', fit: '有固定步驟、偶爾才用的做法' },
  { name: '根目錄 CLAUDE.md', sure: '不保證每次照做', fit: '整個專案都適用的慣例' },
];

export default function RecRoutePrinciples() {
  return (
    <SlideLayout title={meta.title} subtitle="Routing Your Rules" icon={Layers}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          <div className="grid grid-cols-[1.1fr_1fr_1.3fr] gap-4 border-b border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-500">
            <span>歸位那四題的四個去處</span>
            <span>保證程度</span>
            <span>什麼樣的規則適合</span>
          </div>
          {LAYERS.map((l) => (
            <div
              key={l.name}
              className={`grid grid-cols-[1.1fr_1fr_1.3fr] gap-4 px-6 py-4 border-b border-slate-800/70 last:border-0 ${
                l.strong ? 'bg-sky-950/20' : ''
              }`}
            >
              <span className={`text-lg font-bold ${l.strong ? 'text-sky-300' : 'text-slate-300'}`}>{l.name}</span>
              <span className="text-slate-400 text-lg">{l.sure}</span>
              <span className={`text-lg ${l.strong ? 'text-sky-200/80' : 'text-slate-500'}`}>{l.fit}</span>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="border rounded-2xl px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-300 text-xl leading-relaxed">
            💡 挑的依據是<Key>那條規則違反了會怎樣</Key>，不是每一條都往上搬。同一條也不要放兩個地方。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
