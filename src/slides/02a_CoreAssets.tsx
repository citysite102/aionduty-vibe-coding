import { Package, BookMarked, Rocket, Wrench, Globe, FileText, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁在賣的是「你會帶走什麼」，所以每一張卡的重點不是描述，是那個東西長什麼樣。
 * 三張卡最下面那一格是同一個位置、同一種處理：拿到手的東西。
 * 前兩項本來就指得出來（一組網址、一個檔案），第三項原本寫「一套做法」，
 * 學員無從判斷自己有沒有拿到，所以補上它真正的落點：那個審查角色的檔案。
 *
 * 「修到測試過」也拿掉了。整堂課沒有人寫過一個測試，那是驗證不是測試。
 */
const assets = [
  {
    icon: Rocket,
    num: '1',
    title: '一個真的上線、有網址可以瀏覽的作品',
    desc: '一個任務計時器。從第一行程式碼開始，一路做到部署上線，拿到一組託管平台給你的網址。',
    haveIcon: Globe,
    haveLabel: '一組網址',
    haveDir: null,
    have: 'mission-timer.vercel.app',
    note: '對方不用裝任何東西，打開瀏覽器就看得到。',
  },
  {
    icon: BookMarked,
    num: '2',
    title: '專案專屬的 AI 指導手冊',
    desc: '把專案的規範與慣例寫成一份檔案，每次開新對話它都會自動讀到，你不用再重講一遍。',
    haveIcon: FileText,
    haveLabel: '一個檔案',
    haveDir: 'mission-timer/',
    have: 'CLAUDE.md',
    note: '檔案跟著專案走，換一台電腦、隔三個月回來，它都還在。',
  },
  {
    icon: Wrench,
    num: '3',
    title: '一套讓 AI 自己驗、自己修的做法',
    desc: '你寫清楚什麼叫做完，它自己驗、沒過自己修，全過了才回來找你。再配一個只負責挑錯的審查角色。',
    haveIcon: ShieldCheck,
    haveLabel: '一個角色',
    haveDir: '.claude/agents/',
    have: 'code-reviewer.md',
    note: '把關的標準寫在檔案裡，所以把關的人不必一直是你。',
  },
];

export default function SlideCoreAssets() {
  return (
    <SlideLayout title="學完帶走的 3 大核心資產" subtitle="What You'll Walk Away With" icon={Package}>
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col justify-center pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed mb-5">
          一天結束，你手上會多出三樣東西。
          <strong className="text-slate-100">三樣都打得開、指得出來</strong>，不是「我好像懂了」。
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {assets.map((a, i) => {
            const Icon = a.icon;
            const HaveIcon = a.haveIcon;
            return (
              <AnimatedBlock
                key={a.num}
                stepIndex={i + 2}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col text-left overflow-hidden hover:border-slate-700 transition-colors"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                      資產 0{a.num}
                    </span>
                    <span className="ml-auto font-mono text-3xl font-black leading-none text-slate-800 select-none">
                      0{a.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-3 leading-snug">{a.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{a.desc}</p>

                  <div className="mt-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                    <div className="flex items-center gap-2 mb-2.5">
                      <HaveIcon aria-hidden="true" size={14} className="text-sky-400 shrink-0" />
                      <span className="font-mono text-xs uppercase tracking-widest text-sky-400">
                        帶走的是 {a.haveLabel}
                      </span>
                    </div>
                    <div className="font-mono text-sm leading-relaxed break-all">
                      {a.haveDir && <div className="text-slate-500">{a.haveDir}</div>}
                      <div className="text-slate-200">{a.have}</div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800">
                      {a.note}
                    </p>
                  </div>
                </div>
              </AnimatedBlock>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
