import { SeriesRail } from './_SeriesRail';

const STAGES = ['三件事', '產出', '帶回去', '下一段'];

/** 這一段的收尾。三件事那三頁共用第 1 站。 */
export function RecapRail({ active }: { active: number | number[] }) {
  return <SeriesRail steps={STAGES} active={active} />;
}
