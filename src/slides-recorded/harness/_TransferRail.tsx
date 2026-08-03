import { SeriesRail } from './_SeriesRail';

const STAGES = ['情境', '三個問題', '寫出手冊', '下一步'];

/** 把手冊觀念搬到非程式工作的那一段。三個問題那三頁共用第 2 站。 */
export function TransferRail({ active }: { active: number | number[] }) {
  return <SeriesRail steps={STAGES} active={active} />;
}
