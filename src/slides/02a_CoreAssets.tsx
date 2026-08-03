import { Package, BookMarked, Rocket, Wrench } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const assets = [
  {
    icon: Rocket,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    num: '1',
    title: '一個真的上線、有網址可以傳的作品',
    desc: '一個任務計時器。從第一行程式碼開始，一路做到部署上線，拿到一組託管平台給你的網址，直接傳給別人就能打開。這堂課結束時它會是你的，不是講義上的範例。',
  },
  {
    icon: BookMarked,
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    num: '2',
    title: '專案專屬「AI 指導手冊 (CLAUDE.md)」',
    desc: '把專案的規範與慣例寫成一份檔案，每次開新對話它都會自動讀到，你不用再重講一遍。',
  },
  {
    icon: Wrench,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    num: '3',
    title: '一套讓 AI 自己修錯的做法',
    desc: '學會怎麼引導 AI「自己看報錯、自己修、修到測試過」，你負責的是把關品質，不是動手。',
  },
];

export default function SlideCoreAssets() {
  return (
    <SlideLayout title="學完帶走的 3 大核心資產" subtitle="What You'll Walk Away With" icon={Package}>
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {assets.map((a, i) => {
            const Icon = a.icon;
            return (
              <AnimatedBlock
                key={a.num}
                stepIndex={i + 1}
                className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col text-left overflow-hidden hover:border-slate-700 transition-colors"
              >
                {/* 巨大浮水印編號，填滿垂直空間並凸顯序號 */}
                <span className="absolute -right-3 -bottom-8 text-[11rem] font-black text-slate-800/50 leading-none select-none pointer-events-none">
                  {a.num}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-xl ${a.bg} ${a.color}`}>
                      <Icon size={28} />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500">
                      資產 0{a.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 mb-4 leading-snug">{a.title}</h3>
                  <p className="text-slate-400 text-[15px] leading-relaxed">{a.desc}</p>
                </div>
              </AnimatedBlock>
            );
          })}
        </div>
      </div>
    </SlideLayout>
  );
}
