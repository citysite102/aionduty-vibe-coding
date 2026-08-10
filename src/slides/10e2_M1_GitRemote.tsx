import { CloudOff, HardDrive, Cloud, ArrowRight, ArrowLeft } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁只講機制：兩份存檔各在哪、哪兩個動作會跨過那條線。
 *
 * 「為什麼需要 GitHub」（硬碟壞了、換電腦、傳給別人）與實際推上去的操作，
 * 是第四單元 27b8b_M4_PushToGithub 的職務，這裡不重複，否則兩頁互換位置
 * 讀起來會沒有差別。這裡要解掉的是另一件事：學員在前一頁 commit 完之後，
 * 很自然會以為東西已經備份好了。
 *
 * 本機與遠端是成對對照，所以走 sky 與 indigo 那組，合計算一種強調色。
 */
const SIDES = [
  {
    icon: HardDrive,
    label: '本機',
    en: 'Local Repository',
    where: '就在你的專案資料夾裡，一個叫 .git 的隱藏資料夾',
    points: [
      '前一頁那些存檔點全部記在這裡',
      '斷網也能存，它不需要網路',
      '這台電腦壞了，這些紀錄就沒了',
    ],
    tone: 'sky' as const,
  },
  {
    icon: Cloud,
    label: '遠端',
    en: 'Remote Repository',
    where: 'GitHub 上的另一份，網址長得像 github.com/你的帳號/專案名',
    points: [
      '你不送上去，它永遠不知道你改了什麼',
      '換一台電腦，從這裡把整個專案拿回來',
      '部署平台是讀這一份，不是讀你的電腦',
    ],
    tone: 'indigo' as const,
  },
];

const TONES = {
  sky: {
    card: 'bg-slate-900 border-sky-900/50',
    iconBox: 'bg-sky-500/10 text-sky-400',
    label: 'text-sky-300',
    marker: 'marker:text-sky-900',
  },
  indigo: {
    card: 'bg-slate-900 border-indigo-900/50',
    iconBox: 'bg-indigo-500/10 text-indigo-400',
    label: 'text-indigo-300',
    marker: 'marker:text-indigo-900',
  },
};

export default function Slide10e2() {
  return (
    <SlideLayout
      title="commit 完了，東西還是只在你電腦裡"
      subtitle="Local vs Remote"
      icon={CloudOff}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          存檔跟備份是兩件事。<strong className="text-slate-100">Git 會存兩份，一份在你的電腦，一份在網路上，而它們不會自己同步。</strong>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SIDES.map((s, i) => {
            const Icon = s.icon;
            const t = TONES[s.tone];
            return (
              <AnimatedBlock
                key={s.en}
                stepIndex={i + 2}
                className={`rounded-2xl border p-5 ${t.card}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${t.iconBox}`}>
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className={`text-lg font-bold ${t.label}`}>{s.label}</div>
                    <div className="font-mono text-xs text-slate-500">{s.en}</div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-3 border-b border-slate-800 pb-3">
                  {s.where}
                </p>
                <ul className={`text-slate-400 text-sm space-y-1.5 list-disc pl-4 ${t.marker}`}>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          示意圖用 grid 排三欄：左邊你的電腦、中間兩個箭頭、右邊 GitHub。
          箭頭是靜態的，不做動畫（A-3），方向靠 icon 與位置講清楚就夠了。
          中間那條虛線是重點：跨過去要靠指令，不會自己過去。
        */}
        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="text-base font-bold text-slate-100 mb-4">跨過那條線的只有兩個動作</div>

          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 md:gap-5 items-stretch">
            <div className="rounded-xl border border-sky-900/50 bg-slate-900 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive size={16} className="text-sky-400 shrink-0" />
                <span className="text-sky-300 text-sm font-bold">你的電腦</span>
              </div>
              <div className="font-mono text-xs text-slate-500 mb-2">mission-timer/</div>
              <div className="space-y-1.5">
                <div className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-400">
                  index.html
                </div>
                <div className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-400">
                  .git ／ 存檔點都在這
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 border-x border-dashed border-slate-700 px-3 md:px-5">
              <div className="flex flex-col items-center gap-1">
                <ArrowRight size={18} className="text-slate-300" />
                <code className="font-mono text-xs font-bold text-slate-200 whitespace-nowrap">git push</code>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ArrowLeft size={18} className="text-slate-500" />
                <code className="font-mono text-xs text-slate-400 whitespace-nowrap">git pull</code>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-900/50 bg-slate-900 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Cloud size={16} className="text-indigo-400 shrink-0" />
                <span className="text-indigo-300 text-sm font-bold">GitHub</span>
              </div>
              <div className="font-mono text-xs text-slate-500 mb-2">github.com/你/mission-timer</div>
              <div className="space-y-1.5">
                <div className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-400">
                  同一份的複本
                </div>
                <div className="rounded border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-mono text-xs text-slate-600">
                  push 過才有
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <p className="text-slate-400 text-sm leading-relaxed">
              <code className="font-mono text-slate-200">git push</code>
              ：把你電腦裡的存檔點送上 GitHub。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              <code className="font-mono text-slate-200">git pull</code>
              ：把 GitHub 上的更新拿回你的電腦。
            </p>
          </div>
        </AnimatedBlock>

        <Callout tone="warn" label="最容易誤會的一件事" stepIndex={5}>
          <strong className="text-slate-100">commit 一百次，沒有 push，備份份數還是零。</strong>
          存檔點做得再勤，只要沒送上去，它們就跟你的資料夾在同一台電腦上，一起壞、一起不見。
        </Callout>

      </div>
    </SlideLayout>
  );
}
