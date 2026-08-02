import type { RecordedSlide } from './types';

import RecFailNotLoaded, { meta as m01 } from './harness/01_FailNotLoaded';
import RecFailBuried, { meta as m02 } from './harness/02_FailBuried';
import RecFailCantFollow, { meta as m03 } from './harness/03_FailCantFollow';
import RecDiagnose, { meta as m04 } from './harness/04_Diagnose';
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
import RecHealthOverview, { meta as m17 } from './harness/17_HealthOverview';
import RecHealthInventory, { meta as m18 } from './harness/18_HealthInventory';
import RecHealthSubtract, { meta as m19 } from './harness/19_HealthSubtract';
import RecHealthEvidence, { meta as m20 } from './harness/20_HealthEvidence';
import RecHealthWeakEvidence, { meta as m21 } from './harness/21_HealthWeakEvidence';
import RecHealthRest, { meta as m22 } from './harness/22_HealthRest';
import RecWhyNoHandbook, { meta as m23 } from './harness/23_WhyNoHandbook';
import RecWhyWithHandbook, { meta as m24 } from './harness/24_WhyWithHandbook';
import RecWhyDiff, { meta as m25 } from './harness/25_WhyDiff';
import RecLayersOverview, { meta as m26 } from './harness/26_LayersOverview';
import RecLayerGlobal, { meta as m27 } from './harness/27_LayerGlobal';
import RecLayerProject, { meta as m28 } from './harness/28_LayerProject';
import RecLayerSubdir, { meta as m29 } from './harness/29_LayerSubdir';
import RecLayerLocal, { meta as m30 } from './harness/30_LayerLocal';
import RecHandbookLength, { meta as m31 } from './harness/31_HandbookLength';
import RecAgentsMd, { meta as m32 } from './harness/32_AgentsMd';
import RecSurfaceIntro, { meta as m33 } from './harness/33_SurfaceIntro';
import RecSurfaceProjects, { meta as m34 } from './harness/34_SurfaceProjects';
import RecSurfaceCowork, { meta as m35 } from './harness/35_SurfaceCowork';
import RecSurfaceCode, { meta as m36 } from './harness/36_SurfaceCode';
import RecNonCodeKnowledge, { meta as m37 } from './harness/37_NonCodeKnowledge';
import RecNonCodeInstruction, { meta as m38 } from './harness/38_NonCodeInstruction';
import RecProjectScope, { meta as m39 } from './harness/39_ProjectScope';
import RecSurfaceRecap, { meta as m40 } from './harness/40_SurfaceRecap';
import RecTransferCase, { meta as m41 } from './harness/41_TransferCase';
import RecTransferQ1, { meta as m42 } from './harness/42_TransferQ1';
import RecTransferQ2, { meta as m43 } from './harness/43_TransferQ2';
import RecTransferQ3, { meta as m44 } from './harness/44_TransferQ3';
import RecTransferAnswer, { meta as m45 } from './harness/45_TransferAnswer';
import RecTransferMapping, { meta as m46 } from './harness/46_TransferMapping';
import RecTransferNextStep, { meta as m47 } from './harness/47_TransferNextStep';
import RecRecapOne, { meta as m48 } from './harness/48_RecapOne';
import RecRecapTwo, { meta as m49 } from './harness/49_RecapTwo';
import RecRecapThree, { meta as m50 } from './harness/50_RecapThree';
import RecRecapArtifact, { meta as m51 } from './harness/51_RecapArtifact';
import RecRecapHandouts, { meta as m52 } from './harness/52_RecapHandouts';
import RecRecapNext, { meta as m53 } from './harness/53_RecapNext';

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
  // index 56 = 原 Slide 57「CLAUDE.md 的分層」
  56: [
    { meta: m23, Component: RecWhyNoHandbook },
    { meta: m24, Component: RecWhyWithHandbook },
    { meta: m25, Component: RecWhyDiff },
    { meta: m26, Component: RecLayersOverview },
    { meta: m27, Component: RecLayerGlobal },
    { meta: m28, Component: RecLayerProject },
    { meta: m29, Component: RecLayerSubdir },
    { meta: m30, Component: RecLayerLocal },
    { meta: m31, Component: RecHandbookLength },
    { meta: m32, Component: RecAgentsMd },
  ],
  // index 68 = 原 Slide 69「規則明明寫了，它卻沒照做」
  68: [
    { meta: m01, Component: RecFailNotLoaded },
    { meta: m02, Component: RecFailBuried },
    { meta: m03, Component: RecFailCantFollow },
    { meta: m04, Component: RecDiagnose },
  ],
  // index 69 = 原 Slide 70「這條規則該放哪」
  69: [
    { meta: m05, Component: RecRouteQ1 },
    { meta: m06, Component: RecRouteQ2 },
    { meta: m07, Component: RecRouteQ3 },
    { meta: m08, Component: RecRouteQ4 },
    { meta: m09, Component: RecRoutePrinciples },
    { meta: m10, Component: RecStartSimple },
  ],
  // index 70 = 原 Slide 71「手冊越寫越肥，怎麼整理」
  70: [
    { meta: m17, Component: RecHealthOverview },
    { meta: m18, Component: RecHealthInventory },
    { meta: m19, Component: RecHealthSubtract },
    { meta: m20, Component: RecHealthEvidence },
    { meta: m21, Component: RecHealthWeakEvidence },
    { meta: m22, Component: RecHealthRest },
  ],
  // index 71 = 原 Slide 72「怎麼把話講對：白名單與探索空間」
  71: [
    { meta: m11, Component: RecWrite1 },
    { meta: m12, Component: RecWrite2 },
    { meta: m13, Component: RecWrite3 },
    { meta: m14, Component: RecWrite4 },
    { meta: m15, Component: RecWrite5 },
    { meta: m16, Component: RecWrite6 },
  ],
  // index 73 = 原 Slide 74「同一套手冊，換個地方用」
  73: [
    { meta: m33, Component: RecSurfaceIntro },
    { meta: m34, Component: RecSurfaceProjects },
    { meta: m35, Component: RecSurfaceCowork },
    { meta: m36, Component: RecSurfaceCode },
    { meta: m37, Component: RecNonCodeKnowledge },
    { meta: m38, Component: RecNonCodeInstruction },
    { meta: m39, Component: RecProjectScope },
    { meta: m40, Component: RecSurfaceRecap },
  ],
  // index 76 = 原 Slide 77「換成你的工作，手冊該寫什麼」
  76: [
    { meta: m41, Component: RecTransferCase },
    { meta: m42, Component: RecTransferQ1 },
    { meta: m43, Component: RecTransferQ2 },
    { meta: m44, Component: RecTransferQ3 },
    { meta: m45, Component: RecTransferAnswer },
    { meta: m46, Component: RecTransferMapping },
    { meta: m47, Component: RecTransferNextStep },
  ],
  // index 77 = 原 Slide 78「這一段你完成了三件事」
  77: [
    { meta: m48, Component: RecRecapOne },
    { meta: m49, Component: RecRecapTwo },
    { meta: m50, Component: RecRecapThree },
    { meta: m51, Component: RecRecapArtifact },
    { meta: m52, Component: RecRecapHandouts },
    { meta: m53, Component: RecRecapNext },
  ],
};
