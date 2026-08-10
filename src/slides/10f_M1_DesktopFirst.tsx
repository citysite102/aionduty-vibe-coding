import { AppWindow, FolderOpen, MessageSquare, Download, LogIn } from 'lucide-react';
import type { ReactNode } from 'react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 終端機安裝之前的入口頁。
 *
 * 桌面版的 Code 頁籤跟終端機是同一個 Claude Code，不是 Cowork。
 * 所以卡在安裝的人留在這裡也能把後面每一段走完，不必砍任何內容。
 */
const STEPS: { icon: typeof Download; label: string; desc: ReactNode }[] = [
  {
    icon: Download,
    label: '下載桌面版',
    desc: (
      <>
        到{' '}
        <a
          href="https://claude.com/download"
          target="_blank"
          rel="noreferrer"
          className="text-sky-400 font-mono hover:underline"
        >
          claude.com/download
        </a>{' '}
        下載，Mac 與 Windows 都能裝。
      </>
    ),
  },
  {
    icon: LogIn,
    label: '登入並選方案',
    desc: (
      <>
        Claude Code 要有付費方案才能跑：Claude Pro（月費 $20）直接登入，
        或到 Console 儲值（最低 $5）走用量計費。
        <strong className="text-slate-300">今天兩種都可以，選一個先進去</strong>，差別在後面的成本那一段會展開。
      </>
    ),
  },
  { icon: AppWindow, label: '切到 Code 頁籤', desc: '上面有 Chat、Cowork、Code 三個，要開的是最右邊那個。' },
  {
    icon: FolderOpen,
    label: '選一個資料夾',
    desc: (
      <>
        <strong className="text-slate-300">選桌面就可以。</strong>
        它之後就在這個範圍裡讀寫，不會跑出去，等一下正式的作品也會建在你選的這個地方。
      </>
    ),
  },
  {
    icon: MessageSquare,
    label: '講一句話',
    desc: (
      <>
        「幫我做一個五分鐘的計時器網頁。」然後看檔案真的長出來。
        <strong className="text-slate-300">這一個是試跑</strong>，正式的作品等一下會在同一個地方另外開一個資料夾重做。
      </>
    ),
  },
];

export default function SlideDesktopFirst() {
  return (
    <SlideLayout
      title="先用桌面版做出第一個東西"
      subtitle="Desktop First, Terminal Next"
      icon={AppWindow}
    >
      <LiveDemo kind="desktop" note="四步做出第一個東西" />
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            這四步不用終端機，整堂課接下來也都用得上這個畫面。先讓你看到成果，其他的等有東西跑出來再說。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="font-mono text-xs text-slate-600">{i + 1}</span>
                    <h3 className="text-base font-bold text-slate-100">{s.label}</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={3}
          className="rounded-2xl border px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <div className="text-sky-400 font-bold text-base mb-2">這一格不是簡化版</div>
          <p className="text-slate-300 text-base leading-relaxed">
            桌面版的 Code 頁籤跟終端機是<strong className="text-slate-100">同一個 Claude Code</strong>，只是換了介面。
            同一份 CLAUDE.md、同一組斜線指令、一樣能跑測試與版本控制。旁邊的 Cowork 才是另一回事，那個之後會講。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
