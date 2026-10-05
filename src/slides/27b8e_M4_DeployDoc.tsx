import { FileSearch, ServerCog, Database, Clock, KeyRound } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { LiveDemo } from '../components/LiveDemo';
import { CopyText } from '../components/CopyBlock';
import { Callout } from '../components/Callout';

/**
 * 這一頁接在「手機打開，紀錄卻是空的」與「把紀錄搬上 Supabase」後面。
 *
 * 為什麼要有它：前面幾頁走的是計時器這一個題目，路線是寫死的（推上去、接 Vercel、
 * 接一個 Supabase 當資料庫）。但學員接下來要做的是自己的題目，那個題目可能要排程、
 * 可能要長時間跑一段運算、可能要寄信，那幾種在同一條路線上都會撞牆。
 * 2026-10-05 起資料庫那一欄學員是真的接過的（前一頁），不再是只知道有這回事。
 *
 * 不用教六家平台的差別，理由有兩個：一是那是《工具與選擇策略》那堂課的方法論，
 * 這堂走的是「主要只用一個，把它用到底」；二是各家的免費額度與方案幾乎每季在動，
 * 寫進投影片就是每季要回來改一次。
 *
 * 所以這一頁教的是同一套已經教過的東西換個場合用：叫 Agent 讀完現況產出一份文件，
 * 你負責驗收它寫的對不對。跟第五章的 CLAUDE.md、第六章的健檢是同一個模式。
 */

/** DEPLOY.md 該回答的四件事。順序照「先擋路的排前面」。 */
const SECTIONS = [
  {
    icon: ServerCog,
    title: '這個專案要幾個服務',
    body: '計時器現在有兩個：網頁掛在 Vercel，資料在 Supabase。兩個各自要上線、各自有免費額度，壞掉的時候也要分開查。',
    mine: '兩個',
  },
  {
    icon: Database,
    title: '資料存在哪裡',
    body: '剛才那一步就是在回答這一欄。存在瀏覽器裡換一台裝置就不見了，所以你把它搬到 Supabase 的一張表上。',
    mine: 'Supabase 的一張表',
  },
  {
    icon: Clock,
    title: '有沒有東西要一直醒著',
    body: '每天定時寄一封信、每小時抓一次資料，這種不能靠「有人打開網頁才跑」。它要一個不會睡著的地方。',
    mine: '沒有',
  },
  {
    icon: KeyRound,
    title: '哪些設定不能寫進程式碼',
    body: 'Supabase 那把公開金鑰放在 Vercel 的環境變數裡，沒有跟著程式碼上去。你前面用 .gitignore 擋過一次的，就是這類東西。',
    mine: '那把 Supabase 金鑰',
  },
];

const PROMPT = `讀完這個專案，幫我寫一份 DEPLOY.md，回答四件事：
1. 這個專案要開幾個服務才跑得起來，各是什麼
2. 資料存在哪裡，換一台裝置還在不在
3. 有沒有東西需要一直醒著（定時、背景工作）
4. 哪些設定是金鑰或密碼，不能寫進程式碼
每一條都要指出你是從哪個檔案看出來的。
最後列出「照現在這樣直接部署會先撞到的三件事」，從最早撞到的開始排。
先不要改任何檔案。`;

export default function SlideDeployDoc() {
  return (
    <SlideLayout title="DEPLOY.md：服務、資料、排程、金鑰" subtitle="Deployment Diagnosis" icon={FileSearch}>
      <LiveDemo kind="claude" note="做完你會有一份 DEPLOY.md，列著會先撞牆的三件事" />

      <div className="max-w-6xl mx-auto w-full space-y-5 pb-8">

        {/*
          2026-10-05：開場原本寫「計時器是純前端，所以前面那條路線走得完」。
          接完 Supabase 之後那句話不成立了，而且剛好反過來變成這一頁的優勢：
          四欄裡學員現在有三欄是真的填得出來的，只剩排程那一欄是空的。
          每一格的 mine 就是答案，**改前面的路線（換平台、拿掉 Supabase）要回來改這四個值。**
        */}
        <AnimatedBlock stepIndex={1} as="p" className="text-slate-300 text-base leading-relaxed">
          你的計時器現在不只是一個網頁了：它有兩個服務、一份跨裝置的資料、一把金鑰。
          <strong className="text-slate-100">下面四欄，你現在有三欄是真的填得出來的。</strong>
          填不出來的那一欄（排程），正好是下一個題目最常撞到的地方。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2}>
          <CopyText text={PROMPT} />
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SECTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedBlock
                key={s.title}
                stepIndex={i + 3}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2.5 mb-2">
                  <Icon aria-hidden="true" size={18} className="shrink-0 text-sky-400" />
                  {s.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.body}</p>
                <p className="mt-3 border-t border-slate-800 pt-2.5 text-sm text-slate-500">
                  你的計時器：<strong className="text-slate-300">{s.mine}</strong>
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        {/*
          2026-10-05 重寫。原本是「它寫完之後，你要核的是這一句／指不出來的那幾條，
          是它照一般專案的樣子猜的，不是讀你的專案讀出來的／把那幾條退回去再問一次」。
          三個問題：標題收在「核」這個單字動詞上（D-2 新增那條）、
          中間是「是 X，不是 Y」的對仗、「退回去再問一次」沒說要問什麼。
          現在把動作寫成一句學員可以直接照打的問句。
        */}
        <Callout tone="focus" label="怎麼驗收它寫的那一份" stepIndex={7}>
          那段 Prompt 裡有一句「每一條都要指出你是從哪個檔案看出來的」，用途就在這裡。
          <strong className="text-slate-100">它說得出檔名的那幾條，是真的讀過你的專案。</strong>
          說不出來的，多半是照一般專案的樣子寫的，跟你這個專案沒關係。
          把那幾條挑出來，問它一次：這一條你是從哪個檔案看出來的？
        </Callout>

      </div>
    </SlideLayout>
  );
}
