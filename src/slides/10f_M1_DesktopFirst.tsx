import { AppWindow, FolderOpen, MessageSquare, Download, LogIn } from 'lucide-react';
import type { ReactNode } from 'react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 終端機安裝之前的入口頁。
 *
 * 桌面版的 Code 頁籤跟終端機是同一個 Claude Code，不是 Cowork。
 * 所以卡在安裝的人留在這裡也能把後面每一段走完，不必砍任何內容。
 *
 * 最後查證：2026-09-21。官方文件（code.claude.com/docs/en/desktop）當時仍寫著
 * 「three tabs: Chat, Cowork, Code」，但實機畫面上 Code 已經變成左上角的 </> 圖示，
 * Chat 與 Cowork 則是輸入框上的切換。兩種版面都寫進步驟 3，學員照哪一版都找得到。
 * 下次改版前先開一次 app 對照，不要只看文件。
 *
 * 左側列那一塊只負責「先不用管」，不要在這裡展開 Projects、Artifacts 是什麼。
 * 三個介面（網頁版／Cowork／Claude Code）的完整比較是章節五 21h2 與 harness/33 的職務，
 * 在這裡講等於同一批內容開兩頁（B-5），也會把這一頁「先做出東西」的節奏打斷。
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
        <strong className="text-slate-300">兩種都可以，選一個先進去</strong>，差別在後面的成本那一段會展開。
      </>
    ),
  },
  {
    icon: AppWindow,
    label: '切到 Code',
    desc: (
      <>
        左上角那個 <code className="font-mono text-slate-300">&lt;/&gt;</code> 圖示就是 Code，按它。
        有些版本把 Chat、Cowork、Code 做成上面三個頁籤，那就選 Code 那一個。
      </>
    ),
  },
  {
    icon: FolderOpen,
    label: '選一個資料夾',
    desc: (
      <>
        <strong className="text-slate-300">選桌面就可以。</strong>
        它之後就在這個範圍裡讀寫，不會跑出去，正式的作品也會建在你選的這個地方。
      </>
    ),
  },
  {
    icon: MessageSquare,
    label: '講一句話',
    desc: (
      <>
        「幫我做一個五分鐘的計時器網頁。」然後看檔案真的長出來。
        <strong className="text-slate-300">這一個是試跑</strong>，正式的作品會在同一個地方另外開一個資料夾重做。
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
      <LiveDemo kind="desktop" />
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            這五步不用終端機，後面也都用得上這個畫面。先讓你看到成果，其他的等有東西跑出來再說。
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

        {/*
          左側列的定位。學員一打開就看到這一排，沒人跟他說可以不管，
          他會以為那些是必經的步驟。只給「先不用管」與 Cowork 一句話的定位，
          展開是章節五的事。
        */}
        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left">
          <div className="text-base font-bold text-slate-100 mb-2">左邊那一排先不用管</div>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            打開之後左側會有一排 Projects、Artifacts、Scheduled、Design、Customize。
            <strong className="text-slate-300">那些是 Claude 對話那一側的功能，跟你現在要做的事沒有關係。</strong>
            要用到的時候會回來講。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">
            輸入框上還有一個 <strong className="text-slate-200">Chat ／ Cowork</strong> 的切換。
            Chat 是一般對話；Cowork 是讓它綁一個資料夾、自己跑比較長的工作，
            <strong className="text-slate-300">能讀能寫，但不執行指令</strong>。
            這門課走 Code，因為後面要跑的版本控制、驗收與部署，Cowork 做不到。
            三個地方的差別，章節五會攤開比一次。
          </p>
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={4}
          className="rounded-2xl border px-6 py-5 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]"
        >
          <div className="text-sky-400 font-bold text-base mb-2">這一格不是簡化版</div>
          <p className="text-slate-300 text-base leading-relaxed">
            桌面版的 Code 頁籤跟終端機是<strong className="text-slate-100">同一個 Claude Code</strong>，只是換了介面。
            你在這裡學的每一個操作，換到終端機都不用重學。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
