import { Package, BookMarked, Rocket, Users, Globe, FileText, ShieldCheck } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

/**
 * 這一頁在賣的是「你會帶走什麼」。三張卡的結構是「能力 ＋ 那個能力的證據」：
 * 標題寫你因此會做什麼，最下面那一格寫它換來的那個打得開的檔案。
 *
 * 2026-09-20 改成這個結構，之前是標題與底下那一格都在講同一個產物
 * （標題「一個真的上線、有網址可以瀏覽的作品」／底格「一組網址」），
 * 同一件事在同一張卡講兩次，所以半張卡是空的，整頁讀起來像只帶走三個檔案。
 * 只講能力會掉回 D-2 的空心詞（「知道流程」學員驗不了），只講檔案就是上面那個問題，
 * 所以兩個都要留，而且順序是能力在前、證據在後。**不要把標題改回產物名稱。**
 *
 * 卡 01 的流程只能寫畫面、資料、版本控制、部署。計時器沒有後端，
 * 前後端資料庫是章節三教的知識，不是這個作品走過的路，寫進去就是過度承諾。
 *
 * 「修到測試過」早先也拿掉了。整堂課沒有人寫過一個測試，那是驗證不是測試。
 */
const assets = [
  {
    icon: Rocket,
    num: '1',
    title: '走完一次從需求到上線的完整流程',
    desc: '一個任務計時器，從一句需求做到部署上線。畫面、資料怎麼存、每一版怎麼留、怎麼送上網路，你都實際走過一次。',
    haveIcon: Globe,
    haveLabel: '一組網址',
    haveDir: null,
    have: 'mission-timer.vercel.app',
    note: '東西壞掉的時候，你知道要去哪一層找。',
  },
  {
    icon: BookMarked,
    num: '2',
    title: '把規範與限制寫成它讀得到的規則',
    desc: '哪些不准用、按鈕要用哪一組詞、設定要集中放哪裡。腦子裡的規則寫成檔案，而且寫成驗得出來的樣子。',
    haveIcon: FileText,
    haveLabel: '一個檔案',
    haveDir: 'mission-timer/',
    have: 'CLAUDE.md',
    note: '檔案跟著專案走，換一台電腦、隔三個月回來，它都還在。',
  },
  {
    icon: Users,
    num: '3',
    title: '讓做的人跟驗的人分開',
    desc: '你寫清楚什麼叫做完，主要那個 Agent 動手，換另一個角色來審，而且那個角色只准挑錯、不准自己改。',
    haveIcon: ShieldCheck,
    haveLabel: '一個角色',
    haveDir: '.claude/agents/',
    have: 'code-reviewer.md',
    note: '把關的標準寫在檔案裡，所以把關的人不必一直是你。',
  },
];

export default function SlideCoreAssets() {
  return (
    <SlideLayout title="帶走流程、規範、分工與交付成果" subtitle="What You'll Walk Away With" icon={Package}>
      <div className="max-w-6xl mx-auto w-full min-h-full flex flex-col justify-center pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed mb-5">
          整門課走完，下面這三件事你都會做。
          每一件底下那一格，<strong className="text-slate-100">是做完之後手上真的多出來的東西</strong>。
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
