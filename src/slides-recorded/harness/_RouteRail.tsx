import { SeriesRail } from './_SeriesRail';

const STEPS = ['會出事', '只在某一區', '有固定步驟', '以上皆非'];

/** 規則分流的四個問題。每一頁都顯示整條流程，高亮當前這一問。 */
export function RouteRail({ active }: { active: number }) {
  return <SeriesRail steps={STEPS} active={active} spacing="spread" className="mb-9" />;
}
