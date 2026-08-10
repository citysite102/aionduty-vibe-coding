import { Keyboard, FolderOpen, Undo2, Image as ImageIcon } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { hoverIsolateGrid, hoverIsolateCard } from '../components/hoverIsolate';

/**
 * 原本五個技巧混在一起，其中三個（Shift + Tab、!、Esc）是終端機的按鍵綁定，
 * 桌面版按了沒反應，所以這一頁得掛一段「用桌面版的人：! 是終端機版才有的」的但書。
 *
 * 終端機自成一段之後，那三個搬去 11d2_M1_TerminalKeys，這裡只留兩邊都成立的，
 * 但書也就跟著拿掉了。留下來的三個裡，@ 與貼圖是輸入框的行為，
 * /rewind 是指令不是按鍵，所以它在哪一種介面都打得出來。
 */
const TIPS = [
  {
    icon: FolderOpen,
    name: '檔案自動補全',
    key: '按 @ 鍵',
    body: (
      <>
        不必輸入完整路徑像{' '}
        <code className="font-mono text-slate-300">src/components/Button.tsx</code>。
        打一個 <code className="font-mono font-bold text-orange-300">@</code> 加上檔名，
        就會跳出選單讓你挑。
      </>
    ),
    note: null,
  },
  {
    icon: Undo2,
    name: '做壞了可以退回去',
    key: '/rewind',
    body: (
      <>
        會跳出一張清單，列出你這次對話送出過的每一句話。選一個時間點，
        就能把程式碼、對話、或兩者一起退回那個時候。
      </>
    ),
    note: '它只管得到 Claude 自己改的檔案。用指令刪掉、搬走的東西救不回來，所以動工前先存一次檔還是最保險。',
  },
  {
    icon: ImageIcon,
    name: '直接把畫面貼給它看',
    key: 'Cmd + V ／ Ctrl + V',
    body: (
      <>
        把壞掉的畫面或設計稿截圖起來，在輸入框直接貼上，它會照著圖改。
        <strong className="text-slate-300"> 不用形容，給它看比較快。</strong>
      </>
    ),
    note: null,
  },
];

export default function SlideClaudeShortcuts() {
  return (
    <SlideLayout
      title="Claude Code 核心按鍵與技巧"
      subtitle="Keyboard Shortcuts & Tips"
      icon={Keyboard}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto mt-2 items-stretch text-left pb-6">

        <div className="lg:col-span-4 flex flex-col">
          <AnimatedBlock
            stepIndex={1}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full flex flex-col justify-center"
          >
            <h3 className="text-xl font-bold text-slate-100 mb-3 leading-snug">
              這三個，
              <br />
              一般的聊天對話框都沒有
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              它們各自解掉一件事：不用打完整路徑、做壞了可以退回去、有話直接貼圖給它看。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3 mt-4">
              桌面版跟終端機都適用。找不到的時候打{' '}
              <code className="font-mono text-orange-300">/help</code> 看一次，
              提示的位置兩邊不太一樣。
            </p>
          </AnimatedBlock>
        </div>

        <div className="lg:col-span-8">
          <div className={`grid grid-cols-1 gap-4 ${hoverIsolateGrid}`}>
            {TIPS.map((t, i) => {
              const Icon = t.icon;
              return (
                <AnimatedBlock
                  key={t.name}
                  stepIndex={i + 2}
                  className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 flex gap-4 items-start ${hoverIsolateCard}`}
                >
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                    <Icon size={22} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h4 className="text-base font-bold text-slate-100">{t.name}</h4>
                      <code className="font-mono text-sm font-bold text-orange-300 bg-orange-500/10 px-2 py-0.5 rounded">
                        {t.key}
                      </code>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{t.body}</p>
                    {t.note && (
                      <p className="text-sm text-slate-500 leading-relaxed mt-1.5">{t.note}</p>
                    )}
                  </div>
                </AnimatedBlock>
              );
            })}
          </div>
        </div>

      </div>
    </SlideLayout>
  );
}
