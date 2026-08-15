import { FolderGit2, FilePlus2, PackageCheck, Save } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 這一頁原本右半邊是一個時間驅動的時光機動畫：三個 commit 點各自 delay 0.5、1.1、1.7
 * 冒出來，2.4 秒畫出分支線，2.8 秒跳出提示框，全程跑將近三秒。
 * 那違反 A-3（節奏要由 currentStep 決定，不是由時間），而且講者講到一半它自己演完了。
 * 換成靜態的三段流程，由 stepIndex 帶。
 *
 * 補上 git add 是因為它是「暫存區」存在的理由：不是資料夾裡每個檔案都會被存進去，
 * 你要先挑。這一點後面 .gitignore 擋金鑰那一頁才接得上，沒有 add 的概念，
 * 「為什麼有些東西不會被推上去」就沒有著力點。
 *
 * 三個動作是同一條流程上的三站，不是三個平等選項，所以只有 add 上 sky，
 * 其餘灰階。原本 Commit 綠、Branch 藍、Push 藍是 A-1 禁的項目編號配色。
 */
const FLOW = [
  {
    icon: FilePlus2,
    cmd: 'git init',
    zh: '開始記錄這個資料夾',
    body: '只做一次。從這一刻起，這個資料夾裡的變動都會被記下來。',
    accent: false,
  },
  {
    icon: PackageCheck,
    cmd: 'git add',
    zh: '挑出這次要存的檔案',
    body: '這一步最容易被跳過，但它是關鍵：資料夾裡的東西不會全部被存進去，你要先挑。挑好的先放在一個中繼的位置，還沒真的存檔。',
    accent: true,
  },
  {
    icon: Save,
    cmd: 'git commit',
    zh: '把挑好的打包成一個存檔點',
    body: '寫一句話說明這次改了什麼，這個點就固定下來了，之後隨時回得來。',
    accent: false,
  },
];

export default function Slide10e() {
  return (
    <SlideLayout title="用 Git 存檔，改壞了可以回去" subtitle="Version Control" icon={FolderGit2}>
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          以前你可能會把檔案存成{' '}
          <code className="font-mono text-slate-200">報告_final_v2_真的最後版.docx</code>。
          <strong className="text-slate-100">Git 就是把這件事做對的版本</strong>：
          它幫你記下每一次的修改，你隨時可以回到任何一個時間點。
        </AnimatedBlock>

        {/* 三站流程。橫向的箭頭只在寬螢幕出現，窄螢幕就變成上下堆疊。 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FLOW.map((f, i) => {
            const Icon = f.icon;
            return (
              <AnimatedBlock
                key={f.cmd}
                stepIndex={i + 2}
                className={`rounded-2xl border p-5 flex flex-col ${
                  f.accent
                    ? 'bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      f.accent ? 'bg-sky-500/15 text-sky-400' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-sm text-slate-200">{f.cmd}</div>
                    <div className="text-xs text-slate-500">第 {i + 1} 站</div>
                  </div>
                </div>
                <div className="text-slate-100 text-base font-bold leading-snug mb-1.5">{f.zh}</div>
                <p className="text-slate-400 text-sm leading-relaxed">{f.body}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="為什麼要有中間那一站" stepIndex={5}>
          因為<strong className="text-slate-100">有些東西你不想存進去</strong>：金鑰、密碼、一堆暫存檔。
          先挑再存，你才有機會把它們擋在外面。
          <span className="text-slate-400"> 實際上你不會自己打這三行，跟 Claude 說「幫我存一個檔，說明寫某某」它就會做完，但它挑了哪些檔案是你要看的。</span>
        </Callout>

        <AnimatedBlock stepIndex={6} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 space-y-3">
          <div>
            <div className="text-base font-bold text-slate-100 mb-1.5">存的不只是程式碼</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Git 記的是「這個資料夾裡的文字檔，每一版長什麼樣」。所以你之後寫的{' '}
              <code className="font-mono text-orange-300">CLAUDE.md</code>、自己搭的運作框架、Skill 與子代理的設定檔，全都會一起被記下來。
            </p>
          </div>
          <div className="border-t border-slate-800 pt-3">
            <div className="text-base font-bold text-slate-100 mb-1.5">為什麼要留著這些紀錄</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              規矩會越改越多，總有一次會改壞。有紀錄，你查得到是哪一次改的、那一次改了什麼、跟現在差在哪，然後退回上一版。
              沒紀錄，你只能靠印象猜自己上禮拜寫了什麼。
            </p>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-800 pt-3">
            另外會看到 <span className="font-mono text-slate-400">branch</span>（分支）這個字，
            意思是從主線分出一條獨立的線去試新東西，搞砸了也不影響主線。這門課用不到，看到的時候知道是這個意思就好。
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
