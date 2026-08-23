import { Rocket, FolderPlus, FileText, ListChecks, LifeBuoy } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const STEPS: {
  icon: typeof FolderPlus;
  title: string;
  body: string;
  codeLabel?: string;
  code: string[] | null;
}[] = [
  {
    icon: FolderPlus,
    title: '1. 開一個資料夾，把它叫起來',
    body: '題目挑好之後，先開一個空資料夾放它。桌面版：開 Code 頁籤，選那個資料夾。終端機：cd 進去，輸入 claude。兩邊是同一個 Claude Code，挑你順手的那個。',
    codeLabel: '走終端機的話：',
    code: ['$ mkdir my-project && cd my-project', '$ claude']
  },
  {
    icon: FileText,
    title: '2. 第一件事不是寫功能，是寫規矩',
    body: '跟它說「請幫我建一份 CLAUDE.md」，內容三行就夠。之後每次進來它都會先讀。',
    code: ['- 一律用繁體中文回覆', '- 改任何檔案前先說你要改什麼', '- 每次改完，把功能自己點過一次再回報']
  },
  {
    icon: ListChecks,
    title: '3. 一次只交代一件事',
    body: '做完先看它改了哪幾行（問它，或打開 VS Code 左側的原始檔控制），確認沒問題再交代下一件。',
    code: null
  }
];

const STUCK = [
  { k: '它跑歪了', v: '按 Esc 停下來。想退回更早的狀態，輸入框空著時連按兩次 Esc。' },
  { k: '出現紅字', v: '整段複製貼回去，加一句「用白話解釋這在說什麼，我不看程式碼」。' },
  { k: '一直卡同一個問題', v: '不是它笨，是範圍太大。跟它說「先停，這輪只做某某一件事」。' }
];

export default function SlideFirstDay() {
  return (
    <SlideLayout
      title="新專案的前三個動作"
      subtitle="Your First Day After This Course"
      icon={Rocket}
    >
      <div className="max-w-6xl mx-auto text-left">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start">

          <div className="grid grid-cols-1 gap-4">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <AnimatedBlock
                  key={step.title}
                  stepIndex={idx + 1}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-4 items-start"
                >
                  <div className="p-2.5 bg-sky-500/10 text-sky-400 rounded-xl shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-slate-100 mb-1.5">{step.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
                    {step.codeLabel && (
                      <div className="text-xs text-slate-500 mt-3">{step.codeLabel}</div>
                    )}
                    {step.code && (
                      <div className={`bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 font-mono text-sm text-emerald-300 space-y-1 break-all ${step.codeLabel ? 'mt-1.5' : 'mt-3'}`}>
                        {step.code.map((line) => (
                          <div key={line}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>

          <AnimatedBlock stepIndex={4} className="bg-gradient-to-b from-slate-900 to-amber-950/20 border border-slate-800 rounded-2xl p-5">
            <h4 className="text-base font-bold text-amber-400 mb-4 flex items-center gap-2">
              <LifeBuoy size={18} />
              卡住的時候，三招
            </h4>
            <div className="space-y-3.5">
              {STUCK.map((s) => (
                <div key={s.k}>
                  <div className="text-sm font-bold text-slate-200 mb-0.5">{s.k}</div>
                  <div className="text-sm text-slate-400 leading-relaxed">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
              <div className="text-sm font-bold text-slate-200">額度好像快用完了</div>
              <p className="text-sm text-slate-400 leading-relaxed">
                輸入 <code className="text-orange-300 font-mono">/usage</code> 看還剩多少。
                快見底就先把手上這一輪收掉，不要在剩最後一點的時候開新的大工程。
              </p>
            </div>
          </AnimatedBlock>

        </div>
      </div>
    </SlideLayout>
  );
}
