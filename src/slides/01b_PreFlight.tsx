import { PackageCheck, MonitorDown, CreditCard, GitBranch, SquareTerminal, Github, Image } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 課前準備。放在封面之後，講者可以直接截這一頁發出去當行前通知。
 *
 * 每一項都寫「它是拿來做什麼的」，不只是列名字。學員回頭翻講義的時候，
 * 需要知道的是為什麼要裝它，不是「老師叫我裝」。
 *
 * 這份清單走桌面版路線，所以沒有 VS Code 與 Node.js：那兩個是終端機那條路
 * 才需要的，安裝那一頁會另外講。列進來只會讓還沒開始的人先被勸退。
 *
 * GitHub 是課後回饋加上去的。有人整段時間卡在 GitHub 建置，
 * 而它到出貨那一段一定會用到，帳號本身免費。
 */
const REQUIRED = [
  {
    icon: MonitorDown,
    name: 'Claude Desktop',
    where: 'claude.com/download',
    href: 'https://claude.com/download',
    why: 'Mac 與 Windows 都能裝。整門課的操作都在它上面，第一個作品也是從這裡做出來的。',
  },
  {
    icon: CreditCard,
    name: '付費的 Claude 帳號',
    where: 'Pro 月費 $20 起，或到 Console 儲值，最低 $5',
    href: 'https://claude.ai',
    why: '沒有額度，Claude Code 跑不動。兩種付法都可以，先有一種就行。',
  },
  {
    icon: GitBranch,
    name: 'Git',
    where: 'git-scm.com/downloads',
    href: 'https://git-scm.com/downloads',
    why: '一路按下一步就好，裝完不用開它。後面存檔跟上線的時候，Claude 會自己用到。',
  },
  {
    icon: Github,
    name: 'GitHub 帳號',
    where: 'github.com，帳號免費',
    href: 'https://github.com',
    why: '作品要上線的話，程式碼會先送到這裡，部署平台再從這裡拿。',
  },
];

/**
 * 選擇性的兩樣。Pinterest 在這裡不是設計工具，是「拿圖給它看」的來源：
 * 這門課教的講清楚方法之一就是不要用形容詞描述畫面，直接給參考圖。
 * 沒有帳號也能看，但存不了自己的板，臨時要找就會翻很久。
 */
const OPTIONAL = [
  {
    icon: SquareTerminal,
    name: 'Warp',
    where: 'warp.dev',
    href: 'https://www.warp.dev',
    why: '比系統內建好用的終端機。終端機那一段會用到，不裝也走得完，用內建的就可以。',
  },
  {
    icon: Image,
    name: 'Pinterest 帳號',
    where: 'pinterest.com，帳號免費',
    href: 'https://www.pinterest.com',
    why: '把喜歡的版面存成一個板，做畫面的時候直接把圖丟給它說「照這個感覺」，比用形容詞描述準。',
  },
];

export default function SlidePreFlight() {
  return (
    <SlideLayout title="動手之前，先準備這幾樣" subtitle="Before You Start" icon={PackageCheck}>
      <div className="max-w-5xl mx-auto space-y-3 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          四樣要先有，都是幾分鐘就能弄好的事，但<strong className="text-slate-100">帳號要收驗證信、安裝檔要下載</strong>，臨時處理就會卡在這裡。
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={2}
          className="rounded-2xl border border-slate-800 bg-slate-900 divide-y divide-slate-800"
        >
          {REQUIRED.map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.name} className="flex items-start gap-4 px-6 py-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-base font-bold text-slate-100">{r.name}</span>
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm text-sky-400 hover:underline"
                    >
                      {r.where}
                    </a>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mt-1">{r.why}</p>
                </div>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock
          stepIndex={3}
          className="rounded-2xl border border-slate-800 bg-slate-950 divide-y divide-slate-800"
        >
          {OPTIONAL.map((o) => {
            const Icon = o.icon;
            return (
              <div key={o.name} className="flex items-start gap-4 px-6 py-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-400">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-base font-bold text-slate-300">{o.name}</span>
                    <a
                      href={o.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-sm text-slate-400 hover:underline"
                    >
                      {o.where}
                    </a>
                    <span className="text-xs text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">選擇性</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mt-1">{o.why}</p>
                </div>
              </div>
            );
          })}
        </AnimatedBlock>

        <Callout
          tone="muted"
          stepIndex={4}
          footnote={
            <>
              課程工具箱（Prompt 組裝、
              <code className="font-mono text-orange-300">CLAUDE.md</code> 產生、終端機沙盒）：
              <span className="font-mono text-slate-300 break-all">
                {' '}
                citysite102.github.io/aionduty-vibe-coding/tools/
              </span>
            </>
          }
        >
          桌面版與 Git 都要安裝權限，公司配的電腦常常裝不了。
          先試裝一次，裝不起來就換自己的電腦。
        </Callout>

      </div>
    </SlideLayout>
  );
}
