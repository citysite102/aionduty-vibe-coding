import { Layers } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 原本一頁總覽加四頁各講一層，共五頁。但四層的差別只有三個欄位
 * （放哪、放什麼、什麼時候載入），一張表就講得完，分開講反而比不出來。
 *
 * 而且分層講完之後，後面的分流四問又會把「子目錄」「根目錄」重講一次。
 * 併成一頁之後，那兩個答案在分流那一段才是第一次以「該不該進手冊」的角度出現。
 *
 * 第二層給主色：整堂課動手寫的就是它，其他三層是知道有這回事。
 */
const LAYERS = [
  {
    path: '~/.claude/CLAUDE.md',
    name: '全域',
    what: '你跨所有專案的個人偏好',
    eg: '回答一律用繁體中文',
  },
  {
    path: './CLAUDE.md',
    name: '專案根目錄',
    what: '這個專案的規章，團隊共用',
    eg: '前面你寫的那一份就是它',
    lead: true,
  },
  {
    path: 'src/xxx/CLAUDE.md',
    name: '子目錄',
    what: '那一區專屬的規矩，碰到才載入',
    eg: '',
  },
  {
    path: './CLAUDE.local.md',
    name: '本機',
    what: '只有你這台機器成立的事',
    eg: '',
  },
];

export const meta: RecordedMeta = {
  id: 'harness-26-layers',
  title: '一份不夠用的時候，還能放哪',
  script:
    '一份放在專案根目錄的手冊可以用很久，多數人一直到專案變大都不需要動它。真的要分，位置有四個。全域放在家目錄的 .claude 底下，放你跨所有專案的個人偏好，換到哪個專案都帶著。專案根目錄是整門課的主力，前面你寫的那一份就是它，會進版本控制，團隊共用一份。子目錄那份平常不佔空間，只有動到那一區才讀進來。最後是 CLAUDE.local.md，放進 gitignore 不進版控，寫只有你這台機器成立的事。四個位置的原則只有一句：越靠近現場的越具體，也越優先。',
  seconds: 45,
  from: 58,
};

export default function RecLayers() {
  return (
    <SlideLayout title={meta.title} subtitle="Four Layers" icon={Layers}>
      <RecPage className="space-y-5">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-500 text-xl leading-relaxed mb-3">
            一份可以用很久，專案變大才會用到分層。
          </p>
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            越靠近現場的<Key>越具體，也越優先</Key>
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
          {LAYERS.map((l, i) => (
            <div
              key={l.path}
              className={`px-6 py-4 border-b border-slate-800/70 last:border-0 ${l.lead ? 'bg-sky-950/20' : ''}`}
              style={{ paddingLeft: `${24 + i * 20}px` }}
            >
              <div className="flex items-baseline gap-4">
                <span className={`font-mono text-lg ${l.lead ? 'text-sky-300' : 'text-slate-400'}`}>{l.path}</span>
                <span className={`text-base ${l.lead ? 'text-sky-400/80' : 'text-slate-600'}`}>{l.name}</span>
              </div>
              <div className="flex items-baseline gap-4 mt-1">
                <span className={`text-lg ${l.lead ? 'text-slate-200' : 'text-slate-400'}`}>{l.what}</span>
                <span className="text-slate-600 text-base">{l.eg}</span>
              </div>
            </div>
          ))}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="px-1">
          <p className="text-slate-400 text-xl leading-relaxed">
            💡 同一件事講法不同時，下面的蓋過上面的。
          </p>
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
