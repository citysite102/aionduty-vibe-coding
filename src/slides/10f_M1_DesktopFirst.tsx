import { AppWindow, FolderOpen, MessageSquare, Download } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 終端機安裝之前的入口頁。
 *
 * 桌面版的 Code 頁籤跟終端機是同一個 Claude Code，不是 Cowork。
 * 所以卡在安裝的人留在這裡也能把後面每一段走完，不必砍任何內容。
 */
const STEPS = [
  { icon: Download, label: '下載桌面版', desc: 'claude.ai 首頁就有，Mac 與 Windows 都能裝。' },
  { icon: AppWindow, label: '切到 Code 頁籤', desc: '上面有 Chat、Cowork、Code 三個，要開的是最右邊那個。' },
  { icon: FolderOpen, label: '選一個資料夾', desc: '它之後就在這個範圍裡讀寫，不會跑出去。' },
  { icon: MessageSquare, label: '講一句話', desc: '「幫我做一個五分鐘的計時器網頁。」然後看檔案真的長出來。' },
];

export default function SlideDesktopFirst() {
  return (
    <SlideLayout
      title="先用桌面版做出第一個東西"
      subtitle="Desktop First, Terminal Next"
      icon={AppWindow}
    >
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1}>
          <p className="text-slate-300 text-base leading-relaxed">
            終端機等一下就會裝。但先讓你看到成果，不然裝到一半卡住的人，不會知道自己在裝什麼。
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
          className="rounded-2xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-900 px-6 py-5"
        >
          <div className="text-sky-400 font-bold text-sm mb-2">這一格不是簡化版</div>
          <p className="text-slate-300 text-base leading-relaxed">
            桌面版的 Code 頁籤跟終端機是<strong className="text-slate-100">同一個 Claude Code</strong>，只是換了介面。
            同一份 CLAUDE.md、同一組斜線指令、一樣能跑測試與版本控制。旁邊的 Cowork 才是另一回事，那個之後會講。
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="rounded-2xl border border-slate-800 bg-slate-950 px-6 py-4">
          <p className="text-slate-400 text-sm leading-relaxed">
            所以等一下裝終端機如果卡住，不用急。留在這個頁籤，後面每一段都跑得動，回家再處理安裝就好。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
