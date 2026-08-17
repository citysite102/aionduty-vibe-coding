import React, { Fragment, useState } from 'react';
import { motion } from 'motion/react';
import {
  MousePointerClick,
  FilePenLine,
  PackageCheck,
  Save,
  UploadCloud,
  DownloadCloud,
  RotateCcw,
  History,
} from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';
import {
  PixelArt,
  PX_FOLDER,
  PX_TRAY,
  PX_DISK,
  PX_SERVER,
  PX_ARROW_RIGHT,
  PX_ARROW_LEFT,
  PX_FILE,
} from '../components/PixelArt';

/**
 * 前一頁講的是為什麼要有版本紀錄、Git 記了哪些東西，一個操作指令都不列。
 * 怎麼運作整段歸這一頁：四個區域擺在畫面上，按指令就看東西往前走。
 * 這樣切是因為原本兩頁都在講 add 與 commit，互換位置讀起來沒差別（B-5）。
 *
 * 這一頁吃掉了原本的 10e2_M1_GitRemote（本機 vs 遠端）。那一頁是靜態示意圖，
 * 講的是同一條路線的後半段，兩頁並排會變成「同一張圖畫兩次」。合併之後
 * 一條線從資料夾走到 GitHub，push 那一段才看得出來是同一條路上的最後一站。
 * 原本那頁最重要的一句「commit 一百次，沒有 push，備份份數還是零」搬到下面的 Callout。
 *
 * 實際推上去的操作與「為什麼需要 GitHub」是第四單元 27b8b_M4_PushToGithub 的職務，
 * 這裡只講機制，不重複。
 *
 * 互動不違反 A-2：那條規範禁的是 setTimeout 自己跳，這裡每一次變化都是使用者按出來的。
 * 檔案在欄與欄之間的位移用 motion 的 layoutId 接手，只有按下去的那一刻會動，沒有常駐動畫。
 */

type FileState = 'clean' | 'modified' | 'staged';

/** 會被 Git 記錄的檔案。順序就是「你改了一個檔案」按下去的順序。 */
const TRACKED = ['index.html', 'style.css', 'app.js'] as const;

/** 每次 commit 依序拿一句說明，不要每次都寫「更新」。 */
const MESSAGES = ['做出倒數的畫面', '換掉按鈕的顏色', '修好時間歸零的問題', '補上休息模式'];

type Zone = 'work' | 'stage' | 'repo' | 'remote';

type Note = { cmd: string; text: string; zone: Zone };

/**
 * 顏色講的是同一件事：這個東西進版本紀錄了沒有。
 *
 *   amber    工作目錄與暫存區。還沒固定，這時候改壞了就回不去
 *   emerald  本機存檔點與遠端。已經是一個版本，回得來
 *
 * 這是 A-1 認可的正反對照用法，剛好兩個色相。刻意不做成「一區一色」：
 * 那是 A-1 明文禁的項目編號用法，而且四區永遠都亮著的話，「你剛剛按的是這一區」
 * 就沒有底可以襯，這一頁的互動就白做了。所以作用中的那一區不換色，是同色轉亮加光暈。
 *
 * 本機與遠端同樣是 emerald，它們的差別不用第三個色相，用中間那條虛線分開，
 * 再靠下面的說明帶講清楚。這一頁真正的分水嶺是 commit（沒存 → 存了），
 * push 是同一側的第二段，用色相拉開反而會讓人以為那是另一種東西。
 *
 * .env 不上 amber。amber 在這一頁的意思是「還沒存」，但 .env 是永遠不存，
 * 染上去會讀成「它等一下會被存進去」，剛好相反。維持灰階，靠文字說明。
 */
const TONES = {
  amber: {
    frame: 'border-amber-500/20 bg-amber-500/[0.04]',
    active: 'border-amber-500/50 bg-amber-500/10 shadow-[0_0_36px_-14px_rgba(245,158,11,0.55)]',
    iconIdle: 'border-amber-500/20 bg-amber-500/10 text-amber-400/70',
    iconActive: 'border-amber-500/40 bg-amber-500/20 text-amber-200',
    label: 'text-amber-200',
    lit: 'text-amber-300',
  },
  emerald: {
    frame: 'border-emerald-500/20 bg-emerald-500/[0.04]',
    active: 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_36px_-14px_rgba(16,185,129,0.55)]',
    iconIdle: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400/70',
    iconActive: 'border-emerald-500/40 bg-emerald-500/20 text-emerald-200',
    label: 'text-emerald-200',
    lit: 'text-emerald-300',
  },
} as const;

const ZONES: {
  id: Zone;
  pixel: readonly string[];
  label: string;
  en: string;
  hint: string;
  tone: keyof typeof TONES;
  dashed?: boolean;
}[] = [
  {
    id: 'work',
    pixel: PX_FOLDER,
    label: '工作目錄',
    en: 'Working Directory',
    hint: '你打得開的資料夾。改動都先落在這裡。',
    tone: 'amber',
  },
  {
    id: 'stage',
    pixel: PX_TRAY,
    label: '暫存區',
    en: 'Staging Area',
    hint: '這次要存哪幾個，先挑到這裡。',
    tone: 'amber',
    dashed: true,
  },
  {
    id: 'repo',
    pixel: PX_DISK,
    label: '本機存檔點',
    en: 'Local Repository',
    hint: '固定下來的版本，在你電腦的 .git 裡。',
    tone: 'emerald',
  },
  {
    id: 'remote',
    pixel: PX_SERVER,
    label: '遠端',
    en: 'Remote / GitHub',
    hint: 'GitHub 上的複本。部署平台讀的是它，不是你的電腦。',
    tone: 'emerald',
  },
];

/**
 * 三個交界，各自由哪一個指令跨過去。
 * repo 到 remote 那一格額外加虛線側框：那條線分開的是「你的電腦」與「網路上」，
 * 性質跟前面兩個交界不一樣，前兩個都還在同一台機器裡。
 */
const CROSSINGS: {
  after: Zone;
  cmd: string;
  tone: keyof typeof TONES;
  back?: string;
}[] = [
  { after: 'work', cmd: 'git add', tone: 'amber' },
  { after: 'stage', cmd: 'git commit', tone: 'emerald' },
  { after: 'repo', cmd: 'git push', tone: 'emerald', back: 'git pull' },
];

const CLEAN: Record<string, FileState> = {
  'index.html': 'clean',
  'style.css': 'clean',
  'app.js': 'clean',
};

/**
 * 一個檔案的膠囊。layoutId 讓它在欄與欄之間換位置時自己滑過去。
 * 底一律用 slate-950，因為它會疊在 amber 的區塊底色上，同色淺底會糊在一起。
 *
 * Chip 與 CommitNode 一定要放在元件外面。寫在 Slide10e1 的函式體裡的話，
 * 每次 setState 都會產生一個「新的元件型別」，React 會把整批膠囊卸載再重掛，
 * 於是按一下「你改了一個檔案」，工作目錄裡三個檔案會從上到下重播一次進場動畫，
 * 存檔點那幾格也會整排重新淡入。搬到模組層之後型別固定，key 又是穩定的檔名，
 * 只有真的換欄的那一個會動。
 */
const Chip = ({ name, tone }: { key?: React.Key; name: string; tone: 'idle' | 'dirty' }) => (
  <motion.div
    layoutId={`file-${name}`}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className={`flex items-center gap-2 border-2 bg-slate-950 px-2 py-1 font-mono text-sm ${
      tone === 'dirty' ? 'border-amber-500/50 text-amber-200' : 'border-slate-800 text-slate-400'
    }`}
  >
    <PixelArt grid={PX_FILE} size={13} className="shrink-0" />
    {name}
  </motion.div>
);

/** 一個存檔點。本機那欄印全部，遠端那欄只印推過的。 */
const CommitNode = ({ c }: { key?: React.Key; c: { id: number; msg: string } }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="border-2 border-emerald-500/25 bg-slate-950 px-2 py-1"
  >
    <div className="flex items-baseline gap-1.5 min-w-0">
      <span className="font-mono text-xs text-emerald-400 shrink-0">c{c.id}</span>
      <span className="text-slate-300 text-sm truncate">{c.msg}</span>
    </div>
  </motion.div>
);

export default function Slide10e1() {
  const [states, setStates] = useState<Record<string, FileState>>(CLEAN);
  const [commits, setCommits] = useState<{ id: number; msg: string; count: number }[]>([]);
  /** 已經送上遠端的存檔點數量。本機永遠是全部，遠端只有推過的那幾個。 */
  const [pushed, setPushed] = useState(0);
  const [note, setNote] = useState<Note | null>(null);

  const modified = TRACKED.filter((f) => states[f] === 'modified');
  const staged = TRACKED.filter((f) => states[f] === 'staged');
  const clean = TRACKED.filter((f) => states[f] === 'clean');
  const unpushed = commits.length - pushed;

  const edit = () => {
    const target = clean[0];
    if (!target) return;
    setStates((s) => ({ ...s, [target]: 'modified' }));
    setNote({
      cmd: `你改了 ${target}`,
      zone: 'work',
      text: 'Git 看得到這個改動，但還沒把它算進下一次存檔。這個狀態叫「已修改」。',
    });
  };

  const add = () => {
    if (!modified.length) return;
    setStates((s) => {
      const next = { ...s };
      modified.forEach((f) => (next[f] = 'staged'));
      return next;
    });
    setNote({
      cmd: 'git add',
      zone: 'stage',
      text: `${modified.length} 個改過的檔案進了暫存區。這一步還沒存檔，只是圈出這次要存哪幾個。.env 沒被撿走，因為 .gitignore 擋著。`,
    });
  };

  const commit = () => {
    if (!staged.length) return;
    const msg = MESSAGES[commits.length % MESSAGES.length];
    setCommits((c) => [...c, { id: c.length + 1, msg, count: staged.length }]);
    setStates((s) => {
      const next = { ...s };
      staged.forEach((f) => (next[f] = 'clean'));
      return next;
    });
    setNote({
      cmd: 'git commit',
      zone: 'repo',
      text: `暫存區清空，打包成一個存檔點，附上一句「${msg}」。這個版本固定住了，隨時回得來，但它只存在你這台電腦上。`,
    });
  };

  const push = () => {
    if (!unpushed) return;
    setPushed(commits.length);
    setNote({
      cmd: 'git push',
      zone: 'remote',
      text: `${unpushed} 個存檔點送上 GitHub。到這一步才有第二份，這台電腦壞掉不會全部消失。`,
    });
  };

  const pull = () => {
    setNote({
      cmd: 'git pull',
      zone: 'repo',
      text: '把遠端有、你電腦上還沒有的東西拿回來。這裡只有你一個人在改，所以是空的。換一台電腦接手、或有人跟你一起做，才會用到它。',
    });
  };

  const restore = () => {
    if (!modified.length) return;
    setStates((s) => {
      const next = { ...s };
      modified.forEach((f) => (next[f] = 'clean'));
      return next;
    });
    setNote({
      cmd: 'git restore .',
      zone: 'work',
      text: commits.length
        ? '還沒挑進暫存區的修改全部丟掉，檔案回到上一個存檔點的樣子。已經 commit 過的東西不受影響。'
        : '還沒挑進暫存區的修改全部丟掉。這裡還沒有存檔點，所以退回去的是最初的樣子。',
    });
  };

  const reset = () => {
    setStates(CLEAN);
    setCommits([]);
    setPushed(0);
    setNote(null);
  };

  const BUTTONS = [
    { icon: FilePenLine, label: '你改了一個檔案', mono: false, run: edit, on: clean.length > 0 },
    { icon: PackageCheck, label: 'git add', mono: true, run: add, on: modified.length > 0 },
    { icon: Save, label: 'git commit', mono: true, run: commit, on: staged.length > 0 },
    { icon: UploadCloud, label: 'git push', mono: true, run: push, on: unpushed > 0 },
    { icon: DownloadCloud, label: 'git pull', mono: true, run: pull, on: true },
    { icon: RotateCcw, label: 'git restore .', mono: true, run: restore, on: modified.length > 0 },
  ];

  return (
    <SlideLayout
      title="按按看，檔案怎麼從資料夾走到 GitHub"
      subtitle="Git Playground"
      icon={MousePointerClick}
    >
      <div className="max-w-6xl mx-auto space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          存檔不是一個動作。
          <strong className="text-slate-100">
            先挑這次要存哪幾個，打包成一個存檔點，再送上網路
          </strong>
          ，三段各有各的指令。做完前兩段，東西都還只在你這台電腦上。
        </AnimatedBlock>

        {/*
          整張圖包在一個比頁面底色更暗的外框裡，四個區域是擺在上面的物件，
          中間用帶指令名稱的箭頭接起來。方角加粗框是刻意的：這一塊是可以按的沙盒，
          跟全片其他說明用的圓角卡片不是同一種東西。
        */}
        <AnimatedBlock stepIndex={2} className="border-2 border-slate-800 bg-slate-950/80 p-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-2 gap-y-3 items-stretch">
            {ZONES.map((z, zi) => {
              const active = note?.zone === z.id;
              const t = TONES[z.tone];
              const crossing = CROSSINGS.find((c) => c.after === z.id);
              const crossActive = note?.cmd === crossing?.cmd;
              const backActive = note?.cmd === crossing?.back;

              return (
                <Fragment key={z.id}>
                  <div
                    className={`border-2 p-3 flex flex-col min-w-0 min-h-[15rem] transition-colors duration-300 ${
                      z.dashed ? 'border-dashed ' : ''
                    }${active ? t.active : t.frame}`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 transition-colors duration-300 ${
                          active ? t.iconActive : t.iconIdle
                        }`}
                      >
                        <PixelArt grid={z.pixel} size={31} />
                      </span>
                      <div className="min-w-0">
                        {/* 編號是地點的編號，不是步驟。指令有幾個跟區域有幾個不一樣，
                            寫成「第 N 步」會跟下面按鈕的次數對不起來 */}
                        <div className="font-mono text-xs text-slate-600">0{zi + 1}</div>
                        <div
                          className={`text-base font-bold leading-tight ${
                            active ? t.label : 'text-slate-100'
                          }`}
                        >
                          {z.label}
                        </div>
                      </div>
                    </div>
                    {/* 英文名自己一行。擠在圖示旁邊的話，四欄的寬度只夠印到
                        Working Dire… 就被切掉，帶著刪節號反而像沒排好 */}
                    <div className="font-mono text-xs text-slate-500 mb-2">{z.en}</div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-2.5 border-b border-slate-800 pb-2.5">
                      {z.hint}
                    </p>

                    {z.id === 'work' && (
                      <div className="space-y-1.5">
                        {[...modified, ...clean].map((f) => (
                          <Chip key={f} name={f} tone={states[f] === 'clean' ? 'idle' : 'dirty'} />
                        ))}
                        <div className="border-2 border-slate-800 bg-slate-950 px-2 py-1">
                          <div className="font-mono text-sm text-slate-500 line-through decoration-slate-700">
                            .env
                          </div>
                          <div className="text-slate-500 text-xs mt-0.5">.gitignore 擋著</div>
                        </div>
                      </div>
                    )}

                    {z.id === 'stage' && (
                      <div className="space-y-1.5">
                        {staged.length === 0 && (
                          <div className="text-slate-600 text-sm">目前是空的</div>
                        )}
                        {staged.map((f) => (
                          <Chip key={f} name={f} tone="dirty" />
                        ))}
                      </div>
                    )}

                    {z.id === 'repo' && (
                      <div className="space-y-1.5">
                        {commits.length === 0 && (
                          <div className="text-slate-600 text-sm">還沒有存檔點</div>
                        )}
                        {commits.map((c) => (
                          <CommitNode key={c.id} c={c} />
                        ))}
                      </div>
                    )}

                    {z.id === 'remote' && (
                      <div className="space-y-1.5">
                        {pushed === 0 && <div className="text-slate-600 text-sm">還沒推上去</div>}
                        {commits.slice(0, pushed).map((c) => (
                          <CommitNode key={c.id} c={c} />
                        ))}
                        {pushed > 0 && unpushed > 0 && (
                          <div className="text-amber-300/80 text-xs leading-relaxed pt-0.5">
                            還有 {unpushed} 個存檔點沒送上來
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {crossing && (
                    <div
                      className={`flex flex-col items-center justify-center gap-1 ${
                        crossing.back ? 'border-x border-dashed border-slate-700 px-2' : 'px-0.5'
                      }`}
                    >
                      <PixelArt
                        grid={PX_ARROW_RIGHT}
                        size={28}
                        className={`transition-colors duration-300 ${
                          crossActive ? TONES[crossing.tone].lit : 'text-slate-600'
                        }`}
                      />
                      <code
                        className={`font-mono text-xs whitespace-nowrap transition-colors duration-300 ${
                          crossActive ? TONES[crossing.tone].lit : 'text-slate-500'
                        }`}
                      >
                        {crossing.cmd}
                      </code>
                      {crossing.back && (
                        <>
                          <PixelArt
                            grid={PX_ARROW_LEFT}
                            size={28}
                            className={`mt-2 transition-colors duration-300 ${
                              backActive ? 'text-slate-300' : 'text-slate-700'
                            }`}
                          />
                          <code
                            className={`font-mono text-xs whitespace-nowrap transition-colors duration-300 ${
                              backActive ? 'text-slate-300' : 'text-slate-600'
                            }`}
                          >
                            {crossing.back}
                          </code>
                        </>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
            {/*
              說明帶排在同一個 grid 的第二列，不要另開一個 grid。
              兩個 grid 會各自去算 auto 欄的寬度，而箭頭那三格內容不一樣寬
              （git add 跟疊起來的 git push／git pull 不一樣），欄線就會對不起來。
            */}
            <div className="col-span-3 border-t border-amber-500/25 pt-2 text-amber-300/80 text-sm leading-snug">
              這兩格還沒固定，改壞了回不去
            </div>
            <div />
            <div className="border-t border-emerald-500/25 pt-2 text-emerald-300/80 text-sm leading-snug">
              固定住了，但只在這台電腦
            </div>
            <div />
            <div className="border-t border-emerald-500/25 pt-2 text-emerald-300/80 text-sm leading-snug">
              送上去才有第二份
            </div>
          </div>
        </AnimatedBlock>

        {/* 指令列。按鈕不會推進投影片，App 的 handleContainerClick 放行 button */}
        <AnimatedBlock stepIndex={3} className="border-2 border-slate-800 bg-slate-950 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {BUTTONS.map((b) => {
              const Icon = b.icon;
              return (
                <button
                  key={b.label}
                  onClick={b.run}
                  disabled={!b.on}
                  className={`inline-flex items-center gap-2 border-2 px-3 py-2 text-sm transition-colors ${
                    b.on
                      ? 'border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-600 hover:bg-slate-800 cursor-pointer'
                      : 'border-slate-800/60 bg-slate-900/40 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className={b.mono ? 'font-mono' : 'font-bold'}>{b.label}</span>
                </button>
              );
            })}
            <button
              onClick={reset}
              className="ml-auto inline-flex items-center gap-2 border-2 border-slate-800 px-3 py-2 text-sm text-slate-500 hover:text-slate-300 hover:border-slate-700 cursor-pointer"
            >
              <History size={15} className="shrink-0" />
              重來
            </button>
          </div>

          {/* 剛剛那一步發生了什麼。這一格才是這頁真正在教的東西 */}
          <div className="mt-4 border-t border-slate-800 pt-4 min-h-[4.5rem]">
            {note ? (
              <div>
                <div
                  className={`font-mono text-sm mb-1.5 ${
                    note.zone === 'repo' || note.zone === 'remote'
                      ? 'text-emerald-300'
                      : 'text-amber-300'
                  }`}
                >
                  {note.cmd}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{note.text}</p>
              </div>
            ) : (
              <p className="text-slate-500 text-sm leading-relaxed">
                三個檔案現在都跟存檔點一樣，沒有東西要存。
              </p>
            )}
          </div>
        </AnimatedBlock>

        <Callout
          tone="warn"
          label="兩件最容易誤會的事"
          stepIndex={4}
          footnote={
            <>
              <code className="font-mono text-slate-300">add</code>{' '}
              過一次的檔案，Git 就開始追蹤它，之後你每次改它 Git 都會主動報告，
              不用重新宣告要不要管它。<strong className="text-slate-100">但每一次存檔還是要 add 一次</strong>
              ，因為 add 挑的是「這次的修改」，不是「這個檔案」。新加進來的檔案則要先 add 一次才會被追蹤。
            </>
          }
        >
          <strong className="text-slate-100">commit 一百次，沒有 push，備份份數還是零。</strong>
          存檔點再多，沒送上去就跟你的資料夾在同一台電腦上，那台壞了就一起沒了。
        </Callout>

      </div>
    </SlideLayout>
  );
}
