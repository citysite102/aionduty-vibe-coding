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
import RecWrite1, { meta as m11 } from './harness/11_WriteWhitelist';
import RecWrite2, { meta as m12 } from './harness/12_WriteLatitude';
import RecWrite3, { meta as m13 } from './harness/13_WriteWhy';
import RecWrite4, { meta as m14 } from './harness/14_WriteExample';
import RecWrite5, { meta as m15 } from './harness/15_WriteException';
import RecWrite6, { meta as m16 } from './harness/16_WriteOneThing';
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
import RecTransferQ1, { meta as m42 } from './harness/42_TransferQ1';
import RecTransferQ2, { meta as m43 } from './harness/43_TransferQ2';
import RecTransferQ3, { meta as m44 } from './harness/44_TransferQ3';
import RecTransferMapping, { meta as m46 } from './harness/46_TransferMapping';
import RecTransferNextStep, { meta as m47 } from './harness/47_TransferNextStep';
import RecRecapOne, { meta as m48 } from './harness/48_RecapOne';
import RecTransferIntegrate, { meta as m61 } from './harness/61_TransferIntegrate';
import RecHookHowTo, { meta as m62 } from './harness/62_HookHowTo';
import RecHookThreeLayers, { meta as m63 } from './harness/63_HookThreeLayers';
import RecHookEvents, { meta as m64 } from './harness/64_HookEvents';
import RecHookMatcher, { meta as m65 } from './harness/65_HookMatcher';
import RecHookHandler, { meta as m66 } from './harness/66_HookHandler';
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
  // index 65 = 原「CLAUDE.md 的分層」
  65: [
    { meta: m23, Component: RecWhyNoHandbook },
    { meta: m25, Component: RecWhyDiff },
    { meta: m26, Component: RecLayersOverview },
    { meta: m31, Component: RecHandbookLength },
    { meta: m32, Component: RecAgentsMd },
    { meta: m54, Component: RecHandbookV1 },
  ],
  // index 78 = 原「規則明明寫了，它卻沒照做」
  78: [
    { meta: m01, Component: RecFailNotLoaded },
    { meta: m02, Component: RecFailBuried },
    { meta: m03, Component: RecFailCantFollow },
    { meta: m04, Component: RecDiagnose },
  ],
  // index 79 = 原「這條規則該放哪」
  // Hook 那一組（62 到 68）夾在分流四問與「保證越高改起來越麻煩」之間。
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
  79: [
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
    { meta: m67, Component: RecHookPractice },
    { meta: m68, Component: RecHookCodex },
    { meta: m09, Component: RecRoutePrinciples },
    { meta: m10, Component: RecStartSimple },
    { meta: m55, Component: RecHandbookV2 },
  ],
  // index 80 = 原「手冊越寫越長，怎麼整理」
  80: [
    { meta: m17, Component: RecHealthOverview },
    { meta: m18, Component: RecHealthInventory },
    { meta: m19, Component: RecHealthSubtract },
    { meta: m20, Component: RecHealthEvidence },
    { meta: m21, Component: RecHealthWeakEvidence },
    { meta: m22, Component: RecHealthRest },
    { meta: m56, Component: RecHandbookV3 },
  ],
  // index 81 = 原「怎麼把話講對：白名單與探索空間」
  // 12_WriteLatitude（留探索空間）本來漏在外面：檔案寫好了、母頁標題也點名它，
  // 但 registry 沒有 import，所以那一頁從來沒有播過，六個寫法只播得出五個。補回來。
  81: [
    { meta: m11, Component: RecWrite1 },
    { meta: m12, Component: RecWrite2 },
    { meta: m13, Component: RecWrite3 },
    { meta: m14, Component: RecWrite4 },
    { meta: m15, Component: RecWrite5 },
    { meta: m16, Component: RecWrite6 },
    { meta: m57, Component: RecHandbookV4 },
    // 六個寫法講完原本就停在這裡，整組沒有動手的頁面。
    // 57 是拿示範手冊改一條，16b 是換成學員自己那份：先看別人改，再改自己的。
    { meta: m16b, Component: RecWritePractice },
  ],
  // index 82 = 原「同一套手冊，換個地方用」
  // 原本排在這一組前面的「專屬知識庫與分身」已經拆進來：
  // 介面示意接在網頁版後面，「為什麼不直接開新對話」接在收尾前面。
  82: [
    { meta: m33, Component: RecSurfaceIntro },
    { meta: m58, Component: RecHandbookV5 },
  ],
  // index 84 = 原「換成你的工作，手冊該寫什麼」
  84: [
    { meta: m41, Component: RecTransferCase },
    { meta: m42, Component: RecTransferQ1 },
    { meta: m43, Component: RecTransferQ2 },
    { meta: m44, Component: RecTransferQ3 },
    { meta: m46, Component: RecTransferMapping },
    { meta: m61, Component: RecTransferIntegrate },
    { meta: m47, Component: RecTransferNextStep },
  ],
  // index 85 = 原「你完成了哪四件事」
  85: [
    { meta: m48, Component: RecRecapOne },
  ],
};
