import { SeriesRail } from './_SeriesRail';

const STEPS = ['盤點', '減法', '分流', '加法', '修剪'];

/** 五步健檢的流程軌。active 可以是單一步驟，也可以是一組步驟。 */
export function HealthRail({ active }: { active: number | number[] }) {
  return <SeriesRail steps={STEPS} active={active} spacing="spread" />;
}
