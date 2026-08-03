import { FileX2 } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

export const meta: RecordedMeta = {
  id: 'harness-01-fail-not-loaded',
  title: '規則沒生效：根本沒被載入',
  script:
    '規則寫了卻沒照做，第一個要排除的原因是它根本沒讀到。根目錄那份每一輪都會載入，子目錄那份不一樣，要等到它真的讀到或改到那一區的檔案，運作框架才會把那一層併進來。這是程式在判斷，不是它自己決定的。問題是這個觸發是被動的，等它動到才載入，有時候已經來不及。想確保一定讀到，在根目錄那份寫一行 at 加路徑，那一份就會直接被併進來，每一輪都在。代價是它會一直佔空間，等於放棄分層的好處。另一種是寫一行提醒它先去看，比較省，但那本身也是一條規則，一樣可能沒生效。',
  seconds: 42,
  from: 68,
};

export default function RecFailNotLoaded() {
  return (
    <SlideLayout title={meta.title} subtitle="Why Rules Fail" icon={FileX2}>
      <RecPage className="space-y-5" handbook={1}>
        <AnimatedBlock className="mb-6">
          <p className="text-slate-300 text-3xl font-bold leading-snug">
            因為那份手冊，<Key>根本沒進到這一輪的對話裡</Key>。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={1} className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-500 text-base font-mono mb-2">根目錄</div>
            <div className="text-slate-100 text-xl font-bold mb-3 font-mono">./CLAUDE.md</div>
            <div className="text-sky-400 text-lg">每一輪都會載入</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-slate-500 text-base font-mono mb-2">子目錄</div>
            <div className="text-slate-100 text-xl font-bold mb-3 font-mono">報表/CLAUDE.md</div>
            <div className="text-slate-400 text-lg">動到那一區才載入</div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-300 text-xl leading-relaxed">
            規則寫在子目錄，這一輪它卻在改別的地方，那條規則就不在對話裡。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="text-slate-400 text-base mb-4">💡 想讓它一定讀到，在根目錄那份裡面加一行</div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden mb-3">
            <div className="border-b border-slate-800 bg-slate-900 px-5 py-2 font-mono text-sm text-slate-500">
              ./CLAUDE.md
            </div>
            <div className="px-5 py-4 font-mono text-lg space-y-1">
              <div className="text-slate-500"># 任務計時器</div>
              <div className="text-slate-500">- 深色星空背景⋯</div>
              <div className="text-sky-300">@報表/CLAUDE.md</div>
            </div>
          </div>

          <p className="text-slate-400 text-base leading-relaxed">
            開頭那個 <span className="font-mono text-slate-300">@</span> 是「把那個檔案的內容<Key>整份併進來</Key>」。
            這樣它每一輪都在，不必等它動到那一區。
          </p>
        </AnimatedBlock>

      </RecPage>
    </SlideLayout>
  );
}
