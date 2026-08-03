import { SeriesRail } from './_SeriesRail';

const LAYERS = ['全域', '專案根目錄', '子目錄', '個人 local'];

/** CLAUDE.md 四個放置位置的流程軌。傳 0 表示總覽，全部不高亮。 */
export function LayerRail({ active }: { active: number }) {
  return <SeriesRail steps={LAYERS} active={active} spacing="spread" />;
}
