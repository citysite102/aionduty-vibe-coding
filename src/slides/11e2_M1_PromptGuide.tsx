import { BookMarked, Gauge, Eraser, MessageSquareQuote, Ban } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import { Callout } from '../components/Callout';

/**
 * 2026-10-04 新增，配對頁是章節二最後那一頁〈哪些會過期，哪些不會〉。
 * 那一頁講原則（哪些會變），這一頁是會變的那一半的現況快照。**兩頁要一起看。**
 *
 * 放在〈Claude Code 指令的四種類型〉後面，是因為 `/effort` 在這裡才有落點：
 * 學員剛看完斜線指令長什麼樣。放更前面（章節二）他連 Claude Code 都還沒裝（B-5b）。
 *
 * 這一頁的重點是**那兩個網址，不是那四條**。四條會過期，網址不會。
 * 所以收尾把網址放大，而不是把四條再總結一次。
 *
 * ── C-1 ──────────────────────────────────────────────
 * 最後查證：2026-10-04，逐條對照官方文件，不是對照二手轉述（C-2）。出處與原文：
 *
 *   1. effort：platform.claude.com/docs/en/build-with-claude/prompt-engineering/
 *      prompting-claude-opus-5-5 的 Calibrate effort 一節。
 *      「Start at `medium`, the default on Claude Opus 5.5 (Claude Opus 5 defaults to `high`),
 *      set it explicitly, and test several levels against your own evals rather than carrying
 *      over the setting you used on Claude Opus 5.」以及「Claude Opus 5.5 at `medium` matches
 *      or exceeds Claude Opus 5 at `high` on coding and knowledge-work evaluations」。
 *      `/effort` 這個指令出自 code.claude.com/docs/en/model-config。
 *   2. 拿掉「請仔細思考」：同一份文件的 Thinking instructions in chat system prompts 一節。
 *      原文用字是 **consider removing**，而且限定在 chat applications 的系統提示，
 *      畫面上沒有寫成「一律不要寫」，不要改成絕對句。
 *   3. 內部推理：同一份文件的 Safeguard refusals 一節，拒絕類別叫 `reasoning_extraction`。
 *      文件同時寫著「You can still ask for a short explanation of the answer or a summary of
 *      the actions taken」，所以第三格的正解是「用三句話解釋」，不是「什麼理由都不要問」。
 *   4. 排除法：同一份文件的 Frontend design defaults 一節。
 *      「a general instruction such as "avoid a generic AI look" mostly swaps one default for
 *      another. It responds well to instructions that name specific patterns to avoid」，
 *      官方給的例子是 cream or off-white background、numbered "01/02/03" section labels、
 *      monospace labels、pill-shaped buttons。畫面上那三個就是從這一串挑的。
 *
 * 有一條**查到與二手轉述相反，所以沒有寫進來**：網路上說「中途切換 effort 不會清快取」，
 * 官方寫的是「Changing the top-level `effort` value between requests invalidates the prompt
 * cache」，只有 per-message effort change（beta）才保得住。這一條對入門沒用，而且容易講錯。
 * 另外「免費配額重置券」那一類限時活動一律不收，寫上去下個月就是錯的。
 *
 * 下次改版前重查上面那兩個網址，整頁的四條與日期一起換。
 * ─────────────────────────────────────────────────────
 */
const RULES = [
  {
    icon: Gauge,
    title: '思考深淺有一個總開關',
    body: '它叫 effort，現在預設是 medium。官方特別講：不要把上一代的設定搬過來用。他們自己測過，現在的 medium 已經跟上一代的 high 差不多了。',
    how: '挑一件你每週都在做的事，打 /effort 切 low、medium、high 各跑一次，自己看哪一個就夠用。',
  },
  {
    icon: Eraser,
    title: '「請仔細思考」可以拿掉了',
    body: '它本來就會想。官方測過，這類句子拿掉之後回答開始得比較快，答案也沒有變差。',
    how: '想要它想深一點，就去調上面那個開關，不要多寫一句話。',
  },
  {
    icon: MessageSquareQuote,
    title: '不要叫它印出「內部推理過程」',
    body: '這種要求有機會直接被擋掉，你會收到一句拒絕。',
    how: '要理由就直接講：「用三句話解釋你為什麼這樣選。」這個問得到。',
  },
  {
    icon: Ban,
    title: '做畫面不要說「不要很 AI」',
    body: '官方的說法是，你這樣講它只會換成另一套預設，換湯不換藥。',
    how: '要講清楚不要什麼：不要米白背景、不要 01／02／03 那種編號、不要膠囊按鈕。後面案例那一段有一份真的用過的清單。',
  },
];

const SOURCES = [
  { t: '各型號的 prompting guide', u: 'platform.claude.com/docs/en/build-with-claude/prompt-engineering' },
  { t: 'Claude Code 的模型與 /effort 設定', u: 'code.claude.com/docs/en/model-config' },
];

export default function SlidePromptGuide() {
  return (
    <SlideLayout title="官方指南怎麼查，現在寫了什麼" subtitle="Official Prompting Guide" icon={BookMarked}>
      <div className="max-w-6xl mx-auto w-full space-y-4 pb-6">

        <AnimatedBlock stepIndex={1} className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4">
          {/*
            2026-10-04（講師：這一頁的用詞太 AI、不夠口語）開場兩句整個重寫。
            原本是「前面說過有一半的東西會隨著型號換代而改。這一頁就是那一半現在的樣子，
            四條，全部出自官方指南。」加上「真正要記的是底下那兩個網址⋯以那兩個網址上寫的為準」。
            病灶三個：編出來的比例（「有一半」）、抽象的指稱（「那一半現在的樣子」）、
            以及公文語（「以⋯為準」「真正要記的是」）。四張卡的內文同一輪一起改口語。
          */}
          <p className="text-slate-300 text-base leading-relaxed">
            前面講過，這堂課有些做法會跟著版本一直換。
            <strong className="text-slate-100">下面這四條就是現在官方的說法</strong>，我照文件抄的，不是我自己的經驗談。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            這四條過一陣子就會變，所以我更希望你記住的是底下那兩個網址。以後有人講得跟我不一樣，你自己去那邊對一下。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RULES.map((r, i) => {
            const Icon = r.icon;
            return (
              <AnimatedBlock
                key={r.title}
                stepIndex={i + 2}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-baseline gap-2.5 mb-2">
                  <Icon aria-hidden="true" size={17} className="text-sky-400 shrink-0 translate-y-0.5" />
                  <h3 className="text-slate-100 text-base font-bold leading-snug">{r.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{r.body}</p>
                <p className="text-slate-300 text-sm leading-relaxed mt-2.5 pt-2.5 border-t border-slate-800">
                  {r.how}
                </p>
              </AnimatedBlock>
            );
          })}
        </div>

        <Callout tone="focus" label="這兩個網址存起來，比記那四條有用" stepIndex={6}>
          <div className="mt-1 space-y-1.5">
            {SOURCES.map((s) => (
              <div key={s.u} className="text-sm leading-relaxed">
                <span className="text-slate-300">{s.t}</span>
                <span className="block font-mono text-slate-400 break-all">{s.u}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-2.5">
            上面那四條是 2026 年 10 月查的。它出新版本的時候回來看一次，整頁可能都不一樣。
          </p>
        </Callout>

      </div>
    </SlideLayout>
  );
}
