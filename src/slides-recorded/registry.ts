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
  // index 67 = 原 Slide 68「規則明明寫了，它卻沒照做」
  67: [
    { meta: m01, Component: RecFailNotLoaded },
    { meta: m02, Component: RecFailBuried },
    { meta: m03, Component: RecFailCantFollow },
    { meta: m04, Component: RecDiagnose },
  ],
  // index 68 = 原 Slide 69「這條規則該放哪」
  68: [
    { meta: m05, Component: RecRouteQ1 },
    { meta: m06, Component: RecRouteQ2 },
    { meta: m07, Component: RecRouteQ3 },
    { meta: m08, Component: RecRouteQ4 },
    { meta: m09, Component: RecRoutePrinciples },
    { meta: m10, Component: RecStartSimple },
  ],
  // index 69 = 原 Slide 70「手冊越寫越肥，怎麼整理」
  69: [
    { meta: m17, Component: RecHealthOverview },
    { meta: m18, Component: RecHealthInventory },
    { meta: m19, Component: RecHealthSubtract },
    { meta: m20, Component: RecHealthEvidence },
    { meta: m21, Component: RecHealthWeakEvidence },
    { meta: m22, Component: RecHealthRest },
  ],
  // index 70 = 原 Slide 71「怎麼把話講對：白名單與探索空間」
  70: [
    { meta: m11, Component: RecWrite1 },
    { meta: m12, Component: RecWrite2 },
    { meta: m13, Component: RecWrite3 },
    { meta: m14, Component: RecWrite4 },
    { meta: m15, Component: RecWrite5 },
    { meta: m16, Component: RecWrite6 },
  ],
};
