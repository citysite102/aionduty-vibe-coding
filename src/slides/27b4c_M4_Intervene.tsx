import { Hand, CircleStop, PencilLine, Wrench, Scissors } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const MOVES = [
  {
    icon: CircleStop,
    title: '1. 直接把它停下來',
    body: '發現它連續四、五次都在解同一個問題，或畫面一直是空白的，不用再等。按 Esc 就會中斷它正在做的事，你可以接著補一句話重新指路。',
    note: 'Esc 只是打斷手上的動作，不會把 Claude Code 關掉；真的要整個離開，連按兩次 Ctrl + C。'
  },
  {
    icon: PencilLine,
    title: '2. 把規則寫進 CLAUDE.md',
    body: '把它剛才做錯的地方，用白話中文寫進 CLAUDE.md。下次啟動就會讀到，同樣的錯比較不會再犯。',
    note: '這是把一次性的糾正，變成之後每一輪都生效的規則。'
  },
  {
    icon: Wrench,
    title: '3. 自己動手改一下',
    body: '如果它大部分都做對了，只卡在一個打錯的字或少了一個標點，直接打開檔案改掉會比繼續下提示詞快。',
    note: '不是每件事都得靠提示詞解決，你也還在這個循環裡。'
  },
  {
    icon: Scissors,
    title: '4. 把範圍縮小',
    body: '會卡住，通常是因為一次交代的範圍太大。跟它說：先停，這輪我們只把登入按鈕做出來，其他的等一下再說。',
    note: '範圍越小，完成標準越明確，它就越不容易繞路。'
  }
];

export default function SlideIntervene() {
  return (
    <SlideLayout
      title="鬼打牆的時候，你可以怎麼踩煞車"
      subtitle="Manual Intervention When the Loop Gets Stuck"
      icon={Hand}
    >
      <div className="max-w-5xl mx-auto mt-3 text-left space-y-6 pb-6">

        <AnimatedBlock stepIndex={1} className="bg-slate-900/60 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-base text-slate-300 leading-relaxed">
            <strong className="text-slate-100">你人還在現場的時候</strong>，可以動手做這四件事。
            最怕的是它卡在迴圈裡出不來，而錢一直在燒。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOVES.map((move, idx) => {
            const Icon = move.icon;
            return (
              <AnimatedBlock
                key={move.title}
                stepIndex={idx < 2 ? 2 : 3}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-slate-100">{move.title}</h4>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {move.body}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed mt-auto border-t border-slate-800 pt-3">
                  {move.note}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={4} className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4">
          <p className="text-sm text-slate-400 leading-relaxed">
            <strong className="text-slate-200">這四招都不需要你看懂程式碼。</strong>
            判斷的標準只有一個：它有沒有在往前走。原地打轉超過幾輪，就停下來換一種方式，不要放著讓它繼續跑。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
