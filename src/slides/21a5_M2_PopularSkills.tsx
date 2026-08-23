import { Sparkles, Flame, FileText, Palette, FlaskConical, Puzzle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const MORE_SKILLS = [
  {
    icon: FileText,
    name: '文件處理',
    tag: 'pdf / docx / xlsx / pptx',
    desc: '讓 Agent 直接讀寫與產出 PDF、Word、Excel、簡報，不用自己另存另貼。',
    color: 'sky',
  },
  {
    icon: Palette,
    name: '前端設計',
    tag: 'frontend-design',
    desc: '避開一眼就看出是 AI 做的那種畫面：預設字體、紫色漸層、千篇一律的版型。裝上之後它會先給你幾個方向挑，而不是直接套一套模板。',
    color: 'emerald',
  },
  {
    icon: FlaskConical,
    name: '網頁測試',
    tag: 'webapp-testing',
    desc: '自動開瀏覽器點來點去，驗證你的網頁功能真的能跑。',
    color: 'indigo',
  },
];

const COLOR_MAP: Record<string, string> = {
  sky: 'text-slate-400 bg-slate-800/60 border-slate-700',
  emerald: 'text-slate-400 bg-slate-800/60 border-slate-700',
  indigo: 'text-slate-400 bg-slate-800/60 border-slate-700',
};

export default function SlidePopularSkills() {
  return (
    <SlideLayout title="四個常用的 Skills" subtitle="Popular Skills to Install" icon={Sparkles}>
      <div className="flex flex-col gap-5 max-w-6xl mx-auto w-full pb-8">

        {/* 這一頁從 M4 搬到 M2 的 Skill 那一段：講完怎麼裝，接著就是裝什麼。 */}
        <AnimatedBlock stepIndex={1} className="w-full">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-left">
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-sky-400">Skill 就是「把一套做法打包好，裝上就能用」。</strong>
              需要時才載入，
              這四個是最常被裝的，前面那三種裝法隨便挑一種都裝得起來。
            </p>
          </div>
        </AnimatedBlock>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* HERO: Grill Me */}
          <AnimatedBlock stepIndex={2} className="lg:col-span-5 flex">
            <div className="bg-gradient-to-b from-sky-950/30 to-slate-900 border border-sky-900/40 rounded-3xl p-6 shadow-xl relative overflow-hidden w-full flex flex-col text-left">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-sky-500/15 border border-sky-500/30 rounded-full text-xs font-mono text-sky-400 font-bold tracking-wider uppercase">
                  動工前先問清楚
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0">
                  <Flame size={26} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100">Grill Me</h3>
                  <p className="text-xs font-mono text-slate-500">by @mattpocock</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                與其自己憋出一份完整規格，不如讓它<strong className="text-sky-300">「烤問」你</strong>：動工前把你的計畫拆成一棵決策樹，逐一逼你把還沒想清楚的地方講明白。
              </p>

              <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl px-3 py-2.5 mb-3 font-mono text-xs text-emerald-400">
                $ npx skills add mattpocock/skills --skill=grill-me
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2 mb-3">
                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">它一次只問一題，而且附上自己的建議</div>
                <div className="text-sm leading-relaxed space-y-1.5">
                  <p className="text-slate-300"><span className="text-sky-400 font-mono">Q.</span> 倒數中途按「返航」，這一趟要算完成還是放棄？</p>
                  <p className="text-slate-500 pl-4">我的建議：記成未完成，但仍留下紀錄，這樣你才看得出放棄率。</p>
                </div>
              </div>

              <div className="mt-auto space-y-1.5 text-sm text-slate-400 leading-relaxed">
                <p>• <strong className="text-slate-300">一次一題，等你答完才問下一題。</strong></p>
                <p>• <strong className="text-slate-300">能自己查的它就去查，只把「決定」留給你。</strong></p>
                <p>• 你沒說「我們有共識了」之前，它不會動手寫任何東西。</p>
                <p>• 要自己打 <code className="text-orange-300">/grill-me</code> 才會啟動，它不會自己跳出來煩你。</p>
              </div>
            </div>
          </AnimatedBlock>

          {/* MORE popular skills */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {MORE_SKILLS.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <AnimatedBlock key={skill.name} stepIndex={3 + idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left flex flex-1 items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${COLOR_MAP[skill.color]}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2.5 mb-1 flex-wrap">
                      <h4 className="text-base font-bold text-slate-100">{skill.name}</h4>
                      <code className="text-xs font-mono text-orange-400/90">{skill.tag}</code>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </AnimatedBlock>
              );
            })}

            <AnimatedBlock stepIndex={6} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left flex items-start gap-3 mt-auto">
              <Puzzle size={18} className="text-slate-500 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                挑選原則很單純：<strong className="text-slate-300">哪件事你常做又懶得每次交代，就找一個 Skill 幫你固定下來。</strong>
              </p>
            </AnimatedBlock>
          </div>

        </div>

      </div>
    </SlideLayout>
  );
}
