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
};
