import { SeriesRail } from './_SeriesRail';

const SURFACES = ['Claude Projects', 'Cowork', 'Claude Code'];

/** 同一份手冊會用到的三個地方。只有三顆，用 fill 等寬撐滿，中間才不會空掉。 */
export function SurfaceRail({ active }: { active: number }) {
  return <SeriesRail steps={SURFACES} active={active} />;
}
