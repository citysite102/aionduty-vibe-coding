import { Workflow, Layers, Wrench, Wallet } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import montageOutput from '../../assets/tools/openmontage-output.png';
import montageFlow from '../../assets/tools/openmontage-howitworks.png';
import { Callout } from '../components/Callout';

/**
 * 2026-10-08 新增（講師要求）：前一頁講的是「現成的角色包」，但只有角色串不出一條線。
 * 這一頁要講的是角色加工具加順序接起來之後長什麼樣，用一個做得完整的例子示範。
 *
 * 最後查證：2026-10-08，`gh api repos/calesthio/OpenMontage` 與它的 README。
 * 當時的現況：12 條產線、100 個以上的工具、700 份以上的角色與知識檔案，AGPL-3.0，
 * 6.5 萬顆星。安裝是 `git clone ... && make setup`，接 Claude Code、Cursor、Copilot、
 * Windsurf、Codex，每一家各一份設定檔。費用：執行前先估、單一動作超過 0.50 美金要你按同意、
 * 預設總上限 10 美金；README 舉的兩支成品是 1.33 美金與約 4 美金。
 * 也有完全不用 API key 的走法（免費素材庫加本機模型）。
 * **授權是 AGPL-3.0，跟前一頁的 MIT 不一樣**，公司要用之前要先問過法務，這一條不要拿掉。
 *
 * 這一頁不是教學員去做影片。選它當例子的理由是它把「角色、工具、順序、花多少錢」四件事
 * 同時攤開來，而學員自己的流程（報表、文件審閱）要長成完整工作流程，缺的正好是後面三件。
 * 所以右欄那四層才是這一頁的本體，左欄的例子是用來讓那四層看得見。
 *
 * 跟 24c_M3_WorkflowUse 的分野（B-5）：24c 講「什麼時候該把流程寫成腳本、怎麼叫它出來」，
 * 是自己寫一條；這一頁講「別人寫好的一整條長什麼樣、要看哪四層」，是讀別人的。
 * 改任何一頁之前先讀另一頁，不要讓兩頁都變成在講 workflow 是什麼。
 *
 * 強調色兩種：sky（四層結構）與 amber（授權與費用的風險）。
 */

/** 四層的描述都要指得到上面那張截圖裡的某一行，不然學員會看到上下兩塊各說各話。
 *  「12 條產線」那個數字不在那張圖上，它來自專案的說明文字，所以寫在內文裡並講明出處。
 *  **改這四層之前先看一次那張截圖**，截圖換了就要一起改。 */
const LAYERS = [
  {
    icon: Layers,
    n: '01',
    t: '角色：每一關誰做、怎麼做',
    d: '圖上第三行，它會去讀那一關的做法說明。每一關有自己的一份，寫清楚這一關要怎麼執行，就是我們寫過的 Skill。',
  },
  {
    icon: Wrench,
    n: '02',
    t: '工具：它自己挑，不是我們挑',
    d: '圖上第四行，呼叫工具。一百個以上的工具掛在底下，它用七個面向打分，選出這一關要用哪一個。',
  },
  {
    icon: Workflow,
    n: '03',
    t: '順序：哪一關先、過關要符合什麼',
    d: '圖上第二行，它先讀一份產線設定，階段、工具、審查標準、過關條件都寫在裡面。換一種排法就是另一條產線，這個專案備了 12 條。',
  },
  {
    icon: Wallet,
    n: '04',
    t: '預算：開跑前先知道要花多少',
    d: '圖上第六行存進度時會一起記下花了多少。另外它執行前會先估一次，單一動作超過 0.50 美金要按同意，預設總上限 10 美金。',
  },
];

export default function SlideAgentToolChain() {
  return (
    <SlideLayout title="完整的 AI 工作流程：OpenMontage" subtitle="A Complete AI Workflow" icon={Workflow}>
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 max-w-6xl mx-auto items-start pb-8">

        <div className="space-y-4">
          <AnimatedBlock stepIndex={1}>
            <p className="text-slate-300 text-base leading-relaxed">
              角色各自做得好，不等於事情會自己走完。角色之間要有順序，每個角色手上要有工具，
              而且整條跑下來要有人管它花多少錢。
              <strong className="text-slate-100">這三件事接起來才叫一條工作流程</strong>，
              不然就只是五個很會聊天的角色。
            </p>
            <p className="text-slate-400 text-base leading-relaxed mt-2">
              OpenMontage 把這件事做成看得見的樣子：你用一句話說你要什麼影片，
              它派出研究、腳本、配音、剪接的角色，各自去呼叫底下 100 個以上的工具，
              最後輸出一支成品。整套接在 Claude Code、Cursor 這些工具上跑，
              不是另外一個獨立的軟體。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={2}>
            <figure className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <img
                src={montageOutput}
                alt="播放器畫面，檔名 signal-from-tomorrow_final_with_music_upload_v2.mp4，片長 30 秒。畫面是雪地上一個人背對鏡頭，遠方一座大型電波望遠鏡，天色偏藍。"
                className="w-full max-w-full rounded-xl border border-slate-800"
              />
              <figcaption className="text-slate-400 text-sm leading-relaxed mt-3">
                這是它跑完吐出來的一支片，三十秒，有畫面、旁白、配樂跟字幕。
                要做到這一支，中間要查資料、寫稿、配音、剪接、合成，每一步用的工具都不一樣。
                <strong className="text-slate-200">你手上那份每月報表、那套文件審閱，缺的是同一件事</strong>：
                角色你已經有了，工具跟順序還沒接上去。
              </figcaption>
            </figure>
          </AnimatedBlock>

          <Callout tone="warn" label="兩件先問清楚的事" stepIndex={3}>
            它是 AGPL-3.0 授權，跟前面那包的 MIT 不一樣：公司要拿它接進自己的產品之前，
            先問過法務。另外它會呼叫付費的生成服務，所以要先確認那個預算上限設在哪裡，
            以及你的素材被送到哪一家。
          </Callout>
        </div>

        <div className="space-y-4">
          <AnimatedBlock stepIndex={4}>
            <figure className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
              <img
                src={montageFlow}
                alt="OpenMontage 的 GitHub 說明頁 How It Works 一段。開頭寫著 agent-first architecture，沒有程式在指揮，你的 AI coding assistant 就是指揮者。底下是一串由上往下的流程：你說一句要做什麼影片、Agent 讀產線設定、讀每一階段的做法、呼叫工具、自己審一次、存檔可續跑、交給你核可、算圖前再驗一次、算圖、算完再自審，最後只有自審通過才輸出成品。"
                className="w-full max-w-full rounded-xl border border-slate-800"
              />
              <figcaption className="text-slate-400 text-sm leading-relaxed mt-3">
                它把整條流程直接寫在說明頁上。注意第一句：
                <strong className="text-slate-200">沒有另外一支程式在指揮，指揮的就是 Claude 這類工具本身</strong>。
                中間那幾個「自己審一次」「交給你核可」，就是我們前面做的審查角色與停下來問人的那兩道。
              </figcaption>
            </figure>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={5} className="rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5">
            <h3 className="text-slate-100 text-base font-bold mb-1">讀任何一條現成的產線，看這四層</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              下一次有人丟一個「AI 自動做完某件事」的專案給我們，照這四層拆開來看，
              就知道它到底自動了哪一段。
            </p>
          </AnimatedBlock>

          <AnimatedBlock stepIndex={6} className="space-y-2.5">
            {LAYERS.map((l) => {
              const Icon = l.icon;
              return (
                <div key={l.n} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="font-mono text-sm text-slate-600 shrink-0">{l.n}</span>
                    <span className="flex items-center gap-2 text-slate-100 text-base font-bold">
                      <Icon aria-hidden="true" size={16} className="text-slate-400 shrink-0" />
                      {l.t}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed pl-7">{l.d}</p>
                </div>
              );
            })}
          </AnimatedBlock>

          <Callout tone="muted" label="我們自己的那一條，從哪裡開始" stepIndex={7}>
            不要從 12 條產線那種規模開始。先挑你每個月都要做一次的那件事，
            把它寫成三個角色加一個固定順序，跑得動之後再往上加工具。
            中間少一層，整條就會停在那裡等你出手。
          </Callout>
        </div>

      </div>
    </SlideLayout>
  );
}
