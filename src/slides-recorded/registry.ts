import type { RecordedSlide } from './types';

import RecFailNotLoaded, { meta as m01 } from './harness/01_FailNotLoaded';
import RecFailBuried, { meta as m02 } from './harness/02_FailBuried';
import RecFailCantFollow, { meta as m03 } from './harness/03_FailCantFollow';
import RecDiagnose, { meta as m04 } from './harness/04_Diagnose';
import RecRouteIntro, { meta as m04b } from './harness/04b_RouteIntro';
import RecRouteQ1, { meta as m05 } from './harness/05_RouteQ1';
import RecRouteQ2, { meta as m06 } from './harness/06_RouteQ2';
import RecRouteQ3, { meta as m07 } from './harness/07_RouteQ3';
import RecRouteQ4, { meta as m08 } from './harness/08_RouteQ4';
import RecRoutePrinciples, { meta as m09 } from './harness/09_RoutePrinciples';
import RecStartSimple, { meta as m10 } from './harness/10_StartSimple';
import RecWriteScope, { meta as m11 } from './harness/11_WriteScope';
import RecWriteBasis, { meta as m12 } from './harness/12_WriteBasis';
import RecWritePractice, { meta as m16b } from './harness/16b_WritePractice';
import RecHealthOverview, { meta as m17 } from './harness/17_HealthOverview';
import RecHealthInventory, { meta as m18 } from './harness/18_HealthInventory';
import RecHealthSubtract, { meta as m19 } from './harness/19_HealthSubtract';
import RecHealthEvidence, { meta as m20 } from './harness/20_HealthEvidence';
import RecHealthWeakEvidence, { meta as m21 } from './harness/21_HealthWeakEvidence';
import RecHealthRest, { meta as m22 } from './harness/22_HealthRest';
import RecWhyNoHandbook, { meta as m23 } from './harness/23_WhyNoHandbook';
import RecWhyDiff, { meta as m25 } from './harness/25_WhyDiff';
import RecLayersOverview, { meta as m26 } from './harness/26_LayersOverview';
import RecHandbookLength, { meta as m31 } from './harness/31_HandbookLength';
import RecAgentsMd, { meta as m32 } from './harness/32_AgentsMd';
import RecSurfaceIntro, { meta as m33 } from './harness/33_SurfaceIntro';
import RecTransferCase, { meta as m41 } from './harness/41_TransferCase';
import RecTransferAnswers, { meta as m42 } from './harness/42_TransferAnswers';
import RecTransferHook, { meta as m43 } from './harness/43_TransferHook';
import RecTransferHarness, { meta as m45 } from './harness/45_TransferHarness';
import RecTransferNextStep, { meta as m47 } from './harness/47_TransferNextStep';
import RecRecapOne, { meta as m48 } from './harness/48_RecapOne';
import RecTransferIntegrate, { meta as m61 } from './harness/61_TransferIntegrate';
import RecHookHowTo, { meta as m62 } from './harness/62_HookHowTo';
import RecHookThreeLayers, { meta as m63 } from './harness/63_HookThreeLayers';
import RecHookEvents, { meta as m64 } from './harness/64_HookEvents';
import RecHookMatcher, { meta as m65 } from './harness/65_HookMatcher';
import RecHookHandler, { meta as m66 } from './harness/66_HookHandler';
import RecHookHandlerCases, { meta as m66b } from './harness/66b_HookHandlerCases';
import RecHookPractice, { meta as m67 } from './harness/67_HookPractice';
import RecHookCodex, { meta as m68 } from './harness/68_HookCodex';
import RecHandbookV1, { meta as m54 } from './harness/54_HandbookV1';
import RecHandbookV2, { meta as m55 } from './harness/55_HandbookV2';
import RecHandbookV3, { meta as m56 } from './harness/56_HandbookV3';
import RecHandbookV4, { meta as m57 } from './harness/57_HandbookV4';
import RecHandbookV5, { meta as m58 } from './harness/58_HandbookV5';

/**
 * 拆頁替換表。
 *
 * key 是原本那一頁在 LIVE_SLIDES 的 index（0 起算），
 * value 是拆出來要頂替它的那幾頁。沒列在這裡的頁面維持原樣。
 *
 * 整份簡報只有一份清單，拆到哪裡就用到哪裡，不需要維護兩個版本。
 * 現場與預錄共用這一份，差別只在錄製時加上 ?clean=1 隱藏操作列。
 */
export const REPLACEMENTS: Record<number, RecordedSlide[]> = {
  // index 66 = 原「CLAUDE.md 的作用、長度與分層」
  66: [
    { meta: m23, Component: RecWhyNoHandbook },
    { meta: m25, Component: RecWhyDiff },
    { meta: m26, Component: RecLayersOverview },
    { meta: m31, Component: RecHandbookLength },
    { meta: m32, Component: RecAgentsMd },
    { meta: m54, Component: RecHandbookV1 },
  ],
  // index 79 = 原「規則明明寫了，它卻沒照做」
  79: [
    { meta: m01, Component: RecFailNotLoaded },
    { meta: m02, Component: RecFailBuried },
    { meta: m03, Component: RecFailCantFollow },
    { meta: m04, Component: RecDiagnose },
  ],
  // index 80 = 原「規則該放哪一層，以及 Hook 的寫法」
  // Hook 那一組（62 到 68）夾在歸位四問與「保證越高改起來越麻煩」之間。
  //
  // 位置試過排在四問之前，不行：前一組的收尾是「所以下一步先決定位置」，
  // 接著就跳去講 Hook 的三層設定，那句承接語會指到不相干的地方（B-4）。
  // 排在四問之後就順了：第一題的答案是「交給 Hook 或 CI」，
  // 這一組就是把那個答案攤開；而下一頁講「Hook 一定會執行，但你要去動設定檔」，
  // 剛看完三層設定的人才聽得懂那個取捨。
  //
  // 62 原本是唯一講 Hook 的一頁，一頁塞完為什麼、怎麼寫、有哪些時機。
  // 現在拆成七頁：為什麼（62）、三層骨架（63）、三層各一頁（64 到 66）、
  // 動手掛一條（67）、換成 Codex 還算不算數（68）。
  // 最後那一頁是這一節的職務，這一節本來就是疑難雜症與轉移。
  80: [
    // 四題原本直接從第一題開始，方法寫成第一題頁面上的一行引言。
    // 那讓第一頁要同時交代方法與第一題，份量跟後面三頁不一樣。方法獨立一頁。
    { meta: m04b, Component: RecRouteIntro },
    { meta: m05, Component: RecRouteQ1 },
    { meta: m06, Component: RecRouteQ2 },
    { meta: m07, Component: RecRouteQ3 },
    { meta: m08, Component: RecRouteQ4 },
    { meta: m62, Component: RecHookHowTo },
    { meta: m63, Component: RecHookThreeLayers },
    { meta: m64, Component: RecHookEvents },
    { meta: m65, Component: RecHookMatcher },
    { meta: m66, Component: RecHookHandler },
    { meta: m66b, Component: RecHookHandlerCases },
    { meta: m67, Component: RecHookPractice },
    { meta: m68, Component: RecHookCodex },
    { meta: m09, Component: RecRoutePrinciples },
    { meta: m10, Component: RecStartSimple },
    { meta: m55, Component: RecHandbookV2 },
  ],
  // index 81 = 原「手冊越寫越長，怎麼整理」
  81: [
    { meta: m17, Component: RecHealthOverview },
    { meta: m18, Component: RecHealthInventory },
    { meta: m19, Component: RecHealthSubtract },
    { meta: m20, Component: RecHealthEvidence },
    { meta: m21, Component: RecHealthWeakEvidence },
    { meta: m22, Component: RecHealthRest },
    { meta: m56, Component: RecHandbookV3 },
  ],
  // index 82 = 原「怎麼把話講對：白名單與探索空間」
  // 六個寫法技巧原本一個技巧一頁（11_WriteWhitelist 到 16_WriteOneThing，六頁共用同一個
  // _DontDo 元件、版面一模一樣）。2026-10-04 併成兩頁：11_WriteScope 管「這條規則管到哪裡」，
  // 12_WriteBasis 管「它推不出來的時候靠什麼」。六組的原文一字沒改，只是三條並排。
  // 理由寫在 _TipRows.tsx 的檔頭。**不要為了「一個技巧一頁比較好錄」再拆回去。**
  82: [
    { meta: m11, Component: RecWriteScope },
    { meta: m12, Component: RecWriteBasis },
    // 2026-10-04 兩頁調換（講師）。原本是 57（示範手冊改一條）在前、16b（換你改自己那份）在後。
    // 改成動手在前、示範在後：六個技巧剛講完，學員手上有判斷標準，先自己改一條；
    // 57 變成「我這邊改出來長這樣」的對照，而不是照抄的範本。
    // **兩頁的承接語互相指著對方**（16b 檔頭、57 的開場與收尾），要換回去的話那三處要一起改。
    { meta: m16b, Component: RecWritePractice },
    { meta: m57, Component: RecHandbookV4 },
  ],
  // index 83 = 原「同一套手冊，換個地方用」
  // 原本排在這一組前面的「專屬知識庫與分身」已經拆進來：
  // 介面示意接在網頁版後面，「為什麼不直接開新對話」接在收尾前面。
  83: [
    { meta: m33, Component: RecSurfaceIntro },
    { meta: m58, Component: RecHandbookV5 },
  ],
  // index 85 = 原「換成你的工作，手冊該寫什麼」
  85: [
    { meta: m41, Component: RecTransferCase },
    // 2026-10-04：原本三題各一頁（43、44、42）再加一頁對照表（46），四頁併成一頁。
    // 三頁的結構完全一樣，而學員三十頁前才看過同一個形狀的「規則該放哪」四問；
    // 對照表的三行分開放在三頁的時候，學員要自己記著前兩題才對得起來。
    // 文字一字沒改，理由寫在 42_TransferAnswers.tsx 的檔頭。**不要拆回去。**
    { meta: m42, Component: RecTransferAnswers },
    // 2026-10-04 新增：第 1 題答完「要用程式擋」之後，真的把那條 Hook 掛上去。
    // 做法照 67_HookPractice 的形狀（給一句話、Claude 去寫設定、學員測），不要貼 JSON。
    // 它掛好之後，45_TransferHarness 的「自動關卡」那一列才是「剛剛掛好了」。
    { meta: m43, Component: RecTransferHook },
    // 2026-10-04 新增：同一份提案工作對回運作框架那六塊。這一段原本只換了「規則文件」
    // 一個零件，學員會以為「換成我的工作 ＝ 寫一份 CLAUDE.md」。理由寫在
    // 45_TransferHarness.tsx 的檔頭。**六塊的名字沿用 Slide 50，不要在這裡自創分法。**
    { meta: m45, Component: RecTransferHarness },
    // 2026-10-04 調換（講師）：61（工具：接 Notion ＋ 包 Skill）移到 47 之前。
    // 原本 61 在最後當加分題，理由是它要開終端機打 claude mcp add，難度比整段高一階。
    // 但 45_TransferHarness 的六塊對照表把「工具」標成「還沒做」，而 47 是整段的收尾
    //（換成你自己的工作怎麼開始）。工具擺在收尾後面，等於表上那一格要等到收完才補，
    // 而且 47 講完「換成你自己的」又跳回提案這個例子。現在順序是：
    // 六塊對照 → 把工具那一格補完 → 才換成你自己的工作。
    // **這兩頁的轉場互相指著對方，要換回去的話那三句要一起改。**
    { meta: m61, Component: RecTransferIntegrate },
    { meta: m47, Component: RecTransferNextStep },
  ],
  // index 86 = 原「手冊的四個成果，收在同一個檔案裡」
  86: [
    { meta: m48, Component: RecRecapOne },
  ],
};
