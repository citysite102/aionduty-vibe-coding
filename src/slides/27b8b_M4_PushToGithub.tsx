import { CloudUpload, HardDrive, Laptop2, Send, Terminal } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';

/**
 * 出貨前的 GitHub 動機頁。
 *
 * GitHub 在這份簡報前面出現過三次（部署、版本控制、出貨的 prompt），
 * 但都沒有被定義。這一頁補上定義，下一頁補上判斷。
 */
const LOSSES = [
  { icon: HardDrive, t: '硬碟壞了', d: '整個專案跟著沒了，沒有第二份。' },
  { icon: Laptop2, t: '換一台電腦', d: '要自己複製資料夾，還常常漏東西。' },
  { icon: Send, t: '想傳給別人看', d: '總不能把整個資料夾壓縮寄過去。' },
];

export default function SlidePushToGithub() {
  return (
    <SlideLayout
      title="你的專案現在只活在這台電腦裡"
      subtitle="Push It to GitHub"
      icon={CloudUpload}
    >
      <LiveDemo kind="claude" note="跟著推一次" />
      <div className="max-w-5xl mx-auto w-full space-y-5 pb-8">
        <AnimatedBlock stepIndex={1} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LOSSES.map((l) => {
            const Icon = l.icon;
            return (
              <div key={l.t} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <Icon size={20} className="text-slate-500 mb-3" />
                <div className="text-slate-100 text-base font-bold mb-1.5">{l.t}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{l.d}</p>
              </div>
            );
          })}
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-slate-100 text-xl font-bold mb-3">GitHub 就是專案的線上存放處</h3>
          <p className="text-slate-400 text-base leading-relaxed mb-4">
            前面做的存檔點都還在你的電腦裡。推上 GitHub 之後，那些存檔點會有一份在雲端。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="text-slate-300 text-sm font-bold mb-1.5">用途一：備份與帶著走</div>
              <p className="text-slate-500 text-sm leading-relaxed">換電腦、找回舊版本、給別人看，都從這裡。</p>
            </div>
            <div className="rounded-xl border border-sky-500/30 bg-slate-950 p-4">
              <div className="text-sky-300 text-sm font-bold mb-1.5">用途二：部署平台從這裡拿程式</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                這才是你真的需要它的原因。Vercel 不是讀你的電腦，是讀 GitHub。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center gap-2 mb-3 text-slate-500 font-mono text-xs uppercase tracking-wider">
            <Terminal size={12} className="text-sky-400" /> Prompt
          </div>
          <p className="text-sky-300 text-base leading-relaxed">
            「幫我把這個專案推到 GitHub，設成 private。推之前先確認沒有把密碼或金鑰帶上去。」
          </p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="px-1">
          <p className="text-slate-400 text-base leading-relaxed">
            你不用打任何 git 指令。它會自己建好、推上去，然後把網址給你。桌面版的 Code 頁籤右下角也有按鈕可以按。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
